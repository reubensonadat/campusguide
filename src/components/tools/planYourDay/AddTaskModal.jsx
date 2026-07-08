import { useState } from 'react';
import { X as XIcon } from 'lucide-react';
import { QUICK_FILL_GROUPS, AVAILABLE_ICONS } from './constants';
import { getIconComponent } from './helpers';

const AddTaskModal = ({
    isOpen,
    onClose,
    onSubmit,
    editingTaskId,
    initialTitle,
    initialTime,
    initialEndTime,
    initialIcon,
    initialDate
}) => {
    const [title, setTitle] = useState(initialTitle || '');
    const [time, setTime] = useState(initialTime || '');
    const [endTime, setEndTime] = useState(initialEndTime || '');
    const [selectedIcon, setSelectedIcon] = useState(initialIcon || 'study');
    const [taskDate, setTaskDate] = useState(initialDate || '');
    const [activeQuickFill, setActiveQuickFill] = useState(null);

    if (!isOpen) return null;

    const handleQuickFill = (template, groupIdx, itemIdx) => {
        const key = `${groupIdx}-${itemIdx}`;
        setTitle(template.title);
        setSelectedIcon(template.icon);
        setTime(template.time);
        if (template.endTime) setEndTime(template.endTime);
        setActiveQuickFill(key);
        setTimeout(() => setActiveQuickFill(null), 300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !time) return;

        onSubmit({
            id: editingTaskId,
            title: title.trim(),
            time,
            endTime: endTime || null,
            icon: selectedIcon,
            date: taskDate
        });

        setTitle('');
        setTime('');
        setEndTime('');
        setSelectedIcon('study');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-fade-in-up">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-black text-slate-900">{editingTaskId ? 'Edit Task' : 'Add New Task'}</h2>
                    <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors">
                        <XIcon size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
                    <div className="mb-5">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Fill</p>
                        <div className="space-y-2">
                            {QUICK_FILL_GROUPS.map((group, gi) => (
                                <div key={gi} className="flex items-start gap-2">
                                    <div className="flex items-center gap-1 pt-1.5 flex-shrink-0 w-[72px]">
                                        <group.Icon size={13} className="text-slate-400" />
                                        <span className="text-[10px] font-semibold text-slate-400 leading-none">{group.label}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 flex-1">
                                        {group.items.map((qf, qi) => {
                                            const IconCmp = getIconComponent(qf.icon);
                                            const isActive = activeQuickFill === `${gi}-${qi}`;
                                            return (
                                                <button
                                                    key={`${gi}-${qi}`}
                                                    type="button"
                                                    onClick={() => handleQuickFill(qf, gi, qi)}
                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold border transition-all active:scale-95 ${
                                                        isActive
                                                            ? 'bg-primary-50 border-primary-300 text-primary-700'
                                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <IconCmp size={11} /> {qf.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                            <input
                                type="date"
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Name</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Study at Valco Library"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                required
                                autoFocus
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Start Time</label>
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">End Time (Optional)</label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Choose Icon</label>
                            <div className="grid grid-cols-5 gap-2">
                                {AVAILABLE_ICONS.map(iconObj => {
                                    const IconCmp = iconObj.icon;
                                    const isSelected = selectedIcon === iconObj.id;
                                    return (
                                        <button
                                            key={iconObj.id}
                                            type="button"
                                            onClick={() => setSelectedIcon(iconObj.id)}
                                            className={`aspect-square flex items-center justify-center rounded-xl border transition-all ${
                                                isSelected
                                                    ? 'bg-primary-50 border-primary-300 text-primary-600 scale-105 shadow-sm'
                                                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                            }`}
                                            title={iconObj.label}
                                        >
                                            <IconCmp size={20} strokeWidth={isSelected ? 2.5 : 2} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl py-3 mt-8 shadow-sm transition-all">
                        {editingTaskId ? 'Save Changes' : 'Create Task'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
