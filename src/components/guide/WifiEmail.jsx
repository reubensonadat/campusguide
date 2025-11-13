import React from 'react';

const WifiEmail = () => {
  const sections = [
    {
      title: "Student Email Setup",
      summary: "How to set up and use your UCC student email.",
      content: (
        <div>
          <p className="mb-4">
            Your UCC student email is the official communication channel for all university matters. Setting it up properly is crucial for staying informed.
          </p>
        </div>
      ),
      steps: [
        "Check your admission letter for email details",
        "Go to the student email portal",
        "Use your student ID as username",
        "Use your default password (usually your index number)",
        "Change your password after first login",
        "Set up recovery options",
        "Forward emails to your personal email if desired",
        "Install the email app on your phone"
      ],
      commonMistakes: [
        "Not checking student email regularly",
        "Using weak passwords",
        "Not setting up recovery options",
        "Not updating email on mobile devices",
        "Missing important university announcements"
      ]
    },
    {
      title: "Current Wi-Fi Credentials",
      summary: "Latest Wi-Fi login information for campus networks.",
      content: (
        <div>
          <p className="mb-4">
            Campus Wi-Fi credentials change periodically. Here are the current login details for accessing the internet on campus.
          </p>
        </div>
      ),
      steps: [
        "Network Name: UCC-STUDENT",
        "Username: Your student ID (e.g., 1234567)",
        "Password: student2024 (check for updates)",
        "Alternative Network: UCC-GUEST",
        "Guest Password: UCC@2024",
        "Check notice boards for password changes",
        "Save the IT helpdesk number: 0501234567",
        "Report connectivity issues immediately"
      ],
      commonMistakes: [
        "Not updating passwords when changed",
        "Sharing Wi-Fi credentials with non-students",
        "Not reporting connection issues",
        "Using too many devices simultaneously",
        "Not logging out after use"
      ]
    },
    {
      title: "Email Best Practices",
      summary: "How to effectively use your student email for university communication.",
      content: (
        <div>
          <p className="mb-4">
            Using your student email effectively ensures you never miss important information from the university.
          </p>
        </div>
      ),
      steps: [
        "Check your email at least once daily",
        "Create folders to organize messages",
        "Set up filters for important senders",
        "Respond to official emails promptly",
        "Use professional email etiquette",
        "Keep your inbox below storage limit",
        "Never share your email password",
        "Report phishing attempts to IT support"
      ],
      commonMistakes: [
        "Letting inbox fill up beyond limit",
        "Deleting important emails accidentally",
        "Not responding to urgent messages",
        "Using unprofessional language",
        "Not recognizing phishing attempts"
      ]
    }
  ];

  return { sections };
};

export default WifiEmail;