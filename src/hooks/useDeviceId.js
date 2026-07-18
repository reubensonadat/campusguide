import { useState, useEffect } from 'react';
import { useCampus } from '../context/CampusContext';

const DEVICE_ID_KEY = 'campus_device_id';
const LEGACY_DEVICE_ID_KEY = 'ucc_device_id';
const LAST_SYNC_KEY = 'campus_last_sync';

export const useDeviceId = () => {
  const { selectedCampus } = useCampus();
  const campusShortName = selectedCampus?.shortName || 'CAMPUS';

  const [deviceId, setDeviceId] = useState(() => {
    // Migrate legacy key if exists
    const legacy = localStorage.getItem(LEGACY_DEVICE_ID_KEY);
    if (legacy && !localStorage.getItem(DEVICE_ID_KEY)) {
      localStorage.setItem(DEVICE_ID_KEY, legacy);
    }

    const existing = localStorage.getItem(DEVICE_ID_KEY);
    if (existing) return existing;

    // Generate new campus-prefixed ID
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(4)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
    const newId = `${campusShortName}-${hex}`;
    localStorage.setItem(DEVICE_ID_KEY, newId);
    return newId;
  });

  const getLastSync = () => {
    const ts = localStorage.getItem(LAST_SYNC_KEY);
    if (!ts) return null;
    if (/^\d+$/.test(ts)) {
      return new Date(parseInt(ts, 10));
    }
    const parsed = new Date(ts);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const setLastSync = (date = new Date()) => {
    localStorage.setItem(LAST_SYNC_KEY, date.toISOString());
  };

  const getTimeSinceLastSync = () => {
    const last = getLastSync();
    if (!last) return null;
    const diffMs = Date.now() - last.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const shouldSync = () => {
    const last = getLastSync();
    if (!last) return true;
    const diffMs = Date.now() - last.getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return diffMs >= twentyFourHours;
  };

  return {
    deviceId,
    getLastSync,
    setLastSync,
    getTimeSinceLastSync,
    shouldSync,
  };
};
