import React from 'react';
import { X, Lock } from 'lucide-react';

const GpaLockModal = ({ isOpen, onClose, mode, pinInput, pinConfirmInput, onInputChange, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-900 px-2 flex items-center gap-2">
            <Lock size={18} className="text-gray-900" />
            {mode === 'setup' && 'Set GPA Vault PIN'}
            {mode === 'confirm' && 'Confirm PIN'}
            {mode === 'deactivate' && 'Disable GPA Lock'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            {mode === 'setup' && 'Create a 6-digit passcode to secure your private GPA data.'}
            {mode === 'confirm' && 'Please re-enter your 6-digit passcode to confirm.'}
            {mode === 'deactivate' && 'Enter your current 6-digit passcode to disable the vault lock.'}
          </p>
          <input type="password" inputMode="numeric" pattern="[0-9]*" value={mode === 'confirm' ? pinConfirmInput : pinInput}
            onChange={e => onInputChange(mode === 'confirm' ? 'confirm' : 'input', e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="••••••" maxLength={6} autoFocus required
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all placeholder:text-gray-300 placeholder:tracking-normal text-center" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition-colors active:scale-95 text-sm">Cancel</button>
            <button type="submit" disabled={(mode === 'confirm' ? pinConfirmInput : pinInput).length < 6}
              className="flex-1 bg-gray-900 hover:bg-gray-900 text-white py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm">
              {mode === 'setup' && 'Next'}
              {mode === 'confirm' && 'Confirm & Lock'}
              {mode === 'deactivate' && 'Deactivate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GpaLockModal;
