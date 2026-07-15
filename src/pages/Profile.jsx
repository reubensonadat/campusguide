import React, { useState, useEffect } from 'react';
import {
  Fingerprint, ChevronRight, CreditCard, RefreshCw, Bell, Moon, User,
  Share2, Lock, Phone, FileText, CheckCircle, Trash2, HelpCircle, X
} from 'lucide-react';
import { DataLoader } from '../components/common/CustomLoaders';
import { sanitizeGhanaPhone, isValidGhanaPhone } from '../utils/helpers';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDeviceId } from '../hooks/useDeviceId';
import { AvatarBuilder } from '../components/profile/AvatarBuilder';
import { useNavigate } from 'react-router-dom';
import { usePremiumAccess, TIERS } from '../hooks/usePremiumAccess';
import { CustomSettings, CustomProfile, CustomSafetyCheck, CustomCoach, CustomContact } from '../components/common/CustomIcons';
import { CoachMarksOverlay } from '../components/common/CoachMarksOverlay';
import { AboutIcon } from '../common/CustomTaskIcons';
import { useAppContext } from '../context/AppContext';
import { LS_KEYS, DEFAULT_HOME_WIDGETS } from '../utils/constants';
import { restoreFromCloud } from '../services/syncService';
import { fetchUserThriftListings } from '../services/thriftService';
import { toast } from 'react-hot-toast';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';
import OneSignal from 'react-onesignal';
import { CourseCombobox } from '../components/common/CourseCombobox';
import ListingManageModal from '../components/profile/ListingManageModal';
import { getProductivityStats } from '../services/productivityService';
import { ProductivityGraph } from '../components/common/ProductivityGraph';
import WidgetTogglesSection from '../components/settings/WidgetTogglesSection';
import BackupRestoreSection from '../components/settings/BackupRestoreSection';
import EditProfileModal from '../components/settings/EditProfileModal';
import GpaLockModal from '../components/settings/GpaLockModal';
import SupportBanner from '../components/home/SupportBanner';

const checkExpiryStatus = (expiresAt) => {
  if (!expiresAt) return { isExpired: false, isExpiringSoon: false };
  const expiryDate = new Date(expiresAt);
  const today = new Date();
  const inTwoDays = new Date(today);
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  const isExpired = expiryDate <= today;
  const isExpiringSoon = !isExpired && expiryDate <= inTwoDays;
  return { isExpired, isExpiringSoon };
};

