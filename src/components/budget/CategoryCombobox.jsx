import React, { useState, useEffect, useRef } from 'react';

const CategoryCombobox = ({ value, onChange, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const wrapperRef = useRef(null);

  const filtered = categories.filter(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => { function handleClickOutside(event) { if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false); } document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []);
  useEffect(() => { setSearchTerm(value || ''); }, [value]);

  const handleInputChange = (e) => { const val = e.target.value; setSearchTerm(val); onChange(val); setIsOpen(true); };
  const handleSelect = (cat) => { setSearchTerm(cat); onChange(cat); setIsOpen(false); };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input type="text" required value={searchTerm} onChange={handleInputChange} onFocus={() => setIsOpen(true)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all" placeholder="Search or enter category..." autoComplete="off" />
      {isOpen && (
        <div className="absolute z-[80] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto animate-in fade-in duration-200">
          {filtered.length > 0 ? (
            <ul className="py-2">{filtered.map((cat, idx) => (<li key={idx} onClick={() => handleSelect(cat)} className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-900 font-bold text-sm transition-colors border-b border-gray-50 last:border-0">{cat}</li>))}</ul>
          ) : (
            <div className="px-4 py-4 text-center text-gray-500 text-sm font-medium">Create custom category "{searchTerm}"</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryCombobox;
