const fs = require('fs');

async function run() {
  const res = await fetch('https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt');
  const text = await res.text();
  const words = text.split('\n').filter(w => w.length >= 5 && w.length <= 8);
  
  // Pick exactly 500 unique words randomly
  const shuffled = words.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 500);

  const fileContent = `import React, { useState, useEffect } from 'react';
import { triggerHaptic } from '../../../utils/haptics';
import { RotateCcw } from 'lucide-react';

const WORDS = ${JSON.stringify(selected)};

export const WordScramble = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [error, setError] = useState(false);

  const pickWord = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    let scrambledWord = word;
    // Simple scramble
    while (scrambledWord === word) {
      scrambledWord = word.split('').sort(() => 0.5 - Math.random()).join('');
    }
    setCurrentWord(word);
    setScrambled(scrambledWord);
    setGuess('');
    setIsWon(false);
    setError(false);
  };

  useEffect(() => {
    pickWord();
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
      setIsWon(true);
      setScore(s => s + 1);
      triggerHaptic('heavy');
      setTimeout(pickWord, 1500);
    } else {
      setError(true);
      triggerHaptic('light');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-between w-full mb-6 items-center">
        <span className="bg-white/10 px-4 py-1.5 rounded-full text-white/90 font-bold text-xs tracking-widest uppercase border border-white/10 shadow-inner">
          Score: <span className="text-primary-400">{score}</span>
        </span>
        <button 
          onClick={() => { setScore(0); pickWord(); }} 
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 text-white"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="mb-8 text-center min-h-[3rem]">
        {isWon ? (
          <span className="text-2xl font-black uppercase tracking-widest text-emerald-400 animate-in zoom-in spin-in-12 duration-300">
            CORRECT! 🎉
          </span>
        ) : (
          <span className="text-4xl font-black uppercase tracking-[0.3em] text-white/90 drop-shadow-lg">
            {scrambled}
          </span>
        )}
      </div>

      <form onSubmit={handleGuess} className="w-full max-w-[280px] flex flex-col gap-4">
        <input 
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your guess..."
          disabled={isWon}
          className={\`w-full bg-black/20 border-2 rounded-2xl p-4 text-center text-xl font-bold text-white placeholder:text-white/30 focus:outline-none focus:bg-black/30 transition-all \${error ? 'border-rose-500 animate-pulse' : 'border-white/10 focus:border-primary-500/50'}\`}
        />
        <button 
          type="submit"
          disabled={isWon || !guess.trim()}
          className="w-full bg-primary-500 hover:bg-primary-400 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50"
        >
          SUBMIT
        </button>
      </form>

      <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mt-8 text-center">
        Unscramble the letters to find the word
      </p>
    </div>
  );
};
`;
  
  fs.writeFileSync('src/components/tools/minigames/WordScramble.jsx', fileContent);
  console.log('WordScramble.jsx generated!');
}

run();
