import React from 'react';
import { Landmark, UserCheck, FileText, Users, CheckCircle, Info, ShieldAlert, History, Wallet } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const StudentLoanTrustFund = () => {
  // UCC GUIDE: STUDENT LOAN TRUST FUND (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Student Loan Trust Fund (SLTF)",
      summary: "How to apply for and manage student loans.",
      
      steps: [
        { title: "Check Eligibility Requirements", description: "Verify you meet all criteria including Ghanaian citizenship and admission status." },
        { title: "Gather Required Documents", description: "Prepare admission letter, student ID, birth certificate, and guarantor information." },
        { title: "Find Suitable Guarantors", description: "Identify reliable guarantors who meet SLTF requirements (employed with regular income)." },
        { title: "Complete Online Application", description: "Fill out the SLTF application form on the official portal with accurate information." },
        { title: "Submit Guarantor Forms", description: "Ensure your guarantors complete their forms and submit them with your application." },
        { title: "Wait for Approval", description: "Allow 4-6 weeks for processing. Check status regularly on the portal." },
        { title: "Sign Loan Agreement", description: "If approved, review and sign the loan agreement with full understanding of terms." }
      ],
      commonMistakes: [
        "Providing incomplete or inaccurate information on the application.",
        "Choosing guarantors who don't meet the required criteria.",
        "Not understanding the repayment terms before signing.",
        "Applying late when funds have been depleted.",
        "Failing to keep copies of all submitted documents."
      ],
      consequences: "Defaulting on loan repayment will affect your credit score and ability to access future financial services. Legal action may be taken against defaulters.",
      resources: [
        { title: "SLTF Official Portal", description: "Apply for student loan and check status.", url: "https://www.sltf.gov.gh" },
        { title: "FAQs and Support", description: "Common questions and contact info.", url: "https://www.sltf.gov.gh/contact-us/" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Financial Support"
            icon={Landmark}
            content="The Student Loan Trust Fund (SLTF) is a government initiative providing financial assistance to Ghanaian students. <strong>Understanding the application process and repayment terms is crucial before committing to this financial obligation.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Loan Features" 
               desc="Key advantages of the SLTF program."
               details={[
                 "<strong>Subsidized Interest</strong>: 12% annual rate.",
                 "<strong>Deferred Repayment</strong>: Starts post-study.",
                 "<strong>Coverage</strong>: Tuition, living, and housing.",
                 "<strong>Academic Grade</strong>: Must stay in good standing."
               ]}
            />
            <ActionCard 
               title="Eligibility" 
               desc="Who qualifies for the loan."
               details={[
                 "<strong>Ghanaian Citizen</strong>: Valid Ghana Card required.",
                 "<strong>Admitted Student</strong>: Accredited program.",
                 "<strong>Financial Need</strong>: Assessed during review.",
                 "<strong>Accreditation</strong>: Institution must be approved."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <History size={24} /> Repayment Terms
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                   Loan repayment is designed to be manageable once you enter the workforce. It is a shared responsibility to ensure the fund remains sustainable.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
                      <h5 className="font-black text-primary-700 mb-2 uppercase tracking-wider text-[10px]">Grace Period</h5>
                      <p className="text-2xl font-black text-slate-900">12 Months</p>
                      <p className="text-xs text-slate-500 font-medium">Starts after completion/NYSC.</p>
                   </div>
                   <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
                      <h5 className="font-black text-primary-700 mb-2 uppercase tracking-wider text-[10px]">Interest Rate</h5>
                      <p className="text-2xl font-black text-slate-900">12% Annually</p>
                      <p className="text-xs text-slate-500 font-medium">Subsidized by the government.</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-4">
            <h3 className="font-black text-gray-900 text-2xl mb-8 flex items-center">
              <span className="bg-primary-50 text-primary-600 w-10 h-10 rounded-xl flex items-center justify-center text-sm mr-4 shadow-sm">i</span>
              Application Process
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <AppTile step="01" title="Check Eligibility" text="Verify you meet all criteria including citizenship and admission." />
               <AppTile step="02" title="Gather Docs" text="Prepare admission letter, student ID, and guarantor info." />
               <AppTile step="03" title="Guarantors" text="Identify reliable guarantors with stable employment and regular income." />
               <AppTile step="04" title="Online Form" text="Fill out the SLTF application accurately on the official portal." />
               <AppTile step="05" title="Sign & Submit" text="Sign the loan agreement once approved after a 4-6 week review." />
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
    { id: 'warnings', label: 'Warnings' },
  ];

  return { sections, tabs };
};

const AppTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-2">
      <h5 className="font-black text-slate-900 text-lg leading-tight">{title}</h5>
      <span className="text-3xl font-black text-primary-50 group-hover:text-primary-100 transition-colors">{step}</span>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed font-medium">{text}</p>
  </div>
);

export default StudentLoanTrustFund;