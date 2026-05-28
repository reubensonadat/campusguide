import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Plus, Filter, Calendar as CalendarIcon, List,
  Clock, AlertTriangle, CheckCircle2, Circle, Trash2, Edit3,
  ChevronRight, X, Search, ChevronDown, BookOpen
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  getAssignments, addAssignment, updateAssignment,
  deleteAssignment, markAssignmentStatus, getAssignmentsByUrgency,
  getUniqueCourses, getAssignmentCounts, getAssignmentsForMonth,
  getAssignmentsForDate, saveAssignments
} from '../../services/assignmentService';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// ── Constants ──────────────────────────────────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const PRIORITY_STYLES = {
  high:   { bg: 'bg-red-50',  border: 'border-red-100',  text: 'text-red-700',  dot: 'bg-red-500',  label: 'High' },
  medium: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Medium' },
  low:    { bg: 'bg-blue-50',  border: 'border-blue-100',  text: 'text-blue-700',  dot: 'bg-blue-500',  label: 'Low' },
};

const STATUS_STYLES = {
  pending:   { bg: 'bg-slate-50',  border: 'border-slate-200', text: 'text-slate-600', icon: Circle,        label: 'Pending' },
  submitted: { bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-700', icon: CheckCircle2,   label: 'Submitted' },
  late:      { bg: 'bg-orange-50', border: 'border-orange-200',text: 'text-orange-700',icon: AlertTriangle,  label: 'Late' },
  missed:    { bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-700',   icon: X,              label: 'Missed' },
};

const URGENCY_LABELS = {
  overdue: { label: 'Overdue', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
  today:   { label: 'Due Today', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  thisWeek:{ label: 'This Week', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  later:   { label: 'Later', color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100' },
};

// ── Helper ──────────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < -1) return `${Math.abs(diff)} days ago`;

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
};

const formatTime12 = (time24) => {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
};

// ── Course Combobox (searchable select) ─────────────────────────────────────────
const CourseCombobox = ({ value, onChange, courses = [], placeholder = 'Search or type a course...' }) => {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  // Sync external value changes
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return courses;
    const q = query.toLowerCase();
    return courses.filter(c => c.toLowerCase().includes(q));
  }, [courses, query]);

  const handleSelect = (course) => {
    setQuery(course);
    onChange(course);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setIsOpen(true);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(i => Math.min(i + 1, filteredCourses.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredCourses[highlightedIndex]) {
      e.preventDefault();
      handleSelect(filteredCourses[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current && listRef.current.children[highlightedIndex]) {
      listRef.current.children[highlightedIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const showCreateOption = query.trim() && !courses.some(c => c.toLowerCase() === query.trim().toLowerCase());

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <BookOpen size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm font-medium transition-all outline-none placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={() => { setIsOpen(!isOpen); inputRef.current?.focus(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {isOpen && (filteredCourses.length > 0 || showCreateOption) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-48 overflow-y-auto py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {filteredCourses.map((course, index) => (
            <button
              key={course}
              type="button"
              onClick={() => handleSelect(course)}
              className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                index === highlightedIndex ? 'bg-[#6EABC6]/10 text-[#002F45]' : 'text-gray-700 hover:bg-gray-50'
              } ${course === value ? 'bg-[#6EABC6]/5 font-bold' : ''}`}
            >
              <span className="flex items-center gap-2">
                {course === value && <CheckCircle2 size={12} className="text-[#6EABC6]" />}
                {course}
              </span>
            </button>
          ))}
          {showCreateOption && (
            <button
              type="button"
              onClick={() => handleSelect(query.trim())}
              className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                filteredCourses.length === highlightedIndex ? 'bg-[#6EABC6]/10 text-[#002F45]' : 'text-[#6EABC6] hover:bg-[#6EABC6]/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <Plus size={12} />
                Use "{query.trim()}"
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ── Component ───────────────────────────────────────────────────────────────────

const Assignments = () => {
  const navigate = useNavigate();
  const [timetable] = useLocalStorage('ucc_timetable', []);

  // ── State ──────────────────────────────────────────────────────────────────
  const [assignments, setAssignments] = useState(() => getAssignments());
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Calendar state
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [selectedCalDate, setSelectedCalDate] = useState(null);

  // Refresh from localStorage
  const refresh = useCallback(() => setAssignments(getAssignments()), []);

  // ── Derived data ───────────────────────────────────────────────────────────
  const courses = useMemo(() => getUniqueCourses(assignments), [assignments]);
  const counts = useMemo(() => getAssignmentCounts(assignments), [assignments]);
  const urgencyMap = useMemo(() => getAssignmentsByUrgency(assignments), [assignments]);

  // Filtered assignments
  const filteredAssignments = useMemo(() => {
    let result = [...assignments];

    if (filterStatus !== 'all') result = result.filter(a => a.status === filterStatus);
    if (filterCourse !== 'all') result = result.filter(a => a.course === filterCourse);
    if (filterPriority !== 'all') result = result.filter(a => a.priority === filterPriority);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        (a.course && a.course.toLowerCase().includes(q)) ||
        (a.notes && a.notes.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (b.status === 'pending' && a.status !== 'pending') return 1;
      return a.dueDate.localeCompare(b.dueDate) || (a.dueTime || '').localeCompare(b.dueTime || '');
    });
  }, [assignments, filterStatus, filterCourse, filterPriority, searchQuery]);

  // Calendar data
  const calendarMap = useMemo(() => getAssignmentsForMonth(assignments, calYear, calMonth + 1), [assignments, calYear, calMonth]);

  // ── Handlers with undo toasts ──────────────────────────────────────────────

  const handleDelete = (id) => {
    // Snapshot the assignment before deleting
    const assignment = assignments.find(a => a.id === id);
    if (!assignment) return;

    deleteAssignment(id);
    refresh();

    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-900">Assignment deleted</span>
        <button
          onClick={() => {
            // Undo: re-add the assignment
            const current = getAssignments();
            current.push(assignment);
            saveAssignments(current);
            refresh();
            toast.dismiss(t.id);
            toast.success('Assignment restored!');
          }}
          className="text-xs font-bold text-[#6EABC6] bg-[#6EABC6]/10 px-3 py-1 rounded-lg hover:bg-[#6EABC6]/20 transition-colors flex-shrink-0"
        >
          Undo
        </button>
      </div>
    ), {
      duration: 5000,
      icon: '🗑️',
      style: { borderRadius: '12px', padding: '12px 16px' },
    });
  };

  const handleStatusChange = (id, newStatus) => {
    // Snapshot the old status
    const assignment = assignments.find(a => a.id === id);
    const oldStatus = assignment?.status || 'pending';

    markAssignmentStatus(id, newStatus);
    refresh();

    const statusLabel = STATUS_STYLES[newStatus]?.label || newStatus;

    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-gray-900">Marked as {statusLabel}</span>
        <button
          onClick={() => {
            // Undo: revert to old status
            markAssignmentStatus(id, oldStatus);
            refresh();
            toast.dismiss(t.id);
            toast.success('Status reverted!');
          }}
          className="text-xs font-bold text-[#6EABC6] bg-[#6EABC6]/10 px-3 py-1 rounded-lg hover:bg-[#6EABC6]/20 transition-colors flex-shrink-0"
        >
          Undo
        </button>
      </div>
    ), {
      duration: 4000,
      icon: newStatus === 'submitted' ? '✅' : newStatus === 'late' ? '⏰' : '📌',
      style: { borderRadius: '12px', padding: '12px 16px' },
    });
  };

  const handleSave = (data) => {
    if (editingAssignment) {
      updateAssignment(editingAssignment.id, data);
      toast.success('Assignment updated');
    } else {
      addAssignment(data);
      toast.success('Assignment added!');
    }
    refresh();
    setShowAddModal(false);
    setEditingAssignment(null);
  };

  // Calendar navigation
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  // Get timetable courses for the course dropdown
  const timetableCourses = useMemo(() => {
    const courseSet = new Set(timetable.map(c => c.courseName || c.name).filter(Boolean));
    return Array.from(courseSet).sort();
  }, [timetable]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/30 pb-28">
      <div className="max-w-3xl mx-auto px-5 pt-6">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/tools')} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors active:scale-95">
              <ChevronLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">Assignments</h1>
              <p className="text-xs text-gray-500 font-medium">Track deadlines. Never miss a submission.</p>
            </div>
          </div>
          <button
            onClick={() => { setEditingAssignment(null); setShowAddModal(true); }}
            className="w-10 h-10 rounded-xl bg-[#002F45] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* ── Quick Stats ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { label: 'Pending', count: counts.pending, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Submitted', count: counts.submitted, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Late', count: counts.late, color: 'text-orange-600', bg: 'bg-orange-50' },
            { label: 'Missed', count: counts.missed, color: 'text-red-600', bg: 'bg-red-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
              <p className={`text-lg font-black ${s.color}`}>{s.count}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Urgent Banner ─────────────────────────────────────────────── */}
        {urgencyMap.overdue.length > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-red-800">{urgencyMap.overdue.length} overdue assignment{urgencyMap.overdue.length > 1 ? 's' : ''}</p>
                <p className="text-xs text-red-600 font-medium">Submit or mark their status.</p>
              </div>
            </div>
            <button onClick={() => setFilterStatus('pending')} className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
              View
            </button>
          </div>
        )}

        {/* ── Search & Filter Bar ───────────────────────────────────────── */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-[#6EABC6] focus:ring-2 focus:ring-[#6EABC6]/10 transition-all placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${showFilters ? 'bg-[#002F45] text-white border-[#002F45]' : 'bg-white border-gray-100 text-gray-500'}`}
            >
              <Filter size={16} />
            </button>
            <div className="flex bg-white border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2.5 text-xs font-bold transition-colors ${viewMode === 'list' ? 'bg-[#002F45] text-white' : 'text-gray-500'}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2.5 text-xs font-bold transition-colors ${viewMode === 'calendar' ? 'bg-[#002F45] text-white' : 'text-gray-500'}`}
              >
                <CalendarIcon size={16} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Status</label>
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold focus:outline-none focus:border-[#6EABC6]">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="late">Late</option>
                    <option value="missed">Missed</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Course</label>
                  <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold focus:outline-none focus:border-[#6EABC6]">
                    <option value="all">All Courses</option>
                    {courses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Priority</label>
                  <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold focus:outline-none focus:border-[#6EABC6]">
                    <option value="all">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              {(filterStatus !== 'all' || filterCourse !== 'all' || filterPriority !== 'all') && (
                <button
                  onClick={() => { setFilterStatus('all'); setFilterCourse('all'); setFilterPriority('all'); }}
                  className="text-xs font-bold text-[#6EABC6] hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── LIST VIEW ─────────────────────────────────────────────────── */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {urgencyMap.overdue.length > 0 && filterStatus === 'all' && !searchQuery && (
              <UrgencySection
                title="Overdue"
                items={urgencyMap.overdue}
                urgencyKey="overdue"
                onStatusChange={handleStatusChange}
                onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
                onDelete={handleDelete}
              />
            )}

            {urgencyMap.today.length > 0 && filterStatus === 'all' && !searchQuery && (
              <UrgencySection
                title="Due Today"
                items={urgencyMap.today}
                urgencyKey="today"
                onStatusChange={handleStatusChange}
                onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
                onDelete={handleDelete}
              />
            )}

            {filteredAssignments.length > 0 ? (
              <div className="space-y-2">
                {(filterStatus !== 'all' || searchQuery || filterCourse !== 'all' || filterPriority !== 'all')
                  ? filteredAssignments.map(a => (
                      <AssignmentCard
                        key={a.id}
                        assignment={a}
                        onStatusChange={handleStatusChange}
                        onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
                        onDelete={handleDelete}
                      />
                    ))
                  : [
                    ...(urgencyMap.thisWeek.length > 0 ? [
                      <UrgencySection
                        key="week"
                        title="This Week"
                        items={urgencyMap.thisWeek}
                        urgencyKey="thisWeek"
                        onStatusChange={handleStatusChange}
                        onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
                        onDelete={handleDelete}
                      />
                    ] : []),
                    ...(urgencyMap.later.length > 0 ? [
                      <UrgencySection
                        key="later"
                        title="Later"
                        items={urgencyMap.later}
                        urgencyKey="later"
                        onStatusChange={handleStatusChange}
                        onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
                        onDelete={handleDelete}
                      />
                    ] : []),
                    ...filteredAssignments.filter(a => a.status !== 'pending').map(a => (
                      <AssignmentCard
                        key={a.id}
                        assignment={a}
                        onStatusChange={handleStatusChange}
                        onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
                        onDelete={handleDelete}
                      />
                    ))
                  ]
                }
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-gray-300" />
                </div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  {searchQuery ? 'No matching assignments' : 'No assignments yet'}
                </p>
                <p className="text-xs text-gray-500 font-medium mb-4">
                  {searchQuery ? 'Try a different search or clear your filters.' : 'Tap the + button to add your first assignment.'}
                </p>
                <button
                  onClick={() => { setEditingAssignment(null); setShowAddModal(true); }}
                  className="bg-[#002F45] text-white text-xs font-bold px-5 py-2.5 rounded-xl active:scale-95 transition-transform"
                >
                  Add Assignment
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── CALENDAR VIEW ─────────────────────────────────────────────── */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <button onClick={prevMonth} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
                <ChevronLeft size={16} />
              </button>
              <h3 className="text-sm font-black text-gray-900">{MONTHS[calMonth]} {calYear}</h3>
              <button onClick={nextMonth} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 border-b border-gray-50">
              {DAY_NAMES.map(d => (
                <div key={d} className="py-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">{d}</div>
              ))}
            </div>

            {(() => {
              const firstDay = new Date(calYear, calMonth, 1).getDay();
              const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
              const today = new Date();
              const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
              const cells = [];

              for (let i = 0; i < firstDay; i++) {
                cells.push(<div key={`empty-${i}`} className="p-1 min-h-[64px]" />);
              }

              for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayAssignments = calendarMap[dateStr] || [];
                const isToday = dateStr === todayStr;
                const isSelected = selectedCalDate === dateStr;

                cells.push(
                  <button
                    key={day}
                    onClick={() => setSelectedCalDate(isSelected ? null : dateStr)}
                    className={`p-1 min-h-[64px] border-t border-gray-50 text-left transition-colors ${
                      isSelected ? 'bg-[#002F45]/5' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      isToday ? 'bg-[#002F45] text-white' : 'text-gray-700'
                    }`}>
                      {day}
                    </span>
                    {dayAssignments.length > 0 && (
                      <div className="mt-0.5 space-y-0.5">
                        {dayAssignments.slice(0, 2).map(a => (
                          <div
                            key={a.id}
                            className={`text-[9px] font-bold px-1 py-0.5 rounded truncate ${
                              a.priority === 'high' ? 'bg-red-100 text-red-700' :
                              a.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'
                            } ${a.status !== 'pending' ? 'opacity-40 line-through' : ''}`}
                          >
                            {a.title}
                          </div>
                        ))}
                        {dayAssignments.length > 2 && (
                          <span className="text-[9px] font-bold text-gray-400 pl-1">+{dayAssignments.length - 2}</span>
                        )}
                      </div>
                    )}
                  </button>
                );
              }

              return <div className="grid grid-cols-7">{cells}</div>;
            })()}

            {selectedCalDate && (() => {
              const dayItems = getAssignmentsForDate(assignments, selectedCalDate);
              return (
                <div className="border-t border-gray-100 p-4">
                  <h4 className="text-sm font-black text-gray-900 mb-3">
                    {formatDate(selectedCalDate)}
                  </h4>
                  {dayItems.length === 0 ? (
                    <p className="text-xs text-gray-400 font-medium py-4 text-center">No assignments due this day.</p>
                  ) : (
                    <div className="space-y-2">
                      {dayItems.map(a => (
                        <AssignmentCard
                          key={a.id}
                          assignment={a}
                          compact
                          onStatusChange={handleStatusChange}
                          onEdit={(a) => { setEditingAssignment(a); setShowAddModal(true); }}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ────────────────────────────────────────────── */}
      {showAddModal && (
        <AssignmentModal
          assignment={editingAssignment}
          courses={[...new Set([...timetableCourses, ...courses])]}
          onSave={handleSave}
          onClose={() => { setShowAddModal(false); setEditingAssignment(null); }}
        />
      )}
    </div>
  );
};

// ── Sub-components ──────────────────────────────────────────────────────────────

const UrgencySection = ({ title, items, urgencyKey, onStatusChange, onEdit, onDelete }) => {
  const u = URGENCY_LABELS[urgencyKey];
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 px-1">
        <span className={`text-[10px] font-black uppercase tracking-widest ${u.color}`}>{title}</span>
        <span className={`text-[10px] font-bold ${u.color} ${u.bg} px-1.5 py-0.5 rounded-md`}>{items.length}</span>
      </div>
      <div className="space-y-2">
        {items.map(a => (
          <AssignmentCard key={a.id} assignment={a} onStatusChange={onStatusChange} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

const AssignmentCard = ({ assignment, compact, onStatusChange, onEdit, onDelete }) => {
  const a = assignment;
  const p = PRIORITY_STYLES[a.priority] || PRIORITY_STYLES.medium;
  const s = STATUS_STYLES[a.status] || STATUS_STYLES.pending;
  const StatusIcon = s.icon;

  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = a.status === 'pending' && a.dueDate < todayStr;

  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-xl ${p.bg} border ${p.border}`}>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.dot}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-bold ${isOverdue ? 'text-red-800' : 'text-gray-900'} truncate ${a.status !== 'pending' ? 'line-through opacity-60' : ''}`}>{a.title}</p>
          {a.course && <p className="text-[10px] font-medium text-gray-500 truncate">{a.course}</p>}
        </div>
        {a.dueTime && <span className="text-[10px] font-bold text-gray-500">{formatTime12(a.dueTime)}</span>}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 transition-all ${isOverdue ? 'ring-1 ring-red-200' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${p.dot} ${isOverdue ? 'animate-pulse' : ''}`} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold ${isOverdue ? 'text-red-800' : 'text-gray-900'} ${a.status !== 'pending' ? 'line-through opacity-60' : ''}`}>
                {a.title}
              </p>
              {a.course && (
                <p className="text-xs font-medium text-gray-500 mt-0.5">{a.course}</p>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => onEdit(a)} className="w-7 h-7 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors">
                <Edit3 size={13} />
              </button>
              <button onClick={() => onDelete(a.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${p.bg} ${p.text} ${p.border} border`}>
              <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
              {p.label}
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${s.bg} ${s.text} ${s.border} border`}>
              <StatusIcon size={10} />
              {s.label}
            </span>
            <span className={`text-[10px] font-bold flex items-center gap-1 ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
              <Clock size={10} />
              {formatDate(a.dueDate)}
              {a.dueTime && ` \u2022 ${formatTime12(a.dueTime)}`}
            </span>
          </div>

          {a.notes && (
            <p className="text-xs text-gray-500 font-medium mt-2 leading-relaxed line-clamp-2">{a.notes}</p>
          )}

          {a.status === 'pending' && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onStatusChange(a.id, 'submitted')}
                className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-lg active:scale-95 transition-transform hover:bg-green-100"
              >
                Mark Submitted
              </button>
              <button
                onClick={() => onStatusChange(a.id, 'late')}
                className="text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg active:scale-95 transition-transform hover:bg-orange-100"
              >
                Submitted Late
              </button>
              <button
                onClick={() => onStatusChange(a.id, 'missed')}
                className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg active:scale-95 transition-transform hover:bg-red-100"
              >
                Missed
              </button>
            </div>
          )}

          {/* Undo prompt for non-pending items */}
          {a.status !== 'pending' && (
            <button
              onClick={() => onStatusChange(a.id, 'pending')}
              className="text-[10px] font-bold text-[#6EABC6] mt-3 hover:underline flex items-center gap-1"
            >
              <Circle size={8} /> Revert to Pending
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AssignmentModal = ({ assignment, courses, onSave, onClose }) => {
  const isEditing = !!assignment;
  const [form, setForm] = useState({
    title: assignment?.title || '',
    course: assignment?.course || '',
    dueDate: assignment?.dueDate || new Date().toISOString().split('T')[0],
    dueTime: assignment?.dueTime || '',
    priority: assignment?.priority || 'medium',
    status: assignment?.status || 'pending',
    notes: assignment?.notes || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Please enter an assignment title.');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-2xl flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-[2rem] sm:rounded-2xl z-10">
          <h2 className="text-lg font-black text-gray-900">{isEditing ? 'Edit Assignment' : 'New Assignment'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Statistics Problem Set 4"
              className="w-full p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm font-medium transition-all outline-none placeholder:text-gray-400"
              autoFocus
            />
          </div>

          {/* Course — Searchable Combobox */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Course</label>
            <CourseCombobox
              value={form.course}
              onChange={(val) => setForm({ ...form, course: val })}
              courses={courses}
              placeholder="Search or type a course name..."
            />
          </div>

          {/* Due Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm font-medium transition-all outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Due Time</label>
              <input
                type="time"
                value={form.dueTime}
                onChange={(e) => setForm({ ...form, dueTime: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm font-medium transition-all outline-none"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map(p => {
                const ps = PRIORITY_STYLES[p];
                const isActive = form.priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm({ ...form, priority: p })}
                    className={`py-2.5 rounded-xl font-bold text-xs transition-all border ${
                      isActive
                        ? `${ps.bg} ${ps.text} ${ps.border} border shadow-sm scale-[1.02]`
                        : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {ps.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Submission link, instructions, etc."
              className="w-full p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm font-medium transition-all outline-none h-20 resize-none placeholder:text-gray-400"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 pb-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#002F45] hover:bg-[#001a26] text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-95"
            >
              {isEditing ? 'Save Changes' : 'Add Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Assignments;
