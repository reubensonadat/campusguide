import { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useLocalStorage } from './useLocalStorage';
import { showNotification, isNotificationSupported } from '../services/notificationService';

const getCurrentDayName = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const useAppNotifications = () => {
  const { addNotification } = useNotifications();

  const [courses] = useLocalStorage('ucc_timetable', []);
  const [transactions] = useLocalStorage('ucc_budget', []);
  const [recurringConfig] = useLocalStorage('ucc_budget_recurring', { active: false, amount: '', day: 1, lastTriggered: null });
  const [settings] = useLocalStorage('ucc_settings', { notifications: true });
  const [profile] = useLocalStorage('ucc_profile', { level: '100', semester: '1' });

  const notifiedClassesRef = useRef(new Set());
  const notifiedBudgetRef = useRef(null);
  const notifiedPaydayRef = useRef(null);

  const browserOk = isNotificationSupported();

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
        const todaysCourses = courses.filter(course => {
          const cLevel = course.academic_year || '100';
          const cSem = course.semester || '1';
          const pLevel = profile.level || '100';
          const pSem = profile.semester || '1';
          return course.day === currentDay &&
              String(cLevel) === String(pLevel) &&
              String(cSem) === String(pSem);
        });

        todaysCourses.forEach(course => {
          const classStartMinutes = timeToMinutes(course.startTime);
          const timeDiff = classStartMinutes - currentMinutes;
          const classId = `class-${todayStr}-${course.startTime}-${course.name}`;

          if (timeDiff >= 25 && timeDiff <= 35) {
            if (!notifiedClassesRef.current.has(classId)) {
              // In-app notification
              addNotification({
                id: classId,
                type: 'class',
                title: `Upcoming Class: ${course.name}`,
                message: `Starts in about 30 minutes at ${course.location || 'Unknown Location'}`,
              });

              // Browser OS notification (if supported)
              if (browserOk) {
                showNotification(`Upcoming Class: ${course.name}`, {
                  body: `Starts in about 30 minutes at ${course.location || 'Unknown Location'}`,
                  tag: classId,
                  requireInteraction: true,
                });
              }

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

            if (browserOk) {
              showNotification('Low Budget Warning', {
                body: `Your balance has dropped to GH₵${totalBal.toFixed(2)}. Spend wisely!`,
                tag: `budget-low-${todayStr}`,
              });
            }

            notifiedBudgetRef.current = todayStr;
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

            if (browserOk) {
              showNotification("It's Payday! 🎉", {
                body: `Your allowance of GH₵${recurringConfig.amount} is due today!`,
                tag: `payday-${currentMonthStr}`,
              });
            }

            notifiedPaydayRef.current = currentMonthStr;
          }
        }
      }
    };

    checkNotifications();
    const intervalId = setInterval(checkNotifications, 60000);
    return () => clearInterval(intervalId);
  }, [courses, transactions, recurringConfig, settings.notifications, addNotification, browserOk]);

  return null;
};
