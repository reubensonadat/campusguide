import React from 'react';

const FoodDining = () => {
  // UCC GUIDE: FOOD & DINING
  // FIX: Renamed data export to 'buildings' to prevent app crash.
  // RESTORED: Used 'resources' tab for the list of joints (Old Style) but with direct map links.
  
  const openGoogleMaps = (term) => {
    const query = term.includes("Cape Coast") ? term : `${term} UCC`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  const sections = [
    {
      title: "Campus Culinary Guide",
      summary: "From Bush Canteen to Sammo – Navigate the best food spots on campus.",
      
      // --- OVERVIEW CONTENT (The Pastel Layout You Liked) ---
      content: (
        <div className="space-y-8">
          {/* --- INTRO --- */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Hungry? Don't just read about it—<strong>click to find it</strong>. 
              Whether you need the heavy "mpu ne mpu" at <strong>Bush Canteen</strong> or a quick snack at <strong>Science Market</strong>, use this guide to navigate to the best spots.
            </p>
          </div>

          {/* --- INTERACTIVE FOOD MAP GRID --- */}
          <div className="pt-2">
            <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">📍</span>
              Tap to Locate (Google Maps)
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <FoodCard name="Bush Canteen" type="Local (Heavy)" desc="Fufu, Banku" onClick={openGoogleMaps} />
              <FoodCard name="Deep Dish" type="Local/Cont." desc="Jollof, Red Red" onClick={openGoogleMaps} />
              <FoodCard name="Superannuation" type="Canteen" desc="Quality Meals" onClick={openGoogleMaps} />
              <FoodCard name="VOTEC" type="Restaurant" desc="Student-run" onClick={openGoogleMaps} />
              
              <FoodCard name="Sammo Kitchen" type="Fast Food" desc="Fried Rice" onClick={openGoogleMaps} />
              <FoodCard name="Science Market" type="Hub" desc="Snacks, Waakye" onClick={openGoogleMaps} />
              <FoodCard name="Felicia's Joint" type="Waakye" desc="Sasakawa Road" onClick={openGoogleMaps} />
              <FoodCard name="Picasso" type="Pizza" desc="Near Casford" onClick={openGoogleMaps} />
              
              <FoodCard name="Apewosika Indomie" type="Night Food" desc="Open late" onClick={openGoogleMaps} />
            </div>
          </div>

          {/* --- ZONAL BREAKDOWN --- */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
              <h4 className="font-bold text-orange-900 mb-3">New Site (Science)</h4>
              <div className="flex flex-wrap gap-2">
                <Pill text="Bush Canteen" />
                <Pill text="Science Market" />
                <Pill text="Sammo" />
                <Pill text="Picasso" />
                <Pill text="Felicia's" />
              </div>
            </div>
            <div className="bg-green-50 p-5 rounded-xl border border-green-100">
              <h4 className="font-bold text-green-900 mb-3">Old Site & Diaspora</h4>
              <div className="flex flex-wrap gap-2">
                <Pill text="Deep Dish" />
                <Pill text="Superannuation" />
                <Pill text="VOTEC" />
                <Pill text="Apewosika" />
                <Pill text="Ayensu" />
              </div>
            </div>
          </div>
        </div>
      ),

      // --- RESOURCES TAB (The "Old One" - List of Links) ---
      resources: [
        {
          title: "Bush Canteen",
          description: "The HQ for local food (Fufu, Banku). Behind Main Library.",
          url: "https://maps.google.com/?q=Bush+Canteen+UCC"
        },
        {
          title: "Science Market",
          description: "Central food hub at New Site. Fried Yam, Rice, Snacks.",
          url: "https://maps.google.com/?q=Science+Market+UCC"
        },
        {
          title: "Sammo Kitchen",
          description: "Premium Fried Rice & Chicken. Near Science Block.",
          url: "https://maps.google.com/?q=Sammo+Kitchen+UCC"
        },
        {
          title: "Deep Dish (Oguaa)",
          description: "Located inside Oguaa Hall. Good Jollof and Plain Rice.",
          url: "https://maps.google.com/?q=Oguaa+Hall+UCC"
        },
        {
          title: "Superannuation Canteen",
          description: "Quiet, hygienic canteen near the Hospital.",
          url: "https://maps.google.com/?q=Superannuation+Hostel+UCC"
        },
        {
          title: "VOTEC Restaurant",
          description: "Old Site. Student-managed restaurant with affordable prices.",
          url: "https://maps.google.com/?q=VOTEC+UCC"
        },
        {
          title: "Felicia's Joint",
          description: "Popular Waakye spot near Sasakawa/Valco.",
          url: "https://maps.google.com/?q=Valco+Hall+UCC"
        },
        {
          title: "Picasso Food",
          description: "Fast food and Pizza near Casford Hall.",
          url: "https://maps.google.com/?q=Casely+Hayford+Hall"
        },
        {
          title: "Medical School Canteen",
          description: "Inside the SMS complex. Good for medical students.",
          url: "https://maps.google.com/?q=School+of+Medical+Sciences+UCC"
        },
        {
          title: "Sasakawa Restaurant",
          description: "Guest House restaurant. Serene environment.",
          url: "https://maps.google.com/?q=Sasakawa+Guest+House+UCC"
        },
        {
          title: "Apewosika Night Market",
          description: "Street food street behind Old Site (Indomie, Kenkey).",
          url: "https://maps.google.com/?q=Apewosika+UCC"
        },
        {
          title: "Amamoma Food Street",
          description: "Bustling street food area for diaspora students.",
          url: "https://maps.google.com/?q=Amamoma+UCC"
        }
      ],

      // --- BUDGET TIPS ---
      tips: [
        "Bush Canteen is the cheapest for 'heavy' food (Fufu/Banku).",
        "Buying food at the Hall Porters' Lodge is often more expensive than walking to the market.",
        "Science Market prices drop slightly in the evening when vendors want to finish selling.",
        "Sammo packs usually include a drink, making it good value for 'fancy' food."
      ],

      // --- CHECKLIST ---
      checklist: [
        { text: "Located Bush Canteen", checked: false },
        { text: "Tried Waakye at Science Market", checked: false },
        { text: "Found a late-night Indomie spot", checked: false },
        { text: "Checked cash/MoMo balance before ordering", checked: false }
      ]
    }
  ];

  // We also export this as 'buildings' to prevent crashes if the app looks for it
  const buildings = [
    { id: 1, fullName: "Bush Canteen", shortForm: "Bush", description: "Local Food", url: "Bush Canteen UCC" },
    { id: 2, fullName: "Science Market", shortForm: "Sci Mkt", description: "Snacks & Waakye", url: "Science Market UCC" },
    { id: 3, fullName: "Sammo Kitchen", shortForm: "Sammo", description: "Fried Rice", url: "Sammo Kitchen UCC" },
    { id: 4, fullName: "Deep Dish", shortForm: "Oguaa", description: "Continental", url: "Oguaa Hall UCC" },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'resources', label: 'Food Map' },
  ];

  return { sections, buildings, openGoogleMaps, tabs };
};

// Helper Components
const FoodCard = ({ name, type, desc, onClick }) => (
  <button 
    onClick={() => onClick(name)} 
    className="group text-left bg-white p-3 rounded-xl border border-orange-100 hover:border-orange-400 hover:shadow-md transition-all w-full h-full flex flex-col"
  >
    <div className="flex justify-between items-start w-full mb-1">
      <span className="text-sm font-bold text-gray-800 group-hover:text-orange-600">{name}</span>
      <span className="text-[9px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full whitespace-nowrap">
        {type}
      </span>
    </div>
    <div className="text-xs text-gray-500 leading-tight">{desc}</div>
  </button>
);

const Pill = ({ text }) => (
  <span className="text-[10px] font-semibold bg-white/60 px-2 py-1 rounded-lg border border-black/5 text-gray-700 whitespace-nowrap">
    {text}
  </span>
);

export default FoodDining;