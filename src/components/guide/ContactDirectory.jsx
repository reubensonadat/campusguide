import React from 'react';
import { Phone, Globe, Mail, Shield, AlertTriangle } from 'lucide-react';

const ContactDirectory = () => {
  // UCC GUIDE: CONTACT DIRECTORY
  // Verified Data: 2025 Emergency Numbers & Hall Contacts
  // Design: Clean, functional directory with "Call Now" intention.

  const sections = [
    {
      title: "Emergency & Essential Contacts",
      summary: "Save these numbers. They are your lifeline on campus.",
      
      // --- OVERVIEW CONTENT ---
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
            <div className="bg-red-50 p-5 rounded-xl border border-red-100 flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-red-900 text-lg">Campus Emergency</h4>
                <p className="text-sm text-red-800 mb-2">Security, Fire, & Rescue</p>
                <div className="space-y-1">
                  <a href="tel:0553660338" className="block text-lg font-bold text-red-700 hover:underline">055 366 0338</a>
                  <a href="tel:0203005175" className="block text-lg font-bold text-red-700 hover:underline">020 300 5175</a>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-lg">UCC Police Station</h4>
                <p className="text-sm text-blue-800 mb-2">Located near Old Site Gate</p>
                <div className="space-y-1">
                  <a href="tel:0332132411" className="block text-lg font-bold text-blue-700 hover:underline">033 213 2411</a>
                </div>
              </div>
            </div>

             <div className="bg-green-50 p-5 rounded-xl border border-green-100 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <div className="font-bold text-xl">+</div>
              </div>
              <div>
                <h4 className="font-bold text-green-900 text-lg">University Hospital</h4>
                <p className="text-sm text-green-800 mb-2">OPD / Emergency</p>
                <div className="space-y-1">
                  <a href="tel:0332132447" className="block text-lg font-bold text-green-700 hover:underline">033 213 2447</a>
                </div>
              </div>
            </div>

             <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                <div className="font-bold text-xl">F</div>
              </div>
              <div>
                <h4 className="font-bold text-orange-900 text-lg">UCC Fire Service</h4>
                <p className="text-sm text-orange-800 mb-2">Campus Unit</p>
                <div className="space-y-1">
                   <a href="tel:0205388648" className="block text-lg font-bold text-orange-700 hover:underline">020 538 8648</a>
                </div>
              </div>
            </div>
          </div>

          {/* --- HALL PORTERS (First Response) --- */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 text-xl mb-4">Hall Porters' Lodges</h3>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
              <ContactRow name="Casely Hayford Hall" number="033 213 0929" />
              <ContactRow name="Adehye Hall" number="033 213 2572" />
              <ContactRow name="Atlantic Hall" number="033 213 0938" />
              <ContactRow name="Oguaa Hall" number="033 213 2580" />
              <ContactRow name="Valco Hall" number="033 213 0954" />
              <ContactRow name="Kwame Nkrumah Hall" number="033 213 6566" />
              <ContactRow name="SRC Hostel" number="033 213 7167" />
            </div>
          </div>
        </div>
      ),

      // --- CONTACTS TAB DATA (Support Services) ---
      resources: [
        {
          title: "Dean of Students",
          description: "General student welfare.",
          url: "tel:0332132480"
        },
        {
          title: "Counselling Centre",
          description: "Mental health support.",
          url: "tel:0332132726"
        },
        {
          title: "Student Records (Academic Affairs)",
          description: "Transcripts and results.",
          url: "tel:0332132480"
        },
        {
          title: "ID Card Unit",
          description: "Lost ID cards.",
          url: "tel:0332132440"
        }
      ],

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Saved Campus Security Number", checked: false },
        { text: "Saved Hall Porter's Number", checked: false },
        { text: "Located the nearest Fire Extinguisher", checked: false },
        { text: "Added 'ICE' (In Case of Emergency) contact", checked: false }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Emergency' },
    { id: 'resources', label: 'Offices' },
    { id: 'checklist', label: 'Checklist' }
  ];

  return { sections, tabs };
};

// Helper Component for clean list
const ContactRow = ({ name, number }) => (
  <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
    <span className="font-medium text-gray-700">{name}</span>
    <a href={`tel:${number.replace(/\s/g, '')}`} className="text-indigo-600 font-bold hover:underline">{number}</a>
  </div>
);

export default ContactDirectory;