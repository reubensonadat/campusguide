// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CampusProvider, useCampus } from './context/CampusContext';

import { useClassReminders } from './hooks/useClassReminders';
import { useFeedbackTimer } from './hooks/useFeedbackTimer';
import { useFeedbackModal } from './hooks/useFeedbackModal';
import { Toast } from './components/common/Toast';
import { TabBar } from './components/common/TabBar';

import FeedbackModal from './components/common/FeedbackSurveyModal';
import PWAInstallButton from './components/common/PWAInstallButton';


// Page imports
import Home from './pages/Home';
import Guide from './pages/Guide';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import Settings from './pages/Settings';

function AppContent() {
  const { selectedCampusId } = useCampus();

  // Feedback Modal Logic
  useFeedbackTimer();
  const { showModal: showFeedback, closeModal: closeFeedback } = useFeedbackModal();

  // Class Reminders Logic
  useClassReminders();



  // Handle closing support modal and resetting timer
  const handleCloseModal = () => {
    closeModal();
    resetTimer(); // Reset timer to show modal again after 5 minutes
  };

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:topic" element={<Guide />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <TabBar />

      {/* PWA Install Button - Fixed Position */}
      <PWAInstallButton />

      <FeedbackModal
        isOpen={showFeedback}
        onClose={closeFeedback}
      />

    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <CampusProvider>
        <Router>
          <AppContent />
        </Router>
      </CampusProvider>
    </AppProvider>
  );
}

export default App;