import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ShieldAlert } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { addWhisper } from '../../services/communityService';
import { DataLoader } from '../common/CustomLoaders';

const NewWhisperModal = ({ isOpen, onClose }) => {
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const textareaRef = useRef(null);
    const MAX_CHARS = 280;

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 300);
        } else {
            setText('');
        }
    }, [isOpen]);

    const handleInput = (e) => {
        const val = e.target.value;
        if (val.length <= MAX_CHARS) {
            setText(val);
        }
        
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleSubmit = async () => {
        if (!text.trim() || submitting) return;
        setSubmitting(true);
        const { success, error } = await addWhisper(text.trim());
        setSubmitting(false);
        if (success) {
            toast.success('Whisper posted successfully!');
            setText('');
            onClose();
        } else {
            toast.error(error || 'Failed to post whisper. Make sure you are logged in.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="font-black text-gray-900 text-lg">New Whisper</h3>
                    <button onClick={onClose} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-5">
                    <div className="bg-primary-50 text-primary-700 px-4 py-3 rounded-xl text-xs font-bold flex items-start gap-3 mb-4">
                        <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                        <p>You are completely anonymous. Be kind. Posts with bullying, hate speech, or real names will be auto-flagged and removed.</p>
                    </div>

                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={handleInput}
                        placeholder="What's happening on campus? Spill the tea..."
                        className="w-full h-32 bg-gray-50 border border-gray-200 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none font-medium text-gray-900"
                        maxLength={MAX_CHARS}
                    />
                    <div className="flex justify-end mt-2">
                        <span className={`text-xs font-bold ${text.length > 250 ? 'text-red-500' : 'text-gray-400'}`}>
                            {text.length}/{MAX_CHARS}
                        </span>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        disabled={!text.trim() || submitting} 
                        className="w-full mt-4 bg-gray-900 disabled:bg-gray-300 hover:bg-black text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-gray-200"
                    >
                        {submitting ? (
                            <>
                                <DataLoader className="w-5 h-5 text-current" /> Posting...
                            </>
                        ) : (
                            <>
                                <Send size={18} /> Whisper Anonymously
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewWhisperModal;
