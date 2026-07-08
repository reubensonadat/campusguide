export const TERMS = [
  '100_1', '100_2', '200_1', '200_2', '300_1', '300_2',
  '400_1', '400_2', '500_1', '500_2', '600_1', '600_2'
];

export const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export const PRIORITY_STYLES = {
  high:   { bg: 'bg-red-50',  border: 'border-red-100',  text: 'text-red-700',  dot: 'bg-red-500',  label: 'High' },
  medium: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Medium' },
  low:    { bg: 'bg-blue-50',  border: 'border-blue-100',  text: 'text-blue-700',  dot: 'bg-blue-500',  label: 'Low' },
};

export const STATUS_STYLES = {
  pending:   { bg: 'bg-slate-50',  border: 'border-slate-200', text: 'text-slate-600', icon: 'Circle',        label: 'Pending' },
  submitted: { bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-700', icon: 'CheckCircle2',   label: 'Submitted' },
  late:      { bg: 'bg-orange-50', border: 'border-orange-200',text: 'text-orange-700',icon: 'AlertTriangle',  label: 'Late' },
  missed:    { bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-700',   icon: 'X',              label: 'Missed' },
};

export const URGENCY_LABELS = {
  overdue: { label: 'Overdue', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
  today:   { label: 'Due Today', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  thisWeek:{ label: 'This Week', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  later:   { label: 'Later', color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100' },
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today) / 86400000);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < -1) return `${Math.abs(diff)} days ago`;

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
};

export const formatTime12 = (time24) => {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
};
