import React from 'react';
import { CardTitle } from '../common/Card';
import { Button } from '../common/Button';
import { Plus, Bell, Share2, Calendar } from 'lucide-react';
import { isNotificationSupported } from '../../services/notificationService';

const TimetableHeader = ({ examMode, onToggleExamMode, notificationsEnabled, onEnableNotifications, displayCourses, onShare, onAdd, viewMode, onViewModeChange }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <CardTitle className="text-gray-900 text-xl flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-900" /> My Timetable
      </CardTitle>
      <p className="text-sm text-gray-500 mt-1">Simple, unified schedule view.</p>
      <div className="flex gap-2 items-center mt-2 flex-wrap">
        <button onClick={onToggleExamMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-black transition-all ${examMode ? 'bg-amber-500 border-amber-600 text-white shadow-sm' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
          📝 {examMode ? 'Exam Mode Active' : 'Enable Exam Mode'}
        </button>
        
        {/* List / Calendar view toggle */}
        <div className="flex bg-[#FAF9F9] p-0.5 rounded-xl border border-slate-200/60 shadow-sm">
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-1.5 rounded-[10px] text-[11px] font-black transition-all ${viewMode === 'list' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('calendar')}
            className={`px-3 py-1.5 rounded-[10px] text-[11px] font-black transition-all ${viewMode === 'calendar' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Calendar
          </button>
        </div>
      </div>
    </div>
    <div className="flex w-full sm:w-auto gap-2 flex-wrap">
      {!notificationsEnabled && isNotificationSupported() && (
        <Button onClick={onEnableNotifications} variant="outline" size="sm" className="flex-1 sm:flex-none border-gray-900/20 text-gray-900 hover:bg-gray-900/5">
          <Bell size={16} className="mr-2" /> Reminders
        </Button>
      )}
      {displayCourses.length > 0 && (
        <Button onClick={onShare} variant="outline" size="sm" className="flex-1 sm:flex-none border-gray-900/20 text-gray-900 hover:bg-gray-900/5">
          <Share2 size={16} className="mr-2" /> Share
        </Button>
      )}
      <Button onClick={onAdd} variant="primary" size="sm" className="flex-1 sm:flex-none bg-gray-900 hover:bg-gray-900 text-white shadow-md hover:shadow-lg transition-all">
        <Plus size={16} className="mr-2" /> Add
      </Button>
    </div>
  </div>
);

export default TimetableHeader;
