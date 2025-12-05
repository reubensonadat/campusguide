import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const GuideCategory = ({ title, items, isOpen, onToggle }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-3 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </button>
      
      {isOpen && (
        <div className="mt-2 ml-4">
          {items}
        </div>
      )}
    </div>
  );
};

export default GuideCategory;