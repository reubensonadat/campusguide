// src/hooks/useSupportModal.js
import { useContext } from 'react';
import { useAppContext } from '../context/AppContext';

export const useSupportModal = () => {
  const { state, actions } = useAppContext();
  
  const showModal = state?.showSupportModal || false;
  
  const openModal = () => {
    if (actions?.setShowSupportModal) {
      actions.setShowSupportModal(true);
    }
  };
  
  const closeModal = () => {
    if (actions?.setShowSupportModal) {
      actions.setShowSupportModal(false);
    }
  };
  
  const handlePaymentSuccess = (paymentResult) => {
    // Handle successful payment
    console.log('Payment successful:', paymentResult);
    
    // Save supporter status to localStorage
    const supporterData = {
      isSupporter: true,
      plan: paymentResult.planId || 'supporter',
      paymentDate: new Date().toISOString(),
      reference: paymentResult.reference
    };
    localStorage.setItem('ucc_supporter_status', JSON.stringify(supporterData));
    
    if (actions?.setSupporterStatus) {
      actions.setSupporterStatus(true);
    }
    
    if (actions?.showToast) {
      actions.showToast({
        message: 'Thank you for your support!',
        type: 'success'
      });
    }
  };
  
  return {
    showModal,
    openModal,
    closeModal,
    handlePaymentSuccess
  };
};