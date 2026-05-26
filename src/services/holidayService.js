import { supabase } from '../lib/supabase';

const HOLIDAY_CACHE_KEY = 'ucc_ghana_holidays';
const HOLIDAY_CACHE_YEAR_KEY = 'ucc_holidays_year';

/**
 * Fetches Ghana public holidays for the current year.
 * Uses date.nager.at free API (no key required).
 * Caches in Supabase + localStorage for offline access.
 */
export const fetchGhanaHolidays = async (year = new Date().getFullYear()) => {
  try {
    // 1. Check localStorage cache first (instant)
    const cachedYear = localStorage.getItem(HOLIDAY_CACHE_YEAR_KEY);
    const cachedHolidays = JSON.parse(localStorage.getItem(HOLIDAY_CACHE_KEY) || '[]');
    
    if (cachedYear === String(year) && cachedHolidays.length > 0) {
      return cachedHolidays;
    }

    // 2. Check Supabase cache
    const { data: dbHolidays } = await supabase
      .from('ghana_holidays')
      .select('*')
      .eq('year', year);

    if (dbHolidays && dbHolidays.length > 0) {
      const mapped = dbHolidays.map(h => ({
        date: h.date,
        name: h.name,
        localName: h.local_name || '',
        type: h.type || 'public',
      }));
      localStorage.setItem(HOLIDAY_CACHE_KEY, JSON.stringify(mapped));
      localStorage.setItem(HOLIDAY_CACHE_YEAR_KEY, String(year));
      return mapped;
    }

    // 3. Fetch from API
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/GH`);
    if (!res.ok) throw new Error('Holiday API failed');
    
    const apiHolidays = await res.json();
    
    // Map API response to our format
    const holidays = apiHolidays.map(h => ({
      date: h.date,
      name: h.name,
      localName: h.localName || '',
      type: h.types?.[0] || 'public',
    }));

    // Cache in localStorage
    localStorage.setItem(HOLIDAY_CACHE_KEY, JSON.stringify(holidays));
    localStorage.setItem(HOLIDAY_CACHE_YEAR_KEY, String(year));

    // Cache in Supabase (fire-and-forget)
    const rows = holidays.map(h => ({
      id: `${year}-${h.date}`,
      year: year,
      date: h.date,
      name: h.name,
      local_name: h.localName,
      type: h.type,
    }));
    
    supabase
      .from('ghana_holidays')
      .upsert(rows, { onConflict: 'id' })
      .then(() => {}) // fire-and-forget
      .catch(() => {}); // ignore errors

    return holidays;
  } catch (error) {
    console.error('Failed to fetch holidays:', error);
    // Return cached data even if stale
    return JSON.parse(localStorage.getItem(HOLIDAY_CACHE_KEY) || '[]');
  }
};

/**
 * Checks if today is a Ghana public holiday.
 * Returns the holiday object or null.
 */
export const getTodayHoliday = async () => {
  const holidays = await fetchGhanaHolidays();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return holidays.find(h => h.date === today) || null;
};

/**
 * Checks if a specific date is a holiday.
 */
export const isHoliday = (dateStr, holidays) => {
  return holidays.some(h => h.date === dateStr);
};
