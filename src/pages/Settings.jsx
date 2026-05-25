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
  RefreshCcw,
  ArrowRight,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
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
    <div className="p-4 md:p-8 pb-24 bg-gray-50/50 min-h-screen font-sans selection:bg-[#cce1eb] selection:text-[#002F45]">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500 font-medium">Manage your data and app preferences.</p>
        </div>

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

        {/* Data Management */}
        <Card className="border border-gray-100 shadow-sm bg-white rounded-[24px] overflow-hidden">
          <CardHeader className="border-b border-gray-100 px-6 py-5 bg-gray-50/50">
            <CardTitle className="text-gray-900 flex items-center gap-2 text-base font-bold">
              <Download className="text-[#6EABC6]" size={18} />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
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
          <span className="text-[10px] font-black uppercase tracking-widest">Version 2.0.0 (Luxury Edition)</span>
        </div>

      </div>
    </div>
  );
};

export default Settings;
