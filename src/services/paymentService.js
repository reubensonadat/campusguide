// src/services/paymentService.js

// Check if Paystack is available
const isPaystackAvailable = () => typeof window.PaystackPop !== 'undefined';

// Load Paystack script dynamically
const loadPaystackScript = () => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js'; // Correct URL for Ghana
    script.async = true;
    
    script.onload = () => {
      resolve(window.PaystackPop);
    };
    
    script.onerror = () => {
      reject(new Error('Failed to load Paystack script'));
    };
    
    document.head.appendChild(script);
  });
};

// Mock payment for development
const mockPayment = ({ amount, email, reference, metadata }) => {
  console.log('Processing mock payment:', { amount, email, reference, metadata });
  
  return new Promise((resolve, reject) => {
    // Simulate payment processing
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({
          status: 'success',
          reference,
          transaction: `txn_${Date.now()}`,
          message: 'Payment successful (mock)',
          metadata
        });
      } else {
        reject(new Error('Payment failed (mock)'));
      }
    }, 2000);
  });
};

// Real payment for production
const realPayment = async ({ amount, email, reference, metadata }) => {
  try {
    // Load Paystack if not available
    await loadPaystackScript();
    
    if (!window.PaystackPop) {
      throw new Error('Paystack not available');
    }

    // Create Paystack handler
    const handler = window.PaystackPop.setup({
      key: 'pk_test_1409f64b8fe6b58765066f52d5fba38c786e828b', // Using your test key
      email: email,
      amount: amount * 100, // Convert to pesewas (cents)
      ref: reference,
      currency: 'GHS', // Ghana Cedis
      metadata: metadata,
      callback: function(response) {
        console.log('Paystack callback:', response);
        if (response.status === 'success') {
          return {
            status: 'success',
            reference: response.reference,
            transaction: response.transaction,
            message: 'Payment successful',
            metadata
          };
        } else {
          throw new Error(response.message || 'Payment failed');
        }
      },
      onClose: function() {
        console.log('Payment cancelled by user');
        throw new Error('Payment cancelled');
      }
    });

    return new Promise((resolve, reject) => {
      // Override callback to handle promise
      const originalCallback = handler.options.callback;
      handler.options.callback = function(response) {
        try {
          const result = originalCallback(response);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      
      const originalOnClose = handler.options.onClose;
      handler.options.onClose = function() {
        originalOnClose();
        reject(new Error('Payment cancelled'));
      };
      
      handler.openIframe();
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// Main payment handler function
export const handlePayment = async ({ amount, email, reference, metadata }) => {
  try {
    // Validate inputs
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount');
    }
    
    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      throw new Error('Valid email is required');
    }
    
    if (!reference) {
      throw new Error('Payment reference is required');
    }

    // Use mock for development, real for production
    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
      return mockPayment({ amount, email, reference, metadata });
    } else {
      return realPayment({ amount, email, reference, metadata });
    }
  } catch (error) {
    console.error('Payment error:', error);
    return Promise.reject(error);
  }
};

// Generate unique payment reference
export const generatePaymentReference = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `UCC_${timestamp}_${random}`;
};

// Verify payment status (for server-side verification)
export const verifyPayment = async (reference) => {
  try {
    // In a real app, this would call your backend
    // For now, return mock verification
    if (import.meta.env.DEV) {
      return {
        status: 'success',
        reference,
        verified: true
      };
    }
    
    // Real verification would look like:
    // const response = await fetch(`/api/verify-payment/${reference}`);
    // return response.json();
    
    return {
      status: 'pending',
      reference,
      verified: false
    };
  } catch (error) {
    console.error('Verification error:', error);
    return {
      status: 'error',
      reference,
      verified: false,
      error: error.message
    };
  }
};