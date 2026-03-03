import React from 'react';
import { Card, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  BookOpen, Wrench, Users, MapPin, ArrowRight,
  TrendingUp, Shield, Zap, Star, ClipboardList, Map,
  CalendarDays, Wallet, Compass, Sparkles, Phone, Settings,
  MessageCircle, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();

  const features = [
    {
      icon: BookOpen,
      title: 'Student Guide',
      description: 'Comprehensive resources, rules, and tips for navigating your academic journey successfully.',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-100/50',
      action: () => navigate('/guide')
    },
    {
      icon: Wrench,
      title: 'Academic Tools',
      description: 'Build your timetable efficiently and calculate your GPA with our integrated tools.',
      color: 'text-violet-600',
      bg: 'bg-violet-50/50',
      border: 'border-violet-100/50',
      action: () => navigate('/tools')
    },
    {
      icon: Users,
      title: 'Campus Life',
      description: 'Connect with support services, find clubs, and explore campus communities.',
      color: 'text-pink-600',
      bg: 'bg-pink-50/50',
      border: 'border-pink-100/50',
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
      bg: 'bg-blue-50/80',
      iconBg: 'bg-blue-100/50'
    },
    {
      title: 'Campus Map',
      description: 'Find locations easily',
      icon: Map,
      action: () => navigate('/guide?topic=campus-map'),
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/80',
      iconBg: 'bg-emerald-100/50'
    },
    {
      title: 'Timetable Builder',
      description: 'Organize your schedule',
      icon: CalendarDays,
      action: () => navigate('/tools'),
      color: 'text-violet-600',
      bg: 'bg-violet-50/80',
      iconBg: 'bg-violet-100/50'
    },
    {
      title: 'Contact Directory',
      description: 'Key university contacts',
      icon: Phone,
      action: () => navigate('/guide?topic=contact-directory'),
      color: 'text-orange-600',
      bg: 'bg-orange-50/80',
      iconBg: 'bg-orange-100/50'
    },
    {
      title: 'Settings',
      description: 'App preferences',
      icon: Settings,
      action: () => navigate('/settings'),
      color: 'text-gray-600',
      bg: 'bg-gray-50/80',
      iconBg: 'bg-gray-100/50'
    },
    {
      title: 'Contact Us',
      description: 'Reach out for help or feedback',
      icon: MessageCircle,
      action: () => navigate('/contact'),
      color: 'text-red-600',
      bg: 'bg-red-50/80',
      iconBg: 'bg-red-100/50'
    }
  ];

  return (
    <div className="pb-24 bg-gray-50/30 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100/80 pt-16 pb-20 px-6 sm:pt-24 sm:pb-28">
        {/* Subtle Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/50 text-xs font-bold uppercase tracking-widest text-gray-600 mb-8 shadow-sm">
            <Sparkles size={14} className="text-indigo-500" /> Developed by Synapse Tech
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Your Essential <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-gradient-x">Campus Companion</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Everything you need to navigate university life seamlessly. Academic guides, essential tools, and campus maps all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              onClick={() => navigate('/guide')}
              className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 rounded-2xl font-bold shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_8px_40px_rgb(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-1 group flex items-center justify-center gap-2"
            >
              <BookOpen size={20} />
              <span>Open Guide</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/tools')}
              className="w-full sm:w-auto bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-1 shadow-sm flex items-center justify-center gap-2"
            >
              <Wrench size={20} className="text-gray-400" />
              <span>Open Tools</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20 relative z-20">

        {/* Bento Quick Actions Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quick Actions</h2>
            <Zap className="w-5 h-5 text-indigo-400 opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="group relative overflow-hidden text-left p-5 bg-white border border-gray-100 rounded-3xl hover:border-indigo-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-14 h-14 ${action.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon size={24} className={action.color} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{action.title}</h4>
                      <p className="text-sm text-gray-500 font-medium mt-0.5">{action.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                    <ArrowRight size={16} className={action.color} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Elegant Features Overview */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Explore the App</h2>
            <Compass className="w-5 h-5 text-indigo-400 opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={feature.action}
                  className={`relative overflow-hidden p-8 rounded-[2rem] bg-white border border-gray-100 text-left w-full hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 group`}
                >
                  {/* Subtle blur accent behind icon */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} rounded-full blur-3xl opacity-50 -mr-10 -mt-10 transition-opacity group-hover:opacity-100`}></div>

                  <div className={`w-16 h-16 rounded-2xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-bold text-xl mb-3 text-gray-900 relative z-10">{feature.title}</h3>
                  <p className="text-base text-gray-500 font-medium leading-relaxed relative z-10">{feature.description}</p>

                  <div className={`mt-8 flex items-center gap-2 font-bold text-sm ${feature.color} opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 relative z-10`}>
                    Explore <ArrowRight size={16} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>


      </div>
    </div>
  );
};

export default Home;
