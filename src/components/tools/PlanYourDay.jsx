import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { FocusTimer } from './FocusTimer';
import {
    Plus, Trash2, CheckCircle2, Circle, ListTodo, Edit3,
    X as XIcon, Clock, ChevronLeft, ChevronRight, Calendar, Play
} from 'lucide-react';
import { 
    LibraryIcon, StudyIcon, FoodIcon, ExerciseIcon, 
    MeetingIcon, ComputerWorkIcon, SleepIcon, 
    JobIcon, PlayIcon, ShoppingIcon 
} from '../common/CustomTaskIcons';

const AVAILABLE_ICONS = [
    { id: 'library', icon: LibraryIcon, label: 'Library' },
    { id: 'study', icon: StudyIcon, label: 'Study' },
    { id: 'food', icon: FoodIcon, label: 'Food/Break' },
    { id: 'gym', icon: ExerciseIcon, label: 'Exercise' },
    { id: 'meeting', icon: MeetingIcon, label: 'Meeting' },
    { id: 'code', icon: ComputerWorkIcon, label: 'Computer Work' },
    { id: 'relax', icon: SleepIcon, label: 'Relax/Sleep' },
    { id: 'work', icon: JobIcon, label: 'Work/Gig' },
    { id: 'gaming', icon: PlayIcon, label: 'Play' },
    { id: 'shopping', icon: ShoppingIcon, label: 'Shopping' }
];

