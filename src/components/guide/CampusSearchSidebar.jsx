import React from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink, FileText, Phone, Globe, Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import { CustomGuide } from '../common/CustomIcons';

const CustomMapPin = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={className} fill="currentColor">
    <path d="M184,72a56,56,0,1,0-64,55.42V232a8,8,0,0,0,16,0V127.42A56.09,56.09,0,0,0,184,72Zm-56,40a40,40,0,1,1,40-40A40,40,0,0,1,128,112Z"></path>
  </svg>
);

const getGuideCardIcon = (icon) => {
  switch (icon) {
    case 'file-text': return FileText;
    case 'phone': return Phone;
    case 'globe': return Globe;
    case 'shield': return Shield;
    case 'alert-triangle': return AlertTriangle;
    case 'alert-circle': return AlertCircle;
    default: return CustomGuide;
  }
};

const CampusSearchSidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, sidebarView, setSidebarView, searchTerm, onSearchChange, filteredLocations, getCoordinates, onLocationSelect, filteredGuideCards, dbGuideCards, onCardSelect }) => {
  const cards = searchTerm ? filteredGuideCards : dbGuideCards;

  return (
    <div className={`
      absolute z-20 bg-white shadow-xl border border-slate-200/60 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col overflow-hidden
      lg:top-4 lg:left-4 lg:bottom-auto lg:rounded-2xl lg:w-96 lg:max-h-[calc(100vh-8rem)]
      bottom-[calc(84px_+_env(safe-area-inset-bottom,0px))] left-3 right-3 rounded-2xl
      ${isMobileMenuOpen ? 'top-20 lg:top-4' : 'h-auto lg:top-4 lg:h-auto'}
    `}>
      <div className="px-3 py-3 bg-white flex-shrink-0 relative border-b border-slate-100 flex items-center gap-2">
        <button onClick={() => setSidebarView(sidebarView === 'guide_cards' ? 'locations' : 'guide_cards')}
          className={`shrink-0 p-2 rounded-xl transition-all flex items-center gap-1.5 ${sidebarView === 'guide_cards' ? 'bg-primary-50 text-primary-700 border border-primary-200 shadow-sm' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
          title="Toggle Guide Cards">
          <CustomGuide size={16} /><span className="text-[11px] font-bold hidden sm:inline">Guide</span>
        </button>
        <div className="flex-1 relative min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={searchTerm} onChange={e => onSearchChange(e.target.value)}
            onFocus={() => window.innerWidth < 1024 && setIsMobileMenuOpen(true)}
            placeholder={sidebarView === 'guide_cards' ? 'Search guide cards...' : 'Search locations...'}
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium" />
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-primary-600 transition-colors lg:hidden bg-slate-50 border border-slate-200 shadow-sm">
          {isMobileMenuOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </button>
      </div>

      <div className={`overflow-y-auto custom-scrollbar bg-slate-50/50 flex-1 p-2 transition-all duration-300 ${!isMobileMenuOpen && window.innerWidth < 1024 ? 'opacity-0 h-0 hidden lg:block lg:h-auto lg:opacity-100' : 'opacity-100 block'}`}>
        <div className="space-y-1.5">
          {sidebarView === 'locations' && (
            <>
              {filteredLocations.map(loc => {
                const hasCoords = !!getCoordinates(loc.url);
                return (
                  <button key={loc.id} onClick={() => onLocationSelect(loc)}
                    className="w-full text-left bg-white p-3 hover:bg-primary-50/50 border border-slate-100 hover:border-primary-100 rounded-xl group transition-all flex justify-between items-center shadow-sm">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 group-hover:text-primary-700 text-sm">{loc.fullName}</span>
                        {loc.shortForm && <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-black uppercase text-slate-600">{loc.shortForm}</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{loc.description}</p>
                    </div>
                    <div className="text-slate-300 group-hover:text-primary-400 flex-shrink-0 ml-2 bg-slate-50 p-1.5 rounded-lg">
                      {hasCoords ? <CustomMapPin className="w-4 h-4" /> : <ExternalLink className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
              {filteredLocations.length === 0 && <p className="text-center text-slate-400 text-sm py-8 font-medium">No locations found.</p>}
            </>
          )}

          {sidebarView === 'guide_cards' && (
            <>
              {!cards || cards.length === 0 ? (
                <p className="text-center text-slate-400 text-sm py-8 font-medium">{searchTerm ? 'No guide cards match your search.' : 'No guide cards available yet.'}</p>
              ) : (
                cards.map(card => {
                  const CardIcon = getGuideCardIcon(card.icon);
                  return (
                    <button key={card.id} onClick={() => onCardSelect(card)}
                      className="w-full text-left bg-primary-50/70 p-3 hover:bg-primary-100/70 border border-primary-200/60 rounded-xl group transition-all flex justify-between items-center shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-primary-100 rounded-lg text-primary-600 shrink-0"><CardIcon size={16} /></div>
                        <div>
                          <span className="font-bold text-primary-900 text-sm block">{card.title}</span>
                          {card.subtitle && <p className="text-[11px] text-primary-600/80 line-clamp-1">{card.subtitle}</p>}
                        </div>
                      </div>
                      <span className="text-[9px] bg-primary-200/80 px-1.5 py-0.5 rounded font-black uppercase text-primary-700 shrink-0">{card.category}</span>
                    </button>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusSearchSidebar;
