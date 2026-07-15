import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

const TIER_5 = 'bronze';
const TIER_10 = 'silver';
const TIER_20 = 'gold';

const LEGACY_MAP = {
  bel_cola: 'bronze',
  club_beer: 'silver',
  big_bottle: 'gold',
};

const normalizeTier = (tier) => LEGACY_MAP[tier] || tier;

const getSupporterStatus = () => {
  try {
    const raw = localStorage.getItem('ucc_supporter_status');
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s.tier) s.tier = normalizeTier(s.tier);
    return s;
  } catch {
    return null;
  }
};

const PremiumAccessContext = createContext(null);

export const PremiumAccessProvider = ({ children }) => {
  const [status, setStatus] = useState(getSupporterStatus);
  const [isSyncing, setIsSyncing] = useState(true);

  const syncWithDatabase = useCallback(async () => {
    const userId = localStorage.getItem('ucc_user_id');
    if (!userId) {
      setIsSyncing(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'completed');
        
      if (!error && data && data.length > 0) {
        let totalAmount = 0;
        let highestTier = 'bronze';
        let latestPayment = data[0];
        
        data.forEach(p => {
           totalAmount += Number(p.amount);
           if (p.item_id === 'gold' || Number(p.amount) >= 20) highestTier = 'gold';
           else if (highestTier !== 'gold' && (p.item_id === 'silver' || Number(p.amount) >= 10)) highestTier = 'silver';
        });
        
        const newStatus = {
           isSupporter: true,
           tier: highestTier,
           name: latestPayment.user_name || '',
           phone: latestPayment.user_phone || '',
           amount: totalAmount,
           paymentDate: latestPayment.created_at,
           reference: latestPayment.reference
        };
        localStorage.setItem('ucc_supporter_status', JSON.stringify(newStatus));
        setStatus(newStatus);
      } else if (data && data.length === 0) {
        // We no longer aggressively wipe local storage if DB is empty,
        // because the user might have paid while logged out (anonymous).
        // localStorage.removeItem('ucc_supporter_status');
        // setStatus(null);
      }
    } catch (e) {
      console.error("Failed to sync premium status", e);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const refresh = useCallback(() => {
    setStatus(getSupporterStatus());
  }, []);

  useEffect(() => {
    syncWithDatabase();
    const handler = () => refresh();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [syncWithDatabase, refresh]);

  const tier = status?.tier || null;
  const hasPremiumFeatures = tier === TIER_10 || tier === TIER_20;
  const isSupporter = status?.isSupporter || tier === TIER_5 || hasPremiumFeatures;
  const hasGoldBadge = tier === TIER_20;
  const noAds = isSupporter;
  const supporterName = status?.name || '';
  const supporterAmount = status?.amount || 0;

  const value = {
    tier,
    isSupporter,
    hasPremiumFeatures,
    hasGoldBadge,
    noAds,
    supporterName,
    supporterAmount,
    refresh,
    isSyncing
  };

  return (
    <PremiumAccessContext.Provider value={value}>
      {children}
    </PremiumAccessContext.Provider>
  );
};

export const usePremiumAccess = () => {
  const context = useContext(PremiumAccessContext);
  if (!context) {
    throw new Error('usePremiumAccess must be used within a PremiumAccessProvider');
  }
  return context;
};

export const TIERS = {
  bronze: { 
    id: TIER_5, 
    price: 5, 
    label: 'Bronze Supporter', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-orange-400">
        <path d="M12.0001 8.5L14.1161 13.5875L19.6085 14.0279L15.4239 17.6125L16.7023 22.9721L12.0001 20.1L7.29777 22.9721L8.57625 17.6125L4.3916 14.0279L9.88403 13.5875L12.0001 8.5ZM12.0001 13.707L11.2615 15.4835L9.34505 15.637L10.8051 16.8883L10.3581 18.759L12.0001 17.7564L13.6411 18.759L13.195 16.8883L14.6541 15.637L12.7386 15.4835L12.0001 13.707ZM8.00005 2V11H6.00005V2H8.00005ZM18.0001 2V11H16.0001V2H18.0001ZM13.0001 2V7H11.0001V2H13.0001Z"></path>
      </svg>
    ) 
  },
  silver: { 
    id: TIER_10, 
    price: 10, 
    label: 'Silver Supporter', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-300">
        <path d="M12 6.99999C16.4183 6.99999 20 10.5817 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 10.5817 7.58172 6.99999 12 6.99999ZM12 8.99999C8.68629 8.99999 6 11.6863 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 11.6863 15.3137 8.99999 12 8.99999ZM12 10.5L13.3225 13.1797L16.2798 13.6094L14.1399 15.6953L14.645 18.6406L12 17.25L9.35497 18.6406L9.86012 15.6953L7.72025 13.6094L10.6775 13.1797L12 10.5ZM18 1.99999V4.99999L16.6366 6.13755C15.5305 5.5577 14.3025 5.17884 13.0011 5.04948L13 1.99899L18 1.99999ZM11 1.99899L10.9997 5.04939C9.6984 5.17863 8.47046 5.55735 7.36441 6.13703L6 4.99999V1.99999L11 1.99899Z"></path>
      </svg>
    ) 
  },
  gold: { 
    id: TIER_20, 
    price: 20, 
    label: 'Gold Supporter', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
        <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
      </svg>
    ) 
  },
};

export const saveSupporterStatus = ({ tier, name, phone, amount, reference }) => {
  const data = {
    isSupporter: true,
    tier: normalizeTier(tier),
    name: name || '',
    phone: phone || '',
    amount: amount || 0,
    paymentDate: new Date().toISOString(),
    reference: reference || ''
  };
  localStorage.setItem('ucc_supporter_status', JSON.stringify(data));
  window.dispatchEvent(new Event('storage'));
  return data;
};
