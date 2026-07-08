import React from 'react';
import { X } from 'lucide-react';
import { formatDate, formatTime12 } from './assignmentsConstants';

const ImportDeadlineModal = ({ sharedDeadline, onClose, onImport }) => {
  if (!sharedDeadline) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-2xl flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-white rounded-t-[2rem] sm:rounded-2xl z-10">
          <h2 className="text-base sm:text-lg font-black text-gray-900">Import Shared Deadline</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="p-4 bg-gray-900/5 rounded-xl border border-gray-900/10">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              Shared by {sharedDeadline.senderName || 'Student'}
            </span>
            <h3 className="font-extrabold text-gray-900 text-base">{sharedDeadline.title}</h3>
            {sharedDeadline.course && <p className="text-xs font-bold text-gray-500 mt-1">{sharedDeadline.course}</p>}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Due Date:</strong> {formatDate(sharedDeadline.dueDate)} {sharedDeadline.dueTime && `at ${formatTime12(sharedDeadline.dueTime)}`}</p>
            <p><strong>Priority:</strong> <span className="capitalize">{sharedDeadline.priority}</span></p>
            {sharedDeadline.notes && <p><strong>Notes:</strong> {sharedDeadline.notes}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onImport}
              className="flex-1 bg-gray-900 hover:bg-gray-900 text-white py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 text-center"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportDeadlineModal;
