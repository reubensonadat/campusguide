import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Flag, Loader2, Trash2, RefreshCw, Search, X, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import NewWhisperModal from './NewWhisperModal';
import WhisperCommentsModal from './WhisperCommentsModal';
import { getWhispers, interactWithWhisper, deleteWhisper, getUserInteractions } from '../../services/communityService';
import { getCurrentUser } from '../../services/authService';
import { DataLoader } from '../common/CustomLoaders';
import { Linkify } from '../../utils/linkify';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const handleShareWhisper = (e, id) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}/community?whisperId=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success('Whisper link copied to clipboard!');
    }).catch(() => {
        toast.error('Failed to copy link.');
    });
};

const WhispersFeed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWhisper, setSelectedWhisper] = useState(null);
    const [whispers, setWhispers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('new'); // 'new' or 'top'
    const [currentUser, setCurrentUser] = useState(null);
    const [userInteractions, setUserInteractions] = useState({ upvotes: new Set(), downvotes: new Set(), flags: new Set() });
    const [searchQuery, setSearchQuery] = useState('');

    const loadWhispers = async () => {
        setLoading(true);
        const [whispersRes, userRes, interactionsRes] = await Promise.all([
            getWhispers(),
            getCurrentUser(),
            getUserInteractions()
        ]);
        if (whispersRes.success) {
            setWhispers(whispersRes.data);
            const whisperId = new URLSearchParams(window.location.search).get('whisperId');
            if (whisperId) {
                const found = whispersRes.data.find(w => w.id.toString() === whisperId);
                if (found) {
                    setSelectedWhisper(found);
                }
            }
        }
        setCurrentUser(userRes);

        if (interactionsRes?.success && interactionsRes.data) {
            const upvotes = new Set();
            const downvotes = new Set();
            const flags = new Set();
            interactionsRes.data.forEach(int => {
                if (int.interaction_type === 'UPVOTE') upvotes.add(int.whisper_id);
                if (int.interaction_type === 'DOWNVOTE') downvotes.add(int.whisper_id);
                if (int.interaction_type === 'FLAG') flags.add(int.whisper_id);
            });
            setUserInteractions({ upvotes, downvotes, flags });
        }

        setLoading(false);
    };

    useEffect(() => {
        loadWhispers();
    }, []);

    const handleInteract = async (id, type) => {
        if (type === 'UPVOTE' && userInteractions.upvotes.has(id)) return;
        if (type === 'DOWNVOTE' && userInteractions.downvotes.has(id)) return;
        if (type === 'FLAG' && userInteractions.flags.has(id)) return;

        // Optimistic UI update
        setWhispers(prev => prev.map(w => {
            if (w.id === id) {
                if (type === 'UPVOTE') return { ...w, upvotes: w.upvotes + 1 };
                if (type === 'DOWNVOTE') return { ...w, downvotes: w.downvotes + 1 };
            }
            return w;
        }));

        setUserInteractions(prev => {
            const next = { ...prev };
            if (type === 'UPVOTE') next.upvotes = new Set([...prev.upvotes, id]);
            if (type === 'DOWNVOTE') next.downvotes = new Set([...prev.downvotes, id]);
            if (type === 'FLAG') next.flags = new Set([...prev.flags, id]);
            return next;
        });

        const result = await interactWithWhisper(id, type);
        if (!result.success && result.error) {
            toast.error(result.error);
            loadWhispers(); // revert on fail
        } else if (type === 'FLAG') {
            toast.success('Whisper flagged for review.');
            loadWhispers(); // refresh to hide if it hit threshold
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this whisper?')) {
            const { success, error } = await deleteWhisper(id);
            if (success) {
                setWhispers(prev => prev.filter(w => w.id !== id));
                toast.success('Whisper deleted');
            } else {
                toast.error(error || 'Failed to delete whisper.');
            }
        }
    };

    const getTimeAgo = (dateString) => {
        const diff = new Date() - new Date(dateString);
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    const sortedWhispers = [...whispers]
        .sort((a, b) => {
            if (sortBy === 'top') {
                return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
            }
            return new Date(b.created_at) - new Date(a.created_at);
        })
        .filter(w => {
            if (!searchQuery.trim()) return true;
            return w.text.toLowerCase().includes(searchQuery.toLowerCase());
        });

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-xl font-black text-gray-900">Campus Whispers</h2>
                    <p className="text-sm text-gray-500 font-medium mb-3">100% Anonymous. Spill the tea.</p>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setSortBy('new')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${sortBy === 'new' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            New
                        </button>
                        <button 
                            onClick={() => setSortBy('top')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${sortBy === 'top' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            Top Score
                        </button>
                        <button 
                            onClick={loadWhispers}
                            disabled={loading}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}><path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path></svg>
                            Refresh
                        </button>
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-gray-900 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-black transition-colors mb-1">
                    + Whisper
                </button>
            </div>

            {/* Search bar */}
            <div className="relative mb-5">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search whispers..."
                    className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition-colors"
                />
                {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <X size={14} />
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                        <DataLoader className="w-8 h-8 text-[#002F45] mb-4" />
                        <p className="text-sm font-medium">Loading whispers...</p>
                    </div>
                ) : sortedWhispers.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 font-medium">
                        No whispers yet. Be the first to spill the tea!
                    </div>
                ) : (
                    sortedWhispers.map((whisper, index) => (
                        <WhisperCard
                            key={whisper.id}
                            whisper={whisper}
                            index={index}
                            userInteractions={userInteractions}
                            currentUser={currentUser}
                            onInteract={handleInteract}
                            onDelete={handleDelete}
                            onComment={setSelectedWhisper}
                            getTimeAgo={getTimeAgo}
                        />
                    ))
                )}
            </div>

            <NewWhisperModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); loadWhispers(); }} />
            <WhisperCommentsModal
                isOpen={!!selectedWhisper}
                onClose={() => setSelectedWhisper(null)}
                whisper={selectedWhisper}
                onCommentAdded={(id) => {
                    setWhispers(prev => prev.map(w => w.id === id ? { ...w, comment_count: w.comment_count + 1 } : w));
                    setSelectedWhisper(prev => prev ? { ...prev, comment_count: prev.comment_count + 1 } : null);
                }}
            />
        </div>
    );
};

