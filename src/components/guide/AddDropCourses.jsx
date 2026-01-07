import React from 'react';

const AddDropCourses = () => {
  // VERIFIED FOR UCC (2025 ACADEMIC YEAR)

  const sections = [
    {
      title: "Add/Drop Process",
      summary: "Simple guide for changing courses during the add/drop period.",

      content: (
        <div className="space-y-8">

          {/* INTRO */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              The <strong>Add/Drop Period</strong> is the first <strong>21 days</strong> after lectures begin.
              This is when you can add new courses or remove courses you don’t want before registration closes.
            </p>
          </div>

          {/* CRITICAL WARNING - UNOFFICIAL DROP */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm">
            <h4 className="font-bold text-red-900 text-lg mb-3 flex items-center">
              <span className="bg-red-200 text-red-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Critical</span>
              The "Unofficial Drop" Trap
            </h4>
            <p className="text-sm text-red-900/80 mb-4 font-medium leading-relaxed">
              If you stop attending a course without officially dropping it on the portal, it will stay on your record.
              You will be graded as "Absent," resulting in an <strong>Grade E</strong> which significantly drags down your <strong>CGPA</strong>.
            </p>
            <div className="bg-white/60 p-4 rounded-lg">
              <h5 className="text-xs font-bold text-red-800 uppercase tracking-wide mb-2">Recommendation</h5>
              <p className="text-sm text-gray-700 leading-relaxed">
                If you only want knowledge but no formal credit, <strong>do not register</strong>. Ask friends for the schedule and attend classes informally.
                If you want the formal credit, you must register and complete it.
                <br /><br />
                <strong>Never simply "abandon" a registered course.</strong>
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* CREDIT RULES */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-indigo-900 text-lg mb-3 flex items-center">
                <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Credit Load</span>
                Rules
              </h4>

              <p className="text-sm text-indigo-800/70 mb-4">
                UCC requires all students to follow the approved credit limits each semester.
              </p>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                  <strong>Minimum:</strong> 15 credits
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                  <strong>Maximum:</strong> 21–24 credits
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  <strong>Warning:</strong> Going below 15 credits needs special approval.
                </li>
              </ul>
            </div>

            {/* DEADLINES */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-amber-900 text-lg mb-3 flex items-center">
                <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Deadlines</span>
                Important Dates
              </h4>

              <p className="text-sm text-amber-800/70 mb-4">
                After the 21st day, no course changes are allowed.
              </p>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Normal Registration:</strong> Week 1–2
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Late Registration:</strong> Week 3 (fine applies)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  <strong>Closure:</strong> No add/drop after Day 21
                </li>
              </ul>
            </div>
          </div>

          {/* PROCEDURE */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Procedure
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-blue-900 text-lg mb-1">1. Consult Advisor</h5>
                <p className="text-sm text-gray-600 mt-2">
                  Talk to your Academic Advisor before adding or dropping any course.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-purple-900 text-lg mb-1">2. Portal Action</h5>
                <p className="text-sm text-gray-600 mt-2">
                  Log in at <strong>portal.ucc.edu.gh</strong> → “Register Courses” → add or remove courses → Save changes.
                </p>
              </div>

              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-teal-900 text-lg mb-1">3. Print Updated Slip</h5>
                <p className="text-sm text-gray-600 mt-2">
                  Print the new registration slip after making changes. The old slip becomes invalid.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-slate-800 text-lg mb-1">4. Sign & Submit</h5>
                <p className="text-sm text-gray-600 mt-2">
                  Get the slip signed by your HOD and submit copies to your Department and Faculty Officer.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),

      // SIMPLIFIED STEPS TAB
      steps: [
        { title: "Check Academic Calendar", description: "Confirm exact deadline (21 days after lectures begin)." },
        { title: "Consult Advisor", description: "Do not drop a core course by mistake." },
        { title: "Log in to Portal", description: "portal.ucc.edu.gh → Register Courses" },
        { title: "Modify Courses", description: "Add or uncheck courses → Save" },
        { title: "Print Slip", description: "Print 3 copies of your updated slip." },
        { title: "Get Signatures", description: "Let HOD endorse all copies." },
        { title: "Submit Copies", description: "One for Department, one for Faculty, one for yourself." }
      ],

      // WARNINGS
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
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Procedure' },
    { id: 'warnings', label: 'Warnings' }
  ];

  return { sections, tabs };
};

export default AddDropCourses;
