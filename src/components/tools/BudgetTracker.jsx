import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ArrowUpRight, ArrowDownRight, Plus, Activity, Wallet, MoreHorizontal, Trash2, Coffee, Bus, Printer, Wifi, Book, ShoppingBag, RefreshCw, X } from 'lucide-react';
import { BUDGET_CATEGORIES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';

// Common descriptions for auto-complete
const COMMON_DESCRIPTIONS = {
  expense: [
    'Lunch', 'Breakfast', 'Dinner', 'Snacks', 'Groceries', 'Sachet Water',
    'Dispenser Water', 'Bus fare', 'Taxi', 'Uber / Bolt', 'Fuel',
    'Printing', 'Photocopying', 'Books / Handouts', 'Stationery',
    'Data Bundle (MTN)', 'Data Bundle (Telecel/AT)', 'Airtime',
    'Party', 'Movie', 'Hangout with friends', 'Date',
    'Electricity Prepaid', 'Gas refill', 'Hostel dues',
    'Medicine / Pharmacy', 'Haircut', 'Salon / Hair', 'Laundry',
    'Church offering', 'Tithe', 'Donation', 'Repaid loan',
    'Shoes', 'Clothes', 'Skincare', 'Toiletries', 'Accessories'
  ],
  income: [
    'Allowance from parents', 'Pocket money', 'Support from Guardian',
    'Salary / Part-time job', 'Gift from friend', 'Gift from relative',
    'Loan / Borrowed money', 'Sale of item', 'Refund', 'Scholarship',
    'Bursary stipend', 'Betting win', 'Savings interest'
  ]
};

// Description Combobox Component
const DescriptionCombobox = ({ value, onChange, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const wrapperRef = React.useRef(null);

  const suggestions = COMMON_DESCRIPTIONS[type] || [];
  const filtered = suggestions.filter(desc =>
    desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange(val);
    setIsOpen(true);
  };

  const handleSelect = (desc) => {
    setSearchTerm(desc);
    onChange(desc);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#002F45] focus:bg-white transition-all"
        placeholder="What was this for? (e.g. Lunch)"
        autoComplete="off"
      />
      {isOpen && (
        <div className="absolute z-[70] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-h-48 overflow-y-auto animate-in fade-in duration-200">
          {filtered.length > 0 ? (
            <ul className="py-2">
              {filtered.map((desc, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(desc)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium text-sm transition-colors border-b border-gray-50 last:border-0"
                >
                  {desc}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-center text-gray-500 text-sm font-medium">
              Press Save to use "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Category Combobox Component
const CategoryCombobox = ({ value, onChange, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const wrapperRef = React.useRef(null);

  const filtered = categories.filter(cat =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange(val);
    setIsOpen(true);
  };

  const handleSelect = (cat) => {
    setSearchTerm(cat);
    onChange(cat);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        required
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#002F45] focus:bg-white transition-all"
        placeholder="Search or enter category..."
        autoComplete="off"
      />
      {isOpen && (
        <div className="absolute z-[80] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-h-60 overflow-y-auto animate-in fade-in duration-200">
          {filtered.length > 0 ? (
            <ul className="py-2">
              {filtered.map((cat, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(cat)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-[#002F45] font-bold text-sm transition-colors border-b border-gray-50 last:border-0"
                >
                  {cat}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-center text-gray-500 text-sm font-medium">
              Create custom category "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BudgetTracker = () => {
  const [transactions, setTransactions] = useLocalStorage('ucc_budget', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [editingTxId, setEditingTxId] = useState(null);
  const [activeTxAction, setActiveTxAction] = useState(null);

  const [chartView, setChartView] = useState('weekly');
  const [recurringConfig, setRecurringConfig] = useLocalStorage('ucc_budget_recurring', { active: false, amount: '', day: 1, lastTriggered: '' });

  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [safeToSpend, setSafeToSpend] = useState(0);

  // Handle recurring transactions (Allowance)
  useEffect(() => {
    if (recurringConfig.active && recurringConfig.amount) {
      const today = new Date();
      const currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;
      
      if (today.getDate() >= recurringConfig.day && recurringConfig.lastTriggered !== currentMonth) {
        // Trigger allowance
        const newTx = {
          id: Date.now(),
          type: 'income',
          category: 'Allowance',
          amount: parseFloat(recurringConfig.amount),
          description: 'Monthly Allowance (Auto)',
          date: today.toISOString().split('T')[0]
        };
        setTransactions(prev => [...prev, newTx]);
        setRecurringConfig(prev => ({ ...prev, lastTriggered: currentMonth }));
      }
    }
  }, [recurringConfig, setTransactions, setRecurringConfig]);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Calculate totals for current month only
    const monthlyIncome = transactions
      .filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalBal = transactions.reduce((sum, t) => sum + (t.type === 'income' ? parseFloat(t.amount) : -parseFloat(t.amount)), 0);

    setTotalIncome(monthlyIncome);
    setTotalExpenses(monthlyExpenses);
    setBalance(totalBal);
    
    // Safe to spend per day (remaining balance / days left in month)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysLeft = daysInMonth - new Date().getDate() + 1;
    setSafeToSpend(totalBal > 0 ? totalBal / daysLeft : 0);
  }, [transactions]);

  const handleAddTransaction = (e) => {
    e?.preventDefault();
    if (newTransaction.category && newTransaction.amount) {
      if (editingTxId) {
        setTransactions(transactions.map(t => t.id === editingTxId ? {
          ...newTransaction,
          description: newTransaction.description || 'General',
          amount: parseFloat(newTransaction.amount),
          id: t.id,
          date: t.date
        } : t));
        setEditingTxId(null);
      } else {
        const transaction = {
          ...newTransaction,
          description: newTransaction.description || 'General',
          id: Date.now(),
          amount: parseFloat(newTransaction.amount)
        };
        setTransactions([...transactions, transaction]);
      }

      setNewTransaction({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  const handleQuickAdd = (category, amount, description) => {
    const transaction = {
      id: Date.now(),
      type: 'expense',
      category,
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions([...transactions, transaction]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    
    // Tombstone for sync
    try {
      const deleted = JSON.parse(localStorage.getItem('ucc_budget_deleted') || '[]');
      if (!deleted.includes(id)) {
        deleted.push(id);
        localStorage.setItem('ucc_budget_deleted', JSON.stringify(deleted));
      }
    } catch (e) {
      console.error('Error saving budget tombstone:', e);
    }
  };

  const categories = newTransaction.type === 'income' ? BUDGET_CATEGORIES.INCOME : BUDGET_CATEGORIES.EXPENSE;

  // Dynamic Chart Data Generation
  const generateChartData = () => {
    const today = new Date();
    
    if (chartView === 'weekly') {
      const data = [];
      const labels = [];
      const rawData = [];
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        labels.push(days[d.getDay()]);
        const dayStr = d.toISOString().split('T')[0];
        
        const dayTotal = transactions
          .filter(t => t.type === 'expense' && t.date === dayStr)
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
          
        data.push(dayTotal);
        rawData.push(dayTotal);
      }
      const max = Math.max(...data, 1);
      return { 
        type: 'bar', 
        labels,
        rawData,
        data: data.map(val => val > 0 ? Math.max((val / max) * 100, 5) : 0) 
      };
    } else {
      // Monthly Breakdown Pie Chart
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      const monthlyExpenses = transactions.filter(t => 
        t.type === 'expense' && 
        new Date(t.date).getMonth() === currentMonth && 
        new Date(t.date).getFullYear() === currentYear
      );

      const categoryTotals = {};
      let total = 0;
      monthlyExpenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + parseFloat(t.amount);
        total += parseFloat(t.amount);
      });

      const sortedCategories = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a]);
      const colors = ['#e9c46a', '#f4a261', '#e76f51', '#2a9d8f', '#264653'];
      
      let cumulativePercent = 0;
      const pieData = [];
      
      sortedCategories.slice(0, 5).forEach((cat, index) => {
        const percent = (categoryTotals[cat] / (total || 1)) * 100;
        pieData.push({
          category: cat,
          amount: categoryTotals[cat],
          percent,
          color: colors[index],
          startPercent: cumulativePercent,
          endPercent: cumulativePercent + percent
        });
        cumulativePercent += percent;
      });
      
      if (sortedCategories.length > 5) {
        const otherTotal = sortedCategories.slice(5).reduce((sum, cat) => sum + categoryTotals[cat], 0);
        const otherPercent = (otherTotal / (total || 1)) * 100;
        pieData.push({
          category: 'Other',
          amount: otherTotal,
          percent: otherPercent,
          color: '#4b5563',
          startPercent: cumulativePercent,
          endPercent: cumulativePercent + otherPercent
        });
      }
      
      return { type: 'pie', data: pieData, total };
    }
  };
  
  const chartData = generateChartData();
  
  return (
    <div className="p-4 md:p-6 pb-24 max-w-5xl mx-auto font-sans">
      
      {/* Desktop Grid Layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-6">
        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 mb-6 lg:mb-0 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-500 font-medium">Total balance</span>
          </div>
          <div className="mb-2">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              GH₵ {balance.toFixed(2)}
            </h1>
          </div>
          <div className="flex flex-col gap-2 mb-auto">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Monthly:</span>
              <span className="text-[#002F45] font-bold bg-[#002F45]/10 px-2 py-0.5 rounded-md text-sm">
                +{totalIncome.toFixed(2)}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-900 font-bold bg-gray-100 px-2 py-0.5 rounded-md text-sm">
                -{totalExpenses.toFixed(2)}
              </span>
            </div>
            {/* Safe to Spend Forecast */}
            <div className="text-sm font-bold text-gray-500 bg-gray-50 py-1.5 px-3 rounded-lg border border-gray-100 inline-block w-fit mt-1">
              Safe pacing: <span className="text-gray-900">GH₵ {safeToSpend.toFixed(2)} / day</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            <button 
              onClick={() => { setNewTransaction({...newTransaction, type: 'expense'}); setShowAddForm(true); }}
              className="bg-[#002F45] text-white rounded-2xl py-4 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-[#001a26] shadow-md"
            >
              <ArrowUpRight size={20} />
              <span className="text-sm font-bold">Expense</span>
            </button>
            
            <button 
              onClick={() => { setNewTransaction({...newTransaction, type: 'income'}); setShowAddForm(true); }}
              className="bg-white border border-gray-200 text-[#002F45] rounded-2xl py-4 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-gray-50 shadow-sm"
            >
              <ArrowDownRight size={20} />
              <span className="text-sm font-bold">Income</span>
            </button>
            
            <button 
              onClick={() => { setNewTransaction({...newTransaction, type: 'income', category: 'Allowance'}); setShowAddForm(true); }}
              className="bg-gray-100 text-gray-700 rounded-2xl py-4 flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-gray-200 shadow-sm"
            >
              <Plus size={20} />
              <span className="text-sm font-bold">Top Up</span>
            </button>
          </div>
        </div>

        {/* Analytics Chart Card */}
        <div className="bg-[#111827] rounded-3xl p-6 shadow-xl relative overflow-hidden h-full min-h-[240px] flex flex-col">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex gap-4 text-white/50 text-sm font-medium">
              <span 
                onClick={() => setChartView('weekly')}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${chartView === 'weekly' ? 'text-white bg-white/10' : 'hover:text-white'}`}
              >
                Weekly
              </span>
              <span 
                onClick={() => setChartView('monthly')}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${chartView === 'monthly' ? 'text-white bg-white/10' : 'hover:text-white'}`}
              >
                Monthly
              </span>
            </div>
            <Activity className="text-white/50" size={20} />
          </div>
          
          {chartData.type === 'bar' ? (
            Math.max(...chartData.data) > 0 ? (
              <div className="flex-1 flex flex-col relative z-10">
                <div className="flex-1 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                    <div className="border-t border-white border-dashed w-full h-0"></div>
                    <div className="border-t border-white border-dashed w-full h-0"></div>
                    <div className="border-t border-white border-dashed w-full h-0"></div>
                    <div className="border-t border-white border-dashed w-full h-0"></div>
                  </div>
                  
                  {/* Bars Container */}
                  <div className="absolute inset-0 flex justify-between gap-2">
                    {chartData.data.map((height, i) => (
                      <div key={i} className="w-full relative group">
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] py-1 px-2 rounded font-bold pointer-events-none whitespace-nowrap z-20">
                          GH₵ {chartData.rawData[i].toFixed(2)}
                        </div>
                        <div 
                          className={`absolute bottom-0 left-0 w-full rounded-t-md transition-all duration-500 ease-out ${i === chartData.data.length - 1 ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/20 hover:bg-white/40'}`}
                          style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '0' }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* X-Axis Labels */}
                <div className="flex justify-between gap-2 mt-3 pt-2 border-t border-white/10">
                  {chartData.labels.map((label, i) => (
                    <div key={i} className={`w-full text-center text-[10px] font-bold tracking-wider ${i === chartData.labels.length - 1 ? 'text-white' : 'text-white/40'}`}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/50 text-sm font-medium relative z-10">
                No expenses this week
              </div>
            )
          ) : (
            <div className="flex-1 flex flex-row items-center justify-between gap-4 relative z-10">
              {chartData.total > 0 ? (
                <>
                  <div className="w-32 h-32 rounded-full relative shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
                       style={{
                         background: `conic-gradient(${chartData.data.map(d => `${d.color} ${d.startPercent}% ${d.endPercent}%`).join(', ')})`
                       }}>
                    <div className="absolute inset-2 bg-[#111827] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">GH₵{chartData.total.toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5 justify-center overflow-y-auto max-h-32 pr-1 hide-scrollbar">
                    {chartData.data.map((d, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }}></div>
                          <span className="text-white/80 truncate font-medium">{d.category}</span>
                        </div>
                        <span className="text-white font-bold ml-2 shrink-0">{d.percent.toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/50 text-sm font-medium">
                  No expenses this month
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Expenses & Transactions Grid */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* Quick Expenses (Desktop: Left, Mobile: Top) */}
        <div className="lg:col-span-4 mb-6 lg:mb-0">
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Quick Add</h2>
          
          {/* 6-box Grid */}
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => handleQuickAdd('Food', 20, 'Lunch')}
              className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md hover:border-[#002F45]/30 transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-[#002F45] group-hover:text-white transition-colors">
                <Coffee size={16} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Food</span>
              <span className="text-sm font-black text-gray-900">GH₵20</span>
            </button>

            <button 
              onClick={() => handleQuickAdd('Transport', 10, 'Bus')}
              className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md hover:border-[#002F45]/30 transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-[#002F45] group-hover:text-white transition-colors">
                <Bus size={16} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ride</span>
              <span className="text-sm font-black text-gray-900">GH₵10</span>
            </button>

            <button 
              onClick={() => handleQuickAdd('Academics', 5, 'Printing')}
              className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md hover:border-[#002F45]/30 transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-[#002F45] group-hover:text-white transition-colors">
                <Printer size={16} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Print</span>
              <span className="text-sm font-black text-gray-900">GH₵5</span>
            </button>

            <button 
              onClick={() => handleQuickAdd('Airtime', 10, 'Data Bundle')}
              className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md hover:border-[#002F45]/30 transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-[#002F45] group-hover:text-white transition-colors">
                <Wifi size={16} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Data</span>
              <span className="text-sm font-black text-gray-900">GH₵10</span>
            </button>

            <button 
              onClick={() => handleQuickAdd('Academics', 50, 'Books/Handout')}
              className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md hover:border-[#002F45]/30 transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-[#002F45] group-hover:text-white transition-colors">
                <Book size={16} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Books</span>
              <span className="text-sm font-black text-gray-900">GH₵50</span>
            </button>

            <button 
              onClick={() => handleQuickAdd('Shopping', 100, 'Groceries')}
              className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md hover:border-[#002F45]/30 transition-all flex flex-col items-center justify-center gap-1 group"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center group-hover:bg-[#002F45] group-hover:text-white transition-colors">
                <ShoppingBag size={16} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Snacks</span>
              <span className="text-sm font-black text-gray-900">GH₵100</span>
            </button>

          </div>
        </div>

        {/* Transactions List */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <button className="text-gray-400 hover:text-gray-900 transition-colors">
              <MoreHorizontal size={20} />
            </button>
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
            transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map(transaction => (
              <div 
                key={transaction.id} 
                onClick={() => setActiveTxAction(transaction)}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors group gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    transaction.type === 'income' 
                      ? 'bg-emerald-50 text-emerald-500' 
                      : 'bg-red-50 text-red-500'
                  }`}>
                    {transaction.type === 'income' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 truncate">{transaction.category}</h3>
                    <p className="text-xs text-gray-500 font-medium truncate">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2 flex-shrink-0">
                  <div className="min-w-max">
                    <p className={`font-bold whitespace-nowrap ${transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'} GH₵ {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{formatDate(transaction.date)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

      {/* Add Transaction Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 animate-in slide-in-from-bottom-8 duration-300 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">
                Add {newTransaction.type === 'income' ? 'Income' : 'Expense'}
              </h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 rounded-full transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setNewTransaction({...newTransaction, type: 'expense', category: ''})}
                  className={`py-2 rounded-lg font-bold text-sm transition-colors ${newTransaction.type === 'expense' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setNewTransaction({...newTransaction, type: 'income', category: ''})}
                  className={`py-2 rounded-lg font-bold text-sm transition-colors ${newTransaction.type === 'income' ? 'bg-white shadow-sm text-[#002F45]' : 'text-gray-500'}`}
                >
                  Income
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Amount (GH₵)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-2xl font-black focus:outline-none focus:ring-2 focus:ring-[#002F45] focus:bg-white transition-all"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
                <CategoryCombobox
                  value={newTransaction.category}
                  onChange={(val) => setNewTransaction({ ...newTransaction, category: val })}
                  categories={categories}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Description</label>
                <DescriptionCombobox 
                  value={newTransaction.description}
                  onChange={(val) => setNewTransaction({ ...newTransaction, description: val })}
                  type={newTransaction.type}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Date</label>
                <input
                  type="date"
                  required
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#002F45] focus:bg-white transition-all"
                />
              </div>

              {newTransaction.type === 'income' && (
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100/50 mt-2">
                  <div>
                    <p className="font-bold text-sm text-emerald-900">Auto Top-up (Recurring)</p>
                    <p className="text-[10px] text-emerald-600 font-medium leading-tight">Automatically add this amount<br/>on this date every month.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={recurringConfig.active}
                      onChange={(e) => setRecurringConfig({
                        active: e.target.checked,
                        amount: newTransaction.amount || recurringConfig.amount,
                        day: parseInt(newTransaction.date.split('-')[2]) || recurringConfig.day,
                        lastTriggered: recurringConfig.lastTriggered
                      })}
                    />
                    <div className="w-9 h-5 bg-emerald-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-emerald-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Action Modal */}
      {activeTxAction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:fade-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Transaction Options</h2>
              <button onClick={() => setActiveTxAction(null)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setNewTransaction({
                    type: activeTxAction.type,
                    category: activeTxAction.category,
                    amount: activeTxAction.amount.toString(),
                    description: activeTxAction.description,
                    date: activeTxAction.date
                  });
                  setEditingTxId(activeTxAction.id);
                  setActiveTxAction(null);
                  setShowAddForm(true);
                }}
                className="w-full py-4 px-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                Edit Transaction
              </button>
              <button 
                onClick={() => {
                  handleDeleteTransaction(activeTxAction.id);
                  setActiveTxAction(null);
                }}
                className="w-full py-4 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Delete Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTracker;