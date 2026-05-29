import React, { useState, useEffect, startTransition, useRef } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import TimetableBuilder from '../components/tools/TimetableBuilder';
import GPACalculator from '../components/tools/GPACalculator';
import FormulaCalculator from '../components/tools/FormulaCalculator';
import CoolFinds from '../components/tools/CoolFinds';
import BudgetTracker from '../components/tools/BudgetTracker';
import PlanYourDay from '../components/tools/PlanYourDay';
import Assignments from '../components/tools/Assignments';
import { Library } from 'lucide-react';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';
import PageHeader from '../components/common/PageHeader';

const tabs = [
  { id: 'timetable', label: 'Timetable Builder' },
  { id: 'gpa', label: 'GPA Calculator' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'budget', label: 'Budget Tracker' },
  { id: 'formulas', label: 'Formula Solver' },
  { id: 'resources', label: 'Cool Finds' },
  { id: 'plan-day', label: 'Plan Your Day' }
];

const Tools = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthVerified, setIsAuthVerified] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef([]);
  
  // Extract the active tab from the URL path (e.g. /tools/gpa -> 'gpa')
  const activeTool = location.pathname.split('/').pop() || 'timetable';

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger auth immediately when entering the tools section
    triggerAuthSheet(() => {
      setIsAuthVerified(true);
    });
  }, [location.pathname]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const activeIndex = tabs.findIndex(tab => activeTool === tab.id);
      if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
        const el = tabsRef.current[activeIndex];
        setPillStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1
        });
      }
    }, 15);
    return () => clearTimeout(timeoutId);
  }, [activeTool]);

  const handleTabChange = (tabId) => {
    startTransition(() => {
      navigate(`/tools/${tabId}`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/30 font-sans selection:bg-primary-100 selection:text-primary-900 pb-20 md:pb-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[calc(2rem_+_env(safe-area-inset-top,0px))] pb-8">

        <PageHeader title="Student Tools" subtitle="Manage your schedule, track your academic progress, and solve complex formulas." />

        {/* Premium Custom Horizontal Tab Switcher */}
        <div className="w-full mb-8 relative">
          <div className="overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            <div className="relative inline-flex items-center gap-1  bg-white overflow-auto p-1 rounded-xl  w-full sm:w-auto z-0 shadow-sm">
              {/* Sliding Pill */}
              <div 
                className="absolute h-[calc(100%-8px)] bg-[#002F45] rounded-lg z-0"
                style={{ 
                  left: `${pillStyle.left}px`, 
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                  transition: 'left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-in'
                }}
              />
              {tabs.map((tab, index) => {
                const isActive = activeTool === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={el => tabsRef.current[index] = el}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative z-10 px-4 py-2 rounded-lg text-xs font-bold text-center whitespace-nowrap flex-1 sm:flex-initial transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Routes>
            <Route path="/" element={<Navigate to="timetable" replace />} />
            <Route path="timetable" element={<TimetableBuilder />} />
            <Route path="gpa" element={<GPACalculator />} />
            <Route path="assignments" element={<Assignments />} />
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
