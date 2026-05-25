const fs = require('fs');

const content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// The mobile layout starts at `<div className="lg:hidden">` and ends at `{/* end mobile floating cards */}`
const startTag = '<div className="lg:hidden">';
const endTag = '{/* end MOBILE */}';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag) + endTag.length;

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find the mobile layout section.");
  process.exit(1);
}

const beforeMobile = content.slice(0, startIndex);
const afterMobile = content.slice(endIndex);

const newMobileSection = `      <div className="lg:hidden">

        {/* ── Chime-Style Hero ────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#001a26] to-[#002F45] px-6 pt-12 pb-[4.5rem] rounded-b-[40px] shadow-sm">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <CustomGuide size={18} className="text-white" />
              </div>
              <span className="text-white font-bold tracking-widest text-xs uppercase opacity-90">Campus Guide</span>
            </div>
            
            {profile.avatarUrl ? (
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg overflow-hidden cursor-pointer active:scale-95 transition-transform bg-white/10 p-0.5"
              >
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full bg-white" />
              </button>
            ) : (
              <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white">
                <Settings size={18} />
              </button>
            )}
          </div>

          {/* Hero Greeting Text (Like "Available Balance") */}
          <div className="relative z-10">
            <h2 className="text-white text-[2.2rem] font-black leading-tight tracking-tight mb-2">
              {getGreeting()}<br />
              {profile.name ? profile.name.split(' ')[0] : 'Student'}
            </h2>
            <p className="text-[#6EABC6] text-sm font-semibold flex items-center gap-1 cursor-pointer active:opacity-70 transition-opacity">
              {TODAY_LABEL} <ChevronRight size={14} />
            </p>
          </div>
        </div>

        {/* ── Overlapping Content & Body ──────────────────────────────── */}
        <div className="px-5 -mt-12 relative z-20 space-y-6 pb-6">

          {/* 1. Overlapping Floating Card (Today's Classes / Primary Info) */}
          <div className="bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 min-h-[140px] border border-gray-100 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-black text-gray-900 tracking-tight">Today's Classes</span>
              <button onClick={() => navigate('/tools')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
                View all <ChevronRight size={13} />
              </button>
            </div>

            {todaysClasses.length === 0 ? (
              <div className="flex items-center gap-4 py-2">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎉</span>
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-900">No classes today!</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">Enjoy your free time.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {todaysClasses.slice(0, 2).map((cls, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#002F45]/5 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-[#002F45]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {cls.courseName || cls.name || 'Class'}
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {cls.startTime && cls.endTime ? \`\${cls.startTime} – \${cls.endTime}\` : cls.startTime || ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Promotional Banner (Chime-style light teal box) */}
          <div 
            onClick={() => actions?.setShowSupportModal(true)}
            className="bg-[#DFF1EB] rounded-2xl p-5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex-1 pr-4">
              <h3 className="text-[#002F45] text-[15px] font-bold leading-snug mb-1">
                Welcome to Campus Guide!
              </h3>
              <p className="text-[#002F45]/70 text-[13px] font-medium mb-3">
                Support the project to keep the app free and growing.
              </p>
              <div className="text-[#002F45] text-[13px] font-bold flex items-center gap-1">
                Support now <ChevronRight size={14} />
              </div>
            </div>
            <div className="w-16 h-16 rounded-[20px] bg-[#002F45] flex items-center justify-center shadow-lg flex-shrink-0 transform rotate-3">
              <Heart size={28} className="text-white fill-white" />
            </div>
          </div>

          {/* 3. Campus Tools Grid (Chime's Financial Tools style) */}
          <div className="pt-2">
            <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">Campus tools</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                const isAffiliate = action.isAffiliate;
                return (
                  <button
                    key={i}
                    onClick={action.action}
                    className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <Icon size={18} className={isAffiliate ? 'text-orange-500' : 'text-[#002F45]'} />
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 leading-tight">
                      {action.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Announcements / Featured Content */}
          {featuredContent && (() => {
            const isAd = featuredContent.kind === 'ad';
            const d = featuredContent.data;
            const imgSrc = isAd ? d.image_url : d.flyer_url;

            return (
              <div className="pt-4">
                <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">Announcements</h3>
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  {imgSrc && (
                    <img src={imgSrc} alt={d.title} className="w-full h-auto max-h-[300px] object-cover" />
                  )}
                  <div className="p-5">
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xl mb-2 text-[#002F45] bg-[#002F45]/10">
                      {isAd ? 'SPONSORED' : 'OFFICIAL'}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{d.title}</h4>
                    <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-3">
                      {d.description || d.content}
                    </p>
                    <button className="text-[13px] font-bold text-[#002F45] flex items-center gap-1">
                      Read more <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </div>
      {/* end MOBILE */}`;

// Also make sure Heart icon is imported
const importHeart = "import { Heart,";
let patchedContent = beforeMobile + newMobileSection + afterMobile;
if (!patchedContent.includes('Heart')) {
  patchedContent = patchedContent.replace('import { ArrowRight', importHeart + ' ArrowRight');
}

fs.writeFileSync('src/pages/Home.jsx', patchedContent);
console.log('Home.jsx patched successfully!');
