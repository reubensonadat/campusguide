// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { useOnboarding } from './hooks/useOnboarding';
import { useSupportModal } from './hooks/useSupportModal';
import { Toast } from './components/common/Toast';
import { TabBar } from './components/common/TabBar';
import { Onboarding } from './components/onboarding/Onboarding';
import { SupportModal } from './components/payment/SupportModal';
import SupportButton from './components/payment/SupportButton';

// Page imports
import Home from './pages/Home';
import Guide from './pages/Guide';
import Tools from './pages/Tools';
import Support from './pages/Support';
import Contact from './pages/Contact';
import Settings from './pages/Settings';

function AppContent() {
  const { showOnboarding, currentStep, nextStep, prevStep, closeOnboarding } = useOnboarding();
  const { showModal, closeModal, handlePaymentSuccess } = useSupportModal();

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:topic" element={<Guide />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      
      <TabBar />
      
      {/* Support Button - Fixed Position */}
      <SupportButton />
      
      <Onboarding
        isOpen={showOnboarding}
        onClose={closeOnboarding}
        currentStep={currentStep}
        onNext={nextStep}
        onPrev={prevStep}
      />
      
      <SupportModal
        isOpen={showModal}
        onClose={closeModal}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;