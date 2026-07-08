import { supabase } from '../lib/supabase';
import { getUserId } from './syncHelpers';

export async function pushTasksToCloud() {
  const userId = getUserId();
  if (!userId) return;

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
    deleted_at: null,
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
    .select('id, title, status, date, time, end_time, icon, academic_year, semester')
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
