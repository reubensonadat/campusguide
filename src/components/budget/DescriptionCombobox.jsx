import React, { useState, useEffect, useRef } from 'react';

const COMMON_DESCRIPTIONS = {
  expense: ['Lunch','Breakfast','Dinner','Snacks','Groceries','Sachet Water','Dispenser Water','Bus fare','Taxi','Uber / Bolt','Fuel','Printing','Photocopying','Books / Handouts','Stationery','Data Bundle (MTN)','Data Bundle (Telecel/AT)','Airtime','Party','Movie','Hangout with friends','Date','Electricity Prepaid','Gas refill','Hostel dues','Medicine / Pharmacy','Haircut','Salon / Hair','Laundry','Church offering','Tithe','Donation','Repaid loan','Shoes','Clothes','Skincare','Toiletries','Accessories'],
  income: ['Allowance from parents','Pocket money','Support from Guardian','Salary / Part-time job','Gift from friend','Gift from relative','Loan / Borrowed money','Sale of item','Refund','Scholarship','Bursary stipend','Betting win','Savings interest']
};

const DescriptionCombobox = ({ value, onChange, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const wrapperRef = useRef(null);

  const suggestions = COMMON_DESCRIPTIONS[type] || [];
  const filtered = suggestions.filter(desc => desc.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => { function handleClickOutside(event) { if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false); } document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []);
  useEffect(() => { setSearchTerm(value || ''); }, [value]);

  const handleInputChange = (e) => { const val = e.target.value; setSearchTerm(val); onChange(val); setIsOpen(true); };
  const handleSelect = (desc) => { setSearchTerm(desc); onChange(desc); setIsOpen(false); };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input type="text" value={searchTerm} onChange={handleInputChange} onFocus={() => setIsOpen(true)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all" placeholder="What was this for? (e.g. Lunch)" autoComplete="off" />
      {isOpen && (
        <div className="absolute z-[70] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-h-48 overflow-y-auto animate-in fade-in duration-200">
          {filtered.length > 0 ? (
            <ul className="py-2">{filtered.map((desc, idx) => (<li key={idx} onClick={() => handleSelect(desc)} className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium text-sm transition-colors border-b border-gray-50 last:border-0">{desc}</li>))}</ul>
          ) : (
            <div className="px-4 py-4 text-center text-gray-500 text-sm font-medium">Press Save to use "{searchTerm}"</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DescriptionCombobox;
