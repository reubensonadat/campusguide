
const PaymentsReceipts = () => {
  // UCC GUIDE: PAYMENTS & RECEIPTS
  // "The Pastel Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "Fee Payments & Receipts",
      summary: "Making payments and keeping proper records.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Proper fee payment and meticulous record-keeping are crucial for your smooth academic journey at UCC.
              Every transaction, from tuition to residential fees, must be made through official channels and verified on the student portal.
              <strong> Always keep your receipts; they are your only proof of payment.</strong>
            </p>
          </div>

          {/* --- PAYMENT CHANNELS GRID --- */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Traditional Payments Card */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Traditional</span>
                Bank Payments
              </h4>
              <p className="text-sm text-blue-800/70 mb-4">Pay directly at designated bank branches for secure transactions.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>GCB Bank</strong> <span className="text-xs ml-auto text-gray-500">Preferred</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Zenith Bank</strong> <span className="text-xs ml-auto text-gray-500">Available</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <strong>Prudential Bank</strong> <span className="text-xs ml-auto text-gray-500">On-campus</span>
                </li>
              </ul>
            </div>

            {/* Digital Payments Card */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300">
              <h4 className="font-bold text-emerald-900 text-lg mb-3 flex items-center">
                <span className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Digital</span>
                Online & Mobile
              </h4>
              <p className="text-sm text-emerald-800/70 mb-4">Convenient online payment platforms for quick and easy transactions.</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Transflow</strong> <span className="text-xs ml-auto text-gray-500">Official</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Smartpay</strong> <span className="text-xs ml-auto text-gray-500">Integrated</span>
                </li>
                <li className="flex items-center bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  <strong>Mobile Money</strong> <span className="text-xs ml-auto text-gray-500">MTN/AirtelTigo</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- DEPARTMENTAL DUES CARD (NEW) --- */}
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300 mt-6 md:col-span-2">
            <h4 className="font-bold text-purple-900 text-lg mb-3 flex items-center">
              <span className="bg-purple-200 text-purple-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mr-2">Mandatory</span>
              Departmental Dues
            </h4>
            <p className="text-sm text-purple-800/70 mb-4">
              Separate from school fees. Paid to your Department's Student Association (e.g., PASAG, MASA, etc.).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-1.5"></span>
                  <span><strong>First Years Pay More:</strong> Freshers pay a higher amount (includes Souvenirs/T-shirt).</span>
                </li>
                <li className="flex items-start bg-white/60 p-2 rounded">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-1.5"></span>
                  <span><strong>Verification:</strong> Payment is manually verified at the Department table.</span>
                </li>
              </ul>
              <div className="bg-white/60 p-3 rounded text-sm text-gray-600 italic">
                "You must pay your dues before you are allowed to do your manual course registration signing (if required) or collect souvenirs."
              </div>
            </div>
          </div>


          {/* --- PAYMENT PROCESS AS SUBTLE COLORED CARDS --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">i</span>
              The Payment Cycle
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Step 1 - Subtle Blue */}
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-sky-900 text-lg">Check Fees</h5>
                  <span className="text-3xl font-bold text-sky-200/80 -mt-1">01</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-sky-700 font-semibold mb-2">Verify Amount</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Check the official <strong>Fee Structure</strong> on the UCC website for your program and level to avoid over or underpayment.
                </p>
              </div>

              {/* Step 2 - Subtle Indigo */}
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-indigo-900 text-lg">Generate Invoice</h5>
                  <span className="text-3xl font-bold text-indigo-200/80 -mt-1">02</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-indigo-700 font-semibold mb-2">Portal Action</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Log in to the <strong>Student Portal</strong> to generate a payment invoice. This invoice contains the correct details for payment.
                </p>
              </div>

              {/* Step 3 - Subtle Purple */}
              <div className="bg-violet-50 p-5 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-violet-900 text-lg">Make Payment</h5>
                  <span className="text-3xl font-bold text-violet-200/80 -mt-1">03</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-violet-700 font-semibold mb-2">Approved Channel</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Pay using any <strong>approved channel</strong>. Always use your Student ID as the primary reference.
                </p>
              </div>

              {/* Step 4 - Subtle Amber */}
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-amber-900 text-lg">Secure Receipt</h5>
                  <span className="text-3xl font-bold text-amber-200/80 -mt-1">04</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-2">Proof of Payment</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Collect the <strong>official receipt</strong> from the bank or save the transaction confirmation from digital payments. This is crucial.
                </p>
              </div>

              {/* Step 5 - Subtle Teal */}
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold text-teal-900 text-lg">Verify</h5>
                  <span className="text-3xl font-bold text-teal-200/80 -mt-1">05</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-teal-700 font-semibold mb-2">Final Check</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Log back into the portal after 24-48 hours to <strong>verify your payment</strong> has reflected. If not, contact the Finance Directorate.
                </p>
              </div>

            </div>
          </div >
        </div >
      ),
      keyPoints: [
        "Multiple payment channels available (Bank, Online, Mobile Money).",
        "Always keep payment receipts; they are your only proof.",
        "Use your Student ID, not Reference Number, for payments.",
        "Payment deadlines are strictly enforced.",
        "It can take 24-48 hours for payments to reflect on the portal."
      ],
      steps: [
        {
          title: "Check Fee Structure",
          description: "Verify the correct fees for your program and level on the official UCC website to avoid errors."
        },
        {
          title: "Generate Invoice on Portal",
          description: "Log in to the Student Portal and generate a payment invoice. This ensures you pay the correct amount to the right account."
        },
        {
          title: "Choose Payment Method",
          description: "Select from bank payment (GCB, Zenith, Prudential), online payment (Transflow, Smartpay), or Mobile Money."
        },
        {
          title: "Make Payment",
          description: "Complete the transaction using your Student ID as the reference number. Double-check all details before confirming."
        },
        {
          title: "Secure Your Receipt",
          description: "Collect the physical receipt from the bank teller or save the digital confirmation SMS/email. This is your proof of payment."
        },
        {
          title: "Verify on Student Portal",
          description: "After 24-48 hours, log back into the student portal to confirm that your payment has been successfully reflected."
        }
      ],
      tips: [
        "Pay well before the deadline to avoid last-minute system issues.",
        "Take a clear photo of your physical receipt and store it securely online.",
        "If paying via Mobile Money, save the transaction ID and confirmation message.",
        "For large payments, consider bank transfers for better record-keeping.",
        "Always ask for a receipt, even if the system is 'down'."
      ],
      resources: [
        {
          title: "UCC Fee Structure",
          description: "Current fee schedules for all programs.",
          url: "https://ucc.edu.gh/fees"
        },
        {
          title: "Payment Channels",
          description: "All approved payment methods and guidelines.",
          url: "https://ucc.edu.gh/payments"
        },
        {
          title: "Student Portal",
          description: "Generate invoices and verify payments.",
          url: "https://portal.ucc.edu.gh"
        }
      ],
      commonMistakes: [
        "Paying to wrong or unauthorized bank accounts.",
        "Losing payment receipts and having no proof of transaction.",
        "Waiting until the last minute to pay, risking system overload.",
        "Using the wrong reference number (Reference No. instead of Student ID).",
        "Paying without getting an official receipt or transaction ID."
      ],
      consequences: "Incorrect or unverified payments will lead to being barred from examinations, inability to access halls, and obstruction of academic registration.",
      checklist: [
        { text: "Checked correct fee schedule", checked: false },
        { text: "Generated invoice on portal", checked: false },
        { text: "Used approved payment channel", checked: false },
        { text: "Paid with correct Student ID", checked: false },
        { text: "Secured official receipt", checked: false },
        { text: "Verified payment on portal", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Payment Cycle' },
    { id: 'resources', label: 'Payment Channels' },
    { id: 'warnings', label: 'Payment Pitfalls' },
  ];

  return { sections, tabs };
};

export default PaymentsReceipts;