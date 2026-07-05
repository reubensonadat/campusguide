import { useState, useEffect, useCallback } from 'react';
import { RunwayDB } from '../lib/runwayDb';
import { addDays, format, differenceInDays, parseISO, startOfDay } from 'date-fns';

/**
 * useRunwaySimulation
 *
 * @param {Array} transactions - All transactions from the Budget Tracker (ucc_budget)
 *
 * Budget for the period comes from config.periodBudget (user-entered at setup).
 * Actuals for each day come from Budget Tracker transactions filtered by date.
 */
export function useRunwaySimulation({ transactions = [] } = {}) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const stored = await RunwayDB.getConfig();
      setConfig(stored);
      setLoading(false);
    }
    load();
  }, []);

  const persistConfig = useCallback(async (newConfig) => {
    setConfig(newConfig);
    await RunwayDB.saveConfig(newConfig);
  }, []);

  // ── Initialize ─────────────────────────────────────────────────────────────
  const initializeRunway = useCallback(async ({ periodBudget, emergencyBuffer, startDate, endDate }) => {
    await persistConfig({
      periodBudget: parseFloat(periodBudget),
      emergencyBuffer: parseFloat(emergencyBuffer),
      startDate,
      endDate,
      plannedDays: {}
    });
  }, [persistConfig]);

  // ── Update Buffer (editable from runway header) ────────────────────────────
  const updateBuffer = useCallback(async (newBuffer) => {
    if (!config) return;
    await persistConfig({ ...config, emergencyBuffer: parseFloat(newBuffer) });
  }, [config, persistConfig]);

  // ── Planned Items ──────────────────────────────────────────────────────────
  const addPlannedItem = useCallback(async (dateStr, item) => {
    if (!config) return;
    const existing = config.plannedDays[dateStr] || [];
    await persistConfig({
      ...config,
      plannedDays: {
        ...config.plannedDays,
        [dateStr]: [...existing, { ...item, id: Date.now().toString() }]
      }
    });
  }, [config, persistConfig]);

  const removePlannedItem = useCallback(async (dateStr, itemId) => {
    if (!config) return;
    const existing = config.plannedDays[dateStr] || [];
    await persistConfig({
      ...config,
      plannedDays: {
        ...config.plannedDays,
        [dateStr]: existing.filter(e => e.id !== itemId)
      }
    });
  }, [config, persistConfig]);

  // ── Clear ──────────────────────────────────────────────────────────────────
  const clearRunway = useCallback(async () => {
    setConfig(null);
    await RunwayDB.clearConfig();
  }, []);

  // ── Compute Day Slots ──────────────────────────────────────────────────────
  const getDays = useCallback(() => {
    if (!config) return [];
    const start = startOfDay(parseISO(config.startDate));
    const end = startOfDay(parseISO(config.endDate));
    const totalDays = Math.max(1, differenceInDays(end, start) + 1);

    return Array.from({ length: totalDays }, (_, i) => {
      const date = format(addDays(start, i), 'yyyy-MM-dd');
      const planned = config.plannedDays[date] || [];

      // Pull actuals from Budget Tracker transactions for this date
      const actual = transactions
        .filter(t => t.type === 'expense' && t.date === date)
        .map(t => ({
          id: String(t.id),
          description: t.description || t.category,
          category: t.category,
          amount: parseFloat(t.amount)
        }));

      return { date, planned, actual };
    });
  }, [config, transactions]);

  // ── Per-day Stats ──────────────────────────────────────────────────────────
  const getStatsForDayIndex = useCallback((days, dayIndex) => {
    if (!config) return null;
    const { periodBudget, emergencyBuffer } = config;
    const deployable = periodBudget - emergencyBuffer;

    // All actuals logged in the runway period up to (but not including) this day
    const spentBefore = days
      .slice(0, dayIndex)
      .reduce((sum, d) => sum + d.actual.reduce((s, e) => s + e.amount, 0), 0);

    const remainingBudget = deployable - spentBefore;
    const remainingDays = days.length - dayIndex;
    const dailyAllowance = remainingDays > 0 ? remainingBudget / remainingDays : 0;

    const day = days[dayIndex];
    const plannedSum = day.planned.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const actualSum = day.actual.reduce((sum, e) => sum + e.amount, 0);
    const drift = actualSum - plannedSum;

    const totalSpent = spentBefore + actualSum;
    const overallRemaining = deployable - totalSpent;

    let status = 'green';
    if (overallRemaining < 0) status = 'red';   // into emergency buffer
    else if (drift > 0) status = 'yellow';       // over plan for today

    return { plannedSum, actualSum, dailyAllowance, drift, status, overallRemaining };
  }, [config]);

  // ── Summary ────────────────────────────────────────────────────────────────
  const getSummary = useCallback(() => {
    if (!config) return null;
    const days = getDays();
    const { periodBudget, emergencyBuffer } = config;
    const deployable = periodBudget - emergencyBuffer;
    const totalActual = days.reduce((sum, d) => sum + d.actual.reduce((s, e) => s + e.amount, 0), 0);
    const remaining = deployable - totalActual;
    const today = format(new Date(), 'yyyy-MM-dd');
    const daysLeft = days.filter(d => d.date >= today).length;
    const dailyAllowance = daysLeft > 0 ? remaining / daysLeft : 0;

    return {
      periodBudget,
      emergencyBuffer,
      deployable,
      totalActual,
      remaining,
      daysLeft,
      dailyAllowance,
      isRunwayEnded: remaining < 0
    };
  }, [config, getDays]);

  return {
    config,
    loading,
    initializeRunway,
    updateBuffer,
    addPlannedItem,
    removePlannedItem,
    clearRunway,
    getDays,
    getStatsForDayIndex,
    getSummary
  };
}
