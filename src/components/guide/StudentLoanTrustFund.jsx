import React from 'react';

const StudentLoanTrustFund = () => {
  const sections = [
    {
      title: "Understanding Student Loan Trust Fund",
      summary: "Learn about the Student Loan Trust Fund (SLTF) and how it can help finance your education.",
      content: (
        <div>
          <p className="mb-4">
            The Student Loan Trust Fund (SLTF) is a government initiative that provides financial assistance to Ghanaian students pursuing higher education. This loan helps cover tuition fees and living expenses.
          </p>
        </div>
      ),
      steps: [
        "Check if you meet the eligibility criteria for SLTF",
        "Visit the official SLTF website (www.sltf.gov.gh)",
        "Create an account on the SLTF portal",
        "Read and understand the terms and conditions",
        "Gather all required documents for application",
        "Complete the online application form",
        "Submit your application before the deadline",
        "Check your application status regularly"
      ],
      commonMistakes: [
        "Not checking eligibility before applying",
        "Providing incorrect information on the application",
        "Not submitting all required documents",
        "Missing the application deadline",
        "Not following up on application status"
      ]
    },
    {
      title: "Eligibility Requirements",
      summary: "Find out if you're eligible for the Student Loan Trust Fund.",
      content: (
        <div>
          <p className="mb-4">
            Not all students are eligible for the SLTF. Understanding the eligibility requirements will help you determine if you should apply.
          </p>
        </div>
      ),
      steps: [
        "Be a Ghanaian citizen",
        "Be admitted to an accredited tertiary institution",
        "Be pursuing an approved program",
        "Have a valid admission letter",
        "Provide proof of inability to pay fees",
        "Have a guarantor who meets the requirements",
        "Not be in default of any previous loan",
        "Not be benefiting from another scholarship"
      ],
      commonMistakes: [
        "Applying without meeting all eligibility criteria",
        "Not having a qualified guarantor",
        "Not providing accurate financial information",
        "Not understanding the terms of the loan",
        "Applying for multiple scholarships simultaneously without disclosure"
      ]
    },
    {
      title: "Application Process",
      summary: "Step-by-step guide to applying for the Student Loan Trust Fund.",
      content: (
        <div>
          <p className="mb-4">
            The application process for SLTF requires careful attention to detail. Following these steps will help ensure your application is processed correctly.
          </p>
        </div>
      ),
      steps: [
        "Visit the SLTF website and create an account",
        "Fill out the online application form with accurate information",
        "Upload all required documents",
        "Provide your guarantor's information",
        "Submit your application",
        "Check your email for confirmation",
        "Follow up with the SLTF office if needed",
        "Accept the loan offer if approved",
        "Complete the loan agreement process"
      ],
      commonMistakes: [
        "Providing incorrect personal information",
        "Not uploading clear copies of documents",
        "Not following up on application status",
        "Not understanding the repayment terms",
        "Not keeping copies of all submitted documents"
      ]
    },
    {
      title: "Loan Repayment",
      summary: "Understanding your obligations for loan repayment.",
      content: (
        <div>
          <p className="mb-4">
            Repaying your SLTF loan is an important responsibility. Understanding the repayment terms will help you plan your finances after graduation.
          </p>
        </div>
      ),
      steps: [
        "Understand the grace period after graduation",
        "Know when your repayment begins",
        "Set up a repayment plan with SLTF",
        "Make payments on time each month",
        "Inform SLTF of any changes in your contact information",
        "Request deferment if facing financial difficulties",
        "Keep records of all payments made",
        "Plan for early repayment if possible to reduce interest"
      ],
      commonMistakes: [
        "Not understanding when repayment begins",
        "Missing payments or paying late",
        "Not updating contact information",
        "Ignoring communication from SLTF",
        "Not planning for loan repayment in post-graduation budget"
      ]
    }
  ];

  return { sections };
};

export default StudentLoanTrustFund;