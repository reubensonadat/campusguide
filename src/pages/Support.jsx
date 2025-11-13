import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { PaymentButton } from '../components/payment/PaymentButton';
import { Heart, Star, Users, Zap, Shield, Gift, CheckCircle, TrendingUp } from 'lucide-react';

const Support = () => {
  const supporterBenefits = [
    {
      icon: Star,
      title: 'Supporter Badge',
      description: 'Get a special badge in app header'
    },
    {
      icon: Zap,
      title: 'Early Access',
      description: 'Be the first to try new features'
    },
    {
      icon: Shield,
      title: 'Ad-Free Experience',
      description: 'Enjoy the app without any interruptions'
    },
    {
      icon: Gift,
      title: 'Exclusive Content',
      description: 'Access premium guides and resources'
    }
  ];

  const supportTiers = [
    {
      amount: 5,
      title: 'Supporter',
      description: 'Show your appreciation',
      benefits: ['Supporter badge', 'Thank you message'],
      color: 'border-blue-200 bg-blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      amount: 10,
      title: 'Friend',
      description: 'Help us grow',
      benefits: ['Supporter badge', 'Early access to features'],
      color: 'border-green-200 bg-green-50',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      amount: 20,
      title: 'Patron',
      description: 'Make a real impact',
      benefits: ['All benefits', 'Exclusive content', 'Priority support'],
      color: 'border-purple-200 bg-purple-50',
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

  return (
    <div className="p-4 pb-20">
      {/* Hero Section */}
      <div className="gradient-accent text-white rounded-2xl p-8 mb-6 shadow-strong">
        <div className="text-center">
          <Heart size={48} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">Support UCC Campus Guide</h1>
          <p className="text-white/90 text-lg mb-6 max-w-md mx-auto">
            Help us keep this app free for all UCC students. Your support enables us to add new features and maintain the service.
          </p>
          <PaymentButton amount={5} customText="Support Now" />
        </div>
      </div>

      {/* Impact Section */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {impact.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Every contribution, no matter the size, makes a difference in students' lives.
          </p>
        </CardContent>
      </Card>

      {/* Supporter Benefits */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Supporter Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supporterBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <Icon size={20} className="text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Support Tiers */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Choose Your Support Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportTiers.map((tier, index) => (
              <div key={index} className={`border-2 rounded-xl p-4 ${tier.color}`}>
                <h3 className="text-xl font-bold text-center mb-1">GH₵{tier.amount}</h3>
                <h4 className="font-semibold text-center mb-3">{tier.title}</h4>
                <p className="text-sm text-gray-600 text-center mb-4">{tier.description}</p>
                <ul className="text-sm space-y-2 mb-4">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <PaymentButton amount={tier.amount} customText={`Support GH₵${tier.amount}`} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">What Students Say</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-600">Level 200 Student</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "This app saved me so much time during registration. The step-by-step guides are amazing!"
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">SA</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Appiah</h4>
                  <p className="text-sm text-gray-600">Level 300 Student</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "The budget tracker helped me manage my finances better. I love how easy it is to use!"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;