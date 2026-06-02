import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { triggerHaptic } from '../../../utils/haptics';

const GRADIENT = [
  '#bae6fd', // lightest
  '#7dd3fc',
  '#38bdf8',
  '#0ea5e9',
  '#0284c7'  // darkest
];

export const HueSort = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    // Shuffle but ensure it's not already sorted
    let shuffled = [...GRADIENT].sort(() => Math.random() - 0.5);
    while (JSON.stringify(shuffled) === JSON.stringify(GRADIENT)) {
      shuffled = [...GRADIENT].sort(() => Math.random() - 0.5);
    }
    setBlocks(shuffled);
    setSelectedIdx(null);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleBlockClick = (idx) => {
    if (isWon) return;

    if (selectedIdx === null) {
      triggerHaptic(30);
      setSelectedIdx(idx);
    } else {
      if (selectedIdx === idx) {
        // Deselect
        triggerHaptic(30);
        setSelectedIdx(null);
        return;
      }

      // Swap
      const newBlocks = [...blocks];
      const temp = newBlocks[selectedIdx];
      newBlocks[selectedIdx] = newBlocks[idx];
      newBlocks[idx] = temp;
      
      setBlocks(newBlocks);
      setSelectedIdx(null);

      // Check win
      if (JSON.stringify(newBlocks) === JSON.stringify(GRADIENT)) {
        triggerHaptic(100);
        setIsWon(true);
      } else {
        triggerHaptic(30);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <div className="flex justify-between w-full mb-6 px-2 items-center">
        <span className="bg-white/10 px-4 py-1.5 rounded-full text-white/90 font-bold text-xs tracking-widest uppercase border border-white/10 shadow-inner">
          Hue Sort
        </span>
        <button 
          onClick={initGame} 
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 text-white"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {isWon ? (
        <div className="flex flex-col items-center mb-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-100 mb-3 drop-shadow-sm">
            Perfect Gradient!
          </h3>
          <button 
            onClick={initGame}
            className="px-6 py-2 bg-sky-500/20 border border-sky-400/50 hover:bg-sky-500 hover:border-sky-400 text-sky-100 font-bold rounded-full transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] active:scale-95 text-xs tracking-widest uppercase"
          >
            Play Again
          </button>
        </div>
      ) : (
        <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-8 text-center max-w-[200px] h-[60px] flex items-center justify-center">
          Tap two blocks to swap. Sort from light to dark.
        </p>
      )}

      <div className="flex flex-col gap-2 w-48 relative">
        {blocks.map((color, idx) => (
          <button
            key={color}
            onClick={() => handleBlockClick(idx)}
            className={`w-full h-12 rounded-xl transition-all duration-500 ${selectedIdx === idx ? 'scale-[1.05] shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10' : 'hover:scale-[1.02] active:scale-95 z-0'} ${isWon ? 'shadow-[0_0_15px_rgba(14,165,233,0.2)]' : ''}`}
            style={{ 
              backgroundColor: color,
              transform: isWon ? 'scale(1)' : undefined,
              cursor: isWon ? 'default' : 'pointer',
              transitionDelay: isWon ? `${idx * 50}ms` : '0ms'
            }}
          />
        ))}
      </div>
    </div>
  );
};
