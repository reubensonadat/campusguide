// src/hooks/useFeedbackModal.jsx
import { useAppContext } from '../context/AppContext';

export const useFeedbackModal = () => {
    const { state, actions } = useAppContext();

    const showModal = state.showFeedbackModal;

    const openModal = () => {
        actions.setShowFeedbackModal(true);
    };

    const closeModal = () => {
        actions.setShowFeedbackModal(false);
    };

    return {
        showModal,
        openModal,
        closeModal
    };
};
