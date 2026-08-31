import React, { useState } from 'react';
import { Fingerprint, Copy, Check, Cloud, RefreshCw, ChevronDown } from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';

const BackupRestoreSection = ({ deviceId, copiedId, onCopyId, timeSinceLastSync, restoreId, onRestoreIdChange, restorePin, onRestorePinChange, isRestoring, onRestore, isResyncing, onBackup, onResync, campusPrefix = 'UCC' }) => {
  const [prefix, setPrefix] = useState(campusPrefix);

  const fullRestoreId = restoreId.trim() ? `${prefix}-${restoreId.trim()}` : '';

  return (
  <div className="space-y-4">
    <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Backup & Cloud Sync</h2>

    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gray-900/10 flex items-center justify-center flex-shrink-0">
          <Fingerprint size={20} className="text-gray-900" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Unique App ID</p>
          <div className="flex items-center gap-2 mt-1">
            <code className="text-sm font-black text-gray-900 tracking-wider">{deviceId}</code>
            <button onClick={onCopyId} className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-gray-900 transition-colors active:scale-95" title="Copy ID">
              {copiedId ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <Cloud size={14} className={timeSinceLastSync ? 'text-green-500' : 'text-gray-300'} />
        <span>{timeSinceLastSync ? `Last synced ${timeSinceLastSync}` : 'Not synced yet — will sync automatically'}</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <button onClick={onBackup} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-900/5 border border-gray-900/10 text-gray-900 font-bold text-xs hover:bg-gray-900/10 transition-all active:scale-95">
        <Cloud size={14} /> Backup Now
      </button>
      <button onClick={onResync} disabled={isResyncing}
        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all active:scale-95 ${isResyncing ? 'bg-gray-100 text-gray-400' : 'bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100'}`}>
        {isResyncing ? <RefreshCw size={14} className="animate-spin" /> : <RefreshCw size={14} />}
        {isResyncing ? 'Syncing...' : 'Re-sync from Cloud'}
      </button>
    </div>

    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <p className="text-sm font-bold text-gray-900 mb-1">Restore from another device</p>
      <p className="text-xs text-gray-400 font-medium mb-3">Pick your campus, then type the code after the dash.</p>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-gray-900/20 focus-within:border-gray-900 transition-all">
          <div className="relative flex-shrink-0 bg-gray-50 border-r border-gray-200 rounded-l-xl">
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="appearance-none bg-transparent pl-3 pr-7 py-3 font-bold text-xs text-gray-700 outline-none cursor-pointer"
            >
              {CAMPUSES.map(c => (
                <option key={c.id} value={c.shortName}>{c.shortName}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <span className="text-gray-400 font-bold text-xs px-2 select-none">-</span>
          <input
            type="text"
            value={restoreId}
            onChange={e => onRestoreIdChange(e.target.value)}
            placeholder="DEBC4A8F"
            className="flex-1 px-2 py-3 bg-white outline-none font-bold text-xs tracking-wider placeholder:text-gray-300 placeholder:tracking-normal rounded-r-xl"
          />
        </div>
        <input type="password" inputMode="numeric" pattern="[0-9]*" value={restorePin} onChange={e => onRestorePinChange(e.target.value.replace(/[^0-9]/g, ''))} placeholder="6-Digit PIN"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all placeholder:text-gray-300 placeholder:tracking-normal text-center" maxLength={6} />
        <button onClick={() => onRestore(fullRestoreId)} disabled={isRestoring || !restoreId.trim() || restorePin.length < 6}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${isRestoring ? 'bg-gray-100 text-gray-400' : 'bg-gray-900 text-white hover:bg-gray-900 shadow-md shadow-gray-900/10'}`}>
          {isRestoring ? <RefreshCw size={16} className="animate-spin" /> : 'Restore Data'}
        </button>
      </div>
    </div>
  </div>
  );
};

export default BackupRestoreSection;
