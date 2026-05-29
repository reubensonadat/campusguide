import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, RotateCcw, AlertOctagon } from 'lucide-react';

const COLORS = [
  { name: 'Red', base: 'bg-rose-600', active: 'bg-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.85)] scale-[1.02]', freq: 329.63 },
  { name: 'Blue', base: 'bg-indigo-600', active: 'bg-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.85)] scale-[1.02]', freq: 261.63 },
  { name: 'Green', base: 'bg-emerald-600', active: 'bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.85)] scale-[1.02]', freq: 392.00 },
  { name: 'Yellow', base: 'bg-amber-500', active: 'bg-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.85)] scale-[1.02]', freq: 440.00 },
];

export const SimonSays = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [message, setMessage] = useState('Tap START to lock in');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('simon_high_score') || '0', 10);
  });

  const playTone = (freq, isGameOver = false) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = isGameOver ? 'sawtooth' : 'triangle';
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      if (isGameOver) {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.6);
      } else {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.35);
      }
    } catch (e) {
      console.log('Audio Context blocked or not supported');
    }
  };

  const startGame = () => {
    const firstColor = Math.floor(Math.random() * 4);
    setSequence([firstColor]);
    setPlayerSequence([]);
    setIsPlaying(true);
    setScore(0);
    setMessage('Watch the pattern');
    // Warm-up tone
    playTone(200);
  };

  useEffect(() => {
    if (isPlaying && playerSequence.length === 0) {
      playSequence();
    }
  }, [sequence, isPlaying]);

  const playSequence = async () => {
    setMessage('Watch the pattern');
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveColor(sequence[i]);
      playTone(COLORS[sequence[i]].freq);
      await new Promise(resolve => setTimeout(resolve, 350));
      setActiveColor(null);
    }
    setMessage('Your turn!');
  };

  const handleColorClick = (index) => {
    if (!isPlaying || message === 'Watch the pattern') return;

    setActiveColor(index);
    playTone(COLORS[index].freq);
    setTimeout(() => setActiveColor(null), 180);

    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);

    if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
      setMessage('Incorrect sequence!');
      playTone(110, true); // Low game over buzz
      setIsPlaying(false);
      
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('simon_high_score', score.toString());
      }
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      setMessage('Correct!');
      const newScore = sequence.length;
      setScore(newScore);
      setTimeout(() => {
        setPlayerSequence([]);
        setSequence([...sequence, Math.floor(Math.random() * 4)]);
      }, 800);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900/60 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl w-full max-w-[340px] mx-auto">
      
      {/* HUD Info */}
      <div className="flex items-center justify-between w-full px-2 mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6EABC6]">STATUS</span>
          <span className={`text-xs font-bold transition-all duration-200 ${
            message === 'Your turn!' ? 'text-green-400 animate-pulse' :
            message === 'Incorrect sequence!' ? 'text-red-400' : 'text-gray-300'
          }`}>
            {message}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#6EABC6]">SCORE</span>
          <span className="text-sm font-black text-white">{score}</span>
        </div>
      </div>

      {/* Game Console */}
      <div className="relative w-full aspect-square max-w-[280px] bg-slate-950 rounded-[2.5rem] p-6 shadow-inner border border-white/10 flex items-center justify-center">
        
        <div className="grid grid-cols-2 gap-4 w-full h-full rounded-[2rem] overflow-hidden">
          {COLORS.map((color, idx) => {
            const isActive = activeColor === idx;
            return (
              <button
                key={idx}
                onClick={() => handleColorClick(idx)}
                disabled={!isPlaying || message === 'Watch the pattern'}
                className={`w-full h-full transition-all duration-150 transform active:scale-95 outline-none focus:outline-none border-none
                  ${idx === 0 ? 'rounded-tl-[1.8rem]' : 
                    idx === 1 ? 'rounded-tr-[1.8rem]' : 
                    idx === 2 ? 'rounded-bl-[1.8rem]' : 'rounded-br-[1.8rem]'} 
                  ${isActive ? color.active : `${color.base} opacity-75 hover:opacity-90`}
                  ${(!isPlaying || message === 'Watch the pattern') ? 'cursor-not-allowed opacity-50' : 'hover:scale-[1.01]'}`}
                aria-label={`Simon Says ${color.name}`}
              />
            );
          })}
        </div>

        {/* Center Controller Button */}
        <div className="absolute w-[94px] h-[94px] bg-slate-950 rounded-full shadow-lg border-4 border-slate-900 flex items-center justify-center z-10">
          {!isPlaying ? (
            <button
              onClick={startGame}
              className="w-20 h-20 bg-gradient-to-tr from-primary-600 to-[#6EABC6] text-white rounded-full flex flex-col items-center justify-center text-center font-black text-[10px] uppercase tracking-wider shadow-md hover:from-primary-500 hover:to-[#82bad4] active:scale-95 transition-all outline-none border-none cursor-pointer"
            >
              <Sparkles size={14} className="mb-0.5 animate-pulse" />
              Start
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">Streak</span>
              <span className="text-lg font-black text-[#6EABC6]">{score}</span>
            </div>
          )}
        </div>

      </div>

      {/* Best Score footer block */}
      <div className="flex items-center gap-1.5 mt-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
        <Trophy size={12} className="text-amber-500" />
        <span>Personal Best: {highScore}</span>
      </div>

    </div>
  );
};
