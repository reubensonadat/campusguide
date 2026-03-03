import React, { useState } from 'react';
import { ExternalLink, Tag } from 'lucide-react';

const CommunityCard = ({ post }) => {
    const { type, title, image, description, actionText, tag, link } = post;
    const [isExpanded, setIsExpanded] = useState(false);

    // Design: Unified Card Architecture (Both "University Post" & "Ad" use the same flyer layout)
    const isAd = type === 'ad';
    const displayTag = isAd ? "SPONSORED" : tag;
    const tagColor = isAd ? "bg-amber-500/90 text-amber-950" : "bg-indigo-600/90 text-white";

    // Decide default button text based on type if not provided
    const defaultActionText = isAd ? "Message via WhatsApp" : "View Details";
    const buttonText = actionText || defaultActionText;

    const buttonStyle = isAd
        ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200";

    return (
        <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-100 mb-6 flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 h-full">

            {/* Full Image Container (Flyer) */}
            <div className="relative h-48 sm:h-56 lg:h-64 w-full bg-gray-100 overflow-hidden shrink-0">
                <img
                    src={image || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop"}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {displayTag && (
                    <div className={`absolute top-4 left-4 ${tagColor} backdrop-blur-md px-3 py-1.5 rounded-[12px] text-xs font-bold tracking-widest uppercase shadow-sm flex items-center gap-1.5`}>
                        {isAd && <Tag size={12} />}
                        {displayTag}
                    </div>
                )}
            </div>

            {/* Post Content */}
            <div className="p-6 flex-1 flex flex-col min-h-0">
                <h3 className="text-xl sm:text-[22px] font-bold text-gray-900 leading-tight mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 shrink-0">
                    {title}
                </h3>

                {description && (
                    <div className="mb-5 flex-1 min-h-0 flex flex-col">
                        <p className={`text-[15px] text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                            {description}
                        </p>
                        {description.length > 120 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-indigo-600 font-bold text-sm mt-2 hover:underline focus:outline-none self-start shrink-0"
                            >
                                {isExpanded ? 'Show Less' : 'Read More...'}
                            </button>
                        )}
                    </div>
                )}

                {/* Bottom Action Button - Pinned to bottom using mt-auto */}
                <div className="mt-auto shrink-0 pt-2">
                    {isAd && link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full flex items-center justify-center font-bold py-3.5 px-4 rounded-[16px] transition-all duration-300 shadow-sm gap-2 hover:-translate-y-0.5 ${buttonStyle}`}
                        >
                            {buttonText} {isAd && <ExternalLink size={16} />}
                        </a>
                    ) : (
                        <button className={`w-full flex items-center justify-center font-bold py-3.5 px-4 rounded-[16px] transition-all duration-300 shadow-sm gap-2 hover:-translate-y-0.5 ${buttonStyle}`}>
                            {buttonText} {isAd && <ExternalLink size={16} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityCard;
