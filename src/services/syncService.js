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

  // Process tombstones
  try {
    const deletedIds = JSON.parse(localStorage.getItem('ucc_timetable_deleted') || '[]');
    if (deletedIds.length > 0) {
      const { error } = await supabase
        .from('user_timetable')
        .update({ deleted_at: new Date().toISOString() })
        .in('id', deletedIds);
      if (!error) localStorage.removeItem('ucc_timetable_deleted');
    }
  } catch (e) {
    console.error('[syncService] pushTimetable tombstones error:', e);
  }

  const rawCourses = JSON.parse(localStorage.getItem('ucc_timetable') || '[]');
  if (!rawCourses.length) return;

  // Deduplicate the rows we send to cloud — do NOT overwrite localStorage.
  const seen = new Set();
  const courses = rawCourses.filter(c => {
    const key = `${c.name}-${c.day}-${c.academic_year}-${c.semester}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // ── DUPLICATE GUARD: Query cloud for existing courses ──
  // If a course with the same (name, day, start_time, end_time, academic_year, semester)
  // already exists in the cloud, reuse its cloud ID so we UPDATE instead of INSERT.
  let cloudExisting = [];
  try {
    const { data } = await supabase
      .from('user_timetable')
      .select('id, name, day, start_time, end_time, academic_year, semester')
      .eq('user_id', userId)
      .is('deleted_at', null);
    cloudExisting = data || [];
  } catch (e) { /* proceed without guard */ }

  // Build a lookup map: semantic key → cloud ID
  const cloudMap = new Map();
  for (const row of cloudExisting) {
    const key = `${(row.name || '').trim().toLowerCase()}-${row.day}-${row.start_time}-${row.end_time}-${row.academic_year || ''}-${row.semester || ''}`;
    cloudMap.set(key, row.id);
  }

  const rows = courses
    .filter(c => c.name && c.day && (c.start_time || c.startTime) && (c.end_time || c.endTime))
    .map(c => {
      const semanticKey = `${(c.name || '').trim().toLowerCase()}-${c.day}-${c.start_time || c.startTime}-${c.end_time || c.endTime}-${c.academic_year || ''}-${c.semester || ''}`;
      const cloudId = cloudMap.get(semanticKey);

      return {
        id: cloudId || String(c.id),  // reuse cloud ID if match found
        user_id: userId,
        name: c.name,
        day: c.day,
        start_time: c.start_time || c.startTime,
        end_time: c.end_time || c.endTime,
        location: c.location || '',
        color: c.color || '#002F45',
        lecturer: c.lecturer || '',
        contact: c.contact || '',
        target_grade: c.target_grade || c.targetGrade || '',
        credit_hours: parseInt(c.credit_hours || c.creditHours, 10) || 3,
        academic_year: c.academic_year || null,
        semester: c.semester || null,
        updated_at: new Date().toISOString(),
      };
    });

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
    .eq('user_id', userId)
    .is('deleted_at', null);

  if (error) {
    console.error('[syncService] pullTimetable error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    // ★ Map snake_case DB columns back to camelCase so TimetableBuilder
    //   (which reads startTime, endTime, creditHours, targetGrade) works correctly.
    const localCourses = data.map(row => ({
      id: row.id,
      name: row.name,
      day: row.day,
      startTime: row.start_time,       // camelCase — TimetableBuilder expects this
      endTime: row.end_time,           // camelCase — TimetableBuilder expects this
      location: row.location,
      color: row.color,
      lecturer: row.lecturer,
      contact: row.contact,
      targetGrade: row.target_grade,   // camelCase — GPACalculator merge expects this
      creditHours: row.credit_hours,   // camelCase — TimetableBuilder & GPACalculator expect this
      academic_year: row.academic_year,
      semester: row.semester,
    }));

    // Deduplicate
    const seen = new Set();
    const deduped = localCourses.filter(c => {
      const key = `${c.name}-${c.day}-${c.academic_year}-${c.semester}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    localStorage.setItem('ucc_timetable', JSON.stringify(deduped));
    console.log('[syncService] pullTimetable OK:', deduped.length, 'rows');
  }
}

// ─── Assignments ───────────────────────────────────────────────────────────

