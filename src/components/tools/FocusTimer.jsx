import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Coffee, CheckCircle2, RotateCcw, ChevronLeft } from 'lucide-react';
import { MiniGameHub } from './minigames/MiniGameHub';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const FocusTimer = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [mode, setMode] = useState('focus'); // 'focus' | 'brain-break'
  
  // Timer State
  const [timeSpent, setTimeSpent] = useState(0); 
  const [isActive, setIsActive] = useState(false);

  // Load initial state
  useEffect(() => {
    try {
      const storedTask = localStorage.getItem('ucc_focus_task');
      if (storedTask) setTask(JSON.parse(storedTask));

      const timerState = JSON.parse(localStorage.getItem('ucc_focus_timer_state') || 'null');
      if (timerState) {
        setIsActive(timerState.isActive);
        if (timerState.isActive) {
          const now = Date.now();
          const elapsedSinceStart = Math.floor((now - timerState.startTime) / 1000);
          setTimeSpent(timerState.accumulated + elapsedSinceStart);
        } else {
          setTimeSpent(timerState.accumulated);
        }
      }
    } catch (e) {
      console.error('Error loading focus state:', e);
    }
  }, []);

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const timerState = JSON.parse(localStorage.getItem('ucc_focus_timer_state') || 'null');
        if (timerState && timerState.isActive) {
          const elapsed = Math.floor((Date.now() - timerState.startTime) / 1000);
          setTimeSpent(timerState.accumulated + elapsed);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
    
    if (newIsActive) {
      localStorage.setItem('ucc_focus_timer_state', JSON.stringify({
        isActive: true,
        startTime: Date.now(),
        accumulated: timeSpent
      }));
    } else {
      localStorage.setItem('ucc_focus_timer_state', JSON.stringify({
        isActive: false,
        startTime: null,
        accumulated: timeSpent
      }));
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeSpent(0);
    localStorage.removeItem('ucc_focus_timer_state');
  };

  const handleFinishTask = () => {
    if (!task) return;
    
    try {
      const tasksStr = localStorage.getItem('ucc_daily_tasks');
      let currentTasks = tasksStr ? JSON.parse(tasksStr) : [];
      
      if (task.isClassStudy) {
        const d = new Date();
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const newTask = {
          id: Date.now().toString(),
          title: task.title,
          time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
          date: dateStr,
          icon: 'study',
          status: 'completed'
        };
        currentTasks.push(newTask);
      } else {
        currentTasks = currentTasks.map(t => 
          t.id === task.id ? { ...t, status: 'completed' } : t
        );
      }
      
      localStorage.setItem('ucc_daily_tasks', JSON.stringify(currentTasks));
      toast.success('Task marked as completed!');
      resetTimer();
      localStorage.removeItem('ucc_focus_task');
      navigate('/');
    } catch (e) {
      console.error(e);
      toast.error('Failed to update task');
    }
  };

  const handleExit = () => {
    navigate('/');
  };

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-start p-6 text-white overflow-y-auto w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      
      {/* Dynamic Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] bg-primary-500/20 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-30'}`} />

      {/* Top Bar */}
      <div className="w-full flex justify-between items-center mb-12 max-w-lg relative z-10">
        <button 
          onClick={handleExit}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/10"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-md shadow-xl">
          {mode === 'focus' ? 'Deep Focus Mode' : 'Brain Break'}
        </span>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center max-w-lg w-full flex-1 justify-center pb-12 relative z-10 min-w-0 overflow-hidden">
        
        {/* Task Context */}
        {task && mode === 'focus' && (
          <div className="mb-12 text-center animate-fade-in-up w-full px-4 min-w-0 overflow-hidden">
            <p className="text-primary-400 font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-3">Target Objective</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white text-center w-full tracking-tight drop-shadow-md leading-tight break-words break-all px-2">{task.title}</h2>
          </div>
        )}

        {/* Timer UI or Brain Break UI */}
        {mode === 'brain-break' ? (
          <MiniGameHub onBackToFocus={() => setMode('focus')} />
        ) : (
          <>
            <div className="relative w-80 h-80 mb-16 flex items-center justify-center">
              {/* Outer Ripple */}
              {isActive && (
                <div className="absolute inset-0 rounded-full border border-primary-500/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
              )}
              
              {/* SVG Progress Ring */}
              <svg className={`absolute inset-0 w-full h-full drop-shadow-[0_0_30px_rgba(var(--color-primary-500),0.3)] ${isActive ? 'animate-[spin_8s_linear_infinite]' : ''}`}>
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  className="stroke-white/5"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="150"
                  className={`transition-all duration-1000 ease-linear ${mode === 'focus' ? 'stroke-primary-500' : 'stroke-green-500'} ${isActive ? 'opacity-100' : 'opacity-40'}`}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="60 30" // Dashed circle pattern
                  strokeDashoffset={0}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Inner Glowing Orb */}
              <div className="absolute inset-4 rounded-full bg-slate-900/50 backdrop-blur-sm border border-white/10 shadow-inner flex flex-col items-center justify-center">
                <span className="text-[5.5rem] font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-white/40 font-bold mt-4 text-[10px] uppercase tracking-[0.25em]">
                  Time Elapsed
                </span>
              </div>
            </div>
          </>
        )}

        {/* Controls */}
        {mode !== 'brain-break' && (
          <div className="flex items-end justify-center gap-8 sm:gap-12 mb-16">
            
            {/* Reset Button */}
            <div className="flex flex-col items-center gap-3">
              <button 
                onClick={resetTimer}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-lg backdrop-blur-md"
              >
                <RotateCcw size={20} className="text-white/70 hover:text-white" />
              </button>
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Restart</span>
            </div>
            
            {/* Play/Pause Button */}
            <div className="flex flex-col items-center gap-3">
              <button 
                onClick={toggleTimer}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-300 active:scale-95 border-2 ${
                  isActive 
                    ? 'bg-rose-500 hover:bg-rose-600 border-rose-400 text-white' 
                    : 'bg-white hover:bg-gray-100 border-white text-slate-900'
                }`}
              >
                {isActive ? <Pause size={32} className="fill-current" /> : <Play size={32} className="ml-1 fill-current" />}
              </button>
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{isActive ? 'Pause' : 'Start Focus'}</span>
            </div>

            {/* Brain Break Button */}
            <div className="flex flex-col items-center gap-3">
              <button 
                onClick={() => setMode('brain-break')}
                className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center hover:bg-indigo-500/20 hover:text-indigo-300 transition-all active:scale-95 shadow-lg backdrop-blur-md"
              >
                <Coffee size={20} />
              </button>
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap">
                Mini Game
              </span>
            </div>

          </div>
        )}

        {/* Task Completion Button */}
        {task && mode === 'focus' && (
          <button 
            onClick={handleFinishTask}
            className="group relative flex items-center justify-center gap-3 w-full max-w-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold py-4 rounded-2xl hover:bg-emerald-500 hover:text-white hover:border-emerald-400 transition-all active:scale-95 text-sm uppercase tracking-widest overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <CheckCircle2 size={20} className="relative z-10" /> 
            <span className="relative z-10">Mark as Done</span>
          </button>
        )}
      </div>
    </div>
  );
};
