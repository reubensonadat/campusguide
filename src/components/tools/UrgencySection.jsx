import React from 'react';
import AssignmentCard from './AssignmentCard';
import { URGENCY_LABELS } from './assignmentsConstants';

const UrgencySection = ({ title, items, urgencyKey, onStatusChange, onEdit, onDelete, onShare }) => {
  const u = URGENCY_LABELS[urgencyKey];
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2 px-0.5 sm:px-1">
        <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${u.color}`}>{title}</span>
        <span className={`text-[9px] sm:text-[10px] font-bold ${u.color} ${u.bg} px-1.5 py-0.5 rounded-md`}>{items.length}</span>
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        {items.map(a => (
          <AssignmentCard key={a.id} assignment={a} onStatusChange={onStatusChange} onEdit={onEdit} onDelete={onDelete} onShare={onShare} />
        ))}
      </div>
    </div>
  );
};

export default UrgencySection;
