
const PrintingStationery = () => {
  // UCC GUIDE: PRINTING & STATIONERY
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Printing & Stationery Services",
      summary: "Where to print and buy stationery on campus.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Access to reliable printing and stationery services is crucial for your day-to-day academic life at UCC. 
              From lecture notes to final year projects, knowing where to get quality services at good prices is essential.
              <strong> Always save your work in multiple formats and carry a backup USB drive.</strong>
            </p>
          </div>
          
          {/* --- SERVICES & VENDORS GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Printing Services Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Printing</span>
                Print & Copy Centers
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Multiple locations on and off-campus for your printing needs.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Library Pay & Print</strong> <span className="text-xs ml-auto text-gray-500">Old Site</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Computer Labs</strong> <span className="text-xs ml-auto text-gray-500">All Faculties</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Private Print Shops</strong> <span className="text-xs ml-auto text-gray-500">Diaspora</span>
                </li>
              </ul>
            </div>

            {/* Stationery Shops Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Stationery</span>
                Shops & Stores
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Get all your academic supplies from these vendors.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Main Bookshop</strong> <span className="text-xs ml-auto text-gray-500">Old Site</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Campus Vendors</strong> <span className="text-xs ml-auto text-gray-500">Various</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Departmental Stores</strong> <span className="text-xs ml-auto text-gray-500">Specialized</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- SMART PRINTING GUIDE AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Smart Printing Guide
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Prepare Files</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Before You Go</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Save your work in <strong>multiple formats</strong> (PDF, DOCX). Always carry a <strong>USB drive</strong> for easy transfer.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Compare Prices</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Save Money</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Prices vary for <strong>color printing, binding</strong>, and bulk orders. Ask for quotes before printing large documents.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Check Preview</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Avoid Errors</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Always check the <strong>print preview</strong>. Count pages and verify formatting before giving the final command.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Payment</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Mobile Money</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong>Mobile Money</strong> is widely accepted. Keep your receipt for large orders or project binding.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Backup Copies</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Be Prepared</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Print <strong>extra copies</strong> of important documents like assignments and exam timetables.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Printing available at library, computer labs, and private shops.",
        "Multiple stationery shops on campus for all academic supplies.",
        "Mobile Money is the primary payment method for most vendors.",
        "Color printing and binding services are available at selected locations.",
        "Prices are generally lower in the Diaspora than on campus."
      ],
      steps: [
        {
          title: "Prepare Your Documents",
          description: "Save your work in multiple formats (PDF is preferred). Organize files into folders on a USB drive or cloud storage."
        },
        {
          title: "Find a Suitable Location",
          description: "Choose between on-campus convenience (Library, Labs) or off-campus options (Diaspora) based on your needs and urgency."
        },
        {
          title: "Inquire About Prices",
          description: "Ask for the cost, especially for color printing, binding, or bulk orders. Prices can vary significantly between vendors."
        },
        {
          title: "Print and Verify",
          description: "Use the print preview function. Count your pages before leaving the shop to ensure nothing is missing."
        },
        {
          title: "Pay and Keep Receipt",
          description: "Pay using Mobile Money or cash. For large orders like project printing, always keep the receipt."
        }
      ],
      tips: [
        "Compare prices before printing large documents",
        "Save files in multiple formats (PDF, DOCX)",
        "Check print preview carefully before printing",
        "Buy stationery in bulk to save money",
        "Keep backup copies of important documents",
        "Build a good relationship with a regular printer for better service"
      ],
      resources: [
        {
          title: "Printing Locations Map",
          description: "Find all printing services on campus",
          url: "https://ucc.edu.gh/printing-map"
        },
        {
          title: "Stationery Shops Directory",
          description: "List of all stationery vendors on campus",
          url: "https://ucc.edu.gh/stationery-shops"
        },
        {
          title: "Printing Price Guide",
          description: "Current prices for printing services",
          url: "https://ucc.edu.gh/printing-prices"
        }
      ],
      checklist: [
        { text: "Organize files on USB drive", checked: false },
        { text: "Identify nearest printing shop", checked: false },
        { text: "Compare printing prices", checked: false },
        { text: "Save printing service contacts", checked: false },
        { text: "Know vendor operating hours", checked: false },
        { text: "Set budget for printing", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Printing Process' },
    { id: 'resources', label: 'Services & Vendors' },
  ];

  return { sections, tabs };
};

export default PrintingStationery;