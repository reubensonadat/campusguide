export const triggerHaptic = (duration = 50) => {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(duration);
    } catch (error) {
      // Ignore errors (some browsers restrict without user interaction)
    }
  }
};
