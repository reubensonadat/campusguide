// src/services/syncService.js
//
// KEY CHANGE: Timetable sync now includes academic_year & semester fields.
// All other sync logic remains untouched.

import { supabase } from '../lib/supabase';

const SYNC_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
const SYNC_KEY = 'ucc_last_sync';

// ─── Helpers ───────────────────────────────────────────────────────────────

function getLastSync() {
  return parseInt(localStorage.getItem(SYNC_KEY) || '0', 10);
}

function setLastSync() {
  localStorage.setItem(SYNC_KEY, Date.now().toString());
}

function getUserId() {
  try {
    const localUserId = localStorage.getItem('ucc_user_id');
    if (localUserId) return localUserId;
    const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
    return profile?.user_id || profile?.id || null;
  } catch {
    return null;
  }
}

// ─── Timetable ─────────────────────────────────────────────────────────────

export async function pushTimetableToCloud() {
  const userId = getUserId();
  if (!userId) return;

  const courses = JSON.parse(localStorage.getItem('ucc_timetable') || '[]');
  if (!courses.length) return;

  // ★ KEY FIX: Include academic_year and semester in each row
  const rows = courses.map(c => ({
    id: c.id,
    user_id: userId,
    name: c.name,
    day: c.day,
    start_time: c.start_time,
    end_time: c.end_time,
    location: c.location,
    color: c.color,
    lecturer: c.lecturer,
    contact: c.contact,
    target_grade: c.target_grade,
    credit_hours: c.credit_hours,
    // ★ NEW — semester scope fields
    academic_year: c.academic_year || null,
    semester: c.semester || null,
  }));

  const { error } = await supabase
    .from('user_timetable')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[syncService] pushTimetable error:', error.message);
  } else {
    console.log('[syncService] pushTimetable OK:', rows.length, 'rows');
  }
}

export async function pullTimetableFromCloud() {
  const userId = getUserId();
  if (!userId) return;

  const { data, error } = await supabase
    .from('user_timetable')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('[syncService] pullTimetable error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    // ★ Cloud rows already have academic_year & semester — store them as-is
    const localCourses = data.map(row => ({
      id: row.id,
      name: row.name,
      day: row.day,
      start_time: row.start_time,
      end_time: row.end_time,
      location: row.location,
      color: row.color,
      lecturer: row.lecturer,
      contact: row.contact,
      target_grade: row.target_grade,
      credit_hours: row.credit_hours,
      academic_year: row.academic_year,
      semester: row.semester,
    }));

    localStorage.setItem('ucc_timetable', JSON.stringify(localCourses));
    console.log('[syncService] pullTimetable OK:', localCourses.length, 'rows');
  }
}

// ─── Assignments ───────────────────────────────────────────────────────────

export async function pushAssignmentsToCloud() {
  const userId = getUserId();
  if (!userId) return;

  const assignments = JSON.parse(localStorage.getItem('ucc_assignments') || '[]');
  if (!assignments.length) return;

  const rows = assignments.map(a => ({
    id: a.id,
    user_id: userId,
    title: a.title,
    description: a.description,
    course: a.course,
    due_date: a.due_date,
    status: a.status,
    priority: a.priority,
    academic_year: a.academic_year || null,
    semester: a.semester || null,
  }));

  const { error } = await supabase
    .from('user_assignments')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[syncService] pushAssignments error:', error.message);
  } else {
    console.log('[syncService] pushAssignments OK:', rows.length, 'rows');
  }
}

export async function pullAssignmentsFromCloud() {
  const userId = getUserId();
  if (!userId) return;

  const { data, error } = await supabase
    .from('user_assignments')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('[syncService] pullAssignments error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localAssignments = data.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      course: row.course,
      due_date: row.due_date,
      status: row.status,
      priority: row.priority,
      academic_year: row.academic_year,
      semester: row.semester,
    }));
    localStorage.setItem('ucc_assignments', JSON.stringify(localAssignments));
  }
}

// ─── GPA Courses ───────────────────────────────────────────────────────────

