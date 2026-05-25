import React, { useState, useEffect } from 'react';
import { User, Trash2, Phone, Mail, ChevronRight, X, Shield, HelpCircle, CheckCircle, Heart, Edit3 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AvatarBuilder } from '../components/profile/AvatarBuilder';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

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
