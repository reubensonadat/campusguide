import React from 'react';
import { AlertTriangle, XIcon } from 'lucide-react';

const LiveNavigationHUD = ({ distanceRemaining, showBetaWarning, onDismissBeta, onEndRoute }) => (
  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm flex flex-col gap-3">
    {showBetaWarning && (
      <div className="bg-amber-50 border border-amber-200 shadow-xl rounded-xl p-3 flex items-start gap-3 animate-in slide-in-from-top-2">
        <div className="shrink-0 p-1.5 bg-amber-100 rounded-full text-amber-600">
          <AlertTriangle size={16} strokeWidth={3} />
        </div>
        <div className="flex-1">
          <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-wide">Navigation Advisory</h4>
          <p className="text-[10px] font-medium text-amber-800 leading-tight mt-0.5">Routes are for visual reference only — paths may cross water or restricted areas. Use Google Maps for turn-by-turn directions.</p>
        </div>
        <button onClick={onDismissBeta} className="shrink-0 p-1 text-amber-400 hover:text-amber-600"><XIcon size={16} /></button>
      </div>
    )}
    <div className="bg-white/95 backdrop-blur-md shadow-2xl border border-slate-200/60 rounded-2xl px-8 py-4 flex flex-col items-center animate-in slide-in-from-top-4">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Remaining Distance</span>
      <span className="text-4xl font-black text-slate-800 tracking-tight">
        {distanceRemaining > 1000 ? `${(distanceRemaining / 1000).toFixed(1)} km` : `${Math.round(distanceRemaining)} m`}
      </span>
      <button onClick={onEndRoute} className="mt-3 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors uppercase tracking-wide">
        <XIcon size={12} /> End Route
      </button>
    </div>
  </div>
);

export default LiveNavigationHUD;