export async function pushGPAToCloud() {
  const userId = getUserId();
  if (!userId) return;

  const gpaCourses = JSON.parse(localStorage.getItem('ucc_gpa') || '[]');
  if (!gpaCourses.length) return;

  const rows = gpaCourses.map(c => ({
    id: c.id,
    user_id: userId,
    course_name: c.course_name || c.name,
    grade: c.grade,
    credit_hours: c.credit_hours,
    academic_year: c.academic_year || null,
    semester: c.semester || null,
  }));

  const { error } = await supabase
    .from('user_gpa_courses')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[syncService] pushGPA error:', error.message);
  } else {
    console.log('[syncService] pushGPA OK:', rows.length, 'rows');
  }
}

export async function pullGPAFromCloud() {
  const userId = getUserId();
  if (!userId) return;

  const { data, error } = await supabase
    .from('user_gpa_courses')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('[syncService] pullGPA error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localCourses = data.map(row => ({
      id: row.id,
      course_name: row.course_name,
      name: row.course_name,   // keep both for backward compat
      grade: row.grade,
      credit_hours: row.credit_hours,
      academic_year: row.academic_year,
      semester: row.semester,
    }));
    localStorage.setItem('ucc_gpa', JSON.stringify(localCourses));
  }
}

// ─── Tasks ─────────────────────────────────────────────────────────────────

export async function pushTasksToCloud() {
  const userId = getUserId();
  if (!userId) return;

  const tasks = JSON.parse(localStorage.getItem('ucc_daily_tasks') || '[]');
  if (!tasks.length) return;

  const rows = tasks.map(t => ({
    id: t.id,
    user_id: userId,
    title: t.title,
    description: t.description || '',
    completed: t.completed || false,
    date: t.date,
    academic_year: t.academic_year || null,
    semester: t.semester || null,
  }));

  const { error } = await supabase
    .from('user_tasks')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[syncService] pushTasks error:', error.message);
  } else {
    console.log('[syncService] pushTasks OK:', rows.length, 'rows');
  }
}

export async function pullTasksFromCloud() {
  const userId = getUserId();
  if (!userId) return;

  const { data, error } = await supabase
    .from('user_tasks')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('[syncService] pullTasks error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localTasks = data.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      completed: row.completed,
      date: row.date,
      academic_year: row.academic_year,
      semester: row.semester,
    }));
    localStorage.setItem('ucc_daily_tasks', JSON.stringify(localTasks));
  }
}

// ─── Budget (NO semester fields — money carries forward) ───────────────────

export async function pushBudgetToCloud() {
  const userId = getUserId();
  if (!userId) return;

  const transactions = JSON.parse(localStorage.getItem('ucc_budget') || '[]');
  if (!transactions.length) return;

  // budget_transactions table has NO academic_year/semester columns
  const rows = transactions.map(t => ({
    id: t.id,
    user_id: userId,
    type: t.type,
    amount: t.amount,
    category: t.category,
    description: t.description || '',
    date: t.date,
  }));

  const { error } = await supabase
    .from('budget_transactions')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('[syncService] pushBudget error:', error.message);
  } else {
    console.log('[syncService] pushBudget OK:', rows.length, 'rows');
  }
}

export async function pullBudgetFromCloud() {
  const userId = getUserId();
  if (!userId) return;

  const { data, error } = await supabase
    .from('budget_transactions')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('[syncService] pullBudget error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localTxns = data.map(row => ({
      id: row.id,
      type: row.type,
      amount: row.amount,
      category: row.category,
      description: row.description,
      date: row.date,
    }));
    localStorage.setItem('ucc_budget', JSON.stringify(localTxns));
  }
}

// ─── Full Sync (pull then push) ────────────────────────────────────────────

export async function fullSync() {
  const lastSync = getLastSync();
  const now = Date.now();

  // Pull latest from cloud first
  await pullTimetableFromCloud();
  await pullAssignmentsFromCloud();
  await pullGPAFromCloud();
  await pullTasksFromCloud();
  await pullBudgetFromCloud();

  // Then push local changes
  await pushTimetableToCloud();
  await pushAssignmentsToCloud();
  await pushGPAToCloud();
  await pushTasksToCloud();
  await pushBudgetToCloud();

  setLastSync();
  console.log('[syncService] fullSync complete');
}

// ─── Quick Push: Push a single entity immediately (no 24h wait) ────────────
// Call this when the user explicitly changes semester, adds a course, etc.

export async function quickPushTimetable() {
  await pushTimetableToCloud();
}

