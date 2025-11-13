import React from 'react';

const LibraryServices = () => {
  const sections = [
    {
      title: "Library Access",
      summary: "How to access and use the UCC library facilities.",
      content: (
        <div>
          <p className="mb-4">
            The UCC library is a valuable resource for your academic success. Understanding how to access and use it effectively will enhance your learning experience.
          </p>
        </div>
      ),
      steps: [
        "Register at the library with your student ID",
        "Get your library card or barcode",
        "Familiarize yourself with the library layout",
        "Know the library opening hours",
        "Understand the different sections and collections",
        "Learn how to use the online catalog",
        "Check out the special collections if relevant to your field",
        "Know the rules for library use"
      ],
      commonMistakes: [
        "Not registering at the library early",
        "Not knowing how to use the catalog",
        "Being noisy in quiet study areas",
        "Not returning books on time",
        "Not exploring all library resources"
      ]
    },
    {
      title: "Borrowing Rules",
      summary: "Understanding book borrowing policies and procedures.",
      content: (
        <div>
          <p className="mb-4">
            Knowing the borrowing rules will help you avoid fines and make the most of library resources.
          </p>
        </div>
      ),
      steps: [
        "Know how many books you can borrow at once",
        "Understand the loan periods for different materials",
        "Learn the renewal process for books",
        "Know the overdue fine rates",
        "Understand the rules for reference materials",
        "Check if electronic resources are available",
        "Know how to reserve popular books",
        "Understand inter-library loan options"
      ],
      commonMistakes: [
        "Not knowing due dates",
        "Losing borrowed books",
        "Damaging library materials",
        "Not renewing books on time",
        "Not using electronic resources"
      ]
    },
    {
      title: "Study Spaces",
      summary: "Finding the best study spots in the library.",
      content: (
        <div>
          <p className="mb-4">
            The library offers various study environments. Finding the right one for your needs will improve your study sessions.
          </p>
        </div>
      ),
      steps: [
        "Explore quiet study areas for focused work",
        "Check group study rooms for collaborative work",
        "Find comfortable reading areas for extended sessions",
        "Know the computer lab locations and rules",
        "Check if power outlets are available for laptops",
        "Understand the reservation system for study rooms",
        "Find the best times to visit for availability",
        "Know the food and drink policies"
      ],
      commonMistakes: [
        "Not exploring different study areas",
        "Being disruptive in quiet zones",
        "Not reserving group rooms in advance",
        "Not bringing necessary study materials",
        "Not using library resources effectively"
      ]
    }
  ];

  return { sections };
};

export default LibraryServices;