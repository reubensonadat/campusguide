import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomHome, CustomGuide, CustomTools, CustomProfile, CustomCommunity, CustomContact, CustomSettings } from './CustomIcons';

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef([]);

  const tabs = [
    { id: 'home', label: 'Home', icon: CustomHome, path: '/' },
    { id: 'guide', label: 'Guide', icon: CustomGuide, path: '/guide' },
    { id: 'tools', label: 'Tools', icon: CustomTools, path: '/tools' },
    { id: 'community', label: 'Community', icon: CustomCommunity, path: '/community' },
    { id: 'profile', label: 'Profile', icon: CustomProfile, path: '/profile' }
  ];

  const displayTabs = [...tabs];
  if (location.pathname === '/settings') {
    displayTabs[4] = { id: 'settings', label: 'Settings', icon: CustomSettings, path: '/settings' };
  } else if (location.pathname === '/contact') {
    displayTabs[4] = { id: 'contact', label: 'Contact', icon: CustomContact, path: '/contact' };
  }

  useEffect(() => {
    // Small timeout to ensure DOM layout is complete before measuring
    const timeoutId = setTimeout(() => {
      const activeIndex = displayTabs.findIndex(tab => tab.path === location.pathname);
      if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
        const el = tabsRef.current[activeIndex];
        setPillStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1
        });
      }
    }, 10);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full px-3 pb-4 z-50 md:hidden">
      <div className="bg-white rounded-2xl shadow-strong relative flex items-center justify-between px-2 h-[62px]">
        {/* Sliding Pill */}
        <div 
          className="absolute h-10 bg-[#6EABC6] rounded-xl"
          style={{ 
            left: `${pillStyle.left}px`, 
            width: `${pillStyle.width}px`,
            opacity: pillStyle.opacity,
            transition: 'left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-in'
          }}
        />

        {displayTabs.map((tab, index) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              ref={el => tabsRef.current[index] = el}
              onClick={() => handleTabClick(tab.path)}
              className="relative z-10 flex flex-row items-center justify-center px-3 py-2 h-10 rounded-xl focus:outline-none"
              aria-label={tab.label}
            >
              <Icon size={isActive ? 16 : 20} color={isActive ? 'white' : 'currentColor'} className={isActive ? 'text-white' : 'text-gray-400'} />
              {isActive && (
                <span className="text-[11px] font-bold text-white ml-1.5 whitespace-nowrap">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { TabBar };
export default TabBar;
