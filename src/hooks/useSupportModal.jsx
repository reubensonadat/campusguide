// src/hooks/useSupportModal.js
import { useContext } from 'react';
import { useAppContext } from '../context/AppContext';

export const useSupportModal = () => {
  const { state, actions } = useAppContext();
  
  const showModal = state.showSupportModal;
  
  const openModal = () => {
    actions.setShowSupportModal(true);
  };
  
  const closeModal = () => {
    actions.setShowSupportModal(false);
  };
  
  const handlePaymentSuccess = (paymentResult) => {
    // Handle successful payment
    console.log('Payment successful:', paymentResult);
    actions.setSupporterStatus(true);
    actions.showToast({
      message: 'Thank you for your support!',
      type: 'success'
    });
  };
  
  return {
    showModal,
    openModal,
    closeModal,
    handlePaymentSuccess
  };
};