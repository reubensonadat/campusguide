import { supabase } from '../lib/supabase';
import notificationService from './notificationService';

const DOMAIN = '@campusguide.app';

/**
 * Secures a device by registering it via Supabase Auth.
 * Uses a synthetic email (deviceId@campusguide.app) and the 6-digit PIN.
 */
export const secureDevice = async (deviceId, pin) => {
  if (!deviceId || !pin || pin.length < 6) {
    return { success: false, error: 'Valid Device ID and a 6-digit PIN are required.' };
  }

  // Remove all whitespace and convert to lowercase
  const cleanId = deviceId.replace(/\s+/g, '').toLowerCase();
  const syntheticEmail = `${cleanId}${DOMAIN}`;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: syntheticEmail,
      password: pin,
    });

    if (error) throw error;

    // Supabase will automatically insert into auth.users.
    // We must manually insert the corresponding public.users record
    if (data?.user?.id) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          device_id: deviceId,
        });

      // If user exists, it might just mean they signed up before. 
      // We ignore duplicate key errors for the users table if necessary, 
      // but optimally it shouldn't happen on fresh device generation.
      if (insertError && insertError.code !== '23505') {
        console.error('Failed to create public user record:', insertError);
      }

      // Persist the Auth UUID so thrift and other services can query by user_id
      localStorage.setItem('ucc_user_id', data.user.id);

      try { notificationService.tagUser(data.user.id); } catch {}
    }

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Registration failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Resolves the sign-in identifier: if the input looks like a device ID (has a hyphen),
 * use it directly. Otherwise treat it as a username and look up the device_id from DB.
 */
const resolveDeviceId = async (input) => {
  const trimmed = input.trim();
  if (trimmed.includes('-')) return trimmed.toUpperCase();
  // Treat as username — query the public.users table
  const { data, error } = await supabase
    .from('users')
    .select('device_id')
    .eq('username', trimmed.toLowerCase().replace(/[^a-z0-9_]/g, ''))
    .maybeSingle();
  if (error || !data?.device_id) return null;
  return data.device_id;
};

/**
 * Restores the user's lifecycle onto a new device.
 * Accepts either a Device ID (e.g. UCC-XXXXXXXX) or a username.
 * Logs in via Supabase Auth using the resolved device ID and PIN.
 */
export const restoreLifecycle = async (oldDeviceId, pin) => {
  if (!oldDeviceId || !pin) {
    return { success: false, error: 'Device ID or username and PIN required.' };
  }

  const resolvedId = await resolveDeviceId(oldDeviceId);
  if (!resolvedId) {
    return { success: false, error: 'Could not find that Device ID or username. Check your spelling and try again.' };
  }

  const cleanId = resolvedId.replace(/\s+/g, '').toLowerCase();
  const syntheticEmail = `${cleanId}${DOMAIN}`;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: syntheticEmail,
      password: pin,
    });

    if (error) throw error;

    // Save the old device ID locally so the app adopts it
    localStorage.setItem('ucc_device_id', resolvedId);
    // Persist the Auth UUID so thrift and other services can query by user_id
    localStorage.setItem('ucc_user_id', data.user.id);

    try { notificationService.tagUser(data.user.id); } catch {}

    return { success: true, user: data.user };
  } catch (error) {
    console.error('Restore failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Helper to get the current securely logged-in user.
 */
export const getCurrentUser = async () => {
  const localUserId = localStorage.getItem('ucc_user_id');
  if (localUserId) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) return session.user;
    } catch (_) { }
    return { id: localUserId, synthetic: true };
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  } catch (_) {
    return null;
  }
};

/**
 * Update the user's 6-digit PIN (password) in Supabase.
 */
export const updatePin = async (newPin) => {
  if (!newPin || newPin.length < 6) {
    return { success: false, error: 'PIN must be at least 6 digits.' };
  }

  try {
    const { data, error } = await supabase.auth.updateUser({ password: newPin });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Failed to update PIN:', error);
    return { success: false, error: error.message };
  }
};
