import React from 'react';

const SponsorsFeaturedVendors = () => {
  const sections = [
    {
      title: "Becoming a Featured Vendor",
      summary: "How businesses can become featured in the UCC Campus Guide.",
      content: (
        <div>
          <p className="mb-4">
            The UCC Campus Guide offers opportunities for businesses to reach the student community through featured listings.
          </p>
        </div>
      ),
      steps: [
        "Contact the Campus Guide team via email",
        "Submit your business proposal and services",
        "Provide proof of business registration",
        "Share student discounts or special offers",
        "Complete the vendor application form",
        "Pay the featured listing fee",
        "Provide marketing materials for listing",
        "Wait for approval and listing activation"
      ],
      commonMistakes: [
        "Not providing complete business information",
        "Not having proper business registration",
        "Not offering student benefits",
        "Not following application guidelines",
        "Not providing quality marketing materials"
      ]
    },
    {
      title: "Sponsorship Opportunities",
      summary: "Ways to sponsor the UCC Campus Guide app.",
      content: (
        <div>
          <p className="mb-4">
            Support the Campus Guide while promoting your brand to thousands of UCC students.
          </p>
        </div>
      ),
      steps: [
        "Choose sponsorship level (Bronze, Silver, Gold)",
        "Contact sponsorship team for packages",
        "Submit brand guidelines and materials",
        "Agree on sponsorship terms",
        "Complete sponsorship agreement",
        "Pay sponsorship fees",
        "Receive brand placement in app",
        "Get performance reports and analytics"
      ],
      commonMistakes: [
        "Not understanding sponsorship benefits",
        "Not providing brand materials on time",
        "Not following brand guidelines",
        "Not engaging with student audience",
        "Not measuring sponsorship ROI"
      ]
    },
    {
      title: "Current Featured Partners",
      summary: "Businesses currently featured in the Campus Guide.",
      content: (
        <div>
          <p className="mb-4">
            These businesses offer special deals and services to UCC students.
          </p>
        </div>
      ),
      steps: [
        "LaptopConnect.shop - Student discounts on laptops",
        "UCC Bookstore - Official textbooks and supplies",
        "Campus Eats - Food delivery with student discounts",
        "StudyHub Cafe - Quiet study space with good WiFi",
        "PrintQuick - Affordable printing services",
        "TechFix - Device repair at student rates",
        "FitZone Gym - Student membership packages",
        "CareerLink - Internship and job placement"
      ],
      commonMistakes: [
        "Not taking advantage of student discounts",
        "Not supporting student-friendly businesses",
        "Not providing feedback on services",
        "Not comparing featured options",
        "Not recommending good services"
      ]
    }
  ];

  return { sections };
};

export default SponsorsFeaturedVendors;