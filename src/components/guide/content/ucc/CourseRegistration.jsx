import React from 'react';
import { BookOpen, RefreshCw, Lock, Terminal, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const CourseRegistration = () => {
  // UCC GUIDE: COURSE REGISTRATION (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Course Registration",
      summary: "Navigating the Portal, Financial Clearance, and the 'Rotational' Course System.",

      steps: [
        { title: "Pay Fees", description: "Pay the required percentage at an approved bank using Transflow/Smartpay. Keep the receipt." },
        { title: "Check 'Hold' Status", description: "Log into portal.ucc.edu.gh. Ensure 'Financial Hold' says 'No' before proceeding." },
        { title: "Check Assigned Courses", description: "Look for your assigned Liberal/African Studies & ITS/Info Lit. These are usually pre-loaded based on your rotation." },
        { title: "Select Electives", description: "(Arts/Social Sciences only) Tick your preferred Electives to meet minimum credit hours (usually 15)." },
        { title: "Submit (Don't just Save)", description: "Verify courses. Click 'SUBMIT'. Clicking 'Save' only creates a draft and does NOT register you." },
        { title: "Print for Records", description: "Print the registration slip for your own file. If it's on the portal, you are registered." }
      ],
      commonMistakes: [
        "Clicking 'Save' instead of 'Submit' (You are not registered until you Submit).",
        "Trying to change a randomly assigned Liberal Course (It is usually fixed).",
        "Missing your ITS Group time (Groups are assigned, check the notice board).",
        "Selecting fewer than 15 credit hours (Under-load).",
        "Forgetting to register for Communication Skills (It is compulsory)."
      ],
      consequences: "If you attend classes but fail to 'Submit' on the portal, your name will not appear on the Exam List.",
      resources: [
        { title: "UCC Student Portal", description: "The only place to register.", url: "https://portal.ucc.edu.gh" },
        { title: "Academic Calendar", description: "Check opening/closing dates.", url: "https://ucc.edu.gh/calendar" }
      ],
      checklist: [
        { text: "Paid ~60% of Fees", checked: false },
        { text: "Financial Hold Lifted", checked: false },
        { text: "Checked Assigned Liberal/African Studies", checked: false },
        { text: "Added Required Electives", checked: false },
        { text: "Clicked 'SUBMIT' (Not Save)", checked: false },
        { text: "Printed Slip for Records", checked: false }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Registration Protocol"
            icon={BookOpen}
            content="Registration is the official process of enrolling in specific courses. <strong>No Registration = No Student Status.</strong> Even if you pay fees, you are not a student until you register courses on the portal and click 'Submit'."
          />

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-indigo-900 text-xl mb-4 flex items-center gap-2">
                   <RefreshCw size={24} /> The "Rotational" System
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                   UCC splits Freshers into two groups based on College/Faculty for Liberal and African Studies courses. You generally do <strong>not</strong> choose these; they are pre-assigned.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                      <h5 className="font-black text-indigo-700 mb-3 uppercase tracking-wider text-xs">Group A Pattern</h5>
                      <ul className="text-sm text-slate-600 space-y-2 font-medium">
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> <strong>Sem 1:</strong> African Studies + ITS</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> <strong>Sem 2:</strong> Liberal + Info Literacy</li>
                      </ul>
                   </div>
                   <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                      <h5 className="font-black text-indigo-700 mb-3 uppercase tracking-wider text-xs">Group B Pattern</h5>
                      <ul className="text-sm text-slate-600 space-y-2 font-medium">
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> <strong>Sem 1:</strong> Liberal + Info Literacy</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> <strong>Sem 2:</strong> African Studies + ITS</li>
                      </ul>
                   </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                   <p className="text-xs text-indigo-500 font-bold italic">* Communication Skills is mandatory for EVERYONE in both semesters.</p>
                   <p className="text-xs text-indigo-500 font-bold italic">* ITS is group-based; check departmental notice boards for your time.</p>
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Fixed / Block Courses" 
               desc="Common in Medical School, Nursing, Pharmacy, & Engineering."
               details={[
                 "Courses are pre-determined by Dept.",
                 "Add/Drop is rarely required.",
                 "One-click 'Register All' functionality.",
                 "Strict adherence to faculty paths."
               ]}
            />
            <ActionCard 
               title="Flexible / Electives" 
               desc="Common in Arts, Social Sciences, & Business."
               details={[
                 "Mix of Core and Elective courses.",
                 "Manually select to meet credit hours.",
                 "<strong>Auditing</strong>: Knowledge-only enrollment.",
                 "Minimum 15 credit hours usually required."
               ]}
            />
          </div>

          <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100">
             <h4 className="font-black text-emerald-900 text-xl mb-3 flex items-center gap-2">
                <Lock size={20} /> The "Financial Hold" Rule
             </h4>
             <p className="text-emerald-800/70 text-sm font-medium leading-relaxed">
               The portal locks registration until you pay ~60% fees. Payment via Transflow usually takes <strong>2-24 hours</strong> to clear the "Hold" on the portal. Ensure this is cleared before the registration deadline.
             </p>
          </div>

          <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100">
             <h4 className="font-black text-blue-900 text-xl mb-3 flex items-center gap-2">
                <Terminal size={20} /> When Do Lectures Start?
             </h4>
             <p className="text-blue-800/70 text-sm font-medium leading-relaxed">
               Lectures typically begin <strong>when the official timetable is released</strong>. If the timetable is not out, wait for official communication from your Course Reps. Do not panic if classes don't start exactly on arrival day.
             </p>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Procedure' },
    { id: 'warnings', label: 'Traps' },
  ];

  return { sections, tabs };
};

export default CourseRegistration;