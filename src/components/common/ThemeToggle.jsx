import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ThemeToggle = () => {
   const { state, actions } = useAppContext();
   const isDarkMode = state.settings.darkMode;

   const handleToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const nextMode = !isDarkMode;
      console.log('Toggling theme via AppContext to:', nextMode ? 'dark' : 'light');
      actions.updateSettings({ darkMode: nextMode });
   };

   return (
      <button
         onClick={handleToggle}
         className="fixed bottom-28 right-6 z-[99999] touch-none"
         aria-label="Toggle theme"
         style={{ pointerEvents: 'auto' }}
      >
         {/* Frosted glass pill — both icons visible, active one highlighted */}
         <div className="flex items-center gap-1 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/60 dark:border-white/10 shadow-lg dark:shadow-black/40 transition-all duration-300 hover:scale-105 active:scale-95">

            {/* Sun — glows amber when light mode is active */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${!isDarkMode ? 'bg-amber-400 shadow-md shadow-amber-200' : 'opacity-35'}`}>
               <Sun className={`w-4 h-4 transition-colors duration-300 ${!isDarkMode ? 'text-white' : 'text-gray-400'}`} />
            </div>

            {/* Moon — glows indigo when dark mode is active */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-indigo-600 shadow-md shadow-indigo-900' : 'opacity-35'}`}>
               <Moon className={`w-4 h-4 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-500'}`} />
            </div>

         </div>
      </button>
   );
};

export { ThemeToggle };
