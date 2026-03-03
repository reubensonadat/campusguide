// src/components/payment/SupportButton.jsx
import React from 'react';
import { useSupportModal } from '../../hooks/useSupportModal';
import { Heart } from 'lucide-react';

const SupportButton = () => {
  const { openModal } = useSupportModal();

  return (
    <button
      onClick={openModal}
      className="fixed bottom-24 right-4 z-40 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Support Us"
    >
      <Heart 
        size={24} 
        className="fill-current group-hover:scale-110 transition-transform"
      />
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Support Us
      </span>
    </button>
  );
};

export default SupportButton;