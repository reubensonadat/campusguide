import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Plus, Trash2, Calendar, Bell, MapPin, Download, X, AlertCircle, User, Phone, Target } from 'lucide-react';
import { DAYS_OF_WEEK, TIME_SLOTS, GRADE_POINTS } from '../../utils/constants';
import { requestNotificationPermission, isNotificationSupported } from '../../services/notificationService';
import html2canvas from 'html2canvas';

const TimetableBuilder = () => {
  const [courses, setCourses] = useLocalStorage('ucc_timetable', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [conflictError, setConflictError] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const timetableRef = useRef(null);

  useEffect(() => {
    if (isNotificationSupported()) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
    if (granted) {
      new Notification('Reminders Enabled', { body: 'You will be notified 30 minutes before your classes.' });
    }
  };

  const [newCourse, setNewCourse] = useState({
    name: '',
    day: 'Monday',
    startTime: '08:30',
    endTime: '09:30',
    location: '',
    color: '#3b82f6',
    lecturer: '',
    contact: '',
    targetGrade: '',
    creditHours: 3
  });

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ];

  const checkConflict = (courseToCheck) => {
    return courses.find(course =>
      course.day === courseToCheck.day &&
      ((courseToCheck.startTime >= course.startTime && courseToCheck.startTime < course.endTime) ||
        (courseToCheck.endTime > course.startTime && courseToCheck.endTime <= course.endTime) ||
        (courseToCheck.startTime <= course.startTime && courseToCheck.endTime >= course.endTime))
    );
  };

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.location) {
      setConflictError('Please enter a course name and location.');
      return;
    }
    if (newCourse.startTime >= newCourse.endTime) {
      setConflictError('End time must be after start time.');
      return;
    }

    // Remove old course if editing to avoid self-conflict
    const tempCourses = newCourse.id ? courses.filter(c => c.id !== newCourse.id) : courses;

    // Check conflicts
    const conflict = tempCourses.find(c =>
      c.day === newCourse.day &&
      (
        (newCourse.startTime >= c.startTime && newCourse.startTime < c.endTime) ||
        (newCourse.endTime > c.startTime && newCourse.endTime <= c.endTime) ||
        (newCourse.startTime <= c.startTime && newCourse.endTime >= c.endTime)
      )
    );

    if (conflict) {
      setConflictError(`Time conflict with ${conflict.name}`);
      return;
    }

    if (newCourse.id) {
      setCourses(courses.map(c => c.id === newCourse.id ? newCourse : c));
    } else {
      setCourses([...courses, { ...newCourse, id: Date.now() }]);
    }

    setNewCourse({
      name: '',
      day: 'Monday',
      startTime: '08:30',
      endTime: '09:30',
      location: '',
      color: colors[tempCourses.length % colors.length],
      lecturer: '',
      contact: '',
      creditHours: 3
    });
    setConflictError('');
    setShowAddForm(false);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    setSelectedCourse(null);
  };

  const exportAsImage = async () => {
    if (!timetableRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(timetableRef.current, { scale: 2, useCORS: true, backgroundColor: '#f8fafc' });
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement('a');
      link.download = 'My_Timetable.png';
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Error exporting timetable:", error);
      alert('Failed to export timetable.');
    } finally {
      setIsExporting(false);
    }
  };

  // Group courses by day and sort by time
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
              <p className="text-sm text-gray-500 mt-1">Simple, unified schedule view.</p>
            </div>

            <div className="flex w-full sm:w-auto gap-2 flex-wrap">
              {courses.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportAsImage}
                  disabled={isExporting}
                  className="flex-1 sm:flex-none transition-all"
                >
                  <Download size={16} className={`mr-2 ${isExporting ? 'animate-bounce' : ''}`} />
                  {isExporting ? 'Saving Image...' : 'Save Image'}
                </Button>
              )}
              {!notificationsEnabled && isNotificationSupported() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEnableNotifications}
                  className="flex-1 sm:flex-none border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <Bell size={16} className="mr-2" />
                  Reminders
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setConflictError('');
                  setNewCourse({
                    name: '',
                    day: 'Monday',
                    startTime: '08:30',
                    endTime: '09:30',
                    location: '',
                    color: colors[courses.length % colors.length],
                    lecturer: '',
                    contact: '',
                    creditHours: 3
                  });
                  setShowAddForm(true);
                }}
                className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                <Plus size={16} className="mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>

          {/* Exportable Container */}
          <div ref={timetableRef} className="px-1 py-4 md:p-6 bg-slate-50/50 rounded-2xl">
            {courses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Your schedule is empty</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">Add your classes to stay organized and get reminders before they start.</p>
                <Button onClick={() => setShowAddForm(true)} className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md">
                  <Plus size={18} className="mr-2" /> Add First Class
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {DAYS_OF_WEEK.map(day => {
                  const dayCourses = coursesByDay[day];
                  if (!dayCourses || dayCourses.length === 0) return null;

                  return (
                    <div key={day} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                        {day}
                        <span className="text-xs font-medium bg-gray-100 text-gray-500 py-1 px-3 rounded-full">{dayCourses.length} classes</span>
                      </h3>
                      <div className="space-y-4">
                        {dayCourses.map(course => (
                          <div
                            key={course.id}
                            onClick={() => setSelectedCourse(course)}
                            className="flex gap-4 group cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                          >
                            <div className="w-[4.5rem] flex flex-col justify-center items-end opacity-80 group-hover:opacity-100 transition-opacity">
                              <div className="text-sm font-bold text-gray-900">{course.startTime}</div>
                              <div className="text-xs text-gray-400 font-medium">{course.endTime}</div>
                            </div>
                            <div
                              className="flex-1 p-4 rounded-2xl relative overflow-hidden text-white"
                              style={{ backgroundColor: course.color }}
                            >
                              <div className="font-bold text-base">{course.name}</div>
                              <div className="text-sm mt-1.5 flex items-center gap-1.5 font-medium opacity-90">
                                <MapPin size={14} className="opacity-70" />
                                {course.location}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Course Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg mt-4 sm:mt-auto sm:my-auto flex flex-col mb-20 sm:mb-auto overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
              <h3 className="font-bold text-gray-900 text-lg">{newCourse.id ? 'Edit Class' : 'Add New Class'}</h3>
              <button onClick={() => setShowAddForm(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="p-6 space-y-5 overflow-y-auto">
              {conflictError && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl font-medium flex items-center gap-2">
                  <AlertCircle size={16} />
                  {conflictError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Course Identifier</label>
                  <input
                    type="text"
                    placeholder="e.g. INF 101"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Venue / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. ALTB 1 or CODE Building"
                    value={newCourse.location}
                    onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Lecturer (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Mensah"
                      value={newCourse.lecturer || ''}
                      onChange={(e) => setNewCourse({ ...newCourse, lecturer: e.target.value })}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Contact (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 054... or email"
                      value={newCourse.contact || ''}
                      onChange={(e) => setNewCourse({ ...newCourse, contact: e.target.value })}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Credit Hours</label>
                    <select
                      value={newCourse.creditHours}
                      onChange={(e) => setNewCourse({ ...newCourse, creditHours: parseInt(e.target.value, 10) })}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                    >
                      {[1, 2, 3, 4].map(credit => (
                        <option key={credit} value={credit}>{credit} Credits</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Day</label>
                    <select
                      value={newCourse.day}
                      onChange={(e) => setNewCourse({ ...newCourse, day: e.target.value })}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                    >
                      {DAYS_OF_WEEK.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Start</label>
                      <select
                        value={newCourse.startTime}
                        onChange={(e) => setNewCourse({ ...newCourse, startTime: e.target.value })}
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                      >
                        {TIME_SLOTS.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">End</label>
                      <select
                        value={newCourse.endTime}
                        onChange={(e) => setNewCourse({ ...newCourse, endTime: e.target.value })}
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                      >
                        {TIME_SLOTS.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Color Tag</label>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map(color => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setNewCourse({ ...newCourse, color })}
                        className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${newCourse.color === color ? 'ring-4 ring-offset-2 scale-110 shadow-md' : 'hover:scale-110 border-2 border-transparent'}`}
                        style={{
                          backgroundColor: color,
                          ringColor: `${color}40`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-lg shadow-md transition-all">
                  {newCourse.id ? 'Save Changes' : 'Add to Timetable'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div
              className="h-24 relative p-6 flex justify-end"
              style={{ backgroundColor: selectedCourse.color }}
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-8 h-8 bg-black/10 hover:bg-black/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 pb-6 pt-2 relative">
              <div
                className="w-16 h-16 rounded-2xl bg-white shadow-lg absolute -top-8 flex items-center justify-center border-4 border-white"
              >
                <Calendar size={24} style={{ color: selectedCourse.color }} />
              </div>

              <div className="mt-10 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{selectedCourse.name}</h3>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <Calendar size={16} />
                    </div>
                    <span className="font-medium text-gray-900">{selectedCourse.day}s</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <Bell size={16} />
                    </div>
                    <span>{selectedCourse.startTime} - {selectedCourse.endTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <MapPin size={16} />
                    </div>
                    <span>{selectedCourse.location}</span>
                  </div>
                  {selectedCourse.lecturer && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <User size={16} />
                      </div>
                      <span>{selectedCourse.lecturer}</span>
                    </div>
                  )}
                  {selectedCourse.contact && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <Phone size={16} />
                      </div>
                      <span>{selectedCourse.contact}</span>
                    </div>
                  )}
                  {selectedCourse.creditHours && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <Target size={16} />
                      </div>
                      <span className="font-bold text-indigo-700">{selectedCourse.creditHours} Credit Hours</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    setNewCourse(selectedCourse);
                    setSelectedCourse(null);
                    setShowAddForm(true);
                  }}
                  className="flex-1 bg-indigo-200 border-2 border-indigo-100 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white text-indigo-600 py-3.5 rounded-2xl font-bold flex items-center justify-center transition-all shadow-sm"
                >
                  <Calendar size={18} className="mr-2" />
                  <span>Edit Details</span>
                </Button>
                <Button
                  onClick={() => handleDeleteCourse(selectedCourse.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center transition-colors shadow-sm"
                >
                  <Trash2 size={18} className="mr-2" />
                  <span>Remove Class</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TimetableBuilder;