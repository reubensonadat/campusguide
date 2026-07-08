import React from 'react';
import { Modal } from '../common/Modal';

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const ImportTimetableModal = ({ sharedTimetable, onClose, selectedImportCourses, onToggleCourse, onImport }) => (
  <Modal isOpen={!!sharedTimetable} onClose={onClose} title="Import Shared Timetable" size="lg">
    {sharedTimetable && (
      <div className="space-y-6">
        <div className="p-5 bg-gradient-to-r from-gray-900/10 to-primary-50 rounded-2xl border border-gray-900/10">
          <h3 className="font-extrabold text-gray-900 text-lg">
            {sharedTimetable.senderName ? `${sharedTimetable.senderName}'s Timetable` : 'Shared Timetable'}
          </h3>
          {sharedTimetable.senderCourse && <p className="text-sm font-semibold text-gray-600 mt-1">{sharedTimetable.senderCourse}</p>}
          <div className="flex gap-2 mt-3">
            <span className="text-xs font-bold bg-gray-900/10 text-gray-900 px-3 py-1 rounded-full uppercase tracking-wider">Level {sharedTimetable.level}</span>
            <span className="text-xs font-bold bg-gray-900/10 text-gray-900 px-3 py-1 rounded-full uppercase tracking-wider">Semester {sharedTimetable.semester}</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
            Select courses to import ({sharedTimetable.courses.length} found):
          </label>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {sharedTimetable.courses.map((course, idx) => (
              <div key={idx} onClick={() => onToggleCourse(idx)}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${selectedImportCourses[idx] ? 'border-gray-900 bg-gray-900/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="checkbox" checked={!!selectedImportCourses[idx]} onChange={() => {}} className="w-4.5 h-4.5 text-gray-900 border-gray-300 rounded focus:ring-gray-900" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 truncate">{course.name}</div>
                  <div className="text-xs font-semibold text-gray-500 mt-0.5">{course.day}s, {formatTime12Hour(course.startTime)} - {formatTime12Hour(course.endTime)}</div>
                  {course.location && <div className="text-[11px] font-medium text-gray-400 mt-0.5">Location: {course.location}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition-colors active:scale-95">Cancel</button>
          <button onClick={onImport} className="flex-1 bg-gray-900 hover:bg-gray-900 text-white py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95">Import Selected</button>
        </div>
      </div>
    )}
  </Modal>
);

export default ImportTimetableModal;
