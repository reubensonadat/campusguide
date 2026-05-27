import React from 'react';

// Custom SVG library icon
export const LibrarySvg = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm6.62,31.47,46.82-10.05,3.34,15.9L146,97.53Zm6.64,31.57,46.82-10.06,13.3,63.24-46.82,10.06ZM216,197.94l-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm0,32h48v96H56Zm48,128H56V192h48v16Z"/>
  </svg>
);

export const LibraryWidget = ({ libraryStatus }) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${libraryStatus.isOpen ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
          <LibrarySvg size={16} className={libraryStatus.isOpen ? 'text-green-600' : 'text-red-500'} />
        </div>
        <span className="text-sm font-black text-gray-900 tracking-tight">Sam Jonah Library</span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
          libraryStatus.isOpen
            ? 'bg-green-50 text-green-700 border border-green-100'
            : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${libraryStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}></span>
          {libraryStatus.label}
        </span>
        <span className="text-xs text-gray-500 font-medium">{libraryStatus.detail}</span>
      </div>
    </div>
  );
};
