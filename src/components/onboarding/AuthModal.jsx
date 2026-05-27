import React, { useState, useEffect } from 'react';
import { secureDevice, restoreLifecycle, getCurrentUser } from '../../services/authService';
import { supabase } from '../../lib/supabase';
import { Lock, RefreshCw, AlertCircle, X } from 'lucide-react';
import { restoreFromCloud, markDeviceAsLinked } from '../../services/syncService';
import { toast } from 'react-hot-toast';
import { DataLoader } from '../common/CustomLoaders';

// Global event to trigger the auth sheet from anywhere
export const triggerAuthSheet = (onSuccessCallback) => {
  window.dispatchEvent(new CustomEvent('open-auth-sheet', { detail: { onSuccessCallback } }));
};

export const AuthBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('register'); // 'register' | 'restore'
  const [deviceId, setDeviceId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const handleOpen = async (e) => {
      const user = await getCurrentUser();
      if (user) {
        // If already secured, just run the action instantly
        if (e.detail?.onSuccessCallback) e.detail.onSuccessCallback();
        return;
      }

      // Set the pending action to resume after auth
      if (e.detail?.onSuccessCallback) setPendingAction(() => e.detail.onSuccessCallback);

      // Prepare Device ID
      let localId = localStorage.getItem('ucc_device_id') || localStorage.getItem('device_id');
      if (!localId) {
        const hex = Array.from(crypto.getRandomValues(new Uint8Array(4)))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase();
        localId = `UCC-${hex}`;
        localStorage.setItem('ucc_device_id', localId);
      }
      setDeviceId(localId);
      setIsOpen(true);
    };

    window.addEventListener('open-auth-sheet', handleOpen);
    return () => window.removeEventListener('open-auth-sheet', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (pin.length !== 6 || !/^\d+$/.test(pin)) {
      setError('PIN must be exactly 6 digits.');
      return;
    }

    setLoading(true);

    if (mode === 'register') {
      const { success, error: authError } = await secureDevice(deviceId, pin);
      if (!success) {
        setError(authError || 'Failed to secure device.');
        setLoading(false);
        return;
      }
      toast.success('Device secured! Your data is now protected.');
    } else {
      if (!deviceId) {
        setError('Device ID is required to restore.');
        setLoading(false);
        return;
      }
      const { success, error: authError } = await restoreLifecycle(deviceId, pin);
      if (!success) {
        setError('Invalid Device ID or PIN. Could not restore data.');
        setLoading(false);
        return;
      }
      // Pull cloud data into local storage
      const restoreToast = toast.loading('Syncing your data from cloud...');
      const result = await restoreFromCloud();
      if (result.success) {
        markDeviceAsLinked(); // This device is now in sync with the original
        toast.success('Data synced successfully! Welcome back.', { id: restoreToast });
      } else {
        toast.error('Signed in, but no cloud data was found.', { id: restoreToast });
      }
    }
    
    setLoading(false);
    setIsOpen(false);
    
    // Execute the action the user was originally trying to do!
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col justify-end bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full bg-white rounded-t-[2rem] shadow-2xl p-6 md:p-8 animate-in slide-in-from-bottom duration-500 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-2">
          <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center">
            {mode === 'register' ? <Lock size={28} strokeWidth={2.5} /> : <RefreshCw size={28} strokeWidth={2.5} />}
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-4 mb-2">
          {mode === 'register' ? 'Secure Your Data' : 'Restore Data'}
        </h2>
        <p className="text-gray-500 font-medium mb-8 leading-relaxed">
          {mode === 'register' 
            ? 'To save your information, please secure your device with a 6-digit PIN. You will use this PIN if you ever lose your phone.' 
            : 'Enter your old Device ID and your 6-digit PIN to download your saved data to this phone.'}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3 text-sm font-medium">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Your Device ID</label>
            <input
              type="text"
              value={deviceId}
              onChange={(e) => mode === 'restore' && setDeviceId(e.target.value.toUpperCase())}
              readOnly={mode === 'register'}
              className={`w-full px-4 py-4 rounded-2xl border-2 ${mode === 'register' ? 'bg-gray-50 border-gray-100 text-gray-500' : 'bg-white border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50'} outline-none font-mono text-center font-bold tracking-wider uppercase transition-all`}
              placeholder="UCC-XXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">6-Digit PIN</label>
            <div className="relative">
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-4 pl-12 rounded-2xl border-2 bg-white border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50 outline-none font-bold tracking-[0.5em] text-2xl transition-all"
                placeholder="••••••"
              />
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400">
                <Lock size={22} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || pin.length !== 6 || (mode === 'restore' && !deviceId)}
            className="w-full py-4 mt-4 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 text-white rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <DataLoader className="w-6 h-6 text-white" />
            ) : (
              mode === 'register' ? 'Secure & Continue' : 'Restore & Continue'
            )}
          </button>
        </form>

        <div className="mt-8 text-center pb-4">
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'register' ? 'restore' : 'register');
              setError('');
              setPin('');
              if (mode === 'restore') {
                setDeviceId(localStorage.getItem('ucc_device_id') || '');
              } else {
                setDeviceId('');
              }
            }}
            className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
          >
            {mode === 'register' 
              ? 'Already have an ID? Restore Data' 
              : 'Create a new Device ID instead'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthBottomSheet;
