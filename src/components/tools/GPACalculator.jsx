import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Plus, Trash2 } from 'lucide-react';
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
    if (grade === 'A') return 'text-green-600';
    if (['B+', 'B'].includes(grade)) return 'text-blue-600';
    if (['C+', 'C'].includes(grade)) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Current GPA</p>
              <p className="text-3xl font-bold text-primary-600">{currentGPA}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Credits</p>
              <p className="text-3xl font-bold text-gray-800">{totalCredits}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Grade Points</p>
              <p className="text-3xl font-bold text-gray-800">{totalGradePoints.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Grade Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {Object.entries(GRADE_RANGES).map(([grade, range]) => (
              <div key={grade} className="flex justify-between p-2 border rounded">
                <span className={`font-semibold ${getGradeColor(grade)}`}>{grade}</span>
                <span className="text-gray-600">{range.min}-{range.max}%</span>
                <span className="text-gray-500">({GRADE_POINTS[grade]} pts)</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Course List</CardTitle>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={16} className="mr-1" />
              Add Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-4">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                    className="p-2 border rounded"
                  />
                  
                  <select
                    value={newCourse.creditHours}
                    onChange={(e) => setNewCourse({...newCourse, creditHours: parseInt(e.target.value)})}
                    className="p-2 border rounded"
                  >
                    <option value={1}>1 Credit Hour</option>
                    <option value={2}>2 Credit Hours</option>
                    <option value={3}>3 Credit Hours</option>
                  </select>
                  
                  <input
                    type="number"
                    placeholder="Score (0-100)"
                    value={newCourse.score}
                    onChange={(e) => setNewCourse({...newCourse, score: e.target.value})}
                    min="0"
                    max="100"
                    className="p-2 border rounded md:col-span-2"
                  />
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddCourse}>Add Course</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {courses.map(course => (
              <div key={course.id} className="flex items-center justify-between p-3 border rounded">
                                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-sm text-gray-600">{course.creditHours} credits</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`font-semibold ${getGradeColor(course.grade)}`}>
                      {course.score}% - {course.grade}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({course.gradePoint} points)
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            
            {courses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No courses added yet. Add your first course to calculate your GPA.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GPACalculator;