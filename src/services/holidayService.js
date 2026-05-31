import { supabase } from '../lib/supabase';

const HOLIDAY_CACHE_KEY = 'ucc_ghana_holidays';
const HOLIDAY_CACHE_YEAR_KEY = 'ucc_holidays_year';

// ── Hardcoded fallback for 2026 Ghana public holidays ────────────────────────
// Used when the API is unreachable and no cache exists (e.g. Eid al-Adha on May 27).
const HARDCODED_HOLIDAYS = {
  2026: [
    { date: '2026-01-01', name: "New Year's Day", type: 'public' },
    { date: '2026-01-07', name: 'Constitution Day', type: 'public' },
    { date: '2026-03-06', name: 'Independence Day', type: 'public' },
    { date: '2026-03-30', name: 'Eid al-Fitr', type: 'public' },
    { date: '2026-05-01', name: 'May Day', type: 'public' },
    { date: '2026-05-25', name: 'African Union Day', type: 'public' },
    { date: '2026-05-27', name: 'Eid al-Adha', type: 'public' },
    { date: '2026-07-01', name: 'Republic Day', type: 'public' },
    { date: '2026-08-04', name: "Founders' Day", type: 'public' },
    { date: '2026-09-21', name: 'Kwame Nkrumah Memorial Day', type: 'public' },
    { date: '2026-12-25', name: 'Christmas Day', type: 'public' },
    { date: '2026-12-26', name: 'Boxing Day', type: 'public' },
  ],
};

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


    return holidays;
  } catch (error) {
    console.error('Failed to fetch holidays:', error);
    // Return cached data even if stale, or hardcoded fallback
    const cached = JSON.parse(localStorage.getItem(HOLIDAY_CACHE_KEY) || '[]');
    if (cached.length > 0) return cached;
    return HARDCODED_HOLIDAYS[year] || [];
  }
};

/**
 * Checks if today is a Ghana public holiday.
 * Returns the holiday object or null.
 * Checks hardcoded list FIRST (always reliable for known variable-date holidays like Eid).
 */
export const getTodayHoliday = async () => {
  const year = new Date().getFullYear();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // 1. Check hardcoded fallback first — these are guaranteed correct
  const hardcoded = HARDCODED_HOLIDAYS[year];
  if (hardcoded) {
    const hardcodedMatch = hardcoded.find(h => h.date === today);
    if (hardcodedMatch) return hardcodedMatch;
  }

  // 2. Then check dynamic sources (API / cache / Supabase)
  const holidays = await fetchGhanaHolidays();
  return holidays.find(h => h.date === today) || null;
};

/**
 * Checks if a specific date is a holiday.
 */
export const isHoliday = (dateStr, holidays) => {
  return holidays.some(h => h.date === dateStr);
};
