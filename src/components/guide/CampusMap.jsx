import React from 'react';

const CampusMap = () => {
  const sections = [
    {
      title: "UCC Campus Map Overview",
      summary: "Navigate the University of Cape Coast campus with ease using our comprehensive guide.",
      content: (
        <div>
          <p className="mb-4">
            The University of Cape Coast campus is located in Cape Coast, Ghana, and spans a large area with various academic buildings, administrative offices, student facilities, and residential areas. Understanding the campus layout will help you get to your classes on time and make the most of university facilities.
          </p>
          <p className="mb-4">
            Here are the full names and commonly used short forms for key buildings on campus:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Main Library (ML)</strong> - Central library with study spaces and research resources</li>
            <li><strong>Science Block (SB)</strong> - Houses science departments and laboratories</li>
            <li><strong>Science Annex (SA)</strong> - Additional science laboratories and classrooms</li>
            <li><strong>Administration Block (AB)</strong> - Administrative offices including the Vice-Chancellor's office</li>
            <li><strong>Student Center (SC)</strong> - Student services, clubs, and dining facilities</li>
            <li><strong>University Health Center (UHC)</strong> - Medical services for students and staff</li>
            <li><strong>Faculty of Arts (FA)</strong> - Departments of humanities and social sciences</li>
            <li><strong>Faculty of Education (FE)</strong> - Education department offices and lecture halls</li>
            <li><strong>School of Medical Sciences (SMS)</strong> - Medical school facilities and lecture halls</li>
            <li><strong>Business School (BS)</strong> - School of Management and Business Studies</li>
            <li><strong>Science Lecture Theatre (SLT)</strong> - Large lecture hall for science courses</li>
            <li><strong>Amphitheatre (AMP)</strong> - Outdoor venue for events and gatherings</li>
            <li><strong>Physical Education Department (PE)</strong> - Sports facilities and offices</li>
            <li><strong>School of Agriculture (SOA)</strong> - Agricultural sciences department</li>
            <li><strong>School of Nursing (SON)</strong> - Nursing education facilities</li>
            <li><strong>Faculty of Law (FL)</strong> - Law school and moot court</li>
            <li><strong>College of Distance Education (CDE)</strong> - Distance learning administrative offices</li>
            <li><strong>Conference Center (CC)</strong> - Venue for conferences and large events</li>
          </ul>
        </div>
      ),
      keyPoints: [
        "The campus is divided into North and South campuses",
        "Most academic buildings are located on the North campus",
        "The South campus primarily houses residential halls and sports facilities",
        "A shuttle service operates between different parts of campus",
        "Buildings are color-coded for easier identification on maps"
      ],
      importantDates: [
        { title: "Campus Tour for Freshers", date: "August 21-22, 2023" },
        { title: "Map Distribution at Orientation", date: "August 23, 2023" },
        { title: "Shuttle Service Schedule Update", date: "September 1, 2023" }
      ],
      steps: [
        {
          title: "Familiarize yourself with the resources section below",
          description: "The resources section contains Google Maps links to all buildings on campus. Click on any building name to get directions."
        },
        {
          title: "Identify your frequently visited buildings",
          description: "Make a list of buildings you'll need to visit regularly based on your class schedule and activities."
        },
        {
          title: "Save important building links on your phone",
          description: "Bookmark the Google Maps links for buildings you visit frequently for quick access."
        },
        {
          title: "Use the resources to plan your route between classes",
          description: "Before your first day of classes, use the Google Maps links to plan efficient routes between buildings."
        },
        {
          title: "Share building locations with friends",
          description: "If meeting someone on campus, share the Google Maps link to the specific building for easy navigation."
        },
        {
          title: "Check building information before visiting",
          description: "Each resource includes a description of the building, helping you confirm you're going to the right place."
        },
        {
          title: "Use the resources to discover new places",
          description: "Explore the resources to find facilities you might not know about, like specialized labs or student services."
        }
      ],
      tips: [
        "Take screenshots of important building locations for offline access",
        "Use the Google Maps app to save frequently visited buildings",
        "Note the landmarks near each building to help with navigation",
        "Find out the operating hours of buildings before visiting",
        "Check if buildings have multiple entrances for quicker access"
      ],
      commonMistakes: [
        "Not checking building locations before the first day of classes",
        "Relying on others for directions without learning yourself",
        "Not knowing alternative routes to your classes",
        "Forgetting to save important building locations",
        "Not checking if buildings have moved or been renamed"
      ],
      consequences: "Getting lost on campus can make you late for classes and important meetings. It's essential to familiarize yourself with the campus layout and building locations before the semester begins.",
      checklist: [
        { text: "Review building resources", checked: false },
        { text: "Identify frequently visited buildings", checked: false },
        { text: "Save important building links", checked: false },
        { text: "Plan routes between classes", checked: false },
        { text: "Share locations with friends", checked: false },
        { text: "Check building information", checked: false }
      ],
      resources: [
        {
          title: "UCC Campus on Google Maps",
          description: "View the entire University of Cape Coast campus on Google Maps",
          url: "https://maps.google.com/?q=University+of+Cape+Coast,+Cape+Coast,+Ghana"
        },
        {
          title: "Main Library (ML)",
          description: "Central library with study spaces and research resources",
          url: "https://maps.google.com/?q=Main+Library+University+of+Cape+Coast"
        },
        {
          title: "Science Block (SB)",
          description: "Houses science departments and laboratories",
          url: "https://maps.google.com/?q=Science+Block+University+of+Cape+Coast"
        },
        {
          title: "Science Annex (SA)",
          description: "Additional science laboratories and classrooms",
          url: "https://maps.google.com/?q=Science+Annex+University+of+Cape+Coast"
        },
        {
          title: "Administration Block (AB)",
          description: "Administrative offices including the Vice-Chancellor's office",
          url: "https://maps.google.com/?q=Administration+Block+University+of+Cape+Coast"
        },
        {
          title: "Student Center (SC)",
          description: "Student services, clubs, and dining facilities",
          url: "https://maps.google.com/?q=Student+Center+University+of+Cape+Coast"
        },
        {
          title: "University Health Center (UHC)",
          description: "Medical services for students and staff",
          url: "https://maps.google.com/?q=University+Health+Center+University+of+Cape+Coast"
        },
        {
          title: "Faculty of Arts (FA)",
          description: "Departments of humanities and social sciences",
          url: "https://maps.google.com/?q=Faculty+of+Arts+University+of+Cape+Coast"
        },
        {
          title: "Faculty of Education (FE)",
          description: "Education department offices and lecture halls",
          url: "https://maps.google.com/?q=Faculty+of+Education+University+of+Cape+Coast"
        },
        {
          title: "School of Medical Sciences (SMS)",
          description: "Medical school facilities and lecture halls",
          url: "https://maps.google.com/?q=School+of+Medical+Sciences+University+of+Cape+Coast"
        },
        {
          title: "Business School (BS)",
          description: "School of Management and Business Studies",
          url: "https://maps.google.com/?q=Business+School+University+of+Cape+Coast"
        },
        {
          title: "Science Lecture Theatre (SLT)",
          description: "Large lecture hall for science courses",
          url: "https://maps.google.com/?q=Science+Lecture+Theatre+University+of+Cape+Coast"
        },
        {
          title: "Amphitheatre (AMP)",
          description: "Outdoor venue for events and gatherings",
          url: "https://maps.google.com/?q=Amphitheatre+University+of+Cape+Coast"
        },
        {
          title: "Physical Education Department (PE)",
          description: "Sports facilities and offices",
          url: "https://maps.google.com/?q=Physical+Education+Department+University+of+Cape+Coast"
        },
        {
          title: "School of Agriculture (SOA)",
          description: "Agricultural sciences department",
          url: "https://maps.google.com/?q=School+of+Agriculture+University+of+Cape+Coast"
        },
        {
          title: "School of Nursing (SON)",
          description: "Nursing education facilities",
          url: "https://maps.google.com/?q=School+of+Nursing+University+of+Cape+Coast"
        },
        {
          title: "Faculty of Law (FL)",
          description: "Law school and moot court",
          url: "https://maps.google.com/?q=Faculty+of+Law+University+of+Cape+Coast"
        },
        {
          title: "College of Distance Education (CDE)",
          description: "Distance learning administrative offices",
          url: "https://maps.google.com/?q=College+of+Distance+Education+University+of+Cape+Coast"
        },
        {
          title: "Conference Center (CC)",
          description: "Venue for conferences and large events",
          url: "https://maps.google.com/?q=Conference+Center+University+of+Cape+Coast"
        },
        {
          title: "Adehye Hall",
          description: "Female hall of residence",
          url: "https://maps.google.com/?q=Adehye+Hall+University+of+Cape+Coast"
        },
        {
          title: "Oguaa Hall",
          description: "Male hall of residence",
          url: "https://maps.google.com/?q=Oguaa+Hall+University+of+Cape+Coast"
        },
        {
          title: "Casford Hall",
          description: "Male hall of residence",
          url: "https://maps.google.com/?q=Casford+Hall+University+of+Cape+Coast"
        },
        {
          title: "Atlantic Hall",
          description: "Male hall of residence",
          url: "https://maps.google.com/?q=Atlantic+Hall+University+of+Cape+Coast"
        },
        {
          title: "Kwame Nkrumah Hall",
          description: "Male hall of residence",
          url: "https://maps.google.com/?q=Kwame+Nkrumah+Hall+University+of+Cape+Coast"
        },
        {
          title: "Valco Hall",
          description: "Female hall of residence",
          url: "https://maps.google.com/?q=Valco+Hall+University+of+Cape+Coast"
        },
        {
          title: "Superannuation Hall",
          description: "Postgraduate hall of residence",
          url: "https://maps.google.com/?q=Superannuation+Hall+University+of+Cape+Coast"
        }
      ],
      contacts: [
        {
          name: "Campus Security Office",
          role: "Provides security and directions on campus",
          contact: "security@ucc.edu.gh | +233 123 456 786"
        },
        {
          name: "Student Affairs Office",
          role: "Assists students with campus navigation",
          contact: "studentaffairs@ucc.edu.gh | +233 123 456 788"
        }
      ]
    },
    {
      title: "Academic Buildings Navigation",
      summary: "Find your way to important academic locations on campus using our resources.",
      content: (
        <div>
          <p className="mb-4">
            UCC has numerous academic buildings spread across campus. Each faculty and department has its own building or section. Knowing where these are located will help you get to classes on time.
          </p>
        </div>
      ),
      keyPoints: [
        "Most academic buildings are numbered for easier identification",
        "Building codes are used in timetables to indicate class locations",
        "Some buildings have multiple floors and wings",
        "Lecture halls are typically named after the building they're in",
        "Each faculty has a main office building for administrative matters"
      ],
      importantDates: [
        { title: "Academic Buildings Tour", date: "August 21, 2023" },
        { title: "Classroom Allocation Release", date: "August 25, 2023" },
        { title: "Lab Safety Orientation", date: "August 28, 2023" }
      ],
      steps: [
        {
          title: "Use the resources section to locate your faculty building",
          description: "Click on the Google Maps link for your faculty building to get directions before classes start."
        },
        {
          title: "Find lecture halls for your courses using the resources",
          description: "Check your timetable for room codes and use the corresponding Google Maps links to locate these specific rooms."
        },
        {
          title: "Identify lab locations for practical courses",
          description: "Science students should use the resources to find their assigned labs before the first practical session."
        },
        {
          title: "Locate the main library using the resources",
          description: "The library is essential for research and study materials - use the Google Maps link to find it easily."
        },
        {
          title: "Find computer labs and IT services",
          description: "Use the resources to locate these facilities which are crucial for assignments and research work."
        },
        {
          title: "Locate the examination center",
          description: "Use the resources to find where your exams will be held well in advance of the exam period."
        },
        {
          title: "Identify faculty offices for consultation hours",
          description: "Use the resources to find where your lecturers have their offices for academic consultations."
        }
      ],
      tips: [
        "Take screenshots of building directories with your phone",
        "Note the fastest routes between consecutive classes",
        "Check if buildings have multiple entrances for quicker access",
        "Find nearby restrooms and water fountains in each building",
        "Learn the numbering system for rooms in each building"
      ],
      commonMistakes: [
        "Not checking classroom locations before the first day",
        "Not knowing how to get from one class to another efficiently",
        "Not finding out about lab locations before practical sessions",
        "Not knowing where to find faculty members for consultation",
        "Forgetting to check if buildings have multiple entrances"
      ],
      consequences: "Being late or lost on your way to class can negatively impact your academic performance. It's crucial to know the locations of your academic buildings beforehand.",
      checklist: [
        { text: "Locate faculty building", checked: false },
        { text: "Find lecture halls", checked: false },
        { text: "Identify lab locations", checked: false },
        { text: "Know library location", checked: false },
        { text: "Find computer labs", checked: false },
        { text: "Locate examination center", checked: false }
      ],
      resources: [
        {
          title: "Main Library (ML)",
          description: "Central library with study spaces and research resources",
          url: "https://maps.google.com/?q=Main+Library+University+of+Cape+Coast"
        },
        {
          title: "Science Block (SB)",
          description: "Houses science departments and laboratories",
          url: "https://maps.google.com/?q=Science+Block+University+of+Cape+Coast"
        },
        {
          title: "Science Annex (SA)",
          description: "Additional science laboratories and classrooms",
          url: "https://maps.google.com/?q=Science+Annex+University+of+Cape+Coast"
        },
        {
          title: "Science Lecture Theatre (SLT)",
          description: "Large lecture hall for science courses",
          url: "https://maps.google.com/?q=Science+Lecture+Theatre+University+of+Cape+Coast"
        },
        {
          title: "Faculty of Arts (FA)",
          description: "Departments of humanities and social sciences",
          url: "https://maps.google.com/?q=Faculty+of+Arts+University+of+Cape+Coast"
        },
        {
          title: "Faculty of Education (FE)",
          description: "Education department offices and lecture halls",
          url: "https://maps.google.com/?q=Faculty+of+Education+University+of+Cape+Coast"
        },
        {
          title: "School of Medical Sciences (SMS)",
          description: "Medical school facilities and lecture halls",
          url: "https://maps.google.com/?q=School+of+Medical+Sciences+University+of+Cape+Coast"
        },
        {
          title: "Business School (BS)",
          description: "School of Management and Business Studies",
          url: "https://maps.google.com/?q=Business+School+University+of+Cape+Coast"
        },
        {
          title: "School of Agriculture (SOA)",
          description: "Agricultural sciences department",
          url: "https://maps.google.com/?q=School+of+Agriculture+University+of+Cape+Coast"
        },
        {
          title: "School of Nursing (SON)",
          description: "Nursing education facilities",
          url: "https://maps.google.com/?q=School+of+Nursing+University+of+Cape+Coast"
        },
        {
          title: "Faculty of Law (FL)",
          description: "Law school and moot court",
          url: "https://maps.google.com/?q=Faculty+of+Law+University+of+Cape+Coast"
        },
        {
          title: "College of Distance Education (CDE)",
          description: "Distance learning administrative offices",
          url: "https://maps.google.com/?q=College+of+Distance+Education+University+of+Cape+Coast"
        }
      ],
      contacts: [
        {
          name: "Faculty Office",
          role: "Provides information about academic buildings",
          contact: "faculty@ucc.edu.gh | +233 123 456 785"
        },
        {
          name: "Library Information Desk",
          role: "Assists with library navigation and resources",
          contact: "library@ucc.edu.gh | +233 123 456 784"
        }
      ]
    },
    {
      title: "Student Services and Facilities",
      summary: "Locate essential student services across campus using our resources.",
      content: (
        <div>
          <p className="mb-4">
            Student services are essential for your university experience. These include health services, counseling, financial aid, and more. Knowing where these services are located will help you access them when needed.
          </p>
        </div>
      ),
      keyPoints: [
        "Most student services are centralized in the Student Center",
        "Some services require appointments before visiting",
        "Emergency services are available 24/7 at the Health Center",
        "Student services often have extended hours during peak periods",
        "Many services are now available both in-person and online"
      ],
      importantDates: [
        { title: "Student Services Open House", date: "August 22, 2023" },
        { title: "Financial Aid Application Deadline", date: "September 15, 2023" },
        { title: "Career Fair", date: "October 20, 2023" }
      ],
      steps: [
        {
          title: "Use the resources to find the University Health Center",
          description: "Click on the Google Maps link for the Health Center to get directions to medical services."
        },
        {
          title: "Locate the Counseling Center using the resources",
          description: "Use the Google Maps link to find the Counseling Center in the Student Center."
        },
        {
          title: "Identify the Student Affairs Office",
          description: "Use the resources to locate the Student Affairs Office on the first floor of the Administration Block."
        },
        {
          title: "Find the Financial Aid Office",
          description: "Use the Google Maps link to locate the Financial Aid Office in the Student Center."
        },
        {
          title: "Locate the International Students Office (if applicable)",
          description: "Use the resources to find the International Students Office in the Student Center."
        },
        {
          title: "Know where the Career Services Office is",
          description: "Use the Google Maps link to locate the Career Services Office in the Student Center."
        },
        {
          title: "Find the Disability Support Services (if needed)",
          description: "Use the resources to locate the Disability Support Services in the Administration Block."
        }
      ],
      tips: [
        "Save the contact numbers of essential services in your phone",
        "Know the operating hours of each service office",
        "Find out which services require appointments",
        "Keep copies of important documents from service offices",
        "Check if services are available online for convenience"
      ],
      commonMistakes: [
        "Not knowing where to go when you need help",
        "Waiting until you're in crisis to find support services",
        "Not knowing the operating hours of various services",
        "Not knowing how to make appointments with support services",
        "Not keeping contact information for emergency services"
      ],
      consequences: "Not knowing where to find essential student services can lead to unnecessary stress and delays in getting the support you need during your academic journey.",
      checklist: [
        { text: "Locate Health Center", checked: false },
        { text: "Find Counseling Center", checked: false },
        { text: "Identify Student Affairs Office", checked: false },
        { text: "Find Financial Aid Office", checked: false },
        { text: "Locate International Students Office", checked: false },
        { text: "Know Career Services location", checked: false }
      ],
      resources: [
        {
          title: "Student Center (SC)",
          description: "Student services, clubs, and dining facilities",
          url: "https://maps.google.com/?q=Student+Center+University+of+Cape+Coast"
        },
        {
          title: "University Health Center (UHC)",
          description: "Medical services for students and staff",
          url: "https://maps.google.com/?q=University+Health+Center+University+of+Cape+Coast"
        },
        {
          title: "Administration Block (AB)",
          description: "Administrative offices including the Vice-Chancellor's office",
          url: "https://maps.google.com/?q=Administration+Block+University+of+Cape+Coast"
        },
        {
          title: "Amphitheatre (AMP)",
          description: "Outdoor venue for events and gatherings",
          url: "https://maps.google.com/?q=Amphitheatre+University+of+Cape+Coast"
        },
        {
          title: "Physical Education Department (PE)",
          description: "Sports facilities and offices",
          url: "https://maps.google.com/?q=Physical+Education+Department+University+of+Cape+Coast"
        },
        {
          title: "Conference Center (CC)",
          description: "Venue for conferences and large events",
          url: "https://maps.google.com/?q=Conference+Center+University+of+Cape+Coast"
        }
      ],
      contacts: [
        {
          name: "Student Services Hotline",
          role: "24/7 assistance for student emergencies",
          contact: "studentservices@ucc.edu.gh | +233 123 456 789"
        },
        {
          name: "Dean of Students Office",
          role: "Oversees all student support services",
          contact: "deanofstudents@ucc.edu.gh | +233 123 456 785"
        }
      ]
    },
    {
      title: "Halls of Residence",
      summary: "Find student accommodation on campus using our resources.",
      content: (
        <div>
          <p className="mb-4">
            UCC has several halls of residence that provide accommodation for students. Each hall has its own unique character and facilities. Use our resources to locate your assigned hall.
          </p>
        </div>
      ),
      keyPoints: [
        "Halls are divided into male, female, and postgraduate accommodations",
        "Each hall has its own management team and rules",
        "Halls provide basic amenities and common areas",
        "Some halls have dining facilities while others don't",
        "Hall allocation is based on availability and eligibility"
      ],
      importantDates: [
        { title: "Hall Allocation Announcement", date: "August 10, 2023" },
        { title: "Hall Check-in Begins", date: "August 14, 2023" },
        { title: "Hall Orientation", date: "August 18, 2023" }
      ],
      steps: [
        {
          title: "Use the resources to locate your assigned hall",
          description: "Once you receive your hall allocation, use the Google Maps link to find your hall."
        },
        {
          title: "Find nearby facilities to your hall",
          description: "Use the resources to locate dining halls, lecture halls, and other facilities near your hall."
        },
        {
          title: "Plan routes from your hall to your classes",
          description: "Use the Google Maps links to plan efficient routes from your hall to your academic buildings."
        },
        {
          title: "Locate hall administration offices",
          description: "Use the resources to find the administrative office in your hall for check-in procedures."
        },
        {
          title: "Find transportation points near your hall",
          description: "Use the resources to locate shuttle stops and taxi ranks near your hall."
        },
        {
          title: "Identify emergency services near your hall",
          description: "Use the resources to find the nearest health center and security office to your hall."
        },
        {
          title: "Explore recreational facilities near your hall",
          description: "Use the resources to find sports facilities, common areas, and other recreational spots near your hall."
        }
      ],
      tips: [
        "Take photos of the route from your hall to important buildings",
        "Save the Google Maps links of frequently visited locations",
        "Know the emergency exits and assembly points in your hall",
        "Find out the quiet hours and rules in your hall",
        "Identify the nearest food vendors to your hall"
      ],
      commonMistakes: [
        "Not locating your hall before arrival",
        "Not knowing the route from your hall to classes",
        "Not knowing the rules and regulations of your hall",
        "Not finding out about facilities in your hall",
        "Not knowing the location of emergency services"
      ],
      consequences: "Not knowing the location of your hall and important facilities can cause unnecessary stress and make your transition to university life more difficult.",
      checklist: [
        { text: "Locate assigned hall", checked: false },
        { text: "Find nearby facilities", checked: false },
        { text: "Plan routes to classes", checked: false },
        { text: "Locate hall administration", checked: false },
        { text: "Find transportation points", checked: false },
        { text: "Identify emergency services", checked: false }
      ],
      resources: [
        {
          title: "Adehye Hall",
          description: "Female hall of residence",
          url: "https://maps.google.com/?q=Adehye+Hall+University+of+Cape+Coast"
        },
        {
          title: "Oguaa Hall",
          description: "Male hall of residence",
          url: "https://maps.google.com/?q=Oguaa+Hall+University+of+Cape+Coast"
        },
        {
          title: "Casford Hall",
          description: "Male hall of residence",
          url: "https://maps.google.com/?q=Casford+Hall+University+of+Cape+Coast"
        },
        {
          title: "Atlantic Hall",
          description: "Male hall of residence",
          url: "https://maps.google.com/?q=Atlantic+Hall+University+of+Cape+Coast"
        },
        {
          title: "Kwame Nkrumah Hall",
          description: "Male hall of residence",
          url: "https://maps.google.com/?q=Kwame+Nkrumah+Hall+University+of+Cape+Coast"
        },
        {
          title: "Valco Hall",
          description: "Female hall of residence",
          url: "https://maps.google.com/?q=Valco+Hall+University+of+Cape+Coast"
        },
        {
          title: "Superannuation Hall",
          description: "Postgraduate hall of residence",
          url: "https://maps.google.com/?q=Superannuation+Hall+University+of+Cape+Coast"
        }
      ],
      contacts: [
        {
          name: "Hall Management",
          role: "Manages all hall accommodations",
          contact: "halls@ucc.edu.gh | +233 123 456 783"
        },
        {
          name: "Student Affairs",
          role: "Supports student welfare including accommodation",
          contact: "studentaffairs@ucc.edu.gh | +233 123 456 788"
        }
      ]
    }
  ];

  const buildings = [
    {
      id: 1,
      fullName: "Main Library",
      shortForm: "ML",
      description: "Central library with study spaces and research resources",
      url: "https://maps.google.com/?q=Main+Library+University+of+Cape+Coast"
    },
    {
      id: 2,
      fullName: "Science Block",
      shortForm: "SB",
      description: "Houses science departments and laboratories",
      url: "https://maps.google.com/?q=Science+Block+University+of+Cape+Coast"
    },
    {
      id: 3,
      fullName: "Administration Block",
      shortForm: "AB",
      description: "Administrative offices including the Vice-Chancellor's office",
      url: "https://maps.google.com/?q=Administration+Block+University+of+Cape+Coast"
    },
    {
      id: 4,
      fullName: "Student Center",
      shortForm: "SC",
      description: "Student services, clubs, and dining facilities",
      url: "https://maps.google.com/?q=Student+Center+University+of+Cape+Coast"
    },
    {
      id: 5,
      fullName: "University Health Center",
      shortForm: "UHC",
      description: "Medical services for students and staff",
      url: "https://maps.google.com/?q=University+Health+Center+University+of+Cape+Coast"
    },
    {
      id: 6,
      fullName: "Faculty of Arts",
      shortForm: "FA",
      description: "Humanities and social sciences departments",
      url: "https://maps.google.com/?q=Faculty+of+Arts+University+of+Cape+Coast"
    },
    {
      id: 7,
      fullName: "Science Lecture Theatre",
      shortForm: "SLT",
      description: "Large lecture hall for science courses",
      url: "https://maps.google.com/?q=Science+Lecture+Theatre+University+of+Cape+Coast"
    },
    {
      id: 8,
      fullName: "School of Medical Sciences",
      shortForm: "SMS",
      description: "Medical school facilities and lecture halls",
      url: "https://maps.google.com/?q=School+of+Medical+Sciences+University+of+Cape+Coast"
    },
    {
      id: 9,
      fullName: "Business School",
      shortForm: "BS",
      description: "School of Management and Business Studies",
      url: "https://maps.google.com/?q=Business+School+University+of+Cape+Coast"
    },
    {
      id: 10,
      fullName: "Amphitheatre",
      shortForm: "AMP",
      description: "Outdoor venue for events and gatherings",
      url: "https://maps.google.com/?q=Amphitheatre+University+of+Cape+Coast"
    },
    {
      id: 11,
      fullName: "Adehye Hall",
      shortForm: "AH",
      description: "Female hall of residence",
      url: "https://maps.google.com/?q=Adehye+Hall+University+of+Cape+Coast"
    },
    {
      id: 12,
      fullName: "Oguaa Hall",
      shortForm: "OH",
      description: "Male hall of residence",
      url: "https://maps.google.com/?q=Oguaa+Hall+University+of+Cape+Coast"
    },
    {
      id: 13,
      fullName: "Casford Hall",
      shortForm: "CH",
      description: "Male hall of residence",
      url: "https://maps.google.com/?q=Casford+Hall+University+of+Cape+Coast"
    },
    {
      id: 14,
      fullName: "Atlantic Hall",
      shortForm: "ATH",
      description: "Male hall of residence",
      url: "https://maps.google.com/?q=Atlantic+Hall+University+of+Cape+Coast"
    },
    {
      id: 15,
      fullName: "Valco Hall",
      shortForm: "VH",
      description: "Female hall of residence",
      url: "https://maps.google.com/?q=Valco+Hall+University+of+Cape+Coast"
    }
  ];

  const openGoogleMaps = (url) => {
    window.open(url, '_blank');
  };

  return { sections, buildings, openGoogleMaps };
};

export default CampusMap;