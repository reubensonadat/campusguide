import { supabase } from '../lib/supabase';
import { sanitizeGhanaPhone } from '../utils/helpers';
import { getCloudCounts, getLastSync, SYNC_INTERVAL, SYNC_KEY, LAST_PULL_KEY } from './syncHelpers';
import { pushTimetableToCloud } from './syncTimetable';
import { pushAssignmentsToCloud } from './syncAssignments';
import { pushGPAToCloud } from './syncGPA';
import { pushTasksToCloud } from './syncTasks';
import { pushBudgetToCloud } from './syncBudget';
import { isLinkedDevice } from './syncScheduler';
import { restoreFromCloud } from './syncFullRestore';

export async function syncToCloud({ force = false } = {}) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, error: 'User not authenticated with PIN.' };

  const userId = user.id;

  try {
    if (!force) {
      const localTimetable = JSON.parse(localStorage.getItem('ucc_timetable') || '[]');
      const localGPA = JSON.parse(localStorage.getItem('ucc_gpa') || '[]');

      if (localTimetable.length === 0 && localGPA.length === 0) {
        console.log('[syncService] ABORT: Local data is empty. Won\'t overwrite cloud backup.');
        return { success: false, error: 'Local data is empty. Restore from cloud first, or add some courses.' };
      }

      const cloudCounts = await getCloudCounts(userId);
      if (cloudCounts.timetable > localTimetable.length) {
        console.log(`[syncService] ABORT: Local has ${localTimetable.length} timetable courses, cloud has ${cloudCounts.timetable}.`);
        return {
          success: false,
          error: `Your cloud backup has ${cloudCounts.timetable} courses but this device only has ${localTimetable.length}. Restore from cloud first to avoid losing data.`,
          cloudCounts,
          localCounts: { timetable: localTimetable.length, gpa: localGPA.length },
        };
      }
    }

    const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
    if (profile.name || profile.phone || profile.course) {
      await supabase
        .from('user_settings')
        .upsert({
          user_id: userId,
          profile: profile,
          home_widgets: JSON.parse(localStorage.getItem('ucc_home_widgets') || '{}'),
          settings: JSON.parse(localStorage.getItem('ucc_settings') || '{}'),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      await supabase
        .from('users')
        .update({
          name: profile.name || null,
          phone_number: sanitizeGhanaPhone(profile.phone) || null,
          course: profile.course || null,
          level: profile.level || null,
          current_semester: profile.semester ? parseInt(profile.semester, 10) : null,
          avatar_url: profile.avatarUrl || null,
          student_id: profile.student_id || null
        })
        .eq('id', userId);
    }

    if (force) {
      const now = new Date().toISOString();
      await Promise.all([
        supabase.from('user_timetable').update({ deleted_at: now }).eq('user_id', userId),
        supabase.from('user_assignments').update({ deleted_at: now }).eq('user_id', userId),
        supabase.from('user_gpa_courses').update({ deleted_at: now }).eq('user_id', userId),
        supabase.from('user_tasks').update({ deleted_at: now }).eq('user_id', userId),
        supabase.from('budget_transactions').update({ deleted_at: now }).eq('user_id', userId)
      ]);
    }

    await pushTimetableToCloud();
    await pushAssignmentsToCloud();
    await pushGPAToCloud();
    await pushTasksToCloud();
    await pushBudgetToCloud();

    const notes = localStorage.getItem('ucc_quick_notes') || '';
    await supabase
      .from('user_notes')
      .upsert({
        id: 'quick_note',
        user_id: userId,
        content: notes,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    localStorage.setItem(SYNC_KEY, Date.now().toString());

    return { success: true };
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, error: error.message };
  }
}

export function shouldSyncNow() {
  const lastSync = getLastSync();
  if (!lastSync) return true;
  const diff = Date.now() - lastSync;
  return diff >= SYNC_INTERVAL;
}

export function shouldPullNow() {
  if (!isLinkedDevice()) return false;
  const lastPull = parseInt(localStorage.getItem(LAST_PULL_KEY) || '0', 10);
  if (!lastPull) return true;
  const diff = Date.now() - lastPull;
  return diff >= SYNC_INTERVAL;
}

export async function bidirectionalSync() {
  await syncToCloud();
  const result = await restoreFromCloud();
  localStorage.setItem(LAST_PULL_KEY, Date.now().toString());
  return result;
}

let syncTimeout = null;
export function triggerBackgroundSync({ force = false } = {}) {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      const result = await syncToCloud({ force });
      if (!result.success && result.error && result.error.includes('Your cloud backup has')) {
        window.dispatchEvent(new CustomEvent('SYNC_CONFLICT', { detail: result }));
      } else if (!result.success && result.error) {
        const { toast } = await import('react-hot-toast');
        toast.error(`Sync blocked: ${result.error}`, { duration: 6000 });
      }
    } catch (err) {
      console.error("Background sync failed:", err);
    }
  }, 5000);
}
