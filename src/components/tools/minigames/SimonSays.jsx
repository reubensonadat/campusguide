import React, { useState, useEffect, useRef } from 'react';

const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400'];
const ACTIVE_COLORS = ['bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-200'];

export const SimonSays = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [message, setMessage] = useState('Press Start');
  const [score, setScore] = useState(0);

  const timeoutRef = useRef(null);

  const startGame = () => {
    setSequence([Math.floor(Math.random() * 4)]);
    setPlayerSequence([]);
    setIsPlaying(true);
    setScore(0);
    setMessage('Watch closely...');
  };

  useEffect(() => {
    if (isPlaying && playerSequence.length === 0) {
      playSequence();
    }
  }, [sequence, isPlaying]);

  const playSequence = async () => {
    setMessage('Watch closely...');
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveColor(sequence[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveColor(null);
    }
    setMessage('Your turn!');
  };

  const handleColorClick = (index) => {
    if (!isPlaying || message === 'Watch closely...') return;

    setActiveColor(index);
    setTimeout(() => setActiveColor(null), 200);

    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);

    if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
      setMessage('Game Over!');
      setIsPlaying(false);
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      setMessage('Correct!');
      setScore(sequence.length);
      setTimeout(() => {
        setPlayerSequence([]);
        setSequence([...sequence, Math.floor(Math.random() * 4)]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex justify-between w-full max-w-[280px] mb-6">
        <span className="text-white font-bold">{message}</span>
        <span className="text-white/70 font-bold">Score: {score}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-[280px] aspect-square bg-[#001a26] rounded-full p-4 overflow-hidden border-4 border-white/10 relative">
        {COLORS.map((color, idx) => (
          <div
            key={idx}
            onClick={() => handleColorClick(idx)}
            className={`w-full h-full cursor-pointer transition-all duration-150 ${idx === 0 ? 'rounded-tl-full' : idx === 1 ? 'rounded-tr-full' : idx === 2 ? 'rounded-bl-full' : 'rounded-br-full'} ${activeColor === idx ? ACTIVE_COLORS[idx] : color} ${(!isPlaying || message === 'Watch closely...') ? 'opacity-80 pointer-events-none' : 'hover:brightness-110 active:brightness-125'}`}
          />
        ))}
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-[#001a26] rounded-full border-4 border-white/10 flex items-center justify-center">
          {!isPlaying && (
            <button 
              onClick={startGame}
              className="text-white font-black text-sm uppercase tracking-wider hover:text-primary-400 transition-colors"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
