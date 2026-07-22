import React from 'react';
import { Lightbulb, Variable, ListChecks, AlertTriangle, GraduationCap, ArrowRight, BrainCircuit } from 'lucide-react';

const BookOpenIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21 18H6C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H21V22H6C4.34315 22 3 20.6569 3 19V4C3 2.89543 3.89543 2 5 2H21V18ZM16 9V7H8V9H16Z" />
  </svg>
);

const Section = ({ icon: Icon, title, color, children }) => (
  <div className="rounded-xl border border-gray-200/60 bg-white overflow-hidden shadow-sm">
    <div className={`flex items-center gap-2 px-4 py-3 ${color.bg} border-b border-gray-100`}>
      <div className={`w-6 h-6 rounded-lg ${color.iconBg} flex items-center justify-center`}>
        <Icon className={`w-3.5 h-3.5 ${color.iconText}`} />
      </div>
      <span className={`text-xs font-bold ${color.text} uppercase tracking-wider`}>{title}</span>
    </div>
    <div className="px-4 py-3">
      {children}
    </div>
  </div>
);

const TrapCard = ({ title, description, index }) => (
  <div className="flex gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100/60">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200/70 flex items-center justify-center">
      <span className="text-[10px] font-bold text-amber-800">{index}</span>
    </div>
    <div>
      <p className="text-xs font-bold text-amber-900 mb-0.5">{title}</p>
      <p className="text-[11px] text-amber-700 leading-relaxed">{description}</p>
    </div>
  </div>
);

const LearningModePanel = ({ learning }) => {
  if (!learning) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <BookOpenIcon className="w-7 h-7 text-gray-300" />
        </div>
        <p className="text-sm font-bold text-gray-400 mb-1">No study guide available yet</p>
        <p className="text-xs text-gray-300 max-w-xs">Learning content is being written for this formula. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 scrollbar-thin">
      {/* 1. The Intuition */}
      <Section
        icon={BrainCircuit}
        title="The Intuition (The 'Why')"
        color={{ bg: 'bg-violet-50/70', iconBg: 'bg-violet-100', iconText: 'text-violet-700', text: 'text-violet-800' }}
      >
        <p className="text-sm text-gray-700 leading-relaxed">{learning.intuition}</p>
      </Section>

      {/* 2. Variable Breakdown */}
      <Section
        icon={Variable}
        title="Variable Breakdown & Units"
        color={{ bg: 'bg-blue-50/70', iconBg: 'bg-blue-100', iconText: 'text-blue-700', text: 'text-blue-800' }}
      >
        <div className="space-y-2">
          {learning.variableBreakdown.map((v, i) => (
            <div key={v.id} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-bold text-gray-800 font-mono">{v.siUnit ? `${v.id} (${v.siUnit})` : v.id}</span>
                {v.altUnits && (
                  <span className="text-[10px] text-gray-400 font-normal">also: {v.altUnits}</span>
                )}
              </div>
              <p className="text-xs text-gray-600 mb-1.5 ml-7">{v.description}</p>
              {v.commonTraps && (
                <div className="ml-7 flex items-start gap-1.5 text-[11px] text-amber-700 bg-amber-50 rounded-md px-2 py-1">
                  <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>{v.commonTraps}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Step-by-Step Solving Logic */}
      <Section
        icon={ListChecks}
        title="Step-by-Step Solving Logic"
        color={{ bg: 'bg-emerald-50/70', iconBg: 'bg-emerald-100', iconText: 'text-emerald-700', text: 'text-emerald-800' }}
      >
        <div className="space-y-1.5">
          {learning.solvingLogic.map((step, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                <span className="text-[10px] font-bold text-emerald-700">{i + 1}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Edge Cases & Traps */}
      <Section
        icon={AlertTriangle}
        title="Edge Cases & University-Level Traps"
        color={{ bg: 'bg-amber-50/70', iconBg: 'bg-amber-100', iconText: 'text-amber-700', text: 'text-amber-800' }}
      >
        <div className="space-y-2">
          {learning.edgeCases.map((trap, i) => (
            <TrapCard key={i} index={i + 1} title={trap.title} description={trap.description} />
          ))}
        </div>
      </Section>

      {/* 5. Walkthrough Example */}
      <Section
        icon={GraduationCap}
        title="Walkthrough Example"
        color={{ bg: 'bg-sky-50/70', iconBg: 'bg-sky-100', iconText: 'text-sky-700', text: 'text-sky-800' }}
      >
        <div className="rounded-lg bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-100 p-4 mb-3">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-sky-200/70 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-sky-800">Q</span>
            </div>
            <p className="text-sm font-medium text-sky-900 leading-relaxed">{learning.walkthroughExample.problem}</p>
          </div>
        </div>
        <div className="space-y-2 mb-3">
          {learning.walkthroughExample.solution.map((step, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center mt-0.5">
                <ArrowRight className="w-3 h-3 text-sky-600" />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-mono">{step}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-emerald-50 border border-emerald-200/70 p-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Answer:</span>
            <span className="text-sm font-bold text-emerald-800 font-mono">{learning.walkthroughExample.answer}</span>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default LearningModePanel;