export async function pushAssignmentsToCloud() {
  const userId = getUserId();
  if (!userId) return;

  // Process tombstones
  try {
    const deletedIds = JSON.parse(localStorage.getItem('ucc_assignments_deleted') || '[]');
    if (deletedIds.length > 0) {
      const { error } = await supabase
        .from('user_assignments')
        .update({ deleted_at: new Date().toISOString() })
        .in('id', deletedIds);
      if (!error) localStorage.removeItem('ucc_assignments_deleted');
    }
  } catch (e) {
    console.error('[syncService] pushAssignments tombstones error:', e);
  }

  let assignments = JSON.parse(localStorage.getItem('ucc_assignments') || '[]');
  if (!assignments.length) return;

  // Deduplicate before push
  const seen = new Set();
  assignments = assignments.filter(a => {
    const key = `${a.title}-${a.course}-${a.academic_year}-${a.semester}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  localStorage.setItem('ucc_assignments', JSON.stringify(assignments));

  const rows = assignments.map(a => ({
    id: a.id,
    user_id: userId,
    title: a.title,
    notes: a.notes || a.description || '',
    course: a.course,
    due_date: a.dueDate || a.due_date,
    due_time: a.dueTime || a.due_time || null,
    status: a.status,
    priority: a.priority,
    academic_year: a.academic_year || null,
    semester: a.semester || null,
    created_at: a.createdAt || new Date().toISOString(),
    updated_at: a.updatedAt || new Date().toISOString(),
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
    .eq('user_id', userId)
    .is('deleted_at', null);

  if (error) {
    console.error('[syncService] pullAssignments error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localAssignments = data.map(row => ({
      id: row.id,
      title: row.title,
      notes: row.notes || '',
      course: row.course || '',
      dueDate: row.due_date,
      dueTime: row.due_time || '',
      priority: row.priority,
      status: row.status,
      academic_year: row.academic_year,
      semester: row.semester,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
    // Deduplicate
    const seen = new Set();
    const deduped = localAssignments.filter(a => {
      const key = `${a.title}-${a.course}-${a.academic_year}-${a.semester}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    localStorage.setItem('ucc_assignments', JSON.stringify(deduped));
  }
}

// ─── GPA Courses ───────────────────────────────────────────────────────────

export async function pushGPAToCloud() {
  const userId = getUserId();
  if (!userId) return;

  // Process tombstones
  try {
    const deletedIds = JSON.parse(localStorage.getItem('ucc_gpa_deleted') || '[]');
    if (deletedIds.length > 0) {
      const { error } = await supabase
        .from('user_gpa_courses')
        .update({ deleted_at: new Date().toISOString() })
        .in('id', deletedIds);
      if (!error) localStorage.removeItem('ucc_gpa_deleted');
    }
  } catch (e) {
    console.error('[syncService] pushGPA tombstones error:', e);
  }

  const gpaCourses = JSON.parse(localStorage.getItem('ucc_gpa') || '[]');
  if (!gpaCourses.length) return;

  // ── DUPLICATE GUARD: Query cloud for existing GPA courses ──
  let cloudGPA = [];
  try {
    const { data } = await supabase
      .from('user_gpa_courses')
      .select('id, name, academic_year, semester')
      .eq('user_id', userId)
      .is('deleted_at', null);
    cloudGPA = data || [];
  } catch (e) { /* proceed without guard */ }

  const cloudGPAMap = new Map();
  for (const row of cloudGPA) {
    const key = `${(row.name || '').trim().toLowerCase()}-${row.academic_year || ''}-${row.semester || ''}`;
    cloudGPAMap.set(key, row.id);
  }

  const rows = gpaCourses.map(c => {
    const courseName = c.course_name || c.name || '';
    const semanticKey = `${courseName.trim().toLowerCase()}-${c.academic_year || ''}-${c.semester || ''}`;
    const cloudId = cloudGPAMap.get(semanticKey);

    return {
      id: cloudId || String(c.id),  // reuse cloud ID if match found
      user_id: userId,
      name: courseName,
      grade: c.grade || 'E',
      score: parseFloat(c.score) || 0,
      grade_point: parseFloat(c.gradePoint) || 0,
      credit_hours: parseInt(c.creditHours || c.credit_hours, 10) || 3,
      is_detailed: c.isDetailed || false,
      exam_weight: parseFloat(c.examWeight) || 60,
      exam_score: c.examScore || '',
      assessments: c.assessments || [],
      academic_year: c.academic_year || null,
      semester: c.semester || null,
      updated_at: new Date().toISOString(),
    };
  });

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
    .eq('user_id', userId)
    .is('deleted_at', null);

  if (error) {
    console.error('[syncService] pullGPA error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localCourses = data.map(row => ({
      id: row.id,
      course_name: row.name,
      name: row.name,           // keep both for backward compat
      grade: row.grade,
      // ★ FIX: restore all computed grade fields so semesterStats useMemo
      //   has real values and does not produce 0.00 GPA
      score: row.score || 0,
      gradePoint: row.grade_point || 0,   // camelCase — GPACalculator reads c.gradePoint
      creditHours: row.credit_hours || 3, // camelCase — GPACalculator reads c.creditHours
      isDetailed: row.is_detailed || false,
      examWeight: row.exam_weight || 60,
      examScore: row.exam_score || '',
      assessments: row.assessments || [],
      academic_year: row.academic_year,
      semester: row.semester,
    }));
    localStorage.setItem('ucc_gpa', JSON.stringify(localCourses));
    console.log('[syncService] pullGPA OK:', localCourses.length, 'rows');
  }
}

