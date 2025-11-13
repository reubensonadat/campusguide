import React from 'react';

const PaymentsReceipts = () => {
  const sections = [
    {
      title: "Fee Payment Process",
      summary: "Learn how to pay your fees and keep proper records.",
      content: (
        <div>
          <p className="mb-4">
            Paying your fees on time is essential for maintaining your student status at UCC. Understanding the payment process will help you avoid complications.
          </p>
        </div>
      ),
      steps: [
        "Check the fee structure on the student portal",
        "Generate a payment invoice on the portal",
        "Choose your preferred payment method",
        "Pay at designated banks or mobile money options",
        "Keep your payment receipt or transaction ID",
        "Verify payment on the student portal",
        "Print your fee receipt for records",
        "Contact the finance office if payment is not reflected"
      ],
      commonMistakes: [
        "Paying without generating an invoice first",
        "Not keeping proof of payment",
        "Paying after the deadline",
        "Not verifying payment on the portal",
        "Losing payment receipts"
      ]
    },
    {
      title: "Payment Methods",
      summary: "Different ways to pay your fees at UCC.",
      content: (
        <div>
          <p className="mb-4">
            UCC offers multiple payment options to make fee payment convenient for students. Choose the method that works best for you.
          </p>
        </div>
      ),
      steps: [
        "Bank payment at designated banks",
        "Mobile money payment through authorized platforms",
        "Online payment through the student portal",
        "Bank transfer to university accounts",
        "Payment at the university cashier's office",
        "Ensure you use the correct reference number",
        "Verify payment details before confirming"
      ],
      commonMistakes: [
        "Using incorrect reference numbers",
        "Paying through unauthorized channels",
        "Not confirming payment before leaving the bank",
        "Not getting proper receipts for cash payments",
        "Not checking if payment was successful"
      ]
    },
    {
      title: "Managing Receipts",
      summary: "How to organize and keep track of all your payment receipts.",
      content: (
        <div>
          <p className="mb-4">
            Keeping organized records of all your payments is important for resolving any issues that might arise with your fee payments.
          </p>
        </div>
      ),
      steps: [
        "Create a dedicated folder for all fee receipts",
        "Organize receipts by semester and payment type",
        "Take photos of physical receipts as backup",
        "Download and save electronic receipts",
        "Store receipts in cloud storage as backup",
        "Label receipts clearly with date and purpose",
        "Keep a spreadsheet tracking all payments",
        "Update your records immediately after each payment"
      ],
      commonMistakes: [
        "Not keeping receipts organized",
        "Losing physical receipts",
        "Not having digital backups",
        "Not tracking payment dates",
        "Not verifying amounts against fee structure"
      ]
    },
    {
      title: "Payment Issues",
      summary: "What to do if you encounter problems with fee payments.",
      content: (
        <div>
          <p className="mb-4">
            Sometimes payment issues can occur. Knowing how to resolve them quickly will help you avoid registration problems.
          </p>
        </div>
      ),
      steps: [
        "Check if payment was successfully processed",
        "Verify the reference number used",
        "Contact the bank or payment provider if transaction failed",
        "Visit the finance office with proof of payment",
        "Fill out a payment verification form if needed",
        "Follow up regularly until issue is resolved",
        "Keep documentation of all communication"
      ],
      commonMistakes: [
        "Not reporting payment issues immediately",
        "Not having proof of payment when reporting issues",
        "Waiting too long to follow up",
        "Not keeping records of communication",
        "Assuming the issue will resolve itself"
      ]
    }
  ];

  return { sections };
};

export default PaymentsReceipts;