import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { GuideCard } from '../components/guide/GuideCard';
import { GuideContent } from '../components/guide/GuideContent';
import { 
  BookOpen, 
  Map, 
  User, 
  FileText, 
  Plus, 
  CreditCard, 
  Home, 
  Car, 
  Utensils,
  Printer,
  Smartphone,
  Shield,
  Library,
  Laptop,
  GraduationCap,
  HelpCircle,
  Wifi,
  Clock,
  Users,
  Heart,
  Phone
} from 'lucide-react';

// Import all guide components
import GettingStarted from '../components/guide/GettingStarted';
import CampusMap from '../components/guide/CampusMap';
import StudentPortal from '../components/guide/StudentPortal';
import CourseRegistration from '../components/guide/CourseRegistration';
import AddDropCourses from '../components/guide/AddDropCourses';
import IDCard from '../components/guide/IDCard';
import MedicalsHealthCenter from '../components/guide/MedicalsHealthCenter';
import PresidentialReimbursement from '../components/guide/PresidentialReimbursement';
import StudentLoanTrustFund from '../components/guide/StudentLoanTrustFund';
import PaymentsReceipts from '../components/guide/PaymentsReceipts';
import Accommodation from '../components/guide/Accommodation';
import Transportation from '../components/guide/Transportation';
import FoodDining from '../components/guide/FoodDining';
import PrintingStationery from '../components/guide/PrintingStationery';
import BankingMoMo from '../components/guide/BankingMoMo';
import SecuritySafety from '../components/guide/SecuritySafety';
import LibraryServices from '../components/guide/LibraryServices';
import LabsITServices from '../components/guide/LabsITServices';
import WifiEmail from '../components/guide/WifiEmail';
import ExamsAssessmentRules from '../components/guide/ExamsAssessmentRules';
import AttendanceRegulations from '../components/guide/AttendanceRegulations';
import ClubsSocieties from '../components/guide/ClubsSocieties';
import StudentSupportServices from '../components/guide/StudentSupportServices';
import TimeManagement from '../components/guide/TimeManagement';
import StudyTechniques from '../components/guide/StudyTechniques';
import PartTimeWorkGigs from '../components/guide/PartTimeWorkGigs';
import LaptopBuyingGuide from '../components/guide/LaptopBuyingGuide';
import PrintingTranscriptsLetters from '../components/guide/PrintingTranscriptsLetters';
import GraduationClearance from '../components/guide/GraduationClearance';
import CommonMistakesFreshers from '../components/guide/CommonMistakesFreshers';
import ContactDirectory from '../components/guide/ContactDirectory';
import FAQsTroubleshooting from '../components/guide/FAQsTroubleshooting';
import SponsorsFeaturedVendors from '../components/guide/SponsorsFeaturedVendors';

