export const academicCalendar = [
  // First Semester
  { date: '2026-08-24', title: 'Online Registration by Continuing Students' },
  { date: '2026-09-05', title: 'All Fresh Students Report' },
  { date: '2026-09-07', title: 'Online Orientation and Registration by Fresh Students' },
  { date: '2026-09-07', title: 'Re-sit/Supplementary Examinations (Level 100 - 600)' },
  { date: '2026-09-12', title: 'Continuing Students Report' },
  { date: '2026-09-14', title: 'Lectures Begin - All Students' },
  { date: '2026-09-21', title: 'Release of Results of Re-sit/Supplementary Examinations' },
  { date: '2026-10-05', title: 'Second Re-sit/Supplementary Examinations' },
  { date: '2026-10-05', title: 'Confirmation of Registered Courses by DREOs' },
  { date: '2026-10-10', title: 'Matriculation' },
  { date: '2026-10-12', title: 'First Continuous Assessment (CA)' },
  { date: '2026-10-19', title: 'Release of Results of Second Re-sit/Supplementary Examinations' },
  { date: '2026-11-13', title: 'Adding & Dropping of Courses End' },
  { date: '2026-11-09', title: 'Second Continuous Assessment (CA)' },
  { date: '2026-11-23', title: 'Display of CA Results' },
  { date: '2026-11-25', title: 'Fifty-Ninth Congregation' },
  { date: '2026-11-27', title: 'Lectures End' },
  { date: '2026-11-28', title: 'Revision Period' },
  { date: '2026-12-03', title: 'End of Semester Examinations' },
  { date: '2026-12-23', title: 'Students Go Down' },
  { date: '2026-12-23', title: 'Inter Semester Break' },
  
  // Second Semester
  { date: '2027-01-04', title: 'Online Registration of Courses (All Students)' },
  { date: '2027-01-16', title: 'Students Arrive' },
  { date: '2027-01-18', title: 'Lectures Begin' },
  { date: '2027-02-06', title: 'Adding & Dropping of Courses End' },
  { date: '2027-02-08', title: 'Confirmation of Registered Courses' },
  { date: '2027-02-15', title: 'First Continuous Assessment' },
  { date: '2027-03-15', title: 'Second Continuous Assessment' },
  { date: '2027-04-09', title: 'Lectures End' },
  { date: '2027-04-12', title: 'Display of CA Results & Revision Period' },
  { date: '2027-04-19', title: 'End of Semester Examinations' },
  { date: '2027-05-08', title: 'Students Go Down & Long Vacation Break' },
  { date: '2027-05-10', title: 'Downloading of examination and quiz results from LMS' },
  { date: '2027-06-14', title: 'Release of Examinations Results' }
];

/**
 * Returns upcoming events sorted by closest date
 * Limits to top N events
 */
export const getUpcomingAcademicEvents = (limit = 2) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = academicCalendar.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  });

  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

  return upcoming.slice(0, limit).map(event => {
    const eventDate = new Date(event.date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let timeLabel = '';
    if (diffDays === 0) timeLabel = 'Today';
    else if (diffDays === 1) timeLabel = 'Tomorrow';
    else if (diffDays <= 7) timeLabel = `In ${diffDays} days`;
    else if (diffDays <= 14) timeLabel = 'Next week';
    else if (diffDays <= 30) timeLabel = 'Later this month';
    else timeLabel = `In ${Math.ceil(diffDays / 30)} months`;

    const formattedDate = eventDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); // e.g., 24 Aug

    return {
      ...event,
      diffDays,
      timeLabel,
      formattedDate
    };
  });
};
