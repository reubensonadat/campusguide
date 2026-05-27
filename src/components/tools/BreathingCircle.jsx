import React, { useState, useEffect } from 'react';

export const BreathingCircle = () => {
  const [phase, setPhase] = useState('Breathe In'); // Breathe In, Hold, Breathe Out, Hold
  const [scale, setScale] = useState(1);
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    const cycle = [
      { text: 'Breathe In', scale: 1.5, duration: 4 },
      { text: 'Hold', scale: 1.5, duration: 4 },
      { text: 'Breathe Out', scale: 1, duration: 4 },
      { text: 'Hold', scale: 1, duration: 4 },
    ];

    let currentPhaseIdx = 0;
    
    const updatePhase = () => {
      const current = cycle[currentPhaseIdx];
      setPhase(current.text);
      setScale(current.scale);
      setTimeLeft(current.duration);
      
      currentPhaseIdx = (currentPhaseIdx + 1) % cycle.length;
    };

    updatePhase();
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          updatePhase();
          return cycle[currentPhaseIdx === 0 ? 3 : currentPhaseIdx - 1].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        {/* Outer expanding ring */}
        <div 
          className="absolute w-32 h-32 bg-primary-200/50 rounded-full transition-transform ease-in-out"
          style={{ 
            transform: `scale(${scale})`, 
            transitionDuration: '4s'
          }}
        />
        {/* Inner solid circle */}
        <div className="relative z-10 w-32 h-32 bg-primary-500 rounded-full flex flex-col items-center justify-center text-white shadow-xl">
          <span className="text-sm font-bold opacity-90 uppercase tracking-wider">{phase}</span>
          <span className="text-3xl font-black">{timeLeft}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm font-medium text-center max-w-xs">
        Follow the circle to regulate your breathing. This simple box-breathing technique helps lower stress and reset your focus.
      </p>
    </div>
  );
};
