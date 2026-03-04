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
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden relative">
          <div className="relative z-10 w-full md:w-2/3 ">
            <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              Student Tools
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
              Build your timetable, calculate your GPA, and manage your schedule efficiently.
              Your essential academic companion for success.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center md:justify-end relative hidden sm:block">
            <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full scale-150 "></div>
            <img
              src="/timetable.png"
              alt="Timetable Preview"
              className="relative z-10 w-full max-w-[200px] h-auto object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-xl"
            />
          </div>
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
