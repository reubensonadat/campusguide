import React, { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import useProfile from '../../hooks/useProfile';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Modal } from '../common/Modal';
import { Plus, Trash2, Calculator, Info, Target, ArrowRight, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { GRADE_POINTS, GRADE_RANGES } from '../../utils/constants';
import { getGradeFromScore } from '../../utils/helpers';
import { triggerAuthSheet } from '../onboarding/AuthModal';
import { toast } from 'react-hot-toast';

const TERMS = [
  '100_1', '100_2', '200_1', '200_2', '300_1', '300_2',
  '400_1', '400_2', '500_1', '500_2', '600_1', '600_2'
];

const GPACalculator = () => {
  const [profile, setProfile] = useProfile();
  const [courses, setCourses] = useLocalStorage('ucc_gpa', []);
  const [showAddForm, setShowAddForm] = useState(false);

  // GPA Vault Lock States
  const [isGpaLocked] = useLocalStorage('ucc_gpa_vault_locked', false);
  const [gpaPin] = useLocalStorage('ucc_gpa_vault_pin', '');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockPinInput, setUnlockPinInput] = useState('');

  const handlePinChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 6) {
      setUnlockPinInput(val);
      if (val.length === 6) {
        if (val === gpaPin) {
          setIsUnlocked(true);
          setUnlockPinInput('');
          toast.success('GPA Vault Unlocked!');
        } else {
          toast.error('Incorrect PIN. Access Denied.');
          setUnlockPinInput('');
        }
      }
    }
  };

  // ─── DERIVE active term from profile (SOURCE OF TRUTH) ───
  const activeTerm = `${profile?.level || '100'}_${profile?.semester || '1'}`;
  const activeTermIndex = TERMS.indexOf(activeTerm) >= 0 ? TERMS.indexOf(activeTerm) : 0;
  const [activeLevel, activeSemester] = activeTerm.split('_');

  const [newCourse, setNewCourse] = useState({
    name: '',
    creditHours: 3,
    score: '',
    isDetailed: false,
    examWeight: 60,
    examScore: '',
    assessments: [
      { id: Date.now(), name: 'Quiz 1', score: '', max: 20 },
      { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }
    ],
    academic_year: activeLevel,
    semester: activeSemester
  });

  // Target GPA Solver State
  const [targetGPA, setTargetGPA] = useState('');
  const [remainingCredits, setRemainingCredits] = useState('');
  const [targetResult, setTargetResult] = useState(null);

  // Semester Forecaster states
  const [coursePrefs, setCoursePrefs] = useState({});
  const [shuffleTrigger, setShuffleTrigger] = useState(0);

  const simulateSemesterTarget = () => {
    const target = parseFloat(targetGPA);
    if (isNaN(target) || target < 0 || target > 4.0) {
      setTargetResult({ error: 'Please enter a valid target GPA between 0.0 and 4.0.' });
      return;
    }
    if (displayCourses.length === 0) {
      setTargetResult({ error: 'Please add some courses to this semester first.' });
      return;
    }

    const totalCredits = displayCourses.reduce((sum, c) => sum + (parseFloat(c.creditHours) || 3), 0);

    const gradeOptions = [
      { grade: 'A', gp: 4.0 },
      { grade: 'B+', gp: 3.5 },
      { grade: 'B', gp: 3.0 },
      { grade: 'C+', gp: 2.5 },
      { grade: 'C', gp: 2.0 },
      { grade: 'D+', gp: 1.5 },
      { grade: 'D', gp: 1.0 },
      { grade: 'E', gp: 0.0 }
    ];

    const validCombinations = [];
    const maxAttempts = 5000;

    for (let i = 0; i < maxAttempts; i++) {
      const combination = [];
      let totalPoints = 0;

      displayCourses.forEach(course => {
        const pref = coursePrefs[course.id] || 'medium';
        const ch = parseFloat(course.creditHours) || 3;

        let choices = [...gradeOptions];
        if (pref === 'high') {
          choices = Math.random() < 0.8
            ? gradeOptions.filter(g => g.gp >= 3.0)
            : gradeOptions;
        } else if (pref === 'low') {
          choices = Math.random() < 0.8
            ? gradeOptions.filter(g => g.gp <= 2.5 && g.gp >= 1.0)
            : gradeOptions;
        } else {
          choices = Math.random() < 0.7
            ? gradeOptions.filter(g => g.gp >= 2.0 && g.gp <= 3.5)
            : gradeOptions;
        }

        if (choices.length === 0) choices = gradeOptions;

        const chosen = choices[Math.floor(Math.random() * choices.length)];
        combination.push({
          ...course,
          suggestedGrade: chosen.grade,
          gp: chosen.gp
        });
        totalPoints += chosen.gp * ch;
      });

      const calculatedGpa = totalPoints / totalCredits;
      if (calculatedGpa >= target && calculatedGpa <= target + 0.3) {
        validCombinations.push({
          courses: combination,
          gpa: calculatedGpa
        });
      }

      if (validCombinations.length >= 30) break;
    }

    if (validCombinations.length === 0) {
      let maxPossiblePoints = 0;
      displayCourses.forEach(course => {
        maxPossiblePoints += 4.0 * (parseFloat(course.creditHours) || 3);
      });
      const maxPossibleGpa = maxPossiblePoints / totalCredits;

      if (target > maxPossibleGpa) {
        setTargetResult({
          error: `Target GPA of ${target.toFixed(2)} is mathematically impossible. The maximum GPA you can get is ${maxPossibleGpa.toFixed(2)} (straight A's).`
        });
        return;
      }

      for (let i = 0; i < maxAttempts; i++) {
        const combination = [];
        let totalPoints = 0;
        displayCourses.forEach(course => {
          const ch = parseFloat(course.creditHours) || 3;
          const chosen = gradeOptions[Math.floor(Math.random() * gradeOptions.length)];
          combination.push({
            ...course,
            suggestedGrade: chosen.grade,
            gp: chosen.gp
          });
          totalPoints += chosen.gp * ch;
        });
        const calculatedGpa = totalPoints / totalCredits;
        if (calculatedGpa >= target) {
          validCombinations.push({
            courses: combination,
            gpa: calculatedGpa
          });
        }
        if (validCombinations.length >= 10) break;
      }
    }

    if (validCombinations.length === 0) {
      setTargetResult({ error: `Could not find a valid combination. Try lowering your target GPA or adjusting your confidence levels.` });
      return;
    }

    const selected = validCombinations[Math.floor(Math.random() * validCombinations.length)];

    const highCount = displayCourses.filter(c => coursePrefs[c.id] === 'high').length;
    const lowCount = displayCourses.filter(c => coursePrefs[c.id] === 'low').length;

    let studyPlan = "Prioritize the courses you marked as 'Aim for A' to maximize your GPA points. Ensure you keep up with weekly assignments and quizzes for these subjects.";
    if (highCount > lowCount) {
      studyPlan = "Since you have high confidence in most courses, focus on maintaining consistent grades. Form study groups and practice past questions to lock in those A's.";
    } else if (lowCount > 0) {
      studyPlan = "For courses where you expect lower scores, aim to secure all continuous assessment (CA) marks (quizzes, assignments) to create a safety net for the final exams.";
    }

    setTargetResult({
      success: true,
      scenario: `Target of ${target.toFixed(2)} met with a simulated GPA of ${selected.gpa.toFixed(2)}!`,
      simulatedCourses: selected.courses,
      studyPlan: studyPlan
    });
  };

  useEffect(() => {
    if (targetGPA && targetResult && !targetResult.error) {
      simulateSemesterTarget();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffleTrigger]);

  // ─── TOGGLE: Write to profile ───
  const setActiveTermIndex = (newIndex) => {
    const term = TERMS[newIndex];
    if (!term) return;
    const [level, semester] = term.split('_');
    setProfile(prev => ({ ...prev, level, semester }));
  };

  // ─── BACKFILL: Patch existing GPA courses that lack academic_year/semester ───
  useEffect(() => {
    const needsBackfill = courses.some(c => !c.academic_year || !c.semester);
    if (!needsBackfill) return;

    const defaultYear = profile?.level || '100';
    const defaultSem = profile?.semester || '1';

    const patched = courses.map(c => ({
      ...c,
      academic_year: c.academic_year || defaultYear,
      semester: c.semester || defaultSem,
    }));

    setCourses(patched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // ─── ONE-TIME DEDUP: Collapse duplicate GPA entries (name + year + semester) ───
  useEffect(() => {
    const seen = new Map();
    const deduped = [];
    for (const c of courses) {
      const key = `${(c.name || '').trim().toLowerCase()}_${c.academic_year}_${c.semester}`;
      if (seen.has(key)) {
        // Keep the entry with the higher score (more complete data)
        const existingIdx = seen.get(key);
        const existing = deduped[existingIdx];
        if ((parseFloat(c.score) || 0) > (parseFloat(existing.score) || 0)) {
          deduped[existingIdx] = { ...c, id: existing.id }; // preserve original id
        }
      } else {
        seen.set(key, deduped.length);
        deduped.push(c);
      }
    }
    if (deduped.length !== courses.length) {
      setCourses(deduped);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // ─── AUTO-MERGE TIMETABLE COURSES ───
  // Reads timetable from localStorage directly (not from React state) to avoid
  // feedback loops. Deduplicates timetable sessions by (name, year, semester) so
  // that a course with Mon/Wed/Fri lectures produces exactly ONE GPA entry.
  useEffect(() => {
    const timetableStr = localStorage.getItem('ucc_timetable');
    if (!timetableStr) return;
    try {
      const timetableCourses = JSON.parse(timetableStr);
      if (!Array.isArray(timetableCourses) || timetableCourses.length === 0) return;

      const defaultYear = profile?.level || '100';
      const defaultSem = profile?.semester || '1';

      // ── Step 1: Deduplicate timetable SESSIONS into unique COURSES ──
      const uniqueTtMap = new Map();
      for (const session of timetableCourses) {
        const key = `${(session.name || '').trim().toLowerCase()}_${session.academic_year || defaultYear}_${session.semester || defaultSem}`;
        if (!uniqueTtMap.has(key)) {
          uniqueTtMap.set(key, session); // first session wins — they share name/credits
        }
      }
      const uniqueTtCourses = Array.from(uniqueTtMap.values());

      // ── Step 2: Read current GPA courses from localStorage (avoid stale closure) ──
      let currentGpaCourses = [];
      try {
        const raw = localStorage.getItem('ucc_gpa');
        currentGpaCourses = raw ? JSON.parse(raw) : [];
      } catch { /* use empty */ }

      // ── Step 3: Merge — keep existing GPA entries, add new timetable courses ──
      const mergedMap = new Map();
      for (const c of currentGpaCourses) {
        mergedMap.set(c.id, c);
      }

      for (const ttCourse of uniqueTtCourses) {
        const ttYear = ttCourse.academic_year || defaultYear;
        const ttSem = ttCourse.semester || defaultSem;
        const ttNameKey = `${(ttCourse.name || '').trim().toLowerCase()}_${ttYear}_${ttSem}`;

        // Check if a GPA course already exists for this (name, year, semester)
        let existing = currentGpaCourses.find(c =>
          c.id === ttCourse.id ||
          `${(c.name || '').trim().toLowerCase()}_${c.academic_year}_${c.semester}` === ttNameKey
        );

        if (existing) {
          // Already tracked — preserve the GPA entry (user may have edited scores)
          mergedMap.set(existing.id, existing);
        } else {
          // New timetable course — create a GPA stub
          const newEntry = {
            id: ttCourse.id || Date.now() + Math.random(),
            name: ttCourse.name,
            creditHours: ttCourse.creditHours || ttCourse.credit_hours || 3,
            score: ttCourse.targetGrade && GRADE_RANGES[ttCourse.targetGrade] ? GRADE_RANGES[ttCourse.targetGrade].min : 0,
            grade: ttCourse.targetGrade || 'E',
            gradePoint: ttCourse.targetGrade && GRADE_POINTS[ttCourse.targetGrade] ? GRADE_POINTS[ttCourse.targetGrade] : 0,
            isDetailed: false,
            examWeight: 60,
            examScore: '',
            assessments: [
              { id: Date.now() + Math.random(), name: 'Quiz 1', score: '', max: 20 },
              { id: Date.now() + Math.random() + 1, name: 'Assignment 1', score: '', max: 20 }
            ],
            academic_year: ttYear,
            semester: ttSem
          };
          mergedMap.set(newEntry.id, newEntry);
        }
      }

      const mergedCourses = Array.from(mergedMap.values());

      // Only write if something actually changed
      if (JSON.stringify(mergedCourses) !== JSON.stringify(currentGpaCourses)) {
        setCourses(mergedCourses);
      }
    } catch (e) {
      console.error('Error auto-syncing timetable to GPA:', e);
    }
  }, [setCourses, profile?.level, profile?.semester]); // NO `courses` — reads from localStorage directly

  // ─── FILTER: Show only GPA courses for the active term ───
  const displayCourses = useMemo(() => {
    return courses.filter(c => {
      const cTerm = `${c.academic_year}_${c.semester}`;
      return cTerm === activeTerm;
    });
  }, [courses, activeTerm]);

  // ─── CALCULATE STATS ───
  const semesterStats = useMemo(() => {
    let credits = 0;
    let points = 0;
    displayCourses.forEach(c => {
      const ch = parseFloat(c.creditHours) || 3;
      credits += ch;
      points += (parseFloat(c.gradePoint) || 0) * ch;
    });
    return {
      gpa: credits > 0 ? (points / credits).toFixed(2) : '0.00',
      credits,
      points
    };
  }, [displayCourses]);

  const cumulativeStats = useMemo(() => {
    let credits = 0;
    let points = 0;
    courses.forEach(c => {
      const ch = parseFloat(c.creditHours) || 3;
      credits += ch;
      points += (parseFloat(c.gradePoint) || 0) * ch;
    });
    return {
      gpa: credits > 0 ? (points / credits).toFixed(2) : '0.00',
      credits,
      points
    };
  }, [courses]);

  // Target GPA Solver Logic
  const calculateTarget = () => {
    const target = parseFloat(targetGPA);
    const remaining = parseInt(remainingCredits, 10);

    if (isNaN(target) || isNaN(remaining) || remaining <= 0) {
      setTargetResult({ error: 'Please enter valid target GPA and remaining credits (>0).' });
      return;
    }

    const futureTotalCredits = cumulativeStats.credits + remaining;
    const futureTotalPoints = target * futureTotalCredits;
    const neededPoints = futureTotalPoints - cumulativeStats.points;
    const neededAvgGpa = neededPoints / remaining;

    if (neededAvgGpa > 4.0) {
      setTargetResult({ error: `It is mathematically impossible to reach a ${target.toFixed(2)} GPA. You would need an average GPA of ${neededAvgGpa.toFixed(2)} in your remaining classes, but the maximum possible GPA is 4.0.` });
    } else if (neededAvgGpa < 0) {
      setTargetResult({ success: `You are mathematically guaranteed to reach your target! Even if you average a 0.0 GPA in your remaining classes, your cumulative GPA will stay above ${target.toFixed(2)}.` });
    } else {
      let approximateGrade = 'A';
      if (neededAvgGpa < 3.5) approximateGrade = 'B+';
      if (neededAvgGpa < 3.0) approximateGrade = 'B';
      if (neededAvgGpa < 2.5) approximateGrade = 'C+';
      if (neededAvgGpa < 2.0) approximateGrade = 'C';
      if (neededAvgGpa < 1.5) approximateGrade = 'D+';
      if (neededAvgGpa < 1.0) approximateGrade = 'D';

      setTargetResult({ success: `To reach your overall goal of ${target.toFixed(2)}, you must maintain an average GPA of ${neededAvgGpa.toFixed(2)} in your next ${remaining} credit hours. This means you should aim for mostly ${approximateGrade}'s in your upcoming classes.` });
    }
  };

  const handleAddCourse = () => {
    triggerAuthSheet(() => {
      let finalScore = 0;

      if (newCourse.isDetailed) {
        const examW = parseFloat(newCourse.examWeight) || 60;
        const caW = 100 - examW;

        let totalCAScore = 0;
        let totalCAMax = 0;

        newCourse.assessments.forEach(a => {
          totalCAScore += (parseFloat(a.score) || 0);
          totalCAMax += (parseFloat(a.max) || 0);
        });

        let caAchieved = 0;
        if (totalCAMax > 0) {
          caAchieved = (totalCAScore / totalCAMax) * caW;
        } else {
          caAchieved = totalCAScore;
        }

        let examAchieved = parseFloat(newCourse.examScore) || 0;
        finalScore = caAchieved + examAchieved;
      } else {
        finalScore = parseFloat(newCourse.score) || 0;
      }

      if (newCourse.name && finalScore >= 0) {
        const score = Math.min(100, Math.max(0, finalScore));
        const grade = getGradeFromScore(score);
        const gradePoint = GRADE_POINTS[grade];

        const courseObject = {
          ...newCourse,
          id: newCourse.id || Date.now(),
          score: score,
          grade: grade,
          gradePoint: gradePoint,
          academic_year: activeLevel,
          semester: activeSemester
        };

        if (courses.some(c => c.id === courseObject.id)) {
          setCourses(courses.map(c => c.id === courseObject.id ? courseObject : c));
        } else {
          // Prevent duplicates on manual add by checking semantic identity
          const existingSemanticCourse = courses.find(c =>
            c.name.trim().toLowerCase() === courseObject.name.trim().toLowerCase() &&
            c.semester === courseObject.semester &&
            c.academic_year === courseObject.academic_year
          );

          if (existingSemanticCourse) {
            setCourses(courses.map(c => c.id === existingSemanticCourse.id ? { ...courseObject, id: existingSemanticCourse.id } : c));
          } else {
            setCourses([...courses, courseObject]);
          }
        }

        setNewCourse({
          name: '',
          creditHours: 3,
          score: '',
          isDetailed: false,
          examWeight: 60,
          examScore: '',
          assessments: [
            { id: Date.now(), name: 'Quiz 1', score: '', max: 20 },
            { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }
          ],
          academic_year: activeLevel,
          semester: activeSemester
        });
        setShowAddForm(false);
      }
    });
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));

    // Tombstone for sync
    try {
      const deleted = JSON.parse(localStorage.getItem('ucc_gpa_deleted') || '[]');
      if (!deleted.includes(id)) {
        deleted.push(id);
        localStorage.setItem('ucc_gpa_deleted', JSON.stringify(deleted));
      }
    } catch (e) {
      console.error('Error saving GPA tombstone:', e);
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A') return 'text-green-600 bg-green-50';
    if (['B+', 'B'].includes(grade)) return 'text-blue-600 bg-blue-50';
    if (['C+', 'C'].includes(grade)) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const showLockScreen = isGpaLocked && gpaPin && !isUnlocked;
  const pinInputRef = React.useRef(null);

  return (
    <div className="relative pb-20">
      {/* GPA Lock Screen Overlay */}
      {showLockScreen && (
        <div
          className="absolute inset-0 z-50 bg-white/70 backdrop-blur-xl flex flex-col items-center justify-start pt-20 px-6 min-h-[500px]"
          onClick={() => pinInputRef.current?.focus()}
        >
          <div
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl max-w-sm w-full text-center space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-900/5 flex items-center justify-center mx-auto text-gray-900">
              <Lock size={28} className="animate-pulse" />
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">GPA Vault Locked</h2>
              <p className="text-sm text-gray-500 font-medium mt-2 leading-relaxed">
                Enter your 6-digit PIN to access your GPA forecasts and scores.
              </p>
            </div>

            {/* Passcode input bubbles */}
            <div
              className="relative flex justify-center items-center gap-3 py-2 cursor-pointer"
              onClick={() => pinInputRef.current?.focus()}
            >
              {Array.from({ length: 6 }).map((_, idx) => {
                const hasValue = unlockPinInput.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${hasValue
                        ? 'border-gray-900 bg-gray-900/5'
                        : 'border-gray-200 bg-gray-50'
                      }`}
                  >
                    {hasValue && (
                      <div className="w-3.5 h-3.5 rounded-full bg-gray-900 animate-in zoom-in duration-100" />
                    )}
                  </div>
                );
              })}

              <input
                ref={pinInputRef}
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={unlockPinInput}
                onChange={handlePinChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content (blurred when locked) */}
      <div className={showLockScreen ? "filter blur-md pointer-events-none select-none" : ""}>
        {/* ── Term Toggle UI ── */}
        <div className="flex items-center justify-center mb-6 bg-white rounded-2xl p-2 max-w-sm mx-auto shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTermIndex(Math.max(0, activeTermIndex - 1))}
            disabled={activeTermIndex === 0}
            className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex-1 text-center flex flex-col">
            <span className="text-sm font-black text-gray-900">Level {activeLevel}</span>
            <span className="text-[10px] font-bold text-gray-900/60 uppercase tracking-widest">Semester {activeSemester}</span>
          </div>

          <button
            onClick={() => setActiveTermIndex(Math.min(TERMS.length - 1, activeTermIndex + 1))}
            disabled={activeTermIndex === TERMS.length - 1}
            className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-primary-100 bg-gray-900/5">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-2">Semester GPA</p>
                <p className="text-5xl font-black text-primary-600 mb-2">{semesterStats.gpa}</p>
                <div className="text-xs font-medium text-primary-400">{semesterStats.credits} credits this term</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 bg-indigo-50/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Cumulative GPA</p>
                <p className="text-4xl font-black text-indigo-600 mb-2">{cumulativeStats.gpa}</p>
                <div className="text-xs font-medium text-indigo-400">{cumulativeStats.credits} total credits</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Grade Points</p>
                <p className="text-4xl font-black text-gray-800 mb-2">{cumulativeStats.points.toFixed(1)}</p>
                <div className="text-xs font-medium text-gray-400">total weighted points</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Target GPA Solver Card */}
        <Card padding="none" className="mb-6 bg-white border-gray-100 shadow-sm overflow-hidden">
          <CardHeader className="p-5 mb-0 border-b border-gray-100 bg-gray-900/5">
            <CardTitle className="text-gray-900 text-lg flex items-center gap-2 mb-1">
              <Target className="w-5 h-5 text-gray-900" />
              Active Semester GPA Forecaster
            </CardTitle>
            <p className="text-sm text-gray-500 font-medium">Set your target GPA for this semester. The app will calculate the exact target grades required for each of your current courses to meet your goal.</p>
          </CardHeader>
          <CardContent className="p-5">
            {displayCourses.length > 0 && (
              <div className="mb-5 space-y-2">
                <label className="text-xs font-bold text-gray-500 block mb-1.5">
                  Set your expected score/confidence level per course:
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {displayCourses.map(course => {
                    const pref = coursePrefs[course.id] || 'medium';
                    return (
                      <div key={course.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="font-bold text-sm text-gray-900 truncate pr-2">{course.name}</span>
                        <div className="flex gap-1 flex-shrink-0">
                          {[
                            { val: 'low', label: 'Pass', color: 'bg-red-50 text-red-700 border-red-200' },
                            { val: 'medium', label: 'Medium', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                            { val: 'high', label: 'Aim for A', color: 'bg-green-50 text-green-700 border-green-200' }
                          ].map(opt => {
                            const isActive = pref === opt.val;
                            return (
                              <button
                                key={opt.val}
                                type="button"
                                onClick={() => setCoursePrefs(prev => ({ ...prev, [course.id]: opt.val }))}
                                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${isActive ? opt.color : 'bg-white text-gray-400 border-gray-100 hover:text-gray-600'
                                  }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full space-y-1">
                <label className="text-xs font-bold text-gray-550 uppercase tracking-wider">Target GPA</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 3.6"
                  value={targetGPA}
                  onChange={(e) => setTargetGPA(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                <Button onClick={simulateSemesterTarget} className="flex-1 sm:flex-none bg-gray-900 hover:bg-gray-900 text-white py-3 rounded-xl shadow-sm">
                  Forecast Targets
                </Button>
                {targetResult && targetResult.success && (
                  <Button
                    onClick={() => {
                      setShuffleTrigger(prev => prev + 1);
                    }}
                    variant="outline"
                    className="flex-1 sm:flex-none border-gray-900/20 text-gray-900 hover:bg-gray-900/5 py-3 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    🎲 Shuffle Paths
                  </Button>
                )}
              </div>
            </div>

            {targetResult && targetResult.error && (
              <div className="mt-4 p-4 rounded-xl border bg-red-50 border-red-100 text-red-700 font-medium flex items-center gap-2">
                <Info size={18} className="flex-shrink-0" />
                <span>{targetResult.error}</span>
              </div>
            )}

            {targetResult && targetResult.success && (
              <div className="mt-5 space-y-5 animate-in fade-in duration-300">
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-800">
                  <p className="font-bold text-base mb-1">Success Plan Found!</p>
                  <p className="text-sm font-medium">{targetResult.scenario}</p>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-550 uppercase tracking-wider mb-2.5">Suggested Target Grade Per Course:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {targetResult.simulatedCourses.map((course, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-gray-900 text-sm block">{course.name || 'Untitled Course'}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{course.creditHours} Credits</span>
                        </div>
                        <span className={`font-black text-sm px-2.5 py-1 rounded ${getGradeColor(course.suggestedGrade)}`}>
                          Grade {course.suggestedGrade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-900/5 rounded-xl border border-gray-900/10">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">AI Recommendation & Study Strategy:</p>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed">{targetResult.studyPlan}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <CardTitle className="text-primary-900 text-lg flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary-500" />
                    Course List
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setNewCourse({
                          name: '',
                          creditHours: 3,
                          score: '',
                          isDetailed: false,
                          examWeight: 60,
                          examScore: '',
                          assessments: [
                            { id: Date.now(), name: 'Quiz 1', score: '', max: 20 },
                            { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }
                          ],
                          academic_year: activeLevel,
                          semester: activeSemester
                        });
                        setShowAddForm(true);
                      }}
                      className="bg-primary-600 text-white"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Result
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)} title={newCourse.id ? 'Edit Grade' : 'Calculate New Grade'} size="lg">
                  <div className="flex justify-end mb-4">
                    <button
                      className="text-xs font-bold bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full hover:bg-primary-200 transition-colors"
                      onClick={() => setNewCourse({ ...newCourse, isDetailed: !newCourse.isDetailed })}
                    >
                      {newCourse.isDetailed ? 'Simple Score' : 'Detailed Breakdown'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newCourse.id ? (
                      <div className="p-3 bg-primary-50 border border-primary-100 rounded-xl font-bold text-primary-700 flex items-center justify-between">
                        <span>{newCourse.name || 'Unknown Course'}</span>
                        <span className="text-xs bg-white px-2 py-1 rounded-md border border-primary-100">Editing</span>
                      </div>
                    ) : (
                      <select
                        value={newCourse.id || ''}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          if (selectedId === 'new') {
                            setNewCourse({
                              name: '',
                              creditHours: 3,
                              score: '',
                              isDetailed: false,
                              examWeight: 60,
                              examScore: '',
                              assessments: [
                                { id: Date.now(), name: 'Quiz 1', score: '', max: 20 },
                                { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }
                              ],
                              academic_year: activeLevel,
                              semester: activeSemester
                            });
                          } else {
                            const c = courses.find(course => course.id.toString() === selectedId);
                            if (c) {
                              setNewCourse({
                                ...c,
                                isDetailed: c.isDetailed || false,
                                examWeight: c.examWeight || 60,
                                examScore: c.examScore || '',
                                assessments: c.assessments || [
                                  { id: Date.now(), name: 'Quiz 1', score: '', max: 20 },
                                  { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }
                                ]
                              });
                            }
                          }
                        }}
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all cursor-pointer font-medium"
                      >
                        <option value="new">+ Add Custom Result</option>
                        <optgroup label="Select Course">
                          {courses.map(c => (
                            <option key={c.id} value={c.id.toString()}>{c.name || 'Untitled Course'}</option>
                          ))}
                        </optgroup>
                      </select>
                    )}

                    <select
                      value={newCourse.creditHours}
                      onChange={(e) => setNewCourse({ ...newCourse, creditHours: parseInt(e.target.value) })}
                      className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    >
                      <option value={1}>1 Credit Hour</option>
                      <option value={2}>2 Credit Hours</option>
                      <option value={3}>3 Credit Hours</option>
                      <option value={4}>4 Credit Hours</option>
                      <option value={5}>5 Credit Hours</option>
                      <option value={6}>6 Credit Hours</option>
                    </select>

                    {(!newCourse.id || !courses.some(c => c.id === newCourse.id)) && (
                      <input
                        type="text"
                        placeholder="Course Name..."
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all md:col-span-2"
                      />
                    )}

                    {!newCourse.isDetailed ? (
                      <input
                        type="number"
                        placeholder="Total Score (0-100)"
                        value={newCourse.score}
                        onChange={(e) => setNewCourse({ ...newCourse, score: e.target.value })}
                        min="0"
                        max="100"
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all md:col-span-2"
                      />
                    ) : (
                      <div className="md:col-span-2 space-y-4 pt-4 pb-4 border-t border-gray-100 mt-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-900/5 p-3 rounded-xl border border-primary-100 gap-3">
                          <p className="text-xs font-bold text-primary-700 uppercase tracking-widest flex items-center gap-2">
                            Scheme
                          </p>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <label className="text-xs font-bold text-gray-500 whitespace-nowrap">Exam Weight:</label>
                            <select
                              value={newCourse.examWeight || 60}
                              onChange={(e) => setNewCourse({ ...newCourse, examWeight: Number(e.target.value) })}
                              className="w-full sm:w-auto p-1.5 rounded-lg bg-white text-xs border border-primary-200 font-bold text-primary-700 outline-none focus:ring-2 focus:ring-primary-500"
                            >
                              <option value={40}>40% Exam / 60% CA</option>
                              <option value={50}>50% Exam / 50% CA</option>
                              <option value={60}>60% Exam / 40% CA</option>
                              <option value={70}>70% Exam / 30% CA</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-3 mt-4">
                          <p className="text-xs font-bold text-primary-500 uppercase tracking-widest">Continuous Assessment ({(100 - (parseFloat(newCourse.examWeight) || 60))}%)</p>
                          {newCourse.assessments.map((ca, index) => (
                            <div key={ca.id} className="flex flex-wrap sm:flex-nowrap gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100 items-center">
                              <input
                                type="text"
                                placeholder="Name"
                                value={ca.name}
                                onChange={(e) => {
                                  const arr = [...newCourse.assessments];
                                  arr[index].name = e.target.value;
                                  setNewCourse({ ...newCourse, assessments: arr });
                                }}
                                className="w-full sm:flex-1 p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none border border-gray-200"
                              />
                              <div className="flex flex-1 sm:flex-none justify-end sm:justify-center items-center gap-2 w-full sm:w-auto">
                                <input
                                  type="number"
                                  placeholder="Score"
                                  value={ca.score}
                                  onChange={(e) => {
                                    const arr = [...newCourse.assessments];
                                    arr[index].score = e.target.value;
                                    setNewCourse({ ...newCourse, assessments: arr });
                                  }}
                                  className="w-[4.5rem] p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none border border-gray-200 text-center font-bold"
                                />
                                <span className="text-gray-400 font-bold text-sm">/</span>
                                <input
                                  type="number"
                                  placeholder="Max"
                                  value={ca.max}
                                  onChange={(e) => {
                                    const arr = [...newCourse.assessments];
                                    arr[index].max = e.target.value;
                                    setNewCourse({ ...newCourse, assessments: arr });
                                  }}
                                  className="w-[4.5rem] p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none border border-gray-200 text-center text-gray-500"
                                />
                                <button
                                  onClick={() => {
                                    setNewCourse({ ...newCourse, assessments: newCourse.assessments.filter((_, i) => i !== index) })
                                  }}
                                  className="p-2 ml-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setNewCourse({
                                ...newCourse,
                                assessments: [...newCourse.assessments, { id: Date.now(), name: `Assessment ${newCourse.assessments.length + 1}`, score: '', max: 20 }]
                              })
                            }}
                            className="w-full text-primary-600 border-primary-100 hover:bg-primary-50 py-3 border-dashed"
                          >
                            <Plus size={14} className="mr-1" /> Add Component
                          </Button>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-3">Final Exam ({newCourse.examWeight}%)</p>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-green-50 p-2 rounded-xl border border-green-100">
                            <div className="w-full sm:flex-1 px-2 font-bold text-green-700 text-sm mb-2 sm:mb-0">Exam Score</div>
                            <div className="flex flex-1 sm:flex-none justify-end sm:justify-center items-center gap-2">
                              <input
                                type="number"
                                placeholder="Score"
                                value={newCourse.examScore}
                                onChange={(e) => setNewCourse({ ...newCourse, examScore: e.target.value })}
                                className="w-[5.5rem] p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none border border-green-200 text-center font-bold text-green-700"
                              />
                              <span className="text-gray-400 font-bold text-sm">/</span>
                              <div className="w-[4.5rem] p-2 bg-green-100/50 rounded-lg text-sm font-bold text-green-600 text-center flex items-center justify-center border border-green-200/50">
                                {newCourse.examWeight}
                              </div>
                              <div className="w-[2.2rem] hidden sm:block"></div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-gray-900 text-white rounded-xl flex justify-between items-center shadow-lg">
                          <div className="text-sm font-medium text-gray-300">Total Expected Score</div>
                          <div className="text-2xl font-black text-primary-400 flex items-baseline gap-1">
                            {(() => {
                              const examW = parseFloat(newCourse.examWeight) || 60;
                              const caW = 100 - examW;
                              let tCAScore = 0; let tCAMax = 0;
                              newCourse.assessments.forEach(a => { tCAScore += (parseFloat(a.score) || 0); tCAMax += (parseFloat(a.max) || 0); });
                              let caAchieved = tCAMax > 0 ? (tCAScore / tCAMax) * caW : tCAScore;
                              let examAchieved = (parseFloat(newCourse.examScore) || 0);
                              return (caAchieved + examAchieved).toFixed(1);
                            })()} <span className="text-sm text-gray-500 font-medium">/ 100</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleAddCourse} className="bg-primary-600 text-white">{newCourse.id ? 'Save Changes' : 'Add Grade'}</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  </div>
                </Modal>

                <div className="space-y-3">
                  {displayCourses.map(course => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-100 transition-colors bg-white group shadow-sm cursor-pointer hover:shadow-md"
                      onClick={() => {
                        setNewCourse({
                          ...course,
                          isDetailed: course.isDetailed || false,
                          examWeight: course.examWeight || 60,
                          examScore: course.examScore || '',
                          assessments: course.assessments || [
                            { id: Date.now(), name: 'Quiz 1', score: '', max: 20 },
                            { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }
                          ]
                        });
                        setShowAddForm(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`font-bold px-2 py-1 rounded text-sm ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                          <span className="font-bold text-gray-900 truncate max-w-[150px] sm:max-w-none" title={course.name || 'Untitled Course'}>
                            {course.name || 'Untitled Course'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-medium text-gray-400">
                          <span className="whitespace-nowrap">{course.creditHours} Credit(s)</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="whitespace-nowrap">Score: {(parseFloat(course.score) || 0).toFixed(1)}%</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="whitespace-nowrap">{course.gradePoint} Points</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }}
                        className="text-gray-300 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}

                  {displayCourses.length === 0 && (
                    <div className="text-center py-12 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
                      <Calculator className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-900 font-bold">No grades for this semester</p>
                      <p className="text-gray-500 text-sm mt-1">Add your separate course grades to calculate your GPA.</p>
                      <Button variant="link" onClick={() => setShowAddForm(true)} className="text-primary-600 mt-2">Add First Grade</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grade Reference */}
          <div>
            <Card className="bg-gray-50 border-gray-100">
              <CardHeader>
                <CardTitle className="text-base text-gray-900 flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-400" />
                  Grading Scale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {Object.entries(GRADE_RANGES).map(([grade, range]) => (
                    <div key={grade} className="flex justify-between items-center p-2 border-b border-gray-200 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`font-bold w-8 ${getGradeColor(grade).split(' ')[0]}`}>{grade}</span>
                        <span className="text-gray-505 font-medium text-xs">{range.min}-{range.max}%</span>
                      </div>
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