import React from 'react';
import { CreditCard, Wallet, Landmark, Smartphone, CheckCircle, Info, ShieldAlert, History } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const PaymentsReceipts = () => {
  // UCC GUIDE: PAYMENTS & RECEIPTS (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Fee Payments & Receipts",
      summary: "Making payments and keeping proper records.",
      
      steps: [
        { title: "Check Fee Structure", description: "Verify the correct fees for your program and level on the official UCC website to avoid errors." },
        { title: "Generate Invoice on Portal", description: "Log in to the Student Portal and generate a payment invoice for the correct amount." },
        { title: "Choose Payment Method", description: "Select from bank payment (GCB, Zenith, Prudential), online (Transflow, Smartpay), or Mobile Money." },
        { title: "Make Payment", description: "Complete the transaction using your Student ID as the reference. Double-check all details." },
        { title: "Secure Your Receipt", description: "Collect the physical bank receipt or save the digital confirmation SMS/email immediately." },
        { title: "Verify on Student Portal", description: "After 24-48 hours, log back into the student portal to confirm that your payment has reflected." }
      ],
      commonMistakes: [
        "Paying to wrong or unauthorized bank accounts.",
        "Losing payment receipts and having no proof of transaction.",
        "Waiting until the last minute to pay, risking system overload.",
        "Using the wrong reference number (Reference No. instead of Student ID).",
        "Paying without getting an official receipt or transaction ID."
      ],
      consequences: "Incorrect or unverified payments will lead to being barred from examinations, inability to access halls, and obstruction of academic registration.",
      resources: [], // Filled if needed

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Payment Integrity"
            icon={CreditCard}
            content="Every transaction, from tuition to residential fees, must be made through official channels and verified on the student portal. <strong>Always keep your receipts; they are your only legal proof of payment.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Bank Channels" 
               desc="Pay directly at designated bank branches."
               details={[
                 "<strong>GCB Bank</strong>: The primary and preferred channel.",
                 "<strong>Zenith Bank</strong>: Reliable alternative for all fees.",
                 "<strong>Prudential Bank</strong>: Available at on-campus branches.",
                 "<strong>Transflow</strong>: The universal bank payment protocol."
               ]}
            />
            <ActionCard 
               title="Digital Channels" 
               desc="Online and mobile payment platforms."
               details={[
                 "<strong>Smartpay</strong>: Integrated directly with the portal.",
                 "<strong>MTN Mobile Money</strong>: Fast and widely accessible.",
                 "<strong>AirtelTigo Cash</strong>: Supported via digital portals.",
                 "<strong>Bank Apps</strong>: Use the Transflow option in-app."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Landmark size={24} /> Departmental Dues
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                   Separate from school fees. Paid to your Department's Student Association (e.g., PASAG, MASA). These dues fund souvenirs, t-shirts, and social events.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
                      <h5 className="font-black text-primary-700 mb-2 uppercase tracking-wider text-[10px]">Freshers Policy</h5>
                      <p className="text-sm text-slate-600 font-medium">First-year students pay a higher one-time fee to cover departmental welfare and souvenirs.</p>
                   </div>
                   <div className="bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
                      <h5 className="font-black text-primary-700 mb-2 uppercase tracking-wider text-[10px]">Verification</h5>
                      <p className="text-sm text-slate-600 font-medium">Dues are manually verified at the Department table. This is often required before manual registration signing.</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-4">
            <h3 className="font-black text-gray-900 text-2xl mb-8 flex items-center">
              <span className="bg-primary-50 text-primary-600 w-10 h-10 rounded-xl flex items-center justify-center text-sm mr-4 shadow-sm">i</span>
              The Payment Cycle
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <CycleTile step="01" title="Verify Amount" text="Check the official Fee Structure on the UCC website for your specific program." />
               <CycleTile step="02" title="Invoice" text="Generate a payment invoice on the portal to ensure correct accounting." />
               <CycleTile step="03" title="Pay with ID" text="Use your Student ID as the primary reference, not your index number." />
               <CycleTile step="04" title="Secure Receipt" text="Keep physical receipts safe. Take a photo as a digital backup." />
               <CycleTile step="05" title="Final Check" text="Log back into the portal after 48 hours to ensure payment reflection." />
            </div>
          </div>
        </div>
      )
    }
  ];
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Steps' },
    { id: 'warnings', label: 'Warnings' },
  ];

  return { sections, tabs };
};

const CycleTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-2">
      <h5 className="font-black text-slate-900 text-lg leading-tight">{title}</h5>
      <span className="text-3xl font-black text-primary-50 group-hover:text-primary-100 transition-colors">{step}</span>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed font-medium">{text}</p>
  </div>
);

export default PaymentsReceipts;