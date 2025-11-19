import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { 
  Trash2, 
  Download, 
  Shield, 
  Bell, 
  Moon, 
  Smartphone,
  Info,
  AlertTriangle,
  Settings as SettingsIcon,
  Sparkles,
  Star,
  ArrowRight,
  Calendar,
  DollarSign,
  BarChart3,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = () => {
  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  const [timetable] = useLocalStorage('ucc_timetable', []);
  const [budget] = useLocalStorage('ucc_budget', []);
  const [gpa] = useLocalStorage('ucc_gpa', []);
  const [reminders] = useLocalStorage('ucc_reminders', []);

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
      budget,
      gpa,
      reminders,
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

  const dataStats = [
    {
      label: 'Timetable Courses',
      count: timetable.length,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Budget Transactions',
      count: budget.length,
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'GPA Courses',
      count: gpa.length,
      icon: BarChart3,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Reminders',
      count: reminders.length,
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="p-4 pb-24 bg-gray-50/50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-200 mb-6">
             <Sparkles size={12} /> App Settings
          </div>

          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
            <SettingsIcon size={40} className="text-white drop-shadow-md" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Manage Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              App Experience
            </span>
          </h1>
          
          <p className="text-blue-100/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Control your data, customize your preferences, and manage your app settings.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <ArrowRight size={20} /> Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/guide')}
              className="bg-blue-800/40 backdrop-blur-md border border-white/30 text-white hover:bg-blue-800/60 px-8 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Star size={20} /> View Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Data Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {dataStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={22} className={stat.color} />
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1">{stat.count}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Data Management */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Download className="text-blue-500" size={20} />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="w-full flex items-center justify-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 font-medium"
            >
              <Download size={18} />
              Export All Data
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                if (window.confirm('Clear guide completion data only?')) {
                  localStorage.removeItem('ucc_guide_completion');
                  actions.showToast('Guide data cleared', 'success');
                }
              }}
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-medium"
            >
              Clear Guide Progress
            </Button>
            
            <Button
              variant="outline"
              onClick={handleClearAllData}
              className="w-full flex items-center justify-center gap-2 border-red-200 text-red-600 hover:bg-red-50 font-medium"
            >
              <Trash2 size={18} />
              Clear All Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <SettingsIcon className="text-blue-500" size={20} />
            App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">Receive reminders and updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.settings.notifications}
                  onChange={(e) => actions.updateSettings({ notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Moon size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Dark Mode</h3>
                  <p className="text-sm text-gray-600">Reduce eye strain at night</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.settings.darkMode}
                  onChange={(e) => actions.updateSettings({ darkMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Info className="text-blue-500" size={20} />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Version</h3>
                <p className="text-sm text-gray-600">1.0.0</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Info size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Last Updated</h3>
                <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Privacy</h3>
                <p className="text-sm text-gray-600">All data is stored locally on your device</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supporter Status */}
      {state.isSupporter && (
        <Card className="mb-8 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-green-100/50 px-6 py-4">
            <CardTitle className="text-emerald-900 flex items-center gap-2 text-lg">
              <Star className="fill-emerald-600 text-emerald-600" size={20} />
              Supporter Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <Star size={32} className="text-white fill-white" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-900 text-lg">Thank You for Supporting!</h3>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  Your support helps keep this app free for all UCC students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Warning */}
      <Card className="border-red-100 bg-gradient-to-br from-red-50 to-rose-50 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-red-900 text-lg mb-2">Important Notice</h3>
              <p className="text-red-700 text-sm leading-relaxed">
                Clearing all data will permanently delete your timetable, budget, GPA calculations, 
                reminders, and guide progress. This action cannot be undone.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;