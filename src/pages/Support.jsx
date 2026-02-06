import React, { useState, useEffect } from 'react';
import { PaymentButton } from '../components/payment/PaymentButton';
import { useCampus } from '../context/CampusContext';
import { fetchSupporters } from '../utils/googleSheets';
import { useFeedbackModal } from '../hooks/useFeedbackModal';
import { LS_KEYS } from '../utils/constants';
import {
  Heart,
  Trophy,
  MessageCircle,
  Bug,
  Mail,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const GOOGLE_SCRIPT_URL = ''; // TODO: Add your Google Apps Script Web App URL here

const Support = () => {
  const { selectedCampus } = useCampus();
  const { openModal: openFeedbackModal } = useFeedbackModal();
  const [supporters, setSupporters] = useState([]);
  const [amount, setAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoadingSupporters, setIsLoadingSupporters] = useState(true);

  // check if submitted
  const hasSubmittedFeedback = localStorage.getItem(LS_KEYS.FEEDBACK_SUBMITTED);
  const showFeedbackCard = !hasSubmittedFeedback;

  useEffect(() => {
    const loadSupporters = async () => {
      setIsLoadingSupporters(true);
      const data = await fetchSupporters(GOOGLE_SCRIPT_URL);
      setSupporters(data);
      setIsLoadingSupporters(false);
    };
    loadSupporters();
  }, []);

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(val)) {
      setAmount(parseFloat(val));
    }
  };

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    alert('Thank you for your support! You will appear on the leaderboard shortly.');
  };

  const handlePaymentError = (error) => {
    alert(`Payment failed: ${error.message}`);
  };

  return (
    <div className="pb-24 bg-gray-50/50 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Header - Clean & Simple */}
      <div className="pt-16 pb-12 px-6 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
          <Heart size={12} className="text-red-500 fill-red-500" /> Community Support
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
          Help Us Grow
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed font-medium">
          We're dedicated to making campus life easier. Your support and feedback help us keep this project alive and free for everyone.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-12">

        {/* Main Split: Donation & Leaderboard/Benefits */}
        <section className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Support Form */}
          <div className="lg:col-span-7 space-y-8">

            {/* Support The Project Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Support the Project
              </h2>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Servers, development tools, and maintenance cost money. If this guide has helped you, consider support us.
              </p>

              <div className="space-y-6">
                {/* Amount Selectors */}
                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 20].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleAmountSelect(val)}
                      className={`py-4 rounded-xl font-bold text-base transition-all border
                                    ${amount === val && !customAmount
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white'}`}
                    >
                      GH₵{val}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">GH₵</span>
                  <input
                    type="number"
                    placeholder="Other Amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl font-bold text-gray-900 transition-all outline-none text-sm placeholder:font-medium"
                  />
                </div>

                {/* Inputs */}
                <div className="space-y-3 pt-2">
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name (Optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3.5 bg-gray-50 border border-gray-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl text-sm transition-all outline-none placeholder:text-gray-400 font-medium"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3.5 bg-gray-50 border border-gray-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl text-sm transition-all outline-none placeholder:text-gray-400 font-medium"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email (Optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3.5 bg-gray-50 border border-gray-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl text-sm transition-all outline-none placeholder:text-gray-400 font-medium"
                  />
                  <textarea
                    placeholder="Message (Optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 bg-gray-50 border border-gray-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl text-sm transition-all outline-none h-20 resize-none placeholder:text-gray-400 font-medium"
                  />
                </div>

                {/* Action Button */}
                <PaymentButton
                  amount={amount}
                  email={email || 'supporter@campusguide.com'}
                  metadata={{
                    campusPrefix: selectedCampus?.transactionPrefix || 'UCC',
                    supporterName: name,
                    supporterPhone: phone,
                    supporterMessage: message
                  }}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  className="w-full py-4 text-base bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Donate GH₵{amount}</span>
                </PaymentButton>
              </div>
            </div>

            {/* Recent Supporters (Clean List) */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Trophy size={16} className="text-amber-500" /> Recent Supporters
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Leaderboard</span>
              </div>

              {isLoadingSupporters ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="flex gap-4"><div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div><div className="flex-1 space-y-2"><div className="h-3 w-1/3 bg-gray-100 rounded animate-pulse"></div><div className="h-2 w-1/2 bg-gray-100 rounded animate-pulse"></div></div></div>)}
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {supporters.map((supporter, idx) => (
                    <div key={idx} className="p-4 px-6 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-50 to-white border border-gray-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        {supporter.name ? supporter.name[0] : 'S'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <p className="font-bold text-gray-900 truncate text-sm">{supporter.name || 'Anonymous'}</p>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">GH₵{supporter.amount}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{supporter.message}</p>
                      </div>
                    </div>
                  ))}
                  {supporters.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                        <Heart size={20} />
                      </div>
                      <p className="text-gray-400 text-sm font-medium">Be the first to support us!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Cards (Why Support, Beta, Contact) */}
          <div className="lg:col-span-5 space-y-5">

            {/* Why Support Us Card - Premium Gradient */}
            <div className="bg-gradient-to-b from-indigo-50 to-white p-6 md:p-8 rounded-3xl border border-indigo-100/50 shadow-sm">
              <div className="flex items-center gap-2.5 mb-6">
                <Star className="text-amber-400 fill-amber-400" size={20} />
                <h3 className="font-bold text-gray-900 text-base">Why Support Us?</h3>
              </div>
              <div className="space-y-5">
                {[
                  { title: 'Ad-Free Experience', desc: 'No annoying popups or banners.' },
                  { title: 'Server Costs', desc: 'Keeps the guide running 24/7.' },
                  { title: 'New Features', desc: 'Funds tools like Timetable Builder.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3.5">
                    <CheckCircle className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Join V2 Beta Card */}
            {showFeedbackCard && (
              <div onClick={openFeedbackModal} className="group bg-white p-5 rounded-3xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl">V2 BETA</div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">Join V2 Beta</h3>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">Vote on features & get early access.</p>
                    <span className="text-indigo-600 font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">Take Survey <ArrowRight size={14} /></span>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Us Card */}
            <div className="group bg-white p-5 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shrink-0">
                  <Mail size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Contact Us</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">General inquiries & partnerships.</p>
                  <a href="mailto:uccguide25@gmail.com" className="text-blue-600 font-bold text-xs flex items-center gap-1 hover:underline truncate">uccguide25@gmail.com</a>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-500/10 transition-all text-center group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3 text-green-600 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">Chat on WhatsApp</h3>
                <p className="text-xs text-gray-500 mb-4">Instant answers & updates.</p>
                <a href="https://wa.me/233201534711" target="_blank" rel="noreferrer" className="block w-full py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95">Start Chat</a>
              </div>
            </div>

            {/* Report Bug (Mini) */}
            <div className="text-center pt-2">
              <a href="mailto:uccguide25@gmail.com?subject=Bug Report" className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors">
                <Bug size={12} /> Report a Bug
              </a>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Support;
