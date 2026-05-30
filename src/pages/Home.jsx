import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '../components/common/Button';
import { ArrowRight, Map, CalendarDays, Heart, Settings, MessageCircle, ChevronRight, Clock, Megaphone, ExternalLink, Wifi, User, Bell, CheckCircle2, Loader2, Circle, Calendar, PartyPopper, Play, BookOpen, Plus, Flame, AlertTriangle, FileText, LayoutGrid, ListChecks } from 'lucide-react';
import { CoachMarksOverlay } from '../components/common/CoachMarksOverlay';
import { CustomMapPin } from '../components/common/CustomMapPin';
import { CustomGuide, CustomTools, CustomEyes, CustomHome, CustomCoach, CustomSafetyCheck, CustomProfile } from '../components/common/CustomIcons';
import NotificationDropdown from '../components/common/NotificationDropdown'; // 🛎️ NEW: Import
import { getIconComponent } from '../components/tools/PlanYourDay';
import { FocusTimer } from '../components/tools/FocusTimer';
import { getUpcomingAcademicEvents } from '../data/academicCalendar';
import { getCurrentSemesterInfo } from '../services/academicCalendarService';
import { LS_KEYS, DEFAULT_HOME_WIDGETS } from '../utils/constants';
import { getTodayHoliday } from '../services/holidayService';
import { syncToCloud, shouldSyncNow, shouldPullNow, bidirectionalSync } from '../services/syncService';
import { toast } from 'react-hot-toast';
import { useDeviceId } from '../hooks/useDeviceId';

import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PaymentButton } from '../components/payment/PaymentButton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { supabase } from '../lib/supabase';
import { useNotifications } from '../context/NotificationContext';

import { getAssignments, getAssignmentsByUrgency, markAssignmentStatus, onAssignmentsChanged } from '../services/assignmentService';

import CampusIllustration from '/college-campus-rafiki.svg';

// ── helpers ───────────────────────────────────────────────────────────────────

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const now = new Date();
const TODAY_NAME = DAYS[now.getDay()];
const TODAY_LABEL = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const getTimeMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

// Custom SVG weather icons
const renderWeatherSvg = (type, size = 14, className = '') => {
  const props = { width: size, height: size, className, viewBox: '0 0 256 256', fill: 'currentColor' };
  switch (type) {
    case 'sunny':
      return <svg {...props}><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>;
    case 'cloudy':
      return <svg {...props}><path d="M160,40A88.09,88.09,0,0,0,81.29,88.67,64,64,0,1,0,72,216h88a88,88,0,0,0,0-176Zm0,160H72a48,48,0,0,1,0-96c1.1,0,2.2,0,3.29.11A88,88,0,0,0,72,128a8,8,0,0,0,16,0,72,72,0,1,1,72,72Z"/></svg>;
    case 'rainy':
      return <svg {...props}><path d="M158.66,196.44l-32,48a8,8,0,1,1-13.32-8.88l32-48a8,8,0,0,1,13.32,8.88ZM232,92a76.08,76.08,0,0,1-76,76H132.28l-29.62,44.44a8,8,0,1,1-13.32-8.88L113.05,168H76A52,52,0,0,1,76,64a53.26,53.26,0,0,1,8.92.76A76.08,76.08,0,0,1,232,92Zm-16,0A60.06,60.06,0,0,0,96,88.46a8,8,0,0,1-16-.92q.21-3.66.77-7.23A38.11,38.11,0,0,0,76,80a36,36,0,0,0,0,72h80A60.07,60.07,0,0,0,216,92Z"/></svg>;
    case 'cloudy-sun':
      return <svg {...props}><path d="M164,72a76.2,76.2,0,0,0-20.26,2.73,55.63,55.63,0,0,0-9.41-11.54l9.51-13.57a8,8,0,1,0-13.11-9.18L121.22,54A55.9,55.9,0,0,0,96,48c-.58,0-1.16,0-1.74,0L91.37,31.71a8,8,0,1,0-15.75,2.77L78.5,50.82A56.1,56.1,0,0,0,55.23,65.67L41.61,56.14a8,8,0,1,0-9.17,13.11L46,78.77A55.55,55.55,0,0,0,40,104c0,.57,0,1.15,0,1.72L23.71,108.6a8,8,0,0,0,1.38,15.88,8.24,8.24,0,0,0,1.39-.12l16.32-2.88a55.74,55.74,0,0,0,5.86,12.42A52,52,0,0,0,84,224h80a76,76,0,0,0,0-152ZM56,104a40,40,0,0,1,72.54-23.24,76.26,76.26,0,0,0-35.62,40,52.14,52.14,0,0,0-31,4.17A40,40,0,0,1,56,104ZM164,208H84a36,36,0,1,1,4.78-71.69c-.37,2.37-.63,4.79-.77,7.23a8,8,0,0,0,16,.92,58.91,58.91,0,0,1,1.88-11.81c0-.16.09-.32.12-.48A60.06,60.06,0,1,1,164,208Z"/></svg>;
    default:
      return <svg {...props}><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/></svg>;
  }
};

// Custom SVG library icon
const LibrarySvg = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm6.62,31.47,46.82-10.05,3.34,15.9L146,97.53Zm6.64,31.57,46.82-10.06,13.3,63.24-46.82,10.06ZM216,197.94l-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm0,32h48v96H56Zm48,128H56V192h48v16Z"/>
  </svg>
);

// Weather mapping helper
const getWeatherIconAndAdvice = (code, temp) => {
  if (temp > 32) return { svgType: 'sunny', color: 'text-orange-500', bg: 'bg-orange-500/10', advice: 'Very hot today. Walk in the shade!' };
  if (temp < 22) return { svgType: 'cloudy', color: 'text-blue-500', bg: 'bg-blue-500/10', advice: 'Cool weather today.' };

  if (code === 0) return { svgType: 'sunny', color: 'text-yellow-500', bg: 'bg-yellow-500/10', advice: 'Clear skies. Perfect for walking.' };
  if (code >= 1 && code <= 3) return { svgType: 'cloudy-sun', color: 'text-slate-500', bg: 'bg-slate-500/10', advice: 'Partly cloudy. Good walking weather.' };
  if (code >= 45 && code <= 48) return { svgType: 'cloudy', color: 'text-slate-400', bg: 'bg-slate-400/10', advice: 'Foggy morning.' };
  if (code >= 51 && code <= 55) return { svgType: 'rainy', color: 'text-blue-400', bg: 'bg-blue-400/10', advice: 'Drizzling. Might want a light jacket.' };
  if (code >= 61 && code <= 82) return { svgType: 'rainy', color: 'text-blue-600', bg: 'bg-blue-600/10', advice: 'Raining. Grab an umbrella!' };
  if (code >= 95) return { svgType: 'rainy', color: 'text-purple-600', bg: 'bg-purple-600/10', advice: 'Thunderstorms. Seek shelter!' };

  return { svgType: 'sunny', color: 'text-yellow-500', bg: 'bg-yellow-500/10', advice: 'Beautiful day on campus.' };
};

