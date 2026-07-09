import React from 'react';
import { DAYS_OF_WEEK } from '../../utils/constants';

const MobileDayFilter = ({ selectedDayFilter, onChange }) => (
  <div className="flex overflow-x-auto gap-2 pb-4 mb-4 scrollbar-none snap-x px-1 border-b border-gray-900/5">
    {['All', ...DAYS_OF_WEEK].map(day => (
      <button key={day} onClick={() => onChange(day)}
        className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap snap-align-start transition-all shrink-0 border-none cursor-pointer ${selectedDayFilter === day ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 hover:text-gray-900 shadow-sm border border-gray-100'}`}>
        {day === 'All' ? 'All Days' : day}
      </button>
    ))}
  </div>
);

export default MobileDayFilter;
