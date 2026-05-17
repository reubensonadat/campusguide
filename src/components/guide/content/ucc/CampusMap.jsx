import React from 'react';
import { MapPin, Search, Compass, Map, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Landmark } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const CampusMap = () => {
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

  const sections = [
    {
      title: "Campus Navigation",
      summary: "The Ultimate Guide to UCC Acronyms, Landmarks, and Transport.",
      
      checklist: [
        { text: "Located my Faculty Block", checked: false },
        { text: "Found the nearest Shuttle Station", checked: false },
        { text: "Visited the University Hospital", checked: false },
        { text: "Located Sam Jonah Library", checked: false },
        { text: "Saved Campus Security Number", checked: false }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="The Defintive Campus Guide"
            icon={Compass}
            content="Welcome to the master navigation guide. Whether you are looking for <strong>'Science Market'</strong>, <strong>'CALC'</strong>, or the <strong>'Ceremonial grounds'</strong>, this map has every acronym and local name you need to survive."
          />

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-6 flex items-center gap-2">
               <Map size={24} className="text-indigo-600" /> Acronym Decoder
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               <AcronymTile code="CANS" site="Science" onClick={() => openGoogleMaps("CANS UCC")} />
               <AcronymTile code="CHLS" site="Science" onClick={() => openGoogleMaps("CHLS UCC")} />
               <AcronymTile code="CoE" site="Science" onClick={() => openGoogleMaps("CoE UCC")} />
               <AcronymTile code="SMS" site="Science" onClick={() => openGoogleMaps("School of Medical Sciences UCC")} />
               <AcronymTile code="SoB" site="Science" onClick={() => openGoogleMaps("School of Business UCC")} />
               <AcronymTile code="LLT" site="Science" onClick={() => openGoogleMaps("Large Lecture Theatre UCC")} />
               <AcronymTile code="NEC" site="Science" onClick={() => openGoogleMaps("New Examination Center UCC")} />
               <AcronymTile code="SWLT" site="Science" onClick={() => openGoogleMaps("Sandwich lecture Theatre UCC")} />
               <AcronymTile code="SJL" site="Science" onClick={() => openGoogleMaps("Sam Jonah Library UCC")} />
               <AcronymTile code="CoDE" site="Science" onClick={() => openGoogleMaps("CoDE UCC")} />
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
    { id: "A1", fullName: "College of Agriculture & Natural Sciences (CANS)", shortForm: "CANS", description: "Main Science enclave.", url: "College of Agriculture & Natural Sciences UCC" },
    { id: "A2", fullName: "Lecture Theatre", shortForm: "LT", description: "Major lecture hall in Science block.", url: "5.11676647092683, -1.293229663589804" },
    { id: "A5", fullName: "Old Site Lecture Block", shortForm: "Old Block", description: "Traditional lecture rooms at Old Site.", url: "5.105792124369729, -1.2864329899523184" },
    { id: "A6", fullName: "New Science Annex", shortForm: "New Block", description: "Near the Science Market.", url: "5.115151427780214, -1.2942234432853927" },
    { id: "A8", fullName: "New Examination Center", shortForm: "NEC", description: "New Site, used for exams and large classes.", url: "5.120774879623484, -1.2937249323395927" },
    { id: "A9", fullName: "CHLS Block", shortForm: "CHLS", description: "College of Humanities & Legal Studies.", url: "College of Humanities and Legal Studies UCC" },
    { id: "A10", fullName: "School of Medical Sciences", shortForm: "SMS", description: "Medical School Auditorium & Labs.", url: "School of Medical Sciences UCC" },
    { id: "A11", fullName: "School of Allied Sciences", shortForm: "SAS", description: "Near SMS Block.", url: "5.11999958165719, -1.2938150002848474" },
    { id: "A13", fullName: "School of Business", shortForm: "SoB", description: "New Site, near Library.", url: "School of Business UCC" },
    { id: "A18", fullName: "School of Graduate Studies", shortForm: "PGS", description: "Old Site.", url: "School of Graduate Studies UCC" },
    { id: "A20", fullName: "Computer Science Department", shortForm: "CS", description: "Science Block.", url: "5.11604897232864, -1.2938718155845037" },
    { id: "A21", fullName: "Faculty of Law", shortForm: "Law", description: "New Site.", url: "5.1175453569657625, -1.2929534136352714" },
    { id: "A22", fullName: "School of Nursing", shortForm: "Nursing", description: "Inside the CANS building.", url: "5.116297423955384, -1.2935723263496335" },
    { id: "L1", fullName: "Sam Jonah Library", shortForm: "SAMIS", description: "The central university library.", url: "Sam Jonah Library" },
    { id: "L3", fullName: "Education Library", shortForm: "Edu Lib", description: "Old Site.", url: "5.118007196038291, -1.2958476907008707" },
    { id: "L4", fullName: "Medical School Library", shortForm: "Med Lib", description: "Inside SMS Block.", url: "5.1203041333693395, -1.2938793731567169" },
    { id: "AD1", fullName: "Administration Block", shortForm: "Main Admin", description: "VC Office, Registrar. Old Site.", url: "University of Cape Coast Central Administration" },
    { id: "AD2", fullName: "Academic Affairs", shortForm: "Academic", description: "Transcripts and Records.", url: "Directorate of Academic Affairs UCC" },
    { id: "H1", fullName: "Casely Hayford Hall", shortForm: "Casford", description: "Male Hall (New Site).", url: "Casely Hayford Hall" },
    { id: "H2", fullName: "Atlantic Hall", shortForm: "ATL", description: "Mixed Hall (Old Site).", url: "Atlantic Hall UCC" },
    { id: "H3", fullName: "Kwame Nkrumah Hall", shortForm: "KNH", description: "Mixed Hall (New Site).", url: "Kwame Nkrumah Hall UCC" },
    { id: "H4", fullName: "Oguaa Hall", shortForm: "Premier", description: "Mixed Hall (Old Site).", url: "Oguaa Hall" },
    { id: "H5", fullName: "Adehye Hall", shortForm: "Royals", description: "Female Hall (Old Site).", url: "Adehye Hall" },
    { id: "H6", fullName: "Valco Trust Hall", shortForm: "Valco", description: "Mixed Hall (New Site).", url: "Valco Hall UCC" },
    { id: "H7", fullName: "SRC Hall", shortForm: "SRC", description: "Modern Hall (New Site).", url: "SRC Hall UCC" },
    { id: "HF1", fullName: "UCC Hospital", shortForm: "Hospital", description: "Main healthcare facility.", url: "University of Cape Coast Hospital" },
    { id: "S1", fullName: "Science Market", shortForm: "Sci Market", description: "Food, stationery, printing.", url: "5.1151540113856075, -1.2926691771448782" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'resources', label: 'Directions' },
  ];

  const getCoordinates = (url) => {
    if (!url) return null;
    const coordMatch = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.exec(url);
    if (coordMatch) {
      return [parseFloat(coordMatch[1]), parseFloat(coordMatch[3])];
    }
    return null;
  };

  const defaultCenter = [5.11676647092683, -1.293229663589804];

  return { sections, buildings, openGoogleMaps, tabs, getCoordinates, defaultCenter };
};

const AcronymTile = ({ code, site, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-center group"
  >
     <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{site}</div>
     <div className="text-sm font-black text-slate-900 group-hover:text-indigo-600">{code}</div>
  </button>
);

export default CampusMap;
