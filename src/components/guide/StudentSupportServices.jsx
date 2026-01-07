
const StudentSupportServices = () => {
  // UCC GUIDE: STUDENT SUPPORT SERVICES
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Student Support Services",
      summary: "Counseling and support resources for students.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              University life can present various academic, personal, and social challenges. UCC provides comprehensive support services to ensure your well-being and success.
              <strong> These services are confidential, professional, and designed to help you navigate every aspect of student life.</strong>
            </p>
          </div>

          {/* --- SUPPORT SERVICES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Counseling & Mental Health Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Wellness</span>
                Counseling & Mental Health
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Professional support for your mental and emotional well-being.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Personal Counseling</strong> <span className="text-xs ml-auto text-gray-500">Free</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Group Therapy</strong> <span className="text-xs ml-auto text-gray-500">Weekly</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Crisis Intervention</strong> <span className="text-xs ml-auto text-gray-500">24/7</span>
                </li>
              </ul>
            </div>

            {/* Academic & Career Support Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Development</span>
                Academic & Career Support
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Resources to help you excel academically and prepare for your career.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Academic Tutoring</strong> <span className="text-xs ml-auto text-gray-500">All Subjects</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Career Guidance</strong> <span className="text-xs ml-auto text-gray-500">Planning</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Disability Services</strong> <span className="text-xs ml-auto text-gray-500">Accessibility</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- ACCESSING SUPPORT AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              How to Access Support
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Seek Help Early</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Proactive</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Don't wait for a crisis. <strong>Reach out</strong> at the first sign of difficulty.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Know Locations</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Find Us</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Visit the <strong>Counseling Center</strong> or <strong>Student Affairs</strong> office to connect with services.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Use All Services</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Comprehensive</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Take advantage of <strong>academic, personal, and career</strong> support services available to you.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Build Network</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Community</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Connect with <strong>peers, mentors, and support groups</strong> to build a strong support system.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Practice Self-Care</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Wellness</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Maintain <strong>physical and mental health</strong> through regular exercise, proper nutrition, and stress management.
                </p>
              </div>

            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Free and confidential counseling services available to all students.",
        "Academic support includes tutoring, writing centers, and skill workshops.",
        "Career services provide guidance, job search assistance, and interview preparation.",
        "Disability support services ensure equal access to education for all students.",
        "All support services are strictly confidential."
      ],
      steps: [
        {
          title: "Identify Your Needs",
          description: "Recognize whether you need academic, personal, career, or disability support services."
        },
        {
          title: "Locate Support Offices",
          description: "Find the Counseling Center, Academic Support Unit, or Career Services office on campus."
        },
        {
          title: "Schedule an Appointment",
          description: "Book a session with the appropriate support service. Many offer same-day appointments."
        },
        {
          title: "Attend Your Session",
          description: "Be open and honest during your session to get the most relevant support."
        },
        {
          title: "Follow Recommendations",
          description: "Implement the strategies and resources provided by support professionals."
        },
        {
          title: "Maintain Connection",
          description: "Build an ongoing relationship with support services for continued assistance."
        }
      ],
      tips: [
        "Seek help early, don't wait until you're in crisis.",
        "Take advantage of all available support services, even if you think you don't need them.",
        "Build a support network of friends, mentors, and professionals.",
        "Practice regular self-care to maintain overall well-being.",
        "Remember that seeking help is a sign of strength, not weakness."
      ],
      resources: [
        {
          title: "Counseling Center",
          description: "Book a confidential counseling session",
          url: "https://portal.ucc.edu.gh/onlineReg/src/coun.php"
        },
        {
          title: "Academic Support Unit",
          description: "Get tutoring and academic help",
          url: "https://ucc.edu.gh/academic-support"
        },
        {
          title: "Career Services",
          description: "Career guidance and job search help",
          url: "https://careers.ucc.edu.gh"
        },
        {
          title: "Disability Support Services",
          description: "Accessibility and accommodation services",
          url: "https://ucc.edu.gh/disability-services"
        }
      ],
      checklist: [
        { text: "Know locations of all support offices", checked: false },
        { text: "Save counseling center contacts", checked: false },
        { text: "Explore academic support options", checked: false },
        { text: "Visit career services early", checked: false },
        { text: "Understand confidentiality policies", checked: false },
        { text: "Build personal support network", checked: false },
        { text: "Schedule regular self-care time", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Getting Support' },
    { id: 'resources', label: 'Support Services' },
  ];

  return { sections, tabs };
};

export default StudentSupportServices;