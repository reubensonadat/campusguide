import React from 'react';
import { Laptop, Cpu, HardDrive, Zap, DollarSign, Shield, CreditCard, ExternalLink, Sparkles, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Laptop2 } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const LaptopBuyingGuide = () => {
  // UCC GUIDE: LAPTOP BUYING GUIDE (PLATINUM EDITION 2025)

  const sections = [
    {
      title: "Your Academic Powerhouse",
      summary: "Choosing the perfect laptop for your UCC journey.",
      
      steps: [
        { title: "Check Department Requirements", description: "Some departments have specific software requirements (e.g. AutoCAD) that need higher specs." },
        { title: "Set Your Budget", description: "Account for accessories like a protective case, external mouse, and extended warranty." },
        { title: "Research Options", description: "Compare specifications, prices, and reviews. Consider both new and certified refurbished options." },
        { title: "Verify Student Discounts", description: "Check for available student discounts. Use your UCC student email for verification." },
        { title: "Check Warranty & Support", description: "Ensure at least a 1-year warranty. Verify authorized service centers in Cape Coast." },
        { title: "Test Before Buying", description: "If possible, test the keyboard, trackpad, and screen before purchasing." }
      ],
      commonMistakes: [
        "Buying a laptop with insufficient RAM (4GB is not enough for modern applications)",
        "Choosing a model with poor battery life (you'll spend time searching for outlets on campus)",
        "Ignoring keyboard and trackpad quality (you'll be typing a lot)",
        "Buying from unauthorized dealers (warranty may not be honored)"
      ],
      checklist: [
        { text: "Checked department-specific requirements", checked: false },
        { text: "Set realistic budget", checked: false },
        { text: "Researched at least 3 options", checked: false },
        { text: "Verified student discounts", checked: false }
      ],
      resources: [
        { title: "LaptopConnect.shop", description: "Special discounts for UCC students.", url: "https://www.laptopconnect.shop/" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Digital Academic Companion"
            icon={Laptop}
            content="A reliable laptop is not just a tool—it's your gateway to academic success at UCC. Make an informed choice that will serve you throughout your 4-year program without needing constant repairs."
          />

          <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-wider text-indigo-200 mb-4">
                      <Sparkles size={12} /> Platinum Recommendation
                   </div>
                   <h4 className="text-3xl font-black mb-4">The Golden Spec</h4>
                   <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-6">
                      For 90% of students, these specifications provide the best balance of longevity and performance.
                   </p>
                   <div className="flex flex-wrap gap-4">
                      <SpecBadge icon={<Cpu size={14} />} text="i5 / Ryzen 5" />
                      <SpecBadge icon={<Zap size={14} />} text="8GB RAM Min" />
                      <SpecBadge icon={<HardDrive size={14} />} text="256GB SSD" />
                   </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] text-center w-full md:w-auto">
                   <div className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">Performance Score</div>
                   <div className="text-5xl font-black text-white">8.5</div>
                   <div className="text-[10px] font-bold text-indigo-200 mt-2 uppercase">UCC Ready</div>
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ActionCard 
               title="Business & Arts" 
               desc="Portability & Battery focus."
               details={[
                 "<strong>RAM</strong>: 8GB - 16GB.",
                 "<strong>Storage</strong>: 256GB SSD.",
                 "<strong>Battery</strong>: 8+ Hours.",
                 "<strong>Weight</strong>: < 1.5kg."
               ]}
            />
            <ActionCard 
               title="Science & Eng." 
               desc="Processing & Graphics focus."
               details={[
                 "<strong>RAM</strong>: 16GB Minimum.",
                 "<strong>Storage</strong>: 512GB SSD.",
                 "<strong>Graphics</strong>: Dedicated GPU.",
                 "<strong>Display</strong>: 15.6 inch."
               ]}
            />
            <ActionCard 
               title="Budget Options" 
               desc="Premium refurbished laptops."
               details={[
                 "<strong>Dell Latitude</strong>: Business grade.",
                 "<strong>HP ProBook</strong>: Reliable build.",
                 "<strong>ThinkPad</strong>: Best keyboards.",
                 "<strong>MacBook Air</strong>: Used M1/M2."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-indigo-900 text-xl mb-4 flex items-center gap-2">
                   <CreditCard size={24} /> Student Discounts
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <DiscountCard brand="Apple Education" offer="Up to 10% off with ID." />
                   <DiscountCard brand="Microsoft Office" offer="Free with UCC email." />
                   <DiscountCard brand="Dell University" offer="Special partnership rates." />
                   <DiscountCard brand="HP Student" offer="Up to 15% season discounts." />
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide' },
    { id: 'resources', label: 'Links' },
    { id: 'warnings', label: 'Common Mistakes' },
  ];

  return { sections, tabs };
};

const SpecBadge = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-xs font-black">
     {icon} {text}
  </div>
);

const DiscountCard = ({ brand, offer }) => (
  <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
     <h5 className="font-black text-indigo-700 mb-1">{brand}</h5>
     <p className="text-xs text-slate-500 font-medium">{offer}</p>
  </div>
);

export default LaptopBuyingGuide;