import React from 'react';

const CourseRegistration = () => {
  // UCC GUIDE: COURSE REGISTRATION
  // Verified Data: 2025 Academic Policies (Financial Clearance, Core vs Electives)
  // Focus: The "Fixed vs Flexible" course dilemma and the Fee hurdle.

  const sections = [
    {
      title: "Course Registration",
      summary: "Navigating the Portal, Financial Clearance, and Fixed vs. Elective Courses.",
      
      // --- OVERVIEW CONTENT (Pastel Card Design) ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO CARD --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Registration is the official process of enrolling in specific courses for the semester. 
              <strong> No Registration = No Student Status.</strong> Even if you pay fees, you are not a student until you register courses on the portal.
            </p>
          </div>

          {/* --- THE COMPLEXITY OF COURSES (Fixed vs Flexible) --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Type A</span>
                Fixed / Block Courses
              </h4>
              <p className="text-sm text-blue-800/80 mb-4">
                Common in <strong>Medical School, Nursing, Pharmacy, and Engineering</strong>.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start"><span className="text-blue-500 mr-2">●</span>Your courses are pre-determined.</li>
                <li className="flex items-start"><span className="text-blue-500 mr-2">●</span>You rarely need to "Add/Drop" because you have no choices to make.</li>
                <li className="flex items-start"><span className="text-blue-500 mr-2">●</span>Registration is usually just one click: "Register All".</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-orange-900 text-lg mb-3 flex items-center">
                <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Type B</span>
                Flexible / Elective Courses
              </h4>
              <p className="text-sm text-orange-800/80 mb-4">
                Common in <strong>Arts, Social Sciences, and Business</strong>.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start"><span className="text-orange-500 mr-2">●</span>You have <strong>Core</strong> courses (mandatory) mixed with <strong>Electives</strong>.</li>
                <li className="flex items-start"><span className="text-orange-500 mr-2">●</span>You MUST choose electives carefully to meet credit hours (15-18).</li>
                <li className="flex items-start"><span className="text-orange-500 mr-2">●</span><strong>Liberal Courses:</strong> You must pick a course from <em>outside</em> your faculty. This is where most Add/Drop confusion happens.</li>
              </ul>
            </div>
          </div>

          {/* --- THE FEE BARRIER --- */}
          <div className="bg-green-50 p-5 rounded-xl border border-green-100 mt-4">
            <h4 className="font-bold text-green-900 text-lg mb-2">The "Financial Hold" Rule</h4>
            <p className="text-sm text-gray-700">
              The portal automatically locks registration until you pay a specific percentage of fees (usually <strong>60%</strong> for freshers / <strong>50%</strong> for continuing). 
              Once paid via Transflow, allow 24 hours for the "Hold" to lift before attempting to register.
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
          title: "Wait for Clearance",
          description: "It can take 2-24 hours for the bank to communicate with the UCC Portal. Check your portal dashboard for 'Financial Hold: No'."
        },
        {
          title: "Log in to Portal",
          description: "Go to portal.ucc.edu.gh. Navigate to 'Register Courses'."
        },
        {
          title: "Select Courses",
          description: "Tick all Core courses. Select your required Electives and Liberal Studies (if applicable for your level)."
        },
        {
          title: "Confirm & Submit",
          description: "Verify the total credit hours (usually minimum 15). Click 'Save' or 'Submit'."
        },
        {
          title: "Print Registration Slip",
          description: "You MUST print 3 copies: One for you, one for your Department, one for your Faculty Officer."
        }
      ],

      // --- WARNINGS TAB DATA ---
      commonMistakes: [
        "Paying fees but forgetting to actually log in and register courses online.",
        "Registering for 'Introduction to HIV' (a common Liberal) when your timetable already clashes.",
        "Forgetting to print the registration slip before the portal closes.",
        "Selecting fewer than 15 credit hours (Under-load).",
        "Thinking that attending class equals registration (It does not)."
      ],
      consequences: "If you attend classes but fail to register on the portal, you will not have a name on the Exam List. You will be turned away from the exam hall.",

      // --- RESOURCES TAB DATA ---
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
      ],

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Paid 60% of Fees", checked: false },
        { text: "Financial Hold Lifted on Portal", checked: false },
        { text: "Selected Core + Electives", checked: false },
        { text: "Selected Liberal Course (if req)", checked: false },
        { text: "Printed 3 Copies of Slip", checked: false },
        { text: "Submitted Slip to Dept", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Procedure' },
    { id: 'warnings', label: 'Traps' },
    { id: 'resources', label: 'Resources' },
    { id: 'checklist', label: 'Checklist' }
  ];

  return { sections, tabs };
};

export default CourseRegistration;