export const getIconComponent = (iconId) => {
    const found = AVAILABLE_ICONS.find(i => i.id === iconId);
    return found ? found.icon : StudyIcon;
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
    const [timetable] = useLocalStorage('ucc_timetable', []);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getTodayStr());
    const [activeTask, setActiveTask] = useState(null);
    
    // Form State
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState(''); // Start time
    const [endTime, setEndTime] = useState(''); // Optional End time
    const [selectedIcon, setSelectedIcon] = useState('study');
    const [taskDate, setTaskDate] = useState(getTodayStr());

    const QUICK_FILLS = [
        { label: 'Library', icon: 'library', title: 'Go to Library', time: '19:00' },
        { label: 'Rest', icon: 'sleep', title: 'Rest / Nap', time: '14:00' },
        { label: 'Games', icon: 'play', title: 'Play Games', time: '20:00' },
        { label: 'Meetup', icon: 'meeting', title: 'Meet up with people', time: '17:00' },
        { label: 'Exercise', icon: 'gym', title: 'Exercise', time: '07:00' },
        { label: 'Eat', icon: 'food', title: 'Lunch / Dinner', time: '13:00' },
        { label: 'Laptop Work', icon: 'code', title: 'Work on Laptop', time: '15:00' },
        { label: 'Job/Gig', icon: 'job', title: 'Part-time Job', time: '16:00' }
    ];

    const handleQuickFill = (template) => {
        setTitle(template.title);
        setSelectedIcon(template.icon);
        setTime(template.time);
    };

    // Navigate between dates
    const navigateDate = (offset) => {
        const d = new Date(selectedDate + 'T00:00:00');
        d.setDate(d.getDate() + offset);
        setSelectedDate(formatDateStr(d));
    };

    // Filter tasks for the selected date
    const todaysTasks = tasks.filter(t => t.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));

    // Smart Suggestions from Timetable
    const suggestedClasses = React.useMemo(() => {
        const d = new Date(selectedDate + 'T00:00:00');
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[d.getDay()];
        if (!Array.isArray(timetable)) return [];
        
        // Find classes for this day
        const classesForDay = timetable.filter(c => c.day && c.day.toLowerCase() === dayName.toLowerCase());
        
        // Filter out classes that already have a corresponding task
        return classesForDay.filter(cls => {
            const classTitle = cls.courseName || cls.name || 'Class';
            const expectedTitle = `Revise ${classTitle}`;
            return !todaysTasks.some(t => t.title === expectedTitle);
        });
    }, [timetable, selectedDate, todaysTasks]);

    const handleAddSuggestion = (cls) => {
        let suggestedTime = '08:00'; // Default
        const classTimeStr = cls.startTime || cls.time;
        
        if (classTimeStr) {
            const [h, m] = classTimeStr.split(':').map(Number);
            const newH = h - 1 < 0 ? 23 : h - 1; // 1 hour before
            suggestedTime = `${String(newH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        }
        
        const newTask = {
            id: Date.now().toString(),
            title: `Revise ${cls.courseName || cls.name || 'Class'}`,
            time: suggestedTime,
            endTime: null,
            icon: 'study',
            status: 'pending',
            date: selectedDate
        };
        setTasks([...tasks, newTask]);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!title.trim() || !time) return;

        if (editingTaskId) {
            setTasks(tasks.map(t => t.id === editingTaskId ? {
                ...t,
                title: title.trim(),
                time: time,
                endTime: endTime || null,
                icon: selectedIcon,
                date: taskDate
            } : t));
        } else {
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
        }
        
        // Reset form
        setEditingTaskId(null);
        setTitle('');
        setTime('');
        setEndTime('');
        setSelectedIcon('study');
        setTaskDate(selectedDate);
        setIsAddModalOpen(false);
    };

    const handleEditTask = (task) => {
        setEditingTaskId(task.id);
        setTitle(task.title);
        setTime(task.time);
        setEndTime(task.endTime || '');
        setSelectedIcon(task.icon);
        setTaskDate(task.date);
        setIsAddModalOpen(true);
    };

    // Open modal and default date to currently viewed date
    const openAddModal = () => {
        setEditingTaskId(null);
        setTitle('');
        setTime('');
        setEndTime('');
        setSelectedIcon('study');
        setTaskDate(selectedDate);
        setIsAddModalOpen(true);
    };

    const toggleTaskStatus = (id, forceComplete = false) => {
        setTasks(tasks.map(t => {
            if (t.id === id) {
                return { ...t, status: forceComplete ? 'completed' : (t.status === 'completed' ? 'pending' : 'completed') };
            }
            return t;
        }));
    };

    const confirmDelete = (id) => {
        setTaskToDelete(id);
    };

    const deleteTask = () => {
        if (taskToDelete) {
            setTasks(tasks.filter(t => t.id !== taskToDelete));
            setTaskToDelete(null);
        }
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
                
                {/* Smart Suggestions */}
                {suggestedClasses.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Smart Suggestions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {suggestedClasses.map(cls => (
                                <button
                                    key={cls.id}
                                    onClick={() => handleAddSuggestion(cls)}
                                    className="group text-left p-4 rounded-xl border border-primary-100 bg-primary-50/50 hover:bg-primary-50 hover:border-primary-200 hover:shadow-sm transition-all flex items-start justify-between gap-2"
                                >
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <StudyIcon size={16} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-800 break-words leading-tight">Learn {cls.courseName || cls.name || 'Class'}</p>
                                            <p className="text-xs text-slate-500 font-medium mt-1">After class ({formatTime12Hour(cls.endTime || cls.startTime)})</p>
                                        </div>
                                    </div>
                                    <div className="mt-1 flex-shrink-0">
                                        <Plus size={18} className="text-primary-400 group-hover:text-primary-600 transition-colors" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

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
                                    
                                    <div className="flex items-center gap-1">
                                        {!isCompleted && (
                                            <button 
                                                onClick={() => handleEditTask(task)}
                                                className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Edit Task"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => confirmDelete(task.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Task"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
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
                    
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-fade-in-up">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-xl font-black text-slate-900">{editingTaskId ? 'Edit Task' : 'Add New Task'}</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors">
                                <XIcon size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleAddTask} className="p-6 overflow-y-auto max-h-[70vh]">
                            {/* Quick Fills */}
                            <div className="mb-6">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Fill</p>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {QUICK_FILLS.map((qf, i) => {
                                        const IconCmp = getIconComponent(qf.icon);
                                        return (
                                            <button 
                                                key={i} 
                                                type="button"
                                                onClick={() => handleQuickFill(qf)}
                                                className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-bold transition-colors"
                                            >
                                                <IconCmp size={16} /> {qf.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-4">
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

                            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl py-3 mt-8 shadow-sm transition-all">
                                {editingTaskId ? 'Save Changes' : 'Create Task'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Pomodoro Focus Timer */}
            {activeTask && (
                <FocusTimer 
                    task={activeTask} 
                    onComplete={(id) => {
                        toggleTaskStatus(id, true);
                        setActiveTask(null);
                    }}
                    onCancel={() => setActiveTask(null)}
                />
            )}
            {/* Delete Confirmation Modal */}
            {taskToDelete && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2">Delete Task?</h3>
                        <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setTaskToDelete(null)}
                                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={deleteTask}
                                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-sm transition-colors"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanYourDay;
