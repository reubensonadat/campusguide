import React from 'react';

const PrintingStationery = () => {
  const sections = [
    {
      title: "On-Campus Printing Services",
      summary: "Find printing services available within the university.",
      content: (
        <div>
          <p className="mb-4">
            UCC provides printing services at various locations on campus. Knowing where to find these services will help you with your academic needs.
          </p>
        </div>
      ),
      steps: [
        "Visit the main library printing center",
        "Check printing services at the Student Center",
        "Look for printing shops near faculty buildings",
        "Know the printing rates and payment methods",
        "Check if online printing submission is available",
        "Understand the file format requirements",
        "Know the operating hours of each location",
        "Have backup printing options before deadlines"
      ],
      commonMistakes: [
        "Waiting until the last minute to print",
        "Not having files in correct format",
        "Not knowing printing costs",
        "Not having backup printing locations",
        "Not checking printer availability"
      ]
    },
    {
      title: "Recommended Printing Shops",
      summary: "Off-campus printing shops with good services and prices.",
      content: (
        <div>
          <p className="mb-4">
            Sometimes off-campus printing shops offer better services or prices. Here are some recommended options near campus.
          </p>
        </div>
      ),
      steps: [
        "Visit shops near the main campus gate",
        "Check printing services in Amamoma",
        "Look for shops in Kakumdo market area",
        "Ask senior students for their recommendations",
        "Compare prices and services before choosing",
        "Check if they offer binding services",
        "Know their operating hours",
        "Build relationships with shop owners for better service"
      ],
      commonMistakes: [
        "Not comparing prices between shops",
        "Not checking print quality before large orders",
        "Not building relationships with service providers",
        "Not knowing about bulk discounts",
        "Not having multiple shop options"
      ]
    },
    {
      title: "Stationery Shopping",
      summary: "Where to buy stationery and academic supplies.",
      content: (
        <div>
          <p className="mb-4">
            Having the right stationery is important for your studies. Here's where to find affordable supplies.
          </p>
        </div>
      ),
      steps: [
        "Check the university bookstore for basic supplies",
        "Visit stationery shops at the Main Market",
        "Look for supplies in supermarkets near campus",
        "Buy in bulk to save money",
        "Check for student discounts",
        "Consider quality over price for important items",
        "Keep a stock of essential items",
        "Share bulk purchases with roommates"
      ],
      commonMistakes: [
        "Buying everything at expensive places",
        "Not comparing prices",
        "Not stocking up on essentials",
        "Buying low-quality items that don't last",
        "Not looking for student discounts"
      ]
    }
  ];

  return { sections };
};

export default PrintingStationery;