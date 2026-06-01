import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { triggerHaptic } from '../../../utils/haptics';

const SIZE = 5;
const COLORS = [
  'bg-rose-500', 
  'bg-indigo-500', 
  'bg-emerald-500', 
  'bg-amber-500',
  'bg-purple-500'
];

// Helper to generate a solvable puzzle
const generatePuzzle = () => {
  // Hardcoded for a 5x5 simple flow puzzle
  const pairs = [
    { color: 0, points: [{r: 0, c: 0}, {r: 4, c: 4}] },
    { color: 1, points: [{r: 0, c: 4}, {r: 3, c: 0}] },
    { color: 2, points: [{r: 1, c: 1}, {r: 4, c: 2}] },
    { color: 3, points: [{r: 2, c: 3}, {r: 4, c: 0}] },
  ];
  return pairs;
};

export const PatternConnect = () => {
  const [pairs, setPairs] = useState(generatePuzzle());
  const [paths, setPaths] = useState({}); // { colorIndex: [{r, c}] }
  const [activeColor, setActiveColor] = useState(null);
  const [isWon, setIsWon] = useState(false);
  const gridRef = useRef(null);

  const reset = () => {
    setPaths({});
    setActiveColor(null);
    setIsWon(false);
  };

  const getCellFromEvent = (e) => {
    if (!gridRef.current) return null;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = gridRef.current.getBoundingClientRect();
    
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null;

    const cellWidth = rect.width / SIZE;
    const cellHeight = rect.height / SIZE;
    const c = Math.floor((clientX - rect.left) / cellWidth);
    const r = Math.floor((clientY - rect.top) / cellHeight);
    
    if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
      return { r, c };
    }
    return null;
  };

  const handleStart = (e, r, c) => {
    if (e.cancelable && !e.touches) e.preventDefault();
    if (isWon) return;
    
    // Check if we clicked on an endpoint
    const pair = pairs.find(p => p.points.some(pt => pt.r === r && pt.c === c));
    if (pair) {
      triggerHaptic('light');
      setActiveColor(pair.color);
      setPaths(prev => ({
        ...prev,
        [pair.color]: [{r, c}]
      }));
    } else {
      // Check if we clicked on an existing path to truncate it
      for (const colorStr in paths) {
        const color = parseInt(colorStr);
        const path = paths[color];
        const idx = path.findIndex(pt => pt.r === r && pt.c === c);
        if (idx !== -1) {
          triggerHaptic('light');
          setActiveColor(color);
          setPaths(prev => ({
            ...prev,
            [color]: path.slice(0, idx + 1)
          }));
          break;
        }
      }
    }
  };

  const handleMove = (e) => {
    if (activeColor === null) return;
    if (e.cancelable && !e.touches) e.preventDefault();
    const cell = getCellFromEvent(e);
    if (!cell) return;

    setPaths(prev => {
      const currentPath = prev[activeColor] || [];
      if (currentPath.length === 0) return prev;

      const lastCell = currentPath[currentPath.length - 1];
      if (lastCell.r === cell.r && lastCell.c === cell.c) return prev;

      // Ensure adjacent
      const isAdjacent = Math.abs(lastCell.r - cell.r) + Math.abs(lastCell.c - cell.c) === 1;
      if (!isAdjacent) return prev;

      // Prevent moving onto endpoints of OTHER colors
      const isOtherEndpoint = pairs.some(p => p.color !== activeColor && p.points.some(pt => pt.r === cell.r && pt.c === cell.c));
      if (isOtherEndpoint) return prev;

      // If we move backward on our own path, truncate
      const prevIdx = currentPath.findIndex(pt => pt.r === cell.r && pt.c === cell.c);
      if (prevIdx !== -1) {
        triggerHaptic('light');
        return {
          ...prev,
          [activeColor]: currentPath.slice(0, prevIdx + 1)
        };
      }

      // Stop if we reached the matching endpoint
      const myPair = pairs.find(p => p.color === activeColor);
      const isMyEndpoint = myPair.points.some(pt => pt.r === cell.r && pt.c === cell.c);
      
      const newPath = [...currentPath, cell];
      triggerHaptic('light');

      // Clear other paths if we cross them
      const nextPaths = { ...prev };
      for (const colorStr in nextPaths) {
        if (parseInt(colorStr) === activeColor) continue;
        const otherPath = nextPaths[colorStr];
        const collisionIdx = otherPath.findIndex(pt => pt.r === cell.r && pt.c === cell.c);
        if (collisionIdx !== -1) {
          nextPaths[colorStr] = otherPath.slice(0, collisionIdx);
        }
      }

      nextPaths[activeColor] = newPath;
      return nextPaths;
    });
  };

  const handleEnd = () => {
    if (activeColor !== null) {
      setActiveColor(null);
      checkWin();
    }
  };

  const checkWin = () => {
    let allConnected = true;
    let gridFilled = 0;
    
    for (const pair of pairs) {
      const path = paths[pair.color];
      if (!path) {
        allConnected = false;
        break;
      }
      
      // Check if path connects both endpoints
      const hasStart = path.some(pt => pt.r === pair.points[0].r && pt.c === pair.points[0].c);
      const hasEnd = path.some(pt => pt.r === pair.points[1].r && pt.c === pair.points[1].c);
      
      if (!hasStart || !hasEnd) {
        allConnected = false;
        break;
      }
      gridFilled += path.length;
    }

    if (allConnected && gridFilled === SIZE * SIZE) {
      setIsWon(true);
      triggerHaptic('heavy');
    }
  };

  // Prevent scrolling while playing
  useEffect(() => {
    const disableScroll = (e) => e.preventDefault();
    const node = gridRef.current;
    if (node) {
      node.addEventListener('touchmove', disableScroll, { passive: false });
    }
    return () => {
      if (node) node.removeEventListener('touchmove', disableScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full mb-6 px-2 items-center">
        <span className="bg-white/10 px-4 py-1.5 rounded-full text-white/90 font-bold text-xs tracking-widest uppercase border border-white/10 shadow-inner">
          Connect All Dots
        </span>
        <button 
          onClick={reset} 
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 text-white"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div 
        ref={gridRef}
        className="relative bg-slate-900/50 p-2 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md w-[280px] h-[280px] touch-none"
        onMouseDown={(e) => handleStart(e, getCellFromEvent(e)?.r, getCellFromEvent(e)?.c)}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e, getCellFromEvent(e)?.r, getCellFromEvent(e)?.c)}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      >
        {isWon && (
          <div className="absolute inset-0 z-20 bg-emerald-900/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-emerald-500/50 animate-in fade-in">
            <h3 className="text-2xl font-black text-white mb-2 shadow-emerald-500/50 drop-shadow-lg">Perfect Flow!</h3>
            <button 
              onClick={() => { reset(); setPairs(generatePuzzle()); }}
              className="mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full transition-colors shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            >
              Play Again
            </button>
          </div>
        )}
        
        {/* Render grid cells for endpoints and path lines */}
        <div className="grid grid-cols-5 gap-0 w-full h-full relative z-10">
          {Array(SIZE).fill().map((_, r) => 
            Array(SIZE).fill().map((_, c) => {
              // Check if endpoint
              const endpoint = pairs.find(p => p.points.some(pt => pt.r === r && pt.c === c));
              
              return (
                <div key={`${r}-${c}`} className="relative border border-white/5 flex items-center justify-center w-full h-full">
                  {endpoint && (
                    <div className={`w-3/5 h-3/5 rounded-full ${COLORS[endpoint.color]} shadow-[0_0_10px_currentColor] z-10`}></div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* SVG overlay for paths */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none z-0">
          {Object.entries(paths).map(([colorIndex, path]) => {
            if (path.length < 2) return null;
            const pts = path.map(pt => {
              // Map grid coordinates to SVG coordinates (0-100)
              const cellW = 100 / SIZE;
              const cellH = 100 / SIZE;
              return `${(pt.c + 0.5) * cellW} ${(pt.r + 0.5) * cellH}`;
            }).join(' L ');
            
            // Extract the hex color or tailwind name. Since we used bg-rose-500, we'll map to stroke colors
            const hexColors = ['#f43f5e', '#6366f1', '#10b981', '#f59e0b', '#a855f7'];
            
            return (
              <path
                key={colorIndex}
                d={`M ${pts}`}
                fill="none"
                stroke={hexColors[colorIndex]}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`opacity-80 transition-all duration-100 drop-shadow-[0_0_8px_${hexColors[colorIndex]}]`}
              />
            );
          })}
        </svg>

      </div>
      <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mt-6 text-center">
        Connect matching colors. Fill the board!
      </p>
    </div>
  );
};
