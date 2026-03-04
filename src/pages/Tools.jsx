import React, { useState } from 'react';
import TimetableBuilder from '../components/tools/TimetableBuilder';
import GPACalculator from '../components/tools/GPACalculator';
import { Sparkles } from 'lucide-react';

const Tools = () => {
  const [activeTool, setActiveTool] = useState('timetable');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/30 font-sans selection:bg-indigo-100 dark:bg-indigo-900/40 selection:text-indigo-900 dark:text-indigo-400 pb-20 md:pb-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Student Tools
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your schedule and track your academic progress.</p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="bg-white dark:bg-gray-900 p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 w-fit mb-8 flex gap-1">
          <button
            onClick={() => setActiveTool('timetable')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTool === 'timetable'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900'
              }`}
          >
            Timetable Builder
          </button>
          <button
            onClick={() => setActiveTool('gpa')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTool === 'gpa'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-900'
              }`}
          >
            GPA Calculator
          </button>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTool === 'timetable' ? (
            <TimetableBuilder />
          ) : (
            <GPACalculator />
          )}
        </div>

      </div>
    </div>
  );
};

export default Tools;
