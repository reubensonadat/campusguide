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
          <div className="bg-[var(--gray-100-soft)] p-5 rounded-xl border border-[var(--gray-200)] transition-colors duration-300 shadow-sm">
            <p className="text-[var(--gray-700)] leading-relaxed transition-colors duration-300">
              UCC has a robust financial ecosystem. Most major banks are located at the <strong className="text-[var(--gray-900)]">New Site (Science)</strong>, specifically around the Taxi Rank and Market area.
              <strong className="text-[var(--gray-900)]"> GCB Bank</strong> is the primary bank serving the Old Site.
            </p>
          </div>

          {/* --- LOCATION BREAKDOWN --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Old Site Card */}
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 dark:text-blue-400 text-lg mb-3 flex items-center transition-colors duration-300">
                <span className="bg-blue-200 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2 transition-colors duration-300">Old Site</span>
                Southern Campus
              </h4>
              <p className="text-sm text-blue-800/70 dark:text-blue-300/70 mb-4 transition-colors duration-300">Focus: Administration & Arts</p>
              <ul className="space-y-3 text-sm text-[var(--gray-700)] transition-colors duration-300">
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">GCB Bank</strong> (Main Branch near Admin)
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Ghana Post</strong> (For items & remittances)
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">ATM:</strong> GCB (24/7 Access)
                </li>
              </ul>
            </div>

            {/* New Site Card */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/20 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-lg mb-3 flex items-center transition-colors duration-300">
                <span className="bg-emerald-200 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2 transition-colors duration-300">New Site</span>
                Science Market Area
              </h4>
              <p className="text-sm text-emerald-800/70 dark:text-emerald-300/70 mb-4 transition-colors duration-300">The Financial Hub (Taxi Rank)</p>
              <ul className="space-y-3 text-sm text-[var(--gray-700)] transition-colors duration-300">
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Prudential Bank</strong> (Near Taxi Rank)
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Zenith Bank</strong> (Science Market)
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Fidelity Bank</strong> (Behind Science Faculty)
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">ADB</strong> (Agricultural Development Bank)
                </li>
              </ul>
            </div>
          </div>

          {/* --- FEE PAYMENT PLATFORMS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-[var(--gray-800)] text-xl mb-6 flex items-center transition-colors duration-300">
              <span className="bg-[var(--gray-200)] text-[var(--gray-700)] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 transition-colors duration-300">i</span>
              Paying School Fees
            </h3>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl p-6 transition-colors duration-300">
              <p className="text-amber-900 dark:text-amber-400 mb-4 font-medium transition-colors duration-300">
                Do not just "transfer" money. You must use the correct platform so the portal updates automatically.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[var(--white)] p-4 rounded border border-amber-200 dark:border-amber-900/30 text-center transition-colors duration-300 shadow-sm">
                  <div className="text-xs text-[var(--gray-500)] uppercase mb-1 transition-colors duration-300">Prudential & ADB</div>
                  <div className="font-bold text-[var(--gray-800)] transition-colors duration-300">Transflow</div>
                </div>
                <div className="bg-[var(--white)] p-4 rounded border border-amber-200 dark:border-amber-900/30 text-center transition-colors duration-300 shadow-sm">
                  <div className="text-xs text-[var(--gray-500)] uppercase mb-1 transition-colors duration-300">GCB Bank</div>
                  <div className="font-bold text-[var(--gray-800)] transition-colors duration-300">Smartpay</div>
                </div>
                <div className="bg-[var(--white)] p-4 rounded border border-amber-200 dark:border-amber-900/30 text-center transition-colors duration-300 shadow-sm">
                  <div className="text-xs text-[var(--gray-500)] uppercase mb-1 transition-colors duration-300">Zenith Bank</div>
                  <div className="font-bold text-[var(--gray-800)] transition-colors duration-300">Xpath</div>
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