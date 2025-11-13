// src/components/payment/SupportButton.jsx
import React from 'react';
import { useSupportModal } from '../../hooks/useSupportModal';
import { Heart } from 'lucide-react';

const SupportButton = () => {
  const { openModal } = useSupportModal();

  return (
    <button
      onClick={openModal}
      className="fixed bottom-20 right-4 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
      aria-label="Support UCC Campus Guide"
    >
      <Heart className="h-4 w-4" />
    </button>
  );
};

export { SupportButton };
export default SupportButton;