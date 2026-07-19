import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'danger', onConfirm, onCancel }) {
  if (!open) return null;

  const colors = variant === 'danger'
    ? { icon: 'bg-red-100 text-red-500', btn: 'bg-red-500 hover:bg-red-600' }
    : { icon: 'bg-primary-100 text-primary-600', btn: 'bg-primary-600 hover:bg-primary-700' };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel?.(); }}>
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}>
        <div className={`w-16 h-16 ${colors.icon} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
            {cancelLabel}
          </button>
          <button onClick={onConfirm}
            className={`flex-1 py-3 ${colors.btn} text-white font-bold rounded-xl shadow-sm transition-colors`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
