/**
 * ============================================================================
 * SERVICE WORKER â€” SUPORTE OFFLINE PWA (PONCE METODOLOGIAS & LÃ“GICA PURA)
 * ============================================================================
 */

const CACHE_NAME = 'ponce-logica-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './curso-logica.html',
  './questoes.html',
  './manifest.json',
  './css/style.css',
  './css/curso-logica.css',
  './css/interfaces.css',
  './css/questoes.css',
  './js/questoes.js',
  './js/questoes-dados.js',
  './js/app.js',
  './js/curso-logica.js',
  './js/curso-logica-dados.js',
  './js/curso-logica-extras.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback offline se for navegaÃ§Ã£o HTML
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./curso-logica.html') || caches.match('./index.html');
        }
      });
    })
  );
});
