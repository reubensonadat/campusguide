import React from 'react';

const ExamsAssessmentRules = () => {
  const sections = [
    {
      title: "Examination Regulations",
      summary: "Understanding the rules and regulations for examinations at UCC.",
      content: (
        <div>
          <p className="mb-4">
            Examinations are a critical part of your academic evaluation. Understanding the regulations ensures you comply with all requirements and avoid penalties.
          </p>
        </div>
      ),
      steps: [
        "Read the university examination handbook",
        "Know the exam timetable release dates",
        "Check your exam venues before the day",
        "Arrive at least 30 minutes before exam time",
        "Bring your student ID and required materials",
        "Understand what items are prohibited in exam halls",
        "Know the procedures for medical emergencies",
        "Familiarize yourself with exam conduct rules"
      ],
      commonMistakes: [
        "Not reading exam regulations",
        "Arriving late for examinations",
        "Bringing prohibited items to exam halls",
        "Not checking exam venues beforehand",
        "Not knowing what to do during emergencies"
      ]
    },
    {
      title: "Assessment Types",
      summary: "Different types of assessments and how they contribute to your grade.",
      content: (
        <div>
          <p className="mb-4">
            Your final grade is composed of various assessment types. Understanding how each contributes helps you focus your efforts effectively.
          </p>
        </div>
      ),
      steps: [
        "Check course outlines for assessment breakdown",
        "Understand the weight of each assessment",
        "Know the deadlines for all assignments",
        "Understand group work requirements",
        "Check if there are practical assessments",
        "Know the class attendance requirements",
        "Understand how participation is graded",
        "Keep track of your assessment scores"
      ],
      commonMistakes: [
        "Not knowing assessment weights",
        "Missing assignment deadlines",
        "Not contributing to group work",
        "Skipping classes that have attendance marks",
        "Not keeping track of grades"
      ]
    },
    {
      title: "Exam Preparation",
      summary: "Effective strategies for preparing for examinations.",
      content: (
        <div>
          <p className="mb-4">
            Proper preparation is key to exam success. These strategies will help you perform your best.
          </p>
        </div>
      ),
      steps: [
        "Create a study schedule well in advance",
        "Review past exam papers if available",
        "Form study groups with classmates",
        "Attend review sessions organized by lecturers",
        "Get enough sleep before exam days",
        "Prepare all required materials the night before",
        "Eat a good meal before exams",
        "Stay calm and manage exam anxiety"
      ],
      commonMistakes: [
        "Cramming at the last minute",
        "Not getting enough sleep",
        "Skipping meals before exams",
        "Not preparing required materials",
        "Letting anxiety affect performance"
      ]
    }
  ];

  return { sections };
};

export default ExamsAssessmentRules;