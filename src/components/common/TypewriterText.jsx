import React, { useState, useEffect } from 'react';

export default function TypewriterText({ text, speed = 15, delay = 0, isTypewriterActive = true }) {
  const [displayText, setDisplayText] = useState(isTypewriterActive ? "" : text);

  useEffect(() => {
    if (!isTypewriterActive) {
      setDisplayText(text);
      return;
    }

    let timeout;
    let iteration = 0;

    const animate = () => {
      iteration++;
      setDisplayText(text.slice(0, iteration));
      
      if (iteration < text.length) {
        timeout = setTimeout(animate, speed);
      }
    };

    const startTimeout = setTimeout(() => {
      animate();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, speed, delay, isTypewriterActive]);

  return (
    <span className="inline-block relative">
      {displayText}
      {isTypewriterActive && displayText.length < text.length && (
        <span className="inline-block w-1 h-3.5 ml-0.5 bg-slate-400 animate-pulse align-middle" />
      )}
    </span>
  );
}
