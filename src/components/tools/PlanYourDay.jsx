import React, { useState, useEffect, useMemo } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import useProfile from '../../hooks/useProfile';
import { Plus, ListTodo, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { StudyIcon } from '../common/CustomTaskIcons';
import { formatDateDisplay, formatTime12Hour, getTodayStr, formatDateStr } from './planYourDay/helpers';
import { TERMS } from './planYourDay/constants';
import TaskItem from './planYourDay/TaskItem';
import AddTaskModal from './planYourDay/AddTaskModal';
import DeleteConfirmModal from './planYourDay/DeleteConfirmModal';

export { getIconComponent } from './planYourDay/helpers';

const PlanYourDay = () => {
    const [profile, setProfile] = useProfile();
    const [tasks, setTasks] = useLocalStorage('ucc_daily_tasks', []);
    const [timetable] = useLocalStorage('ucc_timetable', []);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getTodayStr());

    const [editingTask, setEditingTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [conflictConfirmTask, setConflictConfirmTask] = useState(null);
    const [conflictingClass, setConflictingClass] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const taskId = params.get('taskId');
        if (taskId) {
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                setSelectedDate(task.date);
                setTimeout(() => {
                    const el = document.getElementById(`task-item-${taskId}`);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        el.style.transition = 'box-shadow 0.3s, transform 0.3s';
                        el.style.boxShadow = '0 0 0 3px var(--primary-500)';
                        setTimeout(() => { el.style.boxShadow = ''; }, 3000);
                    }
                }, 500);
            }
        }
    }, []);

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
    }, []);

    const activeTerm = `${profile?.level || '100'}_${profile?.semester || '1'}`;
    const activeTermIndex = TERMS.indexOf(activeTerm) >= 0 ? TERMS.indexOf(activeTerm) : 0;
    const [activeLevel, activeSemester] = activeTerm.split('_');

    const setActiveTermIndex = (newIndex) => {
        const term = TERMS[newIndex];
        if (!term) return;
        const [level, semester] = term.split('_');
        setProfile(prev => ({ ...prev, level, semester }));
    };

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

    const navigateDate = (offset) => {
        const d = new Date(selectedDate + 'T00:00:00');
        d.setDate(d.getDate() + offset);
        setSelectedDate(formatDateStr(d));
    };

    const todaysTasks = useMemo(() => {
        return semesterTasks.filter(t => t.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));
    }, [semesterTasks, selectedDate]);

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

    const checkConflictWithClass = (taskDate, startTime, endTime) => {
        if (!taskDate || !startTime) return null;
        const d = new Date(taskDate + 'T00:00:00');
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[d.getDay()];

        const classForDay = semesterTimetable.filter(c => c.day && c.day.toLowerCase() === dayName.toLowerCase());
        
        const timeToDecimal = (t) => {
            const [h, m] = t.split(':').map(Number);
            return h + m / 60;
        };

        const taskStart = timeToDecimal(startTime);
        const taskEnd = endTime ? timeToDecimal(endTime) : taskStart + 1; // default to 1 hour task if no end time

        return classForDay.find(c => {
            const classStart = timeToDecimal(c.startTime);
            const classEnd = timeToDecimal(c.endTime);
            return (
                (taskStart >= classStart && taskStart < classEnd) ||
                (taskEnd > classStart && taskEnd <= classEnd) ||
                (taskStart <= classStart && taskEnd >= classEnd)
            );
        });
    };

    const handleAddTask = (data, bypassConflict = false) => {
        if (!bypassConflict) {
            const conflict = checkConflictWithClass(data.date, data.time, data.endTime);
            if (conflict) {
                setConflictConfirmTask(data);
                setConflictingClass(conflict);
                setIsAddModalOpen(false);
                return;
            }
        }

        if (data.id) {
            setTasks(tasks.map(t => t.id === data.id ? {
                ...t,
                title: data.title,
                time: data.time,
                endTime: data.endTime || null,
                icon: data.icon,
                date: data.date,
                academic_year: activeLevel,
                semester: activeSemester
            } : t));
        } else {
            const newTask = {
                id: Date.now().toString(),
                title: data.title,
                time: data.time,
                endTime: data.endTime || null,
                icon: data.icon,
                status: 'pending',
                date: data.date,
                academic_year: activeLevel,
                semester: activeSemester
            };
            setTasks([...tasks, newTask]);
        }

        setEditingTask(null);
        setIsAddModalOpen(false);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsAddModalOpen(true);
    };

    const openAddModal = () => {
        setEditingTask(null);
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
                        {todaysTasks.map(task => (
                            <div key={task.id} id={`task-item-${task.id}`}>
                            <TaskItem
                                task={task}
                                onToggle={toggleTaskStatus}
                                onEdit={handleEditTask}
                                onDelete={confirmDelete}
                            />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AddTaskModal
                isOpen={isAddModalOpen}
                onClose={() => { setIsAddModalOpen(false); setEditingTask(null); }}
                onSubmit={handleAddTask}
                editingTaskId={editingTask?.id}
                initialTitle={editingTask?.title}
                initialTime={editingTask?.time}
                initialEndTime={editingTask?.endTime}
                initialIcon={editingTask?.icon}
                initialDate={editingTask?.date || selectedDate}
            />

            {taskToDelete && (
                <DeleteConfirmModal
                    onConfirm={deleteTask}
                    onCancel={() => setTaskToDelete(null)}
                />
            )}

            {conflictConfirmTask && conflictingClass && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[28px] w-full max-w-sm p-6 shadow-2xl relative z-10 text-center animate-fade-in-up">
                        <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">Schedule Conflict</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                            You have a class <span className="font-extrabold text-slate-900">"{conflictingClass.name}"</span> scheduled at <span className="font-bold text-slate-700">{formatTime12Hour(conflictingClass.startTime)} - {formatTime12Hour(conflictingClass.endTime)}</span>. 
                            Are you sure you want to schedule this event during class hours?
                        </p>
                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    handleAddTask(conflictConfirmTask, true);
                                    setConflictConfirmTask(null);
                                    setConflictingClass(null);
                                }}
                                className="w-full bg-slate-950 hover:bg-black text-white py-3.5 rounded-[18px] font-bold transition-all active:scale-[0.98]"
                            >
                                Yes, Schedule Anyway
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setConflictConfirmTask(null);
                                    setConflictingClass(null);
                                    setIsAddModalOpen(true); // reopen the form to fix the time
                                }}
                                className="w-full hover:bg-slate-50 text-slate-600 py-3.5 rounded-[18px] font-bold transition-colors active:scale-[0.98]"
                            >
                                No, Change Time
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanYourDay;
