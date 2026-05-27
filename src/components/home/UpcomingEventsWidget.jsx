import React from 'react';
import { ChevronRight } from 'lucide-react';
import { getIconComponent } from '../tools/PlanYourDay';

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const UpcomingEventsWidget = ({ upcomingPlannedTasks, navigate }) => {
  if (!upcomingPlannedTasks || upcomingPlannedTasks.length === 0) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-black text-gray-900 tracking-tight">Upcoming Events</span>
        <button onClick={() => navigate('/tools/plan-day')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
          View all <ChevronRight size={13} />
        </button>
      </div>
      <div className="space-y-3">
        {upcomingPlannedTasks.slice(0, 4).map((task) => {
          const IconCmp = getIconComponent(task.icon);
          const taskDate = new Date(task.date + 'T00:00:00');
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const diffDays = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));
          let dayLabel = '';
          if (diffDays === 1) dayLabel = 'Tomorrow';
          else if (diffDays <= 7) dayLabel = `In ${diffDays} days`;
          else dayLabel = `In ${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
          return (
            <div key={task.id} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-primary-100/50">
                <IconCmp size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-slate-900">{task.title}</p>
                <p className="text-[11px] font-medium mt-0.5 text-slate-500">
                  {dayLabel} • {formatTime12Hour(task.time)}
                </p>
              </div>
            </div>
          );
        })}
        {upcomingPlannedTasks.length > 4 && (
          <button onClick={() => navigate('/tools/plan-day')} className="w-full text-center text-xs font-bold text-gray-400 pt-2 hover:text-primary-600 transition-colors">
            +{upcomingPlannedTasks.length - 4} more events
          </button>
        )}
      </div>
    </div>
  );
};
