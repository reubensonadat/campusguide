import React from 'react';

const StudyTechniques = () => {
  const sections = [
    {
      title: "Active Learning Methods",
      summary: "Engaging study techniques for better retention.",
      content: (
        <div>
          <p className="mb-4">
            Active learning helps you understand and retain information better than passive reading.
          </p>
        </div>
      ),
      steps: [
        "Use the Feynman Technique to explain concepts simply",
        "Create mind maps to visualize connections",
        "Teach concepts to study partners",
        "Use flashcards for memorization",
        "Practice retrieval by testing yourself",
        "Create summaries in your own words",
        "Use analogies to understand complex topics",
        "Apply concepts to real-world examples"
      ],
      commonMistakes: [
        "Only re-reading notes passively",
        "Highlighting too much without understanding",
        "Not testing yourself regularly",
        "Studying for long periods without breaks",
        "Not making connections between topics"
      ]
    },
    {
      title: "Pomodoro Technique",
      summary: "Using time management for focused study sessions.",
      content: (
        <div>
          <p className="mb-4">
            The Pomodoro Technique helps maintain focus and prevent burnout during study sessions.
          </p>
        </div>
      ),
      steps: [
        "Choose a task to complete",
        "Set a timer for 25 minutes",
        "Work without interruptions until timer rings",
        "Take a 5-minute short break",
        "Repeat the cycle 4 times",
        "Take a longer 15-30 minute break after 4 cycles",
        "Track completed pomodoros",
        "Adjust timing based on your focus span"
      ],
      commonMistakes: [
        "Taking breaks that are too long",
        "Getting distracted during pomodoros",
        "Not tracking completed cycles",
        "Working through scheduled breaks",
        "Not adapting the technique to your needs"
      ]
    },
    {
      title: "Note-Taking Strategies",
      summary: "Effective methods for taking and organizing notes.",
      content: (
        <div>
          <p className="mb-4">
            Good notes are essential for effective studying and revision.
          </p>
        </div>
      ),
      steps: [
        "Use the Cornell Note-Taking System",
        "Create abbreviations for common terms",
        "Use different colors for different topics",
        "Review and revise notes within 24 hours",
        "Convert linear notes to mind maps",
        "Use digital tools for organization",
        "Leave space for adding information later",
        "Create summary sections for each topic"
      ],
      commonMistakes: [
        "Writing everything verbatim",
        "Not reviewing notes regularly",
        "Having disorganized notes",
        "Not using a consistent system",
        "Not customizing methods to subjects"
      ]
    }
  ];

  return { sections };
};

export default StudyTechniques;