import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { PaymentButton } from '../components/payment/PaymentButton';
import { Button } from '../components/common/Button';
import { Heart, Star, Users, Zap, Shield, Gift, CheckCircle, MessageCircle, Bug, Lightbulb, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFeedbackModal } from '../hooks/useFeedbackModal';

import { LS_KEYS } from '../utils/constants';

const Support = () => {
  const [amount, setAmount] = useState(5);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { openModal: openFeedbackModal } = useFeedbackModal();

  // check if submitted
  const hasSubmittedFeedback = localStorage.getItem(LS_KEYS.FEEDBACK_SUBMITTED);
  const showFeedbackCard = !hasSubmittedFeedback;

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    alert('Thank you for your support!');
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error.message}`);
  };

  return (
    <div className="pb-24 bg-white min-h-screen font-sans transition-colors duration-300">

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-12 px-6 transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 shadow-sm">
            <Heart size={12} className="text-red-500 fill-red-500" /> Community Support
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Help Us Grow
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            We're dedicated to making campus life easier for every student. Your support and feedback help us keep this project alive and free.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Support / Donation Section */}
        <section className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Support the Project</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Servers, development tools, and maintenance cost money. If this guide has helped you save time or stress, consider buying us a coffee.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                {[5, 10, 20].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${amount === val ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'}`}
                  >
                    GH₵{val}
                  </button>
                ))}
              </div>

              <input
                type="email"
                placeholder="Your email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              />

              <PaymentButton
                amount={amount}
                email={email || 'anonymous@uccguide.com'}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
              >
                Donate GH₵{amount}
              </PaymentButton>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-3xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Why Support Us?
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 font-medium">Keep the app <strong className="text-indigo-700">Ad-Free</strong> for everyone.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 font-medium">Fund server costs and API fees.</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 font-medium">Support development of new features like the Timetable Builder.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Feedback & Contribution Section */}
        <section className="pt-8 border-t border-gray-100">
          <div className="grid md:grid-cols-3 gap-6">

            {/* Report Bug */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-sm transition-all group">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4 text-red-600 group-hover:scale-110 transition-transform">
                <Bug size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Report a Bug</h3>
              <p className="text-xs text-gray-500 mb-4 h-10">Found something broken? Let us know so we can fix it.</p>
              <a href="mailto:uccguide25@gmail.com?subject=Bug Report" className="text-sm font-bold text-red-600 hover:underline">Send Email →</a>
            </div>

            {/* Version 2 - Feedback Form */}
            {showFeedbackCard && (
              <div
                onClick={openFeedbackModal}
                className="bg-white p-6 rounded-2xl border-2 border-indigo-50 hover:border-indigo-500 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                  V2 BETA
                </div>
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Join V2 Beta</h3>
                <p className="text-xs text-gray-500 mb-4 h-10">Help us build the next version. Vote on features & get early access.</p>
                <span className="text-sm font-bold text-indigo-600 hover:underline">Take Survey →</span>
              </div>
            )}

            {/* General Contact */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all group">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-xs text-gray-500 mb-4 h-10">General inquiries, partnerships, or just to say hi.</p>
              <a href="mailto:uccguide25@gmail.com?subject=General Inquiry" className="text-sm font-bold text-blue-600 hover:underline block mb-2">uccguide25@gmail.com →</a>
            </div>

            {/* WhatsApp Chat */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-green-100 hover:shadow-sm transition-all group md:col-span-3">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-gray-900 mb-1">Chat on WhatsApp</h3>
                  <p className="text-sm text-gray-500">Instant answers and community updates.</p>
                </div>
                <a
                  href="https://wa.me/233201534711"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-green-200"
                >
                  Start Chat
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Support;
