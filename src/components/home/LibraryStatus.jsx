import React from 'react';
import { LibrarySvg } from './utils';

const LibraryStatus = ({ libraryStatus }) => (
  <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 border border-gray-100 flex flex-col justify-center">
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${libraryStatus.isOpen ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
        <LibrarySvg size={16} className={libraryStatus.isOpen ? 'text-green-600' : 'text-red-500'} />
      </div>
      <span className="text-sm font-black text-gray-900 tracking-tight">Sam Jonah Library</span>
    </div>
    <div className="flex items-center gap-3">
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${libraryStatus.isOpen ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${libraryStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}></span>
        {libraryStatus.label}
      </span>
      <span className="text-xs text-gray-500 font-medium">{libraryStatus.detail}</span>
    </div>
  </div>
);

export default LibraryStatus;
