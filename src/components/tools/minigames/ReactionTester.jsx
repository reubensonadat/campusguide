import React, { useState, useEffect, useRef } from 'react';

export const ReactionTester = () => {
  const [state, setState] = useState('waiting'); // waiting, ready, playing, result
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const timeoutRef = useRef(null);

  const startTest = () => {
    setState('ready');
    setReactionTime(null);
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    timeoutRef.current = setTimeout(() => {
      setState('playing');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (state === 'waiting' || state === 'result') {
      startTest();
    } else if (state === 'ready') {
      clearTimeout(timeoutRef.current);
      setState('result');
      setReactionTime('Too early!');
    } else if (state === 'playing') {
      const time = Date.now() - startTime;
      setReactionTime(`${time} ms`);
      setState('result');
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full min-h-[300px]">
      <div 
        onClick={handleClick}
        className={`w-full max-w-[280px] aspect-square rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-colors shadow-lg ${
          state === 'waiting' ? 'bg-[#002F45] hover:bg-[#004A6B]' :
          state === 'ready' ? 'bg-red-500' :
          state === 'playing' ? 'bg-green-500' :
          'bg-[#002F45]'
        }`}
      >
        <span className="text-white font-black text-2xl text-center px-4">
          {state === 'waiting' ? 'Click to Start' :
           state === 'ready' ? 'Wait for Green...' :
           state === 'playing' ? 'CLICK NOW!' :
           reactionTime}
        </span>
        {state === 'result' && (
          <span className="text-white/60 font-bold text-sm mt-4">Click to try again</span>
        )}
      </div>
    </div>
  );
};
