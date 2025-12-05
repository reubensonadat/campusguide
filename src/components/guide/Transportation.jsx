
const Transportation = () => {
  // UCC GUIDE: TRANSPORTATION
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Getting Around Campus & Town",
      summary: "Transportation options for students.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Navigating UCC's expansive campus and the surrounding Cape Coast area requires knowing your transport options. 
              From quick hops between lecture halls to trips into town for supplies, getting around efficiently is key to student life.
              <strong> Plan your journeys and know the most cost-effective options available.</strong>
            </p>
          </div>
          
          {/* --- TRANSPORT OPTIONS GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* On-Campus Transport Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">On-Campus</span>
                Internal Transport
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Moving between buildings on the university grounds.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Campus Shuttle</strong> <span className="text-xs ml-auto text-gray-500">Free with ID</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Walking</strong> <span className="text-xs ml-auto text-gray-500">Feasible</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Bicycle Parking</strong> <span className="text-xs ml-auto text-gray-500">Available</span>
                </li>
              </ul>
            </div>

            {/* Off-Campus Transport Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Off-Campus</span>
                Town & City Travel
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Options for traveling into Cape Coast and beyond.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Taxis</strong> <span className="text-xs ml-auto text-gray-500">Main Gate</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Public Buses</strong> <span className="text-xs ml-auto text-gray-500">Kotokur/STC</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Uber/Bolt</strong> <span className="text-xs ml-auto text-gray-500">Ride-Hailing</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- GETTING AROUND GUIDE AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Smart Travel Guide
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Plan Your Route</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Preparation</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Use <strong>Google Maps</strong> or ask seniors for the best routes. Check shuttle schedules before leaving.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Use Campus Shuttle</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Free & Easy</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Show your <strong>student ID</strong>. The shuttle connects Old Site, New Site, and major halls.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Public Buses</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Budget-Friendly</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Metro Mass/STC buses</strong> are cheapest for town trips. They leave from the main gate.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Share Taxis</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Save Costs</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Share with 3-4 friends</strong> to split fares. Taxis are always available at the main gate.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Walk & Cycle</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Health & Money</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  For short distances, <strong>walking is free</strong>. Bicycle parking is available for those with bikes.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Campus shuttle connects major points (Old Site, New Site, Halls).",
        "Taxis are readily available at the main university gate.",
        "Metro Mass (STC) buses serve main routes into town from the main gate.",
        "Bicycle parking is available for students with personal bikes.",
        "Walking is feasible for many routes within the campus."
      ],
      steps: [
        {
          title: "Plan Your Journey",
          description: "Before you travel, check your route on a map and confirm shuttle or bus schedules. Allow extra time during peak hours."
        },
        {
          title: "Use Campus Shuttle",
          description: "For travel between distant campus points, use the free campus shuttle by showing your student ID."
        },
        {
          title: "Choose Public Transport",
          description: "For trips into town, use Metro Mass or STC buses from the main gate for the most economical option."
        },
        {
          title: "Use Taxis Wisely",
          description: "Share taxis with friends to reduce costs. Agree on fares before starting the journey."
        },
        {
          title: "Consider Walking or Cycling",
          description: "For short distances on campus, walking is free and cycling is healthy with available parking."
        },
        {
          title: "Have Emergency Funds",
          description: "Always keep some emergency transport money for unexpected trips or late-night travel needs."
        }
      ],
      tips: [
        "Use the campus shuttle for long distances between buildings.",
        "Share taxis to and from town to reduce individual costs.",
        "Leave early for morning classes to account for transport delays.",
        "Know the peak traffic times to avoid getting stuck.",
        "Keep emergency transport money separate from your regular budget."
      ],
      resources: [
        {
          title: "Shuttle Schedule",
          description: "Campus shuttle routes and timings",
          url: "https://ucc.edu.gh/shuttle-schedule"
        },
        {
          title: "Bus Routes Map",
          description: "Public bus routes from campus",
          url: "https://ucc.edu.gh/bus-routes"
        },
        {
          title: "Taxi Services",
          description: "Reliable taxi contacts and services",
          url: "https://ucc.edu.gh/taxi-contacts"
        }
      ],
      checklist: [
        { text: "Learn shuttle routes and stops", checked: false },
        { text: "Save reliable taxi contacts", checked: false },
        { text: "Know bus stops to town", checked: false },
        { text: "Plan travel time in advance", checked: false },
        { text: "Have transport budget", checked: false },
        { text: "Keep emergency transport money", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Getting Around' },
    { id: 'resources', label: 'Transport Info' },
    { id: 'checklist', label: 'Travel Checklist' }
  ];

  return { sections, tabs };
};

export default Transportation;