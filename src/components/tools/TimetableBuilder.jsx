import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Plus, Trash2, Download, Calendar } from 'lucide-react';
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

  // Group courses by day for mobile list view
  const coursesByDay = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = courses.filter(course => course.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {});

  return (
    <div className="pb-20">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-indigo-900 text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                My Timetable
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">Design your perfect weekly schedule</p>
            </div>

            <div className="flex w-full sm:w-auto gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={courses.length === 0}
                className="flex-1 sm:flex-none border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                <Download size={16} className="mr-2" />
                Export PDF
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddForm(true)}
                className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus size={16} className="mr-2" />
                Add Course
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 mb-4">Add Schedule Item</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Course Name (e.g. INF 101)"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Location (e.g. ALTB 1)"
                  value={newCourse.location}
                  onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
                <select
                  value={newCourse.day}
                  onChange={(e) => setNewCourse({ ...newCourse, day: e.target.value })}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  {DAYS_OF_WEEK.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newCourse.startTime}
                    onChange={(e) => setNewCourse({ ...newCourse, startTime: e.target.value })}
                    className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    {TIME_SLOTS.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <select
                    value={newCourse.endTime}
                    onChange={(e) => setNewCourse({ ...newCourse, endTime: e.target.value })}
                    className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    {TIME_SLOTS.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Color Tag</label>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setNewCourse({ ...newCourse, color })}
                        className={`w-8 h-8 rounded-full transition-all ${newCourse.color === color ? 'ring-4 ring-offset-2 ring-gray-200 scale-110' : 'hover:scale-110'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button onClick={handleAddCourse} className="bg-indigo-600 text-white hover:bg-indigo-700">Add to Schedule</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {/* Desktop View (Table) */}
          <div id="timetable-grid" className="hidden lg:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 p-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-widest text-left w-24">Time</th>
                  {DAYS_OF_WEEK.map(day => (
                    <th key={day} className="border-b border-l border-gray-200 p-4 bg-gray-50/50 text-xs font-bold text-gray-400 uppercase tracking-widest text-left min-w-[140px]">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map(time => (
                  <tr key={time} className="group hover:bg-gray-50/30 transition-colors">
                    <td className="border-r border-gray-100 p-3 text-xs font-medium text-gray-400 font-mono text-center">{time}</td>
                    {DAYS_OF_WEEK.map(day => {
                      const course = getCourseForSlot(day, time);
                      return (
                        <td key={`${day}-${time}`} className="border-b border-r border-gray-100 p-1 align-top h-16 relative">
                          {course && (
                            <div
                              className="absolute inset-1 p-2 rounded-lg text-white text-xs shadow-sm hover:shadow-md transition-all cursor-pointer z-10 overflow-hidden"
                              style={{ backgroundColor: course.color }}
                              onClick={() => handleDeleteCourse(course.id)}
                              title="Click to remove"
                            >
                              <div className="font-bold truncate">{course.name}</div>
                              <div className="truncate opacity-90 text-[10px]">{course.location}</div>
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

          {/* Mobile View (List) */}
          <div className="lg:hidden space-y-6">
            {DAYS_OF_WEEK.map(day => {
              const dayCourses = coursesByDay[day];
              if (!dayCourses || dayCourses.length === 0) return null;

              return (
                <div key={day} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{day}</h3>
                  <div className="space-y-3">
                    {dayCourses.map(course => (
                      <div key={course.id} className="flex gap-4 group">
                        <div className="w-16 pt-1 text-right">
                          <div className="text-sm font-bold text-gray-900">{course.startTime}</div>
                          <div className="text-xs text-gray-400">{course.endTime}</div>
                        </div>
                        <div
                          className="flex-1 p-3 rounded-xl flex justify-between items-start"
                          style={{ backgroundColor: `${course.color}15`, borderLeft: `4px solid ${course.color}` }}
                        >
                          <div>
                            <div className="font-bold text-gray-900" style={{ color: course.color }}>{course.name}</div>
                            <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                              <MapPin size={12} />
                              {course.location}
                            </div>
                          </div>
                          <button onClick={() => handleDeleteCourse(course.id)} className="text-gray-300 hover:text-red-500 p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {courses.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No classes scheduled yet.</p>
                <Button variant="link" onClick={() => setShowAddForm(true)} className="text-indigo-600">Add your first class</Button>
              </div>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

// Add MapPin for mobile view
import { MapPin } from 'lucide-react';

export default TimetableBuilder;