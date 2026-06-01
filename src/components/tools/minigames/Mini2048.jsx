import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

const SIZE = 4;

const getEmptyBoard = () => Array(SIZE).fill().map(() => Array(SIZE).fill(0));

const addRandomTile = (board) => {
  const emptyCells = [];
  board.forEach((row, i) => row.forEach((cell, j) => {
    if (cell === 0) emptyCells.push({ i, j });
  }));
  if (emptyCells.length === 0) return board;

  const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newBoard = board.map(row => [...row]);
  newBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
};

export const Mini2048 = () => {
  const [board, setBoard] = useState(() => addRandomTile(addRandomTile(getEmptyBoard())));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const move = useCallback((direction) => {
    if (gameOver) return;

    let newBoard = getEmptyBoard();
    let newScore = score;
    let moved = false;

    const processRow = (row) => {
      let newRow = row.filter(val => val !== 0);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newScore += newRow[i];
          newRow[i + 1] = 0;
        }
      }
      newRow = newRow.filter(val => val !== 0);
      while (newRow.length < SIZE) newRow.push(0);
      return newRow;
    };

    if (direction === 'LEFT') {
      for (let i = 0; i < SIZE; i++) {
        newBoard[i] = processRow(board[i]);
        if (newBoard[i].join(',') !== board[i].join(',')) moved = true;
      }
    } else if (direction === 'RIGHT') {
      for (let i = 0; i < SIZE; i++) {
        newBoard[i] = processRow([...board[i]].reverse()).reverse();
        if (newBoard[i].join(',') !== board[i].join(',')) moved = true;
      }
    } else if (direction === 'UP') {
      for (let j = 0; j < SIZE; j++) {
        const col = [board[0][j], board[1][j], board[2][j], board[3][j]];
        const newCol = processRow(col);
        for (let i = 0; i < SIZE; i++) newBoard[i][j] = newCol[i];
        if (newCol.join(',') !== col.join(',')) moved = true;
      }
    } else if (direction === 'DOWN') {
      for (let j = 0; j < SIZE; j++) {
        const col = [board[3][j], board[2][j], board[1][j], board[0][j]];
        const newCol = processRow(col).reverse();
        for (let i = 0; i < SIZE; i++) newBoard[i][j] = newCol[i];
        if (newCol.join(',') !== col.reverse().join(',')) moved = true;
      }
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);

      // Check game over
      let hasMove = false;
      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          if (newBoard[i][j] === 0) hasMove = true;
          if (i < SIZE - 1 && newBoard[i][j] === newBoard[i + 1][j]) hasMove = true;
          if (j < SIZE - 1 && newBoard[i][j] === newBoard[i][j + 1]) hasMove = true;
        }
      }
      if (!hasMove) setGameOver(true);
    }
  }, [board, score, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp': move('UP'); break;
        case 'ArrowDown': move('DOWN'); break;
        case 'ArrowLeft': move('LEFT'); break;
        case 'ArrowRight': move('RIGHT'); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  // Touch Swipe Handling
  const touchStart = React.useRef({ x: null, y: null });
  
  const handleTouchStart = (e) => {
    touchStart.current.x = e.touches[0].clientX;
    touchStart.current.y = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current.x || !touchStart.current.y) return;
    const xUp = e.changedTouches[0].clientX;
    const yUp = e.changedTouches[0].clientY;
    const xDiff = touchStart.current.x - xUp;
    const yDiff = touchStart.current.y - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 30) move('LEFT');
      else if (xDiff < -30) move('RIGHT');
    } else {
      if (yDiff > 30) move('UP');
      else if (yDiff < -30) move('DOWN');
    }
    touchStart.current = { x: null, y: null };
  };

  const reset = () => {
    setBoard(addRandomTile(addRandomTile(getEmptyBoard())));
    setScore(0);
    setGameOver(false);
  };

  const getTileColor = (val) => {
    const colors = {
      2: 'bg-white/10 text-white',
      4: 'bg-primary-500/20 text-white',
      8: 'bg-orange-500/40 text-white',
      16: 'bg-orange-600/60 text-white',
      32: 'bg-rose-500/60 text-white',
      64: 'bg-rose-600/80 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]',
      128: 'bg-yellow-500/80 text-white shadow-[0_0_20px_rgba(234,179,8,0.5)]',
      256: 'bg-yellow-400/90 text-white shadow-[0_0_20px_rgba(250,204,21,0.6)]',
      512: 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.7)]',
      1024: 'bg-indigo-500 text-white shadow-[0_0_25px_rgba(99,102,241,0.8)]',
      2048: 'bg-purple-500 text-white shadow-[0_0_30px_rgba(168,85,247,1)] ring-2 ring-white/50'
    };
    return colors[val] || 'bg-white/5';
  };

  return (
    <div className="flex flex-col items-center select-none touch-none" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="flex justify-between w-full mb-6 px-2 items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">SCORE</span>
          <span className="text-xl font-black text-white">{score}</span>
        </div>
        <button 
          onClick={reset} 
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95 text-white"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="relative bg-slate-900/50 p-3 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
        {gameOver && (
          <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-white/20 animate-in fade-in">
            <h3 className="text-2xl font-black text-white mb-2">Game Over</h3>
            <p className="text-sm text-white/70 mb-6">Final Score: {score}</p>
            <button 
              onClick={reset}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-full transition-colors shadow-[0_0_15px_rgba(var(--color-primary-500),0.5)]"
            >
              Try Again
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-[260px] h-[260px] sm:w-[280px] sm:h-[280px]">
          {board.map((row, i) => row.map((cell, j) => (
            <div key={`${i}-${j}`} className="relative bg-white/5 rounded-xl flex items-center justify-center w-full h-full">
              {cell !== 0 && (
                <div 
                  className={`absolute inset-0 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all duration-150 animate-in zoom-in-50 ${getTileColor(cell)}`}
                >
                  {cell}
                </div>
              )}
            </div>
          )))}
        </div>
      </div>
      <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mt-6 text-center">
        Swipe to move tiles
      </p>
    </div>
  );
};
