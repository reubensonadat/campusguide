// src/components/payment/SupportModal.jsx
import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { PaymentButton } from './PaymentButton';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Heart, Star, Crown, Gift, CheckCircle } from 'lucide-react';

const SupportModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [email, setEmail] = useState('');
  const [paymentResult, setPaymentResult] = useState(null);

  const supportPlans = [
    {
      id: 'coffee',
      name: 'Buy Me a Coffee',
      amount: 5,
      description: 'Show your appreciation with a small contribution',
      icon: <Heart className="h-5 w-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'supporter',
      name: 'Supporter',
      amount: 10,
      description: 'Get a special supporter badge in the app',
      icon: <Star className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'premium',
      name: 'Premium Supporter',
      amount: 25,
      description: 'Unlock exclusive features and priority support',
      icon: <Crown className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'patron',
      name: 'Campus Patron',
      amount: 50,
      description: 'Become a patron and help us grow',
      icon: <Gift className="h-5 w-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const handlePaymentSuccess = (result) => {
    // Create a clean result object without circular references
    const cleanResult = {
      status: result.status,
      reference: result.reference,
      transaction: result.transaction,
      message: result.message,
      planId: selectedPlan?.id,
      planName: selectedPlan?.name,
      amount: selectedPlan?.amount
    };
    
    setPaymentResult({
      success: true,
      data: cleanResult
    });
    
    // Save supporter status to localStorage
    const supporterData = {
      isSupporter: true,
      plan: selectedPlan.id,
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
    setSelectedPlan(null);
    setEmail('');
    setPaymentResult(null);
  };

  const closeModal = () => {
    resetModal();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Support UCC Campus Guide"
      size="lg"
    >
      <div className="space-y-6">
        {!paymentResult ? (
          <>
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Help us keep the UCC Campus Guide free and accessible to all students. 
                Your support enables us to add new features and maintain the app.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPlan?.id === plan.id 
                      ? 'ring-2 ring-indigo-500' 
                      : ''
                  }`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={plan.color}>
                        {plan.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        GH₵{plan.amount}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {plan.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedPlan && (
              <Card className={`${selectedPlan.bgColor} ${selectedPlan.borderColor}`}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {selectedPlan.icon}
                    <span className="ml-2">{selectedPlan.name} - GH₵{selectedPlan.amount}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <PaymentButton
                      amount={selectedPlan.amount}
                      email={email}
                      metadata={{
                        plan_id: selectedPlan.id,
                        plan_name: selectedPlan.name
                      }}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      disabled={!email}
                      className="w-full"
                    >
                      Support with {selectedPlan.name}
                    </PaymentButton>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card className={paymentResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
            <CardContent className="text-center py-8">
              {paymentResult.success ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Thank You for Your Support!
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
                    <span className="text-2xl text-red-600">!</span>
                  </div>
                  <h3 className="text-xl font-semibold text-red-900 mb-2">
                    Payment Failed
                  </h3>
                  <p className="text-red-700 mb-4">
                    {paymentResult.error}
                  </p>
                </>
              )}
              
              <div className="flex space-x-3 justify-center">
                <Button
                  onClick={resetModal}
                  variant="outline"
                >
                  {paymentResult.success ? 'Support Again' : 'Try Again'}
                </Button>
                <Button onClick={closeModal}>
                  {paymentResult.success ? 'Done' : 'Close'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Modal>
  );
};

export { SupportModal };
export default SupportModal;