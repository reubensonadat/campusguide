// src/hooks/useSupportTimer.jsx
import { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { SUPPORT_MODAL_INTERVAL, LS_KEYS } from '../utils/constants';

export const useSupportTimer = () => {
    const { actions } = useAppContext();
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const accumulatedTimeRef = useRef(0);

    useEffect(() => {
        // Check if we should show the modal based on last shown time
        const checkAndStartTimer = () => {
            const lastShown = localStorage.getItem(LS_KEYS.LAST_SUPPORT_MODAL_SHOWN);
            const now = Date.now();

            // If modal was never shown, or it's been more than SUPPORT_MODAL_INTERVAL since last shown
            if (!lastShown || (now - parseInt(lastShown)) >= SUPPORT_MODAL_INTERVAL) {
                startTimer();
            } else {
                // Calculate remaining time and start timer for that duration
                const timeSinceLastShown = now - parseInt(lastShown);
                const remainingTime = SUPPORT_MODAL_INTERVAL - timeSinceLastShown;
                startTimer(remainingTime);
            }
        };

        const startTimer = (duration = SUPPORT_MODAL_INTERVAL) => {
            startTimeRef.current = Date.now();

            timerRef.current = setTimeout(() => {
                // Show the support modal
                if (actions?.setShowSupportModal) {
                    actions.setShowSupportModal(true);
                    // Update last shown timestamp
                    localStorage.setItem(LS_KEYS.LAST_SUPPORT_MODAL_SHOWN, Date.now().toString());
                }
            }, duration);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Page is hidden, pause the timer
                if (timerRef.current && startTimeRef.current) {
                    clearTimeout(timerRef.current);
                    // Accumulate the time that has passed
                    accumulatedTimeRef.current += Date.now() - startTimeRef.current;
                }
            } else {
                // Page is visible again, resume the timer
                const remainingTime = SUPPORT_MODAL_INTERVAL - accumulatedTimeRef.current;
                if (remainingTime > 0) {
                    startTimer(remainingTime);
                }
            }
        };

        // Start the timer when component mounts
        checkAndStartTimer();

        // Listen for visibility changes
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [actions]);

    // Function to reset timer (called when modal is closed)
    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        accumulatedTimeRef.current = 0;
        startTimeRef.current = Date.now();

        timerRef.current = setTimeout(() => {
            if (actions?.setShowSupportModal) {
                actions.setShowSupportModal(true);
                localStorage.setItem(LS_KEYS.LAST_SUPPORT_MODAL_SHOWN, Date.now().toString());
            }
        }, SUPPORT_MODAL_INTERVAL);
    };

    return { resetTimer };
};
