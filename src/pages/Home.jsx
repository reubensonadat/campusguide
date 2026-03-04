import React from 'react';
import { Card, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  BookOpen, Wrench, Users, MapPin, ArrowRight,
  TrendingUp, Zap, Star, ClipboardList, Map,
  CalendarDays, Wallet, Compass, Sparkles, Phone, Settings,
  MessageCircle, Heart, SettingsIcon,
  WrenchIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PaymentButton } from '../components/payment/PaymentButton'; // <-- fixed import (closing quote)

// new import for the illustration
import CampusIllustration from '/college-campus-rafiki.svg';

const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { state } = useAppContext();

  const supportEmail = state?.supportEmail || 'anonymous@uccguide.com';
  const handlePaymentSuccess = (result) => {
    console.log('Payment success', result);
    alert('Thank you for your support!');
    // add your success handling (toast/navigation) here
  };
  const handlePaymentError = (error) => {
    console.error('Payment error', error);
    alert(`Payment failed: ${error.message}`);
    // add your error handling here
  };

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
      title: 'Community Life',
      description: 'Connect with support services, find clubs, and explore campus communities.',
      color: 'text-pink-600',
      bg: 'bg-pink-50/50',
      border: 'border-pink-100/50',
      action: () => navigate('/community')
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
    <div className="pb-24 bg-gray-50/30 dark:bg-[#0b0d12] min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">

      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-[#0f1117] border-b border-gray-100/80 dark:border-gray-800/50 py-8 px-4 sm:py-12 sm:px-6 min-h-[50vh]">
        {/* Subtle Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 dark:bg-indigo-900/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-violet-200 dark:bg-violet-900/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 dark:bg-pink-900/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto z-10">
          {/* Mobile: compact blue card */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden lg:hidden dark:from-[#1a1d27] dark:via-[#15171f] dark:to-[#0f1117] border dark:border-white/5">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
                <BookOpen size={40} className="text-white drop-shadow-md" />
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                Your Essential <br />
                <span className="text-indigo-400 dark:text-accent-400">Campus Companion</span>
              </h1>
              <p className="text-indigo-50/80 text-lg mb-8 max-w-sm mx-auto font-medium">
                Navigate campus life with clear guides and essential tools - all in one place.
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => navigate('/guide')}
                  className="bg-white text-gray-900 hover:bg-white/90 font-bold py-4 rounded-xl shadow-lg border-none"
                >
                  Open Guide
                </Button>
                <Button
                  onClick={() => navigate('/tools')}
                  className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-bold py-4 rounded-xl border border-white/20"
                >
                  Explore Tools
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Hero */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-fade-in order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-gray-800/40 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-bold mb-6 border border-indigo-100 dark:border-gray-700 shadow-sm transition-all hover:scale-105">
                <Sparkles size={16} />
                <span>Built by Synapse Tech</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-gray-950 dark:text-white mb-6 leading-tight tracking-tight">
                Your Essential <br />
                <span className="text-indigo-600 dark:text-accent-500">Campus</span> Companion
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-xl md:text-2xl mb-10 max-w-xl leading-relaxed font-medium">
                Navigate campus life with clear guides, essential tools, and quick access to services — all in a compact, easy-to-use hub.
              </p>

              <div className="flex items-center gap-6">
                <Button
                  onClick={() => navigate('/guide')}
                  className="bg-indigo-600 dark:bg-accent-500 text-white hover:opacity-90 font-black px-10 py-5 rounded-2xl shadow-xl transition-all hover:-translate-y-1 block border-none text-lg"
                >
                  Open Guide
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/tools')}
                  className="bg-white dark:bg-transparent border-2 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40 px-10 py-5 rounded-2xl font-black transition-all hover:-translate-y-1 text-lg shadow-sm"
                >
                  <Wrench size={20} className="mr-2" /> Open Tools
                </Button>
              </div>
            </div>

            <div className="relative animate-float order-2 flex justify-end">
              <div className="absolute -inset-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50"></div>
              <img
                src={CampusIllustration}
                alt="Campus"
                className="relative w-full max-w-lg z-10 drop-shadow-2xl dark:brightness-90 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20 relative z-20">

        {/* Bento Quick Actions Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Quick Actions</h2>
            <Zap className="w-5 h-5 text-indigo-400 opacity-50" />
          </div>

          <div className="grid grid-cols-1 gap-4 text-gray-800 dark:text-gray-100">
            <div
              className="grid grid-cols-1 gap-4 lg:flex lg:gap-6 lg:py-2 lg:px-2 snap-x snap-mandatory lg:overflow-x-auto hide-scrollbar"
            >
              {[...quickActions, ...quickActions].map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="group relative overflow-hidden text-left p-5 bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 rounded-3xl hover:border-indigo-100 dark:hover:border-indigo-900 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex items-center justify-between lg:flex-none snap-start"
                    style={{ minWidth: 'min(24rem, calc((100vw - 96px) / 4))' }}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-14 h-14 ${action.bg} dark:bg-gray-800/80 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon size={24} className={action.color} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-base">{action.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">{action.description}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                      <ArrowRight size={16} className={action.color} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Elegant Features Overview */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Explore the App</h2>
            <Compass className="w-5 h-5 text-indigo-400 opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={index}
                  onClick={feature.action}
                  className={`relative overflow-hidden p-8 rounded-[2rem] bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-gray-800 text-left w-full hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 group`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 transition-opacity group-hover:opacity-100`}></div>

                  <div className={`w-16 h-16 rounded-2xl ${feature.bg} dark:bg-gray-800/80 border ${feature.border} dark:border-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white relative z-10">{feature.title}</h3>
                  <p className="text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed relative z-10">{feature.description}</p>

                  <div className={`mt-8 flex items-center gap-2 font-bold text-sm ${feature.color} opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 relative z-10`}>
                    Explore <ArrowRight size={16} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white dark:from-[#1a1d27] dark:to-[#0f1117] rounded-[2.5rem] p-10 sm:p-14 border border-indigo-100 dark:border-gray-800 shadow-sm transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/30 dark:bg-accent-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 text-center lg:text-left">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Support This Project</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 text-lg font-medium">
                  Help us keep the UCC Campus Guide free, ad-free, and regularly updated for every student.
                </p>

                <div className="max-w-sm mx-auto lg:mx-0 space-y-5">
                  <PaymentButton
                    amount={5}
                    email={supportEmail}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                    className="w-full bg-indigo-600 dark:bg-accent-500 hover:bg-indigo-700 dark:hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
                  >
                    Support Now (GH₵5)
                  </PaymentButton>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Issues or suggestions? <a href="mailto:uccguide25@gmail.com" className="text-indigo-600 dark:text-accent-400 hover:underline transition-colors">Contact us</a>
                  </p>
                </div>
              </div>

              <div className="flex-1 flex justify-center lg:justify-end">
                <img
                  src="/Savings.png"
                  alt="Support Development"
                  className="w-full max-w-sm object-contain drop-shadow-2xl max-w-[300px] dark:brightness-90"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