// ─── Tasks ─────────────────────────────────────────────────────────────────

export async function pushTasksToCloud() {
  const userId = getUserId();
  if (!userId) return;

  // Process tombstones
  try {
    const deletedIds = JSON.parse(localStorage.getItem('ucc_daily_tasks_deleted') || '[]');
    if (deletedIds.length > 0) {
      const { error } = await supabase
        .from('user_tasks')
        .update({ deleted_at: new Date().toISOString() })
        .in('id', deletedIds);
      if (!error) localStorage.removeItem('ucc_daily_tasks_deleted');
    }
  } catch (e) {
    console.error('[syncService] pushTasks tombstones error:', e);
  }

  let tasks = JSON.parse(localStorage.getItem('ucc_daily_tasks') || '[]');
  if (!tasks.length) return;

  // Deduplicate before push
  const seen = new Set();
  tasks = tasks.filter(t => {
    const key = `${t.title}-${t.date}-${t.academic_year}-${t.semester}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  localStorage.setItem('ucc_daily_tasks', JSON.stringify(tasks));

  const rows = tasks.map(t => ({
    id: t.id,
    user_id: userId,
    title: t.title,
    status: t.completed ? 'COMPLETED' : 'PENDING',
    date: t.date,
    time: t.time || null,
    end_time: t.endTime || null,
    icon: t.icon || 'study',
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
    .eq('user_id', userId)
    .is('deleted_at', null);

  if (error) {
    console.error('[syncService] pullTasks error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localTasks = data.map(row => ({
      id: row.id,
      title: row.title,
      completed: row.status === 'COMPLETED' || row.status === 'completed',
      date: row.date,
      time: row.time,
      endTime: row.end_time,
      icon: row.icon || 'study',
      academic_year: row.academic_year,
      semester: row.semester,
    }));
    // Deduplicate
    const seen = new Set();
    const deduped = localTasks.filter(t => {
      const key = `${t.title}-${t.date}-${t.academic_year}-${t.semester}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    localStorage.setItem('ucc_daily_tasks', JSON.stringify(deduped));
  }
}

// ─── Budget (NO semester fields — money carries forward) ───────────────────

export async function pushBudgetToCloud() {
  const userId = getUserId();
  if (!userId) return;

  // Process tombstones
  try {
    const deletedIds = JSON.parse(localStorage.getItem('ucc_budget_deleted') || '[]');
    if (deletedIds.length > 0) {
      const { error } = await supabase
        .from('budget_transactions')
        .update({ deleted_at: new Date().toISOString() })
        .in('id', deletedIds);
      if (!error) localStorage.removeItem('ucc_budget_deleted');
    }
  } catch (e) {
    console.error('[syncService] pushBudget tombstones error:', e);
  }

  let transactions = JSON.parse(localStorage.getItem('ucc_budget') || '[]');
  if (!transactions.length) return;

  // Deduplicate before push
  const seen = new Set();
  transactions = transactions.filter(t => {
    const key = `${t.description || t.category}-${t.amount}-${t.date || new Date().toISOString().split('T')[0]}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  localStorage.setItem('ucc_budget', JSON.stringify(transactions));

  // budget_transactions table has NO academic_year/semester columns
  const rows = transactions.map(t => ({
    id: t.id,
    user_id: userId,
    type: t.type,
    amount: parseFloat(t.amount) || 0,
    category: t.category,
    description: t.description || '',
    created_at: t.date ? new Date(t.date).toISOString() : new Date().toISOString(),
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
    .eq('user_id', userId)
    .is('deleted_at', null);

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
      description: row.description || '',
      date: row.created_at ? row.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
    }));
    // Deduplicate
    const seen = new Set();
    const deduped = localTxns.filter(t => {
      const key = `${t.description || t.category}-${t.amount}-${t.date}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    localStorage.setItem('ucc_budget', JSON.stringify(deduped));
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
    // ── STEP 0: NUKE local DATA keys before restoring ──
    // Single-device model: restore = full replacement, not merge.
    // PRESERVE identity keys (device_id, user_id, linked_device) so the app
    // doesn't generate a new identity after restore.
    const IDENTITY_KEYS = new Set([
      'ucc_device_id', 'ucc_user_id', 'ucc_is_linked_device',
      'ucc_last_sync', 'ucc_last_pull_time',
      // Coach marks — user already saw the tutorials, don't reset them
      'ucc_coach_home', 'ucc_coach_map', 'ucc_coach_tools',
      'ucc_coach_community', 'ucc_coach_profile',
      // Onboarding state — don't force user through first-visit flow again
      'ucc_first_visit', 'ucc_guide_completion',
    ]);
    const keysToWipe = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('ucc_') && !IDENTITY_KEYS.has(key)) {
        keysToWipe.push(key);
      }
    }
    keysToWipe.forEach(key => localStorage.removeItem(key));
    console.log('[syncService] Wiped', keysToWipe.length, 'data keys (preserved identity keys)');

    // ── STEP 1: Restore Settings & Profile ──
    const { data: settings } = await supabase
      .from('user_settings')
      .select('*')
      .single();

    if (settings) {
      if (settings.profile && Object.keys(settings.profile).length > 0) {
        localStorage.setItem('ucc_profile', JSON.stringify(settings.profile));
      }
      if (settings.home_widgets && Object.keys(settings.home_widgets).length > 0) {
        localStorage.setItem('ucc_home_widgets', JSON.stringify(settings.home_widgets));
      }
    }

    const { data: userProfile } = await supabase.from('users').select('*').single();
    if (userProfile) {
      const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
      if (userProfile.name) profile.name = userProfile.name;
      if (userProfile.phone_number) profile.phone = userProfile.phone_number;
      if (userProfile.course) profile.course = userProfile.course;
      if (userProfile.level) profile.level = userProfile.level;
      if (userProfile.current_semester) profile.semester = userProfile.current_semester;
      localStorage.setItem('ucc_profile', JSON.stringify(profile));
    }

    // ── STEP 2: Pull everything else (clean slate, no merge conflicts) ──
    await pullTimetableFromCloud();
    await pullAssignmentsFromCloud();
    await pullGPAFromCloud();
    await pullTasksFromCloud();
    await pullBudgetFromCloud();

    // ── STEP 3: Restore Notes ──
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

// ─── Safety Guard: Prevent empty local state from overwriting cloud ───
async function getCloudCounts(userId) {
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

export async function syncToCloud({ force = false } = {}) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, error: 'User not authenticated with PIN.' };

  const userId = user.id;

  try {
    // ── SAFETY GUARD: Don't nuke cloud backup with empty local state ──
    if (!force) {
      const localTimetable = JSON.parse(localStorage.getItem('ucc_timetable') || '[]');
      const localGPA = JSON.parse(localStorage.getItem('ucc_gpa') || '[]');

      // Guard 1: Both empty → definitely a new device, abort
      if (localTimetable.length === 0 && localGPA.length === 0) {
        console.log('[syncService] ABORT: Local data is empty. Won\'t overwrite cloud backup.');
        return { success: false, error: 'Local data is empty. Restore from cloud first, or add some courses.' };
      }

      // Guard 2: Local has fewer courses than cloud → possible data loss, abort
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
export function triggerBackgroundSync({ force = false } = {}) {
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      const result = await syncToCloud({ force });
      if (!result.success && result.error) {
        // Show guard warnings to the user via toast
        const { toast } = await import('react-hot-toast');
        toast.error(`Sync blocked: ${result.error}`, { duration: 6000 });
      }
    } catch (err) {
      console.error("Background sync failed:", err);
    }
  }, 5000);
}


