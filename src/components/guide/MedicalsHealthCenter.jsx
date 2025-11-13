import React from 'react';

const MedicalsHealthCenter = () => {
  const sections = [
    {
      title: "Medical Registration",
      summary: "Complete your medical registration at the University Health Center.",
      content: (
        <div>
          <p className="mb-4">
            All students are required to complete medical registration at the University Health Center. This ensures you have access to healthcare services during your time at UCC.
          </p>
        </div>
      ),
      steps: [
        "Visit the University Health Center within the first two weeks of semester",
        "Bring your admission letter and student ID",
        "Fill out the medical registration form",
        "Provide your medical history and any existing conditions",
        "Undergo a basic medical examination",
        "Update your emergency contact information",
        "Receive your medical registration card",
        "Keep the card with your student ID at all times"
      ],
      commonMistakes: [
        "Delaying medical registration",
        "Not providing complete medical history",
        "Not updating emergency contact information",
        "Losing the medical registration card",
        "Not knowing the Health Center operating hours"
      ]
    },
    {
      title: "Health Services Available",
      summary: "Learn about the healthcare services available on campus.",
      content: (
        <div>
          <p className="mb-4">
            The University Health Center provides a range of medical services to students. Knowing what's available will help you seek appropriate care when needed.
          </p>
        </div>
      ),
      steps: [
        "General medical consultations",
        "Emergency care and first aid",
        "Laboratory services",
        "Pharmacy services (basic medications)",
        "Mental health and counseling services",
        "Health education and promotion programs",
        "Referral services to specialized hospitals",
        "Vaccination programs"
      ],
      commonMistakes: [
        "Not seeking medical attention when needed",
        "Using the Health Center for emergencies instead of calling for help",
        "Not following up on referrals to specialized care",
        "Not knowing what services are free vs. paid",
        "Not keeping personal medical records updated"
      ]
    },
    {
      title: "Health Insurance",
      summary: "Understanding health insurance options for students.",
      content: (
        <div>
          <p className="mb-4">
            Health insurance is important for covering medical expenses that might not be provided by the University Health Center. Understanding your options will help you make informed decisions.
          </p>
        </div>
      ),
      steps: [
        "Check if you're covered by the National Health Insurance Scheme (NHIS)",
        "Register for NHIS if not already covered",
        "Consider private health insurance for additional coverage",
        "Understand what services are covered by each insurance option",
        "Keep your insurance card accessible",
        "Know the process for filing insurance claims",
        "Update insurance information when necessary"
      ],
      commonMistakes: [
        "Not having any health insurance",
        "Not understanding what your insurance covers",
        "Not keeping insurance information updated",
        "Not knowing how to use insurance benefits",
        "Not carrying insurance cards when seeking medical care"
      ]
    }
  ];

  return { sections };
};

export default MedicalsHealthCenter;