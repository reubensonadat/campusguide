import { useCampus } from '../../context/CampusContext';
import UCC from './content/ucc/ContactDirectory.jsx';
import KNUST from './content/knust/ContactDirectory.jsx';
import UG from './content/ug/ContactDirectory.jsx';

const ContactDirectory = () => {
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

export default ContactDirectory;
