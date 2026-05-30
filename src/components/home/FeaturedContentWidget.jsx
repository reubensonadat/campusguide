import React from 'react';
import { ExternalLink, Megaphone, ChevronRight } from 'lucide-react';

export const FeaturedContentWidget = ({ featuredContent, isFeaturedExpanded, setIsFeaturedExpanded }) => {
  if (!featuredContent) return null;

  const isAd = featuredContent.kind === 'ad';
  const d = featuredContent.data;
  const imgSrc = isAd ? d.image_url : d.flyer_url;

  return (
    <div className="pt-2 pb-4">
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
          <Megaphone size={14} className="text-white" />
        </div>
        <h3 className="text-gray-900 font-black text-xl tracking-tight">Campus Radar</h3>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
        {imgSrc && (
          <div className="w-full h-40 bg-gray-100 relative">
            <img src={imgSrc} alt="Featured" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase">
              {isAd ? 'Sponsored' : 'Announcement'}
            </div>
          </div>
        )}
        <div className="p-5">
          <h4 className="font-bold text-gray-900 text-base mb-1">{d.title}</h4>
          
          <div className={`text-sm text-gray-600 font-medium whitespace-pre-wrap ${isFeaturedExpanded ? '' : 'line-clamp-2'}`}>
            {d.description || d.content}
          </div>
          
          <button 
            onClick={() => setIsFeaturedExpanded(!isFeaturedExpanded)}
            className="text-primary-600 text-xs font-bold mt-1 mb-4 hover:underline"
          >
            {isFeaturedExpanded ? 'Show less' : 'Read more'}
          </button>

          {(isAd || d.action_link) && (
            <div className="flex gap-2">
              {!isAd && d.action_link && (
                <button 
                  onClick={() => window.open(d.action_link, '_blank')}
                  className="flex-1 bg-gray-900 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {d.action_text || 'Visit Link'} <ExternalLink size={14} />
                </button>
              )}
              {isAd && d.action_url && (
                <button 
                  onClick={() => window.open(d.action_url, '_blank')}
                  className="flex-1 bg-gray-900 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {d.action_text || 'Visit Link'} <ExternalLink size={14} />
                </button>
              )}
              {isAd && d.phone_number && (() => {
                let cleanPhone = d.phone_number ? d.phone_number.toString().replace(/\D/g, '') : '';
                if (cleanPhone.startsWith('0')) {
                    cleanPhone = '233' + cleanPhone.slice(1);
                } else if (!cleanPhone.startsWith('233') && cleanPhone.length === 9) {
                    cleanPhone = '233' + cleanPhone;
                }
                return (
                  <button 
                    onClick={() => window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello! I saw your listing for "${d.title}" on the UCC Campus Guide app and I'm interested in finding out more.`)}`, '_blank')}
                    className="flex-1 bg-[#25D366] text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    WhatsApp
                  </button>

                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
