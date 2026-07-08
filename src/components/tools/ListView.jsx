import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import UrgencySection from './UrgencySection';
import AssignmentCard from './AssignmentCard';

const ListView = ({
  urgencyMap, filteredAssignments, filterStatus, searchQuery,
  activeFilterCount, activeLevel, activeSemester,
  onStatusChange, onEdit, onDelete, onShare, onAddNew
}) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {urgencyMap.overdue.length > 0 && filterStatus === 'all' && !searchQuery && (
        <UrgencySection
          title="Overdue"
          items={urgencyMap.overdue}
          urgencyKey="overdue"
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
        />
      )}

      {urgencyMap.today.length > 0 && filterStatus === 'all' && !searchQuery && (
        <UrgencySection
          title="Due Today"
          items={urgencyMap.today}
          urgencyKey="today"
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
        />
      )}

      {filteredAssignments.length > 0 ? (
        <div className="space-y-2">
          {(filterStatus !== 'all' || searchQuery || activeFilterCount > 0)
            ? filteredAssignments.map(a => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onShare={onShare}
                />
              ))
            : [
              ...(urgencyMap.thisWeek.length > 0 ? [
                <UrgencySection
                  key="week"
                  title="This Week"
                  items={urgencyMap.thisWeek}
                  urgencyKey="thisWeek"
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onShare={onShare}
                />
              ] : []),
              ...(urgencyMap.later.length > 0 ? [
                <UrgencySection
                  key="later"
                  title="Later"
                  items={urgencyMap.later}
                  urgencyKey="later"
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onShare={onShare}
                />
              ] : []),
              ...filteredAssignments.filter(a => a.status !== 'pending').map(a => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onShare={onShare}
                />
              ))
            ]
          }
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 sm:p-10 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircle2 size={24} className="text-gray-300 sm:w-7 sm:h-7" />
          </div>
          <p className="text-sm font-bold text-gray-900 mb-1">
            {searchQuery || activeFilterCount > 0
              ? 'No matching assignments'
              : `No assignments for Level ${activeLevel} Semester ${activeSemester}`}
          </p>
          <p className="text-xs text-gray-500 font-medium mb-3 sm:mb-4">
            {searchQuery || activeFilterCount > 0
              ? 'Try a different search or clear your filters.'
              : 'Tap the + button to add your first assignment.'}
          </p>
          <button
            onClick={onAddNew}
            className="bg-gray-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl active:scale-95 transition-transform"
          >
            Add Assignment
          </button>
        </div>
      )}
    </div>
  );
};

export default ListView;
