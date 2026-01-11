// src/components/payment/SupportModal.jsx
import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { PaymentButton } from './PaymentButton';
import { Heart, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const SupportModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');
  const [paymentResult, setPaymentResult] = useState(null);
  const [showWhySupport, setShowWhySupport] = useState(false);

  const quickAmounts = [5, 10, 20, 50];

  const handlePaymentSuccess = (result) => {
    // Create a clean result object without circular references
    const cleanResult = {
      status: result.status,
      reference: result.reference,
      transaction: result.transaction,
      message: result.message,
      amount: customAmount || selectedAmount
    };

    setPaymentResult({
      success: true,
      data: cleanResult
    });

    // Save supporter status to localStorage
    const supporterData = {
      isSupporter: true,
      plan: 'supporter',
      paymentDate: new Date().toISOString(),
      reference: result.reference
    };
    localStorage.setItem('ucc_supporter_status', JSON.stringify(supporterData));

    // Call parent callback
    if (onPaymentSuccess) {
      onPaymentSuccess(cleanResult);
    }
  };

  const handlePaymentError = (error) => {
    setPaymentResult({
      success: false,
      error: error.message
    });
  };

  const resetModal = () => {
    setSelectedAmount(10);
    setCustomAmount('');
    setEmail('');
    setPaymentResult(null);
    setShowWhySupport(false);
  };

  const closeModal = () => {
    resetModal();
    onClose();
  };

  const getCurrentAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Support UCC Campus Guide"
      size="md"
    >
      <div className="space-y-5">
        {!paymentResult ? (
          <>
            {/* Header Message */}
            <div className="text-center pb-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                Help keep this guide <strong className="text-indigo-600">free</strong> and <strong className="text-indigo-600">ad-free</strong> for all students
              </p>
            </div>

            {/* Quick Amount Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose Amount (GH₵)
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-3 px-2 rounded-xl font-bold text-sm transition-all border-2 ${selectedAmount === amount && !customAmount
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-indigo-50/50'
                      }`}
                  >
                    ₵{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Or Enter Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  GH₵
                </span>
                <input
                  type="number"
                  min="5"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className={`w-full pl-14 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${customAmount && parseFloat(customAmount) < 5 ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                  placeholder="Enter amount (Min 5)"
                />
              </div>
              {customAmount && parseFloat(customAmount) < 5 && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                  Please enter at least GH₵ 5 to cover transaction fees.
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                For receipt and updates
              </p>
            </div>

            {/* Payment Button */}
            <PaymentButton
              amount={getCurrentAmount()}
              email={email || 'anonymous@uccguide.com'}
              metadata={{
                plan_id: 'supporter',
                plan_name: 'Supporter'
              }}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              disabled={!getCurrentAmount() || getCurrentAmount() < 5}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 fill-current" />
                Support with GH₵{getCurrentAmount()}
              </span>
            </PaymentButton>

            {/* Why Support Section - Collapsible */}
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={() => setShowWhySupport(!showWhySupport)}
                className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <span>Why support us?</span>
                {showWhySupport ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showWhySupport && (
                <ul className="mt-3 space-y-2 text-xs text-gray-600">
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Keep the app <strong className="text-indigo-700">ad-free</strong> for everyone</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Cover server costs and API fees</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Support development of new features</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Help other students access campus information</span>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          /* Payment Result */
          <div className={`rounded-2xl p-6 text-center ${paymentResult.success
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-red-50 border-2 border-red-200'
            }`}>
            {paymentResult.success ? (
              <>
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Thank You for Your Support! 🎉
                </h3>
                <p className="text-green-700 mb-4">
                  Your contribution helps us keep UCC Campus Guide free for all students.
                </p>
                <p className="text-sm text-green-600">
                  Transaction ID: {paymentResult.data.reference}
                </p>
              </>
            ) : (
              <>
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-red-600">!</span>
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-2">
                  Payment Failed
                </h3>
                <p className="text-red-700 mb-4">
                  {paymentResult.error}
                </p>
              </>
            )}

            <div className="flex gap-3 justify-center mt-6">
              {!paymentResult.success && (
                <Button
                  onClick={resetModal}
                  variant="outline"
                  className="border-2"
                >
                  Try Again
                </Button>
              )}
              <Button
                onClick={closeModal}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {paymentResult.success ? 'Done' : 'Close'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export { SupportModal };
export default SupportModal;