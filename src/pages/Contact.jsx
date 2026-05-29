import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { toast } from 'react-hot-toast';
import PageHeader from '../components/common/PageHeader';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Clock,
  Users,
  Send,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import headerImage from '/call-center-cuate.png';


const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+233 20 153 4711'],
      action: 'tel:+233201534711',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['uccguide25@gmail.com'],
      action: 'mailto:uccguide25@gmail.com',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['No physical location currently available'],
      action: null,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Everyday 9:00 AM - 6:00 PM'],
      action: null,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    }
  ];

  const socialMedia = [
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://facebook.com/uccguide',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: 'https://twitter.com/uccguide',
      color: 'bg-sky-500',
      hoverColor: 'hover:bg-sky-600'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://instagram.com/uccguide',
      color: 'bg-pink-600',
      hoverColor: 'hover:bg-pink-700'
    }
  ];

  const faqs = [
    {
      question: 'How do I report a bug or suggest a feature?',
      answer: 'Send us an email at support@uccguide.com with details about the bug or feature suggestion.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      question: 'Is the app really free?',
      answer: 'Yes! The app is completely free for all UCC students. We rely on supporter donations to keep it running.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      question: 'How often is the app updated?',
      answer: 'We update the app regularly with new features and improved content based on student feedback.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      question: 'Can I contribute to the app?',
      answer: 'Yes! We welcome contributions. Contact us to learn how you can help improve the app.',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const newLocal = "text-white bg-blue hover:bg-blue-700 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none";
  return (
    <div className="pb-24 bg-gray-50/50 min-h-screen font-sans selection:bg-[#cce1eb] selection:text-[#002F45] transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6 px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))] md:px-8">

        <PageHeader
          title="Contact Support"
          subtitle="We're here to help. Reach out with any questions or feedback."
          right={
            <img src={headerImage} alt="Contact Support" className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl pointer-events-none" />
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Contact Information (Left Side) */}
          <div className="space-y-4">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-400 pl-2">Get in Touch</h2>
            
            <a href="mailto:uccguide25@gmail.com" className="block group">
              <Card className="border border-gray-100 shadow-sm bg-white rounded-[24px] overflow-hidden hover:border-[#6EABC6]/30 hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Email Support</h3>
                    <p className="text-gray-500 text-xs mt-0.5">uccguide25@gmail.com</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-600 ml-auto" />
                </CardContent>
              </Card>
            </a>

            <a href="tel:+233201534711" className="block group">
              <Card className="border border-gray-100 shadow-sm bg-white rounded-[24px] overflow-hidden hover:border-[#6EABC6]/30 hover:shadow-md transition-all">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Call Center</h3>
                    <p className="text-gray-500 text-xs mt-0.5">+233 20 153 4711</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-600 ml-auto" />
                </CardContent>
              </Card>
            </a>

            <Card className="border border-gray-100 shadow-sm bg-white rounded-[24px] overflow-hidden">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Location</h3>
                  <p className="text-gray-500 text-xs mt-0.5">University of Cape Coast, Ghana</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="space-y-4">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-400 pl-2">Send a Message</h2>
            
            <Card className="border border-gray-100 shadow-sm bg-white rounded-[24px] overflow-hidden">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] text-gray-900 placeholder:text-gray-400 placeholder:font-normal font-semibold text-sm transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] text-gray-900 placeholder:text-gray-400 placeholder:font-normal font-semibold text-sm transition-all"
                      placeholder="e.g. 054 123 4567"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1 block mb-1">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] text-gray-900 placeholder:text-gray-400 placeholder:font-normal font-semibold text-sm min-h-[120px] resize-none transition-all"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-[#002F45] hover:bg-[#001f2e] text-white font-black uppercase tracking-[0.15em] text-[12px] rounded-xl transition-all shadow-md active:scale-[0.98] flex justify-center items-center gap-2"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQs */}
        <div className="pt-4">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-400 pl-2 mb-4">Frequently Asked Questions</h2>
          <Card className="border border-gray-100 shadow-sm bg-white rounded-[24px] overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50/50 transition-colors">
                    <h3 className={`font-bold text-sm text-gray-900 mb-1.5`}>{faq.question}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Contact;
