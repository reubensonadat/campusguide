import React, { useState } from 'react';
import { Plus, Check, AlertTriangle, AlertOctagon, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { format, parseISO, isToday, isPast } from 'date-fns';

const MEAL_SLOTS = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { key: 'lunch',     label: 'Lunch',     emoji: '☀️'  },
  { key: 'dinner',    label: 'Dinner',    emoji: '🌙'  },
  { key: 'other',     label: 'Other',     emoji: '🛒'  },
];

function MealSlot({ meal, planned, onAdd, onRemove }) {
  const [adding, setAdding] = useState(false);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const slotItems = planned.filter(p => p.meal === meal.key);
  const slotTotal = slotItems.reduce((s, p) => s + parseFloat(p.amount), 0);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!amount) return;
    onAdd({ description: desc || meal.label, amount: parseFloat(amount), meal: meal.key });
    setDesc(''); setAmount(''); setAdding(false);
  };

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{meal.emoji} {meal.label}</span>
        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
          {slotTotal > 0 ? `GH₵ ${slotTotal.toFixed(2)}` : '—'}
        </span>
      </div>
      {slotItems.map(item => (
        <div key={item.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700/60 rounded-lg px-2 py-1 mb-1">
          <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{item.description}</span>
          <div className="flex items-center gap-2 ml-2 shrink-0">
            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{parseFloat(item.amount).toFixed(2)}</span>
            <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
      {adding ? (
        <form onSubmit={handleAdd} className="flex gap-1 mt-1">
          <input
            type="text" placeholder={meal.label} value={desc} onChange={e => setDesc(e.target.value)}
            className="flex-1 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 text-gray-900 dark:text-white outline-none"
          />
          <input
            type="number" step="0.01" placeholder="0.00" required value={amount} onChange={e => setAmount(e.target.value)}
            className="w-20 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 text-gray-900 dark:text-white outline-none"
          />
          <button type="submit" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-2 py-1.5 rounded-lg font-bold">✓</button>
          <button type="button" onClick={() => setAdding(false)} className="text-gray-400 text-xs px-1">✕</button>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 transition-colors mt-0.5"
        >
          <Plus className="w-3 h-3" /> Plan {meal.label}
        </button>
      )}
    </div>
  );
}

export function DayCard({ dateStr, planned, actual, stats, onAddPlanned, onRemovePlanned, isExpanded, onToggle }) {
  const dateObj = parseISO(dateStr);
  const isTodayDate = isToday(dateObj);
  const isPastDate = isPast(dateObj) && !isTodayDate;

  const { plannedSum, actualSum, dailyAllowance, drift, status } = stats;

  const statusStyles = {
    green:  { border: 'border-gray-200 dark:border-gray-700',         badge: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400', icon: <Check className="w-3 h-3" />, label: 'On Track' },
    yellow: { border: 'border-amber-400 dark:border-amber-500',        badge: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',         icon: <AlertTriangle className="w-3 h-3" />, label: 'Over Plan' },
    red:    { border: 'border-red-500 dark:border-red-600 shadow-red-500/10 shadow-lg', badge: 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400', icon: <AlertOctagon className="w-3 h-3" />, label: 'Emergency' },
  };
  const style = statusStyles[status] || statusStyles.green;

  return (
    <div className={`rounded-2xl border bg-white dark:bg-gray-800 transition-all mb-3 overflow-hidden ${style.border} ${isTodayDate ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}>
      
      {/* ── Row Header (always visible) ────────────────────────────────── */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`text-center min-w-[36px] ${isPastDate ? 'opacity-50' : ''}`}>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">{format(dateObj, 'EEE')}</p>
            <p className="text-lg font-black text-gray-900 dark:text-white leading-none">{format(dateObj, 'd')}</p>
          </div>
          <div>
            {isTodayDate && (
              <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Today</span>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Allowance: <span className="text-gray-900 dark:text-white font-bold">GH₵ {dailyAllowance.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Planned vs Actual pill */}
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-gray-400 dark:text-gray-500">Planned / Actual</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {plannedSum.toFixed(2)} / <span className={actualSum > plannedSum ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}>{actualSum.toFixed(2)}</span>
            </p>
          </div>
          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${style.badge}`}>
            {style.icon} {style.label}
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </button>

      {/* ── Expanded Body ───────────────────────────────────────────────── */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* PLANNED — meal slots */}
            <div>
              <h4 className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                📋 Planned — GH₵ {plannedSum.toFixed(2)}
              </h4>
              {MEAL_SLOTS.map(meal => (
                <MealSlot
                  key={meal.key}
                  meal={meal}
                  planned={planned}
                  onAdd={(item) => onAddPlanned(dateStr, item)}
                  onRemove={(id) => onRemovePlanned(dateStr, id)}
                />
              ))}
            </div>

            {/* ACTUAL — from Budget Tracker transactions */}
            <div>
              <h4 className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                💳 Actual — GH₵ {actualSum.toFixed(2)}
              </h4>
              {actual.length === 0 ? (
                <p className="text-xs text-gray-400 dark:text-gray-500 italic mt-2">
                  No expenses logged in the Budget Tracker for this day yet.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {actual.map(a => (
                    <div key={a.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/60 rounded-lg px-3 py-2">
                      <div>
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{a.description}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{a.category}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-red-500 dark:text-red-400 ml-2">- GH₵ {a.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Drift warning */}
              {drift > 0 && (
                <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    ⚠️ GH₵ {drift.toFixed(2)} over your plan today. Future days adjusted.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
