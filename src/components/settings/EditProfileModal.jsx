import React, { useState, useRef, useEffect } from 'react';
import { Edit3, Check, X, Loader2 } from 'lucide-react';
import { CourseCombobox } from '../common/CourseCombobox';
import { AvatarBuilder } from '../profile/AvatarBuilder';
import { sanitizeGhanaPhone } from '../../utils/helpers';
import ModalPortal from '../common/ModalPortal';

const checkUsername = async (username) => {
  if (!username || username.length < 3) return null;
  try {
    const { supabase } = await import('../../lib/supabase');
    const { data } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .maybeSingle();
    return !data;
  } catch { return null; }
};

const EditProfileModal = ({ isOpen, onClose, formData, onFormChange, onSave, onAvatarOpen, isAvatarOpen, onAvatarSelect, isSaving }) => {
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!isOpen) { setUsernameStatus(null); setChecking(false); }
  }, [isOpen]);

  const handleUsernameChange = (val) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9_]/g, '');
    onFormChange({ username: clean });
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!clean || clean.length < 3) { setUsernameStatus(null); return; }
    setChecking(true);
    debounceRef.current = setTimeout(async () => {
      const available = await checkUsername(clean);
      if (available === null) setUsernameStatus('error');
      else setUsernameStatus(available ? 'available' : 'taken');
      setChecking(false);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4 animate-in fade-in duration-200" onClick={onClose}>
        <div className="bg-white w-full max-w-2xl rounded-t-[2rem] sm:rounded-2xl flex flex-col max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-8 duration-300" onClick={e => e.stopPropagation()}>
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
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Username <span className="text-gray-300 font-normal normal-case tracking-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-base font-medium">@</span>
                  <input
                    type="text"
                    value={formData.username || ''}
                    onChange={e => handleUsernameChange(e.target.value)}
                    placeholder="username"
                    maxLength={20}
                    className="w-full pl-9 pr-11 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all font-mono"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {checking && <Loader2 size={18} className="text-gray-300 animate-spin" />}
                    {!checking && usernameStatus === 'available' && <Check size={18} className="text-emerald-500" />}
                    {!checking && usernameStatus === 'taken' && <X size={18} className="text-red-400" />}
                  </div>
                </div>
                {usernameStatus === 'taken' && <p className="text-xs text-red-400 font-medium pl-1">Username taken</p>}
                {usernameStatus === 'available' && <p className="text-xs text-emerald-500 font-medium pl-1">Available!</p>}
                {formData.username && formData.username.length > 0 && formData.username.length < 3 && <p className="text-xs text-gray-400 font-medium pl-1">Min 3 characters</p>}
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
          <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200" onClick={onAvatarOpen}>
            <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
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
    </ModalPortal>
  );
};

export default EditProfileModal;
