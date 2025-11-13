import React from 'react';

const Accommodation = () => {
  const sections = [
    {
      title: "On-Campus Accommodation",
      summary: "Learn about accommodation options within the university campus.",
      content: (
        <div>
          <p className="mb-4">
            UCC provides on-campus accommodation for students. Living on campus offers convenience and easy access to university facilities.
          </p>
          <p>
            The university has several halls of residence, each with its own unique features and facilities. On-campus accommodation provides a safe and supportive environment for students.
          </p>
        </div>
      ),
      keyPoints: [
        "UCC has several halls of residence with different facilities",
        "On-campus accommodation provides easy access to lecture halls and library",
        "Halls have wardens and senior members who provide guidance",
        "Each hall has rules and regulations that must be followed",
        "Accommodation is allocated based on availability and eligibility"
      ],
      importantDates: [
        { title: "Accommodation Application Opens", date: "July 15, 2023" },
        { title: "Accommodation Application Closes", date: "August 5, 2023" },
        { title: "Room Allocation Announcement", date: "August 10, 2023" },
        { title: "Hall Check-in Begins", date: "August 14, 2023" }
      ],
      steps: [
        {
          title: "Check accommodation availability on the student portal",
          description: "Log into the student portal to see available accommodation options."
        },
        {
          title: "Apply for accommodation before the deadline",
          description: "Submit your application through the portal before the specified deadline."
        },
        {
          title: "Pay the accommodation reservation fee",
          description: "Pay the required fee to secure your accommodation application."
        },
        {
          title: "Check your room allocation when announced",
          description: "Regularly check the portal for room allocation announcements."
        },
        {
          title: "Report to the hall of residence on the specified date",
          description: "Arrive at your assigned hall on the specified check-in date."
        },
        {
          title: "Complete the hall registration process",
          description: "Fill out all necessary forms and provide required documents."
        },
        {
          title: "Familiarize yourself with hall rules and regulations",
          description: "Read and understand all hall rules to avoid violations."
        },
        {
          title: "Meet your hall wardens and senior members",
          description: "Introduce yourself to hall authorities who will support you."
        }
      ],
      tips: [
        "Apply for accommodation as early as possible",
        "Keep copies of all accommodation-related documents",
        "Get to know your hall mates and build good relationships",
        "Participate in hall activities to fully experience hall life",
        "Report any maintenance issues promptly to the hall authorities"
      ],
      commonMistakes: [
        "Applying after the deadline",
        "Not paying the reservation fee on time",
        "Not checking allocation announcements",
        "Not following hall rules",
        "Not reporting issues to hall authorities"
      ],
      consequences: "Missing accommodation deadlines or violating hall rules may result in losing your accommodation or facing disciplinary action.",
      checklist: [
        { text: "Apply for accommodation on time", checked: false },
        { text: "Pay reservation fee", checked: false },
        { text: "Check room allocation", checked: false },
        { text: "Prepare required documents", checked: false },
        { text: "Report to hall on time", checked: false },
        { text: "Complete registration process", checked: false }
      ],
      resources: [
        {
          title: "UCC Accommodation Portal",
          description: "Apply for and manage your accommodation",
          url: "https://portal.ucc.edu.gh/accommodation"
        },
        {
          title: "Halls of Residence Guide",
          description: "Information about all halls and their facilities",
          url: "https://ucc.edu.gh/halls"
        },
        {
          title: "Hall Rules and Regulations",
          description: "Guidelines for living in university halls",
          url: "https://ucc.edu.gh/hall-rules"
        }
      ],
      contacts: [
        {
          name: "Hall Management",
          role: "Manages all on-campus accommodations",
          contact: "halls@ucc.edu.gh | +233 123 456 783"
        },
        {
          name: "Student Affairs",
          role: "Supports student welfare including accommodation",
          contact: "studentaffairs@ucc.edu.gh | +233 123 456 788"
        }
      ]
    },
    {
      title: "Off-Campus Accommodation",
      summary: "Tips for finding accommodation outside the university campus.",
      content: (
        <div>
          <p className="mb-4">
            If you don't get on-campus accommodation or prefer to live off-campus, here's how to find suitable housing near the university.
          </p>
          <p>
            Off-campus accommodation offers more independence but requires more responsibility. It's important to find safe and affordable housing that meets your needs.
          </p>
        </div>
      ),
      keyPoints: [
        "Popular off-campus areas include Kakumdo, Amamoma, and Cape Coast Township",
        "Off-campus housing requires more personal responsibility",
        "Transportation costs should be considered when choosing location",
        "Security varies between different off-campus areas",
        "Lease agreements should be carefully reviewed before signing"
      ],
      importantDates: [
        { title: "Start Off-Campus Housing Search", date: "July 1, 2023" },
        { title: "Peak Housing Demand Period", date: "July 15 - August 15, 2023" },
        { title: "Typical Lease Signing Period", date: "August 10-20, 2023" },
        { title: "Move-in Date", date: "August 20, 2023" }
      ],
      steps: [
        {
          title: "Start searching early (at least 2 months before semester)",
          description: "Begin your housing search well in advance to find suitable options."
        },
        {
          title: "Look for housing in areas near campus (Kakumdo, Amamoma, etc.)",
          description: "Focus on areas with easy access to campus and necessary amenities."
        },
        {
          title: "Check university bulletin boards for available listings",
          description: "Look for housing advertisements on campus notice boards."
        },
        {
          title: "Join student housing groups on social media",
          description: "Connect with other students looking for or offering housing."
        },
        {
          title: "Visit properties in person before committing",
          description: "Always inspect properties before making any payments."
        },
        {
          title: "Verify the landlord's credibility",
          description: "Ask for references and check reviews if available."
        },
        {
          title: "Read the lease agreement carefully",
          description: "Understand all terms before signing any contract."
        },
        {
          title: "Get receipts for all payments made",
          description: "Ensure you have proper documentation for all transactions."
        }
      ],
      tips: [
        "Consider proximity to campus when choosing location",
        "Ask about utilities and whether they're included in rent",
        "Take photos of the property before moving in to document its condition",
        "Try to find roommates to share costs",
        "Consider transportation options and costs to campus"
      ],
      commonMistakes: [
        "Starting the search too late",
        "Not viewing properties before paying",
        "Not understanding lease terms",
        "Paying without proper documentation",
        "Not considering transportation costs"
      ],
      consequences: "Rushing into off-campus accommodation without proper research can lead to unsafe living conditions, financial loss, or difficulties commuting to campus.",
      checklist: [
        { text: "Start housing search early", checked: false },
        { text: "Identify preferred areas", checked: false },
        { text: "Join housing groups", checked: false },
        { text: "Visit properties in person", checked: false },
        { text: "Verify landlord credibility", checked: false },
        { text: "Review lease agreement", checked: false },
        { text: "Get receipts for payments", checked: false }
      ],
      resources: [
        {
          title: "UCC Off-Campus Housing Guide",
          description: "Tips and resources for finding housing off-campus",
          url: "https://ucc.edu.gh/off-campus-housing"
        },
        {
          title: "Student Housing Facebook Group",
          description: "Connect with other students for housing options",
          url: "https://facebook.com/groups/ucc-housing"
        },
        {
          title: "Cape Coast Map",
          description: "Navigate areas around the university",
          url: "https://ucc.edu.gh/cape-coast-map"
        }
      ],
      contacts: [
        {
          name: "Student Affairs Office",
          role: "Provides guidance on off-campus housing",
          contact: "studentaffairs@ucc.edu.gh | +233 123 456 788"
        },
        {
          name: "Students' Representative Council",
          role: "May have resources for off-campus housing",
          contact: "src@ucc.edu.gh | +233 123 456 784"
        }
      ]
    },
    {
      title: "Accommodation Tips",
      summary: "Useful tips for a comfortable living experience.",
      content: (
        <div>
          <p className="mb-4">
            Whether on or off-campus, these tips will help you have a better living experience during your time at UCC.
          </p>
          <p>
            Creating a comfortable living environment is essential for academic success. These tips will help you make the most of your accommodation.
          </p>
        </div>
      ),
      keyPoints: [
        "Location affects your daily routine and academic performance",
        "Good relationships with neighbors can enhance your living experience",
        "Understanding your rights and responsibilities is important",
        "Budgeting for accommodation costs is essential",
        "Safety should be a priority when choosing accommodation"
      ],
      importantDates: [
        { title: "Budget Planning", date: "Ongoing" },
        { title: "Safety Check", date: "Monthly" },
        { title: "Maintenance Report", date: "As needed" },
        { title: "Rent Payment", date: "As per agreement" }
      ],
      steps: [
        {
          title: "Choose accommodation close to your faculty building",
          description: "Minimize travel time to lectures by selecting nearby housing."
        },
        {
          title: "Consider security features of the property",
          description: "Ensure proper security measures are in place for your safety."
        },
        {
          title: "Check availability of water and electricity",
          description: "Verify reliable access to essential utilities."
        },
        {
          title: "Understand all costs involved (rent, utilities, etc.)",
          description: "Create a comprehensive budget for all accommodation expenses."
        },
        {
          title: "Get to know your neighbors",
          description: "Build good relationships with those living around you."
        },
        {
          title: "Keep your living space clean and organized",
          description: "Maintain a clean environment for better health and focus."
        },
        {
          title: "Report maintenance issues promptly",
          description: "Address problems quickly to prevent them from worsening."
        },
        {
          title: "Build good relationships with landlords/hall authorities",
          description: "Maintain positive communication with property managers."
        }
      ],
      tips: [
        "Create a monthly budget for accommodation expenses",
        "Document the condition of your accommodation when moving in",
        "Keep emergency contacts readily available",
        "Invest in good quality bedding for better sleep",
        "Consider noise levels when choosing accommodation"
      ],
      commonMistakes: [
        "Not checking utilities availability",
        "Not budgeting for all accommodation costs",
        "Not maintaining good relationships with neighbors",
        "Ignoring maintenance issues",
        "Not understanding lease terms fully"
      ],
      consequences: "Poor accommodation choices can negatively impact your academic performance, financial stability, and overall university experience.",
      checklist: [
        { text: "Research location options", checked: false },
        { text: "Check security features", checked: false },
        { text: "Verify utilities availability", checked: false },
        { text: "Create accommodation budget", checked: false },
        { text: "Document property condition", checked: false },
        { text: "Prepare emergency contacts", checked: false }
      ],
      resources: [
        {
          title: "UCC Student Housing Guide",
          description: "Comprehensive guide to student accommodation",
          url: "https://ucc.edu.gh/housing-guide"
        },
        {
          title: "Budget Calculator",
          description: "Tool to help plan your accommodation expenses",
          url: "https://ucc.edu.gh/budget-calculator"
        },
        {
          title: "Safety Tips for Students",
          description: "Guidelines for staying safe in your accommodation",
          url: "https://ucc.edu.gh/safety-tips"
        }
      ],
      contacts: [
        {
          name: "Student Counseling Center",
          role: "Provides support for accommodation-related stress",
          contact: "counseling@ucc.edu.gh | +233 123 456 782"
        },
        {
          name: "Security Office",
          role: "Offers safety advice for students",
          contact: "security@ucc.edu.gh | +233 123 456 786"
        }
      ]
    }
  ];

  return { sections };
};

export default Accommodation;