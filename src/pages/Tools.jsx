import React, { useState } from 'react';
import TimetableBuilder from '../components/tools/TimetableBuilder';
import GPACalculator from '../components/tools/GPACalculator';
import FormulaCalculator from '../components/tools/FormulaCalculator';
import CoolFinds from '../components/tools/CoolFinds';
import { Sparkles, Library } from 'lucide-react';

const tabs = [
  { id: 'timetable', label: 'Timetable Builder' },
  { id: 'gpa', label: 'GPA Calculator' },
  { id: 'formulas', label: 'Formula Solver' },
  { id: 'resources', label: 'Cool Finds' }
];

const Tools = () => {
  const [activeTool, setActiveTool] = useState('timetable');

  return (
    <div className="min-h-screen bg-gray-50/30 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20 md:pb-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            Student Tools
          </h1>
          <p className="text-gray-500 mt-1">Manage your schedule, track your academic progress, and solve complex formulas.</p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-full md:w-fit mb-8 flex gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${activeTool === tab.id
                ? 'bg-[#002F45] text-white shadow-md'
                : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTool === 'timetable' && <TimetableBuilder />}
          {activeTool === 'gpa' && <GPACalculator />}
          {activeTool === 'formulas' && <FormulaCalculator />}
          {activeTool === 'resources' && <CoolFinds />}
        </div>

      </div>
    </div>
  );
};

export default Tools;
