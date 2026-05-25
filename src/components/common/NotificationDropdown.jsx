import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, BellOff } from 'lucide-react';

const NotificationDropdown = ({ isOpen, onClose, announcement, onSeeMore }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
    if (isOpen) {
      // 1. Find both anchors
      const mobileAnchor = document.getElementById('bell-anchor-mobile');
      const desktopAnchor = document.getElementById('bell-anchor-desktop');

      // 2. Figure out which one is actually visible on the screen right now
      // (Hidden elements via display:none have a width of 0)
      let activeAnchor = null;
      if (mobileAnchor && mobileAnchor.getBoundingClientRect().width > 0) {
        activeAnchor = mobileAnchor;
      } else if (desktopAnchor && desktopAnchor.getBoundingClientRect().width > 0) {
        activeAnchor = desktopAnchor;
      }

      if (activeAnchor) {
        const rect = activeAnchor.getBoundingClientRect();
        const dropdownWidth = 288; // w-72 in Tailwind
        const gap = 8; 
        
        // Center it under the bell, but prevent it from overflowing off the right edge of the screen
        let calculatedLeft = rect.left + (rect.width / 2) - (dropdownWidth / 2);
        if (calculatedLeft + dropdownWidth > window.innerWidth - 16) {
          calculatedLeft = window.innerWidth - dropdownWidth - 16;
        }
        if (calculatedLeft < 16) {
          calculatedLeft = 16;
        }

        setPosition({
          top: rect.bottom + gap,
          left: calculatedLeft,
        });
      }
    }
  }, [isOpen]); // Recalculate every time it opens

  if (!isOpen) return null;

  // TELEPORTATION: Render this UI directly to the <body> tag, bypassing all parent CSS rules
  return createPortal(
    <>
      {/* Invisible fullscreen overlay to detect clicks outside */}
      <div className="fixed inset-0 z-[9998]" onClick={onClose} style={{ background: 'transparent' }} />
      
      {/* The actual floating dropdown panel */}
      <div 
        className="fixed w-72 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 z-[9999] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        
        <div className="p-4">
          {announcement ? (
            <div>
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xl mb-2 text-[#002F45] bg-[#002F45]/10">
                NEW
              </span>
              <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{announcement.title}</h4>
              <p className="text-xs text-gray-500 font-medium line-clamp-3">
                {announcement.description || announcement.content}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-2 text-center">
              <BellOff size={24} className="text-gray-300 mb-2" />
              <p className="text-sm font-bold text-gray-900">You're all caught up! 🎉</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">No new announcements right now.</p>
            </div>
          )}
        </div>

        {/* Footer with See More link */}
        <div className="border-t border-gray-50 bg-gray-50/50 p-2">
          <button
            onClick={onSeeMore}
            className="w-full text-left text-xs font-bold text-[#002F45] hover:text-[#001a26] p-2 rounded-xl hover:bg-white transition-colors flex items-center justify-between group"
          >
            See all updates
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </>,
    document.body // The destination of the teleportation
  );
};

export default NotificationDropdown;