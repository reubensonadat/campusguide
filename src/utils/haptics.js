export const triggerHaptic = (duration = 50) => {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) {
      return;
    }
    try {
      navigator.vibrate(duration);
    } catch (error) {
      // Ignore errors (some browsers restrict without user interaction)
    }
  }
};