export async function quickPushAssignments() {
  await pushAssignmentsToCloud();
}

export async function quickPushGPA() {
  await pushGPAToCloud();
}

export async function quickPushTasks() {
  await pushTasksToCloud();
}

// ─── Auto-Sync Timer ───────────────────────────────────────────────────────

let syncTimer = null;

export function startAutoSync() {
  if (syncTimer) return; // already running

  // Sync immediately on start if 24h has passed
  const lastSync = getLastSync();
  if (Date.now() - lastSync >= SYNC_INTERVAL) {
    fullSync();
  }

  syncTimer = setInterval(() => {
    fullSync();
  }, SYNC_INTERVAL);

  console.log('[syncService] auto-sync started (every 24h)');
}

export function stopAutoSync() {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log('[syncService] auto-sync stopped');
  }
}

const LINKED_DEVICE_KEY = 'ucc_is_linked_device';

export function markDeviceAsLinked() {
  localStorage.setItem(LINKED_DEVICE_KEY, 'true');
}

export function isLinkedDevice() {
  return localStorage.getItem(LINKED_DEVICE_KEY) === 'true';
}

export async function restoreFromCloud() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, error: 'User not authenticated. Please restore lifecycle first.' };

  try {
    // 1. Restore Settings & Profile
    const { data: settings } = await supabase
      .from('user_settings')
      .select('*')
      .single();

    if (settings) {
      if (settings.profile && Object.keys(settings.profile).length > 0) {
        const existingProfile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
        localStorage.setItem('ucc_profile', JSON.stringify({ ...existingProfile, ...settings.profile }));
      }
      if (settings.home_widgets && Object.keys(settings.home_widgets).length > 0) {
        localStorage.setItem('ucc_home_widgets', JSON.stringify(settings.home_widgets));
      }
    }

    const { data: userProfile } = await supabase.from('users').select('*').single();
    if (userProfile) {
        const existingProfile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
        const mergedProfile = { ...existingProfile };
        if (userProfile.name) mergedProfile.name = userProfile.name;
        if (userProfile.phone_number) mergedProfile.phone = userProfile.phone_number;
        if (userProfile.course) mergedProfile.course = userProfile.course;
        if (userProfile.level) mergedProfile.level = userProfile.level;
        localStorage.setItem('ucc_profile', JSON.stringify(mergedProfile));
    }

    // 2. Pull everything else
    await pullTimetableFromCloud();
    await pullAssignmentsFromCloud();
    await pullGPAFromCloud();
    await pullTasksFromCloud();
    await pullBudgetFromCloud();

    // 3. Restore Notes
    const { data: notes } = await supabase
      .from('user_notes')
      .select('content')
      .eq('id', 'quick_note')
      .single();

    if (notes && notes.content) {
      localStorage.setItem('ucc_quick_notes', notes.content);
    }

    return { success: true };
  } catch (error) {
    console.error('Restore failed:', error);
    return { success: false, error: error.message };
  }
}

const LAST_PULL_KEY = 'ucc_last_pull_time';

export async function syncToCloud() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, error: 'User not authenticated with PIN.' };

  const userId = user.id;

  try {
    // 1. Sync Profile & Settings
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
          phone_number: profile.phone || null,
          course: profile.course || null,
          level: profile.level || null
        })
        .eq('id', userId);
    }

    // 2. Sync everything else using the new push functions
    await pushTimetableToCloud();
    await pushAssignmentsToCloud();
    await pushGPAToCloud();
    await pushTasksToCloud();
    await pushBudgetToCloud();

    // 3. Sync Quick Notes
    const notes = localStorage.getItem('ucc_quick_notes') || '';
    await supabase
      .from('user_notes')
      .upsert({
        id: 'quick_note',
        user_id: userId,
        content: notes,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    // Mark sync time
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
  // 1. Push local changes up
  await syncToCloud();

  // 2. Pull cloud changes down
  const result = await restoreFromCloud();

  // 3. Mark pull time
  localStorage.setItem(LAST_PULL_KEY, Date.now().toString());

  return result;
}

let syncTimeout = null;
export function triggerBackgroundSync() {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    syncToCloud().catch(err => console.error("Background sync failed:", err));
  }, 5000);
}


