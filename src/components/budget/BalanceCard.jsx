import React from 'react';
import { ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';

const BalanceCard = ({ balance, totalIncome, totalExpenses, safeToSpend, onExpense, onIncome, onTopUp }) => (
  <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 mb-6 lg:mb-0 h-full flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <span className="text-gray-500 font-medium">Total balance</span>
    </div>
    <div className="mb-2">
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">GH₵ {balance.toFixed(2)}</h1>
    </div>
    <div className="flex flex-col gap-2 mb-auto">
      <div className="flex items-center gap-2">
        <span className="text-gray-500 font-medium">Monthly:</span>
        <span className="text-gray-900 font-bold bg-gray-900/10 px-2 py-0.5 rounded-md text-sm">+{totalIncome.toFixed(2)}</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded-md text-sm">-{totalExpenses.toFixed(2)}</span>
      </div>
      <div className="text-sm font-bold text-gray-500 bg-gray-50 py-1.5 px-3 rounded-lg border border-gray-100 inline-block w-fit mt-1">
        Safe pacing: <span className="text-gray-900">GH₵ {safeToSpend.toFixed(2)} / day</span>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 mt-8">
      <button onClick={onExpense} className="bg-gray-900 text-white rounded-2xl py-4 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-gray-900 shadow-md">
        <ArrowUpRight size={20} /><span className="text-sm font-bold">Expense</span>
      </button>
      <button onClick={onIncome} className="bg-white border border-gray-200 text-gray-900 rounded-2xl py-4 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-gray-50 shadow-sm">
        <ArrowDownRight size={20} /><span className="text-sm font-bold">Income</span>
      </button>
      <button onClick={onTopUp} className="bg-gray-100 text-gray-700 rounded-2xl py-4 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-gray-200 shadow-sm">
        <Plus size={20} /><span className="text-sm font-bold">Top Up</span>
      </button>
    </div>
  </div>
);

export default BalanceCard;
