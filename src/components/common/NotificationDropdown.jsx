import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BellOff, Book, Wallet, DollarSign, Calendar, X, Check, Trash2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

// Helper to format timestamps
const formatTimeAgo = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / 60000);
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
};

const getIconForType = (type) => {
  switch (type) {
    case 'class': return <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0"><Book size={14} className="text-blue-500" /></div>;
    case 'budget': return <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0"><Wallet size={14} className="text-red-500" /></div>;
    case 'payday': return <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0"><DollarSign size={14} className="text-green-500" /></div>;
    case 'community': return <div className="w-8 h-8 rounded-full bg-[#002F45]/10 flex items-center justify-center shrink-0"><Calendar size={14} className="text-[#002F45]" /></div>;
    default: return <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0"><BellOff size={14} className="text-gray-500" /></div>;
  }
};

const NotificationDropdown = ({ isOpen, onClose, update, onSeeMore, onDismissUpdate }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isDismissed, setIsDismissed] = useState(false);
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();
  const navigate = useNavigate();

  // Reset local dismissed state every time the dropdown opens
  useEffect(() => {
    if (isOpen) setIsDismissed(false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const mobileAnchor = document.getElementById('bell-anchor-mobile');
      const desktopAnchor = document.getElementById('bell-anchor-desktop');

      let activeAnchor = null;
      if (mobileAnchor && mobileAnchor.getBoundingClientRect().width > 0) {
        activeAnchor = mobileAnchor;
      } else if (desktopAnchor && desktopAnchor.getBoundingClientRect().width > 0) {
        activeAnchor = desktopAnchor;
      }

      if (activeAnchor) {
        const rect = activeAnchor.getBoundingClientRect();
        const dropdownWidth = 320; // Slightly wider for better text layout
        const gap = 8; 
        
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
  }, [isOpen]);

  if (!isOpen) return null;

  const showUpdate = update && !isDismissed;
  const hasContent = showUpdate || notifications.length > 0;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} style={{ background: 'transparent' }} />
      
      <div 
        className="fixed w-80 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 z-[9999] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col max-h-[80vh]"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <h3 className="font-bold text-gray-900">Notifications</h3>
          {notifications.length > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs font-bold text-[#002F45] hover:text-[#001a26]"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Scrollable List */}
        <div className="overflow-y-auto overflow-x-hidden p-2 flex flex-col gap-1 hide-scrollbar">
          {/* External Community Update */}
          {showUpdate && (
            <div 
              onClick={() => {
                let tab = 'announcements';
                if (update.updateType === 'whisper') tab = 'whispers';
                if (update.updateType === 'thrift') tab = 'thrift';
                navigate(`/community?tab=${tab}`);
                onClose();
              }}
              className="relative p-3 rounded-xl bg-[#002F45]/5 flex flex-col gap-2 border border-[#002F45]/10 cursor-pointer hover:bg-[#002F45]/10 transition-colors"
            >
              <div className="flex gap-3 items-start">
                {getIconForType('community')}
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-black tracking-widest uppercase mb-1 text-[#002F45]">
                    {update.updateType === 'announcement' ? 'ANNOUNCEMENT' : update.updateType === 'whisper' ? 'WHISPER' : 'THRIFT'}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 mb-0.5 line-clamp-1">
                    {update.title || update.item_name || (update.updateType === 'whisper' ? 'Campus Whisper' : 'New Update')}
                  </h4>
                  <p className="text-xs text-gray-600 font-medium line-clamp-2 leading-snug">
                    {update.description || update.content || update.text || ''}
                  </p>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDismissed(true);  // immediately hide in UI
                  if (onDismissUpdate) onDismissUpdate();  // persist to localStorage
                }}
                className="self-end text-[11px] font-bold text-[#002F45]/60 hover:text-red-500 bg-white border border-[#002F45]/15 px-3 py-1 rounded-full transition-colors"
              >
                Mark as read
              </button>
            </div>
          )}

          {/* Internal App Notifications */}
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => {
                  markAsRead(notif.id);
                  if (notif.type === 'class') {
                    navigate('/tools?tab=timetable');
                  } else if (notif.type === 'budget' || notif.type === 'payday') {
                    navigate('/tools?tab=budget');
                  }
                  onClose();
                }}
                className={`p-3 rounded-xl flex gap-3 items-start transition-colors group cursor-pointer ${notif.isRead ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'}`}
              >
                {getIconForType(notif.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <h4 className={`text-sm font-bold line-clamp-1 ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap shrink-0 mt-0.5">
                      {formatTimeAgo(notif.timestamp)}
                    </span>
                  </div>
                  <p className={`text-xs font-medium line-clamp-2 leading-snug ${notif.isRead ? 'text-gray-500' : 'text-gray-600'}`}>
                    {notif.message}
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          ) : (
            !showUpdate && (
              <div className="flex flex-col items-center py-6 text-center">
                <BellOff size={24} className="text-gray-300 mb-2" />
                <p className="text-sm font-bold text-gray-900">You're all caught up! 🎉</p>
                <p className="text-xs text-gray-500 mt-1 font-medium px-4">You have no new alerts or classes coming up right now.</p>
              </div>
            )
          )}
        </div>

        {/* Footer with See More link */}
        <div className="border-t border-gray-100 bg-white p-2 shrink-0">
          <button
            onClick={() => {
              if (onSeeMore) onSeeMore();
              onClose();
            }}
            className="w-full text-left text-xs font-bold text-[#002F45] hover:text-[#001a26] p-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-between group"
          >
            Go to Community Hub
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default NotificationDropdown;