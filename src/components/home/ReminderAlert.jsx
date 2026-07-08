import React from 'react';

const ReminderAlert = ({ activeReminders, reminders, setReminders, navigate }) => {
  if (activeReminders.length === 0) return null;

  return (
    <div className="sticky top-0 z-30 bg-red-50 border border-red-100 rounded-2xl p-4 shadow-sm space-y-3 mb-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-red-800 uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Active Reminders ({activeReminders.length})
        </span>
        <button
          onClick={() => navigate('/tools')}
          className="text-[11px] font-black text-red-700 uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer"
        >
          Manage
        </button>
      </div>
      <div className="space-y-2">
        {activeReminders.map((reminder) => (
          <div key={reminder.id} className="bg-white p-3 rounded-xl border border-red-100 flex items-center justify-between gap-3 shadow-sm">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 truncate">{reminder.title}</p>
              <p className="text-[10px] font-semibold text-red-600 mt-0.5">
                Due: {new Date(reminder.dueDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => {
                const updated = reminders.map(r => r.id === reminder.id ? { ...r, completed: true } : r);
                setReminders(updated);
              }}
              className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors shrink-0 border-none cursor-pointer"
            >
              Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderAlert;
