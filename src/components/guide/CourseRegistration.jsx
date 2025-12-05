import React from 'react';

const CourseRegistration = () => {
  // UCC GUIDE: COURSE REGISTRATION
  // Verified Data: 2025 Academic Policies (Financial Clearance, Core vs Electives)
  // UPDATES: Added "Rotational Policy" for African Studies/Liberals, ITS/Info Lit pairing, and Auditing.

  const sections = [
    {
      title: "Course Registration",
      summary: "Navigating the Portal, Financial Clearance, and the 'Rotational' Course System.",
      
      // --- OVERVIEW CONTENT ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO CARD --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Registration is the official process of enrolling in specific courses. 
              <strong> No Registration = No Student Status.</strong> Even if you pay fees, you are not a student until you register courses on the portal.
            </p>
          </div>

          {/* --- THE ROTATIONAL SYSTEM (CRITICAL UPDATE) --- */}
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
            <h4 className="font-bold text-indigo-900 text-lg mb-3">🔄 The "Rotational" System (Liberals & African Studies)</h4>
            <p className="text-sm text-indigo-800/80 mb-4 leading-relaxed">
              UCC splits Freshers into two groups based on College/Faculty. You generally do <strong>not</strong> choose these courses; they are randomly assigned to you on the portal.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h5 className="font-bold text-indigo-700 mb-2">Group A Pattern</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>Sem 1:</strong> African Studies + ITS (Info Tech Skills)</li>
                  <li>• <strong>Sem 2:</strong> Liberal Course + Information Literacy</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h5 className="font-bold text-indigo-700 mb-2">Group B Pattern</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>Sem 1:</strong> Liberal Course + Information Literacy</li>
                  <li>• <strong>Sem 2:</strong> African Studies + ITS (Info Tech Skills)</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-indigo-600 mt-3 italic">
              * <strong>Communication Skills</strong> is mandatory for EVERYONE in both semesters.
            </p>
            <p className="text-xs text-indigo-600 mt-1 italic">
              * <strong>ITS Groups:</strong> ITS is not picked; you are placed in groups. Check notice boards for your group's time.
            </p>
          </div>

          {/* --- COURSE TYPES --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-blue-900 text-lg mb-3">Fixed / Block Courses</h4>
              <p className="text-sm text-blue-800/80 mb-4">
                Common in <strong>Medical School, Nursing, Pharmacy, & Engineering</strong>.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>● Courses are pre-determined.</li>
                <li>● "Add/Drop" is rarely needed.</li>
                <li>● Registration is usually one click: "Register All".</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-orange-900 text-lg mb-3">Flexible / Elective Courses</h4>
              <p className="text-sm text-orange-800/80 mb-4">
                Common in <strong>Arts, Social Sciences, & Business</strong>.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>● Mix of <strong>Core</strong> and <strong>Electives</strong>.</li>
                <li>● You must manually select electives to meet credit hours.</li>
                <li>● <strong>Auditing:</strong> You can "Audit" a course (attend for knowledge, no exams) but you must register it as "Audit".</li>
              </ul>
            </div>
          </div>

          {/* --- THE FEE BARRIER --- */}
          <div className="bg-green-50 p-5 rounded-xl border border-green-100">
            <h4 className="font-bold text-green-900 text-lg mb-2">The "Financial Hold" Rule</h4>
            <p className="text-sm text-gray-700">
              The portal locks registration until you pay ~60% fees. Payment via Transflow usually takes 2-24 hours to clear the "Hold" on the portal.
            </p>
          </div>
        </div>
      ),

      // --- STEPS TAB DATA ---
      steps: [
        {
          title: "Pay Fees",
          description: "Pay the required percentage at an approved bank using Transflow/Smartpay. Keep the receipt."
        },
        {
          title: "Check 'Hold' Status",
          description: "Log into portal.ucc.edu.gh. Ensure 'Financial Hold' says 'No' before proceeding."
        },
        {
          title: "Check Assigned Courses",
          description: "Look for your assigned Liberal/African Studies & ITS/Info Lit. These are usually pre-loaded based on your rotation."
        },
        {
          title: "Select Electives",
          description: "(Arts/Social Sciences only) Tick your preferred Electives to meet minimum credit hours (usually 15)."
        },
        {
          title: "Submit (Don't just Save)",
          description: "Verify courses. Click 'SUBMIT'. Clicking 'Save' only creates a draft and does NOT register you."
        },
        {
          title: "Print 3 Copies",
          description: "Print the registration slip. Submit copies to your Department and Faculty Officer for signing."
        }
      ],

      // --- WARNINGS TAB DATA ---
      commonMistakes: [
        "Clicking 'Save' instead of 'Submit' (You are not registered until you Submit).",
        "Trying to change a randomly assigned Liberal Course (It is usually fixed).",
        "Missing your ITS Group time (Groups are assigned, check the notice board).",
        "Selecting fewer than 15 credit hours (Under-load).",
        "Forgetting to register for Communication Skills (It is compulsory)."
      ],
      consequences: "If you attend classes but fail to 'Submit' on the portal, your name will not appear on the Exam List.",

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Paid ~60% of Fees", checked: false },
        { text: "Financial Hold Lifted", checked: false },
        { text: "Checked Assigned Liberal/African Studies", checked: false },
        { text: "Added Required Electives", checked: false },
        { text: "Clicked 'SUBMIT' (Not Save)", checked: false },
        { text: "Printed 3 Copies of Slip", checked: false }
      ],
      
      // Resources remain the same...
      resources: [
        {
          title: "UCC Student Portal",
          description: "The only place to register.",
          url: "https://portal.ucc.edu.gh"
        },
        {
          title: "Academic Calendar",
          description: "Check opening/closing dates.",
          url: "https://ucc.edu.gh/calendar"
        }
      ]
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