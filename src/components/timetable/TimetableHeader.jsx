import React from 'react';
import { CardTitle } from '../common/Card';
import { Button } from '../common/Button';
import { Plus, Bell, Share2, Calendar } from 'lucide-react';
import { isNotificationSupported } from '../../services/notificationService';

const TimetableHeader = ({ examMode, onToggleExamMode, notificationsEnabled, onEnableNotifications, displayCourses, onShare, onAdd }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <CardTitle className="text-gray-900 text-xl flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-900" /> My Timetable
      </CardTitle>
      <p className="text-sm text-gray-500 mt-1">Simple, unified schedule view.</p>
      <button onClick={onToggleExamMode}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-black mt-2 transition-all ${examMode ? 'bg-amber-500 border-amber-600 text-white shadow-sm' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
        📝 {examMode ? 'Exam Mode Active' : 'Enable Exam Mode'}
      </button>
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
