import React from 'react';
import { Phone, Shield, ShieldAlert, PhoneCall, CheckCircle, Info, History, Users, ArrowRight, Laptop, MessageSquare, Flame } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const ContactDirectory = () => {
  // UCC GUIDE: CONTACT DIRECTORY (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Emergency & Essential Contacts",
      summary: "Save these numbers. They are your lifeline on campus.",
      
      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Lifeline of the Campus"
            icon={PhoneCall}
            content="In case of any emergency on campus (theft, fire, medical), call the <strong>UCC Emergency Line</strong> or <strong>Campus Security</strong> immediately. Do not rely solely on 191/192/193 as campus response is often significantly faster."
          />

          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="text-2xl font-black mb-6 flex items-center gap-2">
                   <Shield size={24} className="text-indigo-400" /> UCC Security Service
                </h4>
                <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-8 max-w-md">
                   24/7 Campus Patrol. These numbers are monitored by the main security gate and rapid response units.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                   <EmergencyTile number="054 728 4666" label="Patrol Unit 1" />
                   <EmergencyTile number="055 585 0886" label="Patrol Unit 2" />
                   <EmergencyTile number="024 420 6070" label="Main Desk" />
                   <EmergencyTile number="024 521 9107" label="Emergency" />
                </div>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-6 flex items-center gap-2">
               <Users size={24} className="text-indigo-600" /> SRC Support Team
            </h3>
            <p className="text-slate-500 text-xs font-medium mb-8 leading-relaxed">
               For student welfare issues, academic complaints, or on-campus disputes, reach out to your designated SRC representatives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <ContactBox name="Frank" number="020 054 2620" />
               <ContactBox name="Gideon" number="055 295 2642" />
               <ContactBox name="Theophilus" number="024 670 9816" />
               <ContactBox name="Bright" number="054 656 3286" />
               <ContactBox name="Shadrack" number="059 139 2402" />
               <ContactBox name="Felix" number="024 827 0224" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Emergency' },
  ];

  return { sections, tabs };
};

const EmergencyTile = ({ number, label }) => (
  <a 
    href={`tel:${number.replace(/\s/g, '')}`}
    className="bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl border border-white/10 transition-all text-center"
  >
     <div className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">{label}</div>
     <div className="text-sm font-black text-white">{number}</div>
  </a>
);

const ContactBox = ({ name, number }) => (
  <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex justify-between items-center group">
     <div>
        <div className="text-sm font-black text-slate-900">{name}</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase">SRC Representative</div>
     </div>
     <a 
       href={`tel:${number.replace(/\s/g, '')}`}
       className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all"
     >
        <Phone size={16} />
     </a>
  </div>
);

export default ContactDirectory;