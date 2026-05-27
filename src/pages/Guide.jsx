import React, { useState, useMemo } from 'react';
import { Book, ChevronRight, MapPin, Phone, Info, Layout, CheckCircle, List, ArrowRight, MousePointer2, Search, X } from 'lucide-react';
import { CustomGuide } from '../components/common/CustomIcons';

import { GUIDE_TOPICS } from '../data/guide';


// new import for the illustration
import CampusIllustration from '/Leader-rafiki.svg';

const Guide = () => {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Essentials");
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter topics based on search query
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return GUIDE_TOPICS;

    const query = searchQuery.toLowerCase();
    const filtered = {};

    Object.entries(GUIDE_TOPICS).forEach(([category, topics]) => {
      const matchingTopics = topics.filter(topic =>
        topic.title.toLowerCase().includes(query) ||
        topic.keywords?.some(k => k.toLowerCase().includes(query))
      );

      if (matchingTopics.length > 0) {
        filtered[category] = matchingTopics;
      }
    });

    return filtered;
  }, [searchQuery]);

  // Handle deep linking from URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic');
    if (topicId) {
      setSelectedTopicId(topicId);
      // Find category for this topic to expand sidebar if needed
      for (const [cat, topics] of Object.entries(GUIDE_TOPICS)) {
        if (topics.find(t => t.id === topicId)) {
          setActiveCategory(cat);
          break;
        }
      }
    }
  }, []);

  const currentTopicData = useMemo(() => {
    if (!selectedTopicId) return null;
    // Find the topic object across all categories
    for (const cat in GUIDE_TOPICS) {
      const found = GUIDE_TOPICS[cat].find(t => t.id === selectedTopicId);
      if (found) {
        return found;
      }
    }
    return null;
  }, [selectedTopicId]);

  // Reset tab when topic changes
  React.useEffect(() => {
    if (currentTopicData && !currentTopicData.isInteractive) {
      // We can't access data here easily without calling the hook, so we let TopicContent handle the active tab reset if needed
      // Actually, we can just reset to 'overview' whenever topic changes
      setActiveTab('overview');
    }
  }, [currentTopicData]);

  const [isSidebarOpenState, setIsSidebarOpenState] = useState(false);
  // Keep the original state name for the rest of the component
  const isSidebarOpenReal = selectedTopicId ? isSidebarOpen : true; // Always open if no topic
  
  // We will move renderContent into a component called TopicContent to safely call hooks.

