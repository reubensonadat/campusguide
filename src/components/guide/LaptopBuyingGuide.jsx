import React from 'react';

const LaptopBuyingGuide = () => {
  const sections = [
    {
      title: "Choosing the Right Laptop",
      summary: "Factors to consider when buying a laptop for university.",
      content: (
        <div>
          <p className="mb-4">
            A good laptop is essential for your studies. Consider these factors when making your purchase.
          </p>
        </div>
      ),
      steps: [
        "Check your department's software requirements",
        "Consider battery life for long study sessions",
        "Ensure it's lightweight for carrying around campus",
        "Check for adequate RAM (minimum 8GB recommended)",
        "Consider storage space (SSD preferred)",
        "Check warranty and support options",
        "Consider your budget carefully",
        "Read reviews from other students"
      ],
      commonMistakes: [
        "Buying based on brand name alone",
        "Not checking software compatibility",
        "Ignoring battery life",
        "Buying more features than needed",
        "Not considering portability"
      ]
    },
    {
      title: "Budget-Friendly Options",
      summary: "Good laptops that won't break the bank.",
      content: (
        <div>
          <p className="mb-4">
            You don't need to spend a fortune to get a capable laptop for your studies.
          </p>
        </div>
      ),
      steps: [
        "Consider refurbished laptops from reputable sellers",
        "Look for student discounts from manufacturers",
        "Check back-to-school sales",
        "Consider previous generation models",
        "Look at budget brands with good reviews",
        "Check LaptopConnect.shop for student deals",
        "Consider payment plans if needed",
        "Compare prices across multiple retailers"
      ],
      commonMistakes: [
        "Buying the cheapest option without research",
        "Not checking warranty on used laptops",
        "Missing student discount opportunities",
        "Not comparing prices",
        "Buying more laptop than you need"
      ]
    },
    {
      title: "Essential Software",
      summary: "Must-have software for your university laptop.",
      content: (
        <div>
          <p className="mb-4">
            Having the right software enhances your productivity and learning experience.
          </p>
        </div>
      ),
      steps: [
        "Install Microsoft Office (free through university)",
        "Get antivirus software",
        "Install note-taking apps (OneNote, Evernote)",
        "Download reference management software",
        "Install PDF reader and editor",
        "Get cloud storage (Google Drive, OneDrive)",
        "Install subject-specific software required",
        "Set up backup solutions"
      ],
      commonMistakes: [
        "Not installing essential software early",
        "Not using university-provided software",
        "Not having proper security software",
        "Not backing up data",
        "Using pirated software"
      ]
    }
  ];

  return { sections };
};

export default LaptopBuyingGuide;