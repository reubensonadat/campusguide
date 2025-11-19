// src/pages/Support.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { PaymentButton } from '../components/payment/PaymentButton';
import { Button } from '../components/common/Button';
import { Heart, Star, Users, Zap, Shield, Gift, CheckCircle, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  // Separate email states for different sections
  const [heroEmail, setHeroEmail] = useState('');
  const [tierEmails, setTierEmails] = useState({
    5: '',
    10: '',
    20: ''
  });
  const navigate = useNavigate();

  const supporterBenefits = [
    {
      icon: Star,
      title: 'Supporter Badge',
      description: 'Get a special badge in app header',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: Zap,
      title: 'Early Access',
      description: 'Be the first to try new features',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      icon: Shield,
      title: 'Ad-Free Experience',
      description: 'Enjoy the app without any interruptions',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      icon: Gift,
      title: 'Exclusive Content',
      description: 'Access premium guides and resources',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    }
  ];

  const supportTiers = [
    {
      amount: 5,
      title: 'Supporter',
      description: 'Show your appreciation',
      benefits: ['Supporter badge', 'Thank you message'],
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      amount: 10,
      title: 'Friend',
      description: 'Help us grow',
      benefits: ['Supporter badge', 'Early access to features'],
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-100',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700'
    },
    {
      amount: 20,
      title: 'Patron',
      description: 'Make a real impact',
      benefits: ['All benefits', 'Exclusive content', 'Priority support'],
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      iconBg: 'bg-purple-100',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const impact = [
    {
      label: 'Students Helped',
      value: '20,000+',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Guide Topics',
      value: '30+',
      icon: Star,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Free Forever',
      value: '100%',
      icon: Shield,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const testimonials = [
    {
      name: 'John Doe',
      title: 'Level 200 Student',
      initials: 'JD',
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
      quote: 'This app saved me so much time during registration. The step-by-step guides are amazing!'
    },
    {
      name: 'Sarah Appiah',
      title: 'Level 300 Student',
      initials: 'SA',
      color: 'bg-green-100',
      textColor: 'text-green-600',
      quote: 'The budget tracker helped me manage my finances better. I love how easy it is to use!'
    }
  ];

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    // You can add a success message or redirect here
    alert('Thank you for your support!');
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error.message}`);
  };

  const handleTierEmailChange = (amount, email) => {
    setTierEmails(prev => ({
      ...prev,
      [amount]: email
    }));
  };

  return (
    <div className="p-4 pb-24 bg-gray-50/50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-200 mb-6">
             <Sparkles size={12} /> Support Your Campus Guide
          </div>

          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
            <Heart size={40} className="text-white drop-shadow-md" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Keep This App <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              Free For Everyone
            </span>
          </h1>
          
          <p className="text-blue-100/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Help us keep this app free for all UCC students. Your support enables us to add new features and maintain the service.
          </p>
          
          <div className="max-w-sm mx-auto mb-6">
            <input
              type="email"
              value={heroEmail}
              onChange={(e) => setHeroEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white mb-4 bg-white/90 backdrop-blur-sm"
              placeholder="Enter your email address"
              required
            />
            <PaymentButton 
              amount={5} 
              email={heroEmail}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              disabled={!heroEmail}
              className="w-full bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <Heart size={20} /> Support Now - GH₵5
            </PaymentButton>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="bg-blue-800/40 backdrop-blur-md border border-white/30 text-white hover:bg-blue-800/60 px-8 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <ArrowRight size={20} /> Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/guide')}
              className="bg-blue-800/40 backdrop-blur-md border border-white/30 text-white hover:bg-blue-800/60 px-8 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Star size={20} /> View Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {impact.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={22} className={stat.color} />
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Supporter Benefits */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
            Supporter Benefits
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {supporterBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className={`p-5 rounded-2xl border ${benefit.border} ${benefit.bg} hover:shadow-md transition-all cursor-pointer group`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      <Icon size={24} className={benefit.color} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg mb-1 ${benefit.color}`}>{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Support Tiers */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Heart className="text-red-500 fill-red-500" size={20} />
            Choose Your Support Level
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {supportTiers.map((tier, index) => (
              <div key={index} className={`border-2 rounded-2xl p-5 ${tier.border} ${tier.bg} hover:shadow-md transition-all`}>
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 ${tier.iconBg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Heart size={32} className={tier.color} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">GH₵{tier.amount}</h3>
                  <h4 className={`font-bold text-lg mb-2 ${tier.color}`}>{tier.title}</h4>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                </div>
                <ul className="text-sm space-y-2 mb-5">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3">
                  <input
                    type="email"
                    value={tierEmails[tier.amount]}
                    onChange={(e) => handleTierEmailChange(tier.amount, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    placeholder="Enter your email"
                    required
                  />
                  <PaymentButton 
                    amount={tier.amount} 
                    email={tierEmails[tier.amount]}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                    disabled={!tierEmails[tier.amount]}
                    className={`w-full ${tier.buttonColor} text-white px-4 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2`}
                  >
                    <Heart size={18} /> Support GH₵{tier.amount}
                  </PaymentButton>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Users className="text-blue-500" size={20} />
            What Students Say
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-5 bg-gray-50 rounded-2xl hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center`}>
                    <span className={`font-bold ${testimonial.textColor}`}>{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;