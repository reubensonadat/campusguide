import { supabase } from '../lib/supabase';

const SYNC_INTERVAL = 24 * 60 * 60 * 1000;
export { SYNC_INTERVAL };
const SYNC_KEY = 'ucc_last_sync';
export { SYNC_KEY };
const LAST_PULL_KEY = 'ucc_last_pull_time';
export { LAST_PULL_KEY };
const LINKED_DEVICE_KEY = 'ucc_is_linked_device';
export { LINKED_DEVICE_KEY };

export function getLastSync() {
  return parseInt(localStorage.getItem(SYNC_KEY) || '0', 10);
}

export function setLastSync() {
  localStorage.setItem(SYNC_KEY, Date.now().toString());
}

export function getUserId() {
  try {
    const localUserId = localStorage.getItem('ucc_user_id');
    if (localUserId) return localUserId;
    const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
    return profile?.user_id || profile?.id || null;
  } catch {
    return null;
  }
}

export async function getCloudCounts(userId) {
  try {
    const [tt, gpa] = await Promise.all([
      supabase.from('user_timetable').select('id', { count: 'exact', head: true }).eq('user_id', userId).is('deleted_at', null),
      supabase.from('user_gpa_courses').select('id', { count: 'exact', head: true }).eq('user_id', userId).is('deleted_at', null),
    ]);
    return {
      timetable: tt.count || 0,
      gpa: gpa.count || 0,
    };
  } catch {
    return { timetable: 0, gpa: 0 };
  }
}
