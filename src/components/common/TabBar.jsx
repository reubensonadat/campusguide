import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomHome, CustomGuide, CustomTools, CustomProfile, CustomCommunity, CustomContact, CustomSettings, CustomMegaphone } from './CustomIcons';
import { AboutIcon } from './CustomTaskIcons';

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef([]);

  const tabs = [
    { id: 'home', label: 'Home', icon: CustomHome, path: '/' },
    { id: 'guide', label: 'Map', icon: CustomGuide, path: '/guide' },
    { id: 'tools', label: 'Tools', icon: CustomTools, path: '/tools' },
    { id: 'community', label: 'Community', icon: CustomCommunity, path: '/community' },
    { id: 'profile', label: 'Profile', icon: CustomProfile, path: '/profile' }
  ];

  const displayTabs = [...tabs];
  if (['/settings', '/privacy', '/terms'].includes(location.pathname)) {
    displayTabs[4] = { id: 'settings', label: 'Settings', icon: CustomSettings, path: location.pathname };
  } else if (location.pathname === '/contact') {
    displayTabs[4] = { id: 'contact', label: 'Contact', icon: CustomContact, path: '/contact' };
  } else if (location.pathname === '/advertise') {
    displayTabs[4] = { id: 'advertise', label: 'Advertise', icon: CustomMegaphone, path: '/advertise' };
  } else if (location.pathname === '/support') {
    displayTabs[4] = { id: 'about', label: 'About', icon: AboutIcon, path: '/support' };
  }

  useEffect(() => {
    // Small timeout to ensure DOM layout is complete before measuring
    const timeoutId = setTimeout(() => {
      const activeIndex = displayTabs.findIndex(tab => 
        location.pathname === tab.path || 
        (tab.path === '/tools' && location.pathname.startsWith('/tools/')) ||
        (tab.id === 'settings' && ['/settings', '/privacy', '/terms'].includes(location.pathname))
      );
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

  if (location.pathname.startsWith('/admin')) {
    return (
      <div className="fixed bottom-0 left-0 w-full px-3 pb-[calc(1rem_+_env(safe-area-inset-bottom,0px))] z-50 md:hidden">
        <div className="bg-gray-900 rounded-2xl shadow-strong flex items-center justify-around px-2 h-[62px]">
          <button onClick={() => navigate('/admin/moderation')} className={`flex flex-col items-center justify-center w-16 h-full ${location.pathname.includes('moderation') ? 'text-primary-400' : 'text-gray-400'}`}>
            <CustomCommunity size={24} color="currentColor" />
            <span className="text-[10px] font-bold mt-1">Ads</span>
          </button>
          <button onClick={() => navigate('/admin/lostfound')} className={`flex flex-col items-center justify-center w-16 h-full ${location.pathname.includes('lostfound') ? 'text-primary-400' : 'text-gray-400'}`}>
            <CustomTools size={24} color="currentColor" />
            <span className="text-[10px] font-bold mt-1">Lost/Found</span>
          </button>
          <button onClick={() => navigate('/admin/upload')} className={`flex flex-col items-center justify-center w-16 h-full ${location.pathname.includes('upload') ? 'text-primary-400' : 'text-gray-400'}`}>
            <CustomMegaphone size={24} color="currentColor" />
            <span className="text-[10px] font-bold mt-1">Upload</span>
          </button>
          <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center w-16 h-full text-red-400">
            <CustomHome size={24} color="currentColor" />
            <span className="text-[10px] font-bold mt-1">Exit</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full px-3 pb-[calc(1rem_+_env(safe-area-inset-bottom,0px))] z-50 md:hidden">
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
          const isActive = location.pathname === tab.path || 
            (tab.path === '/tools' && location.pathname.startsWith('/tools/')) ||
            (tab.id === 'settings' && ['/settings', '/privacy', '/terms'].includes(location.pathname));
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
