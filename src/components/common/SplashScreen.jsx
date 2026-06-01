import React, { useEffect, useState } from 'react';
import { DataLoader } from './CustomLoaders';

export const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Stay visible for 2.5 seconds, then fade out over 0.5s
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Trigger unmount after fade animation finishes
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-gray-900 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <img 
        src="/logo.png" 
        alt="Campus Guide Logo" 
        className="w-[90px] h-[90px] mb-8 animate-pulse drop-shadow-xl"
      />
      <DataLoader className="w-12 h-12 text-white/90" />
      <div className="mt-8 text-white/90 text-sm font-bold tracking-wide animate-pulse">
        Launching Campus Guide...
      </div>
    </div>
  );
};
