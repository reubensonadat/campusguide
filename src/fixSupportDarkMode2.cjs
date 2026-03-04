const fs = require('fs');
const path = require('path');

const filesToFix = [
   'Transportation.jsx',
   'MedicalsHealthCenter.jsx',
   'LabsITServices.jsx',
   'WifiEmail.jsx',
   'SecuritySafety.jsx',
   'StudentSupportServices.jsx'
];

const dir = 'c:/Users/HP/Desktop/Campus Guide/src/components/guide/content/ucc';

filesToFix.forEach(file => {
   const filePath = path.join(dir, file);
   let content = fs.readFileSync(filePath, 'utf8');

   // Clean up previous script's mess First
   content = content.replace(/dark:bg-([a-z]+)-900\/200/g, 'dark:bg-$1-900/20');
   content = content.replace(/dark:bg-gray-800\/50 dark:bg-slate-900\/20/g, 'dark:bg-slate-900/20');
   content = content.replace(/dark:text-gray-300 dark:text-gray-300/g, 'dark:text-gray-300');
   content = content.replace(/dark:bg-gray-800\/60/g, 'dark:bg-gray-800/40');

   // Replace hardcoded light themes with standard CSS variables for robustness
   // For the main cards, we'll keep the tint in light mode but use a subtle dark border/bg in dark mode

   // Transportation
   content = content.replace(/bg-indigo-50 p-6(.*?)/g, 'bg-indigo-50 dark:bg-indigo-950/30 p-6$1');

   // Replace standard solid backgrounds with valid dark classes
   const colorReplacements = [
      { light: 'bg-emerald-50', dark: 'dark:bg-emerald-950/30' },
      { light: 'bg-emerald-100', dark: 'dark:bg-emerald-900/40' },
      { light: 'bg-emerald-200', dark: 'dark:bg-emerald-800/50' },
      { light: 'border-emerald-100', dark: 'dark:border-emerald-800/50' },
      { light: 'text-emerald-800/70', dark: 'dark:text-emerald-200/70' },
      { light: 'text-emerald-800', dark: 'dark:text-emerald-300' },
      { light: 'text-emerald-900', dark: 'dark:text-emerald-400' },
      { light: 'bg-emerald-500', dark: 'dark:bg-emerald-400' },

      { light: 'bg-blue-50', dark: 'dark:bg-blue-950/30' },
      { light: 'bg-blue-100', dark: 'dark:bg-blue-900/40' },
      { light: 'bg-blue-200', dark: 'dark:bg-blue-800/50' },
      { light: 'border-blue-100', dark: 'dark:border-blue-800/50' },
      { light: 'text-blue-800/70', dark: 'dark:text-blue-200/70' },
      { light: 'text-blue-800', dark: 'dark:text-blue-300' },
      { light: 'text-blue-900', dark: 'dark:text-blue-400' },
      { light: 'bg-blue-400', dark: 'dark:bg-blue-400' },
      { light: 'bg-blue-500', dark: 'dark:bg-blue-400' },

      { light: 'bg-indigo-50', dark: 'dark:bg-indigo-950/30' },
      { light: 'bg-indigo-100', dark: 'dark:bg-indigo-900/40' },
      { light: 'bg-indigo-200', dark: 'dark:bg-indigo-800/50' },
      { light: 'border-indigo-100', dark: 'dark:border-indigo-800/50' },
      { light: 'text-indigo-800/70', dark: 'dark:text-indigo-200/70' },
      { light: 'text-indigo-800', dark: 'dark:text-indigo-300' },
      { light: 'text-indigo-900', dark: 'dark:text-indigo-400' },
      { light: 'bg-indigo-500', dark: 'dark:bg-indigo-400' },

      { light: 'bg-sky-50', dark: 'dark:bg-sky-950/30' },
      { light: 'border-sky-100', dark: 'dark:border-sky-800/50' },
      { light: 'text-sky-900', dark: 'dark:text-sky-400' },
      { light: 'text-sky-700', dark: 'dark:text-sky-300' },
      { light: 'text-sky-200/80', dark: 'dark:text-sky-800/80' },

      { light: 'bg-violet-50', dark: 'dark:bg-violet-950/30' },
      { light: 'border-violet-100', dark: 'dark:border-violet-800/50' },
      { light: 'text-violet-900', dark: 'dark:text-violet-400' },
      { light: 'text-violet-700', dark: 'dark:text-violet-300' },
      { light: 'text-violet-200/80', dark: 'dark:text-violet-800/80' },

      { light: 'bg-amber-50', dark: 'dark:bg-amber-950/30' },
      { light: 'border-amber-100', dark: 'dark:border-amber-800/50' },
      { light: 'text-amber-900', dark: 'dark:text-amber-400' },
      { light: 'text-amber-800/80', dark: 'dark:text-amber-200/80' },
      { light: 'text-amber-800', dark: 'dark:text-amber-300' },
      { light: 'text-amber-700', dark: 'dark:text-amber-300' },
      { light: 'text-amber-200/80', dark: 'dark:text-amber-800/80' },

      { light: 'bg-purple-50', dark: 'dark:bg-purple-950/30' },
      { light: 'border-purple-100', dark: 'dark:border-purple-800/50' },
      { light: 'text-purple-900', dark: 'dark:text-purple-400' },
      { light: 'text-purple-800/80', dark: 'dark:text-purple-200/80' },
      { light: 'border-purple-200', dark: 'dark:border-purple-700' },
      { light: 'text-purple-700', dark: 'dark:text-purple-300' },

      { light: 'bg-red-50', dark: 'dark:bg-red-950/30' },
      { light: 'border-red-500', dark: 'dark:border-red-800' },
      { light: 'text-red-900', dark: 'dark:text-red-400' },
      { light: 'text-red-800', dark: 'dark:text-red-300' },

      { light: 'bg-teal-50', dark: 'dark:bg-teal-950/30' },
      { light: 'border-teal-100', dark: 'dark:border-teal-800/50' },
      { light: 'text-teal-900', dark: 'dark:text-teal-400' },
      { light: 'text-teal-700', dark: 'dark:text-teal-300' },
      { light: 'text-teal-200/80', dark: 'dark:text-teal-800/80' },

      { light: 'bg-gray-200', dark: 'dark:bg-gray-800' },
      { light: 'text-gray-700', dark: 'dark:text-gray-300' },
      { light: 'text-gray-800', dark: 'dark:text-gray-200' },
      { light: 'text-gray-600', dark: 'dark:text-gray-400' },
      { light: 'bg-white/60', dark: 'dark:bg-gray-800/40' },
      { light: 'bg-white', dark: 'dark:bg-gray-800' },
      { light: 'bg-slate-50', dark: 'dark:bg-gray-800/50' },
      { light: 'border-slate-100', dark: 'dark:border-gray-700' }
   ];

   // Remove existing dark classes from the previous messy injection
   content = content.replace(/ dark:[a-z]+-[a-z]+-\d+(?:\/\d+)?/g, '');

   // Re-inject standard colors properly
   colorReplacements.forEach(({ light, dark }) => {
      // Only replace exactly the class word
      const regex = new RegExp(`(?<!dark:)\\b${light.replace(/\\/g, '\\\\').replace(/\//g, '\\/')}\\b`, 'g');
      content = content.replace(regex, `${light} ${dark}`);
   });

   fs.writeFileSync(filePath, content);
   console.log(`Updated ${file}`);
});
