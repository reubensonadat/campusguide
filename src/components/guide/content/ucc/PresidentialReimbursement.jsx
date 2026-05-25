import React from 'react';
import { Landmark, Banknote, Calendar, CreditCard, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Laptop, Award } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const PresidentialReimbursement = () => {
  // UCC GUIDE: PRESIDENTIAL REIMBURSEMENT (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Presidential Reimbursement",
      summary: "A guide to applying for the government fee reimbursement for first-year students.",
      
      steps: [
        { title: "Pay Initial Fees", description: "Ensure all admission and first-semester fees are paid in full via official channels. Keep original receipts." },
        { title: "Verify Bank Account", description: "You must have an active bank account in your name for direct deposit. Verify details carefully." },
        { title: "Wait for Announcement", description: "Look for official announcements during the 2nd semester (Feb-March)." },
        { title: "Download Official Form", description: "Obtain the form from the Student Affairs Office or the official university website." },
        { title: "Gather Documentation", description: "Prepare original fee receipts, admission letter, Ghana Card, and passport photos." },
        { title: "Complete & Submit", description: "Fill out the form accurately and submit to the designated office before the deadline." },
        { title: "Track Status", description: "Check application status regularly. Processing typically takes 4-8 weeks." }
      ],
      keyPoints: [
        "Available to first-year students in public universities only.",
        "Reimburses admission fees and part of first-semester fees.",
        "Amount varies by program (GH₵ 1,000 - GH₵ 2,000).",
        "Direct deposit to student's personal bank account."
      ],
      tips: [
        "Make photocopies of all original documents before submission.",
        "Submit as early as possible; do not wait for the deadline.",
        "Ensure your bank account is active and matches your admission name.",
        "Join official university WhatsApp groups for timely updates."
      ],
      commonMistakes: [
        "Submitting with incorrect or incomplete information.",
        "Using photocopies of receipts instead of originals.",
        "Missing the application deadline (strictly enforced).",
        "Losing original receipts before the application period opens."
      ],
      checklist: [
        { text: "Pay all required fees in full", checked: false },
        { text: "Keep original fee receipts safe", checked: false },
        { text: "Verify bank account activity", checked: false },
        { text: "Download official application form", checked: false }
      ],
      resources: [
        { title: "Reimbursement Guidelines", description: "Complete eligibility requirements.", url: "https://ucc.edu.gh/presidential-reimbursement" },
        { title: "Finance Office Contact", description: "For reimbursement inquiries.", url: "https://ucc.edu.gh/finance-contacts" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Financial Support"
            icon={Landmark}
            content="The Presidential Reimbursement is a flagship initiative designed to ease the financial burden on first-year students. It reimburses admission and first-semester fees for eligible regular students. <strong>This is a one-time benefit per student.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Program Scope" 
               desc="Government-funded financial assistance."
               details={[
                 "<strong>Amount</strong>: GH₵ 1,000 - 2,000.",
                 "<strong>Eligibility</strong>: Ghanaian Regular Freshers.",
                 "<strong>Payment</strong>: Direct Bank Deposit.",
                 "<strong>Timeline</strong>: 2nd Semester Window."
               ]}
            />
            <ActionCard 
               title="Mandatory Docs" 
               desc="Paperwork required for validation."
               details={[
                 "<strong>Original Receipts</strong>: No photocopies.",
                 "<strong>Admission Letter</strong>: Proof of status.",
                 "<strong>ID Card</strong>: Ghana Card or Birth Cert.",
                 "<strong>Bank Details</strong>: Active personal account."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-6 flex items-center gap-2">
                   <Banknote size={24} /> Amount Breakdown (Estimated)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <AmountTile category="Science" amount="GH₵ 2,000" desc="Medicine, Eng, Sciences." />
                   <AmountTile category="Professional" amount="GH₵ 1,500" desc="Business, Law, Edu." />
                   <AmountTile category="Arts" amount="GH₵ 1,000" desc="Arts, Social Sciences." />
                </div>
                <div className="mt-8 bg-amber-50 p-6 rounded-3xl border border-amber-100">
                   <p className="text-xs text-amber-900 font-bold leading-relaxed flex items-center gap-2">
                      <ShieldAlert size={16} /> IMPORTANT: Processing takes 4-8 weeks. Ensure your bank account remains active throughout.
                   </p>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Application Process' },
    { id: 'resources', label: 'Links' },
    { id: 'warnings', label: 'Mistakes' },
  ];

  return { sections, tabs };
};

const AmountTile = ({ category, amount, desc }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{category}</div>
     <div className="text-2xl font-black text-primary-600">{amount}</div>
     <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{desc}</div>
  </div>
);

export default PresidentialReimbursement;