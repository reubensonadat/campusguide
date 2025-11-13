import React from 'react';

const FAQsTroubleshooting = () => {
  const sections = [
    {
      title: "Student Portal Issues",
      summary: "Common portal problems and their solutions.",
      content: (
        <div>
          <p className="mb-4">
            The student portal can sometimes have issues. Here are solutions to common problems.
          </p>
        </div>
      ),
      steps: [
        "Forgot password: Use 'Forgot Password' link",
        "Login error: Clear browser cache and cookies",
        "Page not loading: Try a different browser",
        "Registration error: Check if window is open",
        "Payment not reflecting: Wait 24 hours then contact finance",
        "Results not showing: Check release date first",
        "System slow: Try during off-peak hours",
        "Account locked: Contact IT support"
      ],
      commonMistakes: [
        "Not trying basic troubleshooting first",
        "Not clearing browser cache",
        "Not checking for announcements",
        "Not using supported browsers",
        "Not contacting support when needed"
      ]
    },
    {
      title: "Registration Problems",
      summary: "Common course registration issues and fixes.",
      content: (
        <div>
          <p className="mb-4">
            Course registration can be challenging. Here's how to resolve common issues.
          </p>
        </div>
      ),
      steps: [
        "Course full: Wait for add/drop period",
        "Prerequisite error: Check if you meet requirements",
        "Timetable conflict: Choose alternative sections",
        "Credit limit exceeded: Reduce course load",
        "System error during payment: Verify transaction first",
        "Can't find course: Check course code carefully",
        "Registration locked: Contact your department",
        "Payment successful but not registered: Submit proof to finance"
      ],
      commonMistakes: [
        "Not checking prerequisites early",
        "Not having backup courses",
        "Not verifying payments",
        "Not contacting departments early",
        "Not understanding registration rules"
      ]
    },
    {
      title: "General University Issues",
      summary: "Solutions to other common university problems.",
      content: (
        <div>
          <p className="mb-4">
            Various other issues you might encounter and how to resolve them.
          </p>
        </div>
      ),
      steps: [
        "ID card not working: Go to ID office",
        "Room key lost: Report to hall administration",
        "Library book overdue: Pay fine at library",
        "Exam timetable conflict: Report to exams office immediately",
        "Scholarship delay: Contact financial aid",
        "Accommodation issues: Report to hall warden",
        "Lecturer not showing up: Report to department head",
        "Missing results: Contact examinations office"
      ],
      commonMistakes: [
        "Not reporting issues promptly",
        "Not following proper channels",
        "Not keeping documentation",
        "Not following up on reported issues",
        "Not knowing who to contact"
      ]
    }
  ];

  return { sections };
};

export default FAQsTroubleshooting;