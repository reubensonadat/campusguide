import React from 'react';

const ExamsAssessmentRules = () => {
  // UCC GUIDE: EXAMS & ASSESSMENT
  // Verified Data: 2025 Full Grading System & Strict Prohibited Items List.
  // Updates: Added "GPA Calculation" section in a unique Dark Mode style.

  const sections = [
    {
      title: "Examination Rules",
      summary: "Grading System, GPA Calculation, and Exam Hall Etiquette.",
      
      // --- OVERVIEW CONTENT ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO CARD --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Examinations at UCC are strictly regulated. The pass mark is <strong>50% (Grade D)</strong>. 
              The University operates a <strong>"Zero Tolerance"</strong> policy. Ignorance of the dress code or prohibited items rules is never an excuse.
            </p>
          </div>

          {/* --- GRADING SCALE & CONTRABAND GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 1. Grading Scale */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-indigo-900 text-lg mb-3 flex items-center">
                <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Full Scale</span>
                Grading System
              </h4>
              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex justify-between bg-white/60 p-1.5 rounded"><span>80 - 100</span> <span className="font-bold text-indigo-700">A (4.0) - Excellent</span></div>
                <div className="flex justify-between bg-white/60 p-1.5 rounded"><span>75 - 79</span> <span className="font-bold text-indigo-700">B+ (3.5) - Very Good</span></div>
                <div className="flex justify-between bg-white/60 p-1.5 rounded"><span>70 - 74</span> <span className="font-bold text-indigo-700">B (3.0) - Good</span></div>
                <div className="flex justify-between bg-white/60 p-1.5 rounded"><span>65 - 69</span> <span className="font-bold text-indigo-700">C+ (2.5) - Average</span></div>
                <div className="flex justify-between bg-white/60 p-1.5 rounded"><span>60 - 64</span> <span className="font-bold text-indigo-700">C (2.0) - Fair</span></div>
                <div className="flex justify-between bg-white/60 p-1.5 rounded"><span>55 - 59</span> <span className="font-bold text-yellow-700">D+ (1.5) - Barely Pass</span></div>
                <div className="flex justify-between bg-white/60 p-1.5 rounded"><span>50 - 54</span> <span className="font-bold text-green-700">D (1.0) - Weak Pass</span></div>
                <div className="flex justify-between bg-red-100 p-1.5 rounded"><span>Below 50</span> <span className="font-bold text-red-700">E (0.0) - Fail</span></div>
              </div>
            </div>

            {/* 2. Contraband & Dress Code */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-red-900 text-lg mb-3 flex items-center">
                <span className="bg-red-200 text-red-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Banned</span>
                Hall Regulations
              </h4>
              <div className="space-y-3">
                <div className="bg-white/70 p-3 rounded border border-red-100">
                  <p className="text-xs font-bold text-red-800 uppercase mb-1">Strictly Prohibited Items</p>
                  <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                    <li><strong>Smart Watches</strong> & Smart Rings (Must be removed).</li>
                    <li><strong>Mobile Phones</strong> (Even if switched off).</li>
                    <li><strong>Programmable Calculators</strong> (Unless authorized).</li>
                    <li><strong>Opaque Pencil Cases</strong> (Use transparent ones).</li>
                    <li><strong>Correction Fluid</strong> (Liquid Paper is banned).</li>
                  </ul>
                </div>

                <div className="bg-white/70 p-3 rounded border border-red-100">
                  <p className="text-xs font-bold text-red-800 uppercase mb-1">Dress Code & Appearance</p>
                  <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                    <li><strong>No Headgear:</strong> Hats, Caps, and Berets are forbidden (Religious veils permit required).</li>
                    <li><strong>No Sunglasses</strong> (Unless on medical grounds).</li>
                    <li><strong>Decency:</strong> Sleeveless tops and revealing attire are often turned away by invigilators.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* --- GPA CALCULATION (Unique Dark Style) --- */}
          <div className="bg-slate-800 text-slate-100 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl"></div>
             
             <h4 className="font-bold text-xl mb-4 flex items-center text-yellow-400 relative z-10">
                <span className="bg-yellow-500/20 p-2 rounded-lg mr-3 text-sm font-mono">∑</span>
                How to Calculate Your GPA
             </h4>
             
             <div className="grid md:grid-cols-2 gap-8 relative z-10">
                {/* Formula Explanation */}
                <div className="space-y-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Your Grade Point Average (GPA) is a weighted calculation. It is <strong>not</strong> just an average of your marks. 
                    Courses with higher <strong>Credit Hours</strong> affect your GPA more than those with lower credits.
                  </p>
                  
                  <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-700 text-center">
                    <div className="mb-2 text-slate-400">The Formula</div>
                    <span className="text-green-400">Total Grade Points</span> 
                    <span className="mx-2 text-slate-500">÷</span> 
                    <span className="text-blue-400">Total Credits</span> 
                    <span className="mx-2 text-white">=</span> 
                    <span className="text-yellow-400 font-bold">GPA</span>
                  </div>
                </div>

                {/* Concrete Example */}
                <div className="bg-white text-slate-800 p-4 rounded-lg text-sm shadow-md">
                  <p className="font-bold mb-2 border-b border-slate-200 pb-1 text-xs uppercase tracking-wide text-slate-500">Hypothetical Semester</p>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span>1. Research Methods (3 Credits)</span>
                      <span className="font-mono text-indigo-600 font-bold">A (4.0)</span>
                    </div>
                    <div className="text-xs text-slate-500 text-right border-b border-slate-100 pb-1">
                      Calculation: 3 × 4.0 = <span className="text-slate-700 font-medium">12.0</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>2. African Studies (2 Credits)</span>
                      <span className="font-mono text-orange-600 font-bold">C (2.0)</span>
                    </div>
                    <div className="text-xs text-slate-500 text-right border-b border-slate-100 pb-1">
                      Calculation: 2 × 2.0 = <span className="text-slate-700 font-medium">4.0</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-slate-700 pt-1">
                    <span>Total Credits: 5</span>
                    <span>Total Points: 16.0</span>
                  </div>
                  
                  <div className="mt-3 bg-yellow-50 p-2 rounded border border-yellow-100 text-center">
                    <span className="text-yellow-800 font-bold">GPA = 16.0 ÷ 5 = 3.2</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      ),

      // --- STEPS TAB DATA ---
      steps: [
        {
          title: "Check Exam Timetable",
          description: "Timetables are released 2 weeks prior. Check your specific Course Codes carefully (e.g., ASP 102 vs ASP 102A)."
        },
        {
          title: "Print Exam Permit",
          description: "You must print your Exam Permit from the portal. It must show your photo and registered courses."
        },
        {
          title: "Locate Venue Early",
          description: "If your exam is at 'NEA', 'Ellen K', or 'G-Block', go there the day before to know the exact location."
        },
        {
          title: "Enter Exam Hall",
          description: "Arrive 30 minutes early. You will be searched. Remove all watches and empty your pockets."
        },
        {
          title: "Fill Answer Booklet",
          description: "Write ONLY your Index Number. Do NOT write your name anywhere on the booklet. Do NOT tear any part of the booklet."
        },
        {
          title: "Sign Attendance Sheet",
          description: "This is your only proof of presence. If you forget to sign, you will be marked 'Absent' (IC/Fail)."
        }
      ],

      // --- WARNINGS TAB DATA ---
      commonMistakes: [
        "Wearing a Smart Watch (Instant seizure and malpractice case).",
        "Writing your name on the answer booklet (Your script may be rejected).",
        "Bringing a phone into the hall even if it's switched off (Still counts as malpractice).",
        "Using 'liquid paper' (correction fluid) on OMR sheets (It ruins the scanner).",
        "Entering the exam hall 30 minutes after the start time (You will be denied entry)."
      ],
      consequences: "Examination malpractice leads to rustication (suspension for one year) or dismissal. A grade of 'E' (Fail) requires you to resit the course the next time it is offered (usually a full year later).",

      // --- RESOURCES TAB DATA ---
      resources: [
        {
          title: "Student Handbook (Exams)",
          description: "Official rules on assessment.",
          url: "https://ucc.edu.gh/student-handbook"
        },
        {
          title: "Past Questions Portal",
          description: "Access previous exam papers.",
          url: "https://library.ucc.edu.gh/past-questions"
        }
      ],

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Printed Exam Permit (Colour)", checked: false },
        { text: "Checked Seat Number on Notice Board", checked: false },
        { text: "Bought 2 Blue/Black Pens", checked: false },
        { text: "Removed Smart Watch", checked: false },
        { text: "Phone left at home/hostel", checked: false },
        { text: "Dressed appropriately (No cap)", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Procedure' },
    { id: 'warnings', label: 'Malpractice' },
    { id: 'resources', label: 'Resources' },
    { id: 'checklist', label: 'Checklist' }
  ];

  return { sections, tabs };
};

export default ExamsAssessmentRules;