import React, { useState, useEffect } from 'react';

const checkWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const getBestMove = (board, difficulty) => {
  const emptyIndices = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) emptyIndices.push(i);
  }
  if (emptyIndices.length === 0) return -1;

  // Easy: 100% random. Medium: 40% random. Hard: 0% random (always minimax).
  const randomChance = difficulty === 'easy' ? 1.0 : difficulty === 'medium' ? 0.4 : 0;
  
  if (Math.random() < randomChance) {
    const randIdx = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[randIdx];
  }

  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

const minimax = (board, depth, isMaximizing) => {
  const winner = checkWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (board.every(Boolean)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // You are X, AI is O
  const [difficulty, setDifficulty] = useState('hard'); // easy, medium, hard
  
  const winner = checkWinner(board);
  const isDraw = !winner && board.every(Boolean);

  // AI Move Effect
  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove([...board], difficulty);
        if (aiMove !== -1) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 500); // 500ms delay to feel natural
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner, isDraw]);

  const handleClick = (i) => {
    if (board[i] || winner || !isXNext) return; // Prevent clicking during AI turn
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center p-2">
      <div className="flex justify-between w-full mb-6 px-2 items-center">
        <select 
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            reset();
          }}
          className="bg-white/10 px-3 py-1.5 rounded-full text-white/90 font-bold text-xs tracking-widest uppercase border border-white/10 shadow-inner outline-none appearance-none cursor-pointer hover:bg-white/20 transition-colors"
        >
          <option value="easy" className="text-gray-900">EASY</option>
          <option value="medium" className="text-gray-900">MEDIUM</option>
          <option value="hard" className="text-gray-900">HARD</option>
        </select>
        <button 
          onClick={reset} 
          className="text-primary-400 text-xs font-bold uppercase tracking-widest hover:text-primary-300 transition-colors px-3 py-1 bg-primary-500/10 rounded-full border border-primary-500/20"
        >
          Restart
        </button>
      </div>
      
      <div className="mb-8 text-center min-h-[2rem]">
        {winner ? (
          <span className={`text-xl font-black uppercase tracking-widest animate-pulse ${winner === 'X' ? 'text-green-400' : 'text-rose-400'}`}>
            {winner === 'X' ? 'You Won! 🎉' : 'AI Wins! 🤖'}
          </span>
        ) : isDraw ? (
          <span className="text-xl font-black uppercase tracking-widest text-slate-300">It's a Draw!</span>
        ) : (
          <span className="text-sm font-bold text-white/70 tracking-widest uppercase">
            {isXNext ? 'Your Turn (X)' : 'AI is thinking...'}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
        {board.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className={`aspect-square rounded-2xl text-5xl font-black flex items-center justify-center transition-all duration-300 shadow-lg ${
              val ? 'bg-white/10 border border-white/20' : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 hover:border-white/20 hover:scale-105 active:scale-95 cursor-pointer'
            } ${val === 'X' ? 'text-green-400' : val === 'O' ? 'text-rose-400' : ''}`}
            disabled={!!val || !isXNext || !!winner}
          >
            {val && <span className="animate-in zoom-in spin-in-12 duration-300">{val}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};
