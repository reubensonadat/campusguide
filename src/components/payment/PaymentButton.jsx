// src/components/payment/PaymentButton.jsx
import React, { useState } from 'react';
import { Button } from '../common/Button';
import { handlePayment, generatePaymentReference } from '../../services/paymentService';
import { CreditCard, Loader2 } from 'lucide-react';

const PaymentButton = ({ 
  amount, 
  email, 
  metadata = {}, 
  onPaymentSuccess, 
  onPaymentError, 
  className = '',
  disabled = false,
  children = 'Support UCC Campus Guide'
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentClick = async () => {
    if (isLoading || disabled) return;

    setIsLoading(true);
    
    try {
      const reference = generatePaymentReference();
      
      const result = await handlePayment({
        amount,
        email,
        reference,
        metadata: {
          ...metadata,
          app_name: 'UCC Campus Guide',
          timestamp: new Date().toISOString()
        }
      });

      if (result.status === 'success') {
        onPaymentSuccess?.(result);
      } else {
        throw new Error(result.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePaymentClick}
      disabled={disabled || isLoading}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          {children}
        </>
      )}
    </Button>
  );
};

export { PaymentButton };
export default PaymentButton;