// Rich knowledge base for the UCC Campus Map Modals
// Sourced from geospatial, acoustic, functional, and regulatory analyses.
// Cross-referenced with the Spatial and Functional Topography of UCC document.

export const UCC_KNOWLEDGE_BASE = {

  // ═══════════════════════════════════════════════════════════
  // 🏛️ ACADEMIC BUILDINGS
  // ═══════════════════════════════════════════════════════════

  "nec": {
    title: "New Examination Centre (NEC)",
    tags: ["Academic", "Examinations", "Ceremonies", "High-Security"],
    history: "The New Examination Centre represents arguably the most critical academic facility for student progression and institutional evaluation. Beyond routine end-of-semester examinations, the NEC is a massive multi-purpose auditorium — the traditional venue for the university's Convocation and Graduation ceremonies, freshman sandwich orientation programs, and high-profile national lectures featuring presidential aspirants.",
    architecture: "Located on the Northern Campus to facilitate mass assessment. The venue is designed for immense capacity with tiered seating, optimized for examination conditions with clear sightlines for invigilators. The space is frequently booked for political party manifesto launches and graduate student policy dialogues.",
    statistics: {
      "Arrival Rule": "30 minutes before exam start",
      "Late Entry": "Denied after 30 minutes",
      "ID Requirement": "UCC ID Card mandatory on desk",
      "Borrowing": "Strictly prohibited during exams"
    },
    rules: [
      "Arrive at least 30 minutes before your scheduled examination.",
      "Bring your official UCC ID Card — place it on your desk for inspection.",
      "Bring your own pens, pencils, erasers, rulers, and basic calculators.",
      "Sit precisely according to your assigned Index Number.",
      "NO mobile phones, smart watches, or ear pods — confiscation + rustication.",
      "NO bags, textbooks, or unapproved notes — confiscation + paper cancellation.",
      "NO correction fluid (white-out) — strictly prohibited.",
      "NO programmable calculators or scanners — confiscation + cancellation.",
      "Copying/cheating/impersonation — zero marks + rustication (2 semesters) or dismissal.",
      "Writing after exam ends — loss of 5 marks.",
      "Destroying suspected evidence — cancellation + rustication for 2 semesters.",
      "Leave ALL bags and electronic gadgets in your hostel before coming to the NEC."
    ],
    disclaimer: "Exam rules enforced by the Directorate of Academic Affairs. Ignorance is not an acceptable defense."
  },

  "calc": {
    title: "C.A. Ackah Lecture Theatre Complex (CALC)",
    tags: ["Academic", "Multi-Use", "Research", "New Site"],
    history: "Also known colloquially as 'Calc,' this multi-story academic complex is an essential hub for daily instruction and specialized academic research. The complex is a labyrinth of functional spaces that a student must learn to navigate efficiently.",
    architecture: "The building features a massive gymnasium and fitness wellness center, e-learning facilities, and vast lecture spaces. The basement houses the Department of Physician Assistant Studies (Pre-Clinical and Clinical Units). The Ground Floor hosts the Centre for Coastal Management (CCM), a research hub addressing coastal ecosystems, fisheries, and climate change. The uppermost floor is home to CEGRAD — the Centre for Gender Research, Advocacy and Documentation, the pivotal reporting node for gender equity and sexual harassment advocacy.",
    statistics: {
      "Basement": "Physician Assistant Studies",
      "Ground Floor": "Centre for Coastal Management (CCM)",
      "Top Floor": "CEGRAD (Gender Research)",
      "Facilities": "Gymnasium, E-Learning, Lecture Halls"
    },
    accessibility: "⚠️ ACCESSIBILITY WARNING: Students with physical disabilities face significant challenges. No functional elevators. Wheelchair users can only access the ground floor. Plan routes and request academic accommodations in advance.",
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "llt": {
    title: "Large Lecture Theatre (S.K. Adjepong — LLT)",
    tags: ["Academic", "Lectures", "Health", "New Site"],
    history: "Located on the Northern Campus (New Site), the Large Lecture Theatre handles the bulk of mass undergraduate instruction, particularly in the sciences. It features banked seating optimized for visibility during scientific demonstrations, chemical experiments, and large-scale academic lectures.",
    architecture: "Beyond its primary function as a classroom, the geography surrounding the LLT is vital for student survival. The basement holds extreme importance — it houses the Students' Clinic, an annex of the main University Hospital. The SRC Snack Bar is located within the immediate vicinity, providing a crucial caloric refueling station for students rushing between back-to-back classes.",
    statistics: {
      "Basement Clinic Hours": "Mon–Fri, 8:00 AM – 3:00 PM",
      "Clinic Type": "Outpatient only (Students' Clinic annex)",
      "Nearby": "SRC Snack Bar"
    },
    rules: [
      "Moving furniture (chairs, desks) out of the lecture theatre is a punishable offense.",
      "Students sitting on movable furniture outside are presumed to have removed them illegally.",
      "Penalty: Formal warning or fine up to GHS 500."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "nlt": {
    title: "New Lecture Theatre (NLT)",
    tags: ["Academic", "Medical", "Modern", "New Site"],
    history: "Situated on the North Campus adjacent to the College of Distance Education and opposite the School of Graduate Studies, the NLT is a modern academic facility built to international standards.",
    architecture: "The pivotal feature of the NLT is the Simulations and Clinical Skills Laboratory located on its uppermost floor. This state-of-the-art facility is essential for medical and Physician Assistant students. It includes a Surgical Skills room, a Nursing Skills room, a Procedure room, a Basic Life Support Lab, an Examination room, and a Debriefing Area.",
    statistics: {
      "Top Floor": "Simulations & Clinical Skills Lab",
      "Facilities": "Surgical Skills, Nursing Skills, BLS Lab",
      "Disability-Friendly": "Partially accessible"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "swlt": {
    title: "Sandwich Lecture Theatre (SWLT)",
    tags: ["Academic", "Lecture", "Flood Risk", "New Site"],
    history: "The Sandwich Lecture Theatre is an essential venue for teaching and large academic events on the Northern Campus. It is noted as partially disability-friendly.",
    architecture: "A standard lecture theatre facility. However, its surrounding geography presents a major logistical challenge that must be highlighted.",
    statistics: {
      "Disability-Friendly": "Partially accessible",
      "Flood Risk": "⚠️ HIGH during rainy season"
    },
    hazards: [
      "⚠️ FLOOD ZONE WARNING: The area connecting the SWLT to nearby diasporic student hostels (specifically Ayensu and parts of Kwaprow) lies within a natural waterway.",
      "During the rainy season, access paths become severely flooded and impassable.",
      "Students are forced to incur extra transport costs to reach lectures.",
      "Use alternative paths or shuttle services during heavy rains."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "cans": {
    title: "College of Agriculture & Natural Sciences (CANS)",
    tags: ["Academic", "STEM", "Laboratories", "New Site"],
    history: "Popularly referred to by the student body as the 'LT' (Science Faculty Lecture Theatre), the CANS building is a core academic structure at the Northern Campus. The entire surrounding geographic locale is popularly referred to simply as 'Science' due to this building's dominance.",
    architecture: "The third (last) floor is shared by the School of Agriculture and the School of Biological Sciences, making it a heavily trafficked zone for STEM students. On the first floor, adjacent to Lecture Theatre 13, is the Centre for Computational Thinking, featuring a 20-node computational cluster and a computer laboratory for advanced interdisciplinary research. The zone also houses the Campus Broadcasting Center, the University Garden, and the University Zoo.",
    statistics: {
      "Zone": "Northern Campus (New Site)",
      "Key Facilities": "Computational Thinking Centre, Broadcasting Center",
      "Adjacent": "UCC Botanical Garden & Zoo"
    },
    accessibility: "⚠️ ACCESSIBILITY WARNING: Frequently cited as highly unfriendly to students with physical disabilities. Uneven staircases, no ramps. Severely difficult for wheelchair users.",
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "school of business": {
    title: "School of Business Complex",
    tags: ["Academic", "Business", "Smart Classrooms", "New Site"],
    history: "Located at the Northern Campus, directly opposite the College of Distance Education, the School of Business Building Complex is a major academic hub constructed using the university's Internally Generated Funds (IGF).",
    architecture: "An architectural milestone featuring a massive 25-unit, three-storey lecture theatre equipped with smart classrooms optimized for e-learning. The ground floor houses the specialized School of Business Library, providing critical resources for Accounting, Finance, Marketing, Human Resource Management, and allied sciences. The building also hosts the prominent Auditorium 900, frequently utilized for high-profile guest lectures, CEO engagement series, and large-scale corporate seminars.",
    statistics: {
      "Lecture Units": "25 (three-storey)",
      "Smart Classrooms": "E-learning optimized",
      "Auditorium 900": "High-profile events",
      "Library": "Business-specialized"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "code": {
    title: "Albert Koomson Building (College of Distance Education — CoDE)",
    tags: ["Academic", "Distance Learning", "Student Support", "New Site"],
    history: "Named in honor of Albert Koomson, a pioneering director who collaborated with Simon Fraser University to architect and expand the university's massive distance learning program. Today, this complex coordinates operations for over 95 study centers nationwide.",
    architecture: "The administrative nerve center for the College of Distance Education. For the digital guide, this building is a critical point of interest for student support. It houses the Examinations Unit, the Counselling Unit, and the Students' Support Services Unit, which manages student records, transfers, and deferments. The E-Learning Unit is located on the second floor (opposite Room 33), providing technical advice and training on digital technologies.",
    statistics: {
      "Study Centers": "95+ nationwide",
      "Examinations Unit": "Ground floor",
      "Counselling Unit": "Ground floor",
      "E-Learning Unit": "2nd floor (opposite Room 33)"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "sgs": {
    title: "School of Graduate Studies (SGS) Complex",
    tags: ["Academic", "Postgraduate", "Research", "New Site"],
    history: "Located on the Northern Campus (New Site) directly opposite the New Lecture Theatre (NLT), this three-storey building complex serves as the dedicated administrative block for postgraduate studies. Built with support from GetFund.",
    architecture: "The SGS complex features a graduate resource center, ten seminar halls, a large lecture hall, a conference hall, and a boardroom. Graduate students navigate to this building for research grants, thesis submissions, academic progress tracking, and specialized postgraduate seminars.",
    statistics: {
      "Building Type": "Three-storey",
      "Seminar Halls": "10",
      "Funding": "GetFund supported",
      "Opposite": "New Lecture Theatre (NLT)"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "science": {
    title: "The Science Complex",
    tags: ["Academic", "STEM", "New Site"],
    history: "The College of Agriculture & Natural Sciences is a dominant physical presence on the Northern Campus. A defining architectural landmark in this zone is the Science Complex Building. This structure is so prominent that the entire surrounding geographic locale is popularly referred to simply as 'Science'.",
    architecture: "This specific zone operates as a multi-use area blending heavy academic instruction with ecological and media facilities. It houses the Campus Broadcasting Center, the University Garden, and the University Zoo. By consolidating resource-intensive physical science faculties into a single mega-complex, the university streamlines utilities and specialized waste management.",
    statistics: {
      "Zone": "Northern Campus (New Site)",
      "Key Facilities": "Broadcasting Center, Zoo, Gardens"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "auditorium": {
    title: "University Main Auditorium",
    tags: ["Academic", "Events", "Ceremonies", "New Site"],
    history: "The University Main Auditorium is located in the CANS zone on the Northern Campus. It serves as a major indoor venue for university events, ceremonies, and large academic gatherings. Distinct from the NEC (which is the primary exam and graduation venue), the Main Auditorium hosts smaller-scale but equally important institutional events.",
    architecture: "A substantial indoor venue within the science quadrangle, providing a covered alternative to the outdoor Congregation Grounds for events requiring climate control or acoustic management.",
    statistics: {
      "Location": "CANS Zone, New Site",
      "Distinct From": "NEC (450m north)"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  // ═══════════════════════════════════════════════════════════
  // 🏢 ADMINISTRATIVE
  // ═══════════════════════════════════════════════════════════

  "central administration block": {
    title: "Adow Obeng Central Administration Block",
    tags: ["Administrative", "Command Center", "New Site"],
    history: "The shift in administrative gravity to the New Site is physically embodied by the imposing Adow Obeng Central Administration Block (Block B). It serves as the contemporary command center for the entire university system, housing the Office of the Vice-Chancellor, the Pro Vice-Chancellor, and the Registrar.",
    architecture: "A modern, multi-story facility designed to house essential student service offices. The Directorate of Academic Affairs (DAA) in Block B manages student registration anomalies, transcript requests, official name changes, and program deferments. The Directorate of Finance handles tuition discrepancies, fee refunds, and financial clearance for graduation. The first floor houses the Students' Financial Support Office.",
    statistics: {
      "Zone": "Northern Campus (New Site)",
      "Key Offices": "VC, Registrar, DAA, Finance",
      "Financial Support": "1st Floor"
    },
    rules: [
      "Students must follow the chain of communication: Academic Advisor → HOD → Dean → Provost → Registrar.",
      "Formal petitions to the VC must be channeled through the Dean of Students and the Registrar.",
      "Residences of principal officers are strictly out of bounds for formal negotiations.",
      "Insubordination or disrespectful language = severe misconduct (max penalty: summary dismissal).",
      "Unapproved DRAP (Demonstration, Rally, Assembly, Procession) here = rustication or dismissal."
    ],
    grievanceChain: [
      "NON-ACADEMIC: Hall Tutor → Senior Hall Tutor → Hall Master/Warden → Hall Council → Dean of Students.",
      "ACADEMIC: Academic Advisor → Head of Department → Dean of Faculty → Provost → Registrar."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
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
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  // ═══════════════════════════════════════════════════════════
  // 📚 LIBRARY ECOSYSTEM
  // ═══════════════════════════════════════════════════════════

  "library": {
    title: "Sam Jonah Library",
    tags: ["Academic", "Library", "Digital Infrastructure", "New Site"],
    history: "Established concurrently with the university in 1962, the library has undergone continuous physical and technological transformation. Named after the esteemed Chancellor Sam E. Jonah, it is one of the largest academic libraries in West Africa. It stands strategically opposite the main Northern Campus shuttle bus station, rendering it a highly accessible, high-traffic node. Recently, the library launched an innovative 'Human Library Service' where students can 'borrow' a human expert for mentorship and dialogue.",
    architecture: "Boasting a capacity of 750,000 volumes with seating for 2,000 readers across a magnificent four-story complex. The library is divided functionally into distinct floors, each serving specialized audiences.",
    statistics: {
      "Established": "1962",
      "Capacity": "750,000 volumes",
      "Seating": "2,000 readers",
      "Floors": "4 main + Special Collections",
      "Satellite Libraries": "31 across campus"
    },
    floors: [
      "LOWER GROUND (Basement): Photocopying Unit, Bindery, PSNS Lab (Braille/audio conversion).",
      "GROUND FLOOR: Reference Section, PSNS Lab, General encyclopedias.",
      "FIRST FLOOR: Arts & Humanities, Social Sciences, Education, Africana Unit (reference only — NO borrowing).",
      "SECOND FLOOR: Science & Medicine Collection, Law Library.",
      "THIRD FLOOR: Periodicals Section, Development Information Unit (DIU) — journals, World Bank publications."
    ],
    rules: [
      "Valid university ID required for borrowing.",
      "Undergraduates: max 6 items. Graduate students: max 8 items.",
      "Loan duration: 2 weeks (renewable if no hold placed).",
      "ALL bags inspected at exit — theft/destruction = fine (3x market price) + rustication or dismissal.",
      "Absolute silence. Mobile phones OFF or silent BEFORE entering.",
      "NO food, drinks, water, or fruits in reading areas or IT installations.",
      "Personal laptops OK on wireless network. Library desktops for ACADEMIC USE ONLY — staff monitor screens.",
      "NO reserving seats — items left unattended 10+ minutes will be confiscated.",
      "⚠️ HAZARD: Open drainage ditches and reckless parking in front of building."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  // ═══════════════════════════════════════════════════════════
  // 🚌 TRANSIT & LOGISTICS
  // ═══════════════════════════════════════════════════════════

  "shuttle station": {
    title: "Science Shuttle Station",
    tags: ["Transit", "Commercial", "Landmark", "New Site"],
    history: "Because the university is geographically split between Old Site and New Site (~1 km apart), internal transportation is vital for student survival. The Science Shuttle Station serves as the central logistical artery for student movement. In past years, students studying late at the New Site faced alarming rates of robbery and assault walking back to hostels. Former SRC President Tony Henry Arthur spearheaded an all-night free bus system from this station during examination periods.",
    architecture: "Located at the Northern Campus in close proximity to the Sam Jonah Library and the Science Quadrangle. Managed by the Estate Section and Transport Committee. Functions as a micro-commercial node — students purchase transit tickets and access adjacent mini-marts. A striking sculpture by artist Christabel Ama Asmah, unveiled by the University Registrar, depicts a student weighed down by an impossibly heavy load — a visual metaphor for mental, financial, and academic burdens.",
    statistics: {
      "Function": "Central transit hub + micro-commercial",
      "Ticket Type": "Transit tickets or annual transport sticker",
      "Night Bus": "Free during exam periods (safety initiative)",
      "Landmark": "Mental Health Sculpture (POI)"
    },
    sculpture: "The Mental Health Sculpture: Constructed from resin, sack, rope, paint, metal, and cement. Represents peer pressure, side hustle stress, financial constraints, and broken homes. Installed to trigger daily conversations about mental health and remind students the Counseling Centre is available.",
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  // ═══════════════════════════════════════════════════════════
  // 🏠 HALLS OF RESIDENCE
  // ═══════════════════════════════════════════════════════════

  "oguaa hall": {
    title: "Oguaa Hall (The Premier Hall)",
    tags: ["Residential", "Mixed-Gender", "Old Site", "Historical"],
    history: "Widely regarded and self-identified as 'The Premier Hall' — the oldest hall on campus. Residents are affectionately called 'Great Monkeys' due to the agility required to climb early bunk beds. Operates under an explicit constitution emphasizing unity, friendship, peace, and good governance. Motto: Knowledge, Unity, Peace.",
    architecture: "The physical layout includes the Junior Common Room (JRC) and a large forecourt that frequently serves as the epicenter for cultural, intellectual, and social activities. Located a five-minute walk from the University Hospital. The 'Old Library' area is a highly popular green space immediately adjacent.",
    statistics: {
      "Nickname": "The Barracks",
      "Residents": "Great Monkeys",
      "Motto": "Knowledge, Unity, Peace",
      "Daytime Noise": "60 dB (Non-Compliant)",
      "Nighttime Noise": "55 dB (Non-Compliant)"
    },
    residentialRules: [
      "Visiting other halls: must vacate between 12:00 AM and 6:00 AM.",
      "Leaving campus overnight: sign Exeat Book, deposit room key with Hall Assistant.",
      "Taking key away during holidays: fine based on commercial rent rate + lock replacement.",
      "External visitors: 10 AM – 10 PM (weekdays), up to midnight (weekends/holidays).",
      "Visitors entertained in JCR/visiting areas, NOT private bedrooms.",
      "NO cohabitation or overnight visitors of opposite sex → ejection + rustication.",
      "NO sub-letting → rustication for 2 semesters.",
      "NO gas cylinders, gas stoves, microwaves, deep freezers, washing machines → eviction.",
      "Allowed: electric cookers ≤1000W (no oven), pressing irons, hand dryers, TVs, PCs.",
      "NO noise from radios, TVs, or unapproved religious worship.",
      "NO commercial activities or selling items in halls."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "atlantic hall": {
    title: "Atlantic Hall (ATL)",
    tags: ["Residential", "Mixed-Gender", "Athletics", "Old Site"],
    history: "A mixed-gender residential facility renowned for its intense socio-cultural rivalry with Oguaa Hall and its profound dominance in university athletics. Atlantic Hall consistently demonstrates overwhelming dominance, capturing the championship trophy at the 37th Annual Inter Halls Athletic competition. Residents are known as 'Mariners'.",
    architecture: "Its spatial adjacency to Oguaa Hall on the older, more compact Southern Campus creates an environment where physical and psychological boundaries are easily crossed, facilitating intense competitive interactions.",
    statistics: {
      "Athletic Rank": "Champions (37th Annual)",
      "Zone": "Southern Campus (Old Site)",
      "Rivalry": "Oguaa Hall"
    },
    residentialRules: [
      "Visiting other halls: must vacate between 12:00 AM and 6:00 AM.",
      "External visitors: 10 AM – 10 PM (weekdays), up to midnight (weekends/holidays).",
      "NO cohabitation → ejection + rustication.",
      "NO gas cylinders, microwaves, deep freezers → eviction.",
      "Allowed: electric cookers ≤1000W, pressing irons, TVs, PCs.",
      "NO commercial activities in halls."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "adehye hall": {
    title: "Adehye Hall",
    tags: ["Residential", "All-Female", "Old Site", "Low Noise"],
    history: "The only exclusively female hall of residence at UCC. Residents identify as 'The Royals' or 'Intellectuals.' The hall served as the historical site of the university's very first infirmary before the construction of the larger University Hospital. Focuses heavily on female empowerment, sisterhood, and academic excellence.",
    architecture: "The architecture reflects a deep institutional commitment to creating a highly protected and intellectually nurturing environment. Recently modernized with a dedicated E-Library. Acoustic data reveals it is the quietest hall on campus, falling comfortably below permissible daytime and nighttime noise limits.",
    statistics: {
      "Daytime Noise": "49 dB (Compliant — Lowest)",
      "Nighttime Noise": "45 dB (Compliant — Lowest)",
      "Special Facilities": "Dedicated E-Library",
      "Historical Note": "Site of first UCC infirmary"
    },
    residentialRules: [
      "Visiting other halls: must vacate between 12:00 AM and 6:00 AM.",
      "External visitors: 10 AM – 10 PM (weekdays), up to midnight (weekends/holidays).",
      "NO cohabitation → ejection + rustication.",
      "NO gas cylinders, microwaves, deep freezers → eviction.",
      "Allowed: electric cookers ≤1000W, pressing irons, TVs, PCs.",
      "NO commercial activities in halls."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "casford hall": {
    title: "Casely-Hayford Hall (Casford)",
    tags: ["Residential", "All-Male", "New Site"],
    history: "The only exclusively male hall of residence, named in honor of Joseph Ephraim Casely Hayford (1866–1930), a prominent Fante Gold Coast journalist, lawyer, and pan-African nationalist. Famous for extreme solidarity, the 'Omanhene' traditional council governance system, and intense morale chanting. Motto: Truth and Courage. Fiercely allied with Vandals (UG) and Katanga (KNUST).",
    architecture: "Serves as a major node in the university's internal transport network, with critical shuttle stops adjacent to the hall (Café Roof Top and SSNIT junction). Despite its boisterous reputation, objective acoustic measurements placed Casford's ambient noise within permissible safety limits.",
    statistics: {
      "Daytime Noise": "54 dB (Compliant)",
      "Nighttime Noise": "48 dB (Compliant)",
      "Transport Links": "CRT & SSNIT Junctions",
      "Motto": "Truth and Courage"
    },
    residentialRules: [
      "Visiting other halls: must vacate between 12:00 AM and 6:00 AM.",
      "External visitors: 10 AM – 10 PM (weekdays), up to midnight (weekends/holidays).",
      "NO cohabitation → ejection + rustication.",
      "NO gas cylinders, microwaves, deep freezers → eviction.",
      "Allowed: electric cookers ≤1000W, pressing irons, TVs, PCs.",
      "NO commercial activities in halls."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "valco hall": {
    title: "Valco Hall",
    tags: ["Residential", "Mixed-Gender", "New Site", "High Noise"],
    history: "A large mixed-gender hall on the New Site heavily involved in campus athletics. In the women's division of the Inter Halls Athletic competition, Valco Hall secured the championship with 80 points.",
    architecture: "Valco Hall recorded the absolute highest ambient noise levels on campus. The persistently high decibel output likely stems from high, diverse foot traffic and its central architectural placement within the campus ecosystem, exposing it to external environmental noise from vehicular traffic and adjacent commercial zones.",
    statistics: {
      "Daytime Noise": "66 dB (Non-Compliant — Highest)",
      "Nighttime Noise": "60 dB (Non-Compliant — Highest)",
      "Athletics": "Women's Champions"
    },
    residentialRules: [
      "Visiting other halls: must vacate between 12:00 AM and 6:00 AM.",
      "NO cohabitation → ejection + rustication.",
      "NO gas cylinders, microwaves, deep freezers → eviction.",
      "Allowed: electric cookers ≤1000W, pressing irons, TVs, PCs.",
      "NO commercial activities in halls."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "knh": {
    title: "Kwame Nkrumah Hall",
    tags: ["Residential", "Mixed-Gender", "New Site"],
    history: "Established in 1998 (formerly 'New Hall'). Originally designed strictly for graduate students, named after Ghana's first president to promote pan-African ideals and leadership. Now a co-ed hall accommodating both undergraduate and graduate students.",
    architecture: "Located on the Northern Campus (New Site). The hall features the Kwame Nkrumah Hall Park, an open green space for socialization and intramural sports.",
    statistics: {
      "Established": "1998",
      "Original Purpose": "Graduate students only",
      "Named After": "Kwame Nkrumah (Ghana's first president)",
      "Park": "KNH Park (open green space)"
    },
    residentialRules: [
      "Visiting other halls: must vacate between 12:00 AM and 6:00 AM.",
      "NO cohabitation → ejection + rustication.",
      "NO gas cylinders, microwaves, deep freezers → eviction.",
      "Allowed: electric cookers ≤1000W, pressing irons, TVs, PCs."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "src hall": {
    title: "SRC Hall",
    tags: ["Residential", "Modern", "New Site"],
    history: "A modern residential hall on the Northern Campus, part of the university's expansion to accommodate the growing student population.",
    architecture: "Contemporary residential facility with modern amenities, located on the far northeastern edge of the New Site campus.",
    statistics: {
      "Type": "Modern residential hall",
      "Zone": "Northern Campus (New Site)"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "superannuation": {
    title: "Superannuation Hall",
    tags: ["Residential", "New Site"],
    history: "A residential hall on the Northern Campus, part of the diverse ecosystem of student accommodation options at UCC.",
    architecture: "Residential facility located on the northeastern edge of the New Site campus, near SRC Hall.",
    statistics: {
      "Zone": "Northern Campus (New Site)",
      "Nearby": "SRC Hall"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  // ═══════════════════════════════════════════════════════════
  // 🏥 HEALTH & WELFARE
  // ═══════════════════════════════════════════════════════════

  "hospital": {
    title: "University Hospital & Health Services",
    tags: ["Healthcare", "Emergency", "Old Site", "24/7"],
    history: "Evolved significantly since its modest inception in 1963. Originally beginning as a small infirmary attached to Adehye Hall, it has expanded into a fully functional Directorate comprising the main UCC Hospital and the Environmental Health Section (EHS). The university financially covers the NHIS premium for all registered students.",
    architecture: "Operating on a 24/7 basis, this critical facility anchors the Southern Campus and employs a hub-and-spoke model. The main hospital is at Old Site, with a decentralized Students' Clinic annex in the basement of the LLT on the Northern Campus (Mon–Fri, 8 AM – 3 PM) to minimize transit burden.",
    statistics: {
      "Established": "1963",
      "Operating Hours": "24/7 (Main Hospital)",
      "Annex": "LLT Basement, Mon–Fri 8AM–3PM",
      "NHIS": "Premium covered by university"
    },
    rules: [
      "Medical examination at University Hospital upon admission is MANDATORY — failure = dismissal.",
      "Always carry an active, unexpired NHIS card for free healthcare.",
      "Expired NHIS = out-of-pocket payment for all drugs, diagnostics, and services.",
      "External hospital certificates MUST be endorsed by a University Medical Officer within 24 hours of return to campus."
    ],
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "counseling": {
    title: "Counseling Centre",
    tags: ["Mental Health", "Counselling", "Support", "Confidential"],
    history: "Located within the Faculty of Educational Foundations, the Counseling Centre is a vital waypoint for mental and academic health. It serves as the designated professional sanctuary for psychological relief when academic pressures become overwhelming.",
    architecture: "A confidential facility offering academic counseling (study habits, career paths), personal-social counseling (phobias, depression, suicidal ideation, substance addiction, relationship conflicts), and group therapies.",
    statistics: {
      "Location": "Faculty of Educational Foundations",
      "Services": "Academic, Personal-Social, Group Therapy",
      "Confidentiality": "All sessions are confidential"
    },
    disclaimer: "If you are in crisis, please reach out to the Counseling Centre or call emergency services."
  },

  // ═══════════════════════════════════════════════════════════
  // 🛒 COMMERCIAL & GASTRONOMIC
  // ═══════════════════════════════════════════════════════════

  "science market": {
    title: "University of Cape Coast Market (Science Market)",
    tags: ["Commercial", "High-Density", "New Site"],
    history: "The University of Cape Coast Market, frequently referred to as the Science Market, serves as a pivotal commercial center for staff, students, and neighboring communities. It operates as a micro-economy within the campus, functioning similarly to the bustling Kotokuraba market in the wider Cape Coast metropolis.",
    architecture: "Situated in the New Site, the spatial positioning of this market is highly deliberate. It is located near the central administration block and the CANS building. This triangulation reveals a deliberate urban planning strategy: zoning commercial activity at the nexus of administrative and academic pedestrian flow to maximize economic utility and accessibility.",
    statistics: {
      "Type": "Micro-economy commercial hub",
      "Goods": "Food, stationery, printing, services"
    },
    disclaimer: "Data sourced for educational purposes from external urban analyses."
  },

  "code market": {
    title: "CoDE Market",
    tags: ["Commercial", "New Site"],
    history: "A commercial zone near the College of Distance Education, serving students and staff in the far northeastern section of the New Site campus.",
    architecture: "A smaller market cluster providing convenience goods and services for students attending classes at CoDE, NLT, and surrounding academic facilities.",
    statistics: {
      "Type": "Convenience market",
      "Nearby": "College of Distance Education"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "votec": {
    title: "VOTEC Restaurant",
    tags: ["Commercial", "Dining", "Old Site"],
    history: "Located under the Old Assembly Hall building at the Old Site, this restaurant is managed by the Department of Vocational and Technical Education.",
    architecture: "Highly recommended for formal lunches and meetings, serving high-quality local and continental dishes in a professional setting.",
    statistics: {
      "Location": "Under Old Assembly Hall, Old Site",
      "Managed By": "Dept. of Vocational & Technical Education",
      "Cuisine": "Local and Continental"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "deep dish": {
    title: "Deep Dish Eatery",
    tags: ["Commercial", "Dining", "Old Site"],
    history: "A popular, highly frequented eatery located within the Oguaa Hall perimeter, catering to the massive student population at the Old Site.",
    architecture: "Conveniently positioned to serve students in the Southern Campus residential zone, offering quick meals between lectures and study sessions.",
    statistics: {
      "Location": "Oguaa Hall perimeter, Old Site",
      "Popularity": "High"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "src snack bar": {
    title: "SRC Snack Bar",
    tags: ["Commercial", "Dining", "New Site"],
    history: "Strategically positioned near the Large Lecture Theatre (LLT) on the New Site, serving as the ultimate quick-service hub for students rushing between back-to-back classes in the science quadrangle.",
    architecture: "Provides both local and continental dishes without requiring students to trek back to their residential halls. A crucial caloric refueling station.",
    statistics: {
      "Location": "Near LLT, New Site",
      "Service": "Quick-service, local & continental"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "pizzaman": {
    title: "Pizzaman-Chickenman (External Landmark)",
    tags: ["Commercial", "External", "Landmark", "Dining"],
    history: "Located directly opposite the University of Cape Coast Main Gate. As Ghana's leading fast-food chain with over 89 branches nationwide, this specific Cape Coast branch serves as a massive cultural and culinary anchor for UCC students. In digital mapping, this location operates as a cardinal landmark or 'Zero Point' for students giving directions to external visitors, delivery drivers, or ride-sharing services.",
    architecture: "Students frequent this establishment for celebrations, post-examination relief, and group study breaks. The menu offers high-calorie comfort foods including their signature 'Double Chicken Barbecue' pizza, crispy fried chicken wings, and highly popular maxi buckets of assorted Jollof and fried rice. Dine-in, delivery via Chris B App, and late-night operational hours.",
    statistics: {
      "Location": "Opposite UCC Main Gate",
      "Branches Nationwide": "89+",
      "Delivery": "Chris B App",
      "Function": "Cardinal landmark / 'Zero Point' for directions"
    },
    disclaimer: "This is an external commercial establishment, not a university facility."
  },

  // ═══════════════════════════════════════════════════════════
  // 🏟️ RECREATION & TOURISM
  // ═══════════════════════════════════════════════════════════

  "sports complex": {
    title: "UCC Sports Complex",
    tags: ["Recreation", "Athletics", "Fitness"],
    history: "Situated near the academic core, providing facilities for physical wellness, track and field, and intramural hall rivalries. The university has a strong athletic tradition with intense inter-hall competitions.",
    architecture: "Multi-sport facility supporting track and field events, football, and various athletic disciplines. Hosts the annual Inter Halls Athletic competition.",
    statistics: {
      "Facilities": "Track and field, multi-sport",
      "Events": "Inter Halls Athletic Competition"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "botanical garden": {
    title: "UCC Botanical Gardens & Zoo",
    tags: ["Recreation", "Nature", "Research", "New Site"],
    history: "Located at the New Site, immediately adjacent to the CANS building. A lush, carefully designed green space housing diverse flora, ornamental plants, and a zoological collection of animals.",
    architecture: "Provides a serene, shaded retreat for relaxation, meditation, and psychological decompression away from the concrete lecture halls. Also serves as a living laboratory for biological and ecological research.",
    statistics: {
      "Location": "Adjacent to CANS, New Site",
      "Features": "Flora, ornamental plants, zoological collection",
      "Function": "Recreation + Research"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  },

  "external tourism": {
    title: "External Heritage & Tourism Sites",
    tags: ["Tourism", "External", "UNESCO", "Recreation"],
    history: "The university is situated in the tourism capital of Ghana, the Central Region. The campus sits mere kilometers from globally significant UNESCO World Heritage sites offering profound historical insights and recreational escapes.",
    architecture: "Key external sites include: Cape Coast Castle and Elmina Castle (UNESCO World Heritage sites, transatlantic slave trade history), Kakum National Park (world-famous canopy walkways, hiking trails), Coastal Beaches (Brenu Beach Grasslands, Anomabo Beach Resort, Coconut Grove Beach Resort), and Urban Landmarks (Cape Coast Sports Stadium, Centre for National Culture, Fosu Lagoon, Fort Victoria, Fort William).",
    statistics: {
      "UNESCO Sites": "Cape Coast Castle, Elmina Castle",
      "National Park": "Kakum (canopy walkways)",
      "Beaches": "Brenu, Anomabo, Coconut Grove",
      "Distance": "Within 10–30 km of campus"
    },
    disclaimer: "External sites are not university facilities. Check opening hours before visiting."
  },

  // ═══════════════════════════════════════════════════════════
  // ⚖️ SPATIAL GOVERNANCE & DISCIPLINARY
  // ═══════════════════════════════════════════════════════════

  "disciplinary": {
    title: "Campus Disciplinary & Behavioral Code",
    tags: ["Governance", "Rules", "Disciplinary", "Important"],
    history: "The University of Cape Coast enforces the laws of the Republic of Ghana alongside its stringent internal statutes. The physical walls of the university do not grant immunity from national law. Students must be hyper-aware of how the disciplinary code restricts physical actions in specific geographical zones.",
    architecture: "The disciplinary topography overlays the entire campus with zone-specific rules and penalties.",
    statistics: {
      "Noise Fine": "Up to GHS 1,000",
      "Poster Fine": "GHS 1,000 + election disqualification",
      "Furniture Fine": "GHS 500",
      "Sexual Harassment": "Summary dismissal",
      "DRAP Violation": "Rustication or dismissal"
    },
    rules: [
      "ENTIRE CAMPUS is a low-noise zone. NO blasting music, unauthorized radio, or unapproved health walks/floats/pageants.",
      "Organized events require written Dean of Students approval 5 working days prior.",
      "NO pasting campaign posters on walls, pillars, or trees — designated billboards only.",
      "NO removing furniture from lecture theatres, libraries, or offices — fine up to GHS 500.",
      "ZERO TOLERANCE for sexual harassment — report to Dean of Students, Hall Tutors, or CEGRAD.",
      "DRAP (Demonstration, Rally, Assembly, Procession): Dean of Students approval 48 hours in advance, approved route, must end before 9 PM.",
      "DRAP disrupting official ceremonies (e.g., graduation at NEC) = rustication or dismissal."
    ],
    disclaimer: "These are institutional rules. Ignorance is not an acceptable defense."
  },

  "diaspora": {
    title: "Surrounding Diasporic Communities",
    tags: ["Residential", "External", "Hostels"],
    history: "A massive percentage of the student body cannot be accommodated in the traditional halls and thus resides in private hostels in the communities immediately bordering the campus.",
    architecture: "Two primary diaspora zones: Apewosika and Kokoado (bordering Southern Campus / Old Site) — hilly, ocean-view communities with older private hostels and immediate access to Central Administration, UCC Hospital, and Oguaa/Adehye halls. Kwaprow and Amamoma (bordering Northern Campus / New Site) — rapidly expanding towns densely packed with modern student hostels, printing presses, and street-food vendors.",
    statistics: {
      "Old Site Diaspora": "Apewosika, Kokoado",
      "New Site Diaspora": "Kwaprow, Amamoma",
      "Student Population": "Majority in private hostels"
    },
    disclaimer: "These are external communities, not university-managed facilities."
  },

  // ═══════════════════════════════════════════════════════════
  // 🏦 BANKING
  // ═══════════════════════════════════════════════════════════

  "banking": {
    title: "On-Campus Banking Services",
    tags: ["Banking", "Financial", "Services"],
    history: "The university hosts several banking branches on or near campus to serve the financial needs of over 70,000 students and staff.",
    architecture: "Key banking locations include Prudential Bank Ltd. (near Casford Hall on the New Site) and GCB Bank UCC Branch. These provide standard banking services including account management, withdrawals, deposits, and school fee payments.",
    statistics: {
      "Prudential Bank": "Near Casford, New Site",
      "GCB Bank": "UCC Branch on campus",
      "Services": "Standard banking, fee payments"
    },
    disclaimer: "Banking services are operated by external financial institutions."
  },

  // ═══════════════════════════════════════════════════════════
  // ⛪ PLACES OF WORSHIP
  // ═══════════════════════════════════════════════════════════

  "churches": {
    title: "On-Campus Places of Worship",
    tags: ["Worship", "Religious", "Community"],
    history: "The university hosts inter-denominational and denominational worship facilities to serve the diverse religious needs of the student body. Religious services in halls must be held in designated chapels or approved venues only — unapproved worship in halls is banned.",
    architecture: "Two main on-campus churches: the University Inter-denominational Church (UIDC) and Our Lady Seat of Wisdom Catholic Church, both located on the Northern Campus.",
    statistics: {
      "UIDC": "Inter-denominational, New Site",
      "Catholic": "Our Lady Seat of Wisdom, New Site",
      "Rule": "Hall worship only in designated venues"
    },
    disclaimer: "Data sourced for educational purposes from institutional analyses."
  }
};

/**
 * Intelligent matcher to find the closest knowledge base entry for a given location name.
 * Ordered from most specific to most general to prevent false matches.
 */
export const getKnowledgeForLocation = (locationName) => {
  if (!locationName) return null;
  const name = locationName.toLowerCase();

  // ═══ ACADEMIC BUILDINGS ═══
  if (name.includes("examination centre") || name.includes("examination center") || name === "nec") return UCC_KNOWLEDGE_BASE["nec"];
  if (name.includes("ackah") || name.includes("calc") || name.includes("c.a. ackah")) return UCC_KNOWLEDGE_BASE["calc"];
  if (name.includes("large lecture") || name.includes("s.k. adjepong") || name === "llt") return UCC_KNOWLEDGE_BASE["llt"];
  if (name.includes("new lecture theatre") || name === "nlt") return UCC_KNOWLEDGE_BASE["nlt"];
  if (name.includes("sandwich") || name === "swlt") return UCC_KNOWLEDGE_BASE["swlt"];
  if (name.includes("cans") || name.includes("college of agriculture") || name.includes("natural sciences")) return UCC_KNOWLEDGE_BASE["cans"];
  if (name.includes("school of business") || name === "sob") return UCC_KNOWLEDGE_BASE["school of business"];
  if (name.includes("distance education") || name.includes("albert koomson") || name === "code") return UCC_KNOWLEDGE_BASE["code"];
  if (name.includes("graduate studies") || name === "sgs") return UCC_KNOWLEDGE_BASE["sgs"];
  if (name.includes("science complex") || (name.includes("science") && !name.includes("market") && !name.includes("school") && !name.includes("biological") && !name.includes("physical"))) return UCC_KNOWLEDGE_BASE["science"];
  if (name.includes("main auditorium") || name === "auditorium") return UCC_KNOWLEDGE_BASE["auditorium"];

  // ═══ ADMINISTRATIVE ═══
  if (name.includes("adow obeng") || (name.includes("central admin") && !name.includes("old"))) return UCC_KNOWLEDGE_BASE["central administration block"];
  if (name.includes("old admin") || name.includes("old central") || name.includes("legacy admin")) return UCC_KNOWLEDGE_BASE["old admin"];

  // ═══ LIBRARY ═══
  if (name.includes("library") || name.includes("sam jonah") || name.includes("sjl")) return UCC_KNOWLEDGE_BASE["library"];

  // ═══ TRANSIT ═══
  if (name.includes("shuttle") || name.includes("science station") || name.includes("bus station")) return UCC_KNOWLEDGE_BASE["shuttle station"];

  // ═══ HALLS ═══
  if (name.includes("oguaa")) return UCC_KNOWLEDGE_BASE["oguaa hall"];
  if (name.includes("atlantic") || name === "atl") return UCC_KNOWLEDGE_BASE["atlantic hall"];
  if (name.includes("adehye")) return UCC_KNOWLEDGE_BASE["adehye hall"];
  if (name.includes("casely") || name.includes("casford")) return UCC_KNOWLEDGE_BASE["casford hall"];
  if (name.includes("valco")) return UCC_KNOWLEDGE_BASE["valco hall"];
  if (name.includes("nkrumah") || name === "knh") return UCC_KNOWLEDGE_BASE["knh"];
  if (name.includes("src hall")) return UCC_KNOWLEDGE_BASE["src hall"];
  if (name.includes("superannuation") || name === "super") return UCC_KNOWLEDGE_BASE["superannuation"];

  // ═══ HEALTH ═══
  if (name.includes("hospital") || name.includes("clinic")) return UCC_KNOWLEDGE_BASE["hospital"];
  if (name.includes("counsel") || name.includes("counseling") || name.includes("counselling")) return UCC_KNOWLEDGE_BASE["counseling"];

  // ═══ COMMERCIAL ═══
  if (name.includes("science market") || (name.includes("market") && name.includes("science"))) return UCC_KNOWLEDGE_BASE["science market"];
  if (name.includes("code market") || (name.includes("market") && name.includes("code"))) return UCC_KNOWLEDGE_BASE["code market"];
  if (name.includes("votec") || name.includes("vocational")) return UCC_KNOWLEDGE_BASE["votec"];
  if (name.includes("deep dish")) return UCC_KNOWLEDGE_BASE["deep dish"];
  if (name.includes("snack bar") || name.includes("src snack")) return UCC_KNOWLEDGE_BASE["src snack bar"];
  if (name.includes("pizzaman") || name.includes("chickenman")) return UCC_KNOWLEDGE_BASE["pizzaman"];

  // ═══ RECREATION ═══
  if (name.includes("sports complex") || name.includes("sports")) return UCC_KNOWLEDGE_BASE["sports complex"];
  if (name.includes("botanical") || name.includes("garden") || name.includes("zoo")) return UCC_KNOWLEDGE_BASE["botanical garden"];
  if (name.includes("tourism") || name.includes("castle") || name.includes("kakum") || name.includes("beach")) return UCC_KNOWLEDGE_BASE["external tourism"];

  // ═══ GOVERNANCE ═══
  if (name.includes("disciplinary") || name.includes("rules") || name.includes("regulations")) return UCC_KNOWLEDGE_BASE["disciplinary"];
  if (name.includes("diaspora") || name.includes("hostel") || name.includes("apewosika") || name.includes("kwaprow") || name.includes("amamoma") || name.includes("kokoado")) return UCC_KNOWLEDGE_BASE["diaspora"];

  // ═══ BANKING ═══
  if (name.includes("bank") || name.includes("prudential") || name.includes("gcb") || name.includes("banking")) return UCC_KNOWLEDGE_BASE["banking"];

  // ═══ WORSHIP ═══
  if (name.includes("church") || name.includes("catholic") || name.includes("inter-denominational") || name.includes("worship")) return UCC_KNOWLEDGE_BASE["churches"];

  // ═══ MARKET (fallback for generic "market") ═══
  if (name.includes("market")) return UCC_KNOWLEDGE_BASE["science market"];

  return null;
};
