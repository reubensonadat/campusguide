import { useState, useEffect } from 'react';

/**
 * useDataSaver
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads the "Data Saver" preference from the shared `ucc_settings` localStorage
 * object (the same one Settings.jsx manages via handleToggleSetting).
 *
 * Returns `true` when the user has opted into Data Saver mode, in which case
 * image-heavy components should skip loading full-resolution media to conserve
 * mobile data.
 *
 * Read-only: this hook never writes. It reads on mount and re-reads on
 * cross-tab `storage` events. Same-tab live updates are unnecessary because
 * Settings and the feed live on different routes (the value is fresh on each
 * navigation/mount).
 *
 * 3-State safe: never throws — defaults to `false` (images load normally) on
 * any parse/storage error, so a broken preference can never blank the UI.
 */
export const useDataSaver = () => {
    const [enabled, setEnabled] = useState(() => {
        try {
            const raw = localStorage.getItem('ucc_settings');
            const s = raw ? JSON.parse(raw) : {};
            return s?.data_saver === true;
        } catch {
            return false;
        }
    });

    useEffect(() => {
        const read = () => {
            try {
                const raw = localStorage.getItem('ucc_settings');
                const s = raw ? JSON.parse(raw) : {};
                setEnabled(s?.data_saver === true);
            } catch {
                /* keep previous value — never wipe */
            }
        };
        // Cross-tab sync
        window.addEventListener('storage', read);
        return () => window.removeEventListener('storage', read);
    }, []);

    return enabled;
};

export default useDataSaver;
