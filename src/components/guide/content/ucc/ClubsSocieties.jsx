import React from 'react';
import { Users, Heart, Trophy, Globe, CheckCircle, Info, ShieldAlert, History, ArrowRight, Star } from 'lucide-react';
import { CustomGuide } from '../../../common/CustomIcons';

import { ActionCard, InfoBlock } from '../../GuideStyles';

const ClubsSocieties = () => {
  // UCC GUIDE: CLUBS & SOCIETIES (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Student Life & Associations",
      summary: "Find your tribe: Religious, Academic, and Interest-based groups.",
      
      steps: [
        { title: "Attend Orientation Fair", description: "During Freshers' Week, all clubs set up stands at the Casford/Science field." },
        { title: "Pay Departmental Dues", description: "Locate your department's association office. Payment is often required for souvenirs." },
        { title: "Join a Religious Family", description: "Attend the first Sunday Joint Service to see all denominations introduce themselves." },
        { title: "Register & Get Inducted", description: "Fill out membership forms. Most groups hold an 'Induction Service' in the first month." }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Beyond the Lecture Hall"
            icon={Users}
            content="UCC life is not just about lectures. Joining an association is the fastest way to network, build leadership skills, and find a support system. Most students belong to their <strong>Hall</strong>, <strong>Department</strong>, and a <strong>Religious Group</strong>."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Religious Groups" 
               desc="The most active spiritual communities."
               details={[
                 "<strong>GHAMSU</strong>: Methodist Students Union.",
                 "<strong>PENSA</strong>: Pentecost Students Association.",
                 "<strong>NUPS-G</strong>: Presbyterian Students Group.",
                 "<strong>GMSA</strong>: Ghana Muslim Students Association.",
                 "<strong>PAX Romana</strong>: Catholic Students Union."
               ]}
            />
            <ActionCard 
               title="Academic / Departmental" 
               desc="Professional networking & support."
               details={[
                 "<strong>UCCABS</strong>: Business Students Union.",
                 "<strong>LSA</strong>: Law Students Union.",
                 "<strong>SCISA</strong>: Science Students Association.",
                 "<strong>EDSA</strong>: Education Students Association.",
                 "<strong>ASSOS</strong>: Social Sciences Society."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Star size={24} /> Interest & Advocacy
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   Expand your horizon with global advocacy and prestigious skill-based clubs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <InterestTile title="Debate Society" text="Prestigious public speaking & logic club." />
                   <InterestTile title="AIESEC" text="Global leadership and internship exchange." />
                   <InterestTile title="UCC Cadets" text="Military discipline & ceremonial drill corps." />
                </div>
             </div>
          </div>

          <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100">
             <h4 className="font-black text-rose-900 text-xl mb-4 flex items-center gap-2">
                <Trophy size={20} /> Competitive Sports Teams
             </h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SportTag team="Spartans" sport="Rugby" />
                <SportTag team="Wildcats" sport="Basketball" />
                <SportTag team="Ogualaa FC" sport="Football" />
                <SportTag team="UCC Track" sport="Athletics" />
             </div>
          </div>
        </div>
      )
    }
  ];
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Steps' },
  ];

  return { sections, tabs };
};

const InterestTile = ({ title, text }) => (
  <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
     <h5 className="font-black text-primary-700 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 font-medium leading-relaxed">{text}</p>
  </div>
);

const SportTag = ({ team, sport }) => (
  <div className="bg-white p-4 rounded-3xl border border-rose-100 text-center shadow-sm">
     <div className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1">{sport}</div>
     <div className="text-xs font-black text-slate-900">{team}</div>
  </div>
);

export default ClubsSocieties;