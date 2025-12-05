// src/pages/Guide.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { GuideCard } from '../components/guide/GuideCard';
import { GuideContent } from '../components/guide/GuideContent';
import { Button } from '../components/common/Button';
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
  Phone,
  Search,
  Star,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const guides = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Arrival checklist and orientation guide',
      icon: BookOpen,
      component: GettingStarted,
      category: 'Essentials',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      id: 'campus-map',
      title: 'Campus Map & Buildings',
      description: 'Navigate campus with interactive map',
      icon: Map,
      component: CampusMap,
      category: 'Essentials',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      id: 'student-portal',
      title: 'Student Portal',
      description: 'Access and password reset guide',
      icon: User,
      component: StudentPortal,
      category: 'Academic',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      id: 'course-registration',
      title: 'Course Registration',
      description: 'Step-by-step registration process',
      icon: FileText,
      component: CourseRegistration,
      category: 'Academic',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      id: 'add-drop-courses',
      title: 'Add/Drop Courses',
      description: 'Deadlines and procedures',
      icon: Plus,
      component: AddDropCourses,
      category: 'Academic',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      id: 'id-card',
      title: 'Student ID Card',
      description: 'How and where to collect',
      icon: CreditCard,
      component: IDCard,
      category: 'Essentials',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      id: 'medicals-health-center',
      title: 'Medicals & Health',
      description: 'Health services and procedures',
      icon: Heart,
      component: MedicalsHealthCenter,
      category: 'Services',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      id: 'presidential-reimbursement',
      title: 'Presidential Reimbursement',
      description: 'First-year fees guide',
      icon: CreditCard,
      component: PresidentialReimbursement,
      category: 'Financial',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    },
    {
      id: 'student-loan-trust-fund',
      title: 'Student Loan Trust Fund',
      description: 'Application and repayment guide',
      icon: CreditCard,
      component: StudentLoanTrustFund,
      category: 'Financial',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    },
    {
      id: 'payments-receipts',
      title: 'Payments & Receipts',
      description: 'Paying fees and keeping proof',
      icon: CreditCard,
      component: PaymentsReceipts,
      category: 'Financial',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    },
    {
      id: 'accommodation',
      title: 'Accommodation',
      description: 'On-campus and off-campus tips',
      icon: Home,
      component: Accommodation,
      category: 'Living',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-100'
    },
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Taxis, shuttle, and routes',
      icon: Car,
      component: Transportation,
      category: 'Living',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-100'
    },
    {
      id: 'food-dining',
      title: 'Food & Dining',
      description: 'Top campus spots and vendors',
      icon: Utensils,
      component: FoodDining,
      category: 'Living',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-100'
    },
    {
      id: 'printing-stationery',
      title: 'Printing & Stationery',
      description: 'Recommended shops and services',
      icon: Printer,
      component: PrintingStationery,
      category: 'Services',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      id: 'banking-momo',
      title: 'Banking & Mobile Money',
      description: 'Tips for managing finances',
      icon: Smartphone,
      component: BankingMoMo,
      category: 'Financial',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    },
    {
      id: 'security-safety',
      title: 'Security & Safety',
      description: 'Campus safety procedures',
      icon: Shield,
      component: SecuritySafety,
      category: 'Services',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      id: 'library-services',
      title: 'Library Services',
      description: 'Borrowing rules and hours',
      icon: Library,
      component: LibraryServices,
      category: 'Academic',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      id: 'labs-it-services',
      title: 'Labs & IT Services',
      description: 'Where to get tech help',
      icon: Laptop,
      component: LabsITServices,
      category: 'Services',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      id: 'wifi-email',
      title: 'Wi-Fi & Email',
      description: 'Login credentials and setup',
      icon: Wifi,
      component: WifiEmail,
      category: 'Services',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      id: 'exams-assessment-rules',
      title: 'Exams & Assessment',
      description: 'Rules and procedures',
      icon: FileText,
      component: ExamsAssessmentRules,
      category: 'Academic',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      id: 'attendance-regulations',
      title: 'Attendance & Regulations',
      description: 'Requirements and policies',
      icon: Clock,
      component: AttendanceRegulations,
      category: 'Academic',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      id: 'clubs-societies',
      title: 'Clubs & Societies',
      description: 'Student organizations and groups',
      icon: Users,
      component: ClubsSocieties,
      category: 'Campus Life',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100'
    },
    {
      id: 'student-support-services',
      title: 'Student Support Services',
      description: 'Counselling and help resources',
      icon: Heart,
      component: StudentSupportServices,
      category: 'Services',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      id: 'time-management',
      title: 'Time Management',
      description: 'Schedules and productivity tips',
      icon: Clock,
      component: TimeManagement,
      category: 'Skills',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-100'
    },
    {
      id: 'study-techniques',
      title: 'Study Techniques',
      description: 'Learning strategies and methods',
      icon: BookOpen,
      component: StudyTechniques,
      category: 'Skills',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-100'
    },
    {
      id: 'part-time-work-gigs',
      title: 'Part-time Work & Gigs',
      description: 'Finding campus jobs',
      icon: Users,
      component: PartTimeWorkGigs,
      category: 'Skills',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-100'
    },
    {
      id: 'laptop-buying-guide',
      title: 'Laptop Buying Guide',
      description: 'Tips and LaptopConnect.shop link',
      icon: Laptop,
      component: LaptopBuyingGuide,
      category: 'Resources',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100'
    },
    {
      id: 'printing-transcripts-letters',
      title: 'Transcripts & Letters',
      description: 'Steps and fees for documents',
      icon: Printer,
      component: PrintingTranscriptsLetters,
      category: 'Resources',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100'
    },
    {
      id: 'graduation-clearance',
      title: 'Graduation & Clearance',
      description: 'Long-term preparation steps',
      icon: GraduationCap,
      component: GraduationClearance,
      category: 'Academic',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      id: 'common-mistakes-freshers',
      title: 'Common Mistakes Freshers Make',
      description: 'Real experience and tips',
      icon: HelpCircle,
      component: CommonMistakesFreshers,
      category: 'Skills',
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-100'
    },
    {
      id: 'contact-directory',
      title: 'Contact Directory',
      description: 'Offices and helplines',
      icon: Phone,
      component: ContactDirectory,
      category: 'Resources',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100'
    },
    {
      id: 'faqs-troubleshooting',
      title: 'FAQs & Troubleshooting',
      description: 'Common portal problems',
      icon: HelpCircle,
      component: FAQsTroubleshooting,
      category: 'Resources',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100'
    },
    {
      id: 'sponsors-featured-vendors',
      title: 'Sponsors & Featured Vendors',
      description: 'How to apply to be featured',
      icon: Heart,
      component: SponsorsFeaturedVendors,
      category: 'About',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100'
    }
  ];

  // Group guides by category
  const categories = ['All', 'Essentials', 'Academic', 'Financial', 'Living', 'Services', 'Campus Life', 'Skills', 'Resources', 'About'];

  // Filter guides based on search and category
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGuideClick = (guideId) => {
    const guide = guides.find(g => g.id === guideId);
    if (guide) {
      const guideData = guide.component();
      setSelectedGuide({
        ...guideData,
        title: guide.title
      });
      setShowGuideModal(true);
    }
  };

  const handleCloseGuide = () => {
    setShowGuideModal(false);
    setSelectedGuide(null);
  };

  return (
    <div className="p-4 pb-24 bg-gray-50/50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-200 mb-6">
             <Sparkles size={12} /> Comprehensive Guide
          </div>

          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
            <BookOpen size={40} className="text-white drop-shadow-md" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            UCC Campus <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              Student Guide
            </span>
          </h1>
          
          <p className="text-blue-100/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Everything you need to navigate university life, from registration to graduation.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <Home size={20} /> Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/tools')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <Laptop size={20} /> Student Tools
            </Button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
            Browse by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guide Cards Section */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <BookOpen className="text-blue-500" size={20} />
            {selectedCategory === 'All' ? 'All Guides' : `${selectedCategory} Guides`}
            <span className="ml-auto text-sm font-normal text-gray-500">
              {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'} found
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <button
                  key={guide.id}
                  onClick={() => handleGuideClick(guide.id)}
                  className={`p-5 rounded-2xl border ${guide.border} ${guide.bg} hover:shadow-md transition-all cursor-pointer group text-left`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      <Icon size={24} className={guide.color} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg mb-1 ${guide.color}`}>{guide.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">{guide.description}</p>
                      <div className="mt-2">
                        <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${guide.bg} ${guide.color}`}>
                          {guide.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {filteredGuides.length === 0 && (
        <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No guides found</h3>
            <p className="text-gray-600">Try searching with different keywords or selecting another category</p>
          </CardContent>
        </Card>
      )}

      {selectedGuide && (
        <GuideContent
          guide={selectedGuide}
          isOpen={showGuideModal}
          onClose={handleCloseGuide}
        />
      )}
    </div>
  );
};

export default Guide;