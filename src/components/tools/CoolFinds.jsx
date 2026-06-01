import React, { useState, useEffect } from 'react';
import { ExternalLink, Search, ArrowRight } from 'lucide-react';
import { CustomGuide, CustomTools, CustomCommunity, CustomProfile, CustomSettings } from '../common/CustomIcons';
import { DataLoader } from '../common/CustomLoaders';
import { supabase } from '../../lib/supabase';

const CATEGORIES = [
  { id: 'all', label: 'All Resources' },
  { id: 'ai-tools', label: 'AI & Free Tools' },
  { id: 'academic', label: 'Academic & Books' },
  { id: 'dev', label: 'Tech & Dev' },
  { id: 'design', label: 'Design & UI' },
  { id: 'career', label: 'Career & Leadership' },
  { id: 'entrepreneurship', label: 'Entrepreneurship' },
  { id: 'deals', label: 'Student Deals & Life' }
];

// Map categories to Custom Icons
const getIconForCategory = (category) => {
  switch (category) {
    case 'academic': return CustomGuide;
    case 'dev': return CustomTools;
    case 'design': return CustomCommunity;
    case 'career': return CustomProfile;
    case 'entrepreneurship': return CustomCommunity;
    case 'deals': return CustomSettings;
    case 'ai-tools': return CustomTools;
    default: return CustomGuide;
  }
};

const CoolFinds = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('cool_finds')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setResources(data);
      } else if (error) {
        console.error("Error fetching cool finds:", error);
      }
      setLoading(false);
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Search and Filter */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 flex-shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-950/20 transition-all placeholder:text-gray-400"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary-950 text-white shadow-md'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <DataLoader />
          <p className="text-sm font-medium text-gray-500 mt-6">Loading resources...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, idx) => {
              const Icon = getIconForCategory(resource.category);
              return (
                <a 
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={resource.id || idx} 
                  className="group bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-950/20 transition-all cursor-pointer flex flex-col h-full active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-950/5 text-primary-950 flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary-950 group-hover:text-white transition-colors text-gray-400">
                      <ArrowRight size={14} className="-rotate-45" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-950 transition-colors line-clamp-1">{resource.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed flex-1">{resource.description}</p>
                  
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-primary-950/60 transition-colors">
                    <ExternalLink size={12} />
                    <span className="truncate">
                      {resource.url.startsWith('tel:') 
                        ? resource.url.replace('tel:', '').replace('%23', '#')
                        : (() => {
                            try {
                              return new URL(resource.url).hostname.replace('www.', '');
                            } catch (e) {
                              return resource.url;
                            }
                          })()
                      }
                    </span>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No resources found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default CoolFinds;
