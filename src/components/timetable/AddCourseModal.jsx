import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertCircle, Plus } from 'lucide-react';
import { DAYS_OF_WEEK } from '../../utils/constants';

const colors = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4','#84cc16','#f97316','#6366f1'];

const AddCourseModal = ({ isOpen, onClose, newCourse, onChange, onSubmit, conflictError }) => {
  const venueSuggestions = ['NLT', 'SWLT', 'LT', 'Jurassic', 'CELT', 'ALTB', 'CODE'];

  const handleStartTimeChange = (e) => {
    const newStart = e.target.value;
    if (!newStart) { onChange({ ...newCourse, startTime: newStart }); return; }
    let [h, m] = newStart.split(':').map(Number);
    h = (h + 2) % 24;
    onChange({ ...newCourse, startTime: newStart, endTime: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` });
  };

  const inputClass = "w-full p-4 bg-[#FAF9F9] border border-slate-100 rounded-[20px] focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all font-extrabold text-[15px] text-slate-800 placeholder-slate-400";
  const labelClass = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block px-1";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={newCourse.id ? 'Edit Class' : 'Add New Class'} size="lg">
      <form onSubmit={onSubmit} className="space-y-6">
        {conflictError && (
          <div className="p-4 bg-red-50 text-red-700 text-sm rounded-[20px] font-bold flex items-center gap-2 border border-red-100">
            <AlertCircle size={16} /> {conflictError}
          </div>
        )}
        <div className="space-y-5">
          {/* Course Identifier */}
          <div>
            <label className={labelClass}>Course Identifier</label>
            <input type="text" placeholder="e.g. INF 101" value={newCourse.name} onChange={e => onChange({ ...newCourse, name: e.target.value })} className={inputClass} required />
          </div>

          {/* Venue / Location */}
          <div>
            <label className={labelClass}>Venue / Location</label>
            <input type="text" placeholder="e.g. ALTB 1 or CODE Building" value={newCourse.location} onChange={e => onChange({ ...newCourse, location: e.target.value })} className={inputClass} required />
            <div className="flex flex-wrap gap-2 mt-3">
              {venueSuggestions.map(venue => (
                <button key={venue} type="button" onClick={() => onChange({ ...newCourse, location: newCourse.location ? `${newCourse.location} ${venue}`.trim() : venue })}
                  className="px-3 py-1.5 bg-[#FAF9F9] hover:bg-slate-100 text-slate-600 text-xs font-black rounded-full transition-all border border-slate-150 active:scale-95">
                  {venue}
                </button>
              ))}
            </div>
          </div>

          {/* Lecturer & Contact Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Lecturer (Optional)</label>
              <input type="text" placeholder="e.g. Dr. Mensah" value={newCourse.lecturer || ''} onChange={e => onChange({ ...newCourse, lecturer: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contact (Optional)</label>
              <input type="text" placeholder="e.g. 054... or email" value={newCourse.contact || ''} onChange={e => onChange({ ...newCourse, contact: e.target.value })} className={inputClass} />
            </div>
          </div>

          {/* Day & Credit Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Day</label>
              <select value={newCourse.day} onChange={e => onChange({ ...newCourse, day: e.target.value })} className={inputClass}>
                {DAYS_OF_WEEK.map(day => (<option key={day} value={day}>{day}</option>))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Credit Weight</label>
              <select value={newCourse.creditHours} onChange={e => onChange({ ...newCourse, creditHours: parseInt(e.target.value, 10) })} className={inputClass}>
                {[1, 2, 3, 4].map(credit => (<option key={credit} value={credit}>{credit} Credits</option>))}
              </select>
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <label className={labelClass}>Time Slot</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input type="time" value={newCourse.startTime} onChange={handleStartTimeChange} className={inputClass} required />
              </div>
              <div>
                <input type="time" value={newCourse.endTime} onChange={e => onChange({ ...newCourse, endTime: e.target.value })} className={inputClass} required />
              </div>
            </div>
          </div>

          {/* Color Tag Selector */}
          <div>
            <label className={labelClass}>Color Tag</label>
            <div className="flex items-center gap-3.5 flex-wrap px-1">
              {colors.map(color => (
                <button key={color} type="button" onClick={() => onChange({ ...newCourse, color })}
                  className={`w-9 h-9 rounded-full transition-all flex items-center justify-center relative ${newCourse.color === color ? 'scale-110 shadow-md ring-4 ring-offset-2 ring-slate-900/10' : 'hover:scale-110 border-2 border-transparent'}`}
                  style={{ backgroundColor: color }} />
              ))}
              <label className="relative w-9 h-9 rounded-full cursor-pointer overflow-hidden border border-slate-200 hover:scale-110 transition-transform flex items-center justify-center" title="Custom color">
                <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}></div>
                <div className="absolute inset-[3px] rounded-full bg-white"></div>
                <Plus size={14} className="text-slate-500 relative z-10" />
                <input type="color" value={newCourse.color} onChange={e => onChange({ ...newCourse, color: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              </label>
            </div>
          </div>
        </div>

        <div className="pt-2 pb-4">
          <button type="submit" className="w-full bg-slate-950 hover:bg-black text-white py-4 rounded-[22px] font-bold text-[16px] shadow-md transition-all active:scale-[0.98]">
            {newCourse.id ? 'Save Changes' : 'Add to Timetable'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCourseModal;
