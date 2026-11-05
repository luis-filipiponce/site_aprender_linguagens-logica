/* ==========================================================================
   ACESSO RÁPIDO — atalho flutuante para TODOS os sites/páginas do portal
   - Botão flutuante + painel com busca e links agrupados.
   - Autocontido: injeta o próprio CSS e resolve os caminhos a partir da
     localização deste script (funciona na raiz e em qualquer subpasta).
   - Atalhos: Alt+G abre/fecha | Esc fecha.
   ========================================================================== */
(function () {
  'use strict';

  var script = document.currentScript;
  if (!script || !script.src || document.getElementById('ar-fab')) return;

  // Raiz do portal = pasta pai de /js/
  var raiz = new URL('../', script.src);

  var GRUPOS = [
    { titulo: 'Principal', itens: [
      ['Portal Ponce (início)', 'index.html'],
      ['Curso de Lógica Pura', 'curso-logica.html'],
      ['Banco de Questões', 'questoes.html']
    ] },
    { titulo: 'Linguagens', itens: [
      ['Python', 'linguagens/python.html'],
      ['JavaScript', 'linguagens/javascript.html'],
      ['Java', 'linguagens/java.html'],
      ['C', 'linguagens/c.html'],
      ['C++', 'linguagens/cpp.html'],
      ['COBOL', 'linguagens/cobol.html'],
      ['HTML5 & CSS3', 'linguagens/html-css.html'],
      ['SQL', 'linguagens/sql.html'],
      ['PHP', 'linguagens/php.html'],
      ['Banco de Dados', 'linguagens/banco-de-dados.html'],
      ['Rust & Go', 'linguagens/rust-go.html']
    ] },
    { titulo: 'Metodologias Ativas', itens: [
      ['PBL — Projetos', 'metodologias/pbl.html'],
      ['TBL — Equipes', 'metodologias/tbl.html'],
      ['Sala de Aula Invertida', 'metodologias/sala-invertida.html'],
      ['Peer Instruction', 'metodologias/peer-instruction.html'],
      ['Estudo de Caso', 'metodologias/estudo-de-caso.html'],
      ['Gamificação', 'metodologias/gamificacao.html'],
      ['Design Thinking', 'metodologias/design-thinking.html'],
      ['STEAM & Cultura Maker', 'metodologias/steam-maker.html'],
      ['Guia Essencial de Metodologias', 'guia-metodologias/index.html'],
      ['Metodologia em 5 minutos', 'resumo-metodologia/index.html']
    ] },
    { titulo: 'Aprenda Programação', itens: [
      ['Aprenda Programação (início)', 'aprenda-programacao/index.html'],
      ['Lógica de Programação', 'aprenda-programacao/pages/logica.html'],
      ['Algoritmos', 'aprenda-programacao/pages/algoritmos.html'],
      ['Estruturas de Dados', 'aprenda-programacao/pages/estruturas.html'],
      ['Paradigmas', 'aprenda-programacao/pages/paradigmas.html'],
      ['Linguagens Globais', 'aprenda-programacao/pages/linguagens.html'],
      ['Web, Back-end & Mobile', 'aprenda-programacao/pages/web.html'],
      ['Banco de Dados', 'aprenda-programacao/pages/banco.html'],
      ['Git & DevOps', 'aprenda-programacao/pages/devops.html'],
      ['Roadmap de Carreira', 'aprenda-programacao/pages/carreira.html']
    ] }
  ];

  var CSS =
    '.ar-fab{position:fixed;right:1.2rem;bottom:5.5rem;z-index:100001;display:flex;align-items:center;gap:.4rem;' +
    'padding:.65rem 1rem;border:0;border-radius:999px;background:#6366f1;color:#fff;font:700 .85rem/1 system-ui,-apple-system,"Segoe UI",sans-serif;' +
    'cursor:pointer;box-shadow:0 4px 16px rgba(99,102,241,.45)}' +
    '.ar-fab:hover{background:#4f46e5}' +
    '.ar-fab:focus-visible,.ar-panel a:focus-visible,.ar-busca:focus-visible,.ar-fechar:focus-visible{outline:3px solid #fbbf24;outline-offset:2px}' +
    '.ar-overlay{position:fixed;inset:0;z-index:100002;background:rgba(15,23,42,.6);display:none;align-items:center;justify-content:center;padding:1rem}' +
    '.ar-overlay.ar-aberto{display:flex}' +
    '.ar-panel{width:min(760px,100%);max-height:85vh;display:flex;flex-direction:column;background:#0f172a;color:#e6ebf5;' +
    'border:1px solid #334155;border-radius:14px;box-shadow:0 20px 50px rgba(0,0,0,.5);font:400 .9rem/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.ar-topo{display:flex;gap:.6rem;align-items:center;padding:.9rem 1rem;border-bottom:1px solid #334155}' +
    '.ar-topo strong{font-size:1rem;white-space:nowrap}' +
    '.ar-busca{flex:1;min-width:0;padding:.55rem .75rem;border-radius:8px;border:1px solid #475569;background:#1e293b;color:#e6ebf5;font:inherit}' +
    '.ar-fechar{border:0;background:#334155;color:#e6ebf5;border-radius:8px;padding:.5rem .75rem;cursor:pointer;font:inherit}' +
    '.ar-corpo{overflow:auto;padding:.5rem 1rem 1rem}' +
    '.ar-grupo h3{margin:1rem 0 .4rem;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8}' +
    '.ar-lista{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:.4rem}' +
    '.ar-panel a{display:block;padding:.5rem .7rem;border-radius:8px;background:#1e293b;color:#e6ebf5;text-decoration:none;border:1px solid transparent}' +
    '.ar-panel a:hover{border-color:#6366f1;background:#273449}' +
    '.ar-panel a[aria-current="page"]{border-color:#6366f1;color:#a5b4fc;font-weight:700}' +
    '.ar-vazio{padding:1.2rem 0;color:#94a3b8}' +
    '@media (max-width:600px){.ar-fab{bottom:4.5rem;right:.8rem}.ar-fab span{display:none}}';

  var estilo = document.createElement('style');
  estilo.textContent = CSS;
  document.head.appendChild(estilo);

  function mesmaPagina(url) {
    var a = url.pathname.replace(/index\.html$/, '');
    var b = location.pathname.replace(/index\.html$/, '');
    return a === b;
  }

  function el(tag, cls, texto) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texto) e.textContent = texto;
    return e;
  }

  // --- Botão flutuante ---
  var fab = el('button', 'ar-fab');
  fab.id = 'ar-fab';
  fab.type = 'button';
  fab.setAttribute('aria-haspopup', 'dialog');
  fab.setAttribute('aria-expanded', 'false');
  fab.title = 'Acesso rápido a todos os sites (Alt+G)';
  fab.appendChild(el('b', '', '⚡'));
  fab.appendChild(el('span', '', 'Acesso rápido'));

  // --- Painel ---
  var overlay = el('div', 'ar-overlay');
  var painel = el('div', 'ar-panel');
  painel.setAttribute('role', 'dialog');
  painel.setAttribute('aria-modal', 'true');
  painel.setAttribute('aria-label', 'Acesso rápido a todos os sites');

  var topo = el('div', 'ar-topo');
  var busca = el('input', 'ar-busca');
  busca.type = 'search';
  busca.placeholder = 'Filtrar páginas…';
  busca.setAttribute('aria-label', 'Filtrar páginas');
  busca.autocomplete = 'off';
  var fechar = el('button', 'ar-fechar', 'Fechar');
  fechar.type = 'button';
  topo.appendChild(el('strong', '', '⚡ Acesso rápido'));
  topo.appendChild(busca);
  topo.appendChild(fechar);

  var corpo = el('div', 'ar-corpo');
  var vazio = el('p', 'ar-vazio', 'Nenhuma página encontrada.');
  vazio.hidden = true;
  var grupos = [];

  GRUPOS.forEach(function (g) {
    var sec = el('section', 'ar-grupo');
    sec.appendChild(el('h3', '', g.titulo));
    var ul = el('ul', 'ar-lista');
    var itens = [];
    g.itens.forEach(function (it) {
      var url = new URL(it[1], raiz);
      var li = el('li');
      var a = el('a', '', it[0]);
      a.href = url.href;
      if (mesmaPagina(url)) a.setAttribute('aria-current', 'page');
      li.appendChild(a);
      ul.appendChild(li);
      itens.push({ li: li, texto: (it[0] + ' ' + g.titulo).toLowerCase() });
    });
    sec.appendChild(ul);
    corpo.appendChild(sec);
    grupos.push({ sec: sec, itens: itens });
  });
  corpo.appendChild(vazio);

  painel.appendChild(topo);
  painel.appendChild(corpo);
  overlay.appendChild(painel);

  function filtrar() {
    var q = busca.value.trim().toLowerCase();
    var total = 0;
    grupos.forEach(function (g) {
      var visiveis = 0;
      g.itens.forEach(function (i) {
        var ok = !q || i.texto.indexOf(q) !== -1;
        i.li.hidden = !ok;
        if (ok) visiveis++;
      });
      g.sec.hidden = visiveis === 0;
      total += visiveis;
    });
    vazio.hidden = total !== 0;
  }

  function abrir() {
    overlay.classList.add('ar-aberto');
    fab.setAttribute('aria-expanded', 'true');
    busca.value = '';
    filtrar();
    busca.focus();
  }

  function fecharPainel() {
    overlay.classList.remove('ar-aberto');
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }

  function aberto() { return overlay.classList.contains('ar-aberto'); }

  fab.addEventListener('click', function () { aberto() ? fecharPainel() : abrir(); });
  fechar.addEventListener('click', fecharPainel);
  busca.addEventListener('input', filtrar);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) fecharPainel(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && aberto()) { fecharPainel(); return; }
    if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === 'g' || e.key === 'G')) {
      e.preventDefault();
      aberto() ? fecharPainel() : abrir();
    }
  });

  function montar() {
    document.body.appendChild(fab);
    document.body.appendChild(overlay);
  }
  if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
})();
