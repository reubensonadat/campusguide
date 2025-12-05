import React from 'react';

const CampusMap = () => {
  // UCC GUIDE: CAMPUS MAP (MASTER EDITION)
  // INCLUDES: Full Acronym Decoder (CAS, CASS, COE, etc.)
  // INCLUDES: 100+ Locations (Halls, Hostels, "Gaza", "Koobi Joint", "Brunei", Taxi Ranks)

  const openGoogleMaps = (term) => {
  // Check if term is coordinates (contains a comma and numbers)
  const isCoordinates = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(term);
  
  let url;
  if (isCoordinates) {
    // Direct coordinates
    url = `https://www.google.com/maps/search/?api=1&query=${term}`;
  } else {
    // Search term with "University of Cape Coast" appended
    const query = term.includes("Cape Coast") ? term : `${term} University of Cape Coast`;
    url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }
  
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
              Welcome to the definitive guide to UCC. Whether you are looking for <strong>"Science Market"</strong>, <strong>"CALC"</strong>, or the <strong>"Ceremonial grounds"</strong>, this map has every acronym and local name you need to survive.
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
              <AcronymCard code="CANS" full="College of Agriculture & Natural Sciences" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="CHLS" full="College of Humanities & Legal Studies" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="CoE" full="College of Education Studies" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="CHLS" full="College of Humanities & Legal Studies" site="Science" onClick={openGoogleMaps} />
              
              {/* Schools & Blocks */}
              <AcronymCard code="SMS" full="School of Medical Sciences" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="SoB" full="School of Business" site="Science" onClick={openGoogleMaps} />
              
              
              {/* Lecture Complexes */}
              <AcronymCard code="CALC" full="College of Educational Students Lecture Theater" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="LLT" full="Large Lecture Theatre" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="NEC" full="New Examination Center" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="SWLT" full="Sandwich lecture Theatre" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="CODE" full="College Of Distance Education (CoDE)" site="Science" onClick={openGoogleMaps} />
              
              
              {/* Libraries */}
              <AcronymCard code="SJL" full="Sam Jonah Library (Main Lib)" site="Science" onClick={openGoogleMaps} />
              <AcronymCard code="EDU LIB" full="College of Education Studies" site="Science" onClick={openGoogleMaps} />
              
              {/* Halls */}
              <AcronymCard code="CASFORD" full="Casely Hayford Hall" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="ATL" full="Atlantic Hall" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="OGUAA" full="Oguaa Hall (Premier)" site="Old Site" onClick={openGoogleMaps} />
              <AcronymCard code="VALCO" full="Valco Hall" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="KNH" full="Kwame Nkrumah Hall" site="New Site" onClick={openGoogleMaps} />
              <AcronymCard code="SRC" full="SRC Hall" site="Estate" onClick={openGoogleMaps} />

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
    { id: "A1", fullName: "College of Agriculture & Natural Sciences (CANS)", shortForm: "CANS", description: "Main Science enclave.", url: "College of Agriculture & Natural Sciences UCC" },
    { id: "A2", fullName: "Lecture Theatre", shortForm: "LT", description: "Major lecture hall in Science block.", url: "5.11676647092683, -1.293229663589804" },
    
    
    { id: "A5", fullName: "Old Site Lecture Block", shortForm: "Old Block", description: "Traditional lecture rooms at Old Site.", url: "5.105792124369729, -1.2864329899523184" },
    { id: "A6", fullName: "New Science Annex", shortForm: "New Block", description: "Near the Science Market.", url: "5.115151427780214, -1.2942234432853927" },
    
    { id: "A8", fullName: "New Examination Center", shortForm: "NEC", description: "New Site, used for exams and large classes.", url: "5.120774879623484, -1.2937249323395927" },
    { id: "A9", fullName: "CHLS Block", shortForm: "CHLS", description: "College of Humanities & Legal Studies.", url: "College of Humanities and Legal Studies UCC" },
    { id: "A10", fullName: "School of Medical Sciences", shortForm: "SMS", description: "Medical School Auditorium & Labs.", url: "School of Medical Sciences UCC" },
    { id: "A11", fullName: "School of Allied Sciences", shortForm: "SAS", description: "Near SMS Block.", url: "5.11999958165719, -1.2938150002848474" },
  //{ id: "A12", fullName: "Faculty of Education", shortForm: "COE", description: "Old Site, near Shuttle Station.", url: "Faculty of Education UCC" },
    { id: "A13", fullName: "School of Business", shortForm: "SoB", description: "New Site, near Library.", url: "School of Business UCC" },
  //  { id: "A14", fullName: "School of Languages", shortForm: "Languages", description: "Faculty of Arts enclave.", url: "Department of Ghanaian Languages UCC" },
  //  { id: "A15", fullName: "School of Creative Arts", shortForm: "Arts", description: "Near Old Administration.", url: "Department of Music and Dance UCC" },
  //  { id: "A16", fullName: "School of Agriculture Pavilion", shortForm: "SAP", description: "Agric lecture area.", url: "School of Agriculture UCC" },
  //  { id: "A17", fullName: "Laboratory Blocks", shortForm: "Labs", description: "Chemistry, Physics, Biology Labs.", url: "Department of Chemistry UCC" },
    { id: "A18", fullName: "School of Graduate Studies", shortForm: "PGS", description: "Old Site.", url: "School of Graduate Studies UCC" },
  //  { id: "A19", fullName: "Department of Fisheries", shortForm: "Fisheries", description: "Near CAS.", url: "Department of Fisheries and Aquatic Sciences UCC" },
    { id: "A20", fullName: "Computer Science Department", shortForm: "CS", description: "Science Block.", url: "5.11604897232864, -1.2938718155845037" },
    { id: "A21", fullName: "Faculty of Law", shortForm: "Law", description: "New Site.", url: "5.1175453569657625, -1.2929534136352714" },
    { id: "A22", fullName: "School of Nursing", shortForm: "Nursing", description: "Inside the CANS building.", url: "5.116297423955384, -1.2935723263496335" },

    // --- LIBRARIES ---
    { id: "L1", fullName: "Sam Jonah Library", shortForm: "SAMIS", description: "The central university library (New Site).", url: "Sam Jonah Library" },
  //  { id: "L2", fullName: "Science Library", shortForm: "Sci Lib", description: "Inside Science Block.", url: "UCC Science Library" },
    { id: "L3", fullName: "Education Library", shortForm: "Edu Lib", description: "Old Site.", url: "5.118007196038291, -1.2958476907008707" },
    { id: "L4", fullName: "Medical School Library", shortForm: "Med Lib", description: "Inside SMS Block.", url: "5.1203041333693395, -1.2938793731567169" },

    // --- ADMINISTRATIVE ---

    { id: "AD1", fullName: "Administration Block", shortForm: "Main Admin", description: "VC Office, Registrar. Old Site.", url: "University of Cape Coast Central Administration, Emmanuel Adow Obeng Building" },
    { id: "AD2", fullName: "Academic Affairs", shortForm: "Academic", description: "Transcripts and Records.", url: "Directorate of Academic Affairs UCC" },
    { id: "AD3", fullName: "Directorate of Finance", shortForm: "Finance", description: "Student Accounts and Fees.", url: "University of Cape Coast Central Administration, Emmanuel Adow Obeng Building" },
  //  { id: "AD4", fullName: "Dean of Students Office", shortForm: "DOS", description: "Student welfare and discipline.", url: "Dean of Students UCC" },
    { id: "AD5", fullName: "Admissions Office", shortForm: "Admissions", description: "Application enquiries.", url: "University of Cape Coast Central Administration, Emmanuel Adow Obeng Building" },
    { id: "AD6", fullName: "International Relations Office", shortForm: "IRO", description: "International student support.", url: "Office of International Relations, University of Cape Coast" },

    // --- HALLS & HOSTELS ---
    { id: "H1", fullName: "Casely Hayford Hall", shortForm: "Casford", description: "Male Hall (New Site).", url: "Casely Hayford Hall" },
    { id: "H2", fullName: "Atlantic Hall", shortForm: "ATL", description: "Mixed Hall (Old Site).", url: "Atlantic Hall UCC" },
    { id: "H3", fullName: "Kwame Nkrumah Hall", shortForm: "KNH", description: "Mixed Hall (New Site).", url: "Kwame Nkrumah Hall UCC" },
    { id: "H4", fullName: "Oguaa Hall", shortForm: "Premier", description: "Mixed Hall (Old Site).", url: "Oguaa Hall" },
    { id: "H5", fullName: "Adehye Hall", shortForm: "Royals", description: "Female Hall (Old Site).", url: "Adehye Hall" },
    { id: "H6", fullName: "Valco Trust Hall", shortForm: "Valco", description: "Mixed Hall (New Site).", url: "Valco Hall UCC" },
    { id: "H7", fullName: "SRC Hostel", shortForm: "SRC", description: "Modern Hostel (New Site).", url: "SRC Hostel UCC" },
    { id: "H8", fullName: "Superannuation Hall", shortForm: "Super", description: "Near the Hospital.", url: "Superannuation Hostel UCC" },

    // --- HEALTH FACILITIES ---
    { id: "HF1", fullName: "UCC Hospital", shortForm: "Hospital", description: "Main healthcare facility.", url: "University of Cape Coast Hospital" },
    { id: "HF2", fullName: "UCC Clinic", shortForm: "Clinic", description: "Outpatient services.", url: "UCC Clinic" },
    { id: "HF3", fullName: "UCC Eye Clinic", shortForm: "Eye Clinic", description: "Optometry services.", url: "5.105764775944754, -1.283865588722589" },
    { id: "HF4", fullName: "Counseling Centre", shortForm: "Counseling", description: "Mental Health & Wellness.", url: "Counselling Centre UCC" },
    
    // --- TRANSPORT POINTS ---
  //  { id: "T1", fullName: "UCC Shuttle Station", shortForm: "Shuttle", description: "Main hub at Old Site.", url: "5.116807377906874, -1.2921375063551965" },
  //  { id: "T2", fullName: "Science Taxi Rank", shortForm: "Sci Rank", description: "Main New Site rank.", url: "UCC Science Taxi Rank" },
  //  { id: "T3", fullName: "ATL Taxi Rank", shortForm: "ATL Rank", description: "Near Atlantic Hall.", url: "Atlantic Hall UCC" },
  //  { id: "T4", fullName: "Valco Taxi Rank", shortForm: "Valco Rank", description: "Near Valco Hall.", url: "Valco Hall UCC" },
  //  { id: "T5", fullName: "SRC Hostel Taxi Rank", shortForm: "SRC Rank", description: "Serves SRC/GUSSS.", url: "SRC Hostel UCC" },
  //  { id: "T6", fullName: "Amamoma Junction", shortForm: "Amamoma Jxn", description: "Entry to Gaza.", url: "Amamoma Junction" },
  //  { id: "T7", fullName: "Apewosika Junction", shortForm: "Apewosika Jxn", description: "Entry to Apewosika.", url: "Apewosika Junction" },
  //  { id: "T8", fullName: "Pedu Junction", shortForm: "Pedu", description: "Major town junction.", url: "Pedu Junction Cape Coast" },
  //  { id: "T9", fullName: "Aboom Station", shortForm: "Aboom", description: "Town transport hub.", url: "Aboom Road Cape Coast" },

    // --- SOCIAL & STUDENT LIFE ---
    { id: "S1", fullName: "Science Market", shortForm: "Sci Market", description: "Food, stationery, printing.", url: "5.1151540113856075, -1.2926691771448782" },
  //  { id: "S2", fullName: "Sammo Restaurant", shortForm: "Sammo", description: "Popular food joint.", url: "Sammo Kitchen UCC" },
  //  { id: "S3", fullName: "Felicia's Joint", shortForm: "Felicia's", description: "Food near Science.", url: "UCC Science Market" },
    { id: "S4", fullName: "Code Cafeteria", shortForm: "CC", description: "Large dining hall.", url: "College Of Distance Education (CoDE)" },

    { id: "S5", fullName: "UCC Sports Stadium", shortForm: "Stadium", description: "Main sports field.", url: "UCC Sports Stadium" },
  //  { id: "S6", fullName: "Koobi Joint", shortForm: "Koobi", description: "Popular food area.", url: "UCC Campus" },
  //  { id: "S7", fullName: "Brunei Spot", shortForm: "Brunei", description: "Student hangout.", url: "UCC Campus" },
  //  { id: "S8", fullName: "Campus Bookshop", shortForm: "Bookshop", description: "Textbooks and stationery.", url: "UCC Bookshop" },
    { id: "S9", fullName: "ICT Centre", shortForm: "ICT", description: "Computer labs and WiFi.", url: "5.116756925648479, -1.2910383941153674" },
  //  { id: "S10", fullName: "Reading Pavilion", shortForm: "Pavilion", description: "Behind Sam Jonah Library.", url: "Sam Jonah Library" },
    { id: "S11", fullName: "UCC FM", shortForm: "Radio", description: "Campus radio station.", url: "Campus Broadcasting Services (CBS)" },

    // --- LANDMARKS ---
  //  { id: "LM1", fullName: "Science Roundabout", shortForm: "Sci R-About", description: "Central New Site junction.", url: "UCC Science Block" },
  //  { id: "LM2", fullName: "Nkrumah Roundabout", shortForm: "KNH R-About", description: "Near Kwame Nkrumah Hall.", url: "Kwame Nkrumah Hall UCC" },
  //  { id: "LM3", fullName: "ATL Junction", shortForm: "ATL Jxn", description: "Junction to Old Site.", url: "Atlantic Hall UCC" },
  //  { id: "LM4", fullName: "Oguaa Roundabout", shortForm: "Oguaa R-About", description: "Old Site entrance.", url: "Oguaa Hall" },
  //  { id: "LM5", fullName: "Cape Coast Teaching Hospital", shortForm: "CCTH", description: "Regional hospital (Interbeton).", url: "Cape Coast Teaching Hospital" }
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
