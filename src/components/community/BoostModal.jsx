import React, { useState } from 'react';
import { Zap, X, Check } from 'lucide-react';
import { PaymentButton } from '../payment/PaymentButton';

const BoostModal = ({ isOpen, onClose, listing, onBoostSuccess }) => {
  const [selectedOption, setSelectedOption] = useState('3days');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !listing) return null;

  const boostOptions = [
    {
      id: '3days',
      days: 3,
      price: 5,
      title: '3 Days Boost',
      description: 'Featured for 3 days',
      popular: false
    },
    {
      id: '7days',
      days: 7,
      price: 10,
      title: '7 Days Boost',
      description: 'Featured for 7 days',
      popular: true
    }
  ];

  const selectedBoostOption = boostOptions.find(option => option.id === selectedOption);

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    // Call the parent component's success handler
    onBoostSuccess(listing.id, selectedBoostOption.days, selectedBoostOption.price);
    setIsProcessing(false);
    onClose();
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl flex flex-col max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-900 px-2">Boost Your Listing</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 text-lg mb-1">{listing.item_name}</h3>
            <p className="text-gray-500 text-sm">GH₵{listing.price}</p>
          </div>

          <div className="space-y-3 mb-6">
            {boostOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedOption === option.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${option.popular ? 'ring-2 ring-amber-200 relative' : ''}`}
              >
                {option.popular && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900">{option.title}</h4>
                      {selectedOption === option.id && <Check size={16} className="text-primary-500" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    GH₵{option.price}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Zap size={20} className="text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 text-sm mb-1">How Boost Works</h4>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Your listing appears at the top of the thrift section</li>
                  <li>• Gets a "Featured" badge to stand out</li>
                  <li>• More visibility means more potential buyers</li>
                </ul>
              </div>
            </div>
          </div>

          <PaymentButton
            amount={selectedBoostOption.price}
            email=""
            metadata={{
              type: 'thrift_boost',
              listing_id: listing.id,
              days: selectedBoostOption.days
            }}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            className="w-full py-4 rounded-xl font-bold text-base bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Zap size={18} />
            {isProcessing ? 'Processing...' : `Boost for GH₵${selectedBoostOption.price}`}
          </PaymentButton>
        </div>
      </div>
    </div>
  );
};

export default BoostModal;