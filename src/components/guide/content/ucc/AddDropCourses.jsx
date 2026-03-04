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
          <div className="bg-[var(--gray-100-soft)] p-5 rounded-xl border border-[var(--gray-200)] transition-colors duration-300">
            <p className="text-[var(--gray-700)] leading-relaxed">
              The <strong>Add/Drop Period</strong> is the first <strong>21 days</strong> after lectures begin.
              This is when you can add new courses or remove courses you don’t want before registration closes.
            </p>
          </div>

          {/* CRITICAL WARNING - UNOFFICIAL DROP */}
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20 shadow-sm transition-colors duration-300">
            <h4 className="font-bold text-red-900 dark:text-red-400 text-lg mb-3 flex items-center">
              <span className="bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-100 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Critical</span>
              The "Unofficial Drop" Trap
            </h4>
            <p className="text-sm text-red-900/80 dark:text-red-400/80 mb-4 font-medium leading-relaxed">
              If you stop attending a course without officially dropping it on the portal, it will stay on your record.
              You will be graded as "Absent," resulting in an <strong>Grade E</strong> which significantly drags down your <strong>CGPA</strong>.
            </p>
            <div className="bg-[var(--white)] p-4 rounded-lg transition-colors duration-300">
              <h5 className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-wide mb-2">Recommendation</h5>
              <p className="text-sm text-[var(--gray-700)] leading-relaxed">
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
            <div className="bg-[var(--primary-50)] p-6 rounded-xl border border-[var(--primary-100)] hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-[var(--primary-900)] text-lg mb-3 flex items-center">
                <span className="bg-[var(--primary-200)] text-[var(--primary-800)] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Credit Load</span>
                Rules
              </h4>

              <p className="text-sm text-[var(--primary-800)] opacity-80 mb-4 transition-colors duration-300">
                UCC requires all students to follow the approved credit limits each semester.
              </p>

              <ul className="space-y-3 text-sm text-[var(--gray-700)]">
                <li className="flex items-center bg-[var(--white)] p-2 rounded border border-[var(--gray-200)] shadow-sm transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--primary-400)] rounded-full mr-3"></span>
                  <strong>Minimum:</strong> <span className="ml-1">15 credits</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded border border-[var(--gray-200)] shadow-sm transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--primary-400)] rounded-full mr-3"></span>
                  <strong>Maximum:</strong> <span className="ml-1">21–24 credits</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded border border-[var(--gray-200)] shadow-sm transition-colors duration-300">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  <strong>Warning:</strong> <span className="ml-1">Going below 15 credits needs special approval.</span>
                </li>
              </ul>
            </div>

            {/* DEADLINES */}
            <div className="bg-[var(--accent-50)] p-6 rounded-xl border border-[var(--accent-100)] hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-[var(--accent-900)] text-lg mb-3 flex items-center">
                <span className="bg-[var(--accent-200)] text-[var(--accent-800)] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Deadlines</span>
                Important Dates
              </h4>

              <p className="text-sm text-[var(--accent-800)] opacity-80 mb-4 transition-colors duration-300">
                After the 21st day, no course changes are allowed.
              </p>

              <ul className="space-y-3 text-sm text-[var(--gray-700)]">
                <li className="flex items-center bg-[var(--white)] p-2 rounded border border-[var(--gray-200)] shadow-sm transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--accent-400)] rounded-full mr-3"></span>
                  <strong>Normal Registration:</strong> <span className="ml-1">Week 1–2</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded border border-[var(--gray-200)] shadow-sm transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--accent-400)] rounded-full mr-3"></span>
                  <strong>Late Registration:</strong> <span className="ml-1">Week 3 (fine applies)</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded border border-[var(--gray-200)] shadow-sm transition-colors duration-300">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  <strong>Closure:</strong> <span className="ml-1">No add/drop after Day 21</span>
                </li>
              </ul>
            </div>
          </div>

          {/* PROCEDURE */}
          <div className="pt-4">
            <h3 className="font-bold text-[var(--gray-800)] text-xl mb-6 flex items-center transition-colors duration-300">
              <span className="bg-[var(--gray-200)] text-[var(--gray-700)] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 transition-colors duration-300">i</span>
              Procedure
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="bg-[var(--primary-50)] p-5 rounded-xl border border-[var(--primary-100)] hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-[var(--primary-800)] text-lg mb-1">1. Consult Advisor</h5>
                <p className="text-sm text-[var(--gray-600)] mt-2">
                  Talk to your Academic Advisor before adding or dropping any course.
                </p>
              </div>

              <div className="bg-[var(--white)] p-5 rounded-xl border border-[var(--primary-200)] hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-[var(--gray-900)] text-lg mb-1">2. Portal Action</h5>
                <p className="text-sm text-[var(--gray-600)] mt-2">
                  Log in at <strong>portal.ucc.edu.gh</strong> → “Register Courses” → add or remove courses → Save changes.
                </p>
              </div>

              <div className="bg-[var(--accent-50)] p-5 rounded-xl border border-[var(--accent-100)] hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-[var(--accent-900)] text-lg mb-1">3. Print Updated Slip</h5>
                <p className="text-sm text-[var(--gray-600)] mt-2">
                  Print the new registration slip after making changes. The old slip becomes invalid.
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
