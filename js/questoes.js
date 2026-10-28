/**
 * Renderiza o banco de questões (js/questoes-dados.js) e controla
 * verificação, placar por nível e persistência de progresso.
 * Todo conteúdo é inserido via textContent (sem innerHTML).
 */
(function () {
  "use strict";

  var BANCO = window.QUESTOES_BANCO;
  var NIVEIS = ["iniciante", "intermediario", "avancado", "expert"];
  var CHAVE = "ponce_questoes_progresso_v1";
  var LETRAS = ["a", "b", "c", "d", "e"];

  var nivelAtual = "iniciante";
  var progresso = carregar();

  function carregar() {
    try {
      var bruto = JSON.parse(localStorage.getItem(CHAVE) || "{}");
      return bruto && typeof bruto === "object" ? bruto : {};
    } catch (e) {
      return {};
    }
  }

  function salvar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(progresso));
    } catch (e) { /* armazenamento indisponível: segue sem persistir */ }
  }

  function el(tag, classe, texto) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto !== undefined) n.textContent = texto;
    return n;
  }

  function respostasDo(nivel) {
    if (!progresso[nivel] || typeof progresso[nivel] !== "object") progresso[nivel] = {};
    return progresso[nivel];
  }

  function placar(nivel) {
    var r = respostasDo(nivel);
    var qs = BANCO[nivel].questoes;
    var respondidas = 0, acertos = 0;
    qs.forEach(function (q, i) {
      if (typeof r[i] === "number") {
        respondidas++;
        if (r[i] === q.c) acertos++;
      }
    });
    return { respondidas: respondidas, acertos: acertos, total: qs.length };
  }

  function atualizarPlacar() {
    var p = placar(nivelAtual);
    document.getElementById("qz-acertos").textContent = String(p.acertos);
    document.getElementById("qz-respondidas").textContent = String(p.respondidas);
    document.getElementById("qz-total").textContent = String(p.total);
    document.getElementById("qz-barra").style.width = (p.total ? (p.respondidas / p.total) * 100 : 0) + "%";
    NIVEIS.forEach(function (n) {
      var b = document.getElementById("qz-tab-" + n);
      if (b) {
        var pn = placar(n);
        b.querySelector(".qz-tab-count").textContent = pn.respondidas + "/" + pn.total;
      }
    });
  }

  function aplicarResultado(card, q, escolhida) {
    card.classList.add("respondida");
    var opcoes = card.querySelectorAll(".qz-opt");
    opcoes.forEach(function (lbl, idx) {
      var input = lbl.querySelector("input");
      input.disabled = true;
      if (idx === q.c) lbl.classList.add("opt-correta");
      else if (idx === escolhida) lbl.classList.add("opt-errada");
    });
    var fb = card.querySelector(".qz-feedback");
    var ok = escolhida === q.c;
    fb.className = "qz-feedback " + (ok ? "fb-ok" : "fb-erro");
    fb.textContent = ok ? "Correto!" : "Incorreto. A resposta certa é a alternativa " + LETRAS[q.c] + ").";
    card.querySelector(".qz-explicacao").style.display = "block";
    card.querySelector(".qz-verificar").disabled = true;
  }

  function criarCard(nivel, idx, q) {
    var card = el("article", "qz-card");
    var nome = "q-" + nivel + "-" + idx;

    var meta = el("div", "qz-meta");
    meta.appendChild(el("span", "qz-tag", q.tag));
    meta.appendChild(el("span", "qz-num", "Q" + String(idx + 1).padStart(2, "0")));
    card.appendChild(meta);

    card.appendChild(el("p", "qz-enunciado", q.q));
    if (q.code) card.appendChild(el("pre", "qz-code", q.code));

    var lista = el("div", "qz-opts");
    q.o.forEach(function (texto, i) {
      var lbl = el("label", "qz-opt");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = nome;
      input.value = String(i);
      lbl.appendChild(input);
      lbl.appendChild(el("span", null, LETRAS[i] + ") " + texto));
      lista.appendChild(lbl);
    });
    card.appendChild(lista);

    var btn = el("button", "qz-verificar", "Verificar");
    btn.type = "button";
    btn.addEventListener("click", function () {
      var marcada = card.querySelector("input:checked");
      var fb = card.querySelector(".qz-feedback");
      if (!marcada) {
        fb.className = "qz-feedback fb-aviso";
        fb.textContent = "Selecione uma alternativa antes de verificar.";
        return;
      }
      var escolhida = parseInt(marcada.value, 10);
      respostasDo(nivel)[idx] = escolhida;
      salvar();
      aplicarResultado(card, q, escolhida);
      atualizarPlacar();
    });
    card.appendChild(btn);

    card.appendChild(el("div", "qz-feedback"));
    card.appendChild(el("div", "qz-explicacao", "Explicação: " + q.e));

    var salva = respostasDo(nivel)[idx];
    if (typeof salva === "number" && salva >= 0 && salva < q.o.length) {
      var rad = card.querySelector('input[value="' + salva + '"]');
      if (rad) rad.checked = true;
      aplicarResultado(card, q, salva);
    }
    return card;
  }

  function renderizarNivel(nivel) {
    nivelAtual = nivel;
    var dados = BANCO[nivel];
    document.getElementById("qz-intro").textContent = dados.intro;
    var lista = document.getElementById("qz-lista");
    lista.textContent = "";
    dados.questoes.forEach(function (q, i) {
      lista.appendChild(criarCard(nivel, i, q));
    });
    NIVEIS.forEach(function (n) {
      var b = document.getElementById("qz-tab-" + n);
      if (b) b.classList.toggle("ativa", n === nivel);
    });
    atualizarPlacar();
  }

  function reiniciar() {
    delete progresso[nivelAtual];
    salvar();
    renderizarNivel(nivelAtual);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function iniciar() {
    if (!BANCO) return;
    var abas = document.getElementById("qz-abas");
    NIVEIS.forEach(function (n) {
      var b = el("button", "qz-tab");
      b.type = "button";
      b.id = "qz-tab-" + n;
      b.appendChild(el("span", "qz-tab-nome", BANCO[n].rotulo));
      b.appendChild(el("span", "qz-tab-count", "0/" + BANCO[n].questoes.length));
      b.addEventListener("click", function () { renderizarNivel(n); });
      abas.appendChild(b);
    });
    document.getElementById("qz-reiniciar").addEventListener("click", reiniciar);

    var hash = (location.hash || "").replace("#", "");
    renderizarNivel(NIVEIS.indexOf(hash) >= 0 ? hash : "iniciante");
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
