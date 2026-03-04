import { useCampus } from '../../context/CampusContext';
import UCC from './content/ucc/ExamsAndResits.jsx';
import KNUST from './content/knust/ExamsAndResits.jsx';
import UG from './content/ug/ExamsAndResits.jsx';

const ExamsAndResits = (selectedCampus) => {
  // Pass selectedCampus as argument to avoid Hook violation in Guide.jsx
  try {
    const campusId = selectedCampus?.id || 'ucc';

    if (campusId === 'knust') return KNUST();
    if (campusId === 'ug') return UG();
    return UCC();
  } catch (e) {
    // Fallback if error
    console.error("Error in ExamsAndResits data factory:", e);
    return UCC();
  }
};

export default ExamsAndResits;
