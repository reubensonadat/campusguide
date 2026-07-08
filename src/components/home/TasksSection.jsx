import React from 'react';
import { ChevronRight, AlertTriangle, FileText, CheckCircle2, Circle, Clock, Plus, Play } from 'lucide-react';
import { CustomGuide } from '../common/CustomIcons';
import SkeletonCard from './SkeletonCard';

const TasksSection = ({
  isDeferredActive, urgentDeadlines, todaysTasks, thisWeekDeadlines,
  handleQuickMarkSubmitted, toggleTaskStatus, handleAddSuggestion,
  suggestedClassTasks, navigate, formatTime12Hour, getIconComponent
}) => {
  if (!isDeferredActive) return <SkeletonCard />;

  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-black text-gray-900 tracking-tight">Today's Tasks</span>
        <button onClick={() => navigate('/tools/plan-day')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
          Manage <ChevronRight size={13} />
        </button>
      </div>

      {urgentDeadlines.length > 0 && (
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1">
              <AlertTriangle size={10} /> Deadlines
            </span>
            <button onClick={() => navigate('/tools/assignments')} className="text-[10px] font-bold text-primary-400 hover:underline">View all</button>
          </div>
          {urgentDeadlines.map(a => {
            const todayStr = new Date().toISOString().split('T')[0];
            const isOverdue = a.dueDate < todayStr;
            return (
              <div key={a.id} className={`flex items-center gap-3 p-3 rounded-xl ${isOverdue ? 'bg-red-50 border border-red-100' : 'bg-orange-50 border border-orange-100'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isOverdue ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                  <FileText size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold truncate ${isOverdue ? 'text-red-800' : 'text-orange-800'}`}>{a.title}</p>
                  <p className={`text-[10px] font-medium ${isOverdue ? 'text-red-600' : 'text-orange-600'}`}>
                    {isOverdue ? 'Overdue' : 'Due today'}{a.dueTime ? ` • ${formatTime12Hour(a.dueTime)}` : ''}{a.course ? ` • ${a.course}` : ''}
                  </p>
                </div>
                <button onClick={() => handleQuickMarkSubmitted(a.id)}
                  className="text-[9px] font-bold px-2 py-1 rounded-md bg-white shadow-sm border border-gray-100 text-green-700 hover:bg-green-50 active:scale-95 transition-all flex-shrink-0">Done</button>
              </div>
            );
          })}
        </div>
      )}

      {todaysTasks.length === 0 && urgentDeadlines.length === 0 ? (
        suggestedClassTasks.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Suggested Task</p>
            <div className="flex items-center justify-between py-2 bg-primary-50 p-4 rounded-xl border border-primary-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <CustomGuide size={16} />
                </div>
                <div className="min-w-0 pr-2">
                  <p className="text-sm font-bold text-slate-800 break-words leading-tight">Revise {suggestedClassTasks[0].courseName || suggestedClassTasks[0].name || 'Class'}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">Before class</p>
                </div>
              </div>
              <button onClick={() => handleAddSuggestion(suggestedClassTasks[0])}
                className="bg-white border border-primary-200 text-primary-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-primary-50 transition-all flex items-center gap-1 flex-shrink-0">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between py-2 bg-slate-50 p-4 rounded-xl border border-slate-100 border-dashed">
            <div>
              <p className="text-sm font-bold text-slate-800">No tasks planned</p>
              <p className="text-xs text-slate-500 mt-0.5">Want to organize your day?</p>
            </div>
            <button onClick={() => navigate('/tools/plan-day')} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:border-primary-200 transition-all">Plan Day</button>
          </div>
        )
      ) : (
        <div className="space-y-3">
          {todaysTasks.slice(0, 3).map((task) => {
            const IconCmp = getIconComponent(task.icon);
            const isCompleted = task.status === 'completed';
            return (
              <div key={task.id} className={`flex items-center gap-3 p-2 -mx-2 rounded-xl transition-all hover:bg-slate-50 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
                <button onClick={() => toggleTaskStatus(task.id)} className="flex-shrink-0 text-slate-300 hover:text-primary-600 transition-colors p-1">
                  {isCompleted ? <CheckCircle2 size={22} className="text-primary-500" /> : <Circle size={22} />}
                </button>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-primary-50 text-primary-600 shadow-sm border border-primary-100/50'}`}>
                  <IconCmp size={18} />
                </div>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleTaskStatus(task.id)}>
                  <p className={`text-sm font-bold truncate ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{task.title}</p>
                  <p className="text-[11px] font-medium mt-0.5 text-slate-500">
                    {formatTime12Hour(task.time)}{task.endTime ? ` – ${formatTime12Hour(task.endTime)}` : ''}
                  </p>
                </div>
                {!isCompleted && (
                  <button onClick={(e) => { e.stopPropagation(); localStorage.setItem('ucc_focus_task', JSON.stringify(task)); navigate('/focus'); }}
                    className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors ml-auto flex-shrink-0" title="Start Focus Timer">
                    <Play size={18} className="fill-current" />
                  </button>
                )}
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

      {thisWeekDeadlines.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1">
              <Clock size={10} /> Coming Up
            </span>
            <button onClick={() => navigate('/tools/assignments')} className="text-[10px] font-bold text-primary-400 hover:underline">View all</button>
          </div>
          {thisWeekDeadlines.map(a => {
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const d = new Date(a.dueDate + 'T12:00:00');
            const diffDays = Math.round((d - today) / 86400000);
            let dayLabel = '';
            if (diffDays === 1) dayLabel = 'Tomorrow';
            else if (diffDays <= 7) dayLabel = `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()}`;
            return (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100/60">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.priority === 'high' ? 'bg-red-100 text-red-600' : a.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                  <FileText size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate text-gray-900">{a.title}</p>
                  <p className="text-[10px] font-medium text-amber-700">
                    {dayLabel}{a.dueTime ? ` • ${formatTime12Hour(a.dueTime)}` : ''}{a.course ? ` • ${a.course}` : ''}
                  </p>
                </div>
                <button onClick={() => navigate('/tools/assignments')}
                  className="text-[9px] font-bold px-2 py-1 rounded-md bg-white shadow-sm border border-gray-100 text-primary-400 hover:bg-primary-400/5 active:scale-95 transition-all flex-shrink-0">Open</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TasksSection;
