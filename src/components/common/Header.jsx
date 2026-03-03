import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Menu, X } from 'lucide-react';

const Header = ({ title, onMenuToggle, showMenuButton = true }) => {
  const { state } = useAppContext();

  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="mr-3 p-1 rounded-md hover:bg-primary-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
      </div>
    </header>
  );
};

export default Header;