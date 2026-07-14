import React from 'react';
import { Lock, LogOut, LayoutDashboard, CheckCircle, HelpCircle, MapPin, Megaphone, Radio, TrendingUp } from 'lucide-react';

const tabs = [
  { key: 'analytics', label: 'Analytics', icon: TrendingUp },
  { key: 'moderation', label: 'Ads Moderation', icon: LayoutDashboard },
  { key: 'thrift', label: 'Thrift Verify', icon: CheckCircle },
  { key: 'lostfound', label: 'Lost & Found', icon: HelpCircle },
  { key: 'campus-data', label: 'Campus Data', icon: MapPin },
  { key: 'upload', label: 'Post Update / Ad', icon: Megaphone },
  { key: 'blast', label: 'Push Blast', icon: Radio },
];

const AdminSidebar = ({ activeTab, onTabChange, onLogout }) => (
  <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 md:h-screen z-10">
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
        <Lock size={20} className="text-primary-600" /> God Mode
      </h1>
      <button onClick={onLogout} className="md:hidden p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors">
        <LogOut size={20} />
      </button>
    </div>
    <div className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto custom-scrollbar">
      {tabs.map(tab => (
        <button key={tab.key} onClick={() => onTabChange(tab.key)}
          className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === tab.key ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
          <tab.icon size={20} /> {tab.label}
        </button>
      ))}
    </div>
    <div className="p-4 mt-auto border-t border-gray-200 hidden md:block">
      <button onClick={onLogout} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 w-full p-3 rounded-xl transition-colors">
        <LogOut size={20} /> Lock Session
      </button>
    </div>
  </div>
);

export default AdminSidebar;
