import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import useProfile from '../../hooks/useProfile';
import { Card, CardContent, CardHeader } from '../common/Card';
import { Plus } from 'lucide-react';
import { Button } from '../common/Button';
import { requestNotificationPermission, isNotificationSupported } from '../../services/notificationService';
import { triggerAuthSheet } from '../onboarding/AuthModal';
import { getTodayHoliday } from '../../services/holidayService';
import { toast } from 'react-hot-toast';
import { pushTimetableToCloud } from '../../services/syncService';
import VenueConflictAdvisor from './VenueConflictAdvisor';
import SemesterToggle from '../timetable/SemesterToggle';
import TimetableHeader from '../timetable/TimetableHeader';
import HolidayBanner from '../timetable/HolidayBanner';
import MobileDayFilter from '../timetable/MobileDayFilter';
import TimetableDayCard from '../timetable/TimetableDayCard';
import AddCourseModal from '../timetable/AddCourseModal';
import CourseDetailModal from '../timetable/CourseDetailModal';
import ImportTimetableModal from '../timetable/ImportTimetableModal';
import TimetableCalendarView from '../timetable/TimetableCalendarView';

const TERMS = ['100_1','100_2','200_1','200_2','300_1','300_2','400_1','400_2','500_1','500_2','600_1','600_2'];
const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4','#84cc16','#f97316','#6366f1'];

