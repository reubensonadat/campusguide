import React, { useState, useEffect } from 'react';
import { Target, Info } from 'lucide-react';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';

const getGradeColor = (grade) => {
  if (grade === 'A') return 'text-green-600 bg-green-50';
  if (['B+', 'B'].includes(grade)) return 'text-blue-600 bg-blue-50';
  if (['C+', 'C'].includes(grade)) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const SemesterForecaster = ({ displayCourses }) => {
  const [targetGPA, setTargetGPA] = useState('');
  const [targetResult, setTargetResult] = useState(null);
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
    const gradeOptions = [{ grade: 'A', gp: 4.0 }, { grade: 'B+', gp: 3.5 }, { grade: 'B', gp: 3.0 }, { grade: 'C+', gp: 2.5 }, { grade: 'C', gp: 2.0 }, { grade: 'D+', gp: 1.5 }, { grade: 'D', gp: 1.0 }, { grade: 'E', gp: 0.0 }];

    const validCombinations = [];
    const maxAttempts = 5000;

    for (let i = 0; i < maxAttempts; i++) {
      const combination = [];
      let totalPoints = 0;
      displayCourses.forEach(course => {
        const pref = coursePrefs[course.id] || 'medium';
        const ch = parseFloat(course.creditHours) || 3;
        let choices = [...gradeOptions];
        if (pref === 'high') choices = Math.random() < 0.8 ? gradeOptions.filter(g => g.gp >= 3.0) : gradeOptions;
        else if (pref === 'low') choices = Math.random() < 0.8 ? gradeOptions.filter(g => g.gp <= 2.5 && g.gp >= 1.0) : gradeOptions;
        else choices = Math.random() < 0.7 ? gradeOptions.filter(g => g.gp >= 2.0 && g.gp <= 3.5) : gradeOptions;
        if (choices.length === 0) choices = gradeOptions;
        const chosen = choices[Math.floor(Math.random() * choices.length)];
        combination.push({ ...course, suggestedGrade: chosen.grade, gp: chosen.gp });
        totalPoints += chosen.gp * ch;
      });
      const calculatedGpa = totalPoints / totalCredits;
      if (calculatedGpa >= target && calculatedGpa <= target + 0.3) validCombinations.push({ courses: combination, gpa: calculatedGpa });
      if (validCombinations.length >= 30) break;
    }

    if (validCombinations.length === 0) {
      let maxPossiblePoints = 0;
      displayCourses.forEach(course => { maxPossiblePoints += 4.0 * (parseFloat(course.creditHours) || 3); });
      const maxPossibleGpa = maxPossiblePoints / totalCredits;
      if (target > maxPossibleGpa) { setTargetResult({ error: `Target GPA of ${target.toFixed(2)} is mathematically impossible. The maximum GPA you can get is ${maxPossibleGpa.toFixed(2)} (straight A's).` }); return; }
      for (let i = 0; i < maxAttempts; i++) {
        const combination = [];
        let totalPoints = 0;
        displayCourses.forEach(course => {
          const ch = parseFloat(course.creditHours) || 3;
          const chosen = gradeOptions[Math.floor(Math.random() * gradeOptions.length)];
          combination.push({ ...course, suggestedGrade: chosen.grade, gp: chosen.gp });
          totalPoints += chosen.gp * ch;
        });
        const calculatedGpa = totalPoints / totalCredits;
        if (calculatedGpa >= target) validCombinations.push({ courses: combination, gpa: calculatedGpa });
        if (validCombinations.length >= 10) break;
      }
    }

    if (validCombinations.length === 0) { setTargetResult({ error: 'Could not find a valid combination. Try lowering your target GPA or adjusting your confidence levels.' }); return; }

    const selected = validCombinations[Math.floor(Math.random() * validCombinations.length)];
    const highCount = displayCourses.filter(c => coursePrefs[c.id] === 'high').length;
    const lowCount = displayCourses.filter(c => coursePrefs[c.id] === 'low').length;
    let studyPlan = "Prioritize the courses you marked as 'Aim for A' to maximize your GPA points. Ensure you keep up with weekly assignments and quizzes for these subjects.";
    if (highCount > lowCount) studyPlan = "Since you have high confidence in most courses, focus on maintaining consistent grades. Form study groups and practice past questions to lock in those A's.";
    else if (lowCount > 0) studyPlan = "For courses where you expect lower scores, aim to secure all continuous assessment (CA) marks (quizzes, assignments) to create a safety net for the final exams.";

    setTargetResult({ success: true, scenario: `Target of ${target.toFixed(2)} met with a simulated GPA of ${selected.gpa.toFixed(2)}!`, simulatedCourses: selected.courses, studyPlan });
  };

  useEffect(() => {
    if (targetGPA && targetResult && !targetResult.error) simulateSemesterTarget();
  }, [shuffleTrigger]);

  return (
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
            <label className="text-xs font-bold text-gray-500 block mb-1.5">Set your expected score/confidence level per course:</label>
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
                      ].map(opt => (
                        <button key={opt.val} type="button" onClick={() => setCoursePrefs(prev => ({ ...prev, [course.id]: opt.val }))}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all ${pref === opt.val ? opt.color : 'bg-white text-gray-400 border-gray-100 hover:text-gray-600'}`}>
                          {opt.label}
                        </button>
                      ))}
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
            <input type="number" step="0.01" placeholder="e.g. 3.6" value={targetGPA} onChange={(e) => setTargetGPA(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto flex-wrap">
            <Button onClick={simulateSemesterTarget} className="flex-1 sm:flex-none bg-gray-900 hover:bg-gray-900 text-white py-3 rounded-xl shadow-sm">Forecast Targets</Button>
            {targetResult?.success && (
              <Button onClick={() => setShuffleTrigger(prev => prev + 1)} variant="outline"
                className="flex-1 sm:flex-none border-gray-900/20 text-gray-900 hover:bg-gray-900/5 py-3 rounded-xl flex items-center justify-center gap-1.5">
                🎲 Shuffle Paths
              </Button>
            )}
          </div>
        </div>

        {targetResult?.error && (
          <div className="mt-4 p-4 rounded-xl border bg-red-50 border-red-100 text-red-700 font-medium flex items-center gap-2">
            <Info size={18} className="flex-shrink-0" /><span>{targetResult.error}</span>
          </div>
        )}

        {targetResult?.success && (
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
                    <span className={`font-black text-sm px-2.5 py-1 rounded ${getGradeColor(course.suggestedGrade)}`}>Grade {course.suggestedGrade}</span>
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
  );
};

export default SemesterForecaster;
