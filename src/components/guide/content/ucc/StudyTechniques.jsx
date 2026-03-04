
const StudyTechniques = () => {
  // UCC GUIDE: EFFECTIVE STUDY TECHNIQUES
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Effective Study Techniques",
      summary: "Learn proven methods to improve your studying.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 dark:bg-gray-800/50 p-5 rounded-xl border border-slate-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Effective studying is about working smarter, not harder. At UCC, we've identified proven techniques that help students retain information and perform better in exams.
              <strong> Understanding your learning style and applying the right techniques can transform your academic performance.</strong>
            </p>
          </div>
          
          {/* --- STUDY APPROACHES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Active Learning Card */}
            <div className="bg-blue-50 dark:bg-blue-900/40 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 dark:text-blue-400 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Learning</span>
                Active Learning
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300/70 mb-4">Engage with material rather than passively reading.</p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Self-Testing</strong> <span className="text-xs ml-auto text-gray-500">Recall</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Teaching Others</strong> <span className="text-xs ml-auto text-gray-500">Reinforce</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Concept Mapping</strong> <span className="text-xs ml-auto text-gray-500">Visual</span>
                </li>
              </ul>
            </div>

            {/* Study Environment Card */}
            <div className="bg-emerald-50 dark:bg-emerald-900/40 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Environment</span>
                Study Spaces
              </h4>
              <p className="text-sm text-emerald-800 dark:text-emerald-300/70 mb-4">Optimize your physical surroundings for learning.</p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Library Study Areas</strong> <span className="text-xs ml-auto text-gray-500">Quiet</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Study Groups</strong> <span className="text-xs ml-auto text-gray-500">Collaborative</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Distraction-Free</strong> <span className="text-xs ml-auto text-gray-500">Focused</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- STUDY TECHNIQUES AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Proven Study Methods
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 dark:bg-sky-900/40 p-5 rounded-xl border border-sky-100 dark:border-sky-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 dark:text-sky-400 text-lg">Pomodoro Technique</h5>
                  <span className="text-3xl font-bold text-sky-200/80 dark:text-sky-800/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 dark:text-sky-300 font-semibold mb-2">Time Management</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Study in <strong>25-minute focused sessions</strong> with 5-minute breaks to maintain concentration and prevent burnout.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 dark:bg-indigo-900/40 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 dark:text-indigo-400 text-lg">Cornell Notes</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Note-Taking</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Divide pages into <strong>notes, cues, and summary</strong> sections for more effective review and retention.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 dark:bg-violet-900/40 p-5 rounded-xl border border-violet-100 dark:border-violet-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 dark:text-violet-400 text-lg">Spaced Repetition</h5>
                  <span className="text-3xl font-bold text-violet-200/80 dark:text-violet-800/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 dark:text-violet-300 font-semibold mb-2">Memory</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Review material at <strong>increasing intervals</strong> (1 day, 3 days, 1 week) to improve long-term retention.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 dark:bg-amber-900/40 p-5 rounded-xl border border-amber-100 dark:border-amber-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 dark:text-amber-400 text-lg">Mind Mapping</h5>
                  <span className="text-3xl font-bold text-amber-200/80 dark:text-amber-800/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold mb-2">Visual Learning</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Create <strong>visual diagrams</strong> connecting concepts to see relationships and improve understanding.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 dark:bg-teal-900/40 p-5 rounded-xl border border-teal-100 dark:border-teal-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 dark:text-teal-400 text-lg">Active Recall</h5>
                  <span className="text-3xl font-bold text-teal-200/80 dark:text-teal-800/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 dark:text-teal-300 font-semibold mb-2">Testing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong>Test yourself</strong> instead of re-reading to identify knowledge gaps and strengthen memory.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Active learning beats passive reading for better retention.",
        "Regular review improves long-term memory significantly.",
        "Study environment impacts focus and learning effectiveness.",
        "Breaks improve concentration and prevent burnout.",
        "Different subjects require different study approaches."
      ],
      steps: [
        {
          title: "Identify Your Learning Style",
          description: "Determine if you're a visual, auditory, or kinesthetic learner to choose appropriate techniques."
        },
        {
          title: "Set Clear Study Goals",
          description: "Define specific, measurable objectives for each study session to maintain focus."
        },
        {
          title: "Create a Study Schedule",
          description: "Plan regular study sessions with specific subjects and techniques for each time block."
        },
        {
          title: "Use Active Recall Methods",
          description: "Test yourself regularly instead of just re-reading to strengthen memory pathways."
        },
        {
          title: "Implement Spaced Repetition",
          description: "Review material at increasing intervals to move information to long-term memory."
        },
        {
          title: "Optimize Your Study Environment",
          description: "Create a distraction-free space with proper lighting, temperature, and ergonomics."
        }
      ],
      tips: [
        "Use the Pomodoro technique (25 min study, 5 min break) for focus.",
        "Teach concepts to others to reinforce your own understanding.",
        "Use mnemonics and visualization for memorization.",
        "Study difficult subjects when your mind is freshest.",
        "Review notes within 24 hours to maximize retention."
      ],
      resources: [
        {
          title: "Study Skills Workshops",
          description: "Join our free study skills workshops at the Academic Support Center.",
          url: "https://ucc.edu.gh/study-workshops"
        },
        {
          title: "Online Learning Resources",
          description: "Access free study tools and resources on the student Portal.",
          url: "https://ucc.edu.gh/study-resources"
        },
        {
          title: "Peer Study Groups",
          description: "Find or create study groups for collaborative learning.",
          url: "https://ucc.edu.gh/study-groups"
        },
        {
          title: "ChatGPT for Study Help",
          description: "AI-powered study assistant for explaining concepts and creating study materials.",
          url: "https://chat.openai.com"
        },
        {
          title: "Perplexity AI",
          description: "AI research assistant for finding sources and summarizing complex topics.",
          url: "https://www.perplexity.ai"
        },
        {
          title: "Best Study Chatbots",
          description: "YouTube video explaining the best AI chatbots for academic success.",
          url: "https://www.youtube.com/watch?v=example"
        }
      ],
      checklist: [
        { text: "Identify your learning style", checked: false },
        { text: "Create study schedule", checked: false },
        { text: "Set up optimal study space", checked: false },
        { text: "Try active recall techniques", checked: false },
        { text: "Join study group", checked: false },
        { text: "Track study progress", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Study Process' },
    { id: 'resources', label: 'Learning Resources' },
  ];

  return { sections, tabs };
};

export default StudyTechniques;