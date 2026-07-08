import React from 'react';

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-6 min-h-[140px] border border-gray-100 animate-pulse flex flex-col justify-center">
    <div className="h-4 bg-gray-200/50 rounded w-1/3 mb-4"></div>
    <div className="space-y-3">
      <div className="h-3 bg-gray-200/40 rounded w-full"></div>
      <div className="h-3 bg-gray-200/40 rounded w-5/6"></div>
    </div>
  </div>
);

export default SkeletonCard;
