import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Coffee, CheckCircle2, RotateCcw } from 'lucide-react';
import { MiniGameHub } from './minigames/MiniGameHub';
import { toast } from 'react-hot-toast';

const FOCUS_OPTIONS = [15, 25, 30, 45, 60];
const BREAK_MINUTES = 5;

export const FocusTimer = ({ task, onComplete, onCancel }) => {
  const [mode, setMode] = useState('focus'); // 'focus' | 'break' | 'brain-break'
  const [timeSpent, setTimeSpent] = useState(0); // counts up from 0
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeSpent(0);
  };

  const handleFinishTask = () => {
    toast.success('Task marked as completed!');
    if (onComplete) onComplete(task.id);
  };

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <div className="fixed inset-0 z-[100] bg-[#001a26] flex flex-col items-center justify-start p-6 text-white overflow-y-auto w-full h-full">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-8 max-w-lg">
        <button 
          onClick={onCancel}
          className="text-white/60 hover:text-white font-bold flex items-center gap-2 transition-colors z-10"
        >
          <Square size={16} /> Exit
        </button>
        <span className="bg-white/10 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/80 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-none text-center">
          {mode === 'focus' ? 'Deep Focus Mode' : mode === 'break' ? 'Resting' : 'Brain Break Activity'}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center max-w-lg w-full flex-1 justify-center pb-12">
        
        {/* Task Context */}
        {task && mode === 'focus' && (
          <div className="mb-8 text-center animate-fade-in-up w-full px-4">
            <p className="text-[#6EABC6] font-bold text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">Currently Focusing On</p>
            <h2 className="text-xl sm:text-3xl font-black text-white truncate w-full">{task.title}</h2>
          </div>
        )}

        {/* Timer UI or Brain Break UI */}
        {mode === 'brain-break' ? (
          <MiniGameHub onBackToFocus={() => setMode('focus')} />
        ) : (
          <>
            <div className="relative w-72 h-72 mb-12 flex items-center justify-center">
              {/* SVG Progress Ring */}
              <svg className={`absolute inset-0 w-full h-full ${isActive ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
              <circle
                cx="144"
                cy="144"
                r="135"
                className="stroke-white/10"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="144"
                cy="144"
                r="135"
                className={`transition-all duration-1000 ease-linear ${mode === 'focus' ? 'stroke-primary-500' : 'stroke-green-500'} ${isActive ? 'opacity-100' : 'opacity-30'}`}
                strokeWidth="8"
                fill="none"
                strokeDasharray="40 20" // Dashed circle pattern
                strokeDashoffset={0}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Time Text */}
            <div className="flex flex-col items-center justify-center z-10 text-center">
              <span className="text-7xl font-black tracking-tighter" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-white/50 font-bold mt-2 text-sm uppercase tracking-widest">
                Time Elapsed
              </span>
            </div>
          </div>
          </>
        )}

        {/* Controls */}
        {mode !== 'brain-break' && (
          <div className="flex items-end justify-center gap-6 sm:gap-10 mb-12">
            
            {/* Reset Button */}
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={resetTimer}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
              >
                <RotateCcw size={20} className="text-white sm:w-6 sm:h-6" />
              </button>
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Restart</span>
            </div>
            
            {/* Play/Pause Button */}
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={toggleTimer}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 ${
                  isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-white text-[#001a26] hover:bg-gray-100'
                }`}
              >
                {isActive ? <Pause size={28} className="sm:w-8 sm:h-8" /> : <Play size={28} className="ml-1 sm:w-8 sm:h-8" />}
              </button>
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{isActive ? 'Pause' : 'Start'}</span>
            </div>

            {/* Skip/Brain Break Button */}
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={() => setMode(mode === 'brain-break' ? 'focus' : 'brain-break')}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center hover:bg-indigo-500/40 transition-all active:scale-95"
              >
                <Coffee size={20} className="sm:w-6 sm:h-6" />
              </button>
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest whitespace-nowrap">
                {mode === 'brain-break' ? 'Resume' : 'Mini Game'}
              </span>
            </div>

          </div>
        )}

        {/* Task Completion Button */}
        {task && (
          <button 
            onClick={handleFinishTask}
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-bold py-4 rounded-2xl shadow-[0_8px_30px_rgba(34,197,94,0.3)] hover:bg-green-600 hover:-translate-y-1 transition-all active:scale-95 text-sm sm:text-base"
          >
            <CheckCircle2 size={20} /> Mark Task as Done
          </button>
        )}
      </div>
    </div>
  );
};
