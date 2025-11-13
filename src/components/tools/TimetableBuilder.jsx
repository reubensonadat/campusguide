import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Plus, Trash2, Download } from 'lucide-react';
import { DAYS_OF_WEEK, TIME_SLOTS } from '../../utils/constants';
import { exportTimetableToPDF } from '../../services/exportService';

const TimetableBuilder = () => {
  const [courses, setCourses] = useLocalStorage('ucc_timetable', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    day: 'Monday',
    startTime: '08:30',
    endTime: '09:30',
    location: '',
    color: '#3b82f6'
  });

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ];

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.location) {
      setCourses([...courses, { ...newCourse, id: Date.now() }]);
      setNewCourse({
        name: '',
        day: 'Monday',
        startTime: '08:30',
        endTime: '09:30',
        location: '',
        color: colors[courses.length % colors.length]
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleExportPDF = () => {
    exportTimetableToPDF('timetable-grid', 'ucc-timetable.pdf');
  };

  const getCourseForSlot = (day, time) => {
    return courses.find(course => 
      course.day === day && 
      time >= course.startTime && 
      time < course.endTime
    );
  };

  return (
    <div className="p-4 pb-20">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Timetable</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={courses.length === 0}
              >
                <Download size={16} className="mr-1" />
                Export PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={16} className="mr-1" />
                Add Course
              </Button>
            </div>
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
                  <input
                    type="text"
                    placeholder="Location"
                    value={newCourse.location}
                    onChange={(e) => setNewCourse({...newCourse, location: e.target.value})}
                    className="p-2 border rounded"
                  />
                  <select
                    value={newCourse.day}
                    onChange={(e) => setNewCourse({...newCourse, day: e.target.value})}
                    className="p-2 border rounded"
                  >
                    {DAYS_OF_WEEK.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <select
                    value={newCourse.startTime}
                    onChange={(e) => setNewCourse({...newCourse, startTime: e.target.value})}
                    className="p-2 border rounded"
                  >
                    {TIME_SLOTS.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <select
                    value={newCourse.endTime}
                    onChange={(e) => setNewCourse({...newCourse, endTime: e.target.value})}
                    className="p-2 border rounded"
                  >
                    {TIME_SLOTS.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setNewCourse({...newCourse, color})}
                        className={`w-8 h-8 rounded ${newCourse.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddCourse}>Add Course</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div id="timetable-grid" className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100">Time</th>
                  {DAYS_OF_WEEK.map(day => (
                    <th key={day} className="border p-2 bg-gray-100">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map(time => (
                  <tr key={time}>
                    <td className="border p-2 bg-gray-50 font-medium">{time}</td>
                    {DAYS_OF_WEEK.map(day => {
                      const course = getCourseForSlot(day, time);
                      return (
                        <td key={`${day}-${time}`} className="border p-1 align-top">
                          {course && (
                            <div
                              className="p-2 rounded text-white text-xs"
                              style={{ backgroundColor: course.color }}
                            >
                              <div className="font-semibold">{course.name}</div>
                              <div>{course.location}</div>
                              <div className="text-xs opacity-75">
                                {course.startTime} - {course.endTime}
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {courses.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Course List</h3>
              <div className="space-y-2">
                {courses.map(course => (
                  <div key={course.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: course.color }}
                      />
                      <span className="font-medium">{course.name}</span>
                      <span className="text-sm text-gray-600">
                        {course.day} {course.startTime}-{course.endTime} at {course.location}
                      </span>
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
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableBuilder;