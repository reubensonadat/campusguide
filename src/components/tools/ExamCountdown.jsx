import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { getAssignments } from '../../services/assignmentService';
import { DataLoader } from '../common/CustomLoaders';
import { Clock, BookOpen, MapPin, Timer, RefreshCw, WifiOff, ChevronLeft, Plus } from 'lucide-react';

// ── Countdown math ─────────────────────────────────────────────────────────────
const getCountdown = (dueDate, dueTime) => {
    if (!dueDate) return null;
    const target = new Date(`${dueDate}T${dueTime || '08:00'}:00`);
    const diff = target - new Date();
    if (diff <= 0) return { expired: true, totalMs: 0 };
    const s = Math.floor(diff / 1000);
    return { expired: false, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60, totalMs: diff };
};

const urgencyStyle = (ms, isPast) => {
    if (isPast) return { grad: 'from-gray-50 to-gray-50', ring: 'ring-gray-100', badge: 'bg-gray-300 text-gray-600', digit: 'bg-gray-300', label: 'PASSED', text: 'text-gray-400' };
    const h = ms / 3600000;
    if (h < 24)  return { grad: 'from-red-50 to-orange-50',   ring: 'ring-red-200',   badge: 'bg-red-500 text-white',   digit: 'bg-red-500',   label: 'TODAY',     text: 'text-red-500' };
    if (h < 72)  return { grad: 'from-amber-50 to-yellow-50', ring: 'ring-amber-200', badge: 'bg-amber-500 text-white', digit: 'bg-amber-500', label: 'THIS WEEK', text: 'text-amber-600' };
    if (h < 168) return { grad: 'from-blue-50 to-indigo-50',  ring: 'ring-blue-200',  badge: 'bg-blue-500 text-white',  digit: 'bg-blue-600',  label: 'SOON',      text: 'text-blue-600' };
    return               { grad: 'from-gray-50 to-white',     ring: 'ring-gray-100',  badge: 'bg-gray-800 text-white',  digit: 'bg-gray-900',  label: 'UPCOMING',  text: 'text-gray-500' };
};

// ── Digit block ────────────────────────────────────────────────────────────────
const Digit = ({ value, label, bg }) => (
    <div className="flex flex-col items-center gap-1.5">
        <div className={`${bg} text-white rounded-2xl w-14 h-16 sm:w-16 sm:h-[72px] flex items-center justify-center font-black text-2xl sm:text-3xl tabular-nums shadow-lg tracking-tight`}>
            {String(value).padStart(2, '0')}
        </div>
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
);
const Colon = () => (
    <div className="flex flex-col gap-2.5 pb-5 opacity-30">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
    </div>
);

