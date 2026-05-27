import React from 'react';
import { Bus, CreditCard, MapPin, Search, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Wallet, RefreshCw } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const Transportation = () => {
  // UCC GUIDE: SHUTTLE SERVICES & TRANSPORTATION (RESTORED GOLD EDITION 2025)

  const openGoogleMaps = (location) => {
    const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(location);
    let url;
    if (isCoordinates) {
      url = `https://www.google.com/maps/search/?api=1&query=${location}`;
    } else {
      const query = location.includes("Cape Coast") ? location : `${location} University of Cape Coast`;
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
    window.open(url, '_blank');
  };

  const sections = [
    {
      title: "Shuttle Services & Transport",
      summary: "Mastering the Shuttle Card system, Routes, and Campus Movement.",
      
      keyPoints: [
        "Shuttle Cards cost GHS 20.00 and are mandatory (No Cash).",
        "Fare is GHS 2.00, but GHS 4.00 is deducted on entry.",
        "You MUST tap out at the exit to get your GHS 2.00 refund.",
        "Old Site buses display 'Old site'.",
        "New Site buses display 'VALCO HALL' or 'VALCO'."
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Cashless Campus Movement"
            icon={Bus}
            content="The UCC shuttle service has ceased all ticket sales. You <strong>cannot use cash</strong> to board. You must purchase a one-time Shuttle Card and load it with credit for all campus movement."
          />

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <RefreshCw size={24} /> The "Tap-In / Tap-Out" Rule
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   The deduction system is unique. If you forget to tap out when exiting, you will be overcharged for your trip.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <FareTile label="Base Fare" amount="GHS 2.00" desc="Per trip cost." />
                   <FareTile label="Tap In (Entry)" amount="- GHS 4.00" desc="Initial deduction." color="text-rose-600" />
                   <FareTile label="Tap Out (Exit)" amount="+ GHS 2.00" desc="Instant refund." color="text-emerald-600" />
                </div>
                <div className="mt-8 bg-rose-50 p-6 rounded-3xl border border-rose-100">
                   <p className="text-xs text-rose-900 font-bold leading-relaxed flex items-center gap-2">
                      <ShieldAlert size={16} /> WARNING: If you forget to tap out, you lose the extra 2 cedis!
                   </p>
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ActionCard 
               title="Old Site Route" 
               desc="Display: 'OLD SITE'"
               details={[
                 "Oguaa Hall (Front)",
                 "Adehye Hall",
                 "Atlantic Hall",
                 "UCC Hospital"
               ]}
            />
            <ActionCard 
               title="New Site Route" 
               desc="Display: 'VALCO HALL'"
               details={[
                 "Valco Hall (Main)",
                 "Casely Hayford",
                 "Kwame Nkrumah",
                 "Science Market"
               ]}
            />
            <ActionCard 
               title="Diaspora Route" 
               desc="Display: 'SRC HALL'"
               details={[
                 "SRC Hall Residents",
                 "Superannuation",
                 "Kwaprow Area",
                 "Apewosika Access"
               ]}
            />
          </div>

          <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100">
             <h4 className="font-black text-amber-900 text-xl mb-3 flex items-center gap-2">
                <Info size={20} /> Pro Tip: Hospital Visits
             </h4>
             <p className="text-amber-800/70 text-sm font-medium leading-relaxed">
               For <strong>UCC Hospital</strong> visits, take the <strong>(Old Site)</strong> bus. It will stop at the hospital for you to alight before proceeding to the halls.
             </p>
          </div>
        </div>
      )
    }
  ];

  const buildings = [
    { id: "S1", fullName: "Science Shuttle Station", shortForm: "Main Hub", description: "Central pickup point for all buses.", url: "5.116807377906874, -1.2921375063551965" },
    { id: "S2", fullName: "Oguaa Hall Stop", shortForm: "Old Site Drop", description: "Main drop-off point for Old Site.", url: "Oguaa Hall" },
    { id: "S3", fullName: "Valco Hall Stop", shortForm: "New Site Drop", description: "Main drop-off for New Site.", url: "Valco Hall UCC" },
    { id: "S4", fullName: "SRC Hall Stop", shortForm: "SRC/Super Drop", description: "Drop-off for SRC & Superannuation.", url: "SRC Hall UCC" },
    { id: "S5", fullName: "UCC Hospital Stop", shortForm: "Clinic Drop", description: "Take the Old Site bus to stop here.", url: "University of Cape Coast Hospital" },
  ];
  const tabs = [
    { id: 'overview', label: 'Overview' },
  ];

  return { sections, tabs, buildings, openGoogleMaps };
};

const FareTile = ({ label, amount, desc, color = "text-slate-900" }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 text-center">
     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
     <div className={`text-xl font-black ${color}`}>{amount}</div>
     <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{desc}</div>
  </div>
);

export default Transportation;