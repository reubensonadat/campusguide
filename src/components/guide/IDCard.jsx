
const IDCard = () => {
  // UCC GUIDE: STUDENT ID CARD
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Student ID Card Collection",
      summary: "Learn how and where to collect your student ID card.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Your student ID card is an essential document that provides access to various university services, including library services, examination halls, and campus facilities.
              <strong> Without a valid ID card, you'll be restricted from accessing key university resources.</strong>
            </p>
          </div>
          
          {/* --- ID CARD FEATURES --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Benefits Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Benefits</span>
                Access & Privileges
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Your ID card unlocks numerous campus services and facilities.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Library Access</strong> <span className="text-xs ml-auto text-gray-500">Essential</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Examination Entry</strong> <span className="text-xs ml-auto text-gray-500">Required</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Campus Facilities</strong> <span className="text-xs ml-auto text-gray-500">Sports, Labs</span>
                </li>
              </ul>
            </div>

            {/* Important Notes Card */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-amber-900 text-lg mb-3 flex items-center">
                <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Important</span>
                Remember
              </h4>
              <p className="text-sm text-amber-800/70 mb-4">Key information about your ID card that you should know.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Valid for Program Duration</strong> <span className="text-xs ml-auto text-gray-500">No Renewal</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Carry at All Times</strong> <span className="text-xs ml-auto text-gray-500">Campus Policy</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Replacement Fee Applies</strong> <span className="text-xs ml-auto text-gray-500">GH₵ 50.00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- COLLECTION PROCESS AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Collection Process
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Prepare Documents</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Before You Go</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Gather your <strong>admission letter</strong>, <strong>proof of fee payment</strong>, and <strong>passport-sized photo</strong> with white background.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Visit Office</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Timing Matters</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Go to <strong>Student Affairs Office</strong>, Administration Block, Room G12. Early morning visits have shorter queues.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Submit & Verify</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Identity Check</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Submit documents and photo. Staff will verify your identity using your birth certificate or valid ID.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Biometric Capture</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Digital Identity</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your fingerprints and photo will be digitally captured for the ID card system.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Collect & Sign</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Final Step</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Collect your ID card and sign for receipt. Get a protective holder to prevent damage.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Your ID card is valid for the entire duration of your program",
        "You must carry your ID card at all times while on campus",
        "A replacement fee applies if your ID card is lost or damaged",
        "Your ID card is required for examination entry"
      ],
      steps: [
        {
          title: "Prepare Required Documents",
          description: "Gather your admission letter, proof of fee payment, passport-sized photograph (with white background), and birth certificate or valid ID for verification."
        },
        {
          title: "Visit ID Card Office",
          description: "Go to the Student Affairs Office, Administration Block, Ground floor, Room G12. Look for the ID Card Collection signage."
        },
        {
          title: "Submit Documents and Photo",
          description: "Present all your documents to the staff for verification. Make sure your photo meets the requirements (white background, recent, clear)."
        },
        {
          title: "Biometric Capture",
          description: "Your fingerprints and photo will be digitally captured for the ID card system. This process usually takes a few minutes."
        },
        {
          title: "Collect Your ID Card",
          description: "In some cases, you may receive your ID card immediately. In other cases, you may need to return after a few days for collection."
        },
        {
          title: "Sign for Receipt",
          description: "Sign the collection register to confirm receipt of your ID card. Get a protective holder to prevent damage."
        }
      ],
      tips: [
        "Go early in the morning to avoid long queues",
        "Carry all required documents to avoid multiple trips",
        "Keep your ID card in a protective holder to prevent damage",
        "Report a lost ID card immediately to prevent misuse",
        "Take a clear photo of your ID card for backup"
      ],
      resources: [
        {
          title: "Student Affairs Office",
          description: "Department responsible for ID card issuance.",
          url: "https://ucc.edu.gh/student-affairs"
        },
        {
          title: "UCC Student Handbook",
          description: "Rules and regulations regarding student ID cards.",
          url: "https://ucc.edu.gh/student-handbook"
        }
      ],
      requirements: [
        "Admission letter",
        "Proof of fee payment",
        "Passport-sized photograph (with white background)",
        "Birth certificate or valid ID for verification"
      ],
      operatingHours: [
        { day: "Monday - Friday", time: "9:00 AM - 4:00 PM" },
        { day: "Saturday", time: "9:00 AM - 12:00 PM" },
        { day: "Sunday", time: "Closed" }
      ],
      checklist: [
        { text: "Prepare required documents", checked: false },
        { text: "Visit ID card office", checked: false },
        { text: "Submit documents and photo", checked: false },
        { text: "Collect your ID card", checked: false },
        { text: "Sign for receipt", checked: false },
        { text: "Get protective holder", checked: false }
      ]
    }
  ];

  // Define the location for ID card collection
  const location = {
    building: "Student Affairs Office, Administration Block",
    description: "Ground floor, Room G12, Administration Block. Look for the ID Card Collection signage.",
    url: "https://maps.google.com/?q=Administration+Block+University+of+Cape+Coast"
  };

  // Define the tabs for this guide
  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'location', label: 'Location' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'resources', label: 'Helpful Links' },
    { id: 'checklist', label: 'Essentials List' }
  ];

  return { sections, location, tabs };
};

export default IDCard;