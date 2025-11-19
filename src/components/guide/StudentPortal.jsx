
const StudentPortal = () => {
  // UCC GUIDE: STUDENT PORTAL
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Accessing Student Portal",
      summary: "Learn how to access and navigate UCC student portal.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              The UCC student portal is your gateway to all academic services, including course registration, checking results, fee payments, and accessing important university information. 
              Mastering the portal is essential for your academic journey at UCC.
              <strong> Always use the official portal URL and keep your credentials secure.</strong>
            </p>
          </div>
          
          {/* --- PORTAL FEATURES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Academic Services Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Academic</span>
                Core Services
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Essential academic functions available on portal.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Course Registration</strong> <span className="text-xs ml-auto text-gray-500">Each Semester</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Results Checking</strong> <span className="text-xs ml-auto text-gray-500">Instant</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Academic Records</strong> <span className="text-xs ml-auto text-gray-500">Transcripts</span>
                </li>
              </ul>
            </div>

            {/* Administrative Services Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Admin</span>
                Support Services
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Administrative functions available on portal.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Fee Payment</strong> <span className="text-xs ml-auto text-gray-500">Online</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Hostel Booking</strong> <span className="text-xs ml-auto text-gray-500">Limited</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Clearance Status</strong> <span className="text-xs ml-auto text-gray-500">Graduation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- PORTAL ACCESS GUIDE AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Portal Access Guide
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Visit Website</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Access Point</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Go to <strong>www.ucc.edu.gh</strong> and click on 'Student Portal' or access directly at <strong>portal.ucc.edu.gh</strong>
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Enter Credentials</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Login</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enter your <strong>Student ID</strong> and password. For first-time login, use your admission index number as default password.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Secure Account</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Security</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Change your password to something <strong>secure and memorable</strong>. Set up security questions for account recovery.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Explore Dashboard</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Navigation</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Familiarize yourself with the <strong>dashboard layout</strong> and available services for your academic level.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Set Up Email</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Communication</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Access your <strong>student email</strong> through the portal and set up forwarding if needed for official communications.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Student portal accessible at portal.ucc.edu.gh",
        "Default password is admission index number (change immediately)",
        "Portal provides access to registration, results, and fee payment",
        "Security questions can be set for password recovery",
        "Student email accessible through portal"
      ],
      steps: [
        {
          title: "Visit Official UCC Website",
          description: "Go to www.ucc.edu.gh and click on 'Student Portal' or access directly at portal.ucc.edu.gh"
        },
        {
          title: "Enter Your Credentials",
          description: "Enter your Student ID as username and admission index number as password for first-time login."
        },
        {
          title: "Change Your Password",
          description: "After first login, immediately change your password to something secure that you'll remember."
        },
        {
          title: "Set Up Security Questions",
          description: "Configure security questions for password recovery in case you forget your login details."
        },
        {
          title: "Explore Dashboard",
          description: "Familiarize yourself with the dashboard layout and available services for your academic level."
        },
        {
          title: "Access Student Email",
          description: "Set up and access your official student email through the portal for all university communications."
        }
      ],
      tips: [
        "Always use the official UCC website to access the portal",
        "Never share your login credentials with anyone",
        "Use a strong password with a combination of letters, numbers, and symbols",
        "Always log out after using the portal, especially on public computers",
        "Bookmark the portal URL for easy access",
        "Clear browser cache if experiencing login issues",
        "Use a supported browser (Chrome, Firefox, or Edge)"
      ],
      resources: [
        {
          title: "UCC Student Portal",
          description: "Direct link to student portal login page",
          url: "https://portal.ucc.edu.gh"
        },
        {
          title: "Student Portal User Guide",
          description: "Comprehensive guide on using all portal features",
          url: "https://ucc.edu.gh/student-portal-guide"
        },
        {
          title: "Student Email Setup",
          description: "How to set up and access your student email",
          url: "https://ucc.edu.gh/email-setup"
        }
      ],
      contacts: [
        {
          name: "IT Support Center",
          role: "Technical support for portal issues",
          contact: "itsupport@ucc.edu.gh | +233 123 456 789"
        },
        {
          name: "Student Affairs",
          role: "General student support services",
          contact: "studentaffairs@ucc.edu.gh | +233 123 456 788"
        }
      ],
      checklist: [
        { text: "Access portal with correct URL", checked: false },
        { text: "Change default password", checked: false },
        { text: "Set up security questions", checked: false },
        { text: "Explore dashboard features", checked: false },
        { text: "Set up student email", checked: false },
        { text: "Save support contacts", checked: false }
      ]
    }
  ];

  // Define the tabs for this guide
  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Access Process' },
    { id: 'resources', label: 'Portal Resources' },
    { id: 'checklist', label: 'Portal Checklist' }
  ];

  return { sections, tabs };
};

export default StudentPortal;