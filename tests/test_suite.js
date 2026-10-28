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
// 3. CARREGAMENTO E TESTES DO NOVO CURSO DE LÓGICA PURA (17 MÓDULOS)
// ────────────────────────────────────────────────────────────────────────────
console.log("\n📌 BLOCO 3: Testes de Integridade dos 17 Módulos de Lógica Pura");

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

// RELATÓRIO FINAL
console.log("\n========================================================");
console.log(`📊 RESULTADO FINAL DOS TESTES: ${passedTests} de ${totalTests} aprovados (${Math.round((passedTests/totalTests)*100)}%)`);
console.log("========================================================\n");
