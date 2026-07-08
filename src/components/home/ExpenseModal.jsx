import React from 'react';
import Modal from '../common/Modal';

const ExpenseModal = ({ showExpensePopup, setShowExpensePopup, quickExpenseAmt, setQuickExpenseAmt, handleQuickExpenseSubmit }) => (
  <Modal isOpen={showExpensePopup} onClose={() => setShowExpensePopup(false)} title="Quick Log Expense">
    <form onSubmit={handleQuickExpenseSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">GH₵</span>
        <input
          type="number" step="0.01" autoFocus
          value={quickExpenseAmt}
          onChange={e => setQuickExpenseAmt(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-14 pr-4 font-bold text-xl text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
          placeholder="0.00"
        />
      </div>
      <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-all shadow-sm">
        Save Expense
      </button>
    </form>
  </Modal>
);

export default ExpenseModal;
