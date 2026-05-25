import React from 'react';
import { MapPin, Search, CreditCard, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight } from 'lucide-react';
import { CustomHome } from '../../../common/CustomIcons';

import { ActionCard, InfoBlock } from '../../GuideStyles';

const Accommodation = () => {
  // UCC GUIDE: ACCOMMODATION (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "On-Campus Residence",
      summary: "Halls, Portal Booking, and the 'In-Out-Out-Out' Policy.",
      
      steps: [
        { title: "Wait for Admission Letter", description: "You cannot apply without the Student ID and Reference Number on your official letter." },
        { title: "Monitor Portal Opening", description: "The portal (portal.ucc.edu.gh) usually opens for booking at 10:00 AM on a specific date. Be ready 15 mins early." },
        { title: "Select Hall & Room", description: "Log in and navigate to 'Accommodation'. Selection is 'First-Come, First-Served'. Casford/Adehye fill instantly." },
        { title: "Print & Pay Immediately", description: "Print the booking invoice and pay at approved banks (GCB, Zenith, Prudential) to lock it in." },
        { title: "Finalize Booking", description: "Log back in to confirm the payment has reflected and print your Residential Undertaking Form." }
      ],
      keyPoints: [
        "Freshers are prioritized for halls (In-Out-Out-Out Policy).",
        "Your residency environment directly impacts your GPA.",
        "On-campus rooms disappear in seconds; timing is everything."
      ],
      resources: [
        { title: "UCC Student Portal", description: "The official platform for room booking.", url: "https://portal.ucc.edu.gh" },
        { title: "Student Handbook", description: "Rules on residency and conduct.", url: "https://ucc.edu.gh/student-handbook" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Collegiate System"
            icon={CustomHome}
            content="UCC operates a collegiate system where every student is affiliated with a Hall of Residence. Due to the <strong>'In-Out-Out-Out'</strong> policy, freshers are prioritized for on-campus rooms while continuing students usually move to the Diaspora."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Old Site (Southern)" 
               desc="Traditional halls near Administration."
               details={[
                 "<strong>Oguaa Hall</strong>: Mixed gender campus icon.",
                 "<strong>Atlantic Hall</strong>: Known as the 'Mariners'.",
                 "<strong>Adehye Hall</strong>: Exclusive for females.",
                 "<strong>Access</strong>: Close to Sam Jonah Library."
               ]}
            />
            <ActionCard 
               title="New Site (Northern)" 
               desc="Modern halls near the Science Faculty."
               details={[
                 "<strong>Casely Hayford</strong>: Exclusive for males.",
                 "<strong>Valco Hall</strong>: Mixed residency options.",
                 "<strong>Kwame Nkrumah</strong>: Modern mixed hall.",
                 "<strong>Access</strong>: Near Science Market & LT."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Users size={24} /> Application Realities
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   On-campus accommodation is extremely competitive. Successful booking requires 'fast fingers' and immediate payment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <StepBox step="01" title="Fast Fingers" text="Rooms in Casford and Adehye fill up within 60 seconds of portal opening." />
                   <StepBox step="02" title="Bank Invoice" text="Payment must be made within 24 hours of booking or the bed is released." />
                   <StepBox step="03" title="Undertaking" text="The Residential Undertaking Form is your legal proof of occupancy." />
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "Off-Campus (Diaspora)",
      summary: "Renting in Amamoma, Ayensu, Kwaprow, and Apewosika.",
      
      steps: [
        { title: "Physical Inspection", description: "Visit the hostel in person. Check water flow, ventilation, and security personally." },
        { title: "Verify Ownership", description: "Ensure you are paying the actual landlord or caretaker. Avoid 'agents' without official ID." },
        { title: "Sign Tenancy Agreement", description: "Read the rules regarding visitors, utilities (ECG), and refund policies before signing." },
        { title: "Make Payment", description: "Pay via bank deposit if possible to have a paper trail. Avoid cash without receipts." }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="The Diaspora communities"
            icon={MapPin}
            content="Continuing students move to private hostels in the communities surrounding the university. Your choice of community depends on where your primary lecture theatres are located."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Amamoma & Road" 
               desc="Strategic for Arts and Social Sciences."
               details={[
                 "Closest to LLT and Sam Jonah Library.",
                 "Very lively atmosphere with food spots.",
                 "Rent is usually at a premium.",
                 "High demand area."
               ]}
            />
            <ActionCard 
               title="Kwaprow & Ayensu" 
               desc="Strategic for Science and Sandwich."
               details={[
                 "Near SWLT (Sandwich Lecture Theatre).",
                 "Generally more affordable housing.",
                 "Quieter study environment.",
                 "Growing selection of modern hostels."
               ]}
            />
          </div>

          <div className="bg-primary-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
             <div className="relative space-y-8">
                <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-white/10 pb-8">
                   <div>
                      <h4 className="text-3xl font-black tracking-tight">The "Golden Window" Rule</h4>
                      <p className="text-primary-300 font-medium">To live a happy life in Level 200, you must start looking early.</p>
                   </div>
                   <div className="bg-emerald-500 text-white px-6 py-2 rounded-2xl flex items-center gap-2 font-black text-sm uppercase">
                      End of Sem 2 <ArrowRight size={16} />
                   </div>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                   <div>
                      <h5 className="text-primary-400 font-black text-xs uppercase mb-4 tracking-widest">Why Start Early?</h5>
                      <ul className="space-y-4">
                         <li className="flex gap-3 text-sm font-medium">
                            <CheckCircle className="text-emerald-400 shrink-0" size={18} />
                            <span>Better Prices: Secure rooms before the demand spikes prices.</span>
                         </li>
                         <li className="flex gap-3 text-sm font-medium">
                            <CheckCircle className="text-emerald-400 shrink-0" size={18} />
                            <span>Prime Locations: Get the best spots closer to campus facilities.</span>
                         </li>
                      </ul>
                   </div>
                   <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                      <h5 className="text-rose-400 font-black text-xs uppercase mb-4 tracking-widest">SRC Initiative Note</h5>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                         While SRC directories and sites like <strong>CapeVars.com</strong> are helpful, it is always better to physically inspect and verify ownership before any payment.
                      </p>
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
    { id: 'steps', label: 'Action Plan' },
    { id: 'resources', label: 'Links' },
  ];

  return { sections, tabs };
};

const StepBox = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">Step {step}</div>
     <h5 className="font-black text-slate-900 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
  </div>
);

export default Accommodation;