import React from 'react';
import { ChevronRight, Circle, CheckCircle2 } from 'lucide-react';
import { getIconComponent } from '../tools/PlanYourDay';

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const TasksWidget = ({ todaysTasks, toggleTaskStatus, navigate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-black text-gray-900 tracking-tight">Today's Tasks</span>
        <button onClick={() => navigate('/tools/plan-day')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
          Manage <ChevronRight size={13} />
        </button>
      </div>

      {todaysTasks.length === 0 ? (
        <div className="flex items-center justify-between py-2 bg-slate-50 p-4 rounded-xl border border-slate-100 border-dashed">
          <div>
            <p className="text-sm font-bold text-slate-800">No tasks planned</p>
            <p className="text-xs text-slate-500 mt-0.5">Want to organize your day?</p>
          </div>
          <button 
            onClick={() => navigate('/tools/plan-day')}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:border-primary-200 transition-all"
          >
            Plan Day
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {todaysTasks.slice(0, 3).map((task) => {
            const IconCmp = getIconComponent(task.icon);
            const isCompleted = task.status === 'completed';
            return (
              <div key={task.id} className={`flex items-center gap-3 p-2 -mx-2 rounded-xl transition-all hover:bg-slate-50 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
                {/* Interactive Checkbox */}
                <button 
                    onClick={() => toggleTaskStatus(task.id)}
                    className="flex-shrink-0 text-slate-300 hover:text-primary-600 transition-colors p-1"
                >
                    {isCompleted ? <CheckCircle2 size={22} className="text-primary-500" /> : <Circle size={22} />}
                </button>

                {/* Icon Block */}
                <div 
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-primary-50 text-primary-600 shadow-sm border border-primary-100/50'
                    }`}
                >
                  <IconCmp size={18} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleTaskStatus(task.id)}>
                  <p className={`text-sm font-bold truncate ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                    {task.title}
                  </p>
                  <p className="text-[11px] font-medium mt-0.5 text-slate-500">
                    {formatTime12Hour(task.time)}
                    {task.endTime ? ` – ${formatTime12Hour(task.endTime)}` : ''}
                  </p>
                </div>
              </div>
            );
          })}
          {todaysTasks.length > 3 && (
              <button onClick={() => navigate('/tools/plan-day')} className="w-full text-center text-xs font-bold text-gray-400 pt-2 hover:text-primary-600 transition-colors">
                  +{todaysTasks.length - 3} more tasks
              </button>
          )}
        </div>
      )}
    </div>
  );
};
