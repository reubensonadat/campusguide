import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CustomHome, CustomGuide, CustomTools, CustomProfile, CustomCommunity, CustomSettings } from './CustomIcons';
import { Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ onExpandedChange }) => {
  const [isExpanded, setIsExpanded] = useLocalStorage('ucc_sidebar_expanded', true);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', label: 'Home', icon: CustomHome, path: '/' },
    { id: 'guide', label: 'Campus Map', icon: CustomGuide, path: '/guide' },
    { id: 'tools', label: 'Tools', icon: CustomTools, path: '/tools' },
    { id: 'community', label: 'Community', icon: CustomCommunity, path: '/community' },
    { id: 'profile', label: 'Profile', icon: CustomProfile, path: '/profile' }
  ];

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onExpandedChange) {
      onExpandedChange(newState);
    }
  };

  // Notify parent on mount if collapsed
  React.useEffect(() => {
    if (onExpandedChange) {
      onExpandedChange(isExpanded);
    }
  }, []);

  return (
    <div 
      className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-gray-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{ width: isExpanded ? '220px' : '64px' }}
    >
      {/* Header / Logo Area */}
      <div className="h-[76px] flex items-center px-3 border-b border-gray-100 mb-4 overflow-hidden">
        <button 
          onClick={handleToggle}
          onMouseEnter={() => setIsHoveringLogo(true)}
          onMouseLeave={() => setIsHoveringLogo(false)}
          className="flex-shrink-0 relative w-10 h-10 rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
          aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {/* Logo */}
          <img 
            src="/logo.png" 
            alt="UCC Campus Guide" 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${isHoveringLogo ? 'opacity-0' : 'opacity-100'}`} 
          />
          {/* Hover Toggle Icon */}
          <div className={`absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center transition-opacity duration-200 ${isHoveringLogo ? 'opacity-100' : 'opacity-0'}`}>
            {isExpanded ? (
              <ChevronLeft size={20} className="text-gray-600" />
            ) : (
              <ChevronRight size={20} className="text-gray-600" />
            )}
          </div>
        </button>

        {/* Title Text (Only visible when expanded) */}
        <div 
          className={`ml-3 font-black text-lg text-gray-900 tracking-tight whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0'}`}
        >
          Campus Guide
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto hide-scrollbar">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`w-full flex items-center px-2.5 h-[44px] rounded-xl transition-all duration-200 group focus:outline-none ${
                isActive 
                  ? 'bg-primary-500 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={!isExpanded ? tab.label : ''}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6">
                <Icon size={22} color={isActive ? 'white' : 'currentColor'} />
              </div>
              <span 
                className={`ml-3 text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  isExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Settings Footer */}
      <div className="p-3 border-t border-gray-100 mt-auto">
        <button
          onClick={() => navigate('/settings')}
          className={`w-full flex items-center px-2.5 h-[44px] rounded-xl transition-all duration-200 group focus:outline-none ${
            ['/settings', '/privacy', '/terms'].includes(location.pathname)
              ? 'bg-primary-400 text-white shadow-sm' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}
          title={!isExpanded ? "Settings" : ""}
        >
          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6">
            <CustomSettings size={22} className={['/settings', '/privacy', '/terms'].includes(location.pathname) ? 'text-white' : 'text-gray-500 group-hover:text-gray-900 transition-colors'} />
          </div>
          <span 
            className={`ml-3 text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              isExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'
            }`}
          >
            Settings
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
