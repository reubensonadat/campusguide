import React from 'react';
import { Heart, Brain, GraduationCap, Briefcase, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, LifeBuoy } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const StudentSupportServices = () => {
  // UCC GUIDE: STUDENT SUPPORT SERVICES (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Student Support Services",
      summary: "Counseling and support resources for students.",
      
      steps: [
        { title: "Identify Your Needs", description: "Recognize whether you need academic, personal, career, or disability support services." },
        { title: "Locate Support Offices", description: "Find the Counseling Center (Health Center) or Student Affairs office on campus." },
        { title: "Schedule an Appointment", description: "Book a session with the appropriate service. Many offer same-day walk-ins." },
        { title: "Attend Your Session", description: "Be open and honest during your session to get the most relevant support." },
        { title: "Follow Recommendations", description: "Implement the strategies and resources provided by the support professionals." },
        { title: "Maintain Connection", description: "Build an ongoing relationship with support services for continued assistance." }
      ],
      keyPoints: [
        "Free and confidential counseling services available to all students.",
        "Academic support includes tutoring, writing centers, and skill workshops.",
        "Career services provide guidance, job search assistance, and interview preparation.",
        "Disability support services ensure equal access to education for all students."
      ],
      tips: [
        "Seek help early, don't wait until you're in crisis.",
        "Take advantage of all available support services.",
        "Build a support network of friends, mentors, and professionals.",
        "Remember that seeking help is a sign of strength."
      ],
      resources: [
        { title: "Counseling Center", description: "Book a confidential session online.", url: "https://portal.ucc.edu.gh/onlineReg/src/coun.php" }
      ],
      checklist: [
        { text: "Know locations of all support offices", checked: false },
        { text: "Save counseling center contacts", checked: false },
        { text: "Explore academic support options", checked: false },
        { text: "Visit career services early", checked: false },
        { text: "Understand confidentiality policies", checked: false }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="A Network of Care"
            icon={LifeBuoy}
            content="University life can present various academic, personal, and social challenges. UCC provides comprehensive support services to ensure your well-being and success. <strong>These services are confidential, professional, and free for all students.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Wellness & Counseling" 
               desc="Professional mental health support."
               details={[
                 "<strong>Personal Counseling</strong>: Confidential sessions.",
                 "<strong>Group Therapy</strong>: Weekly support circles.",
                 "<strong>Crisis Intervention</strong>: Available 24/7.",
                 "<strong>Location</strong>: Health Center (Ground Floor)."
               ]}
            />
            <ActionCard 
               title="Development & Career" 
               desc="Support for your future and studies."
               details={[
                 "<strong>Academic Tutoring</strong>: Cross-subject help.",
                 "<strong>Career Guidance</strong>: Planning & CV help.",
                 "<strong>Disability Services</strong>: Accessibility support.",
                 "<strong>Mentorship</strong>: Connect with senior alumni."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-primary-900 text-xl mb-4 flex items-center gap-2">
                   <ShieldAlert size={24} /> Strict Confidentiality
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                   Whatever you discuss with a counselor or support professional stays in that room. UCC maintains the highest ethical standards of privacy for all student concerns.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <SupportTile step="01" title="Seek Help Early" text="Don't wait for a crisis. Reach out at the first sign of difficulty." />
                   <SupportTile step="02" title="Be Proactive" text="Take advantage of workshops even if you aren't currently struggling." />
                   <SupportTile step="03" title="Self-Care" text="Maintain wellness through exercise, nutrition, and stress management." />
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Getting Support' },
    { id: 'resources', label: 'Links' },
  ];

  return { sections, tabs };
};

const SupportTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-2">Step {step}</div>
     <h5 className="font-black text-slate-900 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
  </div>
);

export default StudentSupportServices;