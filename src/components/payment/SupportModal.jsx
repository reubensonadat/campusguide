// src/components/payment/SupportModal.jsx
import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { PaymentButton } from './PaymentButton';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ParticleSphere from '../common/ParticleSphere';

const SupportModal = ({ isOpen: controlledIsOpen, onClose, onPaymentSuccess }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [modalContext, setModalContext] = useState('support');
  
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
  const supporterStatus = JSON.parse(localStorage.getItem('ucc_supporter_status') || '{}');
  const isSupporter = supporterStatus.isSupporter;
  
  const [name, setName] = useState(profile.name || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [email, setEmail] = useState(profile.email || '');
  const [paymentResult, setPaymentResult] = useState(null);
  const [showWhySupport, setShowWhySupport] = useState(false);

  React.useEffect(() => {
    const handleOpen = (e) => {
      setModalContext(e.detail?.context || 'premium');
      setSelectedAmount(e.detail?.context === 'support' ? 5 : 10);
      setInternalIsOpen(true);
    };
    window.addEventListener('open-upgrade-modal', handleOpen);
    return () => window.removeEventListener('open-upgrade-modal', handleOpen);
  }, []);

  const isOpen = controlledIsOpen || internalIsOpen;

  const quickAmounts = [5, 10, 15, 20];

  const handlePaymentSuccess = async (result) => {
    const amountPaid = parseFloat(customAmount || selectedAmount);
    let tier = 'bronze';
    if (amountPaid >= 50) tier = 'gold';
    else if (amountPaid >= 20) tier = 'silver';

    // Create a clean result object without circular references
    const cleanResult = {
      status: result.status,
      reference: result.reference,
      transaction: result.transaction,
      message: result.message,
      amount: amountPaid
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
      reference: result.reference,
      name: name || 'Anonymous Supporter',
      amount: amountPaid,
      tier: tier
    };
    localStorage.setItem('ucc_supporter_status', JSON.stringify(supporterData));

    // Save to database
    try {
      const userId = localStorage.getItem('ucc_user_id') || 'anonymous';
      await supabase.from('payments').insert({
        reference: result.reference,
        amount: amountPaid,
        currency: 'GHS',
        item_type: 'drink',
        item_id: tier,
        user_id: userId,
        user_name: name || 'Anonymous',
        user_phone: phone || '',
        metadata: { plan: 'supporter', email }
      });
    } catch (e) {
      console.error("Failed to record support payment in DB", e);
    }

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
    const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
    setName(profile.name || '');
    setPhone(profile.phone || '');
    setEmail(profile.email || '');
    setPaymentResult(null);
    setShowWhySupport(false);
  };

  const closeModal = () => {
    resetModal();
    setInternalIsOpen(false);
    if (onClose) onClose();
  };

  const getCurrentAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size="xl"
      noPadding
      className="!bg-white rounded-t-[28px] rounded-b-none sm:rounded-[28px] border-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] p-0 overflow-hidden"
      showCloseButton={false}
    >
      <div className="font-sans flex flex-col h-full">
        {/* Drag Handle Enclosure — only the pill is inside this */}
        <div className="w-full flex items-center justify-center py-3 flex-shrink-0 modal-drag-handle cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        {isSupporter ? (
          <div className="flex flex-col items-center pt-8 pb-4 px-2">
            <div className="w-24 h-24 mb-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fbbf24" className="w-full h-full drop-shadow-lg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              You are a Supporter!
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6 px-4 leading-relaxed max-w-sm">
              Thank you! Your contribution fuels the future of Campus Guide. We are incredibly grateful to have you backing our vision.
            </p>
            {supporterStatus.reference && (
              <div className="bg-gray-50 rounded-xl p-4 w-full mb-6 border border-gray-100 flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Transaction ID</span>
                <span className="text-sm font-mono font-medium text-gray-700">{supporterStatus.reference}</span>
              </div>
            )}
            <div className="flex w-full gap-3 mt-4 mb-2">
              <Button 
                variant="secondary"
                onClick={closeModal} 
                className="flex-1 !h-auto !py-3.5 !rounded-full !font-bold transition-colors"
              >
                Close
              </Button>
            </div>
          </div>
        ) : !paymentResult ? (
          <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
            {/* Desktop: two-column. Mobile: stacked */}

            {/* LEFT — Particle Sphere & Text */}
            <div className="sm:w-[45%] flex-shrink-0 flex flex-col border-b sm:border-b-0 sm:border-r border-gray-100 bg-gray-50/50">
              {/* Text above the sphere */}
              <div className="p-6 sm:p-8 pb-2 sm:pb-4 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
                  {modalContext === 'premium' ? 'Upgrade to Premium' : 'Back the Vision'}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto sm:mx-0">
                  {modalContext === 'premium'
                    ? 'Unlock exclusive features and support the platform.'
                    : 'Fund the map, the tools, and the future. We are building this for every student.'}
                </p>
              </div>

              {/* Sphere in its own space */}
              <div className="relative flex-1 min-h-[260px] sm:min-h-[320px] w-full flex items-center justify-center py-4">
                <div className="absolute inset-0">
                  <ParticleSphere
                    particlesCount={4000}
                    sphereColor="#1f2937"
                    speed={15}
                    smoothing={6}
                    scale={7.5}
                    particleScale={3}
                    cursorOn={true}
                    cursorRadiusUI={80}
                    cursorStrengthUI={8}
                    clickForce={5}
                    drag={false}
                    stopOnHover={false}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="flex flex-col flex-1 overflow-y-auto relative z-10 bg-white">
              <div className="p-6 sm:p-8 flex-1">
                {/* Gray Content Box */}
                <div className="bg-gray-100 rounded-2xl p-5 mb-5 shadow-sm">
                  {/* Amounts Grid */}
                  <div className="mb-5">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Select Amount</span>
                    <div className="grid grid-cols-4 gap-3 mt-3">
                      {quickAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount('');
                          }}
                          className={`py-2 rounded-xl text-sm font-bold transition-colors ${
                            selectedAmount === amount && !customAmount
                            ? 'bg-white shadow-sm text-gray-900 border border-gray-200'
                            : 'text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          ₵{amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="relative mb-5 mt-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                      GH₵
                    </span>
                    <input
                      type="number"
                      min="5"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow placeholder:font-normal placeholder-gray-400 text-sm shadow-sm"
                      placeholder="Custom Amount"
                      autoComplete="off"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="support_name_field"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow shadow-sm"
                      placeholder="Your Name (Optional)"
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="tel"
                        name="support_phone_field"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow shadow-sm"
                        placeholder="Phone (020...)"
                        autoComplete="off"
                      />
                      <input
                        type="email"
                        name="support_email_field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow shadow-sm"
                        placeholder="Email"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                {/* Secure note */}
                <div className="flex items-center justify-center gap-1.5 mb-3 text-[10px] font-medium text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Encrypted and secure</span>
                </div>
              </div>

              {/* Action Buttons — separated with gap, rounded-xl like inputs */}
              <div className="flex gap-4 px-6 sm:px-8 pb-6 pt-2 flex-shrink-0">
                <Button
                  variant="secondary"
                  onClick={closeModal}
                  className="flex-1 !h-auto !py-3.5 !rounded-xl !font-bold !bg-gray-100 hover:!bg-gray-200 !text-gray-700 transition-colors text-sm"
                >
                  Cancel
                </Button>
                
                <PaymentButton
                  amount={getCurrentAmount()}
                  email={email || 'anonymous@uccguide.com'}
                  metadata={{
                    plan_id: modalContext === 'premium' ? 'premium' : 'supporter',
                    plan_name: modalContext === 'premium' ? 'Premium' : 'Supporter',
                    supporterName: name,
                    supporterPhone: phone
                  }}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  disabled={!getCurrentAmount() || (modalContext === 'premium' ? getCurrentAmount() < 10 : getCurrentAmount() < 5)}
                  className="flex-1 !h-auto !py-3.5 !rounded-xl !font-semibold !bg-gray-900 hover:!bg-black !text-white transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {modalContext === 'premium' ? 'Unlock ₵' : 'Support ₵'}{getCurrentAmount()}
                </PaymentButton>
              </div>
            </div>

          </div>
        ) : (
          /* Payment Result */
          <div className="flex flex-col items-center pt-8 pb-4 px-2">
            {paymentResult.success ? (
              <>
                <div className="w-24 h-24 mb-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#86efac" className="w-full h-full drop-shadow-md">
                    <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-sm text-gray-500 text-center mb-8 px-4 leading-relaxed">
                  Transaction ID: {paymentResult.data.reference}
                </p>
                <div className="flex w-full gap-3 mt-4 mb-2">
                  <Button 
                    variant="secondary"
                    onClick={closeModal} 
                    className="flex-1 !h-auto !py-3.5 !rounded-full !font-bold transition-colors"
                  >
                    Done
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="w-24 h-24 mb-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fbbf24" className="w-full h-full drop-shadow-md">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  There is a problem
                </h3>
                <p className="text-sm text-gray-500 text-center mb-8 px-4 leading-relaxed">
                  {paymentResult.error || "Please ensure you are connected to the internet and try again."}
                </p>
                <div className="flex w-full gap-3 mt-4 mb-2">
                  <Button 
                    variant="secondary"
                    onClick={closeModal} 
                    className="flex-1 !h-auto !py-3.5 !rounded-full !font-bold transition-colors"
                  >
                    Close
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={resetModal} 
                    className="flex-1 !h-auto !py-3.5 !rounded-full !font-bold !bg-gray-900 hover:!bg-black transition-colors"
                  >
                    Try again
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export { SupportModal };
export default SupportModal;