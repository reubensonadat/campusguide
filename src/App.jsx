// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { CampusProvider, useCampus } from './context/CampusContext';

import { useSupportModal } from './hooks/useSupportModal';
import { useSupportTimer } from './hooks/useSupportTimer';
import { useClassReminders } from './hooks/useClassReminders';
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

function NavigationObserver() {
  const location = useLocation();

  useEffect(() => {
    triggerHaptic(30); // Gentle 30ms buzz on navigation
  }, [location.pathname]);

  return null;
}

// Page imports
import Home from './pages/Home';
import Guide from './pages/Guide';
import Tools from './pages/Tools';
import Support from './pages/Support';
import Community from './pages/Community';
import Advertise from './pages/Advertise';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const { selectedCampusId } = useCampus();
  const { showModal, closeModal, handlePaymentSuccess } = useSupportModal();
  const { resetTimer } = useSupportTimer();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Feedback Modal Logic
  useFeedbackTimer();
  const { showModal: showFeedback, closeModal: closeFeedback } = useFeedbackModal();

  // Class Reminders Logic
  useClassReminders();

  // Preload Paystack script when app loads
  useEffect(() => {
    preloadPaystack().catch(error => {
      console.error('Failed to preload Paystack:', error);
    });
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
    resetTimer(); // Reset timer to show modal again after 5 minutes
  };

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { fontWeight: 'bold' } }} />
      <Sidebar onExpandedChange={setIsSidebarExpanded} />
      
      <div className={`flex-1 min-w-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarExpanded ? 'md:ml-[220px]' : 'md:ml-[64px]'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/:topic" element={<Guide />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/community" element={<Community />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

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

function App() {
  return (
    <AppProvider>
      <CampusProvider>
        <Router>
          <NavigationObserver />
          <AppContent />
        </Router>
      </CampusProvider>
    </AppProvider>
  );
}

export default App;