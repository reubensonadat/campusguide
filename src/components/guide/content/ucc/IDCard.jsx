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
          <div className="bg-[var(--gray-100-soft)] p-5 rounded-xl border border-[var(--gray-200)] transition-colors duration-300">
            <p className="text-[var(--gray-700)] leading-relaxed">
              Your student ID card is mainly used for <strong>examinations</strong>.
              It is not required for most campus facilities.
              You will receive it only after your department organizes the official photo-taking
              exercise and a specific bank selected by the university prints the cards.
            </p>
          </div>

          {/* TRUE FEATURES */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* USES */}
            <div className="bg-[var(--primary-50)] p-6 rounded-xl border border-[var(--primary-200)] hover:shadow-md transition-all">
              <h4 className="font-bold text-[var(--primary-800)] text-lg mb-3 flex items-center">
                <span className="bg-[var(--primary-200)] text-[var(--primary-800)] text-xs font-bold px-2 py-1 rounded mr-2 uppercase">Uses</span>
                Where You Need It
              </h4>
              <ul className="space-y-3 text-sm text-[var(--gray-700)]">
                <li className="flex items-center bg-[var(--white)] p-2 rounded">
                  <span className="w-2 h-2 bg-[var(--primary-400)] rounded-full mr-3"></span>
                  <strong>Examination Entry</strong> <span className="text-xs ml-auto text-[var(--gray-500)]">Required</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded">
                  <span className="w-2 h-2 bg-[var(--primary-400)] rounded-full mr-3"></span>
                  <strong>Student Identity Verification</strong>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded">
                  <span className="w-2 h-2 bg-[var(--primary-400)] rounded-full mr-3"></span>
                  <strong>No special access</strong> <span className="text-xs ml-auto text-[var(--gray-500)]">E.g., Library</span>
                </li>
              </ul>
            </div>

            {/* IMPORTANT REAL NOTES */}
            <div className="bg-[var(--accent-50)] p-6 rounded-xl border border-[var(--accent-200)] hover:shadow-md transition-all">
              <h4 className="font-bold text-[var(--accent-900)] text-lg mb-3 flex items-center">
                <span className="bg-[var(--accent-200)] text-[var(--accent-800)] text-xs font-bold px-2 py-1 rounded mr-2 uppercase">Important</span>
                What to Know
              </h4>
              <ul className="space-y-3 text-sm text-[var(--gray-700)]">
                <li className="flex items-center bg-[var(--white)] p-2 rounded">
                  <span className="w-2 h-2 bg-[var(--accent-400)] rounded-full mr-3"></span>
                  <strong>No Renewal</strong> (Valid for entire program)
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded">
                  <span className="w-2 h-2 bg-[var(--accent-400)] rounded-full mr-3"></span>
                  <strong>Do NOT wait to take your picture</strong> (It delays your card)
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded">
                  <span className="w-2 h-2 bg-[var(--accent-400)] rounded-full mr-3"></span>
                  <strong>Course reps announce collection</strong>
                </li>
              </ul>
            </div>

            {/* LOST ID CARD WARNING */}
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20 hover:shadow-md transition-all">
              <h4 className="font-bold text-red-900 dark:text-red-400 text-lg mb-3 flex items-center">
                <span className="bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-200 text-xs font-bold px-2 py-1 rounded mr-2 uppercase">⚠️ Lost Your ID?</span>
                Replacement Process
              </h4>
              <ul className="space-y-3 text-sm text-[var(--gray-700)]">
                <li className="flex items-start bg-[var(--white)] p-3 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-1.5"></span>
                  <div>
                    <strong className="block mb-1">Go to MIS Office</strong>
                    <span className="text-xs text-[var(--gray-500)]">Located near the Education Library</span>
                  </div>
                </li>
                <li className="flex items-start bg-[var(--white)] p-3 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-1.5"></span>
                  <div>
                    <strong className="block mb-1">Report ID Card Missing</strong>
                    <span className="text-xs text-[var(--gray-500)]">Inform them your ID card is lost</span>
                  </div>
                </li>
                <li className="flex items-start bg-[var(--white)] p-3 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-1.5"></span>
                  <div>
                    <strong className="block mb-1">Pay Replacement Fee</strong>
                    <span className="text-xs text-[var(--gray-500)]">Fee required for new card processing</span>
                  </div>
                </li>
                <li className="flex items-start bg-[var(--white)] p-3 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-1.5"></span>
                  <div>
                    <strong className="block mb-1 text-[var(--gray-900)]">Wait for Processing</strong>
                    <span className="text-xs text-[var(--gray-500)]">MIS office will handle the replacement</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* TRUE COLLECTION PROCESS */}
          <div className="pt-4">
            <h3 className="font-bold text-[var(--gray-900)] text-xl mb-6 flex items-center">
              <span className="bg-[var(--gray-200)] text-[var(--gray-700)] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Collection Process (Real UCC Flow)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 */}
              <div className="bg-[var(--primary-50)] p-5 rounded-xl border border-[var(--primary-100)] hover:shadow-md transition-all">
                <h5 className="font-bold text-[var(--primary-800)] text-lg">1. Follow Department Schedule</h5>
                <p className="text-sm mt-2 text-[var(--gray-600)]">
                  UCC announces picture-taking dates by department. Dress formally and go early.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[var(--primary-50)] p-5 rounded-xl border border-[var(--primary-200)] hover:shadow-md transition-all">
                <h5 className="font-bold text-[var(--primary-800)] text-lg">2. Take Your Official Photo</h5>
                <p className="text-sm mt-2 text-[var(--gray-600)]">
                  Photos are taken at designated locations like CALC, Sam Jonah, or ICT Centre.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[var(--accent-50)] p-5 rounded-xl border border-[var(--accent-100)] hover:shadow-md transition-all">
                <h5 className="font-bold text-[var(--accent-900)] text-lg">3. Printing by Bank</h5>
                <p className="text-sm mt-2 text-[var(--gray-600)]">
                  A specific bank selected by the university prints the ID cards. You cannot collect the card directly there.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[var(--gray-100-soft)] p-5 rounded-xl border border-[var(--gray-200)] hover:shadow-md transition-all">
                <h5 className="font-bold text-[var(--gray-800)] text-lg">4. Wait for Announcement</h5>
                <p className="text-sm mt-2 text-[var(--gray-600)]">
                  Your course reps will announce the exact date and location for collection.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-[var(--accent-50)] p-5 rounded-xl border border-[var(--accent-200)] hover:shadow-md transition-all">
                <h5 className="font-bold text-[var(--accent-900)] text-lg">5. Collect Your ID</h5>
                <p className="text-sm mt-2 text-[var(--gray-600)]">
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
        "A specific bank selected by the university prints the cards",
        "Collection is done through course reps",
        "Admission letter can be used temporarily for mid-sem exams"
      ],

      steps: [
        { title: "Department Announces Photo Day", description: "Follow the official photo schedule for your department." },
        { title: "Take Your Formal Picture", description: "Dress formally. This photo appears on your portal and ID card." },
        { title: "Printing by specific bank selected by the university", description: "Cards are processed and returned to your department." },
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

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'resources', label: 'Helpful Links' },
  ];

  return { sections, location, tabs };
};

export default IDCard;
