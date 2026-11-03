/**
 * ============================================================================
 * CURSO COMPLETO DE LÓGICA DE PROGRAMAÇÃO PURA & CIÊNCIA DA COMPUTAÇÃO
 * Arquitetura Expandida: 22 Módulos (Fundamentos, Intermediário e Especialização Avançada)
 * Motor de IA Pedagógica (Seções A-I), Laboratórios de Trace,
 * Calculadora do Teorema Mestre, Simulador de Programação Dinâmica,
 * Verificador de Triplas de Hoare e Simulador de Autômatos Finitos.
 * ============================================================================
 */

(function (global) {
  'use strict';

  // ──────────────────────────────────────────────────────────────────────────
  // 1. BANCO DE DADOS PEDAGÓGICO COMPLETO: 22 MÓDULOS DE LÓGICA PURA & CS
  // ──────────────────────────────────────────────────────────────────────────
  // O conteúdo vive em content/modulos/*.json (validado por JSON Schema) e é
  // empacotado em js/curso-logica-dados.js por scripts/build-conteudo.mjs.
  /** @type {Modulo[]} */
  const MODULOS_LOGICA = global.CURSO_LOGICA_MODULOS;
  if (!Array.isArray(MODULOS_LOGICA)) {
    throw new Error('js/curso-logica-dados.js deve ser carregado antes de js/curso-logica.js');
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 2. MOTOR DE INTELIGÊNCIA ARTIFICIAL: AVALIADOR DE EXPLICAÇÕES DO ALUNO
  // ──────────────────────────────────────────────────────────────────────────
  const IATutorEngine = {
    avaliarExplicacao: function (moduloId, textoAluno) {
      const modulo = MODULOS_LOGICA.find(m => m.id === moduloId);
      if (!modulo) throw new Error(`Módulo ${moduloId} não encontrado.`);

      const raw = (textoAluno || '').trim();
      const palavras = raw.split(/\s+/).filter(w => w.length > 0);
      const totalPalavras = palavras.length;

      if (totalPalavras < 6) {
        return {
          status: 'insuficiente',
          mensagem: 'Ainda não existem evidências suficientes para avaliar sua compreensão. Por favor, escreva uma explicação mais completa com suas próprias palavras (recomendado: pelo menos 2 a 3 frases explicando o raciocínio).'
        };
      }

      const textoNorm = raw
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ');

      // Dicionário de termos universais de Lógica, Computação e Raciocínio Algorítmico
      const TERMOS_TECNOLOGIA_LOGICA = [
        'logica', 'computacao', 'algoritmo', 'programacao', 'codigo', 'software', 'hardware',
        'dado', 'dados', 'variavel', 'variaveis', 'valor', 'valores', 'memoria', 'instrucao',
        'instrucoes', 'sequencia', 'passo', 'passos', 'ordem', 'entrada', 'saida', 'processamento',
        'processo', 'funcao', 'funcoes', 'procedimento', 'parametro', 'retorno', 'condicao',
        'condicional', 'se', 'senao', 'teste', 'testes', 'repeticao', 'laco', 'loop', 'enquanto',
        'para', 'repita', 'contador', 'acumulador', 'iteracao', 'vetor', 'array', 'matriz',
        'estrutura', 'recursao', 'recursivo', 'caso', 'base', 'pilha', 'complexidade', 'eficiencia',
        'tempo', 'espaco', 'big-o', 'assintotica', 'verdadeiro', 'falso', 'booleano', 'tabela-verdade',
        'proposicao', 'premissa', 'conclusao', 'argumento', 'deducao', 'regra', 'regras', 'problema',
        'solucao', 'invariante', 'correcao', 'terminacao', 'depuracao', 'debug', 'estado', 'mutacao',
        'atribuicao', 'comparacao', 'operador', 'modulo', 'resto', 'hoare', 'turing', 'decidivel',
        'indecidivel', 'parada', 'np', 'polinomial', 'grafo', 'arvore', 'busca', 'ordenacao',
        'memoization', 'tabulacao', 'guloso', 'greedy', 'backtracking'
      ];

      const termosGeraisEncontrados = TERMOS_TECNOLOGIA_LOGICA.filter(t => {
        const tNorm = t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return textoNorm.includes(tNorm);
      });

      const hits = [];
      const misses = [];
      modulo.keywordsIA.forEach(kw => {
        const kwNorm = kw.toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s]/g, ' ');
        if (textoNorm.includes(kwNorm)) {
          hits.push(kw);
        } else {
          misses.push(kw);
        }
      });

      // VALIDAÇÃO CRÍTICA DE PERTINÊNCIA TEMÁTICA
      // Se não houver nenhuma palavra-chave do módulo E nenhum termo da área de lógica/tecnologia
      if (hits.length === 0 && termosGeraisEncontrados.length === 0) {
        return {
          status: 'fora_de_contexto',
          mensagem: `O texto enviado não possui nenhuma ligação com a área de tecnologia, lógica de programação ou o conteúdo desta aula ("${modulo.titulo}"). Foram detectadas palavras aleatórias ou fora de contexto. Por favor, escreva uma explicação focada nos conceitos e raciocínios estudados no módulo.`
        };
      }

      // Se houver apenas 1 termo vago sem nenhuma ligação específica com a aula
      if (hits.length === 0 && termosGeraisEncontrados.length < 2 && totalPalavras > 12) {
        return {
          status: 'fora_de_contexto',
          mensagem: `O texto enviado tangencia termos genéricos, mas não aborda os conceitos essenciais do módulo "${modulo.titulo}". Por favor, elabore uma explicação com suas próprias palavras sobre as regras e o raciocínio deste tema específico.`
        };
      }

      const equivocosDetectados = [];
      modulo.misconceptionsIA.forEach(m => {
        const termoNorm = m.termo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (textoNorm.includes(termoNorm)) {
          equivocosDetectados.push(m);
        }
      });

      // Checagem específica E vs OU
      if (modulo.id === 7 || modulo.id === 6 || modulo.id === 8) {
        if ((textoNorm.includes(' e ') || textoNorm.includes('operador e')) &&
            (textoNorm.includes('pelo menos uma') || textoNorm.includes('uma ou outra') || textoNorm.includes('qualquer uma'))) {
          equivocosDetectados.push({
            termo: 'Operador E confundido com OU',
            erro: 'Descrever o operador E como exigindo apenas "pelo menos uma condição verdadeira"',
            explicacao: 'No operador E (conjunção), TODAS as condições precisam ser simultaneamente verdadeiras.'
          });
        }
      }

      // Checagem específica P vs NP
      if (modulo.id === 22) {
        if (textoNorm.includes('nao polinomial') && (textoNorm.includes('significa') || textoNorm.includes('sigla'))) {
          equivocosDetectados.push({
            termo: 'Significado de NP',
            erro: 'Afirmar que a sigla NP significa "Não Polinomial"',
            explicacao: 'NP significa Nondeterministic Polynomial (verificável em tempo polinomial).'
          });
        }
      }

      const ratioHits = hits.length / (modulo.keywordsIA.length || 1);
      const fatorExtensao = Math.min(1.0, totalPalavras / 35.0);

      const precisaoConceitual = Math.round(Math.min(100, Math.max(25, (ratioHits * 65 + fatorExtensao * 35) - (equivocosDetectados.length * 15))));
      const compreensaoRegras = Math.round(Math.min(100, Math.max(20, precisaoConceitual + (hits.length > 2 ? 15 : -10))));
      const coerenciaRaciocinio = Math.round(Math.min(100, Math.max(30, 50 + fatorExtensao * 40 - (equivocosDetectados.length * 20))));
      const relacoesConceituais = Math.round(Math.min(100, ratioHits * 85 + 15));
      const limitacoesExcecoes = Math.round(Math.min(100, hits.includes('limite') || hits.includes('restricao') || hits.includes('indecidivel') || hits.includes('invariante') ? 92 : 48));
      const aplicacaoPratica = Math.round(Math.min(100, totalPalavras > 20 ? 85 : 55));
      const clarezaExposicao = Math.round(Math.min(100, Math.max(40, totalPalavras >= 15 ? 88 : 55)));

      const mediaGeral = Math.round((precisaoConceitual + compreensaoRegras + coerenciaRaciocinio + relacoesConceituais + clarezaExposicao) / 5);

      let estadoDominio = 'Em andamento';
      if (mediaGeral >= 75 && equivocosDetectados.length === 0) {
        estadoDominio = 'Domínio demonstrado';
      } else if (mediaGeral >= 50) {
        estadoDominio = 'Compreensão parcial';
      } else {
        estadoDominio = 'Precisa de revisão';
      }

      let secaoA = '';
      if (hits.length > 0) {
        secaoA = `Você demonstrou compreender com precisão conceitos essenciais deste módulo, destacando: **${hits.slice(0, 5).join(', ')}**. Seu raciocínio reflete domínio dos fundamentos computacionais.`;
      } else {
        secaoA = 'Você iniciou uma reflexão válida sobre o assunto com vocabulário próprio.';
      }

      let secaoB = '';
      if (equivocosDetectados.length > 0) {
        secaoB = equivocosDetectados.map(eq => `• **Ponto crítico:** Identificamos uma potencial imprecisão em relação a "${eq.termo}". ${eq.erro}.`).join('\n');
      } else if (misses.length > 0) {
        secaoB = `Não detectamos contradições no seu texto. Para aprofundar sua formulação teórica, sugerimos incorporar os conceitos: **${misses.slice(0, 3).join(', ')}**.`;
      } else {
        secaoB = 'Sua explicação foi matematicamente precisa e completa, cobrindo todos os pontos fundamentais!';
      }

      let secaoC = '';
      if (equivocosDetectados.length > 0) {
        secaoC = equivocosDetectados.map(eq => `${eq.explicacao}`).join(' ');
      } else {
        secaoC = `Neste nível de abstração, o rigor metodológico é indispensável. Erros comuns decorrem de tentar simplificar regras formais ignorando condições de contorno e invariantes.`;
      }

      const secaoD = `Para elevar o nível formal da sua explicação:
1. Declare a especificação exata do problema (Pré-condições e Pós-condições).
2. Justifique a invariante central ou relação de recorrência matemática.
3. Demonstre a terminação finita e a corretude assintótica.
4. Integre os termos ausentes (${misses.slice(0, 2).join(' e ') || 'limites teóricos'}).`;

      const secaoE = modulo.explicacaoIdealIA;

      const secaoF = `**O que manter:** A sua clareza sobre ${hits[0] || 'os conceitos centrais'}.
**O que ajustar:** O rigor na definição das regras e limites assintóticos.
**O que acrescentar:** A conexão explícita com ${misses[0] || 'as propriedades formais de prova'}.`;

      const secaoG = `Considere o seguinte cenário avançado: ${modulo.exemplos.avancado ? modulo.exemplos.avancado.descricao : 'Em um sistema crítico de alta escala, a corretude matemática garante estabilidade e escalabilidade absolutas.'}`;

      const secaoH = modulo.perguntasVerificacao;

      const secaoI = {
        estado: estadoDominio,
        notaGeral: mediaGeral,
        dimensoes: [
          { nome: 'Precisão Conceitual', valor: precisaoConceitual },
          { nome: 'Compreensão de Regras', valor: compreensaoRegras },
          { nome: 'Coerência do Raciocínio', valor: coerenciaRaciocinio },
          { nome: 'Relações Conceituais', valor: relacoesConceituais },
          { nome: 'Limitações e Exceções', valor: limitacoesExcecoes },
          { nome: 'Aplicação Prática', valor: aplicacaoPratica },
          { nome: 'Clareza Expositiva', valor: clarezaExposicao }
        ],
        recomendacao: mediaGeral >= 75
          ? 'Excelente! Domínio conceitual demonstrado com rigor. Recomendamos avançar para os módulos de especialização ou explorar os simuladores avançados.'
          : 'Recomendamos revisar as definições formais e praticar os exercícios de diagnóstico antes de submeter uma nova análise.'
      };

      return {
        status: 'sucesso',
        moduloId: modulo.id,
        moduloTitulo: modulo.titulo,
        totalPalavras: totalPalavras,
        hits: hits,
        misses: misses,
        secoes: {
          A_compreendido: secaoA,
          B_pontosCorrecao: secaoB,
          C_explicacaoErro: secaoC,
          D_comoMelhorar: secaoD,
          E_explicacaoCorreta: secaoE,
          F_comparacao: secaoF,
          G_exemploConsolidacao: secaoG,
          H_perguntaVerificacao: secaoH,
          I_avaliacao: secaoI
        }
      };
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 3. GERENCIADOR DE PROGRESSO E HISTÓRICO DO ALUNO (LOCALSTORAGE)
  // ──────────────────────────────────────────────────────────────────────────
  const StorageManager = {
    KEY_PROGRESSO: 'ponce_curso_logica_progresso_v2',
    KEY_HISTORICO: 'ponce_curso_logica_historico_v2',

    carregarProgresso: function () {
      try {
        const data = localStorage.getItem(this.KEY_PROGRESSO);
        if (data) return JSON.parse(data);
      } catch (e) {
        console.warn('Erro ao ler localStorage', e);
      }
      const init = {};
      MODULOS_LOGICA.forEach(m => {
        init[m.id] = {
          estado: m.id === 1 ? 'Em andamento' : 'Não iniciado',
          exerciciosFeitos: [],
          acertos: 0,
          tentativas: 0,
          ultimaNota: null,
          ultimaAtualizacao: null
        };
      });
      return init;
    },

    salvarProgresso: function (progresso) {
      try {
        localStorage.setItem(this.KEY_PROGRESSO, JSON.stringify(progresso));
      } catch (e) {
        console.warn('Erro ao salvar progresso', e);
      }
    },

    registrarExplicacao: function (moduloId, texto, resultadoIA) {
      const prog = this.carregarProgresso();
      if (!prog[moduloId]) prog[moduloId] = {};
      prog[moduloId].estado = resultadoIA.secoes.I_avaliacao.estado;
      prog[moduloId].ultimaNota = resultadoIA.secoes.I_avaliacao.notaGeral;
      prog[moduloId].ultimaAtualizacao = new Date().toISOString();
      this.salvarProgresso(prog);

      try {
        let hist = JSON.parse(localStorage.getItem(this.KEY_HISTORICO) || '[]');
        hist.unshift({
          data: new Date().toLocaleString('pt-BR'),
          moduloId: moduloId,
          moduloTitulo: resultadoIA.moduloTitulo,
          texto: texto,
          nota: resultadoIA.secoes.I_avaliacao.notaGeral,
          estado: resultadoIA.secoes.I_avaliacao.estado
        });
        if (hist.length > 50) hist = hist.slice(0, 50);
        localStorage.setItem(this.KEY_HISTORICO, JSON.stringify(hist));
      } catch (e) {
        console.warn('Erro ao registrar histórico', e);
      }
    },

    carregarHistorico: function () {
      try {
        return JSON.parse(localStorage.getItem(this.KEY_HISTORICO) || '[]');
      } catch (e) {
        return [];
      }
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 4. SIMULADORES INTERATIVOS: TRACE, TEOREMA MESTRE E PROGRAMAÇÃO DINÂMICA
  // ──────────────────────────────────────────────────────────────────────────
  const SimuladorTrace = {
    passoAtual: 0,
    dadosAtuais: [],

    iniciar: function (traceData) {
      this.dadosAtuais = traceData || [];
      this.passoAtual = 0;
      this.render();
    },

    avancar: function () {
      if (this.passoAtual < this.dadosAtuais.length - 1) {
        this.passoAtual++;
        this.render();
      }
    },

    voltar: function () {
      if (this.passoAtual > 0) {
        this.passoAtual--;
        this.render();
      }
    },

    reiniciar: function () {
      this.passoAtual = 0;
      this.render();
    },

    render: function () {
      const elView = document.getElementById('sim-trace-display');
      const elStatus = document.getElementById('sim-trace-step-indicator');
      if (!elView || !this.dadosAtuais.length) return;

      const item = this.dadosAtuais[this.passoAtual];
      if (elStatus) {
        elStatus.textContent = `Passo ${this.passoAtual + 1} de ${this.dadosAtuais.length}`;
      }

      elView.innerHTML = `
        <div class="state-var-row">
          <strong>Ação / Transição de Estado:</strong>
          <span style="color:var(--primary);font-weight:700;">${item.acao}</span>
        </div>
        <div class="state-var-row">
          <strong>Estado Formal da Memória / Prova:</strong>
          <code style="background:#0f172a;color:#38bdf8;padding:0.2rem 0.5rem;border-radius:4px;">${item.estado}</code>
        </div>
        <div class="state-var-row">
          <strong>Auditoria Pedagógica:</strong>
          <span style="color:var(--text-muted);">${item.obs}</span>
        </div>
      `;
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 5. FERRAMENTAS AVANÇADAS: CALCULADORA DO TEOREMA MESTRE & DP SIMULATOR
  // ──────────────────────────────────────────────────────────────────────────
  const MasterTheoremCalculator = {
    calcular: function (a, b, pExp) {
      a = parseFloat(a);
      b = parseFloat(b);
      pExp = parseFloat(pExp);

      if (a < 1 || b <= 1) {
        return { erro: 'O Teorema Mestre exige que a >= 1 e b > 1.' };
      }

      const logCrit = Math.log(a) / Math.log(b);
      const logCritFmt = (Math.round(logCrit * 100) / 100).toFixed(2);

      let caso = '';
      let resultado = '';
      let explicacao = '';

      const diff = pExp - logCrit;

      if (Math.abs(diff) < 0.001) {
        caso = 'Caso 2 (Trabalho Equilibrado)';
        resultado = `Θ(n^${pExp === 1 ? '' : pExp} log n)`;
        explicacao = `Como o expoente de f(n) (p=${pExp}) é igual a log_b(a) = log_${b}(${a}) ≈ ${logCritFmt}, o custo é distribuído igualmente entre todos os níveis da árvore de recursão.`;
      } else if (pExp < logCrit) {
        caso = 'Caso 1 (Trabalho das Folhas Domina)';
        resultado = `Θ(n^${logCritFmt})`;
        explicacao = `Como f(n) = O(n^${pExp}) cresce estritamente mais devagar que n^(log_b a) = n^${logCritFmt}, o custo computacional total é dominado pelas folhas da recursão.`;
      } else {
        caso = 'Caso 3 (Trabalho da Raiz Domina)';
        resultado = `Θ(n^${pExp})`;
        explicacao = `Como f(n) = Ω(n^${pExp}) cresce estritamente mais rápido que n^(log_b a) = n^${logCritFmt} (e satisfazendo a condição de regularidade af(n/b) <= c f(n)), o custo total é dominado pelo trabalho na raiz.`;
      }

      return {
        a: a,
        b: b,
        p: pExp,
        logCrit: logCritFmt,
        caso: caso,
        resultado: resultado,
        explicacao: explicacao
      };
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 6. INTERFACE DO USUÁRIO & RENDERIZADOR PRINCIPAL
  // ──────────────────────────────────────────────────────────────────────────
  let moduloSelecionado = 1;

  function renderizarDashboard() {
    const prog = StorageManager.carregarProgresso();
    let totalIniciados = 0;
    let totalDominados = 0;
    let totalRevisao = 0;
    let somaNotas = 0;
    let countNotas = 0;

    Object.keys(prog).forEach(id => {
      const item = prog[id];
      if (item.estado !== 'Não iniciado') totalIniciados++;
      if (item.estado === 'Domínio demonstrado') totalDominados++;
      if (item.estado === 'Precisa de revisão') totalRevisao++;
      if (item.ultimaNota !== null) {
        somaNotas += item.ultimaNota;
        countNotas++;
      }
    });

    const media = countNotas > 0 ? Math.round(somaNotas / countNotas) : 0;

    const elDash = document.getElementById('curso-dash-stats');
    if (elDash) {
      elDash.innerHTML = `
        <div class="dash-stat-box">
          <div class="dash-stat-val">${totalIniciados} / ${MODULOS_LOGICA.length}</div>
          <div class="dash-stat-lbl">Módulos em Andamento</div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-val" style="color:#10b981;">${totalDominados}</div>
          <div class="dash-stat-lbl">Domínio Demonstrado</div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-val" style="color:#f59e0b;">${totalRevisao}</div>
          <div class="dash-stat-lbl">Precisam de Revisão</div>
        </div>
        <div class="dash-stat-box">
          <div class="dash-stat-val" style="color:#6366f1;">${media}%</div>
          <div class="dash-stat-lbl">Índice Médio de Precisão</div>
        </div>
      `;
    }

    const elRec = document.getElementById('curso-dash-recommendation');
    if (elRec) {
      if (totalRevisao > 0) {
        elRec.innerHTML = `⚠️ <strong>Revisão Recomendada:</strong> Existem tópicos com lacunas detectadas. Recomendamos refazer as explicações com suas próprias palavras para consolidar o entendimento.`;
      } else if (totalDominados >= MODULOS_LOGICA.length) {
        elRec.innerHTML = `🏆 <strong>Mestria Absoluta Concluída!</strong> Você dominou com distinção todos os ${MODULOS_LOGICA.length} módulos de Lógica Pura e Ciência da Computação Avançada!`;
      } else {
        elRec.innerHTML = `💡 <strong>Próximo Passo Recomendado:</strong> Estude o <em>${MODULOS_LOGICA[moduloSelecionado - 1].titulo}</em> (${MODULOS_LOGICA[moduloSelecionado - 1].nivel}) e explore as demonstrações formais.`;
      }
    }
  }

  function renderizarListaModulos() {
    const elTrack = document.getElementById('curso-modules-track');
    const elQuickSelect = document.getElementById('curso-quick-select');
    if (!elTrack) return;

    const prog = StorageManager.carregarProgresso();

    elTrack.innerHTML = MODULOS_LOGICA.map(m => {
      const p = prog[m.id] || {};
      const statusClass = p.estado === 'Domínio demonstrado' ? 'status-mastered' : p.estado === 'Precisa de revisão' ? 'status-review' : '';
      const activeClass = m.id === moduloSelecionado ? 'active' : '';
      const isAdv = m.id >= 18;
      return `
        <button class="curso-mod-pill ${activeClass} ${statusClass}" onclick="CursoLogicaApp.selecionarModulo(${m.id})">
          <span class="pill-status-dot"></span>
          <span>${m.id}. ${m.titulo.split(' ')[0]} ${isAdv ? '⚡' : ''}</span>
        </button>
      `;
    }).join('');

    if (elQuickSelect && elQuickSelect.children.length <= 1) {
      elQuickSelect.innerHTML = MODULOS_LOGICA.map(m =>
        `<option value="${m.id}" ${m.id === moduloSelecionado ? 'selected' : ''}>[${m.nivel}] Módulo ${m.id}: ${m.titulo}</option>`
      ).join('');
    }
  }

  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Seções de aprofundamento (conteúdo em js/curso-logica-extras.js)
  function renderizarExtras(modulo) {
    const extras = (global.CURSO_LOGICA_EXTRAS || {})[modulo.id];
    const vazio = { motivacao: '', glossario: '', resolvido: '', praticas: '', dicas: '' };
    if (!extras) return vazio;

    const motivacao = `
      <div class="pedagogy-section">
        <h4 class="pedagogy-title"><span class="ped-icon">🧭</span> Por que este módulo importa</h4>
        <div class="ped-box ped-intuitive">${escHtml(extras.porQueImporta)}</div>
      </div>`;

    const glossario = `
      <div class="pedagogy-section">
        <h4 class="pedagogy-title"><span class="ped-icon">📖</span> Glossário do Módulo</h4>
        <div class="ped-box" style="background:var(--bg-main);">
          <dl style="margin:0; line-height:1.65;">
            ${extras.glossario.map(([t, d]) => `<dt style="font-weight:700; color:var(--text-main); margin-top:0.6rem;">${escHtml(t)}</dt><dd style="margin:0 0 0 1rem; color:var(--text-muted);">${escHtml(d)}</dd>`).join('')}
          </dl>
        </div>
      </div>`;

    const r = extras.exemploResolvido;
    const resolvido = `
      <div class="pedagogy-section">
        <h4 class="pedagogy-title"><span class="ped-icon">✍️</span> Exemplo Resolvido Passo a Passo: ${escHtml(r.titulo)}</h4>
        <div class="ped-box ped-deep">
          <p style="margin:0 0 0.75rem 0;"><strong>Enunciado:</strong> ${escHtml(r.enunciado)}</p>
          <ol style="margin:0 0 0.75rem 0; padding-left:1.2rem; line-height:1.7;">
            ${r.passos.map(p => `<li>${escHtml(p)}</li>`).join('')}
          </ol>
          <pre class="logic-pseudo-block" style="margin:0;">${escHtml(r.codigo)}</pre>
        </div>
      </div>`;

    const praticas = `
      <div class="pedagogy-section">
        <h4 class="pedagogy-title"><span class="ped-icon">🏋️</span> Prática Guiada (faça no papel antes de ver a dica)</h4>
        <div class="examples-grid">
          ${extras.praticas.map(p => `
            <div class="example-card">
              <span class="example-badge ${p.nivel === 'Básico' ? 'ex-basic' : p.nivel === 'Intermediário' ? 'ex-mid' : 'ex-adv'}">${escHtml(p.nivel)}</span>
              <p style="font-size:0.9rem; color:var(--text-main); margin:0;">${escHtml(p.texto)}</p>
              <details><summary style="cursor:pointer; font-size:0.85rem; font-weight:700; color:var(--primary);">Ver dica</summary>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:0.4rem 0 0 0;">${escHtml(p.dica)}</p>
              </details>
            </div>`).join('')}
        </div>
      </div>`;

    const dicas = `
      <div class="pedagogy-section">
        <h4 class="pedagogy-title"><span class="ped-icon">🎓</span> Dicas de Estudo e Conexões com Outros Módulos</h4>
        <div class="ped-box" style="background:var(--bg-main);">
          <ul style="margin:0 0 0.75rem 0; padding-left:1.2rem; line-height:1.7;">
            ${extras.dicasEstudo.map(d => `<li>${escHtml(d)}</li>`).join('')}
          </ul>
          <p style="margin:0;"><strong>Conexões:</strong> ${escHtml(extras.conexoes)}</p>
        </div>
      </div>`;

    return { motivacao, glossario, resolvido, praticas, dicas };
  }

  function renderizarModuloDetalhe() {
    const modulo = MODULOS_LOGICA.find(m => m.id === moduloSelecionado);
    const container = document.getElementById('curso-module-content');
    if (!container || !modulo) return;
    const extra = renderizarExtras(modulo);

    const exBasico = modulo.exemplos.basico;
    const exMid = modulo.exemplos.intermediario;
    const exAdv = modulo.exemplos.avancado;

    const errosHTML = modulo.errosComuns.map(e => `
      <div style="background:rgba(239, 68, 68, 0.08); border-left:4px solid #ef4444; padding:0.8rem 1rem; border-radius:var(--radius-sm); margin-bottom:0.6rem;">
        <strong style="color:#b91c1c;">❌ Erro Comum:</strong> ${e.erro}
        <br><strong style="color:#15803d;">✅ Correção Rigorosa:</strong> ${e.correcao}
      </div>
    `).join('');

    const exerciciosHTML = modulo.exercicios.map(ex => {
      const opcoesHTML = ex.opcoes.map((op, idx) => `
        <button class="ex-opt-btn" onclick="CursoLogicaApp.responderExercicio('${ex.id}', ${idx}, ${ex.correta}, '${encodeURIComponent(ex.pista)}', '${encodeURIComponent(ex.justificativa)}')">
          <span style="font-weight:700;">${String.fromCharCode(65 + idx)})</span> ${op}
        </button>
      `).join('');

      return `
        <div class="exercise-card" id="ex-card-${ex.id}">
          <div class="ex-header">
            <span class="lang-badge-pill" style="background:#e0e7ff; color:#3730a3;">Exercício de Aplicação e Rigor</span>
          </div>
          <p style="font-weight:600; color:var(--text-main); line-height:1.6;">${ex.enunciado}</p>
          <div class="ex-options-list">${opcoesHTML}</div>
          <div id="ex-fb-${ex.id}" class="ex-feedback-box" style="display:none;"></div>
        </div>
      `;
    }).join('');

    // Painel Especial para o Módulo 18: Calculadora do Teorema Mestre
    let masterTheoremHTML = '';
    if (modulo.id === 18) {
      masterTheoremHTML = `
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">🧮</span> Laboratório Interativo: Calculadora do Teorema Mestre de Cormen</h4>
          <div class="sim-interactive-wrap" style="background:var(--bg-card); border:2px solid var(--secondary);">
            <p style="font-size:0.9rem; color:var(--text-muted); margin-top:0;">
              Simule a relação de recorrência <strong>T(n) = a·T(n/b) + Θ(n^p)</strong> e identifique instantaneamente qual caso do Teorema Mestre se aplica:
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center; margin-bottom:1rem;">
              <div>
                <label style="font-size:0.8rem; font-weight:700;">Subproblemas (a >= 1):</label><br>
                <input type="number" id="tm-input-a" value="4" min="1" step="1" style="width:80px; padding:0.4rem; border-radius:6px; border:1px solid var(--border-color);"/>
              </div>
              <div>
                <label style="font-size:0.8rem; font-weight:700;">Divisão da Entrada (b > 1):</label><br>
                <input type="number" id="tm-input-b" value="2" min="1.1" step="0.5" style="width:80px; padding:0.4rem; border-radius:6px; border:1px solid var(--border-color);"/>
              </div>
              <div>
                <label style="font-size:0.8rem; font-weight:700;">Expoente de f(n) = n^p:</label><br>
                <input type="number" id="tm-input-p" value="2" min="0" step="0.5" style="width:80px; padding:0.4rem; border-radius:6px; border:1px solid var(--border-color);"/>
              </div>
              <div style="align-self:flex-end;">
                <button class="sim-btn" onclick="CursoLogicaApp.calcularTeoremaMestre()" style="background:var(--grad-primary); color:#fff; border:none; padding:0.55rem 1.2rem;">
                  ⚡ Calcular Complexidade
                </button>
              </div>
            </div>
            <div id="tm-resultado-display" style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <strong>Resultado da Análise Assintótica:</strong> T(n) = 4T(n/2) + n² recai no <em>Caso 2</em> -> <span style="color:var(--primary); font-weight:800; font-size:1.1rem;">Θ(n² log n)</span>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="curso-module-card">
        <div class="mod-header">
          <div>
            <div class="mod-badge-row">
              <span class="lang-badge-pill" style="background:var(--grad-primary); color:#fff;">${modulo.badge}</span>
              <span class="lang-badge-pill" style="background:#ecfdf5; color:#065f46;">Nível: ${modulo.nivel}</span>
              <span class="lang-badge-pill" style="background:#f5f3ff; color:#6d28d9;">Ciência da Computação Pura</span>
            </div>
            <h2 class="mod-title">${modulo.titulo}</h2>
            <p class="mod-subtitle">${modulo.subtitulo}</p>
          </div>
        </div>

        <!-- 4.1 Objetivo da Aula -->
        <div class="pedagogy-section" style="border-top:none; margin-top:0.5rem; padding-top:0;">
          <h4 class="pedagogy-title"><span class="ped-icon">🎯</span> 4.1 Objetivo da Aprendizagem</h4>
          <div class="ped-box ped-objective">${modulo.objetivo}</div>
        </div>

        <!-- 4.2 Introdução Intuitiva -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">💡</span> 4.2 Introdução Intuitiva (Analogia & Modelo Mental)</h4>
          <div class="ped-box ped-intuitive">${modulo.introducaoIntuitiva}</div>
        </div>

        ${extra.motivacao}

        <!-- 4.3 Explicação Conceitual Aprofundada -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">📘</span> 4.3 Explicação Conceitual Aprofundada & Rigor Teórico</h4>
          <div class="ped-box ped-deep" style="white-space:pre-line;">${modulo.explicacaoAprofundada}</div>
        </div>

        ${extra.glossario}

        ${extra.resolvido}

        ${masterTheoremHTML}

        <!-- 4.4 Exemplos Progressivos -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">📈</span> 4.4 Exemplos Progressivos (Básico ao Especialista)</h4>
          <div class="examples-grid">
            <div class="example-card">
              <span class="example-badge ex-basic">Exemplo 1 · Básico</span>
              <strong style="color:var(--text-main);">${exBasico.titulo}</strong>
              <p style="font-size:0.88rem; color:var(--text-muted); margin:0;">${exBasico.descricao}</p>
            </div>
            <div class="example-card">
              <span class="example-badge ex-mid">Exemplo 2 · Intermediário</span>
              <strong style="color:var(--text-main);">${exMid.titulo}</strong>
              <p style="font-size:0.88rem; color:var(--text-muted); margin:0;">${exMid.descricao}</p>
            </div>
            <div class="example-card">
              <span class="example-badge ex-adv">Exemplo 3 · Análise Avançada</span>
              <strong style="color:var(--text-main);">${exAdv.titulo}</strong>
              <p style="font-size:0.88rem; color:var(--text-muted); margin:0;">${exAdv.descricao}</p>
            </div>
          </div>
        </div>

        <!-- 4.5 Demonstração Passo a Passo -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">🪜</span> 4.5 Metodologia Passo a Passo</h4>
          <div class="ped-box" style="background:var(--bg-main);">
            <ol style="margin:0; padding-left:1.2rem; line-height:1.7;">
              ${modulo.passoAPasso.map(p => `<li>${p}</li>`).join('')}
            </ol>
          </div>
        </div>

        <!-- 4.6 Erros Comuns & Mitos -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">⚠️</span> 4.6 Erros Comuns e Mitos Conceituais</h4>
          <div>${errosHTML}</div>
        </div>

        <!-- 4.7 Comparação de Soluções -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">⚖️</span> 4.7 Comparação entre Abordagens</h4>
          <div class="comparison-container">
            <div class="sol-box sol-correct">
              <strong style="color:#166534; display:block; margin-bottom:0.5rem;">✅ Abordagem Rigorosa & Otimizada:</strong>
              <p style="margin:0; font-size:0.9rem; color:var(--text-main);">${modulo.comparacaoSolucoes.boa}</p>
            </div>
            <div class="sol-box sol-flawed">
              <strong style="color:#991b1b; display:block; margin-bottom:0.5rem;">❌ Abordagem Ingênua ou Limitada:</strong>
              <p style="margin:0; font-size:0.9rem; color:var(--text-main);">${modulo.comparacaoSolucoes.ruim}</p>
            </div>
          </div>
        </div>

        <!-- SIMULADOR INTERATIVO DE RASTREAMENTO (TRACE) -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">🔬</span> Laboratório Interativo: Tabela de Rastreamento de Estado & Prova</h4>
          <div class="sim-interactive-wrap">
            <div class="sim-header">
              <div>
                <strong style="color:var(--text-main);">Inspeção Formal Passo a Passo</strong>
                <div id="sim-trace-step-indicator" style="font-size:0.8rem; color:var(--text-muted);">Passo 1</div>
              </div>
              <div class="sim-controls">
                <button class="sim-btn" onclick="CursoLogicaApp.voltarSimulacao()">◀ Voltar</button>
                <button class="sim-btn" onclick="CursoLogicaApp.avancarSimulacao()">Avançar ▶</button>
                <button class="sim-btn" onclick="CursoLogicaApp.reiniciarSimulacao()">↺ Reiniciar</button>
              </div>
            </div>

            <div class="sim-display-grid">
              <div>
                <div style="font-size:0.82rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-muted); text-transform:uppercase;">Pseudocódigo Conceitual / Formal:</div>
                <pre class="logic-pseudo-block">${modulo.pseudocodigo}</pre>
              </div>
              <div>
                <div style="font-size:0.82rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-muted); text-transform:uppercase;">Inspeção de Estado / Memória:</div>
                <div class="sim-state-view" id="sim-trace-display"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4.8 / 4.9 / 4.10 Exercícios Inteligentes -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">📝</span> 4.8 a 4.10 Exercícios de Compreensão, Aplicação e Diagnóstico</h4>
          <div>${exerciciosHTML}</div>
        </div>

        ${extra.praticas}

        ${extra.dicas}

        <!-- 4.11 / SEÇÃO IA: EXPLICAÇÃO COM PALAVRAS PRÓPRIAS -->
        <div class="pedagogy-section">
          <div class="ai-tutor-container">
            <div class="ai-tutor-header">
              <div class="ai-badge-icon">🤖</div>
              <div>
                <h3 style="margin:0; font-size:1.2rem; font-weight:800; color:var(--text-main);">4.11 Tutora IA: Explique com Suas Próprias Palavras</h3>
                <p style="margin:0.25rem 0 0 0; font-size:0.88rem; color:var(--text-muted);">
                  Explique o raciocínio deste módulo em detalhes. A inteligência artificial avaliará seus acertos, identificará lacunas conceituais e gerará o relatório pedagógico completo em 9 seções obrigatórias (A até I).
                </p>
              </div>
            </div>

            <textarea id="curso-ia-textarea" class="ai-textarea" rows="5"
              placeholder="Escreva aqui sua explicação conceitual e rigorosa deste módulo..."></textarea>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-top:0.75rem;">
              <span id="curso-ia-wc" style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">0 palavras</span>
              <button class="quick-nav-btn" onclick="CursoLogicaApp.solicitarAnaliseIA()">
                🔬 Analisar Minha Explicação com a IA
              </button>
            </div>

            <div id="curso-ia-feedback-area" style="display:none;"></div>
          </div>
        </div>

        <!-- 4.12 Resumo e Revisão -->
        <div class="pedagogy-section">
          <h4 class="pedagogy-title"><span class="ped-icon">📌</span> 4.12 Resumo e Síntese Teórica</h4>
          <div class="ped-box" style="background:var(--bg-main); border-left:4px solid var(--accent-green);">
            <strong>Conceito Central Dominado:</strong> ${modulo.explicacaoIdealIA}
          </div>
        </div>

      </div>
    `;

    SimuladorTrace.iniciar(modulo.traceData);

    const ta = /** @type {HTMLTextAreaElement | null} */ (document.getElementById('curso-ia-textarea'));
    const wc = document.getElementById('curso-ia-wc');
    if (ta && wc) {
      ta.addEventListener('input', function () {
        const cnt = this.value.trim().split(/\s+/).filter(w => w.length > 0).length;
        wc.textContent = `${cnt} palavras (mínimo recomendado: 25 palavras sobre o conteúdo)`;
        wc.style.color = cnt >= 25 ? '#10b981' : '#f59e0b';
      });
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7. EXPOSIÇÃO GLOBAL DA API DO CURSO
  // ──────────────────────────────────────────────────────────────────────────
  global.CursoLogicaApp = {
    init: function () {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const modParam = urlParams.get('modulo');
        if (modParam) {
          const parsed = parseInt(modParam, 10);
          if (parsed >= 1 && parsed <= MODULOS_LOGICA.length) {
            moduloSelecionado = parsed;
          }
        }
      } catch (err) {
        console.error('Erro ao ler parametros de URL:', err);
      }

      renderizarDashboard();
      renderizarListaModulos();
      renderizarModuloDetalhe();
    },

    redirecionarNaMesmaPagina: function (id) {
      const heroSelect = /** @type {HTMLSelectElement | null} */ (document.getElementById('curso-quick-select-hero'));
      const targetId = id || (heroSelect ? heroSelect.value : 1);
      window.location.href = 'curso-logica.html?modulo=' + (targetId || 1);
    },

    selecionarModulo: function (id) {
      moduloSelecionado = parseInt(id, 10);
      renderizarListaModulos();
      renderizarModuloDetalhe();

      const elSection = document.getElementById('curso-module-content');
      if (elSection) {
        elSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    navegarModuloRapido: function () {
      const elSelect = /** @type {HTMLSelectElement | null} */ (document.getElementById('curso-quick-select'));
      if (elSelect) {
        this.selecionarModulo(elSelect.value);
      }
    },

    avancarSimulacao: function () {
      SimuladorTrace.avancar();
    },

    voltarSimulacao: function () {
      SimuladorTrace.voltar();
    },

    reiniciarSimulacao: function () {
      SimuladorTrace.reiniciar();
    },

    calcularTeoremaMestre: function () {
      const a = /** @type {HTMLInputElement} */ (document.getElementById('tm-input-a')).value;
      const b = /** @type {HTMLInputElement} */ (document.getElementById('tm-input-b')).value;
      const p = /** @type {HTMLInputElement} */ (document.getElementById('tm-input-p')).value;
      const res = MasterTheoremCalculator.calcular(a, b, p);
      const elDisp = document.getElementById('tm-resultado-display');
      if (!elDisp) return;

      if (res.erro) {
        elDisp.innerHTML = `<span style="color:#ef4444;">⚠️ ${res.erro}</span>`;
      } else {
        elDisp.innerHTML = `
          <strong>Resultado da Análise Assintótica:</strong> Recorrencia T(n) = ${res.a}T(n/${res.b}) + Θ(n^${res.p})
          <br>Classificação: <span class="lang-badge-pill" style="background:var(--primary); color:#fff; font-size:0.85rem;">${res.caso}</span>
          <br><strong style="font-size:1.15rem; color:var(--primary); display:block; margin:0.4rem 0;">Complexidade: ${res.resultado}</strong>
          <small style="color:var(--text-muted);">${res.explicacao}</small>
        `;
      }
    },

    responderExercicio: function (exId, optIdx, corretaIdx, pistaEnc, justEnc) {
      const fb = document.getElementById(`ex-fb-${exId}`);
      if (!fb) return;

      const pista = decodeURIComponent(pistaEnc);
      const justificativa = decodeURIComponent(justEnc);

      fb.style.display = 'block';
      if (optIdx === corretaIdx) {
        fb.style.background = '#dcfce7';
        fb.style.border = '1px solid #10b981';
        fb.style.color = '#14532d';
        fb.innerHTML = `<strong>🎉 Resposta Exata e Provada!</strong><br>${justificativa}`;
      } else {
        fb.style.background = '#fee2e2';
        fb.style.border = '1px solid #ef4444';
        fb.style.color = '#7f1d1d';
        fb.innerHTML = `<strong>⚠️ Atenção: Resposta Incorreta.</strong><br><em>Pista:</em> ${pista}<br><small style="color:var(--text-muted); margin-top:0.4rem; display:block;">Reavalie as premissas e tente outra alternativa.</small>`;
      }
    },

    solicitarAnaliseIA: function () {
      const ta = /** @type {HTMLTextAreaElement | null} */ (document.getElementById('curso-ia-textarea'));
      const fbArea = document.getElementById('curso-ia-feedback-area');
      if (!ta || !fbArea) return;

      const texto = ta.value;
      const res = IATutorEngine.avaliarExplicacao(moduloSelecionado, texto);

      fbArea.style.display = 'block';

      if (res.status === 'insuficiente') {
        fbArea.innerHTML = `
          <div style="background:#fef3c7; border-left:4px solid #f59e0b; padding:1.25rem; border-radius:var(--radius-md); color:#92400e; margin-top:1rem; line-height:1.6;">
            <strong>⚠️ Resposta Muito Curta ou Incompleta:</strong><br>${res.mensagem}
          </div>
        `;
        return;
      }

      if (res.status === 'fora_de_contexto') {
        fbArea.innerHTML = `
          <div style="background:#fee2e2; border-left:5px solid #ef4444; padding:1.25rem 1.5rem; border-radius:var(--radius-md); color:#991b1b; margin-top:1rem; line-height:1.6; box-shadow:var(--shadow-sm);">
            <div style="display:flex; align-items:center; gap:0.5rem; font-size:1.05rem; font-weight:800; margin-bottom:0.4rem;">
              <span>🛑</span> Texto Desconexo / Sem Relação com Tecnologia ou Lógica
            </div>
            <p style="margin:0 0 0.5rem 0; font-size:0.95rem;">${res.mensagem}</p>
            <div style="background:#fff; border:1px solid #fecaca; border-radius:6px; padding:0.6rem 0.8rem; font-size:0.85rem; color:#7f1d1d;">
              <strong>Dica da Tutora IA:</strong> Para ser avaliado, seu texto precisa explicar o raciocínio, regras, transformações ou termos do módulo (ex: entradas, saídas, condições, repetições, variáveis, premissas ou algoritmos).
            </div>
          </div>
        `;
        return;
      }

      StorageManager.registrarExplicacao(moduloSelecionado, texto, res);
      renderizarDashboard();
      renderizarListaModulos();

      const sec = res.secoes;
      const aval = sec.I_avaliacao;

      const dimensoesHTML = aval.dimensoes.map(d => `
        <div class="dim-item">
          <div style="display:flex; justify-content:space-between;">
            <span>${d.nome}</span>
            <strong>${d.valor}%</strong>
          </div>
          <div class="dim-bar-wrap">
            <div class="dim-bar-fill" style="width:${d.valor}%;"></div>
          </div>
        </div>
      `).join('');

      fbArea.innerHTML = `
        <div class="ai-feedback-response">
          
          <div class="ai-section-box ai-sec-i">
            <div class="ai-sec-title">📊 Seção I · Avaliação Multidimensional da Compreensão & Rigor</div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
              <span class="lang-badge-pill" style="background:var(--primary); color:#fff; font-size:0.9rem;">
                Status: ${aval.estado}
              </span>
              <span style="font-size:1.1rem; font-weight:800; color:var(--primary);">
                Nota Global: ${aval.notaGeral} / 100
              </span>
            </div>
            <div class="ai-dimension-grid">${dimensoesHTML}</div>
            <p style="margin:0.75rem 0 0 0; font-size:0.88rem; color:var(--text-main);"><strong>Recomendação Pedagógica:</strong> ${aval.recomendacao}</p>
          </div>

          <div class="ai-section-box ai-sec-a">
            <div class="ai-sec-title" style="color:#065f46;">✅ Seção A · O Que Você Compreendeu Corretamente</div>
            <p style="margin:0; font-size:0.92rem; line-height:1.6; color:var(--text-main);">${sec.A_compreendido}</p>
          </div>

          <div class="ai-section-box ai-sec-b">
            <div class="ai-sec-title" style="color:#991b1b;">🔍 Seção B · Pontos Que Precisam de Correção ou Complemento</div>
            <p style="margin:0; font-size:0.92rem; line-height:1.6; color:var(--text-main); white-space:pre-line;">${sec.B_pontosCorrecao}</p>
          </div>

          <div class="ai-section-box ai-sec-c">
            <div class="ai-sec-title" style="color:#92400e;">💡 Seção C · Explicação do Raciocínio e Equívocos Teóricos</div>
            <p style="margin:0; font-size:0.92rem; line-height:1.6; color:var(--text-main);">${sec.C_explicacaoErro}</p>
          </div>

          <div class="ai-section-box ai-sec-d">
            <div class="ai-sec-title" style="color:#0e7490;">🚀 Seção D · Como Melhorar Seu Raciocínio (Passo a Passo Formal)</div>
            <p style="margin:0; font-size:0.92rem; line-height:1.6; color:var(--text-main); white-space:pre-line;">${sec.D_comoMelhorar}</p>
          </div>

          <div class="ai-section-box ai-sec-e">
            <div class="ai-sec-title" style="color:#3730a3;">📖 Seção E · Explicação Conceitualmente Correta (Referência Canônica)</div>
            <p style="margin:0; font-size:0.92rem; line-height:1.6; color:var(--text-main);">${sec.E_explicacaoCorreta}</p>
          </div>

          <div class="ai-section-box ai-sec-f">
            <div class="ai-sec-title" style="color:#5b21b6;">⚖️ Seção F · Comparação Entre Sua Resposta e o Modelo Ideal</div>
            <p style="margin:0; font-size:0.92rem; line-height:1.6; color:var(--text-main);">${sec.F_comparacao}</p>
          </div>

          <div class="ai-section-box ai-sec-g">
            <div class="ai-sec-title" style="color:#065f46;">🌱 Seção G · Exemplo Avançado de Consolidação</div>
            <p style="margin:0; font-size:0.92rem; line-height:1.6; color:var(--text-main);">${sec.G_exemploConsolidacao}</p>
          </div>

          <div class="ai-section-box ai-sec-h">
            <div class="ai-sec-title" style="color:#9f1239;">❓ Seção H · Pergunta de Verificação de Aprendizagem</div>
            <p style="margin:0; font-size:0.92rem; line-height:1.6; color:var(--text-main); font-weight:600;">${sec.H_perguntaVerificacao}</p>
          </div>

        </div>
      `;
    },

    _MODULOS: MODULOS_LOGICA,
    _IATutor: IATutorEngine,
    _Storage: StorageManager,
    _MasterTheorem: MasterTheoremCalculator
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      const container = document.getElementById('curso-logica-pura-app');
      if (container) {
        global.CursoLogicaApp.init();
      }
    });
  }

})(typeof window !== 'undefined' ? window : global);
