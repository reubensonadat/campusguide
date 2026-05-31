import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Clock, Fingerprint, Calendar as CalendarIcon, MapPin, Pencil, Settings, UserCircle, Bell, X, Camera, Save, CheckCircle, RefreshCw, Smartphone, User, Trash2, Phone, Mail, ChevronRight, Shield, HelpCircle, Heart, Edit3, Calendar, StickyNote, ListChecks, Copy, Cloud, CloudOff, Share2, Hash, CreditCard, Check, Moon, FileText, Star, Zap, Clock as ClockIcon, Lock, LayoutGrid, Store } from 'lucide-react';
import { DataLoader } from '../components/common/CustomLoaders';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDeviceId } from '../hooks/useDeviceId';
import { AvatarBuilder } from '../components/profile/AvatarBuilder';
import { useNavigate } from 'react-router-dom';
import { CustomSettings, CustomProfile, CustomSafetyCheck, CustomCoach, CustomContact } from '../components/common/CustomIcons';
import { CoachMarksOverlay } from '../components/common/CoachMarksOverlay';
import { AboutIcon } from '../common/CustomTaskIcons';
import { useAppContext } from '../context/AppContext';
import { LS_KEYS, DEFAULT_HOME_WIDGETS } from '../utils/constants';
import { restoreFromCloud } from '../services/syncService';
import { fetchUserThriftListings } from '../services/thriftService';
import { toast } from 'react-hot-toast';
import { triggerAuthSheet } from '../components/onboarding/AuthModal';
import { CourseCombobox } from '../components/common/CourseCombobox';
import ListingManageModal from '../components/profile/ListingManageModal';

// Custom SVG icons for widget toggles
const WeatherSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"/>
  </svg>
);

const LibrarySvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm6.62,31.47,46.82-10.05,3.34,15.9L146,97.53Zm6.64,31.57,46.82-10.06,13.3,63.24-46.82,10.06ZM216,197.94l-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm0,32h48v96H56Zm48,128H56V192h48v16Z"/>
  </svg>
);

const VerseSvgIcon = ({ size = 20, className = '' }) => (
  <svg id="Bible--Streamline-Atlas" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" height={size} width={size} className={className}>
    <path d="M12.86875 11.675v2.3874999999999997H3.325a1.1937499999999999 1.1937499999999999 0 0 1 -1.1937499999999999 -1.1937499999999999 1.2 1.2 0 0 1 1.1937499999999999 -1.1937499999999999Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="M12.86875 0.9375v10.7375H3.325a1.2 1.2 0 0 0 -1.1937499999999999 1.1937499999999999V2.13125A1.2 1.2 0 0 1 3.325 0.9375Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="m4.518750000000001 0.9375 0 10.7375" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="m6.90625 5.7125 3.5749999999999997 0" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="m8.69375 3.9187499999999997 0 4.7749999999999995" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
  </svg>
);

const ForexSvgIcon = ({ size = 20, className = '' }) => (
  <svg id="Dollar-Transfer-Account--Streamline-Atlas" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" height={size} width={size} className={className}>
    <path d="M0.925 6.31875a1.7874999999999999 1.7874999999999999 0 0 1 1.7937500000000002 -1.7937500000000002 1.7937500000000002 1.7937500000000002 0 0 1 1.7937500000000002 1.7937500000000002" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="M1.525 2.13125a1.1937499999999999 1.1937499999999999 0 1 0 2.3874999999999997 0 1.1937499999999999 1.1937499999999999 0 1 0 -2.3874999999999997 0" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="M6.30625 1.5375h3.5875000000000004a2.3874999999999997 2.3874999999999997 0 0 1 2.3874999999999997 2.3874999999999997v2.99375" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="m14.075 5.125 -1.7937500000000002 1.7874999999999999 -1.7937500000000002 -1.7874999999999999" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="M8.69375 13.49375H5.10625a2.39375 2.39375 0 0 1 -2.3874999999999997 -2.39375V8.125" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="m0.925 9.90625 1.7937500000000002 -1.7937500000000002 1.7937500000000002 1.7937500000000002" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="M14.075 9.90625h-2.09375a0.8937499999999999 0.8937499999999999 0 0 0 -0.8937499999999999 0.8937499999999999 0.8937499999999999 0.8937499999999999 0 0 0 0.8937499999999999 0.8999999999999999h0.625a0.8999999999999999 0.8999999999999999 0 0 1 0.8999999999999999 0.8937499999999999 0.90625 0.90625 0 0 1 -0.8999999999999999 0.8999999999999999h-2.11875" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="m12.28125 8.70625 0 1.2" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
    <path d="m12.28125 13.49375 0 1.1937499999999999" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1"></path>
  </svg>
);

const FootballSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="12 16 16 12 12 8 8 12 12 16"></polygon>
    <line x1="12" y1="8" x2="12" y2="2"></line>
    <line x1="12" y1="22" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="2" y2="12"></line>
    <line x1="22" y1="12" x2="16" y2="12"></line>
  </svg>
);

const CryptoSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 16 16" id="Bitcoin-Circle--Streamline-Atlas" height={size} width={size} className={className}>
    <g id="bitcoin_coin">
      <path d="M0.9375 7.5a6.5625 6.5625 0 1 0 13.125 0 6.5625 6.5625 0 1 0 -13.125 0" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
      <path d="M5.7125 5.1125h2.9812499999999997a1.1937499999999999 1.1937499999999999 0 0 1 1.1937499999999999 1.1937499999999999v0A1.1937499999999999 1.1937499999999999 0 0 1 8.69375 7.5H5.7125l0 0V5.1125l0 0Z" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
      <path d="M5.7125 7.5h2.9812499999999997a1.1937499999999999 1.1937499999999999 0 0 1 1.1937499999999999 1.1937499999999999v0a1.1937499999999999 1.1937499999999999 0 0 1 -1.1937499999999999 1.1937499999999999H5.7125l0 0V7.5l0 0Z" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
      <path d="m6.30625 3.9187499999999997 0 1.1937499999999999" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
      <path d="m8.69375 3.9187499999999997 0 1.1937499999999999" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
      <path d="m6.30625 9.8875 0 1.1937499999999999" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
      <path d="m8.69375 9.8875 0 1.1937499999999999" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
      <path d="m5.1125 5.1125 0.6 0" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
      <path d="m5.1125 9.8875 0.6 0" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1"></path>
    </g>
  </svg>
);

const NewsSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M88,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H96A8,8,0,0,1,88,112Zm8,40h80a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,64V184a24,24,0,0,1-24,24H32A24,24,0,0,1,8,184.11V88a8,8,0,0,1,16,0v96a8,8,0,0,0,16,0V64A16,16,0,0,1,56,48H216A16,16,0,0,1,232,64Zm-16,0H56V184a23.84,23.84,0,0,1-1.37,8H208a8,8,0,0,0,8-8Z"></path></svg>
);

const QuoteSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z"></path></svg>
);

const JokeSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 11C14 11 15.6667 11.3333 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C8.33333 11.3333 10 11 12 11ZM8.5 7C9.70968 7 10.7187 7.85917 10.9501 9.00057H6.04989C6.28131 7.85917 7.29032 7 8.5 7ZM15.5 7C16.7097 7 17.7187 7.85917 17.9501 9.00057H13.0499C13.2813 7.85917 14.2903 7 15.5 7Z"></path></svg>
);

const FunFactSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}><path d="M19.5 4.7832V7.6709L22 9.11426V14.8867L19.499 16.3311L19.5 19.2178L14.5 22.1045L12 20.6611L9.5 22.1045L4.5 19.2178V16.3311L2 14.8877L2.00098 9.11328L4.5 7.66992V4.78418L9.5 1.89746L11.999 3.34082L14.501 1.89648L19.5 4.7832ZM13 5.07227L12.999 8.42285L15.9639 10.1338L14.9639 11.8662L11 9.57715V5.07324L9.5 4.20703L6.49902 5.93848V8.8252L4 10.2676V13.7334L6.5 15.1768V18.0635L9.5 19.7959L11 18.9287L11.001 15.5771L8.03613 13.8652L9.03613 12.1338L13.001 14.4229V18.9297L14.5 19.7959L17.5 18.0625V15.1768L20 13.7324V10.2695L17.499 8.8252L17.5 5.9375L14.501 4.20605L13 5.07227Z"></path></svg>
);

const GithubSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg>
);

const WordSvgIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}><path d="M216,152.09V216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152.09a8,8,0,0,1,16,0V208H200V152.09a8,8,0,0,1,16,0Zm-128,32h80a8,8,0,1,0,0-16H88a8,8,0,1,0,0,16Zm4.88-53,77.27,20.68a7.89,7.89,0,0,0,2.08.28,8,8,0,0,0,2.07-15.71L97,115.61A8,8,0,1,0,92.88,131Zm18.45-49.93,69.28,40a8,8,0,0,0,10.93-2.93,8,8,0,0,0-2.93-10.91L119.33,67.27a8,8,0,1,0-8,13.84Zm87.33,13A8,8,0,1,0,210,82.84l-56.57-56.5a8,8,0,0,0-11.32,11.3Z"></path></svg>
);

