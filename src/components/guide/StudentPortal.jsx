import React from 'react';

const StudentPortal = () => {
  const sections = [
    {
      title: "Accessing the Student Portal",
      summary: "Learn how to access and navigate the UCC student portal.",
      content: (
        <div>
          <p className="mb-4">
            The UCC student portal is your gateway to all academic services, including course registration, checking results, fee payments, and accessing important university information.
          </p>
        </div>
      ),
      steps: [
        "Visit the official UCC website (www.ucc.edu.gh)",
        "Click on 'Student Portal' or go directly to portal.ucc.edu.gh",
        "Enter your student ID and password",
        "If first-time login, use your admission index number as password",
        "Change your password after first login",
        "Set up security questions for password recovery",
        "Explore the dashboard and available services"
      ],
      commonMistakes: [
        "Using wrong portal URL (beware of fake portals)",
        "Not changing the default password",
        "Forgetting security questions setup",
        "Not logging out after using public computers",
        "Not checking portal regularly for updates"
      ]
    },
    {
      title: "Password Reset",
      summary: "Learn how to reset your student portal password if you forget it.",
      content: (
        <div>
          <p className="mb-4">
            Forgetting your password can be frustrating, but UCC provides several ways to reset it. Follow these steps to regain access to your account.
          </p>
        </div>
      ),
      steps: [
        "Go to the student portal login page",
        "Click on 'Forgot Password' link",
        "Enter your student ID or index number",
        "Answer your security questions",
        "Create a new password following the requirements",
        "Confirm the new password",
        "Log in with your new password"
      ],
      commonMistakes: [
        "Not setting up security questions initially",
        "Using weak passwords that are easy to guess",
        "Not keeping a record of password hints",
        "Waiting too long to reset a forgotten password",
        "Using the same password for multiple accounts"
      ]
    },
    {
      title: "Portal Features",
      summary: "Discover all the features available on the student portal.",
      content: (
        <div>
          <p className="mb-4">
            The student portal offers many features beyond course registration. Understanding all available services will help you make the most of this tool.
          </p>
        </div>
      ),
      steps: [
        "Check your academic records and results",
        "Register for courses each semester",
        "Access course materials and resources",
        "Check your fee payment status",
        "Print receipts and academic documents",
        "Update your personal information",
        "Access examination timetables and results",
        "Check your accommodation status"
      ],
      commonMistakes: [
        "Not exploring all portal features",
        "Not checking the portal regularly for updates",
        "Not keeping personal information updated",
        "Not printing important documents when needed",
        "Not using the portal to track academic progress"
      ]
    }
  ];

  return { sections };
};

export default StudentPortal;