import React from 'react';

const PartTimeWorkGigs = () => {
  const sections = [
    {
      title: "On-Campus Job Opportunities",
      summary: "Finding part-time work within the university.",
      content: (
        <div>
          <p className="mb-4">
            UCC offers various part-time job opportunities for students. These jobs provide income and valuable experience.
          </p>
        </div>
      ),
      steps: [
        "Check the Student Affairs office for job postings",
        "Look for teaching assistant positions in your department",
        "Apply for library assistant roles",
        "Check for administrative assistant positions",
        "Look for research assistant opportunities",
        "Consider campus tour guide positions",
        "Check with the IT department for tech support roles",
        "Apply early as positions fill quickly"
      ],
      commonMistakes: [
        "Not checking job boards regularly",
        "Not preparing proper application documents",
        "Not following up on applications",
        "Not networking with department staff",
        "Not balancing work with studies"
      ]
    },
    {
      title: "Off-Campus Opportunities",
      summary: "Finding part-time work in Cape Coast.",
      content: (
        <div>
          <p className="mb-4">
          Cape Coast offers various part-time opportunities for students outside campus.
          </p>
        </div>
      ),
      steps: [
        "Check local businesses for weekend positions",
        "Look for tutoring opportunities for high school students",
        "Consider hospitality jobs in hotels and restaurants",
        "Check retail positions in shopping areas",
        "Look for freelance opportunities online",
        "Consider gig economy jobs (delivery, rideshare)",
        "Network with local business owners",
        "Check community centers for opportunities"
      ],
      commonMistakes: [
        "Not verifying job legitimacy",
        "Not considering transportation costs",
        "Not understanding labor laws",
        "Not negotiating fair wages",
        "Not balancing work with academic commitments"
      ]
    },
    {
      title: "Balancing Work and Studies",
      summary: "Tips for managing work without compromising academics.",
      content: (
        <div>
          <p className="mb-4">
            Working while studying requires careful time management to succeed in both areas.
          </p>
        </div>
      ),
      steps: [
        "Limit work hours to 15-20 per week",
        "Create a detailed weekly schedule",
        "Choose jobs with flexible hours",
        "Communicate with employers about exam periods",
        "Use time between classes efficiently",
        "Prioritize sleep and health",
        "Know when to reduce work hours",
        "Choose jobs related to your field when possible"
      ],
      commonMistakes: [
        "Working too many hours",
        "Not communicating with employers",
        "Neglecting health and sleep",
        "Not adjusting work during exam periods",
        "Not choosing jobs wisely"
      ]
    }
  ];

  return { sections };
};

export default PartTimeWorkGigs;