import { useState, useEffect, useRef } from 'react';

const words = [
  'halls',
  'food',
  'events',
  'shops',
  'libraries',
  'offices',
  'banks',
  'health centres',
  'sports',
  'chapels',
  'businesses'
];

const TypewriterText = ({ className }) => {
  const [display, setDisplay] = useState('');
  const idxRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    let i = 0;
    let currentWord = words[0];
    let phase = 'type';
    let pos = 0;

    const tick = () => {
      currentWord = words[i % words.length];

      if (phase === 'type') {
        pos++;
        setDisplay(currentWord.slice(0, pos));
        if (pos >= currentWord.length) {
          phase = 'hold';
          timerRef.current = setTimeout(tick, 2500);
          return;
        }
        timerRef.current = setTimeout(tick, 80);
      } else if (phase === 'hold') {
        phase = 'delete';
        timerRef.current = setTimeout(tick, 30);
      } else if (phase === 'delete') {
        pos--;
        setDisplay(currentWord.slice(0, pos));
        if (pos <= 0) {
          i++;
          phase = 'type';
          timerRef.current = setTimeout(tick, 200);
          return;
        }
        timerRef.current = setTimeout(tick, 30);
      }
    };

    timerRef.current = setTimeout(tick, 500);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <span className={className}>
      {display}
      <span className="animate-pulse ml-px font-light text-slate-300">|</span>
    </span>
  );
};

export default TypewriterText;
