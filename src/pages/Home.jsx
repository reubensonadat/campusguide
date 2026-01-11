import React, { useState } from 'react';
import { Card, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PaymentButton } from '../components/payment/PaymentButton';
import {
  BookOpen, Wrench, Heart, Users, MapPin, ArrowRight,
  TrendingUp, Shield, Zap, Star, ClipboardList, Map,
  CalendarDays, Wallet, Compass, Sparkles, Phone, Settings,
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const [supportEmail, setSupportEmail] = useState('');

  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    alert('Thank you for your support!');
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error.message}`);
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Student Guide',
      description: 'Comprehensive resources for your academic journey',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      action: () => navigate('/guide')
    },
    {
      icon: Wrench,
      title: 'Academic Tools',
      description: 'Timetable builder and GPA calculator',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
      action: () => navigate('/tools')
    },
    {
      icon: Users,
      title: 'Campus Life',
      description: 'Connect with support services and communities',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-100',
      action: () => navigate('/guide?topic=clubs-societies')
    }
  ];

  const quickActions = [
    {
      title: 'Course Registration',
      description: 'Portal guide & checklist',
      icon: ClipboardList,
      action: () => navigate('/guide?topic=course-registration'),
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Campus Map',
      description: 'Find locations easily',
      icon: Map,
      action: () => navigate('/guide?topic=campus-map'),
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      iconBg: 'bg-emerald-100'
    },
    {
      title: 'Timetable Builder',
      description: 'Organize your schedule',
      icon: CalendarDays,
      action: () => navigate('/tools'),
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      iconBg: 'bg-violet-100'
    },
    {
      title: 'Contact Directory',
      description: 'Key university contacts',
      icon: Phone,
      action: () => navigate('/guide?topic=contact-directory'),
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    },
    {
      title: 'Settings',
      description: 'App preferences',
      icon: Settings,
      action: () => navigate('/settings'),
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      iconBg: 'bg-gray-100'
    },
    {
      title: 'Report Issue',
      description: 'Help improve the app',
      icon: MessageCircle,
      action: () => navigate('/support'),
      color: 'text-red-600',
      bg: 'bg-red-50',
      iconBg: 'bg-red-100'
    }
  ];

  return (
    <div className="pb-24 bg-white min-h-screen font-sans transition-colors duration-300">

      {/* Hero Section - Clean & Professional */}
      <div className="bg-white border-b border-gray-100 pt-8 pb-12 px-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-6">
            <Sparkles size={12} /> Developed by Synapse Tech
          </div>
          {state.isSupporter && (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold uppercase tracking-widest ml-2 shadow-sm">
              <Star size={12} fill="currentColor" /> Supporter
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Your Essential <span className="text-indigo-600">Campus Companion</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Everything you need to navigate university life. From academic guides to essential tools, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => navigate('/guide')}
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
            >
              <BookOpen size={20} className="mr-2" /> Open Guide
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/tools')}
              className="border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1"
            >
              <Wrench size={20} className="mr-2" /> Open Tools
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* Quick Actions Grid */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" /> Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="group text-left p-4 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${action.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className={action.color} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{action.title}</h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{action.description}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </button>
              );
            })}
          </div>
        </section>

        {/* Features Overview */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" /> Features Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={feature.action}
                  className={`p-6 rounded-2xl border ${feature.border} ${feature.bg} text-left w-full transition-all hover:-translate-y-1 hover:shadow-md group`}
                >
                  <Icon className={`w-8 h-8 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className={`font-bold text-lg mb-2 ${feature.color}`}>{feature.title}</h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">{feature.description}</p>
                </button>
              );
            })}
          </div>
        </section>


        {/* Support CTA */}
        <section>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-center transition-colors duration-300">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4 fill-red-500" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Support This Project</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Help us keep the UCC Campus Guide free and updated for every student.
            </p>

            <div className="max-w-sm mx-auto space-y-4">
              <PaymentButton
                amount={5}
                email={supportEmail || "anonymous@uccguide.com"}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Support Now (GH₵5)
              </PaymentButton>
              <p className="text-xs text-gray-400">
                Issues or suggestions? Contact <a href="mailto:uccguide25@gmail.com" className="text-indigo-600 hover:underline">uccguide25@gmail.com</a>
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
