import { supabase } from '../lib/supabase';
import { withCache, ONE_HOUR_TTL, cacheInvalidatePrefix } from './cacheService';

/**
 * Clears all cached thrift listings and user item stats
 */
export const clearThriftCache = () => {
  cacheInvalidatePrefix('thrift_');
};

/**
 * Fetches user's thrift listings
 */
export const fetchUserThriftListings = async (userId) => {
  if (!userId) return { listings: [], error: null };
  const cacheKey = `thrift_user_listings_${userId}`;
  return await withCache(cacheKey, async () => {
    try {
      const { data, error } = await supabase
        .from('thrift_listings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching thrift listings:', error);
        return { listings: [], error: error.message };
      }

      return { listings: data || [], error: null };
    } catch (error) {
      console.error('Error in fetchUserThriftListings:', error);
      return { listings: [], error: error.message };
    }
  }, ONE_HOUR_TTL);
};

/**
 * Checks if user can post a new thrift listing
 * Free: 10 active max, 2/day — Supporters: 25 active max, 5/day
 */
export const canPostThriftListing = async (userId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [dailyRes, totalRes, userRes] = await Promise.all([
      supabase.from('thrift_listings').select('id').eq('user_id', userId)
        .gte('created_at', today.toISOString()).lt('created_at', tomorrow.toISOString()),
      supabase.from('thrift_listings').select('id').eq('user_id', userId)
        .eq('status', 'ACTIVE').eq('is_sold', false),
      supabase.from('users').select('is_supporter').eq('id', userId).single()
    ]);

    if (dailyRes.error || totalRes.error) {
      console.error('Error checking thrift listing count:', dailyRes.error || totalRes.error);
      return { canPost: false, error: 'Failed to check listings.', count: 0 };
    }

    const isSupporter = userRes.data?.is_supporter || false;
    const maxActive = isSupporter ? 25 : 10;
    const maxDaily = isSupporter ? 5 : 2;

    const dailyCount = dailyRes.data ? dailyRes.data.length : 0;
    const totalCount = totalRes.data ? totalRes.data.length : 0;

    if (totalCount >= maxActive) {
      return { canPost: false, error: null, count: dailyCount, limitReason: 'TOTAL', maxActive, maxDaily };
    }

    return {
      canPost: dailyCount < maxDaily,
      error: null,
      count: dailyCount,
      limitReason: dailyCount >= maxDaily ? 'DAILY' : null,
      maxActive, maxDaily
    };
  } catch (error) {
    console.error('Error in canPostThriftListing:', error);
    return { canPost: false, error: error.message, count: 0 };
  }
};

/**
 * Creates a new thrift listing
 */
export const createThriftListing = async (listing) => {
  try {
    // Soft duplicate check: warn if same user has active listing with same name
    if (listing.user_id && listing.item_name) {
      const { data: existing } = await supabase
        .from('thrift_listings')
        .select('id, expires_at, status')
        .eq('user_id', listing.user_id)
        .eq('item_name', listing.item_name)
        .limit(1);

      if (existing && existing.length > 0) {
        return { listing: null, error: 'DUPLICATE_ACTIVE', existingListing: existing[0] };
      }
    }

    // Cooldown check: if user deleted a listing recently, wait 1 hour
    if (listing.user_id) {
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      const { data: recentDeleted } = await supabase
        .from('thrift_listings')
        .select('id, deleted_at')
        .eq('user_id', listing.user_id)
        .gte('deleted_at', oneHourAgo.toISOString())
        .limit(1);

      if (recentDeleted && recentDeleted.length > 0) {
        return { listing: null, error: 'COOLDOWN' };
      }
    }

    // Set default expiration date (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const { data, error } = await supabase
      .from('thrift_listings')
      .insert([{
        ...listing,
        expires_at: expiresAt.toISOString(),
        is_featured: false,
        featured_until: null,
        is_sold: false,
        extension_count: 0
      }])
      .select();

    if (error) {
      console.error('Error creating thrift listing:', error);
      return { listing: null, error: error.message };
    }

    clearThriftCache();
    return { listing: data ? data[0] : null, error: null };
  } catch (error) {
    console.error('Error in createThriftListing:', error);
    return { listing: null, error: error.message };
  }
};

/**
 * Deletes a thrift listing
 */
