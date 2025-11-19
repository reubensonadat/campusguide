import React from 'react';

const AddDropCourses = () => {
  // UCC GUIDE: ADD/DROP COURSES (AMENDING REGISTRATION)
  // Verified Data: 2025 Academic Year Policies
  // Design: "Pastel Card" Layout for Overview; specific 'warnings' tab enabled.

  const sections = [
    {
      title: "Add/Drop Process",
      summary: "How to amend your registration during the grace period.",
      
      // --- OVERVIEW CONTENT (Pastel Card Design) ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO CARD --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              The <strong>Add/Drop Period</strong> is a specific window (usually 21 days after lectures begin) allowed for students to amend their course registration. 
              This is your chance to fix schedule conflicts or drop courses you are not eligible for.
            </p>
          </div>

          {/* --- KEY METRICS GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-indigo-900 text-lg mb-3 flex items-center">
                <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Credit Hours</span>
                Workload Rules
              </h4>
              <p className="text-sm text-indigo-800/70 mb-4">UCC has strict minimum and maximum credit load limits per semester.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                  <strong>Minimum:</strong> 15 Credits (Standard)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                  <strong>Maximum:</strong> 21 - 24 Credits
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  <strong>Warning:</strong> Dropping below 15 credits requires special permission.
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-amber-900 text-lg mb-3 flex items-center">
                <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Deadlines</span>
                Strict Timelines
              </h4>
              <p className="text-sm text-amber-800/70 mb-4">Missing these dates attracts penalties or academic failure.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Normal Registration:</strong> First 2 weeks
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Late Registration:</strong> 3rd Week (Fine applies)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  <strong>Closure:</strong> No changes allowed after 21 days.
                </li>
              </ul>
            </div>
          </div>

          {/* --- VISUAL STEPS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Procedure
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-blue-900 text-lg mb-1">1. Consult Advisor</h5>
                <p className="text-sm text-gray-600 mt-2">
                   See your <strong>Academic Level Advisor</strong> first. They must approve that the course you want to add fits your program structure.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-purple-900 text-lg mb-1">2. Portal Action</h5>
                <p className="text-sm text-gray-600 mt-2">
                  Log into <strong>portal.ucc.edu.gh</strong>. Navigate to "Register Courses", uncheck courses to drop, and check new ones to add.
                </p>
              </div>

              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-teal-900 text-lg mb-1">3. Print Slip</h5>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Crucial:</strong> You must print the new Registration Slip. The old slip is invalid once you make changes online.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-slate-800 text-lg mb-1">4. Sign & File</h5>
                <p className="text-sm text-gray-600 mt-2">
                  Have the new slip signed by your HOD. Submit a copy to the Department Secretary to update your file.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),

      // --- STEPS TAB DATA ---
      steps: [
        {
          title: "Check the Academic Calendar",
          description: "Confirm the exact Add/Drop deadline. It is usually the 3rd week of the semester.",
          note: "Late registration attracts a penalty fee."
        },
        {
          title: "Consult Academic Advisor",
          description: "Discuss why you are dropping the course. Ensure you are not dropping a Core (Compulsory) course by mistake."
        },
        {
          title: "Log in to Portal",
          description: "Visit portal.ucc.edu.gh and go to the Registration tab."
        },
        {
          title: "Modify Selection",
          description: "Select courses to Add. Uncheck courses to Drop. Click 'Save/Submit'."
        },
        {
          title: "Print Registration Slip",
          description: "Print 3 copies of the updated registration slip."
        },
        {
          title: "Obtain Signatures",
          description: "Take the slips to your Head of Department (HOD) for endorsement."
        },
        {
          title: "Submit Copies",
          description: "Keep one copy, give one to the Department, and one to your Faculty Officer."
        }
      ],

      // --- WARNINGS TAB DATA ---
      commonMistakes: [
        "Assuming a course is dropped just because you stopped attending class (You will get Grade E/F).",
        "Forgetting to print the new slip after making changes online.",
        "Adding a course that clashes with a Core Course on the timetable.",
        "Registering for a course without having passed its pre-requisite (Level 100/200 bases).",
        "Falling below the minimum credit load (usually 15 credits)."
      ],
      consequences: "If you fail to register correctly by the deadline, you may be prevented from writing the end-of-semester exams, or you will receive a Grade E (Fail) for courses you abandoned but didn't officially drop.",

      // --- RESOURCES TAB DATA ---
      resources: [
        {
          title: "UCC Student Portal",
          description: "Access for course registration.",
          url: "https://portal.ucc.edu.gh"
        },
        {
          title: "Directorate of Academic Affairs",
          description: "Official rules on registration.",
          url: "https://daa.ucc.edu.gh"
        }
      ],

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Consulted Academic Advisor", checked: false },
        { text: "Checked Timetable for Conflicts", checked: false },
        { text: "Updated Portal Registration", checked: false },
        { text: "Printed New Registration Slip", checked: false },
        { text: "Signed by HOD", checked: false },
        { text: "Submitted Copy to Department", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Procedure' },
    { id: 'warnings', label: 'Warnings' },
    { id: 'checklist', label: 'Checklist' }
  ];

  return { sections, tabs };
};

export default AddDropCourses;