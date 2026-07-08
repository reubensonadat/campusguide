import React from 'react';

const SupportBanner = ({ actions }) => (
  <div onClick={() => actions?.setShowSupportModal(true)}
    className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer active:scale-[0.98] transition-transform">
    <div className="relative z-10">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Support the Guide</h3>
      <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed mb-3">
        Help us keep this app free and growing for all students.
      </p>
      <span className="inline-block bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">Support Now</span>
    </div>
    <div className="relative z-10 w-24 h-24 -mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
      <img src="/Savings.png" alt="Support" className="w-full h-full object-contain drop-shadow-md" />
    </div>
  </div>
);

export default SupportBanner;
