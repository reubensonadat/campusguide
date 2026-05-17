import React from 'react';
import { Calendar, CheckCircle, AlertTriangle, Sparkles, Truck, Plug, ArrowRight, MapPin, BookOpen, User, Info } from 'lucide-react';
import { ActionCard, InfoBlock, PackingList } from '../../GuideStyles';

const GettingStarted = () => {
  // UCC GUIDE: GETTING STARTED (FULL PLATINUM EDITION 2025/2026 - RESTORED)
  
  const sections = [
    {
      title: "Welcome to UCC",
      summary: "Your definitive roadmap from 'Admission Letter' to 'Matriculation'.",
      
      // --- ALL DATA ARRAYS RESTORED ---
      steps: [
        { title: "Print 3 Copies of Everything", description: "Admission Letter, Fee Receipt, and WASSCE Results. One for Hall, one for Dept, one for you." },
        { title: "Pay Departmental Dues", description: "Visit your Dept association table. Mandatory before registration." },
        { title: "Course Registration", description: "Register Core & Elective courses on portal.ucc.edu.gh." },
        { title: "Locate Lecture Venues", description: "Find CALC, LLT, SWT, and CELT using the Campus Map tool." }
      ],
      resources: [
        { title: "Admission Status Portal", description: "Check status and print letters.", url: "https://apply.ucc.edu.gh" },
        { title: "Student Portal", description: "Course registration, results, room booking.", url: "https://portal.ucc.edu.gh" },
        { title: "UCC Freshers Official", description: "Official Whatsapp channel for updates.", url: "https://whatsapp.com/channel/0029VarAzto6buMSvms4V30a" },
        { title: "E-Learning Platform", description: "Access lecture slides and assignments.", url: "https://elearning.ucc.edu.gh" }
      ],
      commonMistakes: [
        "Bringing a Trunk or Chop Box (Not recommended due to space).",
        "Paying fees via direct Mobile Money instead of Transflow/Smartpay.",
        "Missing the Medical Exam (Academic record will be flagged).",
        "Assuming Lectures don't start immediately on Jan 12.",
        "Skipping 'Library Orientation' (You won't know how to use Turnitin)."
      ],
      consequences: "Failure to follow the 'No Trunk' policy will result in significant delays and frustration on arrival day.",

      content: (
        <div className="space-y-12">
          {/* --- CLEAN HERO --- */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-50 border border-indigo-100 p-8 md:p-12 shadow-sm">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl"></div>
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-left space-y-6 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-indigo-600 border border-indigo-100 text-xs font-black uppercase tracking-widest shadow-sm">
                   <Sparkles size={14} /> Class of 2029
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-slate-900">
                  Akwaaba to the <br />
                  <span className="text-indigo-600">University</span>
                </h2>
                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                  You've secured your spot in Ghana's most competitive university. 
                  The next 21 days define your year. <strong>Arrive prepared.</strong>
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2rem] min-w-[260px] text-center shadow-xl shadow-indigo-100/50 border border-indigo-50">
                <p className="text-slate-400 text-xs uppercase font-black tracking-widest mb-2">Freshers Reporting</p>
                <div className="text-5xl font-black text-indigo-600 mb-2">Jan 5</div>
                <div className="text-base font-bold text-slate-500 mb-6">Monday, 2026</div>
                <button className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                   View Schedule <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard
              step="01"
              title="Fees & Admission"
              desc="Your admission is provisional until fees are paid."
              details={[
                "Print Admission Letter (Colour).",
                "Pay at GCB, Zenith, or Prudential.",
                "Quote Student ID (Not Ref No).",
                "Keep receipt safe for Hall entry."
              ]}
            />
            <ActionCard
              step="02"
              title="Portal Activation"
              desc="Your digital identity starts here."
              details={[
                "Wait 24-48 hrs after payment.",
                "Visit portal.ucc.edu.gh",
                "User: Registration Number",
                "Pass: Default Registration No."
              ]}
            />
          </div>
        </div>
      )
    },
    {
      title: "Packing Strategy",
      summary: "Sourced from official Adehye & Hall Council guides.",
      content: (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PackingList 
              title="Must Haves" 
              icon={<CheckCircle className="text-emerald-500" />} 
              items={["White Bed Sheets", "Pillow & Pail", "Formal Wear", "Raincoat"]} 
            />
            <PackingList 
              title="Prohibited" 
              icon={<AlertTriangle className="text-rose-500" />} 
              items={["Trunks", "Chop Boxes", "Mattresses", "Gas Cookers"]} 
            />
            <PackingList 
              title="Allowed" 
              icon={<Plug className="text-amber-500" />} 
              items={["Rice Cooker", "Electric Kettle", "Electric Iron", "Extension"]} 
            />
          </div>

          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-black text-indigo-900 text-xl mb-4 flex items-center gap-2">
                 <Truck size={20} /> Hall Traditions
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                UCC is famous for its hall culture. Expect <strong>"Processions"</strong> and <strong>"Morale"</strong> (singing and drumming) on Friday nights. 
                Casford and Adehye have a strong alliance.
              </p>
            </div>
            <div>
              <h4 className="font-black text-indigo-900 text-xl mb-4 flex items-center gap-2">
                 <Info size={20} /> Medical Exam Rule
              </h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                The Medical Exam is <strong>mandatory</strong>. You cannot graduate without clearing it. 
                It involves a Chest X-Ray, Lab Tests, and a Physical Exam. Go as early as 6:00 AM.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Dates",
      summary: "Academic calendar overview for Semester 1.",
      content: (
        <div className="space-y-8">
          <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 text-sm text-amber-900 font-medium">
             <p className="flex items-start gap-3">
                <AlertTriangle size={20} className="shrink-0" />
                <span><strong>IMPORTANT:</strong> Dates are subject to change by the university. Always check <strong>daa.ucc.edu.gh</strong> for the latest official Academic Calendar.</span>
             </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
             <div className="space-y-10 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                <TimelineEvent date="Jan 05" title="Freshers Report" desc="Arrival at Halls. Key collection starts early." />
                <TimelineEvent date="Jan 06" title="Orientation Begins" desc="Online Orientation and Registration begins. (Date subject to confirmation)." />
                <TimelineEvent date="Jan 12" title="Lectures Begin" desc="Classes usually start immediately, but depend on the Timetable release." />
                <TimelineEvent date="Feb 07" title="Matriculation" desc="Official swearing-in ceremony. Formal attire required." />
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                <h5 className="font-black text-indigo-900 mb-2 flex items-center gap-2"><User size={18} /> In Diaspora</h5>
                <p className="text-xs text-slate-600 leading-relaxed">You can attend orientation <strong>online</strong>. You do not strictly need to come to your Hall of Affiliation.</p>
             </div>
             <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                <h5 className="font-black text-indigo-900 mb-2 flex items-center gap-2"><MapPin size={18} /> In Hall</h5>
                <p className="text-xs text-slate-600 leading-relaxed">If you are physically in the Hall, it is <strong>mandatory to attend</strong> the sessions organized there.</p>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Welcome' },
    { id: 'steps', label: 'First Week' },
    { id: 'resources', label: 'Links' },
    { id: 'warnings', label: 'Alerts' },
  ];

  return { sections, tabs };
};

const TimelineEvent = ({ date, title, desc }) => (
  <div className="relative flex items-center group">
    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0 z-10 shadow-sm">
      <Calendar size={18} />
    </div>
    <div className="ml-8 p-6 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all w-full">
      <span className="font-black text-indigo-600 text-xl tracking-tighter">{date}</span>
      <h5 className="font-bold text-slate-800 mb-1">{title}</h5>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export default GettingStarted;