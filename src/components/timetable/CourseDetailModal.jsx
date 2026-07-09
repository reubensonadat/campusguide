import React from 'react';
import { Modal } from '../common/Modal';
import { Calendar, User, Phone, Target } from 'lucide-react';
import { CustomMapPin } from '../common/CustomMapPin';

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const CourseDetailModal = ({ course, onClose, onEdit, onDelete }) => (
  <Modal isOpen={!!course} onClose={onClose} title="Class Details" size="lg">
    {course && (
      <div className="relative pb-2">
        {/* Premium Header Card */}
        <div className="relative rounded-[28px] overflow-hidden mb-5 p-6 text-white shadow-lg"
          style={{ background: `linear-gradient(135deg, ${course.color || '#3b82f6'} 0%, ${course.color || '#3b82f6'}dd 100%)` }}>
          {/* Abstract light patterns */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-black/10 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col justify-between min-h-[100px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                Course Details
              </span>
              <Calendar className="w-5 h-5 opacity-90" />
            </div>
            
            <div className="mt-6">
              <h3 className="text-2xl font-black tracking-tight leading-none drop-shadow-sm truncate">{course.name}</h3>
              <p className="text-xs font-semibold opacity-90 mt-2 flex items-center gap-1">
                <CustomMapPin className="w-3.5 h-3.5" /> {course.location || 'Venue TBD'}
              </p>
            </div>
          </div>
        </div>

        <div className="px-1">
          {/* Inspiration Grid Layout */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            
            {/* Day of Week Card */}
            <div className="bg-[#FAF9F9] border border-slate-100 p-4 rounded-[20px] flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Day</span>
              <span className="font-extrabold text-slate-900 mt-1 text-[15px]">{course.day}s</span>
            </div>

            {/* Time Card */}
            <div className="bg-[#FAF9F9] border border-slate-100 p-4 rounded-[20px] flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time</span>
              <span className="font-extrabold text-slate-900 mt-1 text-[13px] leading-snug">
                {formatTime12Hour(course.startTime)} - {formatTime12Hour(course.endTime)}
              </span>
            </div>

            {/* Location Card */}
            <div className="bg-[#FAF9F9] border border-slate-100 p-4 rounded-[20px] flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</span>
              <span className="font-extrabold text-slate-900 mt-1 text-[15px] truncate">{course.location || 'TBD'}</span>
            </div>

            {/* Weight Card */}
            <div className="bg-[#FAF9F9] border border-slate-100 p-4 rounded-[20px] flex flex-col justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weight</span>
              <span className="font-extrabold text-slate-900 mt-1 text-[15px]">{course.creditHours || 3} Credits</span>
            </div>

            {/* Lecturer Card - Span Full */}
            {course.lecturer && (
              <div className="bg-[#FAF9F9] border border-slate-100 p-4 rounded-[20px] flex items-center gap-3 col-span-2">
                <div className="w-8 h-8 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-500">
                  <User size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Lecturer</span>
                  <span className="font-extrabold text-slate-900 mt-1 text-sm">{course.lecturer}</span>
                </div>
              </div>
            )}

            {/* Contact Card - Span Full */}
            {course.contact && (
              <div className="bg-[#FAF9F9] border border-slate-100 p-4 rounded-[20px] flex items-center gap-3 col-span-2">
                <div className="w-8 h-8 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-500">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Contact Info</span>
                  <span className="font-extrabold text-slate-900 mt-1 text-sm truncate">{course.contact}</span>
                </div>
              </div>
            )}
          </div>

          {/* Premium Bottom Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <button onClick={onEdit} className="w-full bg-slate-950 hover:bg-black text-white py-4 rounded-[22px] font-bold flex items-center justify-center transition-all shadow-md active:scale-[0.98]">
              Edit Class Details
            </button>
            <button onClick={() => onDelete(course.id)} className="w-full hover:bg-red-50 text-red-500 py-3 rounded-[22px] font-extrabold flex items-center justify-center transition-colors active:scale-[0.98] text-sm">
              Remove Class from Timetable
            </button>
          </div>
        </div>
      </div>
    )}
  </Modal>
);

export default CourseDetailModal;
