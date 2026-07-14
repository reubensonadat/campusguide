import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Map, Settings, MessageCircle, Wifi, User, Bell, Plus, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { CoachMarksOverlay } from '../components/common/CoachMarksOverlay';
import NotificationDropdown from '../components/common/NotificationDropdown';
import { getIconComponent } from '../components/tools/PlanYourDay';
import { useAppContext } from '../context/AppContext';
import { useNotifications } from '../context/NotificationContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDeviceId } from '../hooks/useDeviceId';
import { useRunwaySimulation } from '../hooks/useRunwaySimulation';
import { supabase } from '../lib/supabase';
import { getGreeting, formatTime12Hour, getTimeMinutes, renderWeatherSvg, getWeatherIconAndAdvice, TODAY_NAME, TODAY_LABEL } from '../components/home/utils';
import { getAssignments, getAssignmentsByUrgency, markAssignmentStatus, onAssignmentsChanged } from '../services/assignmentService';
import { getUpcomingAcademicEvents } from '../data/academicCalendar';
import { getCurrentSemesterInfo } from '../services/academicCalendarService';
import { getTodayHoliday } from '../services/holidayService';
import { logAppOpen, getProductivityStats } from '../services/productivityService';
import { syncToCloud, shouldSyncNow } from '../services/syncService';
import { triggerConfetti } from '../utils/confetti';
import { triggerHaptic } from '../utils/haptics';
import { LS_KEYS, DEFAULT_HOME_WIDGETS } from '../utils/constants';
import { HOME_COACH_STEPS } from '../components/home/CoachSteps';
import StreakBadge from '../components/home/StreakBadge';
import WidgetBar from '../components/home/WidgetBar';
import SkeletonCard from '../components/home/SkeletonCard';
import FeaturedAd from '../components/home/FeaturedAd';
import ReminderAlert from '../components/home/ReminderAlert';
import TodayClasses from '../components/home/TodayClasses';
import TasksSection from '../components/home/TasksSection';
import LibraryStatus from '../components/home/LibraryStatus';
import UpcomingSection from '../components/home/UpcomingSection';
import AcademicEvents from '../components/home/AcademicEvents';
import QuickActions from '../components/home/QuickActions';
import QuickNote from '../components/home/QuickNote';
import SupportBanner from '../components/home/SupportBanner';
import DesktopLayout from '../components/home/DesktopLayout';
import ExpenseModal from '../components/home/ExpenseModal';

