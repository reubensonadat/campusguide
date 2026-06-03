import { supabase } from '../lib/supabase';

const LS_KEY = 'ucc_productivity_logs';

export const TITLE_THRESHOLDS = {
  ACADEMIC_WEAPON: { days: 7, label: 'Academic Weapon', icon: '🔥', color: 'bg-primary-500', textColor: 'text-primary-500', desc: 'You are on an unstoppable study streak (7+ days). Total mastery!' },
  ORCHESTRATOR: { days: 3, label: 'Orchestrator', icon: '⚡', color: 'bg-primary-400', textColor: 'text-primary-400', desc: 'You are building serious momentum (3-6 days). Keep conducting your success.' },
  AVERAGE_STUDENT: { days: 0, label: 'Average Student', icon: '📚', color: 'bg-gray-400', textColor: 'text-gray-400', desc: 'You are just getting started (0-2 days). Build a 3-day streak to level up.' }
};

export function getStudyTitle(streakDays) {
  if (streakDays >= TITLE_THRESHOLDS.ACADEMIC_WEAPON.days) return TITLE_THRESHOLDS.ACADEMIC_WEAPON;
  if (streakDays >= TITLE_THRESHOLDS.ORCHESTRATOR.days) return TITLE_THRESHOLDS.ORCHESTRATOR;
  return TITLE_THRESHOLDS.AVERAGE_STUDENT;
}

// Log a session locally and push to Supabase
export async function logStudySession(durationMinutes) {
  if (durationMinutes < 15) return false; // Minimum 15 minutes required

  const today = new Date().toISOString().split('T')[0];
  const newLog = {
    id: Date.now().toString(),
    date: today,
    duration_minutes: durationMinutes,
    timestamp: Date.now()
  };

  // Save locally first
  let logs = [];
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) logs = JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse local productivity logs', e);
  }
  
  logs.push(newLog);
  localStorage.setItem(LS_KEY, JSON.stringify(logs));

  // Sync to Supabase
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('productivity_logs').insert([
        {
          id: newLog.id,
          user_id: user.id,
          date: newLog.date,
          duration_minutes: newLog.duration_minutes,
          timestamp: newLog.timestamp
        }
      ]);
    }
  } catch (e) {
    console.error('Failed to sync productivity log to Supabase', e);
  }

  return true;
}

// Fetch all stats (local merged with cloud if possible)
export async function getProductivityStats() {
  let localLogs = [];
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) localLogs = JSON.parse(stored);
  } catch (e) {}

  // Attempt to pull from Supabase to merge
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('productivity_logs')
        .select('*')
        .eq('user_id', user.id);
        
      if (!error && data) {
        // Merge cloud logs with local logs
        const merged = [...localLogs];
        data.forEach(cloudLog => {
          if (!merged.find(l => l.id === cloudLog.id)) {
            merged.push(cloudLog);
          }
        });
        localLogs = merged;
        localStorage.setItem(LS_KEY, JSON.stringify(localLogs));
      }
    }
  } catch (e) {
    console.error('Failed to fetch productivity logs from Supabase', e);
  }

  return calculateStatsFromLogs(localLogs);
}

function calculateStatsFromLogs(logs) {
  // Aggregate duration per date
  const dateMap = {};
  let totalMinutes = 0;

  logs.forEach(log => {
    if (!dateMap[log.date]) dateMap[log.date] = 0;
    dateMap[log.date] += log.duration_minutes;
    totalMinutes += log.duration_minutes;
  });

  // Calculate streak
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0,0,0,0);
  
  // Start checking from today backwards
  let checkDate = new Date(today);
  
  // If no study today, check if they studied yesterday (streak is preserved if they just woke up)
  const todayStr = checkDate.toISOString().split('T')[0];
  const yesterdayDate = new Date(checkDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  if (dateMap[todayStr] && dateMap[todayStr] > 0) {
    // Valid for today
  } else if (dateMap[yesterdayStr] && dateMap[yesterdayStr] > 0) {
    // Valid, streak is alive from yesterday, start counting from yesterday
    checkDate = yesterdayDate;
  } else {
    // Streak broken
    return {
      totalMinutes,
      currentStreak: 0,
      dailyData: dateMap,
      title: getStudyTitle(0)
    };
  }

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (dateMap[dateStr] && dateMap[dateStr] > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1); // go back one day
    } else {
      break;
    }
  }

  return {
    totalMinutes,
    currentStreak,
    dailyData: dateMap,
    title: getStudyTitle(currentStreak)
  };
}
