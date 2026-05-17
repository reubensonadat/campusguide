import React from 'react';
import { CreditCard, Info } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const IDCard = () => {
  // UCC GUIDE: STUDENT ID CARD (FULL 2025 EDITION - RESTORED)

  const sections = [
    {
      title: "Student ID Card Collection",
      summary: "How ID card pictures are taken, how cards are printed, and how to collect yours.",
      
      // --- ALL DATA ARRAYS RESTORED ---
      keyPoints: [
        "ID card is mainly for exams",
        "You must take your photo during department schedule",
        "A specific bank selected by the university prints the cards",
        "Collection is done through course reps",
        "Admission letter can be used temporarily for mid-sem exams"
      ],
      steps: [
        { title: "Department Announces Photo Day", description: "Follow the official photo schedule for your department." },
        { title: "Take Your Formal Picture", description: "Dress formally. This photo appears on your portal and ID card." },
        { title: "Printing by specific bank selected by the university", description: "Cards are processed and returned to your department." },
        { title: "Wait for Your Course Rep", description: "They will announce when the ID cards are ready." },
        { title: "Collect with Your Name/Index Number", description: "No additional documents required." },
      ],
      tips: [
        "Take your photo early to avoid delays",
        "Keep your ID safe — replacement takes time",
        "Take a picture of your ID card as backup",
        "Admission letter works only for early exams"
      ],
      resources: [
        { title: "UCC Handbook", description: "General student rules", url: "https://portal.ucc.edu.gh/downloads/hand.pdf" }
      ],
      requirements: [
        "Attend the official photo-taking exercise",
        "Formal dress code for the picture"
      ],
      operatingHours: [
        { day: "Photo sessions", time: "Based on departmental schedule" },
        { day: "Collection", time: "Announced by course reps" },
      ],
      checklist: [
        { text: "Attend photo-taking session", checked: false },
        { text: "Dress formally", checked: false },
        { text: "Wait for course rep announcement", checked: false },
        { text: "Collect ID card", checked: false }
      ],

      // --- FULL TEXT CONTENT RESTORED ---
      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Essential Protocol"
            icon={CreditCard}
            content="Your student ID card is mainly used for <strong>examinations</strong>. It is not required for most campus facilities. You will receive it only after your department organizes the official photo-taking exercise and a specific bank selected by the university prints the cards."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Where You Need It" 
               desc="Primary uses for your student ID."
               details={[
                 "<strong>Examination Entry</strong>: Mandatory for all main exams.",
                 "<strong>Student Identity Verification</strong>: Official proof of status.",
                 "<strong>Facility Access</strong>: No special access required for Sam Jonah Library."
               ]}
            />
            <ActionCard 
               title="Important Rules" 
               desc="What you must know about your ID card."
               details={[
                 "<strong>No Renewal</strong>: Valid for your entire program duration.",
                 "<strong>Photo Schedule</strong>: Do NOT wait; delays your card issuance.",
                 "<strong>Collection</strong>: Your course reps will announce batch availability."
               ]}
            />
          </div>

          <div className="pt-4">
            <h3 className="font-black text-gray-900 text-2xl mb-8 flex items-center">
              <span className="bg-indigo-50 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-sm mr-4 shadow-sm">i</span>
              Collection Process (Real UCC Flow)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProcessTile 
                step="01" 
                title="Follow Schedule" 
                text="UCC announces picture-taking dates by department. Dress formally and go early." 
              />
              <ProcessTile 
                step="02" 
                title="Official Photo" 
                text="Photos are taken at designated locations like CALC, Sam Jonah, or ICT Centre." 
              />
              <ProcessTile 
                step="03" 
                title="Bank Printing" 
                text="A specific bank selected by the university prints the ID cards. You cannot collect the card directly there." 
              />
              <ProcessTile 
                step="04" 
                title="Wait for Rep" 
                text="Your course reps will announce the exact date and location for collection." 
              />
              <ProcessTile 
                step="05" 
                title="Collect Your ID" 
                text="Provide your name or index number. Cards are usually distributed by department reps." 
              />
            </div>
          </div>

          <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100">
             <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-4">
                   <h4 className="text-xl font-black text-rose-900 flex items-center gap-2">
                     <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-lg text-xs uppercase font-black">Replacement</span>
                     Lost Your ID Card?
                   </h4>
                   <p className="text-rose-800/70 text-sm font-medium leading-relaxed max-w-2xl">
                     Go to the <strong>MIS Office</strong> (Located near the Education Library) to report the loss. You will need to pay a replacement fee before a new card is processed.
                   </p>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-64">
                   <div className="bg-white/60 p-4 rounded-2xl border border-rose-100 text-xs font-black text-rose-900 uppercase tracking-widest">Report at MIS</div>
                   <div className="bg-white/60 p-4 rounded-2xl border border-rose-100 text-xs font-black text-rose-900 uppercase tracking-widest">Pay Fee</div>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'resources', label: 'Helpful Links' },
  ];

  return { sections, tabs };
};

const ProcessTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-2">
      <h5 className="font-black text-slate-900 text-lg leading-tight">{title}</h5>
      <span className="text-3xl font-black text-indigo-50 group-hover:text-indigo-100 transition-colors">{step}</span>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed font-medium">{text}</p>
  </div>
);

export default IDCard;
