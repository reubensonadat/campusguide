import { supabase } from '../lib/supabase';

/**
 * Fetches user's thrift listings
 */
export const fetchUserThriftListings = async (userId) => {
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
};

/**
 * Checks if user can post a new thrift listing (max 2 per day)
 */
export const canPostThriftListing = async (userId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data, error } = await supabase
      .from('thrift_listings')
      .select('id')
      .eq('user_id', userId)
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString());

    if (error) {
      console.error('Error checking thrift listing count:', error);
      return { canPost: false, error: error.message, count: 0 };
    }

    const { data: totalData, error: totalError } = await supabase
      .from('thrift_listings')
      .select('id')
      .eq('user_id', userId)
      .eq('status', 'ACTIVE')
      .eq('is_sold', false);

    if (totalError) {
      console.error('Error checking total active listings:', totalError);
      return { canPost: false, error: totalError.message, count: 0 };
    }

    const dailyCount = data ? data.length : 0;
    const totalCount = totalData ? totalData.length : 0;

    if (totalCount >= 5) {
      return {
        canPost: false,
        error: null,
        count: dailyCount,
        limitReason: 'TOTAL'
      };
    }

    return {
      canPost: dailyCount < 2,
      error: null,
      count: dailyCount,
      limitReason: dailyCount >= 2 ? 'DAILY' : null
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
      .select()
      .single();

    if (error) {
      console.error('Error creating thrift listing:', error);
      return { listing: null, error: error.message };
    }

    return { listing: data, error: null };
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
    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    
    const { data, error } = await supabase
      .from('thrift_listings')
      .update({ 
        is_featured: true,
        featured_until: expiryDate.toISOString()
      })
      .eq('id', listingId)
      .select()
      .single();

    if (error) {
      console.error('Error boosting thrift listing:', error);
      return { listing: null, error: error.message };
    }

    return { listing: data, error: null };
  } catch (error) {
    console.error('Error in boostThriftListing:', error);
    return { listing: null, error: error.message };
  }
};

/**
 * Fetches all thrift listings, ordered by featured status first, then by date
 */
export const fetchAllThriftListings = async () => {
  try {
    const today = new Date().toISOString();
    const { data, error } = await supabase
      .from('thrift_listings')
      .select('*')
      .eq('status', 'ACTIVE')
      .gte('expires_at', today) // Filter out expired items at the DB level
      .order('is_featured', { ascending: false }) // Featured first
      .order('featured_until', { ascending: true, nullsFirst: false }) // Then by featured expiry
      .order('created_at', { ascending: false }); // Then by creation date

    if (error) {
      console.error('Error fetching all thrift listings:', error);
      return { listings: [], error: error.message };
    }

    return { listings: data || [], error: null };
  } catch (error) {
    console.error('Error in fetchAllThriftListings:', error);
    return { listings: [], error: error.message };
  }
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

    return { listing: data, error: null };
  } catch (error) {
    console.error('Error in markThriftListingAsSold:', error);
    return { listing: null, error: error.message };
  }
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