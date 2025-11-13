import React from 'react';

const IDCard = () => {
  const sections = [
    {
      title: "Student ID Card Collection",
      summary: "How and where to collect your UCC student ID card.",
      content: (
        <div>
          <p className="mb-4">
            Your student ID card is essential for accessing various services on campus, including exams, library services, and identification as a UCC student.
          </p>
        </div>
      ),
      steps: [
        "Complete your registration process",
        "Pay the required ID card fee",
        "Check your student portal for ID card readiness notification",
        "Go to the ID Card Office at the Student Services Center",
        "Bring your admission letter and fee payment receipt",
        "Present yourself for biometric capture (photo and fingerprints)",
        "Collect your ID card after processing (usually takes a few days)",
        "Sign for your ID card upon collection"
      ],
      commonMistakes: [
        "Not paying the ID card fee",
        "Not checking the portal for readiness notification",
        "Going to collect without required documents",
        "Not signing for the ID card upon collection",
        "Losing the ID card and not reporting it immediately"
      ]
    },
    {
      title: "ID Card Usage",
      summary: "How to use your student ID card on campus.",
      content: (
        <div>
          <p className="mb-4">
            Your student ID card serves multiple purposes on campus. Understanding how to use it properly will help you access services efficiently.
          </p>
        </div>
      ),
      steps: [
        "Use for identification during examinations",
        "Access library services and borrowing books",
        "Access computer labs and IT services",
        "Entry to campus facilities and events",
        "Payment identification at campus vendors",
        "Access to your residential hall (if applicable)",
        "Identification for campus transportation services"
      ],
      commonMistakes: [
        "Not carrying the ID card when needed",
        "Lending the ID card to others",
        "Not reporting a lost or stolen ID card immediately",
        "Damaging the ID card through improper handling",
        "Not keeping the ID card safe during holidays"
      ]
    },
    {
      title: "Replacing a Lost ID Card",
      summary: "What to do if you lose your student ID card.",
      content: (
        <div>
          <p className="mb-4">
            Losing your student ID card can be inconvenient, but there's a process to get a replacement. Follow these steps to get a new card quickly.
          </p>
        </div>
      ),
      steps: [
        "Report the loss to the Security Office immediately",
        "Go to the ID Card Office at Student Services Center",
        "Fill out the ID Card Replacement Form",
        "Pay the replacement fee at the cashier",
        "Present the payment receipt at the ID Card Office",
        "Provide a new passport-sized photograph if required",
        "Wait for processing (usually takes a few days)",
        "Collect your new ID card"
      ],
      commonMistakes: [
        "Not reporting the loss immediately",
        "Waiting too long to get a replacement",
        "Not filling out the replacement form correctly",
        "Not paying the required replacement fee",
        "Not updating access permissions with the new card"
      ]
    }
  ];

  return { sections };
};

export default IDCard;