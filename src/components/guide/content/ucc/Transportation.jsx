import React from 'react';

const Transportation = () => {
  // UCC GUIDE: SHUTTLE SERVICES & TRANSPORTATION
  // Detailed guide on Shuttle Cards, Tap-In/Tap-Out system, Routes, and Map locations.

  const openGoogleMaps = (location) => {
    // Check if term is coordinates (contains a comma and numbers)
    const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(location);

    let url;
    if (isCoordinates) {
      url = `https://www.google.com/maps/search/?api=1&query=${location}`;
    } else {
      const query = location.includes("Cape Coast") ? location : `${location} University of Cape Coast`;
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }

    window.open(url, '_blank');
  };

  const sections = [
    {
      title: "Shuttle Services & Transport",
      summary: "Mastering the Shuttle Card system, Routes, and Campus Movement.",

      content: (
        <div className="space-y-8">

          {/* --- SHUTTLE CARD SYSTEM --- */}
          <div className="bg-indigo-50 dark:bg-indigo-900/40 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/50 shadow-sm">
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 mb-4 flex items-center">
              The Shuttle Card System
              <span className="ml-3 text-xs font-bold bg-indigo-200 dark:bg-indigo-800/50 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded uppercase">Cashless</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">1. Mandatory Card</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  The shuttle service has ceased ticket sales. You <strong>cannot use cash</strong>. You must purchase a Shuttle Card.
                </p>
                <div className="flex items-center text-sm font-medium text-indigo-700">
                  <span className="bg-indigo-100 dark:bg-indigo-900/40 p-1 rounded mr-2">Price</span>
                  GHS 20.00 (One-time purchase)
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">2. The "Tap-In / Tap-Out" Rule</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  The deduction system is unique. You must be mindful to avoid overpaying.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between border-b border-gray-100 pb-1">
                    <span>Standard Fare:</span>
                    <strong>GHS 2.00</strong>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-1">
                    <span>Tap In (Entry):</span>
                    <span className="text-red-500 font-bold">- GHS 4.00 deducted</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tap Out (Exit):</span>
                    <span className="text-green-600 font-bold">+ GHS 2.00 refunded</span>
                  </li>
                </ul>
                <p className="mt-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/40 p-2 rounded">
                  <strong>Warning:</strong> If you forget to tap out when exiting, you lose the extra 2 cedis!
                </p>
              </div>
            </div>
          </div>

          {/* --- ROUTES & DESTINATIONS --- */}
          <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-xl border border-slate-100 dark:border-gray-700">
            <h3 className="font-bold text-slate-800 text-xl mb-4">Shuttle Routes & Destinations</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              All shuttles converge at the <strong>Science Shuttle Station</strong> (opposite Sam Jonah Library).
              Look for the <strong>LED Screen</strong> on top of the bus to know its destination.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {/* Old Site */}
              <div className="bg-blue-50 dark:bg-blue-900/40 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-all">
                <div className="bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-300 text-xs font-bold inline-block px-2 py-0.5 rounded mb-2">OLD SITE</div>
                <h4 className="font-bold text-blue-900 dark:text-blue-400 text-lg mb-1">"OLD SITE"</h4>
                <p className="text-xs text-blue-800 dark:text-blue-300/70 mb-3">Bus Display Text</p>
                <hr className="border-blue-200 mb-3" />
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Stops At:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Oguaa Hall (Front)</li>
                  <li>• Adehye Hall</li>
                  <li>• Atlantic Hall</li>
                  <li>• UCC Hospital (Drop-off)</li>
                </ul>
              </div>

              {/* New Site */}
              <div className="bg-emerald-50 dark:bg-emerald-900/40 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-all">
                <div className="bg-emerald-200 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold inline-block px-2 py-0.5 rounded mb-2">NEW SITE</div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-lg mb-1">"VALCO HALL"</h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300/70 mb-3">Bus Display Text</p>
                <hr className="border-emerald-200 mb-3" />
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Stops At:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Valco Hall (Main Stop)</li>
                  <li>• Casely Hayford Hall</li>
                  <li>• Kwame Nkrumah Hall</li>
                </ul>
              </div>

              {/* SRC / Super */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 hover:shadow-md transition-all">
                <div className="bg-orange-200 text-orange-800 text-xs font-bold inline-block px-2 py-0.5 rounded mb-2">DIASPORA</div>
                <h4 className="font-bold text-orange-900 text-lg mb-1">"SRC HALL"</h4>
                <p className="text-xs text-orange-800/70 mb-3">Bus Display Text</p>
                <hr className="border-orange-200 mb-3" />
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">Service For:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• SRC Hall Residents</li>
                  <li>• Superannuation Hall</li>
                  <li>• <em>(Note: Superannuation residents must walk from SRC stop)</em></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start">
            <span className="text-2xl mr-3">💡</span>
            <div>
              <h5 className="font-bold text-yellow-900 text-sm">Pro Tip for New Site & SRC</h5>
              <p className="text-sm text-yellow-800 mt-1">
                The bus may drop you a short walk from your exact hall block.
                For <strong>UCC Hospital</strong> visits, take the <strong>(Old Site)</strong> bus—it will stop there for you to alight before proceeding to the halls.
              </p>
            </div>
          </div>

        </div>
      ),
      keyPoints: [
        "Shuttle Cards cost GHS 20.00 and are mandatory (No Cash).",
        "Fare is GHS 2.00, but GHS 4.00 is deducted on entry.",
        "You MUST tap out at the exit to get your GHS 2.00 refund.",
        "Old Site buses display 'Old site'.",
        "New Site buses display 'VALCO HALL' or 'VALCO'."
      ]
    },
    // Map Section reused as "Directions" tab
    {
      title: "Shuttle Stations",
      summary: "Tap a location to view it on Google Maps."
    }
  ];

  // Specific buildings data for the Map/Directions tab
  const buildings = [
    { id: "S1", fullName: "Science Shuttle Station", shortForm: "Main Hub", description: "Central pickup point for all buses.", url: "5.116807377906874, -1.2921375063551965" },
    { id: "S2", fullName: "Oguaa Hall Stop", shortForm: "Old Site Drop", description: "主要 drop-off point for Old Site.", url: "Oguaa Hall" },
    { id: "S3", fullName: "Valco Hall Stop", shortForm: "New Site Drop", description: "Main drop-off for New Site.", url: "Valco Hall UCC" },
    { id: "S4", fullName: "SRC Hall Stop", shortForm: "SRC/Super Drop", description: "Drop-off for SRC & Superannuation.", url: "SRC Hall UCC" },
    { id: "S5", fullName: "UCC Hospital Stop", shortForm: "Clinic Drop", description: "Take the Old Site bus to stop here.", url: "University of Cape Coast Hospital" },
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'resources', label: 'Map & Stops' },
  ];

  return { sections, tabs, buildings, openGoogleMaps };
};

export default Transportation;