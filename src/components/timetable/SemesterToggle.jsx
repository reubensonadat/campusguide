import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TERMS = ['100_1','100_2','200_1','200_2','300_1','300_2','400_1','400_2','500_1','500_2','600_1','600_2'];

const SemesterToggle = ({ activeTerm, activeTermIndex, onTermChange }) => (
  <div className="flex items-center justify-between mt-6 bg-gray-900/5 rounded-2xl p-2 max-w-sm mx-auto border border-gray-900/10">
    <button onClick={() => onTermChange(Math.max(0, activeTermIndex - 1))}
      disabled={activeTermIndex === 0}
      className="p-2 rounded-xl text-gray-900 hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent">
      <ChevronLeft size={20} />
    </button>
    <div className="flex-1 text-center flex flex-col relative justify-center items-center">
      <select value={activeTerm} onChange={(e) => { const idx = TERMS.indexOf(e.target.value); if (idx !== -1) onTermChange(idx); }}
        className="bg-transparent text-sm font-black text-gray-900 outline-none cursor-pointer text-center appearance-none border-none py-1 px-4 rounded-lg hover:bg-white/50 transition-colors"
        style={{ textAlignLast: 'center' }}>
        {TERMS.map(t => { const [lvl, sem] = t.split('_'); return (<option key={t} value={t} className="text-gray-900 bg-white">Level {lvl} · Semester {sem}</option>); })}
      </select>
      <span className="text-[9px] font-bold text-gray-900/40 uppercase tracking-wider mt-0.5">Click to choose term</span>
    </div>
    <button onClick={() => onTermChange(Math.min(TERMS.length - 1, activeTermIndex + 1))}
      disabled={activeTermIndex === TERMS.length - 1}
      className="p-2 rounded-xl text-gray-900 hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent">
      <ChevronRight size={20} />
    </button>
  </div>
);

export default SemesterToggle;
