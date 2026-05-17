import React from 'react';
import { BookOpen, AlertTriangle, Calculator, FileText, CheckCircle, Info, ShieldAlert, GraduationCap } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const ExamsAssessmentRules = () => {
  // UCC GUIDE: EXAMS & ASSESSMENT (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Examination Rules",
      summary: "Grading System, GPA Calculation, and Exam Hall Etiquette.",

      steps: [
        { title: "Check Exam Timetable", description: "Timetables are released 2 weeks prior. Check your specific Course Codes carefully (e.g., ASP 102 vs ASP 102A)." },
        { title: "Locate Venue Early", description: "If your exam is at 'NEA', 'Ellen K', or 'G-Block', go there the day before to know the exact location." },
        { title: "Enter Exam Hall", description: "Arrive 30 minutes early. You will be searched. Remove all watches and empty your pockets." },
        { title: "Fill Answer Booklet", description: "Write ONLY your Index Number. Do NOT write your name anywhere on the booklet. Do NOT tear any part of the booklet." },
        { title: "Sign Attendance Sheet", description: "This is your only proof of presence. If you forget to sign, you will be marked 'Absent' (IC/Fail)." }
      ],
      commonMistakes: [
        "Wearing a Smart Watch (Instant seizure and malpractice case).",
        "Writing your name on the answer booklet (Your script may be rejected).",
        "Bringing a phone into the hall even if it's switched off (Still counts as malpractice).",
        "Using 'liquid paper' (correction fluid) on OMR sheets (It ruins the scanner).",
        "Entering the exam hall 30 minutes after the start time (You will be denied entry)."
      ],
      consequences: "Examination malpractice leads to rustication (suspension for one year) or dismissal. A grade of 'E' (Fail) requires you to resit the course the next time it is offered.",
      resources: [
        { title: "Student Handbook (Exams)", description: "Official rules on assessment.", url: "https://elearning.ucc.edu.gh/" },
        { title: "Past Questions Portal", description: "Access previous exam papers.", url: "#" }
      ],
      checklist: [
        { text: "Printed Exam Permit (Colour)", checked: false },
        { text: "Checked Seat Number on Notice Board", checked: false },
        { text: "Bought 2 Blue/Black Pens", checked: false },
        { text: "Removed Smart Watch", checked: false },
        { text: "Phone left at home/hostel", checked: false },
        { text: "Dressed appropriately (No cap)", checked: false }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Zero Tolerance Policy"
            icon={ShieldAlert}
            content="Examinations at UCC are strictly regulated. The pass mark is <strong>50% (Grade D)</strong>. The University operates a strict zero-tolerance policy regarding malpractice. Ignorance of rules is never an excuse."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Grading System" 
               desc="UCC's 4.0 weighted scale."
               details={[
                 "<strong>A (4.0)</strong>: 80 - 100 (Excellent)",
                 "<strong>B+ (3.5)</strong>: 75 - 79 (Very Good)",
                 "<strong>B (3.0)</strong>: 70 - 74 (Good)",
                 "<strong>C (2.0)</strong>: 60 - 64 (Fair)",
                 "<strong>D (1.0)</strong>: 50 - 54 (Weak Pass)",
                 "<strong>E (0.0)</strong>: Below 50 (Fail)"
               ]}
            />
            <ActionCard 
               title="Banned Contraband" 
               desc="Items that trigger instant malpractice cases."
               details={[
                 "<strong>Smart Devices</strong>: Watches, Rings, Phones.",
                 "<strong>Liquid Paper</strong>: Correction fluid is banned.",
                 "<strong>Headgear</strong>: Hats/Caps (Religious veils need permit).",
                 "<strong>Opaque Cases</strong>: Use transparent pencil cases."
               ]}
            />
          </div>

          <div className="bg-slate-900 text-slate-100 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
             
             <div className="relative space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700 pb-8">
                   <div>
                      <h4 className="text-3xl font-black text-white tracking-tight">GPA Masterclass</h4>
                      <p className="text-slate-400 font-medium">Understanding the math behind your degree.</p>
                   </div>
                   <div className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-2xl border border-indigo-500/30 text-sm font-black uppercase tracking-widest">
                      ∑ Calculation
                   </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
                         <h5 className="text-indigo-400 font-black text-sm uppercase mb-4 tracking-widest">Key Definitions</h5>
                         <ul className="space-y-4">
                            <li className="flex items-center justify-between text-sm"><span className="text-slate-400">CP (Course Credit)</span> <span className="font-bold text-white">Weighting</span></li>
                            <li className="flex items-center justify-between text-sm"><span className="text-slate-400">GP (Grade Point)</span> <span className="font-bold text-white">4.0 Scale</span></li>
                            <li className="flex items-center justify-between text-sm"><span className="text-slate-400">GPA</span> <span className="font-bold text-white">Current Semester</span></li>
                            <li className="flex items-center justify-between text-sm"><span className="text-slate-400">CGPA</span> <span className="font-bold text-white">Cumulative</span></li>
                         </ul>
                      </div>
                      <div className="bg-indigo-500/10 p-6 rounded-3xl border border-indigo-500/20">
                         <p className="text-sm text-indigo-200 leading-relaxed font-medium">
                            <strong>Note:</strong> CGPA sums all grade points from ALL semesters divided by total credits. It is NOT the simple average of semester GPAs.
                         </p>
                      </div>
                   </div>

                   <div className="bg-white rounded-[2rem] p-8 text-slate-900 shadow-xl">
                      <h5 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-6">Example Semester (GPA 3.2)</h5>
                      <div className="space-y-3 mb-8">
                         <ExampleRow code="ECO 101" credits="3" grade="B" gp="9" color="bg-indigo-50 text-indigo-700" />
                         <ExampleRow code="ISB 104" credits="3" grade="A" gp="12" color="bg-blue-50 text-blue-700" />
                         <ExampleRow code="EPS 111" credits="3" grade="C" gp="6" color="bg-purple-50 text-purple-700" />
                         <ExampleRow code="CMS 107" credits="3" grade="B" gp="9" color="bg-pink-50 text-pink-700" />
                         <ExampleRow code="ASP 102A" credits="3" grade="A" gp="12" color="bg-emerald-50 text-emerald-700" />
                      </div>
                      <div className="border-t-2 border-slate-100 pt-4 flex flex-col items-end gap-1">
                         <p className="text-xs font-bold text-slate-400">Total Credits: 15</p>
                         <p className="text-xs font-bold text-slate-400">Total CP × GP: 48</p>
                         <div className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-2xl w-full text-center">
                            <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Semester GPA</p>
                            <p className="text-2xl font-black">48 ÷ 15 = 3.20</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Procedure' },
    { id: 'warnings', label: 'Malpractice' },
  ];

  return { sections, tabs };
};

const ExampleRow = ({ code, credits, grade, gp, color }) => (
  <div className={`flex items-center justify-between p-3 rounded-2xl ${color} font-black text-xs`}>
     <span>{code}: {credits} Credits ({grade})</span>
     <span>CP × GP = {gp}</span>
  </div>
);

export default ExamsAssessmentRules;