// src/hooks/useSupportTimer.jsx
import { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { SUPPORT_MODAL_INTERVAL, LS_KEYS } from '../utils/constants';

export const useSupportTimer = () => {
    const { actions } = useAppContext();
    const processedRef = useRef(false);

    useEffect(() => {
        // Only run once per mount/session
        if (processedRef.current) return;
        processedRef.current = true;

        const checkSessionAndShowModal = () => {
            // Check if user is already a supporter
            const supporterData = localStorage.getItem(LS_KEYS.SUPPORTER_STATUS);
            const isSupporter = supporterData ? JSON.parse(supporterData) : false;

            if (isSupporter) return;

            // Increment session count
            const currentCount = parseInt(localStorage.getItem('app_session_count') || '0');
            const newCount = currentCount + 1;
            localStorage.setItem('app_session_count', newCount.toString());

            // Logic: 4, 10, 16, 20...
            // Base starts at 4.
            // Repeat cycle is 16 (6 + 6 + 4).
            // Check if current session triggers modal
            if (newCount >= 4) {
                const offset = (newCount - 4) % 16;
                // Triggers at offset 0 (4, 20...), 6 (10, 26...), 12 (16, 32...)
                if (offset === 0 || offset === 6 || offset === 12) {
                    if (actions?.setShowSupportModal) {
                        actions.setShowSupportModal(true);
                        // Also update the legacy stats if needed, or just for tracking
                        const currentShownCount = parseInt(localStorage.getItem(LS_KEYS.SUPPORT_SHOWN_COUNT) || '0');
                        localStorage.setItem(LS_KEYS.SUPPORT_SHOWN_COUNT, (currentShownCount + 1).toString());
                        localStorage.setItem(LS_KEYS.LAST_SUPPORT_MODAL_SHOWN, Date.now().toString());
                    }
                }
            }
        };

        checkSessionAndShowModal();
    }, [actions]);

    // No reset functionality needed for session based, but keeping interface for compatibility if used elsewhere
    const resetTimer = () => {
        // No-op for session based
    };

    return { resetTimer };
};
