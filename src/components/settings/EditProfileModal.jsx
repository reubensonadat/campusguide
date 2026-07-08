import React from 'react';
import { Edit3 } from 'lucide-react';
import { CourseCombobox } from '../common/CourseCombobox';
import { AvatarBuilder } from '../profile/AvatarBuilder';
import { sanitizeGhanaPhone } from '../../utils/helpers';

const EditProfileModal = ({ isOpen, onClose, formData, onFormChange, onSave, onAvatarOpen, isAvatarOpen, onAvatarSelect, isSaving }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-t-[2rem] sm:rounded-2xl flex flex-col max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20 rounded-t-[2rem] sm:rounded-2xl shrink-0">
          <h2 className="text-lg font-black text-gray-900 tracking-tight pl-2">Edit Profile</h2>
          <button onClick={onSave} className="text-white bg-gray-900 font-bold px-4 py-1.5 hover:bg-gray-900 rounded-lg transition-colors active:scale-95">Save</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
          <div className="flex flex-col items-center justify-center space-y-4 pt-2 pb-8">
            <div className="relative group cursor-pointer" onClick={onAvatarOpen}>
              <div className="w-28 h-28 rounded-xl bg-white border-4 border-white shadow-xl overflow-hidden transition-transform group-hover:scale-105">
                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Edit3 size={24} className="text-white" /></div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100"><Edit3 size={18} /></div>
            </div>
            <p className="text-sm font-bold text-gray-500">Tap to change avatar</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Full Name</label>
              <input type="text" value={formData.name} onChange={e => onFormChange({ name: e.target.value })} placeholder="Enter your name" className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" value={formData.phone || ''} onChange={e => onFormChange({ phone: sanitizeGhanaPhone(e.target.value) })} placeholder="e.g. 054 123 4567" className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Student ID (Index No.)</label>
                <input type="text" value={formData.student_id || ''} onChange={e => onFormChange({ student_id: e.target.value.toUpperCase() })} placeholder="e.g. PS/ITC/20/0000" className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all" />
              </div>
            </div>
            <div className="space-y-2 relative z-50">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Course of Study</label>
              <CourseCombobox value={formData.course} onChange={val => onFormChange({ course: val })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Level</label>
                <select value={formData.level || ''} onChange={e => onFormChange({ level: e.target.value })} className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all">
                  <option value="">Select Level</option>
                  {[100,200,300,400,500,600].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Semester</label>
                <select value={formData.semester || '1'} onChange={e => onFormChange({ semester: e.target.value })} className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all">
                  <option value="1">Sem 1</option><option value="2">Sem 2</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 pb-20">
            <button onClick={onSave} disabled={isSaving} className="w-full py-4 bg-gray-900 text-white hover:bg-gray-800 font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">Save Changes</button>
          </div>
        </div>
      </div>

      {/* Avatar Modal (nested) */}
      {isAvatarOpen && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900 px-2">Choose Avatar</h2>
              <button onClick={onAvatarOpen} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            </div>
            <div className="p-4 overflow-y-auto">
              <AvatarBuilder initialUrl={formData.avatarUrl} onSelect={onAvatarSelect} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;
