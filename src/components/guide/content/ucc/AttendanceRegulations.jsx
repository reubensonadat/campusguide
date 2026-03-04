import React from 'react';

const AttendanceRegulations = () => {
  // UCC GUIDE: ATTENDANCE REGULATIONS
  // Verified Data: Student Handbook Regulation 11.0
  // Design: Flexible "Pastel" Layout.
  // Change: Removed "Procedure" from Overview. Added "Policy Breakdown" cards instead.

  const sections = [
    {
      title: "Attendance Policy",
      summary: "The '3-Week Rule', Medical Excuses, and Exam Eligibility.",

      // --- OVERVIEW CONTENT (Flexible/Creative Layout) ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              At UCC, paying school fees registers you for the semester, but <strong>attending lectures</strong> qualifies you to write the exam.
              The University enforces a strict <strong>"Contact Hour"</strong> policy rather than a simple percentage.
            </p>
          </div>

          {/* --- THE 3-WEEK RULE (Visual Breakdown) --- */}
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
            <h4 className="font-bold text-indigo-900 text-lg mb-4 flex items-center">
              <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Regulation 11.0</span>
              The "3-Week" Rule
            </h4>
            <p className="text-sm text-indigo-800/80 mb-4">
              You are automatically withdrawn from a course if you miss more than the cumulative equivalent of <strong>three weeks</strong> of contact hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-3 rounded-lg border border-indigo-100 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">1 Credit Course</div>
                <div className="text-xl font-bold text-indigo-600">Max 3 Hours</div>
                <div className="text-xs text-gray-400 mt-1">Missed</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-indigo-100 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">2 Credit Course</div>
                <div className="text-xl font-bold text-indigo-600">Max 6 Hours</div>
                <div className="text-xs text-gray-400 mt-1">Missed</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-indigo-100 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">3 Credit Course</div>
                <div className="text-xl font-bold text-indigo-600">Max 9 Hours</div>
                <div className="text-xs text-gray-400 mt-1">Missed</div>
              </div>
            </div>
          </div>

          {/* --- MEDICAL EXCUSES --- */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm flex flex-col md:flex-row items-start gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-red-900 text-lg mb-2">Medical Absences</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                While a note from a private hospital may be accepted, please note that <strong>the lecturer reserves the right to verify this information</strong>.
                Providing false medical information or forged documents is a serious offense that can lead to severe disciplinary action, including rustication.
              </p>
            </div>
          </div>
        </div>
      ),

      // --- STEPS TAB (Practical "How-To" for students) ---
      steps: [
        {
          title: "Sign the Register",
          description: "Ensure you sign the class attendance sheet every single time if available. If you are present but don't sign, you are marked absent."
        },
        {
          title: "Track Your Hours",
          description: "Keep a personal log of classes missed. Don't rely on the lecturer to warn you."
        },
        {
          title: "Submit Medical Reports",
          description: "If sick, visit the University Hospital. Always make sure that at least you send a message to the course representative or the lecturer if you will not be able to make it through that class with valid reasons"
        },
        {
          title: "Check the Notice Board",
          description: "Departments often publish a 'List of Students Barred from Exams' two weeks before finals. Check this list early."
        }
      ],

      // --- WARNINGS TAB (Consequences) ---
      commonMistakes: [
        "Thinking that 'signing for a friend' is a minor offense (It is forgery and punishable by rustication).",
        "Assuming a 3-credit course means you can miss 3 *days* of class (It means 9 *hours*).",
        "Waiting until exam week to submit a medical report from 2 months ago."
      ],
      consequences: "If you breach the attendance limit, you will be barred from writing the final exam. This results in an automatic Grade E (Fail) or 'Incomplete', requiring you to resit the entire course.",

      // --- CHECKLIST TAB ---
      checklist: [
        { text: "Signed register for today's lecture", checked: false },
        { text: "Validated medical report at UCC Hospital", checked: false },
        { text: "Checked attendance percentage mid-semester", checked: false },
        { text: "Informed Class Rep of emergency absence", checked: false }
      ]
    }
  ];

  // Using the specific tabs you requested
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Management' }, // Renamed for context
    { id: 'warnings', label: 'Consequences' }, // Renamed for context
  ];

  return { sections, tabs };
};

export default AttendanceRegulations;