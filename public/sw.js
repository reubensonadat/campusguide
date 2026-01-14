// Service Worker for UCC Campus Guide
const CACHE_NAME = 'ucc-guide-v4-fix';
const urlsToCache = [
    '/',
    '/index.html',
    '/logo.png',
    '/favicon.ico',
    '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Cache installation failed:', error);
            })
    );
    self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests and non-http schemes (like chrome-extension)
    if (!event.request.url.startsWith(self.location.origin) ||
        !event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // Return offline page if available for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Function to track PWA visits
function trackVisit() {
    // Get the current origin
    const origin = self.location.origin;

    // Add a timestamp to ensure the request isn't cached
    const timestamp = Date.now();

    // Ping the homepage with a tracking parameter
    // Cloudflare Web Analytics will count this as a visit
    const trackingUrl = `${origin}/?pwa_visit=1&t=${timestamp}`;

    // Send a fetch request to track the visit
    fetch(trackingUrl, {
        method: 'GET',
        mode: 'no-cors', // Use no-cors to avoid CORS issues
        cache: 'no-cache',
        headers: {
            'X-PWA-Visit': 'true'
        }
    }).catch((error) => {
        // Silently fail if tracking doesn't work
        console.log('Visit tracking failed:', error);
    });
}

// Activate event - clean up old caches and track visit
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Track visit when service worker activates
            trackVisit();
        })
    );
    self.clients.claim();
});

// Listen for messages from the client to track visits
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'TRACK_VISIT') {
        trackVisit();
    }
});
