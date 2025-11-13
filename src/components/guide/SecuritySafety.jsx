import React from 'react';

const SecuritySafety = () => {
  const sections = [
    {
      title: "Campus Security",
      summary: "Understanding security measures and procedures on campus.",
      content: (
        <div>
          <p className="mb-4">
            UCC has security measures in place to ensure student safety. Knowing these procedures will help you stay safe and know what to do in emergencies.
          </p>
        </div>
      ),
      steps: [
        "Save campus security emergency numbers",
        "Identify security posts and offices on campus",
        "Know the location of emergency call boxes",
        "Understand the visitor access procedures",
        "Report suspicious activities immediately",
        "Follow proper procedures for lost items",
        "Know the curfew times if applicable",
        "Attend security awareness sessions"
      ],
      commonMistakes: [
        "Not having emergency numbers saved",
        "Walking alone at night in poorly lit areas",
        "Not locking doors and windows",
        "Not reporting suspicious activities",
        "Not being aware of surroundings"
      ]
    },
    {
      title: "Personal Safety Tips",
      summary: "Keeping yourself safe on and off campus.",
      content: (
        <div>
          <p className="mb-4">
            Personal safety is your responsibility. These tips will help you stay safe during your time at UCC.
          </p>
        </div>
      ),
      steps: [
        "Always be aware of your surroundings",
        "Avoid walking alone at night",
        "Keep your valuables secure and out of sight",
        "Don't share your room keys with others",
        "Let someone know your whereabouts",
        "Avoid displaying expensive items",
        "Use well-lit paths at night",
        "Trust your instincts about situations"
      ],
      commonMistakes: [
        "Being distracted by phones while walking",
        "Leaving belongings unattended",
        "Sharing too much personal information",
        "Not locking doors when leaving rooms",
        "Ignoring gut feelings about unsafe situations"
      ]
    },
    {
      title: "Emergency Procedures",
      summary: "What to do in various emergency situations.",
      content: (
        <div>
          <p className="mb-4">
            Knowing what to do in emergencies can save lives. Familiarize yourself with these procedures.
          </p>
        </div>
      ),
      steps: [
        "Know the fire assembly points",
        "Learn basic first aid procedures",
        "Understand medical emergency protocols",
        "Know who to contact for different emergencies",
        "Participate in emergency drills",
        "Keep emergency contacts easily accessible",
        "Know the location of first aid kits",
        "Understand severe weather procedures"
      ],
      commonMistakes: [
        "Not knowing emergency contacts",
        "Panicking during emergencies",
        "Not taking emergency drills seriously",
        "Not having a personal emergency plan",
        "Not knowing basic first aid"
      ]
    }
  ];

  return { sections };
};

export default SecuritySafety;