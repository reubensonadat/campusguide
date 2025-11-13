import React from 'react';

const ClubsSocieties = () => {
  const sections = [
    {
      title: "Finding Clubs and Societies",
      summary: "How to discover and join student organizations at UCC.",
      content: (
        <div>
          <p className="mb-4">
            UCC has numerous clubs and societies that cater to various interests. Joining these organizations enhances your university experience.
          </p>
        </div>
      ),
      steps: [
        "Attend the clubs and societies fair during orientation",
        "Check the Student Affairs office for a complete list",
        "Look for posters and notices around campus",
        "Follow student organizations on social media",
        "Ask senior students about active clubs",
        "Check departmental notice boards for related societies",
        "Visit the SRC office for information",
        "Attend club meetings as a guest before joining"
      ],
      commonMistakes: [
        "Not exploring different club options",
        "Joining too many clubs at once",
        "Not attending meetings before committing",
        "Not checking club requirements",
        "Not balancing club activities with academics"
      ]
    },
    {
      title: "Types of Student Organizations",
      summary: "Different categories of clubs and societies available.",
      content: (
        <div>
          <p className="mb-4">
            Student organizations at UCC cater to diverse interests. Understanding the types available helps you find the right fit.
          </p>
        </div>
      ),
      steps: [
        "Academic clubs related to your field of study",
        "Religious and faith-based organizations",
        "Sports and fitness clubs",
        "Cultural and international student associations",
        "Community service and volunteer groups",
        "Arts and performance societies",
        "Professional development organizations",
        "Special interest and hobby clubs"
      ],
      commonMistakes: [
        "Limiting yourself to one type of organization",
        "Not stepping out of comfort zones",
        "Not considering leadership opportunities",
        "Not balancing different types of activities",
        "Not exploring new interests"
      ]
    },
    {
      title: "Benefits of Joining Clubs",
      summary: "How student organizations enhance your university experience.",
      content: (
        <div>
          <p className="mb-4">
            Joining clubs and societies offers numerous benefits beyond social activities.
          </p>
        </div>
      ),
      steps: [
        "Develop leadership and teamwork skills",
        "Build professional networks",
        "Enhance your resume with extracurricular activities",
        "Find mentors among senior members and alumni",
        "Apply classroom knowledge in practical settings",
        "Develop time management skills",
        "Create lasting friendships",
        "Contribute to campus and community life"
      ],
      commonMistakes: [
        "Not taking active roles in organizations",
        "Not networking with other members",
        "Not documenting achievements and roles",
        "Not balancing club commitments",
        "Missing growth opportunities"
      ]
    }
  ];

  return { sections };
};

export default ClubsSocieties;