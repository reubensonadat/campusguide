
const SponsorsFeaturedVendors = () => {
  // UCC GUIDE: PARTNERSHIP OPPORTUNITIES
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Partnership Opportunities",
      summary: "How to become a sponsor or featured vendor.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Partner with UCC to connect with thousands of students and faculty members. Our sponsorship and featured vendor programs offer excellent visibility and engagement opportunities.
              <strong> These partnerships directly support student initiatives while providing valuable exposure for your brand.</strong>
            </p>
          </div>
          
          {/* --- PARTNERSHIP OPTIONS GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sponsorship Tiers Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Sponsorship</span>
                Partnership Tiers
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Different levels of partnership to suit your needs.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Platinum Partner</strong> <span className="text-xs ml-auto text-gray-500">Premium</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Gold Partner</strong> <span className="text-xs ml-auto text-gray-500">Enhanced</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Silver Partner</strong> <span className="text-xs ml-auto text-gray-500">Standard</span>
                </li>
              </ul>
            </div>

            {/* Vendor Benefits Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Vendor</span>
                Featured Benefits
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Advantages of becoming a featured vendor.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>App Visibility</strong> <span className="text-xs ml-auto text-gray-500">High Traffic</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Student Discounts</strong> <span className="text-xs ml-auto text-gray-500">Exclusive</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Event Participation</strong> <span className="text-xs ml-auto text-gray-500">Priority</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- PARTNERSHIP PROCESS AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              Partnership Process
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Explore Options</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Research</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Review available <strong>partnership tiers</strong> and benefits to find the best fit for your organization.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Prepare Proposal</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Application</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Create a detailed <strong>partnership proposal</strong> highlighting mutual benefits and activation ideas.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Complete Application</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Formal Process</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Fill out the official <strong>partnership application form</strong> with all required details and documents.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Submit & Review</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Evaluation</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Submit your proposal to the <strong>Partnerships Office</strong> for review and approval.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Activate Partnership</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Implementation</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Sign the <strong>partnership agreement</strong> and begin implementing your planned activities and benefits.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Multiple sponsorship tiers available (Platinum, Gold, Silver)",
        "Featured vendors get premium app visibility and student engagement",
        "Partnerships directly support student initiatives and programs",
        "Custom marketing opportunities available for all partners",
        "Quarterly partnership reviews and optimization opportunities"
      ],
      steps: [
        {
          title: "Review Partnership Options",
          description: "Explore available sponsorship tiers and vendor benefits to find the best fit for your organization."
        },
        {
          title: "Prepare Proposal",
          description: "Create a detailed partnership proposal highlighting mutual benefits, target audience, and activation ideas."
        },
        {
          title: "Complete Application Form",
          description: "Fill out the official partnership application form with all required details and supporting documents."
        },
        {
          title: "Submit Proposal",
          description: "Send your completed application and proposal to the Partnerships Office for review."
        },
        {
          title: "Wait for Review",
          description: "Allow 2-3 weeks for proposal review and approval process."
        },
        {
          title: "Sign Agreement",
          description: "Complete and sign the partnership agreement if your proposal is approved."
        },
        {
          title: "Activate Partnership",
          description: "Begin implementing your planned partnership activities and benefits."
        }
      ],
      tips: [
        "Highlight specific student benefits in your proposal",
        "Include measurable outcomes and KPIs in your plan",
        "Consider custom packages if standard tiers don't fit",
        "Plan for the full academic year in your proposal",
        "Include student discount offers in your vendor application"
      ],
      resources: [
        {
          title: "Partnership Brochure",
          description: "Download our complete partnership opportunities brochure",
          url: "https://ucc.edu.gh/partnership-brochure"
        },
        {
          title: "Application Form",
          description: "Apply to become a partner or featured vendor",
          url: "https://ucc.edu.gh/partner-application"
        },
        {
          title: "Contact Partnerships Office",
          description: "Get in touch with our partnerships team",
          url: "mailto:partnerships@ucc.edu.gh"
        }
      ],
      checklist: [
        { text: "Review all partnership options", checked: false },
        { text: "Prepare detailed proposal", checked: false },
        { text: "Complete application form", checked: false },
        { text: "Gather supporting documents", checked: false },
        { text: "Submit before deadline", checked: false },
        { text: "Follow up on application status", checked: false },
        { text: "Plan partnership activation", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Partnership Process' },
    { id: 'resources', label: 'Partnership Resources' },
    { id: 'checklist', label: 'Application Checklist' }
  ];

  return { sections, tabs };
};

export default SponsorsFeaturedVendors;