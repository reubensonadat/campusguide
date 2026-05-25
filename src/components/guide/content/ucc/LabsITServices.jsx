import React from 'react';
import { Monitor, Cpu, Printer, HelpCircle, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Laptop, Save } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const LabsITServices = () => {
  // UCC GUIDE: LABS & IT SERVICES (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Computer Labs & IT Support",
      summary: "Access computer facilities and get technical help.",
      
      steps: [
        { title: "Locate a Computer Lab", description: "Find the nearest lab using the campus map. Major labs are in the Library and Science Block." },
        { title: "Log In with Student Credentials", description: "Use your official Student ID and portal password to log in to any lab computer." },
        { title: "Connect to Wi-Fi", description: "Connect personal devices to 'Eduroam' or 'UCC-Wi-Fi' using your student credentials." },
        { title: "Use Lab Services", description: "Utilize specialized software for research and use the 'Pay & Print' service for documents." },
        { title: "Save Your Work Properly", description: "Always save work to a USB drive or cloud. Local computer drives are wiped on restart." },
        { title: "Report Technical Issues", description: "Report hardware or software problems immediately to the lab assistant." }
      ],
      keyPoints: [
        "Computer labs available in every faculty building",
        "IT support center at the main library",
        "Free Wi-Fi across campus",
        "Printing services available in all major labs",
        "Software provided for student use"
      ],
      tips: [
        "Save work frequently to avoid loss during power flickers",
        "Bring a USB drive for offline backup",
        "Check lab opening hours before visiting during exam weeks",
        "Report technical issues immediately to the IT help desk"
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Tech Infrastructure"
            icon={Monitor}
            content="UCC provides extensive computer labs and IT services to support your academic work. Your student credentials are your universal key to accessing these high-performance resources."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Computer Labs" 
               desc="Well-equipped facilities across campus."
               details={[
                 "<strong>Faculty Labs</strong>: Specialized research software.",
                 "<strong>Main Library Lab</strong>: The largest central lab.",
                 "<strong>Printing Services</strong>: Fast 'Pay & Print' protocol.",
                 "<strong>Connectivity</strong>: Gigabyte-speed ethernet."
               ]}
            />
            <ActionCard 
               title="IT Support" 
               desc="Technical help and network assistance."
               details={[
                 "<strong>Support Center</strong>: Main Library (Ground Floor).",
                 "<strong>Portal Help</strong>: Fix registration & login issues.",
                 "<strong>Eduroam</strong>: Setup for laptops and mobiles.",
                 "<strong>Ticketing</strong>: Online support request system."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Save size={24} /> Critical Data Rule
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                   All lab computers use a 'Deep Freeze' system. Anything you save to the computer's hard drive will be <strong>permanently deleted</strong> the moment the machine restarts or loses power.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
                      <h5 className="font-black text-primary-700 mb-2 uppercase tracking-wider text-[10px]">Cloud Storage</h5>
                      <p className="text-sm text-slate-600 font-medium">Use your 50GB OneDrive storage via your student email to keep files synced across devices.</p>
                   </div>
                   <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
                      <h5 className="font-black text-primary-700 mb-2 uppercase tracking-wider text-[10px]">USB Backup</h5>
                      <p className="text-sm text-slate-600 font-medium">Always carry a USB flash drive for local backups during project work in the labs.</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-4">
            <h3 className="font-black text-gray-900 text-2xl mb-8 flex items-center">
              <span className="bg-primary-50 text-primary-600 w-10 h-10 rounded-xl flex items-center justify-center text-sm mr-4 shadow-sm">i</span>
              Getting Started
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <LabTile step="01" title="Find a Lab" text="Check the Science block or the Main Library for accessible labs." />
               <LabTile step="02" title="Auth & Log In" text="Use your Student ID and portal password to unlock any machine." />
               <LabTile step="03" title="Work & Print" text="Use specialized software and the Pay & Print service for work." />
               <LabTile step="04" title="External Save" text="Move all files to USB or Cloud before logging out." />
               <LabTile step="05" title="Support" text="Visit the Help Desk at the Library for any hardware issues." />
            </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' }
  ];

  return { sections, tabs };
};

const LabTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-2">
      <h5 className="font-black text-slate-900 text-lg leading-tight">{title}</h5>
      <span className="text-3xl font-black text-primary-50 group-hover:text-primary-100 transition-colors">{step}</span>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed font-medium">{text}</p>
  </div>
);

export default LabsITServices;