import React from 'react';

const PresidentialReimbursement = () => {
  const sections = [
    {
      title: "Understanding Presidential Reimbursement",
      summary: "Learn about the Presidential Reimbursement for first-year students.",
      content: (
        <div>
          <p className="mb-4">
            The Presidential Reimbursement is a special financial support program for first-year students that reimburses a portion of their admission fees. This initiative aims to reduce the financial burden on new students.
          </p>
        </div>
      ),
      steps: [
        "Check if you're eligible for the Presidential Reimbursement",
        "Ensure you have paid all required admission fees",
        "Keep all payment receipts and proof of payment",
        "Check the student portal for reimbursement announcements",
        "Download the reimbursement application form when available",
        "Fill out the form with accurate information",
        "Attach all required documents",
        "Submit the application before the deadline"
      ],
      commonMistakes: [
        "Not checking eligibility requirements",
        "Losing payment receipts",
        "Providing incorrect information on the application",
        "Missing the application deadline",
        "Not following up on application status"
      ]
    },
    {
      title: "Application Process",
      summary: "Step-by-step guide to applying for Presidential Reimbursement.",
      content: (
        <div>
          <p className="mb-4">
            The application process for Presidential Reimbursement requires attention to detail and proper documentation. Following these steps will ensure your application is processed correctly.
          </p>
        </div>
      ),
      steps: [
        "Log in to the student portal",
        "Navigate to the 'Financial Services' section",
        "Click on 'Presidential Reimbursement Application'",
        "Download the application form",
        "Fill in your personal details accurately",
        "Provide your bank account information for payment",
        "Attach scanned copies of all payment receipts",
        "Attach a copy of your admission letter",
        "Submit the application online",
        "Print a copy of the submitted application for your records"
      ],
      commonMistakes: [
        "Providing incorrect bank account details",
        "Not attaching all required documents",
        "Submitting blurry or unclear document scans",
        "Not keeping a copy of the submitted application",
        "Not checking application status regularly"
      ]
    },
    {
      title: "Tracking Your Reimbursement",
      summary: "How to check the status of your reimbursement application.",
      content: (
        <div>
          <p className="mb-4">
            After submitting your application, it's important to track its progress to ensure you receive your reimbursement in a timely manner.
          </p>
        </div>
      ),
      steps: [
        "Check your student portal regularly for updates",
        "Note the reference number of your application",
        "Contact the Financial Aid Office if you don't receive updates",
        "Check your bank account for the reimbursement payment",
        "Verify that the correct amount was paid",
        "Report any discrepancies immediately",
        "Keep records of all communication regarding your reimbursement"
      ],
      commonMistakes: [
        "Not checking the portal for updates",
        "Losing the application reference number",
        "Not following up if reimbursement is delayed",
        "Not verifying the amount received",
        "Not reporting discrepancies in a timely manner"
      ]
    }
  ];

  return { sections };
};

export default PresidentialReimbursement;