
const PartTimeWorkGigs = () => {
  // UCC GUIDE: PART-TIME WORK & GIGS
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Part-time Work Opportunities",
      summary: "Finding and balancing work with studies.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 dark:bg-gray-800/50 p-5 rounded-xl border border-slate-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Working part-time can provide valuable experience and extra income while studying at UCC.
              The key is finding opportunities that complement your academic journey rather than compromise it.
              <strong> Remember, your studies should always come first.</strong>
            </p>
          </div>

          {/* --- WORK OPPORTUNITIES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* On-Campus Work Card */}
            <div className="bg-blue-50 dark:bg-blue-900/40 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 dark:text-blue-400 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">On-Campus</span>
                University Jobs
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300/70 mb-4">Flexible positions within the university that understand your academic schedule.</p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Library Assistant</strong> <span className="text-xs ml-auto text-gray-500">Flexible Hours</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Lab Assistant</strong> <span className="text-xs ml-auto text-gray-500">Related to Field</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Administrative Support</strong> <span className="text-xs ml-auto text-gray-500">Office Skills</span>
                </li>
              </ul>
            </div>

            {/* Off-Campus Gigs Card */}
            <div className="bg-emerald-50 dark:bg-emerald-900/40 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Off-Campus</span>
                Local Opportunities
              </h4>
              <p className="text-sm text-emerald-800 dark:text-emerald-300/70 mb-4">Part-time positions in Cape Coast that can accommodate student schedules.</p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Retail & Hospitality</strong> <span className="text-xs ml-auto text-gray-500">Evenings/Weekends</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Tutoring Services</strong> <span className="text-xs ml-auto text-gray-500">Flexible</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Freelance Gigs</strong> <span className="text-xs ml-auto text-gray-500">Remote Options</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- FINDING WORK AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Finding the Right Opportunity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 dark:bg-sky-900/40 p-5 rounded-xl border border-sky-100 dark:border-sky-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 dark:text-sky-400 text-lg">Update CV</h5>
                  <span className="text-3xl font-bold text-sky-200/80 dark:text-sky-800/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 dark:text-sky-300 font-semibold mb-2">First Step</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Create a professional <strong>CV</strong> highlighting your skills, education, and any previous experience.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 dark:bg-indigo-900/40 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 dark:text-indigo-400 text-lg">Check Job Board</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Resources</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Visit the <strong>Career Services Job Board</strong> for on-campus and off-campus opportunities.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 dark:bg-violet-900/40 p-5 rounded-xl border border-violet-100 dark:border-violet-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 dark:text-violet-400 text-lg">Apply Early</h5>
                  <span className="text-3xl font-bold text-violet-200/80 dark:text-violet-800/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 dark:text-violet-300 font-semibold mb-2">Be Proactive</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Apply for positions well in advance. <strong>Work-study</strong> programs fill up quickly at the start of semester.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 dark:bg-amber-900/40 p-5 rounded-xl border border-amber-100 dark:border-amber-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 dark:text-amber-400 text-lg">Create Schedule</h5>
                  <span className="text-3xl font-bold text-amber-200/80 dark:text-amber-800/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold mb-2">Time Management</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Develop a <strong>study schedule</strong> that accommodates work hours without compromising academic performance.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 dark:bg-teal-900/40 p-5 rounded-xl border border-teal-100 dark:border-teal-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 dark:text-teal-400 text-lg">Set Boundaries</h5>
                  <span className="text-3xl font-bold text-teal-200/80 dark:text-teal-800/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 dark:text-teal-300 font-semibold mb-2">Balance</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Limit work to <strong>20 hours/week</strong> during academic periods to ensure adequate study time.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Work-study programs available on campus",
        "Part-time jobs should not exceed 20 hours/week",
        "Academic performance should not suffer",
        "Skills gained can boost your CV",
        "Networking opportunities through work"
      ],
      steps: [
        {
          title: "Update Your CV",
          description: "Create a professional CV highlighting your skills, education, and any previous experience. Visit Career Services for assistance."
        },
        {
          title: "Check Job Board",
          description: "Regularly check the Career Services Job Board for on-campus and off-campus opportunities that match your skills and schedule."
        },
        {
          title: "Apply for Work-Study",
          description: "Submit applications for on-campus work-study positions early, as they fill up quickly at the start of each semester."
        },
        {
          title: "Create Study Schedule",
          description: "Develop a comprehensive schedule that allocates sufficient time for classes, studying, work, and rest."
        },
        {
          title: "Set Work Hour Limits",
          description: "Establish clear boundaries for work hours (max 20 hours/week) to ensure academic performance doesn't suffer."
        },
        {
          title: "Track Earnings & Expenses",
          description: "Create a budget to manage your income wisely and save for emergencies and academic expenses."
        }
      ],
      tips: [
        "Prioritize studies over work",
        "Choose jobs related to your field when possible",
        "Develop time management skills",
        "Save portion of earnings for emergencies",
        "Build professional relationships"
      ],

      checklist: [
        { text: "Update CV", checked: false },
        { text: "Check job board", checked: false },
        { text: "Apply for work-study", checked: false },
        { text: "Create study schedule", checked: false },
        { text: "Set work hours limit", checked: false },
        { text: "Track earnings", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Job Search Process' },
  ];

  return { sections, tabs };
};

export default PartTimeWorkGigs;