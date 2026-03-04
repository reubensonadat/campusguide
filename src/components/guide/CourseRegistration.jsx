import { useCampus } from '../../context/CampusContext';
import UCC from './content/ucc/CourseRegistration.jsx';
import KNUST from './content/knust/CourseRegistration.jsx';
import UG from './content/ug/CourseRegistration.jsx';

const CourseRegistration = (selectedCampus) => {
  // Pass selectedCampus as argument to avoid Hook violation in Guide.jsx
  try {
    const campusId = selectedCampus?.id || 'ucc';

    if (campusId === 'knust') return KNUST();
    if (campusId === 'ug') return UG();
    return UCC();
  } catch (e) {
    // Fallback if error
    console.error("Error in CourseRegistration data factory:", e);
    return UCC();
  }
};

export default CourseRegistration;
