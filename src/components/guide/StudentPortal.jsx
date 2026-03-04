import { useCampus } from '../../context/CampusContext';
import UCC from './content/ucc/StudentPortal.jsx';
import KNUST from './content/knust/StudentPortal.jsx';
import UG from './content/ug/StudentPortal.jsx';

const StudentPortal = (selectedCampus) => {
  // Pass selectedCampus as argument to avoid Hook violation in Guide.jsx
  try {
    const campusId = selectedCampus?.id || 'ucc';

    if (campusId === 'knust') return KNUST();
    if (campusId === 'ug') return UG();
    return UCC();
  } catch (e) {
    // Fallback if error
    console.error("Error in StudentPortal data factory:", e);
    return UCC();
  }
};

export default StudentPortal;
