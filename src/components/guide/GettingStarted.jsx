import { useCampus } from '../../context/CampusContext';
import UCC from './content/ucc/GettingStarted.jsx';
import KNUST from './content/knust/GettingStarted.jsx';
import UG from './content/ug/GettingStarted.jsx';

const GettingStarted = (selectedCampus) => {
  // Pass selectedCampus as argument to avoid Hook violation in Guide.jsx
  try {
    const campusId = selectedCampus?.id || 'ucc';

    if (campusId === 'knust') return KNUST();
    if (campusId === 'ug') return UG();
    return UCC();
  } catch (e) {
    // Fallback if error
    console.error("Error in GettingStarted data factory:", e);
    return UCC();
  }
};

export default GettingStarted;
