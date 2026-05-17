import React from 'react';
import { HelpCircle, ShieldAlert, Key, CreditCard, Award, CheckCircle, Info, History, Users, ArrowRight, Laptop, MessageSquare } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const FAQsTroubleshooting = () => {
  // UCC GUIDE: FAQS & TROUBLESHOOTING (RESTORED GOLD EDITION 2025)

  const sections = [
    {
      title: "Portal & Academic Issues",
      summary: "Quick fixes for when the UCC Portal or your Grades go wrong.",
      
      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Emergency Troubleshooting"
            icon={HelpCircle}
            content="Technical glitches happen. Before you panic or walk all the way to the MIS office, try these verified fixes for common portal and academic issues."
          />

          <div className="grid gap-8">
            <ActionCard 
               title="Problem: 'Invalid Credentials'" 
               desc="Portal refuses login despite correct password."
               details={[
                 "<strong>Incognito Mode</strong>: Fixes aggressive caching.",
                 "<strong>Clear Cache</strong>: Delete browser site data.",
                 "<strong>Forgot Password</strong>: Reset via institutional email.",
                 "<strong>Student ID</strong>: Ensure no leading/trailing spaces."
               ]}
            />
            <ActionCard 
               title="Problem: 'Financial Hold'" 
               desc="Fees paid but registration is blocked."
               details={[
                 "<strong>Wait 24 Hours</strong>: System syncing delay.",
                 "<strong>Transflow Only</strong>: Direct deposits don't auto-sync.",
                 "<strong>Cash Office</strong>: Visit Old Admin with your receipt.",
                 "<strong>Verification</strong>: Check 'Finance' tab in portal."
               ]}
            />
            <ActionCard 
               title="Problem: Missing Grade / 'IC'" 
               desc="Results released but one course is blank."
               details={[
                 "<strong>Act Early</strong>: Must resolve within 2 weeks.",
                 "<strong>IC List</strong>: Check department notice boards.",
                 "<strong>Contact Lecturer</strong>: Bring proof of attendance.",
                 "<strong>IC Penalty</strong>: You cannot graduate with an IC."
               ]}
            />
          </div>

          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
             <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="bg-white/10 p-6 rounded-full border border-white/20">
                   <MessageSquare size={40} className="text-white" />
                </div>
                <div>
                   <h4 className="text-2xl font-black mb-2">Still Stuck?</h4>
                   <p className="text-indigo-100 text-xs font-medium leading-relaxed mb-4 max-w-md">
                      If these steps don't resolve your issue, visit the MIS (Management Information Systems) office located at the Main Library, Ground Floor.
                   </p>
                   <div className="inline-flex bg-white text-indigo-900 px-6 py-2 rounded-2xl font-black text-sm uppercase shadow-sm">
                      Visit MIS Office
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'resources', label: 'Help Desk' },
  ];

  return { sections, tabs };
};

export default FAQsTroubleshooting;