/* ─── Animated Whisper Card ─── */
const WhisperCard = ({ whisper, index, userInteractions, currentUser, onInteract, onDelete, onComment, getTimeAgo }) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    const delay = Math.min(index * 70, 350);
    const pressTimer = React.useRef(null);

    const startPress = (e) => {
        pressTimer.current = setTimeout(() => {
            handleShareWhisper(null, whisper.id);
        }, 2000);
    };

    const endPress = () => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    };

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.45s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            }}
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
            onTouchMove={endPress}
        >
            <div 
                onClick={() => onComment(whisper)}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-pointer hover:border-primary-100 transition-colors select-none"
            >
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-1 rounded-md">Anonymous</span>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 font-medium">{getTimeAgo(whisper.created_at)}</span>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onInteract(whisper.id, 'FLAG'); }} 
                            className={`${userInteractions.flags.has(whisper.id) ? 'text-red-500 cursor-default' : 'text-gray-300 hover:text-red-500'} transition-colors`} 
                            title={userInteractions.flags.has(whisper.id) ? "You flagged this post" : "Report this post"}
                        >
                            <Flag size={14} className={userInteractions.flags.has(whisper.id) ? 'fill-current' : ''} />
                        </button>
                    </div>
                </div>
                <p className="text-gray-800 text-lg font-medium leading-relaxed mb-4 whitespace-pre-wrap break-words">
                    <Linkify text={whisper.text} />
                </p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <div className="flex items-center gap-1 bg-gray-50 rounded-full px-1 py-1 border border-gray-100">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onInteract(whisper.id, 'UPVOTE'); }} 
                            className={`p-1.5 rounded-full transition-colors shadow-sm ${userInteractions.upvotes.has(whisper.id) ? 'text-green-600 bg-white cursor-default' : 'text-gray-400 hover:text-green-600 hover:bg-white'}`}
                        >
                            <ArrowUp size={16} strokeWidth={3} />
                        </button>
                        <span className="text-sm font-black text-gray-700 min-w-[20px] text-center">
                            {whisper.upvotes - whisper.downvotes}
                        </span>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onInteract(whisper.id, 'DOWNVOTE'); }} 
                            className={`p-1.5 rounded-full transition-colors shadow-sm ${userInteractions.downvotes.has(whisper.id) ? 'text-red-500 bg-white cursor-default' : 'text-gray-400 hover:text-red-500 hover:bg-white'}`}
                        >
                            <ArrowDown size={16} strokeWidth={3} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        {currentUser?.id === whisper.user_id && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDelete(whisper.id); }} 
                                className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded-full hover:bg-red-50" 
                                title="Delete whisper"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleShareWhisper(e, whisper.id); }} 
                            className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors rounded-full hover:bg-primary-50" 
                            title="Share whisper"
                        >
                            <Share2 size={16} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onComment(whisper); }} 
                            className="flex items-center gap-1.5 text-gray-400 hover:text-primary-600 transition-colors text-sm font-bold px-3 py-1.5 rounded-full hover:bg-primary-50"
                        >
                            <MessageSquare size={16} />
                            {whisper.comment_count}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhispersFeed;
