import React, { useMemo, useState, useEffect } from 'react';
import { ChevronRight, Circle, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import { getIconComponent } from '../tools/PlanYourDay';
import { getAssignmentsByUrgency, markAssignmentStatus, getAssignments, onAssignmentsChanged } from '../../services/assignmentService';
import { toast } from 'react-hot-toast';

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const TasksWidget = ({ todaysTasks, toggleTaskStatus, navigate }) => {
  // ── Assignment state (reactive) ──────────────────────────────────────────
  const [homeAssignments, setHomeAssignments] = useState(() => getAssignments());

  useEffect(() => {
    // Same-tab reactivity
    const unsub = onAssignmentsChanged(() => setHomeAssignments(getAssignments()));
    // Cross-tab reactivity
    const handleStorage = (e) => {
      if (e.key === 'ucc_assignments') setHomeAssignments(getAssignments());
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      unsub();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Urgent: overdue + today
  const urgentDeadlines = useMemo(() => {
    const urgency = getAssignmentsByUrgency(homeAssignments);
    return [...urgency.overdue, ...urgency.today].slice(0, 3);
  }, [homeAssignments]);

  // This week
  const thisWeekDeadlines = useMemo(() => {
    const urgency = getAssignmentsByUrgency(homeAssignments);
    return urgency.thisWeek.slice(0, 3);
  }, [homeAssignments]);

  const handleQuickMarkSubmitted = (id) => {
    const assignment = homeAssignments.find(a => a.id === id);
    const oldStatus = assignment?.status || 'pending';
    markAssignmentStatus(id, 'submitted');
    setHomeAssignments(getAssignments());
    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-900">Marked as submitted</span>
        <button
          onClick={() => {
            markAssignmentStatus(id, oldStatus);
            setHomeAssignments(getAssignments());
            toast.dismiss(t.id);
            toast.success('Status reverted!');
          }}
          className="text-xs font-bold text-primary-400 bg-primary-400/10 px-3 py-1 rounded-lg hover:bg-primary-400/20 transition-colors flex-shrink-0"
        >
          Undo
        </button>
      </div>
    ), {
      duration: 4000,
      icon: '\u2705',
      style: { borderRadius: '12px', padding: '12px 16px' },
    });
  };

  const hasAnyItems = todaysTasks.length > 0 || urgentDeadlines.length > 0 || thisWeekDeadlines.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-black text-gray-900 tracking-tight">Today's Tasks</span>
        <button onClick={() => navigate('/tools/plan-day')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
          Manage <ChevronRight size={13} />
        </button>
      </div>

      {!hasAnyItems ? (
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
          {/* ── Urgent Deadlines (overdue + today) ── */}
          {urgentDeadlines.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1">
                  <AlertTriangle size={10} /> Deadlines
                </span>
                <button onClick={() => navigate('/tools/assignments')} className="text-[10px] font-bold text-primary-400 hover:underline">
                  View all
                </button>
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
                    <button
                      onClick={() => handleQuickMarkSubmitted(a.id)}
                      className="text-[9px] font-bold px-2 py-1 rounded-md bg-white shadow-sm border border-gray-100 text-green-700 hover:bg-green-50 active:scale-95 transition-all flex-shrink-0"
                    >
                      Done
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Plan Your Day tasks ── */}
          {todaysTasks.slice(0, 3).map((task) => {
            const IconCmp = getIconComponent(task.icon);
            const isCompleted = task.status === 'completed';
            return (
              <div key={task.id} className={`flex items-center gap-3 p-2 -mx-2 rounded-xl transition-all hover:bg-slate-50 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
                <button 
                    onClick={() => toggleTaskStatus(task.id)}
                    className="flex-shrink-0 text-slate-300 hover:text-primary-600 transition-colors p-1"
                >
                    {isCompleted ? <CheckCircle2 size={22} className="text-primary-500" /> : <Circle size={22} />}
                </button>
                <div 
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-primary-50 text-primary-600 shadow-sm border border-primary-100/50'
                    }`}
                >
                  <IconCmp size={18} />
                </div>
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

          {/* ── This Week Deadlines ── */}
          {thisWeekDeadlines.length > 0 && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1">
                  <Clock size={10} /> Coming Up
                </span>
                <button onClick={() => navigate('/tools/assignments')} className="text-[10px] font-bold text-primary-400 hover:underline">
                  View all
                </button>
              </div>
              {thisWeekDeadlines.map(a => {
                const d = new Date(a.dueDate + 'T12:00:00');
                const today = new Date(); today.setHours(0,0,0,0);
                const diffDays = Math.round((d - today) / 86400000);
                let dayLabel = '';
                if (diffDays === 1) dayLabel = 'Tomorrow';
                else if (diffDays <= 7) dayLabel = `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()}`;

                return (
                  <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100/60">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      a.priority === 'high' ? 'bg-red-100 text-red-600' :
                      a.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <FileText size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate text-gray-900">{a.title}</p>
                      <p className="text-[10px] font-medium text-amber-700">
                        {dayLabel}{a.dueTime ? ` • ${formatTime12Hour(a.dueTime)}` : ''}{a.course ? ` • ${a.course}` : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/tools/assignments')}
                      className="text-[9px] font-bold px-2 py-1 rounded-md bg-white shadow-sm border border-gray-100 text-primary-400 hover:bg-primary-400/5 active:scale-95 transition-all flex-shrink-0"
                    >
                      Open
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {(todaysTasks.length > 3) && (
              <button onClick={() => navigate('/tools/plan-day')} className="w-full text-center text-xs font-bold text-gray-400 pt-2 hover:text-primary-600 transition-colors">
                  +{todaysTasks.length - 3} more tasks
              </button>
          )}
        </div>
      )}
    </div>
  );
};
