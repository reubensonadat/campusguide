import React from 'react';

const AttendanceRegulations = () => {
  const sections = [
    {
      title: "Attendance Requirements",
      summary: "Understanding attendance policies and their importance.",
      content: (
        <div>
          <p className="mb-4">
            Regular attendance is crucial for academic success at UCC. Understanding the attendance requirements will help you maintain good standing.
          </p>
        </div>
      ),
      steps: [
        "Check the minimum attendance requirement (usually 75%)",
        "Know how attendance is tracked in your courses",
        "Understand what counts as excused absence",
        "Know the process for reporting absences",
        "Check if attendance contributes to your grade",
        "Understand the consequences of poor attendance",
        "Know how to recover from attendance deficits",
        "Keep track of your own attendance record"
      ],
      commonMistakes: [
        "Not knowing attendance requirements",
        "Skipping classes unnecessarily",
        "Not providing proper documentation for absences",
        "Not tracking personal attendance",
        "Ignoring attendance warnings"
      ]
    },
    {
      title: "Excused Absences",
      summary: "What constitutes valid reasons for missing classes.",
      content: (
        <div>
          <p className="mb-4">
            Certain absences may be excused if properly documented. Understanding these exceptions helps you manage unavoidable situations.
          </p>
        </div>
      ),
      steps: [
        "Get medical certificates for illness",
        "Provide documentation for family emergencies",
        "Get approval for university representation",
        "Document transportation issues",
        "Report absences as soon as possible",
        "Provide supporting documents promptly",
        "Follow up on submitted documentation",
        "Know the deadline for submitting excuses"
      ],
      commonMistakes: [
        "Not providing proper documentation",
        "Waiting too long to report absences",
        "Not following up on submitted documents",
        "Not understanding what counts as excused",
        "Not keeping copies of documentation"
      ]
    },
    {
      title: "Making Up Missed Work",
      summary: "How to catch up after missing classes.",
      content: (
        <div>
          <p className="mb-4">
            Missing classes doesn't mean falling behind. Here's how to stay on track.
          </p>
        </div>
      ),
      steps: [
        "Get notes from reliable classmates",
        "Contact lecturers for missed materials",
        "Schedule meetings to discuss missed content",
        "Complete missed assignments promptly",
        "Form study groups to catch up",
        "Use online resources to supplement learning",
        "Attend office hours for clarification",
        "Create a plan to cover missed topics"
      ],
      commonMistakes: [
        "Not catching up on missed content",
        "Relying on only one source for notes",
        "Not contacting lecturers for help",
        "Falling further behind after absences",
        "Not taking initiative to learn missed material"
      ]
    }
  ];

  return { sections };
};

export default AttendanceRegulations;