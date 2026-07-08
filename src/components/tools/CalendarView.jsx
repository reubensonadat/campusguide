import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AssignmentCard from './AssignmentCard';
import { MONTHS, DAY_NAMES, formatDate } from './assignmentsConstants';

const CalendarView = ({
  calYear, calMonth, onPrevMonth, onNextMonth,
  calendarMap, semesterAssignments, selectedCalDate, onSelectDate,
  onStatusChange, onEdit, onDelete, onShare
}) => {
  const getAssignmentsForDate = (assignments, dateStr) => {
    return (assignments || []).filter(a => a.dueDate === dateStr);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
        <button onClick={onPrevMonth} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
          <ChevronLeft size={16} />
        </button>
        <h3 className="text-xs sm:text-sm font-black text-gray-900">{MONTHS[calMonth]} {calYear}</h3>
        <button onClick={onNextMonth} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition-all">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-50">
        {DAY_NAMES.map(d => (
          <div key={d} className="py-1.5 sm:py-2 text-center text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">{d}</div>
        ))}
      </div>

      {(() => {
        const firstDay = new Date(calYear, calMonth, 1).getDay();
        const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const cells = [];

        for (let i = 0; i < firstDay; i++) {
          cells.push(<div key={`empty-${i}`} className="p-0.5 sm:p-1 min-h-[44px] sm:min-h-[64px]" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayAssignments = calendarMap[dateStr] || [];
          const isToday = dateStr === todayStr;
          const isSelected = selectedCalDate === dateStr;

          cells.push(
            <button
              key={day}
              onClick={() => onSelectDate(isSelected ? null : dateStr)}
              className={`p-0.5 sm:p-1 min-h-[44px] sm:min-h-[64px] border-t border-gray-50 text-left transition-colors ${
                isSelected ? 'bg-gray-900/5' : 'hover:bg-gray-50'
              }`}
            >
              <span className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[10px] sm:text-xs font-bold ${
                isToday ? 'bg-gray-900 text-white' : 'text-gray-700'
              }`}>
                {day}
              </span>
              {dayAssignments.length > 0 && (
                <div className="mt-0.5 space-y-0.5">
                  {dayAssignments.slice(0, 2).map(a => (
                    <div
                      key={a.id}
                      className={`text-[7px] sm:text-[9px] font-bold px-0.5 sm:px-1 py-0.5 rounded truncate ${
                        a.priority === 'high' ? 'bg-red-100 text-red-700' :
                        a.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      } ${a.status !== 'pending' ? 'opacity-40 line-through' : ''}`}
                    >
                      {a.title}
                    </div>
                  ))}
                  {dayAssignments.length > 2 && (
                    <span className="text-[7px] sm:text-[9px] font-bold text-gray-400 pl-0.5 sm:pl-1">+{dayAssignments.length - 2}</span>
                  )}
                </div>
              )}
            </button>
          );
        }

        return <div className="grid grid-cols-7">{cells}</div>;
      })()}

      {selectedCalDate && (() => {
        const dayItems = getAssignmentsForDate(semesterAssignments, selectedCalDate);
        return (
          <div className="border-t border-gray-100 p-3 sm:p-4">
            <h4 className="text-xs sm:text-sm font-black text-gray-900 mb-2 sm:mb-3">
              {formatDate(selectedCalDate)}
            </h4>
            {dayItems.length === 0 ? (
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium py-3 sm:py-4 text-center">No assignments due this day.</p>
            ) : (
              <div className="space-y-2">
                {dayItems.map(a => (
                  <AssignmentCard
                    key={a.id}
                    assignment={a}
                    compact
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onShare={onShare}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
};

export default CalendarView;
