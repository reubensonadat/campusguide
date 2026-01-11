import React, { useState, useMemo } from 'react';
import { Book, ChevronRight, MapPin, Phone, Info, Layout, CheckCircle, List, ArrowRight, MousePointer2, BookOpen, Search, X } from 'lucide-react';
import { GUIDE_TOPICS } from '../data/guide';

const Guide = () => {
  const [activeCategory, setActiveCategory] = useState("Essentials");
  const [selectedTopicId, setSelectedTopicId] = useState(null);
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

  // Memoize the selected topic data
  const currentTopicData = useMemo(() => {
    if (!selectedTopicId) return null;
    // Find the topic object across all categories
    for (const cat in GUIDE_TOPICS) {
      const found = GUIDE_TOPICS[cat].find(t => t.id === selectedTopicId);
      if (found) {
        // Initialize the component to get the data object
        return found.component();
      }
    }
    return null;
  }, [selectedTopicId]);

  // Reset tab when topic changes
  React.useEffect(() => {
    if (currentTopicData?.tabs?.length > 0) {
      setActiveTab(currentTopicData.tabs[0].id);
    }
  }, [currentTopicData]);

  const renderContent = () => {
    if (!currentTopicData) return null;

    return (
      <div className="space-y-12">
        {currentTopicData.sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className={sectionIdx > 0 ? "pt-8 border-t border-gray-100" : ""}>
            {(() => {
              switch (activeTab) {
                case 'overview':
                  return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                      {/* Section Header if multiple sections exist (Optional context) */}
                      {currentTopicData.sections.length > 1 && (
                        <div className="mb-4">
                          <h2 className="text-2xl font-black text-gray-800">{section.title}</h2>
                          {section.summary && <p className="text-gray-500 font-medium">{section.summary}</p>}
                        </div>
                      )}

                      {/* Content Card */}
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-700">
                            <Info className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{section.title} Content</h3>
                        </div>
                        {/* Only show summary in card if we didn't show it in header above, or contextually */}
                        {!section.summary ? null : <p className="text-gray-600 leading-relaxed font-medium mb-4">{section.summary}</p>}

                        <div className="prose prose-yellow max-w-none text-gray-600">
                          {section.content}
                        </div>
                      </div>

                      {/* Key Points */}
                      {section.keyPoints && (
                        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
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
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                      {/* Section Title for Steps */}
                      {currentTopicData.sections.length > 1 && (
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                      )}

                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
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
                        <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
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
                  if ((!section.resources || section.resources.length === 0) && (!currentTopicData.buildings || sectionIdx > 0)) return null;
                  return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      {currentTopicData.sections.length > 1 && section.resources?.length > 0 && (
                        <h3 className="text-lg font-bold text-gray-800 mt-2">{section.title} Resources</h3>
                      )}
                      <div className="grid gap-4">
                        {section.resources?.map((res, idx) => (
                          <a
                            key={idx}
                            href={res.url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all group"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">{res.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{res.description}</p>
                              </div>
                              <MousePointer2 className="w-5 h-5 text-gray-300 group-hover:text-yellow-500 transform group-hover:-rotate-45 transition-all" />
                            </div>
                          </a>
                        ))}
                      </div>

                      {/* Show buildings only once, typically with the first section or separate */}
                      {sectionIdx === 0 && currentTopicData.buildings?.map((b, idx) => (
                        <div key={`b-${idx}`} className="bg-white p-5 rounded-2xl border border-gray-200 flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-gray-900">{b.fullName} <span className="text-xs text-gray-400 ml-2">({b.shortForm})</span></h4>
                            <p className="text-xs text-gray-500">{b.description}</p>
                          </div>
                          <button
                            onClick={() => currentTopicData.openGoogleMaps?.(b.url)}
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
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
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
                    <div className="bg-red-50 p-6 rounded-3xl border border-red-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-white h-screen supports-[height:100dvh]:h-[100dvh] relative font-sans overflow-hidden transition-colors duration-300">

      {/* Mobile Header */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 z-30">
        <span className="font-bold text-lg text-gray-900">Student Guide</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 -mr-2 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          {isSidebarOpen ? <List className="w-6 h-6 rotate-90" /> : <List className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-gray-50/80 backdrop-blur-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out
                lg:relative lg:translate-x-0 lg:bg-gray-50 lg:backdrop-blur-none
                ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'}
            `}>
        <div className="h-full flex flex-col">
          <div className="p-6 pt-20 lg:pt-8">
            <h2 className="text-xl font-black text-gray-900 tracking-tight mb-1">Campus Guide</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">The Pastel Edition</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-20 lg:pb-8 space-y-6 custom-scrollbar">

            {/* Search Input */}
            <div className="sticky top-0 bg-gray-50 pt-2 pb-4 z-10 px-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 text-gray-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {Object.keys(filteredTopics).length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                <p>No guides found matching "{searchQuery}"</p>
              </div>
            ) : (
              Object.entries(filteredTopics).map(([category, topics]) => (
                <div key={category}>
                  <h3 className="px-4 text-xs font-black text-indigo-900 uppercase tracking-widest mb-3 mt-2 border-b-2 border-indigo-100 pb-2">{category}</h3>
                  <div className="space-y-1">
                    {topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          setSelectedTopicId(topic.id);
                          if (!searchQuery) setActiveCategory(category); // Only switch category context if not searching
                          if (window.innerWidth < 1024) setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${selectedTopicId === topic.id ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:bg-white hover:shadow-sm hover:text-gray-900'}`}
                      >
                        <span>{topic.title}</span>
                        {selectedTopicId === topic.id && <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
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
      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full bg-white transition-colors duration-300">
        {selectedTopicId ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar pt-20 lg:pt-0 pb-32">
            <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 md:py-16">

              {/* Topic Header */}
              <div className="mb-12 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-3 text-sm font-bold text-indigo-600 mb-4 bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100">
                  <BookOpen className="w-4 h-4" />
                  {activeCategory}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                  {currentTopicData?.sections[0].title}
                </h1>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-gray-100 -mb-8 overflow-x-auto no-scrollbar mask-linear-fade pb-1">
                  {currentTopicData?.tabs?.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap px-1 ${activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Scrollable Content Body */}
              <div className="min-h-[400px]">
                {renderContent()}
              </div>

              {/* Simple Footer */}
              <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 font-medium">Was this guide helpful?
                  <a
                    href="https://wa.me/233201534711?text=Hello%2C%20I%20have%20feedback%20regarding%20the%20Campus%20Guide"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 underline cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    Send Feedback via WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white h-full pb-24">
            <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
              <BookOpen className="w-10 h-10 text-gray-300" />
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
