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
          <div className="bg-[var(--gray-100-soft)] dark:bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--gray-200)] dark:border-[var(--border-color)] transition-colors duration-300">
            <p className="text-[var(--gray-700)] dark:text-[var(--text-secondary)] leading-relaxed">
              University life can present various academic, personal, and social challenges. UCC provides comprehensive support services to ensure your well-being and success.
              <strong className="dark:text-[var(--text-main)]"> These services are confidential, professional, and designed to help you navigate every aspect of student life.</strong>
            </p>
          </div>

          {/* --- SUPPORT SERVICES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Counseling & Mental Health Card */}
            <div className="bg-[var(--primary-50)] dark:bg-[var(--primary-900)]/20 p-6 rounded-xl border border-[var(--primary-100)] dark:border-[var(--primary-800)]/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-[var(--primary-900)] dark:text-[var(--primary-300)] text-lg mb-3 flex items-center">
                <span className="bg-[var(--primary-200)] dark:bg-[var(--primary-800)]/60 text-[var(--primary-800)] dark:text-[var(--primary-200)] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Wellness</span>
                Counseling & Mental Health
              </h4>
              <p className="text-sm text-[var(--primary-800)] dark:text-[var(--primary-200)] opacity-70 mb-4">Professional support for your mental and emotional well-being.</p>
              <ul className="space-y-3 text-sm text-[var(--gray-700)] dark:text-[var(--gray-300)]">
                <li className="flex items-center bg-[var(--bg-card)] border border-[var(--primary-100)] dark:border-[var(--primary-800)]/50 p-2 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--primary-400)] rounded-full mr-3"></span>
                  <strong>Personal Counseling</strong> <span className="text-xs ml-auto text-[var(--gray-500)] dark:text-[var(--gray-400)]">Free</span>
                </li>
                <li className="flex items-center bg-[var(--bg-card)] border border-[var(--primary-100)] dark:border-[var(--primary-800)]/50 p-2 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--primary-400)] rounded-full mr-3"></span>
                  <strong>Group Therapy</strong> <span className="text-xs ml-auto text-[var(--gray-500)] dark:text-[var(--gray-400)]">Weekly</span>
                </li>
                <li className="flex items-center bg-[var(--bg-card)] border border-[var(--primary-100)] dark:border-[var(--primary-800)]/50 p-2 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--primary-400)] rounded-full mr-3"></span>
                  <strong>Crisis Intervention</strong> <span className="text-xs ml-auto text-[var(--gray-500)] dark:text-[var(--gray-400)]">24/7</span>
                </li>
              </ul>
            </div>

            {/* Academic & Career Support Card */}
            <div className="bg-[var(--accent-50)] dark:bg-[var(--accent-900)]/20 p-6 rounded-xl border border-[var(--accent-100)] dark:border-[var(--accent-800)]/50 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-[var(--accent-900)] dark:text-[var(--accent-300)] text-lg mb-3 flex items-center">
                <span className="bg-[var(--accent-200)] dark:bg-[var(--accent-800)]/60 text-[var(--accent-800)] dark:text-[var(--accent-200)] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Development</span>
                Academic & Career Support
              </h4>
              <p className="text-sm text-[var(--accent-800)] dark:text-[var(--accent-200)] opacity-70 mb-4">Resources to help you excel academically and prepare for your career.</p>
              <ul className="space-y-3 text-sm text-[var(--gray-700)] dark:text-[var(--gray-300)]">
                <li className="flex items-center bg-[var(--bg-card)] border border-[var(--accent-100)] dark:border-[var(--accent-800)]/50 p-2 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--accent-500)] rounded-full mr-3"></span>
                  <strong>Academic Tutoring</strong> <span className="text-xs ml-auto text-[var(--gray-500)] dark:text-[var(--gray-400)]">All Subjects</span>
                </li>
                <li className="flex items-center bg-[var(--bg-card)] border border-[var(--accent-100)] dark:border-[var(--accent-800)]/50 p-2 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--accent-500)] rounded-full mr-3"></span>
                  <strong>Career Guidance</strong> <span className="text-xs ml-auto text-[var(--gray-500)] dark:text-[var(--gray-400)]">Planning</span>
                </li>
                <li className="flex items-center bg-[var(--bg-card)] border border-[var(--accent-100)] dark:border-[var(--accent-800)]/50 p-2 rounded transition-colors duration-300">
                  <span className="w-2 h-2 bg-[var(--accent-500)] rounded-full mr-3"></span>
                  <strong>Disability Services</strong> <span className="text-xs ml-auto text-[var(--gray-500)] dark:text-[var(--gray-400)]">Accessibility</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- ACCESSING SUPPORT AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-[var(--gray-800)] dark:text-[var(--gray-100)] text-xl mb-6 flex items-center">
              <span className="bg-[var(--gray-200)] dark:bg-[var(--gray-700)] text-[var(--gray-700)] dark:text-[var(--gray-300)] w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              How to Access Support
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 */}
              <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-[var(--primary-900)] dark:text-[var(--primary-300)] text-lg">Seek Help Early</h5>
                  <span className="text-3xl font-bold text-[var(--primary-200)] dark:text-[var(--primary-800)] opacity-80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-[var(--primary-700)] dark:text-[var(--primary-400)] font-semibold mb-2">Proactive</p>
                <p className="text-sm text-[var(--gray-600)] dark:text-[var(--gray-400)] leading-relaxed">
                  Don't wait for a crisis. <strong className="dark:text-[var(--gray-200)]">Reach out</strong> at the first sign of difficulty.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-[var(--primary-900)] dark:text-[var(--primary-300)] text-lg">Know Locations</h5>
                  <span className="text-3xl font-bold text-[var(--primary-200)] dark:text-[var(--primary-800)] opacity-80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-[var(--primary-700)] dark:text-[var(--primary-400)] font-semibold mb-2">Find Us</p>
                <p className="text-sm text-[var(--gray-600)] dark:text-[var(--gray-400)] leading-relaxed">
                  Visit the <strong className="dark:text-[var(--gray-200)]">Counseling Center</strong> or <strong className="dark:text-[var(--gray-200)]">Student Affairs</strong> office to connect with services.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-[var(--primary-900)] dark:text-[var(--primary-300)] text-lg">Use All Services</h5>
                  <span className="text-3xl font-bold text-[var(--primary-200)] dark:text-[var(--primary-800)] opacity-80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-[var(--primary-700)] dark:text-[var(--primary-400)] font-semibold mb-2">Comprehensive</p>
                <p className="text-sm text-[var(--gray-600)] dark:text-[var(--gray-400)] leading-relaxed">
                  Take advantage of <strong className="dark:text-[var(--gray-200)]">academic, personal, and career</strong> support services available to you.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-[var(--primary-900)] dark:text-[var(--primary-300)] text-lg">Build Network</h5>
                  <span className="text-3xl font-bold text-[var(--primary-200)] dark:text-[var(--primary-800)] opacity-80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-[var(--primary-700)] dark:text-[var(--primary-400)] font-semibold mb-2">Community</p>
                <p className="text-sm text-[var(--gray-600)] dark:text-[var(--gray-400)] leading-relaxed">
                  Connect with <strong className="dark:text-[var(--gray-200)]">peers, mentors, and support groups</strong> to build a strong support system.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-[var(--primary-900)] dark:text-[var(--primary-300)] text-lg">Practice Self-Care</h5>
                  <span className="text-3xl font-bold text-[var(--primary-200)] dark:text-[var(--primary-800)] opacity-80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-[var(--primary-700)] dark:text-[var(--primary-400)] font-semibold mb-2">Wellness</p>
                <p className="text-sm text-[var(--gray-600)] dark:text-[var(--gray-400)] leading-relaxed">
                  Maintain <strong className="dark:text-[var(--gray-200)]">physical and mental health</strong> through regular exercise, proper nutrition, and stress management.
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