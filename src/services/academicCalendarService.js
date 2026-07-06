import { supabase } from '../lib/supabase';
import { academicCalendar } from '../data/academicCalendar';


/**
 * Fetches academic calendar data from Supabase
 * Returns semester info and upcoming events
 */
export const fetchAcademicCalendar = async () => {
  try {
    // Fetch all academic calendar events
    const { data, error } = await supabase
      .from('academic_calendar')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching academic calendar:', error);
      return { semesters: [], events: [], error: error.message };
    }

    // Group events by semester
    const semesterMap = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Process events to determine semester boundaries
    data.forEach(event => {
      const eventDate = new Date(event.event_date);
      const semesterKey = `${event.academic_year} - ${event.semester}`;
      
      if (!semesterMap[semesterKey]) {
        semesterMap[semesterKey] = {
          academicYear: event.academic_year,
          semester: event.semester,
          startDate: event.event_date,
          endDate: event.event_date,
          events: []
        };
      }
      
      // Update semester boundaries if needed
      if (eventDate < new Date(semesterMap[semesterKey].startDate)) {
        semesterMap[semesterKey].startDate = event.event_date;
      }
      
      if (eventDate > new Date(semesterMap[semesterKey].endDate)) {
        semesterMap[semesterKey].endDate = event.event_date;
      }
      
      semesterMap[semesterKey].events.push({
        id: event.id,
        date: event.event_date,
        title: event.title,
        description: event.description
      });
    });

    // Convert to array and calculate current semester info
    const semesters = Object.values(semesterMap);
    let currentSemester = null;
    let nextSemester = null;
    let status = 'break'; // Default to break status
    
    // Determine current semester and status
    for (const semester of semesters) {
      const startDate = new Date(semester.startDate);
      const endDate = new Date(semester.endDate);
      
      if (today >= startDate && today <= endDate) {
        currentSemester = semester;
        status = 'in_semester';
        break;
      }
      
      // Find next upcoming semester
      if (startDate > today && (!nextSemester || startDate < new Date(nextSemester.startDate))) {
        nextSemester = semester;
      }
    }
    
    // If no current semester, check if we're in a pre-semester period
    if (!currentSemester && nextSemester) {
      const nextStartDate = new Date(nextSemester.startDate);
      const daysUntilStart = Math.ceil((nextStartDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilStart <= 30) { // Within 30 days of next semester
        status = 'pre_semester';
      }
    }
    
    // Calculate days until semester ends or starts
    let daysUntil = 0;
    let daysText = '';
    
    if (currentSemester) {
      const endDate = new Date(currentSemester.endDate);
      daysUntil = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      daysText = daysUntil > 0 
        ? `${daysUntil} days until semester ends` 
        : 'Semester ending soon';
    } else if (nextSemester) {
      const startDate = new Date(nextSemester.startDate);
      daysUntil = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
      daysText = `${daysUntil} days until ${nextSemester.semester} starts`;
    }
    
    // Find next milestone (next upcoming event)
    let nextMilestone = null;
    const upcomingEvents = data
      .filter(event => new Date(event.event_date) >= today)
      .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
    
    if (upcomingEvents.length > 0) {
      const nextEvent = upcomingEvents[0];
      const eventDate = new Date(nextEvent.event_date);
      const daysUntilEvent = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      
      nextMilestone = {
        title: nextEvent.title,
        date: nextEvent.event_date,
        daysUntil: daysUntilEvent,
        daysText: daysUntilEvent === 0 
          ? 'Today' 
          : daysUntilEvent === 1 
            ? 'Tomorrow' 
            : `In ${daysUntilEvent} days`
      };
    }
    // Determine if today is in an exam period dynamically
    let isExamPeriod = false;
    const sortedAllEvents = (data && data.length > 0) 
      ? [...data].sort((a, b) => new Date(a.event_date) - new Date(b.event_date)) 
      : [...academicCalendar].map(e => ({ event_date: e.date, title: e.title })).sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
      
    for (let i = 0; i < sortedAllEvents.length; i++) {
      const event = sortedAllEvents[i];
      const titleLower = event.title.toLowerCase();
      if (titleLower.includes('examination') || titleLower.includes('exams')) {
        const startDate = new Date(event.event_date);
        startDate.setHours(0, 0, 0, 0);
        
        let endDate = new Date(startDate.getTime() + 21 * 24 * 60 * 60 * 1000); // 21 days fallback
        const subsequent = sortedAllEvents.slice(i + 1);
        if (subsequent.length > 0) {
          endDate = new Date(subsequent[0].event_date);
        }
        endDate.setHours(23, 59, 59, 999);
        
        if (today >= startDate && today <= endDate) {
          isExamPeriod = true;
          break;
        }
      }
    }
    
    return {
      semesters,
      events: upcomingEvents.slice(0, 5), // Limit to next 5 events
      currentSemester,
      nextSemester,
      status,
      daysUntil,
      daysText,
      nextMilestone,
      isExamPeriod,
      error: null
    };
  } catch (error) {
    console.error('Error in fetchAcademicCalendar:', error);
    return { semesters: [], events: [], error: error.message };
  }
};

/**
 * Get current semester info for display
 * Returns a formatted object with semester status and next milestone
 */
export const getCurrentSemesterInfo = async () => {
  const calendarData = await fetchAcademicCalendar();
  
  if (calendarData.error) {
    return {
      status: 'error',
      title: 'Academic Calendar',
      subtitle: 'Unable to load semester information',
      details: calendarData.error
    };
  }
  
  const { status, currentSemester, nextSemester, daysText, nextMilestone } = calendarData;
  
  let title = 'Academic Calendar';
  let subtitle = '';
  let details = '';
  
  if (status === 'in_semester' && currentSemester) {
    title = `${currentSemester.semester}`;
    subtitle = daysText;
    details = nextMilestone ? `${nextMilestone.title} ${nextMilestone.daysText}` : '';
  } else if (status === 'pre_semester' && nextSemester) {
    title = 'Upcoming Semester';
    subtitle = `${nextSemester.semester} begins soon`;
    details = daysText;
  } else if (status === 'break') {
    title = 'Semester Break';
    subtitle = nextSemester ? `${nextSemester.semester} starts later` : 'No upcoming semester';
    details = daysText;
  }
  
  return {
    status,
    title,
    subtitle,
    details,
    nextMilestone,
    ...calendarData
  };
};