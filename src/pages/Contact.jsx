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
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+233 50 123 4567', '+233 30 123 4567'],
      action: 'tel:+233501234567'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@uccguide.com', 'info@uccguide.com'],
      action: 'mailto:support@uccguide.com'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['Student Services Center', 'University of Cape Coast'],
      action: null
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 8am - 5pm', 'Saturday: 9am - 1pm'],
      action: null
    }
  ];

  const socialMedia = [
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://facebook.com/uccguide ',
      color: 'bg-blue-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: 'https://twitter.com/uccguide ',
      color: 'bg-sky-500'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://instagram.com/uccguide ',
      color: 'bg-pink-600'
    }
  ];

  const faqs = [
    {
      question: 'How do I report a bug or suggest a feature?',
      answer: 'Send us an email at support@uccguide.com with details about the bug or feature suggestion.'
    },
    {
      question: 'Is the app really free?',
      answer: 'Yes! The app is completely free for all UCC students. We rely on supporter donations to keep it running.'
    },
    {
      question: 'How often is the app updated?',
      answer: 'We update the app regularly with new features and improved content based on student feedback.'
    },
    {
      question: 'Can I contribute to the app?',
      answer: 'Yes! We welcome contributions. Contact us to learn how you can help improve the app.'
    }
  ];

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-4 pb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h1>
        <p className="text-gray-600 text-lg">
          We're here to help you succeed at UCC
        </p>
      </div>

      {/* Contact Information */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon size={20} className="text-primary-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600">{detail}</p>
                    ))}
                    {info.action && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(info.action, '_blank')}
                        className="mt-2"
                      >
                        Contact
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle>Follow Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Stay updated with the latest features and announcements
          </p>
          <div className="flex gap-3 justify-center">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <button
                  key={index}
                  onClick={() => window.open(social.url, '_blank')}
                  className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity`}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={4}
                placeholder="How can we help you?"
                required
              />
            </div>
            <Button type="submit" className="w-full flex items-center gap-2">
              <Send size={16} />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle size={20} />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;