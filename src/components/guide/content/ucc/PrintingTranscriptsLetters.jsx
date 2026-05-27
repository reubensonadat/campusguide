import React from 'react';
import { FileText, Award, CreditCard, Clock, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Laptop, Send } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const PrintingTranscriptsLetters = () => {
  // UCC GUIDE: ACADEMIC DOCUMENTS (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Academic Documents Services",
      summary: "How to request transcripts and official university letters.",
      
      steps: [
        { title: "Check for Account Holds", description: "Ensure you have no financial or library holds. These must be cleared before any processing." },
        { title: "Complete Request Form", description: "Fill out the appropriate form for the document you need. Available at Exams & Records." },
        { title: "Pay Processing Fees", description: "Pay required fees at the finance office. Keep your receipt as proof for submission." },
        { title: "Submit to Exams Office", description: "Submit the completed form and payment receipt to the Exams and Records Office." },
        { title: "Wait for Processing", description: "Allow standard processing time of 3-5 working days. Rush service is available." },
        { title: "Collect and Verify", description: "Collect your document when notified. Verify all details are correct before leaving." }
      ],
      keyPoints: [
        "Transcripts processed by Exams and Records Office",
        "Processing takes 3-5 working days (standard)",
        "Rush processing available at extra cost (24-hour service)",
        "Some documents require departmental clearance"
      ],
      tips: [
        "Request documents well in advance of deadlines",
        "For international applications, request sealed transcripts",
        "Check your personal details on the document before leaving",
        "Ask about courier services if you're not on campus"
      ],
      resources: [
        { title: "Document Request Forms", description: "Download various request forms.", url: "https://ucc.edu.gh/document-forms" },
        { title: "Online Request Portal", description: "Request documents via the web.", url: "https://documents.ucc.edu.gh" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Official Certification"
            icon={FileText}
            content="Official academic documents like transcripts and recommendation letters are essential for job applications, further studies, or scholarship opportunities. <strong>The Exams and Records Office handles these requests with specific protocols.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Academic Transcripts" 
               desc="Records of your academic performance."
               details={[
                 "<strong>Official Transcript</strong>: For external institutions.",
                 "<strong>Unofficial Transcript</strong>: For personal review.",
                 "<strong>Standard Time</strong>: 3 - 5 Working Days.",
                 "<strong>Rush Service</strong>: 24-Hour turnaround."
               ]}
            />
            <ActionCard 
               title="Official Letters" 
               desc="Certifications and recommendations."
               details={[
                 "<strong>Recommendation</strong>: From HOD or Lecturer.",
                 "<strong>Proof of Enrollment</strong>: Validates student status.",
                 "<strong>Completion</strong>: Proof of graduation status.",
                 "<strong>Language</strong>: English Proficiency letters."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <Clock size={24} /> Document Workflow
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   Avoid last-minute stress by understanding the departmental clearance and payment validation steps.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <WorkflowTile step="01" title="Clearance" text="Clear all financial/library holds on your portal." />
                   <WorkflowTile step="02" title="Application" text="Submit form + receipt to Exams & Records Office." />
                   <WorkflowTile step="03" title="Collection" text="Pick up in 3-5 days. Verify name spelling immediately." />
                </div>
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
  ];

  return { sections, tabs };
};

const WorkflowTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">Step {step}</div>
     <h5 className="font-black text-slate-900 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
  </div>
);

export default PrintingTranscriptsLetters;