import { get, set, del } from 'idb-keyval';

const RUNWAY_CONFIG_KEY = 'proactive_runway_config';

/**
 * Stores the runway configuration:
 * {
 *   periodBudget: number,       — how much the user allocated for this period
 *   emergencyBuffer: number,    — protected amount never to be touched
 *   startDate: 'yyyy-MM-dd',
 *   endDate:   'yyyy-MM-dd',
 *   plannedDays: {
 *     "yyyy-MM-dd": [{ id, description, amount, meal }]
 *   }
 * }
 *
 * Actual spend per day is derived LIVE from Budget Tracker transactions.
 */
export const RunwayDB = {
  async getConfig() {
    return (await get(RUNWAY_CONFIG_KEY)) || null;
  },
  async saveConfig(config) {
    await set(RUNWAY_CONFIG_KEY, config);
  },
  async clearConfig() {
    await del(RUNWAY_CONFIG_KEY);
  }
};