// Helper function to check if a listing is expiring soon (within 2 days)
const isExpiringSoon = (expiresAt) => {
  if (!expiresAt) return false;
  const expiryDate = new Date(expiresAt);
  const today = new Date();
  const inTwoDays = new Date(today);
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  return expiryDate <= inTwoDays;
};

const Profile = () => {
  const navigate = useNavigate();
  const { actions } = useAppContext();

  const [theme, setTheme] = useLocalStorage('theme', 'light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const [profile, setProfile] = useLocalStorage('ucc_profile', {
    name: '',
    phone: '',
    course: '',
    level: '',
    semester: '1',
    student_id: '',
    avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=UCCStudent&backgroundColor=cce1eb,99c3d6`
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [homeWidgets, setHomeWidgets] = useLocalStorage(LS_KEYS.HOME_WIDGETS, DEFAULT_HOME_WIDGETS);
  const { deviceId, getTimeSinceLastSync, shouldSync } = useDeviceId();
  const [copiedId, setCopiedId] = useState(false);
  const [restoreId, setRestoreId] = useState('');
  const [restorePin, setRestorePin] = useState('');
  const [isRestoring, setIsRestoring] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('ucc_notifications_enabled', true);

  // GPA Vault Lock States
  const [isGpaLocked, setIsGpaLocked] = useLocalStorage('ucc_gpa_vault_locked', false);
  const [gpaPin, setGpaPin] = useLocalStorage('ucc_gpa_vault_pin', '');
  const [showGpaLockModal, setShowGpaLockModal] = useState(false);
  const [lockModalMode, setLockModalMode] = useState('setup'); // 'setup' | 'confirm' | 'deactivate'
  const [pinInput, setPinInput] = useState('');
  const [pinConfirmInput, setPinConfirmInput] = useState('');

  // Local form state for the edit modal
  const [formData, setFormData] = useState(profile);

  // Thrift listings state
  const [thriftListings, setThriftListings] = useState([]);
  const [isLoadingThrift, setIsLoadingThrift] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showAllListings, setShowAllListings] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  useEffect(() => {
    const loadThriftListings = async () => {
      setIsLoadingThrift(true);
      const userId = localStorage.getItem('ucc_user_id');
      if (userId) {
        const { listings, error } = await fetchUserThriftListings(userId);
        if (!error) {
          setThriftListings(listings);
        }
      }
      setIsLoadingThrift(false);
    };
    loadThriftListings();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = () => {
    if (!formData.phone || !formData.phone.trim()) {
      toast.error('Phone number is required.');
      return;
    }
    // Save to local state and localStorage immediately, close the modal instantly
    setProfile(formData);
    setIsEditModalOpen(false);
    
    // Trigger auth/sync in the background without blocking the UI
    triggerAuthSheet(() => {});
  };

  const toggleWidget = (key) => {
    setHomeWidgets(prev => {
      // List of "API widgets" that are subject to the max 3 limit
      const apiWidgetKeys = ['verse', 'forex', 'football', 'crypto', 'news', 'quote', 'joke', 'fact', 'github', 'word'];
      
      // If turning ON an API widget, check the limit
      if (!prev[key] && apiWidgetKeys.includes(key)) {
        const activeApiCount = apiWidgetKeys.filter(k => prev[k]).length;
        if (activeApiCount >= 3) {
          toast.error('You can only have a maximum of 3 API widgets active at once.');
          return prev;
        }
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  const coreWidgetToggles = [
    { key: 'classes', label: "Today's Classes", Icon: Clock },
    { key: 'tasks', label: "Today's Tasks", Icon: ListChecks },
    { key: 'calendar', label: 'Academic Calendar', Icon: Calendar },
    { key: 'library', label: 'Library Status', Icon: LibrarySvgIcon },
    { key: 'quickNote', label: 'Quick Note', Icon: StickyNote },
  ];

  const apiWidgetToggles = [
    { key: 'weather', label: 'Weather', Icon: WeatherSvgIcon },
    { key: 'verse', label: 'Verse of the Day', Icon: VerseSvgIcon },
    { key: 'forex', label: 'Forex (USD/GHS)', Icon: ForexSvgIcon },
    { key: 'football', label: 'Live Football', Icon: FootballSvgIcon },
    { key: 'crypto', label: 'Crypto Tracker', Icon: CryptoSvgIcon },
    { key: 'news', label: 'Tech News', Icon: NewsSvgIcon },
    { key: 'quote', label: 'Quote of the Day', Icon: QuoteSvgIcon },
    { key: 'joke', label: 'Dad Joke', Icon: JokeSvgIcon },
    { key: 'fact', label: 'Fun Fact', Icon: FunFactSvgIcon },
    { key: 'github', label: 'GitHub Stats', Icon: GithubSvgIcon },
    { key: 'word', label: 'Word of the Day', Icon: WordSvgIcon },
  ];

  const handleGpaLockToggle = () => {
    if (isGpaLocked) {
      setLockModalMode('deactivate');
      setPinInput('');
      setShowGpaLockModal(true);
    } else {
      setLockModalMode('setup');
      setPinInput('');
      setPinConfirmInput('');
      setShowGpaLockModal(true);
    }
  };

  const handleGpaLockSubmit = (e) => {
    e.preventDefault();
    if (lockModalMode === 'setup') {
      if (pinInput.length !== 6) {
        toast.error('PIN must be exactly 6 digits.');
        return;
      }
      setLockModalMode('confirm');
      setPinConfirmInput('');
    } else if (lockModalMode === 'confirm') {
      if (pinInput !== pinConfirmInput) {
        toast.error('PINs do not match. Please try again.');
        setLockModalMode('setup');
        setPinInput('');
        setPinConfirmInput('');
        return;
      }
      setGpaPin(pinInput);
      setIsGpaLocked(true);
      setShowGpaLockModal(false);
      toast.success('GPA Vault Lock activated successfully!');
    } else if (lockModalMode === 'deactivate') {
      if (pinInput !== gpaPin) {
        toast.error('Incorrect PIN. Authorization failed.');
        return;
      }
      setIsGpaLocked(false);
      setGpaPin('');
      setShowGpaLockModal(false);
      toast.success('GPA Vault Lock disabled.');
    }
  };

  const copyDeviceId = () => {
    navigator.clipboard.writeText(deviceId).then(() => {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    });
  };

  const handleRestore = async () => {
    if (!restoreId.trim() || !restorePin) return;
    setIsRestoring(true);
    const restoreToast = toast.loading('Restoring your data...');
    try {
      const { restoreLifecycle } = await import('../services/authService');
      const authResult = await restoreLifecycle(restoreId.trim().toUpperCase(), restorePin);
      if (!authResult.success) {
        toast.error(`Restore failed: ${authResult.error}`, { id: restoreToast });
        setIsRestoring(false);
        return;
      }

      const result = await restoreFromCloud();
      if (result.success) {
        setRestoreId('');
        setRestorePin('');
        toast.success('Data restored! Reloading...', { id: restoreToast, duration: 2000 });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(`Restore failed: ${result.error || 'No data found for this ID.'}`, { id: restoreToast });
      }
    } catch (err) {
      toast.error(`Restore failed: ${err.message}`, { id: restoreToast });
    } finally {
      setIsRestoring(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your app data? This cannot be undone.')) {
      toast.loading('Clearing data...');
      localStorage.clear();
      setTimeout(() => window.location.reload(), 800);
    }
  };

  const handleResetCoach = () => {
    localStorage.removeItem('ucc_coach_home');
    localStorage.removeItem('ucc_coach_map');
    localStorage.removeItem('ucc_coach_tools');
    localStorage.removeItem('ucc_coach_community');
    localStorage.removeItem('ucc_coach_profile');
    toast.success('Welcome Guide overlays reset successfully!');
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'UCC Campus Guide',
      text: "Hey! I'm using the UCC Campus Guide app for my timetable, GPA, and campus updates. Check it out here:",
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText('https://uccguide.com').then(() => {
        toast.success('App link copied to clipboard!');
      });
    }
  };

  return (
    <>
    <div className="min-h-screen bg-white pb-28 font-sans">

      {/* ── Main Profile View ────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-[calc(3rem_+_env(safe-area-inset-top,0px))] space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Profile</h1>
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <CustomSettings size={18} />
          </button>
        </div>

        {/* Vertical Wallet Pass Student ID Card */}
        <div className="relative group mb-8 mt-4 cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
          <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 transform-gpu group-hover:-translate-y-1 bg-gradient-to-br from-[#3fa2c6] to-[#1e7898] border border-white/20">

            {/* Top Section */}
            <div className="p-6 pb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

              <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="UCC" className="w-10 h-10 object-contain rounded-md shadow-sm" />
                    <div>
                      <h3 className="text-white font-black tracking-widest text-sm uppercase leading-tight drop-shadow-sm">Campus Guide</h3>
                      <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">Student ID</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-white font-mono font-bold text-sm tracking-wider drop-shadow-sm">
                      {profile.student_id || 'PS/ITC/20/0000'}
                    </p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="w-[68px] h-[68px] bg-[#ffffff] p-1.5 rounded-xl shadow-md border border-white/20 opacity-95">
                  <img
                    src={`https://quickchart.io/qr?text=${encodeURIComponent(
                      `UCC ID: ${profile.student_id || 'N/A'}\nName: ${profile.name || 'N/A'}\nCourse: ${profile.course || 'N/A'}`
                    )}&margin=1&size=150`}
                    alt="QR Code"
                    className="w-full h-full object-contain mix-blend-multiply"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-end gap-5 relative z-10">
                <div className="w-[4.5rem] h-[4.5rem] rounded-xl overflow-hidden shadow-xl shrink-0 border-2 border-white/40">
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pb-1">
                  <h2 className="text-xl sm:text-[1.35rem] font-black text-white leading-tight mb-0.5 drop-shadow-md break-words line-clamp-2">
                    {profile.name || 'Setup your profile'}
                  </h2>
                  <p className="text-white/90 text-[10px] sm:text-xs font-bold uppercase tracking-wider drop-shadow-sm break-words line-clamp-2 leading-snug">
                    {profile.course || 'Course'} {profile.level && `  L${profile.level}`} {profile.semester && ` Sem ${profile.semester}`}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 opacity-80">
                    <Fingerprint size={12} className="text-white/70" />
                    <span className="text-white font-mono font-bold text-[9px] uppercase tracking-[0.2em] drop-shadow-sm">
                      App ID: {deviceId || 'UNKNOWN'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold text-gray-400">Tap card to edit details</span>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* ── User's Thrift Listings ──────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#002F45] flex items-center justify-center">
              <CreditCard size={17} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Your Listings</h3>
              <p className="text-xs text-gray-400 font-medium">Manage your thrift items</p>
            </div>
          </div>

          {isLoadingThrift ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw size={20} className="animate-spin text-gray-300" />
            </div>
          ) : thriftListings.length > 0 ? (
            <div className="space-y-2">
              {(showAllListings ? thriftListings : thriftListings.slice(0, 3)).map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => {
                    setSelectedListing(listing);
                    setShowManageModal(true);
                  }}
                  className="w-full text-left border border-gray-100 rounded-xl p-4 bg-white hover:bg-gray-50/50 transition-all active:scale-[0.99]"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0 pr-3">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{listing.item_name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">GH₵{listing.price}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {listing.is_sold && (
                        <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">Sold</span>
                      )}
                      {listing.is_featured && !listing.is_sold && (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">Featured</span>
                      )}
                      {!listing.is_sold && !listing.is_featured && isExpiringSoon(listing.expires_at) && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded-full text-[10px] font-bold">Expiring</span>
                      )}
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  </div>
                </button>
              ))}

              {thriftListings.length > 3 && (
                <button
                  onClick={() => setShowAllListings(!showAllListings)}
                  className="w-full text-center text-xs font-bold text-[#002F45] hover:underline py-2"
                >
                  {showAllListings ? 'Show Less' : `Show ${thriftListings.length - 3} More`}
                </button>
              )}

              <button
                onClick={() => navigate('/community?tab=thrift')}
                className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600 py-1"
              >
                Browse all thrift items →
              </button>
            </div>
          ) : (
            <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-400 font-medium">No listings yet</p>
              <button
                onClick={() => navigate('/community?tab=thrift')}
                className="mt-2 text-xs font-bold text-[#002F45] hover:underline"
              >
                Browse thrift items →
              </button>
            </div>
          )}
        </div>

        {/* Promotional Card (Support Project) — NOW routes to /support */}
        <div
          onClick={() => navigate('/support')}
          className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-6 flex items-center justify-between overflow-hidden relative group cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Support the Guide</h3>
            <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed mb-3">
              Help us keep this app free and growing for all students.
            </p>
            <span className="inline-block bg-[#002F45] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
              Read Our Story
            </span>
          </div>
          <div className="relative z-10 w-24 h-24 -mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
            <img src="/Savings.png" alt="Support" className="w-full h-full object-contain drop-shadow-md" />
          </div>
        </div>

        {/* Customize Home */}
        {/* Core Features */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden mt-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6EABC6]/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#002F45]/5 text-[#002F45] flex items-center justify-center">
              <LayoutGrid size={20} />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-gray-900">Core Features</h3>
              <p className="text-[13px] text-gray-500 font-medium">Essential campus tools</p>
            </div>
          </div>

          <div className="space-y-4">
            {coreWidgetToggles.map(({ key, label, Icon }) => (
              <div key={key} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    homeWidgets[key] ? 'bg-[#002F45]/5 text-[#002F45]' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className={`text-[15px] font-medium transition-colors ${
                    homeWidgets[key] ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                  }`}>{label}</span>
                </div>
                <button
                  onClick={() => toggleWidget(key)}
                  className={`relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002F45] focus-visible:ring-offset-2 ${
                    homeWidgets[key] ? 'bg-[#002F45]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      homeWidgets[key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Marketplace UI */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden mt-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6EABC6]/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#002F45]/5 text-[#002F45] flex items-center justify-center">
              <Store size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[17px] font-bold text-gray-900">API Marketplace</h3>
                <span className="text-[11px] font-bold text-[#002F45] bg-[#002F45]/5 px-2 py-0.5 rounded-full">
                  {apiWidgetToggles.filter(w => homeWidgets[w.key]).length} / 3 Active
                </span>
              </div>
              <p className="text-[13px] text-gray-500 font-medium">Select up to 3 live widgets</p>
            </div>
          </div>

          <div className="space-y-4">
            {apiWidgetToggles.map(({ key, label, Icon }) => (
              <div key={key} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    homeWidgets[key] ? 'bg-[#002F45]/5 text-[#002F45]' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className={`text-[15px] font-medium transition-colors ${
                    homeWidgets[key] ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                  }`}>{label}</span>
                </div>
                <button
                  onClick={() => toggleWidget(key)}
                  className={`relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002F45] focus-visible:ring-offset-2 ${
                    homeWidgets[key] ? 'bg-[#002F45]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      homeWidgets[key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Smart Section — Device Identity & Cloud Sync */}
        <div className="space-y-2 pt-2">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">Cloud Sync</h2>

          {/* Device ID Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#002F45]/10 flex items-center justify-center flex-shrink-0">
                <Fingerprint size={20} className="text-[#002F45]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Unique ID</p>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-sm font-black text-[#002F45] tracking-wider">{deviceId}</code>
                  <button
                    onClick={copyDeviceId}
                    className="p-1.5 rounded-lg hover:bg-white text-gray-400 hover:text-[#002F45] transition-colors active:scale-95"
                    title="Copy ID"
                  >
                    {copiedId ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <Cloud size={14} className={getTimeSinceLastSync() ? 'text-green-500' : 'text-gray-300'} />
              <span>
                {getTimeSinceLastSync()
                  ? `Last synced ${getTimeSinceLastSync()}`
                  : 'Not synced yet — will sync automatically'}
              </span>
            </div>
          </div>

          {/* Restore Data */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-sm font-bold text-gray-900 mb-3">Restore from another device</p>
            <p className="text-xs text-gray-500 font-medium mb-3">Enter your old ID and 6-digit PIN to pull your saved data.</p>
            <div className="flex flex-col gap-2.5">
              <input
                type="text"
                value={restoreId}
                onChange={(e) => setRestoreId(e.target.value.toUpperCase())}
                placeholder="UCC-XXXXXXXX"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-[#002F45]/20 focus:border-[#002F45] transition-all placeholder:text-gray-300 placeholder:font-sans placeholder:tracking-normal"
                maxLength={12}
              />
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={restorePin}
                onChange={(e) => setRestorePin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="6-Digit PIN"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-[#002F45]/20 focus:border-[#002F45] transition-all placeholder:text-gray-300 placeholder:tracking-normal text-center"
                maxLength={6}
              />
              <button
                onClick={handleRestore}
                disabled={isRestoring || restoreId.length < 12 || restorePin.length < 6}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  isRestoring
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-[#002F45] text-white hover:bg-[#001a26] shadow-md shadow-[#002F45]/10'
                }`}
              >
                {isRestoring ? <RefreshCw size={16} className="animate-spin" /> : 'Restore Data'}
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Quick Settings Links */}
        <div>
          <h2 className="text-lg font-black text-gray-900 mb-4 px-2">Quick Settings</h2>

          <div className="space-y-1">
            <div className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <Moon size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Dark Mode</span>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${
                  theme === 'dark' ? 'bg-[#002F45]' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <User size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Personal information</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={handleShareApp}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Share2 size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Invite Friends (Share App)</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <div className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <Bell size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">App Notifications</span>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${
                  notificationsEnabled ? 'bg-[#002F45]' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <Lock size={20} className="text-gray-700" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-900 font-medium">GPA Vault PIN Lock</span>
                  <span className="text-[10.5px] text-gray-400 font-medium">Keep your GPA forecasts and scores private</span>
                </div>
              </div>
              <button
                onClick={handleGpaLockToggle}
                className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${
                  isGpaLocked ? 'bg-[#002F45]' : 'bg-gray-200'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  isGpaLocked ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <button
              onClick={() => navigate('/support')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <AboutIcon size={20} className="text-gray-700" />
                <span className="text-[15px] text-gray-900 font-medium">About & Support</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">UCC Contacts & Help</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <CustomSettings size={20} className="text-gray-700" />
                <span className="text-[15px] text-gray-900 font-medium">Full Settings</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/terms')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <FileText size={20} className="text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Terms of Service</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/privacy')}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700"><path d="M14 9V4H5V20H11.0563C11.3838 20.4171 11.7803 20.7847 12.236 21.0848L13.626 22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8V9H14ZM12 11H21V16.949C21 17.9397 20.4987 18.8648 19.6641 19.4144L16.5 21.4978L13.3359 19.4144C12.5013 18.8648 12 17.9397 12 16.949V11ZM14 16.949C14 17.2652 14.1616 17.5634 14.4358 17.744L16.5 19.1032L18.5642 17.744C18.8384 17.5634 19 17.2652 19 16.949V13H14V16.949Z"></path></svg>
                <span className="text-[15px] text-gray-900 font-medium">Privacy Policy</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            {!localStorage.getItem(LS_KEYS.FEEDBACK_SUBMITTED) && (
              <button
                onClick={() => actions?.setShowFeedbackModal(true)}
                className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle size={20} className="text-[#002F45]" strokeWidth={1.5} />
                  <span className="text-[15px] text-gray-900 font-medium">Take Survey Test</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
              </button>
            )}

            <button
              onClick={handleResetCoach}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <CustomCoach size={20} className="text-[#002F45]" />
                <span className="text-[15px] text-gray-900 font-medium">Replay Welcome Guide (Coach)</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={handleClearData}
              className="w-full flex items-center justify-between py-4 group border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <Trash2 size={20} className="text-red-500" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-900 font-medium">Clear App Data</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>
        </div>

        <div className="pt-8 pb-4 text-center">
          <p className="text-xs font-bold text-gray-300 tracking-widest uppercase">UCC Campus Guide v2.0</p>
        </div>

      </div>

      {/* ── Edit Profile Modal ─────────────────────────────────────────── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center sm:items-center sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-t-[2rem] sm:rounded-2xl flex flex-col max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20 rounded-t-[2rem] sm:rounded-2xl shrink-0">
              <h2 className="text-lg font-black text-gray-900 tracking-tight pl-2">Edit Profile</h2>
              <button
                onClick={handleSave}
                className="text-white bg-[#002F45] font-bold px-4 py-1.5 hover:bg-[#001a26] rounded-lg transition-colors active:scale-95"
              >
                Save
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">

              {/* Avatar Edit Section */}
              <div className="flex flex-col items-center justify-center space-y-4 pt-2 pb-8">
                <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
                  <div className="w-28 h-28 rounded-xl bg-white border-4 border-white shadow-xl overflow-hidden transition-transform group-hover:scale-105">
                    <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit3 size={24} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-white text-[#002F45] w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                    <Edit3 size={18} />
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500">Tap to change avatar</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all placeholder:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 054 123 4567"
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Student ID (Index No.)</label>
                    <input
                      type="text"
                      value={formData.student_id || ''}
                      onChange={(e) => setFormData({ ...formData, student_id: e.target.value.toUpperCase() })}
                      placeholder="e.g. PS/ITC/20/0000"
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all placeholder:text-gray-300 uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative z-50">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Course of Study</label>
                  <CourseCombobox
                    value={formData.course}
                    onChange={(val) => setFormData({ ...formData, course: val })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Level</label>
                    <select
                      value={formData.level || ''}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all"
                    >
                      <option value="">Select Level</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                      <option value="500">500</option>
                      <option value="600">600</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Semester</label>
                    <select
                      value={formData.semester || '1'}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-base font-medium focus:outline-none focus:border-[#002F45] focus:ring-1 focus:ring-[#002F45] transition-all"
                    >
                      <option value="1">Sem 1</option>
                      <option value="2">Sem 2</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 pb-20">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
                    isSaving
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <DataLoader className="w-5 h-5 text-gray-400" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── GPA Lock PIN Modal ─────────────────────────────────────────── */}
      {showGpaLockModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900 px-2 flex items-center gap-2">
                <Lock size={18} className="text-[#002F45]" />
                {lockModalMode === 'setup' && 'Set GPA Vault PIN'}
                {lockModalMode === 'confirm' && 'Confirm PIN'}
                {lockModalMode === 'deactivate' && 'Disable GPA Lock'}
              </h2>
              <button
                onClick={() => setShowGpaLockModal(false)}
                className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleGpaLockSubmit} className="p-6 space-y-4">
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {lockModalMode === 'setup' && 'Create a 6-digit passcode to secure your private GPA data.'}
                {lockModalMode === 'confirm' && 'Please re-enter your 6-digit passcode to confirm.'}
                {lockModalMode === 'deactivate' && 'Enter your current 6-digit passcode to disable the vault lock.'}
              </p>

              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                value={lockModalMode === 'confirm' ? pinConfirmInput : pinInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (lockModalMode === 'confirm') {
                    setPinConfirmInput(val);
                  } else {
                    setPinInput(val);
                  }
                }}
                placeholder="••••••"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-[#002F45]/20 focus:border-[#002F45] transition-all placeholder:text-gray-300 placeholder:tracking-normal text-center"
                maxLength={6}
                autoFocus
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGpaLockModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition-colors active:scale-95 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={lockModalMode === 'confirm' ? pinConfirmInput.length < 6 : pinInput.length < 6}
                  className="flex-1 bg-[#002F45] hover:bg-[#001a26] text-white py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm"
                >
                  {lockModalMode === 'setup' && 'Next'}
                  {lockModalMode === 'confirm' && 'Confirm & Lock'}
                  {lockModalMode === 'deactivate' && 'Deactivate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* ── Avatar Selection Modal ─────────────────────────────────────── */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-300 flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900 px-2">Choose Avatar</h2>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <AvatarBuilder
                initialUrl={formData.avatarUrl}
                onSelect={(url) => {
                  setFormData({ ...formData, avatarUrl: url });
                  setIsAvatarModalOpen(false);
                }}
              />
            </div>

          </div>
        </div>
      )}

    </div>

    {/* ── Listing Management Modal ──────────────────────────────────────── */}
    <ListingManageModal
      isOpen={showManageModal}
      onClose={() => setShowManageModal(false)}
      listing={selectedListing}
      onUpdate={(updatedListing) => {
        setThriftListings(prev =>
          prev.map(l => l.id === updatedListing.id ? updatedListing : l)
        );
        setSelectedListing(updatedListing);
      }}
      onDelete={(listingId) => {
        setThriftListings(prev => prev.filter(l => l.id !== listingId));
        setSelectedListing(null);
      }}
    />

    {/* 🧭 Coach Marks Walkthrough */}
    <CoachMarksOverlay 
      storageKey="ucc_coach_profile"
      steps={PROFILE_COACH_STEPS}
    />
    </>
  );
};

const PROFILE_COACH_STEPS = [
  {
    icon: <CustomProfile size={24} />,
    title: 'Your Student ID Card',
    description: 'This screen functions as a digital ID wallet pass. You can tap the card to edit your student details.'
  },
  {
    icon: <CustomSettings size={24} />,
    title: 'Manage Widgets',
    description: 'Decide what appears on your home dashboard by toggling custom widgets on and off.'
  },
  {
    icon: <CustomSafetyCheck size={24} />,
    title: 'Cloud Sync backups',
    description: 'Secure your app progress and timetable logs in the cloud using your unique ID and recovery PIN.'
  },
  {
    icon: <CustomContact size={24} />,
    title: 'Student Help Desk',
    description: 'Get support, report campus issues, or request guidelines through our student portal contact center.'
  }
];

export default Profile;
