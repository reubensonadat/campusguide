const IDCard = () => {
  // UCC GUIDE: STUDENT ID CARD (ACCURATE 2025 EDITION)
  // Verified with actual UCC procedures – picture schedules, collection flow, and exam requirements.

  const sections = [
    {
      title: "Student ID Card Collection",
      summary: "How ID card pictures are taken, how cards are printed, and how to collect yours.",
      content: (
        <div className="space-y-8">

          {/* INTRO */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Your student ID card is mainly used for <strong>examinations</strong>. 
              It is not required for most campus facilities. 
              You will receive it only after your department organizes the official photo-taking 
              exercise and Prudential Bank prints the cards.
            </p>
          </div>

          {/* TRUE FEATURES */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* USES */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-2 uppercase">Uses</span>
                Where You Need It
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Examination Entry</strong> <span className="text-xs ml-auto text-gray-500">Required</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Student Identity Verification</strong>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>No special access</strong> <span className="text-xs ml-auto text-gray-500">E.g., Library</span>
                </li>
              </ul>
            </div>

            {/* IMPORTANT REAL NOTES */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 hover:shadow-md transition-all">
              <h4 className="font-bold text-amber-900 text-lg mb-3 flex items-center">
                <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded mr-2 uppercase">Important</span>
                What to Know
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>No Renewal</strong> (Valid for entire program)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Do NOT wait to take your picture</strong> (It delays your card)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  <strong>Course reps announce collection</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* TRUE COLLECTION PROCESS */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Collection Process (Real UCC Flow)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all">
                <h5 className="font-bold text-sky-900 text-lg">1. Follow Department Schedule</h5>
                <p className="text-sm mt-2 text-gray-600">
                  UCC announces picture-taking dates by department. Dress formally and go early.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all">
                <h5 className="font-bold text-indigo-900 text-lg">2. Take Your Official Photo</h5>
                <p className="text-sm mt-2 text-gray-600">
                  Photos are taken at designated locations like CALC, Sam Jonah, or ICT Centre.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all">
                <h5 className="font-bold text-violet-900 text-lg">3. Printing by Prudential Bank</h5>
                <p className="text-sm mt-2 text-gray-600">
                  Prudential Bank prints the ID cards. You cannot collect the card directly there.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all">
                <h5 className="font-bold text-amber-900 text-lg">4. Wait for Announcement</h5>
                <p className="text-sm mt-2 text-gray-600">
                  Your course reps will announce the exact date and location for collection.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all">
                <h5 className="font-bold text-teal-900 text-lg">5. Collect Your ID</h5>
                <p className="text-sm mt-2 text-gray-600">
                  Provide your name or index number. Cards are usually distributed by department reps.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),

      keyPoints: [
        "ID card is mainly for exams",
        "You must take your photo during department schedule",
        "Prudential Bank prints the cards",
        "Collection is done through course reps",
        "Admission letter can be used temporarily for mid-sem exams"
      ],

      steps: [
        { title: "Department Announces Photo Day", description: "Follow the official photo schedule for your department." },
        { title: "Take Your Formal Picture", description: "Dress formally. This photo appears on your portal and ID card." },
        { title: "Printing by Prudential Bank", description: "Cards are processed and returned to your department." },
        { title: "Wait for Your Course Rep", description: "They will announce when the ID cards are ready." },
        { title: "Collect with Your Name/Index Number", description: "No additional documents required." },
      ],

      tips: [
        "Take your photo early to avoid delays",
        "Keep your ID safe — replacement takes time",
        "Take a picture of your ID card as backup",
        "Admission letter works only for early exams"
      ],

      resources: [
        { title: "UCC Handbook", description: "General student rules", url: "https://portal.ucc.edu.gh/downloads/hand.pdf" }
      ],

      requirements: [
        "Attend the official photo-taking exercise",
        "Formal dress code for the picture"
      ],

      operatingHours: [
        { day: "Photo sessions", time: "Based on departmental schedule" },
        { day: "Collection", time: "Announced by course reps" },
      ],

      checklist: [
        { text: "Attend photo-taking session", checked: false },
        { text: "Dress formally", checked: false },
        { text: "Wait for course rep announcement", checked: false },
        { text: "Collect ID card", checked: false }
      ]
    }
  ];

  const location = {
    building: "Varies by Department",
    description: "Photos usually taken at CALC, Sam Jonah Library Area, ICT Centre, or designated halls. Collection location is announced by course reps.",
    url: "https://maps.google.com/?q=University+of+Cape+Coast"
  };

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'location', label: 'Location' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'resources', label: 'Helpful Links' },
  ];

  return { sections, location, tabs };
};

export default IDCard;
