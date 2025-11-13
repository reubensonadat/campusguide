import React from 'react';

const CourseRegistration = () => {
  const sections = [
    {
      title: "Course Registration Process",
      summary: "Learn how to register for your courses each semester.",
      content: (
        <div>
          <p className="mb-4">
            Course registration is a critical process at the beginning of each semester. Following the correct procedure ensures you're properly registered for all your courses.
          </p>
        </div>
      ),
      steps: [
        "Log in to the student portal",
        "Navigate to 'Course Registration' section",
        "Check your registration window (dates and times)",
        "Select courses based on your program requirements",
        "Ensure you meet prerequisites for selected courses",
        "Check for timetable conflicts",
        "Submit your registration",
        "Print your registration slip",
        "Verify registration with your department"
      ],
      commonMistakes: [
        "Missing the registration window",
        "Not checking course prerequisites",
        "Registering for courses with timetable conflicts",
        "Not verifying registration with the department",
        "Not keeping a copy of the registration slip"
      ]
    },
    {
      title: "Understanding Course Codes",
      summary: "Learn how to read and understand UCC course codes.",
      content: (
        <div>
          <p className="mb-4">
            Course codes at UCC follow a specific format that provides information about the course level, department, and type. Understanding these codes helps in course selection.
          </p>
        </div>
      ),
      steps: [
        "Identify the department code (first 3 letters)",
        "Understand the course level (first digit)",
        "Recognize course sequence numbers",
        "Identify core vs. elective courses",
        "Check credit hours indicated in the code",
        "Understand special course indicators (lab, tutorial, etc.)",
        "Consult your program handbook for course requirements"
      ],
      commonMistakes: [
        "Not understanding course codes before registration",
        "Registering for courses not in your program",
        "Not checking credit hours when planning workload",
        "Not distinguishing between core and elective courses",
        "Not consulting academic advisors when unsure"
      ]
    },
    {
      title: "Registration Tips",
      summary: "Useful tips to make course registration smoother.",
      content: (
        <div>
          <p className="mb-4">
            Course registration can be competitive, especially for popular courses. These tips will help you navigate the process successfully.
          </p>
        </div>
      ),
      steps: [
        "Prepare a list of preferred courses before registration opens",
        "Have backup options ready",
        "Log in early on your registration day",
        "Check your internet connection before starting",
        "Register for core courses first",
        "Balance your workload across the semester",
        "Save your registration frequently",
        "Print confirmation immediately after successful registration"
      ],
      commonMistakes: [
        "Waiting until the last minute to register",
        "Not having backup course options",
        "Not checking system requirements before registration",
        "Not clearing browser cache if experiencing issues",
        "Not verifying successful registration"
      ]
    }
  ];

  return { sections };
};

export default CourseRegistration;