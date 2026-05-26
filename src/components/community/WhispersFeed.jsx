import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Flag, Loader2, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import NewWhisperModal from './NewWhisperModal';
import WhisperCommentsModal from './WhisperCommentsModal';
import { getWhispers, interactWithWhisper, deleteWhisper } from '../../services/communityService';
import { getCurrentUser } from '../../services/authService';

const WhispersFeed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWhisper, setSelectedWhisper] = useState(null);
    const [whispers, setWhispers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('new'); // 'new' or 'top'
    const [currentUser, setCurrentUser] = useState(null);

    const loadWhispers = async () => {
        setLoading(true);
        const [whispersRes, userRes] = await Promise.all([
            getWhispers(),
            getCurrentUser()
        ]);
        if (whispersRes.success) {
            setWhispers(whispersRes.data);
        }
        setCurrentUser(userRes);
        setLoading(false);
    };

    useEffect(() => {
        loadWhispers();
    }, []);

    const handleInteract = async (id, type) => {
        // Optimistic UI update
        setWhispers(prev => prev.map(w => {
            if (w.id === id) {
                if (type === 'UPVOTE') return { ...w, upvotes: w.upvotes + 1 };
                if (type === 'DOWNVOTE') return { ...w, downvotes: w.downvotes + 1 };
            }
            return w;
        }));

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

    const sortedWhispers = [...whispers].sort((a, b) => {
        if (sortBy === 'top') {
            const scoreA = a.upvotes - a.downvotes;
            const scoreB = b.upvotes - b.downvotes;
            return scoreB - scoreA;
        }
        return new Date(b.created_at) - new Date(a.created_at);
    });

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <div className="flex justify-between items-end mb-6">
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
                            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-gray-900 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-black transition-colors mb-1">
                    + Whisper
                </button>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="animate-spin mb-2" size={24} />
                        <p className="text-sm font-medium">Loading whispers...</p>
                    </div>
                ) : sortedWhispers.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 font-medium">
                        No whispers yet. Be the first to spill the tea!
                    </div>
                ) : (
                    sortedWhispers.map(whisper => (
                        <div key={whisper.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-1 rounded-md">Anonymous</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400 font-medium">{getTimeAgo(whisper.created_at)}</span>
                                    <button onClick={() => handleInteract(whisper.id, 'FLAG')} className="text-gray-300 hover:text-red-500 transition-colors" title="Report this post">
                                        <Flag size={14} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-800 text-lg font-medium leading-relaxed mb-4 whitespace-pre-wrap">
                                {whisper.text}
                            </p>
                            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                                <div className="flex items-center gap-1 bg-gray-50 rounded-full px-1 py-1 border border-gray-100">
                                    <button onClick={() => handleInteract(whisper.id, 'UPVOTE')} className="p-1.5 rounded-full hover:bg-white text-gray-400 hover:text-green-600 transition-colors shadow-sm">
                                        <ArrowUp size={16} strokeWidth={3} />
                                    </button>
                                    <span className="text-sm font-black text-gray-700 min-w-[20px] text-center">
                                        {whisper.upvotes - whisper.downvotes}
                                    </span>
                                    <button onClick={() => handleInteract(whisper.id, 'DOWNVOTE')} className="p-1.5 rounded-full hover:bg-white text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                                        <ArrowDown size={16} strokeWidth={3} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    {currentUser?.id === whisper.user_id && (
                                        <button onClick={() => handleDelete(whisper.id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded-full hover:bg-red-50" title="Delete whisper">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                    <button onClick={() => setSelectedWhisper(whisper)} className="flex items-center gap-1.5 text-gray-400 hover:text-primary-600 transition-colors text-sm font-bold px-3 py-1.5 rounded-full hover:bg-primary-50">
                                        <MessageSquare size={16} />
                                        {whisper.comment_count}
                                    </button>
                                </div>
                            </div>
                        </div>
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

export default WhispersFeed;
