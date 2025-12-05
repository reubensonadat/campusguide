import React from 'react';
import { Calendar, CheckCircle, AlertTriangle, BookOpen, MapPin, CreditCard, User, Info, Download, Sparkles, Truck, Coffee, Plug } from 'lucide-react';

const GettingStarted = () => {
  // UCC GUIDE: GETTING STARTED (PLATINUM EDITION 2025/2026)
  // DATA SOURCE: Official 2025/2026 Academic Calendar, CoverGhana Flyer, Adehye Hall Guide.
  // VALIDATION: Dates aligned with Academic Calendar (Jan 5 Start). Packing list updated to allow Electricals but ban Trunks.

  const sections = [
    {
      title: "Welcome to the University of Choice",
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
                  Akwaaba to the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">University of Choice</span>
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
             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
               <p className="text-gray-600 mb-6 text-sm">
                 UCC Halls are strict. Data sourced from Adehye & CoverGhana guides.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                 {/* Must Haves */}
                 <div>
                   <h5 className="font-bold text-gray-800 border-b-2 border-green-500 pb-2 mb-3 flex items-center">
                     <CheckCircle size={16} className="text-green-500 mr-2" /> Must Haves
                   </h5>
                   <ul className="space-y-2 text-sm text-gray-600">
                     <li>• <strong>White Bed Sheets</strong> (Mandatory)</li>
                     <li>• Pillow & Pillowcases</li>
                     <li>• Bucket & Pail (Water is life)</li>
                     <li>• Formal Wear (For Matriculation)</li>
                     <li>• Raincoat / Umbrella</li>
                   </ul>
                 </div>
                 
                 {/* Contraband - UPDATED based on Image Evidence */}
                 <div>
                   <h5 className="font-bold text-gray-800 border-b-2 border-red-500 pb-2 mb-3 flex items-center">
                     <AlertTriangle size={16} className="text-red-500 mr-2" /> Prohibited
                   </h5>
                   <ul className="space-y-2 text-sm text-gray-600">
                     <li>• <strong>Trunks</strong> (Use Suitcases)</li>
                     <li>• <strong>Chop Boxes</strong></li>
                     <li>• Mattresses (Provided by Hall)</li>
                     <li>• Gas Cookers / Cylinders</li>
                     <li>• Weapons / Drugs</li>
                   </ul>
                 </div>

                 {/* Allowed Electricals - UPDATED based on Flyer */}
                 <div>
                   <h5 className="font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 flex items-center">
                     <Plug size={16} className="text-blue-500 mr-2" /> Allowed Electricals
                   </h5>
                   <ul className="space-y-2 text-sm text-gray-600">
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
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h4 className="text-orange-900 font-bold text-lg mb-3">Hall Traditions</h4>
              <p className="text-sm text-orange-800/80 mb-4 leading-relaxed">
                UCC is famous for its hall culture. Expect <strong>"Processions"</strong> and <strong>"Morale"</strong> (singing and drumming) on Friday nights. 
                <strong> Casford</strong> and <strong>Adehye</strong> ("Cas-Ade") have a strong alliance, as do <strong>Atlantic</strong> and <strong>Oguaa</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/60 text-orange-700 text-xs rounded font-bold border border-orange-200">Royals</span>
                <span className="px-2 py-1 bg-white/60 text-orange-700 text-xs rounded font-bold border border-orange-200">Super-Powers</span>
                <span className="px-2 py-1 bg-white/60 text-orange-700 text-xs rounded font-bold border border-orange-200">Mariners</span>
                <span className="px-2 py-1 bg-white/60 text-orange-700 text-xs rounded font-bold border border-orange-200">Gentlemen</span>
              </div>
            </div>

             <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="text-indigo-900 font-bold text-lg mb-3">Medical Exam Rule</h4>
              <p className="text-sm text-indigo-800/80 mb-4 leading-relaxed">
                The Medical Exam is <strong>mandatory</strong>. You cannot graduate without clearing it.
                It involves a Chest X-Ray, Lab Tests, and a Physical Exam. 
                <strong> Pro Tip:</strong> Go as early as 6:00 AM to beat the queue.
              </p>
              <div className="flex items-center text-indigo-700 text-xs font-bold">
                <MapPin size={14} className="mr-1" />
                University Health Services (Old Site)
              </div>
            </div>
          </div>

          {/* --- CRITICAL DATES TIMELINE --- */}
          <div>
            <SectionHeader icon={<Calendar size={20} />} title="Freshers' Timeline (Jan - Feb 2026)" />
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                <TimelineEvent date="Jan 05" day="Monday" title="Freshers Report" desc="Arrival at Halls. Key collection starts early. NO TRUNKS allowed." />
                <TimelineEvent date="Jan 06" day="Tuesday" title="Orientation Begins" desc="Online Orientation and Registration begins (Ends Jan 8)." />
                <TimelineEvent date="Jan 12" day="Monday" title="Lectures Begin" desc="Classes start immediately. Don't wait for 'next week'." />
                <TimelineEvent date="Feb 07" day="Saturday" title="Matriculation" desc="Official swearing-in ceremony. Formal attire required." />
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
          title: "Biometric Registration",
          description: "Locate the ID Card Unit (usually at CAS or Old Admin). Capture your biometrics to get your Student ID card. No card = No Exams."
        },
        {
          title: "Hall Registration",
          description: "Go to your Hall's Porter's Lodge. Show your Fee Receipt. REMEMBER: Trunks and Chopboxes are NOT allowed and will be turned away."
        },
        {
          title: "The Medical Examination",
          description: "1. Pay medical fee at Cash Office. 2. Do X-Rays & Labs at Hospital. 3. Return for Physical Exam. 4. Submit cleared form to Department."
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
        "Bringing a Trunk or Chop Box (You will be forced to send it back home).",
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
    { id: 'checklist', label: 'Checklist' }
  ];

  return { sections, tabs };
};

// --- INTERNAL HELPER COMPONENTS FOR PREMIUM STYLING ---

const SectionHeader = ({ icon, title }) => (
  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b border-gray-100 pb-2">
    <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 shadow-sm border border-indigo-100">
      {icon}
    </span>
    {title}
  </h3>
);

const ActionCard = ({ step, title, details, theme, desc }) => {
  const isGreen = theme === 'green';
  const bgClass = isGreen ? 'bg-emerald-50' : 'bg-blue-50';
  const borderClass = isGreen ? 'border-emerald-100' : 'border-blue-100';
  const textMain = isGreen ? 'text-emerald-900' : 'text-blue-900';
  const badgeBg = isGreen ? 'bg-emerald-200' : 'bg-blue-200';
  const badgeText = isGreen ? 'text-emerald-800' : 'text-blue-800';
  const tickColor = isGreen ? 'text-emerald-600' : 'text-blue-600';

  return (
    <div className={`${bgClass} p-6 rounded-2xl border ${borderClass} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full`}>
      <div className="flex items-center mb-3">
        <span className={`${badgeBg} ${badgeText} text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide mr-3 shadow-sm`}>
          Step {step}
        </span>
        <h4 className={`font-bold text-xl ${textMain}`}>{title}</h4>
      </div>
      <p className={`text-sm ${textMain} opacity-80 mb-4 italic`}>{desc}</p>
      <ul className="space-y-3 mt-auto">
        {details.map((item, idx) => (
          <li key={idx} className={`flex items-start text-sm ${textMain} font-medium`}>
            <CheckCircle size={16} className={`${tickColor} mt-0.5 mr-2 flex-shrink-0`} />
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
    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
      <Calendar size={18} />
    </div>
    
    {/* Content Card */}
    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 relative">
      <div className="absolute top-4 right-4 opacity-10 text-indigo-600">
         <Info size={40} />
      </div>
      <div className="flex flex-col mb-1">
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-xl">{date}</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{day}</span>
      </div>
      <h5 className="font-bold text-slate-800 text-lg mb-2">{title}</h5>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default GettingStarted;