
const StudentLoanTrustFund = () => {
  // UCC GUIDE: STUDENT LOAN TRUST FUND
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Student Loan Trust Fund (SLTF)",
      summary: "How to apply for and manage student loans.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-[var(--gray-100-soft)] p-5 rounded-xl border border-[var(--gray-200)] transition-colors duration-300 shadow-sm">
            <p className="text-[var(--gray-700)] leading-relaxed transition-colors duration-300">
              The Student Loan Trust Fund (SLTF) is a government initiative providing financial assistance to Ghanaian students pursuing higher education.
              This program helps bridge the financial gap for students who need support for tuition and living expenses.
              <strong className="text-[var(--gray-900)] dark:text-[var(--gray-800)]"> Understanding the application process and repayment terms is crucial before committing to this financial obligation.</strong>
            </p>
          </div>

          {/* --- LOAN FEATURES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Loan Features Card */}
            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 dark:text-blue-400 text-lg mb-3 flex items-center transition-colors duration-300">
                <span className="bg-blue-200 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2 transition-colors duration-300">Features</span>
                Loan Benefits
              </h4>
              <p className="text-sm text-blue-800/70 dark:text-blue-300/70 mb-4 transition-colors duration-300">Key advantages of the SLTF program.</p>
              <ul className="space-y-3 text-sm text-[var(--gray-700)] transition-colors duration-300">
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Subsidized Interest</strong> <span className="text-xs ml-auto text-[var(--gray-500)] transition-colors duration-300">Low Rate</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Deferred Repayment</strong> <span className="text-xs ml-auto text-[var(--gray-500)] transition-colors duration-300">Post Study</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Comprehensive Coverage</strong> <span className="text-xs ml-auto text-[var(--gray-500)] transition-colors duration-300">Tuition & Living</span>
                </li>
              </ul>
            </div>

            {/* Eligibility Card */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/20 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-lg mb-3 flex items-center transition-colors duration-300">
                <span className="bg-emerald-200 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2 transition-colors duration-300">Eligibility</span>
                Who Qualifies
              </h4>
              <p className="text-sm text-emerald-800/70 dark:text-emerald-300/70 mb-4 transition-colors duration-300">Requirements for SLTF application.</p>
              <ul className="space-y-3 text-sm text-[var(--gray-700)] transition-colors duration-300">
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Ghanaian Citizen</strong> <span className="text-xs ml-auto text-[var(--gray-500)] transition-colors duration-300">Required</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Admitted Student</strong> <span className="text-xs ml-auto text-[var(--gray-500)] transition-colors duration-300">Accredited</span>
                </li>
                <li className="flex items-center bg-[var(--white)] p-2 rounded transition-colors duration-300 shadow-sm border border-[var(--gray-200)]">
                  <span className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-3 transition-colors duration-300"></span>
                  <strong className="text-[var(--gray-800)] mr-1">Financial Need</strong> <span className="text-xs ml-auto text-[var(--gray-500)] transition-colors duration-300">Assessed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- LOAN APPLICATION PROCESS AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-[var(--gray-800)] text-xl mb-6 flex items-center transition-colors duration-300">
              <span className="bg-[var(--gray-200)] text-[var(--gray-700)] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 transition-colors duration-300">i</span>
              Application Process
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 dark:bg-sky-900/10 p-5 rounded-xl border border-sky-100 dark:border-sky-900/20 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 dark:text-sky-300 text-lg transition-colors duration-300">Check Eligibility</h5>
                  <span className="text-3xl font-bold text-sky-200/80 dark:text-sky-800/40 -mt-1 transition-colors duration-300">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 dark:text-sky-400 font-semibold mb-2 transition-colors duration-300">Prerequisite</p>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed transition-colors duration-300">
                  Verify you meet all <strong className="text-[var(--gray-800)]">eligibility requirements</strong> including citizenship, admission status, and financial need.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/20 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 dark:text-indigo-300 text-lg transition-colors duration-300">Gather Documents</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 dark:text-indigo-800/40 -mt-1 transition-colors duration-300">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-semibold mb-2 transition-colors duration-300">Preparation</p>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed transition-colors duration-300">
                  Prepare all necessary documents including <strong className="text-[var(--gray-800)]">admission letter, ID card</strong>, and proof of financial need.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 dark:bg-violet-900/10 p-5 rounded-xl border border-violet-100 dark:border-violet-900/20 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 dark:text-violet-300 text-lg transition-colors duration-300">Find Guarantors</h5>
                  <span className="text-3xl font-bold text-violet-200/80 dark:text-violet-800/40 -mt-1 transition-colors duration-300">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 dark:text-violet-400 font-semibold mb-2 transition-colors duration-300">Support</p>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed transition-colors duration-300">
                  Identify reliable <strong className="text-[var(--gray-800)]">guarantors</strong> who meet the SLTF requirements and are willing to support your application.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-900/20 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 dark:text-amber-300 text-lg transition-colors duration-300">Complete Application</h5>
                  <span className="text-3xl font-bold text-amber-200/80 dark:text-amber-800/40 -mt-1 transition-colors duration-300">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold mb-2 transition-colors duration-300">Submission</p>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed transition-colors duration-300">
                  Fill out the <strong className="text-[var(--gray-800)]">SLTF application form</strong> online with accurate information and upload required documents.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 dark:bg-teal-900/10 p-5 rounded-xl border border-teal-100 dark:border-teal-900/20 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 dark:text-teal-300 text-lg transition-colors duration-300">Wait & Sign</h5>
                  <span className="text-3xl font-bold text-teal-200/80 dark:text-teal-800/40 -mt-1 transition-colors duration-300">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400 font-semibold mb-2 transition-colors duration-300">Finalization</p>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed transition-colors duration-300">
                  Wait for approval and then <strong className="text-[var(--gray-800)]">sign the loan agreement</strong> with full understanding of terms and conditions.
                </p>
              </div>

            </div>
          </div>

          {/* --- REPAYMENT INFORMATION --- */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 transition-colors duration-300">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-lg mb-4 transition-colors duration-300">Repayment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[var(--white)] p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30 shadow-sm transition-colors duration-300">
                <h5 className="font-bold text-[var(--gray-800)] mb-2 transition-colors duration-300">Grace Period</h5>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1 transition-colors duration-300">12 Months</p>
                <p className="text-xs text-[var(--gray-600)] transition-colors duration-300">After completion/NYSC</p>
              </div>
              <div className="bg-[var(--white)] p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30 shadow-sm transition-colors duration-300">
                <h5 className="font-bold text-[var(--gray-800)] mb-2 transition-colors duration-300">Interest Rate</h5>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1 transition-colors duration-300">12% Annually</p>
                <p className="text-xs text-[var(--gray-600)] transition-colors duration-300">Subsidized by government</p>
              </div>
            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Available to Ghanaian students in accredited institutions only",
        "Based on assessed financial need and academic performance",
        "Repayment starts 12 months after completion/NYSC",
        "Interest rates are subsidized (12% annually)",
        "Can cover tuition, accommodation, and living expenses",
        "Maximum loan amount varies by program and level"
      ],
      steps: [
        {
          title: "Check Eligibility Requirements",
          description: "Verify you meet all criteria including Ghanaian citizenship, admission to accredited institution, and demonstrated financial need."
        },
        {
          title: "Gather Required Documents",
          description: "Prepare admission letter, student ID, birth certificate, proof of financial need, and guarantor information."
        },
        {
          title: "Find Suitable Guarantors",
          description: "Identify reliable guarantors who meet SLTF requirements (must be employed, have regular income, and good credit)."
        },
        {
          title: "Complete Online Application",
          description: "Fill out the SLTF application form on the official portal with accurate information and upload required documents."
        },
        {
          title: "Submit Guarantor Forms",
          description: "Ensure your guarantors complete their forms and submit them with your application."
        },
        {
          title: "Wait for Approval",
          description: "Allow 4-6 weeks for application processing. Check status regularly on the portal."
        },
        {
          title: "Sign Loan Agreement",
          description: "If approved, review and sign the loan agreement with full understanding of terms and conditions."
        }
      ],
      tips: [
        "Apply early as funds are limited and allocated on first-come, first-served basis",
        "Choose guarantors with stable employment and good financial standing",
        "Understand all repayment terms and conditions before signing",
        "Keep all loan documents in a safe place for future reference",
        "Start planning for repayment even before graduation",
        "Maintain good academic standing to remain eligible for future loans"
      ],
      resources: [
        {
          title: "SLTF Official Portal",
          description: "Apply for student loan and check application status",
          url: "https://www.sltf.gov.gh"
        },
        {
          title: "FAQs and Support",
          description: "Common questions and contact information",
          url: "https://www.sltf.gov.gh/contact-us/"
        }
      ],
      commonMistakes: [
        "Providing incomplete or inaccurate information on the application",
        "Choosing guarantors who don't meet the required criteria",
        "Not understanding the repayment terms before signing",
        "Applying late when funds have been depleted",
        "Failing to keep copies of all submitted documents"
      ],
      consequences: "Defaulting on loan repayment will affect your credit score and ability to access future financial services. Legal action may be taken against defaulters.",
      checklist: [
        { text: "Verify eligibility requirements", checked: false },
        { text: "Gather all required documents", checked: false },
        { text: "Find suitable guarantors", checked: false },
        { text: "Complete online application", checked: false },
        { text: "Submit guarantor forms", checked: false },
        { text: "Understand repayment terms", checked: false },
        { text: "Keep copies of all documents", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Application Process' },
    { id: 'resources', label: 'Loan Resources' },
    { id: 'warnings', label: 'Common Pitfalls' },
  ];

  return { sections, tabs };
};

export default StudentLoanTrustFund;