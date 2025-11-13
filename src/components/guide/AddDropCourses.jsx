import React from 'react';

const AddDropCourses = () => {
  const sections = [
    {
      title: "Add/Drop Period",
      summary: "Understanding the add/drop period and its importance.",
      content: (
        <div>
          <p className="mb-4">
            The add/drop period is a specified time at the beginning of each semester when students can add or drop courses from their registration. This period allows you to adjust your schedule based on your academic needs and preferences.
          </p>
          <p>
            During this period, you can make changes to your course selection without academic penalty. It's an important opportunity to ensure your course load is appropriate and aligns with your academic goals.
          </p>
        </div>
      ),
      keyPoints: [
        "The add/drop period typically lasts for the first two weeks of the semester",
        "Changes made during this period do not appear on your academic transcript",
        "You must maintain the minimum credit requirement for your program",
        "Some courses have restrictions on when they can be added or dropped",
        "Financial implications may apply when adding or dropping courses"
      ],
      importantDates: [
        { title: "Add/Drop Period Begins", date: "August 29, 2023" },
        { title: "Add/Drop Period Ends", date: "September 9, 2023" },
        { title: "Last Day to Add with Instructor Permission", date: "September 16, 2023" },
        { title: "Last Day to Drop with 'W' Grade", date: "October 28, 2023" }
      ],
      steps: [
        {
          title: "Check the academic calendar for add/drop dates",
          description: "Use the resources section to find the Registrar's Office page with the academic calendar."
        },
        {
          title: "Review your course load during the first week of classes",
          description: "Attend all classes to understand the workload and requirements before making changes."
        },
        {
          title: "Consult with your academic advisor before making changes",
          description: "Use the resources section to locate your faculty's academic advisor office."
        },
        {
          title: "Log in to the student portal during the add/drop period",
          description: "Access the portal through the UCC website using your student credentials."
        },
        {
          title: "Navigate to the 'Add/Drop Courses' section",
          description: "This option is typically found under the 'Academic Services' or 'Registration' tab."
        },
        {
          title: "Add courses by entering course codes or searching",
          description: "Make sure the courses fit your schedule and meet prerequisites."
        },
        {
          title: "Drop courses by selecting them from your current registration",
          description: "Consider the impact on your credit load and graduation timeline."
        },
        {
          title: "Confirm all changes and print updated registration slip",
          description: "Keep a copy for your records and verify with your department if required."
        }
      ],
      tips: [
        "Make a list of potential alternative courses before the add/drop period begins",
        "Check if added courses have available seats before attempting to register",
        "Consider your overall academic plan when making changes",
        "Be aware of financial implications of adding or dropping courses",
        "Save screenshots of your registration before and after making changes"
      ],
      commonMistakes: [
        "Missing the add/drop deadline",
        "Dropping courses without consulting an advisor",
        "Adding courses without checking prerequisites",
        "Not considering the impact on graduation timeline",
        "Not keeping a record of changes made"
      ],
      consequences: "Missing the add/drop deadline or making uninformed changes can negatively impact your academic progress, financial situation, and graduation timeline.",
      checklist: [
        { text: "Check academic calendar for dates", checked: false },
        { text: "Review current course load", checked: false },
        { text: "Consult with academic advisor", checked: false },
        { text: "Log in to student portal", checked: false },
        { text: "Make course changes", checked: false },
        { text: "Print updated registration slip", checked: false }
      ],
      resources: [
        {
          title: "UCC Student Portal",
          description: "Access your registration and course information",
          url: "https://portal.ucc.edu.gh"
        },
        {
          title: "Academic Calendar",
          description: "Important dates including add/drop periods",
          url: "https://ucc.edu.gh/calendar"
        },
        {
          title: "Registrar's Office",
          description: "Registration and records services",
          url: "https://maps.google.com/?q=Registrar's+Office+University+of+Cape+Coast"
        },
        {
          title: "Course Catalog",
          description: "Browse available courses and prerequisites",
          url: "https://ucc.edu.gh/course-catalog"
        },
        {
          title: "Tuition and Fees Information",
          description: "Financial implications of adding/dropping courses",
          url: "https://ucc.edu.gh/fees"
        }
      ],
      contacts: [
        {
          name: "Registrar's Office",
          role: "Handles registration and academic records",
          contact: "registrar@ucc.edu.gh | +233 123 456 790"
        },
        {
          name: "Student Accounts",
          role: "Manages tuition and fees related to course changes",
          contact: "accounts@ucc.edu.gh | +233 123 456 791"
        }
      ]
    },
    {
      title: "Reasons to Add/Drop Courses",
      summary: "Valid reasons for adding or dropping courses.",
      content: (
        <div>
          <p className="mb-4">
            There are various legitimate reasons to add or drop courses. Understanding these will help you make informed decisions about your course load and academic path.
          </p>
          <p>
            Making changes to your course registration should be a thoughtful process that considers your academic goals, personal circumstances, and graduation requirements.
          </p>
        </div>
      ),
      keyPoints: [
        "Schedule conflicts are a common reason for course changes",
        "Academic difficulty alone is not always a valid reason to drop",
        "Adding courses may have financial implications",
        "Dropping below minimum credits can affect your student status",
        "Some courses have specific add/drop restrictions"
      ],
      importantDates: [
        { title: "Last Day to Add Full Semester Courses", date: "September 9, 2023" },
        { title: "Last Day to Drop Without Record", date: "September 9, 2023" },
        { title: "Last Day to Drop With 'W' Grade", date: "October 28, 2023" },
        { title: "Financial Adjustment Deadline", date: "September 16, 2023" }
      ],
      steps: [
        {
          title: "Identify schedule conflicts that weren't apparent during registration",
          description: "Check your timetable using the resources section to find the Academic Planning Office."
        },
        {
          title: "Evaluate if course content differs from your expectations",
          description: "Review the course syllabus and consult with the instructor if needed."
        },
        {
          title: "Assess if your workload is too heavy or too light",
          description: "Consider your study habits, work commitments, and other responsibilities."
        },
        {
          title: "Verify prerequisites for courses you want to add",
          description: "Use the resources section to access the course catalog and check requirements."
        },
        {
          title: "Consider how changes align with your career goals",
          description: "Consult with your academic advisor about long-term academic planning."
        },
        {
          title: "Document any medical or personal reasons requiring adjustment",
          description: "If applicable, visit the Health Center using the resources section for documentation."
        },
        {
          title: "Check for course cancellations by the university",
          description: "Regularly check your student portal for official announcements."
        }
      ],
      tips: [
        "Attend all classes during the first week before making decisions",
        "Talk to students who have previously taken courses you're considering",
        "Consider the teaching style and evaluation methods of instructors",
        "Balance challenging courses with those that play to your strengths",
        "Keep track of deadlines for different types of course changes"
      ],
      commonMistakes: [
        "Dropping courses because they seem difficult",
        "Adding too many courses without considering workload",
        "Not considering financial implications of adding courses",
        "Dropping required courses without replacement plan",
        "Making changes based on peer pressure rather than personal needs"
      ],
      consequences: "Making poorly considered course changes can extend your time to graduation, increase your tuition costs, and negatively impact your academic performance.",
      checklist: [
        { text: "Identify valid reasons for changes", checked: false },
        { text: "Check course prerequisites", checked: false },
        { text: "Consult with academic advisor", checked: false },
        { text: "Consider financial implications", checked: false },
        { text: "Document special circumstances", checked: false },
        { text: "Make informed decisions", checked: false }
      ],
      resources: [
        {
          title: "Academic Planning Office",
          description: "Get advice on course selection and academic planning",
          url: "https://maps.google.com/?q=Academic+Planning+Office+University+of+Cape+Coast"
        },
        {
          title: "Course Catalog",
          description: "Browse available courses and prerequisites",
          url: "https://ucc.edu.gh/course-catalog"
        },
        {
          title: "Faculty Offices",
          description: "Consult with departmental faculty about course content",
          url: "https://maps.google.com/?q=Faculty+Offices+University+of+Cape+Coast"
        },
        {
          title: "Health Center",
          description: "Get documentation for medical reasons",
          url: "https://maps.google.com/?q=Health+Center+University+of+Cape+Coast"
        },
        {
          title: "Counseling Center",
          description: "Support for personal issues affecting academic performance",
          url: "https://maps.google.com/?q=Counseling+Center+University+of+Cape+Coast"
        }
      ],
      contacts: [
        {
          name: "Academic Advisors",
          role: "Provide guidance on course selection and academic planning",
          contact: "advisors@ucc.edu.gh | +233 123 456 792"
        },
        {
          name: "Counseling Center",
          role: "Support for personal issues affecting academic decisions",
          contact: "counseling@ucc.edu.gh | +233 123 456 793"
        }
      ]
    },
    {
      title: "Add/Drop Process",
      summary: "Step-by-step guide to adding and dropping courses.",
      content: (
        <div>
          <p className="mb-4">
            The process for adding and dropping courses is straightforward but requires attention to detail to ensure it's done correctly. Follow these steps to make changes to your registration.
          </p>
          <p>
            It's important to complete the process before the deadline and verify that your changes have been successfully processed. Always keep documentation of any changes made to your registration.
          </p>
        </div>
      ),
      keyPoints: [
        "The add/drop process is completed online through the student portal",
        "You must meet all prerequisites for courses you want to add",
        "Some courses require instructor permission to add after the first week",
        "Dropping courses may affect your financial aid eligibility",
        "You must maintain the minimum credit requirement for your program"
      ],
      importantDates: [
        { title: "Add/Drop Period Begins", date: "August 29, 2023" },
        { title: "Last Day to Add Without Permission", date: "September 9, 2023" },
        { title: "Last Day to Drop Without Record", date: "September 9, 2023" },
        { title: "Last Day to Drop With 'W' Grade", date: "October 28, 2023" }
      ],
      steps: [
        {
          title: "Log in to the student portal",
          description: "Access the portal through the UCC website using your student credentials."
        },
        {
          title: "Go to 'Course Registration' section",
          description: "This is typically found under the 'Academic Services' tab."
        },
        {
          title: "Click on 'Add/Drop Courses' option",
          description: "This will display your current registration and available options."
        },
        {
          title: "To add a course: enter course code or search for it",
          description: "Verify that the course fits your schedule and that you meet prerequisites."
        },
        {
          title: "To drop a course: select it from your current courses",
          description: "Consider the impact on your credit load and graduation timeline."
        },
        {
          title: "Review changes before submitting",
          description: "Double-check that all changes are correct before finalizing."
        },
        {
          title: "Submit your changes",
          description: "Confirm your submission and wait for the system to process."
        },
        {
          title: "Print your updated registration slip",
          description: "Keep a copy for your records and verify with your department if required."
        },
        {
          title: "Verify changes with your department if required",
          description: "Some departments require verification of course changes."
        }
      ],
      tips: [
        "Complete the process well before the deadline to avoid system issues",
        "Have alternative course options ready in case your first choices are unavailable",
        "Check for any holds on your account that might prevent registration changes",
        "Take screenshots of your registration before and after making changes",
        "Follow up with the Registrar's Office if changes don't appear correctly"
      ],
      commonMistakes: [
        "Not checking if added courses fit into your timetable",
        "Dropping courses without understanding financial implications",
        "Not confirming that changes were successfully processed",
        "Dropping below minimum credit requirements",
        "Not keeping documentation of changes made"
      ],
      consequences: "Errors in the add/drop process can result in incorrect registration, financial penalties, or delays in your academic progress.",
      checklist: [
        { text: "Log in to student portal", checked: false },
        { text: "Navigate to Add/Drop section", checked: false },
        { text: "Make course changes", checked: false },
        { text: "Review changes before submitting", checked: false },
        { text: "Submit changes", checked: false },
        { text: "Print updated registration slip", checked: false },
        { text: "Verify with department if required", checked: false }
      ],
      resources: [
        {
          title: "UCC Student Portal",
          description: "Access your registration and make course changes",
          url: "https://portal.ucc.edu.gh"
        },
        {
          title: "Registrar's Office",
          description: "Get assistance with registration issues",
          url: "https://maps.google.com/?q=Registrar's+Office+University+of+Cape+Coast"
        },
        {
          title: "IT Help Desk",
          description: "Technical support for portal access issues",
          url: "https://maps.google.com/?q=IT+Help+Desk+University+of+Cape+Coast"
        },
        {
          title: "Student Accounts Office",
          description: "Information about financial implications of course changes",
          url: "https://maps.google.com/?q=Student+Accounts+Office+University+of+Cape+Coast"
        },
        {
          title: "Registration Tutorial",
          description: "Step-by-step video guide to the registration process",
          url: "https://ucc.edu.gh/registration-tutorial"
        }
      ],
      contacts: [
        {
          name: "Registrar's Office",
          role: "Handles registration and academic records",
          contact: "registrar@ucc.edu.gh | +233 123 456 790"
        },
        {
          name: "IT Help Desk",
          role: "Provides technical support for the student portal",
          contact: "ithelp@ucc.edu.gh | +233 123 456 794"
        }
      ]
    }
  ];

  return { sections };
};

export default AddDropCourses;