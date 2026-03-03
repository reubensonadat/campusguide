
const LibraryServices = () => {
  // UCC GUIDE: LIBRARY SERVICES
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Updated with comprehensive content from libraryguide.md

  const sections = [
    {
      title: "Overview",
      summary: "The University of Cape Coast Library system consists of the main Sam Jonah Library (2,000 seating capacity) and 31 satellite libraries.",
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              The Sam Jonah Library is the heart of academic research at UCC. It offers a massive collection of physical books,
              journals, and a rapidly growing digital library. Whether you need a quiet place to study, access to wifi,
              or help with research, the library is your go-to resource.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3">Quick Facts</h4>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Main Library + 31 Satellites
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                2,000 Seating Capacity
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Located near the large lecture theatres
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Open to all students & staff
              </li>
            </ul>
          </div>
        </div>
      ),
      keyPoints: [
        "Bags must be left at the baggage room (Ground floor)",
        "No food, smoking, or phone calls allowed inside",
        "Silence must be maintained at all times"
      ]
    },
    {
      title: "Operational Hours",
      summary: "Opening times vary based on the academic calendar (Regular Semester vs. Exams vs. Vacation).",
      content: (
        <div className="space-y-6">
          {/* Regular Semester */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h4 className="font-bold text-indigo-900">Regular Semester</h4>
            </div>
            <div className="p-6 grid gap-4">
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-gray-600 font-medium">Monday – Friday</span>
                <span className="font-bold text-gray-800">9:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Saturdays</span>
                <span className="font-bold text-gray-800">9:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Examination Period */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex justify-between items-center">
              <h4 className="font-bold text-amber-900">Examination Period</h4>
              <span className="text-xs font-bold bg-amber-200 text-amber-800 px-2 py-1 rounded">Extended Hours</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Monday – Saturday</span>
                <span className="font-bold text-gray-800">9:00 AM – 5:00 AM <span className="text-xs text-gray-500 font-normal">(Next Day)</span></span>
              </div>
            </div>
          </div>

          {/* Vacation */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h4 className="font-bold text-gray-900">Vacation Period</h4>
            </div>
            <div className="p-6 grid gap-4">
              <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                <span className="text-gray-600 font-medium">Monday – Friday</span>
                <span className="font-bold text-gray-800">9:00 AM – 4:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Saturdays</span>
                <span className="font-bold text-gray-400 italic">Closed (Service on request)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Rules & Conduct",
      summary: "Strict adherence to library rules is required to maintain a conducive study environment.",
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h4 className="font-bold text-red-900 mb-4">Prohibited Acts</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-red-800 text-sm">
                <span className="font-bold text-red-500">×</span>
                <span><strong>No Phone Calls:</strong> Calls are not allowed in most parts of the library.</span>
              </li>
              <li className="flex items-start gap-3 text-red-800 text-sm">
                <span className="font-bold text-red-500">×</span>
                <span><strong>No Smoking or Eating:</strong> Strictly prohibited inside the library.</span>
              </li>
              <li className="flex items-start gap-3 text-red-800 text-sm">
                <span className="font-bold text-red-500">×</span>
                <span><strong>No Seat Reservation:</strong> You cannot 'book' a seat by leaving items for more than 10 minutes.</span>
              </li>
              <li className="flex items-start gap-3 text-red-800 text-sm">
                <span className="font-bold text-red-500">×</span>
                <span><strong>No Proxy Borrowing:</strong> You cannot borrow books on behalf of others.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4">Entry & Exit Protocols</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><strong>Baggage:</strong> Must be left in the Baggage Room (Ground Floor). Do not leave valuables.</li>
              <li><strong>Inspections:</strong> You must show all books to security at the gate before exiting.</li>
              <li><strong>Identification:</strong> Always insist on a tag for your checked bag.</li>
            </ul>
          </div>
        </div>
      ),
      commonMistakes: [
        "Leaving valuables (phones, money) in checked bags at the baggage room",
        "Attempting to borrow books for a friend",
        "Eating or drinking inside the main library halls",
        "Leaving books on a desk for over 10 mins to 'reserve' the seat"
      ],
      consequences: "Stealing library property is a grave offense punishable by expulsion. Defacing books (writing/tearing) attracts a surcharge. The Librarian has authority to search student rooms if theft is suspected."
    },
    {
      title: "Borrowing Books",
      summary: "Understand how to borrow, renew, and reserve books found in the Circulation Unit.",
      content: (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-2">Loan Period</h4>
              <p className="text-3xl font-bold text-emerald-600 mb-1">2 Weeks</p>
              <p className="text-xs text-emerald-800">Renewable once if not requested by others</p>
            </div>
            <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
              <h4 className="font-bold text-orange-900 mb-2">Overdue Fines</h4>
              <p className="text-3xl font-bold text-orange-600 mb-1">50p</p>
              <p className="text-xs text-orange-800">Per book, per day</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4">Reference vs. Borrowable</h4>
            <p className="text-sm text-gray-600 mb-4">
              Not all books can be taken out. Check the spine label (Call Mark).
              If it has these prefixes, it is for <strong>Reference Only</strong>:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-mono font-bold">R (Reference)</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-mono font-bold">GH (Ghana Coll.)</span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-mono font-bold">DT (Africana)</span>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              *Borrowable books are primarily on the 1st and 2nd Floors.
            </p>
          </div>
        </div>
      ),
      steps: [
        {
          title: "Find a book",
          description: "Locate a book on the 1st or 2nd floor (ensure it's not Reference only)."
        },
        {
          title: "Go to Circulation Desk",
          description: "Take the book to the desk on the Ground Floor."
        },
        {
          title: "Present ID",
          description: "Show your valid Student ID card to the staff."
        },
        {
          title: "Check Return Date",
          description: "Note the due date stamped on the slip to avoid fines."
        }
      ],
      tips: [
        "Lost a book? Report it immediately to avoid accumulating daily fines.",
        "If you lose a book, you must replace it or pay 3 times the current cost.",
        "You can reserve a book that is currently out; it will be held for 24h upon return."
      ]
    },
    {
      title: "Departments & Sections",
      summary: "A guide to the physical layout of the Sam Jonah Library.",
      content: (
        <div className="space-y-8">
          {/* Ground Floor */}
          <div className="relative pl-6 border-l-2 border-indigo-100">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></span>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Ground Floor</h4>
            <ul className="space-y-3">
              <li className="bg-slate-50 p-3 rounded-lg text-sm">
                <strong className="block text-slate-800">Serials & Media Unit</strong>
                <span className="text-slate-600">Newspapers, magazines, light reading.</span>
              </li>
              <li className="bg-slate-50 p-3 rounded-lg text-sm">
                <strong className="block text-slate-800">Reference & Reserve</strong>
                <span className="text-slate-600">Dictionaries, encyclopedias (Ref Only).</span>
              </li>
              <li className="bg-slate-50 p-3 rounded-lg text-sm">
                <strong className="block text-slate-800">Special Needs Section</strong>
                <span className="text-slate-600">Braille resources, mobility aids, exam transcription services.</span>
              </li>
              <li className="bg-slate-50 p-3 rounded-lg text-sm">
                <strong className="block text-slate-800">Electronic Library (E-Library)</strong>
                <span className="text-slate-600">Computers, typing services, technical support.</span>
              </li>
            </ul>
          </div>

          {/* First Floor */}
          <div className="relative pl-6 border-l-2 border-indigo-100">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-300"></span>
            <h4 className="font-bold text-gray-900 text-lg mb-2">First Floor</h4>
            <div className="bg-indigo-50/50 p-3 rounded-lg text-sm">
              <strong className="block text-indigo-900">General Stacks</strong>
              <span className="text-gray-600">Main collection of borrowable books arranged by subject.</span>
            </div>
          </div>

          {/* Second Floor */}
          <div className="relative pl-6 border-l-2 border-indigo-100">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-300"></span>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Second Floor</h4>
            <ul className="space-y-3">
              <li className="bg-slate-50 p-3 rounded-lg text-sm">
                <strong className="block text-slate-800">Africana Unit</strong>
                <span className="text-slate-600">Rare collections on Africa/Ghana, theses. (Ref Only).</span>
              </li>
              <li className="bg-slate-50 p-3 rounded-lg text-sm">
                <strong className="block text-slate-800">Law Library (East Wing)</strong>
                <span className="text-slate-600">Dedicated collection for Law Faculty.</span>
              </li>
              <li className="bg-slate-50 p-3 rounded-lg text-sm">
                <strong className="block text-slate-800">Research Commons (West Wing)</strong>
                <span className="text-slate-600">Restricted to Graduate Students/Faculty. High-end facilities.</span>
              </li>
              <li className="bg-slate-50 p-3 rounded-lg text-sm">
                <strong className="block text-slate-800">Knowledge Commons (West Wing)</strong>
                <span className="text-slate-600">Open to Undergrads. Group study areas, discussion rooms (booking req).</span>
              </li>
            </ul>
          </div>

          {/* Basement */}
          <div className="relative pl-6 border-l-2 border-gray-100">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300"></span>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Basement</h4>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <strong className="block text-gray-800">Graduate Study Area</strong>
              <span className="text-gray-600">Quiet cubicles strictly for Graduate Students.</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Digital Services",
      summary: "Access journals, past questions, and chat support via library.ucc.edu.gh / crl.ucc.edu.gh",
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h4 className="font-bold text-purple-900 mb-2">Accessing E-Resources (Off-Campus)</h4>
            <p className="text-sm text-purple-800 mb-4">
              Databases like JSTOR and Emerald work automatically on campus WiFi.
              To access them from home, you must register for <strong>Off-Campus Remote Access</strong>.
            </p>
            <div className="text-xs bg-white/60 p-3 rounded border border-purple-200 text-purple-900">
              <strong>Registration:</strong> Fill out the form (Name, Student No, Email) on the website.
              Processing takes up to 2 working days.
            </div>
          </div>
        </div>
      ),
      resources: [
        {
          title: "Institutional Repository",
          url: "https://ir.ucc.edu.gh",
          description: "Access theses, dissertations and past questions"
        },
        {
          title: "Full Guide Video",
          url: "Https://youtu.be/FDTW3FXOPHY?si=93-j98zVkhbehiMb",
          description: "Official guide video on youtube"
        }
      ], 
      steps: [
        {
          title: "Using UCC Cat",
          description: "Select UCC Cat > Type keywords > Note the Location & Call Number."
        },
        {
          title: "Downloading Past Questions",
          description: "Go to E-Resources > Past Questions > Login with Student ID."
        },
        {
          title: "Chat with Librarian",
          description: "Click Chat icon on website > Enter details > Start chat (or leave email if offline)."
        }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'warnings', label: 'Rules & Penalties' },
    { id: 'resources', label: 'Quick Links' },
  ];

  return { sections, tabs };
};

export default LibraryServices;