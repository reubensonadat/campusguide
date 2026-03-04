import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
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
  Star,
  ArrowRight,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Moon } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  const [timetable] = useLocalStorage('ucc_timetable', []);
  const [gpa] = useLocalStorage('ucc_gpa', []);

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
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/40'
    },
    {
      label: 'GPA Courses',
      count: gpa.length,
      icon: BarChart3,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/40'
    }
  ];

  return (
    <div className="p-4 pb-24 bg-gray-50 dark:bg-gray-900/30 min-h-screen font-sans selection:bg-indigo-100 dark:bg-indigo-900/40 selection:text-indigo-900 dark:text-indigo-400">
      {/* Hero Section */}
      <div className="mb-12 relative overflow-hidden bg-transparent cursor-default select-none transition-colors duration-300">

        {/* Mobile: compact blue card */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden md:hidden dark:from-[#1a1d27] dark:via-[#15171f] dark:to-[#0f1117] border dark:border-white/5">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white dark:bg-gray-800/60 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 dark:bg-indigo-400/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
              <SettingsIcon size={40} className="text-white drop-shadow-md" />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-800/60 border border-white/20 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <Sparkles size={12} /> App Settings
            </div>

            <h1 className="text-3xl font-extrabold mb-4 tracking-tight leading-tight">
              Manage Your <br />
              <span className="text-indigo-400 dark:text-accent-400">App Experience</span>
            </h1>

            <p className="text-blue-100/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Control your data, customize your preferences, and manage your app settings.
            </p>

            <div className="flex flex-col gap-4 justify-center">
              <Button
                onClick={() => navigate('/')}
                className="bg-white dark:bg-gray-900 text-blue-900 dark:text-blue-400 hover:bg-blue-50 dark:bg-blue-900/40 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
              >
                <ArrowRight size={20} /> Back to Home
              </Button>
              <Button
                onClick={() => navigate('/guide')}
                className="bg-white dark:bg-gray-800/60 text-white border border-white/20 hover:bg-white dark:bg-gray-800/60 px-8 py-3.5 rounded-xl font-bold backdrop-blur-sm transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Star size={20} /> View Guide
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop: two-column layout (image left, text right) */}
        <div className="relative z-10 hidden md:flex md:flex-row gap-12 items-center">

          {/* Text Content (Left on Desktop) */}
          <div className="flex-1 text-left text-gray-800 dark:text-gray-200 ml-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-800/50 dark:border-gray-700 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-6 ">
              <Sparkles size={12} /> App Settings
            </div>

            <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Manage Your <br />
              <span className="text-blue-600 dark:text-blue-400 ">
                App Experience
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
              Control your data, customize your preferences, and manage your app settings.
            </p>

            <div className="flex flex-row gap-4 justify-start">
              <Button
                onClick={() => navigate('/')}
                className="bg-blue-600 dark:bg-accent-500 text-white border dark:border-none hover:bg-blue-800 dark:hover:bg-accent-600 px-8 py-3.5 rounded-xl font-bold shadow-sm transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <ArrowRight size={20} /> Back to Home
              </Button>

              <Button
                onClick={() => navigate('/guide')}
                className="bg-black dark:bg-transparent text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-gray-800 hover:bg-blue-50 dark:bg-blue-900/40 dark:hover:bg-gray-800/40 px-8 py-3.5 rounded-xl font-bold shadow-sm transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Star size={20} /> View Guide
              </Button>
            </div>
          </div>

          {/* Image (Right on Desktop) */}
          <div className="flex-1 flex justify-center py-4">
            <img src="/settings.png" alt="Settings" className="w-full max-w-md object-contain drop-shadow-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Data Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {dataStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={22} className={stat.color} />
                </div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">{stat.count}</div>
                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* App Settings */}
      <Card className="mb-8 border-none shadow-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
          <CardTitle className="text-gray-800 dark:text-gray-200 flex items-center gap-2 text-lg">
            <SettingsIcon className="text-blue-500 dark:text-blue-400" size={20} />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">

            {/* Notifications Toggle */}
            <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${state.settings.notifications ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-100 dark:border-blue-800/50' : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${state.settings.notifications ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <Bell size={20} className={state.settings.notifications ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Notifications</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive reminders and updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.settings.notifications}
                  onChange={requestNotificationPermission}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:bg-gray-900 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Dark Mode Toggle */}
            <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${state.settings.darkMode ? 'bg-indigo-50 dark:bg-indigo-900/40 border-indigo-100 dark:border-indigo-800/50' : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${state.settings.darkMode ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <Moon size={20} className={state.settings.darkMode ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">Dark Mode</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Switch to high-contrast dark theme</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.settings.darkMode}
                  onChange={() => actions.updateSettings({ darkMode: !state.settings.darkMode })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:bg-gray-900 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="mb-8 border-none shadow-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
          <CardTitle className="text-gray-800 dark:text-gray-200 flex items-center gap-2 text-lg">
            <Download className="text-blue-500 dark:text-blue-400" size={20} />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-2">

            {/* Export Data */}
            <button
              onClick={handleExportData}
              className="group flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Download size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400 leading-tight">Export Data</span>
            </button>

            {/* Clear Guide Progress */}
            <button
              onClick={() => {
                if (window.confirm('Clear guide completion data only?')) {
                  localStorage.removeItem('ucc_guide_completion');
                  actions.showToast('Guide data cleared', 'success');
                }
              }}
              className="group flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Shield size={16} className="text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 leading-tight">Clear Guide</span>
            </button>

            {/* Reset Feedback */}
            <button
              onClick={() => {
                localStorage.removeItem('ucc_feedback_submitted_v2');
                actions.showToast('Feedback status reset.', 'success');
              }}
              className="group flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/40 hover:bg-green-100 dark:hover:bg-green-900/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Bell size={16} className="text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs font-bold text-green-700 dark:text-green-400 leading-tight">Reset Feedback</span>
            </button>

            {/* Clear All Data */}
            <button
              onClick={handleClearAllData}
              className="group flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 hover:bg-red-100 dark:hover:bg-red-900/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Trash2 size={16} className="text-red-600 dark:text-red-400" />
              </div>
              <span className="text-xs font-bold text-red-700 dark:text-red-400 leading-tight">Clear All</span>
            </button>

          </div>
        </CardContent>
      </Card>


      {/* About Section - Simplified for brevity */}
      <Card className="mb-8 border-none shadow-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
          <CardTitle className="text-gray-800 dark:text-gray-200 flex items-center gap-2 text-lg">
            <Info className="text-blue-500 dark:text-blue-400" size={20} />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4">Version 2.0.0 (Pastel Edition)</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created with ❤️ for UCC Students.
          </p>
        </CardContent>
      </Card>

    </div >
  );
};

export default Settings;
