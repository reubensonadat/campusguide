// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_SETTINGS, LS_KEYS } from '../utils/constants';

// Initial state
const initialState = {
  user: null,
  settings: DEFAULT_SETTINGS,
  guideCompletion: {},
  isSupporter: false,
  isLoading: false,
  showSupportModal: false, // Add this for support modal
  toast: {
    show: false,
    message: '',
    type: 'info'
  },
  showFeedbackModal: false // Add this for feedback modal
};

// Action types
const actionTypes = {
  SET_USER: 'SET_USER',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  MARK_GUIDE_COMPLETE: 'MARK_GUIDE_COMPLETE',
  SET_SUPPORTER_STATUS: 'SET_SUPPORTER_STATUS',
  SET_LOADING: 'SET_LOADING',
  SHOW_TOAST: 'SHOW_TOAST',
  HIDE_TOAST: 'HIDE_TOAST',
  SET_SHOW_SUPPORT_MODAL: 'SET_SHOW_SUPPORT_MODAL',
  SET_SHOW_FEEDBACK_MODAL: 'SET_SHOW_FEEDBACK_MODAL' // Add this
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };

    case actionTypes.UPDATE_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case actionTypes.MARK_GUIDE_COMPLETE:
      return {
        ...state,
        guideCompletion: {
          ...state.guideCompletion,
          [action.payload]: true
        }
      };

    case actionTypes.SET_SUPPORTER_STATUS:
      return { ...state, isSupporter: action.payload };

    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: {
          show: true,
          message: action.payload.message,
          type: action.payload.type || 'info'
        }
      };

    case actionTypes.HIDE_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          show: false
        }
      };

    case actionTypes.SET_SHOW_SUPPORT_MODAL:
      return { ...state, showSupportModal: action.payload };

    case actionTypes.SET_SHOW_FEEDBACK_MODAL:
      return { ...state, showFeedbackModal: action.payload };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  // Load data from localStorage
  const [settings, setSettings] = useLocalStorage(LS_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const [guideCompletion, setGuideCompletion] = useLocalStorage(LS_KEYS.GUIDE_COMPLETION, {});
  const [isSupporter, setIsSupporter] = useLocalStorage(LS_KEYS.SUPPORTER_STATUS, false);

  // Initialize state with localStorage data
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    settings,
    guideCompletion,
    isSupporter
  });

  // Custom action creators
  const actions = {
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),

    updateSettings: (newSettings) => {
      dispatch({ type: actionTypes.UPDATE_SETTINGS, payload: newSettings });
      setSettings({ ...settings, ...newSettings });
    },

    markGuideComplete: (guideId) => {
      dispatch({ type: actionTypes.MARK_GUIDE_COMPLETE, payload: guideId });
      setGuideCompletion({ ...guideCompletion, [guideId]: true });
    },

    setSupporterStatus: (status) => {
      dispatch({ type: actionTypes.SET_SUPPORTER_STATUS, payload: status });
      setIsSupporter(status);
    },

    setLoading: (isLoading) => dispatch({ type: actionTypes.SET_LOADING, payload: isLoading }),

    showToast: (message, type = 'info') =>
      dispatch({ type: actionTypes.SHOW_TOAST, payload: { message, type } }),

    hideToast: () => dispatch({ type: actionTypes.HIDE_TOAST }),

    // Add support modal actions
    setShowSupportModal: (show) => dispatch({ type: actionTypes.SET_SHOW_SUPPORT_MODAL, payload: show }),

    // Add feedback modal actions
    setShowFeedbackModal: (show) => dispatch({ type: actionTypes.SET_SHOW_FEEDBACK_MODAL, payload: show })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Export the context directly
export { AppContext };

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};