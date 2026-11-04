/**
 * ============================================================================
 * SERVICE WORKER — SUPORTE OFFLINE PWA (PONCE METODOLOGIAS & LÓGICA PURA)
 * ============================================================================
 */

const CACHE_NAME = 'ponce-logica-v11';
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
  './js/curso-logica-extras.js',
  './linguagens/python.html',
  './linguagens/javascript.html',
  './linguagens/java.html',
  './linguagens/c.html',
  './linguagens/cpp.html',
  './linguagens/cobol.html',
  './linguagens/html-css.html',
  './linguagens/sql.html',
  './linguagens/php.html',
  './linguagens/banco-de-dados.html',
  './linguagens/rust-go.html',
  './metodologias/pbl.html',
  './metodologias/tbl.html',
  './metodologias/sala-invertida.html',
  './metodologias/peer-instruction.html',
  './metodologias/estudo-de-caso.html',
  './metodologias/gamificacao.html',
  './metodologias/design-thinking.html',
  './metodologias/steam-maker.html'
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
        // Fallback offline se for navegação HTML
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./curso-logica.html') || caches.match('./index.html');
        }
      });
    })
  );
});