// ── Streak helpers ────────────────────────────────────────────────────────────
const getISODate = (d) => d.toISOString().split('T')[0];
const getWeekId = (d) => {
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // Monday
  return getISODate(start);
};

// ── component ─────────────────────────────────────────────────────────────────

const Home = () => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  // ── Invisible dark-mode sync ──────────────────────────────────────────────
  const [theme] = useLocalStorage('theme', 'light');
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  const [timetable] = useLocalStorage('ucc_timetable', []);
  const [profile]    = useLocalStorage('ucc_profile', { name: '', phone: '', avatarUrl: '' });
  const [tasks, setTasks] = useLocalStorage('ucc_daily_tasks', []);
  const [reminders, setReminders] = useLocalStorage('ucc_reminders', []);
  const activeReminders = useMemo(() => {
    return Array.isArray(reminders) ? reminders.filter(r => !r.completed) : [];
  }, [reminders]);
  const [quickNotes, setQuickNotes] = useLocalStorage('ucc_quick_notes', '');
  const [homeWidgetsRaw] = useLocalStorage(LS_KEYS.HOME_WIDGETS, DEFAULT_HOME_WIDGETS);
  const homeWidgets = useMemo(() => ({ ...DEFAULT_HOME_WIDGETS, ...homeWidgetsRaw }), [homeWidgetsRaw]);
  const [activeTask, setActiveTask] = useState(null);

  // ── Assignments / Deadlines ──────────────────────────────────────────────
  const [homeAssignments, setHomeAssignments] = useState(() => getAssignments());

  // Listen for assignment changes — works for BOTH same-tab and cross-tab
  useEffect(() => {
    // Same-tab: custom event from assignmentService
    const unsubCustom = onAssignmentsChanged(() => {
      setHomeAssignments(getAssignments());
    });
    // Cross-tab: native storage event
    const handleStorage = (e) => {
      if (e.key === 'ucc_assignments') {
        setHomeAssignments(getAssignments());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      unsubCustom();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Urgent deadlines: overdue + due today (shown as alert strip)
  const urgentDeadlines = useMemo(() => {
    const urgency = getAssignmentsByUrgency(homeAssignments);
    return [...urgency.overdue, ...urgency.today].slice(0, 3);
  }, [homeAssignments]);

  // This-week assignments (shown in the task section below tasks)
  const thisWeekDeadlines = useMemo(() => {
    const urgency = getAssignmentsByUrgency(homeAssignments);
    return urgency.thisWeek.slice(0, 4);
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
          className="text-xs font-bold text-[#6EABC6] bg-[#6EABC6]/10 px-3 py-1 rounded-lg hover:bg-[#6EABC6]/20 transition-colors flex-shrink-0"
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

  // ── Daily Streak System ──────────────────────────────────────────────────
  const [streakData, setStreakData] = useLocalStorage('ucc_streak', {
    count: 0,
    lastActiveDate: null,
    bestStreak: 0,
    freezeUsedWeek: null,
  });
  const streakUpdatedRef = useRef(false);

  useEffect(() => {
    if (streakUpdatedRef.current) return;
    streakUpdatedRef.current = true;

    const today = getISODate(new Date());
    const yesterday = getISODate(new Date(Date.now() - 86400000));

    // Already logged today — nothing to do
    if (streakData.lastActiveDate === today) return;

    let newCount = 1;
    let newBest = streakData.bestStreak;
    let newFreezeWeek = streakData.freezeUsedWeek;

    if (streakData.lastActiveDate === yesterday) {
      // Consecutive day — increment
      newCount = streakData.count + 1;
    } else if (streakData.lastActiveDate) {
      // Gap detected — check if streak freeze can save it
      const currentWeek = getWeekId(new Date());
      const canUseFreeze = streakData.freezeUsedWeek !== currentWeek;

      const lastDate = new Date(streakData.lastActiveDate + 'T12:00:00');
      const todayDate = new Date(today + 'T12:00:00');
      const diffDays = Math.round((todayDate - lastDate) / 86400000);

      if (diffDays === 2 && canUseFreeze) {
        // Freeze saves a 1-day gap (once per week)
        newCount = streakData.count + 1;
        newFreezeWeek = currentWeek;
      }
      // Otherwise: reset to 1 (default)
    }

    newBest = Math.max(newBest, newCount);

    // Milestone toasts
    if (newCount === 7) toast.success('7-day streak! Keep going!', { icon: '🔥' });
    else if (newCount === 14) toast.success('2-week streak! You\'re on fire!', { icon: '🔥' });
    else if (newCount === 30) toast.success('30-day streak! Legendary dedication!', { icon: '🏆' });
    else if (newCount === 100) toast.success('100-day streak! You\'re a Campus Guide legend!', { icon: '💎' });

    setStreakData({
      count: newCount,
      lastActiveDate: today,
      bestStreak: newBest,
      freezeUsedWeek: newFreezeWeek,
    });
  }, []);

  // Streak tier for visual styling
  const streakTier = useMemo(() => {
    if (streakData.count >= 100) return 'legendary';
    if (streakData.count >= 30) return 'committed';
    if (streakData.count >= 7) return 'established';
    if (streakData.count >= 3) return 'building';
    return 'starting';
  }, [streakData.count]);

  // 🛎️ NOTIFICATION LOGIC STATES
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const supportEmail = state?.supportEmail || 'anonymous@uccguide.com';
  const handlePaymentSuccess = () => toast.success('Thank you for your support!');
  const handlePaymentError = (e) => toast.error(`Payment failed: ${e.message}`);

  // Live time tracker for classes
  const [currentTimeMinutes, setCurrentTimeMinutes] = useState(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setCurrentTimeMinutes(d.getHours() * 60 + d.getMinutes());
    };
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // ── Holiday awareness ──────────────────────────────────────────────────────
  const [todayHoliday, setTodayHoliday] = useState(null);

  // ── Semester awareness ──────────────────────────────────────────────────────
  const [semesterInfo, setSemesterInfo] = useState(null);

  // ── Device ID + Cloud Sync ─────────────────────────────────────────────────
  const { deviceId } = useDeviceId();

  useEffect(() => {
    // Fire-and-forget: fetch today's holiday
    getTodayHoliday().then(h => { if (h) setTodayHoliday(h); }).catch(() => {});

    // Fire-and-forget: fetch semester info
    getCurrentSemesterInfo().then(info => { if (info) setSemesterInfo(info); }).catch(() => {});

    // Fire-and-forget: cloud sync if 24h has passed
    const runSync = async () => {
      if (shouldPullNow()) {
        // Linked device: push + pull for bidirectional sync
        const syncToast = toast.loading('Syncing with your other device...');
        const result = await bidirectionalSync().catch(() => ({ success: false }));
        if (result.success) {
          toast.success('Data synced from your other device!', { id: syncToast });
        } else {
          toast.dismiss(syncToast); // Silent fail — don't alarm user
        }
      } else if (shouldSyncNow()) {
        // Normal device: just push local data up
        syncToCloud(deviceId).catch(() => {});
      }
    };
    runSync();
  }, [deviceId]);

  // Today's classes
  const todaysClassesWithStatus = useMemo(() => {
    if (!Array.isArray(timetable)) return [];
    return timetable
      .filter(c => c.day && c.day.toLowerCase() === TODAY_NAME.toLowerCase())
      .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
      .map(c => {
        const startMins = getTimeMinutes(c.startTime);
        const endMins = c.endTime ? getTimeMinutes(c.endTime) : startMins + 60; // Assume 1hr duration if no end time
        let status = 'upcoming';
        let timeUntilStr = '';
        if (currentTimeMinutes >= endMins) status = 'completed';
        else if (currentTimeMinutes >= startMins && currentTimeMinutes < endMins) status = 'ongoing';
        else if (startMins > currentTimeMinutes) {
          const diffMins = startMins - currentTimeMinutes;
          if (diffMins < 60) timeUntilStr = `in ${diffMins}m`;
          else {
            const hrs = Math.floor(diffMins / 60);
            const rmins = diffMins % 60;
            timeUntilStr = `in ${hrs}h${rmins > 0 ? ` ${rmins}m` : ''}`;
          }
        }
        return { ...c, status, startMins, endMins, timeUntilStr };
      });
  }, [timetable, currentTimeMinutes]);

  const upcomingOrOngoingClasses = todaysClassesWithStatus.filter(c => c.status !== 'completed');
  const allCompleted = todaysClassesWithStatus.length > 0 && upcomingOrOngoingClasses.length === 0;

  // Today's Tasks
  const todaysTasks = useMemo(() => {
    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return tasks.filter(t => t.date === todayStr).sort((a, b) => a.time.localeCompare(b.time));
  }, [tasks]);

  const suggestedClassTasks = useMemo(() => {
    return todaysClassesWithStatus.filter(cls => {
        const classTitle = cls.courseName || cls.name || 'Class';
        const expectedTitle = `Revise ${classTitle}`;
        return !todaysTasks.some(t => t.title === expectedTitle);
    });
  }, [todaysClassesWithStatus, todaysTasks]);

  const handleAddSuggestion = (cls) => {
    let suggestedTime = '08:00'; // Default
    const classTimeStr = cls.startTime || cls.time;

    if (classTimeStr) {
        const [h, m] = classTimeStr.split(':').map(Number);
        const newH = h - 1 < 0 ? 23 : h - 1; // 1 hour before
        suggestedTime = `${String(newH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }
    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const newTask = {
        id: Date.now().toString(),
        title: `Revise ${cls.courseName || cls.name || 'Class'}`,
        time: suggestedTime,
        endTime: null,
        icon: 'study',
        status: 'pending',
        date: todayStr
    };
    setTasks([...tasks, newTask]);
  };

  // Upcoming planned tasks (next 14 days, excluding today)
  const upcomingPlannedTasks = useMemo(() => {
    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const limit = new Date(d);
    limit.setDate(limit.getDate() + 14);
    const limitStr = `${limit.getFullYear()}-${String(limit.getMonth() + 1).padStart(2, '0')}-${String(limit.getDate()).padStart(2, '0')}`;
    return tasks
      .filter(t => t.date > todayStr && t.date <= limitStr)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [tasks]);

  const toggleTaskStatus = (id, forceComplete = false) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: forceComplete ? 'completed' : (t.status === 'completed' ? 'pending' : 'completed') };
      }
      return t;
    }));
  };

  // Upcoming Academic Events
  const upcomingAcademicEvents = useMemo(() => getUpcomingAcademicEvents(2), []);

  // Sam Jonah Library status (holiday-aware)
  const libraryStatus = useMemo(() => {
    // Public holiday override
    if (todayHoliday) {
      return { isOpen: false, label: 'Closed', detail: `Closed for ${todayHoliday.name}. Opens next working day at 9:00 AM.` };
    }

    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Sunday - closed
    if (day === 0) {
      return { isOpen: false, label: 'Closed', detail: 'Closed today (Sunday). Opens Monday at 9:00 AM.' };
    }

    let openMin, closeMin, closeStr;
    if (day === 6) {
      // Saturday: 9:00 AM – 4:30 PM
      openMin = 9 * 60;
      closeMin = 16 * 60 + 30;
      closeStr = '4:30 PM';
    } else {
      // Mon–Fri: 9:00 AM – 10:00 PM
      openMin = 9 * 60;
      closeMin = 22 * 60;
      closeStr = '10:00 PM';
    }

    if (currentMinutes >= openMin && currentMinutes < closeMin) {
      return { isOpen: true, label: 'Open', detail: `Closes at ${closeStr}` };
    } else if (currentMinutes < openMin) {
      return { isOpen: false, label: 'Closed', detail: 'Opens today at 9:00 AM' };
    } else {
      if (day === 6) {
        return { isOpen: false, label: 'Closed', detail: 'Closed for today. Opens Monday at 9:00 AM.' };
      }
      return { isOpen: false, label: 'Closed', detail: 'Closed for today. Opens tomorrow at 9:00 AM.' };
    }
  }, [currentTimeMinutes, todayHoliday]);

  // ── Announcement → Ad rotation logic ─────────────────────────────────────
  const [featuredContent, setFeaturedContent] = useState(null);
  const [isFeaturedExpanded, setIsFeaturedExpanded] = useState(false);

  // ── Community notification state (inbox model) ────────────────────────────
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [fetchStatus, setFetchStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [seenVersion, setSeenVersion] = useState(0); // bump to re-derive seenIds
  const [notificationsEnabled] = useLocalStorage('ucc_notifications_enabled', true);

  // Derived: seen IDs from localStorage (re-computed when seenVersion changes)
  const seenIds = useMemo(() => {
    return new Set(JSON.parse(localStorage.getItem('ucc_seen_updates') || '[]').map(String));
  }, [seenVersion]);

  // Derived: unread vs read community items
  const unreadItems = useMemo(() => recentUpdates.filter(item => !seenIds.has(String(item.id))), [recentUpdates, seenIds]);
  const readItems   = useMemo(() => recentUpdates.filter(item => seenIds.has(String(item.id))), [recentUpdates, seenIds]);

  // In-app notification context (must be before markAllAsRead)
  const { unreadCount, markAllAsRead: markAllInAppRead } = useNotifications();

  // Mark a single community item as read
  const markItemAsRead = useCallback((id) => {
    const current = JSON.parse(localStorage.getItem('ucc_seen_updates') || '[]');
    const updated = [...new Set([...current, String(id)])];
    localStorage.setItem('ucc_seen_updates', JSON.stringify(updated));
    setSeenVersion(v => v + 1);
  }, []);

  // Mark all unread community items as read (also clears in-app notification dot)
  const markAllAsRead = useCallback(() => {
    const current = JSON.parse(localStorage.getItem('ucc_seen_updates') || '[]');
    const allIds = unreadItems.map(item => String(item.id));
    const updated = [...new Set([...current, ...allIds])];
    localStorage.setItem('ucc_seen_updates', JSON.stringify(updated));
    setSeenVersion(v => v + 1);
    // Also mark all in-app notifications as read so the red dot disappears
    markAllInAppRead?.();
  }, [unreadItems, markAllInAppRead]);

  // Navigate to community hub with correct tab
  const handleNavigateToCommunity = useCallback((tab) => {
    navigate(`/community?tab=${tab}`);
    setIsNotifOpen(false);
  }, [navigate]);

  // Red dot: purely data-driven — shows only when there are truly unread items
  const showRedDot = notificationsEnabled && (unreadItems.length > 0 || unreadCount > 0);

  // ── Fetch community updates (gated by notificationsEnabled) ─────────────
  useEffect(() => {
    if (!notificationsEnabled) {
      setRecentUpdates([]);
      setFetchStatus('idle');
      return;
    }

    const fetchCommunityUpdates = async () => {
      setFetchStatus('loading');
      try {
        const [annRes, whisperRes, thriftRes] = await Promise.all([
          supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(10),
          supabase.from('campus_whispers').select('*').order('created_at', { ascending: false }).limit(10),
          supabase.from('thrift_listings').select('*').order('created_at', { ascending: false }).limit(10)
        ]);

        const items = [];
        if (annRes.data) items.push(...annRes.data.map(i => ({ ...i, updateType: 'announcement' })));
        if (whisperRes.data) items.push(...whisperRes.data.map(i => ({ ...i, updateType: 'whisper' })));
        if (thriftRes.data) items.push(...thriftRes.data.map(i => ({ ...i, updateType: 'thrift' })));

        // Sort DESCENDING — newest first
        items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentUpdates(items);
        setFetchStatus('success');
      } catch (err) {
        console.error("Error fetching community updates", err);
        setFetchStatus('error');
        // Do NOT wipe recentUpdates — preserve stale data on error
      }
    };

    fetchCommunityUpdates();
  }, [notificationsEnabled]);

  // ── Fetch ad / featured content (always runs, separate concern) ──────────
  useEffect(() => {
    const fetchAdOrFallback = async () => {
      try {
        const { data: adsData } = await supabase
          .from('advertisements')
          .select('*')
          .ilike('status', 'active')
          .eq('package_id', 'home_banner')
          .gte('expires_at', new Date().toISOString());

        if (!adsData || adsData.length === 0) {
          const { data: annFallback } = await supabase
            .from('announcements')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1);
          if (annFallback && annFallback[0]) {
            setFeaturedContent({ kind: 'announcement', data: annFallback[0] });
          }
          return;
        }

        const ad = adsData[Math.floor(Math.random() * adsData.length)];
        setFeaturedContent({ kind: 'ad', data: ad });
      } catch (err) {
        console.error("Error fetching ad", err);
      }
    };

    fetchAdOrFallback();
  }, []);

  // ── Weather Fetching Logic ───────────────────────────────────────────────
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=5.1165&longitude=-1.2929&current_weather=true');
        const data = await res.json();
        if (data && data.current_weather) {
          setWeatherData(data.current_weather);
        }
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    };
    fetchWeather();
  }, []);

  const AFFILIATE_URL = 'https://www.cheapdata.shop/shop/anat-enterprise-1774112668074-swiftdata-mp8lcz98';

  const quickActions = [
    { title: 'Campus Map',  icon: Map,           action: () => navigate('/guide?topic=campus-map')          },
    { title: 'Timetable',   icon: CalendarDays,  action: () => navigate('/tools')                           },
    { title: 'Buy Data',    icon: Wifi,          action: () => window.open(AFFILIATE_URL, '_blank', 'noopener,noreferrer'), isAffiliate: true },
    { title: 'Contact Us',  icon: MessageCircle, action: () => navigate('/contact')                         },
    { title: 'Settings',    icon: Settings,      action: () => navigate('/settings')                        },
  ];

  // ── Streak badge component (reused in mobile + desktop) ────────────────
  const StreakBadge = ({ variant = 'hero' }) => {
    if (streakData.count < 1) return null;

    const tierStyles = {
      starting:   { bg: 'bg-white/10', border: 'border-white/10', text: 'text-white/70', flame: 'text-orange-400' },
      building:   { bg: 'bg-white/10', border: 'border-white/10', text: 'text-white/80', flame: 'text-orange-400' },
      established:{ bg: 'bg-orange-500/15', border: 'border-orange-500/20', text: 'text-orange-300', flame: 'text-orange-400' },
      committed:  { bg: 'bg-orange-500/20', border: 'border-orange-500/25', text: 'text-orange-200', flame: 'text-orange-300' },
      legendary:  { bg: 'bg-amber-500/20', border: 'border-amber-400/30', text: 'text-amber-200', flame: 'text-amber-300' },
    };
    const s = tierStyles[streakTier] || tierStyles.starting;

    if (variant === 'desktop') {
      const desktopStyles = {
        starting:   { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-600', flame: 'text-orange-500' },
        building:   { bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-700', flame: 'text-orange-500' },
        established:{ bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', flame: 'text-orange-500' },
        committed:  { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', flame: 'text-orange-600' },
        legendary:  { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', flame: 'text-amber-600' },
      };
      const ds = desktopStyles[streakTier] || desktopStyles.starting;
      return (
        <span className={`inline-flex items-center gap-1 ${ds.bg} ${ds.text} px-2 py-0.5 rounded-full text-[11px] font-bold ${ds.border} border`}>
          <Flame size={11} className={ds.flame} />
          {streakData.count}
        </span>
      );
    }

    return (
      <span className={`inline-flex items-center gap-1 ${s.bg} ${s.text} px-2 py-0.5 rounded-full text-[11px] font-bold ${s.border} border`}>
        <Flame size={11} className={s.flame} />
        {streakData.count}
      </span>
    );
  };

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="pb-28 bg-[#f0f2f8] min-h-screen font-sans">

      {/* ════════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════════ */}
      <div className="lg:hidden">

        {/* ── Chime-Style Hero ────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#001a26] to-[#002F45] px-6 pt-[calc(2.5rem_+_env(safe-area-inset-top,0px))] pb-16">

          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[150%] h-[100px] bg-[#001a26] rounded-[100%] blur-xl opacity-40 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6EABC6] rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-md shadow-sm" />
              <span className="text-white font-bold tracking-widest text-xs uppercase opacity-90">Campus Guide</span>
            </div>

            {/* 🛎️ NEW: Right side container for Bell + Avatar */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <div id="bell-anchor-mobile" className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform"
                >
                  <Bell size={18} />
                  {showRedDot && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#001a26]"></span>
                  )}
                </button>

                {/* Dropdown Panel */}
                <NotificationDropdown
                  isOpen={isNotifOpen}
                  onClose={() => setIsNotifOpen(false)}
                  unreadItems={unreadItems}
                  readItems={readItems}
                  fetchStatus={fetchStatus}
                  notificationsEnabled={notificationsEnabled}
                  onMarkItemRead={markItemAsRead}
                  onMarkAllRead={markAllAsRead}
                  onNavigate={handleNavigateToCommunity}
                />
              </div>

              {/* Profile Avatar */}
              {profile.avatarUrl ? (
                <button
                  onClick={() => navigate('/profile')}
                  className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg overflow-hidden cursor-pointer active:scale-95 transition-transform bg-white/10 p-0.5"
                >
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full bg-white" />
                </button>
              ) : (
                <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform">
                  <User size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Hero Greeting Text & Weather */}
          <div className="relative z-10 flex flex-col items-start gap-4 mt-2">
            <div>
              <h2 className="text-white text-[1.8rem] font-black leading-tight tracking-tight mb-1">
                {getGreeting()}, {profile.name ? profile.name.split(' ')[0] : 'Student'} 👋
              </h2>
              <p className="text-[#6EABC6] text-sm font-semibold flex items-center gap-2 cursor-pointer active:opacity-70 transition-opacity">
                {TODAY_LABEL}
                <StreakBadge />
              </p>
            </div>

            {homeWidgets.weather && weatherData && (() => {
              const { svgType, color, bg, advice } = getWeatherIconAndAdvice(weatherData.weathercode, weatherData.temperature);
              return (
                <div className="flex items-center gap-2 bg-[#002F45]/50 backdrop-blur-md border border-[#6EABC6]/20 px-3 py-1.5 rounded-2xl shadow-sm">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center bg-white/10`}>
                    {renderWeatherSvg(svgType, 14, 'text-[#6EABC6]')}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-xs">{weatherData.temperature}°C</span>
                    <span className="text-[#6EABC6] text-[10px] font-medium leading-none">{advice}</span>
                  </div>
                </div>
              );
            })()}

            {/* Semester Status */}
            {homeWidgets.calendar && semesterInfo && (
              <div className="flex items-center gap-3 bg-[#002F45]/60 backdrop-blur-md border border-[#6EABC6]/30 px-4 py-3 rounded-2xl shadow-sm w-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10">
                  <Calendar size={18} className="text-[#6EABC6]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">{semesterInfo.title}</span>
                  <span className="text-[#6EABC6] text-xs font-medium leading-tight">
                    {semesterInfo.subtitle}
                    {semesterInfo.details && (
                      <span className="block mt-0.5">• {semesterInfo.details}</span>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Overlapping Content & Body ──────────────────────────────── */}
        <div className="px-5 -mt-8 relative z-20 space-y-6 pb-6">

          {/* Active Reminders Alert Box */}
          {activeReminders.length > 0 && (
            <div className="sticky top-0 z-30 bg-red-50 border border-red-100 rounded-2xl p-4 shadow-sm space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-red-800 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Active Reminders ({activeReminders.length})
                </span>
                <button
                  onClick={() => navigate('/tools')}
                  className="text-[11px] font-black text-red-700 uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Manage
                </button>
              </div>
              <div className="space-y-2">
                {activeReminders.map((reminder) => (
                  <div key={reminder.id} className="bg-white p-3 rounded-xl border border-red-100 flex items-center justify-between gap-3 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 truncate">{reminder.title}</p>
                      <p className="text-[10px] font-semibold text-red-600 mt-0.5">
                        Due: {new Date(reminder.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = reminders.map(r => r.id === reminder.id ? { ...r, completed: true } : r);
                        setReminders(updated);
                      }}
                      className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors shrink-0 border-none cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 1. Overlapping Floating Card (Today's Classes) */}
          {homeWidgets.classes && (<div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 min-h-[140px] border border-gray-100 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-black text-gray-900 tracking-tight">Today's Classes</span>
              <button onClick={() => navigate('/tools')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
                View all <ChevronRight size={13} />
              </button>
            </div>

            {todaysClassesWithStatus.length === 0 ? (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#002F45]/5 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#002F45" viewBox="0 0 256 256"><path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z"></path></svg>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-gray-900 flex items-center gap-1.5">
                      {todayHoliday ? <><PartyPopper className="w-4 h-4 text-primary-600" /> {todayHoliday.name}</> : 'No classes today!'}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium flex items-center">
                      {todayHoliday ? <>No classes today unless your lecturer said so <CustomEyes size={14} className="inline ml-1" /></> : 'Enjoy your free time.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/tools/timetable')}
                  className="flex bg-primary-50 text-primary-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary-100 transition-colors"
                >
                  Add Class
                </button>
              </div>
            ) : allCompleted ? (
              <div className="flex items-center gap-4 py-2">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100">
                  <CheckCircle2 size={24} className="text-green-500" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-900">All classes ended!</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">You've successfully completed all classes for today.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {todaysClassesWithStatus.slice(0, 3).map((cls, i) => (
                  <div key={i} className={`flex items-center gap-4 transition-opacity ${cls.status === 'completed' ? 'opacity-40' : 'opacity-100'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        cls.status === 'completed' ? 'bg-gray-100' :
                        cls.status === 'ongoing' ? 'bg-blue-50 border border-blue-100 shadow-sm' :
                        'bg-[#002F45]/5'
                    }`}>
                      {cls.status === 'completed' ? <CheckCircle2 size={16} className="text-gray-400" /> :
                       cls.status === 'ongoing' ? <Loader2 size={16} className="text-blue-600 animate-spin" /> :
                       <Clock size={16} className="text-[#002F45]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${cls.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {cls.courseName || cls.name || 'Class'}
                      </p>
                      <p className={`text-xs font-medium mt-0.5 flex flex-wrap items-center gap-1 ${cls.status === 'ongoing' ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                        <span>
                            {cls.status === 'ongoing' ? 'Happening Now • ' : ''}
                            {cls.status === 'completed' ? 'Completed • ' : ''}
                            {cls.status === 'upcoming' && cls.timeUntilStr ? <span className="text-orange-500 font-bold">{cls.timeUntilStr} • </span> : ''}
                            {cls.startTime && cls.endTime ? `${formatTime12Hour(cls.startTime)} – ${formatTime12Hour(cls.endTime)}` : formatTime12Hour(cls.startTime) || ''}
                        </span>
                        {cls.location && (
                            <span className="flex items-center gap-0.5 font-bold opacity-90">
                                • <CustomMapPin className="w-2.5 h-2.5" /> {cls.location}
                            </span>
                        )}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
          )}

          {/* 1.5 Overlapping Floating Card (Today's Tasks + Deadlines) */}
          {homeWidgets.tasks && (<div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-black text-gray-900 tracking-tight">Today's Tasks</span>
              <button onClick={() => navigate('/tools/plan-day')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
                Manage <ChevronRight size={13} />
              </button>
            </div>

            {/* ── Urgent Deadlines Strip (overdue + due today) ── */}
            {urgentDeadlines.length > 0 && (
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1">
                    <AlertTriangle size={10} /> Deadlines
                  </span>
                  <button onClick={() => navigate('/tools/assignments')} className="text-[10px] font-bold text-[#6EABC6] hover:underline">
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

            {/* ── Task list or empty state ── */}
            {todaysTasks.length === 0 && urgentDeadlines.length === 0 ? (
              suggestedClassTasks.length > 0 ? (
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Suggested Task</p>
                    <div className="flex items-center justify-between py-2 bg-primary-50 p-4 rounded-xl border border-primary-100">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                              <BookOpen size={16} />
                           </div>
                           <div className="min-w-0 pr-2">
                              <p className="text-sm font-bold text-slate-800 break-words leading-tight">Revise {suggestedClassTasks[0].courseName || suggestedClassTasks[0].name || 'Class'}</p>
                              <p className="text-xs text-slate-500 mt-0.5 font-medium truncate">Before class</p>
                           </div>
                        </div>
                        <button
                            onClick={() => handleAddSuggestion(suggestedClassTasks[0])}
                            className="bg-white border border-primary-200 text-primary-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-primary-50 transition-all flex items-center gap-1 flex-shrink-0"
                        >
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
                  <button
                    onClick={() => navigate('/tools/plan-day')}
                    className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:border-primary-200 transition-all"
                  >
                    Plan Day
                  </button>
                </div>
              )
            ) : (
              <div className="space-y-3">
                {todaysTasks.slice(0, 3).map((task) => {
                  const IconCmp = getIconComponent(task.icon);
                  const isCompleted = task.status === 'completed';
                  return (
                    <div key={task.id} className={`flex items-center gap-3 p-2 -mx-2 rounded-xl transition-all hover:bg-slate-50 ${isCompleted ? 'opacity-60' : 'opacity-100'}`}>
                      {/* Interactive Checkbox */}
                      <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className="flex-shrink-0 text-slate-300 hover:text-primary-600 transition-colors p-1"
                      >
                          {isCompleted ? <CheckCircle2 size={22} className="text-primary-500" /> : <Circle size={22} />}
                      </button>

                      {/* Icon Block */}
                      <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                              isCompleted ? 'bg-slate-100 text-slate-400' : 'bg-primary-50 text-primary-600 shadow-sm border border-primary-100/50'
                          }`}
                      >
                        <IconCmp size={18} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleTaskStatus(task.id)}>
                        <p className={`text-sm font-bold truncate ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                          {task.title}
                        </p>
                        <p className="text-[11px] font-medium mt-0.5 text-slate-500">
                          {formatTime12Hour(task.time)}
                          {task.endTime ? ` – ${formatTime12Hour(task.endTime)}` : ''}
                        </p>
                      </div>

                      {/* Play Button */}
                      {!isCompleted && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setActiveTask(task); }}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors ml-auto flex-shrink-0"
                            title="Start Focus Timer"
                        >
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

            {/* ── This Week Deadlines (upcoming assignments) ── */}
            {thisWeekDeadlines.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1">
                    <Clock size={10} /> Coming Up
                  </span>
                  <button onClick={() => navigate('/tools/assignments')} className="text-[10px] font-bold text-[#6EABC6] hover:underline">
                    View all
                  </button>
                </div>
                {thisWeekDeadlines.map(a => {
                  const todayStr = new Date().toISOString().split('T')[0];
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
                        className="text-[9px] font-bold px-2 py-1 rounded-md bg-white shadow-sm border border-gray-100 text-[#6EABC6] hover:bg-[#6EABC6]/5 active:scale-95 transition-all flex-shrink-0"
                      >
                        Open
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          )}

          {/* 1.55 Sam Jonah Library Status */}
          {homeWidgets.library && (
            <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${libraryStatus.isOpen ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                  <LibrarySvg size={16} className={libraryStatus.isOpen ? 'text-green-600' : 'text-red-500'} />
                </div>
                <span className="text-sm font-black text-gray-900 tracking-tight">Sam Jonah Library</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  libraryStatus.isOpen
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${libraryStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}></span>
                  {libraryStatus.label}
                </span>
                <span className="text-xs text-gray-500 font-medium">{libraryStatus.detail}</span>
              </div>
            </div>
          )}

          {/* 1.5b Upcoming Planned Events */}
          {homeWidgets.tasks && upcomingPlannedTasks.length > 0 && (
            <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-black text-gray-900 tracking-tight">Upcoming Events</span>
                <button onClick={() => navigate('/tools/plan-day')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
                  View all <ChevronRight size={13} />
                </button>
              </div>
              <div className="space-y-3">
                {upcomingPlannedTasks.slice(0, 4).map((task) => {
                  const IconCmp = getIconComponent(task.icon);
                  const taskDate = new Date(task.date + 'T00:00:00');
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const diffDays = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));
                  let dayLabel = '';
                  if (diffDays === 1) dayLabel = 'Tomorrow';
                  else if (diffDays <= 7) dayLabel = `In ${diffDays} days`;
                  else dayLabel = `In ${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''}`;
                  return (
                    <div key={task.id} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="w-10 h-10 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-primary-100/50">
                        <IconCmp size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-slate-900">{task.title}</p>
                        <p className="text-[11px] font-medium mt-0.5 text-slate-500">
                          {dayLabel} • {formatTime12Hour(task.time)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {upcomingPlannedTasks.length > 4 && (
                  <button onClick={() => navigate('/tools/plan-day')} className="w-full text-center text-xs font-bold text-gray-400 pt-2 hover:text-primary-600 transition-colors">
                    +{upcomingPlannedTasks.length - 4} more events
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 1.6 Upcoming Academic Events */}
          {homeWidgets.calendar && upcomingAcademicEvents.length > 0 && (
            <div className="bg-[#002F45] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] p-6 border border-[#002F45]/90 flex flex-col justify-center mt-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mt-12 -mr-12 pointer-events-none blur-2xl" />

              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                  <Calendar size={12} className="text-[#6EABC6]" />
                </div>
                <span className="text-sm font-black text-white tracking-tight">Academic Calendar</span>
              </div>

              <div className="space-y-3 relative z-10">
                {upcomingAcademicEvents.map((ev, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-l-2 border-[#6EABC6]/30 pl-3 py-1">
                    <p className="text-[13px] font-bold text-white leading-tight">
                      {ev.title}
                    </p>
                    <p className="text-[11px] font-medium text-[#6EABC6] flex items-center gap-1.5">
                      <span className="font-bold">{ev.timeLabel}</span>
                      <span className="opacity-50">•</span>
                      <span>{ev.formattedDate}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Campus Tools (Horizontal Scroll) */}
          <div className="pt-2">
            <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">Tools</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 px-1 -mx-1">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                const isAffiliate = action.isAffiliate;
                return (
                  <button
                    key={i}
                    onClick={action.action}
                    className="bg-white border border-gray-200 rounded-2xl p-3 flex-none flex items-center gap-3 active:scale-95 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <Icon size={18} className={isAffiliate ? 'text-orange-500' : 'text-[#002F45]'} />
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 leading-tight pr-2 whitespace-nowrap">
                      {action.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Quick Note Scratchpad */}
          {homeWidgets.quickNote && (<div className="pt-2">
            <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">Quick Note</h3>
            <div className="bg-[#FFF9C4] rounded-2xl shadow-sm border border-[#FFF59D] p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-8 h-8 bg-black/5 rounded-bl-2xl -mt-2 -mr-2 pointer-events-none" />
              <textarea
                value={quickNotes}
                onChange={(e) => setQuickNotes(e.target.value)}
                placeholder="Jot down a locker number, assignment due date, or anything you don't want to forget..."
                className="w-full h-24 bg-transparent resize-none border-none outline-none focus:outline-none focus:ring-0 p-0 text-sm font-medium text-amber-900 placeholder-amber-700/50"
              />
            </div>
          </div>
          )}

          {/* 4. Announcements / Featured Content */}
          {featuredContent && (() => {
            const isAd = featuredContent.kind === 'ad';
            const d = featuredContent.data;
            const imgSrc = isAd ? d.image_url : d.flyer_url;

            let actionText = '';
            let link = '';

            if (isAd) {
                let cleanPhone = d.phone_number ? d.phone_number.toString().replace(/\D/g, '') : '';
                if (cleanPhone.startsWith('0')) {
                    cleanPhone = '233' + cleanPhone.slice(1);
                } else if (!cleanPhone.startsWith('233') && cleanPhone.length === 9) {
                    cleanPhone = '233' + cleanPhone;
                }

                if (d.contact_method === 'link' && d.contact_url) {
                    actionText = d.action_text || 'Visit Link';
                    link = d.contact_url;
                } else if (d.contact_method === 'phone' && cleanPhone) {
                    actionText = d.action_text || 'Call Now';
                    link = `tel:+${cleanPhone}`;
                } else if (cleanPhone) {
                    actionText = d.action_text || 'Message via WhatsApp';
                    link = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello! I saw your advertisement for "${d.title}" on the UCC Campus Guide app and I'm interested in finding out more.`)}`;
                }
            } else {
                actionText = d.action_text || 'Visit Link';
                link = d.action_link || '';
            }

            return (
              <div className="pt-2">
                <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">
                  {isAd ? 'Advertisement' : 'Announcement'}
                </h3>
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                  {imgSrc && (
                    <img src={imgSrc} alt={d.title} className="w-full h-auto object-contain max-h-[600px] bg-gray-50/50" />
                  )}
                  <div className="p-5">
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xl mb-2 text-[#002F45] bg-[#002F45]/10">
                      {isAd ? 'SPONSORED' : 'OFFICIAL'}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{d.title}</h4>
                    <p className={`text-sm text-gray-500 font-medium mb-4 whitespace-pre-wrap ${!isFeaturedExpanded ? 'line-clamp-3' : ''}`}>
                      {d.description || d.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setIsFeaturedExpanded(!isFeaturedExpanded)}
                        className="text-[13px] font-bold text-[#002F45] flex items-center gap-1 active:opacity-70"
                      >
                        {isFeaturedExpanded ? 'Show less' : 'Read more'} <ChevronRight size={14} className={isFeaturedExpanded ? 'rotate-90 transition-transform' : 'transition-transform'} />
                      </button>

                      {link && (
                        <button
                          onClick={() => window.open(link, '_blank')}
                          className="bg-[#002F45] hover:bg-[#001a26] text-white text-xs font-bold px-4 py-2.5 rounded-xl active:scale-95 transition-all shadow-sm"
                        >
                          {actionText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 4. Promotional Banner (Support Card - Mobile) */}
          <div
            onClick={() => actions?.setShowSupportModal(true)}
            className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Support the Guide</h3>
              <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed mb-3">
                Help us keep this app free and growing for all students.
              </p>
              <span className="inline-block bg-[#002F45] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
                Support Now
              </span>
            </div>
            <div className="relative z-10 w-24 h-24 -mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
              <img src="/Savings.png" alt="Support" className="w-full h-full object-contain drop-shadow-md" />
            </div>
          </div>

        </div>
      </div>
      {/* end MOBILE */}


      {/* ════════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Hero */}
        <div className="relative overflow-hidden bg-white border-b border-gray-100/80 py-12 px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
          </div>
          <div className="relative max-w-6xl mx-auto z-10 grid grid-cols-12 items-center gap-6">
            <div className="col-span-7 text-left mt-8">
              <div className="flex items-center gap-4 mb-4">
                {profile.avatarUrl && (
                  <div
                    onClick={() => navigate('/profile')}
                    className="w-16 h-16 rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer active:scale-95 transition-transform bg-white p-0.5"
                  >
                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl bg-gray-50" />
                  </div>
                )}
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-primary-600 text-sm font-semibold tracking-widest uppercase mb-1 flex items-center gap-2">
                      {TODAY_LABEL}
                      <StreakBadge variant="desktop" />
                    </p>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                      {getGreeting()}{profile.name ? `, ${profile.name.split(' ')[0]}` : ''} 👋
                    </h1>
                  </div>

                  {/* 🛎️ NEW: Desktop Bell Icon */}
                  <div id="bell-anchor-desktop" className="relative">
                    <button
                      onClick={() => setIsNotifOpen(!isNotifOpen)}
                      className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:border-primary-200 cursor-pointer transition-all"
                    >
                      <Bell size={18} />
                      {showRedDot && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                      )}
                    </button>
                    <NotificationDropdown
                      isOpen={isNotifOpen}
                      onClose={() => setIsNotifOpen(false)}
                      unreadItems={unreadItems}
                      readItems={readItems}
                      fetchStatus={fetchStatus}
                      notificationsEnabled={notificationsEnabled}
                      onMarkItemRead={markItemAsRead}
                      onMarkAllRead={markAllAsRead}
                      onNavigate={handleNavigateToCommunity}
                    />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-700 mb-4 tracking-tight leading-tight">
                Your Essential{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600">
                  Campus Companion
                </span>
              </h2>

              {homeWidgets.weather && weatherData && (() => {
                const { svgType, color, bg, advice } = getWeatherIconAndAdvice(weatherData.weathercode, weatherData.temperature);
                return (
                  <div className={`inline-flex items-center gap-3 ${bg} border border-white px-4 py-2 rounded-2xl shadow-sm mb-6`}>
                    {renderWeatherSvg(svgType, 20, color)}
                    <span className="text-gray-800 font-bold text-sm">
                      {weatherData.temperature}°C <span className="font-medium text-gray-500 mx-1">•</span> {advice}
                    </span>
                  </div>
                );
              })()}

              <p className="text-lg text-gray-500 mb-6 max-w-xl font-medium">
                Navigate campus life with clear guides, essential tools, and quick access to services all in a compact, easy-to-use hub.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="primary" onClick={() => navigate('/guide')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-soft btn-hover flex items-center gap-3">
                  <CustomGuide size={18} /> Open Guide
                </Button>
                <Button variant="outline" onClick={() => navigate('/tools')}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold shadow-sm flex items-center gap-3">
                  <CustomTools size={18} className="text-gray-400" /> Open Tools
                </Button>
              </div>
            </div>
            <div className="col-span-5 flex items-center justify-end">
              <div className="relative w-full max-w-lg -mr-6">
                <img src={CampusIllustration} alt="Campus illustration"
                  className="w-full h-auto object-contain drop-shadow-lg"
                  style={{ WebkitTransform: 'translateZ(0)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop content */}
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">

          {/* Active Reminders (Desktop) */}
          {activeReminders.length > 0 && (
            <section className="bg-red-50 border border-red-100 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-red-800 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  Active Reminders ({activeReminders.length})
                </h3>
                <button
                  onClick={() => navigate('/tools')}
                  className="text-xs font-black text-red-700 uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Manage Reminders
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeReminders.map((reminder) => (
                  <div key={reminder.id} className="bg-white p-4 rounded-2xl border border-red-100 flex items-center justify-between gap-4 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold text-gray-900 truncate">{reminder.title}</p>
                      <p className="text-xs font-semibold text-red-600 mt-1">
                        Due: {new Date(reminder.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = reminders.map(r => r.id === reminder.id ? { ...r, completed: true } : r);
                        setReminders(updated);
                      }}
                      className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider rounded-xl transition-colors shrink-0 border-none cursor-pointer"
                    >
                      Mark Done
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick Actions */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quick Actions</h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-6 py-2 overflow-x-auto hide-scrollbar">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  const isAffiliate = action.isAffiliate;
                  return (
                    <button key={index} onClick={action.action}
                      className={`group relative overflow-hidden text-left p-5 bg-white border rounded-xl transition-all duration-300 flex items-center justify-between flex-none ${isAffiliate
                          ? 'border-primary-200 hover:border-primary-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]'
                          : 'border-gray-100 hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
                        }`}
                      style={{ minWidth: 'min(24rem, calc((100vw - 96px) / 4))' }}>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${isAffiliate
                            ? 'bg-orange-50'
                            : 'bg-primary-50'
                          }`}>
                          <Icon size={24} className={isAffiliate ? 'text-orange-500' : 'text-primary-600'} />
                        </div>
                        <h4 className="font-bold text-gray-900 text-base">{action.title}</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                        <ArrowRight size={16} className={isAffiliate ? 'text-orange-600' : 'text-primary-600'} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Support (Desktop Fixed Button) */}
          <section>
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white rounded-xl p-10 sm:p-14 border border-primary-100 shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 text-center lg:text-left">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Support This Project</h2>
                  <p className="text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 text-lg font-medium">
                    Your support keeps this project alive and growing for every UCC student.
                  </p>
                  <div className="max-w-sm mx-auto lg:mx-0 space-y-5">
                    <button
                      onClick={() => actions?.setShowSupportModal(true)}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary-200 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Support Now (GH₵5)
                    </button>
                    <p className="text-sm font-medium text-gray-500">
                      Issues or suggestions?{' '}
                      <a href="mailto:uccguide25@gmail.com" className="text-primary-600 hover:underline">Contact us</a>
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex justify-center lg:justify-end">
                  <img src="/Savings.png" alt="Support Development" className="w-full max-w-[300px] object-contain drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
      {/* end DESKTOP */}

      {/* Pomodoro Focus Timer Overlay */}
      {activeTask && (
          <FocusTimer
              task={activeTask}
              onComplete={(id) => {
                  if (activeTask.isClassStudy) {
                      const d = new Date();
                      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                      const newTask = {
                          id: Date.now().toString(),
                          title: activeTask.title,
                          time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
                          date: dateStr,
                          icon: 'study',
                          status: 'completed'
                      };
                      setTasks([...tasks, newTask]);
                  } else {
                      toggleTaskStatus(id, true);
                  }
                  setActiveTask(null);
              }}
              onCancel={() => setActiveTask(null)}
          />
      )}

      {/* 🧭 Coach Marks Walkthrough */}
      <CoachMarksOverlay 
        storageKey="ucc_coach_home"
        steps={HOME_COACH_STEPS}
      />

    </div>
  );
};

const HOME_COACH_STEPS = [
  {
    icon: <CustomHome size={24} />,
    title: 'Welcome to your Hub!',
    description: 'Your home screen is your main campus cockpit. View class alerts, quick actions, and widget grids.'
  },
  {
    icon: <CustomCoach size={24} />,
    title: 'Timetable Classes',
    description: "Instantly view today's lecture schedule and locations, with real-time countdown alerts for your classes."
  },
  {
    icon: <CustomSafetyCheck size={24} />,
    title: "Today's Tasks & Sync",
    description: "Manage your daily todo checklist directly on your homepage to stay on top of study sessions and projects."
  },
  {
    icon: <CustomGuide size={24} />,
    title: "Quick Map Navigation",
    description: "Jump straight to the UCC Interactive Campus Map, Tools, or Community feeds using the bottom bar tabs."
  },
  {
    icon: <CustomProfile size={24} />,
    title: "Profile Digital ID",
    description: "Tap your digital student card to update your credentials, set up cloud backups, and configure widget visibility."
  }
];

export default Home;
