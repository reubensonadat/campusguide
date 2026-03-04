import React from 'react';
import { Calendar, CheckCircle, AlertTriangle, BookOpen, MapPin, CreditCard, User, Info, Download, Sparkles, Truck, Coffee, Plug } from 'lucide-react';

const GettingStarted = () => {
  // UCC GUIDE: GETTING STARTED (PLATINUM EDITION 2025/2026)
  // DATA SOURCE: Official 2025/2026 Academic Calendar, CoverGhana Flyer, Adehye Hall Guide.
  // VALIDATION: Dates aligned with Academic Calendar (Jan 5 Start). Packing list updated to allow Electricals but ban Trunks.

  const sections = [
    {
      title: "Welcome to the University of Competitive Choice",
      summary: "Your definitive roadmap from 'Admission Letter' to 'Matriculation'.",

      // --- OVERVIEW CONTENT (RICH UI) ---
      content: (
        <div className="space-y-12 font-sans">
          {/* --- HERO SECTION WITH GLASSMORPHISM --- */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-10 shadow-2xl">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-blue-200">
                  <Sparkles size={12} /> Class of 2029
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Akwaaba to the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">University of Competitive Choice</span>
                </h2>
                <p className="text-blue-100/90 text-lg leading-relaxed">
                  You have secured your spot in Ghana's most competitive university.
                  The next 21 days define your first year. Don't just arrive; <strong>arrive prepared.</strong>
                </p>
              </div>

              {/* Countdown/Status Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl min-w-[200px] text-center shadow-lg transform hover:scale-105 transition-transform">
                <p className="text-blue-200 text-xs uppercase tracking-widest mb-1">Freshers Reporting</p>
                <div className="text-3xl font-bold text-white mb-1">Jan 5</div>
                <div className="text-sm font-medium text-blue-100">Monday, 2026</div>
                <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* --- IMMEDIATE ACTIONS (Split Layout) --- */}
          <div>
            <SectionHeader icon={<CreditCard size={20} />} title="Immediate Actions (Before You Travel)" />
            <div className="grid md:grid-cols-2 gap-6">
              <ActionCard
                step="01"
                title="Accept & Pay Fees"
                theme="green"
                desc="Your admission is provisional until fees are paid."
                details={[
                  "Print Admission Letter (Colour).",
                  "Pay at GCB, Zenith, or Prudential.",
                  "<strong>Quote Student ID</strong> (Not Ref No).",
                  "Keep receipt safe for Hall entry."
                ]}
              />
              <ActionCard
                step="02"
                title="Portal Activation"
                theme="blue"
                desc="Your digital identity starts here."
                details={[
                  "Wait 24-48 hrs after payment.",
                  "Visit <strong>portal.ucc.edu.gh</strong>",
                  "User: Registration Number",
                  "Pass: Registration Number (Default)"
                ]}
              />
            </div>
          </div>

          {/* --- THE "SURVIVAL KIT" (Packing Guide) --- */}
          <div>
            <SectionHeader icon={<Truck size={20} />} title="The 'Old Site' Survival Kit (Packing)" />
            <div className="bg-[var(--gray-100-soft)] border border-[var(--gray-200)] rounded-2xl p-6 transition-colors duration-300">
              <p className="text-[var(--gray-600)] mb-6 text-sm">
                UCC Halls are strict. Data sourced from Adehye & CoverGhana guides.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Must Haves */}
                <div>
                  <h5 className="font-bold text-[var(--gray-900)] border-b-2 border-green-500 pb-2 mb-3 flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" /> Must Haves
                  </h5>
                  <ul className="space-y-2 text-sm text-[var(--gray-700)]">
                    <li>• <strong>White Bed Sheets</strong> (Recommended, not mandatory)</li>
                    <li>• Pillow & Pillowcases</li>
                    <li>• Bucket & Pail (Water is life)</li>
                    <li>• Formal Wear (For Matriculation)</li>
                    <li>• Raincoat / Umbrella</li>
                  </ul>
                </div>

                {/* Contraband - UPDATED based on Image Evidence */}
                <div>
                  <h5 className="font-bold text-[var(--gray-900)] border-b-2 border-red-500 pb-2 mb-3 flex items-center">
                    <AlertTriangle size={16} className="text-red-500 mr-2" /> Prohibited
                  </h5>
                  <ul className="space-y-2 text-sm text-[var(--gray-700)]">
                    <li>• <strong>Trunks</strong> (Use Suitcases)</li>
                    <li>• <strong>Chop Boxes</strong></li>
                    <li>• Mattresses (Provided by Hall)</li>
                    <li>• Gas Cookers / Cylinders</li>
                    <li>• Weapons / Drugs</li>
                  </ul>
                </div>

                {/* Allowed Electricals - UPDATED based on Flyer */}
                <div>
                  <h5 className="font-bold text-[var(--gray-900)] border-b-2 border-blue-500 pb-2 mb-3 flex items-center">
                    <Plug size={16} className="text-blue-500 mr-2" /> Allowed Electricals
                  </h5>
                  <ul className="space-y-2 text-sm text-[var(--gray-700)]">
                    <li>• Rice Cooker</li>
                    <li>• Electric Kettle</li>
                    <li>• Electric Iron</li>
                    <li>• Hot Plate (Regulated)</li>
                    <li>• Extension Board (Strong)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* --- HALL CULTURE (Traditions) --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--accent-50)] p-6 rounded-2xl border border-[var(--accent-100)] transition-colors duration-300">
              <h4 className="text-[var(--accent-900)] font-bold text-lg mb-3">Hall Traditions</h4>
              <p className="text-sm text-[var(--accent-800)] mb-4 leading-relaxed">
                UCC is famous for its hall culture. Expect <strong>"Processions"</strong> and <strong>"Morale"</strong> (singing and drumming) on Friday nights.
                <strong> Casford</strong> and <strong>Adehye</strong> have a strong alliance.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[var(--white)] text-[var(--accent-800)] text-xs rounded font-bold border border-[var(--accent-200)] transition-colors duration-300">Royals</span>
                <span className="px-2 py-1 bg-[var(--white)] text-[var(--accent-800)] text-xs rounded font-bold border border-[var(--accent-200)] transition-colors duration-300">Super-Powers</span>
                <span className="px-2 py-1 bg-[var(--white)] text-[var(--accent-800)] text-xs rounded font-bold border border-[var(--accent-200)] transition-colors duration-300">Mariners</span>
              </div>
            </div>

            <div className="bg-[var(--primary-50)] p-6 rounded-2xl border border-[var(--primary-100)] transition-colors duration-300">
              <h4 className="text-[var(--primary-900)] font-bold text-lg mb-3">Medical Exam Rule</h4>
              <p className="text-sm text-[var(--primary-800)] mb-4 leading-relaxed">
                The Medical Exam is <strong>mandatory</strong>. You cannot graduate without clearing it.
                It involves a Chest X-Ray, Lab Tests, and a Physical Exam.
                <strong> Pro Tip:</strong> Go as early as 6:00 AM to beat the queue.
              </p>
              <div className="flex items-center text-[var(--primary-700)] text-xs font-bold">
                <MapPin size={14} className="mr-1" />
                University Health Services (Old Site)
              </div>
            </div>
          </div>

          {/* --- CRITICAL DATES TIMELINE --- */}
          <div>
            <SectionHeader icon={<Calendar size={20} />} title="Freshers' Timeline (Jan - Feb 2026)" />
            <div className="bg-[var(--white)] border border-[var(--gray-200)] rounded-2xl p-6 shadow-sm transition-colors duration-300">
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 flex gap-3">
                <AlertTriangle size={20} className="shrink-0" />
                <div>
                  <p className="font-bold mb-1">IMPORTANT DISCLAIMER: DATES ARE SUBJECT TO CHANGE</p>
                  <p className="mb-2 opacity-90">
                    These dates are provided for planning purposes but are <strong>not final</strong>.
                    The University reserves the right to change these dates under any circumstances.
                  </p>
                  <p>
                    For the latest official information, ALWAYS check the Directorate of Academic Affairs (DAA) website: <br />
                    <a href="https://daa.ucc.edu.gh" target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--primary-600)] underline hover:text-[var(--primary-800)]">
                      daa.ucc.edu.gh
                    </a>
                    <br />
                    <span className="text-xs text-yellow-900/80 font-medium mt-1 block">
                      ⚠️ <strong>INSTRUCTION:</strong> When you visit the site, look specifically for the <strong>"Academic Calendar"</strong> page/section to confirm these dates.
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--gray-300)] before:to-transparent">
                <TimelineEvent date="Jan 05" day="Monday" title="Freshers Report" desc="Arrival at Halls. Key collection starts early." />
                <TimelineEvent date="Jan 06" day="Tuesday" title="Orientation Begins" desc="Online Orientation and Registration begins. (Dates subject to university confirmation)." />
                <TimelineEvent date="Jan 12" day="Monday" title="Lectures Begin (Provisional)" desc="Classes usually start immediately, but officially depend on the Timetable release." />
                <TimelineEvent date="Feb 07" day="Saturday" title="Matriculation (Tentative)" desc="Official swearing-in ceremony. Formal attire required. (Date subject to change)." />
              </div>

              {/* --- ORIENTATION ATTENDANCE NOTE --- */}
              <div className="mt-6 p-4 bg-[var(--primary-50)] border border-[var(--primary-100)] rounded-lg transition-colors duration-300">
                <h4 className="font-bold text-[var(--primary-900)] mb-2 flex items-center">
                  <User size={18} className="mr-2" />
                  Orientation Attendance Rules
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-[var(--white)] p-3 rounded border border-[var(--primary-200)] transition-colors duration-300">
                    <span className="font-bold text-[var(--primary-800)] block mb-1">🌍 In Diaspora (Private Hostels/Home)</span>
                    <p className="text-[var(--gray-700)]">
                      You can attend orientation <strong>online</strong>. You do not strictly need to come to your Hall of Affiliation.
                      Links will be provided at the appropriate time.
                    </p>
                  </div>
                  <div className="bg-[var(--white)] p-3 rounded border border-[var(--primary-200)] transition-colors duration-300">
                    <span className="font-bold text-[var(--primary-800)] block mb-1">🏫 Inside Hall of Affiliation</span>
                    <p className="text-[var(--gray-700)]">
                      If you are physically in the Hall, it is <strong>mandatory to attend</strong> the sessions organized there.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--gray-100-soft)] border border-[var(--gray-200)] rounded-lg text-sm text-[var(--gray-800)] transition-colors duration-300">
                <p className="flex items-start gap-2">
                  <Info size={16} className="mt-1 shrink-0" />
                  <span>
                    <strong>Note on Lectures:</strong> Lectures typically begin when the official timetable is released.
                    If the timetable is not out, do not panic. Relax and wait for official communication from your Course Reps
                    or the <a href="https://daa.ucc.edu.gh" className="underline font-bold text-[var(--primary-600)] hover:text-[var(--primary-800)]">DAA website</a>.
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
      ),

      // --- STEPS TAB DATA ---
      steps: [
        {
          title: "Print 3 Copies of Everything",
          description: "Admission Letter, Fee Receipt, and WASSCE Results. You will need one set for your Hall, one for your Department, and one for your own file."
        },

        {
          title: "Pay Departmental Dues",
          description: "Visit your Department association's table. First Years pay higher dues (often includes shirt/souvenirs). Mandatory before registration."
        },
        {
          title: "Course Registration",
          description: "Log in to the portal. Register Core courses and required Electives. Ensure total credits meet minimum (usually 15). Print the slip immediately."
        },
        {
          title: "Locate Lecture Venues",
          description: "Use the Campus Map to find 'CALC', 'LLT', 'SWT', and 'CELT'. Walk the route the day before classes start on Jan 12."
        }
      ],

      // --- WARNINGS TAB DATA ---
      commonMistakes: [
        "Bringing a Trunk or Chop Box (Not recommended due to space; stick to suitcases).",
        "Paying fees via direct Mobile Money transfer instead of Transflow/Smartpay.",
        "Missing the Medical Exam (Academic record will be flagged).",
        "Assuming Lectures don't start immediately on Jan 12.",
        "Skipping 'Library Orientation' (You won't know how to use Turnitin)."
      ],
      consequences: "Failure to follow the 'No Trunk' policy will result in significant delays and frustration on arrival day.",

      // --- CHECKLIST TAB DATA ---


      // --- RESOURCES TAB DATA ---
      resources: [
        {
          title: "Admission Status Portal",
          description: "Check status and print letters.",
          url: "https://apply.ucc.edu.gh"
        },
        {
          title: "Student Portal",
          description: "Course registration, results, room booking.",
          url: "https://portal.ucc.edu.gh"
        },
        {
          title: "UCC Freshers Official",
          description: "Official Whatsapp channel for updates.",
          url: "https://whatsapp.com/channel/0029VarAzto6buMSvms4V30a"
        },
        {
          title: "E-Learning Platform",
          description: "Access lecture slides and assignments.",
          url: "https://elearning.ucc.edu.gh/login/index.php"
        }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Welcome' },
    { id: 'steps', label: 'First Week' },
    { id: 'resources', label: 'Portals' },
    { id: 'warnings', label: 'Alerts' },
  ];

  return { sections, tabs };
};