// ── Exam Card ──────────────────────────────────────────────────────────────────
const ExamCard = ({ exam }) => {
    const [cd, setCd] = useState(() => getCountdown(exam.dueDate, exam.dueTime));
    useEffect(() => {
        if (cd?.expired) return;
        const iv = setInterval(() => setCd(getCountdown(exam.dueDate, exam.dueTime)), 1000);
        return () => clearInterval(iv);
    }, [exam.dueDate, exam.dueTime]);

    const isPast = !cd || cd.expired || exam.status !== 'pending';
    const s = urgencyStyle(cd?.totalMs ?? 0, isPast);

    const dateLabel = exam.dueDate
        ? new Date(exam.dueDate + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <div className={`rounded-2xl bg-gradient-to-br ${s.grad} ring-1 ${s.ring} p-5 sm:p-6 overflow-hidden shadow-sm`}>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                    {exam.course && (
                        <div className="flex items-center gap-1.5 mb-1">
                            <BookOpen size={12} className={s.text} />
                            <p className={`text-[10px] font-black uppercase tracking-widest ${s.text}`}>{exam.course}</p>
                        </div>
                    )}
                    <h3 className={`text-base sm:text-lg font-black text-gray-900 leading-snug ${isPast ? 'opacity-40 line-through' : ''}`}>
                        {exam.title}
                    </h3>
                    {exam.notes && (
                        <div className="flex items-center gap-1 mt-1.5">
                            <MapPin size={10} className="text-gray-400 flex-shrink-0" />
                            <p className="text-xs font-semibold text-gray-500 truncate">{exam.notes}</p>
                        </div>
                    )}
                </div>
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-xl flex-shrink-0 ${s.badge}`}>{s.label}</span>
            </div>

            {/* Countdown or done state */}
            {!isPast && cd && !cd.expired ? (
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
                    <Digit value={cd.days}    label="Days"  bg={s.digit} />
                    <Colon />
                    <Digit value={cd.hours}   label="Hours" bg={s.digit} />
                    <Colon />
                    <Digit value={cd.minutes} label="Mins"  bg={s.digit} />
                    <Colon />
                    <Digit value={cd.seconds} label="Secs"  bg={s.digit} />
                </div>
            ) : (
                <div className="flex items-center justify-center py-5 gap-2">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <Clock size={16} className="text-gray-400" />
                    </div>
                    <span className="text-sm font-bold text-gray-400">
                        {exam.status !== 'pending' ? `Marked as ${exam.status}` : 'Exam has passed'}
                    </span>
                </div>
            )}

            {/* Date footer */}
            <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-black/5">
                <Clock size={11} className="text-gray-400" />
                <p className="text-[11px] font-semibold text-gray-400">
                    {dateLabel}{exam.dueTime ? ` · ${exam.dueTime}` : ''}
                </p>
            </div>
        </div>
    );
};

// ── Section divider ────────────────────────────────────────────────────────────
const SectionLabel = ({ label }) => (
    <div className="flex items-center gap-3 px-1">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">{label}</span>
        <div className="flex-1 h-px bg-gray-100" />
    </div>
);

// ── Main page ──────────────────────────────────────────────────────────────────
const ExamCountdown = () => {
    const navigate = useNavigate();
    const [exams, setExams]       = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]       = useState(null);
    const [source, setSource]     = useState('');

    const fetchExams = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error: dbError } = await supabase
                    .from('user_assignments')
                    .select('id, title, course, type, due_date, due_time, status, notes, priority')
                    .eq('user_id', user.id)
                    .eq('type', 'exam')
                    .order('due_date', { ascending: true });
                if (dbError) throw dbError;
                setExams((data || []).map(r => ({ id: r.id, title: r.title, course: r.course || '', dueDate: r.due_date, dueTime: r.due_time || '', status: r.status, notes: r.notes || '' })));
                setSource('cloud');
                setIsLoading(false);
                return;
            }
        } catch (err) {
            console.warn('[ExamCountdown] Cloud fetch failed, falling back to local:', err.message);
        }
        // fallback
        try {
            const local = getAssignments().filter(a => a.type === 'exam').sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));
            setExams(local);
            setSource('local');
        } catch {
            setError('Could not load your exams. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchExams(); }, [fetchExams]);

    const today    = new Date().toISOString().split('T')[0];
    const upcoming = useMemo(() => exams.filter(e => e.status === 'pending' && e.dueDate >= today), [exams, today]);
    const past     = useMemo(() => exams.filter(e => e.status !== 'pending' || e.dueDate < today),  [exams, today]);

    return (
        <div className="min-h-screen bg-gray-50/30 pb-28">
            <div className="max-w-3xl mx-auto px-3 sm:px-5 pt-4 sm:pt-6">

                {/* ── Header ───────────────────────────────────────────────── */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <button
                            onClick={() => navigate('/tools')}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors active:scale-95"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">Exam Countdown</h1>
                            <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Live countdowns to your upcoming exams.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/tools/assignments')}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                        title="Add exam in Assignments"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                {/* ── Source badge ──────────────────────────────────────────── */}
                {!isLoading && !error && exams.length > 0 && (
                    <div className="flex items-center justify-between mb-4 px-1">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${source === 'cloud' ? 'bg-green-400' : 'bg-amber-400'}`} />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                {source === 'cloud' ? 'Synced from cloud' : 'Local data · sign in to sync'}
                            </span>
                        </div>
                        <button onClick={fetchExams} className="flex items-center gap-1 text-[10px] font-black text-gray-400 hover:text-gray-700 transition-colors">
                            <RefreshCw size={11} /> Refresh
                        </button>
                    </div>
                )}

                {/* ── Loading ───────────────────────────────────────────────── */}
                {isLoading && (
                    <div className="py-24 flex flex-col items-center justify-center gap-4">
                        <DataLoader />
                        <p className="text-gray-400 font-semibold text-sm">Loading exam countdowns...</p>
                    </div>
                )}

                {/* ── Error ─────────────────────────────────────────────────── */}
                {!isLoading && error && (
                    <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-red-100 shadow-sm">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                            <WifiOff className="text-red-400" size={28} />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-2">Couldn't Load Exams</h3>
                        <p className="text-gray-500 font-medium max-w-xs text-sm mb-6">{error}</p>
                        <button onClick={fetchExams} className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors active:scale-95">
                            <RefreshCw size={14} /> Try Again
                        </button>
                    </div>
                )}

                {/* ── Empty ─────────────────────────────────────────────────── */}
                {!isLoading && !error && exams.length === 0 && (
                    <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-dashed border-gray-200">
                        <div className="w-20 h-20 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">
                            <Timer size={34} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-2">No Exam Countdowns</h3>
                        <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed mb-6">
                            Add a deadline, set its type to <span className="font-black text-gray-800">📋 Exam</span>, and a live countdown will appear here.
                        </p>
                        <button
                            onClick={() => navigate('/tools/assignments')}
                            className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors active:scale-95"
                        >
                            Add an Exam
                        </button>
                    </div>
                )}

                {/* ── Success ───────────────────────────────────────────────── */}
                {!isLoading && !error && exams.length > 0 && (
                    <div className="space-y-6">
                        {upcoming.length > 0 && (
                            <div className="space-y-3">
                                <SectionLabel label={`${upcoming.length} upcoming exam${upcoming.length !== 1 ? 's' : ''}`} />
                                {upcoming.map(exam => <ExamCard key={exam.id} exam={exam} />)}
                            </div>
                        )}
                        {past.length > 0 && (
                            <div className="space-y-3">
                                <SectionLabel label={`${past.length} completed / past`} />
                                {past.map(exam => <ExamCard key={exam.id} exam={exam} />)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamCountdown;
