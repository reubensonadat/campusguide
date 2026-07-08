import React from 'react';
import { LayoutGrid, Store, Clock, ListChecks, Calendar, StickyNote } from 'lucide-react';

const WeatherSvgIcon = ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" /></svg>;
const LibrarySvgIcon = ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,88Zm0,32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,120Zm0,32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,152Z" /></svg>;
const VerseSvgIcon = ({ size = 20 }) => <svg viewBox="-0.5 -0.5 16 16" height={size} width={size}><path d="M12.86875 11.675v2.3875H3.325a1.19375 1.19375 0 0 1-1.19375-1.19375 1.2 1.2 0 0 1 1.19375-1.19375Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"/><path d="M12.86875 0.9375v10.7375H3.325a1.2 1.2 0 0 0-1.19375 1.19375V2.13125A1.2 1.2 0 0 1 3.325 0.9375Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"/><path d="m4.51875 0.9375 0 10.7375" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"/></svg>;
const ForexSvgIcon = ({ size = 20 }) => <svg viewBox="-0.5 -0.5 16 16" height={size} width={size}><path d="M0.925 6.31875a1.7875 1.7875 0 0 1 1.79375-1.79375 1.79375 1.79375 0 0 1 1.79375 1.79375" fill="none" stroke="currentColor" strokeWidth="1"/><path d="M1.525 2.13125a1.19375 1.19375 0 1 0 2.3875 0 1.19375 1.19375 0 1 0-2.3875 0" fill="none" stroke="currentColor" strokeWidth="1"/><path d="M6.30625 1.5375h3.5875a2.3875 2.3875 0 0 1 2.3875 2.3875v2.99375" fill="none" stroke="currentColor" strokeWidth="1"/><path d="m14.075 5.125-1.79375 1.7875-1.79375-1.7875" fill="none" stroke="currentColor" strokeWidth="1"/><path d="M8.69375 13.49375H5.10625a2.39375 2.39375 0 0 1-2.3875-2.39375V8.125" fill="none" stroke="currentColor" strokeWidth="1"/><path d="m0.925 9.90625 1.79375-1.79375 1.79375 1.79375" fill="none" stroke="currentColor" strokeWidth="1"/></svg>;
const FootballSvgIcon = ({ size = 20 }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="12 16 16 12 12 8 8 12 16"/><line x1="12" y1="8" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="16"/><line x1="8" y1="12" x2="2" y2="12"/><line x1="22" y1="12" x2="16" y2="12"/></svg>;
const CryptoSvgIcon = ({ size = 20 }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z"/><path d="M12 7v10"/><path d="M15 9.5a3 3 0 1 0 0 5"/></svg>;
const NewsSvgIcon = ({ size = 20 }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M21 9H3"/><path d="M12 15h6"/><path d="M12 12h3"/><path d="M6 12h2"/></svg>;
const QuoteSvgIcon = ({ size = 20 }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z"/></svg>;
const JokeSvgIcon = ({ size = 20 }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const FunFactSvgIcon = ({ size = 20 }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
const GithubSvgIcon = ({ size = 20 }) => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const WordSvgIcon = ({ size = 20 }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h8"/><path d="M8 11h6"/><path d="M8 15h4"/></svg>;

const Toggle = ({ checked, onChange }) => (
  <button onClick={onChange} className={`relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${checked ? 'bg-gray-900' : 'bg-gray-200'}`}>
    <span className={`pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const coreWidgets = [
  { key: 'classes', label: "Today's Classes", Icon: Clock },
  { key: 'tasks', label: "Today's Tasks", Icon: ListChecks },
  { key: 'calendar', label: 'Academic Calendar', Icon: Calendar },
  { key: 'library', label: 'Library Status', Icon: LibrarySvgIcon },
  { key: 'quickNote', label: 'Quick Note', Icon: StickyNote },
];

const apiWidgets = [
  { key: 'weather', label: 'Weather', Icon: WeatherSvgIcon },
  { key: 'verse', label: 'Verse of the Day', Icon: VerseSvgIcon },
  { key: 'forex', label: 'Forex (USD/GHS)', Icon: ForexSvgIcon },
  { key: 'football', label: 'Live Football', Icon: FootballSvgIcon },
  { key: 'crypto', label: 'Crypto Tracker', Icon: CryptoSvgIcon },
  { key: 'news', label: 'Tech News', Icon: NewsSvgIcon },
  { key: 'quote', label: 'Quote of the Day', Icon: QuoteSvgIcon },
  { key: 'joke', label: 'Dad Joke', Icon: JokeSvgIcon },
  { key: 'fact', label: 'Fun Fact', Icon: FunFactSvgIcon },
  { key: 'github', label: 'GitHub Stats', Icon: GithubSvgIcon },
  { key: 'word', label: 'Word of the Day', Icon: WordSvgIcon },
];

const WidgetToggleRow = ({ widget, homeWidgets, onToggle }) => {
  const { key, label, Icon } = widget;
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${homeWidgets[key] ? 'bg-gray-900/5 text-gray-900' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600'}`}>
          <Icon size={16} />
        </div>
        <span className={`text-[15px] font-medium transition-colors ${homeWidgets[key] ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>{label}</span>
      </div>
      <Toggle checked={!!homeWidgets[key]} onChange={() => onToggle(key)} />
    </div>
  );
};

const WidgetTogglesSection = ({ homeWidgets, onToggle }) => {
  const activeApiCount = apiWidgets.filter(w => homeWidgets[w.key]).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gray-900/5 text-gray-900 flex items-center justify-center"><LayoutGrid size={20} /></div>
          <div>
            <h3 className="text-[17px] font-bold text-gray-900">Core Features</h3>
            <p className="text-[13px] text-gray-500 font-medium">Essential campus tools</p>
          </div>
        </div>
        <div className="space-y-4">
          {coreWidgets.map(w => <WidgetToggleRow key={w.key} widget={w} homeWidgets={homeWidgets} onToggle={onToggle} />)}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-400/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gray-900/5 text-gray-900 flex items-center justify-center"><Store size={20} /></div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-gray-900">API Marketplace</h3>
              <span className="text-[11px] font-bold text-gray-900 bg-gray-900/5 px-2 py-0.5 rounded-full">{activeApiCount} / 3 Active</span>
            </div>
            <p className="text-[13px] text-gray-500 font-medium">Select up to 3 live widgets</p>
          </div>
        </div>
        <div className="space-y-4">
          {apiWidgets.map(w => <WidgetToggleRow key={w.key} widget={w} homeWidgets={homeWidgets} onToggle={onToggle} />)}
        </div>
      </div>
    </div>
  );
};

export default WidgetTogglesSection;
