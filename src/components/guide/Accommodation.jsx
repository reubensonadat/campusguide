import React from 'react';

const Accommodation = () => {
  // UCC GUIDE: ACCOMMODATION
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "On-Campus Residence",
      summary: "Halls, Portal Booking, and the 'In-Out-Out-Out' Policy.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              UCC operates a collegiate system where every student is affiliated with a Hall of Residence.
              Due to the <strong>"In-Out-Out-Out"</strong> policy, freshers are prioritized for on-campus rooms.
            </p>
          </div>

          {/* --- HALLS GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Old Site Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Old Site</span>
                Southern Campus
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Home to Admin, Arts, & Social Sciences. Breezy coastal atmosphere.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Oguaa Hall</strong> <span className="text-xs ml-auto text-gray-500">Mixed</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Atlantic Hall</strong> <span className="text-xs ml-auto text-gray-500">Mixed</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  <strong>Adehye Hall</strong> <span className="text-xs ml-auto text-pink-600 font-bold">Females Only</span>
                </li>
              </ul>
            </div>

            {/* New Site Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">New Site</span>
                Northern Campus
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">"Science" - Home to Medical, Business & Physical Sciences.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Casely Hayford</strong> <span className="text-xs ml-auto text-blue-600 font-bold">Males Only</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Valco Hall</strong> <span className="text-xs ml-auto text-gray-500">Mixed</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Kwame Nkrumah</strong> <span className="text-xs ml-auto text-gray-500">Mixed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- STEPS AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Application Process
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Admission Letter</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Prerequisite</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Locate your <strong>Student ID</strong> and <strong>Reference Number</strong> on your official letter. You cannot log in without these.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Access Portal</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Timing is Key</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Visit <strong>portal.ucc.edu.gh</strong>. Be logged in 15 minutes before the announced opening time (usually 10:00 AM).
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}

              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Instant Payment</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Secure the Bed</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Print the invoice and pay <strong>immediately</strong> at GCB, Zenith, or Prudential Bank to lock it in.
                </p>
              </div>


              {/* Step 4 - Subtle Amber */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Select Room</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Fast Fingers</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Navigate to 'Accommodation'. Rooms disappear in seconds. Casford & Adehye fill up fastest.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Confirm</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Undertaking Form</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Log back in to verify payment reflection and print your Residential Undertaking Form.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Freshers are prioritized for halls (In-Out-Out-Out Policy).",
        "Biometric entry is used in most halls for security.",
        "Cooking in rooms is strictly prohibited; use general kitchenettes.",
        "Hall Dues are mandatory for all affiliates, even if living off-campus."
      ],
      // Data retained for the generic "Action Plan" tab
      steps: [
        {
          title: "Wait for Admission Letter",
          description: "You cannot apply without the Student ID and Reference Number found on your official admission letter."
        },
        {
          title: "Monitor Portal Opening",
          description: "The portal (portal.ucc.edu.gh) usually opens for booking at 10:00 AM on a specific date. Be ready 15 minutes early."
        },
        {
          title: "Select Hall & Room",
          description: "Log in and navigate to 'Accommodation'. Selection is 'First-Come, First-Served'. Casford and Adehye fill up instantly."
        },
        {
          title: "Print & Pay Immediately",
          description: "Print the booking invoice and pay at approved banks (GCB, Zenith, Prudential) or via the specific mobile money shortcode provided on the invoice."
        },
        {
          title: "Finalize Booking",
          description: "Log back in to confirm the payment has reflected and print your Residential Undertaking Form (occupancy agreement)."
        }
      ],
      tips: [
        "Internet speed is key; go to a cafe or use a strong 4G connection when the portal opens.",
        "Have a backup hall choice in mind (e.g., if Adehye is full, try Oguaa immediately).",
        "Do not pay anyone for a room 'connection'; the system is automated."
      ],
      resources: [
        {
          title: "UCC Student Portal",
          description: "The official platform for room booking.",
          url: "https://portal.ucc.edu.gh"
        },
        {
          title: "UCC Student Handbook",
          description: "Rules on residency, quiet hours, and conduct.",
          url: "https://ucc.edu.gh/student-handbook"
        }
      ],
      checklist: [
        { text: "Admission Letter & ID", checked: false },
        { text: "Mosquito Net (Essential for malaria)", checked: false },
        { text: "Bucket & Pail (Water storage is necessary)", checked: false },
        { text: "Power Strip / Extension Board", checked: false },
        { text: "Padlocks (For luggage and wardrobes)", checked: false },
        { text: "Provisions (Gari, Sugar, Milk, Shito)", checked: false },
        { text: "White Bed Sheets (Required for some halls)", checked: false }
      ]
    },
    {
      title: "Off-Campus (Diaspora)",
      summary: "Renting in Amamoma, Kwaprow, and Apewosika.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
            <p className="text-gray-700">
              Continuing students (Level 200-400) usually move to private hostels in the communities surrounding the university, collectively known as the <strong>"Diaspora"</strong>.
            </p>
          </div>

          {/* --- COMMUNITIES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-orange-900 text-lg mb-2">Amamoma & School Bus Road</h4>
              <p className="text-xs font-bold text-orange-600 uppercase mb-3 tracking-wide">Near LT & Main Library</p>
              <p className="text-sm text-gray-700">Closest to the <strong>Large Lecture Theatre (LLT)</strong> and <strong>Sam Jonah Library</strong>. Very lively student atmosphere with many food spots, though rent can be higher due to the prime location.</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-teal-900 text-lg mb-2">Kwaprow & Ayensu</h4>
              <p className="text-xs font-bold text-teal-600 uppercase mb-3 tracking-wide">Near Sandwich Lecture Theatre</p>
              <p className="text-sm text-gray-700">Strategic choice if you have frequent classes at the <strong>Sandwich Lecture Theatre (SWLT)</strong>. These areas often offer more affordable housing options while remaining accessible.</p>
            </div>
          </div>

          {/* --- RENTING STEPS AS VISUAL CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Renting Process
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-blue-900 text-lg mb-1">1. Physical Inspection</h5>
                <p className="text-sm text-gray-600 mt-2"><strong>Never</strong> pay without seeing the room. Check water flow, ventilation, and security personally.</p>
              </div>

              <div className="bg-red-50 p-5 rounded-xl border border-red-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-red-900 text-lg mb-1">2. Verify Ownership</h5>
                <p className="text-sm text-gray-600 mt-2">Ensure you are paying the actual landlord or caretaker. Ask for ID. Avoid "agents" without official credentials.</p>
              </div>

              <div className="bg-green-50 p-5 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                <h5 className="font-bold text-green-900 text-lg mb-1">3. Sign & Pay</h5>
                <p className="text-sm text-gray-600 mt-2">Read the tenancy agreement (check utility bills/refund policies) before paying via Bank Deposit.</p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Rent is paid annually (1 or 2 years in advance).",
        "Campus Shuttles run frequently between Diaspora stops and the Lecture Theatres.",
        "Security varies; walled and gated hostels with night watchmen are recommended.",
        "Water flow can be inconsistent; check if the hostel has Polytanks."
      ],
      steps: [

        {
          title: "Physical Inspection",
          description: "Visit the hostel in person. Do not rely on pictures. Check proximity to campus and water flow."
        },
        {
          title: "Verify Ownership",
          description: "Ensure you are paying the actual landlord or caretaker. Avoid 'agents' with no official ID."
        },
        {
          title: "Sign Tenancy Agreement",
          description: "Read the rules carefully regarding visitors, utilities (ECG/Water bills), and refund policies before signing."
        },
        {
          title: "Make Payment",
          description: "Pay via bank deposit if possible to have a paper trail. Avoid cash payments without official receipts."
        }
      ],
      tips: [
        "Start searching early (immediately after the second semester ends).",
        "Grouping with friends to rent a full room/apartment is often cheaper.",
        "Check the distance to the nearest Shuttle Station."
      ],
      resources: [

        {
          title: "UCC Shuttle Map",
          description: "Routes for campus shuttles from diaspora.",
          url: "https://ucc.edu.gh/transport"
        }
      ],
      checklist: [
        { text: "Check Water Storage (Polytanks)", checked: false },
        { text: "Check Security (Gates & Locks)", checked: false },
        { text: "Verify Electricity Meter (Prepaid vs Postpaid)", checked: false },
        { text: "Check Ventilation & Netting", checked: false },
        { text: "Test Mobile Network Signal in Room", checked: false }
      ]
    },
    {
      title: "Expert Advice & Resources",
      summary: "Critical timing strategy and SRC initiatives.",
      content: (
        <div className="space-y-6">
          {/* --- TIMING ADVICE --- */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 shadow-sm">
            <h4 className="font-bold text-purple-900 text-lg mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 mr-3 text-sm">💡</span>
              The "Golden Window" Rule
            </h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>End of Second Semester = Hunt Begins.</strong><br />
              Many students make the mistake of waiting until the long vacation is over.
              To live a happy life in Level 200 and beyond, you must start looking for accommodation
              <strong> immediately as the second semester ends</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/80 p-4 rounded-lg border border-purple-100">
                <h5 className="font-bold text-green-700 text-xs uppercase mb-2">Why Start Early?</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    <span><strong>Better Prices:</strong> Secure rooms before demand spikes prices.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    <span><strong>Peace of Mind:</strong> Make down payments, go home, and return to a secured home.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 font-bold">✓</span>
                    <span><strong>Prime Locations:</strong> Get the best spots closer to campus.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/80 p-4 rounded-lg border border-red-100">
                <h5 className="font-bold text-red-700 text-xs uppercase mb-2">Risks of Delay</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2 font-bold">⚠</span>
                    <span><strong>Expensive Leftovers:</strong> You'll pay premium for sub-par rooms.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2 font-bold">⚠</span>
                    <span><strong>Distance Stress:</strong> Far hostels = fatigue + high transport costs.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2 font-bold">⚠</span>
                    <span><strong>Academic Impact:</strong> A stressful home environment can break your academic year.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* --- SRC INITIATIVE --- */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-blue-900 text-lg">SRC Hostel Directory</h4>
              <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded">Update</span>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              The current SRC President (2025-2026) promised a centralized directory in his campaign.
              However, the resource provided below is strictly from the <strong>previous administration (2024-2025)</strong>.
            </p>

            <div className="mt-4 pt-4 border-t border-blue-200/50">
              <div className="bg-white/60 p-3 rounded-lg text-xs text-gray-600 mb-3 border border-blue-100">
                <strong className="text-blue-800">Note:</strong> While this list is a helpful initiative, it is
                <strong> just a small collection of contacts</strong> and may not be the "best thing in the world."
                It is better to physically go around and search for yourself, but this can help you make initial inquiries in the meantime.
              </div>

              <p className="text-xs font-bold text-gray-500 uppercase mb-2">In the meantime, verify listings here:</p>
              <a href="https://www.capevars.com/" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-200 hover:border-blue-400 transition-all group shadow-sm">
                <span className="font-bold text-blue-700">CapeVars.com</span>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Your accommodation environment can make or break your GPA.",
        "If a place is too far, you will be stressed. If it's close and decent, you thrive.",
        "Waiting until the last minute guarantees 'big problems' with pricing and quality."
      ],
      steps: [],
      tips: [
        "The earlier you look, the better for you.",
        "Make your down payments early to lock in the agreement."
      ],
      resources: [
        {
          title: "CapeVars Listing",
          description: "Browse available hostels.",
          url: "https://www.capevars.com/"
        }
      ],
      checklist: []
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'resources', label: 'Helpful Links' },
  ];

  return { sections, tabs };
};

export default Accommodation;