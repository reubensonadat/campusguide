import React from 'react';
import { Flame } from 'lucide-react';

const StreakBadge = ({ prodStats, variant = 'hero' }) => {
  if (!prodStats || prodStats.currentStreak < 1) return null;

  const count = prodStats.currentStreak;
  const title = prodStats.title.label;

  if (variant === 'desktop') {
    return (
      <span className="inline-flex items-center gap-1.5 ml-2">
        <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full text-[11px] font-bold border border-orange-200">
          <Flame size={11} className="text-orange-500" />
          {count}
        </span>
        <span className="inline-flex items-center bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-200">
          {title}
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-white/10 text-white/90 px-2 py-0.5 rounded-full text-[11px] font-bold border border-white/10 ml-2">
      <Flame size={11} className="text-orange-400 fill-orange-400" />
      {count}
    </span>
  );
};

export default StreakBadge;
