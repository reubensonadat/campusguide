import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { triggerHaptic } from '../../../utils/haptics';

const COLORS = [
  { name: 'RED', hex: '#ef4444' },
  { name: 'BLUE', hex: '#3b82f6' },
  { name: 'GREEN', hex: '#22c55e' },
  { name: 'YELLOW', hex: '#eab308' },
  { name: 'PURPLE', hex: '#a855f7' }
];

export const StroopTest = () => {
  const [word, setWord] = useState(COLORS[0]);
  const [ink, setInk] = useState(COLORS[1]);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  const generateTest = () => {
    const randomWord = COLORS[Math.floor(Math.random() * COLORS.length)];
    let randomInk = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    // Ensure it's usually a mismatch (Stroop effect)
    if (Math.random() > 0.3) {
      while (randomInk.name === randomWord.name) {
        randomInk = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
    }

    setWord(randomWord);
    setInk(randomInk);
  };

  useEffect(() => {
    generateTest();
  }, []);

  const handleAnswer = (selectedHex) => {
    // The correct answer is the INK color, not the word text
    if (selectedHex === ink.hex) {
      triggerHaptic(50);
      setScore(s => s + 1);
      generateTest();
    } else {
      triggerHaptic(1500); // 1.5 seconds vibration on loss
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setScore(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <div className="flex justify-between w-full mb-8 px-2 items-center">
        <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Score: {score}</span>
        <button 
          onClick={() => { setScore(0); generateTest(); }} 
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mb-4 text-center">
        Tap the color of the INK, not the word
      </p>

      <div 
        className={`text-6xl font-black mb-12 tracking-tighter uppercase drop-shadow-xl ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
        style={{ color: ink.hex }}
      >
        {word.name}
      </div>

      <div className="flex flex-wrap justify-center gap-3 w-full">
        {COLORS.map((color, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(color.hex)}
            className="w-14 h-14 rounded-full shadow-lg hover:scale-110 active:scale-90 transition-transform border-4 border-white/10"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
};
