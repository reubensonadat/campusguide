import React, { useState } from 'react';
import CampusMap from '../components/guide/CampusMap';
import { AlertTriangle, X } from 'lucide-react';

const Guide = () => {
  // =========================================================================
  // 📍 MAP ACCURACY DISCLAIMER CONFIG
  // To completely remove this disclaimer next time, simply:
  // 1. Delete this state variable (line 12)
  // 2. Delete the entire JSX block labeled "⚠️ DISCLAIMER BANNER" (lines 16-36)
  // =========================================================================
  const [showMapDisclaimer, setShowMapDisclaimer] = useState(true);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ⚠️ DISCLAIMER BANNER (EASY TO REMOVE) */}
      {showMapDisclaimer && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg bg-amber-50 dark:bg-amber-950/90 backdrop-blur-md border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 shadow-2xl flex items-start gap-3 mt-4 animate-in slide-in-from-top-4">
          <div className="shrink-0 p-1.5 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-600 dark:text-amber-400">
            <AlertTriangle size={18} strokeWidth={2.5} />
          </div>
          <div className="flex-1 pr-4">
            <h4 className="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-wider">Map Accuracy Notice</h4>
            <p className="text-[11px] font-medium text-amber-800 dark:text-amber-300 leading-relaxed mt-1">
              Some locations might not be 100% correct. We are working hard to build the best location system.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setShowMapDisclaimer(false)} 
            className="shrink-0 p-1 text-amber-400 hover:text-amber-600 dark:hover:text-amber-200 transition-colors"
            title="Dismiss Disclaimer"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* 🗺️ CAMPUS MAP COMPONENT */}
      <CampusMap />
    </div>
  );
};

export default Guide;
