import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Wrench, Heart, Phone, Settings } from 'lucide-react';

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'guide', label: 'Guide', icon: BookOpen, path: '/guide' },
    { id: 'tools', label: 'Tools', icon: Wrench, path: '/tools' },
    { id: 'support', label: 'Support', icon: Heart, path: '/support' }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-colors duration-300">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className={`flex flex-col items-center justify-center w-full h-full py-1 px-2 focus:outline-none transition-colors ${isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              aria-label={tab.label}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { TabBar };
export default TabBar;
