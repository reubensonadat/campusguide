import React from 'react';
import { Modal } from '../common/Modal';
import { Calendar, Bell, User, Phone, Target, Trash2 } from 'lucide-react';
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
      <div className="relative pb-4">
        <div className="h-36 w-full rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden mb-6 shadow-xl"
          style={{ background: `linear-gradient(135deg, ${course.color || '#002F45'} 0%, ${course.color || '#002F45'}dd 100%)` }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-6 -mb-6 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 z-10 shadow-sm mb-3">
            <Calendar size={28} className="text-white drop-shadow-md" />
          </div>
          <h3 className="text-2xl font-black text-white text-center px-6 leading-tight z-10 drop-shadow-sm truncate w-full">{course.name}</h3>
        </div>
        <div className="px-2">
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <Calendar size={18} className="text-gray-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Day of week</span>
                <span className="font-bold text-gray-900">{course.day}s</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <Bell size={18} className="text-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</span>
                <span className="font-bold text-gray-900">{formatTime12Hour(course.startTime)} - {formatTime12Hour(course.endTime)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <CustomMapPin className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</span>
                <span className="font-bold text-gray-900">{course.location}</span>
              </div>
            </div>
            {course.lecturer && (
              <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                  <User size={18} className="text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lecturer</span>
                  <span className="font-bold text-gray-900">{course.lecturer}</span>
                </div>
              </div>
            )}
            {course.contact && (
              <div className="flex items-center gap-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                  <Phone size={18} className="text-purple-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</span>
                  <span className="font-bold text-gray-900">{course.contact}</span>
                </div>
              </div>
            )}
            {course.creditHours && (
              <div className="flex items-center gap-4 bg-gray-900/5 p-3.5 rounded-2xl border border-gray-900/10 hover:bg-gray-900/10 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-900/10 group-hover:scale-105 transition-transform">
                  <Target size={18} className="text-gray-900" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-900/60 uppercase tracking-widest">Weight</span>
                  <span className="font-black text-gray-900">{course.creditHours} Credit Hours</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button onClick={onEdit} className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md active:scale-95">
              <Calendar size={18} className="mr-2" /> <span>Edit Details</span>
            </button>
            <button onClick={() => onDelete(course.id)} className="flex-1 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 py-4 rounded-2xl font-bold flex items-center justify-center transition-colors shadow-sm active:scale-95">
              <Trash2 size={18} className="mr-2" /> <span>Remove Class</span>
            </button>
          </div>
        </div>
      </div>
    )}
  </Modal>
);

export default CourseDetailModal;
