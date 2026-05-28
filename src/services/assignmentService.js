import { supabase } from '../lib/supabase';
import { useLocalStorage } from '../hooks/useLocalStorage';

// ── Local-first assignment service ─────────────────────────────────────────
// Assignments are stored in localStorage for instant access and synced to
// Supabase when a user is authenticated. This mirrors the pattern used by
// user_tasks and user_timetable across the app.

const LS_KEY = 'ucc_assignments';

// ── Same-tab reactivity ───────────────────────────────────────────────────
// The browser 'storage' event only fires for cross-tab changes.
// We dispatch a custom event so components in the same tab (e.g. Home page)
// can react instantly when assignments change on the Assignments page.
const ASSIGNMENTS_CHANGED_EVENT = 'ucc-assignments-changed';

const notifyAssignmentsChanged = () => {
  try {
    window.dispatchEvent(new CustomEvent(ASSIGNMENTS_CHANGED_EVENT));
  } catch (e) {
    // Silently fail — older browsers or SSR
  }
};

/**
 * Subscribe to assignment changes (same-tab).
 * Returns an unsubscribe function.
 *
 * Usage:
 *   useEffect(() => {
 *     const unsub = onAssignmentsChanged(() => setHomeAssignments(getAssignments()));
 *     return unsub;
 *   }, []);
 */
export const onAssignmentsChanged = (callback) => {
  window.addEventListener(ASSIGNMENTS_CHANGED_EVENT, callback);
  return () => window.removeEventListener(ASSIGNMENTS_CHANGED_EVENT, callback);
};

/**
 * Get all assignments from localStorage
 */
export const getAssignments = () => {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

/**
 * Save all assignments to localStorage
 */
export const saveAssignments = (assignments) => {
  localStorage.setItem(LS_KEY, JSON.stringify(assignments));
  notifyAssignmentsChanged();
};

/**
 * Add a new assignment
 */
export const addAssignment = (assignment) => {
  const assignments = getAssignments();
  const newAssignment = {
    id: Date.now().toString(),
    title: assignment.title || 'Untitled Assignment',
    course: assignment.course || '',
    dueDate: assignment.dueDate || new Date().toISOString().split('T')[0],
    dueTime: assignment.dueTime || '',
    priority: assignment.priority || 'medium',
    status: assignment.status || 'pending',
    notes: assignment.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  assignments.push(newAssignment);
  saveAssignments(assignments);
  return newAssignment;
};

/**
 * Update an existing assignment
 */
export const updateAssignment = (id, updates) => {
  const assignments = getAssignments();
  const index = assignments.findIndex(a => a.id === id);
  if (index === -1) return null;
  assignments[index] = {
    ...assignments[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveAssignments(assignments);
  return assignments[index];
};

/**
 * Delete an assignment
 */
export const deleteAssignment = (id) => {
  const assignments = getAssignments().filter(a => a.id !== id);
  saveAssignments(assignments);
  return true;
};

/**
 * Mark assignment status
 */
export const markAssignmentStatus = (id, status) => {
  return updateAssignment(id, { status });
};

/**
 * Get assignments grouped by urgency
 * Returns: { overdue: [], today: [], thisWeek: [], later: [] }
 */
export const getAssignmentsByUrgency = (assignments) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayStr = now.toISOString().split('T')[0];
  const weekEnd = new Date(now);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const weekEndStr = weekEnd.toISOString().split('T')[0];

  const pending = assignments.filter(a => a.status === 'pending');

  return {
    overdue: pending.filter(a => a.dueDate < todayStr).sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    today: pending.filter(a => a.dueDate === todayStr).sort((a, b) => (a.dueTime || '').localeCompare(b.dueTime || '')),
    thisWeek: pending.filter(a => a.dueDate > todayStr && a.dueDate <= weekEndStr).sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    later: pending.filter(a => a.dueDate > weekEndStr).sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
  };
};

/**
 * Get unique courses from assignments (for filter dropdown)
 */
export const getUniqueCourses = (assignments) => {
  const courses = new Set(assignments.map(a => a.course).filter(Boolean));
  return Array.from(courses).sort();
};

/**
 * Get assignment counts by status
 */
export const getAssignmentCounts = (assignments) => {
  return {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    late: assignments.filter(a => a.status === 'late').length,
    missed: assignments.filter(a => a.status === 'missed').length,
  };
};

/**
 * Get assignments for a specific date (for calendar view)
 */
export const getAssignmentsForDate = (assignments, dateStr) => {
  return assignments.filter(a => a.dueDate === dateStr).sort((a, b) => (a.dueTime || '').localeCompare(b.dueTime || ''));
};

/**
 * Get assignments for a month (for calendar view)
 * Returns a map of dateStr -> assignments[]
 */
export const getAssignmentsForMonth = (assignments, year, month) => {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const map = {};
  assignments
    .filter(a => a.dueDate.startsWith(prefix))
    .forEach(a => {
      if (!map[a.dueDate]) map[a.dueDate] = [];
      map[a.dueDate].push(a);
    });
  return map;
};

// ── Supabase sync (push on save, pull on login) ────────────────────────────

/**
 * Push local assignments to Supabase for the given user
 */
export const syncAssignmentsToCloud = async (userId) => {
  if (!userId) return { success: false, error: 'No user ID' };

  try {
    const localAssignments = getAssignments();

    // Upsert: insert new, update existing
    const rows = localAssignments.map(a => ({
      id: a.id,
      user_id: userId,
      title: a.title,
      course: a.course,
      due_date: a.dueDate,
      due_time: a.dueTime || null,
      priority: a.priority,
      status: a.status,
      notes: a.notes || null,
      created_at: a.createdAt,
      updated_at: a.updatedAt || a.createdAt,
    }));

    if (rows.length === 0) return { success: true };

    const { error } = await supabase
      .from('user_assignments')
      .upsert(rows, { onConflict: 'id' });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to sync assignments to cloud:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Pull assignments from Supabase and merge with local
 * Cloud wins on conflict (server-authoritative)
 */
export const pullAssignmentsFromCloud = async (userId) => {
  if (!userId) return { success: false, error: 'No user ID' };

  try {
    const { data, error } = await supabase
      .from('user_assignments')
      .select('*')
      .eq('user_id', userId)
      .order('due_date', { ascending: true });

    if (error) throw error;

    // Transform Supabase rows to local format
    const cloudAssignments = (data || []).map(row => ({
      id: row.id,
      title: row.title,
      course: row.course || '',
      dueDate: row.due_date,
      dueTime: row.due_time || '',
      priority: row.priority,
      status: row.status,
      notes: row.notes || '',
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    // Merge: cloud assignments replace local ones with same ID,
    // local-only assignments are kept
    const localAssignments = getAssignments();
    const cloudIds = new Set(cloudAssignments.map(a => a.id));
    const localOnly = localAssignments.filter(a => !cloudIds.has(a.id));
    const merged = [...cloudAssignments, ...localOnly];

    saveAssignments(merged);
    return { success: true, count: cloudAssignments.length };
  } catch (err) {
    console.error('Failed to pull assignments from cloud:', err);
    return { success: false, error: err.message };
  }
};
