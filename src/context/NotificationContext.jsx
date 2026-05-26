import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  // Store notifications as an array of objects
  const [notifications, setNotifications] = useLocalStorage('ucc_notifications', []);

  const addNotification = (notification) => {
    setNotifications(prev => {
      // Prevent duplicate notifications based on unique 'id'
      if (prev.some(n => n.id === notification.id)) {
        return prev;
      }
      return [
        {
          ...notification,
          timestamp: new Date().toISOString(),
          isRead: false
        },
        ...prev
      ].slice(0, 50); // Keep max 50 notifications
    });
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
