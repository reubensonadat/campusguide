import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
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
  Sparkles,
  Star,
  ArrowRight
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
    email: '',
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
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const newLocal = "text-white bg-blue hover:bg-blue-700 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none";
  return (
    <div className="p-4 pb-24 bg-gray-50/30 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="mb-12 relative overflow-hidden bg-transparent cursor-default select-none">
        {/* Mobile: compact blue card (centered, consistent with Home page mobile style) */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden md:hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
              <MessageCircle size={40} className="text-white drop-shadow-md" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <Sparkles size={12} /> Get In Touch
            </div>

            <h1 className="text-3xl font-extrabold mb-4 tracking-tight leading-tight">
              Contact <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                Our Team
              </span>
            </h1>

            <p className="text-blue-100/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              We're here to help you succeed at UCC. Reach out with any questions or feedback.
            </p>

            <div className="flex flex-col gap-4 justify-center">
              <Button
                variant=""
                onClick={() => navigate('/')}
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
              >
                <ArrowRight size={20} /> Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/guide')}
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-3.5 rounded-xl font-bold backdrop-blur-sm transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Star size={20} /> View Guide
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop: two-column layout (text left, image right) */}
        <div className="relative z-10 hidden md:flex md:flex-row gap-12 items-center">

          {/* Text Content (Left on Desktop) */}
          <div className="flex-1 text-left text-gray-800 ml-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-widest text-blue-600 mb-6 ">
              <Sparkles size={12} /> Get In Touch
            </div>

            <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Contact <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Our Team
              </span>
            </h1>

            <p className="text-gray-600 text-lg mb-8 max-w-xl leading-relaxed">
              We're here to help you succeed at UCC. Reach out with any questions or feedback.
            </p>

            <div className="flex flex-row gap-4 justify-start">
              <Button
                variant=""
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white border hover:bg-blue-800 px-8 py-3.5 rounded-xl font-bold shadow-sm transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <ArrowRight size={20} /> Back to Home
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/guide')}
                className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-sm transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Star size={20} /> View Guide
              </Button>
            </div>
          </div>

          {/* Image (Right on Desktop) */}
          <div className="flex-1 flex justify-center py-4">
            <img src={headerImage} alt="Customer Support" className="w-full max-w-md object-contain drop-shadow-xl pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Unified Contact Section (Light Theme) */}
      <div className="mb-8 flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">

        {/* Left Side: Contact Information */}
        <div className="p-8 lg:p-12 lg:w-2/5 bg-gray-50/50 flex flex-col justify-center border-r border-gray-100">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Contact Information</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <MapPin className="text-blue-600" size={22} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Visit Us</h3>
                <p className="text-gray-600 text-base leading-relaxed">University of Cape Coast</p>
                <p className="text-gray-600 text-base leading-relaxed">Cape Coast, Ghana</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Mail className="text-blue-600" size={22} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Email Us</h3>
                <p className="text-gray-600 text-base leading-relaxed">[EMAIL_ADDRESS]</p>

              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Phone className="text-blue-600" size={22} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Call Us</h3>
                <p className="text-gray-600 text-base leading-relaxed">+233 (0) 244 987 654</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Send a Message Form */}
        <div className="p-8 lg:p-12 lg:w-3/5 bg-white">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-[calc(100%-4rem)]">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 shadow-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 shadow-sm"
                placeholder="your.name@stu.ucc.edu.gh"
                required
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 flex-1 min-h-[120px] resize-none shadow-sm"
                placeholder="How can we help you?"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-colors shadow-md flex justify-center items-center gap-2"
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Social Media */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Users className="text-blue-500" size={20} />
            Follow Us
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            Stay updated with the latest features and announcements
          </p>
          <div className="flex gap-4 justify-center">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <button
                  key={index}
                  onClick={() => window.open(social.url, '_blank')}
                  className={`w-14 h-14 ${social.color} ${social.hoverColor} text-white rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg`}
                >
                  <Icon size={24} />
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <MessageCircle className="text-blue-500" size={20} />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div key={index} className={`p-5 rounded-2xl border ${faq.border} ${faq.bg} hover:shadow-md transition-all`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <CheckCircle size={24} className={faq.color} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-2 ${faq.color}`}>{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
