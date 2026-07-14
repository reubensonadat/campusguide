import React from 'react';
import { X } from 'lucide-react';
import ModalPortal from '../common/ModalPortal';

const ChangePinModal = ({ isOpen, onClose, newPin, onPinChange, onSubmit, isUpdating }) => {
  if (!isOpen) return null;

  return (
    <ModalPortal>
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-8 duration-300 p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h2 className="text-lg font-black text-gray-900 pl-2">Change Recovery PIN</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-sm text-gray-500">Enter a new 6-digit PIN to secure your data recoveries.</p>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">New 6-Digit PIN</label>
            <input type="password" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={newPin}
              onChange={e => onPinChange(e.target.value.replace(/[^0-9]/g, ''))} placeholder="••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-2xl tracking-[0.5em] text-center font-bold focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
          </div>
          <div className="pt-4">
            <button type="submit" disabled={isUpdating || newPin.length < 6}
              className="w-full py-4 text-base font-bold bg-gray-900 text-white hover:bg-gray-900 rounded-xl active:scale-95 transition-all disabled:bg-gray-100 disabled:text-gray-400">
              {isUpdating ? 'Updating...' : 'Update PIN'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </ModalPortal>
  );
};

export default ChangePinModal;