const Home = () => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  React.useEffect(() => { const idleId = requestIdleCallback ? requestIdleCallback(() => logAppOpen(), { timeout: 2000 }) : setTimeout(logAppOpen, 1000); return () => { if (requestIdleCallback) cancelIdleCallback(idleId); else clearTimeout(idleId); }; }, []);

  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  const { unreadCount, markAllAsRead: markAllInAppRead } = useNotifications();
  const { deviceId } = useDeviceId();
  const { config, getSummary } = useRunwaySimulation();
  const summary = getSummary();
  const safeToSpend = summary ? summary.dailyAllowance : 0;
  const isRunwayActive = !!config;

  const [budgetTransactions, setBudgetTransactions] = useLocalStorage('ucc_budget', []);
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [quickExpenseAmt, setQuickExpenseAmt] = useState('');
  const [theme] = useLocalStorage('theme', 'light');
  const [timetable] = useLocalStorage('ucc_timetable', []);
  const [profile] = useLocalStorage('ucc_profile', { name: '', phone: '', avatarUrl: '' });
  const [tasks, setTasks] = useLocalStorage('ucc_daily_tasks', []);
  const [reminders, setReminders] = useLocalStorage('ucc_reminders', []);
  const [quickNotes, setQuickNotes] = useLocalStorage('ucc_quick_notes', '');
  const [homeWidgetsRaw] = useLocalStorage(LS_KEYS.HOME_WIDGETS, DEFAULT_HOME_WIDGETS);
  const homeWidgets = useMemo(() => ({ ...DEFAULT_HOME_WIDGETS, ...homeWidgetsRaw }), [homeWidgetsRaw]);
  const [examMode] = useLocalStorage('ucc_exam_mode', false);
  const [notificationsEnabled] = useLocalStorage('ucc_notifications_enabled', true);

  const activeReminders = useMemo(() => {
    return Array.isArray(reminders) ? reminders.filter(r => !r.completed) : [];
  }, [reminders]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const handleQuickExpenseSubmit = (e) => {
    e.preventDefault();
    if (!quickExpenseAmt) return;
    setBudgetTransactions([...budgetTransactions, {
      id: crypto.randomUUID(), type: 'expense', category: 'General',
      amount: parseFloat(quickExpenseAmt), description: 'Quick log from Home',
      date: new Date().toISOString().split('T')[0]
    }]);
    setQuickExpenseAmt('');
    setShowExpensePopup(false);
    toast.success('Expense logged successfully!');
    window.dispatchEvent(new Event('storage'));
  };

  const [homeAssignments, setHomeAssignments] = useState(() => getAssignments());
  const [semesterInfo, setSemesterInfo] = useState(null);
  const [isDeferredActive, setIsDeferredActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsDeferredActive(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const isExamModeActive = useMemo(() => examMode || !!semesterInfo?.isExamPeriod, [examMode, semesterInfo]);

  const todaysExams = useMemo(() => {
    if (!Array.isArray(homeAssignments)) return [];
    const todayStr = new Date().toISOString().split('T')[0];
    const pLevel = profile.level || '100';
    const pSem = profile.semester || '1';
    return homeAssignments.filter(a => {
      if (a.type !== 'exam') return false;
      return String(a.academic_year || '100') === String(pLevel) &&
             String(a.semester || '1') === String(pSem) &&
             a.dueDate === todayStr;
    });
  }, [homeAssignments, profile.level, profile.semester]);

  useEffect(() => {
    const unsubCustom = onAssignmentsChanged(() => setHomeAssignments(getAssignments()));
    const handleStorage = (e) => { if (e.key === 'ucc_assignments') setHomeAssignments(getAssignments()); };
    window.addEventListener('storage', handleStorage);
    return () => { unsubCustom(); window.removeEventListener('storage', handleStorage); };
  }, []);

  const urgentDeadlines = useMemo(() => {
    const urgency = getAssignmentsByUrgency(homeAssignments);
    return [...urgency.overdue, ...urgency.today].slice(0, 3);
  }, [homeAssignments]);

  const thisWeekDeadlines = useMemo(() => {
    return getAssignmentsByUrgency(homeAssignments).thisWeek.slice(0, 4);
  }, [homeAssignments]);

  const handleQuickMarkSubmitted = (id) => {
    const assignment = homeAssignments.find(a => a.id === id);
    const oldStatus = assignment?.status || 'pending';
    markAssignmentStatus(id, 'submitted');
    setHomeAssignments(getAssignments());
    triggerConfetti();
    triggerHaptic();
    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-900">Marked as submitted</span>
        <button onClick={() => { markAssignmentStatus(id, oldStatus); setHomeAssignments(getAssignments()); toast.dismiss(t.id); toast.success('Status reverted!'); }}
          className="text-xs font-bold text-primary-400 bg-primary-400/10 px-3 py-1 rounded-lg hover:bg-primary-400/20 transition-colors flex-shrink-0">Undo</button>
      </div>
    ), { duration: 4000, icon: '\u2705', style: { borderRadius: '12px', padding: '12px 16px' } });
  };

  const [prodStats, setProdStats] = useState(null);
  useEffect(() => { const idleId = requestIdleCallback ? requestIdleCallback(() => getProductivityStats().then(setProdStats), { timeout: 3000 }) : setTimeout(() => getProductivityStats().then(setProdStats), 2000); return () => { if (requestIdleCallback) cancelIdleCallback(idleId); else clearTimeout(idleId); }; }, []);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTimeMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const currentTotalSeconds = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();

  const [todayHoliday, setTodayHoliday] = useState(null);

  useEffect(() => {
    if (!isDeferredActive) return;
    getTodayHoliday().then(h => { if (h) setTodayHoliday(h); }).catch(() => {});
    getCurrentSemesterInfo().then(info => { if (info) setSemesterInfo(info); }).catch(() => {});
    if (shouldSyncNow()) syncToCloud(deviceId).catch(() => {});
  }, [deviceId, isDeferredActive]);

  const todaysClassesWithStatus = useMemo(() => {
    if (!Array.isArray(timetable)) return [];
    return timetable.filter(c => {
      if (!c.day || c.day.toLowerCase() !== TODAY_NAME.toLowerCase()) return false;
      return String(c.academic_year || '100') === String(profile.level || '100') &&
             String(c.semester || '1') === String(profile.semester || '1');
    }).sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''))
      .map(c => {
        const startMins = getTimeMinutes(c.startTime);
        const endMins = c.endTime ? getTimeMinutes(c.endTime) : startMins + 60;
        let status = 'upcoming';
        let timeUntilStr = '';
        const startTotalSeconds = startMins * 60;
        if (currentTimeMinutes >= endMins) status = 'completed';
        else if (currentTimeMinutes >= startMins && currentTimeMinutes < endMins) status = 'ongoing';
        else if (startTotalSeconds > currentTotalSeconds) {
          const diffSeconds = startTotalSeconds - currentTotalSeconds;
          const hrs = Math.floor(diffSeconds / 3600);
          const mins = Math.floor((diffSeconds % 3600) / 60);
          const secs = diffSeconds % 60;
          timeUntilStr = hrs > 0 ? `in ${hrs}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s` : `in ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        return { ...c, status, startMins, endMins, timeUntilStr };
      });
  }, [timetable, currentTimeMinutes, currentTotalSeconds, profile.level, profile.semester]);

  const upcomingOrOngoingClasses = todaysClassesWithStatus.filter(c => c.status !== 'completed');
  const allCompleted = todaysClassesWithStatus.length > 0 && upcomingOrOngoingClasses.length === 0;

  const todaysTasks = useMemo(() => {
    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return tasks.filter(t => {
      if (t.date !== todayStr) return false;
      return String(t.academic_year || '100') === String(profile.level || '100') &&
             String(t.semester || '1') === String(profile.semester || '1');
    }).sort((a, b) => a.time.localeCompare(b.time));
  }, [tasks, profile.level, profile.semester]);

  const suggestedClassTasks = useMemo(() => {
    return todaysClassesWithStatus.filter(cls => {
      const expectedTitle = `Revise ${cls.courseName || cls.name || 'Class'}`;
      return !todaysTasks.some(t => t.title === expectedTitle);
    });
  }, [todaysClassesWithStatus, todaysTasks]);

  const handleAddSuggestion = (cls) => {
    let suggestedTime = '08:00';
    const classTimeStr = cls.startTime || cls.time;
    if (classTimeStr) {
      const [h, m] = classTimeStr.split(':').map(Number);
      suggestedTime = `${String(h - 1 < 0 ? 23 : h - 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }
    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    setTasks([...tasks, { id: Date.now().toString(), title: `Revise ${cls.courseName || cls.name || 'Class'}`, time: suggestedTime, endTime: null, icon: 'study', status: 'pending', date: todayStr }]);
  };

  const upcomingPlannedTasks = useMemo(() => {
    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const limit = new Date(d); limit.setDate(limit.getDate() + 14);
    const limitStr = `${limit.getFullYear()}-${String(limit.getMonth() + 1).padStart(2, '0')}-${String(limit.getDate()).padStart(2, '0')}`;
    return tasks.filter(t => t.date > todayStr && t.date <= limitStr)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [tasks]);

  const toggleTaskStatus = (id, forceComplete = false) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: forceComplete ? 'completed' : (t.status === 'completed' ? 'pending' : 'completed') } : t));
  };

  const upcomingAcademicEvents = useMemo(() => getUpcomingAcademicEvents(2), []);

  const libraryStatus = useMemo(() => {
    if (todayHoliday) return { isOpen: false, label: 'Closed', detail: `Closed for ${todayHoliday.name}. Opens next working day at 9:00 AM.` };
    const now = new Date();
    const day = now.getDay();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    if (day === 0) return { isOpen: false, label: 'Closed', detail: 'Closed today (Sunday). Opens Monday at 9:00 AM.' };
    let openMin, closeMin, closeStr;
    if (day === 6) { openMin = 9 * 60; closeMin = 20 * 60; closeStr = '8:00 PM'; }
    else { openMin = 9 * 60; closeMin = 22 * 60; closeStr = '10:00 PM'; }
    if (currentMinutes >= openMin && currentMinutes < closeMin) return { isOpen: true, label: 'Open', detail: `Closes at ${closeStr}` };
    if (currentMinutes < openMin) return { isOpen: false, label: 'Closed', detail: 'Opens today at 9:00 AM' };
    return { isOpen: false, label: 'Closed', detail: day === 6 ? 'Closed for today. Opens Monday at 9:00 AM.' : 'Closed for today. Opens tomorrow at 9:00 AM.' };
  }, [currentTimeMinutes, todayHoliday]);

  const [featuredContent, setFeaturedContent] = useState(null);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [seenVersion, setSeenVersion] = useState(0);

  const seenIds = useMemo(() => new Set(JSON.parse(localStorage.getItem('ucc_seen_updates') || '[]').map(String)), [seenVersion]);
  const unreadItems = useMemo(() => recentUpdates.filter(item => !seenIds.has(String(item.id))), [recentUpdates, seenIds]);
  const readItems = useMemo(() => recentUpdates.filter(item => seenIds.has(String(item.id))), [recentUpdates, seenIds]);

  const markItemAsRead = useCallback((id) => {
    const current = JSON.parse(localStorage.getItem('ucc_seen_updates') || '[]');
    localStorage.setItem('ucc_seen_updates', JSON.stringify([...new Set([...current, String(id)])]));
    setSeenVersion(v => v + 1);
  }, []);

  const markAllAsRead = useCallback(() => {
    const current = JSON.parse(localStorage.getItem('ucc_seen_updates') || '[]');
    const allIds = unreadItems.map(item => String(item.id));
    localStorage.setItem('ucc_seen_updates', JSON.stringify([...new Set([...current, ...allIds])]));
    setSeenVersion(v => v + 1);
    markAllInAppRead?.();
  }, [unreadItems, markAllInAppRead]);

  const handleNavigateToCommunity = useCallback((tab) => {
    navigate(`/community?tab=${tab}`);
    setIsNotifOpen(false);
  }, [navigate]);

  const showRedDot = notificationsEnabled && (unreadItems.length > 0 || unreadCount > 0);

  useEffect(() => {
    if (!isDeferredActive) return;
    if (!notificationsEnabled) { setRecentUpdates([]); setFetchStatus('idle'); return; }
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
        items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentUpdates(items);
        setFetchStatus('success');
      } catch (err) { console.error("Error fetching community updates", err); setFetchStatus('error'); }
    };
    const idleId = requestIdleCallback ? requestIdleCallback(() => fetchCommunityUpdates(), { timeout: 3000 }) : setTimeout(fetchCommunityUpdates, 2000);
    return () => { if (requestIdleCallback) cancelIdleCallback(idleId); else clearTimeout(idleId); };
  }, [notificationsEnabled, isDeferredActive]);

  useEffect(() => {
    if (!isDeferredActive) return;
    const fetchAdOrFallback = async () => {
      try {
        const { data: adsData } = await supabase.from('advertisements').select('*')
          .ilike('status', 'active').eq('package_id', 'home_banner').gte('expires_at', new Date().toISOString());
        if (!adsData || adsData.length === 0) {
          const { data: annFallback } = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(1);
          if (annFallback && annFallback[0]) setFeaturedContent({ kind: 'announcement', data: annFallback[0] });
          return;
        }
        setFeaturedContent({ kind: 'ad', data: adsData[Math.floor(Math.random() * adsData.length)] });
      } catch (err) { console.error("Error fetching ad", err); }
    };
    const idleId = requestIdleCallback ? requestIdleCallback(() => fetchAdOrFallback(), { timeout: 3000 }) : setTimeout(fetchAdOrFallback, 2000);
    return () => { if (requestIdleCallback) cancelIdleCallback(idleId); else clearTimeout(idleId); };
  }, [isDeferredActive]);

  const [weatherData, setWeatherData] = useState(null);
  const [verseData, setVerseData] = useState(null);
  const [forexData, setForexData] = useState(null);
  const [footballData, setFootballData] = useState(null);
  const [cryptoData, setCryptoData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [quoteData, setQuoteData] = useState(null);
  const [jokeData, setJokeData] = useState(null);
  const [factData, setFactData] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [expandedWidget, setExpandedWidget] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try { const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=5.1165&longitude=-1.2929&current_weather=true'); const data = await res.json(); if (data?.current_weather) setWeatherData(data.current_weather); }
      catch (err) { console.error("Failed to fetch weather", err); }
    };
    const fetchVerse = async () => {
      try { const res = await fetch('https://labs.bible.org/api/?passage=votd&type=json'); const data = await res.json(); if (data?.length > 0) { const cleanText = data[0].text.replace(/<[^>]*>?/gm, ''); setVerseData({ ...data[0], text: cleanText }); } }
      catch (err) { console.error("Failed to fetch verse", err); }
    };
    const fetchForex = async () => {
      try { const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); const data = await res.json(); if (data?.rates?.GHS) setForexData(data.rates.GHS); }
      catch (err) { console.error("Failed to fetch forex", err); }
    };
    const fetchCrypto = async () => {
      try { const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'); const data = await res.json(); if (data?.bitcoin?.usd) setCryptoData(data.bitcoin.usd); }
      catch (err) { console.error("Failed to fetch crypto", err); }
    };
    const fetchFootball = async () => {
      try {
        let liveData = null;
        try { const liveRes = await fetch('https://www.thesportsdb.com/api/v1/json/3/eventslive.php'); if (liveRes.ok) liveData = await liveRes.json(); } catch (e) {}
        if (liveData?.events?.length > 0) { const match = liveData.events[0]; setFootballData({ home: match.strHomeTeam, away: match.strAwayTeam, homeScore: match.intHomeScore ?? '?', awayScore: match.intAwayScore ?? '?', status: match.strProgress || 'LIVE', isLive: true }); return; }
        let lastData = null;
        try { const lastRes = await fetch('https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=134513'); if (lastRes.ok) lastData = await lastRes.json(); } catch (e) {}
        if (lastData?.results?.length > 0) {
          const match = lastData.results[0];
          const matchDateStr = match.strTimestamp || `${match.dateEvent}T${match.strTime || '00:00:00'}Z`;
          const diffHours = (new Date() - new Date(matchDateStr)) / (1000 * 60 * 60);
          if (diffHours > 48) setFootballData({ home: "No Active Matches", away: "", homeScore: "", awayScore: "", status: "OFF", isLive: false, isOffSeason: true });
          else setFootballData({ home: match.strHomeTeam, away: match.strAwayTeam, homeScore: match.intHomeScore, awayScore: match.intAwayScore, status: 'FT', isLive: false, isOffSeason: false });
        }
      } catch (err) { console.error("Failed to fetch football", err); }
    };
    const fetchNews = async () => {
      try { const res = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=1'); const data = await res.json(); if (data?.results?.length > 0) setNewsData(data.results[0]); }
      catch (err) { console.error("Failed to fetch news", err); }
    };
    const fetchQuote = async () => {
      try { const res = await fetch('https://dummyjson.com/quotes/random'); const data = await res.json(); if (data?.quote) setQuoteData(data); }
      catch (err) { console.error("Failed to fetch quote", err); }
    };
    const fetchJoke = async () => {
      try { const res = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }); const data = await res.json(); if (data?.joke) setJokeData(data.joke); }
      catch (err) { console.error("Failed to fetch joke", err); }
    };
    const fetchFact = async () => {
      try { const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random'); const data = await res.json(); if (data?.text) setFactData(data.text); }
      catch (err) { console.error("Failed to fetch fact", err); }
    };
    const fetchGithub = async () => {
      try { const res = await fetch('https://api.github.com/users/github'); const data = await res.json(); if (data?.login) setGithubData(data); }
      catch (err) { console.error("Failed to fetch github", err); }
    };
    const fetchWord = async () => {
      try {
        const fallbackWords = ['serendipity', 'ephemeral', 'luminescent', 'resilience', 'eloquent', 'sonder', 'petrichor', 'solitude', 'effervescent', 'aurora', 'halcyon', 'mellifluous', 'ineffable', 'ethereal', 'epiphany'];
        const word = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
        const res2 = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data2 = await res2.json();
        if (Array.isArray(data2) && data2.length > 0) setWordData(data2[0]);
        else setWordData({ word, meanings: [{ definitions: [{ definition: "Definition not found." }] }] });
      } catch (err) { console.error("Failed to fetch word", err); }
    };

    if (!isDeferredActive) return;
    const fetchAllWidgets = () => {
      if (homeWidgets.weather && !weatherData) fetchWeather();
      if (homeWidgets.verse && !verseData) fetchVerse();
      if (homeWidgets.forex && !forexData) fetchForex();
      if (homeWidgets.crypto && !cryptoData) fetchCrypto();
      if (homeWidgets.football) fetchFootball();
      if (homeWidgets.news && !newsData) fetchNews();
      if (homeWidgets.quote && !quoteData) fetchQuote();
      if (homeWidgets.joke && !jokeData) fetchJoke();
      if (homeWidgets.fact && !factData) fetchFact();
      if (homeWidgets.github && !githubData) fetchGithub();
      if (homeWidgets.word && !wordData) fetchWord();
    };
    const idleId = requestIdleCallback ? requestIdleCallback(() => fetchAllWidgets(), { timeout: 5000 }) : setTimeout(fetchAllWidgets, 3000);
    let footballInterval = null;
    if (homeWidgets.football) footballInterval = setInterval(fetchFootball, 60000);
    return () => { if (requestIdleCallback) cancelIdleCallback(idleId); else clearTimeout(idleId); if (footballInterval) clearInterval(footballInterval); };
  }, [homeWidgets, isDeferredActive]);

  const AFFILIATE_URL = 'https://www.cheapdata.shop/shop/anat-enterprise-1774112668074-swiftdata-mp8lcz98';
  const quickActions = [
    { title: 'Campus Map', icon: Map, action: () => navigate('/guide?topic=campus-map') },
    { title: 'Buy Data', icon: Wifi, action: () => window.open(AFFILIATE_URL, '_blank', 'noopener,noreferrer'), isAffiliate: true },
    { title: 'Contact Us', icon: MessageCircle, action: () => navigate('/contact') },
    { title: 'Settings', icon: Settings, action: () => navigate('/settings') },
  ];

  const widgetProps = { homeWidgets, weatherData, forexData, cryptoData, jokeData, factData, wordData, verseData, footballData, newsData, quoteData, githubData, expandedWidget, setExpandedWidget, isDeferredActive };
  const notifProps = { isOpen: isNotifOpen, onClose: () => setIsNotifOpen(false), unreadItems, readItems, fetchStatus, notificationsEnabled, onMarkItemRead: markItemAsRead, onMarkAllRead: markAllAsRead, onNavigate: handleNavigateToCommunity };

  return (
    <div className="pb-28 bg-[#f0f2f8] min-h-screen font-sans">
      <div className="lg:hidden">
        <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-900 px-6 pt-[calc(2.5rem_+_env(safe-area-inset-top,0px))] pb-16">
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[150%] h-[100px] bg-gray-900 rounded-[100%] blur-xl opacity-40 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" loading="lazy" className="w-8 h-8 object-contain rounded-md shadow-sm" />
              <span className="text-white font-bold tracking-widest text-xs uppercase opacity-90">Campus Guide</span>
            </div>
            <div className="flex items-center gap-3">
              <div id="bell-anchor-mobile" className="relative">
                <button onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform">
                  <Bell size={18} />
                  {showRedDot && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900"></span>}
                </button>
                <NotificationDropdown {...notifProps} />
              </div>
              {profile.avatarUrl ? (
                <button onClick={() => navigate('/profile')}
                  className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg overflow-hidden cursor-pointer active:scale-95 transition-transform bg-white/10 p-0.5">
                  <img src={profile.avatarUrl} alt="Avatar" loading="lazy" className="w-full h-full object-cover rounded-full bg-white" />
                </button>
              ) : (
                <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform">
                  <User size={18} />
                </button>
              )}
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-start gap-4 mt-2">
            <div className="w-full">
              <h2 className="text-white text-2xl font-black leading-tight tracking-tight mb-1">
                {getGreeting()}, {profile.name ? profile.name.split(' ')[0] : 'Student'}{getGreeting() === 'Happy New Month' ? ' 🎉' : ' 👋'}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col gap-1.5">
                  <p className="text-primary-400 text-xs font-bold uppercase tracking-wider flex items-center cursor-pointer active:opacity-70 transition-opacity">
                    {TODAY_LABEL}
                    <StreakBadge prodStats={prodStats} />
                  </p>
                  {isRunwayActive && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-white/60 text-sm font-semibold">GH₵ {safeToSpend.toFixed(2)}</span>
                      <span className="text-white/60 text-xs">safe to spend today</span>
                    </div>
                  )}
                </div>
                {isRunwayActive && (
                  <button onClick={() => setShowExpensePopup(true)}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white active:scale-95 transition-all shadow-sm flex-shrink-0" title="Add Expense">
                    <Plus size={18} />
                  </button>
                )}
              </div>
            </div>
            <WidgetBar {...widgetProps} />
            {homeWidgets.calendar && semesterInfo && (
              <div className="flex items-center gap-3 bg-gray-900/60 backdrop-blur-md border border-primary-400/30 px-4 py-3 rounded-2xl shadow-sm w-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10">
                  <Calendar size={18} className="text-primary-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">{semesterInfo.title}</span>
                  <span className="text-primary-400 text-xs font-medium leading-tight">
                    {semesterInfo.subtitle}
                    {semesterInfo.details && <span className="block mt-0.5">• {semesterInfo.details}</span>}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-5 -mt-8 relative z-20 space-y-6 pb-6">
          <ReminderAlert activeReminders={activeReminders} reminders={reminders} setReminders={setReminders} navigate={navigate} />
          {homeWidgets.classes && (
            <TodayClasses isExamModeActive={isExamModeActive} todaysExams={todaysExams}
              todaysClassesWithStatus={todaysClassesWithStatus} allCompleted={allCompleted}
              todayHoliday={todayHoliday} navigate={navigate} formatTime12Hour={formatTime12Hour}
              isDeferredActive={isDeferredActive} />
          )}
          <FeaturedAd isDeferredActive={isDeferredActive} featuredContent={featuredContent} />
          {homeWidgets.tasks && (
            <TasksSection isDeferredActive={isDeferredActive} urgentDeadlines={urgentDeadlines}
              todaysTasks={todaysTasks} thisWeekDeadlines={thisWeekDeadlines}
              handleQuickMarkSubmitted={handleQuickMarkSubmitted} toggleTaskStatus={toggleTaskStatus}
              handleAddSuggestion={handleAddSuggestion} suggestedClassTasks={suggestedClassTasks}
              navigate={navigate} formatTime12Hour={formatTime12Hour} getIconComponent={getIconComponent} />
          )}
          {homeWidgets.library && <LibraryStatus libraryStatus={libraryStatus} />}
          {homeWidgets.tasks && (
            <UpcomingSection upcomingPlannedTasks={upcomingPlannedTasks} navigate={navigate}
              formatTime12Hour={formatTime12Hour} getIconComponent={getIconComponent} />
          )}
          {homeWidgets.calendar && <AcademicEvents upcomingAcademicEvents={upcomingAcademicEvents} />}
          <QuickActions quickActions={quickActions} />
          {homeWidgets.quickNote && <QuickNote quickNotes={quickNotes} setQuickNotes={setQuickNotes} />}
          <SupportBanner actions={actions} />
        </div>
      </div>
      <DesktopLayout profile={profile} getGreeting={getGreeting} TODAY_LABEL={TODAY_LABEL}
        TODAY_NAME={TODAY_NAME} triggerConfetti={triggerConfetti} prodStats={prodStats}
        weatherData={weatherData} homeWidgets={homeWidgets} renderWeatherSvg={renderWeatherSvg}
        getWeatherIconAndAdvice={getWeatherIconAndAdvice} isNotifOpen={isNotifOpen}
        setIsNotifOpen={setIsNotifOpen} showRedDot={showRedDot} {...notifProps}
        navigate={navigate} quickActions={quickActions} isDeferredActive={isDeferredActive}
        featuredContent={featuredContent} actions={actions}
        activeReminders={activeReminders} reminders={reminders} setReminders={setReminders} />
      <ExpenseModal showExpensePopup={showExpensePopup} setShowExpensePopup={setShowExpensePopup}
        quickExpenseAmt={quickExpenseAmt} setQuickExpenseAmt={setQuickExpenseAmt}
        handleQuickExpenseSubmit={handleQuickExpenseSubmit} />
      <CoachMarksOverlay storageKey="ucc_coach_home" steps={HOME_COACH_STEPS} />
    </div>
  );
};

export default Home;
