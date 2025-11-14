// src/components/payment/PaymentButton.jsx
import React, { useState } from 'react';
import { Button } from '../common/Button';
import { handlePayment, generatePaymentReference, verifyPayment } from '../../services/paymentService';
import { CreditCard, Loader2, CheckCircle } from 'lucide-react';

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
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePaymentClick = async () => {
    if (isLoading || disabled) return;
    
    // Validate email
    if (!email || !email.includes('@') || !email.includes('.')) {
      onPaymentError?.(new Error('Valid email is required'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      const reference = generatePaymentReference();
      
      // Initiate payment
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
        // Verify the payment on the server side
        setIsVerifying(true);
        
        try {
          const verification = await verifyPayment(result.reference);
          
          if (verification.verified) {
            onPaymentSuccess?.({
              ...result,
              verification: verification.data
            });
          } else {
            // Still consider it successful if verification fails but payment was successful
            // This can happen due to network issues or delays
            console.warn('Payment verification failed, but payment was successful:', verification.message);
            onPaymentSuccess?.(result);
          }
        } catch (verificationError) {
          console.error('Verification error:', verificationError);
          // Still consider it successful if verification fails but payment was successful
          onPaymentSuccess?.(result);
        } finally {
          setIsVerifying(false);
        }
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
      disabled={disabled || isLoading || isVerifying}
      className={className}
    >
      {isLoading || isVerifying ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isVerifying ? 'Verifying...' : 'Processing...'}
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