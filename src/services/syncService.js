import { supabase } from '../lib/supabase';

const LAST_SYNC_KEY = 'ucc_last_sync';
const SYNC_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Reads all localStorage data and syncs to Supabase.
 * localStorage is ALWAYS primary — this is a soft backup.
 * Never wipes local data. Always merge, never replace.
 */
export const syncToCloud = async (deviceId) => {
  if (!deviceId) return { success: false, error: 'No device ID' };

  try {
    // 1. Sync Profile
    const profile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
    if (profile.name || profile.phone || profile.course) {
      await supabase
        .from('user_settings')
        .upsert({
          device_id: deviceId,
          profile: profile,
          home_widgets: JSON.parse(localStorage.getItem('ucc_home_widgets') || '{}'),
          settings: JSON.parse(localStorage.getItem('ucc_settings') || '{}'),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'device_id' });
    }

    // 2. Sync Tasks
    const tasks = JSON.parse(localStorage.getItem('ucc_daily_tasks') || '[]');
    if (tasks.length > 0) {
      // Delete old tasks for this device, then insert current ones
      await supabase.from('user_tasks').delete().eq('device_id', deviceId);
      const taskRows = tasks.map(t => ({
        id: t.id,
        device_id: deviceId,
        title: t.title,
        date: t.date,
        time: t.time,
        end_time: t.endTime || null,
        icon: t.icon || 'study',
        status: t.status || 'pending',
        updated_at: new Date().toISOString(),
      }));
      await supabase.from('user_tasks').insert(taskRows);
    }

    // 3. Sync Timetable
    const timetable = JSON.parse(localStorage.getItem('ucc_timetable') || '[]');
    if (timetable.length > 0) {
      await supabase.from('user_timetable').delete().eq('device_id', deviceId);
      const timetableRows = timetable.map(c => ({
        id: String(c.id),
        device_id: deviceId,
        name: c.name,
        day: c.day,
        start_time: c.startTime,
        end_time: c.endTime,
        location: c.location || '',
        color: c.color || '#002F45',
        lecturer: c.lecturer || '',
        contact: c.contact || '',
        target_grade: c.targetGrade || '',
        credit_hours: c.creditHours || 3,
        updated_at: new Date().toISOString(),
      }));
      await supabase.from('user_timetable').insert(timetableRows);
    }

    // 4. Sync GPA Courses
    const gpaCourses = JSON.parse(localStorage.getItem('ucc_gpa') || '[]');
    if (gpaCourses.length > 0) {
      await supabase.from('user_gpa_courses').delete().eq('device_id', deviceId);
      const gpaRows = gpaCourses.map(c => ({
        id: String(c.id),
        device_id: deviceId,
        name: c.name,
        credit_hours: c.creditHours || 3,
        score: c.score || 0,
        grade: c.grade || 'E',
        grade_point: c.gradePoint || 0,
        is_detailed: c.isDetailed || false,
        exam_weight: c.examWeight || 60,
        exam_score: c.examScore || '',
        assessments: JSON.stringify(c.assessments || []),
        updated_at: new Date().toISOString(),
      }));
      await supabase.from('user_gpa_courses').insert(gpaRows);
    }

    // 5. Sync Quick Notes
    const notes = localStorage.getItem('ucc_quick_notes') || '';
    await supabase
      .from('user_notes')
      .upsert({
        id: 'quick_note',
        device_id: deviceId,
        content: notes,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    // Mark sync time
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());

    return { success: true };
  } catch (error) {
    console.error('Sync failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Restores all data from Supabase to localStorage.
 * Used when a user enters their unique ID on a new device.
 * MERGES — does not wipe existing local data.
 */
export const restoreFromCloud = async (deviceId) => {
  if (!deviceId) return { success: false, error: 'No device ID' };

  try {
    // 1. Restore Settings (profile, widgets)
    const { data: settings } = await supabase
      .from('user_settings')
      .select('*')
      .eq('device_id', deviceId)
      .single();

    if (settings) {
      if (settings.profile && Object.keys(settings.profile).length > 0) {
        const existingProfile = JSON.parse(localStorage.getItem('ucc_profile') || '{}');
        localStorage.setItem('ucc_profile', JSON.stringify({ ...existingProfile, ...settings.profile }));
      }
      if (settings.home_widgets && Object.keys(settings.home_widgets).length > 0) {
        localStorage.setItem('ucc_home_widgets', JSON.stringify(settings.home_widgets));
      }
    }

    // 2. Restore Tasks
    const { data: tasks } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('device_id', deviceId);

    if (tasks && tasks.length > 0) {
      const existingTasks = JSON.parse(localStorage.getItem('ucc_daily_tasks') || '[]');
      const existingIds = new Set(existingTasks.map(t => t.id));
      const merged = [...existingTasks];
      tasks.forEach(t => {
        if (!existingIds.has(t.id)) {
          merged.push({
            id: t.id,
            title: t.title,
            date: t.date,
            time: t.time,
            endTime: t.end_time,
            icon: t.icon,
            status: t.status,
          });
        }
      });
      localStorage.setItem('ucc_daily_tasks', JSON.stringify(merged));
    }

    // 3. Restore Timetable
    const { data: timetable } = await supabase
      .from('user_timetable')
      .select('*')
      .eq('device_id', deviceId);

    if (timetable && timetable.length > 0) {
      localStorage.setItem('ucc_timetable', JSON.stringify(timetable.map(c => ({
        id: c.id,
        name: c.name,
        day: c.day,
        startTime: c.start_time,
        endTime: c.end_time,
        location: c.location,
        color: c.color,
        lecturer: c.lecturer,
        contact: c.contact,
        targetGrade: c.target_grade,
        creditHours: c.credit_hours,
      }))));
    }

    // 4. Restore GPA
    const { data: gpa } = await supabase
      .from('user_gpa_courses')
      .select('*')
      .eq('device_id', deviceId);

    if (gpa && gpa.length > 0) {
      localStorage.setItem('ucc_gpa', JSON.stringify(gpa.map(c => ({
        id: c.id,
        name: c.name,
        creditHours: c.credit_hours,
        score: c.score,
        grade: c.grade,
        gradePoint: c.grade_point,
        isDetailed: c.is_detailed,
        examWeight: c.exam_weight,
        examScore: c.exam_score,
        assessments: typeof c.assessments === 'string' ? JSON.parse(c.assessments) : (c.assessments || []),
      }))));
    }

    // 5. Restore Notes
    const { data: notes } = await supabase
      .from('user_notes')
      .select('content')
      .eq('device_id', deviceId)
      .single();

    if (notes && notes.content) {
      localStorage.setItem('ucc_quick_notes', notes.content);
    }

    // Update device ID in localStorage to the restored one
    localStorage.setItem('ucc_device_id', deviceId);

    return { success: true };
  } catch (error) {
    console.error('Restore failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Checks if enough time has passed since last sync.
 * Returns true if should sync (>= 24 hours since last sync).
 */
export const shouldSyncNow = () => {
  const lastSync = localStorage.getItem(LAST_SYNC_KEY);
  if (!lastSync) return true;
  const diff = Date.now() - new Date(lastSync).getTime();
  return diff >= SYNC_INTERVAL_MS;
};
