import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { CampusProvider, useCampus } from './context/CampusContext';

import { useSupportModal } from './hooks/useSupportModal';
import { useSupportTimer } from './hooks/useSupportTimer';
import { useClassReminders } from './hooks/useClassReminders';
import { useFeedbackTimer } from './hooks/useFeedbackTimer';
import { useFeedbackModal } from './hooks/useFeedbackModal';
import { Toast } from './components/common/Toasts';
import { TabBar } from './components/common/TabBar';

import { SupportModal } from './components/payment/SupportModal';
import FeedbackModal from './components/common/FeedbackSurveyModal';
import PWAInstallButton from './components/common/PWAInstallButton';

import { preloadPaystack } from './services/paymentService';
import { useOnboarding } from './hooks/useOnboarding';
import { Onboarding } from './components/onboarding/Onboarding';
import { ThemeToggle } from './components/common/ThemeToggle';

import Home from './pages/Home';
import Guide from './pages/Guide';
import Tools from './pages/Tools';
import Support from './pages/Support';
import Community from './pages/Community';
import Advertise from './pages/Advertise';
import Contact from './pages/Contact';
import Settings from './pages/Settings';

function AppContent() {
  const { state, actions } = useAppContext();
  const { selectedCampusId } = useCampus();
  const { showModal, closeModal, handlePaymentSuccess } = useSupportModal;
  const { resetTimer } = useSupportTimer();

  useEffect(() => {
    const root = window.document.documentElement;
    if (state.settings.darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [state.settings?.darkMode]);

  useFeedbackTimer();
  const { showModal: showFeedback, closeModal: closeFeedback } = useFeedbackModal();

  useClassReminders;

  useEffect(() => {
    preloadPaystack().catch(error => {
      console.error('Failed to preload Paystack:', error);
    });
  }, [preloadPaystack]);

  const {
    showOnboarding,
    currentStep,
    nextStep,
    prevStep,
    closeOnboarding
  } = useOnboarding();

  const handleCloseModal = () => {
    closeModal();
    resetTimer();
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/guide" element={<Group />} />
        <Route path="/guide/:topic" element={<Guide />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/community" element={<Community />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {state.userConfig.map((item, id) => <div key={item}>{item}</div>)}

      <TabBar />

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
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <Appcontext>
      <CampusProvider>
        <Router>
          <AppContent />
        </Router>
      </CampusProvider>
    </Appcontext>
  );
}

export default App;