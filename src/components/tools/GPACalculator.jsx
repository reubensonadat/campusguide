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
    score: ''
  });

  const [currentGPA, setCurrentGPA] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalGradePoints, setTotalGradePoints] = useState(0);

  useEffect(() => {
    const gpa = calculateGPA(courses);
    const credits = courses.reduce((sum, course) => sum + course.creditHours, 0);
    const points = courses.reduce((sum, course) => sum + (course.gradePoint * course.creditHours), 0);

    setCurrentGPA(gpa);
    setTotalCredits(credits);
    setTotalGradePoints(points);
  }, [courses]);

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.score) {
      const score = parseFloat(newCourse.score);
      const grade = getGradeFromScore(score);
      const gradePoint = GRADE_POINTS[grade];

      const course = {
        ...newCourse,
        id: Date.now(),
        score: score,
        grade: grade,
        gradePoint: gradePoint
      };

      setCourses([...courses, course]);
      setNewCourse({
        name: '',
        creditHours: 3,
        score: ''
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
              <div className="flex justify-between items-center">
                <CardTitle className="text-indigo-900 text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-500" />
                  Course List
                </CardTitle>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowAddForm(true)}
                  className="bg-indigo-600 text-white"
                >
                  <Plus size={16} className="mr-1" />
                  Add Course
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddForm && (
                <div className="mb-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                  <h4 className="font-bold text-gray-900 mb-4">Calculate New Grade</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Course Name (Optional)"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />

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

                    <input
                      type="number"
                      placeholder="Score (0-100)"
                      value={newCourse.score}
                      onChange={(e) => setNewCourse({ ...newCourse, score: e.target.value })}
                      min="0"
                      max="100"
                      className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all md:col-span-2"
                    />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleAddCourse} className="bg-indigo-600 text-white">Add Grade</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {courses.map(course => (
                  <div key={course.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-indigo-100 transition-colors bg-white group shadow-sm">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`font-bold px-2 py-1 rounded text-sm ${getGradeColor(course.grade)}`}>
                          {course.grade}
                        </span>
                        <span className="font-bold text-gray-900">{course.name || 'Untitled Course'}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs font-medium text-gray-400">
                        <span>{course.creditHours} Credit(s)</span>
                        <span>•</span>
                        <span>Score: {course.score}%</span>
                        <span>•</span>
                        <span>{course.gradePoint} Points</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCourse(course.id)}
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