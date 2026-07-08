import React from 'react';
import { Coffee, Bus, Printer, Wifi, Book, ShoppingBag } from 'lucide-react';

const QUICK_ITEMS = [
  { icon: Coffee, label: 'Food', amount: 20, desc: 'Lunch', category: 'Food' },
  { icon: Bus, label: 'Ride', amount: 10, desc: 'Bus', category: 'Transport' },
  { icon: Printer, label: 'Print', amount: 5, desc: 'Printing', category: 'Academics' },
  { icon: Wifi, label: 'Data', amount: 10, desc: 'Data Bundle', category: 'Airtime' },
  { icon: Book, label: 'Books', amount: 50, desc: 'Books/Handout', category: 'Academics' },
  { icon: ShoppingBag, label: 'Snacks', amount: 100, desc: 'Groceries', category: 'Shopping' },
];

const QuickAddGrid = ({ onQuickAdd }) => (
  <div>
    <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Quick Add</h2>
    <div className="grid grid-cols-3 gap-2">
      {QUICK_ITEMS.map((item, i) => (
        <button key={i} onClick={() => onQuickAdd(item.category, item.amount, item.desc)}
          className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-900/30 transition-all flex flex-col items-center justify-center gap-1 group">
          <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
            <item.icon size={16} />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
          <span className="text-sm font-black text-gray-900">GH₵{item.amount}</span>
        </button>
      ))}
    </div>
  </div>
);

export default QuickAddGrid;
