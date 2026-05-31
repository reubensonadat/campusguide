import React, { useEffect, useState, lazy, Suspense } from 'react';
import OneSignal from 'react-onesignal';
import { DataLoader } from './components/common/CustomLoaders';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { CampusProvider, useCampus } from './context/CampusContext';
import { NotificationProvider } from './context/NotificationContext';

import { useSupportModal } from './hooks/useSupportModal';
import { useSupportTimer } from './hooks/useSupportTimer';
import { useClassReminders } from './hooks/useClassReminders';
import { useAppNotifications } from './hooks/useAppNotifications';
import { useFeedbackTimer } from './hooks/useFeedbackTimer';
import { useFeedbackModal } from './hooks/useFeedbackModal';
import { Toast } from './components/common/Toast';
import { TabBar } from './components/common/TabBar';
import Sidebar from './components/common/Sidebar';

import { SupportModal } from './components/payment/SupportModal';
import FeedbackModal from './components/common/FeedbackSurveyModal';
import PWAInstallButton from './components/common/PWAInstallButton';

import { preloadPaystack } from './services/paymentService';
import { useOnboarding } from './hooks/useOnboarding';
import { Onboarding } from './components/onboarding/Onboarding';
import { triggerHaptic } from './utils/haptics';
import { supabase } from './lib/supabase';
import AuthBottomSheet from './components/onboarding/AuthModal';

// Page imports (Statically load Home to render the landing screen instantly)
import Home from './pages/Home';

// Lazy loaded page components to keep the main bundle extremely lightweight
const Guide = lazy(() => import('./pages/Guide'));
const Tools = lazy(() => import('./pages/Tools'));
const Support = lazy(() => import('./pages/Support'));
const Community = lazy(() => import('./pages/Community'));
const Advertise = lazy(() => import('./pages/Advertise'));
const Contact = lazy(() => import('./pages/Contact'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PrivacyPolicy = lazy(() => import('./pages/Legal').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/Legal').then(m => ({ default: m.TermsOfService })));
const LetterGenerator = lazy(() => import('./pages/LetterGenerator').then(m => ({ default: m.LetterGenerator })));

function NavigationObserver() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    triggerHaptic(30);
  }, [location.pathname]);

  return null;
}

function AppContent() {
  const { selectedCampusId } = useCampus();
  
  // Initialize OneSignal
  useEffect(() => {
    // Replace this with your actual OneSignal App ID
    const ONESIGNAL_APP_ID = "03f1b792-2236-43d1-8df3-dccdfc04b5cd";
    
    // Only initialize if we have an ID and it hasn't been initialized yet
    if (ONESIGNAL_APP_ID !== "YOUR_ONESIGNAL_APP_ID_HERE" && !isOneSignalInitialized) {
      isOneSignalInitialized = true;
      OneSignal.init({
        appId: ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: true, // Needed for local testing
        notifyButton: {
          enable: false, // We will use our own custom toggle in Settings
        },
      }).catch(err => {
        console.warn("OneSignal initialization failed (likely Web Push not configured in dashboard yet):", err);
      });
    }
  }, []);

  const { showModal, closeModal, handlePaymentSuccess } = useSupportModal();
  const { resetTimer } = useSupportTimer();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Feedback Modal Logic
  useFeedbackTimer();
  const { showModal: showFeedback, closeModal: closeFeedback } = useFeedbackModal();

  // Class Reminders Logic
  useClassReminders();
  
  // New In-App Notifications Background Worker
  useAppNotifications();

  // Recovery: if user is already authenticated but ucc_user_id was never persisted
  useEffect(() => {
    const recoverUserId = async () => {
      if (!localStorage.getItem('ucc_user_id')) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) {
          localStorage.setItem('ucc_user_id', user.id);
        }
      }
    };
    recoverUserId();
  }, []);

  // Onboarding
  const {
    showOnboarding,
    currentStep,
    nextStep,
    prevStep,
    closeOnboarding
  } = useOnboarding();

  // Handle closing support modal and resetting timer
  const handleCloseModal = () => {
    closeModal();
    resetTimer();
  };

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      <Toaster 
        position="top-center" 
        containerStyle={{ top: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
        toastOptions={{ duration: 3000, style: { fontWeight: 'bold' } }} 
      />
      <Sidebar onExpandedChange={setIsSidebarExpanded} />
      
      <div className={`flex-1 min-w-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarExpanded ? 'md:ml-[220px]' : 'md:ml-[64px]'}`}>
        <Suspense fallback={
          <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center gap-4 py-20 bg-gray-50/50 dark:bg-[#0a0a0a]">
            <DataLoader className="w-10 h-10 text-[#002F45]" />
            <span className="text-xs font-black tracking-widest text-[#002F45]/60 dark:text-gray-400/60 uppercase animate-pulse">Loading...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/guide/:topic" element={<Guide />} />
            <Route path="/tools/letter-generator" element={<LetterGenerator />} />
            <Route path="/tools/*" element={<Tools />} />
            <Route path="/community" element={<Community />} />
            <Route path="/support" element={<Support />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

      <TabBar />

      {/* PWA Install Button - Fixed Position */}
      <PWAInstallButton />

      <SupportModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <FeedbackModal
        isOpen={showFeedback}
        onClose={closeFeedback}
      />

        <Onboarding
          isOpen={showOnboarding}
          currentStep={currentStep}
          onNext={nextStep}
          onPrev={prevStep}
          onClose={closeOnboarding}
        />
        
        <AuthBottomSheet />
      </div>
    </div>
  );
}

let isOneSignalInitialized = false;

function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <CampusProvider>
          <Router>
            <NavigationObserver />
            <AppContent />
          </Router>
        </CampusProvider>
      </NotificationProvider>
    </AppProvider>
  );
}

export default App;
