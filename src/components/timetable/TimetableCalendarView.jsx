import React from 'react';
import { CustomMapPin } from '../common/CustomMapPin';

const DEFAULT_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const TimetableCalendarView = ({ courses, onSelectCourse }) => {
  // Convert time "HH:MM" to decimal hours
  const timeToDecimal = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h + m / 60;
  };

  // Determine active columns (include Saturday/Sunday only if there are classes)
  const activeDays = [...DEFAULT_DAYS];
  if (courses.some(c => c.day === 'Saturday')) activeDays.push('Saturday');
  if (courses.some(c => c.day === 'Sunday')) activeDays.push('Sunday');

  // Dynamically calculate the start and end hour range to fit all classes
  let startHour = 8; // default 8 AM
  let endHour = 18;  // default 6 PM

  courses.forEach(c => {
    if (c.startTime) {
      const h = parseInt(c.startTime.split(':')[0], 10);
      if (h < startHour) startHour = h;
    }
    if (c.endTime) {
      const h = Math.ceil(timeToDecimal(c.endTime));
      if (h > endHour) endHour = h;
    }
  });

  // Add 1 hour padding at start and end for styling
  startHour = Math.max(0, startHour - 1);
  endHour = Math.min(24, endHour + 1);
  const totalHours = endHour - startHour;

  const weeklyCourses = courses.filter(c => activeDays.includes(c.day));
  const hourMarkings = Array.from({ length: totalHours + 1 }, (_, i) => startHour + i);

  return (
    <div className="w-full bg-white rounded-[32px] border border-slate-200/60 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.12)] overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <div className="min-w-[850px] p-6">
          
          {/* Header Row */}
          <div className="grid gap-4 border-b border-slate-100 pb-4 mb-4 text-center" style={{ gridTemplateColumns: `80px repeat(${activeDays.length}, 1fr)` }}>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 text-left pl-2">Time</div>
            {activeDays.map(day => (
              <div key={day} className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid Container with wrapper */}
          <div className="relative" style={{ height: `${totalHours * 85}px` }}>
            
            {/* Hour Markings Background Grid Lines */}
            <div className="absolute inset-0 left-[80px] right-0 flex flex-col justify-between pointer-events-none z-0">
              {Array.from({ length: totalHours + 1 }).map((_, i) => (
                <div key={i} className="w-full border-t border-dashed border-slate-200/50" style={{ height: i === totalHours ? '0px' : '85px' }} />
              ))}
            </div>

            {/* Actual Grid Content */}
            <div className="grid gap-4 h-full relative z-10" style={{ gridTemplateColumns: `80px repeat(${activeDays.length}, 1fr)` }}>
              
              {/* Time Labels Column */}
              <div className="flex flex-col justify-between h-full pr-4 text-right">
                {hourMarkings.map(hour => {
                  const ampm = hour >= 12 ? 'PM' : 'AM';
                  const hour12 = hour % 12 || 12;
                  return (
                    <div key={hour} className="text-xs font-black text-slate-400 h-0 flex items-center justify-end select-none">
                      {hour12}:00 {ampm}
                    </div>
                  );
                })}
              </div>

              {/* Day Columns */}
              {activeDays.map(day => {
                const dayCourses = weeklyCourses.filter(c => c.day === day);
                
                return (
                  <div key={day} className="relative h-full w-full rounded-2xl bg-slate-50/20">
                    {dayCourses.map(course => {
                      const startDec = timeToDecimal(course.startTime);
                      const endDec = timeToDecimal(course.endTime);
                      
                      if (startDec < startHour || endDec > endHour) return null;

                      const topOffset = ((startDec - startHour) / totalHours) * 100;
                      const heightPercent = ((endDec - startDec) / totalHours) * 100;

                      return (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => onSelectCourse(course)}
                          className="absolute left-1 right-1 p-3 rounded-[20px] text-left overflow-hidden border border-white/20 text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-md flex flex-col justify-between group animate-fadeIn"
                          style={{
                            top: `${topOffset}%`,
                            height: `${heightPercent}%`,
                            backgroundColor: course.color || '#3b82f6'
                          }}
                        >
                          <div className="overflow-hidden w-full">
                            <p className="font-black text-[13px] leading-tight truncate text-white">
                              {course.name}
                            </p>
                            <span className="text-[10px] font-bold text-white/90 mt-1 flex items-center gap-1 leading-none">
                              <CustomMapPin className="w-3.5 h-3.5 opacity-80 text-white shrink-0" /> 
                              <span className="truncate">{course.location || 'TBD'}</span>
                            </span>
                          </div>

                          {/* Only show lecturer inside the card if height allows */}
                          {course.lecturer && heightPercent > 12 && (
                            <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 w-full overflow-hidden">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-[9px] font-black text-white uppercase">
                                {course.lecturer.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                              </span>
                              <span className="text-[10px] font-bold text-white/90 truncate">{course.lecturer}</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableCalendarView;
