import { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useLocalStorage } from './useLocalStorage';

// Helper to get current day name matching our constants
const getCurrentDayName = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

// Helper to convert time string (e.g., "14:30") to minutes from midnight
const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const useAppNotifications = () => {
  const { addNotification } = useNotifications();
  
  // Use localStorage directly for these background checks
  const [courses] = useLocalStorage('ucc_timetable', []);
  const [transactions] = useLocalStorage('ucc_budget', []);
  const [recurringConfig] = useLocalStorage('ucc_budget_recurring', { active: false, amount: '', day: 1, lastTriggered: null });
  const [settings] = useLocalStorage('ucc_settings', { notifications: true });

  const notifiedClassesRef = useRef(new Set());
  const notifiedBudgetRef = useRef(null); // Will store YYYY-MM-DD
  const notifiedPaydayRef = useRef(null); // Will store YYYY-MM

  useEffect(() => {
    if (!settings.notifications) return;

    const checkNotifications = () => {
      const now = new Date();
      const currentDay = getCurrentDayName();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const todayStr = now.toISOString().split('T')[0];
      const currentMonthStr = `${now.getFullYear()}-${now.getMonth() + 1}`;

      // 1. CLASS NOTIFICATIONS (30 MINS AHEAD)
      if (Array.isArray(courses)) {
        const todaysCourses = courses.filter(course => course.day === currentDay);
        
        todaysCourses.forEach(course => {
          const classStartMinutes = timeToMinutes(course.startTime);
          const timeDiff = classStartMinutes - currentMinutes;
          
          // Unique ID per class instance
          const classId = `class-${todayStr}-${course.startTime}-${course.name}`;

          // If class is 25-35 minutes away
          if (timeDiff >= 25 && timeDiff <= 35) {
            if (!notifiedClassesRef.current.has(classId)) {
              addNotification({
                id: classId,
                type: 'class',
                title: `Upcoming Class: ${course.name}`,
                message: `Starts in about 30 minutes at ${course.location || 'Unknown Location'}`,
              });
              notifiedClassesRef.current.add(classId);
            }
          }
        });
      }

      // 2. BUDGET WARNING (< 50 GHC)
      if (Array.isArray(transactions)) {
        const totalBal = transactions.reduce((sum, t) => sum + (t.type === 'income' ? parseFloat(t.amount) : -parseFloat(t.amount)), 0);
        
        if (totalBal < 50 && totalBal >= 0) {
          if (notifiedBudgetRef.current !== todayStr) {
            addNotification({
              id: `budget-low-${todayStr}`,
              type: 'budget',
              title: 'Low Budget Warning',
              message: `Your balance has dropped to GH₵${totalBal.toFixed(2)}. Spend wisely!`,
            });
            notifiedBudgetRef.current = todayStr; // Only notify once per day
          }
        }
      }

      // 3. PAYDAY / RECURRING EVENTS
      if (recurringConfig.active && recurringConfig.amount) {
        if (now.getDate() === parseInt(recurringConfig.day)) {
          if (notifiedPaydayRef.current !== currentMonthStr) {
            addNotification({
              id: `payday-${currentMonthStr}`,
              type: 'payday',
              title: "It's Payday! 🎉",
              message: `Your allowance of GH₵${recurringConfig.amount} is due today!`,
            });
            notifiedPaydayRef.current = currentMonthStr; // Only notify once per month
          }
        }
      }
    };

    // Run check immediately
    checkNotifications();

    // Run check every minute
    const intervalId = setInterval(checkNotifications, 60000);

    return () => clearInterval(intervalId);
  }, [courses, transactions, recurringConfig, settings.notifications, addNotification]);

  return null;
};
