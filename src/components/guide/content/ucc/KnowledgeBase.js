// Rich knowledge base for the UCC Campus Map Modals
// Sourced from geospatial, acoustic, and functional analyses.

export const UCC_KNOWLEDGE_BASE = {
  "science market": {
    title: "University of Cape Coast Market (Science Market)",
    tags: ["Commercial", "High-Density", "New Site"],
    history: "The University of Cape Coast Market, frequently referred to as the Science Market, serves as a pivotal commercial center for staff, students, and neighboring communities. It operates as a micro-economy within the campus, functioning similarly to the bustling Kotokuraba market in the wider Cape Coast metropolis.",
    architecture: "Situated in the New Site at the exact coordinates of 5.1155° N, 1.2909° W, the spatial positioning of this market is highly deliberate. It is located exactly 60 meters from the central administration block and 90 meters from the College of Agriculture and Natural Sciences building. This specific triangulation reveals a deliberate urban planning strategy: zoning commercial activity at the nexus of administrative and academic pedestrian flow to maximize economic utility and accessibility.",
    statistics: {
      "Geospatial Anchor": "5.1155° N, 1.2909° W",
      "Distance to Admin": "60 meters",
      "Distance to CANS": "90 meters"
    },
    imageFallback: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "acecor": {
    title: "ACECoR Multipurpose Building",
    tags: ["Research", "Geospatial", "Old Site"],
    history: "The Africa Centre of Excellence in Coastal Resilience (ACECoR) building serves as a critical hub for advanced geospatial information systems (GIS), remote sensing, and coastal management research. The facility houses state-of-the-art laboratories designed to centralize complex datasets to aid in the sustainable governance of marine resources.",
    architecture: "Located within the Old Site area. Rigorous geotechnical investigations were conducted utilizing percussion boring methods. These engineering surveys pinpointed Borehole No. 1 at Latitude 5.10227° N, Longitude -1.28471° W. The existence of exact geotechnical coordinates for this site underscores the rigorous environmental and structural planning governing new physical developments within the university's coastal ecosystem.",
    statistics: {
      "Geospatial Anchor": "5.10227° N, -1.28471° W",
      "Distance to Alumni Hall": "1.8 km",
      "Distance to Stadium": "250 meters"
    },
    imageFallback: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "old admin": {
    title: "The Old Central Administration",
    tags: ["Administrative", "Historical", "Old Site"],
    history: "Before the massive migration of central administrative duties to the New Site, this building served as the primary operational hub for the Vice-Chancellor's office, the registry, and human resource management.",
    architecture: "At the heart of the Southern Campus, its spatial relevance is maintained by its proximity to legacy academic departments. Notably, the Department of Vocational and Technical Educational (VOTEC) is firmly anchored here, providing continuity of academic function in an area that has largely transitioned into a residential and healthcare zone.",
    statistics: {
      "Era": "Mid-20th Century",
      "Primary Functions": "Legacy Administration, VOTEC"
    },
    imageFallback: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "hospital": {
    title: "University Hospital & Health Infrastructure",
    tags: ["Healthcare", "Emergency", "Old Site"],
    history: "Evolved significantly since its modest inception in 1963. Originally beginning as a small infirmary attached to Adehye Hall, it has expanded into a fully functional Directorate comprising the main UCC Hospital and the Environmental Health Section (EHS).",
    architecture: "Operating on a 24/7 basis, this critical facility anchors the Southern Campus and employs a hub-and-spoke model of healthcare delivery. While the main hospital anchors the Old Site, a decentralized annex known as the Students' Clinic is located at the basement of the Large Lecture Theatre (LLT) on the Northern Campus (New Site) to minimize the transit burden on students.",
    statistics: {
      "Established": "1963",
      "Annex": "LLT Basement (New Site)",
      "Operating Hours": "24/7"
    },
    imageFallback: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "oguaa hall": {
    title: "Oguaa Hall (The Premier Hall)",
    tags: ["Residential", "Mixed-Gender", "Old Site", "High Noise"],
    history: "Widely regarded and self-identified as 'The Premier Hall', it operates under an explicit constitution emphasizing unity, friendship, peace, and good governance. The physical layout includes the Junior Common Room (JRC), and a large forecourt that frequently serves as the epicenter for cultural, intellectual, and social activities.",
    architecture: "Spatially heavily integrated into the student experience, located a five-minute walk from the University Hospital. The area surrounding the 'Old Library' is noted as a highly popular green space immediately adjacent to Oguaa Hall. However, its open-access forecourt has occasionally made it a focal point for spatial conflict with rival halls.",
    statistics: {
      "Daytime Noise Level": "60 dB (Non-Compliant)",
      "Nighttime Noise Level": "55 dB (Non-Compliant)",
      "Proximity to Hospital": "5 minutes"
    },
    imageFallback: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "atlantic hall": {
    title: "Atlantic Hall (ATL)",
    tags: ["Residential", "Mixed-Gender", "Athletics", "Old Site"],
    history: "A mixed-gender residential facility renowned for its intense socio-cultural rivalry with Oguaa Hall and its profound dominance in university athletics. Atlantic Hall has consistently demonstrated overwhelming dominance, capturing the championship trophy at the 37th Annual Inter Halls Athletic competition.",
    architecture: "Its spatial adjacency to Oguaa Hall on the older, more compact Southern Campus creates an environment where physical and psychological boundaries are easily crossed. This geographic closeness facilitates the intense, competitive, and sometimes volatile interactions that characterize the relationship between the two halls.",
    statistics: {
      "Athletic Rank": "Champions (37th Annual)",
      "Zone": "Southern Campus (Old Site)"
    },
    imageFallback: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "adehye hall": {
    title: "Adehye Hall",
    tags: ["Residential", "All-Female", "Old Site", "Low Noise"],
    history: "Holds the unique distinction of being the only exclusively female hall of residence at the University of Cape Coast. The hall served as the historical site of the university's very first infirmary before the construction of the larger University Hospital.",
    architecture: "The architecture reflects a deep institutional commitment to creating a highly protected and intellectually nurturing environment. It recently modernized with a dedicated E-Library. Acoustic data reveals it is the quietest hall on campus, falling comfortably below permissible daytime and nighttime noise limits.",
    statistics: {
      "Daytime Noise Level": "49 dB (Compliant - Lowest)",
      "Nighttime Noise Level": "45 dB (Compliant - Lowest)",
      "Special Facilities": "Dedicated E-Library"
    },
    imageFallback: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "central administration block": {
    title: "Adow Obeng Central Administration Block",
    tags: ["Administrative", "Command Center", "New Site"],
    history: "The shift in administrative gravity to the New Site is physically embodied by the imposing Adow Obeng Central Administration Block (Block B). It serves as the contemporary command center for the entire university system.",
    architecture: "A modern, multi-story facility designed to house essential student service offices. Its first floor houses the Students' Financial Support Office. This centralization strategy effectively minimizes the transit time for students and staff between critical academic and administrative services, optimizing daily operational flow.",
    statistics: {
      "Zone": "Northern Campus (New Site)",
      "Key Offices": "Vice-Chancellor, Financial Support"
    },
    imageFallback: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "casford hall": {
    title: "Casely Hayford Hall (Casford)",
    tags: ["Residential", "All-Male", "New Site"],
    history: "The only exclusively male hall of residence, named in honor of Joseph Ephraim Casely Hayford (1866–1930), a prominent Fante Gold Coast journalist, lawyer, and pan-African nationalist. His legacy imbues the hall with a deep sense of historical pride and political consciousness.",
    architecture: "Spatially, Casford Hall serves as a major node in the university's internal transport network, with critical shuttle stops adjacent to the hall (Café Roof Top and SSNIT junction). Despite its boisterous reputation, objective acoustic measurements placed Casford's ambient noise within permissible safety limits, suggesting noise is driven by intermittent high-intensity social events rather than continuous ambient sound.",
    statistics: {
      "Daytime Noise Level": "54 dB (Compliant)",
      "Nighttime Noise Level": "48 dB (Compliant)",
      "Transport Links": "CRT & SSNIT Junctions"
    },
    imageFallback: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "valco hall": {
    title: "Valco Hall",
    tags: ["Residential", "Mixed-Gender", "New Site", "High Noise"],
    history: "A large mixed-gender hall on the New Site heavily involved in campus athletics. In the women's division of the Inter Halls Athletic competition, Valco Hall secured the championship with 80 points.",
    architecture: "Valco Hall recorded the absolute highest ambient noise levels on campus. The persistently high decibel output likely stems from high, diverse foot traffic and its central architectural placement within the campus ecosystem, exposing it to external environmental noise from vehicular traffic and adjacent commercial zones.",
    statistics: {
      "Daytime Noise Level": "66 dB (Non-Compliant - Highest)",
      "Nighttime Noise Level": "60 dB (Non-Compliant - Highest)",
      "Athletics": "Women's Champions"
    },
    imageFallback: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "science": {
    title: "The Science Complex Building",
    tags: ["Academic", "Laboratories", "New Site"],
    history: "The College of Agriculture & Natural Sciences is a dominant physical presence. A defining architectural landmark in this zone is the Science Complex Building. This structure is so prominent that the entire surrounding geographic locale is popularly referred to simply as 'Science'.",
    architecture: "This specific zone operates as a multi-use area blending heavy academic instruction with ecological and media facilities. It houses the Campus Broadcasting Center, the University Garden, and the University Zoo. By consolidating resource-intensive physical science faculties into a single mega-complex, the university streamlines utilities and specialized waste management.",
    statistics: {
      "Zone": "Northern Campus (New Site)",
      "Key Facilities": "Broadcasting Center, Zoo, Gardens"
    },
    imageFallback: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },
  "library": {
    title: "Sam Jonah Library",
    tags: ["Academic", "Digital Infrastructure", "New Site"],
    history: "Established concurrently with the university in 1962, the library has undergone continuous physical and technological transformation. It stands strategically opposite the main Northern Campus shuttle bus station, rendering it a highly accessible, high-traffic node.",
    architecture: "Divided functionally into four main operational sections and a Special Collection Section (Gallery, Africana, Development Information). The physical space is enhanced by bespoke corporate textile designs meant to communicate the 'Heart Language' of the institution. Paradoxically, while the library boasts robust automation and databases, user utilization of advanced digital services remains suboptimal compared to physical reference services.",
    statistics: {
      "Established": "1962",
      "Reference Services Usage": "1.37 (Highest)",
      "Online Journals Usage": "1.20 (Underutilized)"
    },
    imageFallback: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000",
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  }
};

/**
 * Intelligent matcher to find the closest knowledge base entry for a given location name.
 */
export const getKnowledgeForLocation = (locationName) => {
  if (!locationName) return null;
  const name = locationName.toLowerCase();
  
  if (name.includes("market") || name.includes("science market")) return UCC_KNOWLEDGE_BASE["science market"];
  if (name.includes("acecor")) return UCC_KNOWLEDGE_BASE["acecor"];
  if (name.includes("old admin")) return UCC_KNOWLEDGE_BASE["old admin"];
  if (name.includes("hospital") || name.includes("clinic")) return UCC_KNOWLEDGE_BASE["hospital"];
  if (name.includes("oguaa")) return UCC_KNOWLEDGE_BASE["oguaa hall"];
  if (name.includes("atlantic") || name.includes("atl")) return UCC_KNOWLEDGE_BASE["atlantic hall"];
  if (name.includes("adehye")) return UCC_KNOWLEDGE_BASE["adehye hall"];
  if (name.includes("adow obeng") || name.includes("central admin")) return UCC_KNOWLEDGE_BASE["central administration block"];
  if (name.includes("casely") || name.includes("casford")) return UCC_KNOWLEDGE_BASE["casford hall"];
  if (name.includes("valco hall")) return UCC_KNOWLEDGE_BASE["valco hall"];
  if (name.includes("science") || name.includes("cans")) return UCC_KNOWLEDGE_BASE["science"];
  if (name.includes("library") || name.includes("sam jonah")) return UCC_KNOWLEDGE_BASE["library"];
  
  return null;
};
