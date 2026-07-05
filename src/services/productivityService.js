import { supabase } from '../lib/supabase';

const LS_KEY = 'ucc_productivity_logs';
const APP_OPENS_KEY = 'ucc_app_open_dates';

export const TITLE_THRESHOLDS = {
  ACADEMIC_WEAPON: { days: 7, label: 'Campus Legend', icon: '🔥', color: 'bg-primary-500', textColor: 'text-primary-500', desc: 'You are on an unstoppable streak (7+ days). Total mastery!' },
  ORCHESTRATOR: { days: 3, label: 'Consistent', icon: '⚡', color: 'bg-primary-400', textColor: 'text-primary-400', desc: 'You are building serious momentum (3-6 days). Keep it up.' },
  AVERAGE_STUDENT: { days: 0, label: 'Getting Started', icon: '📚', color: 'bg-gray-400', textColor: 'text-gray-400', desc: 'You are just getting started (0-2 days). Build a 3-day streak to level up.' }
};

export function getStudyTitle(streakDays) {
  if (streakDays >= TITLE_THRESHOLDS.ACADEMIC_WEAPON.days) return TITLE_THRESHOLDS.ACADEMIC_WEAPON;
  if (streakDays >= TITLE_THRESHOLDS.ORCHESTRATOR.days) return TITLE_THRESHOLDS.ORCHESTRATOR;
  return TITLE_THRESHOLDS.AVERAGE_STUDENT;
}

// Log a daily app open to build the streak
export function logAppOpen() {
  const today = new Date().toISOString().split('T')[0];
  let openDates = [];
  try {
    const stored = localStorage.getItem(APP_OPENS_KEY);
    if (stored) openDates = JSON.parse(stored);
  } catch (e) {}

  if (!openDates.includes(today)) {
    openDates.push(today);
    localStorage.setItem(APP_OPENS_KEY, JSON.stringify(openDates));
  }
}

// Calculate streak from open dates
function calculateAppOpenStreak() {
  let openDates = [];
  try {
    const stored = localStorage.getItem(APP_OPENS_KEY);
    if (stored) openDates = JSON.parse(stored);
  } catch (e) {}

  const dateMap = {};
  openDates.forEach(d => dateMap[d] = true);

  let currentStreak = 0;
  const today = new Date();
  today.setHours(0,0,0,0);
  
  let checkDate = new Date(today);
  const todayStr = checkDate.toISOString().split('T')[0];
  
  const yesterdayDate = new Date(checkDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  if (dateMap[todayStr]) {
    // Valid for today
  } else if (dateMap[yesterdayStr]) {
    // Valid, streak is alive from yesterday, start counting from yesterday
    checkDate = yesterdayDate;
  } else {
    // Streak broken
    return 0;
  }

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (dateMap[dateStr]) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return currentStreak;
}


// Log a session locally and push to Supabase (Legacy support for Focus Timer)
export async function logStudySession(durationMinutes) {
  if (durationMinutes < 15) return false; 

  const today = new Date().toISOString().split('T')[0];
  const newLog = {
    id: Date.now().toString(),
    date: today,
    duration_minutes: durationMinutes,
    timestamp: Date.now()
  };

  let logs = [];
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) logs = JSON.parse(stored);
  } catch (e) {}
  
  logs.push(newLog);
  localStorage.setItem(LS_KEY, JSON.stringify(logs));

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('productivity_logs').insert([{
        id: newLog.id, user_id: user.id, date: newLog.date, duration_minutes: newLog.duration_minutes, timestamp: newLog.timestamp
      }]);
    }
  } catch (e) {}

  return true;
}

// Fetch all stats (local merged with cloud if possible)
export async function getProductivityStats() {
  let localLogs = [];
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) localLogs = JSON.parse(stored);
  } catch (e) {}

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('productivity_logs')
        .select('*')
        .eq('user_id', user.id);
        
      if (!error && data) {
        const merged = [...localLogs];
        data.forEach(cloudLog => {
          if (!merged.find(l => l.id === cloudLog.id)) merged.push(cloudLog);
        });
        localLogs = merged;
        localStorage.setItem(LS_KEY, JSON.stringify(localLogs));
      }
    }
  } catch (e) {}

  const dateMap = {};
  let totalMinutes = 0;
  localLogs.forEach(log => {
    if (!dateMap[log.date]) dateMap[log.date] = 0;
    dateMap[log.date] += log.duration_minutes;
    totalMinutes += log.duration_minutes;
  });

  const currentStreak = calculateAppOpenStreak();

  return {
    totalMinutes,
    currentStreak,
    dailyData: dateMap,
    title: getStudyTitle(currentStreak)
  };
}
