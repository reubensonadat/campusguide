import React from 'react';

const GraduationClearance = () => {
  const sections = [
    {
      title: "Clearance Requirements",
      summary: "Understanding what you need to clear before graduation.",
      content: (
        <div>
          <p className="mb-4">
            Graduation clearance ensures you've met all university requirements before receiving your certificate.
          </p>
        </div>
      ),
      steps: [
        "Check your academic requirements are met",
        "Clear all outstanding fees",
        "Return all library books and materials",
        "Clear any laboratory equipment borrowed",
        "Get clearance from your department",
        "Get clearance from the library",
        "Get clearance from student affairs",
        "Get clearance from accommodation services"
      ],
      commonMistakes: [
        "Starting clearance too late",
        "Not checking all required departments",
        "Not keeping clearance forms",
        "Not following up on pending issues",
        "Not understanding the process"
      ]
    },
    {
      title: "Clearance Process",
      summary: "Step-by-step guide to completing graduation clearance.",
      content: (
        <div>
          <p className="mb-4">
            Follow this process to ensure smooth clearance for graduation.
          </p>
        </div>
      ),
      steps: [
        "Obtain clearance forms from the registrar's office",
        "Start with departmental clearance",
        "Proceed to library clearance",
        "Clear with student affairs",
        "Clear with finance/bursary",
        "Clear with accommodation services",
        "Submit completed forms to registrar",
        "Verify clearance status before graduation"
      ],
      commonMistakes: [
        "Not getting forms early",
        "Not following the correct order",
        "Losing clearance forms",
        "Not verifying final clearance",
        "Starting during peak periods"
      ]
    },
    {
      title: "Long-Term Planning",
      summary: "Planning for graduation throughout your university years.",
      content: (
        <div>
          <p className="mb-4">
            Successful graduation requires planning from your first year.
          </p>
        </div>
      ),
      steps: [
        "Track your course completion each semester",
        "Maintain good academic standing",
        "Pay fees promptly to avoid accumulation",
        "Return borrowed materials on time",
        "Keep records of all transactions",
        "Regularly check your student portal",
        "Meet with your advisor regularly",
        "Plan for graduation expenses early"
      ],
      commonMistakes: [
        "Not tracking progress regularly",
        "Ignoring academic warnings",
        "Accumulating fee arrears",
        "Not keeping important documents",
        "Not planning financially for graduation"
      ]
    }
  ];

  return { sections };
};

export default GraduationClearance;