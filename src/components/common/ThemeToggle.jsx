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
         className="fixed bottom-28 right-6 z-[99999] p-4 rounded-full bg-white dark:bg-gray-800 shadow-2xl border-2 border-indigo-100 dark:border-indigo-900 transition-all active:scale-90 hover:scale-110 group overflow-hidden touch-none"
         aria-label="Toggle theme"
         style={{ pointerEvents: 'auto' }}
      >
         <div className="flex flex-col items-center">
            {isDarkMode ? (
               <Sun className="w-6 h-6 text-yellow-500 transition-all transform group-hover:rotate-45" />
            ) : (
               <Moon className="w-6 h-6 text-indigo-600 transition-all transform group-hover:rotate-12" />
            )}
            <span className="text-[6px] font-black uppercase mt-1 text-gray-400 dark:text-gray-500">
               {isDarkMode ? 'Dark' : 'Light'}
            </span>
         </div>
      </button>
   );
};

export { ThemeToggle };
