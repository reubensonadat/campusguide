// src/services/paymentService.js

// Check if Paystack is available
const isPaystackAvailable = () => typeof window.PaystackPop !== 'undefined';

// Get the Paystack key from environment variables
const getPaystackKey = () => {
  // In production, use the live key
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_PAYSTACK_LIVE_KEY;
  }
  // In development, use the test key
  return import.meta.env.VITE_PAYSTACK_TEST_KEY;
};

// Load Paystack script dynamically
let isPaystackLoading = false;
export const loadPaystackScript = () => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }
    
    // Check if script is already loading
    if (isPaystackLoading) {
      // Poll for completion
      const checkInterval = setInterval(() => {
        if (window.PaystackPop) {
          clearInterval(checkInterval);
          resolve(window.PaystackPop);
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Paystack script loading timeout'));
      }, 10000);
      
      return;
    }
    
    // Set loading flag
    isPaystackLoading = true;
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onload = () => {
      isPaystackLoading = false;
      resolve(window.PaystackPop);
    };
    
    script.onerror = () => {
      isPaystackLoading = false;
      reject(new Error('Failed to load Paystack script'));
    };
    
    document.head.appendChild(script);
  });
};

// Real payment implementation
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

    // Load Paystack if not available
    await loadPaystackScript();
    
    if (!window.PaystackPop) {
      throw new Error('Paystack not available');
    }

    // Get the appropriate key based on environment
    const paystackKey = getPaystackKey();
    
    if (!paystackKey) {
      throw new Error('Paystack key not configured');
    }

    // Return a promise that resolves when payment is complete
    return new Promise((resolve, reject) => {
      // Create Paystack handler with proper callback setup
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: email,
        amount: amount * 100, // Convert to pesewas (cents)
        ref: reference,
        currency: 'GHS', // Ghana Cedis
        metadata: metadata,
        callback: function(response) {
          console.log('Paystack callback:', response);
          if (response.status === 'success') {
            resolve({
              status: 'success',
              reference: response.reference,
              transaction: response.transaction,
              message: 'Payment successful',
              metadata
            });
          } else {
            reject(new Error(response.message || 'Payment failed'));
          }
        },
        onClose: function() {
          console.log('Payment cancelled by user');
          reject(new Error('Payment cancelled by user'));
        }
      });

      // Open the payment iframe
      try {
        handler.openIframe();
      } catch (error) {
        console.error('Error opening Paystack iframe:', error);
        reject(new Error('Failed to open payment window'));
      }
    });
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

// Preload Paystack script
export const preloadPaystack = () => {
  if (!isPaystackAvailable()) {
    return loadPaystackScript();
  }
  return Promise.resolve();
};

// Verify payment status with Paystack API
export const verifyPayment = async (reference) => {
  try {
    // This should be done on your backend server for security
    // For demonstration, we're showing the client-side approach
    
    // Get the secret key (should be on server-side in production)
    const secretKey = import.meta.env.PROD 
      ? import.meta.env.VITE_PAYSTACK_LIVE_SECRET_KEY
      : import.meta.env.VITE_PAYSTACK_TEST_SECRET_KEY;
    
    if (!secretKey) {
      throw new Error('Paystack secret key not configured');
    }
    
    // Make API request to verify payment
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.status) {
      return {
        status: 'success',
        reference,
        verified: true,
        data: data.data
      };
    } else {
      return {
        status: 'failed',
        reference,
        verified: false,
        message: data.message
      };
    }
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