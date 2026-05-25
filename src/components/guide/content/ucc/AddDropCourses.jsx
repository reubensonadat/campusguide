import React from 'react';
import { Edit3, AlertCircle, Clock, CheckCircle, Info } from 'lucide-react';
import { CustomGuide } from '../../../common/CustomIcons';

import { ActionCard, InfoBlock } from '../../GuideStyles';

const AddDropCourses = () => {
  // VERIFIED FOR UCC (2025 ACADEMIC YEAR - RESTORED)

  const sections = [
    {
      title: "Add/Drop Process",
      summary: "Simple guide for changing courses during the add/drop period.",

      steps: [
        { title: "Check Academic Calendar", description: "Confirm exact deadline (21 days after lectures begin)." },
        { title: "Consult Advisor", description: "Do not drop a core course by mistake." },
        { title: "Log in to Portal", description: "portal.ucc.edu.gh → Register Courses" },
        { title: "Modify Courses", description: "Add or uncheck courses → Save" },
        { title: "Print Slip", description: "Print 3 copies of your updated slip." },
      ],
      commonMistakes: [
        "Stopping a course without officially dropping it (results in E/F).",
        "Forgetting to print the updated slip.",
        "Registering courses with timetable clashes.",
        "Adding courses without meeting prerequisites.",
        "Going below 15 credits without permission."
      ],
      consequences: "Incorrect registration may prevent you from writing exams or may result in a Grade E for abandoned courses.",
      resources: [
        { title: "UCC Student Portal", description: "Course registration system.", url: "https://portal.ucc.edu.gh" },
        { title: "Academic Affairs (DAA)", description: "Official regulations and policies.", url: "https://daa.ucc.edu.gh" }
      ],
      checklist: [
        { text: "Spoke to Academic Advisor", checked: false },
        { text: "Checked Timetable", checked: false },
        { text: "Updated Portal Registration", checked: false },
        { text: "Printed New Slip", checked: false },
        { text: "HOD Signed Slip", checked: false },
        { text: "Submitted to Department", checked: false }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="The 21-Day Window"
            icon={Clock}
            content="The <strong>Add/Drop Period</strong> is the first 21 days after lectures begin. This is when you can add new courses or remove courses you don’t want before registration closes."
          />

          <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100 relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-rose-900 text-xl mb-4 flex items-center gap-2">
                   <AlertCircle size={24} /> The "Unofficial Drop" Trap
                </h4>
                <p className="text-rose-800/80 font-medium leading-relaxed mb-6">
                   If you stop attending a course without officially dropping it on the portal, it will stay on your record. You will be graded as "Absent," resulting in an <strong>Grade E</strong> which significantly drags down your <strong>CGPA</strong>.
                </p>
                <div className="bg-white/60 p-6 rounded-3xl border border-rose-100">
                   <h5 className="text-xs font-black text-rose-900 uppercase tracking-widest mb-2">Protocol Recommendation</h5>
                   <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      If you only want knowledge but no formal credit, <strong>do not register</strong>. If you want formal credit, you must register and complete it. <strong>Never simply "abandon" a registered course.</strong>
                   </p>
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Credit Load Rules" 
               desc="UCC requires all students to follow approved limits."
               details={[
                 "<strong>Minimum</strong>: 15 credits per semester.",
                 "<strong>Maximum</strong>: 21–24 credits usually.",
                 "Warning: Dropping below 15 requires HOD approval.",
                 "Always verify with your Academic Advisor."
               ]}
            />
            <ActionCard 
               title="Critical Deadlines" 
               desc="After Day 21, no course changes are allowed."
               details={[
                 "Normal Registration: Week 1–2.",
                 "Late Registration: Week 3 (Fine applies).",
                 "Portal Closure: Midnight on Day 21.",
                 "Registration Slip: Must be signed by HOD."
               ]}
            />
          </div>

          <div className="pt-4">
            <h3 className="font-black text-gray-900 text-2xl mb-8 flex items-center">
              <span className="bg-indigo-50 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-sm mr-4 shadow-sm">i</span>
              Formal Procedure
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <StepTile step="01" title="Consult Advisor" text="Talk to your Academic Advisor before adding or dropping any course to avoid missing Cores." />
               <StepTile step="02" title="Portal Action" text="Log in at <strong>portal.ucc.edu.gh</strong> → “Register Courses” → add or remove courses → Click Save." />
               <StepTile step="03" title="Print Slip" text="Print the new registration slip after changes. The old slip becomes invalid immediately." />
            </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Procedure' },
    { id: 'warnings', label: 'Warnings' }
  ];

  return { sections, tabs };
};

const StepTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-2">
      <h5 className="font-black text-slate-900 text-lg leading-tight">{title}</h5>
      <span className="text-3xl font-black text-indigo-50 group-hover:text-indigo-100 transition-colors">{step}</span>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: text }} />
  </div>
);

export default AddDropCourses;
