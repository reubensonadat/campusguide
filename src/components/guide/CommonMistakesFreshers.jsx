import React from 'react';

const CommonMistakesFreshers = () => {
  const sections = [
    {
      title: "Academic Mistakes",
      summary: "Common academic errors new students make.",
      content: (
        <div>
          <p className="mb-4">
            Understanding these common academic mistakes will help you avoid them and succeed in your studies.
          </p>
        </div>
      ),
      steps: [
        "Skipping classes thinking attendance doesn't matter",
        "Procrastinating on assignments until last minute",
        "Not seeking help when struggling with courses",
        "Not studying consistently throughout the semester",
        "Not understanding course requirements early",
        "Not participating in class discussions",
        "Not forming study groups",
        "Ignoring feedback from lecturers"
      ],
      commonMistakes: [
        "Thinking university is like high school",
        "Underestimating course difficulty",
        "Not managing time effectively",
        "Not taking notes properly",
        "Not using available resources"
      ]
    },
    {
      title: "Social Mistakes",
      summary: "Social pitfalls to avoid in your first year.",
      content: (
        <div>
          <p className="mb-4">
            Navigating social life in university can be challenging. Avoid these common mistakes.
          </p>
        </div>
      ),
      steps: [
        "Isolating yourself and not making friends",
        "Joining too many clubs at once",
        "Neglecting studies for social activities",
        "Not setting boundaries in relationships",
        "Trying to please everyone",
        "Not exploring diverse friend groups",
        "Getting involved in negative influences",
        "Not maintaining connections with home"
      ],
      commonMistakes: [
        "Being too shy to make friends",
        "Overcommitting socially",
        "Losing focus on academics",
        "Not being true to yourself",
        "Not finding the right balance"
      ]
    },
    {
      title: "Financial Mistakes",
      summary: "Money management errors to avoid.",
      content: (
        <div>
          <p className="mb-4">
            Financial independence can be overwhelming. Learn from these common mistakes.
          </p>
        </div>
      ),
      steps: [
        "Not creating a budget",
        "Overspending in the first month",
        "Not tracking expenses",
        "Lending money without being able to afford it",
        "Not saving for emergencies",
        "Impulse buying",
        "Not understanding financial aid terms",
        "Not seeking financial advice when needed"
      ],
      commonMistakes: [
        "Treating student loans as free money",
        "Not planning for the entire semester",
        "Keeping up with others' spending",
        "Not learning basic financial literacy",
        "Not having emergency funds"
      ]
    },
    {
      title: "Personal Care Mistakes",
      summary: "Self-care errors that affect your university experience.",
      content: (
        <div>
          <p className="mb-4">
            Taking care of yourself is crucial for success. Avoid these common pitfalls.
          </p>
        </div>
      ),
      steps: [
        "Not getting enough sleep",
        "Poor nutrition habits",
        "Not exercising regularly",
        "Ignoring mental health",
        "Not seeking medical help when needed",
        "Not taking breaks from studying",
        "Not maintaining personal hygiene",
        "Not having a support system"
      ],
      commonMistakes: [
        "Sacrificing health for grades",
        "Not recognizing burnout",
        "Not using campus health services",
        "Not maintaining work-life balance",
        "Not asking for help when struggling"
      ]
    }
  ];

  return { sections };
};

export default CommonMistakesFreshers;