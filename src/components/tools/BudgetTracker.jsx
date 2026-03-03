import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { BUDGET_CATEGORIES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';

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

  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setBalance(income - expenses);
  }, [transactions]);

  const handleAddTransaction = () => {
    if (newTransaction.category && newTransaction.amount && newTransaction.description) {
      const transaction = {
        ...newTransaction,
        id: Date.now(),
        amount: parseFloat(newTransaction.amount),
        balance: balance + (newTransaction.type === 'income' ? parseFloat(newTransaction.amount) : -parseFloat(newTransaction.amount))
      };

      setTransactions([...transactions, transaction]);
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

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const categories = newTransaction.type === 'income' ? BUDGET_CATEGORIES.INCOME : BUDGET_CATEGORIES.EXPENSE;

  return (
    <div className="p-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  GH₵ {balance.toFixed(2)}
                </p>
              </div>
              {balance >= 0 ? <TrendingUp className="text-green-600" /> : <TrendingDown className="text-red-600" />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">GH₵ {totalIncome.toFixed(2)}</p>
              </div>
              <TrendingUp className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">GH₵ {totalExpenses.toFixed(2)}</p>
              </div>
              <TrendingDown className="text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Budget Tracker</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={16} className="mr-1" />
                Add Transaction
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-4">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value, category: '' })}
                    className="p-2 border rounded"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>

                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                    className="p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Amount"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="p-2 border rounded"
                  />

                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="p-2 border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    className="p-2 border rounded md:col-span-2"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddTransaction}>Add Transaction</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'} GH₵ {transaction.amount.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-600">{transaction.category}</span>
                  </div>
                  <div className="text-sm text-gray-600">{transaction.description}</div>
                  <div className="text-xs text-gray-500">{formatDate(transaction.date)}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

            {transactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No transactions yet. Add your first transaction to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetTracker;