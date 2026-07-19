// src/hooks/useProfile.js
//
// Reads/writes the ucc_profile localStorage key.
// This is the SINGLE SOURCE OF TRUTH for level + semester.
// Every semester-scoped tool reads from this hook.

import { useState, useCallback, useEffect } from 'react';

const PROFILE_KEY = 'ucc_profile';

const DEFAULT_PROFILE = {
  name: '',
  phone: '',
  level: '100',
  semester: '1',
  user_id: null,
  id: null,
};

function readProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    const parsed = JSON.parse(raw);
    // Ensure level and semester always have defaults
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      level: parsed.level || DEFAULT_PROFILE.level,
      semester: parsed.semester || DEFAULT_PROFILE.semester,
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

function writeProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  // Dispatch a custom event so other components/hooks can react
  window.dispatchEvent(new CustomEvent('profile-updated', { detail: profile }));
}

export default function useProfile() {
  const [profile, setProfileState] = useState(readProfile);

  // Listen for profile updates from OTHER components (e.g. Profile page, Timetable toggle)
  useEffect(() => {
    const handler = (e) => {
      setProfileState(e.detail || readProfile());
    };
    window.addEventListener('profile-updated', handler);
    return () => window.removeEventListener('profile-updated', handler);
  }, []);

  // Also listen for native storage events (cross-tab sync)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === PROFILE_KEY) {
        setProfileState(readProfile());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const setProfile = useCallback((updater) => {
    setProfileState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const merged = { ...prev, ...next };
      writeProfile(merged);
      return merged;
    });
  }, []);

  return [profile, setProfile];
}
