import React from 'react';

const ContactDirectory = () => {
  const sections = [
    {
      title: "Essential University Contacts",
      summary: "Important phone numbers and offices you should know.",
      content: (
        <div>
          <p className="mb-4">
            Keep these important contacts handy for quick reference when needed.
          </p>
        </div>
      ),
      steps: [
        "Security Office: 0501234567 (24/7)",
        "Health Center: 0501234568",
        "Student Affairs: 0501234569",
        "Examinations Office: 0501234570",
        "Library: 0501234571",
        "IT Support: 0501234572",
        "Bursary/Fee Office: 0501234573",
        "Accommodation Office: 0501234574"
      ],
      commonMistakes: [
        "Not saving emergency contacts",
        "Not knowing office locations",
        "Not knowing operating hours",
        "Not having backup contacts",
        "Not verifying contact numbers"
      ]
    },
    {
      title: "Departmental Contacts",
      summary: "Contacts for various university departments.",
      content: (
        <div>
          <p className="mb-4">
            Department-specific contacts for academic and administrative matters.
          </p>
        </div>
      ),
      steps: [
        "Faculty of Arts: Ext 2001",
        "Faculty of Science: Ext 2002",
        "School of Business: Ext 2003",
        "School of Agriculture: Ext 2004",
        "Medical School: Ext 2005",
        "School of Physical Sciences: Ext 2006",
        "Institute of Education: Ext 2007",
        "Dean of Students: Ext 2008"
      ],
      commonMistakes: [
        "Not knowing department contacts",
        "Not saving department numbers",
        "Not knowing extension dialing",
        "Not having alternative contacts",
        "Not verifying contact information"
      ]
    },
    {
      title: "Emergency Services",
      summary: "Emergency contacts beyond campus security.",
      content: (
        <div>
          <p className="mb-4">
            External emergency services for situations beyond campus capabilities.
          </p>
        </div>
      ),
      steps: [
        "National Emergency: 999/112",
        "Cape Coast Regional Hospital: 0332190000",
        "Cape Coast Police Station: 0332132245",
        "Fire Service: 0302778446",
        "Ambulance Service: 193",
        "Poison Control: 0302219416",
        "Mental Health Helpline: 0800678256",
        "Student Crisis Line: 0800100010"
      ],
      commonMistakes: [
        "Not knowing emergency numbers",
        "Not having local emergency contacts",
        "Not knowing when to call which service",
        "Not teaching roommates emergency procedures",
        "Not having emergency contacts visible"
      ]
    }
  ];

  return { sections };
};

export default ContactDirectory;