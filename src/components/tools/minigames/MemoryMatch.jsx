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
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setIsLocked(true);
      const [first, second] = flipped;
      if (cards[first].icon === cards[second].icon) {
        setCards(prev => prev.map((c, i) => i === first || i === second ? { ...c, isMatched: true } : c));
        setFlipped([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => i === first || i === second ? { ...c, isFlipped: false } : c));
          setFlipped([]);
          setIsLocked(false);
        }, 800);
      }
      setMoves(m => m + 1);
    }
  }, [flipped, cards]);

  const handleCardClick = (index) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;
    setCards(prev => prev.map((c, i) => i === index ? { ...c, isFlipped: true } : c));
    setFlipped(prev => [...prev, index]);
  };

  const isWon = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="flex flex-col items-center p-2">
      <div className="flex justify-between w-full mb-6 px-2 items-center">
        <span className="bg-white/10 px-4 py-1.5 rounded-full text-white/90 font-bold text-xs tracking-widest uppercase border border-white/10 shadow-inner">
          Moves: <span className="text-white">{moves}</span>
        </span>
        <button 
          onClick={() => { setCards(generateCards()); setMoves(0); setFlipped([]); setIsLocked(false); }} 
          className="text-primary-400 text-xs font-bold uppercase tracking-widest hover:text-primary-300 transition-colors px-3 py-1 bg-primary-500/10 rounded-full border border-primary-500/20"
        >
          Restart
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 w-full max-w-[280px]">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            onClick={() => handleCardClick(idx)}
            className={`aspect-square flex items-center justify-center text-4xl rounded-2xl cursor-pointer transition-all duration-300 transform shadow-lg ${
              card.isFlipped || card.isMatched 
                ? 'bg-white/10 rotate-y-180 border border-white/20' 
                : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 hover:border-white/20 hover:scale-105 active:scale-95'
            }`}
            style={{ perspective: '1000px' }}
          >
            <div className={`transition-all duration-300 ${card.isFlipped || card.isMatched ? 'opacity-100 scale-100 rotate-y-180' : 'opacity-0 scale-50'}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
      {isWon && (
        <div className="mt-8 px-6 py-3 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 font-black animate-bounce text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          You Won! 🎉
        </div>
      )}
    </div>
  );
};
