import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Plus, Trash2, Calculator, Save, Info } from 'lucide-react';
import { GRADE_POINTS, GRADE_RANGES } from '../../utils/constants';
import { calculateGPA, getGradeFromScore } from '../../utils/helpers';

const GPACalculator = () => {
  const [courses, setCourses] = useLocalStorage('ucc_gpa', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    creditHours: 3,
    score: '',
    isDetailed: false, // flag to toggle view
    examWeight: 60,
    examScore: '',
    assessments: [
      { id: Date.now(), name: 'Quiz 1', score: '', max: 20 },
      { id: Date.now() + 1, name: 'Assignment 1', score: '', max: 20 }
    ]
  });

  const [currentGPA, setCurrentGPA] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalGradePoints, setTotalGradePoints] = useState(0);

  useEffect(() => {
    // 1. Auto-merge timetable courses that have target grades
    const timetableStr = localStorage.getItem('ucc_timetable');
    if (timetableStr) {
      try {
        const timetableCourses = JSON.parse(timetableStr);
        const newGpaCourses = timetableCourses
          .map(course => {
            // Check if we already have this course in GPA (don't overwrite detailed setups)
            const existing = courses.find(c => c.id === course.id);
            if (existing) return existing;
            
            return {
              id: course.id,
              name: course.name,
              creditHours: course.creditHours || 3,
              score: course.targetGrade ? GRADE_RANGES[course.targetGrade].min : 0,
              grade: course.targetGrade || 'E',
              gradePoint: course.targetGrade ? GRADE_POINTS[course.targetGrade] : 0,
              isDetailed: false,
              examWeight: 60,
              examScore: '',
              assessments: [
                { id: Date.now() + Math.random(), name: 'Quiz 1', score: '', max: 20 },
                { id: Date.now() + Math.random() + 1, name: 'Assignment 1', score: '', max: 20 }
              ]
            };
          });

        const gpaOnlyCourses = courses.filter(c => !timetableCourses.find(tc => tc.id === c.id));
        const mergedCourses = [...gpaOnlyCourses, ...newGpaCourses];
        
        // If the merged array is different from current state, update it (prevents infinite loop)
        if (JSON.stringify(mergedCourses) !== JSON.stringify(courses)) {
          setCourses(mergedCourses);
        }
      } catch (e) {
        console.error('Error auto-syncing timetable to GPA:', e);
      }
    }

    // 2. Calculate Stats
    const gpa = calculateGPA(courses);
    const credits = courses.reduce((sum, course) => sum + course.creditHours, 0);
    const points = courses.reduce((sum, course) => sum + (course.gradePoint * course.creditHours), 0);

    setCurrentGPA(gpa);
    setTotalCredits(credits);
    setTotalGradePoints(points);
  }, [courses, setCourses]);

  const handleAddCourse = () => {
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
      const score = Math.min(100, Math.max(0, finalScore)); // clamp between 0 and 100
      const grade = getGradeFromScore(score);
      const gradePoint = GRADE_POINTS[grade];

      const courseObject = {
        ...newCourse,
        id: newCourse.id || Date.now(),
        score: score,
        grade: grade,
        gradePoint: gradePoint
      };

      if (courses.some(c => c.id === courseObject.id)) {
        setCourses(courses.map(c => c.id === courseObject.id ? courseObject : c));
      } else {
        setCourses([...courses, courseObject]);
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
        ]
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const getGradeColor = (grade) => {
    if (grade === 'A') return 'text-green-600 bg-green-50';
    if (['B+', 'B'].includes(grade)) return 'text-blue-600 bg-blue-50';
    if (['C+', 'C'].includes(grade)) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="pb-20">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-indigo-100 bg-indigo-50/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Current GPA</p>
              <p className="text-5xl font-black text-indigo-600 mb-2">{currentGPA}</p>
              <div className="text-xs font-medium text-indigo-400">cumulative score</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Credits</p>
              <p className="text-4xl font-black text-gray-800 mb-2">{totalCredits}</p>
              <div className="text-xs font-medium text-gray-400">hours registered</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Grade Points</p>
              <p className="text-4xl font-black text-gray-800 mb-2">{totalGradePoints.toFixed(1)}</p>
              <div className="text-xs font-medium text-gray-400">weighted points</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <CardTitle className="text-indigo-900 text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-500" />
                  Course List
                </CardTitle>
                <div className="flex gap-2">
                  {/* Sync button removed - handled automatically in useEffect */}
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
                        ]
                      });
                      setShowAddForm(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-indigo-600 text-white"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Result
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {showAddForm && (
                <div className="mb-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-gray-900">Calculate New Grade</h4>
                    <button 
                      className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full hover:bg-indigo-200 transition-colors"
                      onClick={() => setNewCourse({...newCourse, isDetailed: !newCourse.isDetailed})}
                    >
                      {newCourse.isDetailed ? 'Switch to Simple Score' : 'Use Detailed Breakdown (Quizzes & Assignments)'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newCourse.id ? (
                      <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl font-bold text-indigo-700 flex items-center justify-between">
                        <span>{newCourse.name || 'Unknown Course'}</span>
                        <span className="text-xs bg-white px-2 py-1 rounded-md border border-indigo-100">Editing</span>
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
                              ]
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
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all cursor-pointer font-medium"
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
                      className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    >
                      <option value={1}>1 Credit Hour</option>
                      <option value={2}>2 Credit Hours</option>
                      <option value={3}>3 Credit Hours</option>
                      <option value={4}>4 Credit Hours</option>
                    </select>

                    {/* Show a Custom course name input only if 'Add Custom Result' is selected (id doesn't match a stored course) */}
                    {(!newCourse.id || !courses.some(c => c.id === newCourse.id)) && (
                      <input
                        type="text"
                        placeholder="Course Name..."
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all md:col-span-2"
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
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all md:col-span-2"
                      />
                    ) : (
                      <div className="md:col-span-2 space-y-4 pt-4 pb-4 border-t border-gray-100 mt-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 gap-3">
                          <p className="text-xs font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-2">
                            Scheme
                          </p>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <label className="text-xs font-bold text-gray-500 whitespace-nowrap">Exam Weight:</label>
                            <select 
                              value={newCourse.examWeight || 60} 
                              onChange={(e) => setNewCourse({...newCourse, examWeight: Number(e.target.value)})}
                              className="w-full sm:w-auto p-1.5 rounded-lg bg-white text-xs border border-indigo-200 font-bold text-indigo-700 outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value={40}>40% Exam / 60% CA</option>
                              <option value={50}>50% Exam / 50% CA</option>
                              <option value={60}>60% Exam / 40% CA</option>
                              <option value={70}>70% Exam / 30% CA</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-3 mt-4">
                          <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Continuous Assessment ({(100 - (parseFloat(newCourse.examWeight) || 60))}%)</p>
                          {newCourse.assessments.map((ca, index) => (
                            <div key={ca.id} className="flex flex-wrap sm:flex-nowrap gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100 items-center">
                              <input 
                                type="text" 
                                placeholder="Name" 
                                value={ca.name}
                                onChange={(e) => {
                                  const arr = [...newCourse.assessments];
                                  arr[index].name = e.target.value;
                                  setNewCourse({...newCourse, assessments: arr});
                                }}
                                className="w-full sm:flex-1 p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none border border-gray-200"
                              />
                              <div className="flex flex-1 sm:flex-none justify-end sm:justify-center items-center gap-2 w-full sm:w-auto">
                                <input 
                                  type="number" 
                                  placeholder="Score" 
                                  value={ca.score}
                                  onChange={(e) => {
                                    const arr = [...newCourse.assessments];
                                    arr[index].score = e.target.value;
                                    setNewCourse({...newCourse, assessments: arr});
                                  }}
                                  className="w-[4.5rem] p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none border border-gray-200 text-center font-bold"
                                />
                                <span className="text-gray-400 font-bold text-sm">/</span>
                                <input 
                                  type="number" 
                                  placeholder="Max" 
                                  value={ca.max}
                                  onChange={(e) => {
                                    const arr = [...newCourse.assessments];
                                    arr[index].max = e.target.value;
                                    setNewCourse({...newCourse, assessments: arr});
                                  }}
                                  className="w-[4.5rem] p-2 bg-white rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none border border-gray-200 text-center text-gray-500"
                                />
                                <button 
                                  onClick={() => {
                                    setNewCourse({...newCourse, assessments: newCourse.assessments.filter((_, i) => i !== index)})
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
                            className="w-full text-indigo-600 border-indigo-100 hover:bg-indigo-50 py-3 border-dashed"
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
                                onChange={(e) => setNewCourse({...newCourse, examScore: e.target.value})}
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
                          <div className="text-sm font-medium text-gray-300">Total Course Expected Score</div>
                          <div className="text-2xl font-black text-indigo-400 flex items-baseline gap-1">
                            {(() => {
                              const examW = parseFloat(newCourse.examWeight) || 60;
                              const caW = 100 - examW;
                              let tCAScore = 0; let tCAMax = 0;
                              newCourse.assessments.forEach(a => { tCAScore += (parseFloat(a.score)||0); tCAMax += (parseFloat(a.max)||0); });
                              let caAchieved = tCAMax > 0 ? (tCAScore / tCAMax) * caW : tCAScore; // scale dynamic total score down to exact actual weight 
                              let examAchieved = (parseFloat(newCourse.examScore) || 0);
                              return (caAchieved + examAchieved).toFixed(1);
                            })()} <span className="text-sm text-gray-500 font-medium">/ 100</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleAddCourse} className="bg-indigo-600 text-white">{newCourse.id ? 'Save Changes' : 'Add Grade'}</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {courses.map(course => (
                  <div 
                    key={course.id} 
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-100 transition-colors bg-white group shadow-sm cursor-pointer hover:shadow-md"
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

                {courses.length === 0 && (
                  <div className="text-center py-12 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
                    <Calculator className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-900 font-bold">No grades added</p>
                    <p className="text-gray-500 text-sm mt-1">Add your separate course grades to calculate your GPA.</p>
                    <Button variant="link" onClick={() => setShowAddForm(true)} className="text-indigo-600 mt-2">Add First Grade</Button>
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
                      <span className="text-gray-500 font-medium text-xs">{range.min}-{range.max}%</span>
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
  );
};

export default GPACalculator;