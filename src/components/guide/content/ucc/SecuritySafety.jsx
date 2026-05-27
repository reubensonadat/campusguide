import React from 'react';
import { Shield, ShieldAlert, PhoneCall, Eye, Lock, CheckCircle, Info, History, Users, ArrowRight, Camera } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const SecuritySafety = () => {
  // UCC GUIDE: CAMPUS SECURITY & SAFETY (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Campus Security & Safety",
      summary: "Staying safe on and around campus.",
      
      steps: [
        { title: "Save Emergency Numbers", description: "Program campus security and local emergency numbers into your phone immediately." },
        { title: "Know Security Locations", description: "Identify the main security office, nearest emergency call boxes, and hall security posts." },
        { title: "Plan Your Routes", description: "Familiarize yourself with well-lit paths and safe routes between buildings for night travel." },
        { title: "Secure Your Belongings", description: "Always lock your room and secure valuables. Use padlocks for lockers and cabinets." },
        { title: "Travel Safely", description: "Avoid walking alone at night. Use campus shuttle services or travel in groups." },
        { title: "Report Concerns", description: "Report any suspicious activities or security concerns immediately to campus security." }
      ],
      keyPoints: [
        "24/7 security patrol on campus and in halls",
        "Emergency call boxes at strategic locations",
        "Main security office located at university entrance",
        "CCTV coverage in key areas (Libraries, LTs)"
      ],
      tips: [
        "Always lock your door, even for brief absences",
        "Don't walk alone at night in isolated areas",
        "Report suspicious activities immediately",
        "Participate in safety drills"
      ],
      resources: [
        { title: "Security Office Location", description: "Find main security office", url: "https://maps.google.com/?q=UCC+Security+Office+Cape+Coast" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Guardian of the Campus"
            icon={Shield}
            content="Your safety is a top priority at UCC. The university has implemented comprehensive security measures to protect students, staff, and property. <strong>Always report suspicious activities and keep emergency contacts readily available.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Security Team" 
               desc="Trained professionals on 24/7 duty."
               details={[
                 "<strong>Patrols</strong>: Mobile units across campus.",
                 "<strong>Main Office</strong>: Located at the East Gate.",
                 "<strong>Hall Security</strong>: Stationed at all hall entries.",
                 "<strong>Rapid Response</strong>: Dedicated emergency squad."
               ]}
            />
            <ActionCard 
               title="Infrastructure" 
               desc="Technology and safety facilities."
               details={[
                 "<strong>Call Boxes</strong>: Instant links to security.",
                 "<strong>CCTV</strong>: Monitored 24/7 in key areas.",
                 "<strong>Lighting</strong>: Continuous street light audits.",
                 "<strong>Fire Safety</strong>: Extinguishers in every hall."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Lock size={24} /> Personal Safety Guide
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   Campus safety is a shared responsibility. Following these core protocols significantly reduces your risk profile.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <SafetyBox step="01" title="Room Lock" text="Always lock your door, even if you are just 'stepping out' for a second." />
                   <SafetyBox step="02" title="Night Buddy" text="Avoid walking alone after dark. Travel in groups of three or more." />
                   <SafetyBox step="03" title="Vigilance" text="Be aware of your surroundings; avoid noise-canceling headphones while walking." />
                </div>
             </div>
          </div>

          <div className="bg-rose-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
             <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="bg-white/10 p-6 rounded-full border border-white/20">
                   <PhoneCall size={40} className="text-white" />
                </div>
                <div>
                   <h4 className="text-2xl font-black mb-2">Emergency Contacts</h4>
                   <p className="text-rose-100 text-xs font-medium leading-relaxed mb-4 max-w-md">
                      In case of theft, fire, or physical threat, immediately contact the Main Security Desk or use the nearest Emergency Call Box.
                   </p>
                   <div className="inline-flex bg-white text-rose-900 px-6 py-2 rounded-2xl font-black text-sm uppercase shadow-sm">
                      Main Desk: 03321 32482
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Steps' },
    { id: 'resources', label: 'Resources' },
  ];

  return { sections, tabs };
};

const SafetyBox = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">Rule {step}</div>
     <h5 className="font-black text-slate-900 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
  </div>
);

export default SecuritySafety;