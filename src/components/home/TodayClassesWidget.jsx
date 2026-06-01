import React from 'react';
import { ChevronRight, CheckCircle2, Clock, Loader2, PartyPopper } from 'lucide-react';
import { CustomMapPin } from '../common/CustomMapPin';
import { CustomEyes } from '../common/CustomIcons';

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const TodayClassesWidget = ({ todaysClassesWithStatus, allCompleted, todayHoliday, navigate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 min-h-[140px] border border-gray-100 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-black text-gray-900 tracking-tight">Today's Classes</span>
        <button onClick={() => navigate('/tools/timetable')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
          View all <ChevronRight size={13} />
        </button>
      </div>

      {todaysClassesWithStatus.length === 0 ? (
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-950/5 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#002F45" viewBox="0 0 256 256"><path d="M111.49,52.63a15.8,15.8,0,0,0-26,5.77L33,202.78A15.83,15.83,0,0,0,47.76,224a16,16,0,0,0,5.46-1l144.37-52.5a15.8,15.8,0,0,0,5.78-26Zm-8.33,135.21-35-35,13.16-36.21,58.05,58.05Zm-55,20,14-38.41,24.45,24.45ZM156,168.64,87.36,100l13-35.87,91.43,91.43ZM160,72a37.8,37.8,0,0,1,3.84-15.58C169.14,45.83,179.14,40,192,40c6.7,0,11-2.29,13.65-7.21A22,22,0,0,0,208,23.94,8,8,0,0,1,224,24c0,12.86-8.52,32-32,32-6.7,0-11,2.29-13.65,7.21A22,22,0,0,0,176,72.06,8,8,0,0,1,160,72ZM136,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm101.66,82.34a8,8,0,1,1-11.32,11.31l-16-16a8,8,0,0,1,11.32-11.32Zm4.87-42.75-24,8a8,8,0,0,1-5.06-15.18l24-8a8,8,0,0,1,5.06,15.18Z"></path></svg>
            </div>
            <div>
              <p className="text-[15px] font-bold text-gray-900 flex items-center gap-1.5">
                {todayHoliday ? <><PartyPopper className="w-4 h-4 text-primary-600" /> {todayHoliday.name}</> : 'No classes today!'}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium flex items-center">
                {todayHoliday ? <>No classes today unless your lecturer said so <CustomEyes size={14} className="inline ml-1" /></> : 'Enjoy your free time.'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/tools/timetable')}
            className="flex bg-primary-50 text-primary-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary-100 transition-colors"
          >
            Add Class
          </button>
        </div>
      ) : allCompleted ? (
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100">
            <CheckCircle2 size={24} className="text-green-500" />
          </div>
          <div>
            <p className="text-[15px] font-bold text-gray-900">All classes ended!</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">You've successfully completed all classes for today.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {todaysClassesWithStatus.slice(0, 3).map((cls, i) => (
            <div key={i} className={`flex items-center gap-4 transition-opacity ${cls.status === 'completed' ? 'opacity-40' : 'opacity-100'}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  cls.status === 'completed' ? 'bg-gray-100' :
                  cls.status === 'ongoing' ? 'bg-blue-50 border border-blue-100 shadow-sm' : 
                  'bg-primary-950/5'
              }`}>
                {cls.status === 'completed' ? <CheckCircle2 size={16} className="text-gray-400" /> :
                 cls.status === 'ongoing' ? <Loader2 size={16} className="text-blue-600 animate-spin" /> :
                 <Clock size={16} className="text-primary-950" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${cls.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {cls.courseName || cls.name || 'Class'}
                </p>
                <p className={`text-xs font-medium mt-0.5 flex flex-wrap items-center gap-1 ${cls.status === 'ongoing' ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                  <span>
                      {cls.status === 'ongoing' ? 'Happening Now • ' : ''}
                      {cls.status === 'completed' ? 'Completed • ' : ''}
                      {cls.startTime && cls.endTime ? `${formatTime12Hour(cls.startTime)} – ${formatTime12Hour(cls.endTime)}` : formatTime12Hour(cls.startTime) || ''}
                  </span>
                  {cls.location && (
                      <span className="flex items-center gap-0.5 font-bold opacity-90">
                          • <CustomMapPin className="w-2.5 h-2.5" /> {cls.location}
                      </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
