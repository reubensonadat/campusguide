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
  AlertTriangle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = () => {
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
      icon: '📅'
    },
    {
      label: 'Budget Transactions',
      count: budget.length,
      icon: '💰'
    },
    {
      label: 'GPA Courses',
      count: gpa.length,
      icon: '📊'
    },
    {
      label: 'Reminders',
      count: reminders.length,
      icon: '⏰'
    }
  ];

  return (
    <div className="p-4 pb-20">
      {/* Data Statistics */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Your Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {dataStats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-lg font-semibold">{stat.count}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="w-full flex items-center justify-center gap-2"
            >
              <Download size={16} />
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
              className="w-full"
            >
              Clear Guide Progress
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleClearAllData}
              className="w-full flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Clear All Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">App Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-600" />
                <div>
                  <h3 className="font-medium">Notifications</h3>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon size={20} className="text-gray-600" />
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-gray-600" />
              <div>
                <h3 className="font-medium">Version</h3>
                <p className="text-sm text-gray-600">1.0.0</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Info size={20} className="text-gray-600" />
              <div>
                <h3 className="font-medium">Last Updated</h3>
                <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-600" />
              <div>
                <h3 className="font-medium">Privacy</h3>
                <p className="text-sm text-gray-600">All data is stored locally on your device</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supporter Status */}
      {state.isSupporter && (
        <Card className="mb-6 border-green-200 bg-green-50" style={{ backgroundColor: 'rgb(255 255 255)' }}>
          <CardHeader>
            <CardTitle className="text-green-800 text-black">Supporter Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">★</span>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Thank You for Supporting!</h3>
                <p className="text-sm text-green-600">
                  Your support helps keep this app free for all UCC students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Warning */}
      <Card className="border-red-200 bg-red-50" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-red-600 mt-1" />
            <div>
              <h3 className="font-semibold text-red-800">Important Notice</h3>
              <p className="text-sm text-red-600">
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