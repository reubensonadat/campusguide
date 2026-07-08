import React from 'react';
import { X } from 'lucide-react';
import CategoryCombobox from './CategoryCombobox';
import DescriptionCombobox from './DescriptionCombobox';

const AddTransactionModal = ({ isOpen, onClose, newTransaction, onChange, categories, onSubmit, recurringConfig, onRecurringChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 animate-in slide-in-from-bottom-8 duration-300 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900">Add {newTransaction.type === 'income' ? 'Income' : 'Expense'}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-full transition-colors shrink-0">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl mb-4">
            <button type="button" onClick={() => onChange({ type: 'expense', category: '' })}
              className={`py-2 rounded-lg font-bold text-sm transition-colors ${newTransaction.type === 'expense' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Expense</button>
            <button type="button" onClick={() => onChange({ type: 'income', category: '' })}
              className={`py-2 rounded-lg font-bold text-sm transition-colors ${newTransaction.type === 'income' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Income</button>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Amount (GH₵)</label>
            <input type="number" step="0.01" min="0" required value={newTransaction.amount}
              onChange={e => onChange({ amount: e.target.value })}
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-2xl font-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all" placeholder="0.00" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
            <CategoryCombobox value={newTransaction.category} onChange={val => onChange({ category: val })} categories={categories} />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Description</label>
            <DescriptionCombobox value={newTransaction.description} onChange={val => onChange({ description: val })} type={newTransaction.type} />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Date</label>
            <input type="date" required value={newTransaction.date} onChange={e => onChange({ date: e.target.value })}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all" />
          </div>

          {newTransaction.type === 'income' && (
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100/50 mt-2">
              <div>
                <p className="font-bold text-sm text-emerald-900">Auto Top-up (Recurring)</p>
                <p className="text-[10px] text-emerald-600 font-medium leading-tight">Automatically add this amount<br/>on this date every month.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" className="sr-only peer" checked={recurringConfig.active}
                  onChange={e => onRecurringChange({
                    active: e.target.checked,
                    amount: newTransaction.amount || recurringConfig.amount,
                    day: parseInt(newTransaction.date.split('-')[2]) || recurringConfig.day,
                    lastTriggered: recurringConfig.lastTriggered
                  })} />
                <div className="w-9 h-5 bg-emerald-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-emerald-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-colors">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
