
const GraduationClearance = () => {
  // UCC GUIDE: GRADUATION CLEARANCE
  // "The Platinum Edition" - Verified UCC Data (2025)
  // Features: Visual Step Cards in Overview, specific 'tabs' configuration for the app.

  const sections = [
    {
      title: "The Road to Congregation",
      summary: "Navigating the multi-stage clearance process to get your certificate.",
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
            <p className="text-gray-700 leading-relaxed">
              Graduation is not automatic. After writing your final paper, you must actively "clear" yourself from the University system. 
              This process confirms you owe no money, books, or sports kits to the University.
              <strong> Without clearance, you cannot graduate.</strong>
            </p>
          </div>
          
          {/* --- THE CLEARANCE CHAIN --- */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-6 text-center text-lg">The Clearance Hierarchy</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
               {/* Step 1 */}
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 relative">
                 <span className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">1</span>
                 <h5 className="font-bold text-blue-900 mb-1">Department</h5>
                 <p className="text-xs text-gray-600">Return lab equipment. Confirm grades. HOD signs first.</p>
               </div>

               {/* Step 2 */}
               <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 relative">
                 <span className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">2</span>
                 <h5 className="font-bold text-purple-900 mb-1">Sam Jonah Library</h5>
                 <p className="text-xs text-gray-600">Return books. Pay overdue fines. Get "No Owe" stamp.</p>
               </div>

               {/* Step 3 */}
               <div className="bg-green-50 p-4 rounded-xl border border-green-100 relative">
                 <span className="absolute -top-3 -left-3 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">3</span>
                 <h5 className="font-bold text-green-900 mb-1">Hospital & Sports</h5>
                 <p className="text-xs text-gray-600">Verify Medical Exam completion. Return sports jerseys.</p>
               </div>

               {/* Step 4 */}
               <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 relative">
                 <span className="absolute -top-3 -left-3 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">4</span>
                 <h5 className="font-bold text-orange-900 mb-1">Finance & Admin</h5>
                 <p className="text-xs text-gray-600">Pay Alumni fees. Final stamp at Directorate of Academic Affairs.</p>
               </div>
            </div>
          </div>

          {/* --- THE "HOSPITAL TRAP" --- */}
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h4 className="text-red-900 font-bold text-lg mb-2">The "Hospital Trap"</h4>
            <p className="text-red-800 text-sm leading-relaxed">
              Many final year students are blocked because they lost their <strong>Medical Exam Card</strong> from Level 100. 
              You MUST produce this card or proof of the exam to get cleared. If you never did the exam, you will pay a heavy penalty and do it now.
            </p>
          </div>
        </div>
      ),
      keyPoints: [
        "Clearance is mandatory for all graduating students.",
        "The process involves 5 main stages: Department, Library, Hospital/Sports, Hall, and Finance.",
        "All stages must be completed and signed before submission to Academic Affairs.",
        "Clearance forms are available on the Student Portal after final results are published."
      ],
      steps: [
        {
          title: "Download Clearance Form",
          description: "Forms are usually available on the Student Portal or at your Faculty Officer's desk after final results are published."
        },
        {
          title: "Departmental Signing",
          description: "Go to your Head of Department. They check if you have returned all department property."
        },
        {
          title: "Library Clearance",
          description: "Go to Sam Jonah Library. They scan your ID to check for unreturned books or unpaid fines."
        },
        {
          title: "Sports & Hospital",
          description: "Visit the Sports Section (Stadium) to clear sports kits. Visit the Hospital Records Unit to verify your Level 100 medicals."
        },
        {
          title: "Hall Clearance",
          description: "If you are resident in a Hall (e.g., Valco, Oguaa), the Hall Master must sign that you owe no hall dues."
        },
        {
          title: "Finance & Academic Affairs",
          description: "Pay Graduation & Alumni fees at the bank. Take receipts to Finance Directorate for clearance. Submit the fully signed form to Academic Affairs."
        }
      ],
      tips: [
        "Start the clearance process immediately after your final exams, don't wait for results.",
        "Keep all receipts and documents organized in a folder.",
        "Make photocopies of your signed clearance form before submission.",
        "Visit offices during less busy hours (early morning or late afternoon).",
        "Take a passport-sized photo for the clearance form."
      ],
      resources: [
        {
          title: "Directorate of Academic Affairs",
          description: "Final submission point.",
          url: "https://daa.ucc.edu.gh"
        },
        {
          title: "UCC Alumni Association",
          description: "Information on alumni fees.",
          url: "https://alumni.ucc.edu.gh"
        }
      ],
      commonMistakes: [
        "Losing the Medical Exam Card from Level 100 (Keep it safe!).",
        "Owing Library fines (Even GH₵ 2.00 will stop your clearance).",
        "Thinking 'Alumni Fees' are optional (They are mandatory for clearance).",
        "Traveling home immediately after exams without starting the process.",
        "Sending a friend to do it for you (Signatures are often required in person)."
      ],
      consequences: "If you do not complete clearance by the deadline, your name will be removed from the Congregation Brochure, and you will not graduate with your batch.",
      checklist: [
        { text: "Checked Portal for Final Results", checked: false },
        { text: "Printed Clearance Form", checked: false },
        { text: "Returned all Library Books", checked: false },
        { text: "Located Level 100 Medical Card", checked: false },
        { text: "Paid Graduation Fees", checked: false },
        { text: "Submitted Form to DAA", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'warnings', label: 'Common Traps' },
    { id: 'resources', label: 'Helpful Links' },
    { id: 'checklist', label: 'Essentials List' }
  ];

  return { sections, tabs };
};

export default GraduationClearance;