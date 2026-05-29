import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDeviceId } from '../hooks/useDeviceId';
import { updatePin, restoreLifecycle } from '../services/authService';
import { restoreFromCloud } from '../services/syncService';
import { LS_KEYS, DEFAULT_HOME_WIDGETS } from '../utils/constants';
import { toast } from 'react-hot-toast';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';
import { CourseCombobox } from '../components/common/CourseCombobox';
import { AvatarBuilder } from '../components/profile/AvatarBuilder';
import { ArrowLeft } from 'lucide-react';
import {
  Trash2,
  Download,
  Shield,
  Bell,
  Smartphone,
  Info,
  AlertTriangle,
  Settings as SettingsIcon,
  Sparkles,
  RefreshCcw,
  ArrowRight,
  Calendar,
  BarChart3,
  Lock,
  Moon,
  User,
  Share2,
  Phone,
  FileText,
  Fingerprint,
  Copy,
  Check,
  Cloud,
  ChevronRight,
  ListChecks,
  StickyNote,
  HelpCircle,
  Clock,
  X,
  Edit3,
  Camera,
  Save,
  CheckCircle,
  CreditCard
} from 'lucide-react';

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

const Settings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { actions } = useAppContext();
  const [timetable] = useLocalStorage('ucc_timetable', []);
  const [gpa] = useLocalStorage('ucc_gpa', []);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const [profile, setProfile] = useLocalStorage('ucc_profile', {
    name: '',
    phone: '',
    course: '',
    level: '',
    semester: '1',
    student_id: '',
    avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=UCCStudent&backgroundColor=cce1eb,99c3d6`
  });

  const [homeWidgets, setHomeWidgets] = useLocalStorage(LS_KEYS.HOME_WIDGETS, DEFAULT_HOME_WIDGETS);
  const { deviceId, getTimeSinceLastSync } = useDeviceId();
  const [copiedId, setCopiedId] = useState(false);
  const [restoreId, setRestoreId] = useState('');
  const [restorePin, setRestorePin] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('ucc_notifications_enabled', true);

  // Edit profile states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Change Recovery PIN states
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isPinUpdating, setIsPinUpdating] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSaveProfile = () => {
    setProfile(formData);
    setIsEditModalOpen(false);
    triggerAuthSheet(() => {});
  };

  const toggleWidget = (key) => {
    setHomeWidgets(prev => ({ ...prev, [key]: !prev[key] }));
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

  const handleChangePinClick = () => {
    triggerAuthSheet(() => {
      setIsChangePinOpen(true);
    });
  };

  const handleUpdatePin = async (e) => {
    e.preventDefault();
    if (newPin.length < 6) {
      toast.error('PIN must be at least 6 digits');
      return;
    }
    setIsPinUpdating(true);
    const res = await updatePin(newPin);
    setIsPinUpdating(false);
    
    if (res.success) {
      toast.success('Security PIN updated successfully!');
      setIsChangePinOpen(false);
      setNewPin('');
    } else {
      toast.error(res.error || 'Failed to update PIN');
    }
  };

  const handleExportData = () => {
    const data = {
      timetable,
      gpa,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ucc-guide-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all app data? This action cannot be undone.')) {
      localStorage.clear();
      toast.success('All data cleared successfully');
      setTimeout(() => window.location.reload(), 800);
    }
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

  const widgetToggles = [
    { key: 'classes', label: "Today's Classes", Icon: Clock },
    { key: 'tasks', label: "Today's Tasks", Icon: ListChecks },
    { key: 'calendar', label: 'Academic Calendar', Icon: Calendar },
    { key: 'weather', label: 'Weather', Icon: WeatherSvgIcon },
    { key: 'library', label: 'Library Status', Icon: LibrarySvgIcon },
    { key: 'quickNote', label: 'Quick Note', Icon: StickyNote },
  ];

  return (
    <div className="pb-28 bg-white min-h-screen font-sans selection:bg-[#cce1eb] selection:text-[#002F45]">
      <div className="max-w-3xl mx-auto px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))] space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
        
        {/* Header matching Profile style */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Settings</h1>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5">Manage your preferences, data and recovery.</p>
        </div>

        <div className="space-y-8">
        
        {/* Category 1: Profile & Appearance */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Profile & Appearance</h2>
          <div className="space-y-1">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <User size={20} className="text-gray-700" strokeWidth={1.5} />
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">Personal Information</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Update name, ID, course, level</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
            </button>

            <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <Moon size={20} className="text-gray-700" strokeWidth={1.5} />
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">Dark Mode</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Sleek interface for night use</span>
                </div>
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

            <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <Bell size={20} className="text-gray-700" strokeWidth={1.5} />
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">App Notifications</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Timetable reminders and radar alerts</span>
                </div>
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
              onClick={handleShareApp}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <Share2 size={20} className="text-gray-700" strokeWidth={1.5} />
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">Invite Friends</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Share UCC Campus Guide app link</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
            </button>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Category 2: Customize Home Screen */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Customize Home Screen</h2>
          <p className="text-xs text-gray-500 font-medium mb-3 px-1">Select which panels appear on your home feed.</p>
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

        {/* Category 3: Backup & Cloud Sync */}
        <div className="space-y-4">
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Backup & Cloud Sync</h2>
          
          {/* Unique Device ID block */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#002F45]/10 flex items-center justify-center flex-shrink-0">
                <Fingerprint size={20} className="text-[#002F45]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Unique App ID</p>
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

          {/* Restore data inputs */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-sm font-bold text-gray-900 mb-3">Restore from another device</p>
            <p className="text-xs text-gray-500 font-medium mb-3">Enter your old App ID and 6-digit PIN to retrieve your sync history.</p>
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

        {/* Category 4: Security & Data */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Security & Data Management</h2>
          
          {/* Simple Borderless Stats row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
              <div className="text-xl font-black text-gray-900 tracking-tight">{timetable.length}</div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Timetable Courses</div>
            </div>
            <div className="text-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
              <div className="text-xl font-black text-gray-900 tracking-tight">{gpa.length}</div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">GPA Courses</div>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={handleChangePinClick}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <Lock size={20} className="text-gray-700" strokeWidth={1.5} />
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">Change Recovery PIN</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Secure recovery PIN for cloud restore</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
            </button>

            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <Download size={20} className="text-gray-700" strokeWidth={1.5} />
                <div>
                  <span className="text-[15px] text-gray-900 font-bold block leading-tight">Export Data</span>
                  <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Download a JSON file of your courses & grades</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
            </button>

            <button
              onClick={handleClearAllData}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <Trash2 size={20} className="text-red-500" strokeWidth={1.5} />
                <div>
                  <span className="text-[15px] text-red-600 font-bold block leading-tight">Clear All App Data</span>
                  <span className="text-xs text-red-400/80 font-medium mt-0.5 block leading-none">Wipes local database and settings resets</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-red-600 transition-colors" />
            </button>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Category 5: Legal & Support links */}
        <div>
          <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Legal & Support</h2>
          <div className="space-y-1">
            <button
              onClick={() => navigate('/support')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <HelpCircle size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">About & Support Project</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">UCC Contacts & Help Directories</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/terms')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <FileText size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Terms of Service</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/privacy')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <Shield size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Privacy Policy</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-8 text-gray-400">
          <Info size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Version 2.0.0</span>
        </div>

      </div></div>

      {/* Modal - Change Recovery PIN */}
      {isChangePinOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-8 duration-300 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h2 className="text-lg font-black text-gray-900 pl-2">Change Recovery PIN</h2>
              <button
                onClick={() => {
                  setIsChangePinOpen(false);
                  setNewPin('');
                }}
                className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdatePin} className="space-y-4">
              <p className="text-sm text-gray-500">
                Enter a new 6-digit PIN to secure your data recoveries.
              </p>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">New 6-Digit PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-2xl tracking-[0.5em] text-center font-bold focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all"
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 text-base font-bold bg-[#002F45] text-white hover:bg-[#001a26] rounded-xl active:scale-95 transition-all disabled:bg-gray-100 disabled:text-gray-400"
                  disabled={isPinUpdating || newPin.length < 6}
                >
                  {isPinUpdating ? 'Updating...' : 'Update PIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit Profile Modal ─────────────────────────────────────────── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-t-[2rem] sm:rounded-2xl flex flex-col max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20 rounded-t-[2rem] sm:rounded-2xl shrink-0">
              <h2 className="text-lg font-black text-gray-900 tracking-tight pl-2">Edit Profile</h2>
              <button
                onClick={handleSaveProfile}
                className="text-white bg-[#002F45] font-bold px-4 py-1.5 hover:bg-[#001a26] rounded-lg transition-colors active:scale-95"
              >
                Save
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
              {/* Avatar Edit */}
              <div className="flex flex-col items-center justify-center space-y-4 pt-2 pb-8">
                <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
                  <div className="w-28 h-28 rounded-xl bg-white border-4 border-white shadow-xl overflow-hidden transition-transform group-hover:scale-105">
                    <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit3 size={24} className="text-white" />
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
                    className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 054 123 4567"
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Student ID (Index No.)</label>
                    <input
                      type="text"
                      value={formData.student_id || ''}
                      onChange={(e) => setFormData({ ...formData, student_id: e.target.value.toUpperCase() })}
                      placeholder="e.g. PS/ITC/20/0000"
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all"
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

              <div className="pt-4 pb-20">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Save Changes
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
  );
};

export default Settings;