const Profile = () => {
  const navigate = useNavigate();
  const { actions } = useAppContext();
  const { isSupporter, tier } = usePremiumAccess();

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
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [homeWidgets, setHomeWidgets] = useLocalStorage(LS_KEYS.HOME_WIDGETS, DEFAULT_HOME_WIDGETS);
  const { deviceId, getTimeSinceLastSync, shouldSync } = useDeviceId();
  const [copiedId, setCopiedId] = useState(false);
  const [restoreId, setRestoreId] = useState('');
  const [restorePin, setRestorePin] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('ucc_notifications_enabled', true);
  const [systemNotificationsEnabled, setSystemNotificationsEnabled] = useState(false);

  useEffect(() => {
    try {
      if (window.OneSignal && window.OneSignal.User && window.OneSignal.User.PushSubscription) {
        setSystemNotificationsEnabled(window.OneSignal.User.PushSubscription.optedIn);
      }
    } catch (e) { }
  }, []);

  const handleToggleSystemNotifications = async () => {
    try {
      if (systemNotificationsEnabled) {
        OneSignal.User.PushSubscription.optOut();
        setSystemNotificationsEnabled(false);
        toast.success('System notifications disabled');
      } else {
        await OneSignal.Notifications.requestPermission();
        OneSignal.User.PushSubscription.optIn();
        setSystemNotificationsEnabled(true);
        toast.success('System notifications enabled!');
      }
    } catch (e) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        toast.error('OneSignal cannot run on localhost without configuration.');
      } else {
        toast.error('Notification system not initialized yet.');
      }
    }
  };

  const [isGpaLocked, setIsGpaLocked] = useLocalStorage('ucc_gpa_vault_locked', false);
  const [gpaPin, setGpaPin] = useLocalStorage('ucc_gpa_vault_pin', '');
  const [showGpaLockModal, setShowGpaLockModal] = useState(false);
  const [lockModalMode, setLockModalMode] = useState('setup');
  const [gpaPinInput, setGpaPinInput] = useState('');
  const [gpaPinConfirmInput, setGpaPinConfirmInput] = useState('');

  const [formData, setFormData] = useState(profile);

  const [thriftListings, setThriftListings] = useState([]);
  const [isLoadingThrift, setIsLoadingThrift] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showAllListings, setShowAllListings] = useState(false);

  const [prodStats, setProdStats] = useState(null);

  const handleFormChange = (partial) => {
    setFormData(prev => ({ ...prev, ...partial }));
  };

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  useEffect(() => {
    async function loadStats() {
      const data = await getProductivityStats();
      setProdStats(data);
    }
    loadStats();
  }, []);

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
    if (!formData.name || !formData.name.trim()) {
      toast.error('Name is required.');
      return;
    }
    if (!formData.phone || !formData.phone.trim()) {
      toast.error('Phone number is required.');
      return;
    }
    if (!isValidGhanaPhone(formData.phone)) {
      toast.error('Enter a valid 10-digit Ghana number (e.g. 0541234567).');
      return;
    }
    setProfile(formData);
    setIsEditModalOpen(false);
    triggerAuthSheet(() => {
      import('../services/syncService').then(({ triggerBackgroundSync }) => {
        triggerBackgroundSync();
      });
    });
  };

  const toggleWidget = (key) => {
    setHomeWidgets(prev => {
      const apiWidgetKeys = ['verse', 'forex', 'football', 'crypto', 'news', 'quote', 'joke', 'fact', 'github', 'word'];
      if (!prev[key] && apiWidgetKeys.includes(key)) {
        const activeApiCount = apiWidgetKeys.filter(k => prev[k]).length;
        if (activeApiCount >= 3) {
          toast.error('You can only have a maximum of 3 API widgets active at once.');
          return prev;
        }
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  const handleGpaLockToggle = () => {
    if (isGpaLocked) {
      setLockModalMode('deactivate');
      setGpaPinInput('');
    } else {
      setLockModalMode('setup');
      setGpaPinInput('');
      setGpaPinConfirmInput('');
    }
    setShowGpaLockModal(true);
  };

  const handleGpaLockSubmit = (e) => {
    e.preventDefault();
    if (lockModalMode === 'setup') {
      if (gpaPinInput.length !== 6) {
        toast.error('PIN must be exactly 6 digits.');
        return;
      }
      setLockModalMode('confirm');
      setGpaPinConfirmInput('');
    } else if (lockModalMode === 'confirm') {
      if (gpaPinInput !== gpaPinConfirmInput) {
        toast.error('PINs do not match. Please try again.');
        setLockModalMode('setup');
        setGpaPinInput('');
        setGpaPinConfirmInput('');
        return;
      }
      setGpaPin(gpaPinInput);
      setIsGpaLocked(true);
      setShowGpaLockModal(false);
      toast.success('GPA Vault Lock activated successfully!');
    } else if (lockModalMode === 'deactivate') {
      if (gpaPinInput !== gpaPin) {
        toast.error('Incorrect PIN. Authorization failed.');
        return;
      }
      setIsGpaLocked(false);
      setGpaPin('');
      setShowGpaLockModal(false);
      toast.success('GPA Vault Lock disabled.');
    }
  };

  const handleGpaPinInputChange = (type, value) => {
    if (type === 'confirm') {
      setGpaPinConfirmInput(value);
    } else {
      setGpaPinInput(value);
    }
  };

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

  const [isResyncing, setIsResyncing] = useState(false);
  const handleResync = () => {
    triggerAuthSheet(async () => {
      setIsResyncing(true);
      const resyncToast = toast.loading('Re-syncing from cloud...');
      try {
        const result = await restoreFromCloud();
        if (result.success) {
          toast.success('Re-sync complete! Reloading...', { id: resyncToast, duration: 2000 });
          setTimeout(() => window.location.reload(), 1500);
        } else {
          toast.error(`Re-sync failed: ${result.error || 'No cloud data found.'}`, { id: resyncToast });
        }
      } catch (err) {
        toast.error(`Re-sync failed: ${err.message}`, { id: resyncToast });
      } finally {
        setIsResyncing(false);
      }
    });
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
      title: 'Campus Guide',
      text: "Hey! I'm using the UCC Campus Guide app for my timetable, GPA, and campus updates. Check it out here:",
      url: window.location.origin,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log('Error sharing:', err); }
    } else {
      navigator.clipboard.writeText('https://uccguide.com').then(() => {
        toast.success('App link copied to clipboard!');
      });
    }
  };

  const handleBackup = () => {
    triggerAuthSheet(() => {
      import('../services/syncService').then(({ triggerBackgroundSync }) => {
        triggerBackgroundSync();
        toast.success('Backup started! Data will sync in ~5 seconds.');
      });
    });
  };

  return (
    <>
      <div className="min-h-screen bg-white pb-28 font-sans">

        {/* ── Main Profile View ── */}
        <div className="max-w-3xl mx-auto px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))] space-y-8">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Profile</h1>
            <button onClick={() => navigate('/settings')}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <CustomSettings size={18} />
            </button>
          </div>

          {/* Vertical Wallet Pass Student ID Card */}
          <div className="relative group mb-8 mt-4 cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
            <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 transform-gpu group-hover:-translate-y-1 bg-gradient-to-br from-[#3fa2c6] to-[#1e7898] border border-white/20">

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
                    {isSupporter && (
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 w-max">
                        <span className="text-sm drop-shadow-sm flex items-center justify-center">
                          {TIERS[tier]?.icon || (
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fbbf24" className="w-4 h-4">
                               <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                             </svg>
                          )}
                        </span>
                        <span className="text-white font-black text-[10px] tracking-widest uppercase drop-shadow-sm">
                          {TIERS[tier]?.label || 'Supporter'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="w-[68px] h-[68px] bg-[#ffffff] p-1.5 rounded-xl shadow-md border border-white/20 opacity-95">
                    <img src={`https://quickchart.io/qr?text=${encodeURIComponent(`UCC ID: ${profile.student_id || 'N/A'}\nName: ${profile.name || 'N/A'}\nCourse: ${profile.course || 'N/A'}`)}&margin=1&size=150`}
                      alt="QR Code" className="w-full h-full object-contain mix-blend-multiply" crossOrigin="anonymous" />
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
                        App ID: {deviceId ? `UCC-••••${deviceId.slice(-4)}` : 'UNKNOWN'}
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

          <ProductivityGraph />

          <hr className="border-gray-100" />

          {/* ── User's Thrift Listings ── */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
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
                  <button key={listing.id}
                    onClick={() => { setSelectedListing(listing); setShowManageModal(true); }}
                    className="w-full text-left border border-gray-100 rounded-xl p-4 bg-white hover:bg-gray-50/50 transition-all active:scale-[0.99]">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0 pr-3">
                        <h4 className="font-bold text-gray-900 text-sm truncate">{listing.item_name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">GH₵{listing.price}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {listing.is_sold && <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">Sold</span>}
                        {listing.is_featured && !listing.is_sold && <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">Featured</span>}
                        {!listing.is_sold && !listing.is_featured && (
                          <>
                            {checkExpiryStatus(listing.expires_at).isExpired
                              ? <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-[10px] font-bold">Expired</span>
                              : checkExpiryStatus(listing.expires_at).isExpiringSoon
                                ? <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded-full text-[10px] font-bold">Expiring</span>
                                : null}
                          </>
                        )}
                        <ChevronRight size={16} className="text-gray-300" />
                      </div>
                    </div>
                  </button>
                ))}
                {thriftListings.length > 3 && (
                  <button onClick={() => setShowAllListings(!showAllListings)}
                    className="w-full text-center text-xs font-bold text-gray-900 hover:underline py-2">
                    {showAllListings ? 'Show Less' : `Show ${thriftListings.length - 3} More`}
                  </button>
                )}
                <button onClick={() => navigate('/community?tab=thrift')}
                  className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600 py-1">
                  Browse all thrift items →
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-400 font-medium">No listings yet</p>
                <button onClick={() => navigate('/community?tab=thrift')}
                  className="mt-2 text-xs font-bold text-gray-900 hover:underline">
                  Browse thrift items →
                </button>
              </div>
            )}
          </div>

          {/* Support the Guide */}
          <SupportBanner actions={actions} />

          {/* Push Reminders */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden mt-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
            <div className="flex items-center justify-between group relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${systemNotificationsEnabled ? 'bg-gray-900/5 text-gray-900' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600'}`}>
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-gray-900">Push Reminders</h3>
                  <p className="text-[13px] text-gray-500 font-medium">Get notified when app is closed</p>
                </div>
              </div>
              <button onClick={handleToggleSystemNotifications}
                className={`relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${systemNotificationsEnabled ? 'bg-gray-900' : 'bg-gray-200'}`}>
                <span className={`pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${systemNotificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Widget Toggles */}
          <WidgetTogglesSection homeWidgets={homeWidgets} onToggle={toggleWidget} />

          <hr className="border-gray-100" />

          {/* Cloud Sync */}
          <BackupRestoreSection
            deviceId={deviceId}
            copiedId={copiedId}
            onCopyId={copyDeviceId}
            timeSinceLastSync={getTimeSinceLastSync()}
            restoreId={restoreId}
            onRestoreIdChange={setRestoreId}
            restorePin={restorePin}
            onRestorePinChange={setRestorePin}
            isRestoring={isRestoring}
            onRestore={handleRestore}
            isResyncing={isResyncing}
            onBackup={handleBackup}
            onResync={handleResync}
          />

          <hr className="border-gray-100" />

          {/* Quick Settings */}
          <div>
            <h2 className="text-lg font-black text-gray-900 mb-4 px-2">Quick Settings</h2>
            <div className="space-y-1">
              <div className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Moon size={20} className="text-gray-700" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">Dark Mode</span>
                </div>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <button onClick={() => setIsEditModalOpen(true)}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <User size={20} className="text-gray-700" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">Personal information</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>

              <button onClick={handleShareApp}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
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
                <button onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${notificationsEnabled ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Lock size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[15px] text-gray-900 font-medium">GPA Vault PIN Lock</span>
                    <span className="text-[10.5px] text-gray-400 font-medium">Keep your GPA forecasts and scores private</span>
                  </div>
                </div>
                <button onClick={handleGpaLockToggle}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${isGpaLocked ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${isGpaLocked ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <button onClick={() => navigate('/support')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <HelpCircle size={20} className="text-gray-700" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">About & Support</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>

              <button onClick={() => navigate('/contact')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-gray-700" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">UCC Contacts & Help</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>

              <button onClick={() => navigate('/settings')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <CustomSettings size={20} className="text-gray-700" />
                  <span className="text-[15px] text-gray-900 font-medium">Full Settings</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>

              <button onClick={() => navigate('/terms')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <FileText size={20} className="text-gray-700" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">Terms of Service</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>

              <button onClick={() => navigate('/privacy')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700"><path d="M14 9V4H5V20H11.0563C11.3838 20.4171 11.7803 20.7847 12.236 21.0848L13.626 22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8V9H14ZM12 11H21V16.949C21 17.9397 20.4987 18.8648 19.6641 19.4144L16.5 21.4978L13.3359 19.4144C12.5013 18.8648 12 17.9397 12 16.949V11ZM14 16.949C14 17.2652 14.1616 17.5634 14.4358 17.744L16.5 19.1032L18.5642 17.744C18.8384 17.5634 19 17.2652 19 16.949V13H14V16.949Z"></path></svg>
                  <span className="text-[15px] text-gray-900 font-medium">Privacy Policy</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>

              {!localStorage.getItem(LS_KEYS.FEEDBACK_SUBMITTED) && (
                <button onClick={() => actions?.setShowFeedbackModal(true)}
                  className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <CheckCircle size={20} className="text-gray-900" strokeWidth={1.5} />
                    <span className="text-[15px] text-gray-900 font-medium">Take Survey Test</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                </button>
              )}

              <button onClick={handleResetCoach}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <CustomCoach size={20} className="text-gray-900" />
                  <span className="text-[15px] text-gray-900 font-medium">Replay Welcome Guide (Coach)</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>

              <button onClick={handleClearData}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
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

        {/* Modals */}
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          formData={formData}
          onFormChange={handleFormChange}
          onSave={handleSave}
          onAvatarOpen={() => setIsAvatarOpen(!isAvatarOpen)}
          isAvatarOpen={isAvatarOpen}
          onAvatarSelect={(url) => { setFormData(prev => ({ ...prev, avatarUrl: url })); setIsAvatarOpen(false); }}
          isSaving={isSaving}
        />

        <GpaLockModal
          isOpen={showGpaLockModal}
          onClose={() => setShowGpaLockModal(false)}
          mode={lockModalMode}
          pinInput={gpaPinInput}
          pinConfirmInput={gpaPinConfirmInput}
          onInputChange={handleGpaPinInputChange}
          onSubmit={handleGpaLockSubmit}
        />
      </div>

      {/* Listing Management Modal */}
      <ListingManageModal
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        listing={selectedListing}
        onUpdate={(updatedListing) => {
          setThriftListings(prev => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
          setSelectedListing(updatedListing);
        }}
        onDelete={(listingId) => {
          setThriftListings(prev => prev.filter(l => l.id !== listingId));
          setSelectedListing(null);
        }}
      />

      {/* Coach Marks */}
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
