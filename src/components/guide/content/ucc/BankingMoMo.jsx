import React from 'react';
import { Landmark, Smartphone, ShieldAlert, CreditCard, ArrowRight, Info, CheckCircle, Globe, MapPin } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const BankingMoMo = () => {
  // UCC GUIDE: BANKING & MOBILE MONEY (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Banking & Finance",
      summary: "Campus Bank Locations, ATMs, and how to pay fees without issues.",
      
      commonMistakes: [
        "Paying school fees via standard Mobile Money transfer (It won't reflect on the portal).",
        "Giving your ATM pin to roommates to withdraw cash for you.",
        "Ignoring SMS alerts for withdrawals you didn't make.",
        "Paying fees without quoting your Registration Number / Student ID."
      ],
      consequences: "If you pay fees using the wrong method (e.g., direct deposit instead of Transflow), you will have to manually chase the Finance Office to update your portal, which can delay your registration by weeks.",

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Financial Hub"
            icon={Landmark}
            content="UCC has a robust financial ecosystem. Most major banks are located at the <strong>New Site (Science)</strong>, specifically around the Taxi Rank and Market area. <strong>GCB Bank</strong> is the primary bank serving the Old Site campus."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Old Site (Southern)" 
               desc="Administrative & Arts center banking."
               details={[
                 "<strong>GCB Bank</strong>: Main branch near Admin.",
                 "<strong>Ghana Post</strong>: Items & remittances.",
                 "<strong>ATM</strong>: GCB (24/7 Access).",
                 "<strong>Location</strong>: Old Site Taxi Rank area."
               ]}
            />
            <ActionCard 
               title="New Site (Science)" 
               desc="The central financial hub (Science Market)."
               details={[
                 "<strong>Prudential Bank</strong>: Near Taxi Rank.",
                 "<strong>Zenith Bank</strong>: Science Market area.",
                 "<strong>Fidelity Bank</strong>: Behind Science Faculty.",
                 "<strong>ADB</strong>: Science Market (Main)."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Smartphone size={24} /> Paying School Fees
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   Do not just "transfer" money. You must use the correct platform so the portal updates automatically. Direct Mobile Money transfers to bank accounts will <strong>NOT</strong> reflect.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <PlatformTile bank="Prudential & ADB" platform="Transflow" />
                   <PlatformTile bank="GCB Bank" platform="Smartpay" />
                   <PlatformTile bank="Zenith Bank" platform="Xpath" />
                </div>
                <div className="mt-8 bg-amber-50 p-6 rounded-3xl border border-amber-100">
                   <p className="text-xs text-amber-900 font-bold leading-relaxed">
                      <strong>Security Tip:</strong> UCC staff will NEVER call you to ask for your Mobile Money OTP or ATM Pin for fee processing. Report any suspicious calls to campus security.
                   </p>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'warnings', label: 'Safety' },
  ];

  return { sections, tabs };
};

const PlatformTile = ({ bank, platform }) => (
  <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100 text-center">
     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{bank}</div>
     <div className="text-xl font-black text-primary-600">{platform}</div>
  </div>
);

export default BankingMoMo;