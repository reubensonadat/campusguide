import React from 'react';
import { Clock, Share2, Edit3, Trash2, Circle, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { StudyIcon } from '../common/CustomTaskIcons';
import { PRIORITY_STYLES, STATUS_STYLES, formatDate, formatTime12 } from './assignmentsConstants';

const StatusIconComponent = ({ iconName, size }) => {
  const icons = { Circle, CheckCircle2, AlertTriangle, X };
  const Icon = icons[iconName] || Circle;
  return <Icon size={size} />;
};

const AssignmentCard = ({ assignment, compact, onStatusChange, onEdit, onDelete, onShare }) => {
  const a = assignment;
  const p = PRIORITY_STYLES[a.priority] || PRIORITY_STYLES.medium;
  const s = STATUS_STYLES[a.status] || STATUS_STYLES.pending;

  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = a.status === 'pending' && a.dueDate < todayStr;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl ${p.bg} border ${p.border}`}>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.dot}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-[11px] sm:text-xs font-bold ${isOverdue ? 'text-red-800' : 'text-gray-900'} truncate ${a.status !== 'pending' ? 'line-through opacity-60' : ''}`}>{a.title}</p>
          {a.course && <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 truncate">{a.course}</p>}
        </div>
        {a.dueTime && <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 flex-shrink-0">{formatTime12(a.dueTime)}</span>}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 transition-all ${isOverdue ? 'ring-1 ring-red-200' : ''}`}>
      <div className="flex items-start gap-2 sm:gap-3">
        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 mt-1 ${p.dot} ${isOverdue ? 'animate-pulse' : ''}`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1.5 sm:gap-2">
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] sm:text-sm font-bold ${isOverdue ? 'text-red-800' : 'text-gray-900'} ${a.status !== 'pending' ? 'line-through opacity-60' : ''}`}>
                {a.title}
              </p>
              {a.course && (
                <div className="flex items-center gap-1 mt-0.5">
                  <StudyIcon size={10} className="text-gray-400 flex-shrink-0" />
                  <p className="text-[11px] sm:text-xs font-medium text-gray-500 truncate">{a.course}</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              {onShare && (
                <button onClick={() => onShare(a)} className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors" title="Share deadline">
                  <Share2 size={12} />
                </button>
              )}
              <button onClick={() => onEdit(a)} className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
                <Edit3 size={12} />
              </button>
              <button onClick={() => onDelete(a.id)} className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 flex-wrap">
            <span className={`inline-flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md ${p.bg} ${p.text} ${p.border} border`}>
              <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${p.dot}`} />
              {p.label}
            </span>
            <span className={`inline-flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md ${s.bg} ${s.text} ${s.border} border`}>
              <StatusIconComponent iconName={s.icon} size={9} />
              {s.label}
            </span>
            <span className={`text-[9px] sm:text-[10px] font-bold flex items-center gap-0.5 sm:gap-1 ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
              <Clock size={9} />
              {formatDate(a.dueDate)}
              {a.dueTime && <span className="hidden sm:inline">&bull;</span>}
              {a.dueTime && <span className="sm:hidden">&middot;</span>}
              {a.dueTime && formatTime12(a.dueTime)}
            </span>
          </div>

          {a.notes && (
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1.5 sm:mt-2 leading-relaxed line-clamp-2">{a.notes}</p>
          )}

          {a.status === 'pending' && (
            <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 flex-wrap">
              <button
                onClick={() => onStatusChange(a.id, 'submitted')}
                className="text-[9px] sm:text-[10px] font-bold text-green-700 bg-green-50 border border-green-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg active:scale-95 transition-transform hover:bg-green-100"
              >
                Submitted
              </button>
              <button
                onClick={() => onStatusChange(a.id, 'late')}
                className="text-[9px] sm:text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg active:scale-95 transition-transform hover:bg-orange-100"
              >
                Late
              </button>
              <button
                onClick={() => onStatusChange(a.id, 'missed')}
                className="text-[9px] sm:text-[10px] font-bold text-red-700 bg-red-50 border border-red-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg active:scale-95 transition-transform hover:bg-red-100"
              >
                Missed
              </button>
            </div>
          )}

          {a.status !== 'pending' && (
            <button
              onClick={() => onStatusChange(a.id, 'pending')}
              className="text-[9px] sm:text-[10px] font-bold text-primary-400 mt-2 sm:mt-3 hover:underline flex items-center gap-1"
            >
              <Circle size={8} /> Revert to Pending
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
