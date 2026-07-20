import React from 'react';
import { Calculator, Trash2 } from 'lucide-react';

const getGradeColor = (grade) => {
  if (grade === 'A') return 'text-green-600 bg-green-50';
  if (['B+', 'B'].includes(grade)) return 'text-blue-600 bg-blue-50';
  if (['C+', 'C'].includes(grade)) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const CourseCardList = ({ displayCourses, onEdit, onDelete, emptyMessage }) => {
  if (displayCourses.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
        <Calculator className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-900 font-bold">No courses found</p>
        <p className="text-gray-500 text-sm mt-1">{emptyMessage || 'Add courses to your Timetable first.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayCourses.map(course => (
        <div key={course.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-100 transition-colors bg-white group shadow-sm hover:shadow-md">
          <div className="flex-1 cursor-pointer" onClick={() => onEdit(course)}>
            <div className="flex items-center gap-3">
              <span className={`font-bold px-2 py-1 rounded text-sm ${getGradeColor(course.grade)}`}>{course.grade}</span>
              <span className="font-bold text-gray-900 truncate max-w-[130px] sm:max-w-none" title={course.name || 'Untitled Course'}>{course.name || 'Untitled Course'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-medium text-gray-400">
              <span className="whitespace-nowrap">{course.creditHours} Credit(s)</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="whitespace-nowrap">Score: {(parseFloat(course.score) || 0).toFixed(1)}%</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="whitespace-nowrap">{course.gradePoint} Points</span>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onDelete(course.id); }}
            className="ml-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0" title="Remove course">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CourseCardList;
