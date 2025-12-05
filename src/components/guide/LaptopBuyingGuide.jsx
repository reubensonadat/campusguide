import { Laptop, CheckCircle, AlertTriangle, CreditCard, Info, Download, Sparkles, Shield, Clock, Zap, Package, TrendingUp, DollarSign, Cpu, HardDrive, Wifi, Battery, ExternalLink } from 'lucide-react';

const LaptopBuyingGuide = () => {
  // UCC GUIDE: LAPTOP BUYING GUIDE (PLATINUM EDITION 2025)
  // DATA SOURCE: UCC IT Department Requirements, Student Feedback, Market Research
  // UPGRADES: Rich UI components, detailed specifications, and student-focused recommendations

  const sections = [
    {
      title: "Your Academic Powerhouse",
      summary: "Choosing the perfect laptop for your UCC journey.",
      
      // --- OVERVIEW CONTENT (RICH UI) ---
      content: (
        <div className="space-y-12 font-sans">
          {/* --- HERO SECTION WITH GLASSMORPHISM --- */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-10 shadow-2xl">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-60 h-60 bg-purple-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-blue-200">
                  <Sparkles size={12} /> Academic Excellence
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Your Digital <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Academic Companion</span>
                </h2>
                <p className="text-blue-100/90 text-lg leading-relaxed">
                  A reliable laptop is not just a tool—it's your gateway to academic success at UCC.
                  Make an informed choice that will serve you throughout your program.
                </p>
              </div>
              
              {/* Mock Laptop Spec Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl min-w-[200px] text-center shadow-lg transform hover:scale-105 transition-transform">
                <Laptop size={40} className="mx-auto mb-3 text-blue-200" />
                <p className="text-blue-200 text-xs uppercase tracking-widest mb-1">Minimum Spec</p>
                <div className="text-2xl font-bold text-white mb-1">8GB RAM</div>
                <div className="text-sm font-medium text-blue-100">256GB SSD</div>
                <div className="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* --- SPECIAL OFFER BANNER --- */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-indigo-900 mb-2 flex items-center">
                  <Sparkles size={20} className="mr-2 text-indigo-600" />
                  Special Offer for UCC Students
                </h3>
                <p className="text-indigo-700">
                  Get exclusive discounts on recommended laptops through our partner store. 
                  All devices are pre-configured with essential academic software.
                </p>
              </div>
              <a 
                href="https://www.laptopconnect.shop/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg transform hover:scale-105"
              >
                Visit LaptopConnect
                <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          </div>

          {/* --- IMMEDIATE CONSIDERATIONS (Split Layout) --- */}
          <div>
            <SectionHeader icon={<Cpu size={20} />} title="Core Specifications" />
            <div className="grid md:grid-cols-2 gap-6">
              <SpecCard 
                icon={<HardDrive size={24} />}
                title="Storage"
                theme="blue"
                desc="Speed matters for your academic work."
                details={[
                  "Minimum: 256GB SSD",
                  "Recommended: 512GB SSD",
                  "Avoid: Traditional HDD (too slow)",
                  "Cloud storage is not enough"
                ]}
              />
              <SpecCard 
                icon={<Zap size={24} />}
                title="Performance"
                theme="purple"
                desc="The engine behind your productivity."
                details={[
                  "Minimum: 8GB RAM",
                  "Recommended: 16GB RAM",
                  "Processor: Intel i5/AMD Ryzen 5 or higher",
                  "Integrated graphics are sufficient for most programs"
                ]}
              />
            </div>
          </div>

          {/* --- THE "PERFECT MATCH" (Department-Specific Requirements) --- */}
          <div>
             <SectionHeader icon={<Package size={20} />} title="Department-Specific Recommendations" />
             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
               <p className="text-gray-600 mb-6 text-sm">
                 Different programs have different needs. Here's what we recommend for your specific field of study.
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {/* Business & Social Sciences */}
                  <div>
                    <h5 className="font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 flex items-center">
                      <TrendingUp size={16} className="text-blue-500 mr-2" /> Business & Social Sciences
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• <strong>Focus:</strong> Portability & Battery Life</li>
                      <li>• <strong>Minimum:</strong> 8GB RAM, 256GB SSD</li>
                      <li>• <strong>Screen:</strong> 13-14" for portability</li>
                      <li>• <strong>Battery:</strong> 8+ hours ideal</li>
                      <li>• <strong>OS:</strong> Windows or macOS</li>
                    </ul>
                  </div>
                  
                  {/* Science & Engineering */}
                  <div>
                    <h5 className="font-bold text-gray-800 border-b-2 border-green-500 pb-2 mb-3 flex items-center">
                      <Cpu size={16} className="text-green-500 mr-2" /> Science & Engineering
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• <strong>Focus:</strong> Processing Power & Graphics</li>
                      <li>• <strong>Minimum:</strong> 16GB RAM, 512GB SSD</li>
                      <li>• <strong>Graphics:</strong> Dedicated GPU recommended</li>
                      <li>• <strong>Screen:</strong> 15" or larger</li>
                      <li>• <strong>OS:</strong> Windows (for compatibility)</li>
                    </ul>
                  </div>

                  {/* Arts & Humanities */}
                  <div>
                    <h5 className="font-bold text-gray-800 border-b-2 border-purple-500 pb-2 mb-3 flex items-center">
                      <Sparkles size={16} className="text-purple-500 mr-2" /> Arts & Humanities
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• <strong>Focus:</strong> Display Quality & Storage</li>
                      <li>• <strong>Minimum:</strong> 8GB RAM, 256GB SSD</li>
                      <li>• <strong>Display:</strong> Full HD (1920x1080)</li>
                      <li>• <strong>Keyboard:</strong> Comfortable for long typing</li>
                      <li>• <strong>OS:</strong> Windows or macOS</li>
                    </ul>
                  </div>
               </div>
             </div>
          </div>

          {/* --- BUDGET CONSIDERATIONS --- */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <h4 className="text-green-900 font-bold text-lg mb-3 flex items-center">
                <DollarSign size={20} className="mr-2" /> Budget-Friendly Options
              </h4>
              <p className="text-sm text-green-800/80 mb-4 leading-relaxed">
                Quality doesn't have to break the bank. Consider certified refurbished laptops from authorized dealers.
                These offer significant savings while maintaining performance and warranty.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white/60 text-green-700 text-xs rounded font-bold border border-green-200">Dell Latitude</span>
                <span className="px-2 py-1 bg-white/60 text-green-700 text-xs rounded font-bold border border-green-200">HP ProBook</span>
                <span className="px-2 py-1 bg-white/60 text-green-700 text-xs rounded font-bold border border-green-200">Lenovo ThinkPad</span>
              </div>
            </div>

             <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h4 className="text-amber-900 font-bold text-lg mb-3 flex items-center">
                <Shield size={20} className="mr-2" /> Warranty & Support
              </h4>
              <p className="text-sm text-amber-800/80 mb-4 leading-relaxed">
                A 3-year warranty is recommended for the duration of your program.
                Check if the manufacturer has an authorized service center in Cape Coast for quick repairs.
              </p>
              <div className="flex items-center text-amber-700 text-xs font-bold">
                <Info size={14} className="mr-1" />
                UCC IT Center offers basic diagnostic services
              </div>
            </div>
          </div>

          {/* --- STUDENT DISCOUNTS TIMELINE --- */}
          <div>
            <SectionHeader icon={<CreditCard size={20} />} title="Student Discounts & Offers" />
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                <DiscountOffer brand="Apple" desc="Education pricing with student ID verification." discount="Up to 10% off" />
                <DiscountOffer brand="Dell" desc="UCC partnership program." discount="Special student pricing" />
                <DiscountOffer brand="Microsoft" desc="Windows 10/11 Education free with student email." discount="Free OS + Software" />
                <DiscountOffer brand="HP" desc="Back-to-school promotions." discount="Up to 15% off" />
              </div>
            </div>
          </div>

        </div>
      ),

      // --- STEPS TAB DATA ---
      steps: [
        {
          title: "Check Department Requirements",
          description: "Some departments have specific software requirements that may need higher specifications. Check with your department before purchasing."
        },
        {
          title: "Set Your Budget",
          description: "Determine how much you can afford. Remember to account for accessories like a protective case, external mouse, and extended warranty."
        },
        {
          title: "Research Options",
          description: "Compare specifications, prices, and reviews from multiple sources. Consider both new and certified refurbished options."
        },
        {
          title: "Verify Student Discounts",
          description: "Check for available student discounts from manufacturers and authorized dealers. Use your UCC student email for verification."
        },
        {
          title: "Check Warranty & Support",
          description: "Ensure the laptop comes with at least a 1-year warranty. Verify if there's an authorized service center in Cape Coast."
        },
        {
          title: "Test Before Buying",
          description: "If possible, test the keyboard, trackpad, and screen before purchasing. Check for comfort and usability."
        }
      ],

      // --- WARNINGS TAB DATA ---
      commonMistakes: [
        "Buying a laptop with insufficient RAM (4GB is not enough for modern applications)",
        "Choosing a model with poor battery life (you'll spend time searching for outlets on campus)",
        "Ignoring keyboard and trackpad quality (you'll be typing a lot)",
        "Buying from unauthorized dealers (warranty may not be honored)",
        "Not checking if required software is compatible with your chosen operating system"
      ],
      consequences: "A poorly chosen laptop can hinder your academic performance, cause frustration during assignments, and may require costly upgrades or replacement.",

      // --- CHECKLIST TAB DATA ---
      checklist: [
        { text: "Checked department-specific requirements", checked: false },
        { text: "Set realistic budget", checked: false },
        { text: "Researched at least 3 options", checked: false },
        { text: "Verified student discounts", checked: false },
        { text: "Confirmed warranty coverage", checked: false },
        { text: "Tested keyboard and trackpad", checked: false },
        { text: "Checked battery life claims", checked: false },
        { text: "Verified software compatibility", checked: false }
      ],

      // --- RESOURCES TAB DATA ---
      resources: [
        {
          title: "LaptopConnect.shop",
          description: "Special discounts for UCC students",
          url: "https://www.laptopconnect.shop/"
        },
        {
          title: "Recommended Specifications",
          description: "Detailed requirements by department",
          url: "https://www.laptopconnect.shop/"
        },
        {
          title: "Student Discounts Guide",
          description: "Available discounts from various brands",
          url: "https://www.laptopconnect.shop/"
        }
      ]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Guide' },
    { id: 'resources', label: 'Resources' },
    { id: 'warnings', label: 'Common Mistakes' },
    { id: 'checklist', label: 'Checklist' }
  ];

  return { sections, tabs };
};

// --- INTERNAL HELPER COMPONENTS FOR PREMIUM STYLING ---

const SectionHeader = ({ icon, title }) => (
  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center border-b border-gray-100 pb-2">
    <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mr-3 shadow-sm border border-indigo-100">
      {icon}
    </span>
    {title}
  </h3>
);

const SpecCard = ({ icon, title, details, theme, desc }) => {
  const isBlue = theme === 'blue';
  const bgClass = isBlue ? 'bg-blue-50' : 'bg-purple-50';
  const borderClass = isBlue ? 'border-blue-100' : 'border-purple-100';
  const textMain = isBlue ? 'text-blue-900' : 'text-purple-900';
  const badgeBg = isBlue ? 'bg-blue-200' : 'bg-purple-200';
  const badgeText = isBlue ? 'text-blue-800' : 'text-purple-800';
  const tickColor = isBlue ? 'text-blue-600' : 'text-purple-600';

  return (
    <div className={`${bgClass} p-6 rounded-2xl border ${borderClass} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full`}>
      <div className="flex items-center mb-3">
        <div className={`${badgeBg} ${badgeText} p-2 rounded-lg mr-3 shadow-sm`}>
          {icon}
        </div>
        <h4 className={`font-bold text-xl ${textMain}`}>{title}</h4>
      </div>
      <p className={`text-sm ${textMain} opacity-80 mb-4 italic`}>{desc}</p>
      <ul className="space-y-3 mt-auto">
        {details.map((item, idx) => (
          <li key={idx} className={`flex items-start text-sm ${textMain} font-medium`}>
            <CheckCircle size={16} className={`${tickColor} mt-0.5 mr-2 flex-shrink-0`} />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const DiscountOffer = ({ brand, desc, discount }) => (
  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
    {/* Icon/Dot */}
    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
      <CreditCard size={18} />
    </div>
    
    {/* Content Card */}
    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 relative">
      <div className="absolute top-4 right-4 opacity-10 text-indigo-600">
         <DollarSign size={40} />
      </div>
      <div className="flex flex-col mb-1">
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-xl">{brand}</span>
        <span className="text-xs font-bold text-green-600 uppercase tracking-widest">{discount}</span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default LaptopBuyingGuide;