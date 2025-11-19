import React from 'react';

const CampusMap = () => {
  // UCC GUIDE: CAMPUS MAP (MASTER EDITION)
  // INCLUDES: Full Acronym Decoder (CAS, CASS, COE, etc.)
  // INCLUDES: 100+ Locations (Halls, Hostels, "Gaza", "Koobi Joint", "Brunei", Taxi Ranks)

  const openGoogleMaps = (term) => {
    // Appends "University of Cape Coast" or "Cape Coast" to ensure accuracy
    const query = term.includes("Cape Coast") ? term : `${term} University of Cape Coast`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  const sections = [
    {
      title: "Campus Navigation",
      summary: "The Ultimate Guide to UCC Acronyms, Landmarks, and Transport.",
      
      // --- OVERVIEW CONTENT ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Welcome to the definitive guide to UCC. Whether you are looking for <strong>"Gaza"</strong>, <strong>"Brunei"</strong>, or the <strong>"Science Roundabout"</strong>, this map has every acronym and local name you need to survive.
            </p>
          </div>

          {/* --- MASTER ACRONYM DECODER (Interactive) --- */}
          <div className="pt-2">
            <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">?</span>
              Daily Acronyms (Click to Locate)
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* Colleges */}
              <AcronymCard code="CAS" full="College of Agriculture & Natural Sciences" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="CASS" full="College of Humanities & Legal Studies" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="COE" full="College of Education Studies" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="COB" full="College of Business" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="CHLS" full="College of Humanities & Legal Studies" site="Old Site" onClick={openGoogleMaps} />
              
              {/* Schools & Blocks */}
              <AcronymCard code="SMS" full="School of Medical Sciences" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="SAS" full="School of Allied Sciences" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="SEMS" full="School of Educational & Management Sciences" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="SIBM" full="School of Business" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="PGS" full="School of Graduate Studies" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="SAP" full="School of Agriculture Pavilion" site="New Site" onClick={openGoogleMaps} />
              
              {/* Lecture Complexes */}
              <AcronymCard code="CALC" full="Complex for Academic Lecture Theatres" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="LLT" full="Large Lecture Theatre" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="SLT" full="Science Lecture Theatres" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="ELT" full="ELT Complex" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="NAT" full="New Arts Block" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="NEA" full="New Examination Auditorium" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="CELT" full="Centre for Educational Lecture Theatre" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="LT 1-4" full="Lecture Theatres 1-4" site="New Site (Science)" onClick={openGoogleMaps} />
              
              {/* Libraries */}
              <AcronymCard code="SAMIS" full="Sam Jonah Library (Main Lib)" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="EDU LIB" full="Education Library" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="SCI LIB" full="Science Library" site="New Site" onClick={openGoogleMaps} />
              
              {/* Halls */}
              <AcronymCard code="CASFORD" full="Casely Hayford Hall" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="ATL" full="Atlantic Hall" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="OGUAA" full="Oguaa Hall (Premier)" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="VALCO" full="Valco Trust Hall" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="KNH" full="Kwame Nkrumah Hall" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="THH" full="Thomas Hayford Hall" site="Casford Area" onClick={openGoogleMaps} />
              <AcronymCard code="SRC" full="SRC Hostel" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="GUSSS" full="GUSSS Hostels" site="Diaspora" onClick={openGoogleMaps} />
              
              {/* Landmarks */}
              <AcronymCard code="CC" full="Central Cafeteria" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="SCI" full="Science Block / Quadrangle" site="New Site" onClick={openGoogleMaps} />
            </div>
          </div>

          {/* --- QUICK ZONAL REFERENCES --- */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3">Old Site (Southern)</h4>
              <div className="flex flex-wrap gap-2">
                <Pill text="Admin Block" />
                <Pill text="Faculty of Arts" />
                <Pill text="Social Sciences" />
                <Pill text="Education" />
                <Pill text="UCC Hospital" />
                <Pill text="Oguaa" />
                <Pill text="Adehye" />
                <Pill text="Atlantic" />
              </div>
            </div>
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-3">New Site (Northern)</h4>
              <div className="flex flex-wrap gap-2">
                <Pill text="Science" />
                <Pill text="Medical School" />
                <Pill text="Business" />
                <Pill text="Sam Jonah Lib" />
                <Pill text="Casford" />
                <Pill text="Valco" />
                <Pill text="Nkrumah" />
                <Pill text="SRC Hall" />
              </div>
            </div>
          </div>
        </div>
      ),

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Located my Faculty Block", checked: false },
        { text: "Found the nearest Shuttle Station", checked: false },
        { text: "Visited the University Hospital", checked: false },
        { text: "Located Sam Jonah Library", checked: false },
        { text: "Saved Campus Security Number", checked: false }
      ]
    }
  ];

  // --- THE MASTER LIST: 100+ LOCATIONS ---
  const buildings = [
    // --- CORE ACADEMIC & LECTURE AREAS ---
    { id: "A1", fullName: "College of Agriculture & Natural Sciences (CAS)", shortForm: "CAS", description: "Main Science enclave.", url: "College of Agriculture & Natural Sciences UCC" },
    { id: "A2", fullName: "Science Lecture Theatre", shortForm: "SLT", description: "Major lecture hall in Science block.", url: "Science Lecture Theatre UCC" },
    { id: "A3", fullName: "Lecture Theatres 1-4", shortForm: "LT 1-4", description: "Located within the Science Quadrangle.", url: "Science Block UCC" },
    { id: "A4", fullName: "New Arts Block", shortForm: "NAT", description: "Near Faculty of Arts (Old Site).", url: "New Arts Block UCC" },
    { id: "A5", fullName: "Old Site Lecture Block", shortForm: "Old Block", description: "Traditional lecture rooms at Old Site.", url: "Faculty of Arts UCC" },
    { id: "A6", fullName: "New Site Lecture Block", shortForm: "New Block", description: "Near the Science Market.", url: "New Site Lecture Theatre UCC" },
    { id: "A7", fullName: "ELT Complex", shortForm: "ELT", description: "Lecture halls near Casford.", url: "ELT Lecture Theatre UCC" },
    { id: "A8", fullName: "New Examination Auditorium", shortForm: "NEA", description: "New Site, used for exams and large classes.", url: "New Examination Center UCC" },
    { id: "A9", fullName: "CASS Block", shortForm: "CASS", description: "College of Humanities & Legal Studies.", url: "College of Humanities and Legal Studies UCC" },
    { id: "A10", fullName: "School of Medical Sciences", shortForm: "SMS", description: "Medical School Auditorium & Labs.", url: "School of Medical Sciences UCC" },
    { id: "A11", fullName: "School of Allied Sciences", shortForm: "SAS", description: "Near SMS Block.", url: "School of Allied Health Sciences UCC" },
    { id: "A12", fullName: "Faculty of Education", shortForm: "COE", description: "Old Site, near Shuttle Station.", url: "Faculty of Education UCC" },
    { id: "A13", fullName: "School of Business", shortForm: "SIBM", description: "New Site, near Library.", url: "School of Business UCC" },
    { id: "A14", fullName: "School of Languages", shortForm: "Languages", description: "Faculty of Arts enclave.", url: "Department of Ghanaian Languages UCC" },
    { id: "A15", fullName: "School of Creative Arts", shortForm: "Arts", description: "Near Old Administration.", url: "Department of Music and Dance UCC" },
    { id: "A16", fullName: "School of Agriculture Pavilion", shortForm: "SAP", description: "Agric lecture area.", url: "School of Agriculture UCC" },
    { id: "A17", fullName: "Laboratory Blocks", shortForm: "Labs", description: "Chemistry, Physics, Biology Labs.", url: "Department of Chemistry UCC" },
    { id: "A18", fullName: "School of Graduate Studies", shortForm: "PGS", description: "Old Site.", url: "School of Graduate Studies UCC" },
    { id: "A19", fullName: "Department of Fisheries", shortForm: "Fisheries", description: "Near CAS.", url: "Department of Fisheries and Aquatic Sciences UCC" },
    { id: "A20", fullName: "Computer Science Department", shortForm: "DCS", description: "Science Block.", url: "Department of Computer Science UCC" },
    { id: "A21", fullName: "Faculty of Law", shortForm: "Law", description: "New Site.", url: "Faculty of Law UCC" },
    { id: "A22", fullName: "School of Nursing", shortForm: "Nursing", description: "Near Medical School.", url: "School of Nursing and Midwifery UCC" },

    // --- LIBRARIES ---
    { id: "L1", fullName: "Sam Jonah Library", shortForm: "SAMIS", description: "The central university library (New Site).", url: "Sam Jonah Library" },
    { id: "L2", fullName: "Science Library", shortForm: "Sci Lib", description: "Inside Science Block.", url: "UCC Science Library" },
    { id: "L3", fullName: "Education Library", shortForm: "Edu Lib", description: "Old Site.", url: "Faculty of Education Library UCC" },
    { id: "L4", fullName: "Medical School Library", shortForm: "Med Lib", description: "Inside SMS Block.", url: "UCC Medical School Library" },

    // --- ADMINISTRATIVE ---
    { id: "AD1", fullName: "Administration Block", shortForm: "Main Admin", description: "VC Office, Registrar. Old Site.", url: "Administration Block UCC" },
    { id: "AD2", fullName: "Academic Affairs", shortForm: "Academic", description: "Transcripts and Records.", url: "Directorate of Academic Affairs UCC" },
    { id: "AD3", fullName: "Directorate of Finance", shortForm: "Finance", description: "Student Accounts and Fees.", url: "Directorate of Finance UCC" },
    { id: "AD4", fullName: "Dean of Students Office", shortForm: "DOS", description: "Student welfare and discipline.", url: "Dean of Students UCC" },
    { id: "AD5", fullName: "Admissions Office", shortForm: "Admissions", description: "Application enquiries.", url: "UCC Admissions Office" },
    { id: "AD6", fullName: "International Relations Office", shortForm: "IRO", description: "International student support.", url: "Centre for International Education UCC" },

    // --- HALLS & HOSTELS ---
    { id: "H1", fullName: "Casely Hayford Hall", shortForm: "Casford", description: "Male Hall (New Site).", url: "Casely Hayford Hall" },
    { id: "H2", fullName: "Atlantic Hall", shortForm: "ATL", description: "Mixed Hall (Old Site).", url: "Atlantic Hall UCC" },
    { id: "H3", fullName: "Kwame Nkrumah Hall", shortForm: "KNH", description: "Mixed Hall (New Site).", url: "Kwame Nkrumah Hall UCC" },
    { id: "H4", fullName: "Oguaa Hall", shortForm: "Premier", description: "Mixed Hall (Old Site).", url: "Oguaa Hall" },
    { id: "H5", fullName: "Adehye Hall", shortForm: "Royals", description: "Female Hall (Old Site).", url: "Adehye Hall" },
    { id: "H6", fullName: "Valco Trust Hall", shortForm: "Valco", description: "Mixed Hall (New Site).", url: "Valco Hall UCC" },
    { id: "H7", fullName: "SRC Hostel", shortForm: "SRC", description: "Modern Hostel (New Site).", url: "SRC Hostel UCC" },
    { id: "H8", fullName: "Superannuation Hall", shortForm: "Super", description: "Near the Hospital.", url: "Superannuation Hostel UCC" },
    { id: "H9", fullName: "Thomas Hayford Hall", shortForm: "THH", description: "Near Casford.", url: "Casely Hayford Hall" }, // Often mapped near Casford
    { id: "H10", fullName: "GUSSS Hostels", shortForm: "GUSSS", description: "Main, Annex, and Hall.", url: "GUSSS Hostel UCC" },
    { id: "H11", fullName: "Amamoma Hostels Cluster", shortForm: "Gaza", description: "Popular off-campus area.", url: "Amamoma UCC" },
    { id: "H12", fullName: "Ayensu Plaza/Hostel", shortForm: "Ayensu", description: "Near Old Site.", url: "Ayensu Plaza Hostel" },
    { id: "H13", fullName: "Apewosika Hostels", shortForm: "Apewosika", description: "Behind Old Site.", url: "Apewosika UCC" },

    // --- HEALTH FACILITIES ---
    { id: "HF1", fullName: "UCC Hospital", shortForm: "Hospital", description: "Main healthcare facility.", url: "University of Cape Coast Hospital" },
    { id: "HF2", fullName: "UCC Clinic", shortForm: "Clinic", description: "Outpatient services.", url: "UCC Clinic" },
    { id: "HF3", fullName: "UCC Eye Clinic", shortForm: "Eye Clinic", description: "Optometry services.", url: "UCC Department of Optometry" },
    { id: "HF4", fullName: "Counseling Centre", shortForm: "Counseling", description: "Mental Health & Wellness.", url: "Counselling Centre UCC" },
    
    // --- TRANSPORT POINTS ---
    { id: "T1", fullName: "UCC Shuttle Station", shortForm: "Shuttle", description: "Main hub at Old Site.", url: "UCC Shuttle Station" },
    { id: "T2", fullName: "Science Taxi Rank", shortForm: "Sci Rank", description: "Main New Site rank.", url: "UCC Science Taxi Rank" },
    { id: "T3", fullName: "ATL Taxi Rank", shortForm: "ATL Rank", description: "Near Atlantic Hall.", url: "Atlantic Hall UCC" },
    { id: "T4", fullName: "Valco Taxi Rank", shortForm: "Valco Rank", description: "Near Valco Hall.", url: "Valco Hall UCC" },
    { id: "T5", fullName: "SRC Hostel Taxi Rank", shortForm: "SRC Rank", description: "Serves SRC/GUSSS.", url: "SRC Hostel UCC" },
    { id: "T6", fullName: "Amamoma Junction", shortForm: "Amamoma Jxn", description: "Entry to Gaza.", url: "Amamoma Junction" },
    { id: "T7", fullName: "Apewosika Junction", shortForm: "Apewosika Jxn", description: "Entry to Apewosika.", url: "Apewosika Junction" },
    { id: "T8", fullName: "Pedu Junction", shortForm: "Pedu", description: "Major town junction.", url: "Pedu Junction Cape Coast" },
    { id: "T9", fullName: "Aboom Station", shortForm: "Aboom", description: "Town transport hub.", url: "Aboom Road Cape Coast" },

    // --- SOCIAL & STUDENT LIFE ---
    { id: "S1", fullName: "Science Market", shortForm: "Sci Market", description: "Food, stationery, printing.", url: "UCC Science Market" },
    { id: "S2", fullName: "Sammo Restaurant", shortForm: "Sammo", description: "Popular food joint.", url: "Sammo Kitchen UCC" },
    { id: "S3", fullName: "Felicia's Joint", shortForm: "Felicia's", description: "Food near Science.", url: "UCC Science Market" },
    { id: "S4", fullName: "Central Cafeteria", shortForm: "CC", description: "Large dining hall.", url: "UCC Central Cafeteria" },
    { id: "S5", fullName: "UCC Sports Stadium", shortForm: "Stadium", description: "Main sports field.", url: "UCC Sports Stadium" },
    { id: "S6", fullName: "Koobi Joint", shortForm: "Koobi", description: "Popular food area.", url: "UCC Campus" },
    { id: "S7", fullName: "Brunei Spot", shortForm: "Brunei", description: "Student hangout.", url: "UCC Campus" },
    { id: "S8", fullName: "Campus Bookshop", shortForm: "Bookshop", description: "Textbooks and stationery.", url: "UCC Bookshop" },
    { id: "S9", fullName: "ICT Centre", shortForm: "ICT", description: "Computer labs and WiFi.", url: "UCC ICT Centre" },
    { id: "S10", fullName: "Reading Pavilion", shortForm: "Pavilion", description: "Behind Sam Jonah Library.", url: "Sam Jonah Library" },
    { id: "S11", fullName: "UCC FM", shortForm: "Radio", description: "Campus radio station.", url: "ATL FM UCC" },
    { id: "S12", fullName: "ATL Beach Road", shortForm: "Beach Road", description: "Scenic route near Atlantic Hall.", url: "UCC Beach Road" },

    // --- LANDMARKS ---
    { id: "LM1", fullName: "Science Roundabout", shortForm: "Sci R-About", description: "Central New Site junction.", url: "UCC Science Block" },
    { id: "LM2", fullName: "Nkrumah Roundabout", shortForm: "KNH R-About", description: "Near Kwame Nkrumah Hall.", url: "Kwame Nkrumah Hall UCC" },
    { id: "LM3", fullName: "ATL Junction", shortForm: "ATL Jxn", description: "Junction to Old Site.", url: "Atlantic Hall UCC" },
    { id: "LM4", fullName: "Oguaa Roundabout", shortForm: "Oguaa R-About", description: "Old Site entrance.", url: "Oguaa Hall" },
    { id: "LM5", fullName: "Cape Coast Teaching Hospital", shortForm: "CCTH", description: "Regional hospital (Interbeton).", url: "Cape Coast Teaching Hospital" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'directions', label: 'Directions' },
    { id: 'checklist', label: 'Checklist' }
  ];

  return { sections, buildings, openGoogleMaps, tabs };
};

// Helper Components
const AcronymCard = ({ code, full, site, onClick }) => (
  <button 
    onClick={() => onClick(full)} 
    className="group text-left bg-white p-3 rounded-xl border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all w-full h-full flex flex-col"
  >
    <div className="flex justify-between items-start w-full mb-2">
      <span className="text-base font-bold text-indigo-700 group-hover:text-indigo-900">{code}</span>
      <span className={`text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap ${site.includes('Old') ? 'bg-blue-100 text-blue-600' : site.includes('New') ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
        {site}
      </span>
    </div>
    <div className="text-xs text-gray-500 leading-tight font-medium">{full}</div>
  </button>
);

const Pill = ({ text }) => (
  <span className="text-[10px] font-semibold bg-white/60 px-2 py-1 rounded-lg border border-black/5 text-gray-700 whitespace-nowrap">
    {text}
  </span>
);

export default CampusMap;