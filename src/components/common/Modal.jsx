// src/components/common/Modal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
  noPadding = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg md:max-w-xl lg:max-w-2xl',
    xl: 'sm:max-w-xl md:max-w-2xl lg:max-w-4xl',
    '2xl': 'sm:max-w-2xl md:max-w-4xl lg:max-w-6xl',
    full: 'sm:max-w-[95vw] md:max-w-[90vw]'
  };
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      window.__modalScrollY = scrollY;
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      const sy = window.__modalScrollY || 0;
      window.__modalScrollY = undefined;
      window.scrollTo(0, sy);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    // Reset position when modal opens
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick && !isDragging) {
      onClose();
    }
  };

  const handleMouseDown = (e) => {
    // Allow dragging from header OR a custom drag handle
    const isHeader = headerRef.current && headerRef.current.contains(e.target);
    const isCustomHandle = e.target.closest('.modal-drag-handle');
    
    if (isHeader || isCustomHandle) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      
      // Prevent text selection while dragging
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newY = e.clientY - dragStart.y;
      // Only allow dragging downwards for swipe-to-close, or slightly upwards
      setPosition({
        x: e.clientX - dragStart.x,
        y: Math.max(-50, newY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // If dragged down significantly, close the modal
    if (position.y > 150) {
      onClose();
    } else {
      // Otherwise snap back
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center modal-backdrop p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`modal-content bg-white w-full sm:w-[90vw] ${sizeClass} max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 pb-[env(safe-area-inset-bottom)] ${className}`}
        style={{
          position: 'relative',
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          cursor: isDragging ? 'grabbing' : 'auto'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onMouseDown={handleMouseDown}
      >
        {title && (
          <div 
            ref={headerRef}
            className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0 cursor-move select-none"
          >
            <h2 id="modal-title" className="text-lg font-black text-gray-900 px-2">
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        <div className={`flex-1 overflow-y-auto ${noPadding ? '' : 'p-4 pb-6'}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export { Modal };
export default Modal;