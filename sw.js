const CACHE_NAME = 'notary-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/book.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For API requests, try network first, fall back to offline
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response
          const clonedResponse = response.clone();
          
          // Cache successful responses
          if (response.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clonedResponse);
            });
          }
          
          return response;
        })
        .catch(() => {
          // Return cached response if available, otherwise offline page
          return caches.match(event.request)
            .then(cachedResponse => cachedResponse || new Response('Offline'));
        })
    );
  } else {
    // For regular assets, use cache first, fall back to network
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request)
            .then(response => {
              // Don't cache non-200 responses
              if (!response || response.status !== 200) {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            });
        })
        .catch(() => {
          // Return a fallback page if offline
          return caches.match('/index.html');
        })
    );
  }
});

// Background sync for pending bookings
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-bookings') {
    event.waitUntil(syncBookings());
  }
});

async function syncBookings() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('/api/bookings')) {
        try {
          await fetch(request.clone());
        } catch (error) {
          console.log('Failed to sync booking:', error);
        }
      }
    }
  } catch (error) {
    console.log('Sync error:', error);
  }
}
