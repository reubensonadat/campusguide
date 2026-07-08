import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CourseCombobox from './CourseCombobox';
import { StudyIcon } from '../common/CustomTaskIcons';
import { PRIORITY_STYLES } from './assignmentsConstants';

const AssignmentModal = ({ assignment, courses, onSave, onClose }) => {
  const isEditing = !!assignment;
  const [form, setForm] = useState({
    title: assignment?.title || '',
    course: assignment?.course || '',
    type: assignment?.type || 'assignment',
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
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-[2rem] sm:rounded-2xl z-10">
          <h2 className="text-base sm:text-lg font-black text-gray-900">{isEditing ? 'Edit Assignment' : 'New Assignment'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Statistics Problem Set 4"
              className="w-full p-2.5 sm:p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 rounded-xl text-sm font-medium transition-all outline-none placeholder:text-gray-400"
              autoFocus
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <StudyIcon size={12} className="text-primary-400" />
              Course
            </label>
            <CourseCombobox
              value={form.course}
              onChange={(val) => setForm({ ...form, course: val })}
              courses={courses}
              placeholder="Search or type a course name..."
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Type</label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                { value: 'assignment', label: '📝 Assignment' },
                { value: 'exam',       label: '📋 Exam' },
                { value: 'quiz',       label: '⚡ Quiz' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, type: opt.value })}
                  className={`py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs transition-all border ${
                    form.type === opt.value
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full p-2.5 sm:p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 rounded-xl text-sm font-medium transition-all outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Due Time</label>
              <input
                type="time"
                value={form.dueTime}
                onChange={(e) => setForm({ ...form, dueTime: e.target.value })}
                className="w-full p-2.5 sm:p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 rounded-xl text-sm font-medium transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Priority</label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {['low', 'medium', 'high'].map(p => {
                const ps = PRIORITY_STYLES[p];
                const isActive = form.priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm({ ...form, priority: p })}
                    className={`py-2 sm:py-2.5 rounded-xl font-bold text-[11px] sm:text-xs transition-all border ${
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

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Submission link, instructions, etc."
              className="w-full p-2.5 sm:p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 rounded-xl text-sm font-medium transition-all outline-none h-20 resize-none placeholder:text-gray-400"
            />
          </div>

          <div className="pt-2 pb-4">
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 bg-gray-900 hover:bg-gray-900 text-white font-bold text-sm rounded-xl shadow-lg transition-all active:scale-95"
            >
              {isEditing ? 'Save Changes' : 'Add Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentModal;
