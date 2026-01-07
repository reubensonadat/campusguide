
const MedicalsHealthCenter = () => {
  // UCC GUIDE: MEDICALS & HEALTH CENTER
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Health Services on Campus",
      summary: "Medical care and health support for students.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              The University Health Center provides comprehensive medical services to keep you healthy throughout your studies. 
              From routine check-ups to emergency care, knowing how to access these services is essential for your well-being.
              <strong> Your health is a priority for academic success.</strong>
            </p>
          </div>
          
          {/* --- HEALTH SERVICES GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Medical Services Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Medical</span>
                Health Services
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Comprehensive medical care available to all registered students.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>General Consultation</strong> <span className="text-xs ml-auto text-gray-500">Daily</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Emergency Services</strong> <span className="text-xs ml-auto text-gray-500">24/7</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Specialist Referrals</strong> <span className="text-xs ml-auto text-gray-500">Available</span>
                </li>
              </ul>
            </div>

            {/* Insurance & Payment Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Payment</span>
                Insurance Options
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Multiple payment options available for your convenience.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>NHIS Accepted</strong> <span className="text-xs ml-auto text-gray-500">Primary</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>Private Insurance</strong> <span className="text-xs ml-auto text-gray-500">Optional</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>Out-of-Pocket</strong> <span className="text-xs ml-auto text-gray-500">Available</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- MEDICAL EXAMINATION PROCESS --- */}
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="text-red-900 font-bold text-lg mb-2">Mandatory Medical Examination</h4>
            <p className="text-red-800 text-sm leading-relaxed">
              All first-year students must complete a comprehensive medical examination. This includes a Chest X-Ray, 
              Lab Tests, and a Physical Exam. <strong>You cannot graduate without completing this examination.</strong>
              The results are kept in your permanent record and are required for clearance.
            </p>
          </div>

          {/* --- HEALTH CENTER FACILITIES --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h4 className="text-purple-900 font-bold text-lg mb-3">Facilities & Services</h4>
              <p className="text-sm text-purple-800/80 mb-4 leading-relaxed">
                The University Health Center is equipped with modern facilities to address most of your healthcare needs.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/60 text-purple-700 text-xs rounded font-bold border border-purple-200">Laboratory</span>
                <span className="px-2 py-1 bg-white/60 text-purple-700 text-xs rounded font-bold border border-purple-200">X-Ray Unit</span>
                <span className="px-2 py-1 bg-white/60 text-purple-700 text-xs rounded font-bold border border-purple-200">Pharmacy</span>
                <span className="px-2 py-1 bg-white/60 text-purple-700 text-xs rounded font-bold border border-purple-200">Dental Clinic</span>
                <span className="px-2 py-1 bg-white/60 text-purple-700 text-xs rounded font-bold border border-purple-200">Counseling Center</span>
              </div>
            </div>

             <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h4 className="text-amber-900 font-bold text-lg mb-3">Mental Health Support</h4>
              <p className="text-sm text-amber-800/80 mb-4 leading-relaxed">
                Your mental well-being is as important as your physical health. Professional counselors are available 
                to help you navigate academic stress, personal challenges, and mental health concerns.
              </p>
              <div className="flex items-center text-amber-700 text-xs font-bold">
                <span className="mr-2">📍</span>
                Counseling Center: Ground Floor, Health Center
              </div>
            </div>
          </div>
        </div>
      ),
      keyPoints: [
        "Health Center provides basic medical care",
        "Emergency services available 24/7",
        "NHIS accepted for payment",
        "Referrals available for specialized care",
        "Mental health counseling offered"
      ],
      steps: [
        {
          title: "Register at Health Center",
          description: "Submit your medical history and insurance information at the registration desk."
        },
        {
          title: "Get medical check-up",
          description: "Complete the mandatory medical examination including X-rays and lab tests."
        },
        {
          title: "Know emergency procedures",
          description: "Learn what to do in medical emergencies and save emergency contact numbers."
        },
        {
          title: "Understand consultation process",
          description: "Know how to book appointments and walk-in procedures for routine care."
        }
      ],
      tips: [
        "Keep your medical records updated",
        "Know your blood group and allergies",
        "Have emergency contacts readily available",
        "Don't ignore health symptoms",
        "Practice preventive healthcare"
      ],
      resources: [
        {
          title: "Health Center Location",
          description: "Find the University Health Center on campus",
          url: "https://maps.google.com/?q=University+Health+Center+University+of+Cape+Coast"
        },
        {
          title: "Medical Requirements",
          description: "Required vaccinations and medical forms",
          url: "https://ucc.edu.gh/medical-requirements"
        },
        {
          title: "NHIS Registration",
          description: "How to register for National Health Insurance",
          url: "https://ucc.edu.gh/nhis-info"
        }
      ],
      checklist: [
        { text: "Register at Health Center", checked: false },
        { text: "Complete medical check-up", checked: false },
        { text: "Get NHIS card", checked: false },
        { text: "Know emergency numbers", checked: false },
        { text: "Keep medical records", checked: false },
        { text: "Know operating hours", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'resources', label: 'Helpful Links' },
  ];

  return { sections, tabs };
};

export default MedicalsHealthCenter;