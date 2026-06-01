import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Flag, Loader2, Trash2, RefreshCw, Search, X, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import NewWhisperModal from './NewWhisperModal';
import WhisperCommentsModal from './WhisperCommentsModal';
import { getWhispers, interactWithWhisper, deleteWhisper, getUserInteractions, toggleWhisperReaction } from '../../services/communityService';
import { getCurrentUser } from '../../services/authService';
import { DataLoader } from '../common/CustomLoaders';
import { Linkify } from '../../utils/linkify';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { toBlob } from 'html-to-image';
import { triggerHaptic } from '../../utils/haptics';

const downloadFallback = (blob, id, toastId) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campus-whisper-${id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Image downloaded! You can now post it to your status.', { id: toastId, duration: 4000 });
};

const handleShareWhisper = async (e, whisper) => {
    if (e) e.stopPropagation();

    triggerHaptic(); // Premium physical feedback
    const toastId = toast.loading('Generating shareable image...');

    try {
        const element = document.getElementById(`whisper-card-${whisper.id}`);
        if (!element) throw new Error("Card not found");

        // Add a temporary watermark
        const watermark = document.createElement('div');
        watermark.className = 'whisper-watermark';
        watermark.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:center; gap:8px; padding-top:12px; margin-top:8px; border-top:1px solid #f3f4f6;">
                <span style="font-size:12px; font-weight:900; color:#002F45; letter-spacing:0.5px;">CAMPUS GUIDE</span>
                <span style="font-size:10px; font-weight:600; color:#9ca3af;">•</span>
                <span style="font-size:10px; font-weight:600; color:#6b7280;">Anonymous Whispers</span>
            </div>
        `;
        element.appendChild(watermark);

        // html-to-image uses SVG foreignObject, perfectly handling modern CSS like oklch
        const canvasBlob = await toBlob(element, {
            pixelRatio: 3, // Very high quality for mobile screens
            backgroundColor: '#ffffff',
            filter: (node) => {
                // Filter out the action row (upvote/downvote buttons) so they don't appear in the image
                if (node.classList && node.classList.contains('whisper-action-row')) return false;
                return true;
            }
        });

        // Restore UI
        element.removeChild(watermark);

        if (!canvasBlob) {
            toast.error('Failed to generate image', { id: toastId });
            return;
        }

        const file = new File([canvasBlob], `campus-whisper-${whisper.id}.png`, { type: 'image/png' });

        // Check if Native Web Share API supports files (mobile devices)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    title: 'Campus Whisper',
                    text: 'Read this juicy whisper on the Campus Guide app! 👀',
                    files: [file],
                });
                toast.success('Shared successfully!', { id: toastId });
            } catch (shareErr) {
                if (shareErr.name !== 'AbortError') {
                    downloadFallback(canvasBlob, whisper.id, toastId);
                } else {
                    toast.dismiss(toastId);
                }
            }
        } else {
            // Fallback to direct download for desktop/unsupported browsers
            downloadFallback(canvasBlob, whisper.id, toastId);
        }

    } catch (error) {
        console.error("Error capturing whisper:", error);
        toast.error('Failed to capture image', { id: toastId });
    }
};

const WhispersFeed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWhisper, setSelectedWhisper] = useState(null);
    const [whispers, setWhispers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('new'); // 'new' or 'top'
    const [currentUser, setCurrentUser] = useState(null);
    const [userInteractions, setUserInteractions] = useState({ upvotes: new Set(), downvotes: new Set(), flags: new Set(), emojis: {} });
    const [searchQuery, setSearchQuery] = useState('');

    // Simulated online users count (Scales up based on base traffic, caps at 50 to look realistic)
    // Kept stable during the user's session using useMemo
    const simulatedOnlineCount = React.useMemo(() => {
        const base = Math.floor(Math.random() * (42 - 12 + 1)) + 12; // Base between 12 and 42

        let boost = 0;
        if (base <= 20) {
            boost = Math.floor(Math.random() * 3) + 2; // Add ~2 for lower traffic
        } else if (base <= 35) {
            boost = Math.floor(Math.random() * 5) + 4; // Add ~4 for medium traffic
        } else {
            boost = Math.floor(Math.random() * 6) + 5; // Add ~5 for high traffic
        }

        const finalCount = base + boost;
        return finalCount > 50 ? 50 : finalCount;
    }, []);

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
            const emojis = {};
            interactionsRes.data.forEach(int => {
                if (int.interaction_type === 'UPVOTE') upvotes.add(int.whisper_id);
                else if (int.interaction_type === 'DOWNVOTE') downvotes.add(int.whisper_id);
                else if (int.interaction_type === 'FLAG') flags.add(int.whisper_id);
                else {
                    if (!emojis[int.whisper_id]) emojis[int.whisper_id] = new Set();
                    emojis[int.whisper_id].add(int.interaction_type);
                }
            });
            setUserInteractions({ upvotes, downvotes, flags, emojis });
        }

        setLoading(false);
    };

    useEffect(() => {
        loadWhispers();
    }, []);

    const handleInteract = async (id, type) => {
        triggerHaptic();
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

    const handleEmojiReaction = async (id, emoji) => {
        triggerHaptic();

        // Optimistic update
        const userHasReacted = userInteractions.emojis[id]?.has(emoji);

        setWhispers(prev => prev.map(w => {
            if (w.id === id) {
                const updatedReactions = { ...(w.reactions || {}) };
                if (userHasReacted) {
                    updatedReactions[emoji] = Math.max(0, (updatedReactions[emoji] || 1) - 1);
                } else {
                    updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
                }
                return { ...w, reactions: updatedReactions };
            }
            return w;
        }));

        setUserInteractions(prev => {
            const next = { ...prev };
            if (!next.emojis) next.emojis = {};
            if (!next.emojis[id]) next.emojis[id] = new Set();

            const newSet = new Set(next.emojis[id]);
            if (userHasReacted) {
                newSet.delete(emoji);
            } else {
                newSet.add(emoji);
            }
            next.emojis[id] = newSet;
            return next;
        });

        const result = await toggleWhisperReaction(id, emoji);
        if (!result.success) {
            toast.error(result.error);
            loadWhispers(); // revert on fail
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
            const netA = a.upvotes - a.downvotes;
            const netB = b.upvotes - b.downvotes;
            const isHotA = netA >= 15;
            const isHotB = netB >= 15;

            if (sortBy === 'top') {
                return netB - netA;
            }

            // If sorting by New, pin HOT ones to the top
            if (isHotA && !isHotB) return -1;
            if (!isHotA && isHotB) return 1;

            // Then sort by date
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
                    <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        Campus Whispers
                        <div className="flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black text-green-700 uppercase tracking-wider whitespace-nowrap">
                                {simulatedOnlineCount} Online
                            </span>
                        </div>
                    </h2>
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
                        <DataLoader className="w-8 h-8 text-gray-900 mb-4" />
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
                            onEmojiReaction={handleEmojiReaction}
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
const WhisperCard = ({ whisper, index, userInteractions, currentUser, onInteract, onEmojiReaction, onDelete, onComment, getTimeAgo }) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    const delay = Math.min(index * 70, 350);
    const pressTimer = React.useRef(null);
    const [floatingEmojis, setFloatingEmojis] = useState([]);
    const [emojiLock, setEmojiLock] = useState(false);

    const handleEmojiClick = (e, emoji) => {
        e.stopPropagation();
        if (emojiLock) return;

        // Trigger floating animation (50 emojis)
        const baseId = Date.now();
        const newEmojis = Array.from({ length: 50 }).map((_, i) => ({
            id: `${baseId}-${i}`,
            emoji,
            left: `${10 + Math.random() * 80}%`, // Spread across the screen horizontally
            delay: `${Math.random() * 2}s`, // Stagger start times
            duration: `${3 + Math.random() * 2}s`, // Different speeds
            size: `${1.5 + Math.random() * 2}rem` // Random sizes
        }));

        setFloatingEmojis(prev => [...prev, ...newEmojis]);

        setTimeout(() => {
            setFloatingEmojis(prev => prev.filter(item => !item.id.startsWith(`${baseId}-`)));
        }, 7500); // Remove after longest animation finishes

        // Lock for 5 seconds
        setEmojiLock(true);
        setTimeout(() => setEmojiLock(false), 5000);

        onEmojiReaction(whisper.id, emoji);
    };

    const startPress = (e) => {
        pressTimer.current = setTimeout(() => {
            handleShareWhisper(null, whisper);
        }, 2000);
    };

    const endPress = () => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    };

    const netScore = whisper.upvotes - whisper.downvotes;
    const isTrending = netScore >= 15;

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
                id={`whisper-card-${whisper.id}`}
                onClick={() => onComment(whisper)}
                className={`rounded-2xl p-5 border shadow-sm cursor-pointer transition-colors select-none relative ${isTrending
                        ? 'border-orange-200 hover:border-orange-300 bg-[#fffcf5]'
                        : 'bg-white border-gray-100 hover:border-primary-100'
                    }`}
            >
                {floatingEmojis.map(f => (
                    <div
                        key={f.id}
                        className="floating-emoji"
                        style={{
                            left: f.left,
                            fontSize: f.size,
                            animationDuration: f.duration,
                            animationDelay: f.delay
                        }}
                    >
                        {f.emoji}
                    </div>
                ))}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${isTrending ? 'text-orange-600 bg-orange-100/50' : 'text-primary-500 bg-primary-50'}`}>
                            Anonymous
                        </span>
                        {isTrending && (
                            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100/50 px-2 py-0.5 rounded-md animate-in fade-in zoom-in duration-500">
                                <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-orange-500 animate-pulse">
                                        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248z" clipRule="evenodd" />
                                    </svg>
                                    HOT
                                </span>
                            </div>
                        )}
                    </div>
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
                <div className="whisper-action-row flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Vote Pill */}
                        <div className="flex items-center gap-1 bg-gray-50/80 rounded-full px-1 py-1 border border-gray-100/50">
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

                        {/* Emojis Pill */}
                        <div className="flex items-center bg-gray-50/50 rounded-full px-1 py-0.5 border border-gray-50">
                            {['😂', '😲', '😡', '🔥'].map(emoji => {
                                const count = whisper.reactions?.[emoji] || 0;
                                const hasReacted = userInteractions.emojis?.[whisper.id]?.has(emoji);
                                return (
                                    <button
                                        key={emoji}
                                        disabled={emojiLock}
                                        onClick={(e) => handleEmojiClick(e, emoji)}
                                        className={`emoji-reaction-btn flex items-center gap-0.5 px-2 py-1 rounded-full text-[11px] font-bold transition-all ${hasReacted
                                                ? 'bg-primary-50 text-primary-700 scale-110 shadow-sm'
                                                : 'text-gray-400 hover:bg-white hover:text-gray-600 hover:shadow-sm hover:scale-105'
                                            }`}
                                    >
                                        <span className="text-sm">{emoji}</span>
                                        {count > 0 && <span>{count}</span>}
                                    </button>
                                );
                            })}
                        </div>
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
                            onClick={(e) => { e.stopPropagation(); handleShareWhisper(e, whisper); }}
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
