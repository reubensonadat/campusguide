// Notification service for browser notifications

// Request permission for notifications
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

// Check if notifications are supported and permission is granted
export const isNotificationSupported = () => {
  return 'Notification' in window && Notification.permission === 'granted';
};

// Show a notification
export const showNotification = (title, options = {}) => {
  if (isNotificationSupported()) {
    return new Notification(title, {
      icon: '/logo.png',
      badge: '/logo.png',
      ...options
    });
  }
  return null;
};

// Schedule a notification (if the app is running)
export const scheduleNotification = (title, options, delay) => {
  if (!isNotificationSupported()) return null;

  return setTimeout(() => {
    showNotification(title, options);
  }, delay);
};

// Show a reminder notification
export const showReminderNotification = (reminder) => {
  return showNotification(`Reminder: ${reminder.title}`, {
    body: `Due: ${new Date(reminder.dueDate).toLocaleDateString()}`,
    tag: reminder.id,
    requireInteraction: true
  });
};