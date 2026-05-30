import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Clock, Fingerprint, Calendar as CalendarIcon, MapPin, Pencil, Settings, UserCircle, Bell, X, Camera, Save, CheckCircle, RefreshCw, Smartphone, User, Trash2, Phone, Mail, ChevronRight, Shield, HelpCircle, Heart, Edit3, Calendar, StickyNote, ListChecks, Copy, Cloud, CloudOff, Share2, Hash, CreditCard, Check, Moon, FileText, Star, Zap, Clock as ClockIcon } from 'lucide-react';
import { DataLoader } from '../components/common/CustomLoaders';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDeviceId } from '../hooks/useDeviceId';
import { AvatarBuilder } from '../components/profile/AvatarBuilder';
import { useNavigate } from 'react-router-dom';
import { CustomSettings, CustomProfile, CustomSafetyCheck, CustomCoach, CustomContact } from '../components/common/CustomIcons';
import { CoachMarksOverlay } from '../components/common/CoachMarksOverlay';
import { AboutIcon } from '../common/CustomTaskIcons';
import { useAppContext } from '../context/AppContext';
import { LS_KEYS, DEFAULT_HOME_WIDGETS } from '../utils/constants';
import { restoreFromCloud } from '../services/syncService';
import { fetchUserThriftListings } from '../services/thriftService';
import { toast } from 'react-hot-toast';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';
import { CourseCombobox } from '../components/common/CourseCombobox';
import ListingManageModal from '../components/profile/ListingManageModal';

// Custom SVG icons for widget toggles
const WeatherSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/>
  </svg>
);

const LibrarySvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm6.62,31.47,46.82-10.05,3.34,15.9L146,97.53Zm6.64,31.57,46.82-10.06,13.3,63.24-46.82,10.06ZM216,197.94l-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm0,32h48v96H56Zm48,128H56V192h48v16Z"/>
  </svg>
);

// Helper function to check if a listing is expiring soon (within 2 days)
const isExpiringSoon = (expiresAt) => {
  if (!expiresAt) return false;
  const expiryDate = new Date(expiresAt);
  const today = new Date();
  const inTwoDays = new Date(today);
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  return expiryDate <= inTwoDays;
};

