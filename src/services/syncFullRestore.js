import { supabase } from '../lib/supabase';
import { sanitizeGhanaPhone } from '../utils/helpers';
import { pullTimetableFromCloud } from './syncTimetable';
import { pullAssignmentsFromCloud } from './syncAssignments';
import { pullGPAFromCloud } from './syncGPA';
import { pullTasksFromCloud } from './syncTasks';
import { pullBudgetFromCloud } from './syncBudget';

export async function restoreFromCloud() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { success: false, error: 'User not authenticated. Please restore lifecycle first.' };

  try {
    const IDENTITY_KEYS = new Set([
      'ucc_device_id', 'ucc_user_id', 'ucc_is_linked_device',
      'ucc_last_sync', 'ucc_last_pull_time',
      'ucc_coach_home', 'ucc_coach_map', 'ucc_coach_tools',
      'ucc_coach_community', 'ucc_coach_profile',
      'ucc_first_visit', 'ucc_guide_completion',
      'ucc_seen_updates', 'ucc_notifications_enabled',
      'ucc_supporter_status',
    ]);
    const keysToWipe = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('ucc_') && !IDENTITY_KEYS.has(key)) {
        keysToWipe.push(key);
      }
    }
    keysToWipe.forEach(key => localStorage.removeItem(key));
    console.log('[syncService] Wiped', keysToWipe.length, 'data keys (preserved identity keys)');

    const { data: settings } = await supabase
      .from('user_settings')
      .select('profile, home_widgets, settings')
      .single();

    if (settings) {
      if (settings.profile && Object.keys(settings.profile).length > 0) {
        localStorage.setItem('ucc_profile', JSON.stringify(settings.profile));
      }
      if (settings.home_widgets && Object.keys(settings.home_widgets).length > 0) {
        localStorage.setItem('ucc_home_widgets', JSON.stringify(settings.home_widgets));
      }
    }

    const { data: userProfile } = await supabase.from('users').select('name, username, phone_number, course, level, current_semester, avatar_url, student_id').single();
    if (userProfile) {
      const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
      if (userProfile.name) profile.name = userProfile.name;
      if (userProfile.username) profile.username = userProfile.username;
      if (userProfile.phone_number) profile.phone = sanitizeGhanaPhone(userProfile.phone_number);
      if (userProfile.course) profile.course = userProfile.course;
      if (userProfile.level) profile.level = userProfile.level;
      if (userProfile.current_semester) profile.semester = userProfile.current_semester;
      if (userProfile.avatar_url) profile.avatarUrl = userProfile.avatar_url;
      if (userProfile.student_id) profile.student_id = userProfile.student_id;
      localStorage.setItem('ucc_profile', JSON.stringify(profile));
    }

    await pullTimetableFromCloud();
    await pullAssignmentsFromCloud();
    await pullGPAFromCloud();
    await pullTasksFromCloud();
    await pullBudgetFromCloud();

    const { data: notes } = await supabase
      .from('user_notes')
      .select('content')
      .eq('id', 'quick_note')
      .single();

    if (notes && notes.content) {
      localStorage.setItem('ucc_quick_notes', notes.content);
    }

    const { data: paymentsData } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: false });

    if (paymentsData && paymentsData.length > 0) {
      const highestPayment = paymentsData.sort((a, b) => b.amount - a.amount)[0];
      let tier = 'bronze';
      if (highestPayment.amount >= 50) tier = 'gold';
      else if (highestPayment.amount >= 20) tier = 'silver';
      
      const statusObj = {
        isSupporter: true,
        tier,
        amount: highestPayment.amount,
        reference: highestPayment.reference,
        paymentDate: highestPayment.created_at,
        name: highestPayment.user_name,
      };
      localStorage.setItem('ucc_supporter_status', JSON.stringify(statusObj));
    }
    
    // Notify providers
    window.dispatchEvent(new Event('storage'));

    return { success: true };
  } catch (error) {
    console.error('Restore failed:', error);
    return { success: false, error: error.message };
  }
}
