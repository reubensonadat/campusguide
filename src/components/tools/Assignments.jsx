import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, ChevronRight, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ExamCountdown from './ExamCountdown';
import {
  getAssignments, addAssignment, updateAssignment,
  deleteAssignment, markAssignmentStatus, getAssignmentsByUrgency,
  getUniqueCourses, getAssignmentCounts, getAssignmentsForMonth,
  saveAssignments, getAssignmentsBySemester, backfillAssignmentsSemester
} from '../../services/assignmentService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import useProfile from '../../hooks/useProfile';
import { TERMS, STATUS_STYLES } from './assignmentsConstants';
import SearchFilterBar from './SearchFilterBar';
import ListView from './ListView';
import CalendarView from './CalendarView';
import AssignmentModal from './AssignmentModal';
import ImportDeadlineModal from './ImportDeadlineModal';

const Assignments = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useProfile();
  const [timetable] = useLocalStorage('ucc_timetable', []);
  const [assignments, setAssignments] = useState(() => getAssignments());
  const [viewMode, setViewMode] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [sharedDeadline, setSharedDeadline] = useState(null);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [selectedCalDate, setSelectedCalDate] = useState(null);

  const refresh = useCallback(() => setAssignments(getAssignments()), []);

  useEffect(() => { backfillAssignmentsSemester(); refresh(); }, [refresh]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('shareDeadline');
    if (sharedData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(escape(atob(sharedData))));
        if (parsed?.title) setSharedDeadline(parsed);
      } catch (err) { console.error('Failed to parse shared deadline', err); }
    }
  }, []);

  const activeTerm = `${profile?.level || '100'}_${profile?.semester || '1'}`;
  const activeTermIndex = TERMS.indexOf(activeTerm) >= 0 ? TERMS.indexOf(activeTerm) : 0;
  const [activeLevel, activeSemester] = activeTerm.split('_');

  const setActiveTermIndex = (newIndex) => {
    const term = TERMS[newIndex];
    if (!term) return;
    const [level, semester] = term.split('_');
    setProfile(prev => ({ ...prev, level, semester }));
  };

  const semesterAssignments = useMemo(() => getAssignmentsBySemester(assignments, activeLevel, activeSemester), [assignments, activeLevel, activeSemester]);
  const courses = useMemo(() => getUniqueCourses(semesterAssignments), [semesterAssignments]);
  const counts = useMemo(() => getAssignmentCounts(semesterAssignments), [semesterAssignments]);
  const urgencyMap = useMemo(() => getAssignmentsByUrgency(semesterAssignments), [semesterAssignments]);

  const filteredAssignments = useMemo(() => {
    let result = [...semesterAssignments];
    if (filterStatus !== 'all') result = result.filter(a => a.status === filterStatus);
    if (filterCourse !== 'all') result = result.filter(a => a.course === filterCourse);
    if (filterPriority !== 'all') result = result.filter(a => a.priority === filterPriority);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => a.title.toLowerCase().includes(q) || (a.course?.toLowerCase().includes(q)) || (a.notes?.toLowerCase().includes(q)));
    }
    return result.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (b.status === 'pending' && a.status !== 'pending') return 1;
      return a.dueDate.localeCompare(b.dueDate) || (a.dueTime || '').localeCompare(b.dueTime || '');
    });
  }, [semesterAssignments, filterStatus, filterCourse, filterPriority, searchQuery]);

  const calendarMap = useMemo(() => getAssignmentsForMonth(semesterAssignments, calYear, calMonth + 1), [semesterAssignments, calYear, calMonth]);

  const timetableCourses = useMemo(() => {
    const courseSet = new Set(timetable.map(c => c.courseName || c.name).filter(Boolean));
    return Array.from(courseSet).sort();
  }, [timetable]);

  const activeFilterCount = [filterStatus, filterCourse, filterPriority].filter(f => f !== 'all').length;

  const handleDelete = (id) => {
    const assignment = assignments.find(a => a.id === id);
    if (!assignment) return;
    deleteAssignment(id);
    refresh();
    toast(t => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-900">Assignment deleted</span>
        <button onClick={() => { const c = getAssignments(); c.push(assignment); saveAssignments(c); refresh(); toast.dismiss(t.id); toast.success('Assignment restored!'); }} className="text-xs font-bold text-primary-400 bg-primary-400/10 px-3 py-1 rounded-lg hover:bg-primary-400/20">Undo</button>
      </div>
    ), { duration: 5000, icon: '🗑️', style: { borderRadius: '12px', padding: '12px 16px' } });
  };

  const handleStatusChange = (id, newStatus) => {
    const assignment = assignments.find(a => a.id === id);
    const oldStatus = assignment?.status || 'pending';
    markAssignmentStatus(id, newStatus);
    refresh();
    toast(t => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-900">Marked as {STATUS_STYLES[newStatus]?.label || newStatus}</span>
        <button onClick={() => { markAssignmentStatus(id, oldStatus); refresh(); toast.dismiss(t.id); toast.success('Status reverted!'); }} className="text-xs font-bold text-primary-400 bg-primary-400/10 px-3 py-1 rounded-lg hover:bg-primary-400/20">Undo</button>
      </div>
    ), { duration: 4000, icon: newStatus === 'submitted' ? '✅' : newStatus === 'late' ? '⏰' : '📌', style: { borderRadius: '12px', padding: '12px 16px' } });
  };

  const handleSave = (data) => {
    const payload = { ...data, type: data.type || 'assignment', academic_year: activeLevel, semester: activeSemester };
    if (editingAssignment) { updateAssignment(editingAssignment.id, payload); toast.success('Assignment updated'); }
    else { addAssignment(payload); toast.success('Assignment added!'); }
    refresh();
    setShowAddModal(false);
    setEditingAssignment(null);
  };

  const handleShareDeadline = (a) => {
    try {
      const payload = { title: a.title, course: a.course, dueDate: a.dueDate, dueTime: a.dueTime, priority: a.priority, notes: a.notes, level: activeLevel, semester: activeSemester, senderName: profile?.name || '' };
      const base64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
      navigator.clipboard.writeText(`${window.location.origin}/tools/assignments?shareDeadline=${base64}`)
        .then(() => toast.success('Deadline share link copied to clipboard!')).catch(() => toast.error('Failed to copy link.'));
    } catch { toast.error('Error generating share link.'); }
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pb-28">
      <div className="max-w-3xl mx-auto px-3 sm:px-5 pt-4 sm:pt-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button onClick={() => navigate('/tools')} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 active:scale-95">
              <ChevronLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">Deadlines & Assignments</h1>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Track deadlines. Never miss a submission.</p>
            </div>
          </div>
          <button onClick={() => { setEditingAssignment(null); setShowAddModal(true); }} className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg active:scale-95">
            <Plus size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center mb-6 bg-white rounded-2xl p-2 max-w-sm mx-auto shadow-sm border border-gray-100">
          <button onClick={() => setActiveTermIndex(Math.max(0, activeTermIndex - 1))} disabled={activeTermIndex === 0} className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-black text-gray-900">Level {activeLevel}</span>
            <span className="text-[10px] font-bold text-gray-900/60 uppercase tracking-widest block">Semester {activeSemester}</span>
          </div>
          <button onClick={() => setActiveTermIndex(Math.min(TERMS.length - 1, activeTermIndex + 1))} disabled={activeTermIndex === TERMS.length - 1} className="p-2 rounded-xl text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {[
            { label: 'Pending', count: counts.pending, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Submitted', count: counts.submitted, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Late', count: counts.late, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Missed', count: counts.missed, color: 'text-red-600', bg: 'bg-red-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-2 sm:p-3 text-center`}>
              <p className={`text-base sm:text-lg font-black ${s.color}`}>{s.count}</p>
              <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {urgencyMap.overdue.length > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={18} className="text-red-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-red-800">{urgencyMap.overdue.length} overdue assignment{urgencyMap.overdue.length > 1 ? 's' : ''}</p>
                <p className="text-[10px] sm:text-xs text-red-600 font-medium">Submit or mark their status.</p>
              </div>
            </div>
            <button onClick={() => setFilterStatus('pending')} className="text-[10px] sm:text-xs font-bold text-red-700 bg-red-100 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg active:scale-95 flex-shrink-0">View</button>
          </div>
        )}

        <SearchFilterBar
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          showFilters={showFilters} setShowFilters={setShowFilters}
          activeFilterCount={activeFilterCount} viewMode={viewMode} setViewMode={setViewMode}
          filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          filterCourse={filterCourse} setFilterCourse={setFilterCourse}
          filterPriority={filterPriority} setFilterPriority={setFilterPriority}
          courses={courses}
        />

        {viewMode === 'list' && (
          <ListView
            urgencyMap={urgencyMap} filteredAssignments={filteredAssignments}
            filterStatus={filterStatus} searchQuery={searchQuery}
            activeFilterCount={activeFilterCount} activeLevel={activeLevel} activeSemester={activeSemester}
            onStatusChange={handleStatusChange}
            onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
            onDelete={handleDelete} onShare={handleShareDeadline}
            onAddNew={() => { setEditingAssignment(null); setShowAddModal(true); }}
          />
        )}

        {viewMode === 'calendar' && (
          <CalendarView
            calYear={calYear} calMonth={calMonth}
            onPrevMonth={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}
            onNextMonth={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }}
            calendarMap={calendarMap} semesterAssignments={semesterAssignments}
            selectedCalDate={selectedCalDate} onSelectDate={setSelectedCalDate}
            onStatusChange={handleStatusChange}
            onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
            onDelete={handleDelete} onShare={handleShareDeadline}
          />
        )}

        {viewMode === 'countdown' && <ExamCountdown />}
      </div>

      {showAddModal && (
        <AssignmentModal
          assignment={editingAssignment}
          courses={[...new Set([...timetableCourses, ...courses])]}
          onSave={handleSave}
          onClose={() => { setShowAddModal(false); setEditingAssignment(null); }}
        />
      )}

      <ImportDeadlineModal
        sharedDeadline={sharedDeadline}
        onClose={() => setSharedDeadline(null)}
        onImport={() => {
          handleSave({ title: sharedDeadline.title, course: sharedDeadline.course, dueDate: sharedDeadline.dueDate, dueTime: sharedDeadline.dueTime, priority: sharedDeadline.priority, notes: sharedDeadline.notes, status: 'pending' });
          window.history.replaceState({}, document.title, window.location.pathname);
          setSharedDeadline(null);
        }}
      />
    </div>
  );
};

export default Assignments;