const Guide = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const guides = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Arrival checklist and orientation guide',
      icon: BookOpen,
      component: GettingStarted,
      category: 'Essentials'
    },
    {
      id: 'campus-map',
      title: 'Campus Map & Buildings',
      description: 'Navigate campus with interactive map',
      icon: Map,
      component: CampusMap,
      category: 'Essentials'
    },
    {
      id: 'student-portal',
      title: 'Student Portal',
      description: 'Access and password reset guide',
      icon: User,
      component: StudentPortal,
      category: 'Academic'
    },
    {
      id: 'course-registration',
      title: 'Course Registration',
      description: 'Step-by-step registration process',
      icon: FileText,
      component: CourseRegistration,
      category: 'Academic'
    },
    {
      id: 'add-drop-courses',
      title: 'Add/Drop Courses',
      description: 'Deadlines and procedures',
      icon: Plus,
      component: AddDropCourses,
      category: 'Academic'
    },
    {
      id: 'id-card',
      title: 'Student ID Card',
      description: 'How and where to collect',
      icon: CreditCard,
      component: IDCard,
      category: 'Essentials'
    },
    {
      id: 'medicals-health-center',
      title: 'Medicals & Health',
      description: 'Health services and procedures',
      icon: Heart,
      component: MedicalsHealthCenter,
      category: 'Services'
    },
    {
      id: 'presidential-reimbursement',
      title: 'Presidential Reimbursement',
      description: 'First-year fees guide',
      icon: CreditCard,
      component: PresidentialReimbursement,
      category: 'Financial'
    },
    {
      id: 'student-loan-trust-fund',
      title: 'Student Loan Trust Fund',
      description: 'Application and repayment guide',
      icon: CreditCard,
      component: StudentLoanTrustFund,
      category: 'Financial'
    },
    {
      id: 'payments-receipts',
      title: 'Payments & Receipts',
      description: 'Paying fees and keeping proof',
      icon: CreditCard,
      component: PaymentsReceipts,
      category: 'Financial'
    },
    {
      id: 'accommodation',
      title: 'Accommodation',
      description: 'On-campus and off-campus tips',
      icon: Home,
      component: Accommodation,
      category: 'Living'
    },
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Taxis, shuttle, and routes',
      icon: Car,
      component: Transportation,
      category: 'Living'
    },
    {
      id: 'food-dining',
      title: 'Food & Dining',
      description: 'Top campus spots and vendors',
      icon: Utensils,
      component: FoodDining,
      category: 'Living'
    },
    {
      id: 'printing-stationery',
      title: 'Printing & Stationery',
      description: 'Recommended shops and services',
      icon: Printer,
      component: PrintingStationery,
      category: 'Services'
    },
    {
      id: 'banking-momo',
      title: 'Banking & Mobile Money',
      description: 'Tips for managing finances',
      icon: Smartphone,
      component: BankingMoMo,
      category: 'Financial'
    },
    {
      id: 'security-safety',
      title: 'Security & Safety',
      description: 'Campus safety procedures',
      icon: Shield,
      component: SecuritySafety,
      category: 'Services'
    },
    {
      id: 'library-services',
      title: 'Library Services',
      description: 'Borrowing rules and hours',
      icon: Library,
      component: LibraryServices,
      category: 'Academic'
    },
    {
      id: 'labs-it-services',
      title: 'Labs & IT Services',
      description: 'Where to get tech help',
      icon: Laptop,
      component: LabsITServices,
      category: 'Services'
    },
    {
      id: 'wifi-email',
      title: 'Wi-Fi & Email',
      description: 'Login credentials and setup',
      icon: Wifi,
      component: WifiEmail,
      category: 'Services'
    },
    {
      id: 'exams-assessment-rules',
      title: 'Exams & Assessment',
      description: 'Rules and procedures',
      icon: FileText,
      component: ExamsAssessmentRules,
      category: 'Academic'
    },
    {
      id: 'attendance-regulations',
      title: 'Attendance & Regulations',
      description: 'Requirements and policies',
      icon: Clock,
      component: AttendanceRegulations,
      category: 'Academic'
    },
    {
      id: 'clubs-societies',
      title: 'Clubs & Societies',
      description: 'Student organizations and groups',
      icon: Users,
      component: ClubsSocieties,
      category: 'Campus Life'
    },
    {
      id: 'student-support-services',
      title: 'Student Support Services',
      description: 'Counselling and help resources',
      icon: Heart,
      component: StudentSupportServices,
      category: 'Services'
    },
    {
      id: 'time-management',
      title: 'Time Management',
      description: 'Schedules and productivity tips',
      icon: Clock,
      component: TimeManagement,
      category: 'Skills'
    },
    {
      id: 'study-techniques',
      title: 'Study Techniques',
      description: 'Learning strategies and methods',
      icon: BookOpen,
      component: StudyTechniques,
      category: 'Skills'
    },
    {
      id: 'part-time-work-gigs',
      title: 'Part-time Work & Gigs',
      description: 'Finding campus jobs',
      icon: Users,
      component: PartTimeWorkGigs,
      category: 'Skills'
    },
    {
      id: 'laptop-buying-guide',
      title: 'Laptop Buying Guide',
      description: 'Tips and LaptopConnect.shop link',
      icon: Laptop,
      component: LaptopBuyingGuide,
      category: 'Resources'
    },
    {
      id: 'printing-transcripts-letters',
      title: 'Transcripts & Letters',
      description: 'Steps and fees for documents',
      icon: Printer,
      component: PrintingTranscriptsLetters,
      category: 'Resources'
    },
    {
      id: 'graduation-clearance',
      title: 'Graduation & Clearance',
      description: 'Long-term preparation steps',
      icon: GraduationCap,
      component: GraduationClearance,
      category: 'Academic'
    },
    {
      id: 'common-mistakes-freshers',
      title: 'Common Mistakes Freshers Make',
      description: 'Real experience and tips',
      icon: HelpCircle,
      component: CommonMistakesFreshers,
      category: 'Skills'
    },
    {
      id: 'contact-directory',
      title: 'Contact Directory',
      description: 'Offices and helplines',
      icon: Phone,
      component: ContactDirectory,
      category: 'Resources'
    },
    {
      id: 'faqs-troubleshooting',
      title: 'FAQs & Troubleshooting',
      description: 'Common portal problems',
      icon: HelpCircle,
      component: FAQsTroubleshooting,
      category: 'Resources'
    },
    {
      id: 'sponsors-featured-vendors',
      title: 'Sponsors & Featured Vendors',
      description: 'How to apply to be featured',
      icon: Heart,
      component: SponsorsFeaturedVendors,
      category: 'About'
    }
  ];

  // Filter guides based on search
  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group guides by category
  const categories = ['Essentials', 'Academic', 'Financial', 'Living', 'Services', 'Campus Life', 'Skills', 'Resources', 'About'];

  const handleGuideClick = (guideId) => {
    const guide = guides.find(g => g.id === guideId);
    if (guide) {
      setSelectedGuide(guide);
      setShowGuideModal(true);
    }
  };

  const handleCloseGuide = () => {
    setShowGuideModal(false);
    setSelectedGuide(null);
  };

  return (
    <div className="p-4 pb-20">
      {/* Header with Search */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">UCC Campus Guide</h1>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-soft"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-1.4-5.07a.5.5 0 0 0-.39-.25L14 9.67V6.5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1-1v3.17L3.39 18.53a.5.5 0 0 0-.39.25L3 20.17V21.5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-.83l5.61-4.39a.5.5 0 0 0 .39-.25Z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Categories */}
      {searchTerm === '' && (
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Guide Cards */}
      <div className="space-y-3">
        {filteredGuides.map((guide) => (
          <GuideCard
            key={guide.id}
            id={guide.id}
            title={guide.title}
            description={guide.description}
            icon={guide.icon}
            onClick={handleGuideClick}
          />
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={40} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No guides found</h3>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      )}

      {selectedGuide && (
        <GuideContent
          guide={selectedGuide.component()}
          isOpen={showGuideModal}
          onClose={handleCloseGuide}
        />
      )}
    </div>
  );
};

export default Guide;