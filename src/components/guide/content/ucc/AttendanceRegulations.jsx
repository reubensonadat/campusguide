import React from 'react';
import { UserCheck, AlertTriangle, Clock, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const AttendanceRegulations = () => {
  // UCC GUIDE: ATTENDANCE REGULATIONS (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Attendance Policy",
      summary: "The '3-Week Rule', Medical Excuses, and Exam Eligibility.",

      steps: [
        { title: "Sign the Register", description: "Ensure you sign the class attendance sheet every single time if available. If you are present but don't sign, you are marked absent." },
        { title: "Track Your Hours", description: "Keep a personal log of classes missed. Don't rely on the lecturer to warn you." },
        { title: "Submit Medical Reports", description: "If sick, visit the University Hospital. Inform the course rep or lecturer immediately if you cannot attend." },
        { title: "Check the Notice Board", description: "Departments often publish a 'List of Students Barred from Exams' two weeks before finals. Check this list early." }
      ],
      commonMistakes: [
        "Thinking that 'signing for a friend' is a minor offense (It is forgery and punishable by rustication).",
        "Assuming a 3-credit course means you can miss 3 *days* of class (It means 9 *hours*).",
        "Waiting until exam week to submit a medical report from 2 months ago."
      ],
      consequences: "If you breach the attendance limit, you will be barred from writing the final exam. This results in an automatic Grade E (Fail) or 'Incomplete', requiring you to resit the entire course.",
      checklist: [
        { text: "Signed register for today's lecture", checked: false },
        { text: "Validated medical report at UCC Hospital", checked: false },
        { text: "Checked attendance percentage mid-semester", checked: false },
        { text: "Informed Class Rep of emergency absence", checked: false }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Contact Hour Protocol"
            icon={UserCheck}
            content="At UCC, paying school fees registers you for the semester, but <strong>attending lectures</strong> qualifies you to write the exam. The University enforces a strict <strong>Contact Hour</strong> policy based on credit weighting."
          />

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-indigo-900 text-xl mb-4 flex items-center gap-2">
                   <ShieldAlert size={24} /> Regulation 11.0: The 3-Week Rule
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   You are automatically withdrawn from a course if you miss more than the cumulative equivalent of <strong>three weeks</strong> of contact hours. This is measured in total hours, not days.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <HourTile credit="1" hours="3" />
                   <HourTile credit="2" hours="6" />
                   <HourTile credit="3" hours="9" />
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Medical Absences" 
               desc="UCC protocol for legitimate illness."
               details={[
                 "Private notes must be verified.",
                 "UCC Hospital validation required.",
                 "Lecturer reserves right of rejection.",
                 "Inform Class Rep immediately."
               ]}
            />
            <ActionCard 
               title="Disciplinary Risks" 
               desc="Severe consequences for forgery."
               details={[
                 "Signing for a friend = Rustication.",
                 "Forging medical notes = Dismissal.",
                 "Barred list is final once published.",
                 "Resit is mandatory if barred."
               ]}
            />
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Management' },
    { id: 'warnings', label: 'Consequences' },
  ];

  return { sections, tabs };
};

const HourTile = ({ credit, hours }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 text-center group-hover:shadow-md transition-all">
     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{credit} Credit Course</div>
     <div className="text-3xl font-black text-indigo-600">Max {hours} hrs</div>
     <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Cumulative Absence</div>
  </div>
);

export default AttendanceRegulations;