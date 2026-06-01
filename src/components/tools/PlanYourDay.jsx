import React, { useState, useEffect, useMemo } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import useProfile from '../../hooks/useProfile';
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

const TERMS = [
  '100_1', '100_2', '200_1', '200_2', '300_1', '300_2',
  '400_1', '400_2', '500_1', '500_2', '600_1', '600_2'
];

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

// ─── Time-of-day SVG icons ─────────────────────────────────────────
const MorningIcon = ({ size = 16, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M9.98392 5.05991C11.1323 3.22236 13.1734 2 15.5 2C19.0899 2 22 4.91015 22 8.5C22 9.58031 21.7365 10.5991 21.2701 11.4955C22.3351 12.4985 23 13.9216 23 15.5C23 18.5376 20.5376 21 17.5 21H9C4.58172 21 1 17.4183 1 13C1 8.58172 4.58172 5 9 5C9.33312 5 9.66149 5.02036 9.98392 5.05991ZM12.0554 5.60419C14.0675 6.43637 15.6662 8.06578 16.4576 10.0986C16.7951 10.0339 17.1436 10 17.5 10C18.2351 10 18.9366 10.1442 19.5776 10.4059C19.8486 9.82719 20 9.18128 20 8.5C20 6.01472 17.9853 4 15.5 4C14.1177 4 12.8809 4.6233 12.0554 5.60419ZM17.5 19C19.433 19 21 17.433 21 15.5C21 13.567 19.433 12 17.5 12C16.5205 12 15.6351 12.4023 14.9998 13.0507C14.9999 13.0338 15 13.0169 15 13C15 9.68629 12.3137 7 9 7C5.68629 7 3 9.68629 3 13C3 16.3137 5.68629 19 9 19H17.5Z"/>
    </svg>
);

const AfternoonIcon = ({ size = 16, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"/>
    </svg>
);

const EveningIcon = ({ size = 16, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"/>
    </svg>
);

const DowntimeIcon = ({ size = 16, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width={size} height={size} className={className}>
        <path d="M6.525 20c-0.43335 0 -0.79165 -0.14165 -1.075 -0.425s-0.425 -0.64165 -0.425 -1.075c0 -0.3 0.075 -0.5875 0.225 -0.8625 0.15 -0.275 0.36665 -0.47085 0.65 -0.5875l4.3 -1.7v-3.45c-1.1 1.35 -2.21665 2.36665 -3.35 3.05 -1.13335 0.68335 -2.416665 1.025 -3.85 1.025v-1.5c1.133335 0 2.16665 -0.2625 3.1 -0.7875 0.93335 -0.525 1.775 -1.2625 2.525 -2.2125l1.45 -1.625c0.16665 -0.2 0.3625 -0.36665 0.5875 -0.5 0.225 -0.13335 0.47085 -0.2 0.7375 -0.2h1.2c0.26665 0 0.51665 0.06665 0.75 0.2 0.23335 0.13335 0.43335 0.3 0.6 0.5l1.45 1.625c0.8 0.91665 1.65 1.64585 2.55 2.1875 0.9 0.54165 1.91665 0.8125 3.05 0.8125v1.5c-1.41665 0 -2.69585 -0.34165 -3.8375 -1.025 -1.14165 -0.68335 -2.2625 -1.7 -3.3625 -3.05v3.45l4.3 1.7c0.28335 0.11665 0.5 0.3125 0.65 0.5875 0.15 0.275 0.225 0.5625 0.225 0.8625 0 0.43335 -0.14165 0.79165 -0.425 1.075s-0.64165 0.425 -1.075 0.425H9.9v-0.275c0 -0.43335 0.13335 -0.78335 0.4 -1.05 0.26665 -0.26665 0.61665 -0.4 1.05 -0.4h3.325c0.13335 0 0.25 -0.05 0.35 -0.15 0.1 -0.1 0.15 -0.21665 0.15 -0.35 0 -0.13335 -0.05 -0.25 -0.15 -0.35 -0.1 -0.1 -0.21665 -0.15 -0.35 -0.15H11.35c-0.73335 0 -1.31665 0.225 -1.75 0.675 -0.43335 0.45 -0.65 1.04165 -0.65 1.775V20h-2.425ZM12 7.65c-0.5 0 -0.92915 -0.17915 -1.2875 -0.5375 -0.35835 -0.35835 -0.5375 -0.7875 -0.5375 -1.2875 0 -0.5 0.17915 -0.929165 0.5375 -1.2875C11.07085 4.179165 11.5 4 12 4c0.5 0 0.92915 0.179165 1.2875 0.5375 0.35835 0.358335 0.5375 0.7875 0.5375 1.2875 0 0.5 -0.17915 0.92915 -0.5375 1.2875C12.92915 7.47085 12.5 7.65 12 7.65Z"/>
    </svg>
);

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

// ─── COMPACT QUICK FILL GROUPS ─────────────────────────────────────
const QUICK_FILL_GROUPS = [
    {
        label: 'Morning',
        Icon: MorningIcon,
        items: [
            { label: 'Breakfast',     icon: 'food',     title: 'Breakfast',              time: '07:00', endTime: '07:45' },
            { label: 'Study',         icon: 'study',    title: 'Morning Study Session',  time: '06:30', endTime: '08:00' },
            { label: 'Library',       icon: 'library',  title: 'Go to Library',          time: '09:00', endTime: '12:00' },
            { label: 'Exercise',      icon: 'gym',      title: 'Morning Exercise',       time: '06:00', endTime: '07:00' },
        ]
    },
    {
        label: 'Afternoon',
        Icon: AfternoonIcon,
        items: [
            { label: 'Lunch',         icon: 'food',     title: 'Lunch Break',            time: '12:30', endTime: '13:30' },
            { label: 'Laptop Work',   icon: 'code',     title: 'Work on Laptop',         time: '14:00', endTime: '16:00' },
            { label: 'Job / Gig',     icon: 'work',     title: 'Part-time Job',          time: '14:00', endTime: '18:00' },
            { label: 'Shopping',      icon: 'shopping', title: 'Run Errands / Shopping', time: '15:00', endTime: '16:00' },
        ]
    },
    {
        label: 'Evening',
        Icon: EveningIcon,
        items: [
            { label: 'Meetup',        icon: 'meeting',  title: 'Meet up with Friends',   time: '17:00', endTime: '18:30' },
            { label: 'Dinner',        icon: 'food',     title: 'Dinner',                 time: '18:30', endTime: '19:30' },
            { label: 'Revision',      icon: 'study',    title: 'Evening Revision',       time: '19:00', endTime: '21:00' },
            { label: 'Night Library', icon: 'library',  title: 'Night Library Session',  time: '18:00', endTime: '21:00' },
        ]
    },
    {
        label: 'Downtime',
        Icon: DowntimeIcon,
        items: [
            { label: 'Rest / Nap',    icon: 'relax',    title: 'Rest / Nap',             time: '14:00', endTime: '15:00' },
            { label: 'Gaming',        icon: 'gaming',   title: 'Play Games',             time: '20:00', endTime: '22:00' },
            { label: 'Chill',         icon: 'relax',    title: 'Chill / Relax',          time: '21:00', endTime: '22:30' },
        ]
    }
];

const PlanYourDay = () => {
    const [profile, setProfile] = useProfile();
    const [tasks, setTasks] = useLocalStorage('ucc_daily_tasks', []);
    const [timetable] = useLocalStorage('ucc_timetable', []);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getTodayStr());
    const [activeTask, setActiveTask] = useState(null);
    
    // Form State
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('study');
    const [taskDate, setTaskDate] = useState(getTodayStr());
    const [activeQuickFill, setActiveQuickFill] = useState(null);

    // ─── BACKFILL: Patch existing tasks that lack academic_year/semester ───
    useEffect(() => {
        const needsBackfill = tasks.some(t => !t.academic_year || !t.semester);
        if (!needsBackfill) return;

        const defaultYear = profile?.level || '100';
        const defaultSem  = profile?.semester || '1';

        const patched = tasks.map(t => ({
            ...t,
            academic_year: t.academic_year || defaultYear,
            semester:      t.semester || defaultSem,
        }));

        setTasks(patched);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ─── DERIVE active term from profile (SOURCE OF TRUTH) ───
    const activeTerm = `${profile?.level || '100'}_${profile?.semester || '1'}`;
    const activeTermIndex = TERMS.indexOf(activeTerm) >= 0 ? TERMS.indexOf(activeTerm) : 0;
    const [activeLevel, activeSemester] = activeTerm.split('_');

    const setActiveTermIndex = (newIndex) => {
        const term = TERMS[newIndex];
        if (!term) return;
        const [level, semester] = term.split('_');
        setProfile(prev => ({ ...prev, level, semester }));
    };

    // ─── FILTER: Only tasks & timetable for the active term ───
    const semesterTasks = useMemo(() => {
        return tasks.filter(t => `${t.academic_year}_${t.semester}` === activeTerm);
    }, [tasks, activeTerm]);

    const semesterTimetable = useMemo(() => {
        return timetable.filter(c => {
            const cYear = c.academic_year || profile?.level || '100';
            const cSem = c.semester || profile?.semester || '1';
            return `${cYear}_${cSem}` === activeTerm;
        });
    }, [timetable, activeTerm, profile]);

    // Navigate between dates
    const navigateDate = (offset) => {
        const d = new Date(selectedDate + 'T00:00:00');
        d.setDate(d.getDate() + offset);
        setSelectedDate(formatDateStr(d));
    };

    // Filter tasks for the selected date
    const todaysTasks = useMemo(() => {
        return semesterTasks.filter(t => t.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));
    }, [semesterTasks, selectedDate]);

    // Smart Suggestions from Timetable
    const suggestedClasses = useMemo(() => {
        const d = new Date(selectedDate + 'T00:00:00');
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[d.getDay()];
        if (!Array.isArray(semesterTimetable)) return [];
        
        const classesForDay = semesterTimetable.filter(c => c.day && c.day.toLowerCase() === dayName.toLowerCase());
        
        return classesForDay.filter(cls => {
            const classTitle = cls.courseName || cls.name || 'Class';
            const expectedTitle = `Revise ${classTitle}`;
            return !todaysTasks.some(t => t.title === expectedTitle);
        });
    }, [semesterTimetable, selectedDate, todaysTasks]);

    const handleQuickFill = (template, groupIdx, itemIdx) => {
        const key = `${groupIdx}-${itemIdx}`;
        setTitle(template.title);
        setSelectedIcon(template.icon);
        setTime(template.time);
        if (template.endTime) setEndTime(template.endTime);
        setActiveQuickFill(key);
        setTimeout(() => setActiveQuickFill(null), 300);
    };

    const handleAddSuggestion = (cls) => {
        let suggestedTime = '08:00';
        const classTimeStr = cls.startTime || cls.time;
        
        if (classTimeStr) {
            const [h, m] = classTimeStr.split(':').map(Number);
            const newH = h - 1 < 0 ? 23 : h - 1;
            suggestedTime = `${String(newH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        }
        
        const newTask = {
            id: Date.now().toString(),
            title: `Revise ${cls.courseName || cls.name || 'Class'}`,
            time: suggestedTime,
            endTime: null,
            icon: 'study',
            status: 'pending',
            date: selectedDate,
            academic_year: activeLevel,
            semester: activeSemester
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
                date: taskDate,
                academic_year: activeLevel,
                semester: activeSemester
            } : t));
        } else {
            const newTask = {
                id: Date.now().toString(),
                title: title.trim(),
                time: time,
                endTime: endTime || null,
                icon: selectedIcon,
                status: 'pending',
                date: taskDate,
                academic_year: activeLevel,
                semester: activeSemester
            };
            setTasks([...tasks, newTask]);
        }
        
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
            
            // Tombstone for sync
            try {
              const deleted = JSON.parse(localStorage.getItem('ucc_daily_tasks_deleted') || '[]');
              if (!deleted.includes(taskToDelete)) {
                deleted.push(taskToDelete);
                localStorage.setItem('ucc_daily_tasks_deleted', JSON.stringify(deleted));
              }
            } catch (e) {
              console.error('Error saving task tombstone:', e);
            }
            
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
            <div className="p-6 md:p-8 border-b border-gray-100 bg-slate-50 flex flex-col gap-4">
                <div className="flex items-center justify-between">
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

                {/* ── Semester Toggle UI ── */}
                <div className="flex items-center justify-center bg-white rounded-2xl p-2 max-w-sm w-full mx-auto shadow-sm border border-gray-100">
                    <button 
                        onClick={() => setActiveTermIndex(Math.max(0, activeTermIndex - 1))}
                        disabled={activeTermIndex === 0}
                        className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex-1 text-center flex flex-col">
                        <span className="text-sm font-black text-gray-900">Level {activeLevel}</span>
                        <span className="text-[10px] font-bold text-gray-900/60 uppercase tracking-widest">Semester {activeSemester}</span>
                    </div>
                    <button 
                        onClick={() => setActiveTermIndex(Math.min(TERMS.length - 1, activeTermIndex + 1))}
                        disabled={activeTermIndex === TERMS.length - 1}
                        className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
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
                                                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
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
                            {/* ─── COMPACT QUICK FILL ─── */}
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