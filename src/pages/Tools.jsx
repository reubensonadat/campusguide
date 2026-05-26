import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TimetableBuilder from '../components/tools/TimetableBuilder';
import GPACalculator from '../components/tools/GPACalculator';
import FormulaCalculator from '../components/tools/FormulaCalculator';
import CoolFinds from '../components/tools/CoolFinds';
import PlanYourDay from '../components/tools/PlanYourDay';
import { Library } from 'lucide-react';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';

const tabs = [
  { id: 'timetable', label: 'Timetable Builder' },
  { id: 'gpa', label: 'GPA Calculator' },
  { id: 'formulas', label: 'Formula Solver' },
  { id: 'resources', label: 'Cool Finds' },
  { id: 'plan-day', label: 'Plan Your Day' }
];

const Tools = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || 'timetable';
  const [activeTool, setActiveTool] = useState(initialTab);
  const [isAuthVerified, setIsAuthVerified] = useState(false);

  useEffect(() => {
    // Trigger auth immediately when entering the tools section
    triggerAuthSheet(() => {
      setIsAuthVerified(true);
      const tab = searchParams.get('tab');
      if (tab) {
        setActiveTool(tab);
      }
    });
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    triggerAuthSheet(() => {
      setActiveTool(tabId);
      setSearchParams({ tab: tabId }, { replace: true });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/30 font-sans selection:bg-primary-100 selection:text-primary-900 pb-20 md:pb-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
            Student Tools
          </h1>
          <p className="text-gray-500 mt-1">Manage your schedule, track your academic progress, and solve complex formulas.</p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-full mb-8 grid grid-cols-2 md:flex md:flex-wrap md:w-fit gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${activeTool === tab.id
                ? 'bg-[#002F45] text-white shadow-md'
                : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              } ${tab.id === 'plan-day' ? 'col-span-2 md:col-span-1' : ''}`}
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
          {activeTool === 'plan-day' && <PlanYourDay />}
        </div>

      </div>
    </div>
  );
};

export default Tools;
