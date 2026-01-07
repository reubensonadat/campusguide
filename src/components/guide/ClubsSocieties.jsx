import React from 'react';

const ClubsSocieties = () => {
  // UCC GUIDE: CLUBS & SOCIETIES
  // Verified Data: 2025 Registered Associations (Religious, Academic, Social)
  // Structure: Categorized lists to help freshers find their tribe.

  const sections = [
    {
      title: "Student Life & Associations",
      summary: "Find your tribe: Religious, Academic, and Interest-based groups.",
      
      // --- OVERVIEW CONTENT ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              UCC life is not just about lectures. Joining an association is the fastest way to network, build leadership skills, and find a support system. 
              Most students belong to at least three groups: their <strong>Hall</strong>, their <strong>Departmental Association</strong>, and a <strong>Religious Group</strong>.
            </p>
          </div>

          {/* --- CATEGORY BREAKDOWN --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Religious Groups */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-indigo-900 text-lg mb-3 flex items-center">
                <span className="bg-indigo-200 text-indigo-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Spiritual</span>
                Religious Groups
              </h4>
              <p className="text-sm text-indigo-800/70 mb-4">The most active communities on campus.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span><strong>GHAMSU:</strong> Ghana Methodist Students Union</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span><strong>PENSA:</strong> Pentecost Students Association</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span><strong>NUPS-G:</strong> Presbyterian Students</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span><strong>CATHOLIC:</strong> Pax Romana / IMCS</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span><strong>GMSA:</strong> Ghana Muslim Students Association</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span><strong>AGCM:</strong> Assemblies of God Campus Ministry</li>
              </ul>
            </div>

            {/* Academic Associations */}
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-teal-900 text-lg mb-3 flex items-center">
                <span className="bg-teal-200 text-teal-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Academic</span>
                Departmental Groups
              </h4>
              <p className="text-sm text-teal-800/70 mb-4">Mandatory for most students (Dues required).</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span><strong>UCCABS:</strong> Association of Business Students</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span><strong>LSA:</strong> Law Students Union</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span><strong>MSA:</strong> Medical Students Association</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span><strong>EDSA:</strong> Education Students Association</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span><strong>SCISA:</strong> Science Students Association</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></span><strong>ASSOS:</strong> Social Sciences Society</li>
              </ul>
            </div>

            {/* Interest & Advocacy */}
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-orange-900 text-lg mb-3 flex items-center">
                <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Social</span>
                Interest & Advocacy
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span><strong>Debate Society:</strong> Prestigious public speaking club.</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span><strong>Amnesty International:</strong> Human rights advocacy.</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span><strong>Red Cross Society:</strong> First aid and health service.</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span><strong>AIESEC:</strong> Global leadership exchange.</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span><strong>UCC Cadets:</strong> Military training corps.</li>
              </ul>
            </div>

             {/* Sports */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-red-900 text-lg mb-3 flex items-center">
                <span className="bg-red-200 text-red-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Active</span>
                Sports Teams
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span><strong>UCC Spartans:</strong> Rugby Team.</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span><strong>UCC Wildcats:</strong> Basketball Team.</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span><strong>Ogualaa FC:</strong> Campus Football.</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span><strong>Athletics Team:</strong> Track & Field.</li>
              </ul>
            </div>
          </div>
        </div>
      ),

      // --- STEPS TAB DATA ---
      steps: [
        {
          title: "Attend Orientation Fair",
          description: "During Freshers' Week, all clubs set up stands at the Casford/Science field. Visit them."
        },
        {
          title: "Pay Departmental Dues",
          description: "Locate your department's association office. Payment is often required to access study materials or souvenirs."
        },
        {
          title: "Join a Religious Family",
          description: "Attend the first Sunday service (Joint Service) to see all denominations introduce themselves."
        },
        {
          title: "Register & Get Inducted",
          description: "Fill out membership forms. Most groups hold an 'Induction Service' for new members in the first month."
        }
      ],

      // --- RESOURCES TAB DATA ---
      resources: [
        {
          title: "SRC Clubs Directory",
          description: "Official list of registered student groups.",
          url: "https://src.ucc.edu.gh"
        },
        {
          title: "Sports Section",
          description: "Join a university team.",
          url: "https://sports.ucc.edu.gh"
        }
      ],

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Paid Departmental Dues", checked: false },
        { text: "Joined a Religious Group (if applicable)", checked: false },
        { text: "Signed up for one Interest Club", checked: false },
        { text: "Followed Association Social Media pages", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'How to Join' },
    { id: 'resources', label: 'Resources' },
  ];

  return { sections, tabs };
};

export default ClubsSocieties;