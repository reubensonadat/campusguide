import React from 'react';
import { Utensils, MapPin, Search, CreditCard, CheckCircle, Info, ShieldAlert, History, Users, ArrowRight, Wallet } from 'lucide-react';
import { ActionCard, InfoBlock } from '../../GuideStyles';

const FoodDining = () => {
  // UCC GUIDE: FOOD & DINING (RESTORED GOLD EDITION 2025)

  const openGoogleMaps = (term) => {
    const query = term.includes("Cape Coast") ? term : `${term} UCC`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  const sections = [
    {
      title: "Campus Culinary Guide",
      summary: "From Bush Canteen to Sammo – Navigate the best food spots on campus.",
      
      tips: [
        "Bush Canteen is the cheapest for 'heavy' food (Fufu/Banku).",
        "Buying food at the Hall Porters' Lodge is often more expensive.",
        "Science Market prices drop slightly in the evening.",
        "Sammo packs usually include a drink (good value)."
      ],
      checklist: [
        { text: "Located Bush Canteen", checked: false },
        { text: "Tried Waakye at Science Market", checked: false },
        { text: "Found a late-night Indomie spot", checked: false },
        { text: "Checked cash/MoMo balance before ordering", checked: false }
      ],
      resources: [
        { title: "Bush Canteen", description: "The HQ for local food (Fufu, Banku). Behind Main Library.", url: "https://maps.google.com/?q=Bush+Canteen+UCC" },
        { title: "Science Market", description: "Central food hub at New Site. Fried Yam, Rice, Snacks.", url: "https://maps.google.com/?q=Science+Market+UCC" },
        { title: "Sammo Kitchen", description: "Premium Fried Rice & Chicken. Near Science Block.", url: "https://maps.google.com/?q=Sammo+Kitchen+UCC" },
        { title: "Deep Dish (Oguaa)", description: "Located inside Oguaa Hall. Good Jollof.", url: "https://maps.google.com/?q=Oguaa+Hall+UCC" },
        { title: "Superannuation Canteen", description: "Quiet, hygienic canteen near the Hospital.", url: "https://maps.google.com/?q=Superannuation+Hostel+UCC" },
        { title: "VOTEC Restaurant", description: "Old Site. Student-managed with affordable prices.", url: "https://maps.google.com/?q=VOTEC+UCC" },
        { title: "Felicia's Joint", description: "Popular Waakye spot near Sasakawa/Valco.", url: "https://maps.google.com/?q=Valco+Hall+UCC" },
        { title: "Picasso Food", description: "Fast food and Pizza near Casford Hall.", url: "https://maps.google.com/?q=Casely+Hayford+Hall" },
        { title: "Medical School Canteen", description: "Inside the SMS complex.", url: "https://maps.google.com/?q=School+of+Medical+Sciences+UCC" },
        { title: "Apewosika Night Market", description: "Street food behind Old Site (Indomie, Kenkey).", url: "https://maps.google.com/?q=Apewosika+UCC" }
      ],

      content: (
        <div className="space-y-12">
          <InfoBlock 
            title="Locate Your Next Meal"
            icon={Utensils}
            content="Hungry? Don't just read about it—<strong>click to find it</strong>. Whether you need the heavy 'mpu ne mpu' at <strong>Bush Canteen</strong> or a quick snack at <strong>Science Market</strong>, use the map to navigate."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <FoodTile name="Bush Canteen" type="Local" onClick={openGoogleMaps} />
            <FoodTile name="Deep Dish" type="Local" onClick={openGoogleMaps} />
            <FoodTile name="Sammo" type="Fast Food" onClick={openGoogleMaps} />
            <FoodTile name="Science Market" type="Hub" onClick={openGoogleMaps} />
            <FoodTile name="Felicia's" type="Waakye" onClick={openGoogleMaps} />
            <FoodTile name="Picasso" type="Pizza" onClick={openGoogleMaps} />
            <FoodTile name="Apewosika" type="Night" onClick={openGoogleMaps} />
            <FoodTile name="VOTEC" type="Restaurant" onClick={openGoogleMaps} />
            <FoodTile name="Superann" type="Canteen" onClick={openGoogleMaps} />
            <FoodTile name="SMS" type="Med School" onClick={openGoogleMaps} />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ActionCard 
               title="New Site (Science)" 
               desc="The central culinary hub for North campus."
               details={[
                 "<strong>Bush Canteen</strong>: Heavy local fufu/banku.",
                 "<strong>Science Market</strong>: Best waakye on campus.",
                 "<strong>Sammo Kitchen</strong>: Reliable fried rice.",
                 "<strong>Picasso</strong>: Late night pizza & shawarma."
               ]}
            />
            <ActionCard 
               title="Old Site & Diaspora" 
               desc="Dining options for South campus and Amamoma."
               details={[
                 "<strong>Deep Dish</strong>: In Oguaa hall (Continental).",
                 "<strong>VOTEC</strong>: Student-run, very affordable.",
                 "<strong>Apewosika</strong>: Indomie and street kenkey.",
                 "<strong>Superann</strong>: Near Hospital, very hygienic."
               ]}
            />
          </div>

          <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100 overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="relative">
                <h4 className="font-black text-amber-900 text-xl mb-4 flex items-center gap-2">
                   <Wallet size={24} /> Budget Dining Strategy
                </h4>
                <p className="text-amber-800/80 font-medium leading-relaxed mb-6">
                   Eating well at UCC doesn't have to be expensive. Use these student-vetted hacks to maximize your meal budget.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm">
                      <p className="text-sm font-black text-amber-900 mb-2 uppercase tracking-widest text-[10px]">The Heavy Hitter</p>
                      <p className="text-xs text-slate-600 font-medium">For the best 'price-to-fullness' ratio, visit <strong>Bush Canteen</strong> for Fufu or Banku. GH₵ 15-20 can fill a grown adult.</p>
                   </div>
                   <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm">
                      <p className="text-sm font-black text-amber-900 mb-2 uppercase tracking-widest text-[10px]">Night Cravings</p>
                      <p className="text-xs text-slate-600 font-medium">Apewosika Indomie joints are famous. Ask for <strong>'Double Egg'</strong> for a protein boost on a budget.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    }
  ];

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

const FoodTile = ({ name, type, onClick }) => (
  <button 
    onClick={() => onClick(name)}
    className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-center group"
  >
     <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{type}</div>
     <div className="text-sm font-black text-slate-900 group-hover:text-indigo-600">{name}</div>
  </button>
);

export default FoodDining;