import React from 'react';
import { Clock, Calendar, ListTodo, Zap, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Target } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const TimeManagement = () => {
  // UCC GUIDE: TIME MANAGEMENT STRATEGIES (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Time Management Strategies",
      summary: "Master your schedule and boost productivity.",
      
      steps: [
        { title: "Conduct a Time Audit", description: "For one week, track how you spend your time to identify patterns and time-wasters." },
        { title: "Define Your Priorities", description: "Use the Eisenhower Matrix to categorize tasks by urgency and importance." },
        { title: "Create a Weekly Schedule", description: "Plan your week in advance, allocating time for classes, study, and personal activities." },
        { title: "Use Productivity Tools", description: "Employ digital tools like calendars or to-do lists to stay organized." },
        { title: "Implement Time Blocking", description: "Dedicate specific, uninterrupted blocks of time to important tasks." },
        { title: "Review and Adjust Weekly", description: "At the end of each week, review your progress and adjust your strategies." }
      ],
      keyPoints: [
        "Prioritize tasks using the importance/urgency matrix.",
        "Use time blocking for deep, focused work sessions.",
        "Set realistic daily and weekly goals.",
        "Include breaks and buffer time in your schedule."
      ],
      tips: [
        "Start your day with your most important task (Eat the Frog).",
        "Use the 2-Minute Rule: if it takes < 2 mins, do it now.",
        "Protect your peak energy hours for demanding work.",
        "Learn to say 'no' to non-essential commitments."
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="The 24-Hour Equator"
            icon={Clock}
            content="Effective time management is the cornerstone of academic success. Juggling lectures, assignments, and social life requires a deliberate strategy. <strong>Mastering these techniques will help you achieve more with less stress.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Strategy & Planning" 
               desc="Organize tasks for maximum efficiency."
               details={[
                 "<strong>Eisenhower Matrix</strong>: Urgent vs Important.",
                 "<strong>Weekly Planning</strong>: The Sunday Review.",
                 "<strong>SMART Goals</strong>: Specific & measurable.",
                 "<strong>Backwards Planning</strong>: Start from the deadline."
               ]}
            />
            <ActionCard 
               title="Focus & Execution" 
               desc="Techniques to get things done."
               details={[
                 "<strong>Time Blocking</strong>: Dedicated 'Deep Work'.",
                 "<strong>Pomodoro</strong>: 25/5 rhythm for stamina.",
                 "<strong>Task Batching</strong>: Grouping similar chores.",
                 "<strong>Single-Tasking</strong>: Zero browser tabs rule."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Target size={24} /> The Time Mastery Process
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   Don't just work harder; build a system that manages your energy throughout the week.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <StrategyTile step="01" title="Time Audit" text="Track everything for 7 days to see where the leak is." />
                   <StrategyTile step="02" title="Eat the Frog" text="Do the hardest, scariest task first thing in the morning." />
                   <StrategyTile step="03" title="Sunday Review" text="Spend 20 minutes planning the upcoming week's blocks." />
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Time Mastery Process' },
  ];

  return { sections, tabs };
};

const StrategyTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">Step {step}</div>
     <h5 className="font-black text-slate-900 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
  </div>
);

export default TimeManagement;