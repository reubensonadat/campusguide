import { supabase } from '../lib/supabase';
import { getUserId } from './syncHelpers';

export async function pushAssignmentsToCloud() {
  const userId = getUserId();
  if (!userId) return;

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
    deleted_at: null,
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
    .select('id, title, notes, course, due_date, due_time, priority, status, academic_year, semester, created_at, updated_at')
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
