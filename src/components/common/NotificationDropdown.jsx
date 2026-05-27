import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Bell, BellOff, Megaphone, MessageCircle,
  ShoppingBag, X, ChevronRight, Check, CheckCheck,
  Loader2
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

// ─── Type config ─────────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  announcement: { label: 'ANNOUNCEMENT', Icon: Megaphone, color: 'text-[#002F45]', bg: 'bg-[#002F45]/10' },
  whisper: { label: 'WHISPER', Icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
  thrift: { label: 'THRIFT', Icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTimeAgo(ts) {
  if (!ts) return '';
  const diff = (Date.now() - new Date(ts)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Community item card ─────────────────────────────────────────────────────
const CommunityCard = ({ item, onMarkRead, onNavigate, isRead }) => {
  const cfg = TYPE_CONFIG[item.updateType] ?? TYPE_CONFIG.announcement;
  const Icon = cfg.Icon;

  const handleClick = () => {
    onMarkRead(item.id);
    const tab =
      item.updateType === 'whisper' ? 'whispers' :
        item.updateType === 'thrift' ? 'thrift' : 'announcements';
    onNavigate(tab);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-3 rounded-xl flex gap-3 items-start cursor-pointer transition-colors group ${isRead ? 'bg-gray-50/60 hover:bg-gray-100/60' : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-sm'
        }`}
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
        <Icon size={15} className={cfg.color} />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-[9px] font-black tracking-widest uppercase ${cfg.color}`}>
          {cfg.label}
        </span>
        <p className={`text-sm font-bold line-clamp-1 mt-0.5 ${isRead ? 'text-gray-500' : 'text-gray-900'}`}>
          {item.title || item.item_name ||
            (item.updateType === 'whisper' ? 'Campus Whisper' : 'New Update')}
        </p>
        <p className={`text-xs font-medium line-clamp-2 mt-0.5 leading-snug ${isRead ? 'text-gray-400' : 'text-gray-500'}`}>
          {item.description || item.content || item.text || ''}
        </p>
        <p className="text-[10px] text-gray-400 font-medium mt-1">
          {formatTimeAgo(item.created_at)}
        </p>
      </div>
      {/* Unread dot indicator */}
      {!isRead && (
        <span className="w-2 h-2 bg-[#002F45] rounded-full shrink-0 mt-2" />
      )}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
const NotificationDropdown = ({
  isOpen,
  onClose,
  unreadItems = [],
  readItems = [],
  fetchStatus = 'idle',
  notificationsEnabled = true,
  onMarkItemRead,
  onMarkAllRead,
  onNavigate,
}) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { notifications, markAsRead, removeNotification } = useNotifications();

  // Position the dropdown below the bell icon
  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return;
    const anchor =
      document.getElementById('bell-anchor-mobile') ||
      document.getElementById('bell-anchor-desktop');
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const el = dropdownRef.current;
    const W = 320;
    let left = rect.left + rect.width / 2 - W / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - W - 12));

    el.style.top = `${rect.bottom + 8}px`;
    el.style.left = `${left}px`;
    el.style.width = `${W}px`;
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Muted state ──
  if (!notificationsEnabled) {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[9998]" onClick={onClose} />
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ maxHeight: '75vh' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-[#002F45]" />
              <span className="text-sm font-black text-gray-900">Notifications</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Muted empty state */}
          <div className="flex flex-col items-center py-10 text-center px-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <BellOff size={22} className="text-gray-300" />
            </div>
            <p className="text-sm font-bold text-gray-900">Notifications are muted</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              Enable notifications in your Profile settings to see updates here.
            </p>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-3 py-2 shrink-0">
            <button
              onClick={() => { onNavigate?.('announcements'); }}
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
  }

  // ── Determine if we have any content at all ──
  const hasUnread = unreadItems.length > 0;
  const hasRead = readItems.length > 0;
  const hasInApp = notifications.length > 0;
  const isLoading = fetchStatus === 'loading' && unreadItems.length === 0 && readItems.length === 0;

  return createPortal(
    <>
      {/* Transparent full-screen backdrop — click to close */}
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />

      {/* Dropdown panel */}
      <div
        ref={dropdownRef}
        className="fixed z-[9999] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
        style={{ maxHeight: '75vh' }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-[#002F45]" />
            <span className="text-sm font-black text-gray-900">Notifications</span>
          </div>
          <div className="flex items-center gap-2">
            {hasUnread && unreadItems.length > 1 && (
              <button
                onClick={() => onMarkAllRead?.()}
                className="flex items-center gap-1 text-[11px] font-bold text-[#002F45]/70 hover:text-emerald-600 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
              >
                <CheckCheck size={13} /> Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0">

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center py-10 text-center">
              <Loader2 size={24} className="text-gray-300 animate-spin mb-3" />
              <p className="text-xs text-gray-400 font-medium">Loading notifications...</p>
            </div>
          )}

          {/* Error state (only shown if no data at all) */}
          {fetchStatus === 'error' && !hasUnread && !hasRead && (
            <div className="flex flex-col items-center py-8 text-center px-6">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-3">
                <Bell size={18} className="text-red-300" />
              </div>
              <p className="text-sm font-bold text-gray-900">Couldn't load updates</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                Check your connection and try again.
              </p>
            </div>
          )}

          {/* ── UNREAD SECTION ── */}
          {!isLoading && hasUnread && (
            <div className="px-3 pt-3 pb-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">New</span>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#002F45] text-white text-[9px] font-bold">
                    {unreadItems.length}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {unreadItems.map(item => (
                  <CommunityCard
                    key={item.id}
                    item={item}
                    isRead={false}
                    onMarkRead={onMarkItemRead}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── EMPTY / CAUGHT UP STATE ── */}
          {!isLoading && !hasUnread && fetchStatus !== 'error' && (
            <div className="flex flex-col items-center py-6 text-center px-6">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2">
                <Check size={18} className="text-green-400" />
              </div>
              <p className="text-sm font-bold text-gray-900">You're all caught up! 🎉</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">
                No new notifications right now.
              </p>
            </div>
          )}

          {/* ── READ SECTION ── */}
          {!isLoading && hasRead && (
            <div className="px-3 pt-2 pb-1">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[10px] font-black tracking-widest uppercase text-gray-300">Recent Notifications</span>
              </div>
              <div className="flex flex-col gap-1 opacity-50">
                {readItems.slice(0, 5).map(item => (
                  <CommunityCard
                    key={item.id}
                    item={item}
                    isRead={true}
                    onMarkRead={onMarkItemRead}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── IN-APP NOTIFICATIONS (class reminders, budget alerts, etc.) ── */}
          {hasInApp && (
            <div className="px-3 pt-2 pb-1">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">App Reminders</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {notifications.map(notif => {
                  // Type-specific colors: brand=class, red=budget, green=payday
                  const notifStyles = notif.isRead
                    ? { card: 'bg-white hover:bg-gray-50', iconBg: 'bg-gray-100', iconColor: 'text-gray-400' }
                    : notif.type === 'budget'
                      ? { card: 'bg-red-50 hover:bg-red-100/70', iconBg: 'bg-red-100', iconColor: 'text-red-600' }
                      : notif.type === 'payday'
                        ? { card: 'bg-green-50 hover:bg-green-100/70', iconBg: 'bg-green-100', iconColor: 'text-green-600' }
                        : { card: 'bg-[#002F45]/5 hover:bg-[#002F45]/10', iconBg: 'bg-[#002F45]/10', iconColor: 'text-[#002F45]' };

                  return (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markAsRead(notif.id);
                        if (notif.type === 'class') navigate('/tools?tab=timetable');
                        else if (notif.type === 'budget' || notif.type === 'payday') navigate('/tools?tab=budget');
                        onClose();
                      }}
                      className={`p-3 rounded-xl flex gap-3 items-start cursor-pointer transition-colors group ${notifStyles.card}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${notifStyles.iconBg}`}>
                        <Bell size={14} className={notifStyles.iconColor} />
                      </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-bold line-clamp-1 ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap shrink-0 mt-0.5">
                          {formatTimeAgo(notif.timestamp)}
                        </span>
                      </div>
                      <p className={`text-xs font-medium line-clamp-2 mt-0.5 leading-snug ${notif.isRead ? 'text-gray-400' : 'text-gray-600'}`}>
                        {notif.message}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-all shrink-0 rounded-full mt-0.5"
                    >
                      <X size={13} />
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div className="border-t border-gray-100 px-3 py-2 shrink-0">
          <button
            onClick={() => { onNavigate?.('announcements'); }}
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
