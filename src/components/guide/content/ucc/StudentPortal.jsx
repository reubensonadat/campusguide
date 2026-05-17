import React from 'react';
import { Layout, Shield, Globe, Mail, Search, CheckCircle } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const StudentPortal = () => {
  // UCC GUIDE: STUDENT PORTAL (FULL 2025 EDITION - RESTORED)

  const sections = [
    {
      title: "Accessing Student Portal",
      summary: "Your digital gateway to UCC academic and administrative services.",
      
      // --- ALL DATA ARRAYS RESTORED ---
      keyPoints: [
        "Student portal accessible at portal.ucc.edu.gh",
        "Default password is admission index number (change immediately)",
        "Portal provides access to registration, results, and fee payment",
        "Security questions can be set for password recovery",
        "Student email accessible through portal"
      ],
      steps: [
        { title: "Visit Official UCC Website", description: "Go to www.ucc.edu.gh and click on 'Student Portal' or access directly at portal.ucc.edu.gh" },
        { title: "Enter Your Credentials", description: "Enter your Student ID as username and admission index number as password for first-time login." },
        { title: "Change Your Password", description: "After first login, immediately change your password to something secure that you'll remember." },
        { title: "Set Up Security Questions", description: "Configure security questions for account recovery in case you forget your login details." },
        { title: "Explore Dashboard", description: "Familiarize yourself with the dashboard layout and available services for your academic level." },
        { title: "Access Student Email", description: "Set up and access your official student email through the portal for all university communications." }
      ],
      tips: [
        "Always use the official UCC website to access the portal",
        "Never share your login credentials with anyone",
        "Use a strong password with a combination of letters, numbers, and symbols",
        "Always log out after using the portal, especially on public computers",
        "Bookmark the portal URL for easy access",
        "Clear browser cache if experiencing login issues",
        "Use a supported browser (Chrome, Firefox, or Edge)"
      ],
      resources: [
        { title: "UCC Student Portal", description: "Direct link to student portal login page", url: "https://portal.ucc.edu.gh" },
        { title: "Portal User Guide", description: "Official PDF manual for students.", url: "https://ucc.edu.gh/student-portal-guide" },
        { title: "Student Email Setup", description: "How to set up and access your student email", url: "https://youtu.be/xHLUNorFojk?si=JsLMNJFdZ_v2E559" }
      ],
      contacts: [
        { name: "IT Support Center", role: "Technical support for portal issues", contact: "itsupport@ucc.edu.gh | +233 123 456 789" },
        { name: "Student Affairs", role: "General student support services", contact: "studentaffairs@ucc.edu.gh | +233 123 456 788" }
      ],
      checklist: [
        { text: "Access portal with correct URL", checked: false },
        { text: "Change default password", checked: false },
        { text: "Set up security questions", checked: false },
        { text: "Explore dashboard features", checked: false },
        { text: "Set up student email", checked: false },
        { text: "Save support contacts", checked: false }
      ],

      // --- FULL TEXT CONTENT RESTORED ---
      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Digital Gateway"
            icon={Layout}
            content="The UCC student portal is your gateway to all academic services, including course registration, checking results, fee payments, and accessing important university information. Mastering the portal is essential for your academic journey at UCC. <strong>Always use the official portal URL and keep your credentials secure.</strong>"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Academic Services" 
               desc="Essential academic functions available on portal."
               details={[
                 "<strong>Course Registration</strong>: Required each semester.",
                 "<strong>Results Checking</strong>: Instant access to grades.",
                 "<strong>Academic Records</strong>: Request transcripts and slips.",
                 "<strong>Portal Activation</strong>: Required for all Freshers."
               ]}
            />
            <ActionCard 
               title="Admin Support" 
               desc="Administrative functions available on portal."
               details={[
                 "<strong>Fee Payment</strong>: Secure online portal payments.",
                 "<strong>Hostel Booking</strong>: Limited space reservations.",
                 "<strong>Clearance Status</strong>: Track graduation requirements.",
                 "<strong>Official Email</strong>: Access student outlook accounts."
               ]}
            />
          </div>

          <div className="pt-4">
            <h3 className="font-black text-gray-900 text-2xl mb-8 flex items-center">
              <span className="bg-indigo-50 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-sm mr-4 shadow-sm">i</span>
              Portal Access Guide
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StepTile 
                step="01" 
                title="Visit Website" 
                label="Access Point" 
                text="Go to <strong>www.ucc.edu.gh</strong> and click on 'Student Portal' or access directly at <strong>portal.ucc.edu.gh</strong>" 
              />
              <StepTile 
                step="02" 
                title="Enter Credentials" 
                label="Login" 
                text="Enter your <strong>Student ID</strong> and password. For first-time login, use your admission index number as default password." 
              />
              <StepTile 
                step="03" 
                title="Secure Account" 
                label="Security" 
                text="Change your password to something <strong>secure and memorable</strong>. Set up security questions for account recovery." 
              />
              <StepTile 
                step="04" 
                title="Explore Dashboard" 
                label="Navigation" 
                text="Familiarize yourself with the <strong>dashboard layout</strong> and available services for your academic level." 
              />
              <StepTile 
                step="05" 
                title="Set Up Email" 
                label="Communication" 
                text="Access your <strong>student email</strong> through the portal and set up forwarding if needed for official communications." 
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Access Process' },
    { id: 'resources', label: 'Resources' },
  ];

  return { sections, tabs };
};

const StepTile = ({ step, title, label, text }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <h5 className="font-black text-slate-900 text-lg leading-tight">{title}</h5>
      <span className="text-3xl font-black text-indigo-50 group-hover:text-indigo-100 transition-colors">{step}</span>
    </div>
    <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-black mb-3">{label}</p>
    <p className="text-sm text-slate-600 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: text }} />
  </div>
);

export default StudentPortal;