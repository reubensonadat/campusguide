import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SupportBanner = ({ actions, onClick }) => {
  const [supporterStatus] = useLocalStorage('ucc_supporter_status', {});
  const isSupporter = supporterStatus?.isSupporter;

  const handleClick = () => {
    if (onClick) onClick();
    else if (actions && actions.setShowSupportModal) actions.setShowSupportModal(true);
  };

  if (isSupporter) {
    return (
      <div onClick={handleClick}
        className="bg-amber-50 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-amber-200 p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer active:scale-[0.98] transition-transform">
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fbbf24" className="w-5 h-5 drop-shadow-sm">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
            </svg>
            <h3 className="text-lg font-bold text-gray-900">You're a Supporter!</h3>
          </div>
          <p className="text-sm text-gray-600 max-w-[200px] leading-relaxed mb-3">
            Thank you for backing Campus Guide.
          </p>
          <span className="inline-block bg-white text-gray-900 border border-gray-200 text-xs font-bold px-4 py-2 rounded-lg shadow-sm">View Details</span>
        </div>
      </div>
    );
  }

  return (
    <div onClick={handleClick}
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
};

export default SupportBanner;
