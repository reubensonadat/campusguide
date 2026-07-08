import { useEffect } from 'react';

export function useTimetableGpaSync(setCourses, level, semester) {
  useEffect(() => {
    const timetableStr = localStorage.getItem('ucc_timetable');
    if (!timetableStr) return;
    try {
      const timetableCourses = JSON.parse(timetableStr);
      if (!Array.isArray(timetableCourses) || timetableCourses.length === 0) return;

      const defaultYear = level || '100';
      const defaultSem = semester || '1';

      const uniqueTtMap = new Map();
      for (const session of timetableCourses) {
        const key = `${(session.name || '').trim().toLowerCase()}_${session.academic_year || defaultYear}_${session.semester || defaultSem}`;
        if (!uniqueTtMap.has(key)) uniqueTtMap.set(key, session);
      }
      const uniqueTtCourses = Array.from(uniqueTtMap.values());

      let currentGpaCourses = [];
      try {
        const raw = localStorage.getItem('ucc_gpa');
        currentGpaCourses = raw ? JSON.parse(raw) : [];
      } catch { /* use empty */ }

      const mergedMap = new Map();
      for (const c of currentGpaCourses) mergedMap.set(c.id, c);

      for (const ttCourse of uniqueTtCourses) {
        if (!ttCourse.name) continue;
        const ttNameKey = `${ttCourse.name.trim().toLowerCase()}-${ttCourse.academic_year || defaultYear}-${ttCourse.semester || defaultSem}`;
        let existing = currentGpaCourses.find(c => {
          const cNameKey = `${(c.name || '').trim().toLowerCase()}-${c.academic_year || defaultYear}-${c.semester || defaultSem}`;
          return cNameKey === ttNameKey;
        });
        if (existing) { mergedMap.set(existing.id, existing); }
        else {
          const wasDeleted = currentGpaCourses.some(c => {
            const cNameKey = `${(c.name || '').trim().toLowerCase()}-${c.academic_year || defaultYear}-${c.semester || defaultSem}`;
            return cNameKey === ttNameKey && c._deleted;
          });
          if (wasDeleted) continue;
          mergedMap.set(ttCourse.id || Date.now() + Math.random(), {
            id: ttCourse.id || Date.now() + Math.random(),
            name: ttCourse.name,
            creditHours: ttCourse.creditHours || 3,
            score: '', grade: 'E', gradePoint: 0.0,
            academic_year: ttCourse.academic_year || defaultYear,
            semester: ttCourse.semester || defaultSem,
            isDetailed: false, examWeight: 60, examScore: '',
            assessments: [{ id: Date.now(), name: 'Quiz 1', score: '', max: 20 }, { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }]
          });
        }
      }

      const mergedCourses = Array.from(mergedMap.values());
      if (JSON.stringify(mergedCourses) !== JSON.stringify(currentGpaCourses)) setCourses(mergedCourses);
    } catch (e) { console.error('Error auto-syncing timetable to GPA:', e); }
  }, [setCourses, level, semester]);
}
