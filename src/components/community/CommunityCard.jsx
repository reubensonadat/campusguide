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

    const buttonStyle = "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-primary-200";

    return (
        <div
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={startPress}
            onTouchEnd={endPress}
            onTouchMove={endPress}
            onClick={() => setIsExpanded(prev => !prev)}
            className={`cursor-pointer relative bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.06)] mb-6 flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 h-full border ${isShared ? 'ring-2 ring-primary-500 border-primary-200 bg-primary-50/10' : 'border-gray-100'}`}
        >
            {/* Absolute share button */}
            {isExpanded && (
                <button
                    onClick={(e) => handleSharePost(e, post.id)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/95 text-gray-500 hover:text-primary-600 flex items-center justify-center shadow-md active:scale-95 transition-all duration-200"
                    title="Share post"
                >
                    <Share2 size={16} />
                </button>
            )}

            {/* Full Image Container (Flyer) */}
            {image && (
                <div className="relative w-full bg-gray-100 flex items-center justify-center shrink-0 lg:h-64">
                    <SmartImage
                        src={image}
                        alt={title}
                        className="w-full h-auto max-h-[500px] object-contain lg:h-full lg:object-cover transition-transform duration-500 group-hover:scale-105 block"
                    />
                </div>
            )}

            {/* Post Content */}
            <div className="p-6 flex-1 flex flex-col min-h-0">
                {displayTag && (
                    <div className="flex mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xl text-[10px] font-bold tracking-widest uppercase ${isAd ? 'bg-amber-50 text-amber-600' : 'bg-primary-50 text-primary-600'}`}>
                            {isAd && <Tag size={10} />}
                            {displayTag}
                        </span>
                    </div>
                )}
                <h3 className="text-xl sm:text-[22px] font-bold text-gray-900 leading-tight mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 shrink-0 pr-8">
                    {title}
                </h3>

                {description && (
                    <div className="mb-5 flex-1 min-h-0 flex flex-col">
                        <p className={`text-[15px] text-gray-600 leading-relaxed whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-3'}`}>
                            {description}
                        </p>
                        {description.length > 120 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                                className="text-primary-600 font-bold text-sm mt-2 hover:underline focus:outline-none self-start shrink-0"
                            >
                                {isExpanded ? 'Show Less' : 'Read More...'}
                            </button>
                        )}
                    </div>
                )}

                {/* Bottom Action Button - Pinned to bottom using mt-auto */}
                {(actionText || link) && (
                    <div className="mt-auto shrink-0 pt-2">
                        {link ? (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`w-full flex items-center justify-center font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-sm gap-2 hover:-translate-y-0.5 ${buttonStyle}`}
                            >
                                {buttonText} {isAd && <ExternalLink size={16} />}
                            </a>
                        ) : (
                            <button
                                onClick={(e) => e.stopPropagation()}
                                className={`w-full flex items-center justify-center font-bold py-3.5 px-4 rounded-[16px] transition-all duration-300 shadow-sm gap-2 hover:-translate-y-0.5 ${buttonStyle}`}
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
