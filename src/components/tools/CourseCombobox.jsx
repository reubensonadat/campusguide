import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { StudyIcon } from '../common/CustomTaskIcons';

const CourseCombobox = ({ value, onChange, courses = [], placeholder = 'Search or type a course...' }) => {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery(value || '');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return courses;
    const q = query.toLowerCase();
    return courses.filter(c => c.toLowerCase().includes(q));
  }, [courses, query]);

  const handleSelect = (course) => {
    setQuery(course);
    onChange(course);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(true);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(i => Math.min(i + 1, filteredCourses.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredCourses[highlightedIndex]) {
      e.preventDefault();
      handleSelect(filteredCourses[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && listRef.current && listRef.current.children[highlightedIndex]) {
      listRef.current.children[highlightedIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <StudyIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 rounded-xl text-sm font-medium transition-all outline-none placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={() => { setIsOpen(!isOpen); inputRef.current?.focus(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {isOpen && filteredCourses.length > 0 && (
        <div ref={listRef} className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-48 overflow-y-auto py-1 animate-in fade-in slide-in-from-top-1 duration-150">
          {filteredCourses.map((course, index) => (
            <button
              key={course}
              type="button"
              onClick={() => handleSelect(course)}
              className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                index === highlightedIndex ? 'bg-primary-400/10 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
              } ${course === value ? 'bg-primary-400/5 font-bold' : ''}`}
            >
              <span className="flex items-center gap-2">
                {course === value && <CheckCircle2 size={12} className="text-primary-400" />}
                {course}
              </span>
            </button>
          ))}
        </div>
      )}
      {isOpen && filteredCourses.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-center text-xs text-gray-500 font-medium">
          No matching courses. Add them to your Timetable first.
        </div>
      )}
    </div>
  );
};

export default CourseCombobox;
