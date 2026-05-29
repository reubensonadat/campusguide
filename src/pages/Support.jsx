import React, { useState } from 'react';
import { PaymentButton } from '../components/payment/PaymentButton';
import { useCampus } from '../context/CampusContext';
import { toast } from 'react-hot-toast';
import { Bug, Code2 } from 'lucide-react';
import {
  TimetableFeatureIcon, GPAFeatureIcon, CalculatorFeatureIcon,
  PlanDayFeatureIcon, BudgetFeatureIcon, CommunityFeatureIcon,
  AboutIcon, HeartFeatureIcon, MailFeatureIcon, ChatFeatureIcon,
  FocusModeIcon, GamesFeatureIcon, WeatherFeatureIcon, NotesFeatureIcon,
  CalendarFeatureIcon, ThriftFeatureIcon, WhisperFeatureIcon
} from '../common/CustomTaskIcons';

const FEATURES = [
  {
    Icon: TimetableFeatureIcon,
    title: 'Timetable Builder',
    desc: 'Build your full semester schedule in seconds. Add courses by name or code, set venues and time slots, and your timetable auto-generates with conflict detection. It remembers your schedule across semesters so you never have to start from scratch. View it day-by-day or week-by-week, and get reminded before each class.',
    highlights: ['Auto conflict detection', 'Semester memory', 'Day & week views', 'Class reminders']
  },
  {
    Icon: GPAFeatureIcon,
    title: 'GPA Forecast',
    desc: 'Stop guessing where your GPA is heading. Enter your current grades and target GPA, and the forecast engine shows you exactly what grade you need in each remaining course to hit your goal. It calculates both cumulative and semester GPA, supports different credit weightings, and lets you run "what-if" scenarios before registration.',
    highlights: ['Target GPA calculator', 'What-if scenarios', 'Cumulative & semester GPA', 'Credit weighting']
  },
  {
    Icon: CalculatorFeatureIcon,
    title: 'Formula Calculator',
    desc: 'Over 250 formulas spanning every department — from engineering and physics to nursing and education. Solve for any variable in an equation, not just the final answer. Each formula shows step-by-step work so you actually understand the process, not just the result. Search by name, department, or keyword and bookmark the ones you use most.',
    highlights: ['250+ formulas', 'Solve for any variable', 'Step-by-step solutions', 'Department-wide coverage']
  },
  {
    Icon: PlanDayFeatureIcon,
    title: 'Plan Your Day',
    desc: 'A daily planner that understands student life. Quick-fill your routine with pre-built blocks for classes, study sessions, meals, gym, and downtime — organized by time of day. Each block maps to a category with its own icon so your schedule reads at a glance. Drag, edit, or remove blocks as your day changes.',
    highlights: ['Quick-fill by time of day', '15+ preset blocks', 'Category icons', 'Drag to rearrange']
  },
  {
    Icon: FocusModeIcon,
    title: 'Focus Mode',
    desc: 'Lock in on what matters. Activate Focus Mode on any planned task to start a dedicated timer that blocks out distractions. Track how long you actually spend studying versus how long you planned to. Your focus sessions are logged so you can see your productivity patterns over time and adjust your schedule accordingly.',
    highlights: ['Dedicated focus timer', 'Planned vs actual tracking', 'Productivity patterns', 'Session history']
  },
  {
    Icon: GamesFeatureIcon,
    title: 'Focus Games',
    desc: 'Stay engaged while you work. Campus Guide includes built-in mini-games you can play while your focus timer is running — word puzzles, memory challenges, and quick brain teasers that keep your mind active without pulling you out of your study flow. Earn streaks for consistent focus and track your game scores alongside your study stats.',
    highlights: ['Mini-games during focus', 'Word & memory puzzles', 'Streak tracking', 'Score history']
  },
  {
    Icon: CommunityFeatureIcon,
    title: 'Community Hub',
    desc: 'Everything happening on campus, in one place. The Community Hub is split into three sections: the General Feed for campus news and announcements, the Thrift Market for buying and selling second-hand items, and Campus Whispers for anonymous thoughts and conversations. Post listings, browse deals, stay informed, and speak freely.',
    highlights: ['General Feed', 'Thrift Market', 'Campus Whispers', 'Post & browse freely']
  },
  {
    Icon: BudgetFeatureIcon,
    title: 'Budget Tracker',
    desc: 'Track every cedi that comes in and goes out. Log income from allowances or side jobs, tag every expense by category, and see a clear breakdown of where your money goes each month. Set spending limits, view weekly and monthly summaries, and get a reality check before you overspend.',
    highlights: ['Income & expense logging', 'Category tagging', 'Monthly summaries', 'Spending limits']
  },
  {
    Icon: WeatherFeatureIcon,
    title: 'Live Weather',
    desc: 'Check the weather before you head to class. The home screen widget shows real-time temperature, conditions, and forecasts for Cape Coast so you know whether to grab an umbrella or dress light. It updates automatically and stays pinned to your dashboard for quick glances.',
    highlights: ['Real-time conditions', 'Cape Coast forecasts', 'Home screen widget', 'Auto-updating']
  },
  {
    Icon: CalendarFeatureIcon,
    title: 'Academic Calendar',
    desc: 'Never miss an important date. The academic calendar tracks registration deadlines, mid-semester breaks, exam periods, and holidays for the entire academic year. It integrates with your home screen so upcoming events appear alongside your daily classes and tasks.',
    highlights: ['Key academic dates', 'Exam & break schedules', 'Home screen integration', 'Full year view']
  },
  {
    Icon: NotesFeatureIcon,
    title: 'Quick Notes',
    desc: 'Jot down ideas, reminders, or lecture points without leaving the app. Quick Notes lives on your home screen as a widget — tap once to write, and your notes auto-save. Pin important notes to the top, search through old ones, and never lose a thought again.',
    highlights: ['One-tap writing', 'Auto-save', 'Pin important notes', 'Search & organize']
  },
];

