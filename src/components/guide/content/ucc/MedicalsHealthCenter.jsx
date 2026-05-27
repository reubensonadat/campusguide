import React from 'react';
import { HeartPulse,  ShieldAlert, Brain } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const MedicalsHealthCenter = () => {
  // UCC GUIDE: MEDICALS & HEALTH CENTER (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Health Services on Campus",
      summary: "Medical care and health support for students.",
      
      steps: [
        { title: "Register at Health Center", description: "Submit your medical history and insurance information at the registration desk." },
        { title: "Get medical check-up", description: "Complete the mandatory medical examination including X-rays and lab tests." },
        { title: "Know emergency procedures", description: "Learn what to do in medical emergencies and save contact numbers." },
        { title: "Understand consultation process", description: "Know how to book appointments and walk-in procedures for routine care." }
      ],
      keyPoints: [
        "Health Center provides basic medical care",
        "Emergency services available 24/7",
        "NHIS accepted for payment",
        "Mental health counseling offered"
      ],
      tips: [
        "Keep your medical records updated",
        "Know your blood group and allergies",
        "Practice preventive healthcare"
      ],
      resources: [
        { title: "Health Center Location", description: "Find the University Health Center on campus", url: "https://maps.google.com/?q=University+Health+Center+University+of+Cape+Coast" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Student Well-being"
            icon={HeartPulse}
            content="The University Health Center provides comprehensive medical services to keep you healthy throughout your studies. From routine check-ups to emergency care, your health is a priority for academic success."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Medical Services" 
               desc="Care available to all registered students."
               details={[
                 "<strong>Consultation</strong>: Daily general check-ups.",
                 "<strong>Emergency</strong>: 24/7 medical response.",
                 "<strong>Referrals</strong>: Specialist care coordination.",
                 "<strong>Pharmacy</strong>: On-site prescription fulfillment."
               ]}
            />
            <ActionCard 
               title="Insurance & Payment" 
               desc="How to cover your medical costs."
               details={[
                 "<strong>NHIS</strong>: Primary accepted insurance.",
                 "<strong>Private</strong>: Selected plans supported.",
                 "<strong>Out-of-Pocket</strong>: Standard fee schedule.",
                 "<strong>Student Levy</strong>: Part of your semester fees."
               ]}
            />
          </div>

          <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100 overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-rose-900 text-xl mb-4 flex items-center gap-2">
                   <ShieldAlert size={24} /> Mandatory Medical Exam
                </h4>
                <p className="text-rose-800/80 font-medium leading-relaxed mb-6">
                   All first-year students must complete a comprehensive medical examination. <strong>You cannot graduate without completing this requirement.</strong>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <ExamTag text="Chest X-Ray" />
                   <ExamTag text="Eye Exam" />
                   <ExamTag text="Lab Tests" />
                   <ExamTag text="Physical Exam" />
                </div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h4 className="font-black text-slate-900 text-xl mb-4 flex items-center gap-2"><BriefcaseMedical size={20} className="text-primary-600" /> Facilities</h4>
                <div className="flex flex-wrap gap-2">
                   {["Laboratory", "X-Ray Unit", "Pharmacy", "Dental Clinic"].map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-primary-50 text-primary-700 text-[10px] font-black uppercase rounded-xl border border-primary-100">{tag}</span>
                   ))}
                </div>
             </div>
             <div className="bg-primary-600 p-8 rounded-[2.5rem] shadow-xl text-white">
                <h4 className="font-black text-white text-xl mb-4 flex items-center gap-2"><Brain size={20} /> Mental Health</h4>
                <p className="text-primary-100 text-xs font-medium leading-relaxed mb-4">
                   Professional counselors are available at the <strong>Counseling Center</strong> (Ground Floor) to help with academic stress and personal challenges.
                </p>
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-[10px] font-bold">
                   📍 Counseling Center: Ground Floor, Health Center
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

const ExamTag = ({ text }) => (
  <div className="bg-white p-3 rounded-2xl border border-rose-100 text-center text-[10px] font-black text-rose-900 uppercase tracking-widest shadow-sm">
     {text}
  </div>
);

export default MedicalsHealthCenter;