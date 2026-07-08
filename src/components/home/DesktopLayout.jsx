import React from 'react';
import { ArrowRight, Bell, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import { CustomGuide as GuideIcon, CustomTools as ToolsIcon } from '../common/CustomIcons';
import NotificationDropdown from '../common/NotificationDropdown';
import StreakBadge from './StreakBadge';
import FeaturedAd from './FeaturedAd';
import CampusIllustration from '/college-campus-rafiki.svg';

const DesktopLayout = ({
  profile, getGreeting, TODAY_LABEL, TODAY_NAME, triggerConfetti,
  prodStats, weatherData, homeWidgets, renderWeatherSvg, getWeatherIconAndAdvice,
  isNotifOpen, setIsNotifOpen, showRedDot,
  unreadItems, readItems, fetchStatus, notificationsEnabled,
  markItemAsRead, markAllAsRead, handleNavigateToCommunity,
  navigate, quickActions, isDeferredActive, featuredContent,
  actions, activeReminders, reminders, setReminders
}) => (
  <div className="hidden lg:block">
    <div className="relative overflow-hidden bg-white border-b border-gray-100/80 py-12 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
      </div>
      <div className="relative max-w-6xl mx-auto z-10 grid grid-cols-12 items-center gap-6">
        <div className="col-span-7 text-left mt-8">
          <div className="flex items-center gap-4 mb-4">
            {profile.avatarUrl && (
              <div onClick={() => navigate('/profile')} className="w-16 h-16 rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer active:scale-95 transition-transform bg-white p-0.5">
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover rounded-xl bg-gray-50" />
              </div>
            )}
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-primary-600 text-sm font-semibold tracking-widest uppercase mb-1 flex items-center">
                  {TODAY_LABEL}
                  <StreakBadge prodStats={prodStats} variant="desktop" />
                </p>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight flex items-center flex-wrap gap-1">
                  {getGreeting()}{profile.name ? `, ${profile.name.split(' ')[0]}` : ''}
                  {getGreeting() === 'Happy New Month' ? (
                    <span onClick={triggerConfetti} className="cursor-pointer hover:scale-110 active:scale-95 transition-transform">🎉</span>
                  ) : ' 👋'}
                </h1>
              </div>
              <div id="bell-anchor-desktop" className="relative">
                <button onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:border-primary-200 cursor-pointer transition-all">
                  <Bell size={18} />
                  {showRedDot && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
                </button>
                <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)}
                  unreadItems={unreadItems} readItems={readItems} fetchStatus={fetchStatus}
                  notificationsEnabled={notificationsEnabled} onMarkItemRead={markItemAsRead}
                  onMarkAllRead={markAllAsRead} onNavigate={handleNavigateToCommunity} />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4 tracking-tight leading-tight">
            Your Essential <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600">Campus Companion</span>
          </h2>
          {homeWidgets.weather && weatherData && (() => {
            const { svgType, color, bg, advice } = getWeatherIconAndAdvice(weatherData.weathercode, weatherData.temperature);
            return (
              <div className={`inline-flex items-center gap-3 ${bg} border border-white px-4 py-2 rounded-2xl shadow-sm mb-6`}>
                {renderWeatherSvg(svgType, 20, color)}
                <span className="text-gray-800 font-bold text-sm">{weatherData.temperature}°C <span className="font-medium text-gray-500 mx-1">•</span> {advice}</span>
              </div>
            );
          })()}
          <p className="text-lg text-gray-500 mb-6 max-w-xl font-medium">Navigate campus life with clear guides, essential tools, and quick access to services all in a compact, easy-to-use hub.</p>
          <div className="flex items-center gap-4">
            <Button variant="primary" onClick={() => navigate('/guide')} className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-soft btn-hover flex items-center gap-3">
              <GuideIcon size={18} /> Open Guide
            </Button>
            <Button variant="outline" onClick={() => navigate('/tools')} className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold shadow-sm flex items-center gap-3">
              <ToolsIcon size={18} className="text-gray-400" /> Open Tools
            </Button>
          </div>
        </div>
        <div className="col-span-5 flex items-center justify-end">
          <div className="relative w-full max-w-lg -mr-6">
            <img src={CampusIllustration} alt="Campus illustration" className="w-full h-auto object-contain drop-shadow-lg" style={{ WebkitTransform: 'translateZ(0)' }} />
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      {activeReminders.length > 0 && (
        <section className="bg-red-50 border border-red-100 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-red-800 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              Active Reminders ({activeReminders.length})
            </h3>
            <button onClick={() => navigate('/tools')} className="text-xs font-black text-red-700 uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer">Manage Reminders</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeReminders.map((reminder) => (
              <div key={reminder.id} className="bg-white p-4 rounded-2xl border border-red-100 flex items-center justify-between gap-4 shadow-sm">
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold text-gray-900 truncate">{reminder.title}</p>
                  <p className="text-xs font-semibold text-red-600 mt-1">Due: {new Date(reminder.dueDate).toLocaleDateString()}</p>
                </div>
                <button onClick={() => { const updated = reminders.map(r => r.id === reminder.id ? { ...r, completed: true } : r); setReminders(updated); }}
                  className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider rounded-xl transition-colors shrink-0 border-none cursor-pointer">Mark Done</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <FeaturedAd isDeferredActive={isDeferredActive} featuredContent={featuredContent} />

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Quick Actions</h2>
        </div>
        <div className="space-y-6">
          <div className="flex gap-6 py-2 overflow-x-auto hide-scrollbar">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button key={index} onClick={action.action}
                  className="group relative overflow-hidden text-left p-5 bg-white border border-gray-100 hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-xl transition-all duration-300 flex items-center justify-between flex-none"
                  style={{ minWidth: 'min(24rem, calc((100vw - 96px) / 4))' }}>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-primary-50">
                      <Icon size={24} className="text-primary-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-base">{action.title}</h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                    <ArrowRight size={16} className="text-primary-600" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white rounded-xl p-10 sm:p-14 border border-primary-100 shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 text-center lg:text-left">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Support This Project</h2>
              <p className="text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 text-lg font-medium">Your support keeps this project alive and growing for every UCC student.</p>
              <div className="max-w-sm mx-auto lg:mx-0 space-y-5">
                <button onClick={() => actions?.setShowSupportModal(true)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary-200 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer">
                  Support Now (GH₵5)
                </button>
                <p className="text-sm font-medium text-gray-500">Issues or suggestions? <a href="mailto:uccguide25@gmail.com" className="text-primary-600 hover:underline">Contact us</a></p>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <img src="/Savings.png" alt="Support Development" className="w-full max-w-[300px] object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default DesktopLayout;
