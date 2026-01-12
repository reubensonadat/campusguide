import React from 'react';

const CommonMistakesFreshers = () => {
  // UCC GUIDE: FRESHER MISTAKES
  // STYLE FIX: Removed "border-l-4" (the hated style).
  // ADOPTED STYLE: Full Pastel Backgrounds (bg-color-50) with subtle borders.

  const sections = [
    {
      title: "Avoiding The 'Fresher Trap'",
      summary: "Real talk on GPA traps, attendance policies, and financial survival.",

      // --- OVERVIEW CONTENT ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              First year at UCC is a test of freedom. The biggest mistake is thinking <strong>"Level 100 doesn't count."</strong>
              In reality, your First Class starts from Semester 1. Recovering a bad GPA is mathematically harder than maintaining a good one.
            </p>
          </div>

          {/* --- THE "BIG 3" ACADEMIC TRAPS --- */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-5 rounded-xl border border-red-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-red-900 mb-2">The "CA" Trap</h4>
              <p className="text-sm text-gray-700">
                Ignoring quizzes because they are "just 5 marks."
                <strong> Reality:</strong> CA is 40% of your grade. You can fail a course before you even write the final exam.
              </p>
            </div>

            <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-orange-900 mb-2">The "IC" Grade</h4>
              <p className="text-sm text-gray-700">
                Forgetting to sign the attendance sheet at an exam.
                <strong> Reality:</strong> You get an "Incomplete" (IC). If not fixed you cannot graduate.
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-blue-900 mb-2">The "3-Week" Rule</h4>
              <p className="text-sm text-gray-700">
                Skipping lectures thinking nobody cares.
                <strong> Reality:</strong> Missing more than 9 hours (3 weeks) of a 3-credit course = Barred from exams.
              </p>
            </div>
          </div>

          {/* --- RELATIONSHIP & SENIOR ADVICE (New Section) --- */}
          <div className="pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-50 p-5 rounded-xl border border-pink-100 hover:shadow-md transition-all">
                <h5 className="font-bold text-pink-900 mb-2">Relationship Drama</h5>
                <p className="text-sm text-gray-700 italic mb-2">
                  "Don't skip lectures because your boyfriend or girlfriend wants something from you. It's not worth it."
                </p>
                <p className="text-xs text-pink-800 font-bold">
                  Prioritize your education.
                </p>
              </div>

              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 hover:shadow-md transition-all">
                <h5 className="font-bold text-emerald-900 mb-2">Senior Helpers</h5>
                <p className="text-sm text-gray-700 mb-2">
                  If a senior wants to "help" you with studies, remember:
                  <strong> Use public spaces</strong> like the Library, Lecture Theatres, or Summer Huts.
                </p>
                <p className="text-xs text-emerald-800 font-bold">
                  "It is better to be safe than sorry."
                </p>
              </div>
            </div>
          </div >
        </div >
      ),

      // --- WARNINGS TAB DATA (Specific Mistakes) ---
      commonMistakes: [
        "Assuming Level 100 grades don't affect your final Class (They heavily weigh down your CGPA).",
        "Copying assignments from seniors (Lecturers often change questions slightly).",
        "Buying handouts but never reading them until 'Revision Week'.",
        "Signing attendance for friends (This is forgery; penalty is rustication).",
        "Not checking the Student Portal for 'IC' rectification (Incomplete Grade) after exams.",
        "Joining 5+ clubs and having no time for sleep or studies."
      ],

      tips: [
        "Aim for a GPA of 3.6+ in Level 100. It gives you a safety buffer for harder levels.",
        "Form a study group with serious people, not just your roommates.",
        "Eat at the market or cook. Buying food everyday is unsustainable.",
        "Visit the Counselling Centre if you feel overwhelmed. It's free and confidential.",
        "Save your Academic Advisor's number. You will need them."
      ],

      // --- RESOURCES TAB DATA ---
      resources: [
        {
          title: "UCC Student Handbook",
          description: "The rulebook for grades and conduct.",
          url: "https://ucc.edu.gh/student-handbook"
        },
        {
          title: "Counselling Centre",
          description: "Mental health and academic advice. Book via Student Portal or walk in.",
          url: "https://portal.ucc.edu.gh/onlineReg/src/coun.php"
        }
      ],

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Read the Student Handbook (Regulation 11.0)", checked: false },
        { text: "Met my Academic Advisor", checked: false },
        { text: "Created a personal study timetable", checked: false },
        { text: "Budgeted allowance for the semester", checked: false },
        { text: "Saved HOD's contact number", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'warnings', label: 'Common Mistakes' },
    { id: 'resources', label: 'Resources' },
  ];

  return { sections, tabs };
};

export default CommonMistakesFreshers;