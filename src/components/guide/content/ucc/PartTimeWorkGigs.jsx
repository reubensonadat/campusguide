import React from 'react';
import { Briefcase, Wallet, Users, Clock, CheckCircle, Info, ShieldAlert, History, ArrowRight, Laptop } from 'lucide-react';
import { CustomGuide } from '../../../common/CustomIcons';

import { ActionCard, InfoBlock } from '../../GuideStyles';

const PartTimeWorkGigs = () => {
  // UCC GUIDE: PART-TIME WORK & GIGS (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Part-time Work Opportunities",
      summary: "Finding and balancing work with studies.",
      
      steps: [
        { title: "Update Your CV", description: "Create a professional CV highlighting your skills and education. Visit Career Services for help." },
        { title: "Check Job Board", description: "Regularly check the Career Services Job Board for on-campus and off-campus opportunities." },
        { title: "Apply for Work-Study", description: "Submit applications for on-campus positions early; they fill up quickly in the first month." },
        { title: "Create Study Schedule", description: "Develop a schedule that allocates sufficient time for classes, studying, work, and rest." },
        { title: "Set Work Hour Limits", description: "Establish clear boundaries for work hours (max 20 hours/week) to ensure academics don't suffer." },
        { title: "Track Earnings", description: "Create a budget to manage your income wisely and save for academic expenses." }
      ],
      keyPoints: [
        "Work-study programs available on campus",
        "Part-time jobs should not exceed 20 hours/week",
        "Academic performance should always be the priority",
        "Skills gained can boost your future graduate CV"
      ],
      tips: [
        "Prioritize studies over extra shifts",
        "Choose jobs related to your field when possible",
        "Save a portion of earnings for emergencies",
        "Build professional relationships with supervisors"
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Professional Development"
            icon={Briefcase}
            content="Working part-time can provide valuable experience and extra income while studying at UCC. The key is finding opportunities that complement your academic journey rather than compromise it. <strong>Remember, your studies should always come first.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="On-Campus Roles" 
               desc="Flexible university-managed positions."
               details={[
                 "<strong>Library Assistant</strong>: Sam Jonah Lib support.",
                 "<strong>Lab Assistant</strong>: Technical faculty roles.",
                 "<strong>Admin Support</strong>: Office help in departments.",
                 "<strong>Work-Study</strong>: Financial aid linked work."
               ]}
            />
            <ActionCard 
               title="Off-Campus Gigs" 
               desc="Opportunities within Cape Coast city."
               details={[
                 "<strong>Retail & Hospitality</strong>: Malls & hotels.",
                 "<strong>Tutoring</strong>: Home classes for SHS students.",
                 "<strong>Freelance</strong>: Graphic design & data entry.",
                 "<strong>Events</strong>: Ushering and protocol work."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Clock size={24} /> The 20-Hour Rule
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   To maintain a First Class or Second Upper CGPA, the University recommends that student workers do not exceed 20 hours of work per week.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <WorkTile step="01" title="Update CV" text="Create a clean, one-page professional CV at Career Services." />
                   <WorkTile step="02" title="Apply Early" text="Work-study slots open in the first two weeks of the semester." />
                   <WorkTile step="03" title="Set Limits" text="Be firm with employers about your exam and lecture schedule." />
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Steps' },
  ];

  return { sections, tabs };
};

const WorkTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">Phase {step}</div>
     <h5 className="font-black text-slate-900 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
  </div>
);

export default PartTimeWorkGigs;