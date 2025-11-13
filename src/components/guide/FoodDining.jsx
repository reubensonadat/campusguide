import React from 'react';

const FoodDining = () => {
  const sections = [
    {
      title: "Campus Dining Halls",
      summary: "Discover dining options available on campus.",
      content: (
        <div>
          <p className="mb-4">
            UCC has several dining halls that provide affordable meal options for students. Understanding these options will help you plan your meals effectively.
          </p>
        </div>
      ),
      steps: [
        "Locate all dining halls on campus",
        "Check meal times and schedules",
        "Know the meal prices and payment options",
        "Check if meal tickets or cards are required",
        "Identify special dietary options if needed",
        "Understand the dining hall rules",
        "Know peak hours to avoid crowds",
        "Check for special meal events"
      ],
      commonMistakes: [
        "Not knowing dining hall schedules",
        "Not having proper payment methods",
        "Going during peak hours without planning",
        "Not checking for dietary accommodations",
        "Not understanding dining hall etiquette"
      ]
    },
    {
      title: "Top 5 Campus Food Spots",
      summary: "Popular food vendors and spots on campus.",
      content: (
        <div>
          <p className="mb-4">
            Beyond dining halls, campus has various food vendors offering diverse options. Here are the top spots students recommend.
          </p>
        </div>
      ),
      steps: [
        "Try the Student Center food court for variety",
        "Visit the Science Block canteen for quick meals",
        "Check the Library café for snacks and drinks",
        "Explore the Main Market area for local dishes",
        "Visit the Sports Complex restaurant for hearty meals",
        "Ask senior students for their recommendations",
        "Check social media for new food spots",
        "Try different spots to find your favorites"
      ],
      commonMistakes: [
        "Sticking to only one food spot",
        "Not trying local Ghanaian dishes",
        "Not checking food hygiene ratings",
        "Not budgeting for food expenses",
        "Not exploring new options when available"
      ]
    },
    {
      title: "Budget-Friendly Eating",
      summary: "Tips for eating well on a student budget.",
      content: (
        <div>
          <p className="mb-4">
            Eating well doesn't have to be expensive. These tips will help you maintain a healthy diet while staying within budget.
          </p>
        </div>
      ),
      steps: [
        "Plan your meals for the week",
        "Compare prices at different vendors",
        "Take advantage of student discounts",
        "Consider cooking if you have kitchen access",
        "Buy fruits and vegetables from local markets",
        "Share meals with friends to try variety",
        "Avoid expensive snacks and drinks",
        "Keep water bottle to stay hydrated"
      ],
      commonMistakes: [
        "Not planning meals ahead",
        "Always buying expensive convenience foods",
        "Not taking advantage of discounts",
        "Wasting food by buying too much",
        "Not considering nutritional value"
      ]
    }
  ];

  return { sections };
};

export default FoodDining;