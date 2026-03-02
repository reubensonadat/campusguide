// Format date to readable string
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format time to readable string
export const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Calculate time difference in minutes
export const timeDifference = (startTime, endTime) => {
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  return endMinutes - startMinutes;
};

// Check if two time ranges overlap
export const isTimeOverlap = (start1, end1, start2, end2) => {
  const [startHour1, startMin1] = start1.split(':').map(Number);
  const [endHour1, endMin1] = end1.split(':').map(Number);
  const [startHour2, startMin2] = start2.split(':').map(Number);
  const [endHour2, endMin2] = end2.split(':').map(Number);
  
  const startMinutes1 = startHour1 * 60 + startMin1;
  const endMinutes1 = endHour1 * 60 + endMin1;
  const startMinutes2 = startHour2 * 60 + startMin2;
  const endMinutes2 = endHour2 * 60 + endMin2;
  
  return (
    (startMinutes1 >= startMinutes2 && startMinutes1 < endMinutes2) ||
    (endMinutes1 > startMinutes2 && endMinutes1 <= endMinutes2) ||
    (startMinutes1 <= startMinutes2 && endMinutes1 >= endMinutes2)
  );
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// Get grade from score
export const getGradeFromScore = (score) => {
  if (score >= 80) return 'A';
  if (score >= 75) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 65) return 'C+';
  if (score >= 60) return 'C';
  if (score >= 55) return 'D+';
  if (score >= 50) return 'D';
  if (score >= 45) return 'E+';
  return 'E';
};

// Calculate GPA
export const calculateGPA = (courses) => {
  if (!courses || courses.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  courses.forEach(course => {
    const gradePoint = course.gradePoint || 0;
    const creditHours = course.creditHours || 0;
    
    totalPoints += gradePoint * creditHours;
    totalCredits += creditHours;
  });
  
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
};

// Export data to CSV
export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if device is mobile
export const isMobile = () => {
  return window.innerWidth <= 768;
};

// Copy text to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
};

// Add this function at the end of the file
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};