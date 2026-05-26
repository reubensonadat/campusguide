import React, { useState, useEffect, startTransition } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TimetableBuilder from '../components/tools/TimetableBuilder';
import GPACalculator from '../components/tools/GPACalculator';
import FormulaCalculator from '../components/tools/FormulaCalculator';
import CoolFinds from '../components/tools/CoolFinds';
import BudgetTracker from '../components/tools/BudgetTracker';
import PlanYourDay from '../components/tools/PlanYourDay';
import { Library } from 'lucide-react';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';

const tabs = [
  { id: 'timetable', label: 'Timetable Builder' },
  { id: 'gpa', label: 'GPA Calculator' },
  { id: 'budget', label: 'Budget Tracker' },
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
        startTransition(() => {
          setActiveTool(tab);
        });
      }
    });
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    startTransition(() => {
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
        <div className="w-full mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-3 gap-2 md:flex md:flex-row md:flex-wrap w-max md:w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold text-center whitespace-nowrap transition-all ${activeTool === tab.id
                  ? 'bg-[#002F45] text-white shadow-md'
                  : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTool === 'timetable' && <TimetableBuilder />}
          {activeTool === 'gpa' && <GPACalculator />}
          {activeTool === 'budget' && <BudgetTracker />}
          {activeTool === 'formulas' && <FormulaCalculator />}
          {activeTool === 'resources' && <CoolFinds />}
          {activeTool === 'plan-day' && <PlanYourDay />}
        </div>

      </div>
    </div>
  );
};

export default Tools;
