import React from 'react';
import { CustomMapPin } from '../common/CustomMapPin';

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const TimetableDayCard = ({ day, courses, selectedDayFilter, onSelectCourse }) => {
  if (selectedDayFilter !== 'All' && selectedDayFilter !== day) return null;

  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const isToday = day === todayName;
  const accentColor = '#3b82f6';

  if (!courses || courses.length === 0) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Schedule</p>
            <h3 className="text-lg font-black text-slate-900">{day}</h3>
          </div>
          {isToday && (
            <span className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-[11px] font-bold text-primary-700">
              Today
            </span>
          )}
        </div>
        <div className="rounded-[24px] border border-dashed border-primary-200 bg-primary-50/40 px-4 py-8 text-center">
          <p className="text-sm font-semibold text-slate-600">No classes scheduled for {day}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)] sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Schedule</p>
          <h3 className="text-lg font-black text-slate-900">{day}</h3>
        </div>
        {isToday && (
          <span className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-[11px] font-bold text-primary-700">
            Today
          </span>
        )}
      </div>

      <div className="space-y-3">
        {courses.map((course) => {
          const cardAccent = course.color || accentColor;

          return (
            <button
              key={course.id}
              type="button"
              onClick={() => onSelectCourse(course)}
              className="flex w-full items-start gap-3 rounded-[22px] border border-slate-100 bg-white p-2 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex w-16 shrink-0 flex-col items-end pt-1 text-right">
                <div className="text-sm font-black text-slate-900">{formatTime12Hour(course.startTime)}</div>
                <div className="text-xs font-medium text-slate-400">{formatTime12Hour(course.endTime)}</div>
              </div>

              <div
                className="relative flex-1 overflow-hidden rounded-[20px] border border-white/40 p-3 text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${cardAccent}f2 0%, ${cardAccent}b3 100%)` }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/20 blur-xl" />
                <div className="relative z-10">
                  <p className="text-sm font-black">{course.name}</p>
                  {course.lecturer && (
                    <p className="mt-1 text-xs font-medium text-white/90">{course.lecturer}</p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/90">
                    <span className="flex items-center gap-1.5">
                      <CustomMapPin className="h-4 w-4 opacity-80" />
                      <span className="truncate">{course.location || 'Venue TBD'}</span>
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-1 shadow-sm backdrop-blur-sm">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/10 text-[11px] font-black text-white">
                        {(course.lecturer || 'T').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                      </span>
                      <span className="truncate font-medium text-white/95">{course.lecturer || 'Lecturer TBD'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimetableDayCard;
