import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Phone, Mail, MapPin, Send, ChevronDown, ArrowLeft } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import headerImage from '/call-center-cuate.png';

const FAQS = [
  {
    question: 'How do I suggest a new feature?',
    answer: 'You can submit suggestions directly on this page using the feedback form below, or visit the Feature Upvote Board on the Support page to vote on existing requests!'
  },
  {
    question: 'Is the Campus Guide app really free?',
    answer: 'Yes! The app is 100% free for all students. We do not display ads and rely entirely on student contributions and donations to pay database and server bills.'
  },
  {
    question: 'How does the offline Sync Service work?',
    answer: 'Your timetable and notes are saved locally first. When you connect to the internet, they sync automatically to our backend. You can find your unique App ID and Recovery PIN in settings to sync across devices (e.g. Android to iOS).'
  },
  {
    question: 'How do I edit my Student ID card details?',
    answer: 'Go to your Profile tab, click or tap directly on the Student ID pass card. An Edit Profile modal will open immediately where you can change your name, course, level, and avatar.'
  }
];

const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Feedback sent! Thank you for helping improve the Guide.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="pb-28 bg-white min-h-screen font-sans selection:bg-[#cce1eb] selection:text-gray-900">
      <div className="max-w-3xl mx-auto px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))] space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
        
        {/* Header matching Profile style */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Contact Support</h1>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5">We're here to help. Reach out with any questions or feedback.</p>
        </div>

        {/* Section 1: Support Channels */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Support Channels</h2>
          <div className="space-y-1">
            <a
              href="mailto:uccguide25@gmail.com"
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">Email Support</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">uccguide25@gmail.com</span>
                </div>
              </div>
              <ChevronDown size={16} className="-rotate-90 text-gray-300 group-hover:text-gray-950 transition-colors" />
            </a>

            <a
              href="tel:+233201534711"
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100">
                  <Phone size={18} className="text-purple-600" />
                </div>
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">Voice Call Support</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">+233 20 153 4711</span>
                </div>
              </div>
              <ChevronDown size={16} className="-rotate-90 text-gray-300 group-hover:text-gray-950 transition-colors" />
            </a>

            <div
              className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-0 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                  <MapPin size={18} className="text-emerald-600" />
                </div>
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">Location</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">University of Cape Coast, Ghana</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Section 2: Interactive FAQ Accordion */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Frequently Asked Questions</h2>
          <div className="space-y-1">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                  >
                    <span className="text-[14px] text-gray-900 font-bold pr-4 group-hover:text-primary-600 transition-colors">{faq.question}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      <p className="text-xs text-gray-500 leading-relaxed font-medium pl-1 pr-6">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Section 3: Send Feedback form */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Direct Suggestion Box</h2>
          <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100/50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-1 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-gray-900 placeholder:text-gray-300 font-semibold text-sm transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-1 block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-gray-900 placeholder:text-gray-300 font-semibold text-sm transition-all"
                  placeholder="e.g. 054 123 4567"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-1 block mb-1">What feature do you want developed next?</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-gray-900 placeholder:text-gray-300 font-semibold text-sm min-h-[100px] resize-none transition-all"
                  placeholder="Explain the feature idea and why it is useful..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gray-900 hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-[0.98] flex justify-center items-center gap-2 border-none cursor-pointer"
              >
                <Send size={14} /> Submit Suggestion
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
