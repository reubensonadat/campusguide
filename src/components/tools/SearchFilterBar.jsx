import React from 'react';
import { Search, Filter, List, Calendar as CalendarIcon, Timer } from 'lucide-react';

const SearchFilterBar = ({
  searchQuery, setSearchQuery, showFilters, setShowFilters,
  activeFilterCount, viewMode, setViewMode,
  filterStatus, setFilterStatus, filterCourse, setFilterCourse,
  filterPriority, setFilterPriority, courses
}) => {
  const filterConfigs = [
    { label: 'Status', value: filterStatus, onChange: setFilterStatus, options: ['all', 'pending', 'submitted', 'late', 'missed'] },
    { label: 'Course', value: filterCourse, onChange: setFilterCourse, options: ['all', ...courses] },
    { label: 'Priority', value: filterPriority, onChange: setFilterPriority, options: ['all', 'high', 'medium', 'low'] },
  ];

  return (
    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10 transition-all placeholder:text-gray-400" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${showFilters ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-100 text-gray-500'}`}>
          <Filter size={16} />
          {activeFilterCount > 0 && !showFilters && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-400 text-white text-[8px] font-bold flex items-center justify-center">{activeFilterCount}</span>}
        </button>
        <div className="flex bg-white border border-gray-100 rounded-xl overflow-hidden">
          {[
            { mode: 'list', icon: List },
            { mode: 'calendar', icon: CalendarIcon },
            { mode: 'countdown', icon: Timer },
          ].map(({ mode, icon: Icon }) => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs font-bold transition-colors ${viewMode === mode ? 'bg-gray-900 text-white' : 'text-gray-500'}`} title={`${mode} view`}>
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 space-y-2.5 sm:space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {filterConfigs.map(({ label, value, onChange, options }) => (
              <div key={label}>
                <label className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">{label}</label>
                <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-1.5 sm:p-2 bg-gray-50 border border-gray-100 rounded-lg text-[10px] sm:text-xs font-bold focus:outline-none focus:border-primary-400">
                  {options.map(o => <option key={o} value={o}>{o === 'all' ? 'All' : o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                </select>
              </div>
            ))}
          </div>
          {(filterStatus !== 'all' || filterCourse !== 'all' || filterPriority !== 'all') && (
            <button onClick={() => { setFilterStatus('all'); setFilterCourse('all'); setFilterPriority('all'); }} className="text-[10px] sm:text-xs font-bold text-primary-400 hover:underline">Clear all filters</button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