const Profile = () => {
  const navigate = useNavigate();
  const { actions } = useAppContext();

  const [theme, setTheme] = useLocalStorage('theme', 'light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const [profile, setProfile] = useLocalStorage('ucc_profile', {
    name: '',
    phone: '',
    course: '',
    level: '',
    semester: '1',
    student_id: '',
    avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=UCCStudent&backgroundColor=cce1eb,99c3d6`
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [homeWidgets, setHomeWidgets] = useLocalStorage(LS_KEYS.HOME_WIDGETS, DEFAULT_HOME_WIDGETS);
  const { deviceId, getTimeSinceLastSync, shouldSync } = useDeviceId();
  const [copiedId, setCopiedId] = useState(false);
  const [restoreId, setRestoreId] = useState('');
  const [restorePin, setRestorePin] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('ucc_notifications_enabled', true);

  // Local form state for the edit modal
  const [formData, setFormData] = useState(profile);

  // Thrift listings state
  const [thriftListings, setThriftListings] = useState([]);
  const [isLoadingThrift, setIsLoadingThrift] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showAllListings, setShowAllListings] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  useEffect(() => {
    const loadThriftListings = async () => {
      setIsLoadingThrift(true);
      const userId = localStorage.getItem('ucc_user_id');
      if (userId) {
        const { listings, error } = await fetchUserThriftListings(userId);
        if (!error) {
          setThriftListings(listings);
        }
      }
      setIsLoadingThrift(false);
    };
    loadThriftListings();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    if (!formData.phone || !formData.phone.trim()) {
      toast.error('Phone number is required.');
      return;
    }
    // Save to local state and localStorage immediately, close the modal instantly
    setProfile(formData);
    setIsEditModalOpen(false);
    
    // Trigger auth/sync in the background without blocking the UI
    triggerAuthSheet(() => {});
  };

  const toggleWidget = (key) => {
    setHomeWidgets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const widgetToggles = [
    { key: 'classes', label: "Today's Classes", Icon: Clock },
    { key: 'tasks', label: "Today's Tasks", Icon: ListChecks },
    { key: 'calendar', label: 'Academic Calendar', Icon: Calendar },
    { key: 'weather', label: 'Weather', Icon: WeatherSvgIcon },
    { key: 'library', label: 'Library Status', Icon: LibrarySvgIcon },
    { key: 'quickNote', label: 'Quick Note', Icon: StickyNote },
  ];

  const copyDeviceId = () => {
    navigator.clipboard.writeText(deviceId).then(() => {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    });
  };

  const handleRestore = async () => {
    if (!restoreId.trim() || !restorePin) return;
    setIsRestoring(true);
    const restoreToast = toast.loading('Restoring your data...');
    try {
      const { restoreLifecycle } = await import('../services/authService');
      const authResult = await restoreLifecycle(restoreId.trim().toUpperCase(), restorePin);
      if (!authResult.success) {
        toast.error(`Restore failed: ${authResult.error}`, { id: restoreToast });
        setIsRestoring(false);
        return;
      }

      const result = await restoreFromCloud();
      if (result.success) {
        setRestoreId('');
        setRestorePin('');
        toast.success('Data restored! Reloading...', { id: restoreToast, duration: 2000 });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(`Restore failed: ${result.error || 'No data found for this ID.'}`, { id: restoreToast });
      }
    } catch (err) {
      toast.error(`Restore failed: ${err.message}`, { id: restoreToast });
    } finally {
      setIsRestoring(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your app data? This cannot be undone.')) {
      toast.loading('Clearing data...');
      localStorage.clear();
      setTimeout(() => window.location.reload(), 800);
    }
  };

  const handleResetCoach = () => {
    localStorage.removeItem('ucc_coach_home');
    localStorage.removeItem('ucc_coach_map');
    localStorage.removeItem('ucc_coach_tools');
    localStorage.removeItem('ucc_coach_community');
    localStorage.removeItem('ucc_coach_profile');
    toast.success('Welcome Guide overlays reset successfully!');
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'UCC Campus Guide',
      text: "Hey! I'm using the UCC Campus Guide app for my timetable, GPA, and campus updates. Check it out here:",
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText('https://uccguide.com').then(() => {
        toast.success('App link copied to clipboard!');
      });
    }
  };

  return (
    <>
    <div className="min-h-screen bg-white pb-28 font-sans">

      {/* ── Main Profile View ────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))] space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Profile</h1>
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <CustomSettings size={18} />
          </button>
        </div>

        {/* Vertical Wallet Pass Student ID Card */}
        <div className="relative group mb-8 mt-4 cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
          <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 transform-gpu group-hover:-translate-y-1 bg-gradient-to-br from-[#3fa2c6] to-[#1e7898] border border-white/20">

            {/* Top Section */}
            <div className="p-6 pb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="UCC" className="w-10 h-10 object-contain rounded-md shadow-sm" />
                    <div>
                      <h3 className="text-white font-black tracking-widest text-sm uppercase leading-tight drop-shadow-sm">Campus Guide</h3>
                      <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">Student ID</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-white font-mono font-bold text-sm tracking-wider drop-shadow-sm">
                      {profile.student_id || 'PS/ITC/20/0000'}
                    </p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="w-[68px] h-[68px] bg-[#ffffff] p-1.5 rounded-xl shadow-md border border-white/20 opacity-95">
                  <img
                    src={`https://quickchart.io/qr?text=${encodeURIComponent(
                      `UCC ID: ${profile.student_id || 'N/A'}\nName: ${profile.name || 'N/A'}\nCourse: ${profile.course || 'N/A'}`
                    )}&margin=1&size=150`}
                    alt="QR Code"
                    className="w-full h-full object-contain mix-blend-multiply"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-end gap-5 relative z-10">
                <div className="w-[4.5rem] h-[4.5rem] rounded-xl overflow-hidden shadow-xl shrink-0 border-2 border-white/40">
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pb-1">
                  <h2 className="text-xl sm:text-[1.35rem] font-black text-white leading-tight mb-0.5 drop-shadow-md break-words line-clamp-2">
                    {profile.name || 'Setup your profile'}
                  </h2>
                  <p className="text-white/90 text-[10px] sm:text-xs font-bold uppercase tracking-wider drop-shadow-sm break-words line-clamp-2 leading-snug">
                    {profile.course || 'Course'} {profile.level && `  L${profile.level}`} {profile.semester && ` Sem ${profile.semester}`}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 opacity-80">
                    <Fingerprint size={12} className="text-white/70" />
                    <span className="text-white font-mono font-bold text-[9px] uppercase tracking-[0.2em] drop-shadow-sm">
                      App ID: {deviceId || 'UNKNOWN'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold text-gray-400">Tap card to edit details</span>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* ── User's Thrift Listings ──────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#002F45] flex items-center justify-center">
              <CreditCard size={17} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Your Listings</h3>
              <p className="text-xs text-gray-400 font-medium">Manage your thrift items</p>
            </div>
          </div>

          {isLoadingThrift ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw size={20} className="animate-spin text-gray-300" />
            </div>
          ) : thriftListings.length > 0 ? (
            <div className="space-y-2">
              {(showAllListings ? thriftListings : thriftListings.slice(0, 3)).map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => {
                    setSelectedListing(listing);
                    setShowManageModal(true);
                  }}
                  className="w-full text-left border border-gray-100 rounded-xl p-4 bg-white hover:bg-gray-50/50 transition-all active:scale-[0.99]"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0 pr-3">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{listing.item_name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">GH₵{listing.price}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {listing.is_sold && (
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">Sold</span>
                      )}
                      {listing.is_featured && !listing.is_sold && (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">Featured</span>
                      )}
                      {!listing.is_sold && !listing.is_featured && isExpiringSoon(listing.expires_at) && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded-full text-[10px] font-bold">Expiring</span>
                      )}
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  </div>
                </button>
              ))}

              {thriftListings.length > 3 && (
                <button
                  onClick={() => setShowAllListings(!showAllListings)}
                  className="w-full text-center text-xs font-bold text-[#002F45] hover:underline py-2"
                >
                  {showAllListings ? 'Show Less' : `Show ${thriftListings.length - 3} More`}
                </button>
              )}

              <button
                onClick={() => navigate('/community?tab=thrift')}
                className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600 py-1"
              >
                Browse all thrift items →
              </button>
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-400 font-medium">No listings yet</p>
              <button
                onClick={() => navigate('/community?tab=thrift')}
                className="mt-2 text-xs font-bold text-[#002F45] hover:underline"
              >
                Browse thrift items →
              </button>
            </div>
          )}
        </div>

        {/* Promotional Card (Support Project) — NOW routes to /support */}
        <div
          onClick={() => navigate('/support')}
          className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Support the Guide</h3>
            <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed mb-3">
              Help us keep this app free and growing for all students.
            </p>
            <span className="inline-block bg-[#002F45] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
              Read Our Story
            </span>
          </div>
          <div className="relative z-10 w-24 h-24 -mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
            <img src="/Savings.png" alt="Support" className="w-full h-full object-contain drop-shadow-md" />
          </div>
        </div>

        {/* Customize Home */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">Customize Home</h2>
          <p className="text-xs text-gray-500 font-medium -mt-2 mb-4">Choose what appears on your home screen.</p>
          <div className="space-y-1">
            {widgetToggles.map(({ key, label, Icon }) => (
              <div key={key} className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <Icon size={18} className="text-gray-600" strokeWidth={1.5} />
                  </div>
                  <span className="text-[15px] text-gray-900 font-medium">{label}</span>
                </div>
                <button
                  onClick={() => toggleWidget(key)}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${
                    homeWidgets[key] ? 'bg-[#002F45]' : 'bg-gray-200'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                    homeWidgets[key] ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Smart Section — Device Identity & Cloud Sync */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">Cloud Sync</h2>

          {/* Device ID Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#002F45]/10 flex items-center justify-center flex-shrink-0">
                <Fingerprint size={20} className="text-[#002F45]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Unique ID</p>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-sm font-black text-[#002F45] tracking-wider">{deviceId}</code>
                  <button
                    onClick={copyDeviceId}
                    className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-[#002F45] transition-colors active:scale-95"
                    title="Copy ID"
                  >
                    {copiedId ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <Cloud size={14} className={getTimeSinceLastSync() ? 'text-green-500' : 'text-gray-300'} />
              <span>
                {getTimeSinceLastSync()
                  ? `Last synced ${getTimeSinceLastSync()}`
                  : 'Not synced yet — will sync automatically'}
              </span>
            </div>
          </div>

          {/* Restore Data */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-sm font-bold text-gray-900 mb-3">Restore from another device</p>
            <p className="text-xs text-gray-500 font-medium mb-3">Enter your old ID and 6-digit PIN to pull your saved data.</p>
            <div className="flex flex-col gap-2.5">
              <input
                type="text"
                value={restoreId}
                onChange={(e) => setRestoreId(e.target.value.toUpperCase())}
                placeholder="UCC-XXXXXXXX"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#002F45]/20 focus:border-[#002F45] transition-all placeholder:text-gray-300 placeholder:font-sans placeholder:tracking-normal"
                maxLength={12}
              />
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={restorePin}
                onChange={(e) => setRestorePin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="6-Digit PIN"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-[#002F45]/20 focus:border-[#002F45] transition-all placeholder:text-gray-300 placeholder:tracking-normal text-center"
                maxLength={6}
              />
              <button
                onClick={handleRestore}
                disabled={isRestoring || restoreId.length < 12 || restorePin.length < 6}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  isRestoring
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-[#002F45] text-white hover:bg-[#001a26] shadow-md shadow-[#002F45]/10'
                }`}
              >
                {isRestoring ? <RefreshCw size={16} className="animate-spin" /> : 'Restore Data'}
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Quick Settings Links */}
        <div>
          <h2 className="text-lg font-black text-gray-900 mb-4 px-2">Quick Settings</h2>

          <div className="space-y-1">
            <div className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <Moon size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Dark Mode</span>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${
                  theme === 'dark' ? 'bg-[#002F45]' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <User size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Personal information</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={handleShareApp}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Share2 size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Invite Friends (Share App)</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <div className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <Bell size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">App Notifications</span>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${
                  notificationsEnabled ? 'bg-[#002F45]' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <button
              onClick={() => navigate('/support')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <AboutIcon size={20} className="text-gray-700" />
                <span className="text-[15px] text-gray-900 font-medium">About & Support</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">UCC Contacts & Help</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <CustomSettings size={20} className="text-gray-700" />
                <span className="text-[15px] text-gray-900 font-medium">Full Settings</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/terms')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <FileText size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Terms of Service</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/privacy')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Shield size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Privacy Policy</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            {!localStorage.getItem(LS_KEYS.FEEDBACK_SUBMITTED) && (
              <button
                onClick={() => actions?.setShowFeedbackModal(true)}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle size={20} className="text-[#002F45]" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">Take Survey Test</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>
            )}

            <button
              onClick={handleResetCoach}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <CustomCoach size={20} className="text-[#002F45]" />
                <span className="text-[15px] text-gray-900 font-medium">Replay Welcome Guide (Coach)</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={handleClearData}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Trash2 size={20} className="text-red-500" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Clear App Data</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>
        </div>

        <div className="pt-8 pb-4 text-center">
          <p className="text-xs font-bold text-gray-300 tracking-widest uppercase">UCC Campus Guide v2.0</p>
        </div>

      </div>

      {/* ── Edit Profile Modal ─────────────────────────────────────────── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-t-[2rem] sm:rounded-2xl flex flex-col max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20 rounded-t-[2rem] sm:rounded-2xl shrink-0">
              <h2 className="text-lg font-black text-gray-900 tracking-tight pl-2">Edit Profile</h2>
              <button
                onClick={handleSave}
                className="text-white bg-[#002F45] font-bold px-4 py-1.5 hover:bg-[#001a26] rounded-lg transition-colors active:scale-95"
              >
                Save
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">

              {/* Avatar Edit Section */}
              <div className="flex flex-col items-center justify-center space-y-4 pt-2 pb-8">
                <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
                  <div className="w-28 h-28 rounded-xl bg-white border-4 border-white shadow-xl overflow-hidden transition-transform group-hover:scale-105">
                    <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit3 size={24} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-white text-[#002F45] w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                    <Edit3 size={18} />
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500">Tap to change avatar</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all placeholder:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 054 123 4567"
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Student ID (Index No.)</label>
                    <input
                      type="text"
                      value={formData.student_id || ''}
                      onChange={(e) => setFormData({ ...formData, student_id: e.target.value.toUpperCase() })}
                      placeholder="e.g. PS/ITC/20/0000"
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all placeholder:text-gray-300 uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative z-50">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Course of Study</label>
                  <CourseCombobox
                    value={formData.course}
                    onChange={(val) => setFormData({ ...formData, course: val })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Level</label>
                    <select
                      value={formData.level || ''}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all"
                    >
                      <option value="">Select Level</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                      <option value="500">500</option>
                      <option value="600">600</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Semester</label>
                    <select
                      value={formData.semester || '1'}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all"
                    >
                      <option value="1">Sem 1</option>
                      <option value="2">Sem 2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 pb-20">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                    isSaving
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <DataLoader className="w-5 h-5 text-gray-400" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Avatar Selection Modal ─────────────────────────────────────── */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900 px-2">Choose Avatar</h2>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <AvatarBuilder
                initialUrl={formData.avatarUrl}
                onSelect={(url) => {
                  setFormData({ ...formData, avatarUrl: url });
                  setIsAvatarModalOpen(false);
                }}
              />
            </div>

          </div>
        </div>
      )}

    </div>

    {/* ── Listing Management Modal ──────────────────────────────────────── */}
    <ListingManageModal
      isOpen={showManageModal}
      onClose={() => setShowManageModal(false)}
      listing={selectedListing}
      onUpdate={(updatedListing) => {
        setThriftListings(prev =>
          prev.map(l => l.id === updatedListing.id ? updatedListing : l)
        );
        setSelectedListing(updatedListing);
      }}
      onDelete={(listingId) => {
        setThriftListings(prev => prev.filter(l => l.id !== listingId));
        setSelectedListing(null);
      }}
    />

    {/* 🧭 Coach Marks Walkthrough */}
    <CoachMarksOverlay 
      storageKey="ucc_coach_profile"
      steps={PROFILE_COACH_STEPS}
    />
    </>
  );
};

const PROFILE_COACH_STEPS = [
  {
    icon: <CustomProfile size={24} />,
    title: 'Your Student ID Card',
    description: 'This screen functions as a digital ID wallet pass. You can tap the card to edit your student details.'
  },
  {
    icon: <CustomSettings size={24} />,
    title: 'Manage Widgets',
    description: 'Decide what appears on your home dashboard by toggling custom widgets on and off.'
  },
  {
    icon: <CustomSafetyCheck size={24} />,
    title: 'Cloud Sync backups',
    description: 'Secure your app progress and timetable logs in the cloud using your unique ID and recovery PIN.'
  },
  {
    icon: <CustomContact size={24} />,
    title: 'Student Help Desk',
    description: 'Get support, report campus issues, or request guidelines through our student portal contact center.'
  }
];

export default Profile;
