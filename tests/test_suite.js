/**
 * ============================================================================
 * TEST SUITE: EDUMETODOLOGIAS & CURSO COMPLETO DE LÓGICA DE PROGRAMAÇÃO PURA
 * Executável via Node.js: `node tests/test_suite.js`
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

console.log("\n🧪 INICIANDO BATERIA DE TESTES AUTOMATIZADOS: PONCE METODOLOGIAS & LÓGICA PURA\n");

// ────────────────────────────────────────────────────────────────────────────
// 1. TESTES DE ALGORITMOS FUNDAMENTAIS EXISTENTES
// ────────────────────────────────────────────────────────────────────────────
console.log("📌 BLOCO 1: Testes de Algoritmos & Lógica Fundamental");

function calcularFatorial(n) {
  if (n <= 1) return 1;
  return n * calcularFatorial(n - 1);
}

assert(calcularFatorial(0) === 1, "calcularFatorial(0) deve retornar 1");
assert(calcularFatorial(1) === 1, "calcularFatorial(1) deve retornar 1");
assert(calcularFatorial(5) === 120, "calcularFatorial(5) deve retornar 120");
assert(calcularFatorial(7) === 5040, "calcularFatorial(7) deve retornar 5040");

function verificarPalindromo(str) {
  const limpo = str.toLowerCase().replace(/\s+/g, '');
  return limpo === limpo.split('').reverse().join('');
}

assert(verificarPalindromo("arara") === true, 'verificarPalindromo("arara") deve ser true');
assert(verificarPalindromo("radar") === true, 'verificarPalindromo("radar") deve ser true');
assert(verificarPalindromo("Ame o poema") === true, 'verificarPalindromo("Ame o poema") deve ser true');
assert(verificarPalindromo("software") === false, 'verificarPalindromo("software") deve ser false');

function filtrarPares(arr) {
  return arr.filter(n => n % 2 === 0);
}

assert(JSON.stringify(filtrarPares([1, 2, 3, 4, 5, 6])) === JSON.stringify([2, 4, 6]), "filtrarPares([1..6]) retorna [2,4,6]");
assert(JSON.stringify(filtrarPares([7, 9, 11])) === JSON.stringify([]), "filtrarPares([impares]) retorna []");

// ────────────────────────────────────────────────────────────────────────────
// 2. TESTES DE PRECISÃO FINANCEIRA
// ────────────────────────────────────────────────────────────────────────────
console.log("\n📌 BLOCO 2: Testes de Precisão Financeira & Tipagem");

function simularSomaDecimal(saldoCentavos, depositoCentavos) {
  return (saldoCentavos + depositoCentavos) / 100;
}

const saldoInicialCentavos = 150050; // R$ 1.500,50
const depositoCentavos = 25000;     // R$ 250,00
const saldoFinal = simularSomaDecimal(saldoInicialCentavos, depositoCentavos);
assert(saldoFinal === 1750.50, "Cálculo financeiro decimal exato de centavos");

// ────────────────────────────────────────────────────────────────────────────
// 3. CARREGAMENTO E TESTES DO CURSO DE LÓGICA PURA (22 MÓDULOS)
// ────────────────────────────────────────────────────────────────────────────
console.log("\n📌 BLOCO 3: Testes de Integridade dos 22 Módulos de Lógica Pura");

// Mock global environment para carregar js/curso-logica.js no Node
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = v.toString(); },
  removeItem(k) { delete this.store[k]; }
};

global.window = global;
eval(fs.readFileSync(path.join(__dirname, '../js/curso-logica-dados.js'), 'utf-8'));
eval(fs.readFileSync(path.join(__dirname, '../js/curso-logica-extras.js'), 'utf-8'));
eval(fs.readFileSync(path.join(__dirname, '../js/figuras-modulos.js'), 'utf-8'));
const cursoCode = fs.readFileSync(path.join(__dirname, '../js/curso-logica.js'), 'utf-8');
eval(cursoCode);

const app = global.CursoLogicaApp;
const modulos = app._MODULOS;
const iaTutor = app._IATutor;

assert(Array.isArray(modulos), "Array de módulos carregado com sucesso");
assert(modulos.length === 22, `Deve conter exatamente 22 módulos de lógica pura e CS avançada (encontrado: ${modulos.length})`);

// Teste da Calculadora do Teorema Mestre
const masterCalc = app._MasterTheorem;
const resTM = masterCalc.calcular(4, 2, 2);
assert(resTM.caso.includes("Caso 2"), "Calculadora do Teorema Mestre identifica Caso 2 corretamente para a=4, b=2, p=2");
assert(resTM.resultado.includes("n^2 log n"), "Complexidade assintótica calculada corretamente como Θ(n² log n)");
assert(masterCalc.calcular(8, 2, 1).caso.includes("Caso 1"), "Teorema Mestre: a=8, b=2, p=1 recai no Caso 1");
assert(masterCalc.calcular(1, 2, 1).caso.includes("Caso 3"), "Teorema Mestre: a=1, b=2, p=1 recai no Caso 3");
assert(!!masterCalc.calcular(0, 2, 1).erro, "Teorema Mestre rejeita a < 1");
assert(!!masterCalc.calcular(2, 1, 1).erro, "Teorema Mestre rejeita b <= 1");

// Validar se cada módulo possui todas as 13 seções pedagógicas padronizadas
modulos.forEach(m => {
  assert(m.id && m.titulo && m.objetivo, `Módulo ${m.id} (${m.titulo}) possui título e objetivo definidos`);
  assert(m.introducaoIntuitiva && m.introducaoIntuitiva.length > 20, `Módulo ${m.id} possui Introdução Intuitiva`);
  assert(m.explicacaoAprofundada && m.explicacaoAprofundada.length > 30, `Módulo ${m.id} possui Explicação Aprofundada`);
  assert(m.exemplos && m.exemplos.basico && m.exemplos.intermediario && m.exemplos.avancado, `Módulo ${m.id} possui 3 Exemplos Progressivos (Básico, Médio, Avançado)`);
  assert(Array.isArray(m.passoAPasso) && m.passoAPasso.length >= 3, `Módulo ${m.id} possui Metodologia Passo a Passo`);
  assert(Array.isArray(m.errosComuns) && m.errosComuns.length >= 1, `Módulo ${m.id} possui Erros Comuns mapeados`);
  assert(m.comparacaoSolucoes && m.comparacaoSolucoes.boa && m.comparacaoSolucoes.ruim, `Módulo ${m.id} possui Comparação entre Abordagens`);
  assert(Array.isArray(m.traceData) && m.traceData.length >= 1, `Módulo ${m.id} possui dados de Simulação de Trace de Memória`);
  assert(Array.isArray(m.exercicios) && m.exercicios.length >= 1, `Módulo ${m.id} possui Exercícios Inteligentes com justificativas`);
  assert(Array.isArray(m.keywordsIA) && m.keywordsIA.length >= 5, `Módulo ${m.id} possui Keywords para análise da IA`);
  const ex = global.CURSO_LOGICA_EXTRAS[m.id];
  assert(ex && ex.porQueImporta && ex.glossario.length >= 5 && ex.exemploResolvido.passos.length >= 3 && ex.praticas.length === 3 && ex.dicasEstudo.length >= 3 && ex.conexoes, `Módulo ${m.id} possui aprofundamento (motivação, glossário, exemplo resolvido, práticas, dicas)`);
  const fig = global.CURSO_LOGICA_FIGURAS[m.id];
  const svgPath = path.join(__dirname, '../img/modulos', `modulo-${String(m.id).padStart(2, '0')}.svg`);
  assert(fig && fig.titulo && fig.alt.length >= 40 && fig.legenda.length >= 40, `Módulo ${m.id} possui exemplo visual com título, texto alternativo e legenda`);
  const svg = fs.existsSync(svgPath) ? fs.readFileSync(svgPath, 'utf-8') : '';
  assert(svg.startsWith('<svg') && svg.includes('<title') && svg.includes('<desc') && !/<script|\son\w+=|https?:\/\/(?!www\.w3\.org)/i.test(svg), `Módulo ${m.id}: SVG existe, tem título/descrição e não contém script, eventos ou links externos`);
});

// ────────────────────────────────────────────────────────────────────────────
// 4. TESTES DO MOTOR DE IA TUTORA PEDAGÓGICA (SEÇÕES A ATÉ I)
// ────────────────────────────────────────────────────────────────────────────
console.log("\n📌 BLOCO 4: Testes da Inteligência Artificial Tutora e Avaliação Semântica");

// Teste 4.1: Resposta muito curta
const resCurta = iaTutor.avaliarExplicacao(1, "entendi tudo");
assert(resCurta.status === 'insuficiente', "IA rejeita respostas com menos de 6 palavras e solicita detalhamento");

// Teste 4.1.B: Resposta com palavras aleatórias sem ligação com tecnologia / lógica
const textoAleatorio = "pao de batata com queijo e calabresa frita junto de cucuz cucucz de amendin com tomate pera e matar alienigenas na china e no afeganistao";
const resAleatorio = iaTutor.avaliarExplicacao(1, textoAleatorio);
assert(resAleatorio.status === 'fora_de_contexto', "IA detecta e rejeita texto desconexo sem ligação com tecnologia/lógica");
assert(resAleatorio.mensagem.includes("não possui nenhuma ligação com a área de tecnologia"), "IA informa que o texto não tem ligação com tecnologia ou com a aula");

// Teste 4.2: Resposta aprofundada com conceitos corretos no Módulo 1
const textoBomM1 = "Neste modulo entendi que o pensamento logico parte de premissas claras para chegar a uma conclusao fundamentada. A validade da deducao decorre das regras formais e difere da verdade factual empírica dos fatos.";
const resBoaM1 = iaTutor.avaliarExplicacao(1, textoBomM1);

assert(resBoaM1.status === 'sucesso', "IA analisa resposta válida com sucesso");
assert(resBoaM1.hits.length >= 3, `IA identifica conceitos-chave presentes (identificou: ${resBoaM1.hits.join(', ')})`);
assert(resBoaM1.secoes.A_compreendido.length > 20, "Gera Seção A: O que você compreendeu corretamente");
assert(resBoaM1.secoes.B_pontosCorrecao.length > 20, "Gera Seção B: Pontos que precisam de correção ou complemento");
assert(resBoaM1.secoes.C_explicacaoErro.length > 20, "Gera Seção C: Explicação do raciocínio e equívocos");
assert(resBoaM1.secoes.D_comoMelhorar.length > 20, "Gera Seção D: Como melhorar seu raciocínio");
assert(resBoaM1.secoes.E_explicacaoCorreta.length > 20, "Gera Seção E: Explicação conceitualmente correta");
assert(resBoaM1.secoes.F_comparacao.length > 20, "Gera Seção F: Comparação entre a resposta e a ideia correta");
assert(resBoaM1.secoes.G_exemploConsolidacao.length > 20, "Gera Seção G: Exemplo novo para consolidação");
assert(resBoaM1.secoes.H_perguntaVerificacao.length > 10, "Gera Seção H: Pergunta de verificação");
assert(resBoaM1.secoes.I_avaliacao.dimensoes.length === 7, "Gera Seção I com 7 dimensões de avaliação cognitiva");

// Teste 4.3: Detecção de confusão clássica E vs OU no Módulo 7 (Lógica Proposicional)
const textoEquivocoM7 = "O operador E eh usado quando pelo menos uma das condicoes eh verdadeira na tabela verdade.";
const resEquivocoM7 = iaTutor.avaliarExplicacao(7, textoEquivocoM7);

assert(resEquivocoM7.status === 'sucesso', "IA processa explicação com equívoco");
assert(resEquivocoM7.secoes.B_pontosCorrecao.includes("Operador E") || resEquivocoM7.secoes.B_pontosCorrecao.includes("imprecisão"), "IA detecta a confusão entre o operador E e o OU inclusivo");

// ────────────────────────────────────────────────────────────────────────────
// 5. TESTES DE PROGRESSÃO E PERSISTÊNCIA
// ────────────────────────────────────────────────────────────────────────────
console.log("\n📌 BLOCO 5: Testes de Armazenamento e Histórico de Aprendizagem");

const storage = app._Storage;
const progInicial = storage.carregarProgresso();
assert(progInicial[1].estado === 'Em andamento', "Módulo 1 inicia como 'Em andamento'");
assert(progInicial[2].estado === 'Não iniciado', "Módulo 2 inicia como 'Não iniciado'");

storage.registrarExplicacao(1, textoBomM1, resBoaM1);
const progAtualizado = storage.carregarProgresso();
assert(progAtualizado[1].ultimaNota !== null, "Nota registrada com sucesso no progresso");

const hist = storage.carregarHistorico();
assert(hist.length === 1 && hist[0].moduloId === 1, "Histórico de explicações registrado com sucesso");

// Exportação/importação: o que foi exportado deve ser aceito e gravado nas chaves v2
const exportado = JSON.parse(JSON.stringify({ progresso: storage.carregarProgresso(), historico: storage.carregarHistorico() }));
const validado = storage.validarImportacao(exportado);
assert(validado && validado.progresso[1].ultimaNota === progAtualizado[1].ultimaNota, "Importação aceita um arquivo exportado pelo próprio site");
assert(validado && validado.historico.length === 1, "Importação preserva o histórico");
assert(storage.validarImportacao(null) === null, "Importação rejeita null");
assert(storage.validarImportacao({ progresso: 'x' }) === null, "Importação rejeita progresso que não é objeto");
assert(storage.validarImportacao({ progresso: { 999: { estado: 'Em andamento' } } }) === null, "Importação rejeita ids de módulo inexistentes");
const sujo = storage.validarImportacao({
  progresso: { 1: { estado: '<img src=x onerror=alert(1)>', ultimaNota: 9999, acertos: -5, extra: 'x' } },
  historico: [{ texto: 'a'.repeat(9000), estado: 'inválido', moduloId: 'abc' }]
});
assert(sujo && sujo.progresso[1].estado === 'Não iniciado', "Importação troca estado inválido por 'Não iniciado'");
assert(sujo && sujo.progresso[1].ultimaNota === 100 && sujo.progresso[1].acertos === 0, "Importação limita nota a 0–100 e acertos a >= 0");
assert(sujo && !('extra' in sujo.progresso[1]), "Importação descarta campos desconhecidos");
assert(sujo && sujo.historico[0].texto.length === 5000 && sujo.historico[0].estado === 'Não iniciado', "Importação limita tamanho do histórico e normaliza estado");

// ────────────────────────────────────────────────────────────────────────────
// 6. TESTES DO BANCO DE QUESTÕES E ANÁLISE DE RACIOCÍNIO
// ────────────────────────────────────────────────────────────────────────────
console.log("\n📌 BLOCO 6: Testes do Banco de Questões, Ideia Principal & Linha de Raciocínio");

eval(fs.readFileSync(path.join(__dirname, '../js/questoes-dados.js'), 'utf-8'));
const questoesBanco = global.QUESTOES_BANCO;

assert(questoesBanco && typeof questoesBanco === 'object', "Banco de questões carregado com sucesso");
const niveisEsperados = ["iniciante", "intermediario", "avancado", "expert"];

niveisEsperados.forEach(nivel => {
  const objNivel = questoesBanco[nivel];
  assert(objNivel && objNivel.rotulo && Array.isArray(objNivel.questoes), `Nível '${nivel}' existe e possui array de questões`);
  assert(objNivel.questoes.length >= 20, `Nível '${nivel}' possui ao menos 20 questões robustas (total: ${objNivel.questoes.length})`);

  objNivel.questoes.forEach((q, i) => {
    assert(q.tag && q.q && Array.isArray(q.o) && typeof q.c === 'number' && q.e, `Questão ${i+1} do nível '${nivel}' tem estrutura íntegra`);
    assert(q.c >= 0 && q.c < q.o.length, `Índice de resposta correta da Q${i+1} (${nivel}) é válido dentro do array de opções`);
  });
});

// ────────────────────────────────────────────────────────────────────────────
// 7. TESTES DO SISTEMA DE COOKIES, CONSENTIMENTO E PRIVACIDADE
// ────────────────────────────────────────────────────────────────────────────
console.log("\n📌 BLOCO 7: Testes do Sistema de Cookies & Consentimento (LGPD/Privacidade)");

// Mock de document.cookie para ambiente Node.js
let cookieStore = new Map();
global.document = global.document || {};
Object.defineProperty(global.document, 'cookie', {
  get() {
    const list = [];
    cookieStore.forEach((val, key) => {
      list.push(`${key}=${encodeURIComponent(val)}`);
    });
    return list.join('; ');
  },
  set(str) {
    if (!str) return;
    const parts = str.split(';');
    const first = parts[0].trim();
    const eqIdx = first.indexOf('=');
    if (eqIdx !== -1) {
      const key = first.substring(0, eqIdx).trim();
      const rawVal = first.substring(eqIdx + 1).trim();
      // Verifica se é instrução de expiração no passado (delete)
      const hasExpired = parts.some(p => {
        const lower = p.trim().toLowerCase();
        return lower.includes('expires=thu, 01 jan 1970') || lower.includes('max-age=0');
      });
      if (hasExpired) {
        cookieStore.delete(key);
      } else {
        try {
          cookieStore.set(key, decodeURIComponent(rawVal));
        } catch (e) {
          cookieStore.set(key, rawVal);
        }
      }
    }
  },
  configurable: true
});

global.location = { protocol: 'https:' };
global.window = global.window || { dispatchEvent: () => {} };

const PonceCookies = require('../js/cookies.js');

assert(typeof PonceCookies === 'object', "Módulo PonceCookies carregado com sucesso");
assert(typeof PonceCookies.setCookie === 'function', "PonceCookies possui função setCookie");
assert(typeof PonceCookies.getCookie === 'function', "PonceCookies possui função getCookie");
assert(typeof PonceCookies.deleteCookie === 'function', "PonceCookies possui função deleteCookie");
assert(typeof PonceCookies.getConsent === 'function', "PonceCookies possui função getConsent");
assert(typeof PonceCookies.saveConsent === 'function', "PonceCookies possui função saveConsent");

// Teste de escrita e leitura de cookie simples
cookieStore.clear();
PonceCookies.setCookie('teste_usuario', 'ponce_dev_2026', 30);
assert(PonceCookies.getCookie('teste_usuario') === 'ponce_dev_2026', "setCookie e getCookie gravam e recuperam valor correto");

// Teste de exclusão de cookie
PonceCookies.deleteCookie('teste_usuario');
assert(PonceCookies.getCookie('teste_usuario') === null, "deleteCookie remove o cookie com sucesso");

// Teste de consentimento completo (Aceitar Todos)
cookieStore.clear();
const consentAccepted = PonceCookies.saveConsent({ preferences: true, progress: true, status: 'accepted' });
assert(consentAccepted && consentAccepted.essential === true, "Consentimento aceito define cookies essenciais como true");
assert(consentAccepted.preferences === true, "Consentimento aceito define preferências como true");
assert(consentAccepted.progress === true, "Consentimento aceito define progresso como true");
assert(consentAccepted.status === 'accepted', "Status de consentimento registrado como 'accepted'");

const retrievedConsent = PonceCookies.getConsent();
assert(retrievedConsent && retrievedConsent.status === 'accepted', "getConsent recupera o objeto de consentimento gravado");

// Teste de consentimento restrito (Apenas Essenciais)
const consentEssential = PonceCookies.saveConsent({ preferences: false, progress: false, status: 'essential' });
assert(consentEssential.essential === true, "Consentimento essencial mantém essenciais ativos");
assert(consentEssential.preferences === false, "Consentimento essencial desativa preferências");
assert(consentEssential.progress === false, "Consentimento essencial desativa progresso");
assert(PonceCookies.getCookie(PonceCookies.COOKIE_THEME_KEY) === null, "Cookies de tema são excluídos quando preferências são rejeitadas");

// Teste de consentimento customizado
const consentCustom = PonceCookies.saveConsent({ preferences: true, progress: false, status: 'custom' });
assert(consentCustom.preferences === true && consentCustom.progress === false, "Consentimento personalizado salva opções granulares");

// Teste de listagem de todos os cookies
PonceCookies.setCookie('chave1', 'valor1');
PonceCookies.setCookie('chave2', 'valor2');
const todosCookies = PonceCookies.getAllCookies();
assert(todosCookies['chave1'] === 'valor1' && todosCookies['chave2'] === 'valor2', "getAllCookies retorna dicionário com todos os cookies");

// RELATÓRIO FINAL
console.log("\n========================================================");
console.log(`📊 RESULTADO FINAL DOS TESTES: ${passedTests} de ${totalTests} aprovados (${Math.round((passedTests/totalTests)*100)}%)`);
console.log("========================================================\n");

// Código de saída diferente de zero quando algum teste falha (necessário para o CI)
if (passedTests !== totalTests) process.exitCode = 1;
