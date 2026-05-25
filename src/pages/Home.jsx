import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '../components/common/Button';
import { ArrowRight, Map, CalendarDays, Heart, Settings, MessageCircle, ChevronRight, Clock, Megaphone, ExternalLink, Wifi, User } from 'lucide-react';
import { CustomGuide, CustomTools } from '../components/common/CustomIcons';

import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { PaymentButton } from '../components/payment/PaymentButton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { supabase } from '../lib/supabase';

import CampusIllustration from '/college-campus-rafiki.svg';

// ── helpers ───────────────────────────────────────────────────────────────────

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const now = new Date();
const TODAY_NAME = DAYS[now.getDay()];
const TODAY_LABEL = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

const formatTime12Hour = (time24) => {
  if (!time24) return '';
  const [hours, minutes] = time24.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

// ── component ─────────────────────────────────────────────────────────────────

const Home = () => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  const [timetable] = useLocalStorage('ucc_timetable', []);
  const [profile]    = useLocalStorage('ucc_profile', { name: '', phone: '', avatarUrl: '' });

  const supportEmail = state?.supportEmail || 'anonymous@uccguide.com';
  const handlePaymentSuccess = () => alert('Thank you for your support!');
  const handlePaymentError = (e) => alert(`Payment failed: ${e.message}`);

  // Today's classes
  const todaysClasses = useMemo(() => {
    if (!Array.isArray(timetable)) return [];
    return timetable
      .filter(c => c.day && c.day.toLowerCase() === TODAY_NAME.toLowerCase())
      .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
  }, [timetable]);

  // ── Announcement → Ad rotation logic ─────────────────────────────────────
  const [featuredContent, setFeaturedContent] = useState(null); 
  const [isFeaturedExpanded, setIsFeaturedExpanded] = useState(false);

  useEffect(() => {
    const seenIds = JSON.parse(localStorage.getItem('ucc_seen_announcements') || '[]');

    const checkAnnouncement = async () => {
      const { data: annData } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      const latest = annData && annData[0];

      if (latest && !seenIds.includes(latest.id)) {
        localStorage.setItem('ucc_seen_announcements', JSON.stringify([...seenIds, latest.id]));
        setFeaturedContent({ kind: 'announcement', data: latest });
        return;
      }

      const { data: adsData } = await supabase
        .from('advertisements')
        .select('*')
        .ilike('status', 'active')
        .eq('package_id', 'home_banner') 
        .gte('expires_at', new Date().toISOString());

      if (!adsData || adsData.length === 0) {
        const { data: annFallback } = await supabase
          .from('announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);
        if (annFallback && annFallback[0]) {
          setFeaturedContent({ kind: 'announcement', data: annFallback[0] });
        }
        return;
      }

      const ad = adsData[Math.floor(Math.random() * adsData.length)];
      setFeaturedContent({ kind: 'ad', data: ad });
    };

    checkAnnouncement();
  }, []);

  const AFFILIATE_URL = 'https://www.cheapdata.shop/shop/anat-enterprise-1774112668074-swiftdata-mp8lcz98';
  
  const quickActions = [
    { title: 'Campus Map',  icon: Map,           action: () => navigate('/guide?topic=campus-map')          },
    { title: 'Timetable',   icon: CalendarDays,  action: () => navigate('/tools')                           },
    { title: 'Buy Data',    icon: Wifi,          action: () => window.open(AFFILIATE_URL, '_blank', 'noopener,noreferrer'), isAffiliate: true },
    { title: 'Contact Us',  icon: MessageCircle, action: () => navigate('/contact')                         },
    { title: 'Settings',    icon: Settings,      action: () => navigate('/settings')                        },
  ];

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="pb-28 bg-[#f0f2f8] min-h-screen font-sans">

      {/* ════════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════════ */}
      <div className="lg:hidden">

        {/* ── Chime-Style Hero ────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#001a26] to-[#002F45] px-6 pt-10 pb-16">
          
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[150%] h-[100px] bg-[#001a26] rounded-[100%] blur-xl opacity-40 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6EABC6] rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold tracking-widest text-xs uppercase opacity-90">Campus Guide</span>
            </div>
            
            {profile.avatarUrl ? (
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg overflow-hidden cursor-pointer active:scale-95 transition-transform bg-white/10 p-0.5"
              >
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-full bg-white" />
              </button>
            ) : (
              <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform">
                <User size={18} />
              </button>
            )}
          </div>

          {/* Hero Greeting Text */}
          <div className="relative z-10">
            <h2 className="text-white text-[1.8rem] font-black leading-tight tracking-tight mb-1">
              {getGreeting()}, {profile.name ? profile.name.split(' ')[0] : 'Student'} 👋
            </h2>
            <p className="text-[#6EABC6] text-sm font-semibold flex items-center gap-1 cursor-pointer active:opacity-70 transition-opacity">
              {TODAY_LABEL}
            </p>
          </div>
        </div>

        {/* ── Overlapping Content & Body ──────────────────────────────── */}
        <div className="px-5 -mt-8 relative z-20 space-y-6 pb-6">

          {/* 1. Overlapping Floating Card (Today's Classes) */}
          <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-6 min-h-[140px] border border-gray-100 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-black text-gray-900 tracking-tight">Today's Classes</span>
              <button onClick={() => navigate('/tools')} className="text-xs text-primary-600 font-bold flex items-center gap-0.5">
                View all <ChevronRight size={13} />
              </button>
            </div>

            {todaysClasses.length === 0 ? (
              <div className="flex items-center gap-4 py-2">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎉</span>
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-900">No classes today!</p>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">Enjoy your free time.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {todaysClasses.slice(0, 2).map((cls, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#002F45]/5 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-[#002F45]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {cls.courseName || cls.name || 'Class'}
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {cls.startTime && cls.endTime ? `${formatTime12Hour(cls.startTime)} – ${formatTime12Hour(cls.endTime)}` : formatTime12Hour(cls.startTime) || ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Campus Tools (Horizontal Scroll) */}
          <div className="pt-2">
            <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">Campus tools</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 px-1 -mx-1">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                const isAffiliate = action.isAffiliate;
                return (
                  <button
                    key={i}
                    onClick={action.action}
                    className="bg-white border border-gray-200 rounded-2xl p-3 flex-none flex items-center gap-3 active:scale-95 transition-transform"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <Icon size={18} className={isAffiliate ? 'text-orange-500' : 'text-[#002F45]'} />
                    </div>
                    <span className="text-[13px] font-bold text-gray-900 leading-tight pr-2 whitespace-nowrap">
                      {action.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Announcements / Featured Content */}
          {featuredContent && (() => {
            const isAd = featuredContent.kind === 'ad';
            const d = featuredContent.data;
            const imgSrc = isAd ? d.image_url : d.flyer_url;

            let actionText = '';
            let link = '';
            
            if (isAd) {
                const cleanPhone = d.phone_number ? d.phone_number.replace(/\D/g, '') : '';
                if (d.contact_method === 'link' && d.contact_url) {
                    actionText = 'Visit Link';
                    link = d.contact_url;
                } else if (d.contact_method === 'phone' && cleanPhone) {
                    actionText = 'Call Now';
                    link = `tel:+${cleanPhone}`;
                } else if (cleanPhone) {
                    actionText = 'Message via WhatsApp';
                    link = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello! I saw your advertisement for "${d.title}" on the UCC Campus Guide app and I'm interested in finding out more.`)}`;
                }
            }

            return (
              <div className="pt-2">
                <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">
                  {isAd ? 'Advertisement' : 'Announcement'}
                </h3>
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                  {imgSrc && (
                    <img src={imgSrc} alt={d.title} className="w-full h-auto object-contain max-h-[600px] bg-gray-50/50" />
                  )}
                  <div className="p-5">
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xl mb-2 text-[#002F45] bg-[#002F45]/10">
                      {isAd ? 'SPONSORED' : 'OFFICIAL'}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{d.title}</h4>
                    <p className={`text-sm text-gray-500 font-medium mb-4 ${!isFeaturedExpanded ? 'line-clamp-3' : ''}`}>
                      {d.description || d.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => setIsFeaturedExpanded(!isFeaturedExpanded)}
                        className="text-[13px] font-bold text-[#002F45] flex items-center gap-1 active:opacity-70"
                      >
                        {isFeaturedExpanded ? 'Show less' : 'Read more'} <ChevronRight size={14} className={isFeaturedExpanded ? 'rotate-90 transition-transform' : 'transition-transform'} />
                      </button>
                      
                      {isFeaturedExpanded && link && (
                        <button 
                          onClick={() => window.open(link, '_blank')}
                          className="bg-[#FFF4E5] text-[#B26B00] border border-[#FFE0B2] text-xs font-bold px-4 py-2 rounded-lg active:scale-95 transition-transform shadow-sm"
                        >
                          {actionText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 4. Promotional Banner (Support Card - Mobile) */}
          <div 
            onClick={() => actions?.setShowSupportModal(true)}
            className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Support the Guide</h3>
              <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed mb-3">
                Help us keep this app free and growing for all students.
              </p>
              <span className="inline-block bg-[#002F45] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
                Support Now
              </span>
            </div>
            <div className="relative z-10 w-24 h-24 -mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
              <img src="/Savings.png" alt="Support" className="w-full h-full object-contain drop-shadow-md" />
            </div>
          </div>

        </div>
      </div>
      {/* end MOBILE */}


      {/* ════════════════════════════════════════════
          DESKTOP LAYOUT
      ════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Hero */}
        <div className="relative overflow-hidden bg-white border-b border-gray-100/80 py-12 px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
          </div>
          <div className="relative max-w-6xl mx-auto z-10 grid grid-cols-12 items-center gap-6">
            <div className="col-span-7 text-left mt-8">
              <div className="flex items-center gap-4 mb-4">
                {profile.avatarUrl && (
                  <div 
                    onClick={() => navigate('/profile')}
                    className="w-16 h-16 rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer active:scale-95 transition-transform bg-white p-0.5"
                  >
                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl bg-gray-50" />
                  </div>
                )}
                <div>
                  <p className="text-primary-600 text-sm font-semibold tracking-widest uppercase mb-1">{TODAY_LABEL}</p>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                    {getGreeting()}{profile.name ? `, ${profile.name.split(' ')[0]}` : ''} 👋
                  </h1>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-700 mb-4 tracking-tight leading-tight">
                Your Essential{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600">
                  Campus Companion
                </span>
              </h2>
              <p className="text-lg text-gray-500 mb-6 max-w-xl font-medium">
                Navigate campus life with clear guides, essential tools, and quick access to services all in a compact, easy-to-use hub.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="primary" onClick={() => navigate('/guide')}
                  className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-soft btn-hover flex items-center gap-3">
                  <CustomGuide size={18} /> Open Guide
                </Button>
                <Button variant="outline" onClick={() => navigate('/tools')}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold shadow-sm flex items-center gap-3">
                  <CustomTools size={18} className="text-gray-400" /> Open Tools
                </Button>
              </div>
            </div>
            <div className="col-span-5 flex items-center justify-end">
              <div className="relative w-full max-w-lg -mr-6">
                <img src={CampusIllustration} alt="Campus illustration"
                  className="w-full h-auto object-contain drop-shadow-lg"
                  style={{ WebkitTransform: 'translateZ(0)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop content */}
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

          {/* Quick Actions */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quick Actions</h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-6 py-2 overflow-x-auto hide-scrollbar">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  const isAffiliate = action.isAffiliate;
                  return (
                    <button key={index} onClick={action.action}
                      className={`group relative overflow-hidden text-left p-5 bg-white border rounded-xl transition-all duration-300 flex items-center justify-between flex-none ${isAffiliate
                          ? 'border-primary-200 hover:border-primary-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]'
                          : 'border-gray-100 hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
                        }`}
                      style={{ minWidth: 'min(24rem, calc((100vw - 96px) / 4))' }}>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${isAffiliate
                            ? 'bg-orange-50'
                            : 'bg-primary-50'
                          }`}>
                          <Icon size={24} className={isAffiliate ? 'text-orange-500' : 'text-primary-600'} />
                        </div>
                        <h4 className="font-bold text-gray-900 text-base">{action.title}</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                        <ArrowRight size={16} className={isAffiliate ? 'text-orange-600' : 'text-primary-600'} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Support (Desktop Fixed Button) */}
          <section>
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white rounded-xl p-10 sm:p-14 border border-primary-100 shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 text-center lg:text-left">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Support This Project</h2>
                  <p className="text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 text-lg font-medium">
                    Your support keeps this project alive and growing for every UCC student.
                  </p>
                  <div className="max-w-sm mx-auto lg:mx-0 space-y-5">
                    <button 
                      onClick={() => actions?.setShowSupportModal(true)}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary-200 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Support Now (GH₵5)
                    </button>
                    <p className="text-sm font-medium text-gray-500">
                      Issues or suggestions?{' '}
                      <a href="mailto:uccguide25@gmail.com" className="text-primary-600 hover:underline">Contact us</a>
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex justify-center lg:justify-end">
                  <img src="/Savings.png" alt="Support Development" className="w-full max-w-[300px] object-contain drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
      {/* end DESKTOP */}

    </div>
  );
};

export default Home;