import React from 'react';

const FAQsTroubleshooting = () => {
  // UCC GUIDE: FAQS & TROUBLESHOOTING
  // Verified Data: Solutions for Portal Login, Financial Holds, and Missing Grades.
  // Design: Problem-Solution Card Layout for easy scanning.

  const sections = [
    {
      title: "Portal & Academic Issues",
      summary: "Quick fixes for when the UCC Portal or your Grades go wrong.",
      
      // --- OVERVIEW CONTENT ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Technical glitches happen. Before you panic or walk all the way to the MIS office, try these verified fixes for common portal and academic issues.
            </p>
          </div>

          {/* --- PROBLEM / SOLUTION GRID --- */}
          <div className="grid gap-6">
            
            {/* Issue 1: Portal Login */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-red-50 px-5 py-3 border-b border-red-100 flex justify-between items-center">
                <h4 className="font-bold text-red-900">Problem: "Invalid Credentials"</h4>
                <span className="text-xs font-bold bg-red-200 text-red-800 px-2 py-1 rounded">Portal</span>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-3 text-sm">
                  You are typing the correct password, but the portal refuses to let you in.
                </p>
                <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-sm">
                  <strong>Solution:</strong> The UCC portal caches old passwords aggressively. 
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600">
                    <li>Switch to <strong>Incognito Mode</strong> (Chrome) or Private Window.</li>
                    <li>Clear your browser cache/history.</li>
                    <li>If that fails, use the "Forgot Password" link to reset it via your institutional email.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Issue 2: Financial Hold */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-amber-50 px-5 py-3 border-b border-amber-100 flex justify-between items-center">
                <h4 className="font-bold text-amber-900">Problem: "Financial Hold"</h4>
                <span className="text-xs font-bold bg-amber-200 text-amber-800 px-2 py-1 rounded">Registration</span>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-3 text-sm">
                  You have paid fees, but the portal still says you cannot register courses.
                </p>
                <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-sm">
                  <strong>Solution:</strong> Bank transfers are not instant.
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600">
                    <li>Wait <strong>24 hours</strong> after payment for the system to update.</li>
                    <li>Ensure you paid via <strong>Transflow</strong> (not direct deposit).</li>
                    <li>If 48 hours pass, take your receipt to the <strong>Cash Office</strong> (Old Admin) or Finance Directorate.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Issue 3: Missing Results */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-blue-50 px-5 py-3 border-b border-blue-100 flex justify-between items-center">
                <h4 className="font-bold text-blue-900">Problem: Missing Grade / "IC"</h4>
                <span className="text-xs font-bold bg-blue-200 text-blue-800 px-2 py-1 rounded">Results</span>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-3 text-sm">
                  Your results are released, but one course is blank or marked "IC" (Incomplete).
                </p>
                <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-sm">
                  <strong>Solution:</strong> Act immediately (within 2 weeks).
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600">
                    <li>Check the Department Notice Board for "IC Lists".</li>
                    <li>Contact the <strong>Lecturer</strong> </li>
                    <li>Do not wait; If you have an IC in your portal, <strong>you cannot graduate</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      ),
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'resources', label: 'Help Desk' },
  ];

  return { sections, tabs };
};

export default FAQsTroubleshooting;