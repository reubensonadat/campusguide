// src/hooks/useFeedbackTimer.jsx
import { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { FEEDBACK_MODAL_DELAY, LS_KEYS } from '../utils/constants';

export const useFeedbackTimer = () => {
    const { actions } = useAppContext();
    const timerRef = useRef(null);

    useEffect(() => {
        const checkAndStartTimer = () => {
            // Check if already submitted or dismissed permanently
            const hasSubmitted = localStorage.getItem(LS_KEYS.FEEDBACK_SUBMITTED);

            if (hasSubmitted) {
                return; // Do nothing if already submitted
            }

            // Start timer for the delay
            timerRef.current = setTimeout(() => {
                if (actions?.setShowFeedbackModal) {
                    actions.setShowFeedbackModal(true);
                }
            }, FEEDBACK_MODAL_DELAY);
        };

        checkAndStartTimer();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [actions]);

    return {};
};
