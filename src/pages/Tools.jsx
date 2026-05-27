import React, { useState, useEffect, startTransition } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthVerified, setIsAuthVerified] = useState(false);
  
  // Extract the active tab from the URL path (e.g. /tools/gpa -> 'gpa')
  const activeTool = location.pathname.split('/').pop() || 'timetable';

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger auth immediately when entering the tools section
    triggerAuthSheet(() => {
      setIsAuthVerified(true);
    });
  }, [location.pathname]);

  const handleTabChange = (tabId) => {
    startTransition(() => {
      navigate(`/tools/${tabId}`);
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
          <Routes>
            <Route path="/" element={<Navigate to="timetable" replace />} />
            <Route path="timetable" element={<TimetableBuilder />} />
            <Route path="gpa" element={<GPACalculator />} />
            <Route path="budget" element={<BudgetTracker />} />
            <Route path="formulas" element={<FormulaCalculator />} />
            <Route path="resources" element={<CoolFinds />} />
            <Route path="plan-day" element={<PlanYourDay />} />
          </Routes>
        </div>

        {/* Premium Tools Banner (Moved to bottom) */}
        <div className="mt-8 mb-6">
          <button 
            onClick={() => navigate('/tools/letter-generator')}
            className="w-full bg-[#002F45] text-white rounded-3xl p-6 shadow-md hover:bg-[#001a26] hover:-translate-y-0.5 transition-all active:scale-95 text-left relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">AI Powered</span>
              </div>
              <h3 className="text-xl font-black mb-1">Formal Letter Generator</h3>
              <p className="text-sm font-medium text-white/70 max-w-sm">Draft professional academic letters and petitions in seconds.</p>
            </div>
            {/* Decorative background shape */}
            <div className="absolute -right-8 -bottom-12 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Library size={160} />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Tools;
