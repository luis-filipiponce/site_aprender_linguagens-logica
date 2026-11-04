/**
 * Renderiza o banco de questões (js/questoes-dados.js) e controla
 * verificação, diagnóstico completo por nível, placar e persistência.
 * Todo conteúdo é inserido via textContent e manipulação de DOM segura (sem innerHTML).
 */
(function () {
  "use strict";

  var BANCO = window.QUESTOES_BANCO;
  var NIVEIS = ["iniciante", "intermediario", "avancado", "expert"];
  var CHAVE = "ponce_questoes_progresso_v1";
  var LETRAS = ["a", "b", "c", "d", "e"];

  var nivelAtual = "iniciante";
  var progresso = carregar();
  var filtroDiagnostico = "todos";
  var gavetasAbertas = {};

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
    if (texto !== undefined && texto !== null) n.textContent = texto;
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
    var elAcertos = document.getElementById("qz-acertos");
    var elRespondidas = document.getElementById("qz-respondidas");
    var elTotal = document.getElementById("qz-total");
    var elBarra = document.getElementById("qz-barra");

    if (elAcertos) elAcertos.textContent = String(p.acertos);
    if (elRespondidas) elRespondidas.textContent = String(p.respondidas);
    if (elTotal) elTotal.textContent = String(p.total);
    if (elBarra) elBarra.style.width = (p.total ? (p.respondidas / p.total) * 100 : 0) + "%";

    NIVEIS.forEach(function (n) {
      var b = document.getElementById("qz-tab-" + n);
      if (b) {
        var pn = placar(n);
        var cnt = b.querySelector(".qz-tab-count");
        if (cnt) cnt.textContent = pn.respondidas + "/" + pn.total;
      }
    });
  }

  /**
   * Extrai e formata com precisão a Ideia Principal e a Linha de Raciocínio de uma questão.
   */
  function obterAnaliseQuestao(q) {
    if (q.ideiaPrincipal && q.linhaRaciocinio) {
      return {
        ideiaPrincipal: q.ideiaPrincipal,
        linhaRaciocinio: q.linhaRaciocinio,
        gabaritoTexto: LETRAS[q.c].toUpperCase() + ") " + (q.o[q.c] || ""),
        complemento: q.e || ""
      };
    }

    var texto = (q.e || "").trim();
    var sentencas = texto.split(/(?<=[.!?])\s+/).filter(function (s) { return s.length > 0; });
    var ideia = "";
    var raciocinio = "";
    var complemento = "Alternativa correta: " + LETRAS[q.c].toUpperCase() + ") " + (q.o[q.c] || "");

    if (sentencas.length === 0) {
      ideia = "Conceito fundamental de " + q.tag + ".";
      raciocinio = "A alternativa correta é " + LETRAS[q.c].toUpperCase() + ") " + q.o[q.c] + ".";
    } else if (sentencas.length === 1) {
      var sUnica = sentencas[0];
      var ehCalc = /^(x começa|trace:|i =|soma =|\d+!|\d+ %|\d+ \+|termo|índice|ao fazer)/i.test(sUnica);
      if (ehCalc) {
        ideia = "Resolução prática e avaliação de estado em " + q.tag + ".";
        raciocinio = sUnica;
      } else {
        ideia = sUnica;
        raciocinio = "Analisando as premissas e a regra lógica do tópico, concluímos que a opção válida é a alternativa " + LETRAS[q.c].toUpperCase() + ").";
      }
    } else {
      var s1 = sentencas[0];
      var sResto = sentencas.slice(1).join(" ");
      var ehCalculoDireto = /^(x começa|trace:|i =|soma =|\d+!|\d+ %|\d+ \+|termo|índice|ao fazer)/i.test(s1);

      if (ehCalculoDireto) {
        var ultima = sentencas[sentencas.length - 1];
        var intermediarias = sentencas.slice(0, sentencas.length - 1).join(" ");
        ideia = ultima;
        raciocinio = intermediarias;
      } else {
        ideia = s1;
        raciocinio = sResto;
      }
    }

    return {
      ideiaPrincipal: ideia,
      linhaRaciocinio: raciocinio,
      gabaritoTexto: LETRAS[q.c].toUpperCase() + ") " + (q.o[q.c] || ""),
      complemento: complemento
    };
  }

  function preencherExplicacaoCard(container, q) {
    container.textContent = "";
    var analise = obterAnaliseQuestao(q);

    var blocoIdeia = el("div", "qz-bloco-analise qz-bloco-ideia");
    var rotIdeia = el("strong", "qz-rotulo-ideia", "💡 Ideia Principal: ");
    blocoIdeia.appendChild(rotIdeia);
    blocoIdeia.appendChild(document.createTextNode(analise.ideiaPrincipal));
    container.appendChild(blocoIdeia);

    var blocoRaciocinio = el("div", "qz-bloco-analise qz-bloco-raciocinio");
    var rotRaciocinio = el("strong", "qz-rotulo-raciocinio", "🧠 Linha de Raciocínio: ");
    blocoRaciocinio.appendChild(rotRaciocinio);
    blocoRaciocinio.appendChild(document.createTextNode(analise.linhaRaciocinio));
    container.appendChild(blocoRaciocinio);
  }

  function aplicarResultado(card, q, escolhida) {
    card.classList.add("respondida");
    var opcoes = card.querySelectorAll(".qz-opt");
    opcoes.forEach(function (lbl, idx) {
      var input = lbl.querySelector("input");
      if (input) input.disabled = true;
      if (idx === q.c) lbl.classList.add("opt-correta");
      else if (idx === escolhida) lbl.classList.add("opt-errada");
    });
    var fb = card.querySelector(".qz-feedback");
    var ok = escolhida === q.c;
    fb.className = "qz-feedback " + (ok ? "fb-ok" : "fb-erro");
    fb.textContent = ok ? "Correto!" : "Incorreto. A resposta certa é a alternativa " + LETRAS[q.c].toUpperCase() + ").";

    var exp = card.querySelector(".qz-explicacao");
    if (exp) {
      preencherExplicacaoCard(exp, q);
      exp.style.display = "block";
    }

    var btn = card.querySelector(".qz-verificar");
    if (btn) btn.disabled = true;
  }

  function criarCard(nivel, idx, q) {
    var card = el("article", "qz-card");
    card.id = "qz-card-" + nivel + "-" + idx;
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
      lbl.appendChild(el("span", null, LETRAS[i].toUpperCase() + ") " + texto));
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
    var divExp = el("div", "qz-explicacao");
    card.appendChild(divExp);

    var salva = respostasDo(nivel)[idx];
    if (typeof salva === "number" && salva >= 0 && salva < q.o.length) {
      var rad = card.querySelector('input[value="' + salva + '"]');
      if (rad) rad.checked = true;
      aplicarResultado(card, q, salva);
    }
    return card;
  }

  function localizarQuestao(nivel, idx) {
    var card = document.getElementById("qz-card-" + nivel + "-" + idx);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("qz-card-destaque");
    // Trigger reflow para reiniciar animação
    void card.offsetWidth;
    card.classList.add("qz-card-destaque");
    setTimeout(function () {
      card.classList.remove("qz-card-destaque");
    }, 2200);
  }

  function verificarNivelCompleto() {
    var nivel = nivelAtual;
    var qs = BANCO[nivel].questoes;
    var resp = respostasDo(nivel);

    qs.forEach(function (q, idx) {
      var card = document.getElementById("qz-card-" + nivel + "-" + idx);
      if (!card) return;
      var marcada = card.querySelector("input:checked");
      if (marcada) {
        var valor = parseInt(marcada.value, 10);
        resp[idx] = valor;
        aplicarResultado(card, q, valor);
      } else if (typeof resp[idx] === "number") {
        aplicarResultado(card, q, resp[idx]);
      }
    });

    salvar();
    atualizarPlacar();
    filtroDiagnostico = "todos";
    renderizarDiagnostico(nivel);

    var painel = document.getElementById("qz-painel-diagnostico");
    if (painel) {
      painel.style.display = "block";
      painel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderizarDiagnostico(nivel) {
    var painel = document.getElementById("qz-painel-diagnostico");
    if (!painel) return;
    painel.textContent = "";

    var qs = BANCO[nivel].questoes;
    var resp = respostasDo(nivel);
    var total = qs.length;
    var acertos = 0;
    var erros = 0;
    var pendentes = 0;

    var dadosItens = qs.map(function (q, idx) {
      var respondida = typeof resp[idx] === "number";
      var marcadaIdx = respondida ? resp[idx] : null;
      var status = "pendente";

      if (respondida) {
        if (marcadaIdx === q.c) {
          status = "correto";
          acertos++;
        } else {
          status = "errado";
          erros++;
        }
      } else {
        pendentes++;
      }

      return {
        idx: idx,
        q: q,
        respondida: respondida,
        marcadaIdx: marcadaIdx,
        status: status,
        analise: obterAnaliseQuestao(q)
      };
    });

    var pctAcertos = total > 0 ? Math.round((acertos / total) * 100) : 0;

    // 1. Cabeçalho do Diagnóstico
    var header = el("div", "qz-diag-header");
    var topo = el("div", "qz-diag-topo");
    var badgeNivel = el("span", "section-badge badge-purple", "Diagnóstico Geral");
    topo.appendChild(badgeNivel);
    var tit = el("h2", "qz-diag-titulo", "📊 Relatório de Desempenho — Nível " + BANCO[nivel].rotulo);
    topo.appendChild(tit);
    header.appendChild(topo);

    // 2. Grid de Estatísticas
    var grid = el("div", "qz-diag-grid");

    var cardTotal = el("div", "qz-diag-stat stat-total");
    cardTotal.appendChild(el("span", "stat-rotulo", "Total de Questões"));
    cardTotal.appendChild(el("strong", "stat-valor", String(total)));
    grid.appendChild(cardTotal);

    var cardAcertos = el("div", "qz-diag-stat stat-acertos");
    cardAcertos.appendChild(el("span", "stat-rotulo", "Acertos"));
    cardAcertos.appendChild(el("strong", "stat-valor", acertos + " (" + pctAcertos + "%)"));
    grid.appendChild(cardAcertos);

    var cardErros = el("div", "qz-diag-stat stat-erros");
    cardErros.appendChild(el("span", "stat-rotulo", "Incorretas"));
    cardErros.appendChild(el("strong", "stat-valor", String(erros)));
    grid.appendChild(cardErros);

    var cardPend = el("div", "qz-diag-stat stat-pendentes");
    cardPend.appendChild(el("span", "stat-rotulo", "Não Respondidas"));
    cardPend.appendChild(el("strong", "stat-valor", String(pendentes)));
    grid.appendChild(cardPend);

    header.appendChild(grid);

    // 3. Mensagem Pedagógica Motivadora
    var msgBox = el("div", "qz-diag-mensagem");
    if (pctAcertos === 100) {
      msgBox.className += " diag-msg-excelente";
      msgBox.appendChild(el("strong", null, "🏆 Desempenho Excepcional!"));
      msgBox.appendChild(el("p", null, " Você acertou todas as questões do nível " + BANCO[nivel].rotulo + ". Seu domínio lógico e capacidade de dedução estão impecáveis!"));
    } else if (pctAcertos >= 75) {
      msgBox.className += " diag-msg-excelente";
      msgBox.appendChild(el("strong", null, "🎉 Excelente Desempenho!"));
      msgBox.appendChild(el("p", null, " Você demonstrou forte assimilação dos conceitos. Analise a linha de raciocínio das questões que errou para consolidar 100% do domínio."));
    } else if (pctAcertos >= 50) {
      msgBox.className += " diag-msg-bom";
      msgBox.appendChild(el("strong", null, "📚 Bom Progresso!"));
      msgBox.appendChild(el("p", null, " Você já compreende boa parte da lógica deste nível. Abra as gavetas de análise abaixo para conferir a ideia principal e o passo a passo de cada resolução."));
    } else {
      msgBox.className += " diag-msg-atencao";
      msgBox.appendChild(el("strong", null, "💡 Continue Praticando!"));
      msgBox.appendChild(el("p", null, " Este nível traz desafios avançados. Explore a linha de raciocínio e a ideia principal de cada questão para aprimorar seu pensamento lógico estruturado."));
    }
    header.appendChild(msgBox);
    painel.appendChild(header);

    // 4. Barra de Filtros
    var barraFiltros = el("div", "qz-diag-filtros");
    var opcoesFiltro = [
      { id: "todos", rotulo: "Todas as Questões (" + total + ")" },
      { id: "correto", rotulo: "✅ Acertos (" + acertos + ")" },
      { id: "errado", rotulo: "❌ Incorretas (" + erros + ")" }
    ];
    if (pendentes > 0) {
      opcoesFiltro.push({ id: "pendente", rotulo: "⏳ Pendentes (" + pendentes + ")" });
    }

    opcoesFiltro.forEach(function (opt) {
      var btnFiltro = el("button", "qz-filtro-btn" + (filtroDiagnostico === opt.id ? " ativo" : ""), opt.rotulo);
      btnFiltro.type = "button";
      btnFiltro.addEventListener("click", function () {
        filtroDiagnostico = opt.id;
        renderizarDiagnostico(nivel);
      });
      barraFiltros.appendChild(btnFiltro);
    });
    painel.appendChild(barraFiltros);

    // 5. Lista de Questões do Diagnóstico
    var listaContainer = el("div", "qz-diag-lista");
    var itensFiltrados = dadosItens.filter(function (it) {
      if (filtroDiagnostico === "todos") return true;
      return it.status === filtroDiagnostico;
    });

    if (itensFiltrados.length === 0) {
      var avisoVazio = el("div", "qz-diag-vazio", "Nenhuma questão encontrada para este filtro.");
      listaContainer.appendChild(avisoVazio);
    } else {
      itensFiltrados.forEach(function (item) {
        var cardItem = el("article", "qz-diag-item status-" + item.status);
        var chaveGaveta = nivel + "-" + item.idx;

        // Topo do item
        var topoItem = el("div", "qz-diag-item-topo");
        var badgesDiv = el("div", "qz-diag-badges");

        var badgeStatus = el("span", "qz-status-badge status-" + item.status);
        if (item.status === "correto") badgeStatus.textContent = "✅ Acertou";
        else if (item.status === "errado") badgeStatus.textContent = "❌ Incorreto";
        else badgeStatus.textContent = "⏳ Não Respondida";
        badgesDiv.appendChild(badgeStatus);

        badgesDiv.appendChild(el("span", "qz-tag", item.q.tag));
        topoItem.appendChild(badgesDiv);

        topoItem.appendChild(el("span", "qz-num", "Questão " + String(item.idx + 1).padStart(2, "0")));
        cardItem.appendChild(topoItem);

        // Enunciado
        cardItem.appendChild(el("p", "qz-diag-enunciado", item.q.q));
        if (item.q.code) {
          cardItem.appendChild(el("pre", "qz-code", item.q.code));
        }

        // Comparativo de Respostas
        var divResp = el("div", "qz-diag-respostas");
        if (item.status === "correto") {
          var rCorreta = el("div", "qz-diag-resp-linha resp-ok");
          rCorreta.appendChild(el("strong", null, "Sua resposta: "));
          rCorreta.appendChild(document.createTextNode(LETRAS[item.marcadaIdx].toUpperCase() + ") " + item.q.o[item.marcadaIdx] + " (Correta)"));
          divResp.appendChild(rCorreta);
        } else if (item.status === "errado") {
          var rSua = el("div", "qz-diag-resp-linha resp-erro");
          rSua.appendChild(el("strong", null, "Sua resposta: "));
          rSua.appendChild(document.createTextNode(LETRAS[item.marcadaIdx].toUpperCase() + ") " + item.q.o[item.marcadaIdx] + " (Incorreta)"));
          divResp.appendChild(rSua);

          var rCerta = el("div", "qz-diag-resp-linha resp-gabarito");
          rCerta.appendChild(el("strong", null, "Gabarito oficial: "));
          rCerta.appendChild(document.createTextNode(LETRAS[item.q.c].toUpperCase() + ") " + item.q.o[item.q.c]));
          divResp.appendChild(rCerta);
        } else {
          var rPend = el("div", "qz-diag-resp-linha resp-pendente");
          rPend.appendChild(el("strong", null, "Situação: "));
          rPend.appendChild(document.createTextNode("Questão não respondida nesta rodada."));
          divResp.appendChild(rPend);

          var rCertaPend = el("div", "qz-diag-resp-linha resp-gabarito");
          rCertaPend.appendChild(el("strong", null, "Gabarito oficial: "));
          rCertaPend.appendChild(document.createTextNode(LETRAS[item.q.c].toUpperCase() + ") " + item.q.o[item.q.c]));
          divResp.appendChild(rCertaPend);
        }
        cardItem.appendChild(divResp);

        // Barra de Ações do Item
        var acoesItem = el("div", "qz-diag-acoes");

        var btnToggle = el("button", "btn-toggle-raciocinio");
        btnToggle.type = "button";
        var aberta = !!gavetasAbertas[chaveGaveta];
        btnToggle.textContent = aberta ? "🧠 Ocultar Linha de Raciocínio & Ideia Principal ▴" : "🧠 Visualizar Linha de Raciocínio & Ideia Principal ▾";

        var btnIr = el("button", "btn-localizar-q", "🎯 Rolar até o Card");
        btnIr.type = "button";
        btnIr.title = "Navegar até o card original desta questão";
        btnIr.addEventListener("click", function () {
          localizarQuestao(nivel, item.idx);
        });

        acoesItem.appendChild(btnToggle);
        acoesItem.appendChild(btnIr);
        cardItem.appendChild(acoesItem);

        // Gaveta Expansível de Análise Lógica
        var gaveta = el("div", "qz-diag-gaveta" + (aberta ? " aberta" : ""));
        gaveta.setAttribute("aria-hidden", aberta ? "false" : "true");

        var blocoIdeia = el("div", "qz-bloco-analise qz-bloco-ideia");
        var rotIdeia = el("strong", "qz-rotulo-ideia", "💡 Ideia Principal da Questão: ");
        blocoIdeia.appendChild(rotIdeia);
        blocoIdeia.appendChild(document.createTextNode(item.analise.ideiaPrincipal));
        gaveta.appendChild(blocoIdeia);

        var blocoRaciocinio = el("div", "qz-bloco-analise qz-bloco-raciocinio");
        var rotRaciocinio = el("strong", "qz-rotulo-raciocinio", "🧠 Linha de Raciocínio Passo a Passo: ");
        blocoRaciocinio.appendChild(rotRaciocinio);
        blocoRaciocinio.appendChild(document.createTextNode(item.analise.linhaRaciocinio));
        gaveta.appendChild(blocoRaciocinio);

        var blocoGabarito = el("div", "qz-bloco-analise qz-bloco-gabarito");
        var rotGabarito = el("strong", "qz-rotulo-gabarito", "📘 Justificativa do Gabarito: ");
        blocoGabarito.appendChild(rotGabarito);
        blocoGabarito.appendChild(document.createTextNode(item.analise.complemento));
        gaveta.appendChild(blocoGabarito);

        cardItem.appendChild(gaveta);

        btnToggle.addEventListener("click", function () {
          var agoraAberta = !gavetasAbertas[chaveGaveta];
          gavetasAbertas[chaveGaveta] = agoraAberta;
          if (agoraAberta) {
            gaveta.classList.add("aberta");
            gaveta.setAttribute("aria-hidden", "false");
            btnToggle.textContent = "🧠 Ocultar Linha de Raciocínio & Ideia Principal ▴";
          } else {
            gaveta.classList.remove("aberta");
            gaveta.setAttribute("aria-hidden", "true");
            btnToggle.textContent = "🧠 Visualizar Linha de Raciocínio & Ideia Principal ▾";
          }
        });

        listaContainer.appendChild(cardItem);
      });
    }

    painel.appendChild(listaContainer);

    // 6. Rodapé do Painel com Ações de Apoio
    var painelRodape = el("div", "qz-diag-painel-rodape");
    var btnVoltarTopo = el("button", "btn-secundario-nivel", "⬆ Voltar ao Topo do Nível");
    btnVoltarTopo.type = "button";
    btnVoltarTopo.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    var btnReiniciarAqui = el("button", "btn-secundario-nivel", "↺ Reiniciar este Nível");
    btnReiniciarAqui.type = "button";
    btnReiniciarAqui.addEventListener("click", reiniciar);

    painelRodape.appendChild(btnVoltarTopo);
    painelRodape.appendChild(btnReiniciarAqui);
    painel.appendChild(painelRodape);
  }

  function renderizarRodapeNivel(nivel) {
    var cont = document.getElementById("qz-nivel-rodape");
    if (!cont) return;
    cont.textContent = "";

    var card = el("div", "qz-rodape-card");
    var info = el("div", "qz-rodape-info");
    info.appendChild(el("h3", "qz-rodape-tit", "🏁 Concluiu as questões deste nível?"));
    info.appendChild(el("p", "qz-rodape-desc", "Clique no botão abaixo para verificar todas as questões de uma só vez, avaliar seu percentual de acertos e acessar o diagnóstico com a linha de raciocínio e a ideia principal de cada questão."));
    card.appendChild(info);

    var botoes = el("div", "qz-rodape-botoes");

    var btnVerificarTudo = el("button", "btn-verificar-nivel", "⚡ Verificar e Avaliar Nível Completo");
    btnVerificarTudo.type = "button";
    btnVerificarTudo.id = "qz-btn-verificar-nivel";
    btnVerificarTudo.addEventListener("click", verificarNivelCompleto);
    botoes.appendChild(btnVerificarTudo);

    var btnReiniciarRodape = el("button", "btn-secundario-nivel", "↺ Reiniciar Nível");
    btnReiniciarRodape.type = "button";
    btnReiniciarRodape.id = "qz-btn-reiniciar-rodape";
    btnReiniciarRodape.addEventListener("click", reiniciar);
    botoes.appendChild(btnReiniciarRodape);

    card.appendChild(botoes);
    cont.appendChild(card);
  }

  function renderizarNivel(nivel) {
    nivelAtual = nivel;
    var dados = BANCO[nivel];
    var elIntro = document.getElementById("qz-intro");
    if (elIntro) elIntro.textContent = dados.intro;

    var lista = document.getElementById("qz-lista");
    if (lista) {
      lista.textContent = "";
      dados.questoes.forEach(function (q, i) {
        lista.appendChild(criarCard(nivel, i, q));
      });
    }

    renderizarRodapeNivel(nivel);

    var painel = document.getElementById("qz-painel-diagnostico");
    if (painel) {
      painel.textContent = "";
      painel.style.display = "none";
    }

    NIVEIS.forEach(function (n) {
      var b = document.getElementById("qz-tab-" + n);
      if (b) b.classList.toggle("ativa", n === nivel);
    });

    atualizarPlacar();
  }

  function reiniciar() {
    delete progresso[nivelAtual];
    salvar();
    gavetasAbertas = {};
    renderizarNivel(nivelAtual);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function iniciar() {
    if (!BANCO) return;
    var abas = document.getElementById("qz-abas");
    if (abas) {
      abas.textContent = "";
      NIVEIS.forEach(function (n) {
        var b = el("button", "qz-tab");
        b.type = "button";
        b.id = "qz-tab-" + n;
        b.appendChild(el("span", "qz-tab-nome", BANCO[n].rotulo));
        b.appendChild(el("span", "qz-tab-count", "0/" + BANCO[n].questoes.length));
        b.addEventListener("click", function () { renderizarNivel(n); });
        abas.appendChild(b);
      });
    }

    var btnReiniciar = document.getElementById("qz-reiniciar");
    if (btnReiniciar) {
      btnReiniciar.addEventListener("click", reiniciar);
    }

    var hash = (location.hash || "").replace("#", "");
    renderizarNivel(NIVEIS.indexOf(hash) >= 0 ? hash : "iniciante");
  }

  document.addEventListener("DOMContentLoaded", function () {
    iniciar();
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').catch(function () {});
    }
  });
})();
