import React, { useState, useRef, useEffect } from 'react';
import { useRunwaySimulation } from '../hooks/useRunwaySimulation';
import { SetupModal } from '../components/budget/SetupModal';
import { DayCard } from '../components/budget/DayCard';
import { ShieldAlert, Wallet, Edit2, Check, X, RefreshCw } from 'lucide-react';
import { isToday, parseISO, format } from 'date-fns';

export default function RunwayPlanner({ transactions = [], currentBalance = 0 }) {
  const {
    config,
    loading,
    initializeRunway,
    updateBuffer,
    addPlannedItem,
    removePlannedItem,
    clearRunway,
    getDays,
    getStatsForDayIndex,
    getSummary,
  } = useRunwaySimulation({ transactions });

  const [expandedDay, setExpandedDay] = useState(null);
  const [editingBuffer, setEditingBuffer] = useState(false);
  const [bufferInput, setBufferInput] = useState('');
  const [showRestartModal, setShowRestartModal] = useState(false);
  const todayRef = useRef(null);

  // Auto-expand today's card and scroll to it
  useEffect(() => {
    if (config) {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      setExpandedDay(todayStr);
      setTimeout(() => {
        if (todayRef.current) todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [config]);

  if (loading) {
    return <div className="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400 text-sm">Loading...</div>;
  }

  if (!config) {
    return <SetupModal onInitialize={initializeRunway} currentBalance={currentBalance} />;
  }

  const days = getDays();
  const summary = getSummary();

  // If runway has ended (overspent) and user hasn't dismissed yet, show restart modal
  if (summary?.isRunwayEnded && !showRestartModal) {
    // We'll show the modal inline
  }

  const handleBufferSave = async () => {
    const val = parseFloat(bufferInput);
    if (!isNaN(val) && val >= 0 && val < config.periodBudget) {
      await updateBuffer(val);
    }
    setEditingBuffer(false);
  };

  const handleRestart = async () => {
    await clearRunway();
    setShowRestartModal(false);
  };

  return (
    <div className="w-full">

      {/* ── Runway Header ─────────────────────────────────────────────────── */}
      <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-4 mb-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Budget Period</p>
            <p className="text-sm font-bold">
              {format(parseISO(config.startDate), 'MMM d')} → {format(parseISO(config.endDate), 'MMM d, yyyy')}
            </p>
          </div>
          <button
            onClick={() => setShowRestartModal(true)}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> New Period
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Remaining */}
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
              <Wallet className="w-3 h-3" /> Remaining
            </p>
            <p className={`text-xl font-black ${summary.isRunwayEnded ? 'text-red-400' : 'text-emerald-400'}`}>
              GH₵ {summary.remaining.toFixed(2)}
            </p>
          </div>

          {/* Daily Allowance */}
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Per Day</p>
            <p className="text-xl font-black text-white">GH₵ {summary.dailyAllowance.toFixed(2)}</p>
            <p className="text-gray-400 text-[10px]">{summary.daysLeft} days left</p>
          </div>

          {/* Emergency Buffer — editable */}
          <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-3">
            <p className="text-amber-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> Buffer
            </p>
            {editingBuffer ? (
              <div className="flex items-center gap-1">
                <input
                  type="number" autoFocus step="0.01" min="0"
                  value={bufferInput}
                  onChange={e => setBufferInput(e.target.value)}
                  className="w-full bg-transparent border-b border-amber-400 text-white text-sm font-bold outline-none"
                />
                <button onClick={handleBufferSave}><Check className="w-3 h-3 text-emerald-400" /></button>
                <button onClick={() => setEditingBuffer(false)}><X className="w-3 h-3 text-gray-400" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <p className="text-xl font-black text-amber-400">GH₵ {config.emergencyBuffer.toFixed(2)}</p>
                <button onClick={() => { setBufferInput(config.emergencyBuffer.toString()); setEditingBuffer(true); }}>
                  <Edit2 className="w-3 h-3 text-gray-500 hover:text-amber-400 transition-colors" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Runway Ended Banner */}
        {summary.isRunwayEnded && (
          <div className="mt-4 bg-red-500/20 border border-red-500/30 rounded-xl p-3 flex justify-between items-center">
            <p className="text-sm font-bold text-red-400">⚠️ You've gone into your emergency buffer!</p>
            <button
              onClick={() => setShowRestartModal(true)}
              className="text-xs bg-red-500 hover:bg-red-400 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      {/* ── Day Cards ─────────────────────────────────────────────────────── */}
      <div>
        {days.map((day, idx) => {
          const stats = getStatsForDayIndex(days, idx);
          const isTodayDate = isToday(parseISO(day.date));
          if (!stats) return null;

          return (
            <div key={day.date} ref={isTodayDate ? todayRef : null}>
              <DayCard
                dateStr={day.date}
                planned={day.planned}
                actual={day.actual}
                stats={stats}
                onAddPlanned={addPlannedItem}
                onRemovePlanned={removePlannedItem}
                isExpanded={expandedDay === day.date}
                onToggle={() => setExpandedDay(expandedDay === day.date ? null : day.date)}
              />
            </div>
          );
        })}
      </div>

      {/* ── Restart / New Period Modal ─────────────────────────────────────── */}
      {showRestartModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex flex-col justify-end md:justify-center items-center p-0 md:p-4">
          <div className="bg-white dark:bg-gray-900 rounded-t-[2rem] md:rounded-3xl p-6 w-full md:max-w-sm border border-gray-100 dark:border-gray-700 shadow-2xl max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 md:animate-none">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Start a New Period?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Your <span className="font-bold text-gray-900 dark:text-white">transaction history</span> in the Budget Tracker stays untouched.
              Only the runway plan (daily allocations) will be cleared.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRestart}
                className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl hover:bg-black dark:hover:bg-gray-100 transition-colors"
              >
                Yes, Start New Period
              </button>
              <button
                onClick={() => setShowRestartModal(false)}
                className="w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
