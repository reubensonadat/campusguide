import React from 'react';
import { Clock, ShieldAlert, GraduationCap, ArrowRight, Info, CheckCircle, Search, Laptop, Globe } from 'lucide-react';
import { CustomGuide } from '../../../common/CustomIcons';

import { ActionCard, InfoBlock } from '../../GuideStyles';

const LibraryServices = () => {
  // UCC GUIDE: LIBRARY SERVICES (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Overview",
      summary: "The University of Cape Coast Library system consists of the main Sam Jonah Library and 31 satellite libraries.",
      keyPoints: [
        "Bags must be left at the baggage room (Ground floor)",
        "No food, smoking, or phone calls allowed inside",
        "Silence must be maintained at all times"
      ],
      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="The Heart of Research"
            icon={CustomGuide}
            content="The Sam Jonah Library is the core of academic research at UCC, offering a massive collection of physical books, journals, and a growing digital archive. It features a 2,000-seat capacity and is located near the large lecture theatres."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Quick Facts" 
               desc="Vital stats about the library system."
               details={[
                 "Main Library + 31 Satellite locations.",
                 "2,000 Seating Capacity in Sam Jonah.",
                 "Access open to all students & staff.",
                 "Located near the central lecture complex."
               ]}
            />
            <ActionCard 
               title="Entry Protocol" 
               desc="Rules for entering the main library."
               details={[
                 "Baggage Room: Ground Floor (Left).",
                 "ID Verification: Valid card required.",
                 "Gate Inspections: Mandated for all exits.",
                 "Bag Tags: Always insist on a tag."
               ]}
            />
          </div>
        </div>
      )
    },
    {
      title: "Operational Hours",
      summary: "Opening times vary based on the academic calendar.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
            <div className="text-xs font-black text-indigo-500 uppercase mb-4">Regular Semester</div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-900 flex justify-between"><span>Mon – Fri:</span> <span>9am – 10pm</span></p>
              <p className="text-sm font-bold text-slate-900 flex justify-between"><span>Saturdays:</span> <span>9am – 8pm</span></p>
            </div>
          </div>
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="text-xs font-black text-indigo-200 uppercase mb-4">Exam Period</div>
            <div className="space-y-2 relative">
              <p className="text-sm font-bold text-white flex justify-between"><span>Mon – Sat:</span> <span>9am – 5am</span></p>
              <p className="text-[10px] text-indigo-200 font-bold italic">* Extended for intensive study.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
            <div className="text-xs font-black text-slate-400 uppercase mb-4">Vacation</div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-900 flex justify-between"><span>Mon – Fri:</span> <span>9am – 4:30pm</span></p>
              <p className="text-xs text-slate-400 italic">Closed Saturdays</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Borrowing Books",
      summary: "Understand how to borrow, renew, and reserve books.",
      steps: [
        { title: "Find a book", description: "Locate a book on the 1st or 2nd floor (ensure it's not Reference only)." },
        { title: "Go to Circulation Desk", description: "Take the book to the desk on the Ground Floor." },
        { title: "Present ID", description: "Show your valid Student ID card to the staff." },
        { title: "Check Return Date", description: "Note the due date stamped on the slip to avoid fines." }
      ],
      tips: [
        "Lost a book? Report it immediately to avoid accumulating daily fines.",
        "If you lose a book, you must replace it or pay 3 times the current cost.",
        "You can reserve a book that is currently out; it will be held for 24h upon return."
      ],
      content: (
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-emerald-600 uppercase mb-1">Loan Period</p>
                <p className="text-4xl font-black text-emerald-900">2 Weeks</p>
              </div>
              <CheckCircle className="text-emerald-500" size={32} />
            </div>
            <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-rose-600 uppercase mb-1">Overdue Fine</p>
                <p className="text-4xl font-black text-rose-900">50p <span className="text-sm font-bold text-rose-500">/ day</span></p>
              </div>
              <AlertTriangle className="text-rose-500" size={32} />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-900 text-xl mb-4">Spine Label Codes (Reference Only)</h4>
            <p className="text-sm text-slate-600 font-medium mb-6">If the call mark starts with these prefixes, the book cannot be borrowed:</p>
            <div className="flex flex-wrap gap-4">
              <CodeBadge label="R" title="General Reference" />
              <CodeBadge label="GH" title="Ghana Collection" />
              <CodeBadge label="DT" title="Africana Unit" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Floor Directory",
      summary: "A spatial guide to the Sam Jonah Library layout.",
      content: (
        <div className="space-y-6">
          <FloorItem floor="Basement" title="Graduate Study Area" desc="Quiet cubicles strictly for Graduate Students." />
          <FloorItem floor="Ground Floor" title="E-Library & Serials" desc="Newspapers, dictionaries, special needs section, and technical support." />
          <FloorItem floor="First Floor" title="General Stacks" desc="Main collection of borrowable books arranged by subject." />
          <FloorItem floor="Second Floor" title="Africana & Law" desc="Rare collections, Law Library (East), and Research Commons (West)." />
        </div>
      )
    },
    {
      title: "Digital Services",
      summary: "Access journals and past questions via library.ucc.edu.gh",
      resources: [
        { title: "Institutional Repository", url: "https://ir.ucc.edu.gh", description: "Access theses, dissertations and past questions" },
        { title: "Full Guide Video", url: "https://youtu.be/FDTW3FXOPHY", description: "Official guide video on YouTube" }
      ],
      content: (
        <InfoBlock 
          title="Off-Campus Access"
          icon={Globe}
          content="Databases like JSTOR and Emerald work automatically on campus WiFi. To access them from home, you must register for <strong>Off-Campus Remote Access</strong> via the library website. Processing takes 2 working days."
        />
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Action Plan' },
    { id: 'warnings', label: 'Rules' },
    { id: 'resources', label: 'Links' },
  ];

  return { sections, tabs };
};

const CodeBadge = ({ label, title }) => (
  <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
    <p className="text-xs font-black text-indigo-600 mb-1">{label}</p>
    <p className="text-xs font-bold text-slate-500">{title}</p>
  </div>
);

const FloorItem = ({ floor, title, desc }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex gap-6 items-center shadow-sm">
     <div className="w-24 shrink-0 text-right">
        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{floor}</p>
     </div>
     <div className="w-px h-10 bg-slate-100"></div>
     <div>
        <p className="font-black text-slate-900 text-lg">{title}</p>
        <p className="text-xs text-slate-500 font-medium">{desc}</p>
     </div>
  </div>
);

export default LibraryServices;