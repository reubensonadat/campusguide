
const LibraryServices = () => {
  // UCC GUIDE: LIBRARY SERVICES
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Library Services & Resources",
      summary: "Make the most of UCC's library facilities.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              The UCC library is a treasure trove of resources for your academic success. 
              With both physical and digital collections, it provides essential support for your research and study needs.
              <strong> Your student ID is your key to unlocking these resources.</strong>
            </p>
          </div>
          
          {/* --- LIBRARY FACILITIES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Physical Resources Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Physical</span>
                Resources & Spaces
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Access books, journals, and study spaces in the library building.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Book Collection</strong> <span className="text-xs ml-auto text-gray-500">14-day loan</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Study Spaces</strong> <span className="text-xs ml-auto text-gray-500">Quiet & Group</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Reference Desk</strong> <span className="text-xs ml-auto text-gray-500">Research Help</span>
                </li>
              </ul>
            </div>

            {/* Digital Resources Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Digital</span>
                E-Resources
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Access online journals, e-books, and databases 24/7.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Online Catalog</strong> <span className="text-xs ml-auto text-gray-500">Search & Reserve</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>E-Resources Portal</strong> <span className="text-xs ml-auto text-gray-500">24/7 Access</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Research Guides</strong> <span className="text-xs ml-auto text-gray-500">Subject-specific</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- GETTING STARTED AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Getting Started
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Register</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">First Step</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Activate your library account at the circulation desk using your <strong>student ID</strong>.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Learn Catalog</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Essential Skill</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Practice searching for books and resources using the <strong>online catalog</strong>.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Explore E-Resources</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Digital Access</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Access online journals, e-books, and databases with your student credentials.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Find Study Spaces</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Productive Environment</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Locate quiet areas and group study rooms for different study needs.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Learn Rules</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Borrowing Policies</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Understand loan periods, renewal policies, and overdue fines.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Student ID required for library access",
        "Books can be borrowed for 14 days",
        "E-resources available 24/7",
        "Study spaces available throughout library",
        "Research help available at reference desk"
      ],
      steps: [
        {
          title: "Register with the library",
          description: "Activate your library account with your student ID at the circulation desk."
        },
        {
          title: "Learn to use the catalog",
          description: "Practice searching for books and resources using the online catalog system."
        },
        {
          title: "Explore e-resources",
          description: "Access online journals, e-books, and databases with your student credentials."
        },
        {
          title: "Find study spaces",
          description: "Locate quiet areas and group study rooms for different study needs."
        },
        {
          title: "Learn borrowing rules",
          description: "Understand loan periods, renewal policies, and overdue fines."
        }
      ],
      tips: [
        "Renew books online before they're due to avoid fines",
        "Use the 'Save & Share' feature to create reading lists",
        "Attend library orientation sessions at the beginning of the semester",
        "Book group study rooms in advance during peak periods",
        "Ask librarians for help with complex research queries"
      ],
      resources: [
        {
          title: "Online Catalog",
          description: "Search library resources online",
          url: "https://library.ucc.edu.gh"
        },
        {
          title: "E-Resources Portal",
          description: "Access electronic resources",
          url: "https://eresources.ucc.edu.gh"
        },
        {
          title: "Research Guides",
          description: "Subject-specific research help",
          url: "https://library.ucc.edu.gh/guides"
        }
      ],
      checklist: [
        { text: "Register at library", checked: false },
        { text: "Learn catalog use", checked: false },
        { text: "Access e-resources", checked: false },
        { text: "Know borrowing rules", checked: false },
        { text: "Find study spots", checked: false },
        { text: "Save library contacts", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'resources', label: 'Helpful Links' },
  ];

  return { sections, tabs };
};

export default LibraryServices;