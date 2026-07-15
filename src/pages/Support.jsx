import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentButton } from '../components/payment/PaymentButton';
import { useCampus } from '../context/CampusContext';
import { toast } from 'react-hot-toast';
import { Bug, Code2, ArrowUp, Plus, X, Sparkles, ChevronDown } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import {
  TimetableFeatureIcon, GPAFeatureIcon, CalculatorFeatureIcon,
  PlanDayFeatureIcon, BudgetFeatureIcon, CommunityFeatureIcon,
  AboutIcon, HeartFeatureIcon, MailFeatureIcon, ChatFeatureIcon,
  FocusModeIcon, GamesFeatureIcon, WeatherFeatureIcon, NotesFeatureIcon,
  CalendarFeatureIcon, ThriftFeatureIcon, WhisperFeatureIcon
} from '../common/CustomTaskIcons';
import { getSuggestions, addSuggestion, voteForSuggestion, getUserVotes } from '../services/communityService';

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
    Icon: FocusModeIcon,
    title: 'Assignment & Exam Tracker',
    desc: 'Never miss a submission or quiz again. Track your coursework, quiz deadlines, exams, and grades in a highly detailed dashboard. Get notifications before due dates, track sub-task checklists for complex project work, and archive completed assessments. Fully integrated with your home feed for quick access.',
    highlights: ['Deadline countdowns', 'Sub-task checklists', 'Grade weighting integration', 'Upcoming alerts']
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

const DEFAULT_SUGGESTIONS = [
  { id: 's1', title: 'Push Notifications for Deadlines', desc: 'Get mobile push notifications 24 hours before any assignment is due.', votes: 412, status: 'Trending', voted: false },
  { id: 's2', title: 'Interactive Campus Map Navigator', desc: 'Direct routing between lecture halls (e.g. LLT to CELT) with walking paths.', votes: 389, status: 'Developing', voted: false },
  { id: 's3', title: 'Past Questions & Syllabus Library', desc: 'A database where students can search and download past exam papers.', votes: 245, status: 'Under Consideration', voted: false },
  { id: 's4', title: 'PDF Step-by-Step Formula Export', desc: 'Export worked calculations from the formula bank as PDF homework sheets.', votes: 120, status: 'Shipped', voted: false }
];

