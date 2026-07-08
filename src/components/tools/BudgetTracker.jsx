import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { BUDGET_CATEGORIES } from '../../utils/constants';
import { SmartTips } from '../budget/SmartTips';
import RunwayPlanner from '../../pages/RunwayPlanner';
import BalanceCard from '../budget/BalanceCard';
import AnalyticsChart from '../budget/AnalyticsChart';
import QuickAddGrid from '../budget/QuickAddGrid';
import TransactionList from '../budget/TransactionList';
import AddTransactionModal from '../budget/AddTransactionModal';
import TransactionActionModal from '../budget/TransactionActionModal';

const BudgetTracker = () => {
  const [activeTab, setActiveTab] = useState('tracker');
  const [transactions, setTransactions] = useLocalStorage('ucc_budget', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense', category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0]
  });
  const [editingTxId, setEditingTxId] = useState(null);
  const [activeTxAction, setActiveTxAction] = useState(null);
  const [chartView, setChartView] = useState('weekly');
  const [recurringConfig, setRecurringConfig] = useLocalStorage('ucc_budget_recurring', { active: false, amount: '', day: 1, lastTriggered: '' });
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [safeToSpend, setSafeToSpend] = useState(0);

  useEffect(() => {
    if (recurringConfig.active && recurringConfig.amount) {
      const today = new Date();
      const currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;
      if (today.getDate() >= recurringConfig.day && recurringConfig.lastTriggered !== currentMonth) {
        setTransactions(prev => [...prev, { id: crypto.randomUUID(), type: 'income', category: 'Allowance', amount: parseFloat(recurringConfig.amount), description: 'Monthly Allowance (Auto)', date: today.toISOString().split('T')[0] }]);
        setRecurringConfig(prev => ({ ...prev, lastTriggered: currentMonth }));
      }
    }
  }, [recurringConfig, setTransactions, setRecurringConfig]);

  useEffect(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthlyIncome = transactions.filter(t => t.type === 'income' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear).reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const monthlyExpenses = transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear).reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const totalBal = transactions.reduce((sum, t) => sum + (t.type === 'income' ? parseFloat(t.amount) : -parseFloat(t.amount)), 0);
    setTotalIncome(monthlyIncome);
    setTotalExpenses(monthlyExpenses);
    setBalance(totalBal);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    setSafeToSpend(totalBal > 0 ? totalBal / (daysInMonth - now.getDate() + 1) : 0);
  }, [transactions]);

  const categories = newTransaction.type === 'income' ? BUDGET_CATEGORIES.INCOME : BUDGET_CATEGORIES.EXPENSE;

  const handleAddTransaction = (e) => {
    e?.preventDefault();
    if (newTransaction.category && newTransaction.amount) {
      if (editingTxId) {
        setTransactions(transactions.map(t => t.id === editingTxId ? { ...newTransaction, description: newTransaction.description || 'General', amount: parseFloat(newTransaction.amount), id: t.id, date: t.date } : t));
        setEditingTxId(null);
      } else {
        setTransactions([...transactions, { ...newTransaction, description: newTransaction.description || 'General', id: crypto.randomUUID(), amount: parseFloat(newTransaction.amount) }]);
      }
      setNewTransaction({ type: 'expense', category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
      setShowAddForm(false);
    }
  };

  const handleQuickAdd = (category, amount, description) => {
    setTransactions([...transactions, { id: crypto.randomUUID(), type: 'expense', category, amount: parseFloat(amount), description, date: new Date().toISOString().split('T')[0] }]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    try {
      const deleted = JSON.parse(localStorage.getItem('ucc_budget_deleted') || '[]');
      if (!deleted.includes(id)) { deleted.push(id); localStorage.setItem('ucc_budget_deleted', JSON.stringify(deleted)); }
    } catch (e) { console.error('Error saving budget tombstone:', e); }
  };

  const openEditForm = (tx) => {
    setNewTransaction({ type: tx.type, category: tx.category, amount: tx.amount.toString(), description: tx.description, date: tx.date });
    setEditingTxId(tx.id);
    setActiveTxAction(null);
    setShowAddForm(true);
  };

  const generateChartData = () => {
    const today = new Date();
    if (chartView === 'weekly') {
      const data = []; const labels = []; const rawData = []; const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today); d.setDate(d.getDate() - i);
        labels.push(days[d.getDay()]);
        const dayTotal = transactions.filter(t => t.type === 'expense' && t.date === d.toISOString().split('T')[0]).reduce((sum, t) => sum + parseFloat(t.amount), 0);
        data.push(dayTotal); rawData.push(dayTotal);
      }
      const max = Math.max(...data, 1);
      return { type: 'bar', labels, rawData, data: data.map(val => val > 0 ? Math.max((val / max) * 100, 5) : 0) };
    } else {
      const currentMonth = today.getMonth(); const currentYear = today.getFullYear();
      const monthlyExpenses = transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear);
      const categoryTotals = {}; let total = 0;
      monthlyExpenses.forEach(t => { categoryTotals[t.category] = (categoryTotals[t.category] || 0) + parseFloat(t.amount); total += parseFloat(t.amount); });
      const sorted = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a]);
      const colors = ['#e9c46a','#f4a261','#e76f51','#2a9d8f','#264653'];
      let cumulativePercent = 0;
      const pieData = [];
      sorted.slice(0, 5).forEach((cat, index) => { const percent = (categoryTotals[cat] / (total || 1)) * 100; pieData.push({ category: cat, amount: categoryTotals[cat], percent, color: colors[index], startPercent: cumulativePercent, endPercent: cumulativePercent + percent }); cumulativePercent += percent; });
      if (sorted.length > 5) { const otherTotal = sorted.slice(5).reduce((sum, cat) => sum + categoryTotals[cat], 0); const otherPercent = (otherTotal / (total || 1)) * 100; pieData.push({ category: 'Other', amount: otherTotal, percent: otherPercent, color: '#4b5563', startPercent: cumulativePercent, endPercent: cumulativePercent + otherPercent }); }
      return { type: 'pie', data: pieData, total };
    }
  };

  const chartData = generateChartData();

  return (
    <div className="p-4 md:p-6 pb-24 max-w-5xl mx-auto font-sans">
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-xl inline-flex relative">
          <button onClick={() => setActiveTab('tracker')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'tracker' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Standard Tracker</button>
          <button onClick={() => setActiveTab('runway')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'runway' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Proactive Runway</button>
        </div>
      </div>

      {activeTab === 'runway' ? (
        <RunwayPlanner transactions={transactions} currentBalance={balance} />
      ) : (
        <>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-6">
            <BalanceCard balance={balance} totalIncome={totalIncome} totalExpenses={totalExpenses} safeToSpend={safeToSpend}
              onExpense={() => { setNewTransaction(prev => ({ ...prev, type: 'expense' })); setShowAddForm(true); }}
              onIncome={() => { setNewTransaction(prev => ({ ...prev, type: 'income' })); setShowAddForm(true); }}
              onTopUp={() => { setNewTransaction(prev => ({ ...prev, type: 'income', category: 'Allowance' })); setShowAddForm(true); }} />
            <AnalyticsChart chartView={chartView} onViewChange={setChartView} chartData={chartData} />
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4 mb-6 lg:mb-0">
              <QuickAddGrid onQuickAdd={handleQuickAdd} />
            </div>
            <div className="lg:col-span-8">
              <TransactionList transactions={transactions} onSelect={setActiveTxAction} />
            </div>
          </div>

          <SmartTips transactions={transactions} />

          <AddTransactionModal isOpen={showAddForm} onClose={() => { setShowAddForm(false); setEditingTxId(null); }}
            newTransaction={newTransaction} onChange={(patch) => setNewTransaction(prev => ({ ...prev, ...patch }))}
            categories={categories} onSubmit={handleAddTransaction}
            recurringConfig={recurringConfig} onRecurringChange={setRecurringConfig} />
          <TransactionActionModal transaction={activeTxAction} onClose={() => setActiveTxAction(null)}
            onEdit={() => openEditForm(activeTxAction)} onDelete={handleDeleteTransaction} />
        </>
      )}
    </div>
  );
};

export default BudgetTracker;
