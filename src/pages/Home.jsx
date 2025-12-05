// src/pages/Home.jsx

import React, { useState } from 'react'; // <-- MODIFIED: Added useState import
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PaymentButton } from '../components/payment/PaymentButton';
import { 
  BookOpen, Wrench, Heart, Users, MapPin, ArrowRight, 
  TrendingUp, Shield, Zap, Star, ClipboardList, Map, 
  CalendarDays, Wallet, Compass, Sparkles 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // <-- NEW: State for the support email input
  const [supportEmail, setSupportEmail] = useState('');

  // <-- NEW: Handler for successful payments
  const handlePaymentSuccess = (result) => {
    console.log('Payment successful:', result);
    alert('Thank you for your support!');
    // You could redirect or show a more sophisticated success message here
  };

  // <-- NEW: Handler for failed payments
  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error.message}`);
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Guide',
      description: '30+ topics covering everything from registration to graduation',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: Wrench,
      title: 'Essential Tools',
      description: 'Timetable, Budget Tracker, GPA Calculator & Reminders',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      icon: MapPin,
      title: 'Campus Navigation',
      description: 'Interactive map with directions to key locations',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      icon: Users,
      title: 'Student Support',
      description: 'Connect with services and support networks',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    }
  ];

  const quickActions = [
    {
      title: 'Course Registration',
      description: 'Step-by-step portal guide',
      icon: ClipboardList,
      action: () => navigate('/guide/course-registration'),
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      iconBg: 'bg-indigo-100'
    },
    {
      title: 'Campus Map',
      description: 'Find your way around',
      icon: Map,
      action: () => navigate('/guide/campus-map'),
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      iconBg: 'bg-teal-100'
    },
    {
      title: 'Timetable Builder',
      description: 'Create your schedule',
      icon: CalendarDays,
      action: () => navigate('/tools'),
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      iconBg: 'bg-violet-100'
    },
    {
      title: 'Budget Tracker',
      description: 'Manage your finances',
      icon: Wallet,
      action: () => navigate('/tools'),
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      iconBg: 'bg-pink-100'
    }
  ];

  const stats = [
    {
      label: 'Active Students',
      value: '15,000+',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Guide Topics',
      value: '30+',
      icon: BookOpen,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Free Tools',
      value: '4',
      icon: Wrench,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Daily Updates',
      value: '100%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="p-4 pb-24 bg-gray-50/50 min-h-screen font-sans">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-200 mb-6">
             <Sparkles size={12} /> The Ultimate Companion
          </div>

          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
            <BookOpen size={40} className="text-white drop-shadow-md" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Welcome to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              UCC Campus Guide
            </span>
          </h1>
          
          <p className="text-blue-100/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Your complete companion for University of Cape Coast success. Navigate, calculate, and thrive.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/guide')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <Compass size={20} /> Explore Guide
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/tools')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <Wrench size={20} /> Use Tools
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
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

      {/* Features Section */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
            Everything You Need
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`p-5 rounded-2xl border ${feature.border} ${feature.bg} hover:shadow-md transition-all cursor-pointer group`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      <Icon size={24} className={feature.color} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg mb-1 ${feature.color}`}>{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Zap className="text-blue-500 fill-blue-500" size={20} />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="group text-left p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${action.iconBg || action.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon size={22} className={action.color} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{action.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                     <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-600" />
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Support Section */}
      <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-green-100/50 px-6 py-4">
          <CardTitle className="flex items-center gap-2 text-emerald-900 text-lg">
            <Heart size={20} className="fill-emerald-600 text-emerald-600" />
            Support Your Campus Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Shield size={56} className="text-emerald-600 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold text-emerald-900 mb-3">Keep This App Free</h3>
            <p className="text-emerald-700 max-w-lg mx-auto text-sm leading-relaxed font-medium">
              Help us maintain and improve this free resource for all UCC students. Your support helps pay for servers and updates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="text-center p-5 bg-white rounded-xl shadow-sm border border-green-100 hover:border-yellow-200 transition-colors">
              <Zap size={24} className="text-yellow-500 mx-auto mb-2 fill-yellow-500" />
              <h4 className="font-bold text-gray-900">Quick Support</h4>
              <span className="inline-block mt-2 px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full">GH₵5</span>
            </div>
            <div className="text-center p-5 bg-white rounded-xl shadow-md border-2 border-emerald-100 transform scale-105 z-10">
              <Star size={24} className="text-blue-500 mx-auto mb-2 fill-blue-500" />
              <h4 className="font-bold text-gray-900">Friend</h4>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">GH₵10</span>
            </div>
            <div className="text-center p-5 bg-white rounded-xl shadow-sm border border-green-100 hover:border-red-200 transition-colors">
              <Heart size={24} className="text-red-500 mx-auto mb-2 fill-red-500" />
              <h4 className="font-bold text-gray-900">Patron</h4>
              <span className="inline-block mt-2 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full">GH₵20</span>
            </div>
          </div>
          
          {/* <-- NEW: Email Input Field and Updated Payment Button */}
          <div className="flex flex-col sm:flex-col gap-4 justify-center items-center max-w-sm mx-auto">
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm"
              placeholder="Enter your email to support"
              required
            />
            <PaymentButton 
              amount={5} 
              email={supportEmail}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              disabled={!supportEmail}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
            >
             Support Now - GH₵5
            </PaymentButton>
            <Button 
              variant="outline" 
              onClick={() => navigate('/support')}
              className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold px-8 py-3.5 rounded-xl bg-white"
            >
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;