import { supabase } from '../lib/supabase';
import { getUserId } from './syncHelpers';

export async function pushGPAToCloud() {
  const userId = getUserId();
  if (!userId) return;

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

  const rows = gpaCourses.filter(c => !c._deleted).map(c => {
    const courseName = c.course_name || c.name || '';
    const semanticKey = `${courseName.trim().toLowerCase()}-${c.academic_year || ''}-${c.semester || ''}`;
    const cloudId = cloudGPAMap.get(semanticKey);

    return {
      id: cloudId || String(c.id),
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
      deleted_at: null,
    };
  });

  const { data: upsertedData, error } = await supabase
    .from('user_gpa_courses')
    .upsert(rows, { onConflict: 'id' })
    .select('id, name, academic_year, semester');

  if (error) {
    console.error('[syncService] pushGPA error:', error.message);
  } else {
    console.log('[syncService] pushGPA OK:', rows.length, 'rows');
    if (upsertedData && upsertedData.length > 0) {
      const newCloudGPAMap = new Map();
      for (const row of upsertedData) {
        const key = `${(row.name || '').trim().toLowerCase()}-${row.academic_year || ''}-${row.semester || ''}`;
        newCloudGPAMap.set(key, row.id);
      }

      const currentGpaCourses = JSON.parse(localStorage.getItem('ucc_gpa') || '[]');
      let updated = false;
      const updatedLocal = currentGpaCourses.map(c => {
        const courseName = c.course_name || c.name || '';
        const semanticKey = `${courseName.trim().toLowerCase()}-${c.academic_year || ''}-${c.semester || ''}`;
        const newId = newCloudGPAMap.get(semanticKey);
        if (newId && newId !== c.id) {
          updated = true;
          return { ...c, id: newId };
        }
        return c;
      });
      if (updated) {
        localStorage.setItem('ucc_gpa', JSON.stringify(updatedLocal));
      }
    }
  }
}

export async function pullGPAFromCloud() {
  const userId = getUserId();
  if (!userId) return;

  const { data, error } = await supabase
    .from('user_gpa_courses')
    .select('id, name, grade, score, grade_point, credit_hours, is_detailed, exam_weight, exam_score, assessments, academic_year, semester')
    .eq('user_id', userId)
    .is('deleted_at', null);

  if (error) {
    console.error('[syncService] pullGPA error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const cloudCourses = data.map(row => ({
      id: row.id,
      course_name: row.name,
      name: row.name,
      grade: row.grade,
      score: row.score || 0,
      gradePoint: row.grade_point || 0,
      creditHours: row.credit_hours || 3,
      isDetailed: row.is_detailed || false,
      examWeight: row.exam_weight || 60,
      examScore: row.exam_score || '',
      assessments: row.assessments || [],
      academic_year: row.academic_year,
      semester: row.semester,
    }));

    let existingLocal = [];
    try { existingLocal = JSON.parse(localStorage.getItem('ucc_gpa') || '[]'); } catch (e) { /* use empty */ }

    const semKey = (c) => `${(c.course_name || c.name || '').trim().toLowerCase()}-${c.academic_year || ''}-${c.semester || ''}`;
    const localByKey = new Map();
    const localById = new Map();
    for (const c of existingLocal) {
      localByKey.set(semKey(c), c);
      if (c.id != null) localById.set(String(c.id), c);
    }

    const merged = [];
    const consumed = new Set();
    for (const cloud of cloudCourses) {
      const key = semKey(cloud);
      consumed.add(key);
      if (cloud.id != null) consumed.add(String(cloud.id));
      const localMatch = localByKey.get(key) || (cloud.id != null ? localById.get(String(cloud.id)) : undefined);
      merged.push(localMatch && localMatch._deleted ? localMatch : cloud);
    }
    for (const c of existingLocal) {
      const key = semKey(c);
      if (!consumed.has(key) && !(c.id != null && consumed.has(String(c.id)))) merged.push(c);
    }

    localStorage.setItem('ucc_gpa', JSON.stringify(merged));
    console.log('[syncService] pullGPA OK (merged):', merged.length, 'rows');
  }
}
