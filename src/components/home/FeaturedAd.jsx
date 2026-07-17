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
      <div className="bg-white rounded-[28px] p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 max-w-sm flex flex-col gap-3">
        {imgSrc && (
          <div className="rounded-2xl overflow-hidden bg-gray-50/50">
            <img src={imgSrc} alt={d.title} className="w-full h-auto object-contain max-h-[600px]" />
          </div>
        )}
        <div className="flex flex-col gap-3 px-1 pb-1">
          <span className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-gray-200 text-gray-900 bg-gray-100">
            {isAd ? 'SPONSORED' : 'OFFICIAL'}
          </span>
          <h4 className="text-base font-bold text-gray-900">{d.title}</h4>
          <p className={`text-sm text-gray-500 leading-relaxed whitespace-pre-wrap ${!isFeaturedExpanded ? 'line-clamp-3' : ''}`}>
            {d.description || d.content}
          </p>
          <div className="flex items-center justify-between mt-1">
            <button
              onClick={() => setIsFeaturedExpanded(!isFeaturedExpanded)}
              className="text-[13px] font-bold text-gray-900 flex items-center gap-1 active:opacity-70"
            >
              {isFeaturedExpanded ? 'Show less' : 'Read more'} <ChevronRight size={14} className={isFeaturedExpanded ? 'rotate-90 transition-transform' : 'transition-transform'} />
            </button>
            {link && (
              <button
                onClick={() => window.open(link, '_blank')}
                className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-[20px] active:scale-[0.98] transition-all"
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
