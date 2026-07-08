import { supabase } from '../lib/supabase';
import { getUserId } from './syncHelpers';

export async function pushTimetableToCloud() {
  const userId = getUserId();
  if (!userId) return;

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

  const seen = new Set();
  const courses = rawCourses.filter(c => {
    const key = `${c.name}-${c.day}-${c.academic_year}-${c.semester}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  let cloudExisting = [];
  try {
    const { data } = await supabase
      .from('user_timetable')
      .select('id, name, day, start_time, end_time, academic_year, semester')
      .eq('user_id', userId)
      .is('deleted_at', null);
    cloudExisting = data || [];
  } catch (e) { /* proceed without guard */ }

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
        id: cloudId || String(c.id),
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
        deleted_at: null,
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
    .select('id, name, day, start_time, end_time, location, color, lecturer, contact, target_grade, credit_hours, academic_year, semester')
    .eq('user_id', userId)
    .is('deleted_at', null);

  if (error) {
    console.error('[syncService] pullTimetable error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const localCourses = data.map(row => ({
      id: row.id,
      name: row.name,
      day: row.day,
      startTime: row.start_time,
      endTime: row.end_time,
      location: row.location,
      color: row.color,
      lecturer: row.lecturer,
      contact: row.contact,
      targetGrade: row.target_grade,
      creditHours: row.credit_hours,
      academic_year: row.academic_year,
      semester: row.semester,
    }));

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
