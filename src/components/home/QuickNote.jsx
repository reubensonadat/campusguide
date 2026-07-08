import React from 'react';

const QuickNote = ({ quickNotes, setQuickNotes }) => (
  <div className="pt-2">
    <h3 className="text-gray-900 font-black text-xl mb-4 px-1 tracking-tight">Quick Note</h3>
    <div className="bg-[#FFF9C4] rounded-2xl shadow-sm border border-[#FFF59D] p-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-8 h-8 bg-black/5 rounded-bl-2xl -mt-2 -mr-2 pointer-events-none" />
      <textarea
        value={quickNotes}
        onChange={(e) => setQuickNotes(e.target.value)}
        placeholder="Jot down a locker number, assignment due date, or anything you don't want to forget..."
        className="w-full h-24 bg-transparent resize-none border-none outline-none focus:outline-none focus:ring-0 p-0 text-sm font-medium text-amber-900 placeholder-amber-700/50"
      />
    </div>
  </div>
);

export default QuickNote;
