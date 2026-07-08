import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const FeaturedAd = ({ isDeferredActive, featuredContent }) => {
  const [isFeaturedExpanded, setIsFeaturedExpanded] = useState(false);

  if (!isDeferredActive) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-16 animate-pulse flex items-center justify-between">
        <div className="h-3 bg-gray-200/50 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200/40 rounded w-16"></div>
      </div>
    );
  }
  if (!featuredContent) return null;

  const isAd = featuredContent.kind === 'ad';
  const d = featuredContent.data;
  const imgSrc = isAd ? d.image_url : d.flyer_url;

  let actionText = '';
  let link = '';

  if (isAd) {
    let cleanPhone = d.phone_number ? d.phone_number.toString().replace(/\D/g, '') : '';
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '233' + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith('233') && cleanPhone.length === 9) {
      cleanPhone = '233' + cleanPhone;
    }
    if (d.contact_method === 'link' && d.contact_url) {
      actionText = d.action_text || 'Visit Link';
      link = d.contact_url;
    } else if (d.contact_method === 'phone' && cleanPhone) {
      actionText = d.action_text || 'Call Now';
      link = `tel:+${cleanPhone}`;
    } else if (cleanPhone) {
      actionText = d.action_text || 'Message via WhatsApp';
      link = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello! I saw your advertisement for "${d.title}" on the UCC Campus Guide app and I'm interested in finding out more.`)}`;
    }
  } else {
    actionText = d.action_text || 'Visit Link';
    link = d.action_link || '';
  }

  return (
    <div className="pt-2">
      <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">
        {isAd ? 'Advertisement' : 'Announcement'}
      </h3>
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden max-w-sm">
        {imgSrc && (
          <img src={imgSrc} alt={d.title} className="w-full h-auto object-contain max-h-[600px] bg-gray-50/50" />
        )}
        <div className="p-5">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xl mb-2 text-gray-900 bg-gray-900/10">
            {isAd ? 'SPONSORED' : 'OFFICIAL'}
          </span>
          <h4 className="text-base font-bold text-gray-900 mb-1">{d.title}</h4>
          <p className={`text-sm text-gray-500 font-medium mb-4 whitespace-pre-wrap ${!isFeaturedExpanded ? 'line-clamp-3' : ''}`}>
            {d.description || d.content}
          </p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsFeaturedExpanded(!isFeaturedExpanded)}
              className="text-[13px] font-bold text-gray-900 flex items-center gap-1 active:opacity-70"
            >
              {isFeaturedExpanded ? 'Show less' : 'Read more'} <ChevronRight size={14} className={isFeaturedExpanded ? 'rotate-90 transition-transform' : 'transition-transform'} />
            </button>
            {link && (
              <button
                onClick={() => window.open(link, '_blank')}
                className="bg-gray-900 hover:bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl active:scale-95 transition-all shadow-sm"
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAd;
