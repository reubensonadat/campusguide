import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCampus } from '../context/CampusContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDeviceId } from '../hooks/useDeviceId';
import { updatePin, restoreLifecycle } from '../services/authService';
import { restoreFromCloud } from '../services/syncService';
import notificationService from '../services/notificationService';
import { LS_KEYS, DEFAULT_HOME_WIDGETS } from '../utils/constants';
import CampusSelectorModal from '../components/common/CampusSelectorModal';
import { sanitizeGhanaPhone, isValidGhanaPhone } from '../utils/helpers';
import { toast } from 'react-hot-toast';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';
import { CustomCoach } from '../components/common/CustomIcons';
import ConfirmModal from '../components/common/ConfirmModal';
import {
  Trash2, Download, Lock, Moon, User, Share2, Bell, Smartphone,
  Phone, FileText, HelpCircle, ChevronRight, Wifi, Info, Sun
} from 'lucide-react';
import WidgetTogglesSection from '../components/settings/WidgetTogglesSection';
import BackupRestoreSection from '../components/settings/BackupRestoreSection';
import ChangePinModal from '../components/settings/ChangePinModal';
import EditProfileModal from '../components/settings/EditProfileModal';
import GpaLockModal from '../components/settings/GpaLockModal';

const CampusSelectorSection = () => {
  const { selectedCampus } = useCampus();
  const [showCampusModal, setShowCampusModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between group relative z-10">
          <div className="flex items-center gap-4">
            {selectedCampus?.logo ? (
              <img src={import.meta.env.BASE_URL + selectedCampus.logo.replace(/^\//, '')} alt={selectedCampus.shortName} className="w-10 h-10 rounded-xl object-cover shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <span className="font-black text-sm text-gray-600">{selectedCampus?.shortName?.[0] || 'U'}</span>
              </div>
            )}
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">Your Campus</h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{selectedCampus?.name || 'Select a campus'}</p>
            </div>
          </div>
          <button
            onClick={() => setShowCampusModal(true)}
            className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all text-gray-600 hover:text-gray-900"
            aria-label="Change campus"
          >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.9498 7.94975L10.5356 9.36396L8.00079 6.828L8.00004 20H6.00004L6.00079 6.828L3.46451 9.36396L2.05029 7.94975L7.00004 3L11.9498 7.94975ZM21.9498 16.0503L17 21L12.0503 16.0503L13.4645 14.636L16.0008 17.172L16 4H18L18.0008 17.172L20.5356 14.636L21.9498 16.0503Z"></path></svg>
          </button>
        </div>
      </div>
      <CampusSelectorModal isOpen={showCampusModal} onClose={() => setShowCampusModal(false)} title="Switch Campus" subtitle="Select a different university to view its content." />
    </>
  );
};

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
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const [appSettings, setAppSettings] = useLocalStorage('ucc_settings', { push_classes: true, push_whispers: true, data_saver: false });
  const [appColorTheme, setAppColorTheme] = useLocalStorage('ucc_app_color_theme', 'default');

  const handleToggleSetting = (key) => {
    setAppSettings(prev => {
      const updated = { ...prev, [key]: prev[key] === false ? true : false };
      try { notificationService.addTag(key, updated[key] ? "true" : "false"); } catch {}
      setTimeout(() => {
        import('../services/syncService').then(({ syncToCloud }) => {
          syncToCloud();
        });
      }, 500);
      return updated;
    });
  };

  const [systemNotificationsEnabled, setSystemNotificationsEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const check = () => {
      if (cancelled) return;
      try {
        if (notificationService.isPushSupported()) {
          setSystemNotificationsEnabled(notificationService.getSubscriptionState());
          notificationService.onSubscriptionChange((enabled) => {
            if (!cancelled) setSystemNotificationsEnabled(enabled);
          });
          return;
        }
      } catch {}
      if (++attempts < 20) {
        setTimeout(check, 500);
      }
    };
    check();
    return () => { cancelled = true; };
  }, []);

  const handleToggleSystemNotifications = async () => {
    try {
      if (systemNotificationsEnabled) {
        notificationService.unsubscribe();
        setSystemNotificationsEnabled(false);
        toast.success('System notifications disabled');
      } else {
        await notificationService.subscribe();
        setSystemNotificationsEnabled(true);
        toast.success('System notifications enabled!');
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const [isGpaLocked, setIsGpaLocked] = useLocalStorage('ucc_gpa_vault_locked', false);
  const [gpaPin, setGpaPin] = useLocalStorage('ucc_gpa_vault_pin', '');
  const [showGpaLockModal, setShowGpaLockModal] = useState(false);
  const [lockModalMode, setLockModalMode] = useState('setup');
  const [gpaPinInput, setGpaPinInput] = useState('');
  const [gpaPinConfirmInput, setGpaPinConfirmInput] = useState('');

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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleFormChange = (partial) => {
    setFormData(prev => ({ ...prev, ...partial }));
  };

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

  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isPinUpdating, setIsPinUpdating] = useState(false);

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
    const data = { timetable, gpa, exportDate: new Date().toISOString() };
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
    setShowClearConfirm(true);
  };

  const executeClearAllData = () => {
    localStorage.clear();
    toast.success('All data cleared successfully');
    setTimeout(() => window.location.reload(), 800);
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
    <div className="pb-28 bg-white min-h-screen font-sans selection:bg-[#cce1eb] selection:text-gray-900">
      <div className="max-w-3xl mx-auto px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))] space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">

        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Settings</h1>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5">Manage your preferences, data and recovery.</p>
        </div>

        <div className="space-y-8">

          {/* Category 1: Profile & Appearance */}
          <div>
            <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Profile & Appearance</h2>
            <div className="space-y-1">
              <button onClick={() => setIsEditModalOpen(true)}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
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
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Bell size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">Class Reminders</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Timetable push notifications</span>
                  </div>
                </div>
                <button onClick={() => handleToggleSetting('push_classes')}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${appSettings.push_classes !== false ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${appSettings.push_classes !== false ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Bell size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">Whisper Notifications</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Alerts for new Campus Whispers</span>
                  </div>
                </div>
                <button onClick={() => handleToggleSetting('push_whispers')}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${appSettings.push_whispers !== false ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${appSettings.push_whispers !== false ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Smartphone size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">System Push Notifications</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Class reminders when app is closed</span>
                  </div>
                </div>
                <button onClick={handleToggleSystemNotifications}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${systemNotificationsEnabled ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${systemNotificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Sun size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">Daily Schedule Digest</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Morning summary at 6:30 AM</span>
                  </div>
                </div>
                <button onClick={() => handleToggleSetting('push_daily_digest')}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${appSettings.push_daily_digest !== false ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${appSettings.push_daily_digest !== false ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="w-full flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Wifi size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">Data Saver</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Hide images in feeds to save mobile data</span>
                  </div>
                </div>
                <button onClick={() => handleToggleSetting('data_saver')}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${appSettings.data_saver === true ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${appSettings.data_saver === true ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <button onClick={handleShareApp}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
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

          {/* Widget Toggles */}
          <WidgetTogglesSection homeWidgets={homeWidgets} onToggle={toggleWidget} />

          <hr className="border-gray-100" />

          {/* Backup & Cloud Sync */}
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

          {/* App Personalization */}
          <div>
            <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">App Personalization</h2>
            <div className="space-y-4">
              <div className="w-full flex flex-col py-2 group">
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">App Accent Theme</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Choose your flavor of Campus Guide</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'default', name: 'Campus Blue', color: 'bg-primary-500' },
                    { id: 'emerald', name: 'Emerald', color: 'bg-[#10b981]' },
                    { id: 'sunset', name: 'Sunset', color: 'bg-[#f97316]' },
                    { id: 'rose', name: 'Rose', color: 'bg-[#f43f5e]' },
                  ].map(t => (
                    <button key={t.id} onClick={() => { setAppColorTheme(t.id); toast.success('Theme applied! Please close and reopen the app (or reload) to see the changes.', { duration: 4000 }); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${appColorTheme === t.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className={`w-4 h-4 rounded-full ${t.color}`} />
                      <span className={`text-xs font-bold ${appColorTheme === t.id ? 'text-primary-700' : 'text-gray-500'}`}>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Security & Data Management */}
          <div>
            <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Security & Data Management</h2>
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
              <button onClick={handleChangePinClick}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
                <div className="flex items-center gap-4">
                  <Lock size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">Change Recovery PIN</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Secure recovery PIN for cloud restore</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
              </button>

              <div className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <Lock size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">GPA Vault PIN Lock</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Keep your GPA forecasts and scores private</span>
                  </div>
                </div>
                <button onClick={handleGpaLockToggle}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${isGpaLocked ? 'bg-gray-900' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${isGpaLocked ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <button onClick={handleExportData}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
                <div className="flex items-center gap-4">
                  <Download size={20} className="text-gray-700" strokeWidth={1.5} />
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">Export Data</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Download a JSON file of your courses & grades</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
              </button>

              <button onClick={handleResetCoach}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
                <div className="flex items-center gap-4">
                  <CustomCoach size={20} className="text-gray-900" />
                  <div>
                    <span className="text-[15px] text-gray-900 font-bold block leading-tight">Replay Welcome Guide (Coach)</span>
                    <span className="text-xs text-gray-400 font-medium mt-0.5 block leading-none">Resets the fresher onboarding overlays on all tabs</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
              </button>

              <button onClick={handleClearAllData}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
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

          {/* Campus */}
          <CampusSelectorSection />

          <hr className="border-gray-100" />

          {/* Legal & Support */}
          <div>
            <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Legal & Support</h2>
            <div className="space-y-1">
              <button onClick={() => navigate('/support')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
                <div className="flex items-center gap-4">
                  <HelpCircle size={20} className="text-gray-700" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">About & Support Project</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
              </button>

              <button onClick={() => navigate('/contact')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-gray-700" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">UCC Contacts & Help Directories</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
              </button>

              <button onClick={() => navigate('/terms')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
                <div className="flex items-center gap-4">
                  <FileText size={20} className="text-gray-700" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">Terms of Service</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-950 transition-colors" />
              </button>

              <button onClick={() => navigate('/privacy')}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0 text-left focus:outline-none">
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700"><path d="M14 9V4H5V20H11.0563C11.3838 20.4171 11.7803 20.7847 12.236 21.0848L13.626 22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8V9H14ZM12 11H21V16.949C21 17.9397 20.4987 18.8648 19.6641 19.4144L16.5 21.4978L13.3359 19.4144C12.5013 18.8648 12 17.9397 12 16.949V11ZM14 16.949C14 17.2652 14.1616 17.5634 14.4358 17.744L16.5 19.1032L18.5642 17.744C18.8384 17.5634 19 17.2652 19 16.949V13H14V16.949Z"></path></svg>
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

        </div>
      </div>

      {/* Modals */}
      <ChangePinModal
        isOpen={isChangePinOpen}
        onClose={() => { setIsChangePinOpen(false); setNewPin(''); }}
        newPin={newPin}
        onPinChange={setNewPin}
        onSubmit={handleUpdatePin}
        isUpdating={isPinUpdating}
      />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={formData}
        onFormChange={handleFormChange}
        onSave={handleSaveProfile}
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
      <ConfirmModal
        open={showClearConfirm}
        title="Clear All Data"
        message="Are you sure you want to clear all app data? This action cannot be undone."
        confirmLabel="Clear"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => { setShowClearConfirm(false); executeClearAllData(); }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
};

export default Settings;
