import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PaymentButton } from '../components/payment/PaymentButton';
import { BookOpen, Wrench, Heart, Phone, Star, Users, Clock, MapPin, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Guide',
      description: '30+ topics covering everything from registration to graduation',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Wrench,
      title: 'Essential Tools',
      description: 'Timetable, Budget Tracker, GPA Calculator & Reminders',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: MapPin,
      title: 'Campus Navigation',
      description: 'Interactive map with directions to key locations',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Users,
      title: 'Student Support',
      description: 'Connect with services and support networks',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  const quickActions = [
    {
      title: 'Course Registration',
      description: 'Step-by-step registration guide',
      icon: '📝',
      action: () => navigate('/guide/course-registration')
    },
    {
      title: 'Campus Map',
      description: 'Find your way around campus',
      icon: '🗺️',
      action: () => navigate('/guide/campus-map')
    },
    {
      title: 'Timetable Builder',
      description: 'Create your class schedule',
      icon: '📅',
      action: () => navigate('/tools')
    },
    {
      title: 'Budget Tracker',
      description: 'Manage your finances',
      icon: '💰',
      action: () => navigate('/tools')
    }
  ];

  const stats = [
    {
      label: 'Active Students',
      value: '20,000+',
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
    <div className="p-4 pb-20">
      {/* Hero Section */}
      <div className="gradient-primary text-white rounded-2xl p-8 mb-6 shadow-strong">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-3">
            Welcome to UCC Campus Guide
          </h1>
          <p className="text-white/90 text-lg mb-6 max-w-md mx-auto">
            Your complete companion for University of Cape Coast success
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/guide')}
              className="bg-white text-primary-600 hover:bg-gray-100 px-6"
            >
              Explore Guide
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/tools')}
              className="bg-white text-primary-600 hover:bg-gray-100 px-6"
            >
              Use Tools
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center" style={{ backgroundColor: 'rgb(255 255 255)' }}>
              <CardContent className="pt-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={24} className={stat.color} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Section */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Everything You Need</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={28} className={feature.color} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="text-left p-4 bg-white border border-gray-200 rounded-xl hover:shadow-medium hover:border-primary-300 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{action.icon}</span>
                    <h4 className="font-semibold text-gray-900">{action.title}</h4>
                  </div>
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support Section */}
      <Card className="border-green-200 bg-green-50" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800 text-black">
            <Heart size={20} />
            Support Your Campus Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <Shield size={48} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Keep This App Free</h3>
            <p className="text-green-700 mb-6">
              Help us maintain and improve this free resource for all UCC students. Your support makes a real difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg">
              <Zap size={24} className="text-yellow-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Quick Support</h4>
              <p className="text-sm text-gray-600">GH₵5</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Star size={24} className="text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Friend</h4>
              <p className="text-sm text-gray-600">GH₵10</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Heart size={24} className="text-red-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Patron</h4>
              <p className="text-sm text-gray-600">GH₵20</p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <PaymentButton amount={5} />
            <Button variant="outline" onClick={() => navigate('/support')}>
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
