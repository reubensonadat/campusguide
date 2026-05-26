import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getWhisperComments, addWhisperComment } from '../../services/communityService';

const WhisperCommentsModal = ({ isOpen, onClose, whisper, onCommentAdded }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const endOfMessagesRef = useRef(null);

    const loadComments = async () => {
        if (!whisper) return;
        setLoading(true);
        const { success, data } = await getWhisperComments(whisper.id);
        if (success) {
            setComments(data);
        }
        setLoading(false);
        setTimeout(() => endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    useEffect(() => {
        if (isOpen && whisper) {
            loadComments();
        } else {
            setComments([]);
            setText('');
        }
    }, [isOpen, whisper]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedText = text.trim();
        if (!trimmedText || submitting) return;
        
        // Optimistic Update
        const optimisticComment = { id: `temp-${Date.now()}`, text: trimmedText, created_at: new Date().toISOString() };
        setComments(prev => [...prev, optimisticComment]);
        setText('');
        setTimeout(() => endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        
        if (onCommentAdded) {
            onCommentAdded(whisper.id);
        }

        setSubmitting(true);
        const { success, error } = await addWhisperComment(whisper.id, trimmedText);
        setSubmitting(false);
        
        if (success) {
            loadComments(); // Refresh with real data
            toast.success('Comment posted!');
        } else {
            toast.error(error || 'Failed to post comment.');
            // Remove optimistic comment on fail
            setComments(prev => prev.filter(c => c.id !== optimisticComment.id));
        }
    };

    if (!isOpen || !whisper) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="relative bg-white w-full sm:max-w-md h-[85vh] sm:h-[600px] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300">
                
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white z-10 shrink-0">
                    <h3 className="font-black text-gray-900 text-lg">Comments</h3>
                    <button onClick={onClose} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Original Whisper */}
                <div className="p-5 bg-gray-50 border-b border-gray-100 shrink-0">
                    <span className="text-xs font-bold text-primary-500 bg-primary-100/50 px-2 py-1 rounded-md mb-2 inline-block">Anonymous</span>
                    <p className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap">{whisper.text}</p>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-white">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="animate-spin text-gray-300" size={24} />
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 font-medium">
                            No comments yet. Be the first to reply!
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <div key={comment.id} className="bg-gray-50 rounded-2xl rounded-tl-none p-4 w-[85%] border border-gray-100">
                                <span className="text-[10px] font-black text-gray-400 block mb-1">Reply #{index + 1}</span>
                                <p className="text-gray-700 text-sm font-medium whitespace-pre-wrap">{comment.text}</p>
                            </div>
                        ))
                    )}
                    <div ref={endOfMessagesRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 bg-white shrink-0">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Add an anonymous reply..."
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-primary-500 text-sm font-medium outline-none"
                            maxLength={150}
                        />
                        <button 
                            type="submit"
                            disabled={!text.trim() || submitting}
                            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-200 disabled:text-gray-400 text-white p-3 rounded-xl transition-colors flex items-center justify-center"
                        >
                            {submitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default WhisperCommentsModal;
