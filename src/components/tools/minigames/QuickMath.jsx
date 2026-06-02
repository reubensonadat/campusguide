import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { triggerHaptic } from '../../../utils/haptics';

export const QuickMath = () => {
  const [equation, setEquation] = useState({ a: 0, b: 0, op: '+', answer: 0, options: [] });
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  const generateEquation = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, answer;
    
    if (op === '+') {
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      answer = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 20) + 10;
      b = Math.floor(Math.random() * a);
      answer = a - b;
    } else {
      a = Math.floor(Math.random() * 9) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      answer = a * b;
    }

    const options = [answer];
    while (options.length < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      const fake = answer + offset;
      if (fake !== answer && !options.includes(fake) && fake >= 0) {
        options.push(fake);
      }
    }
    
    setEquation({ a, b, op, answer, options: options.sort(() => Math.random() - 0.5) });
  };

  useEffect(() => {
    generateEquation();
  }, []);

  const handleAnswer = (val) => {
    if (val === equation.answer) {
      triggerHaptic(50);
      setScore(s => s + 1);
      generateEquation();
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
        <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Streak: {score}</span>
        <button 
          onClick={() => { setScore(0); generateEquation(); }} 
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <div className={`text-5xl font-black mb-12 tracking-tighter ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        {equation.a} <span className="text-primary-500">{equation.op}</span> {equation.b}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {equation.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="py-4 bg-white/5 border border-white/10 rounded-2xl text-xl font-bold hover:bg-primary-500 hover:border-primary-400 hover:text-white transition-all active:scale-95 shadow-lg"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
