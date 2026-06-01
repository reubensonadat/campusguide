import React, { useState } from 'react';

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

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = checkWinner(board);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-6 text-white font-bold">
        {winner ? `Winner: ${winner}` : board.every(Boolean) ? 'Draw!' : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[240px]">
        {board.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="aspect-square bg-white/10 hover:bg-white/20 rounded-xl text-4xl font-black text-white flex items-center justify-center transition-colors"
          >
            {val}
          </button>
        ))}
      </div>
      <button onClick={reset} className="mt-8 px-6 py-2 bg-primary-950 text-white font-bold rounded-full hover:bg-[#004A6B] transition-colors">
        Restart Game
      </button>
    </div>
  );
};