const Support = () => {
  const navigate = useNavigate();
  const { selectedCampus } = useCampus();
  const [amount, setAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [expandedFeature, setExpandedFeature] = useState(null);

  // Suggestions Board states
  const [suggestions, setSuggestions] = useState([]);
  const [userVotedIds, setUserVotedIds] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    const [sugRes, votesRes] = await Promise.all([
      getSuggestions(),
      getUserVotes()
    ]);
    if (sugRes.success) {
      setSuggestions(sugRes.data);
    }
    if (votesRes.success) {
      setUserVotedIds(votesRes.data || []);
    }
    setLoadingSuggestions(false);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

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

  const handlePaymentSuccess = () => {
    toast.success('Thank you for your support!');
  };

  const handlePaymentError = (error) => {
    toast.error(`Payment failed: ${error.message}`);
  };

  const handleVote = async (id) => {
    const res = await voteForSuggestion(id);
    if (res.success) {
      setSuggestions(prev => prev.map(s => {
        if (s.id === id) {
          return { ...s, votes_count: res.votesCount };
        }
        return s;
      }));
      setUserVotedIds(prev => {
        if (res.voted) {
          return [...prev, id];
        } else {
          return prev.filter(vId => vId !== id);
        }
      });
      toast.success(res.voted ? 'Upvoted!' : 'Vote removed.');
    } else {
      toast.error(res.error || 'Failed to vote.');
    }
  };

  const handleAddSuggestion = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const res = await addSuggestion(newTitle.trim(), newDesc.trim());
    if (res.success) {
      setSuggestions(prev => [res.data, ...prev]);
      setUserVotedIds(prev => [...prev, res.data.id]);
      setNewTitle('');
      setNewDesc('');
      setIsSuggesting(false);
      toast.success('Suggestion posted to the board!');
    } else {
      toast.error(res.error || 'Failed to submit suggestion.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Developing': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Under Consideration': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-purple-50 text-purple-600 border-purple-100';
    }
  };

  return (
    <div className="pb-28 bg-white min-h-screen font-sans selection:bg-[#cce1eb] selection:text-gray-900">
      <div className="max-w-3xl mx-auto px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))] space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
        
        {/* Header matching Profile style */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">About & Support</h1>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5">Built for students, by students. Keep the Guide free.</p>
        </div>

        {/* Category 1: Our Mission */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Our Mission</h2>
          <div className="space-y-4 text-[14px] text-gray-600 leading-relaxed font-medium">
            <p>
              Campus Guide is built by students, for students. We got tired of scrambling to calculate GPAs on loose sheets of paper, trying to recreate timetables from blurry screenshots, and losing track of course assignments. Every student was trying to solve the same problems alone.
            </p>
            <p>
              We designed this app to gather everything you actually need into a unified, clean interface: timetables with class alarms, GPA forecasts with what-if scenario planning, assignment tracker boards, step-by-step formula calculators, budget logging, a student thrift market, and private campus whispers.
            </p>
            <p>
              Your data is stored securely in your browser and automatically synchronized to the cloud. By saving your unique **App ID** and **Recovery PIN** in settings, you can backup and restore your history seamlessly on any other device (iOS or Android).
            </p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Category 2: Features Directory */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Application Features</h2>
          <div className="space-y-1">
            {FEATURES.map(({ Icon, title, desc, highlights }, idx) => {
              const isExpanded = expandedFeature === idx;
              return (
                <div key={title} className="border-b border-gray-100 last:border-0">
                  <button
                    onClick={() => setExpandedFeature(isExpanded ? null : idx)}
                    className="w-full flex items-start gap-4 py-4 text-left group focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gray-100">
                      <Icon size={18} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[15px] font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{title}</span>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1 font-medium leading-relaxed line-clamp-2">
                        {desc}
                      </p>
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="pl-14 pb-5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <p className="text-xs text-gray-600 leading-relaxed font-medium mb-3">{desc}</p>
                      {highlights && (
                        <div className="flex flex-wrap gap-1.5">
                          {highlights.map((h) => (
                            <span key={h} className="inline-block text-[10px] font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-100/50">
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

        <hr className="border-gray-100" />

        {/* Category 3: Feature Suggestions & Upvote Board */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <div>
              <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Feature Upvote Board</h2>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Vote for features you want us to develop next.</p>
            </div>
            <button
              onClick={() => setIsSuggesting(!isSuggesting)}
              className="bg-primary-600 hover:bg-primary-700 text-white text-[11px] font-bold px-3 py-2 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer border-none"
            >
              {isSuggesting ? <X size={12} /> : <Plus size={12} />}
              {isSuggesting ? 'Cancel' : 'Suggest'}
            </button>
          </div>

          {/* Form to submit feature */}
          {isSuggesting && (
            <form onSubmit={handleAddSuggestion} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 mb-4 space-y-3.5 animate-in slide-in-from-top-3 duration-200">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 pl-1 block mb-1">Feature Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. GPA Graph Tracker"
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm font-bold"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 pl-1 block mb-1">Short Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain why this feature is useful for students..."
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-sm font-semibold h-16 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm border-none cursor-pointer"
              >
                Submit Suggestion
              </button>
            </form>
          )}

          {/* Suggestions List */}
          <div className="space-y-3.5">
            {loadingSuggestions ? (
              <div className="py-8 text-center text-gray-400 font-semibold text-xs">
                Loading suggestions...
              </div>
            ) : suggestions.length === 0 ? (
              <div className="py-8 text-center text-gray-400 font-medium text-xs">
                No suggestions yet. Be the first to suggest a feature!
              </div>
            ) : (
              suggestions.sort((a, b) => (b.votes_count || 0) - (a.votes_count || 0)).map((s) => {
                const voted = userVotedIds.includes(s.id);
                return (
                  <div key={s.id} className="flex gap-4 items-start py-4 border-b border-gray-100 last:border-0">
                    {/* Vote Widget */}
                    <button
                      onClick={() => handleVote(s.id)}
                      className={`w-12 h-14 rounded-2xl flex flex-col items-center justify-center border transition-all shrink-0 cursor-pointer ${
                        voted
                          ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-200'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:bg-primary-50/10'
                      }`}
                    >
                      <ArrowUp size={16} className={`mb-0.5 ${voted ? 'animate-bounce' : ''}`} />
                      <span className="text-[11px] font-black leading-none">{s.votes_count || 0}</span>
                    </button>

                    {/* Suggestion Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 leading-snug">{s.title}</span>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${getStatusColor(s.status)}`}>
                          {s.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed font-medium">
                        {s.description || s.desc}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Category 4: Keep it Free / Donate */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Keep it Free</h2>
          <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50 space-y-6">
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              We do not track you or sell advertisements. If the Campus Guide app helps you stay organized, consider supporting our monthly server bills to keep it online.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 20].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAmountSelect(val)}
                    className={`py-3.5 rounded-xl font-bold text-sm transition-all border ${
                      amount === val && !customAmount
                        ? 'border-gray-900 bg-gray-900 text-white shadow-lg scale-105'
                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
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
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 rounded-xl font-bold text-gray-900 transition-all outline-none text-sm placeholder:font-medium"
                />
              </div>

              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Name (Optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none placeholder:text-gray-300 font-medium"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (Optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none placeholder:text-gray-300 font-medium"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email (Optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none placeholder:text-gray-300 font-medium"
                />
                <textarea
                  placeholder="Message (Optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none h-16 resize-none placeholder:text-gray-300 font-medium"
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
                className="w-full py-3.5 text-xs bg-gray-900 hover:bg-gray-900 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                <span>Donate GH₵{amount}</span>
              </PaymentButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 pb-12">
          <div className="flex items-center justify-center gap-1.5 text-gray-300 mb-2">
            <Code2 size={12} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Built with purpose by Students</span>
          </div>
          <a
            href="mailto:uccguide25@gmail.com?subject=Campus%20Guide%20Bug%20Report"
            className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors"
          >
            <Bug size={12} /> Report a Bug
          </a>
        </div>

      </div>
    </div>
  );
};

export default Support;
