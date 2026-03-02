import React from 'react';
import { Phone, Shield, AlertTriangle, Plus, Flame } from 'lucide-react';

const ContactDirectory = () => {
  // UCC GUIDE: CONTACT DIRECTORY
  // Updated with Jan 2026 Verified Data (Security, Hospital, and SRC Reps)

  const sections = [
    {
      title: "Emergency & Essential Contacts",
      summary: "Save these numbers. They are your lifeline on campus.",
      
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              In case of any emergency on campus (theft, fire, medical), call the <strong>UCC Emergency Line</strong> or <strong>Campus Security</strong> immediately. 
              Do not rely solely on 191/192/193 as campus response is often faster.
            </p>
          </div>

          {/* --- EMERGENCY GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SECURITY SERVICE */}
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-lg">UCC Security Service</h4>
                <p className="text-sm text-blue-800 mb-2">24/7 Campus Patrol</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:0547284666" className="text-md font-bold text-blue-700 hover:underline">054 728 4666</a>
                  <a href="tel:0555850886" className="text-md font-bold text-blue-700 hover:underline">055 585 0886</a>
                  <a href="tel:0244206070" className="text-md font-bold text-blue-700 hover:underline">024 420 6070</a>
                  <a href="tel:0245219107" className="text-md font-bold text-blue-700 hover:underline">024 521 9107</a>
                </div>
              </div>
            </div>
          </div>

          {/* --- SRC STUDENT SUPPORT TEAM --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-4">SRC Support Team</h3>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 shadow-sm overflow-hidden">
              <ContactRow name="Frank" number="020 054 2620" />
              <ContactRow name="Gideon" number="055 295 2642" />
              <ContactRow name="Theophilus" number="024 670 9816" />
              <ContactRow name="Bright" number="054 656 3286" />
              <ContactRow name="Shadrack" number="059 139 2402" />
              <ContactRow name="Felix" number="024 827 0224" />
            </div>
          </div>
        </div>
      ),
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Emergency' },
  ];

  return { sections, tabs };
};

// Helper Component for clean list
const ContactRow = ({ name, number }) => (
  <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
    <div className="flex flex-col">
      <span className="font-medium text-gray-700">{name}</span>
      <span className="text-xs text-gray-400 uppercase">SRC Representative</span>
    </div>
    <a 
      href={`tel:${number.replace(/\s/g, '')}`} 
      className="text-indigo-600 font-bold hover:underline flex items-center gap-2"
    >
      <Phone size={14} />
      {number}
    </a>
  </div>
);

export default ContactDirectory;