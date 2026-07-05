import React, { useState } from 'react';
import { format, addDays, differenceInDays, parseISO, endOfMonth } from 'date-fns';
import { ShieldAlert } from 'lucide-react';

export function SetupModal({ onInitialize, currentBalance = 0 }) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const defaultEnd = format(endOfMonth(new Date()), 'yyyy-MM-dd');

  // Pre-fill the period budget from the Budget Tracker's current balance.
  // The user can override this (e.g. they're expecting more money soon).
  const [periodBudget, setPeriodBudget] = useState(currentBalance > 0 ? currentBalance.toFixed(2) : '');
  const [emergencyBuffer, setEmergencyBuffer] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(defaultEnd);

  const budget = parseFloat(periodBudget) || 0;
  const buffer = parseFloat(emergencyBuffer) || 0;
  const deployable = budget - buffer;
  const daysLeft = Math.max(1, differenceInDays(parseISO(endDate), parseISO(startDate)) + 1);
  const dailyAllowance = deployable > 0 ? deployable / daysLeft : 0;

  const isValid = budget > 0 && buffer >= 0 && buffer < budget && endDate > startDate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onInitialize({ periodBudget: budget, emergencyBuffer: buffer, startDate, endDate });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700">
        
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">New Budget Period</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Tell us how much you have and how long it needs to last.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Live Preview */}
          {dailyAllowance > 0 && (
            <div className="bg-gray-900 dark:bg-white rounded-2xl p-4 text-center mb-2">
              <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mb-1">Your Daily Allowance</p>
              <p className="text-4xl font-black text-white dark:text-gray-900">GH₵ {dailyAllowance.toFixed(2)}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">across {daysLeft} days · GH₵ {buffer.toFixed(2)} locked as buffer</p>
            </div>
          )}

          {/* Period Budget */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              How much do you have? (GH₵)
            </label>
            {currentBalance > 0 && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                ✓ Your Budget Tracker balance is GH₵ {currentBalance.toFixed(2)} — pre-filled below. Adjust if needed.
              </p>
            )}
            <input
              type="number" min="0" step="0.01" required
              value={periodBudget}
              onChange={e => setPeriodBudget(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-2xl font-black text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
              placeholder="e.g. 300"
            />
          </div>

          {/* Emergency Buffer */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Emergency Buffer (GH₵) — never touched
            </label>
            <div className="relative">
              <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
              <input
                type="number" min="0" step="0.01"
                value={emergencyBuffer}
                onChange={e => setEmergencyBuffer(e.target.value)}
                className="w-full pl-9 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xl font-black text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                placeholder="e.g. 50"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Start Date</label>
              <input
                type="date" required
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">End Date</label>
              <input
                type="date" required
                value={endDate}
                min={format(addDays(parseISO(startDate), 1), 'yyyy-MM-dd')}
                onChange={e => setEndDate(e.target.value)}
                className="w-full px-3 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            Activate Runway →
          </button>
        </form>
      </div>
    </div>
  );
}
