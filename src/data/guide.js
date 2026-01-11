import React from 'react';
import GettingStarted from '../components/guide/GettingStarted';
import CampusMap from '../components/guide/CampusMap';
import StudentPortal from '../components/guide/StudentPortal';
import CourseRegistration from '../components/guide/CourseRegistration';
import AddDropCourses from '../components/guide/AddDropCourses';
import IDCard from '../components/guide/IDCard';
import Holidays from '../components/guide/Holidays';
import MedicalsHealthCenter from '../components/guide/MedicalsHealthCenter';
import StudentLoanTrustFund from '../components/guide/StudentLoanTrustFund';
import PaymentsReceipts from '../components/guide/PaymentsReceipts';
import Accommodation from '../components/guide/Accommodation';
import Transportation from '../components/guide/Transportation';
import FoodDining from '../components/guide/FoodDining';

import BankingMoMo from '../components/guide/BankingMoMo';
import SecuritySafety from '../components/guide/SecuritySafety';
import LibraryServices from '../components/guide/LibraryServices';
import LabsITServices from '../components/guide/LabsITServices';
import WifiEmail from '../components/guide/WifiEmail';
import ExamsAssessmentRules from '../components/guide/ExamsAssessmentRules';
import ExamsAndResits from '../components/guide/ExamsAndResits';
import AttendanceRegulations from '../components/guide/AttendanceRegulations';
import ClubsSocieties from '../components/guide/ClubsSocieties';
import StudentSupportServices from '../components/guide/StudentSupportServices';
import TimeManagement from '../components/guide/TimeManagement';
import StudyTechniques from '../components/guide/StudyTechniques';
import PartTimeWorkGigs from '../components/guide/PartTimeWorkGigs';
import LaptopBuyingGuide from '../components/guide/LaptopBuyingGuide';
import PrintingTranscriptsLetters from '../components/guide/PrintingTranscriptsLetters';
import CommonMistakesFreshers from '../components/guide/CommonMistakesFreshers';
import ContactDirectory from '../components/guide/ContactDirectory';
import FAQsTroubleshooting from '../components/guide/FAQsTroubleshooting';

export const GUIDE_TOPICS = {
    "Essentials": [
        { id: 'getting-started', title: 'Getting Started', component: GettingStarted, keywords: ['freshers', 'arrival', 'orientation', 'registration', 'first week'] },
        { id: 'campus-map', title: 'Campus Map', component: CampusMap, keywords: ['locations', 'directions', 'buildings', 'halls', 'lecture theatres'] },
        { id: 'id-card', title: 'Student ID Card', component: IDCard, keywords: ['identification', 'library card', 'exam card', 'replacement'] },
    ],
    "Academic": [
        { id: 'student-portal', title: 'Student Portal', component: StudentPortal, keywords: ['login', 'password', 'reset', 'results', 'portal'] },
        { id: 'course-registration', title: 'Course Registration', component: CourseRegistration, keywords: ['register courses', 'credit hours', 'add courses'] },
        { id: 'add-drop-courses', title: 'Add/Drop Courses', component: AddDropCourses, keywords: ['change courses', 'drop courses', 'registration amendment'] },
        { id: 'exams-assessment-rules', title: 'Exams & Rules', component: ExamsAssessmentRules, keywords: ['grading', 'gpa', 'examination malpractice', 'rules'] },
        { id: 'exams-and-resits', title: 'Exams & Resits (Detailed)', component: ExamsAndResits, keywords: ['failed paper', 'supplementary', 'resit registration'] },
        { id: 'attendance-regulations', title: 'Attendance', component: AttendanceRegulations, keywords: ['absenteeism', 'classes', '75% rule'] },
        { id: 'library-services', title: 'Library Services', component: LibraryServices, keywords: ['books', 'borrowing', 'sam jonah', 'past questions'] },
        { id: 'holidays', title: 'Academic Holidays', component: Holidays, keywords: ['vacation', 'break', 'public holidays', 'calendar'] },

    ],
    "Financial": [
        { id: 'payments-receipts', title: 'Payments & Receipts', component: PaymentsReceipts, keywords: ['school fees', 'bank draft', 'transact', 'receipts'] },
        { id: 'student-loan-trust-fund', title: 'Student Loan Trust Fund', component: StudentLoanTrustFund, keywords: ['sltf', 'loan', 'financial aid', 'guarantor'] },
        { id: 'banking-momo', title: 'Banking & Mobile Money', component: BankingMoMo, keywords: ['banks on campus', 'atm', 'mobile money', 'commercial bank'] },
    ],
    "Living": [
        { id: 'accommodation', title: 'Accommodation', component: Accommodation, keywords: ['hostels', 'halls', 'room booking', 'housing'] },
        { id: 'food-dining', title: 'Food & Dining', component: FoodDining, keywords: ['restaurants', 'market', 'food joints', 'eating'] },
        { id: 'transportation', title: 'Transportation', component: Transportation, keywords: ['shuttle', 'taxi', 'bus', 'travel', 'movement'] },
    ],
    "Services": [
        { id: 'medicals-health-center', title: 'Medicals & Health', component: MedicalsHealthCenter, keywords: ['hospital', 'clinic', 'sick', 'emergency', 'hms'] },
        { id: 'labs-it-services', title: 'Labs & IT Support', component: LabsITServices, keywords: ['computer lab', 'wifi password', 'technical support'] },
        { id: 'wifi-email', title: 'Wi-Fi & Email', component: WifiEmail, keywords: ['internet', 'student email', 'connection'] },
        { id: 'security-safety', title: 'Security & Safety', component: SecuritySafety, keywords: ['police', 'emergency contacts', 'theft', 'safety'] },

        { id: 'student-support-services', title: 'Counselling & Support', component: StudentSupportServices, keywords: ['mental health', 'counselling center', 'guidance'] },
    ],
    "Campus Life": [
        { id: 'clubs-societies', title: 'Clubs & Societies', component: ClubsSocieties, keywords: ['associations', 'groups', 'activities', 'join'] },
    ],
    "Skills & Tips": [
        { id: 'time-management', title: 'Time Management', component: TimeManagement, keywords: ['schedule', 'planning', 'balance'] },
        { id: 'study-techniques', title: 'Study Techniques', component: StudyTechniques, keywords: ['learning', 'reading', 'exams prep'] },
        { id: 'common-mistakes-freshers', title: 'Common Mistakes', component: CommonMistakesFreshers, keywords: ['advice', 'freshers', 'tips', 'avoid'] },
        { id: 'part-time-work-gigs', title: 'Part-time Jobs', component: PartTimeWorkGigs, keywords: ['work', 'money', 'jobs'] },
    ],
    "Resources": [
        { id: 'contact-directory', title: 'Contact Directory', component: ContactDirectory, keywords: ['phone numbers', 'email', 'offices', 'administration'] },
        { id: 'laptop-buying-guide', title: 'Laptop Guide', component: LaptopBuyingGuide, keywords: ['computer specs', 'buying advice', 'tech'] },
        { id: 'printing-transcripts-letters', title: 'Transcripts', component: PrintingTranscriptsLetters, keywords: ['academic record', 'letters', 'transcript request'] },
        { id: 'faqs-troubleshooting', title: 'FAQs', component: FAQsTroubleshooting, keywords: ['help', 'questions', 'problems'] },
    ]
};
