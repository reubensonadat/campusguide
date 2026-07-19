// ─────────────────────────────────────────────────────────────────────────────
// notificationService — provider-agnostic push wrapper
//   - Default provider: OneSignal
//   - Swap: pass a different provider at init (e.g. FCM adapter)
//   - NEVER crashes — every public method is guarded.
//   - On iOS PWA where push isn't supported, all calls degrade silently.
// ─────────────────────────────────────────────────────────────────────────────

// ── OneSignal provider (default) ─────────────────────────────────────────
// Could be swapped at init() for Firebase, etc.

let OneSignal = null;

async function _loadOneSignal() {
  if (OneSignal) return true;
  try {
    const mod = await import('react-onesignal');
    OneSignal = mod.default || mod;
    return true;
  } catch {
    return false;
  }
}

const OneSignalProvider = {
  name: 'onesignal',

  async init(appId) {
    if (!(await _loadOneSignal())) return false;
    try {
      await OneSignal.init({
        appId,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: { enable: false },
      });
      return true;
    } catch {
      return false;
    }
  },

  isReady() {
    return !!(OneSignal && window.OneSignal && window.OneSignal.User);
  },

  tagUser(userId, profile = {}) {
    const u = window.OneSignal.User;
    u.addTag('user_id', userId);
    if (profile.level) u.addTag('level', String(profile.level));
    if (profile.course) u.addTag('course', String(profile.course));
    if (profile.semester) u.addTag('semester', String(profile.semester));
  },

  addTag(key, value) {
    window.OneSignal.User.addTag(key, value);
  },

  clearUser() {
    const u = window.OneSignal.User;
    u.removeTag('user_id');
    u.removeTag('level');
    u.removeTag('course');
    u.removeTag('semester');
  },

  isPushSupported() {
    return !!(window.OneSignal && window.OneSignal.User && window.OneSignal.User.PushSubscription);
  },

  getSubscriptionState() {
    return window.OneSignal.User.PushSubscription.optedIn === true;
  },

  async subscribe() {
    await OneSignal.Notifications.requestPermission();
    OneSignal.User.PushSubscription.optIn();
  },

  unsubscribe() {
    OneSignal.User.PushSubscription.optOut();
  },

  onSubscriptionChange(callback) {
    OneSignal.User.PushSubscription.addEventListener('change', (e) => {
      callback(e?.current?.optedIn === true);
    });
  },
};

// ── FCM adapter slot — ready to wire ────────────────────────────────────
// When you want to migrate:
//   1. npm install firebase
//   2. Uncomment and populate this object
//   3. Pass it to init({ provider: FcmProvider, ...config })
//
// const FcmProvider = {
//   name: 'fcm',
//
//   async init({ vapidKey, serviceWorkerRegistration }) {
//     const { initializeApp } = await import('firebase/app');
//     const { getMessaging, getToken, onMessage } = await import('firebase/messaging');
//     const app = initializeApp({ ... });
//     const messaging = getMessaging(app);
//     // ... store messaging instance, request permission, get FCM token
//     return true;
//   },
//
//   isReady() { ... },
//   tagUser(userId, profile) { /* FCM doesn't have tags; send token to your server */ },
//   addTag(key, value) {},
//   clearUser() {},
//   isPushSupported() { return true },
//   getSubscriptionState() { ... },
//   async subscribe() { ... },
//   unsubscribe() { ... },
//   onSubscriptionChange(cb) { ... },
// };

// ── Provider registry ────────────────────────────────────────────────────
const PROVIDERS = {
  onesignal: OneSignalProvider,
};

// ── Service ──────────────────────────────────────────────────────────────

class NotificationService {
  constructor() {
    this._provider = null;
    this._fatal = false;
  }

  /**
   * Initialize the push provider.
   *
   * @param {string}  appId        - OneSignal App ID (or FCM config)
   * @param {string}  [provider]   - 'onesignal' (default) or a custom provider
   */
  async init(appId, provider = 'onesignal') {
    if (this._fatal) return;

    // Resolve provider — either a built-in name or a custom adapter object
    if (typeof provider === 'string') {
      const builtIn = PROVIDERS[provider];
      if (!builtIn) { this._fatal = true; return; }
      this._provider = builtIn;
    } else if (provider && typeof provider.init === 'function') {
      this._provider = provider;
    } else {
      this._fatal = true;
      return;
    }

    const ok = await this._provider.init(appId);
    if (!ok) {
      this._fatal = true;
      this._provider = null;
    }
  }

  // ── Guard ──────────────────────────────────────────────────────────────

  _guard() {
    if (this._fatal) return false;
    return !!(this._provider && this._provider.isReady());
  }

  // ── Public API (all guarded — never throws) ────────────────────────────

  tagUser(userId, profile = {}) {
    try { if (this._guard()) this._provider.tagUser(userId, profile); } catch {}
  }

  addTag(key, value) {
    try { if (this._guard()) this._provider.addTag(key, value); } catch {}
  }

  clearUser() {
    try { if (this._guard()) this._provider.clearUser(); } catch {}
  }

  isPushSupported() {
    try { return !!(this._provider && this._provider.isPushSupported()); } catch { return false; }
  }

  getSubscriptionState() {
    try { return this._guard() ? this._provider.getSubscriptionState() : false; } catch { return false; }
  }

  async subscribe() {
    if (!this._guard()) return;
    try {
      await this._provider.subscribe();
    } catch (e) {
      const isLocal = window.location.hostname === 'localhost' ||
                      window.location.hostname === '127.0.0.1';
      throw new Error(isLocal
        ? 'OneSignal cannot run on localhost without configuration. Test on your live deployed site.'
        : 'Notification system not initialized yet or blocked by browser.');
    }
  }

  unsubscribe() {
    try { if (this._guard()) this._provider.unsubscribe(); } catch {}
  }

  onSubscriptionChange(callback) {
    try { if (this._guard()) this._provider.onSubscriptionChange(callback); } catch {}
  }
}

const notificationService = new NotificationService();
export default notificationService;

// ── Legacy Browser Notification API helpers ─────────────────────────────

export const requestNotificationPermission = async () => {
  try {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
  } catch {}
  return false;
};

export const isNotificationSupported = () => {
  try { return 'Notification' in window && Notification.permission === 'granted'; } catch { return false; }
};

export const showNotification = (title, options = {}) => {
  try {
    if (isNotificationSupported()) {
      return new Notification(title, { icon: '/logo.png', badge: '/logo.png', ...options });
    }
  } catch {}
  return null;
};

export const scheduleNotification = (title, options, delay) => {
  try {
    if (!isNotificationSupported()) return null;
    return setTimeout(() => { try { showNotification(title, options); } catch {} }, delay);
  } catch { return null; }
};

export const showReminderNotification = (reminder) => {
  try {
    return showNotification(`Reminder: ${reminder.title}`, {
      body: `Due: ${new Date(reminder.dueDate).toLocaleDateString()}`,
      tag: reminder.id,
      requireInteraction: true,
    });
  } catch { return null; }
};
