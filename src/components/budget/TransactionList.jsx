import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, MoreHorizontal } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const TransactionList = ({ transactions, onSelect }) => (
  <div>
    <div className="flex justify-between items-center mb-4 px-1">
      <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
      <button className="text-gray-400 hover:text-gray-900 transition-colors"><MoreHorizontal size={20} /></button>
    </div>
    <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 space-y-1">
      {transactions.length === 0 ? (
        <div className="text-center py-10 px-4 text-gray-500">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Wallet size={24} className="text-gray-400" />
          </div>
          <p className="font-bold text-gray-900 mb-1">No transactions yet.</p>
          <p className="text-sm">Click Income or Expense to get started.</p>
        </div>
      ) : (
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map(tx => (
          <div key={tx.id} onClick={() => onSelect(tx)}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors group gap-2 cursor-pointer">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                {tx.type === 'income' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900 truncate">{tx.category}</h3>
                <p className="text-xs text-gray-500 font-medium truncate">{tx.description}</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-2 flex-shrink-0">
              <div className="min-w-max">
                <p className={`font-bold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {tx.type === 'income' ? '+' : '-'} GH₵ {tx.amount.toFixed(2)}
                </p>
                <p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{formatDate(tx.date)}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default TransactionList;