// Move this above Guide or inside it but as a proper component.
// We'll define it outside to be safe, but wait, it needs activeTab. We can pass activeTab.
const TopicContentRenderer = ({ topic, activeTab }) => {
    if (!topic || topic.isInteractive) return null;
    const data = topic.component();
    
    // Auto-select first tab if activeTab isn't found
    // (Optional, for now just use activeTab)
    return (
      <div className="space-y-12">
        {data.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className={sectionIdx > 0 ? "pt-8 border-t border-gray-100" : ""}>
            {(() => {
              switch (activeTab) {
                case 'overview':
                  return (
                    <div className="space-y-6">
                      {/* Section Header */}
                      {sectionIdx > 0 && (
                        <div className="mb-6 px-1">
                          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{section.title}</h2>
                          {section.summary && <p className="text-gray-500 font-medium mt-1">{section.summary}</p>}
                        </div>
                      )}

                      {/* Content Card */}
                      <div className="bg-white p-5 sm:p-8 md:p-12 rounded-3xl md:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden relative">
                        {/* Summary for first section if not in header */}
                        {sectionIdx === 0 && section.summary && (
                           <div className="mb-10 border-b border-gray-50 pb-8">
                              <p className="text-xl text-gray-600 leading-relaxed font-medium">{section.summary}</p>
                           </div>
                        )}

                        <div className="prose prose-lg prose-primary max-w-none text-gray-600 leading-loose">
                          {section.content}
                        </div>
                      </div>

                      {/* Key Points */}
                      {section.keyPoints && (
                        <div className="bg-blue-50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-100">
                          <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> Key Takeaways
                          </h4>
                          <ul className="space-y-3">
                            {section.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                <span className="text-sm font-medium text-blue-800 leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );

                case 'steps':
                  if (!section.steps || section.steps.length === 0) return null;
                  return (
                    <div className="space-y-6">
                      {/* Section Title for Steps */}
                      {data.sections.length > 1 && (
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                      )}

                      <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <List className="w-5 h-5 text-yellow-500" /> Action Steps
                        </h3>
                        <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:h-full before:w-0.5 before:bg-gray-100">
                          {section.steps?.map((step, idx) => (
                            <div key={idx} className="relative pl-12">
                              <div className="absolute left-0 top-0 w-8 h-8 bg-white border-2 border-yellow-400 text-yellow-600 rounded-full flex items-center justify-center font-bold text-sm z-10">
                                {idx + 1}
                              </div>
                              <h4 className="font-bold text-gray-900 text-base mb-1">{step.title}</h4>
                              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {section.tips && (
                        <div className="bg-purple-50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-purple-100">
                          <h4 className="font-bold text-purple-900 mb-3">Pro Tips</h4>
                          <ul className="grid gap-3">
                            {section.tips.map((tip, i) => (
                              <li key={i} className="text-sm font-medium text-purple-800 flex items-start gap-2">
                                <span className="text-purple-400">★</span> {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );

                case 'resources':
                  if ((!section.resources || section.resources.length === 0) && (!data.buildings || sectionIdx > 0)) return null;
                  return (
                    <div className="space-y-4">
                      {data.sections.length > 1 && section.resources?.length > 0 && (
                        <h3 className="text-lg font-bold text-gray-800 mt-2">{section.title} Resources</h3>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
                        {section.resources?.map((res, idx) => (
                          <a
                            key={idx}
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-primary-400 hover:shadow-md transition-all group flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{res.title}</h4>
                                <MousePointer2 className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transform group-hover:-rotate-45 transition-all" />
                              </div>
                              <p className="text-sm text-gray-500">{res.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Show buildings only once, typically with the first section or separate */}
                      {sectionIdx === 0 && data.buildings?.map((b, idx) => (
                        <div key={`b-${idx}`} className="bg-white p-5 rounded-2xl border border-gray-200 flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-gray-900">{b.fullName} <span className="text-xs text-gray-400 ml-2">({b.shortForm})</span></h4>
                            <p className="text-xs text-gray-500">{b.description}</p>
                          </div>
                          <button
                            onClick={() => data.openGoogleMaps?.(b.url)}
                            className="text-xs font-bold bg-gray-100 px-3 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                          >
                            Locate
                          </button>
                        </div>
                      ))}
                    </div>
                  );

                case 'checklist':
                  if (!section.checklist || section.checklist.length === 0) return null;
                  return (
                    <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title} Checklist</h3>
                      <div className="space-y-3">
                        {section.checklist?.map((item, idx) => (
                          <label key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 transition-all" />
                            <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );

                case 'warnings':
                  if (!section.commonMistakes && !section.consequences) return null;
                  return (
                    <div className="bg-red-50 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-red-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                      <h3 className="text-lg font-bold text-red-900 mb-4">{section.title} Warnings</h3>
                      {section.commonMistakes && (
                        <div className="mb-6">
                          <h4 className="font-bold text-red-800 mb-3">Common Mistakes</h4>
                          <ul className="space-y-2">
                            {section.commonMistakes.map((mistake, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-red-700 text-sm">
                                <span>•</span> {mistake}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {section.consequences && (
                        <div className="bg-white/60 p-4 rounded-xl border border-red-200">
                          <h4 className="font-bold text-red-800 mb-2">Consequences</h4>
                          <p className="text-sm text-red-700">{section.consequences}</p>
                        </div>
                      )}
                    </div>
                  );

                default:
                  return (
                    section[activeTab] ? (
                      <div className="p-8 text-center text-gray-400 prose prose-yellow max-w-none text-gray-600">
                        {typeof section[activeTab] === 'string' ? section[activeTab] : "Complex content not renderable in default view."}
                      </div>
                    ) : null
                  );
              }
            })()}
          </div>
        ))}
      </div>
    );
};

  return (
    <div className="flex bg-white lg:h-screen lg:overflow-hidden min-h-screen relative font-sans selection:bg-primary-100 selection:text-primary-900 transition-colors duration-300">

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 z-50">
        <span className="font-bold text-lg text-gray-900">Student Guide</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 -mr-2 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z"></path></svg>
          )}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-white/90 backdrop-blur-xl border-r border-slate-200/50 transform transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 lg:bg-white lg:backdrop-blur-none
                ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'}
            `}>
        <div className="h-full flex flex-col">

          {/* Scrollable area — title scrolls away, search bar sticks */}
          <div className="flex-1 overflow-y-auto px-4 pb-24 lg:pb-8 custom-scrollbar">

            {/* Title — scrolls away when user scrolls down */}
            <div className="pt-20 lg:pt-6 pb-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Campus Guide</h2>
            </div>

            {/* Sticky Search Bar — locks to top once title scrolls past */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm py-2 z-10 -mx-4 px-4 border-b border-slate-100/80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-none text-slate-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-200/50 p-1 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Topic List */}
            <div className="pt-4">
              {Object.keys(filteredTopics).length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm font-medium">
                  <p>No guides found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(filteredTopics).map(([category, topics]) => (
                    <div key={category}>
                      <h3 className="px-3 text-[11px] font-black text-primary-400/80 uppercase tracking-widest mb-2">{category}</h3>
                      <div className="space-y-0.5">
                        {topics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => {
                              setSelectedTopicId(topic.id);
                              if (!searchQuery) setActiveCategory(category);
                              if (window.innerWidth < 1024) setIsSidebarOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all flex items-center justify-between group ${selectedTopicId === topic.id ? 'bg-primary-50/80 text-primary-700' : 'text-slate-500 hover:bg-slate-50 hover:text-primary-600'}`}
                          >
                            <span>{topic.title}</span>
                            {selectedTopicId === topic.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-sm" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full lg:overflow-hidden relative w-full bg-white transition-colors duration-300">
        {selectedTopicId && currentTopicData ? (
          currentTopicData.isInteractive ? (
            <div className="w-full fixed inset-0 top-16 lg:top-0 lg:relative lg:flex-1 flex flex-col z-0">
              <currentTopicData.component />
            </div>
          ) : (
            <div className="flex-1 lg:overflow-y-auto custom-scrollbar pt-20 lg:pt-0 pb-32">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:px-12 md:py-16">

                {/* Topic Header */}
                <div className="mb-8 sm:mb-12 border-b border-gray-100 pb-8 sm:pb-10">
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                    {currentTopicData.title || 'Guide'}
                  </h1>

                  {/* Tabs */}
                  <div className="flex gap-8 border-b border-gray-100 -mb-8 overflow-x-auto no-scrollbar mask-linear-fade pb-1">
                    {['overview', 'steps', 'resources', 'checklist', 'warnings'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap px-1 capitalize ${activeTab === tab ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Scrollable Content Body */}
                <div className="min-h-[400px]">
                  <TopicContentRenderer key={currentTopicData.id} topic={currentTopicData} activeTab={activeTab} />
                </div>

                {/* Simple Footer */}
                <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400 font-medium">Was this guide helpful?
                    <a
                      href="https://wa.me/233201534711?text=Hello%2C%20I%20have%20feedback%20regarding%20the%20Campus%20Guide"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 underline cursor-pointer hover:text-primary-600 transition-colors"
                    >
                      Send Feedback via WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white h-full">
            <div className="relative w-full max-w-lg -mr-6 pt-16">
              <img
                src={CampusIllustration}
                alt="Campus illustration"
                className="w-full h-auto object-contain drop-shadow-lg"
                style={{ WebkitTransform: 'translateZ(0)' }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-lg" aria-hidden="true"></div>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Welcome to the Guide</h2>
            <p className="max-w-md text-gray-500 font-medium leading-relaxed">
              Select a topic from the sidebar to get started. Everything you need to know about campus life, in one place.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Guide;
