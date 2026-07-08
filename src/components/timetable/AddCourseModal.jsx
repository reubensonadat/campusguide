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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={newCourse.id ? 'Edit Class' : 'Add New Class'} size="lg">
      <form onSubmit={onSubmit} className="space-y-5">
        {conflictError && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl font-medium flex items-center gap-2">
            <AlertCircle size={16} /> {conflictError}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Course Identifier</label>
            <input type="text" placeholder="e.g. INF 101" value={newCourse.name} onChange={e => onChange({ ...newCourse, name: e.target.value })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium" required />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Venue / Location</label>
            <input type="text" placeholder="e.g. ALTB 1 or CODE Building" value={newCourse.location} onChange={e => onChange({ ...newCourse, location: e.target.value })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium" required />
            <div className="flex flex-wrap gap-2 mt-2.5">
              {venueSuggestions.map(venue => (
                <button key={venue} type="button" onClick={() => onChange({ ...newCourse, location: newCourse.location ? `${newCourse.location} ${venue}`.trim() : venue })}
                  className="px-3 py-1.5 bg-gray-900/5 hover:bg-gray-900/10 text-gray-700 text-xs font-bold rounded-lg transition-colors border border-transparent hover:border-gray-900/20 active:scale-95">
                  {venue}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Lecturer (Optional)</label>
              <input type="text" placeholder="e.g. Dr. Mensah" value={newCourse.lecturer || ''} onChange={e => onChange({ ...newCourse, lecturer: e.target.value })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Contact (Optional)</label>
              <input type="text" placeholder="e.g. 054... or email" value={newCourse.contact || ''} onChange={e => onChange({ ...newCourse, contact: e.target.value })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Credit Hours</label>
            <select value={newCourse.creditHours} onChange={e => onChange({ ...newCourse, creditHours: parseInt(e.target.value, 10) })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium">
              {[1, 2, 3, 4].map(credit => (<option key={credit} value={credit}>{credit} Credits</option>))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Day</label>
              <select value={newCourse.day} onChange={e => onChange({ ...newCourse, day: e.target.value })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium">
                {DAYS_OF_WEEK.map(day => (<option key={day} value={day}>{day}</option>))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Start</label>
                <input type="time" value={newCourse.startTime} onChange={handleStartTimeChange}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">End</label>
                <input type="time" value={newCourse.endTime} onChange={e => onChange({ ...newCourse, endTime: e.target.value })}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all font-medium" required />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Color Tag</label>
            <div className="flex items-center gap-3 flex-wrap">
              {colors.map(color => (
                <button key={color} type="button" onClick={() => onChange({ ...newCourse, color })}
                  className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${newCourse.color === color ? 'ring-4 ring-offset-2 scale-110 shadow-md' : 'hover:scale-110 border-2 border-transparent'}`}
                  style={{ backgroundColor: color, ringColor: `${color}40` }} />
              ))}
              <label className="relative w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-gray-200 hover:scale-110 transition-transform flex items-center justify-center" title="Custom color">
                <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}></div>
                <div className="absolute inset-[3px] rounded-full bg-white"></div>
                <Plus size={14} className="text-gray-500 relative z-10" />
                <input type="color" value={newCourse.color} onChange={e => onChange({ ...newCourse, color: e.target.value })} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              </label>
            </div>
          </div>
        </div>
        <div className="pt-2 pb-6">
          <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-900 text-white py-3.5 rounded-2xl font-bold text-lg shadow-md transition-all">
            {newCourse.id ? 'Save Changes' : 'Add to Timetable'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCourseModal;