export const deleteThriftListing = async (listingId) => {
  try {
    const { error } = await supabase
      .from('thrift_listings')
      .delete()
      .eq('id', listingId);

    if (error) {
      console.error('Error deleting thrift listing:', error);
      return { success: false, error: error.message };
    }

    clearThriftCache();
    return { success: true, error: null };
  } catch (error) {
    console.error('Error in deleteThriftListing:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Boosts a thrift listing (adds featured status for a duration)
 */
export const boostThriftListing = async (listingId, days) => {
  try {
    const now = new Date();
    const featuredUntil = new Date(now);
    featuredUntil.setDate(featuredUntil.getDate() + days);

    // Also extend expires_at so boosted items stay visible in the feed
    const { data: current } = await supabase
      .from('thrift_listings')
      .select('expires_at')
      .eq('id', listingId)
      .single();

    let newExpiresAt = null;
    if (current?.expires_at) {
      const currentExpiry = new Date(current.expires_at);
      if (currentExpiry < featuredUntil) {
        newExpiresAt = featuredUntil.toISOString();
      }
    }
    
    const updateFields = {
      is_featured: true,
      featured_until: featuredUntil.toISOString()
    };
    if (newExpiresAt) updateFields.expires_at = newExpiresAt;

    const { data, error } = await supabase
      .from('thrift_listings')
      .update(updateFields)
      .eq('id', listingId)
      .select()
      .single();

    if (error) {
      console.error('Error boosting thrift listing:', error);
      return { listing: null, error: error.message };
    }

    clearThriftCache();
    return { listing: data, error: null };
  } catch (error) {
    console.error('Error in boostThriftListing:', error);
    return { listing: null, error: error.message };
  }
};

/**
 * Fetches all thrift listings, ordered by featured status first, then by date (Cached 1 Hour)
 */
const THRIFT_PAGE_SIZE = 20;

export const fetchAllThriftListings = async (page = 0, campusId = null) => {
  const cacheKey = `thrift_feed_p${page}_c${campusId || 'all'}`;
  return await withCache(cacheKey, async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_feed_thrift_listings', {
          p_page: page,
          p_page_size: THRIFT_PAGE_SIZE,
          p_campus_id: campusId || null
        });

      if (error) {
        console.error('Error fetching all thrift listings:', error);
        return { listings: [], error: error.message, hasMore: false };
      }

      return { listings: data || [], error: null, hasMore: (data || []).length === THRIFT_PAGE_SIZE };
    } catch (error) {
      console.error('Error in fetchAllThriftListings:', error);
      return { listings: [], error: error.message, hasMore: false };
    }
  }, ONE_HOUR_TTL);
};

/**
 * Extends a thrift listing's expiration date
 */
export const extendThriftListing = async (listingId, days = 7) => {
  try {
    // Get current listing first
    const { data: currentListing, error: fetchError } = await supabase
      .from('thrift_listings')
      .select('expires_at, extension_count')
      .eq('id', listingId)
      .single();

    if (fetchError) {
      console.error('Error fetching listing:', fetchError);
      return { listing: null, error: fetchError.message };
    }

    // Cap: only 1 free extension allowed
    if ((currentListing.extension_count || 0) >= 1) {
      return { listing: null, error: 'Free extension limit reached. Boost your listing to keep it visible.' };
    }

    // Calculate new expiry date (extend from current expiry date, not today)
    const currentExpiry = new Date(currentListing.expires_at);
    const newExpiryDate = new Date(currentExpiry);
    newExpiryDate.setDate(newExpiryDate.getDate() + days);
    
    const { data, error } = await supabase
      .from('thrift_listings')
      .update({
        expires_at: newExpiryDate.toISOString(),
        extension_count: (currentListing.extension_count || 0) + 1
      })
      .eq('id', listingId)
      .select()
      .single();

    if (error) {
      console.error('Error extending thrift listing:', error);
      return { listing: null, error: error.message };
    }

    clearThriftCache();
    return { listing: data, error: null };
  } catch (error) {
    console.error('Error in extendThriftListing:', error);
    return { listing: null, error: error.message };
  }
};

/**
 * Marks a thrift listing as sold
 */
export const markThriftListingAsSold = async (listingId) => {
  try {
    const { data, error } = await supabase
      .from('thrift_listings')
      .update({
        is_sold: true,
        status: 'SOLD'
      })
      .eq('id', listingId)
      .select()
      .single();

    if (error) {
      console.error('Error marking thrift listing as sold:', error);
      return { listing: null, error: error.message };
    }

    clearThriftCache();
    return { listing: data, error: null };
  } catch (error) {
    console.error('Error in markThriftListingAsSold:', error);
    return { listing: null, error: error.message };
  }
};

/**
 * Fetches thrift listings with their analytics stats (Cached 1 Hour)
 */
export const fetchUserThriftListingsWithStats = async (userId) => {
  if (!userId) return { listings: [], stats: {}, error: null };
  const cacheKey = `thrift_user_stats_${userId}`;
  return await withCache(cacheKey, async () => {
    try {
      const { listings, error } = await fetchUserThriftListings(userId);
      if (error || !listings.length) return { listings: listings || [], stats: {}, error };

      const ids = listings.map(l => l.id);
      const { data: statsData, error: statsError } = await supabase
        .from('thrift_item_stats')
        .select('*')
        .in('thrift_id', ids);

      if (statsError) console.error('Error fetching thrift stats:', statsError);

      const stats = {};
      (statsData || []).forEach(s => { stats[s.thrift_id] = s; });
      return { listings, stats, error: null };
    } catch (error) {
      console.error('Error in fetchUserThriftListingsWithStats:', error);
      return { listings: [], stats: {}, error: error.message };
    }
  }, ONE_HOUR_TTL);
};

/**
 * Fetches thrift listings that are expiring soon (within 2 days)
 */
export const fetchExpiringThriftListings = async (userId) => {
  try {
    const today = new Date();
    const inTwoDays = new Date(today);
    inTwoDays.setDate(inTwoDays.getDate() + 2);

    const { data, error } = await supabase
      .from('thrift_listings')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'ACTIVE')
      .eq('is_sold', false)
      .gte('expires_at', today.toISOString())
      .lte('expires_at', inTwoDays.toISOString())
      .order('expires_at', { ascending: true });

    if (error) {
      console.error('Error fetching expiring thrift listings:', error);
      return { listings: [], error: error.message };
    }

    return { listings: data || [], error: null };
  } catch (error) {
    console.error('Error in fetchExpiringThriftListings:', error);
    return { listings: [], error: error.message };
  }
};