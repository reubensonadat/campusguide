import React from 'react';

const LabsITServices = () => {
  const sections = [
    {
      title: "Computer Labs",
      summary: "Accessing and using computer labs on campus.",
      content: (
        <div>
          <p className="mb-4">
            UCC provides computer labs for student use. Knowing where they are and how to access them will help you complete your assignments and research.
          </p>
        </div>
      ),
      steps: [
        "Locate all computer labs on campus",
        "Check lab opening hours",
        "Understand the login process for lab computers",
        "Know what software is available",
        "Check if printing services are available in labs",
        "Understand the rules for lab use",
        "Know the process for saving your work",
        "Check if reservation is required during peak times"
      ],
      commonMistakes: [
        "Not saving work frequently",
        "Not logging out properly",
        "Breaking lab rules",
        "Not knowing available software",
        "Not having backup storage devices"
      ]
    },
    {
      title: "IT Support Services",
      summary: "Getting help with IT-related issues.",
      content: (
        <div>
          <p className="mb-4">
            When you encounter IT problems, knowing where to get help will save you time and frustration.
          </p>
        </div>
      ),
      steps: [
        "Locate the IT support center on campus",
        "Save the IT helpdesk contact number",
        "Know the support hours",
        "Understand what issues they can help with",
        "Learn basic troubleshooting steps",
        "Know how to report network issues",
        "Check if remote support is available",
        "Keep your student ID ready for support requests"
      ],
      commonMistakes: [
        "Not seeking help when needed",
        "Not providing enough information about the problem",
        "Waiting too long to report issues",
        "Not trying basic troubleshooting first",
        "Not having backup plans for important deadlines"
      ]
    },
    {
      title: "Campus Wi-Fi",
      summary: "Connecting to and using campus Wi-Fi networks.",
      content: (
        <div>
          <p className="mb-4">
            Campus Wi-Fi provides internet access for your studies. Understanding how to connect and use it effectively is essential.
          </p>
        </div>
      ),
      steps: [
        "Find available Wi-Fi networks on campus",
        "Get the correct login credentials",
        "Connect your devices to the network",
        "Understand the Wi-Fi usage policies",
        "Know the limitations of the network",
        "Learn how to troubleshoot connection issues",
        "Check if guest access is available for visitors",
        "Understand security best practices for Wi-Fi use"
      ],
      commonMistakes: [
        "Not using secure connections",
        "Sharing Wi-Fi credentials",
        "Not understanding usage limits",
        "Not updating device software",
        "Not using VPN when needed"
      ]
    }
  ];

  return { sections };
};

export default LabsITServices;