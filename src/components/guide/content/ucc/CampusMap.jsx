import React from 'react';
import { MapPin, Search, Compass, Map, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Landmark } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const CampusMap = (props = {}) => {
  const { onLocationSelect } = props;
  // UCC GUIDE: CAMPUS MAP (MASTER EDITION 2025)

  const openGoogleMaps = (term) => {
    const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(term);
    let url;
    if (isCoordinates) {
      url = `https://www.google.com/maps/search/?api=1&query=${term}`;
    } else {
      const query = term.includes("Cape Coast") ? term : `${term} University of Cape Coast`;
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    }
    window.open(url, '_blank');
  };

  const handleAcronymClick = (code) => {
    // Find the building using its shortForm, id, or partial name match
    const bldg = buildings.find(b => b.shortForm === code || b.id === code || b.fullName.includes(code));
    if (bldg && onLocationSelect) {
      onLocationSelect(bldg);
    } else {
      openGoogleMaps(`${code} UCC`); // fallback if not found
    }
  };

  const sections = [
    {
      title: "Campus Navigation",
      summary: "The Ultimate Guide to UCC Acronyms, Landmarks, and Transport.",

      content: (
        <div className="space-y-12">
          <InfoBlock
            title="The Defintive Campus Guide"
            icon={Compass}
            content="Welcome to the master navigation guide. Whether you are looking for <strong>'Science Market'</strong>, <strong>'CALC'</strong>, or the <strong>'Ceremonial grounds'</strong>, this map has every acronym and local name you need to survive."
          />

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-6 flex items-center gap-2">
              <Map size={24} className="text-primary-600" /> Acronym Decoder
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AcronymTile code="CANS" site="Science" onClick={() => handleAcronymClick("CANS")} />
              <AcronymTile code="CALC" site="Science" onClick={() => handleAcronymClick("CALC")} />
              <AcronymTile code="CoE" site="Science" onClick={() => handleAcronymClick("CoE")} />
              <AcronymTile code="SMS" site="Science" onClick={() => handleAcronymClick("SMS")} />
              <AcronymTile code="SoB" site="Science" onClick={() => handleAcronymClick("SoB")} />
              <AcronymTile code="LLT" site="Science" onClick={() => handleAcronymClick("LLT")} />
              <AcronymTile code="NEC" site="Science" onClick={() => handleAcronymClick("NEC")} />
              <AcronymTile code="NLT" site="Science" onClick={() => handleAcronymClick("NLT")} />
              <AcronymTile code="SWLT" site="Science" onClick={() => handleAcronymClick("SWLT")} />
              <AcronymTile code="SJL" site="Science" onClick={() => handleAcronymClick("SJL")} />
              <AcronymTile code="SGS" site="Science" onClick={() => handleAcronymClick("SGS")} />
              <AcronymTile code="CoDE" site="Science" onClick={() => handleAcronymClick("CoDE")} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard
              title="Old Site (Southern)"
              desc="Administrative & traditional core."
              details={[
                "<strong>Main Admin</strong>: VC Office & Registrar.",
                "<strong>Faculty of Arts</strong>: Near Old Gate.",
                "<strong>Social Sciences</strong>: Southern campus hub.",
                "<strong>Halls</strong>: Oguaa, Adehye, Atlantic."
              ]}
            />
            <ActionCard
              title="New Site (Northern)"
              desc="Science & modern residential hub."
              details={[
                "<strong>CANS Building</strong>: Primary Science enclave.",
                "<strong>Sam Jonah Library</strong>: The central hub.",
                "<strong>Medical School</strong>: Near New Gate.",
                "<strong>Halls</strong>: Casford, Valco, Nkrumah, SRC."
              ]}
            />
          </div>
        </div>
      )
    }
  ];

  const buildings = [
    // ═══════════════════════════════════════════════════════════
    // 🏛️ ACADEMIC BUILDINGS — NEW SITE (NORTHERN CAMPUS)
    // ═══════════════════════════════════════════════════════════
    { id: "ACAD-01", fullName: "Sam Jonah Library", shortForm: "SJL", description: "Central library. 750K volumes, 2,000 seats, 4 floors.", url: "5.116774, -1.290948", category: "Academic" },
    { id: "ACAD-02", fullName: "C.A. Ackah Lecture Theatre Complex", shortForm: "CALC", description: "Multi-story complex. Gym, e-learning, CEGRAD, CCM.", url: "5.119300, -1.292427", category: "Academic" },
    { id: "ACAD-03", fullName: "New Examination Centre", shortForm: "NEC", description: "Primary exam & graduation venue. Strict rules apply.", url: "5.120875, -1.293832", category: "Academic" },
    { id: "ACAD-04", fullName: "Large Lecture Theatre (S.K. Adjepong)", shortForm: "LLT", description: "Banked seating. Students' Clinic in basement (8am–3pm).", url: "5.117121, -1.291575", category: "Academic" },
    { id: "ACAD-05", fullName: "New Lecture Theatre", shortForm: "NLT", description: "Modern facility. Simulations & Clinical Skills Lab.", url: "5.122190, -1.295914", category: "Academic" },
    { id: "ACAD-06", fullName: "Sandwich Lecture Theatre", shortForm: "SWLT", description: "Lecture venue. ⚠️ Flood zone during rainy season.", url: "5.118082, -1.298151", category: "Academic" },
    { id: "ACAD-07", fullName: "College of Agriculture & Natural Sciences", shortForm: "CANS", description: "Science enclave. Computational Thinking Centre.", url: "5.116348, -1.293578", category: "Academic" },
    { id: "ACAD-08", fullName: "School of Business Complex", shortForm: "SoB", description: "25-unit smart classrooms. Auditorium 900. Business Library.", url: "5.120886, -1.294760", category: "Academic" },
    { id: "ACAD-09", fullName: "School of Graduate Studies Complex", shortForm: "SGS", description: "Postgraduate block. 10 seminar halls, resource center.", url: "5.120753, -1.295833", category: "Academic" },
    { id: "ACAD-10", fullName: "College of Distance Education (Albert Koomson)", shortForm: "CoDE", description: "Distance education HQ. Counselling & E-Learning units.", url: "5.122091, -1.294816", category: "Academic" },
    { id: "ACAD-11", fullName: "School of Medical Sciences", shortForm: "SMS", description: "Medical school auditorium and laboratories.", url: "5.120138, -1.293777", category: "Academic" },
    { id: "ACAD-12", fullName: "College of Education Studies", shortForm: "CoE", description: "Faculty of Education. Provost Office.", url: "5.119065, -1.293953", category: "Academic" },
    { id: "ACAD-13", fullName: "Faculty of Law", shortForm: "Law", description: "Law faculty building.", url: "5.116772, -1.293243", category: "Academic" },
    { id: "ACAD-14", fullName: "School of Biological Sciences", shortForm: "Bio Sci", description: "Biological sciences. Top floor of CANS.", url: "5.116122, -1.293991", category: "Academic" },
    { id: "ACAD-15", fullName: "School of Physical Sciences", shortForm: "Phys Sci", description: "Physical sciences department.", url: "5.116560, -1.293524", category: "Academic" },
    { id: "ACAD-16", fullName: "School of Economics", shortForm: "Econs", description: "Economics department.", url: "5.117847, -1.294055", category: "Academic" },
    { id: "ACAD-17", fullName: "School for Development Studies", shortForm: "SDS", description: "Development studies.", url: "5.117927, -1.291212", category: "Academic" },
    { id: "ACAD-18", fullName: "Institute of Education", shortForm: "IoE", description: "Education research and training.", url: "5.119374, -1.293383", category: "Academic" },
    { id: "ACAD-19", fullName: "Dept. of Geography & Regional Planning", shortForm: "Geog", description: "Geography department.", url: "5.117524, -1.292602", category: "Academic" },
    { id: "ACAD-20", fullName: "Centre for African & International Studies", shortForm: "CAIS", description: "African and international studies.", url: "5.117842, -1.293396", category: "Academic" },
    { id: "ACAD-21", fullName: "G Block (Faculty of Arts)", shortForm: "G Block", description: "Arts faculty lecture rooms.", url: "5.117992, -1.292551", category: "Academic" },
    { id: "ACAD-22", fullName: "New Science Annex Lecture Theatre", shortForm: "New Annex", description: "Lecture space near Science Market.", url: "5.115139, -1.294093", category: "Academic" },
    { id: "ACAD-23", fullName: "Amissah Arthur Lecture Theatre", shortForm: "AALT", description: "Lecture theatre.", url: "5.119124, -1.294639", category: "Academic" },
    { id: "ACAD-24", fullName: "University Main Auditorium", shortForm: "Auditorium", description: "Main auditorium. Events and ceremonies.", url: "5.116769, -1.293891", category: "Academic" },

    // ═══════════════════════════════════════════════════════════
    // 🏢 ADMINISTRATIVE
    // ═══════════════════════════════════════════════════════════
    { id: "ADM-01", fullName: "Adow Obeng Central Administration", shortForm: "Admin", description: "VC Office, Registrar, DAA, Finance Directorate.", url: "5.115513, -1.290778", category: "Administrative" },
    { id: "ADM-02", fullName: "Old Administration Block", shortForm: "Old Admin", description: "Legacy admin. VOTEC department. Old Site.", url: "5.1054, -1.2868", category: "Administrative" },
    { id: "ADM-03", fullName: "Academic Affairs Office", shortForm: "DAA", description: "Transcripts, records, deferments. Block B.", url: "5.1055, -1.2868", category: "Administrative" },
    { id: "ADM-04", fullName: "MIS Office (Faculty of Education)", shortForm: "MIS", description: "Management Information Systems.", url: "5.119248, -1.293847", category: "Administrative" },

    // ═══════════════════════════════════════════════════════════
    // 🏠 HALLS OF RESIDENCE — NEW SITE
    // ═══════════════════════════════════════════════════════════
    { id: "HALL-01", fullName: "Casely-Hayford Hall", shortForm: "Casford", description: "All-Male. 'Truth and Courage'. Omanhene governance.", url: "5.116795, -1.284218", category: "Residential" },
    { id: "HALL-02", fullName: "Valco Hall", shortForm: "Valco", description: "Mixed. Women's Athletics Champions.", url: "5.115828, -1.282608", category: "Residential" },
    { id: "HALL-03", fullName: "Kwame Nkrumah Hall", shortForm: "KNH", description: "Mixed. Est. 1998. Originally for graduate students.", url: "5.116363, -1.280216", category: "Residential" },
    { id: "HALL-04", fullName: "SRC Hall", shortForm: "SRC Hall", description: "Modern residential hall.", url: "5.133954, -1.286986", category: "Residential" },
    { id: "HALL-05", fullName: "Superannuation Hall", shortForm: "Super", description: "Residential hall.", url: "5.133595, -1.288819", category: "Residential" },

    // ═══════════════════════════════════════════════════════════
    // 🏠 HALLS OF RESIDENCE — OLD SITE (SOUTHERN CAMPUS)
    // ═══════════════════════════════════════════════════════════
    { id: "HALL-06", fullName: "Oguaa Hall", shortForm: "Premier", description: "The Premier Hall. 'Knowledge, Unity, Peace'. Old Site.", url: "5.105054460783785, -1.2860963795889966", category: "Residential" },
    { id: "HALL-07", fullName: "Adehye Hall", shortForm: "Royals", description: "Only all-female hall. 'The Royals'. Quietest on campus.", url: "5.105467433028833, -1.2862456950620555", category: "Residential" },
    { id: "HALL-08", fullName: "Atlantic Hall", shortForm: "ATL", description: "Mariners. Athletics champions. Rivalry with Oguaa.", url: "5.105593582052248, -1.287014936372032", category: "Residential" },

    // ═══════════════════════════════════════════════════════════
    // 🏥 HEALTH
    // ═══════════════════════════════════════════════════════════
    { id: "HLT-01", fullName: "UCC Hospital", shortForm: "Hospital", description: "24/7 healthcare. NHIS covered. Old Site.", url: "5.1105, -1.2885", category: "Health" },

    // ═══════════════════════════════════════════════════════════
    // 🚌 TRANSIT & LOGISTICS
    // ═══════════════════════════════════════════════════════════
    { id: "TRN-01", fullName: "Science Shuttle Station", shortForm: "Shuttle", description: "Central transit hub. Tickets, mini-marts.", url: "5.116864, -1.292158", category: "Transit" },
    { id: "TRN-02", fullName: "West Gate", shortForm: "W. Gate", description: "Western campus entrance.", url: "5.101707, -1.284271", category: "Transit" },
    { id: "TRN-03", fullName: "Library Parking Lot", shortForm: "Parking", description: "Parking near Sam Jonah Library.", url: "5.116649, -1.291449", category: "Transit" },

    // ═══════════════════════════════════════════════════════════
    // 🛒 COMMERCIAL
    // ═══════════════════════════════════════════════════════════
    { id: "COM-01", fullName: "Science Market", shortForm: "Sci Market", description: "Food, stationery, printing. New Site hub.", url: "5.114942, -1.293488", category: "Commercial" },
    { id: "COM-02", fullName: "CoDE Market", shortForm: "CoDE Market", description: "Market near College of Distance Education.", url: "5.122319, -1.294287", category: "Commercial" },

    // ═══════════════════════════════════════════════════════════
    // ⛪ PLACES OF WORSHIP
    // ═══════════════════════════════════════════════════════════
    { id: "CH-01", fullName: "University Inter-denominational Church", shortForm: "UIDC", description: "Inter-denominational worship.", url: "5.120991, -1.290326", category: "Worship" },
    { id: "CH-02", fullName: "Our Lady Seat of Wisdom Catholic Church", shortForm: "Catholic", description: "Catholic church on campus.", url: "5.119809, -1.291098", category: "Worship" },

    // ═══════════════════════════════════════════════════════════
    // 🏦 BANKING
    // ═══════════════════════════════════════════════════════════
    { id: "BNK-01", fullName: "Prudential Bank Ltd.", shortForm: "Prudential", description: "Banking services. Near Casford.", url: "5.117736, -1.285642", category: "Banking" },
    { id: "BNK-02", fullName: "GCB Bank UCC Branch", shortForm: "GCB", description: "Banking services on campus.", url: "5.115194, -1.279648", category: "Banking" },

    // ═══════════════════════════════════════════════════════════
    // 🏟️ RECREATION & CEREMONIES
    // ═══════════════════════════════════════════════════════════
    { id: "REC-01", fullName: "Congregation / Matriculation Grounds", shortForm: "Congregation", description: "Outdoor ceremony grounds.", url: "5.117413, -1.293534", category: "Recreation" },
    { id: "REC-02", fullName: "Recreational Grounds", shortForm: "Rec Grounds", description: "Open space for sports and relaxation.", url: "5.117627, -1.293466", category: "Recreation" },
    { id: "REC-03", fullName: "UCC Sports Complex", shortForm: "Sports", description: "Track and field, athletics.", url: "5.103973, -1.281219", category: "Recreation" }
  ];

  const getCoordinates = (url) => {
    if (!url) return null;
    const coordMatch = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.exec(url);
    if (coordMatch) {
      return [parseFloat(coordMatch[1]), parseFloat(coordMatch[3])];
    }
    return null;
  };

  const defaultCenter = [5.116774, -1.290948]; // Sam Jonah Library — geographic center of New Site

  return { sections, buildings, openGoogleMaps, getCoordinates, defaultCenter };
};

const AcronymTile = ({ code, site, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all text-center group"
  >
    <div className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-1">{site}</div>
    <div className="text-sm font-black text-slate-900 group-hover:text-primary-600">{code}</div>
  </button>
);

export default CampusMap;
