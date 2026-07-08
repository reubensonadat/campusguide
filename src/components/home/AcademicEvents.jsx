import React from 'react';
import { Calendar } from 'lucide-react';

const AcademicEvents = ({ upcomingAcademicEvents }) => {
  if (upcomingAcademicEvents.length === 0) return null;

  return (
    <div className="bg-gray-900 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] p-6 border border-gray-900/90 flex flex-col justify-center mt-2 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mt-12 -mr-12 pointer-events-none blur-2xl" />
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
          <Calendar size={12} className="text-primary-400" />
        </div>
        <span className="text-sm font-black text-white tracking-tight">Academic Calendar</span>
      </div>
      <div className="space-y-3 relative z-10">
        {upcomingAcademicEvents.map((ev, idx) => (
          <div key={idx} className="flex flex-col gap-1 border-l-2 border-primary-400/30 pl-3 py-1">
            <p className="text-[13px] font-bold text-white leading-tight">{ev.title}</p>
            <p className="text-[11px] font-medium text-primary-400 flex items-center gap-1.5">
              <span className="font-bold">{ev.timeLabel}</span>
              <span className="opacity-50">•</span>
              <span>{ev.formattedDate}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicEvents;
