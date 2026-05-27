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
               <AcronymTile code="CHLS" site="Science" onClick={() => handleAcronymClick("CHLS")} />
               <AcronymTile code="CoE" site="Science" onClick={() => handleAcronymClick("CoE")} />
               <AcronymTile code="SMS" site="Science" onClick={() => handleAcronymClick("SMS")} />
               <AcronymTile code="SoB" site="Science" onClick={() => handleAcronymClick("SoB")} />
               <AcronymTile code="LLT" site="Science" onClick={() => handleAcronymClick("LLT")} />
               <AcronymTile code="NEC" site="Science" onClick={() => handleAcronymClick("NEC")} />
               <AcronymTile code="SWLT" site="Science" onClick={() => handleAcronymClick("SWLT")} />
               <AcronymTile code="SJL" site="Science" onClick={() => handleAcronymClick("SAMIS")} />
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
    { id: "A1", fullName: "College of Agriculture & Natural Sciences (CANS)", shortForm: "CANS", description: "Main Science enclave.", url: "5.11676, -1.29323" },
    { id: "A2", fullName: "Lecture Theatre", shortForm: "LT", description: "Major lecture hall in Science block.", url: "5.11676647092683, -1.293229663589804" },
    { id: "A5", fullName: "Old Site Lecture Block", shortForm: "Old Block", description: "Traditional lecture rooms at Old Site.", url: "5.105792124369729, -1.2864329899523184" },
    { id: "A6", fullName: "New Science Annex", shortForm: "New Block", description: "Near the Science Market.", url: "5.115151427780214, -1.2942234432853927" },
    { id: "A8", fullName: "New Examination Center", shortForm: "NEC", description: "New Site, used for exams and large classes.", url: "5.120774879623484, -1.2937249323395927" },
    { id: "A9", fullName: "CHLS Block", shortForm: "CHLS", description: "College of Humanities & Legal Studies.", url: "5.1172, -1.2915" },
    { id: "A10", fullName: "School of Medical Sciences", shortForm: "SMS", description: "Medical School Auditorium & Labs.", url: "5.1189, -1.2938" },
    { id: "A11", fullName: "School of Allied Sciences", shortForm: "SAS", description: "Near SMS Block.", url: "5.11999958165719, -1.2938150002848474" },
    { id: "A13", fullName: "School of Business", shortForm: "SoB", description: "New Site, near Library.", url: "5.1170, -1.2890" },
    { id: "A18", fullName: "School of Graduate Studies", shortForm: "PGS", description: "Old Site.", url: "5.1055, -1.2865" },
    { id: "A20", fullName: "Computer Science Department", shortForm: "CS", description: "Science Block.", url: "5.11604897232864, -1.2938718155845037" },
    { id: "A21", fullName: "Faculty of Law", shortForm: "Law", description: "New Site.", url: "5.1175453569657625, -1.2929534136352714" },
    { id: "A22", fullName: "School of Nursing", shortForm: "Nursing", description: "Inside the CANS building.", url: "5.116297423955384, -1.2935723263496335" },
    { id: "CoE", fullName: "College of Education Studies", shortForm: "CoE", description: "Faculty of Education.", url: "5.1180, -1.2958" },
    { id: "LLT", fullName: "Large Lecture Theatre", shortForm: "LLT", description: "Large lecture hall.", url: "5.1165, -1.2940" },
    { id: "SWLT", fullName: "Sandwich Lecture Theatre", shortForm: "SWLT", description: "Sandwich lecture block.", url: "5.1160, -1.2935" },
    { id: "CoDE", fullName: "College of Distance Education", shortForm: "CoDE", description: "Distance education block.", url: "5.1200, -1.2945" },
    { id: "L1", fullName: "Sam Jonah Library", shortForm: "SAMIS", description: "The central university library.", url: "5.11649, -1.29091" },
    { id: "L3", fullName: "Education Library", shortForm: "Edu Lib", description: "Old Site.", url: "5.118007196038291, -1.2958476907008707" },
    { id: "L4", fullName: "Medical School Library", shortForm: "Med Lib", description: "Inside SMS Block.", url: "5.1203041333693395, -1.2938793731567169" },
    { id: "AD1", fullName: "Administration Block", shortForm: "Main Admin", description: "VC Office, Registrar. Old Site.", url: "5.1054, -1.2868" },
    { id: "AD2", fullName: "Academic Affairs", shortForm: "Academic", description: "Transcripts and Records.", url: "5.1055, -1.2868" },
    { id: "H1", fullName: "Casely Hayford Hall", shortForm: "Casford", description: "Male Hall (New Site).", url: "5.1192, -1.2891" },
    { id: "H2", fullName: "Atlantic Hall", shortForm: "ATL", description: "Mixed Hall (Old Site).", url: "5.1069, -1.2872" },
    { id: "H3", fullName: "Kwame Nkrumah Hall", shortForm: "KNH", description: "Mixed Hall (New Site).", url: "5.1195, -1.2895" },
    { id: "H4", fullName: "Oguaa Hall", shortForm: "Premier", description: "Mixed Hall (Old Site).", url: "5.1075, -1.2865" },
    { id: "H5", fullName: "Adehye Hall", shortForm: "Royals", description: "Female Hall (Old Site).", url: "5.1085, -1.2861" },
    { id: "H6", fullName: "Valco Trust Hall", shortForm: "Valco", description: "Mixed Hall (New Site).", url: "5.1215, -1.2915" },
    { id: "H7", fullName: "SRC Hall", shortForm: "SRC", description: "Modern Hall (New Site).", url: "5.1245, -1.2910" },
    { id: "HF1", fullName: "UCC Hospital", shortForm: "Hospital", description: "Main healthcare facility.", url: "5.1105, -1.2885" },
    { id: "S1", fullName: "Science Market", shortForm: "Sci Market", description: "Food, stationery, printing.", url: "5.1151540113856075, -1.2926691771448782" }
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
