import React, { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import useProfile from '../../hooks/useProfile';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { ChevronLeft, ChevronRight, Calculator, Info } from 'lucide-react';
import { GRADE_POINTS, GRADE_RANGES } from '../../utils/constants';
import { getGradeFromScore } from '../../utils/helpers';
import { triggerAuthSheet } from '../onboarding/AuthModal';
import { toast } from 'react-hot-toast';
import GPATrendGraph from './GPATrendGraph';
import GraduationTargetSolver from './GraduationTargetSolver';
import GpaVaultLock from './GpaVaultLock';
import SemesterForecaster from './SemesterForecaster';
import CourseGradeForm from './CourseGradeForm';
import CourseCardList from './CourseCardList';
import { useTimetableGpaSync } from './useTimetableGpaSync';

const TERMS = ['100_1','100_2','200_1','200_2','300_1','300_2','400_1','400_2','500_1','500_2','600_1','600_2'];

const getGradeColor = (grade) => {
  if (grade === 'A') return 'text-green-600 bg-green-50';
  if (['B+', 'B'].includes(grade)) return 'text-blue-600 bg-blue-50';
  if (['C+', 'C'].includes(grade)) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const GPACalculator = () => {
  const [profile, setProfile] = useProfile();
  const [courses, setCourses] = useLocalStorage('ucc_gpa', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isGpaLocked] = useLocalStorage('ucc_gpa_vault_locked', false);
  const [gpaPin] = useLocalStorage('ucc_gpa_vault_pin', '');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const activeTerm = `${profile?.level || '100'}_${profile?.semester || '1'}`;
  const activeTermIndex = TERMS.indexOf(activeTerm) >= 0 ? TERMS.indexOf(activeTerm) : 0;
  const [activeLevel, activeSemester] = activeTerm.split('_');

  const [newCourse, setNewCourse] = useState({
    name: '', creditHours: 3, score: '', isDetailed: false, examWeight: 60, examScore: '',
    assessments: [{ id: Date.now(), name: 'Quiz 1', score: '', max: 20 }, { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }],
    academic_year: activeLevel, semester: activeSemester
  });

  const displayCourses = useMemo(() => courses.filter(c => `${c.academic_year}_${c.semester}` === activeTerm && !c._deleted), [courses, activeTerm]);

  const semesterStats = useMemo(() => {
    let credits = 0, points = 0;
    displayCourses.forEach(c => {
      const isUngraded = (c.score === '' || c.score == null) || ((c.score === 0 || c.score === '0') && (parseFloat(c.gradePoint) || 0) === 0);
      if (isUngraded) return;
      const ch = parseFloat(c.creditHours) || 3;
      credits += ch; points += (parseFloat(c.gradePoint) || 0) * ch;
    });
    return { gpa: credits > 0 ? (points / credits).toFixed(2) : '0.00', credits, points };
  }, [displayCourses]);

  useEffect(() => {
    const needsBackfill = courses.some(c => !c.academic_year || !c.semester);
    if (needsBackfill) setCourses(courses.map(c => ({ ...c, academic_year: c.academic_year || profile?.level || '100', semester: c.semester || profile?.semester || '1' })));
  }, []);

  useEffect(() => {
    const seen = new Map();
    const deduped = [];
    for (const c of courses) {
      const key = `${(c.name || '').trim().toLowerCase()}_${c.academic_year}_${c.semester}`;
      if (seen.has(key)) {
        const existingIdx = seen.get(key);
        if ((parseFloat(c.score) || 0) > (parseFloat(deduped[existingIdx].score) || 0)) deduped[existingIdx] = { ...c, id: existing.id };
      } else { seen.set(key, deduped.length); deduped.push(c); }
    }
    if (deduped.length !== courses.length) setCourses(deduped);
  }, []);

  useTimetableGpaSync(setCourses, profile?.level, profile?.semester);

  const showLockScreen = isGpaLocked && gpaPin && !isUnlocked;

  const handleAddCourse = () => {
    triggerAuthSheet(() => {
      let finalScore = 0;
      if (newCourse.isDetailed) {
        const examW = parseFloat(newCourse.examWeight) || 60;
        const caW = 100 - examW;
        let tCAScore = 0, tCAMax = 0;
        newCourse.assessments.forEach(a => { tCAScore += (parseFloat(a.score) || 0); tCAMax += (parseFloat(a.max) || 0); });
        finalScore = (tCAMax > 0 ? (tCAScore / tCAMax) * caW : tCAScore) + (parseFloat(newCourse.examScore) || 0);
      } else finalScore = parseFloat(newCourse.score) || 0;

      if (newCourse.name && finalScore >= 0) {
        const score = Math.min(100, Math.max(0, finalScore));
        const grade = getGradeFromScore(score);
        const gradePoint = GRADE_POINTS[grade];
        const courseObject = { ...newCourse, id: newCourse.id || Date.now(), score, grade, gradePoint, academic_year: activeLevel, semester: activeSemester };

        if (courses.some(c => c.id === courseObject.id)) setCourses(courses.map(c => c.id === courseObject.id ? courseObject : c));
        else {
          const existing = courses.find(c => c.name.trim().toLowerCase() === courseObject.name.trim().toLowerCase() && c.semester === courseObject.semester && c.academic_year === courseObject.academic_year);
          if (existing) setCourses(courses.map(c => c.id === existing.id ? { ...courseObject, id: existing.id } : c));
          else setCourses([...courses, courseObject]);
        }
        setNewCourse({ name: '', creditHours: 3, score: '', isDetailed: false, examWeight: 60, examScore: '', assessments: [{ id: Date.now(), name: 'Quiz 1', score: '', max: 20 }, { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }], academic_year: activeLevel, semester: activeSemester });
        setShowAddForm(false);
      }
    });
  };

  const handleDeleteCourse = (id) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, _deleted: true } : c));
    try {
      const deleted = JSON.parse(localStorage.getItem('ucc_gpa_deleted') || '[]');
      if (!deleted.includes(id)) { deleted.push(id); localStorage.setItem('ucc_gpa_deleted', JSON.stringify(deleted)); }
    } catch {}
  };

  return (
    <div className="relative pb-20 overflow-x-hidden">
      <GpaVaultLock isGpaLocked={isGpaLocked} gpaPin={gpaPin} isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
      <div className={showLockScreen ? "filter blur-md pointer-events-none select-none" : ""}>
        <div className="flex items-center justify-center mb-6 bg-white rounded-2xl p-2 max-w-sm mx-auto shadow-sm border border-gray-100">
          <button onClick={() => { const i = Math.max(0, activeTermIndex - 1); const t = TERMS[i]; if (t) setProfile(p => ({ ...p, level: t.split('_')[0], semester: t.split('_')[1] })); }} disabled={activeTermIndex === 0} className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 disabled:opacity-30"><ChevronLeft size={20} /></button>
          <div className="flex-1 text-center">
            <span className="text-sm font-black text-gray-900">Level {activeLevel}</span>
            <span className="text-[10px] font-bold text-gray-900/60 uppercase tracking-widest block">Semester {activeSemester}</span>
          </div>
          <button onClick={() => { const i = Math.min(TERMS.length - 1, activeTermIndex + 1); const t = TERMS[i]; if (t) setProfile(p => ({ ...p, level: t.split('_')[0], semester: t.split('_')[1] })); }} disabled={activeTermIndex === TERMS.length - 1} className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 disabled:opacity-30"><ChevronRight size={20} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="border-primary-100 bg-gray-900/5">
            <CardContent className="pt-6"><div className="text-center"><p className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-2">Semester GPA</p><p className="text-5xl font-black text-primary-600 mb-2">{semesterStats.gpa}</p><div className="text-xs font-medium text-primary-400">{semesterStats.credits} credits this term</div></div></CardContent>
          </Card>
          <Card><CardContent className="pt-6"><div className="text-center"><p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">This Term</p><p className="text-4xl font-black text-gray-800 mb-2">{semesterStats.points.toFixed(1)}</p><div className="text-xs font-medium text-gray-400">weighted points this term</div></div></CardContent></Card>
        </div>

        <GPATrendGraph courses={courses} />
        <GraduationTargetSolver currentLevel={activeLevel} currentSemester={activeSemester} />
        <SemesterForecaster displayCourses={displayCourses} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <CardTitle className="text-primary-900 text-lg flex items-center gap-2"><Calculator className="w-5 h-5 text-primary-500" /> Course List</CardTitle>
                  <button onClick={() => { setNewCourse({ ...newCourse, name: '', score: '', isDetailed: false, examWeight: 60, examScore: '', assessments: [{ id: Date.now(), name: 'Quiz 1', score: '', max: 20 }, { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }] }); setShowAddForm(true); }}
                    className="text-xs font-bold px-3 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors">+ Add Grade</button>
                </div>
              </CardHeader>
              <CardContent>
                <CourseGradeForm showAddForm={showAddForm} setShowAddForm={setShowAddForm} newCourse={newCourse} setNewCourse={setNewCourse} handleAddCourse={handleAddCourse} />
                <CourseCardList displayCourses={displayCourses} onEdit={(c) => { setNewCourse({ ...c, isDetailed: c.isDetailed || false, examWeight: c.examWeight || 60, examScore: c.examScore || '', assessments: c.assessments || [{ id: Date.now(), name: 'Quiz 1', score: '', max: 20 }, { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }] }); setShowAddForm(true); }}
                  onDelete={handleDeleteCourse} emptyMessage="Add courses to your Timetable first. They will automatically appear here for GPA tracking." />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gray-50 border-gray-100">
              <CardHeader><CardTitle className="text-base text-gray-900 flex items-center gap-2"><Info className="w-4 h-4 text-gray-400" /> Grading Scale</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {Object.entries(GRADE_RANGES).map(([grade, range]) => (
                    <div key={grade} className="flex justify-between items-center p-2 border-b border-gray-200 last:border-0">
                      <div className="flex items-center gap-3"><span className={`font-bold w-8 ${getGradeColor(grade).split(' ')[0]}`}>{grade}</span><span className="text-gray-505 font-medium text-xs">{range.min}-{range.max}%</span></div>
                      <span className="font-mono text-gray-400 font-bold">{GRADE_POINTS[grade]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
