/**
 * cacheService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * A localStorage-backed TTL cache for Supabase fetches.
 *
 * WHY THIS EXISTS:
 *   Every Supabase SELECT costs egress bandwidth. On the free tier this
 *   accumulates fast. Most of the data this app reads (community feed,
 *   map buildings, announcements) changes at most once a day — there is
 *   zero reason to re-fetch it on every page visit.
 *
 *   This service caches any response for a configurable TTL (default 24h).
 *   On cache HIT  → returns stored data instantly, zero network cost.
 *   On cache MISS → calls the fetch function, stores the result, returns it.
 *
 * USAGE:
 *   import { withCache, cacheInvalidate } from './cacheService';
 *
 *   // Fetch + cache for 24h
 *   const data = await withCache('community_feed', async () => {
 *       const { data } = await supabase.from('advertisements').select('*');
 *       return data;
 *   });
 *
 *   // Force-refresh (e.g. after a user posts something)
 *   cacheInvalidate('community_feed');
 */

const CACHE_PREFIX  = 'ucc_cache_';
const DEFAULT_TTL   = 24 * 60 * 60 * 1000; // 24 hours in ms
const SHORT_TTL     = 2  * 60 * 60 * 1000; //  2 hours  in ms  (for time-sensitive data)
const LONG_TTL      = 7  * 24 * 60 * 60 * 1000; // 7 days (near-static data like map buildings)

export { DEFAULT_TTL, SHORT_TTL, LONG_TTL };

// ── Low-level get/set ─────────────────────────────────────────────────────────

/**
 * Read a cache entry. Returns null on miss or expiry.
 */
export const cacheGet = (key) => {
    try {
        const raw = localStorage.getItem(CACHE_PREFIX + key);
        if (!raw) return null;

        const envelope = JSON.parse(raw);
        if (!envelope || typeof envelope.expiresAt !== 'number') return null;

        if (Date.now() > envelope.expiresAt) {
            // Expired — clean up synchronously
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }

        return envelope.data;
    } catch {
        return null;
    }
};

/**
 * Write a cache entry with a TTL.
 */
export const cacheSet = (key, data, ttlMs = DEFAULT_TTL) => {
    try {
        const envelope = {
            data,
            cachedAt:  Date.now(),
            expiresAt: Date.now() + ttlMs,
        };
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(envelope));
    } catch (e) {
        // localStorage quota exceeded or unavailable — silently skip caching
        console.warn('[cacheService] Could not write cache:', key, e.message);
    }
};

/**
 * Return the age of a cache entry in milliseconds, or null if not cached.
 */
export const cacheAge = (key) => {
    try {
        const raw = localStorage.getItem(CACHE_PREFIX + key);
        if (!raw) return null;
        const { cachedAt } = JSON.parse(raw);
        return cachedAt ? Date.now() - cachedAt : null;
    } catch {
        return null;
    }
};

/**
 * Delete a single cache entry (use after a write/mutation so next read is fresh).
 */
export const cacheInvalidate = (key) => {
    try {
        localStorage.removeItem(CACHE_PREFIX + key);
    } catch { /* silent */ }
};

/**
 * Wipe all cache entries created by this service (all keys starting with CACHE_PREFIX).
 */
export const cacheClearAll = () => {
    try {
        const toRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith(CACHE_PREFIX)) toRemove.push(k);
        }
        toRemove.forEach(k => localStorage.removeItem(k));
        console.log(`[cacheService] Cleared ${toRemove.length} cache entries.`);
    } catch { /* silent */ }
};

// ── High-level wrapper ────────────────────────────────────────────────────────

/**
 * withCache — the main API.
 *
 * @param {string}   key      - Unique cache key for this dataset.
 * @param {Function} fetchFn  - Async function that fetches and returns the data.
 * @param {number}   ttlMs    - How long to cache (default: 24h).
 * @returns {Promise<any>}    - The data (from cache or fresh fetch).
 *
 * Throws if fetchFn throws AND there is no stale cache to fall back on.
 * If fetchFn throws but stale data exists, returns the stale data (graceful degradation).
 */
export const withCache = async (key, fetchFn, ttlMs = DEFAULT_TTL) => {
    // 1. Check for valid (non-expired) cache
    const cached = cacheGet(key);
    if (cached !== null) {
        return cached;
    }

    // 2. Cache miss — fetch fresh data
    try {
        const freshData = await fetchFn();
        cacheSet(key, freshData, ttlMs);
        return freshData;
    } catch (fetchError) {
        // 3. Fetch failed — attempt graceful degradation with stale data
        try {
            const raw = localStorage.getItem(CACHE_PREFIX + key);
            if (raw) {
                const { data } = JSON.parse(raw);
                if (data !== undefined) {
                    console.warn('[cacheService] Fetch failed, serving stale cache for:', key);
                    return data;
                }
            }
        } catch { /* no stale data available */ }

        // 4. No stale data — re-throw so the caller can show an error state
        throw fetchError;
    }
};

// ── Named cache keys (single source of truth) ─────────────────────────────────
// Import these instead of hardcoding strings in components.
export const CACHE_KEYS = {
    COMMUNITY_ADS:           'community_ads',
    COMMUNITY_ANNOUNCEMENTS: 'community_announcements',
    COMMUNITY_LOST_FOUND:    'community_lost_found',
    CAMPUS_BUILDINGS:        'campus_buildings',
    CAMPUS_METADATA:         'campus_metadata',
};
