/**
 * ============================================================================
 * SERVICE WORKER — SUPORTE OFFLINE PWA (PONCE METODOLOGIAS & LÓGICA PURA)
 * ============================================================================
 */

// CACHE_NAME é atualizado automaticamente por scripts/versionar-sw.mjs (npm run build)
const CACHE_NAME = 'ponce-logica-5f0d06f300';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './curso-logica.html',
  './questoes.html',
  './offline.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './css/style.css',
  './css/curso-logica.css',
  './css/interfaces.css',
  './css/questoes.css',
  './css/cookies.css',
  './js/cookies.js',
  './js/pwa.js',
  './js/questoes.js',
  './js/questoes-dados.js',
  './js/app.js',
  './js/curso-logica.js',
  './js/curso-logica-dados.js',
  './js/curso-logica-extras.js',
  './js/figuras-modulos.js',
  './js/acesso-rapido.js',
  './img/modulos/modulo-01.svg',
  './img/modulos/modulo-02.svg',
  './img/modulos/modulo-03.svg',
  './img/modulos/modulo-04.svg',
  './img/modulos/modulo-05.svg',
  './img/modulos/modulo-06.svg',
  './img/modulos/modulo-07.svg',
  './img/modulos/modulo-08.svg',
  './img/modulos/modulo-09.svg',
  './img/modulos/modulo-10.svg',
  './img/modulos/modulo-11.svg',
  './img/modulos/modulo-12.svg',
  './img/modulos/modulo-13.svg',
  './img/modulos/modulo-14.svg',
  './img/modulos/modulo-15.svg',
  './img/modulos/modulo-16.svg',
  './img/modulos/modulo-17.svg',
  './img/modulos/modulo-18.svg',
  './img/modulos/modulo-19.svg',
  './img/modulos/modulo-20.svg',
  './img/modulos/modulo-21.svg',
  './img/modulos/modulo-22.svg',
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
  './metodologias/steam-maker.html',
  './aprenda-programacao/index.html',
  './aprenda-programacao/css/global.css',
  './aprenda-programacao/css/home.css',
  './aprenda-programacao/js/main.js',
  './aprenda-programacao/pages/algoritmos.html',
  './aprenda-programacao/pages/banco.html',
  './aprenda-programacao/pages/carreira.html',
  './aprenda-programacao/pages/devops.html',
  './aprenda-programacao/pages/estruturas.html',
  './aprenda-programacao/pages/linguagens.html',
  './aprenda-programacao/pages/logica.html',
  './aprenda-programacao/pages/paradigmas.html',
  './aprenda-programacao/pages/web.html',
  './guia-metodologias/index.html',
  './guia-metodologias/style.css',
  './resumo-metodologia/index.html',
  './resumo-metodologia/style.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Tolerante a falhas: um recurso ausente nao derruba a instalacao inteira
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => cache.add(url))
      );
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

// Stale-while-revalidate: responde do cache e atualiza em segundo plano
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  const isHtml = request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: isHtml });

    const networkFetch = fetch(request).then((response) => {
      if (response && response.status === 200 && response.type === 'basic') {
        cache.put(request, response.clone());
      }
      return response;
    });

    if (cached) {
      // Atualiza em segundo plano; falhas de rede sao ignoradas
      event.waitUntil(networkFetch.catch(() => {}));
      return cached;
    }

    try {
      return await networkFetch;
    } catch (_) {
      if (isHtml) {
        return (await caches.match('./offline.html')) ||
               (await caches.match('./index.html')) ||
               Response.error();
      }
      return Response.error();
    }
  })());
});
