import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import useProfile from '../../hooks/useProfile';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Plus, Trash2, Calendar, Bell, X, AlertCircle, User, Phone, Target, PartyPopper, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { CustomMapPin } from '../common/CustomMapPin';
import { Modal } from '../common/Modal';
import { DAYS_OF_WEEK } from '../../utils/constants';
import { requestNotificationPermission, isNotificationSupported } from '../../services/notificationService';
import { triggerAuthSheet } from '../onboarding/AuthModal';
import { getTodayHoliday } from '../../services/holidayService';
import { CustomEyes } from '../common/CustomIcons';
import { toast } from 'react-hot-toast';

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const TimetableBuilder = () => {
  const [courses, setCourses] = useLocalStorage('ucc_timetable', []);
  const [profile, setProfile] = useProfile(); // FIX C: Using useProfile instead of useLocalStorage
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [conflictError, setConflictError] = useState('');
  const [todayHoliday, setTodayHoliday] = useState(null);
  const [sharedTimetable, setSharedTimetable] = useState(null);
  const [selectedImportCourses, setSelectedImportCourses] = useState({});

  const handleShareTimetable = () => {
    if (displayCourses.length === 0) {
      toast.error("You don't have any classes to share in this semester!");
      return;
    }
    try {
      const payload = {
        senderName: profile?.name || '',
        senderCourse: profile?.course || '',
        level: activeLevel,
        semester: activeSemester,
        courses: displayCourses
      };
      const jsonStr = JSON.stringify(payload);
      const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
      const shareUrl = `${window.location.origin}/tools/timetable?shareTimetable=${base64}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success('Timetable share link copied to clipboard!');
      }).catch(() => {
        toast.error('Failed to copy link.');
      });
    } catch (e) {
      toast.error('Error generating share link.');
    }
  };

  const handleImportSharedCourses = () => {
    if (!sharedTimetable) return;
    const coursesToImport = sharedTimetable.courses.filter((_, idx) => selectedImportCourses[idx]);
    if (coursesToImport.length === 0) {
      toast.error('No courses selected to import.');
      return;
    }

    const newImported = coursesToImport.map(c => ({
      ...c,
      id: Date.now() + Math.random(),
      academic_year: sharedTimetable.level || activeLevel,
      semester: sharedTimetable.semester || activeSemester
    }));

    const existingKeys = new Set(courses.map(c => `${c.name}_${c.day}_${c.startTime}_${c.endTime}_${c.academic_year}_${c.semester}`));
    const nonDuplicates = newImported.filter(c => !existingKeys.has(`${c.name}_${c.day}_${c.startTime}_${c.endTime}_${c.academic_year}_${c.semester}`));

    if (nonDuplicates.length === 0) {
      toast.success('All selected courses are already in your timetable.');
    } else {
      setCourses(prev => [...prev, ...nonDuplicates]);
      toast.success(`Successfully imported ${nonDuplicates.length} course(s)!`);
    }

    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
    setSharedTimetable(null);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('shareTimetable');
    if (sharedData) {
      try {
        const decodedJson = decodeURIComponent(escape(atob(sharedData)));
        const parsed = JSON.parse(decodedJson);
        if (parsed && Array.isArray(parsed.courses)) {
          setSharedTimetable(parsed);
          const initialSelected = {};
          parsed.courses.forEach((c, idx) => {
            initialSelected[idx] = true;
          });
          setSelectedImportCourses(initialSelected);
        }
      } catch (err) {
        console.error('Failed to parse shared timetable', err);
      }
    }
  }, []);

  const TERMS = [
      '100_1', '100_2', '200_1', '200_2', '300_1', '300_2',
      '400_1', '400_2', '500_1', '500_2', '600_1', '600_2'
  ];

  // Derive active term from profile — profile is the source of truth
  const activeTerm = `${profile?.level || '100'}_${profile?.semester || '1'}`;
  const activeTermIndex = TERMS.indexOf(activeTerm) >= 0 ? TERMS.indexOf(activeTerm) : 0;
  const [activeLevel, activeSemester] = activeTerm.split('_');

  // ─── FIX A: BACKFILL: Patch existing courses that lack academic_year/semester ───
  useEffect(() => {
    const needsBackfill = courses.some(
      c => !c.academic_year || !c.semester
    );
    if (!needsBackfill) return;

    // We use the profile's current level/semester as the "best guess"
    // for orphaned courses. If profile isn't set, default to 100/1.
    const defaultYear = profile?.level || '100';
    const defaultSem  = profile?.semester || '1';

    const patched = courses.map(c => ({
      ...c,
      academic_year: c.academic_year || defaultYear,
      semester:      c.semester || defaultSem,
    }));

    setCourses(patched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Update profile when user navigates semesters via the toggle
  const setActiveTermIndex = (newIndex) => {
      const term = TERMS[newIndex];
      if (!term) return;
      const [level, semester] = term.split('_');
      setProfile(prev => ({ ...prev, level, semester }));
  };

  const displayCourses = useMemo(() => {
      return courses.filter(c => {
          // Because of backfill, all courses will have academic_year and semester now.
          const cTerm = `${c.academic_year}_${c.semester}`;
          return cTerm === activeTerm;
      });
  }, [courses, activeTerm]);

  const timetableRef = useRef(null);

  useEffect(() => {
    if (isNotificationSupported()) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
    getTodayHoliday().then(h => { if (h) setTodayHoliday(h); }).catch(() => {});
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
    creditHours: 3,
    academic_year: activeLevel,
    semester: activeSemester
  });

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ];

  const checkConflict = (courseToCheck) => {
    return displayCourses.find(course =>
      course.day === courseToCheck.day &&
      ((courseToCheck.startTime >= course.startTime && courseToCheck.startTime < course.endTime) ||
        (courseToCheck.endTime > course.startTime && courseToCheck.endTime <= course.endTime) ||
        (courseToCheck.startTime <= course.startTime && courseToCheck.endTime >= course.endTime))
    );
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    triggerAuthSheet(() => {
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

      // FIX B: Add missing semester fields on reset
      setNewCourse({
        name: '',
        day: 'Monday',
        startTime: '08:30',
        endTime: '09:30',
        location: '',
        color: colors[tempCourses.length % colors.length],
        lecturer: '',
        contact: '',
        creditHours: 3,
        academic_year: activeLevel,
        semester: activeSemester
      });
      
      setConflictError('');
      setShowAddForm(false);
    });
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    
    // Tombstone for sync
    try {
      const deleted = JSON.parse(localStorage.getItem('ucc_timetable_deleted') || '[]');
      if (!deleted.includes(id)) {
        deleted.push(id);
        localStorage.setItem('ucc_timetable_deleted', JSON.stringify(deleted));
      }
    } catch (e) {
      console.error('Error saving timetable tombstone:', e);
    }
    
    setSelectedCourse(null);
  };

  // Compute coursesByDay using displayCourses
  const coursesByDay = useMemo(() => {
    const acc = {};
    displayCourses.forEach(course => {
      if (!acc[course.day]) acc[course.day] = [];
      acc[course.day].push(course);
    });
    // Sort courses by start time
    Object.keys(acc).forEach(day => {
      acc[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
    return acc;
  }, [displayCourses]);

  return (
    <div className="pb-20">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-[#002F45] text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#002F45]" />
                My Timetable
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">Simple, unified schedule view.</p>
            </div>

            <div className="flex w-full sm:w-auto gap-2 flex-wrap">
              {!notificationsEnabled && isNotificationSupported() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEnableNotifications}
                  className="flex-1 sm:flex-none border-[#002F45]/20 text-[#002F45] hover:bg-[#002F45]/5"
                >
                  <Bell size={16} className="mr-2" />
                  Reminders
                </Button>
              )}
              {displayCourses.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareTimetable}
                  className="flex-1 sm:flex-none border-[#002F45]/20 text-[#002F45] hover:bg-[#002F45]/5"
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setConflictError('');
                  // FIX B: Add missing semester fields on reset
                  setNewCourse({
                    name: '',
                    day: 'Monday',
                    startTime: '08:30',
                    endTime: '09:30',
                    location: '',
                    color: colors[courses.length % colors.length],
                    lecturer: '',
                    contact: '',
                    creditHours: 3,
                    academic_year: activeLevel,
                    semester: activeSemester
                  });
                  setShowAddForm(true);
                }}
                className="flex-1 sm:flex-none bg-[#002F45] hover:bg-[#001a26] text-white shadow-md hover:shadow-lg transition-all"
              >
                <Plus size={16} className="mr-2" />
                Add
              </Button>
            </div>
          </div>
          
          {/* Semester Toggle UI */}
          <div className="flex items-center justify-center mt-6 bg-[#002F45]/5 rounded-2xl p-2 max-w-sm mx-auto border border-[#002F45]/10">
              <button 
                  onClick={() => setActiveTermIndex(Math.max(0, activeTermIndex - 1))}
                  disabled={activeTermIndex === 0}
                  className="p-2 rounded-xl text-[#002F45] hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                  <ChevronLeft size={20} />
              </button>
              
              <div className="flex-1 text-center flex flex-col">
                  <span className="text-sm font-black text-[#002F45]">Level {activeLevel}</span>
                  <span className="text-[10px] font-bold text-[#002F45]/60 uppercase tracking-widest">Semester {activeSemester}</span>
              </div>

              <button 
                  onClick={() => setActiveTermIndex(Math.min(TERMS.length - 1, activeTermIndex + 1))}
                  disabled={activeTermIndex === TERMS.length - 1}
                  className="p-2 rounded-xl text-[#002F45] hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                  <ChevronRight size={20} />
              </button>
          </div>
        </CardHeader>
        <CardContent>
          {todayHoliday && (
            <div className="mb-6 mt-6 p-4 bg-primary-50 border border-primary-100 rounded-2xl flex items-center justify-between shadow-sm">
              <div>
                <h3 className="font-bold text-primary-900 text-lg flex items-center gap-2">
                  <PartyPopper className="w-5 h-5 text-primary-600" /> Public Holiday: {todayHoliday.name}
                </h3>
                <p className="text-sm text-primary-700 font-medium mt-1 flex items-center">
                  No classes today unless your lecturer said so <CustomEyes size={16} className="inline ml-1" />
                </p>
              </div>
            </div>
          )}

          {/* Exportable Container */}
          <div ref={timetableRef} className="px-1 py-4 md:p-6 bg-slate-50/50 rounded-2xl">
            {displayCourses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-[#002F45]/5 text-[#002F45] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Your schedule is empty</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">Add your classes to stay organized and get reminders before they start.</p>
                <Button onClick={() => setShowAddForm(true)} className="bg-[#002F45] text-white hover:bg-[#001a26] shadow-md">
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
                        <span className="text-xs font-medium bg-gray-100 text-gray-500 py-1 px-3 rounded-full">
                          {dayCourses.length} class{dayCourses.length !== 1 ? 'es' : ''}
                        </span>
                      </h3>
                      <div className="space-y-4">
                        {dayCourses.map(course => (
                          <div
                            key={course.id}
                            onClick={() => setSelectedCourse(course)}
                            className="flex gap-4 group cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                          >
                            <div className="w-[5.5rem] flex flex-col justify-center items-end opacity-80 group-hover:opacity-100 transition-opacity">
                              <div className="text-sm font-bold text-gray-900">{formatTime12Hour(course.startTime)}</div>
                              <div className="text-xs text-gray-400 font-medium">{formatTime12Hour(course.endTime)}</div>
                            </div>
                            <div
                              className="flex-1 p-4 rounded-2xl relative overflow-hidden text-white border border-white/40 shadow-sm backdrop-blur-sm"
                              style={{ 
                                background: `linear-gradient(135deg, ${course.color}f2 0%, ${course.color}b3 100%)` 
                              }}
                            >
                              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
                              <div className="relative z-10 font-bold text-base drop-shadow-sm">{course.name}</div>
                              <div className="relative z-10 text-sm mt-1.5 flex items-center gap-1.5 font-medium opacity-90 drop-shadow-sm">
                                <CustomMapPin className="w-4 h-4 opacity-70" />
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
      <Modal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        title={newCourse.id ? 'Edit Class' : 'Add New Class'}
        size="lg"
      >
        <form onSubmit={handleAddCourse} className="space-y-5">
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
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-[#002F45] outline-none transition-all font-medium"
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
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-[#002F45] outline-none transition-all font-medium"
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
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-[#002F45] outline-none transition-all font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Contact (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 054... or email"
                  value={newCourse.contact || ''}
                  onChange={(e) => setNewCourse({ ...newCourse, contact: e.target.value })}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-[#002F45] outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Credit Hours</label>
                <select
                  value={newCourse.creditHours}
                  onChange={(e) => setNewCourse({ ...newCourse, creditHours: parseInt(e.target.value, 10) })}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-[#002F45] outline-none transition-all font-medium"
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
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-[#002F45] outline-none transition-all font-medium"
                >
                  {DAYS_OF_WEEK.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Start</label>
                  <input
                    type="time"
                    value={newCourse.startTime}
                    onChange={(e) => {
                      const newStart = e.target.value;
                      if (!newStart) {
                        setNewCourse({ ...newCourse, startTime: newStart });
                        return;
                      }
                      let [h, m] = newStart.split(':').map(Number);
                      h = (h + 2) % 24;
                      const newEnd = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                      setNewCourse({ ...newCourse, startTime: newStart, endTime: newEnd });
                    }}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-[#002F45] outline-none transition-all font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">End</label>
                  <input
                    type="time"
                    value={newCourse.endTime}
                    onChange={(e) => setNewCourse({ ...newCourse, endTime: e.target.value })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#002F45] focus:border-[#002F45] outline-none transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Color Tag</label>
              <div className="flex items-center gap-3 flex-wrap">
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
                <label className="relative w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-gray-200 hover:scale-110 transition-transform flex items-center justify-center" title="Custom color">
                  <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}></div>
                  <div className="absolute inset-[3px] rounded-full bg-white"></div>
                  <Plus size={14} className="text-gray-500 relative z-10" />
                  <input
                    type="color"
                    value={newCourse.color}
                    onChange={(e) => setNewCourse({ ...newCourse, color: e.target.value })}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="pt-2 pb-6">
            <Button type="submit" className="w-full bg-[#002F45] hover:bg-[#001a26] text-white py-3.5 rounded-2xl font-bold text-lg shadow-md transition-all">
              {newCourse.id ? 'Save Changes' : 'Add to Timetable'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Course Detail Modal */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title="Class Details"
        size="lg"
      >
        {selectedCourse && (
          <div className="relative pb-4">
            <div
              className="h-36 w-full rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden mb-6 shadow-xl"
              style={{ 
                background: `linear-gradient(135deg, ${selectedCourse.color || '#002F45'} 0%, ${selectedCourse.color || '#002F45'}dd 100%)`,
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-6 -mb-6 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
              
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 z-10 shadow-sm mb-3">
                <Calendar size={28} className="text-white drop-shadow-md" />
              </div>
              <h3 className="text-2xl font-black text-white text-center px-6 leading-tight z-10 drop-shadow-sm truncate w-full">
                {selectedCourse.name}
              </h3>
            </div>

            <div className="px-2">
              <div className="space-y-3">
                <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                    <Calendar size={18} className="text-[#002F45]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Day of week</span>
                    <span className="font-bold text-gray-900">{selectedCourse.day}s</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                    <Bell size={18} className="text-orange-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</span>
                    <span className="font-bold text-gray-900">{formatTime12Hour(selectedCourse.startTime)} - {formatTime12Hour(selectedCourse.endTime)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                    <CustomMapPin className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</span>
                    <span className="font-bold text-gray-900">{selectedCourse.location}</span>
                  </div>
                </div>

                {selectedCourse.lecturer && (
                  <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                      <User size={18} className="text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lecturer</span>
                      <span className="font-bold text-gray-900">{selectedCourse.lecturer}</span>
                    </div>
                  </div>
                )}

                {selectedCourse.contact && (
                  <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                      <Phone size={18} className="text-purple-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</span>
                      <span className="font-bold text-gray-900">{selectedCourse.contact}</span>
                    </div>
                  </div>
                )}

                {selectedCourse.creditHours && (
                  <div className="flex items-center gap-4 bg-[#002F45]/5 p-3.5 rounded-2xl border border-[#002F45]/10 hover:bg-[#002F45]/10 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-[#002F45]/10 group-hover:scale-105 transition-transform">
                      <Target size={18} className="text-[#002F45]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#002F45]/60 uppercase tracking-widest">Weight</span>
                      <span className="font-black text-[#002F45]">{selectedCourse.creditHours} Credit Hours</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setNewCourse(selectedCourse);
                    setSelectedCourse(null);
                    setShowAddForm(true);
                  }}
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md active:scale-95"
                >
                  <Calendar size={18} className="mr-2" />
                  <span>Edit Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCourse(selectedCourse.id)}
                  className="flex-1 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center transition-colors shadow-sm active:scale-95"
                >
                  <Trash2 size={18} className="mr-2" />
                  <span>Remove Class</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Import Shared Timetable Modal */}
      <Modal
        isOpen={!!sharedTimetable}
        onClose={() => setSharedTimetable(null)}
        title="Import Shared Timetable"
        size="lg"
      >
        {sharedTimetable && (
          <div className="space-y-6">
            <div className="p-5 bg-gradient-to-r from-[#002F45]/10 to-primary-50 rounded-2xl border border-[#002F45]/10">
              <h3 className="font-extrabold text-[#002F45] text-lg">
                {sharedTimetable.senderName ? `${sharedTimetable.senderName}'s Timetable` : 'Shared Timetable'}
              </h3>
              {sharedTimetable.senderCourse && (
                <p className="text-sm font-semibold text-gray-600 mt-1">{sharedTimetable.senderCourse}</p>
              )}
              <div className="flex gap-2 mt-3">
                <span className="text-xs font-bold bg-[#002F45]/10 text-[#002F45] px-3 py-1 rounded-full uppercase tracking-wider">
                  Level {sharedTimetable.level}
                </span>
                <span className="text-xs font-bold bg-[#002F45]/10 text-[#002F45] px-3 py-1 rounded-full uppercase tracking-wider">
                  Semester {sharedTimetable.semester}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                Select courses to import ({sharedTimetable.courses.length} found):
              </label>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {sharedTimetable.courses.map((course, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedImportCourses(prev => ({
                        ...prev,
                        [idx]: !prev[idx]
                      }));
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedImportCourses[idx]
                        ? 'border-[#002F45] bg-[#002F45]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedImportCourses[idx]}
                      onChange={() => {}} // handled by parent div click
                      className="w-4.5 h-4.5 text-[#002F45] border-gray-300 rounded focus:ring-[#002F45]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 truncate">{course.name}</div>
                      <div className="text-xs font-semibold text-gray-500 mt-0.5">
                        {course.day}s, {formatTime12Hour(course.startTime)} - {formatTime12Hour(course.endTime)}
                      </div>
                      {course.location && (
                        <div className="text-[11px] font-medium text-gray-400 mt-0.5">
                          Location: {course.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSharedTimetable(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSharedCourses}
                className="flex-1 bg-[#002F45] hover:bg-[#001a26] text-white py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95"
              >
                Import Selected
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default TimetableBuilder;