import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
    Plus, Trash2, CheckCircle2, Circle,
    BookOpen, Library, Coffee, Dumbbell,
    Users, Monitor, Moon, Briefcase,
    Gamepad2, ShoppingCart, ListTodo,
    X as XIcon, Clock, ChevronLeft, ChevronRight, Calendar
} from 'lucide-react';

const AVAILABLE_ICONS = [
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'study', icon: BookOpen, label: 'Study' },
    { id: 'food', icon: Coffee, label: 'Food/Break' },
    { id: 'gym', icon: Dumbbell, label: 'Exercise' },
    { id: 'meeting', icon: Users, label: 'Meeting' },
    { id: 'code', icon: Monitor, label: 'Computer Work' },
    { id: 'relax', icon: Moon, label: 'Relax/Sleep' },
    { id: 'work', icon: Briefcase, label: 'Work/Gig' },
    { id: 'gaming', icon: Gamepad2, label: 'Gaming' },
    { id: 'shopping', icon: ShoppingCart, label: 'Shopping' }
];

export const getIconComponent = (iconId) => {
    const found = AVAILABLE_ICONS.find(i => i.id === iconId);
    return found ? found.icon : ListTodo;
};

// Date helpers
const formatDateStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const getTodayStr = () => formatDateStr(new Date());

const formatDateDisplay = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    const today = getTodayStr();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = formatDateStr(tomorrow);
    
    if (dateStr === today) return 'Today';
    if (dateStr === tomorrowStr) return 'Tomorrow';
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
};

const PlanYourDay = () => {
    const [tasks, setTasks] = useLocalStorage('ucc_daily_tasks', []);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getTodayStr());
    
    // Form State
    const [title, setTitle] = useState('');
    const [time, setTime] = useState(''); // Start time
    const [endTime, setEndTime] = useState(''); // Optional End time
    const [selectedIcon, setSelectedIcon] = useState('study');
    const [taskDate, setTaskDate] = useState(getTodayStr());

    // Navigate between dates
    const navigateDate = (offset) => {
        const d = new Date(selectedDate + 'T00:00:00');
        d.setDate(d.getDate() + offset);
        setSelectedDate(formatDateStr(d));
    };

    // Filter tasks for the selected date
    const todaysTasks = tasks.filter(t => t.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!title.trim() || !time) return;

        const newTask = {
            id: Date.now().toString(),
            title: title.trim(),
            time: time,
            endTime: endTime || null,
            icon: selectedIcon,
            status: 'pending',
            date: taskDate
        };

        setTasks([...tasks, newTask]);
        
        // Reset form
        setTitle('');
        setTime('');
        setEndTime('');
        setSelectedIcon('study');
        setTaskDate(selectedDate);
        setIsAddModalOpen(false);
    };

    // Open modal and default date to currently viewed date
    const openAddModal = () => {
        setTaskDate(selectedDate);
        setIsAddModalOpen(true);
    };

    const toggleTaskStatus = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id) {
                return { ...t, status: t.status === 'completed' ? 'pending' : 'completed' };
            }
            return t;
        }));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const formatTime12Hour = (time24) => {
        if (!time24) return '';
        const [hours, minutes] = time24.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden relative min-h-[60vh]">
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-slate-50">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Plan Your Day</h2>
                    <p className="text-sm font-medium text-slate-500 mt-1">Organize your daily routine outside of classes.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-primary-600 hover:bg-primary-700 text-white p-3 md:px-5 md:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                >
                    <Plus size={18} />
                    <span className="hidden md:inline font-bold">Add Event</span>
                </button>
            </div>

            {/* Date Navigation */}
            <div className="px-4 md:px-8 py-3 border-b border-slate-100 bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                        <button
                            onClick={() => navigateDate(-1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition-colors active:scale-95"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm font-bold text-slate-900 min-w-[110px] text-center select-none">
                            {formatDateDisplay(selectedDate)}
                        </span>
                        <button
                            onClick={() => navigateDate(1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition-colors active:scale-95"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedDate !== getTodayStr() && (
                            <button
                                onClick={() => setSelectedDate(getTodayStr())}
                                className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-2 rounded-lg hover:bg-primary-100 transition-colors active:scale-95"
                            >
                                Today
                            </button>
                        )}
                        <label className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors active:scale-95 relative">
                            <Calendar size={20} />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8">
                {todaysTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-4 text-primary-500">
                            <ListTodo size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          {selectedDate === getTodayStr() ? 'No tasks for today' : `No tasks for ${formatDateDisplay(selectedDate)}`}
                        </h3>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
                          {selectedDate === getTodayStr()
                            ? 'Your day is entirely free! Add some study sessions, library visits, or gym time.'
                            : 'Nothing planned for this date yet. Add a task or navigate to another day.'}
                        </p>
                        <button
                            onClick={openAddModal}
                            className="text-primary-600 font-bold bg-primary-50 px-5 py-2.5 rounded-xl hover:bg-primary-100 transition-colors"
                        >
                            Create your first task
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {todaysTasks.map((task) => {
                            const IconComponent = getIconComponent(task.icon);
                            const isCompleted = task.status === 'completed';

                            return (
                                <div key={task.id} className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${isCompleted ? 'bg-slate-50/50 border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm hover:border-primary-200'}`}>
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <button 
                                            onClick={() => toggleTaskStatus(task.id)}
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
                                    
                                    <button 
                                        onClick={() => deleteTask(task.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors md:opacity-0 group-hover:opacity-100 focus:outline-none"
                                        title="Delete Task"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ADD TASK MODAL */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="absolute inset-0" onClick={() => setIsAddModalOpen(false)}></div>
                    
                    <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                        <div className="pt-3 pb-1 flex justify-center items-center w-full shrink-0 sm:hidden">
                            <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                        </div>

                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-xl font-black text-slate-900">Add New Event</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors">
                                <XIcon size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleAddTask} className="p-6 overflow-y-auto">
                            <div className="space-y-5">
                                {/* Date */}
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

                                {/* Title */}
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

                                {/* Time (Start & End) */}
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

                                {/* Icon Picker */}
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

                            <button 
                                type="submit"
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 rounded-xl mt-8 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                            >
                                Schedule Event
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanYourDay;
