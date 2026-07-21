import React, { useEffect, useState, lazy, Suspense } from 'react';
import notificationService from './services/notificationService';
import { motion, AnimatePresence } from 'framer-motion';

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import { CampusProvider, useCampus } from './context/CampusContext';
import { NotificationProvider } from './context/NotificationContext';
import { FocusTimer } from './components/tools/FocusTimer';

import { useSupportModal } from './hooks/useSupportModal';
import { useSupportTimer } from './hooks/useSupportTimer';
import { useAppNotifications } from './hooks/useAppNotifications';
import { useFeedbackTimer } from './hooks/useFeedbackTimer';
import { useFeedbackModal } from './hooks/useFeedbackModal';

import { TabBar } from './components/common/TabBar';
import Sidebar from './components/common/Sidebar';
import ErrorBoundary from './components/common/ErrorBoundary';

import { SupportModal } from './components/payment/SupportModal';
import FeedbackModal from './components/common/FeedbackSurveyModal';
import PWAInstallButton from './components/common/PWAInstallButton';
import CustomCursor from './components/common/CustomCursor';
import SelectionPopover from './components/common/SelectionPopover';
import { PageSkeleton } from './components/common/Skeleton';


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
const RunwayPlanner = lazy(() => import('./pages/RunwayPlanner'));
const DataMart = lazy(() => import('./pages/DataMart'));

function NavigationObserver() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    triggerHaptic(30);
  }, [location.pathname]);

  return null;
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

import { useLocalStorage } from './hooks/useLocalStorage';

function AppContent() {
  const location = useLocation();
  const { selectedCampusId } = useCampus();

  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const uid = localStorage.getItem('ucc_user_id');
  if (uid && !UUID_REGEX.test(uid)) {
    localStorage.removeItem('ucc_user_id');
  }

  const [syncConflict, setSyncConflict] = useState(null);

  useEffect(() => {
    const handleSyncConflict = (e) => {
      setSyncConflict(e.detail);
    };
    window.addEventListener('SYNC_CONFLICT', handleSyncConflict);
    return () => window.removeEventListener('SYNC_CONFLICT', handleSyncConflict);
  }, []);

  const handleResolveConflict = (action) => {
    if (action === 'restore') {
      import('./services/syncService').then(({ restoreFromCloud }) => {
        const toastId = toast.loading('Restoring from cloud...');
        restoreFromCloud().then((res) => {
          if (res.success) {
            toast.success('Data restored! Reloading...', { id: toastId });
            setTimeout(() => window.location.reload(), 1500);
          } else {
            toast.error(`Restore failed: ${res.error}`, { id: toastId });
          }
        });
      });
    } else if (action === 'overwrite') {
      import('./services/syncService').then(({ syncToCloud }) => {
        const toastId = toast.loading('Overwriting cloud database...');
        syncToCloud({ force: true }).then((res) => {
          if (res.success) {
            toast.success('Database overwritten! Sync complete.', { id: toastId });
            setSyncConflict(null);
          } else {
            toast.error(`Overwrite failed: ${res.error}`, { id: toastId });
          }
        });
      });
    }
  };

  const [appColorTheme] = useLocalStorage('ucc_app_color_theme', 'default');
  useEffect(() => {
    if (appColorTheme && appColorTheme !== 'default') {
      document.documentElement.setAttribute('data-theme', appColorTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [appColorTheme]);

  // Initialize OneSignal through the isolated notification service
  useEffect(() => {
    try {
      const ONESIGNAL_APP_ID = "03f1b792-2236-43d1-8df3-dccdfc04b5cd";
      if (ONESIGNAL_APP_ID === "YOUR_ONESIGNAL_APP_ID_HERE") return;

      notificationService.init(ONESIGNAL_APP_ID).then(() => {
        try {
          const localUserId = localStorage.getItem('ucc_user_id');
          if (!localUserId) return;

          let profile = {};
          try {
            const raw = localStorage.getItem('ucc_profile');
            if (raw) profile = JSON.parse(raw);
          } catch {}

          notificationService.tagUser(localUserId, profile);
        } catch {}
      }).catch(() => {});
    } catch {}
  }, []);

  const { showModal, closeModal, handlePaymentSuccess } = useSupportModal();
  const { resetTimer } = useSupportTimer();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Feedback Modal Logic
  useFeedbackTimer();
  const { showModal: showFeedback, closeModal: closeFeedback } = useFeedbackModal();

  // Consolidated notifications (in-app + browser OS + server-side push)
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
    const idleId = requestIdleCallback ? requestIdleCallback(() => recoverUserId(), { timeout: 3000 }) : setTimeout(recoverUserId, 2000);
    return () => { if (requestIdleCallback) cancelIdleCallback(idleId); else clearTimeout(idleId); };
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
    <div className="min-h-screen flex bg-gray-50/50 overflow-x-hidden">
      <CustomCursor />
      <SelectionPopover />
      <Sidebar onExpandedChange={setIsSidebarExpanded} />

      <div className={`flex-1 min-w-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarExpanded ? 'md:ml-[220px]' : 'md:ml-[64px]'}`}>
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageSkeleton />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/focus" element={<PageTransition><FocusTimer /></PageTransition>} />
                <Route path="/guide" element={<PageTransition><Guide /></PageTransition>} />
                <Route path="/guide/:topic" element={<PageTransition><Guide /></PageTransition>} />
                <Route path="/tools/letter-generator" element={<PageTransition><LetterGenerator /></PageTransition>} />
                <Route path="/tools/*" element={<PageTransition><Tools /></PageTransition>} />
                <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
                <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
                <Route path="/advertise" element={<PageTransition><Advertise /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
                <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                <Route path="/admin/*" element={<PageTransition><AdminDashboard /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
                <Route path="/planner" element={<PageTransition><RunwayPlanner /></PageTransition>} />
                <Route path="/data" element={<PageTransition><DataMart /></PageTransition>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </ErrorBoundary>

        <TabBar />
      </div>

      {/* Global Overlays & Modals OUTSIDE the flex layout */}
      <Toaster
        position="top-center"
        containerStyle={{ top: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
        toastOptions={{ duration: 3000, style: { fontWeight: 'bold' } }}
      />
      
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

        {syncConflict && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Sync Conflict Detected</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                {syncConflict.error || "Your cloud backup has more data than your phone. Which version do you want to keep as the single source of truth?"}
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handleResolveConflict('restore')}
                  className="w-full py-3.5 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-100 transition-all active:scale-95 shadow-md flex justify-between items-center"
                >
                  <span>Restore Cloud Data</span>
                  <span className="text-xs bg-white/20 dark:bg-black/10 px-2 py-0.5 rounded text-white dark:text-gray-900">{syncConflict.cloudCounts?.timetable || 0} items</span>
                </button>
                <button
                  onClick={() => handleResolveConflict('overwrite')}
                  className="w-full py-3.5 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all active:scale-95 flex justify-between items-center"
                >
                  <span>Overwrite Database</span>
                  <span className="text-xs bg-red-200/50 dark:bg-red-900/50 px-2 py-0.5 rounded text-red-700 dark:text-red-300">{syncConflict.localCounts?.timetable || 0} items</span>
                </button>
                <button
                  onClick={() => setSyncConflict(null)}
                  className="w-full py-3 text-sm text-gray-500 font-bold hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <CampusProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <NavigationObserver />
            <AppContent />
          </Router>
        </CampusProvider>
      </NotificationProvider>
    </AppProvider>
  );
}

export default App;
