import { Trash2, CheckCircle2, Circle, Edit3, Clock } from 'lucide-react';
import { getIconComponent, formatTime12Hour } from './helpers';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
    const IconComponent = getIconComponent(task.icon);
    const isCompleted = task.status === 'completed';

    return (
        <div className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${isCompleted ? 'bg-slate-50/50 border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm hover:border-primary-200'}`}>
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <button
                    onClick={() => onToggle(task.id)}
                    className="text-slate-400 hover:text-primary-600 transition-colors flex-shrink-0 focus:outline-none"
                >
                    {isCompleted ? <CheckCircle2 size={24} className="text-primary-500" /> : <Circle size={24} />}
                </button>

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-primary-50 text-primary-600'}`}>
                    <IconComponent size={18} />
                </div>

                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                        {task.title}
                    </p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock size={12} /> {formatTime12Hour(task.time)}
                        {task.endTime ? ` – ${formatTime12Hour(task.endTime)}` : ''}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1">
                {!isCompleted && (
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Edit Task"
                    >
                        <Edit3 size={16} />
                    </button>
                )}
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Task"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
