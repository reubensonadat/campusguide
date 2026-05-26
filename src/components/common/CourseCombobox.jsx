import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { UCC_COURSES } from '../../data/courses';

export const CourseCombobox = ({ value, onChange, placeholder = "e.g. BSc. Computer Science" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const wrapperRef = useRef(null);

  // Filter courses based on search term
  const filteredCourses = UCC_COURSES.filter(course =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync internal search term if external value changes (e.g. reset)
  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange(val); // Always update parent, allowing free text
    setIsOpen(true);
  };

  const handleSelectCourse = (course) => {
    setSearchTerm(course);
    onChange(course);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-4 pr-10 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-50 transition-all placeholder:text-gray-300"
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
          <ChevronDown size={20} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {filteredCourses.length > 0 ? (
            <ul className="py-2">
              {filteredCourses.map((course, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelectCourse(course)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium text-sm transition-colors"
                >
                  {course}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-center text-gray-500 text-sm font-medium">
              Course not in list. It will be saved as typed.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
