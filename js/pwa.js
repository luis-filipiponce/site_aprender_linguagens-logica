/**
 * Registro único do Service Worker + aviso de nova versão.
 * Carregado por index.html, curso-logica.html e questoes.html.
 * Não usa HTML inline nem handlers inline (compatível com CSP restritiva).
 */
(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) return;
  var h = window.location.hostname;
  var contextoSeguro = window.location.protocol === 'https:' || h === 'localhost' || h === '127.0.0.1';
  if (!contextoSeguro) return;

  // Só há "atualização" quando a página já estava sob controle de um SW anterior
  var jaTinhaControlador = !!navigator.serviceWorker.controller;
  var avisoMostrado = false;

  function mostrarAviso() {
    if (avisoMostrado || !document.body) return;
    avisoMostrado = true;

    var barra = document.createElement('div');
    barra.setAttribute('role', 'status');
    barra.setAttribute('aria-live', 'polite');
    barra.style.cssText = 'position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:10000;' +
      'display:flex;gap:.75rem;align-items:center;padding:.7rem 1rem;border-radius:10px;' +
      'background:#1e1b4b;color:#fff;font:600 .9rem system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.3);max-width:92vw;';

    var texto = document.createElement('span');
    texto.textContent = 'Nova versão do site disponível.';

    var recarregar = document.createElement('button');
    recarregar.type = 'button';
    recarregar.textContent = 'Recarregar';
    recarregar.style.cssText = 'background:#6366f1;color:#fff;border:0;border-radius:6px;padding:.4rem .8rem;font-weight:700;cursor:pointer;';
    recarregar.addEventListener('click', function () { window.location.reload(); });

    var fechar = document.createElement('button');
    fechar.type = 'button';
    fechar.textContent = 'Depois';
    fechar.setAttribute('aria-label', 'Dispensar aviso de atualização');
    fechar.style.cssText = 'background:transparent;color:#c7d2fe;border:0;cursor:pointer;font-weight:600;';
    fechar.addEventListener('click', function () { barra.remove(); });

    barra.appendChild(texto);
    barra.appendChild(recarregar);
    barra.appendChild(fechar);
    document.body.appendChild(barra);
  }

  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (jaTinhaControlador) mostrarAviso();
  });

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js').catch(function (err) {
      console.warn('[PWA] Falha ao registrar o Service Worker:', err && err.name);
    });
  });
})();
