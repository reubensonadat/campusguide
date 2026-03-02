
const LabsITServices = () => {
  // UCC GUIDE: LABS & IT SERVICES
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Computer Labs & IT Support",
      summary: "Access computer facilities and get technical help.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              UCC provides extensive computer labs and IT services to support your academic work. Knowing where to find these facilities and how to get help is essential for a smooth academic experience.
              <strong> Your student credentials are your key to accessing these resources.</strong>
            </p>
          </div>
          
          {/* --- FACILITIES & SUPPORT GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Computer Labs Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Labs</span>
                Computer Facilities
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Well-equipped labs are available across various faculty buildings for your use.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Faculty Labs</strong> <span className="text-xs ml-auto text-gray-500">Specialized Software</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Printing Services</strong> <span className="text-xs ml-auto text-gray-500">Pay & Print</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>High-Speed Internet</strong> <span className="text-xs ml-auto text-gray-500">Wired & Wi-Fi</span>
                </li>
              </ul>
            </div>

            {/* IT Support Card */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-indigo-900 text-lg mb-3 flex items-center">
                <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Support</span>
                Help & Connectivity
              </h4>
              <p className="text-sm text-indigo-800/70 mb-4">Get technical assistance and connect to the campus-wide network.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  <strong>IT Support Center</strong> <span className="text-xs ml-auto text-gray-500">Main Library</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  <strong>Campus Wi-Fi</strong> <span className="text-xs ml-auto text-gray-500">Eduroam, 
                    UCC-Wi-Fi
                  </span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  <strong>Support Portal</strong> <span className="text-xs ml-auto text-gray-500">Online Tickets</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- GETTING STARTED AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              How to Get Started
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Find a Lab</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Locate</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Check the <strong>Lab Locations</strong> map. Labs are in the Library, Science Block, and various faculty buildings.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Log In</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Credentials</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Use your <strong>Student ID</strong> and <strong>Portal Password</strong> to log in to any lab computer.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Use Services</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Work & Print</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Access specialized software, browse the internet, and use the <strong>Pay & Print</strong> service.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Save Your Work</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Backup</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Save frequently to a <strong>USB drive</strong> or cloud storage. Local drives are wiped on restart.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Get Help</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Support</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Visit the <strong>IT Support Center</strong> at the main library or submit a ticket online.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Computer labs available in faculty buildings",
        "IT support center at the main library",
        "Free Wi-Fi across campus",
        "Printing services available in labs",
        "Software available for student use"
      ],
      steps: [
        {
          title: "Locate a Computer Lab",
          description: "Find the nearest lab using the campus map or the online Lab Locations resource. Check the opening hours before you go."
        },
        {
          title: "Log In with Student Credentials",
          description: "Use your official Student ID as the username and your student portal password to log in to any lab computer."
        },
        {
          title: "Connect to Wi-Fi",
          description: "Connect your personal device to the 'Eduroam' or 'UCC-Wi-Fi' Wi-Fi networks using your student credentials for secure, high-speed internet."
        },
        {
          title: "Use Lab Services",
          description: "Utilize available software, access the internet for research, and use the Pay & Print service for your documents."
        },
        {
          title: "Save Your Work Properly",
          description: "Always save your work to an external USB drive or a cloud service. Files saved on the desktop are not permanent."
        },
        {
          title: "Report Technical Issues",
          description: "If you encounter any hardware or software problems, report them immediately to the lab assistant or the IT Support Center."
        }
      ],
      tips: [
        "Save work frequently to avoid loss",
        "Bring USB drive for backup",
        "Check lab opening hours before visiting",
        "Book lab time during peak periods",
        "Report technical issues immediately"
      ],
      
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' }
  ];

  return { sections, tabs };
};

export default LabsITServices;