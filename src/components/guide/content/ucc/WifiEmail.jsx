
const WifiEmail = () => {
  // UCC GUIDE: WI-FI & STUDENT EMAIL
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Wi-Fi & Student Email Setup",
      summary: "Connect to campus internet and set up your email.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 dark:bg-gray-800/50 p-5 rounded-xl border border-slate-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Staying connected is essential for your studies at UCC. Learn how to access campus Wi-Fi and set up your student email account.
              <strong> These services are your gateway to academic resources and official university communications.</strong>
            </p>
          </div>
          
          {/* --- WI-FI FEATURES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Wi-Fi Network Card */}
            <div className="bg-blue-50 dark:bg-blue-900/40 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 dark:text-blue-400 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Network</span>
                Campus Wi-Fi
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300/70 mb-4">Free internet access across campus.</p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>UCC-WiFi</strong> <span className="text-xs ml-auto text-gray-500">Primary</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Eduroam</strong> <span className="text-xs ml-auto text-gray-500">Global</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Library Wi-Fi</strong> <span className="text-xs ml-auto text-gray-500">Extended</span>
                </li>
              </ul>
            </div>

            {/* Email Services Card */}
            <div className="bg-emerald-50 dark:bg-emerald-900/40 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Email</span>
                Student Email
              </h4>
              <p className="text-sm text-emerald-800 dark:text-emerald-300/70 mb-4">Official communication channel for all students.</p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-50 dark:bg-emerald-900/40 rounded-full mr-3"></span>
                  <strong>Office 365 Access</strong> <span className="text-xs ml-auto text-gray-500">Free</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-50 dark:bg-emerald-900/40 rounded-full mr-3"></span>
                  <strong>50GB Storage</strong> <span className="text-xs ml-auto text-gray-500">Cloud</span>
                </li>
                <li className="flex items-center bg-white dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-50 dark:bg-emerald-900/40 rounded-full mr-3"></span>
                  <strong>Mobile Sync</strong> <span className="text-xs ml-auto text-gray-500">All Devices</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- GETEDUROAM CONNECTION GUIDE AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              New: GetEduroam Connection Method
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 dark:bg-sky-900/40 p-5 rounded-xl border border-sky-100 dark:border-sky-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 dark:text-sky-400 text-lg">Download App</h5>
                  <span className="text-3xl font-bold text-sky-200/80 dark:text-sky-800/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 dark:text-sky-300 font-semibold mb-2">First Step</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Download the <strong>geteduroam</strong> app from Play Store or App Store on your device.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 dark:bg-indigo-900/40 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 dark:text-indigo-400 text-lg">Visit Self-Service</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Reset Password</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Go to <strong>selfservice.ucc.edu.gh</strong>, select "Forgot Password", and enter your institutional email.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 dark:bg-violet-900/40 p-5 rounded-xl border border-violet-100 dark:border-violet-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 dark:text-violet-400 text-lg">Check Email</h5>
                  <span className="text-3xl font-bold text-violet-200/80 dark:text-violet-800/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 dark:text-violet-300 font-semibold mb-2">Instructions</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Check your inbox for password reset link. Follow the instructions to create a new password.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 dark:bg-amber-900/40 p-5 rounded-xl border border-amber-100 dark:border-amber-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 dark:text-amber-400 text-lg">Launch GetEduroam</h5>
                  <span className="text-3xl font-bold text-amber-200/80 dark:text-amber-800/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold mb-2">Connect</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Open the app, search for <strong>University of Cape Coast</strong>, select "UCC Eduroam Access," and log in.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 dark:bg-teal-900/40 p-5 rounded-xl border border-teal-100 dark:border-teal-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 dark:text-teal-400 text-lg">Connect & Use</h5>
                  <span className="text-3xl font-bold text-teal-200/80 dark:text-teal-800/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 dark:text-teal-300 font-semibold mb-2">Success</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Tap <strong>Connect</strong> and you're online! Remember your password must include capital letter, number, and special character.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Free Wi-Fi available across campus (UCC-WiFi and Eduroam).",
        "Student email provides Office 365 access with 50GB cloud storage.",
        "Login credentials provided at registration.",
        "Email accessible from any device with internet connection.",
        "New GetEduroam connection method now available for easier access."
      ],
      steps: [
        {
          title: "Download GetEduroam App",
          description: "Install the geteduroam app from Play Store or App Store on your device."
        },
        {
          title: "Visit Self-Service Portal",
          description: "Go to selfservice.ucc.edu.gh and select 'Forgot Password' to reset your credentials."
        },
        {
          title: "Check Your Email",
          description: "Look for password reset instructions in your institutional email inbox."
        },
        {
          title: "Create Secure Password",
          description: "Set a new password with at least one capital letter, number, and special character."
        },
        {
          title: "Connect to Eduroam",
          description: "Launch the geteduroam app, search for University of Cape Coast, and connect to the network."
        },
        {
          title: "Access Student Email",
          description: "Go to mail.ucc.edu.gh and log in with your institutional email and new password."
        }
      ],
      tips: [
        "Use VPN for secure connections on public Wi-Fi.",
        "Regularly check your student email for important announcements.",
        "Save important emails offline for reference.",
        "Report connectivity issues to IT Support promptly.",
        "Keep your password secure and change it periodically."
      ],
      resources: [
        {
          title: "Email Setup Guide",
          description: "Step-by-step email configuration",
          url: "https://portal.ucc.edu.gh/frames/index.php"
        }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Connection Process' },
    { id: 'resources', label: 'Connectivity Resources' },
  ];

  return { sections, tabs };
};

export default WifiEmail;