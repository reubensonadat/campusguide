 import React, { useState, useEffect } from 'react';
import { User, Trash2, Phone, Mail, ChevronRight, X, Shield, HelpCircle, CheckCircle, Heart, Edit3, Calendar, StickyNote, Clock, ListChecks, Copy, Fingerprint, Cloud, CloudOff, RefreshCw, Check } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDeviceId } from '../hooks/useDeviceId';
import { AvatarBuilder } from '../components/profile/AvatarBuilder';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LS_KEYS, DEFAULT_HOME_WIDGETS } from '../utils/constants';
import { restoreFromCloud } from '../services/syncService';

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

const Profile = () => {
  const navigate = useNavigate();
  const { actions } = useAppContext();
  const [profile, setProfile] = useLocalStorage('ucc_profile', {
    name: '',
    phone: '',
    course: '',
    level: '',
    avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=UCCStudent&backgroundColor=cce1eb,99c3d6`
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [homeWidgets, setHomeWidgets] = useLocalStorage(LS_KEYS.HOME_WIDGETS, DEFAULT_HOME_WIDGETS);
  const { deviceId, getTimeSinceLastSync, shouldSync } = useDeviceId();
  const [copiedId, setCopiedId] = useState(false);
  const [restoreId, setRestoreId] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  
  // Local form state for the edit modal
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    setProfile(formData);
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditModalOpen(false);
    }, 1000);
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
    if (!restoreId.trim()) return;
    setIsRestoring(true);
    try {
      const result = await restoreFromCloud(restoreId.trim().toUpperCase());
      if (result.success) {
        setRestoreId('');
        alert('✅ Data restored successfully! The page will reload to apply changes.');
        setTimeout(() => window.location.reload(), 500);
      } else {
        alert(`❌ Restore failed: ${result.error || 'No data found for this ID.'}`);
      }
    } catch (err) {
      alert(`❌ Restore failed: ${err.message}`);
    } finally {
      setIsRestoring(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your app data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-white pb-28 font-sans">
      
      {/* ── Main Profile View ────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-12 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Profile</h1>
        </div>

        {/* User Info Row */}
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="w-full flex items-center justify-between py-2 group text-left active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {profile.name || 'Set up profile'}
              </h2>
              {profile.course || profile.level ? (
                <p className="text-[#002F45] text-sm font-bold mt-0.5">
                  {profile.course} {profile.level && `• L${profile.level}`}
                </p>
              ) : (
                <p className="text-gray-500 text-sm font-medium mt-0.5">Show profile</p>
              )}
            </div>
          </div>
          <ChevronRight size={24} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
        </button>

        <hr className="border-gray-100" />

        {/* Promotional Card (Support Project) */}
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

        {/* Customize Home */}
        <div className="space-y-2 pt-2">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">Customize Home</h2>
          <p className="text-sm text-gray-500 font-medium -mt-2 mb-4">Choose what appears on your home screen.</p>
          <div className="space-y-1">
            {widgetToggles.map(({ key, label, Icon }) => (
              <div key={key} className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <Icon size={20} className="text-gray-600" strokeWidth={1.5} />
                  </div>
                  <span className="text-[17px] text-gray-900 font-medium">{label}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">Cloud Sync</h2>
          
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
            <p className="text-xs text-gray-500 font-medium mb-3">Enter your unique ID to pull your saved data.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={restoreId}
                onChange={(e) => setRestoreId(e.target.value.toUpperCase())}
                placeholder="UCC-XXXXXXXX"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#002F45]/20 focus:border-[#002F45] transition-all placeholder:text-gray-300 placeholder:font-sans placeholder:tracking-normal"
                maxLength={12}
              />
              <button
                onClick={handleRestore}
                disabled={isRestoring || restoreId.length < 12}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  isRestoring
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-[#002F45] text-white hover:bg-[#001a26]'
                }`}
              >
                {isRestoring ? <RefreshCw size={16} className="animate-spin" /> : 'Restore'}
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Settings List */}
        <div className="space-y-2 pt-2">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">Settings</h2>
          
          <div className="space-y-1">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <User size={24} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[17px] text-gray-900 font-medium">Personal information</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button 
              onClick={() => navigate('/contact')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Phone size={24} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[17px] text-gray-900 font-medium">UCC Contacts & Help</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            {!localStorage.getItem(LS_KEYS.FEEDBACK_SUBMITTED) && (
              <button 
                onClick={() => actions?.setShowFeedbackModal(true)}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle size={24} className="text-[#002F45]" strokeWidth={1.5} />
                  <span className="text-[17px] text-gray-900 font-medium">Take Survey Test</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>
            )}

            <button 
              onClick={handleClearData}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Trash2 size={24} className="text-red-500" strokeWidth={1.5} />
                <span className="text-[17px] text-gray-900 font-medium">Clear App Data</span>
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
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="p-2 -ml-2 text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-base font-bold text-gray-900">Edit Profile</h2>
            <div className="w-10"></div> {/* spacer for centering */}
          </div>

          <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full space-y-8">
            
            {/* Avatar Edit Section */}
            <div className="flex flex-col items-center justify-center space-y-4 pt-4">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden">
                  <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="absolute bottom-0 right-0 bg-gray-900 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform border-2 border-white"
                >
                  <Edit3 size={16} />
                </button>
              </div>
              <p className="text-sm font-semibold text-gray-500">Tap to change avatar</p>
            </div>

            {/* Form Fields */}
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

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 054 123 4567"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Course of Study</label>
                <input
                  type="text"
                  value={formData.course || ''}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g. BSc. Computer Science"
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all placeholder:text-gray-300"
                />
              </div>

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
                    <CheckCircle size={20} className="animate-pulse" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
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

export default Profile;
