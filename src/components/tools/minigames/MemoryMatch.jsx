import React, { useState, useEffect } from 'react';

const icons = ['🍎', '🍌', '🍉', '🍇', '🍒', '🍓', '🥝', '🥭'];
const generateCards = () => {
  const shuffled = [...icons, ...icons].sort(() => Math.random() - 0.5);
  return shuffled.map((icon, id) => ({ id, icon, isFlipped: false, isMatched: false }));
};

export const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].icon === cards[second].icon) {
        setCards(prev => prev.map((c, i) => i === first || i === second ? { ...c, isMatched: true } : c));
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => i === first || i === second ? { ...c, isFlipped: false } : c));
        }, 1000);
      }
      setTimeout(() => setFlipped([]), 1000);
      setMoves(m => m + 1);
    }
  }, [flipped, cards]);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;
    setCards(prev => prev.map((c, i) => i === index ? { ...c, isFlipped: true } : c));
    setFlipped(prev => [...prev, index]);
  };

  const isWon = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-between w-full mb-4 px-2">
        <span className="text-white/70 font-bold text-sm">Moves: {moves}</span>
        <button onClick={() => { setCards(generateCards()); setMoves(0); setFlipped([]); }} className="text-primary-400 text-sm font-bold hover:underline">Restart</button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-[280px]">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            onClick={() => handleCardClick(idx)}
            className={`aspect-square flex items-center justify-center text-3xl sm:text-4xl rounded-xl cursor-pointer transition-all duration-300 transform perspective-1000 ${card.isFlipped || card.isMatched ? 'bg-white/20 rotate-y-180' : 'bg-[#002F45] hover:bg-[#004A6B]'}`}
          >
            {(card.isFlipped || card.isMatched) ? <span className="animate-in fade-in zoom-in">{card.icon}</span> : <span className="opacity-0">{card.icon}</span>}
          </div>
        ))}
      </div>
      {isWon && <div className="mt-6 text-green-400 font-black animate-bounce text-xl">You Won! 🎉</div>}
    </div>
  );
};
