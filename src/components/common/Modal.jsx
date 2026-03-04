// src/components/common/Modal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = ''
}) => {
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
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
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
    // Only allow dragging from header
    if (headerRef.current && headerRef.current.contains(e.target)) {
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
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center modal-backdrop p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`modal-content bg-white rounded-lg shadow-xl w-[90vw] max-h-[90vh] flex flex-col ${className}`}
        style={{
          position: 'relative',
          transform: `translate(${position.x}px, ${position.y}px)`,
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
            className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 cursor-move select-none"
          >
            <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 focus:outline-none"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto p-4 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export { Modal };
export default Modal;