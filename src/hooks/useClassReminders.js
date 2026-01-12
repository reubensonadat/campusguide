import { useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { scheduleNotification, isNotificationSupported, showNotification } from '../services/notificationService';
import { DAYS_OF_WEEK } from '../utils/constants';

// Helper to get current day name matching our constants
const getCurrentDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
};

// Helper to convert time string (e.g., "14:30") to minutes from midnight
const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

export const useClassReminders = () => {
    // Read directly from localStorage to avoid context complexity if not needed, 
    // or use the same key as TimetableBuilder: 'ucc_timetable'
    const [courses] = useLocalStorage('ucc_timetable', []);
    const notifiedClassesRef = useRef(new Set()); // To track classes we've already notified about this session

    useEffect(() => {
        if (!isNotificationSupported()) return;

        const checkClasses = () => {
            const now = new Date();
            const currentDay = getCurrentDayName();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            // Filter courses for today
            const todaysCourses = courses.filter(course => course.day === currentDay);

            todaysCourses.forEach(course => {
                const classStartMinutes = timeToMinutes(course.startTime);
                const timeDiff = classStartMinutes - currentMinutes;

                // Create a unique ID for this specific class instance (e.g., "Monday-14:30-Math")
                const classId = `${course.day}-${course.startTime}-${course.name}`;

                // Logic: Notify if the class is between 29 and 31 minutes away 
                // AND we haven't notified for this class yet today.
                if (timeDiff >= 29 && timeDiff <= 31) {
                    if (!notifiedClassesRef.current.has(classId)) {

                        showNotification(`Upcoming Class: ${course.name}`, {
                            body: `Starts in 30 minutes at ${course.location || 'Unknown Location'}`,
                            tag: classId, // Prevents duplicate notifications at the browser level too
                            requireInteraction: true
                        });

                        // Mark as notified
                        notifiedClassesRef.current.add(classId);
                    }
                }
            });
        };

        // Run check immediately
        checkClasses();

        // Run check every minute
        const intervalId = setInterval(checkClasses, 60000);

        return () => clearInterval(intervalId);
    }, [courses]);

    return null; // This hook doesn't render anything
};
