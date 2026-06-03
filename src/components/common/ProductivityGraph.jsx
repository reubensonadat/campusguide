import React, { useEffect, useState, useMemo } from 'react';
import { getProductivityStats } from '../../services/productivityService';
import { Flame, Info, Calendar } from 'lucide-react';

export const ProductivityGraph = () => {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('1m'); // '7d', '1m', '3m'

  useEffect(() => {
    async function loadStats() {
      const data = await getProductivityStats();
      setStats(data);
    }
    loadStats();
  }, []);

  const daysToRender = useMemo(() => {
    if (timeRange === '7d') return 7;
    if (timeRange === '1m') return 28; // 4 weeks
    if (timeRange === '3m') return 84; // 12 weeks
    return 28;
  }, [timeRange]);

  const weeks = useMemo(() => {
    if (!stats) return [];
    
    const today = new Date();
    const days = [];
    
    for (let i = daysToRender - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const minutes = stats.dailyData[dateStr] || 0;
      let intensity = 0;
      if (minutes > 0 && minutes <= 30) intensity = 1;
      else if (minutes > 30 && minutes <= 60) intensity = 2;
      else if (minutes > 60 && minutes <= 120) intensity = 3;
      else if (minutes > 120) intensity = 4;

      days.push({
        dateStr,
        minutes,
        intensity,
        isToday: i === 0,
        dayOfWeek: d.getDay(),
        formattedDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })
      });
    }

    if (timeRange === '7d') {
      // For 7 days, we just want a single row (or column in our current logic, but visually a row).
      // We'll wrap all 7 days into 1 "week" column, and render it horizontally using CSS later, 
      // or we can wrap each day in its own "week" to make 7 columns of 1 day.
      // Let's do 7 columns of 1 day so it stretches horizontally natively!
      return days.map(day => [day]);
    }

    const cols = [];
    let currentCol = [];
    days.forEach(day => {
      currentCol.push(day);
      if (day.dayOfWeek === 6 || day.isToday) {
        cols.push(currentCol);
        currentCol = [];
      }
    });
    return cols;
  }, [stats, daysToRender, timeRange]);

  if (!stats) return null;

  const getColorClass = (intensity) => {
    switch (intensity) {
      case 1: return 'bg-primary-200 border-primary-200/20';
      case 2: return 'bg-primary-300 border-primary-300/20';
      case 3: return 'bg-primary-400 border-primary-400/20 text-white';
      case 4: return 'bg-primary-500 border-primary-500/20 shadow-sm text-white';
      default: return 'bg-gray-100 border-black/5 text-transparent';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-6 border border-gray-100 shadow-sm relative overflow-hidden mb-6 group">
      {/* Background ambient glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-100/40 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="flex items-start justify-between mb-5 relative z-10">
        <div>
          <h3 className="text-[17px] font-bold text-gray-900 flex items-center gap-2 tracking-tight">
            Focus Graph <Flame size={16} className="text-primary-500" />
          </h3>
          <div className="flex items-center gap-2 mt-2">
            {['7d', '1m', '3m'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors ${
                  timeRange === range 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="text-2xl font-black text-gray-900 leading-none">{stats.currentStreak}</div>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Day Streak</p>
        </div>
      </div>

      {/* Grid container with w-full and justify-between so it fills space! */}
      <div className={`flex w-full ${timeRange === '7d' ? 'justify-between' : 'justify-between'} mb-4 relative z-10 overflow-x-auto pb-2 pt-1 custom-scrollbar hide-scroll-indicator`}>
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className={`flex flex-col justify-end ${timeRange === '7d' ? 'w-full px-1' : 'flex-1 items-center'} gap-2 sm:gap-3`}>
            {week.map((day) => (
              <div
                key={day.dateStr}
                title={`${day.minutes} mins on ${day.formattedDate}`}
                className={`
                  rounded-lg border ${getColorClass(day.intensity)} 
                  transition-all duration-300 hover:scale-110 hover:z-10 hover:shadow-md cursor-crosshair flex items-center justify-center
                  ${timeRange === '7d' ? 'w-full aspect-square max-w-[48px] mx-auto' : ''}
                  ${timeRange === '1m' ? 'w-full aspect-square max-w-[24px]' : ''}
                  ${timeRange === '3m' ? 'w-full aspect-square max-w-[14px]' : ''}
                `}
              >
                {/* For 7d view, show the day name if there's space */}
                {timeRange === '7d' && (
                  <span className={`text-[10px] font-bold uppercase tracking-wider opacity-60 ${day.intensity > 2 ? 'text-white' : 'text-gray-500'}`}>
                    {day.formattedDate.split(',')[0]}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-2 mb-5 relative z-10 bg-gray-50/50 px-3 py-2 rounded-xl border border-gray-100/50">
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <span>Less</span>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-3 h-3 rounded-[3px] ${getColorClass(level)}`} />
            ))}
          </div>
          <span>More</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
          <Calendar size={12} />
          <span>{timeRange === '7d' ? 'Last Week' : timeRange === '1m' ? 'Last Month' : 'Last Quarter'}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100/80 relative z-10 flex items-center justify-between transition-transform active:scale-[0.98]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm text-xl border border-gray-100">
            {stats.title.icon}
          </div>
          <div className="flex flex-col">
            <h4 className={`text-sm font-bold ${stats.title.textColor}`}>{stats.title.label}</h4>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Total focus time: <strong className="text-gray-900">{Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m</strong>
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
           <p className="text-[11px] text-gray-400 font-medium max-w-[160px] leading-relaxed">
             {stats.title.desc}
           </p>
        </div>
      </div>
    </div>
  );
};