const TimetableBuilder = () => {
  const [courses, setCourses] = useLocalStorage('ucc_timetable', []);
  const [profile, setProfile] = useProfile();
  const [showAddForm, setShowAddForm] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [conflictError, setConflictError] = useState('');
  const [todayHoliday, setTodayHoliday] = useState(null);
  const [sharedTimetable, setSharedTimetable] = useState(null);
  const [selectedImportCourses, setSelectedImportCourses] = useState({});
  const [examMode, setExamMode] = useLocalStorage('ucc_exam_mode', false);
  const [viewMode, setViewMode] = useLocalStorage('ucc_timetable_view_mode', 'list');
  const getTodayName = () => new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const getTodayDateLabel = () => new Intl.DateTimeFormat('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
  const [selectedDayFilter, setSelectedDayFilter] = useState(() => getTodayName());

  const activeTerm = `${profile?.level || '100'}_${profile?.semester || '1'}`;
  const activeTermIndex = TERMS.indexOf(activeTerm) >= 0 ? TERMS.indexOf(activeTerm) : 0;
  const [activeLevel, activeSemester] = activeTerm.split('_');

  const setActiveTermIndex = (newIndex) => {
    const term = TERMS[newIndex];
    if (!term) return;
    const [level, semester] = term.split('_');
    setProfile(prev => ({ ...prev, level, semester }));
  };

  const displayCourses = useMemo(() => courses.filter(c => `${c.academic_year || '100'}_${c.semester || '1'}` === activeTerm), [courses, activeTerm]);

  const timetableRef = useRef(null);

  const [newCourse, setNewCourse] = useState({
    name: '', day: 'Monday', startTime: '08:30', endTime: '09:30', location: '',
    color: '#3b82f6', lecturer: '', contact: '', targetGrade: '', creditHours: 3,
    academic_year: activeLevel, semester: activeSemester
  });

  useEffect(() => { pushTimetableToCloud(); }, [courses]);

  useEffect(() => {
    if (isNotificationSupported()) setNotificationsEnabled(Notification.permission === 'granted');
    getTodayHoliday().then(h => { if (h) setTodayHoliday(h); }).catch(() => {});
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('shareTimetable');
    if (sharedData) {
      try {
        const decodedJson = decodeURIComponent(escape(atob(sharedData)));
        const parsed = JSON.parse(decodedJson);
        if (parsed && Array.isArray(parsed.courses)) {
          setSharedTimetable(parsed);
          const initial = {};
          parsed.courses.forEach((_, idx) => { initial[idx] = true; });
          setSelectedImportCourses(initial);
        }
      } catch (err) { console.error('Failed to parse shared timetable', err); }
    }
  }, []);

  useEffect(() => {
    setNewCourse(prev => ({ ...prev, academic_year: activeLevel, semester: activeSemester }));
  }, [activeLevel, activeSemester]);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
    if (granted) new Notification('Reminders Enabled', { body: 'You will be notified 30 minutes before your classes.' });
  };

  const handleShareTimetable = () => {
    if (displayCourses.length === 0) { toast.error("You don't have any classes to share in this semester!"); return; }
    try {
      const payload = { senderName: profile?.name || '', senderCourse: profile?.course || '', level: activeLevel, semester: activeSemester, courses: displayCourses };
      const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      navigator.clipboard.writeText(`${window.location.origin}/tools/timetable?shareTimetable=${base64}`).then(() => toast.success('Timetable share link copied to clipboard!')).catch(() => toast.error('Failed to copy link.'));
    } catch (e) { toast.error('Error generating share link.'); }
  };

  const handleImportSharedCourses = () => {
    if (!sharedTimetable) return;
    const toImport = sharedTimetable.courses.filter((_, idx) => selectedImportCourses[idx]);
    if (toImport.length === 0) { toast.error('No courses selected to import.'); return; }
    const newImported = toImport.map(c => ({ ...c, id: Date.now() + Math.random(), academic_year: sharedTimetable.level || activeLevel, semester: sharedTimetable.semester || activeSemester }));
    const existingKeys = new Set(courses.map(c => `${c.name}_${c.day}_${c.startTime}_${c.endTime}_${c.academic_year}_${c.semester}`));
    const nonDuplicates = newImported.filter(c => !existingKeys.has(`${c.name}_${c.day}_${c.startTime}_${c.endTime}_${c.academic_year}_${c.semester}`));
    if (nonDuplicates.length === 0) toast.success('All selected courses are already in your timetable.');
    else { setCourses(prev => [...prev, ...nonDuplicates]); toast.success(`Successfully imported ${nonDuplicates.length} course(s)!`); }
    window.history.replaceState({}, document.title, window.location.pathname);
    setSharedTimetable(null);
  };

  const checkConflict = (courseToCheck, coursesList) => {
    return (coursesList || displayCourses).find(c => c.day === courseToCheck.day && (
      (courseToCheck.startTime >= c.startTime && courseToCheck.startTime < c.endTime) ||
      (courseToCheck.endTime > c.startTime && courseToCheck.endTime <= c.endTime) ||
      (courseToCheck.startTime <= c.startTime && courseToCheck.endTime >= c.endTime)
    ));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    triggerAuthSheet(() => {
      if (!newCourse.name || !newCourse.location) { setConflictError('Please enter a course name and location.'); return; }
      if (newCourse.startTime >= newCourse.endTime) { setConflictError('End time must be after start time.'); return; }
      const tempCourses = newCourse.id ? displayCourses.filter(c => c.id !== newCourse.id) : displayCourses;
      const conflict = checkConflict(newCourse, tempCourses);
      if (conflict) { setConflictError(`Time conflict with ${conflict.name}`); return; }
      if (newCourse.id) setCourses(courses.map(c => c.id === newCourse.id ? newCourse : c));
      else setCourses([...courses, { ...newCourse, id: Date.now() }]);
      setNewCourse({ name: '', day: 'Monday', startTime: '08:30', endTime: '09:30', location: '', color: colors[tempCourses.length % colors.length], lecturer: '', contact: '', creditHours: 3, academic_year: activeLevel, semester: activeSemester });
      setConflictError('');
      setShowAddForm(false);
    });
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    try {
      const deleted = JSON.parse(localStorage.getItem('ucc_timetable_deleted') || '[]');
      if (!deleted.includes(id)) { deleted.push(id); localStorage.setItem('ucc_timetable_deleted', JSON.stringify(deleted)); }
    } catch (e) { console.error('Error saving timetable tombstone:', e); }
    setSelectedCourse(null);
  };

  const resetAddForm = () => {
    setConflictError('');
    setNewCourse({ name: '', day: 'Monday', startTime: '08:30', endTime: '09:30', location: '', color: colors[courses.length % colors.length], lecturer: '', contact: '', creditHours: 3, academic_year: activeLevel, semester: activeSemester });
    setShowAddForm(true);
  };

  const openEditForm = (course) => {
    setNewCourse(course);
    setSelectedCourse(null);
    setShowAddForm(true);
  };

  const coursesByDay = useMemo(() => {
    const acc = {};
    displayCourses.forEach(course => {
      if (!acc[course.day]) acc[course.day] = [];
      acc[course.day].push(course);
    });
    Object.keys(acc).forEach(day => { acc[day].sort((a, b) => a.startTime.localeCompare(b.startTime)); });
    return acc;
  }, [displayCourses]);

  const todayName = useMemo(() => getTodayName(), []);
  const todayDateLabel = useMemo(() => getTodayDateLabel(), []);
  const orderedDays = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (selectedDayFilter === 'All') return [todayName, ...days.filter(day => day !== todayName)];
    return [selectedDayFilter, ...days.filter(day => day !== selectedDayFilter)];
  }, [selectedDayFilter, todayName]);

  const daysToRender = selectedDayFilter === 'All' ? orderedDays : [selectedDayFilter];

  return (
    <div className="pb-20">
      <Card>
        <CardHeader>
          <TimetableHeader examMode={examMode} onToggleExamMode={() => setExamMode(!examMode)} notificationsEnabled={notificationsEnabled} onEnableNotifications={handleEnableNotifications} displayCourses={displayCourses} onShare={handleShareTimetable} onAdd={resetAddForm} viewMode={viewMode} onViewModeChange={setViewMode} />
          <SemesterToggle activeTerm={activeTerm} activeTermIndex={activeTermIndex} onTermChange={setActiveTermIndex} />
        </CardHeader>
        <CardContent>
          {todayHoliday && <HolidayBanner holiday={todayHoliday} />}
          <VenueConflictAdvisor courses={displayCourses} />
          <div ref={timetableRef} className="px-1 py-4 md:p-6 bg-slate-50/50 rounded-2xl">
            {displayCourses.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-900/5 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Your schedule is empty</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">Add your classes to stay organized and get reminders before they start.</p>
                <Button onClick={resetAddForm} className="bg-gray-900 text-white hover:bg-gray-900 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add First Class
                </Button>
              </div>
            ) : (
              <div className="flex flex-col">
                {viewMode === 'calendar' ? (
                  <TimetableCalendarView courses={displayCourses} onSelectCourse={(c) => setSelectedCourse(c)} />
                ) : (
                  <>
                    <MobileDayFilter selectedDayFilter={selectedDayFilter} onChange={setSelectedDayFilter} />
                    <div className="mb-5 rounded-[28px] border border-primary-100 bg-gradient-to-r from-primary-50 via-white to-primary-50 p-4 shadow-sm sm:p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500">Schedule</p>
                          <h3 className="text-xl font-black text-slate-900">
                            {selectedDayFilter === 'All' ? 'Your week overview' : `${selectedDayFilter}'s classes`}
                          </h3>
                        </div>
                        <div className="rounded-full border border-primary-200 bg-white px-3 py-2 text-sm font-semibold text-primary-700 shadow-sm">
                          {todayDateLabel}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        {selectedDayFilter === 'All'
                          ? 'Today is highlighted first and the rest of the week follows behind it.'
                          : `Showing classes for ${selectedDayFilter}. Tap another day to switch.`}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                      {daysToRender.map(day => (
                        <TimetableDayCard key={day} day={day} courses={coursesByDay[day]} selectedDayFilter={selectedDayFilter} onSelectCourse={(c) => setSelectedCourse(c)} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddCourseModal isOpen={showAddForm} onClose={() => setShowAddForm(false)} newCourse={newCourse} onChange={setNewCourse} onSubmit={handleAddCourse} conflictError={conflictError} />
      <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} onEdit={() => openEditForm(selectedCourse)} onDelete={handleDeleteCourse} />
      <ImportTimetableModal sharedTimetable={sharedTimetable} onClose={() => setSharedTimetable(null)} selectedImportCourses={selectedImportCourses} onToggleCourse={(idx) => setSelectedImportCourses(prev => ({ ...prev, [idx]: !prev[idx] }))} onImport={handleImportSharedCourses} />
    </div>
  );
};

export default TimetableBuilder;
