import React from 'react';
import { Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const GpaVaultLock = ({ isGpaLocked, gpaPin, isUnlocked, setIsUnlocked }) => {
  const [unlockPinInput, setUnlockPinInput] = React.useState('');
  const pinInputRef = React.useRef(null);

  const handlePinChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 6) {
      setUnlockPinInput(val);
      if (val.length === 6) {
        if (val === gpaPin) {
          setIsUnlocked(true);
          setUnlockPinInput('');
          toast.success('GPA Vault Unlocked!');
        } else {
          toast.error('Incorrect PIN. Access Denied.');
          setUnlockPinInput('');
        }
      }
    }
  };

  if (!(isGpaLocked && gpaPin && !isUnlocked)) return null;

  return (
    <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-xl flex flex-col items-center justify-start pt-20 px-6 min-h-[500px]"
      onClick={() => pinInputRef.current?.focus()}>
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl max-w-sm w-full text-center space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}>
        <div className="w-16 h-16 rounded-2xl bg-gray-900/5 flex items-center justify-center mx-auto text-gray-900">
          <Lock size={28} className="animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">GPA Vault Locked</h2>
          <p className="text-sm text-gray-500 font-medium mt-2 leading-relaxed">Enter your 6-digit PIN to access your GPA forecasts and scores.</p>
        </div>
        <div className="relative flex justify-center items-center gap-3 py-2 cursor-pointer"
          onClick={() => pinInputRef.current?.focus()}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${unlockPinInput.length > idx ? 'border-gray-900 bg-gray-900/5' : 'border-gray-200 bg-gray-50'}`}>
              {unlockPinInput.length > idx && <div className="w-3.5 h-3.5 rounded-full bg-gray-900 animate-in zoom-in duration-100" />}
            </div>
          ))}
          <input ref={pinInputRef} type="password" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={unlockPinInput} onChange={handlePinChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" autoFocus />
        </div>
      </div>
    </div>
  );
};

export default GpaVaultLock;