// --- INTERNAL HELPER COMPONENTS FOR PREMIUM STYLING ---

const SectionHeader = ({ icon, title }) => (
  <h3 className="text-xl font-bold text-[var(--gray-900)] mb-6 flex items-center border-b border-[var(--gray-200)] pb-2 transition-colors duration-300">
    <span className="w-10 h-10 rounded-xl bg-[var(--primary-50)] text-[var(--primary-600)] flex items-center justify-center mr-3 shadow-sm border border-[var(--primary-100)] transition-colors duration-300">
      {icon}
    </span>
    {title}
  </h3>
);

const ActionCard = ({ step, title, details, theme, desc }) => {
  const isGreen = theme === 'green';
  const bgClass = isGreen ? 'bg-[var(--accent-50)]' : 'bg-[var(--primary-50)]';
  const borderClass = isGreen ? 'border-[var(--accent-100)]' : 'border-[var(--primary-100)]';
  const textMain = isGreen ? 'text-[var(--accent-900)]' : 'text-[var(--primary-900)]';
  const badgeBg = isGreen ? 'bg-[var(--accent-200)]' : 'bg-[var(--primary-200)]';
  const badgeText = isGreen ? 'text-[var(--accent-800)]' : 'text-[var(--primary-800)]';
  const tickColor = isGreen ? 'text-[var(--accent-600)]' : 'text-[var(--primary-600)]';

  return (
    <div className={`${bgClass} p-6 rounded-2xl border ${borderClass} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full`}>
      <div className="flex items-center mb-3">
        <span className={`${badgeBg} ${badgeText} text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide mr-3 shadow-sm transition-colors duration-300`}>
          Step {step}
        </span>
        <h4 className={`font-bold text-xl ${textMain} transition-colors duration-300`}>{title}</h4>
      </div>
      <p className={`text-sm ${textMain} opacity-80 mb-4 italic transition-colors duration-300`}>{desc}</p>
      <ul className="space-y-3 mt-auto">
        {details.map((item, idx) => (
          <li key={idx} className={`flex items-start text-sm ${textMain} font-medium transition-colors duration-300`}>
            <CheckCircle size={16} className={`${tickColor} mt-0.5 mr-2 flex-shrink-0 transition-colors duration-300`} />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const TimelineEvent = ({ date, day, title, desc }) => (
  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
    {/* Icon/Dot */}
    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[var(--white)] bg-[var(--primary-100)] text-[var(--primary-600)] group-hover:bg-[var(--primary-600)] group-hover:text-[var(--white)] transition-colors duration-300 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
      <Calendar size={18} />
    </div>

    {/* Content Card */}
    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl border border-[var(--gray-200)] bg-[var(--white)] shadow-sm hover:shadow-lg transition-all duration-300 relative">
      <div className="absolute top-4 right-4 opacity-10 text-[var(--primary-400)]">
        <Info size={40} />
      </div>
      <div className="flex flex-col mb-1">
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)] text-xl">{date}</span>
        <span className="text-xs font-bold text-[var(--gray-500)] uppercase tracking-widest transition-colors duration-300">{day}</span>
      </div>
      <h5 className="font-bold text-[var(--gray-900)] text-lg mb-2 transition-colors duration-300">{title}</h5>
      <p className="text-sm text-[var(--gray-600)] leading-relaxed transition-colors duration-300">{desc}</p>
    </div>
  </div>
);

export default GettingStarted;