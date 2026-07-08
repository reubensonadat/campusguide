import React from 'react';
import { Radio, Send } from 'lucide-react';
import { BLAST_SEGMENTS } from '../../services/blastService';

const PushBlastPanel = ({ blastForm, isBlasting, onFormChange, onSubmit }) => (
  <div className="space-y-6 max-w-3xl mx-auto">
    <div>
      <h2 className="text-2xl font-black flex items-center gap-2"><Radio className="text-primary-600" /> Push Blast</h2>
      <p className="text-sm text-gray-500 mt-1">Send an instant push notification to a segment of users via OneSignal. The REST API key stays server-side.</p>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
      <strong className="font-black">Heads up:</strong> This fires a real push to every subscribed device in the chosen segment. Double-check your message before sending — there is no undo.
    </div>

    <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1">Headline *</label>
        <input value={blastForm.headline} onChange={e => onFormChange({ headline: e.target.value })} maxLength={100} placeholder="e.g. Exam timetable released" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm" />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1">Message *</label>
        <textarea rows={4} value={blastForm.message} onChange={e => onFormChange({ message: e.target.value })} maxLength={500} placeholder="The body of the notification..." className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm resize-none" />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1">Send To (segment)</label>
        <select value={blastForm.segment} onChange={e => onFormChange({ segment: e.target.value })} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm">
          {BLAST_SEGMENTS.map(seg => (
            <option key={seg.key} value={seg.key}>{seg.label}</option>
          ))}
        </select>
        <p className="text-[11px] text-gray-400 mt-1">Year groups target users who set their <strong>Level</strong> in their profile. Behaviour groups target users who enabled that toggle in Settings.</p>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1">Tap-to-open URL (optional)</label>
        <input value={blastForm.url} onChange={e => onFormChange({ url: e.target.value })} placeholder="e.g. /community or https://..." className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm" />
      </div>
      <button type="submit" disabled={isBlasting} className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2">
        {isBlasting ? 'Sending...' : <><Send size={20} /> Send Blast</>}
      </button>
    </form>
  </div>
);

export default PushBlastPanel;
