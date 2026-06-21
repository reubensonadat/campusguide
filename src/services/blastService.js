// ─────────────────────────────────────────────────────────────────────────────
// blastService — frontend helper that calls the "send-blast" Supabase Edge
// Function. The OneSignal REST API key stays server-side and is NEVER imported
// here, so it cannot leak into the client bundle.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '../lib/supabase';

/**
 * Available blast segments. These keys match the OneSignal tags synced from
 * Settings.jsx (handleToggleSetting → window.OneSignal.User.addTag(key,...)).
 * "all" targets every subscribed device.
 */
export const BLAST_SEGMENTS = [
    { key: 'all', label: 'Everyone (all subscribers)' },
    // Year groups — targets the "level" tag synced from the user's profile.
    { key: 'level:100', label: 'Level 100 students' },
    { key: 'level:200', label: 'Level 200 students' },
    { key: 'level:300', label: 'Level 300 students' },
    { key: 'level:400', label: 'Level 400 students' },
    { key: 'level:500', label: 'Level 500 students' },
    { key: 'level:600', label: 'Level 600 students' },
    // Behaviour toggles — targets tags synced from Settings.
    { key: 'push_classes', label: 'Class Reminders enabled' },
    { key: 'data_saver', label: 'Data Saver enabled' },
];

/**
 * Send a segmented OneSignal push blast via the edge function.
 *
 * @param {Object} params
 * @param {string} params.adminPassword - same value as VITE_ADMIN_PASSWORD
 * @param {string} params.headline      - push title
 * @param {string} params.message       - push body
 * @param {string} [params.segment]     - tag key from BLAST_SEGMENTS ("all" = everyone)
 * @param {string} [params.url]         - in-app route to open on tap
 * @returns {Promise<{success:boolean, recipients?:number, id?:string, error?:string}>}
 */
export async function sendBlast({ adminPassword, headline, message, segment = 'all', url }) {
    try {
        // NOTE: deployed under "send-balst" (existing function name in Supabase).
        // If you ever redeploy as "send-blast" (correct spelling), change this back.
        const { data, error } = await supabase.functions.invoke('send-balst', {
            body: {
                admin_password: adminPassword,
                headline,
                message,
                segment,
                url,
            },
        });

        if (error) {
            return { success: false, error: error.message || 'Blast service error.' };
        }
        if (data?.error) {
            return { success: false, error: data.error };
        }
        return { success: true, id: data?.id, recipients: data?.recipients };
    } catch (e) {
        return { success: false, error: 'Network error — could not reach the blast service.' };
    }
}
