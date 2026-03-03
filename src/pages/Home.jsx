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

// new import for the illustration
import CampusIllustration from '../images/college campus-rafiki.svg';

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

      {/* Premium Hero Section (layout updated for tighter spacing + mobile blue card) */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100/80 py-8 px-4 sm:py-12 sm:px-6 min-h-[50vh]">
        {/* Subtle Background Gradients (unchanged) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto z-10">
          {/* Mobile: compact blue card (left-aligned, 60% height) */}
          <div className="lg:hidden">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-700 to-indigo-600 p-6 text-white flex flex-col justify-between text-left h-[60vh]">
              <div>
                <h1 className="text-3xl font-extrabold leading-tight tracking-tight">
                  <span className="block">Your Essential</span>
                  <span className="block font-black text-indigo-100">Campus Companion</span>
                </h1>

                <p className="mt-4 text-base text-indigo-100/90 max-w-[28rem] font-medium">
                  Navigate university life with ease. Access course registration, campus maps, and academic tools all in one centralized hub designed for student success.
                </p>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => navigate('/guide')}
                  className="flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold shadow-sm border border-white/20"
                >
                  <BookOpen size={16} /> Open Guide
                </button>

                <button
                  onClick={() => navigate('/tools')}
                  className="flex items-center gap-2 border border-white/30 text-white px-4 py-2 rounded-lg font-semibold bg-white/5"
                >
                  <Wrench size={16} /> Open Tools
                </button>
              </div>
            </div>
          </div>

          {/* Desktop / large screens: two-column layout (text left, illustration right) */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
            <div className="col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/50 text-xs font-bold uppercase tracking-widest text-gray-600 mb-6 shadow-sm">
                <Sparkles size={14} className="text-indigo-500" /> Built by Synapse Tech
                {state.isSupporter && (
                  <span className="ml-2 pl-2 border-l border-gray-300 gap-1 flex items-center text-amber-500">
                    <Star size={12} fill="currentColor" /> Supporter
                  </span>
                )}
              </div>

              <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                Your Essential <span className="block lg:inline bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600">Campus Companion</span>
              </h1>

              <p className="text-lg text-gray-500 mb-6 max-w-xl font-medium">
                Navigate campus life with clear guides, essential tools, and quick access to services — all in a compact, easy-to-use hub.
              </p>

              <div className="flex items-center gap-4">
                <Button
                  variant="primary"
                  onClick={() => navigate('/guide')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-soft btn-hover flex items-center gap-3"
                >
                  <BookOpen size={18} /> Open Guide
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate('/tools')}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-2xl font-semibold shadow-sm flex items-center gap-3"
                >
                  <Wrench size={18} className="text-gray-400" /> Open Tools
                </Button>
              </div>
            </div>

            <div className="col-span-5 flex items-center justify-end">
              <div className="relative w-full max-w-lg -mr-6">
                <img
                  src={CampusIllustration}
                  alt="Campus illustration"
                  className="w-full h-auto object-contain drop-shadow-lg"
                  style={{ WebkitTransform: 'translateZ(0)' }}
                />
                <div className="pointer-events-none absolute inset-0 rounded-lg" aria-hidden="true"></div>
              </div>
            </div>
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
