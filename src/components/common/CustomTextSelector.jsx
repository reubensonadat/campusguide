import React, { useState, useEffect } from 'react';
import { Copy, Search, Share2, X, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { triggerHaptic } from '../../utils/haptics';
import { useNavigate } from 'react-router-dom';

export default function CustomTextSelector() {
  const [menu, setMenu] = useState(null); // { text, x, y }
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let pressTimer = null;
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;

      const target = e.target;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable || target?.closest('.no-custom-select');
      if (isInput) return;

      pressTimer = setTimeout(() => {
        // Trigger custom selector on long press (400ms)
        const selectedText = window.getSelection()?.toString()?.trim() || target?.innerText?.slice(0, 120)?.trim();
        if (selectedText) {
          triggerHaptic(40);
          setMenu({
            text: selectedText,
            x: Math.min(Math.max(startX, 110), window.innerWidth - 110),
            y: Math.max(startY - 65, 70)
          });
        }
      }, 450);
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (Math.abs(touch.clientX - startX) > 10 || Math.abs(touch.clientY - startY) > 10) {
        if (pressTimer) clearTimeout(pressTimer);
      }
    };

    const handleTouchEnd = () => {
      if (pressTimer) clearTimeout(pressTimer);
    };

    const handleContextMenu = (e) => {
      const target = e.target;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if (!isInput) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('contextmenu', handleContextMenu, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  if (!menu) return null;

  const handleCopy = () => {
    if (menu.text) {
      navigator.clipboard.writeText(menu.text);
      triggerHaptic();
      setCopied(true);
      toast.success('Text copied!');
      setTimeout(() => {
        setCopied(false);
        setMenu(null);
      }, 800);
    }
  };

  const handleSearch = () => {
    triggerHaptic();
    setMenu(null);
    navigate(`/guide?q=${encodeURIComponent(menu.text)}`);
  };

  const handleShare = async () => {
    triggerHaptic();
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Campus Guide', text: menu.text });
      } catch {}
    } else {
      handleCopy();
    }
    setMenu(null);
  };

  return (
    <>
      <div className="fixed inset-0 z-[99990]" onClick={() => setMenu(null)} />
      <div
        className="fixed z-[99999] -translate-x-1/2 bg-gray-900/95 text-white backdrop-blur-md rounded-2xl px-2 py-1.5 shadow-2xl border border-white/10 flex items-center gap-1 text-xs font-bold animate-in zoom-in-95 duration-150 select-none"
        style={{ left: `${menu.x}px`, top: `${menu.y}px` }}
      >
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors text-white active:scale-95"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        <div className="w-[1px] h-4 bg-white/20" />
        <button
          onClick={handleSearch}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors text-white active:scale-95"
        >
          <Search size={14} />
          <span>Search</span>
        </button>
        <div className="w-[1px] h-4 bg-white/20" />
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors text-white active:scale-95"
        >
          <Share2 size={14} />
          <span>Share</span>
        </button>
        <button
          onClick={() => setMenu(null)}
          className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors ml-1"
        >
          <X size={14} />
        </button>
      </div>
    </>
  );
}
