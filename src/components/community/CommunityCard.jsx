import React, { useState } from 'react';
import { ExternalLink, Tag, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import SmartImage from '../common/SmartImage';

const handleSharePost = (e, id) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}/community?postId=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success('Post link copied to clipboard!');
    }).catch(() => {
        toast.error('Failed to copy link.');
    });
};

const CommunityCard = ({ post }) => {
    const { type, title, image, description, actionText, tag, link } = post;
    const [isExpanded, setIsExpanded] = useState(false);

    const pressTimer = React.useRef(null);
    const sharedPostId = new URLSearchParams(window.location.search).get('postId');
    const isShared = post.id === sharedPostId;

    const startPress = (e) => {
        pressTimer.current = setTimeout(() => {
            handleSharePost(null, post.id);
        }, 2000);
    };

    const endPress = () => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }
    };

    // Design: Unified Card Architecture (Both "University Post" & "Ad" use the same flyer layout)
    const isAd = type === 'ad';
    const displayTag = isAd ? "SPONSORED" : tag;

    // Decide default button text based on type if not provided
    const defaultActionText = isAd ? "Message via WhatsApp" : "View Details";
    const buttonText = actionText || defaultActionText;

    return (
        <div
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
            onTouchMove={endPress}
            onClick={() => setIsExpanded(prev => !prev)}
            className={`cursor-pointer relative bg-white rounded-[28px] p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] flex flex-col gap-3 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 h-full border ${isShared ? 'ring-2 ring-primary-500 border-primary-200 bg-primary-50/10' : 'border-gray-100'}`}
        >
            {/* Absolute share button */}
            {isExpanded && (
                <button
                    onClick={(e) => handleSharePost(e, post.id)}
                    className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/95 text-gray-500 hover:text-primary-600 flex items-center justify-center shadow-md active:scale-95 transition-all duration-200"
                    title="Share post"
                >
                    <Share2 size={16} />
                </button>
            )}

            {/* Full Image Container (Flyer) */}
            {image && (
                <div className="relative w-full bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shrink-0 lg:h-64">
                    <SmartImage
                        src={image}
                        alt={title}
                        className="w-full h-auto max-h-[500px] object-contain lg:h-full lg:object-cover transition-transform duration-500 group-hover:scale-105 block"
                    />
                </div>
            )}

            {/* Post Content */}
            <div className="flex flex-col gap-3 px-1 pb-1">
                {displayTag && (
                    <div className="flex">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${isAd ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-primary-50 text-primary-600 border-primary-200'}`}>
                            {isAd && <Tag size={10} />}
                            {displayTag}
                        </span>
                    </div>
                )}
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2 pr-8">
                        {title}
                    </h3>
                </div>

                {description && (
                    <div className="flex flex-col">
                        <p className={`text-sm text-gray-500 leading-relaxed whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-3'}`}>
                            {description}
                        </p>
                        {description.length > 120 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                                className="text-primary-600 font-bold text-xs mt-1.5 hover:underline focus:outline-none self-start shrink-0"
                            >
                                {isExpanded ? 'Show Less' : 'Read More...'}
                            </button>
                        )}
                    </div>
                )}

                {/* Bottom Action Button */}
                {(actionText || link) && (
                    <div className="mt-1">
                        {link ? (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-full flex items-center justify-center font-bold py-3.5 px-4 rounded-[20px] transition-all duration-300 gap-2 bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]"
                            >
                                {buttonText} {isAd && <ExternalLink size={16} />}
                            </a>
                        ) : (
                            <button
                                onClick={(e) => e.stopPropagation()}
                                className="w-full flex items-center justify-center font-bold py-3.5 px-4 rounded-[20px] transition-all duration-300 gap-2 bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]"
                            >
                                {buttonText} {isAd && <ExternalLink size={16} />}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunityCard;
