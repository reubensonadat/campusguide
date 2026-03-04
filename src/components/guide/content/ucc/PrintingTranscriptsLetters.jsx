
const PrintingTranscriptsLetters = () => {
  // UCC GUIDE: ACADEMIC DOCUMENTS
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Academic Documents Services",
      summary: "How to request transcripts and official letters.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 dark:bg-gray-800/50 p-5 rounded-xl border border-slate-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Official academic documents like transcripts and recommendation letters are essential for job applications, further studies, or scholarship opportunities.
              The Exams and Records Office handles these requests with specific procedures.
              <strong> Plan ahead as processing takes time, and some documents require departmental clearance.</strong>
            </p>
          </div>

          {/* --- DOCUMENT TYPES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Transcripts Card */}
            <div className="bg-blue-50 dark:bg-blue-900/40 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 dark:text-blue-400 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Academic</span>
                Transcripts
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300/70 mb-4">Official record of your academic performance.</p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center bg-white/60 dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Official Transcript</strong>
                </li>
                <li className="flex items-center bg-white/60 dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Unofficial Transcript</strong>
                </li>
                <li className="flex items-center bg-white/60 dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-400 rounded-full mr-3"></span>
                  <strong>Processing Time</strong> <span className="text-xs ml-auto text-gray-500">3-5 Days</span>
                </li>
              </ul>
            </div>

            {/* Letters Card */}
            <div className="bg-emerald-50 dark:bg-emerald-900/40 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Official</span>
                Letters & Certificates
              </h4>
              <p className="text-sm text-emerald-800 dark:text-emerald-300/70 mb-4">Various official documents for different purposes.</p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center bg-white/60 dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Recommendation Letter</strong>
                </li>
                <li className="flex items-center bg-white/60 dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Proof of Enrollment</strong>
                </li>
                <li className="flex items-center bg-white/60 dark:bg-gray-800/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3"></span>
                  <strong>Completion Certificate</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* --- DOCUMENT REQUEST PROCESS AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Document Request Process
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 dark:bg-sky-900/40 p-5 rounded-xl border border-sky-100 dark:border-sky-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 dark:text-sky-400 text-lg">Clear Holds</h5>
                  <span className="text-3xl font-bold text-sky-200/80 dark:text-sky-800/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 dark:text-sky-300 font-semibold mb-2">Prerequisite</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Ensure you have no <strong>financial or library holds</strong> on your account. Check your student portal first.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 dark:bg-indigo-900/40 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 dark:text-indigo-400 text-lg">Complete Form</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 dark:text-indigo-800/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-semibold mb-2">Application</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Fill out the appropriate <strong>request form</strong> for the document you need. Forms are available online or at Exams Office.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 dark:bg-violet-900/40 p-5 rounded-xl border border-violet-100 dark:border-violet-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 dark:text-violet-400 text-lg">Pay Fees</h5>
                  <span className="text-3xl font-bold text-violet-200/80 dark:text-violet-800/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 dark:text-violet-300 font-semibold mb-2">Payment</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Pay required <strong>processing fees</strong> at the finance office. Keep the receipt for submission.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 dark:bg-amber-900/40 p-5 rounded-xl border border-amber-100 dark:border-amber-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 dark:text-amber-400 text-lg">Submit Request</h5>
                  <span className="text-3xl font-bold text-amber-200/80 dark:text-amber-800/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold mb-2">Processing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Submit form and payment receipt to <strong>Exams and Records Office</strong>. Get a submission acknowledgment.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 dark:bg-teal-900/40 p-5 rounded-xl border border-teal-100 dark:border-teal-800/50 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 dark:text-teal-400 text-lg">Collect Document</h5>
                  <span className="text-3xl font-bold text-teal-200/80 dark:text-teal-800/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 dark:text-teal-300 font-semibold mb-2">Final Step</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Return after <strong>3-5 working days</strong> to collect your document. Verify all details before leaving.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Transcripts processed by Exams and Records Office",
        "Processing takes 3-5 working days (standard)",
        "Fees apply for most documents",
        "Some documents require departmental clearance",
        "Rush processing available at extra cost (24-hour service)"
      ],
      steps: [
        {
          title: "Check for Account Holds",
          description: "Ensure you have no financial or library holds on your account. These must be cleared before any document can be processed."
        },
        {
          title: "Complete Request Form",
          description: "Fill out the appropriate form for the document you need. Forms are available online or at the Exams and Records Office."
        },
        {
          title: "Pay Processing Fees",
          description: "Pay the required fees at the finance office. Keep your receipt as proof of payment."
        },
        {
          title: "Submit to Exams Office",
          description: "Submit the completed form and payment receipt to the Exams and Records Office. Get an acknowledgment slip."
        },
        {
          title: "Wait for Processing",
          description: "Allow the standard processing time of 3-5 working days. Rush processing is available at extra cost."
        },
        {
          title: "Collect and Verify",
          description: "Collect your document when notified. Verify all details are correct before leaving the office."
        }
      ],
      tips: [
        "Request documents well in advance of deadlines",
        "Make photocopies of all submitted forms",
        "Check your personal details on the document before leaving",
        "For international applications, request sealed transcripts",
        "Keep a copy of all academic documents for your records",
        "Ask about courier services if you're not on campus"
      ],
      resources: [
        {
          title: "Document Request Forms",
          description: "Download forms for various academic documents",
          url: "https://ucc.edu.gh/document-forms"
        },
        {
          title: "Fee Schedule",
          description: "Current fees for academic documents",
          url: "https://ucc.edu.gh/document-fees"
        },
        {
          title: "Online Request Portal",
          description: "Request documents online",
          url: "https://documents.ucc.edu.gh"
        }
      ],
      checklist: [
        { text: "Check for account holds", checked: false },
        { text: "Complete request form accurately", checked: false },
        { text: "Pay processing fees", checked: false },
        { text: "Submit to exams office", checked: false },
        { text: "Track processing status", checked: false },
        { text: "Collect when ready", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Request Process' },
    { id: 'resources', label: 'Document Services' },
  ];

  return { sections, tabs };
};

export default PrintingTranscriptsLetters;