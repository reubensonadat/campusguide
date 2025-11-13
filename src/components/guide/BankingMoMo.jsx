import React from 'react';

const BankingMoMo = () => {
  const sections = [
    {
      title: "Campus Banking Services",
      summary: "Banking facilities available on and near campus.",
      content: (
        <div>
          <p className="mb-4">
            Having access to banking services is essential for managing your finances as a student. UCC has several banking options available.
          </p>
        </div>
      ),
      steps: [
        "Identify banks with branches on campus",
        "Locate ATMs near your residence and classes",
        "Check which banks offer student accounts",
        "Understand the requirements for opening an account",
        "Know the operating hours of bank branches",
        "Check for mobile banking options",
        "Keep emergency cash for weekends when banks are closed",
        "Save important banking contacts"
      ],
      commonMistakes: [
        "Not having a bank account",
        "Using only one ATM that might be out of service",
        "Not understanding bank charges",
        "Not keeping banking information secure",
        "Not having emergency cash"
      ]
    },
    {
      title: "Mobile Money Services",
      summary: "Using mobile money for transactions and receiving payments.",
      content: (
        <div>
          <p className="mb-4">
            Mobile money (MoMo) is widely used in Ghana and is very convenient for students. Here's how to use it effectively.
          </p>
        </div>
      ),
      steps: [
        "Register for MoMo with a valid ID",
        "Set up your PIN securely",
        "Link your MoMo to your bank account if needed",
        "Learn how to send and receive money",
        "Understand transaction limits and charges",
        "Keep your MoMo number secure",
        "Check balance regularly",
        "Use MoMo for small transactions to save bank trips"
      ],
      commonMistakes: [
        "Using weak PINs",
        "Sharing PIN with others",
        "Not checking transaction confirmations",
        "Not keeping transaction records",
        "Not reporting lost SIM cards immediately"
      ]
    },
    {
      title: "Receiving Payments",
      summary: "How to safely receive money from family and other sources.",
      content: (
        <div>
          <p className="mb-4">
            As a student, you'll need to receive money from various sources. Here's how to do it safely and efficiently.
          </p>
        </div>
      ),
      steps: [
        "Share your correct account details with family",
        "Provide both bank and MoMo options for flexibility",
        "Confirm when you receive payments",
        "Keep records of all transactions",
        "Be cautious of unsolicited money offers",
        "Use official channels for scholarship payments",
        "Inform family about best times to send money",
        "Have emergency contact for urgent financial needs"
      ],
      commonMistakes: [
        "Sharing account details publicly",
        "Not confirming receipt of payments",
        "Falling for scam money offers",
        "Not keeping transaction records",
        "Not having backup payment methods"
      ]
    }
  ];

  return { sections };
};

export default BankingMoMo;