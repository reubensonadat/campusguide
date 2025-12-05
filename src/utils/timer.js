// Timer utility functions
export const setTimer = (callback, delay) => {
  return setTimeout(callback, delay);
};

export const clearTimer = (timerId) => {
  clearTimeout(timerId);
};

export const setInterval = (callback, delay) => {
  return window.setInterval(callback, delay);
};

export const clearInterval = (intervalId) => {
  window.clearInterval(intervalId);
};

// Countdown timer
export const createCountdown = (seconds, onTick, onComplete) => {
  let remaining = seconds;
  
  const intervalId = setInterval(() => {
    remaining--;
    
    if (onTick) onTick(remaining);
    
    if (remaining <= 0) {
      clearInterval(intervalId);
      if (onComplete) onComplete();
    }
  }, 1000);
  
  return intervalId;
};