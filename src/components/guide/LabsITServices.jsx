import { useCampus } from '../../context/CampusContext';
import UCC from './content/ucc/LabsITServices.jsx';
import KNUST from './content/knust/LabsITServices.jsx';
import UG from './content/ug/LabsITServices.jsx';

const LabsITServices = () => {
  // Safe access to hook (must be called within React render flow, which Guide.jsx does)
  try {
      const { selectedCampus } = useCampus();
      const campusId = selectedCampus?.id || 'ucc';

      if (campusId === 'knust') return KNUST();
      if (campusId === 'ug') return UG();
      return UCC();
  } catch (e) {
      // Fallback if context missing or error
      console.error("Campus Context Error inWrapper:", e);
      return UCC();
  }
};

export default LabsITServices;
