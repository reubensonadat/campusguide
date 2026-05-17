import React from 'react';
import { Wifi, Mail, Smartphone, ShieldCheck, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Laptop } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const WifiEmail = () => {
  // UCC GUIDE: WI-FI & STUDENT EMAIL (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Wi-Fi & Student Email Setup",
      summary: "Connect to campus internet and set up your institutional email.",
      
      steps: [
        { title: "Download GetEduroam App", description: "Install the geteduroam app from Play Store or App Store on your device." },
        { title: "Visit Self-Service Portal", description: "Go to selfservice.ucc.edu.gh and select 'Forgot Password' to reset your credentials." },
        { title: "Check Your Email", description: "Look for password reset instructions in your institutional email inbox." },
        { title: "Create Secure Password", description: "Set a new password with at least one capital letter, number, and special character." },
        { title: "Connect to Eduroam", description: "Launch the geteduroam app, search for University of Cape Coast, and connect." },
        { title: "Access Student Email", description: "Go to mail.ucc.edu.gh and log in with your institutional email and new password." }
      ],
      keyPoints: [
        "Free Wi-Fi available across campus (UCC-WiFi and Eduroam).",
        "Student email provides Office 365 access with 50GB cloud storage.",
        "Login credentials provided at registration.",
        "New GetEduroam connection method is the most reliable access point."
      ],
      tips: [
        "Use VPN for secure connections on public Wi-Fi.",
        "Regularly check your student email for important announcements.",
        "Keep your password secure and change it periodically."
      ],
      resources: [
        { title: "Email Setup Guide", description: "Step-by-step email configuration.", url: "https://portal.ucc.edu.gh/frames/index.php" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Digital Connectivity"
            icon={Wifi}
            content="Staying connected is essential for your studies at UCC. These services are your gateway to academic resources, research databases, and official university communications via your institutional email."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="Campus Networks" 
               desc="Free high-speed internet access."
               details={[
                 "<strong>UCC-WiFi</strong>: The primary campus-wide network.",
                 "<strong>Eduroam</strong>: Global academic roaming network.",
                 "<strong>Library Wi-Fi</strong>: Dedicated high-bandwidth zones.",
                 "<strong>Hotspots</strong>: Available at all lecture theatres."
               ]}
            />
            <ActionCard 
               title="Student Email" 
               desc="Official Office 365 communication."
               details={[
                 "<strong>Cloud Storage</strong>: 50GB free via OneDrive.",
                 "<strong>Office Apps</strong>: Free Word, Excel, PowerPoint.",
                 "<strong>Official News</strong>: All UCC circulars sent here.",
                 "<strong>Sync</strong>: Access on Outlook (Mobile/PC)."
               ]}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-indigo-900 text-xl mb-4 flex items-center gap-2">
                   <Smartphone size={24} /> GetEduroam Setup (New)
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                   The old 'log in through browser' method is being phased out. The <strong>GetEduroam</strong> app is now the standard for secure, persistent connection.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <ConfigTile step="01" title="App Install" text="Download 'GetEduroam' from the Play Store or App Store." />
                   <ConfigTile step="02" title="Reset Credentials" text="Reset your password at selfservice.ucc.edu.gh first." />
                   <ConfigTile step="03" title="Search UCC" text="Open the app, search for UCC, and enter your new details." />
                </div>
                <div className="mt-8 bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                   <p className="text-xs text-indigo-900 font-bold leading-relaxed flex items-center gap-2">
                      <ShieldCheck size={16} /> PASSWORD RULE: Must include a capital letter, a number, and a special character (e.g. #, @, !).
                   </p>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide & Context' },
    { id: 'steps', label: 'Connection Process' },
    { id: 'resources', label: 'Links' },
  ];

  return { sections, tabs };
};

const ConfigTile = ({ step, title, text }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
     <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Step {step}</div>
     <h5 className="font-black text-slate-900 mb-2">{title}</h5>
     <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
  </div>
);

export default WifiEmail;