import React from 'react';

const Transportation = () => {
  const sections = [
    {
      title: "Campus Shuttle Service",
      summary: "Learn about the university shuttle service and routes.",
      content: (
        <div>
          <p className="mb-4">
            UCC operates a shuttle service to help students move around the large campus efficiently. Understanding the shuttle system will save you time and energy.
          </p>
        </div>
      ),
      steps: [
        "Get a copy of the shuttle routes and schedule",
        "Identify shuttle stops near your classes and residence",
        "Check the shuttle operating hours",
        "Arrive at stops a few minutes before scheduled times",
        "Have your student ID ready for boarding",
        "Know the fare rates and payment methods",
        "Be aware of peak hours when shuttles are crowded",
        "Plan your journeys with buffer time"
      ],
      commonMistakes: [
        "Not knowing the shuttle schedule",
        "Missing shuttles due to late arrival",
        "Not having fare ready",
        "Boarding at unofficial stops",
        "Not having alternative transport plans"
      ]
    },
    {
      title: "Taxi Services",
      summary: "Using taxi services for transportation around and outside campus.",
      content: (
        <div>
          <p className="mb-4">
            Taxis provide flexible transportation options, especially when shuttles are not available or when traveling outside campus.
          </p>
        </div>
      ),
      steps: [
        "Identify official taxi ranks on campus",
        "Know the standard rates for common destinations",
        "Negotiate prices before starting the journey",
        "Use registered taxis with proper identification",
        "Share taxi details with someone when traveling late",
        "Keep emergency contacts handy",
        "Use ride-hailing apps when available",
        "Prefer taxis with working meters"
      ],
      commonMistakes: [
        "Not agreeing on price before the journey",
        "Using unregistered taxis",
        "Not sharing travel details for safety",
        "Not having emergency contacts",
        "Paying more than standard rates"
      ]
    },
    {
      title: "Personal Transportation",
      summary: "Options for personal transportation on and off campus.",
      content: (
        <div>
          <p className="mb-4">
            Some students prefer personal transportation options. Here's what you need to know about bringing or using personal vehicles.
          </p>
        </div>
      ),
      steps: [
        "Check university regulations for personal vehicles",
        "Apply for parking permit if bringing a car",
        "Register your bicycle with campus security",
        "Consider the costs of maintaining a vehicle",
        "Know the parking rules and designated areas",
        "Ensure proper security for your vehicle",
        "Consider weather conditions for transportation choice",
        "Have backup transportation options"
      ],
      commonMistakes: [
        "Not registering vehicles with university",
        "Parking in unauthorized areas",
        "Not considering maintenance costs",
        "Not having proper security for vehicles",
        "Not having backup transportation plans"
      ]
    }
  ];

  return { sections };
};

export default Transportation;