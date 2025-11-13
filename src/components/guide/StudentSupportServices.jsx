import React from 'react';

const StudentSupportServices = () => {
  const sections = [
    {
      title: "Counseling Services",
      summary: "Mental health and counseling support available to students.",
      content: (
        <div>
          <p className="mb-4">
            University life can be challenging, and UCC provides counseling services to support your mental well-being.
          </p>
        </div>
      ),
      steps: [
        "Locate the Counseling Center on campus",
        "Understand that services are confidential",
        "Know how to schedule an appointment",
        "Check if walk-in services are available",
        "Understand the types of counseling offered",
        "Know the emergency contacts for crisis situations",
        "Check if group counseling sessions are available",
        "Understand that seeking help is a sign of strength"
      ],
      commonMistakes: [
        "Not seeking help when needed",
        "Waiting until problems become severe",
        "Not knowing services are confidential",
        "Not following through with appointments",
        "Not utilizing available resources"
      ]
    },
    {
      title: "Academic Support",
      summary: "Resources to help you succeed academically.",
      content: (
        <div>
          <p className="mb-4">
            UCC offers various academic support services to help you achieve your educational goals.
          </p>
        </div>
      ),
      steps: [
        "Visit the Academic Support Center",
        "Find out about tutoring services",
        "Check for writing support services",
        "Look for study skills workshops",
        "Utilize faculty office hours",
        "Join study groups",
        "Use online learning resources",
        "Seek help early when struggling"
      ],
      commonMistakes: [
        "Not seeking help until grades suffer",
        "Not utilizing office hours",
        "Not participating in workshops",
        "Trying to handle difficulties alone",
        "Not knowing available resources"
      ]
    },
    {
      title: "Career Services",
      summary: "Career planning and job search support.",
      content: (
        <div>
          <p className="mb-4">
            Career Services helps you prepare for life after graduation. Start utilizing these services early.
          </p>
        </div>
      ),
      steps: [
        "Visit the Career Services Office",
        "Get help with resume and cover letter writing",
        "Attend career workshops and seminars",
        "Participate in career fairs",
        "Get help with interview preparation",
        "Explore internship opportunities",
        "Utilize alumni networking events",
        "Create a career development plan"
      ],
      commonMistakes: [
        "Waiting until final year to use career services",
        "Not preparing for career fairs",
        "Not building a professional network",
        "Not gaining relevant experience",
        "Not developing career goals"
      ]
    }
  ];

  return { sections };
};

export default StudentSupportServices;