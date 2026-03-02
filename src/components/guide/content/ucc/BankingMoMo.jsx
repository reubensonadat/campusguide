import React from 'react';

const BankingMoMo = () => {
  // UCC GUIDE: BANKING & MOBILE MONEY
  // Verified Data: 2025 Campus Locations (Science Market vs Old Site)
  // Focus: Fee Payment Platforms (Transflow/Smartpay) vs General Banking.

  const sections = [
    {
      title: "Banking & Finance",
      summary: "Campus Bank Locations, ATMs, and how to pay fees without issues.",
      
      // --- OVERVIEW CONTENT (Pastel Card Design) ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO CARD --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              UCC has a robust financial ecosystem. Most major banks are located at the <strong>New Site (Science)</strong>, specifically around the Taxi Rank and Market area. 
              <strong> GCB Bank</strong> is the primary bank serving the Old Site.
            </p>
          </div>

          {/* --- LOCATION BREAKDOWN --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Old Site Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Old Site</span>
                Southern Campus
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Focus: Administration & Arts</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>GCB Bank</strong> (Main Branch near Admin)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Ghana Post</strong> (For items & remittances)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>ATM:</strong> GCB (24/7 Access)
                </li>
              </ul>
            </div>

            {/* New Site Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">New Site</span>
                Science Market Area
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">The Financial Hub (Taxi Rank)</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Prudential Bank</strong> (Near Taxi Rank)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Zenith Bank</strong> (Science Market)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Fidelity Bank</strong> (Behind Science Faculty)
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>ADB</strong> (Agricultural Development Bank)
                </li>
              </ul>
            </div>
          </div>

          {/* --- FEE PAYMENT PLATFORMS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Paying School Fees
            </h3>
            
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
              <p className="text-amber-900 mb-4 font-medium">
                Do not just "transfer" money. You must use the correct platform so the portal updates automatically.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border border-amber-200 text-center">
                  <div className="text-xs text-gray-500 uppercase mb-1">Prudential & ADB</div>
                  <div className="font-bold text-gray-800">Transflow</div>
                </div>
                <div className="bg-white p-4 rounded border border-amber-200 text-center">
                  <div className="text-xs text-gray-500 uppercase mb-1">GCB Bank</div>
                  <div className="font-bold text-gray-800">Smartpay</div>
                </div>
                <div className="bg-white p-4 rounded border border-amber-200 text-center">
                  <div className="text-xs text-gray-500 uppercase mb-1">Zenith Bank</div>
                  <div className="font-bold text-gray-800">Xpath</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),


      // --- WARNINGS TAB (Financial Safety) ---
      // Triggered by 'commonMistakes' ID logic from the main app
      commonMistakes: [
        "Paying school fees via standard Mobile Money transfer (It won't reflect on the portal).",
        "Giving your ATM pin to roommates to withdraw cash for you.",
        "Ignoring SMS alerts for withdrawals you didn't make.",
        "Paying fees without quoting your Registration Number / Student ID."
      ],
      consequences: "If you pay fees using the wrong method (e.g., direct deposit instead of Transflow), you will have to manually chase the Finance Office to update your portal, which can delay your registration by weeks."
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'warnings', label: 'Safety' },
  ];

  return { sections, tabs };
};

export default BankingMoMo;