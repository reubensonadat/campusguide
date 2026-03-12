import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '../components/common/Button';
import {
  BookOpen, Wrench, ArrowRight,
  ClipboardList, Map,
  CalendarDays, Phone, Settings,
  MessageCircle, ChevronRight,
  Clock, Megaphone, ExternalLink
} from 'lucide-react';
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

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const now        = new Date();
const TODAY_NAME  = DAYS[now.getDay()];
const TODAY_LABEL = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

// ── component ─────────────────────────────────────────────────────────────────

const Home = () => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const navigate     = useNavigate();
  const { state, actions } = useAppContext();
  const [timetable]  = useLocalStorage('ucc_timetable', []);

  const supportEmail = state?.supportEmail || 'anonymous@uccguide.com';
  const handlePaymentSuccess = () => alert('Thank you for your support!');
  const handlePaymentError   = (e) => alert(`Payment failed: ${e.message}`);

  // Today's classes
  const todaysClasses = useMemo(() => {
    if (!Array.isArray(timetable)) return [];
    return timetable
      .filter(c => c.day && c.day.toLowerCase() === TODAY_NAME.toLowerCase())
      .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
  }, [timetable]);

  // ── Announcement → Ad rotation logic ─────────────────────────────────────
  // Rule: show the latest announcement if the user hasn't seen it yet (tracked
  // by announcement ID in localStorage). Once seen, show one random active ad
  // per session (sessionStorage keeps it stable during a session; rotates on
  // next app open).
  const [featuredContent, setFeaturedContent] = useState(null); // { kind: 'announcement'|'ad', data }

  useEffect(() => {
    const seenIds = JSON.parse(localStorage.getItem('ucc_seen_announcements') || '[]');

    const checkAnnouncement = async () => {
      // 1. Fetch latest announcement
      const { data: annData } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      const latest = annData && annData[0];

      if (latest && !seenIds.includes(latest.id)) {
        // User hasn't seen this announcement — show it and mark as seen
        localStorage.setItem('ucc_seen_announcements', JSON.stringify([...seenIds, latest.id]));
        setFeaturedContent({ kind: 'announcement', data: latest });
        return;
      }

      // 2. All announcements seen — show a random ad (pick a new one on each mount)
      const { data: adsData } = await supabase
        .from('advertisements')
        .select('*')
        .ilike('status', 'active')
        .eq('package_id', 'home_banner'); // only premium home-placement ads

      if (!adsData || adsData.length === 0) {
        // No premium ads available — fall back to latest announcement
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

      // Pick a random ad from the list
      const ad = adsData[Math.floor(Math.random() * adsData.length)];
      setFeaturedContent({ kind: 'ad', data: ad });
    };

    checkAnnouncement();
  }, []);

  // Quick actions — all use same indigo/slate palette, no colour diversity
  const quickActions = [
    { title: 'Course Reg.', icon: ClipboardList, action: () => navigate('/guide?topic=course-registration') },
    { title: 'Campus Map',  icon: Map,           action: () => navigate('/guide?topic=campus-map')          },
    { title: 'Timetable',   icon: CalendarDays,  action: () => navigate('/tools')                           },
    { title: 'Contacts',    icon: Phone,         action: () => navigate('/guide?topic=contact-directory')   },
    { title: 'Settings',    icon: Settings,      action: () => navigate('/settings')                        },
    { title: 'Contact Us',  icon: MessageCircle, action: () => navigate('/contact')                         },
  ];

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="pb-28 bg-[#f0f2f8] min-h-screen font-sans">

      {/* ════════════════════════════════════════════
          MOBILE LAYOUT
      ════════════════════════════════════════════ */}
      <div className="lg:hidden">

        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1a237e] via-[#283593] to-[#3949ab] px-5 pt-10 pb-16">
          <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-indigo-900/40 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <p className="text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-3">{TODAY_LABEL}</p>
            <h1 className="text-white text-2xl font-extrabold leading-tight mb-1">{getGreeting()} 👋</h1>
            <p className="text-indigo-200 text-sm font-medium">Welcome to your campus companion.</p>
          </div>
        </div>

        {/* Floating cards */}
        <div className="px-4 -mt-8 relative z-10 space-y-3">

          {/* ── Today's Classes ─────────────────────── */}
          <div className="bg-white rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.10)] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
                  <Clock size={14} className="text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900">Today's Classes</span>
              </div>
              <button onClick={() => navigate('/tools')} className="text-xs text-indigo-600 font-semibold flex items-center gap-0.5">
                View all <ChevronRight size={13} />
              </button>
            </div>

            {todaysClasses.length === 0 ? (
              <div className="flex items-center gap-4 py-2">
                <span className="text-3xl">🎉</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">No classes today!</p>
                  <button onClick={() => navigate('/tools')} className="text-xs text-indigo-500 font-semibold mt-0.5">
                    Set up your timetable →
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {todaysClasses.map((cls, i) => (
                  <div key={i} className="bg-indigo-50 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-indigo-700 truncate">
                        {cls.courseName || cls.name || 'Class'}
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {cls.startTime && cls.endTime ? `${cls.startTime} – ${cls.endTime}` : cls.startTime || ''}
                        {(cls.venue || cls.location) ? ` · ${cls.venue || cls.location}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Quick Actions — horizontal strip ─────── */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar py-1">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <button
                  key={i}
                  onClick={action.action}
                  className="flex-none flex flex-col items-center gap-1.5 bg-white rounded-xl px-4 py-3 shadow-sm ring-1 ring-black/5 active:scale-95 transition-transform"
                >
                  <Icon size={18} className="text-indigo-600" />
                  <span className="text-[10px] font-semibold text-gray-600 whitespace-nowrap">{action.title}</span>
                </button>
              );
            })}
          </div>

          {/* ── Featured card (announcement OR ad, decided by rotation logic) */}
          {featuredContent && (() => {
            const isAd = featuredContent.kind === 'ad';
            const d    = featuredContent.data;
            const imgSrc = isAd ? d.image_url : d.flyer_url;

            // Build contact link for ads
            let adHref = null, adLabel = 'Learn More';
            if (isAd) {
              const clean = d.phone_number ? d.phone_number.replace(/\D/g, '') : '';
              if (d.contact_method === 'link' && d.contact_url)      { adHref = d.contact_url; adLabel = 'Visit Link'; }
              else if (d.contact_method === 'phone' && clean)         { adHref = `tel:+${clean}`; adLabel = 'Call Now'; }
              else if (clean)                                          { adHref = `https://wa.me/${clean}?text=${encodeURIComponent(`Hi! I saw your ad for "${d.title}" on UCC Campus Guide.`)}`; adLabel = 'Message via WhatsApp'; }
            }

            return (
              <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
                {/* header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center">
                      <Megaphone size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{isAd ? 'Featured' : 'Announcement'}</span>
                  </div>
                  <button onClick={() => navigate('/community')} className="text-xs text-indigo-600 font-semibold flex items-center gap-0.5">
                    See community <ChevronRight size={13} />
                  </button>
                </div>

                {/* flyer / image — flexible height, not cropped */}
                {imgSrc && (
                  <img src={imgSrc} alt={d.title} className="w-full h-auto max-h-[420px] object-contain block" />
                )}

                {/* content */}
                <div className="px-5 py-4">
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xl mb-2 text-indigo-600 bg-indigo-50">
                    {isAd ? 'SPONSORED' : 'OFFICIAL'}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1">{d.title}</h3>
                  {(d.description || d.content) && (
                    <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-3">
                      {d.description || d.content}
                    </p>
                  )}
                  {/* Ad action link */}
                  {isAd && adHref && (
                    <a href={adHref} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600">
                      {adLabel} <ExternalLink size={12} />
                    </a>
                  )}
                  {/* Announcement action link */}
                  {!isAd && d.action_link && (
                    <a href={d.action_link} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600">
                      {d.action_text || 'View Details'} <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ── Support ──────────────────────────────── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 shadow-sm p-5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100/30 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4">
              <img src="/Savings.png" alt="Support" className="w-24 h-24 object-contain flex-shrink-0 drop-shadow-md" />
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 text-sm font-extrabold mb-1">Support This Project</h3>
                <p className="text-gray-500 text-xs font-medium mb-3 leading-relaxed">
                  Your support keeps this project alive and growing for every student.
                </p>
                <Button
                  onClick={() => actions?.setShowSupportModal(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Support Now
                </Button>
              </div>
            </div>
          </div>

        </div>
        {/* end mobile floating cards */}
      </div>
      {/* end MOBILE */}


      {/* ════════════════════════════════════════════
          DESKTOP LAYOUT (unchanged)
      ════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Hero */}
        <div className="relative overflow-hidden bg-white border-b border-gray-100/80 py-12 px-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
          </div>
          <div className="relative max-w-6xl mx-auto z-10 grid grid-cols-12 items-center gap-6">
            <div className="col-span-7 text-left mt-8">
              <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                Your Essential{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600">
                  Campus Companion
                </span>
              </h1>
              <p className="text-lg text-gray-500 mb-6 max-w-xl font-medium">
                Navigate campus life with clear guides, essential tools, and quick access to services all in a compact, easy-to-use hub.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="primary" onClick={() => navigate('/guide')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-soft btn-hover flex items-center gap-3">
                  <BookOpen size={18} /> Open Guide
                </Button>
                <Button variant="outline" onClick={() => navigate('/tools')}
                  className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold shadow-sm flex items-center gap-3">
                  <Wrench size={18} className="text-gray-400" /> Open Tools
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
            <div className="flex gap-6 py-2 overflow-x-auto hide-scrollbar">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button key={index} onClick={action.action}
                    className="group relative overflow-hidden text-left p-5 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex items-center justify-between flex-none"
                    style={{ minWidth: 'min(24rem, calc((100vw - 96px) / 4))' }}>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon size={24} className="text-indigo-600" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">{action.title}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                      <ArrowRight size={16} className="text-indigo-600" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Support */}
          <section>
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white rounded-xl p-10 sm:p-14 border border-indigo-100 shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 text-center lg:text-left">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Support This Project</h2>
                  <p className="text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 text-lg font-medium">
                    Your support keeps this project alive and growing for every UCC student.
                  </p>
                  <div className="max-w-sm mx-auto lg:mx-0 space-y-5">
                    <PaymentButton amount={5} email={supportEmail}
                      onPaymentSuccess={handlePaymentSuccess} onPaymentError={handlePaymentError}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                      Support Now (GH₵5)
                    </PaymentButton>
                    <p className="text-sm font-medium text-gray-500">
                      Issues or suggestions?{' '}
                      <a href="mailto:uccguide25@gmail.com" className="text-indigo-600 hover:underline">Contact us</a>
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
