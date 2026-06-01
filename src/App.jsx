import React, { useEffect, useState, lazy, Suspense } from 'react';
import OneSignal from 'react-onesignal';
import { DataLoader } from './components/common/CustomLoaders';
import { SplashScreen } from './components/common/SplashScreen';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import { CampusProvider, useCampus } from './context/CampusContext';
import { NotificationProvider } from './context/NotificationContext';
import { FocusTimer } from './components/tools/FocusTimer';

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

import { useLocalStorage } from './hooks/useLocalStorage';

function AppContent() {
  const { selectedCampusId } = useCampus();
  
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
      }).then(() => {
        const localUserId = localStorage.getItem('ucc_user_id');
        if (localUserId && window.OneSignal && window.OneSignal.User) {
          window.OneSignal.login(localUserId).catch(console.error);
          window.OneSignal.User.addTag("user_id", localUserId);
        }
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
    <div className="min-h-screen flex bg-gray-50/50 overflow-x-hidden">
      <Toaster
        position="top-center"
        containerStyle={{ top: 'calc(env(safe-area-inset-top, 0px) + 8px)' }}
        toastOptions={{ duration: 3000, style: { fontWeight: 'bold' } }}
      />
      <Sidebar onExpandedChange={setIsSidebarExpanded} />

      <div className={`flex-1 min-w-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isSidebarExpanded ? 'md:ml-[220px]' : 'md:ml-[64px]'}`}>
        <Suspense fallback={
          <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center gap-4 py-20 bg-gray-50/50 dark:bg-[#0a0a0a]">
            <DataLoader className="w-10 h-10 text-gray-900" />
            <span className="text-xs font-black tracking-widest text-gray-900/60 dark:text-gray-400/60 uppercase animate-pulse">Loading...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/focus" element={<FocusTimer />} />
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
    </div>
  );
}

let isOneSignalInitialized = false;

function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastOpened = localStorage.getItem('ucc_last_opened_date');
    
    // Only show splash screen if it's the first time opening the app today
    if (lastOpened !== today) {
      setShowSplash(true);
      localStorage.setItem('ucc_last_opened_date', today);
    }
  }, []);

  return (
    <AppProvider>
      <NotificationProvider>
        <CampusProvider>
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
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
