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

const Contact = () => {
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

  return (
    <div className="p-4 pb-24 bg-gray-50/50 min-h-screen font-sans transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-200 mb-6">
            <Sparkles size={12} /> Get In Touch
          </div>

          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
            <MessageCircle size={40} className="text-white drop-shadow-md" />
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Contact <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              Our Team
            </span>
          </h1>

          <p className="text-blue-100/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            We're here to help you succeed at UCC. Reach out with any questions or feedback.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <ArrowRight size={20} /> Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/guide')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <Star size={20} /> View Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Phone className="text-blue-500" size={20} />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className={`p-5 rounded-2xl border ${info.border} ${info.bg} hover:shadow-md transition-all`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <Icon size={24} className={info.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-2 ${info.color}`}>{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm leading-relaxed font-medium mb-1">{detail}</p>
                      ))}
                      {info.action && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(info.action, '_blank')}
                          className={`mt-3 ${info.color} ${info.border} bg-white`}
                        >
                          Contact
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

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

      {/* Contact Form */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Send className="text-blue-500" size={20} />
            Send us a Message
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                rows={4}
                placeholder="How can we help you?"
                required
              />
            </div>
            <Button type="submit" className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold">
              <Send size={16} />
              Send Message
            </Button>
          </form>
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
