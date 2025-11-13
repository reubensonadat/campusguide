// src/components/guide/GettingStarted.jsx
import React from 'react';

const GettingStarted = () => {
  const sections = [
    {
      title: "Welcome to University of Cape Coast",
      summary: "Congratulations on your admission! This guide will help you navigate your first days at UCC.",
      content: (
        <div>
          <p className="mb-4">
            The University of Cape Coast (UCC) is one of Ghana's premier universities, known for its excellent academic programs and beautiful campus location. As a new student, you're about to begin an exciting journey of learning and personal growth.
          </p>
          <p>
            This guide will walk you through everything you need to know to get started, from completing your registration to finding your way around campus.
          </p>
        </div>
      ),
      keyPoints: [
        "UCC was established in 1962 and has grown to become a leading university in Ghana",
        "The university offers a wide range of undergraduate and graduate programs",
        "UCC is known for its strong focus on research and community engagement",
        "The campus is located in the historic city of Cape Coast, near the coast of the Gulf of Guinea"
      ],
      importantDates: [
        { title: "Orientation Week", date: "August 15-19, 2023" },
        { title: "Registration Deadline", date: "August 26, 2023" },
        { title: "First Day of Classes", date: "August 29, 2023" },
        { title: "Add/Drop Deadline", date: "September 9, 2023" }
      ],
      steps: [
        {
          title: "Complete your admission acceptance process",
          description: "Log into the admission portal with your credentials and follow the steps to accept your admission offer."
        },
        {
          title: "Pay your admission fees",
          description: "Pay the required admission fees through the approved payment channels. Keep your receipt for future reference."
        },
        {
          title: "Check your admission status on the student portal",
          description: "Regularly check the student portal to confirm your admission status and any updates."
        },
        {
          title: "Print your admission letter",
          description: "Once your admission is confirmed, print your admission letter and other required documents."
        },
        {
          title: "Prepare for orientation week",
          description: "Make arrangements to attend orientation week, which is mandatory for all first-year students."
        },
        {
          title: "Arrange accommodation",
          description: "Apply for on-campus accommodation or arrange for off-campus housing before arriving."
        },
        {
          title: "Attend orientation program",
          description: "Participate in all orientation activities to familiarize yourself with the university."
        }
      ],
      tips: [
        "Start the admission process early to avoid last-minute rush",
        "Keep copies of all documents and receipts",
        "Join the official UCC social media groups for updates",
        "Connect with other new students through official forums"
      ],
      commonMistakes: [
        "Not checking admission status regularly",
        "Waiting until the last minute to pay fees",
        "Missing orientation week activities",
        "Not asking questions when confused",
        "Not familiarizing yourself with the campus before classes start"
      ],
      consequences: "Missing important deadlines or steps in the admission process may result in losing your admission offer or facing delays in your registration.",
      checklist: [
        { text: "Accept admission offer", checked: false },
        { text: "Pay admission fees", checked: false },
        { text: "Check admission status", checked: false },
        { text: "Print admission letter", checked: false },
        { text: "Arrange accommodation", checked: false },
        { text: "Prepare for orientation", checked: false }
      ],
      resources: [
        {
          title: "UCC Student Portal",
          description: "Access your admission status, registration, and other student services",
          url: "https://portal.ucc.edu.gh"
        },
        {
          title: "UCC Admission Guidelines",
          description: "Detailed information about the admission process",
          url: "https://ucc.edu.gh/admissions"
        },
        {
          title: "UCC Virtual Campus Tour",
          description: "Explore the campus from anywhere",
          url: "https://ucc.edu.gh/tour"
        }
      ],
      contacts: [
        {
          name: "Admissions Office",
          role: "Handles all admission-related queries",
          contact: "admissions@ucc.edu.gh | +233 123 456 789"
        },
        {
          name: "Student Affairs",
          role: "Supports student welfare and activities",
          contact: "studentaffairs@ucc.edu.gh | +233 123 456 788"
        }
      ]
    },
    {
      title: "Arrival Checklist",
      summary: "Here's everything you need to bring and do when you arrive on campus.",
      content: (
        <div>
          <p className="mb-4">
            Arriving on campus can be overwhelming, but with proper preparation, you can make the transition smooth. Make sure you have all the necessary documents and items before you arrive.
          </p>
          <p>
            This checklist will help you organize your arrival and ensure you don't forget anything important.
          </p>
        </div>
      ),
      keyPoints: [
        "The university is located in Cape Coast, about 165km from Accra",
        "The campus has various accommodation options for students",
        "There are several banking facilities on campus",
        "The university provides transportation services within campus"
      ],
      importantDates: [
        { title: "Arrival Day for Freshers", date: "August 13, 2023" },
        { title: "Accommodation Check-in", date: "August 14-15, 2023" },
        { title: "Medical Screening", date: "August 16-17, 2023" },
        { title: "Orientation Begins", date: "August 18, 2023" }
      ],
      steps: [
        {
          title: "Print and bring your admission letter",
          description: "You'll need to present this at various checkpoints during registration."
        },
        {
          title: "Bring original and copies of your certificates",
          description: "Include your WASSCE/SSSCE results slip and certificates."
        },
        {
          title: "Bring birth certificate and proof of identity",
          description: "Valid ID such as passport, voter's ID, or national ID card."
        },
        {
          title: "Bring passport-sized photographs",
          description: "At least 4 copies with a white background."
        },
        {
          title: "Bring proof of fee payment",
          description: "Original receipt and at least 2 copies."
        },
        {
          title: "Pack essential toiletries and bedding",
          description: "If you'll be staying in the hostel, bring these essentials."
        },
        {
          title: "Bring necessary electronics",
          description: "Laptop, phone, chargers, and extension cords."
        },
        {
          title: "Pack appropriate clothing",
          description: "Consider the weather and campus dress code."
        },
        {
          title: "Bring some cash for initial expenses",
          description: "For meals, transportation, and other immediate needs."
        }
      ],
      tips: [
        "Label all your belongings with your name and contact information",
        "Make digital copies of all important documents",
        "Arrive a day early if possible to avoid the last-minute rush",
        "Bring a power bank for your phone during registration",
        "Pack a first aid kit with basic medications"
      ],
      commonMistakes: [
        "Forgetting important documents",
        "Not having copies of important papers",
        "Bringing too many unnecessary items",
        "Not having enough cash for initial expenses",
        "Not labeling personal belongings"
      ],
      consequences: "Missing essential documents can delay your registration process and cause unnecessary stress during your arrival.",
      checklist: [
        { text: "Admission letter printed", checked: false },
        { text: "Original certificates packed", checked: false },
        { text: "Birth certificate and ID", checked: false },
        { text: "Passport-sized photos", checked: false },
        { text: "Proof of fee payment", checked: false },
        { text: "Essential toiletries", checked: false },
        { text: "Electronics and chargers", checked: false },
        { text: "Appropriate clothing", checked: false },
        { text: "Cash for initial expenses", checked: false }
      ],
      resources: [
        {
          title: "UCC Campus Map",
          description: "Navigate the campus with ease using this interactive map",
          url: "https://ucc.edu.gh/campus-map"
        },
        {
          title: "Hostel Accommodation Guide",
          description: "Information about hostel facilities and application process",
          url: "https://ucc.edu.gh/accommodation"
        },
        {
          title: "UCC Transportation Services",
          description: "Information about campus shuttle services and routes",
          url: "https://ucc.edu.gh/transport"
        }
      ],
      contacts: [
        {
          name: "Hostel Management",
          role: "Manages all hostel accommodations",
          contact: "hostel@ucc.edu.gh | +233 123 456 787"
        },
        {
          name: "Campus Security",
          role: "Ensures safety and security on campus",
          contact: "security@ucc.edu.gh | +233 123 456 786"
        }
      ]
    },
    {
      title: "Orientation Week",
      summary: "Make the most of orientation week to familiarize yourself with the university.",
      content: (
        <div>
          <p className="mb-4">
            Orientation week is designed to help new students adjust to university life. It's a great opportunity to learn about the university, meet new people, and get answers to your questions.
          </p>
          <p>
            During this week, you'll participate in various activities that will help you understand the university's culture, academic expectations, and available resources.
          </p>
        </div>
      ),
      keyPoints: [
        "Orientation is mandatory for all first-year students",
        "You'll meet your academic advisor during orientation",
        "Various student clubs and societies will be showcased",
        "Campus tours will help you navigate the university facilities"
      ],
      importantDates: [
        { title: "Opening Ceremony", date: "August 18, 2023" },
        { title: "Faculty Orientation", date: "August 19, 2023" },
        { title: "Students' Association Fair", date: "August 20, 2023" },
        { title: "Campus Tours", date: "August 21-22, 2023" },
        { title: "Registration for Courses", date: "August 23-24, 2023" }
      ],
      steps: [
        {
          title: "Attend the official orientation ceremony",
          description: "The opening ceremony marks the beginning of your university journey."
        },
        {
          title: "Participate in faculty/departmental orientation",
          description: "Learn about your specific faculty, department, and program requirements."
        },
        {
          title: "Join campus tours",
          description: "Familiarize yourself with key locations like lecture halls, library, and administrative offices."
        },
        {
          title: "Attend the students' association fair",
          description: "Explore various clubs and societies you can join."
        },
        {
          title: "Sign up for clubs and societies",
          description: "Join groups that align with your interests and career goals."
        },
        {
          title: "Meet your academic advisor",
          description: "Your advisor will guide you through your academic journey."
        },
        {
          title: "Collect your student ID card",
          description: "Your ID gives you access to various campus facilities."
        },
        {
          title: "Register for your courses",
          description: "Select and register for courses for the upcoming semester."
        }
      ],
      tips: [
        "Take notes during important presentations",
        "Ask questions whenever you're unsure about something",
        "Connect with faculty members in your department",
        "Exchange contacts with fellow students",
        "Explore the campus during free time"
      ],
      commonMistakes: [
        "Skipping orientation activities",
        "Not asking questions during sessions",
        "Not taking notes during important presentations",
        "Being too shy to meet new people",
        "Not exploring the campus during tours"
      ],
      consequences: "Missing orientation activities can leave you unprepared for university life and unaware of important resources and opportunities available to you.",
      checklist: [
        { text: "Attend opening ceremony", checked: false },
        { text: "Participate in faculty orientation", checked: false },
        { text: "Join campus tours", checked: false },
        { text: "Attend students' association fair", checked: false },
        { text: "Sign up for clubs/societies", checked: false },
        { text: "Meet academic advisor", checked: false },
        { text: "Collect student ID", checked: false },
        { text: "Register for courses", checked: false }
      ],
      resources: [
        {
          title: "UCC Student Handbook",
          description: "All the rules, regulations, and guidelines you need to know",
          url: "https://ucc.edu.gh/student-handbook"
        },
        {
          title: "Academic Calendar",
          description: "Important dates and deadlines for the academic year",
          url: "https://ucc.edu.gh/calendar"
        },
        {
          title: "Student Clubs and Societies",
          description: "Explore the various student organizations on campus",
          url: "https://ucc.edu.gh/clubs"
        }
      ],
      contacts: [
        {
          name: "Dean of Students",
          role: "Oversees student welfare and development",
          contact: "deanofstudents@ucc.edu.gh | +233 123 456 785"
        },
        {
          name: "Students' Representative Council",
          role: "Represents student interests and organizes activities",
          contact: "src@ucc.edu.gh | +233 123 456 784"
        }
      ]
    }
  ];

  return { sections };
};

export default GettingStarted;