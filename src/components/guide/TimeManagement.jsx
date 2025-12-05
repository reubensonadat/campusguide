
const TimeManagement = () => {
  // UCC GUIDE: TIME MANAGEMENT STRATEGIES
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Time Management Strategies",
      summary: "Master your schedule and boost productivity.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Effective time management is the cornerstone of academic success and a balanced university life. 
              Juggling lectures, assignments, social activities, and personal time requires deliberate strategy.
              <strong> Mastering these techniques will help you reduce stress and achieve more with your available hours.</strong>
            </p>
          </div>
          
          {/* --- TIME MANAGEMENT APPROACHES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Planning & Prioritization Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Planning</span>
                Strategy & Prioritization
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Organize your tasks for maximum efficiency.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Eisenhower Matrix</strong> <span className="text-xs ml-auto text-gray-500">Urgent/Important</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Weekly Planning</strong> <span className="text-xs ml-auto text-gray-500">Sunday Review</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Goal Setting</strong> <span className="text-xs ml-auto text-gray-500">SMART Goals</span>
                </li>
              </ul>
            </div>

            {/* Execution & Focus Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Execution</span>
                Focus & Productivity
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Techniques to get things done effectively.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Time Blocking</strong> <span className="text-xs ml-auto text-gray-500">Deep Work</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Pomodoro Technique</strong> <span className="text-xs ml-auto text-gray-500">25/5 Mins</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Task Batching</strong> <span className="text-xs ml-auto text-gray-500">Similar Tasks</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- TIME MASTERY PROCESS AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              The Time Mastery Process
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Track Your Time</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Audit</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  For one week, <strong>track everything</strong> you do. Use an app or notebook to see where your time actually goes.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Set Priorities</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Focus</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Use the <strong>Eisenhower Matrix</strong> to identify your most important and urgent tasks.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Create Weekly Schedule</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Structure</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Plan your week, allocating blocks for <strong>classes, study, and personal time</strong>. Be realistic.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Implement Time Blocking</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Action</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Dedicate specific blocks of time to <strong>single tasks</strong>. Protect this time from distractions.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Review & Adjust</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Optimize</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  At the end of each week, <strong>review what worked</strong> and adjust your system for the next week.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Prioritize tasks using the importance/urgency matrix.",
        "Use time blocking for deep, focused work sessions.",
        "Set realistic daily and weekly goals.",
        "Include breaks and buffer time in your schedule.",
        "Review and adjust your system weekly for continuous improvement."
      ],
      steps: [
        {
          title: "Conduct a Time Audit",
          description: "For one week, track how you spend your time to identify patterns and time-wasters."
        },
        {
          title: "Define Your Priorities",
          description: "Use the Eisenhower Matrix to categorize tasks by urgency and importance. Focus on what matters most."
        },
        {
          title: "Create a Weekly Schedule",
          description: "Plan your week in advance, allocating time for classes, study, work, and personal activities."
        },
        {
          title: "Use Time Management Tools",
          description: "Employ digital tools like calendars, to-do lists, or time-tracking apps to stay organized."
        },
        {
          title: "Implement Time Blocking",
          description: "Dedicate specific, uninterrupted blocks of time to important tasks to enhance focus and productivity."
        },
        {
          title: "Review and Adjust Weekly",
          description: "At the end of each week, review your progress and adjust your strategies for the following week."
        }
      ],
      tips: [
        "Start your day with your most important task (Eat the Frog).",
        "Use the 2-Minute Rule: if a task takes less than 2 minutes, do it immediately.",
        "Avoid multitasking with important cognitive tasks; focus on one thing at a time.",
        "Learn to say 'no' to non-essential commitments that don't align with your goals.",
        "Protect your peak energy hours for your most demanding work."
      ],
      resources: [
        {
          title: "Time Management Tools",
          description: "Recommended apps and tools for effective time management.",
          url: "https://ucc.edu.gh/time-tools"
        },
        {
          title: "Weekly Planner Template",
          description: "Download a structured weekly planner template for students.",
          url: "https://ucc.edu.gh/planner-template"
        },
        {
          title: "Productivity Workshops",
          description: "Join our free workshops on time management and productivity.",
          url: "https://ucc.edu.gh/productivity-workshops"
        }
      ],
      checklist: [
        { text: "Completed a one-week time audit", checked: false },
        { text: "Identified top 3 weekly priorities", checked: false },
        { text: "Created a weekly schedule template", checked: false },
        { text: "Chosen a primary time management tool", checked: false },
        { text: "Implemented time blocking for key tasks", checked: false },
        { text: "Scheduled weekly review sessions", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Time Mastery Process' },
    { id: 'resources', label: 'Productivity Tools' },
    { id: 'checklist', label: 'Time Management Setup' }
  ];

  return { sections, tabs };
};

export default TimeManagement;