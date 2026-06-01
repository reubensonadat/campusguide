import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BreathingCircle } from '../BreathingCircle';
import { MemoryMatch } from './MemoryMatch';
import { TicTacToe } from './TicTacToe';
import { ReactionTester } from './ReactionTester';
import { SimonSays } from './SimonSays';
import { Mini2048 } from './Mini2048';
import { PatternConnect } from './PatternConnect';
import { WordScramble } from './WordScramble';

const GAMES = [
  { id: 'breathe', name: 'Breathing Timer', component: BreathingCircle },
  { id: 'memory', name: 'Memory Match', component: MemoryMatch },
  { id: 'tictactoe', name: 'Tic-Tac-Toe', component: TicTacToe },
  { id: 'simon', name: 'Simon Says', component: SimonSays },
  { id: '2048', name: 'Mini 2048', component: Mini2048 },
  { id: 'pattern', name: 'Flow Connect', component: PatternConnect },
  { id: 'scramble', name: 'Word Scramble', component: WordScramble }
];

export const MiniGameHub = ({ onBackToFocus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextGame = () => setCurrentIndex((i) => (i + 1) % GAMES.length);
  const prevGame = () => setCurrentIndex((i) => (i - 1 + GAMES.length) % GAMES.length);

  const CurrentGame = GAMES[currentIndex].component;

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Horizontal Nav Bar */}
      <div className="flex items-center justify-between w-full max-w-sm mb-6 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
        <button 
          onClick={prevGame}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-white font-bold text-sm uppercase tracking-widest text-center flex-1">
          {GAMES[currentIndex].name}
        </span>
        <button 
          onClick={nextGame}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Game Container */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 w-full max-w-sm backdrop-blur-md min-h-[400px] flex flex-col justify-center shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        <CurrentGame />
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={onBackToFocus}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all active:scale-95"
        >
          Back to Focus Timer
        </button>
      </div>
    </div>
  );
};
