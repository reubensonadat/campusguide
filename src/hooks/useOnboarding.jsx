import { useState, useEffect } from 'react';
import { LS_KEYS } from '../utils/constants';

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Frictionless approach: we no longer force the onboarding screen to appear.
    // We just silently create the profile in App.jsx.
    const firstVisit = localStorage.getItem(LS_KEYS.FIRST_VISIT);
    if (!firstVisit) {
      localStorage.setItem(LS_KEYS.FIRST_VISIT, 'true');
    }
  }, []);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const closeOnboarding = () => {
    setShowOnboarding(false);
  };

  return {
    showOnboarding,
    currentStep,
    nextStep,
    prevStep,
    closeOnboarding
  };
};