const Support = () => {
  const { selectedCampus } = useCampus();
  const [amount, setAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [expandedFeature, setExpandedFeature] = useState(null);

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(val)) {
      setAmount(parseFloat(val));
    }
  };

  const handlePaymentSuccess = (result) => {
    toast.success('Thank you for your support!');
  };

  const handlePaymentError = (error) => {
    toast.error(`Payment failed: ${error.message}`);
  };

  return (
    <div className="pb-24 bg-gray-50/30 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-[calc(2.5rem_+_env(safe-area-inset-top,0px))] md:px-8">

        {/* ── App Identity ── */}
        <div className="text-center mb-10">
            <img src="/logo.png" alt="Campus Guide" className="w-16 h-16 object-contain mx-auto mb-4 rounded-2xl shadow-lg" />
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Campus Guide</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Built for UCC students, by UCC students.</p>
            <span className="inline-block mt-2 text-[10px] font-bold text-[#6EABC6] bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">v2.0</span>
        </div>

        {/* ── Our Story ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-5">
            <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-[#6EABC6] flex items-center justify-center">
                    <AboutIcon size={18} />
                </div>
                <h2 className="text-base font-black text-gray-900">Our Story</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed font-medium">
                <p>
                    Every semester, the same problems repeat. Students scramble to build timetables from scratch using
                    screenshots and guesswork. GPAs get calculated on scraps of paper at the end of every semester,
                    with no way to predict outcomes before it is too late. Campus updates spread through word of mouth
                    or scattered WhatsApp groups, and buying or selling second-hand items meant putting up posters
                    on notice boards that nobody reads. Every student was solving the same problems alone.
                </p>
                <p>
                    We got tired of watching this cycle repeat. Campus Guide was built to be the tool we wished someone
                    had made for us — one app that handles the things every UCC student actually needs. A proper timetable
                    builder that remembers your schedule. A GPA calculator that lets you forecast your results before the
                    semester ends. A formula bank with over 250 equations so you stop Googling at 2 AM. A daily planner
                    with focus mode and built-in games to keep you locked in. A budget tracker, a community space, live
                    weather, quick notes, and an academic calendar — all in one place.
                </p>
                <p>
                    This is not a university project. It is not funded by any department or institution. It is a small
                    team of students who decided to stop complaining and start building. We are committed to keeping
                    Campus Guide free and constantly improving it, because we use it ourselves every single day.
                </p>
                <p>
                    Campus Guide is not affiliated with the University of Cape Coast. All information provided through
                    the app is sourced independently and should be verified through official university channels where necessary.
                </p>
            </div>
        </div>

        {/* ── What We Built ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-5">
            <h2 className="text-base font-black text-gray-900 mb-1">What We Built</h2>
            <p className="text-xs text-gray-500 font-medium mb-5">Everything Campus Guide can do — designed around real student needs.</p>
            <div className="space-y-1">
                {FEATURES.map(({ Icon, title, desc, highlights }, idx) => {
                  const isExpanded = expandedFeature === idx;
                  return (
                    <div key={title} className="border-b border-gray-50 last:border-0">
                      <button
                        onClick={() => setExpandedFeature(isExpanded ? null : idx)}
                        className="w-full flex items-start gap-3.5 py-4 text-left group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary-50 text-[#6EABC6] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-bold text-gray-900">{title}</p>
                              <svg
                                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed mt-0.5 font-medium line-clamp-2">
                              {desc.slice(0, desc.indexOf('.') + 1)}
                            </p>
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="pl-12.5 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                          <p className="text-xs text-gray-600 leading-relaxed font-medium mb-3">{desc}</p>
                          {highlights && (
                            <div className="flex flex-wrap gap-1.5">
                              {highlights.map((h) => (
                                <span key={h} className="inline-block text-[10px] font-bold text-[#6EABC6] bg-[#6EABC6]/8 px-2 py-1 rounded-md">
                                  {h}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
        </div>

        {/* ── Keep It Free ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-5">
            <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                    <HeartFeatureIcon size={18} />
                </div>
                <h2 className="text-base font-black text-gray-900">Keep It Free</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
                Servers, databases, and development tools cost real money. If Campus Guide has helped you,
                a small donation keeps the app running and free for the next student who needs it.
            </p>

            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 20].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleAmountSelect(val)}
                      className={`py-3.5 rounded-xl font-bold text-sm transition-all border ${
                        amount === val && !customAmount
                          ? 'border-[#002F45] bg-[#002F45] text-white shadow-lg scale-105'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white'
                      }`}
                    >
                      GH₵{val}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">GH₵</span>
                  <input
                    type="number"
                    placeholder="Other Amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl font-bold text-gray-900 transition-all outline-none text-sm placeholder:font-medium"
                  />
                </div>

                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name (Optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm transition-all outline-none placeholder:text-gray-400 font-medium"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm transition-all outline-none placeholder:text-gray-400 font-medium"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email (Optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm transition-all outline-none placeholder:text-gray-400 font-medium"
                  />
                  <textarea
                    placeholder="Message (Optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#6EABC6] focus:ring-4 focus:ring-[#6EABC6]/10 rounded-xl text-sm transition-all outline-none h-16 resize-none placeholder:text-gray-400 font-medium"
                  />
                </div>

                <PaymentButton
                  amount={amount}
                  email={email || 'supporter@campusguide.com'}
                  metadata={{
                    campusPrefix: selectedCampus?.transactionPrefix || 'UCC',
                    supporterName: name,
                    supporterPhone: phone,
                    supporterMessage: message
                  }}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  className="w-full py-3.5 text-sm bg-[#002F45] hover:bg-[#001a26] text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Donate GH₵{amount}</span>
                </PaymentButton>
            </div>
        </div>

        {/* ── Get in Touch ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-5">
            <h2 className="text-base font-black text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-3">
                <a
                    href="mailto:uccguide25@gmail.com"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <MailFeatureIcon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">Email Us</p>
                        <p className="text-xs text-gray-500 font-medium truncate">uccguide25@gmail.com</p>
                    </div>
                </a>

                <a
                    href="https://wa.me/233201534711"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <ChatFeatureIcon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">WhatsApp</p>
                        <p className="text-xs text-gray-500 font-medium">Quick answers and updates</p>
                    </div>
                </a>
            </div>
        </div>

        {/* ── Footer ── */}
        <div className="text-center pt-4 pb-8">
            <div className="flex items-center justify-center gap-1.5 text-gray-300 mb-2">
                <Code2 size={12} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Made with purpose</span>
            </div>
            <a href="mailto:uccguide25@gmail.com?subject=Bug Report" className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors">
                <Bug size={12} /> Report a Bug
            </a>
        </div>

      </div>
    </div>
  );
};

export default Support;
