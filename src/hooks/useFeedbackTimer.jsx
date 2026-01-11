// src/hooks/useFeedbackTimer.jsx
import { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { FEEDBACK_MODAL_DELAY, LS_KEYS, MIN_SUPPORT_SHOWS_BEFORE_SURVEY } from '../utils/constants';

export const useFeedbackTimer = () => {
    const { state, actions } = useAppContext();
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
                // Before showing feedback modal, check:
                // 1. Support modal has been shown at least MIN_SUPPORT_SHOWS_BEFORE_SURVEY times
                // 2. Support modal is not currently open
                const supportShownCount = parseInt(localStorage.getItem(LS_KEYS.SUPPORT_SHOWN_COUNT) || '0');

                if (supportShownCount >= MIN_SUPPORT_SHOWS_BEFORE_SURVEY) {
                    // Check if support modal is currently open
                    if (actions?.setShowFeedbackModal && !state?.showSupportModal) {
                        actions.setShowFeedbackModal(true);
                    } else {
                        // Support modal is open, defer feedback by 5 more minutes
                        timerRef.current = setTimeout(() => {
                            if (actions?.setShowFeedbackModal && !state?.showSupportModal) {
                                actions.setShowFeedbackModal(true);
                            }
                        }, 5 * 60 * 1000); // Defer by 5 minutes
                    }
                }
                // If support hasn't been shown 6 times yet, don't show survey at all
                // It will be checked again when support is shown
            }, FEEDBACK_MODAL_DELAY);
        };

        checkAndStartTimer();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [actions, state?.showSupportModal]);

    return {};
};
