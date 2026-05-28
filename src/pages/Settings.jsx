import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import PageHeader from '../components/common/PageHeader';
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
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { updatePin } from '../services/authService';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';

const Settings = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  const [timetable] = useLocalStorage('ucc_timetable', []);
  const [gpa] = useLocalStorage('ucc_gpa', []);
  
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isPinUpdating, setIsPinUpdating] = useState(false);

  const handleChangePinClick = () => {
    // Only allow changing PIN if they can authenticate their current session
    triggerAuthSheet(() => {
      setIsChangePinOpen(true);
    });
  };

  const handleUpdatePin = async (e) => {
    e.preventDefault();
    if (newPin.length < 6) {
      actions.showToast('PIN must be at least 6 digits', 'error');
      return;
    }
    setIsPinUpdating(true);
    const res = await updatePin(newPin);
    setIsPinUpdating(false);
    
    if (res.success) {
      actions.showToast('Security PIN updated successfully!', 'success');
      setIsChangePinOpen(false);
      setNewPin('');
    } else {
      actions.showToast(res.error || 'Failed to update PIN', 'error');
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all app data? This action cannot be undone.')) {
      localStorage.clear();
      actions.showToast('All data cleared successfully', 'success');
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = {
      timetable,
      gpa,
      guideCompletion: state.guideCompletion,
      settings: state.settings,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ucc-guide-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    actions.showToast('Data exported successfully', 'success');
  };

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      actions.showToast("Notifications not supported in this browser", "error");
      return;
    }

    if (state.settings.notifications) {
      // Turning off
      actions.updateSettings({ notifications: false });
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      actions.updateSettings({ notifications: true });
      actions.showToast("Notifications enabled!", "success");
      new Notification("UCC Campus Guide", { body: "Notifications are now setup." });
    } else {
      actions.showToast("Permission denied", "error");
    }
  };

  const dataStats = [
    {
      label: 'Timetable Courses',
      count: timetable.length,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'GPA Courses',
      count: gpa.length,
      icon: BarChart3,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="pb-24 bg-gray-50/50 min-h-screen font-sans selection:bg-[#cce1eb] selection:text-[#002F45]">
      <div className="max-w-2xl mx-auto space-y-6 px-6 pt-12 md:px-8">

        <PageHeader
          title="Settings"
          subtitle="Manage your data and app preferences."
        />

        {/* Data Statistics */}
        <div className="grid grid-cols-2 gap-4">
          {dataStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-[24px] overflow-hidden">
                <CardContent className="pt-6 pb-6 flex flex-col items-center">
                  <div className={`w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-3`}>
                    <Icon size={22} className="text-[#002F45]" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-1 tracking-tight">{stat.count}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Security & Data Management */}
        <Card className="border border-gray-100 shadow-sm bg-white rounded-[24px] overflow-hidden">
          <CardHeader className="border-b border-gray-100 px-6 py-5 bg-gray-50/50">
            <CardTitle className="text-gray-900 flex items-center gap-2 text-base font-bold">
              <Shield className="text-[#6EABC6]" size={18} />
              Security & Data
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              
              {/* Security: Change PIN */}
              <button
                onClick={handleChangePinClick}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group text-left focus:outline-none"
              >
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Change Security PIN</h3>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">Update your 6-digit recovery PIN</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white border border-gray-100 group-hover:border-gray-200 transition-all">
                  <Lock size={14} className="text-gray-400 group-hover:text-gray-700" />
                </div>
              </button>

              <button
                onClick={handleExportData}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group text-left focus:outline-none"
              >
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Export Data</h3>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">Download a backup of your schedule</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white border border-gray-100 group-hover:border-gray-200 transition-all">
                  <Download size={14} className="text-gray-400 group-hover:text-gray-700" />
                </div>
              </button>

              <button
                onClick={handleClearAllData}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-red-50 transition-colors group text-left focus:outline-none"
              >
                <div>
                  <h3 className="font-bold text-red-600 text-sm">Clear All Data</h3>
                  <p className="text-xs font-medium text-red-400 mt-0.5">Reset the entire application</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-white border border-red-100 transition-all">
                  <Trash2 size={14} className="text-red-500" />
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <div className="flex items-center justify-center gap-2 pt-8 text-gray-400">
          <Info size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Version 2.0.0</span>
        </div>

      </div>

      <Modal 
        isOpen={isChangePinOpen} 
        onClose={() => {
          setIsChangePinOpen(false);
          setNewPin('');
        }}
        title="Change Security PIN"
      >
        <form onSubmit={handleUpdatePin} className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Enter a new 6-digit PIN to secure your data across devices.
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
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-2xl tracking-[0.5em] text-center font-bold focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all"
            />
          </div>
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full py-4 text-base bg-[#002F45] hover:bg-[#001a26]" 
              disabled={isPinUpdating || newPin.length < 6}
            >
              {isPinUpdating ? 'Updating...' : 'Update PIN'}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Settings;
