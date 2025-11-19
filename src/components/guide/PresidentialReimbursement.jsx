
const PresidentialReimbursement = () => {
  // UCC GUIDE: PRESIDENTIAL REIMBURSEMENT
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Presidential Reimbursement for First Years",
      summary: "A comprehensive guide to applying for the Presidential Reimbursement program.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              The Presidential Reimbursement is a flagship government initiative designed to ease the financial burden on first-year university students and their families. 
              Established under the Special Development Initiatives, this program reimburses admission and first-semester fees for eligible students.
              <strong> This one-time financial assistance can significantly reduce the initial cost of university education.</strong>
            </p>
          </div>
          
          {/* --- PROGRAM OVERVIEW GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Program Details Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Program</span>
                About the Initiative
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Understanding the Presidential Reimbursement program.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Government Initiative</strong> <span className="text-xs ml-auto text-gray-500">Since 2017</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>GH₵ 1,000-2,000</strong> <span className="text-xs ml-auto text-gray-500">Typical Amount</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Public Universities</strong> <span className="text-xs ml-auto text-gray-500">Nationwide</span>
                </li>
              </ul>
            </div>

            {/* Reimbursement Timeline Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Timeline</span>
                When to Expect
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Understanding the reimbursement schedule.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Application Period</strong> <span className="text-xs ml-auto text-gray-500">2nd Semester</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Processing Time</strong> <span className="text-xs ml-auto text-gray-500">4-8 Weeks</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Payment Release</strong> <span className="text-xs ml-auto text-gray-500">Academic Year</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- ELIGIBILITY CRITERIA AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Eligibility Requirements
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Requirement 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Citizenship</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Nationality</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Must be a <strong>Ghanaian citizen</strong> with a valid Ghana Card or birth certificate.
                </p>
              </div>

              {/* Requirement 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Academic Status</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Student Type</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Must be a <strong>first-year student</strong> in a public university, admitted through the regular admission process.
                </p>
              </div>

              {/* Requirement 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Fee Payment</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Financial</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Must have <strong>paid admission fees</strong> and at least 50% of first-semester fees in full.
                </p>
              </div>

              {/* Requirement 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Bank Account</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Payment Method</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Must have an <strong>active bank account</strong> in your name for direct deposit of reimbursement funds.
                </p>
              </div>

              {/* Requirement 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Documentation</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Paperwork</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Must provide <strong>original fee receipts</strong>, admission letter, and completed application form.
                </p>
              </div>

            </div>
          </div>

          {/* --- REIMBURSEMENT AMOUNT BREAKDOWN --- */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 text-lg mb-4">Reimbursement Amount Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/70 p-4 rounded-lg border border-indigo-100">
                <h5 className="font-bold text-indigo-800 mb-2">Science Programs</h5>
                <p className="text-2xl font-bold text-indigo-600 mb-1">GH₵ 2,000</p>
                <p className="text-xs text-indigo-600/80">Medicine, Engineering, Sciences</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg border border-indigo-100">
                <h5 className="font-bold text-indigo-800 mb-2">Professional Programs</h5>
                <p className="text-2xl font-bold text-indigo-600 mb-1">GH₵ 1,500</p>
                <p className="text-xs text-indigo-600/80">Business, Law, Education</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg border border-indigo-100">
                <h5 className="font-bold text-indigo-800 mb-2">Arts & Humanities</h5>
                <p className="text-2xl font-bold text-indigo-600 mb-1">GH₵ 1,000</p>
                <p className="text-xs text-indigo-600/80">Arts, Social Sciences</p>
              </div>
            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Available to first-year students in public universities only",
        "Reimburses admission fees and up to 50% of first-semester fees",
        "Amount varies by program of study (GH₵ 1,000-2,000)",
        "Application typically opens in second semester (February-March)",
        "Direct deposit to student's personal bank account",
        "One-time benefit per student"
      ],
      steps: [
        {
          title: "Pay Admission and First-Semester Fees",
          description: "Ensure all required fees are paid in full through official university channels. Keep original receipts safely as they are essential for your application."
        },
        {
          title: "Open or Verify Bank Account",
          description: "Ensure you have an active bank account in your name. Verify that the account details are correct to avoid payment delays."
        },
        {
          title: "Wait for Official Announcement",
          description: "Look for reimbursement application announcements through official university channels, typically in second semester (February-March)."
        },
        {
          title: "Download Application Form",
          description: "Obtain the reimbursement application form from the university website or Student Affairs Office. Do not use unofficial forms."
        },
        {
          title: "Gather Required Documents",
          description: "Prepare original fee receipts, admission letter, Ghana Card/birth certificate, bank account details, and passport photos."
        },
        {
          title: "Complete Application Form",
          description: "Fill out the form accurately with all required information. Double-check for errors before submission."
        },
        {
          title: "Submit Application",
          description: "Submit the completed form with all required documents to the designated office before the deadline. Obtain a submission receipt."
        },
        {
          title: "Track Application Status",
          description: "Regularly check the status of your application through the provided channels. Processing typically takes 4-8 weeks."
        }
      ],
      tips: [
        "Make photocopies of all original documents before submission",
        "Submit your application as early as possible, not on the last day",
        "Ensure your bank account is active and can receive the reimbursement amount",
        "Keep your contact information updated for any communication about your application",
        "Join official university WhatsApp groups for timely updates",
        "Write your full name exactly as it appears on your admission documents"
      ],
      resources: [
        {
          title: "Reimbursement Guidelines",
          description: "Complete eligibility and application requirements",
          url: "https://ucc.edu.gh/presidential-reimbursement"
        },
        {
          title: "Application Form",
          description: "Download reimbursement application form",
          url: "https://ucc.edu.gh/reimbursement-form"
        },
        {
          title: "Finance Office Contact",
          description: "Contact information for reimbursement inquiries",
          url: "https://ucc.edu.gh/finance-contacts"
        },
        {
          title: "Student Affairs Office",
          description: "Support center for first-year students",
          url: "https://ucc.edu.gh/student-affairs"
        }
      ],
      commonMistakes: [
        "Submitting applications with incorrect or incomplete information",
        "Using photocopies of fee receipts instead of originals",
        "Providing inactive or incorrect bank account details",
        "Missing the application deadline",
        "Not following up on application status",
        "Losing original fee receipts before application period"
      ],
      consequences: "Incomplete or incorrect applications will be rejected. Lost or missing original fee receipts cannot be replaced, making you ineligible for the reimbursement.",
      checklist: [
        { text: "Pay all required fees in full", checked: false },
        { text: "Keep original fee receipts safe", checked: false },
        { text: "Open or verify bank account", checked: false },
        { text: "Prepare Ghana Card or birth certificate", checked: false },
        { text: "Download official application form", checked: false },
        { text: "Complete form accurately", checked: false },
        { text: "Make photocopies of all documents", checked: false },
        { text: "Submit application before deadline", checked: false },
        { text: "Obtain submission receipt", checked: false },
        { text: "Save inquiry contact numbers", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Application Process' },
    { id: 'resources', label: 'Helpful Links' },
    { id: 'warnings', label: 'Common Pitfalls' },
    { id: 'checklist', label: 'Application Checklist' }
  ];

  return { sections, tabs };
};

export default PresidentialReimbursement;