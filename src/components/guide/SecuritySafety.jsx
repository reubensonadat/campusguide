
const SecuritySafety = () => {
  // UCC GUIDE: CAMPUS SECURITY & SAFETY
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Campus Security & Safety",
      summary: "Staying safe on and around campus.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Your safety is a top priority at UCC. The university has implemented comprehensive security measures to protect students, staff, and property. 
              Understanding these systems and following safety protocols is essential for a secure campus experience.
              <strong> Always report suspicious activities and keep emergency contacts readily available.</strong>
            </p>
          </div>
          
          {/* --- SECURITY SYSTEMS GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Security Personnel Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Personnel</span>
                Security Team
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Trained professionals ensuring campus safety.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>24/7 Patrol</strong> <span className="text-xs ml-auto text-gray-500">All Areas</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Security Office</strong> <span className="text-xs ml-auto text-gray-500">Main Entrance</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Hall Security</strong> <span className="text-xs ml-auto text-gray-500">Residential</span>
                </li>
              </ul>
            </div>

            {/* Safety Systems Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Systems</span>
                Safety Infrastructure
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Technology and facilities for campus safety.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Emergency Call Boxes</strong> <span className="text-xs ml-auto text-gray-500">Strategic</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>CCTV Coverage</strong> <span className="text-xs ml-auto text-gray-500">Key Areas</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Safety Drills</strong> <span className="text-xs ml-auto text-gray-500">Regular</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- PERSONAL SAFETY GUIDE AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Personal Safety Guide
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Room Security</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Living Space</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Always <strong>lock your room/hall door</strong> even when stepping out briefly. Keep windows secured when away.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Night Safety</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">After Dark</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Avoid walking alone at night</strong>. Use well-lit paths and travel in groups when possible.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Valuables</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Protection</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Keep <strong>valuables secure and out of sight</strong>. Use lockers or safes when available.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Situational Awareness</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Vigilance</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Be aware of your surroundings</strong> at all times. Avoid distractions like headphones when walking alone.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Report Issues</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Community Safety</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Report suspicious activities immediately</strong> to security or use emergency call boxes.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "24/7 security patrol on campus and in halls",
        "Emergency call boxes at strategic locations across campus",
        "Main security office located at university entrance",
        "CCTV coverage in key areas including libraries and lecture halls",
        "Regular safety drills conducted each semester"
      ],
      steps: [
        {
          title: "Save Emergency Numbers",
          description: "Program campus security and local emergency numbers into your phone. Write them down in a visible place in your room."
        },
        {
          title: "Know Security Locations",
          description: "Identify the main security office, nearest emergency call boxes, and hall security posts."
        },
        {
          title: "Plan Your Routes",
          description: "Familiarize yourself with well-lit paths and safe routes between buildings, especially for nighttime travel."
        },
        {
          title: "Secure Your Belongings",
          description: "Always lock your room and secure valuables. Use padlocks for lockers and cabinets."
        },
        {
          title: "Travel Safely",
          description: "Avoid walking alone at night. Use campus shuttle services or travel in groups."
        },
        {
          title: "Report Concerns",
          description: "Report any suspicious activities or security concerns immediately to campus security."
        }
      ],
      tips: [
        "Always lock your room/hall door, even for brief absences",
        "Don't walk alone at night, especially in isolated areas",
        "Keep valuables secure and out of sight in your room",
        "Be aware of your surroundings when walking on campus",
        "Report suspicious activities immediately to security",
        "Participate in safety drills and orientations",
        "Know the location of emergency call boxes and how to use them"
      ],
      resources: [
        {
          title: "Emergency Numbers",
          description: "Save these important emergency contacts",
          url: "https://ucc.edu.gh/emergency-numbers"
        },
        {
          title: "Safety Guidelines",
          description: "Complete campus safety manual",
          url: "https://ucc.edu.gh/safety-guidelines"
        },
        {
          title: "Security Office Location",
          description: "Find main security office",
          url: "https://maps.google.com/?q=UCC+Security+Office+Cape+Coast"
        }
      ],
      checklist: [
        { text: "Save emergency numbers in phone", checked: false },
        { text: "Know security office location", checked: false },
        { text: "Identify emergency call boxes", checked: false },
        { text: "Program emergency contacts", checked: false },
        { text: "Know evacuation routes", checked: false },
        { text: "Report security concerns", checked: false },
        { text: "Secure room with proper locks", checked: false },
        { text: "Identify well-lit paths", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Safety Protocol' },
    { id: 'resources', label: 'Security Resources' },
  ];

  return { sections, tabs };
};

export default SecuritySafety;