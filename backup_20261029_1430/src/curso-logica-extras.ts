/**
 * ============================================================================
 * CONTEÚDO DE APROFUNDAMENTO — CURSO DE LÓGICA DE PROGRAMAÇÃO PURA
 * Complementa os 22 módulos de js/curso-logica.js com:
 *   • porQueImporta   → motivação prática do módulo
 *   • glossario       → vocabulário técnico essencial
 *   • exemploResolvido→ problema resolvido passo a passo (com código/trace)
 *   • praticas        → exercícios guiados para fazer no papel
 *   • dicasEstudo     → estratégias de estudo e armadilhas
 *   • conexoes        → ligação com o restante do curso
 * Conteúdo estático: renderizado com escape de HTML por curso-logica.js.
 * ============================================================================
 */
(function (global: any): void {
  'use strict';

  const EXTRAS: ExtrasCurso = {

    // ────────────────────────────────────────────────────────────────────────
    1: {
      porQueImporta: 'A maioria dos bugs não nasce de erros de digitação, e sim de raciocínio mal construído: premissas esquecidas, conclusões apressadas, casos que ninguém considerou. Treinar o pensamento lógico antes do código é treinar a parte mais cara da programação: decidir o que está certo.',
      glossario: [
        ['Premissa', 'Afirmação aceita como ponto de partida de um raciocínio.'],
        ['Conclusão', 'Afirmação que se pretende justificar a partir das premissas.'],
        ['Dedução', 'Raciocínio em que a conclusão decorre necessariamente das premissas (se as premissas são verdadeiras, a conclusão também é).'],
        ['Indução', 'Raciocínio que generaliza a partir de casos observados; a conclusão é provável, não garantida.'],
        ['Validade', 'Propriedade da FORMA do argumento: é impossível as premissas serem verdadeiras e a conclusão falsa.'],
        ['Solidez (soundness)', 'Argumento válido E com todas as premissas verdadeiras.'],
        ['Falácia', 'Erro de raciocínio que parece convincente, como a afirmação do consequente.'],
        ['Contraexemplo', 'Um único caso que refuta uma afirmação geral. É a ferramenta mais barata para derrubar uma "regra" falsa.']
      ],
      exemploResolvido: {
        titulo: 'Argumento válido ou falácia?',
        enunciado: 'Analise os dois argumentos: (A) "Todo múltiplo de 4 é par. 12 é múltiplo de 4. Logo, 12 é par." (B) "Todo múltiplo de 4 é par. 10 é par. Logo, 10 é múltiplo de 4."',
        passos: [
          'Escreva a forma de A: Todo M é P; x é M; logo x é P. Essa forma é válida (modus ponens aplicado a uma regra geral).',
          'Escreva a forma de B: Todo M é P; x é P; logo x é M. Isso é afirmação do consequente: ser par não implica ser múltiplo de 4.',
          'Procure um contraexemplo para B: o número 10 é par e NÃO é múltiplo de 4. Um único caso basta para refutar.',
          'Conclusão: A é válido; B é inválido, mesmo que as duas premissas de B sejam verdadeiras.'
        ],
        codigo: `SE x é múltiplo de 4 ENTÃO x é par      // verdadeiro
x = 10  → x é par                       // verdadeiro
Logo x é múltiplo de 4?                 // NÃO se segue (10 mod 4 = 2)`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Separe premissas e conclusão: "Como todo aluno aprovado tem média ≥ 7 e Marta tem média 8, Marta está aprovada."', dica: 'Pergunte: o que está sendo afirmado como ponto de partida? E o que se quer provar?' },
        { nivel: 'Intermediário', texto: 'Dê um contraexemplo para a afirmação: "Todo número primo é ímpar."', dica: 'Teste os menores primos: 2, 3, 5...' },
        { nivel: 'Avançado', texto: 'Construa um argumento VÁLIDO, mas com conclusão falsa. Explique qual premissa falha.', dica: 'Use uma premissa geral falsa, como "Todos os répteis voam".' }
      ],
      dicasEstudo: [
        'Sempre escreva as premissas em uma lista antes de concluir: o que está no papel não se perde.',
        'Desconfie de palavras como "obviamente" e "claramente": elas costumam esconder uma premissa não declarada.',
        'Procure ativamente um contraexemplo antes de aceitar uma regra geral.'
      ],
      conexoes: 'Este módulo sustenta tudo o que vem depois: as tabelas-verdade (Módulo 7) formalizam validade; invariantes (Módulos 9 e 14) são premissas que se mantêm a cada passo; Hoare (Módulo 20) é dedução aplicada a programas.'
    },

    // ────────────────────────────────────────────────────────────────────────
    2: {
      porQueImporta: 'Programadores experientes não "começam digitando": eles entendem, planejam, executam e revisam. Esse ciclo (Pólya) evita o pior padrão de iniciantes: escrever código sem saber o que se quer resolver, e depois remendar até "parecer funcionar".',
      glossario: [
        ['Incógnita', 'O que se deseja descobrir ou produzir.'],
        ['Dados', 'Informações fornecidas pelo problema.'],
        ['Condicionante / Restrição', 'Regra que limita as soluções aceitáveis.'],
        ['Heurística', 'Estratégia prática que costuma ajudar, mas não garante a solução (ex.: resolver um caso menor).'],
        ['Caso limítrofe (boundary)', 'Entrada nos extremos do domínio: vazio, zero, máximo, único elemento.'],
        ['Retrospecto', 'Fase final de Pólya: verificar, generalizar e buscar uma solução mais simples.']
      ],
      exemploResolvido: {
        titulo: 'Somar de 1 a 100 (o truque de Gauss)',
        enunciado: 'Calcule 1 + 2 + 3 + ... + 100 sem somar um a um.',
        passos: [
          '1) Compreender: incógnita = a soma; dados = números de 1 a 100; restrição = não somar um por um.',
          '2) Planejar: resolver um caso menor. Para 1..4, emparelhe extremos: (1+4) + (2+3) = 5 + 5 = 10.',
          '3) Executar: em 1..100 há 50 pares e cada par soma 101. Total = 50 × 101 = 5050.',
          '4) Retrospecto: generalize. Para n qualquer, a soma é n(n+1)/2. Teste n = 4: 4×5/2 = 10, confere. Para n = 1: 1, confere.'
        ],
        codigo: `LER n
soma <- n * (n + 1) / 2     // fórmula fechada: tempo constante
ESCREVER soma               // n = 100  →  5050`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Aplique as 4 etapas de Pólya ao problema: "Quantos azulejos de 20 cm cobrem um piso de 4 m × 3 m?"', dica: 'Atenção às unidades: converta tudo para centímetros antes de dividir.' },
        { nivel: 'Intermediário', texto: 'Liste 5 casos limítrofes para uma função que calcula a média de uma lista de números.', dica: 'Lista vazia, um elemento, negativos, valores iguais, números muito grandes.' },
        { nivel: 'Avançado', texto: 'Resolva por um caso menor: de quantas formas distintas 3 pessoas podem formar uma fila? E 4? Generalize.', dica: 'Liste as filas de 2, depois de 3; observe o padrão de multiplicação.' }
      ],
      dicasEstudo: [
        'Reescreva o enunciado com suas palavras. Se não consegue, você ainda não compreendeu.',
        'Quando travar, diminua o problema: resolva para n = 1, 2, 3 e procure o padrão.',
        'Reserve sempre um minuto para o retrospecto: é nele que a solução vira aprendizado.'
      ],
      conexoes: 'A etapa de plano usa decomposição (Módulo 11); o retrospecto usa testes (Módulo 13) e análise de eficiência (Módulo 15).'
    },

    // ────────────────────────────────────────────────────────────────────────
    3: {
      porQueImporta: 'Um algoritmo é a ideia por trás do programa, independente da linguagem. Aprender a descrevê-lo com precisão permite trocar de linguagem sem recomeçar do zero e comunicar soluções para outras pessoas.',
      glossario: [
        ['Algoritmo', 'Sequência finita de passos bem definidos que transforma entradas em saídas.'],
        ['Pré-condição', 'O que deve ser verdadeiro ANTES de executar (ex.: divisor ≠ 0).'],
        ['Pós-condição', 'O que será verdadeiro DEPOIS de executar, se a pré-condição valia.'],
        ['Finitude', 'O algoritmo termina após um número finito de passos.'],
        ['Determinismo', 'Mesma entrada, mesmo caminho e mesma saída.'],
        ['Efetividade', 'Cada passo é simples o bastante para ser executado sem ambiguidade.'],
        ['Pseudocódigo', 'Descrição estruturada de um algoritmo sem a sintaxe rígida de uma linguagem.']
      ],
      exemploResolvido: {
        titulo: 'Algoritmo de Euclides (MDC)',
        enunciado: 'Calcule o máximo divisor comum de 48 e 18.',
        passos: [
          'Pré-condição: a e b são inteiros positivos.',
          'Ideia: mdc(a, b) = mdc(b, a mod b); quando b = 0, o resultado é a.',
          'Trace: (48, 18) → 48 mod 18 = 12 → (18, 12) → 18 mod 12 = 6 → (12, 6) → 12 mod 6 = 0 → (6, 0). Resposta: 6.',
          'Finitude: o resto é sempre menor que o divisor, então b diminui estritamente e chega a 0.',
          'Pós-condição: o resultado divide a e b originais e é o maior com essa propriedade.'
        ],
        codigo: `ALGORITMO mdc(a, b)
    ENQUANTO b ≠ 0 FAÇA
        resto <- a MOD b
        a <- b
        b <- resto
    FIM_ENQUANTO
    RETORNAR a`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Escreva em passos numerados o algoritmo para preparar um café coado. Depois pergunte: algum passo é ambíguo?', dica: 'Um passo ambíguo é aquele que duas pessoas executariam de maneiras diferentes.' },
        { nivel: 'Intermediário', texto: 'Escreva as pré e pós-condições do algoritmo "encontrar o maior valor de uma lista".', dica: 'Pergunte: o que acontece se a lista estiver vazia?' },
        { nivel: 'Avançado', texto: 'Execute à mão mdc(84, 36) e justifique por que o algoritmo sempre termina.', dica: 'Mostre que o segundo argumento é um inteiro não negativo que decresce a cada iteração.' }
      ],
      dicasEstudo: [
        'Teste o algoritmo "em voz alta" com uma entrada concreta antes de escrever qualquer código.',
        'Se dois alunos executam seu algoritmo e chegam a resultados diferentes, ele não é determinístico — falta precisão.',
        'Toda vez que escrever um laço, pergunte: o que garante que ele termina?'
      ],
      conexoes: 'O trace do algoritmo anuncia a tabela de rastreamento (Módulo 5); finitude e correção são aprofundadas nos Módulos 14 e 20.'
    },

    // ────────────────────────────────────────────────────────────────────────
    4: {
      porQueImporta: 'Todo programa, de uma calculadora a um sistema bancário, recebe dados, transforma-os e devolve um resultado. Separar essas três fases deixa o código testável: dá para validar a entrada, testar o processamento isolado e trocar a saída (tela, arquivo, API) sem mexer na lógica.',
      glossario: [
        ['Entrada (Input)', 'Dado vindo do usuário, de um arquivo, de um sensor ou de outro sistema.'],
        ['Processamento', 'Transformação dos dados por operações e decisões.'],
        ['Saída (Output)', 'Resultado entregue ao exterior: tela, arquivo, resposta de API.'],
        ['Validação', 'Verificação de que a entrada pertence ao domínio esperado antes de usá-la.'],
        ['Constante', 'Valor fixo conhecido pelo algoritmo (ex.: π, alíquota).'],
        ['Domínio', 'Conjunto de valores que uma entrada pode legitimamente assumir.']
      ],
      exemploResolvido: {
        titulo: 'Converter segundos em horas, minutos e segundos',
        enunciado: 'Dado um total de 3725 segundos, exiba no formato h:min:s.',
        passos: [
          'Entrada: total (inteiro, deve ser ≥ 0 — validação).',
          'Processamento: horas = total DIV 3600 → 3725 DIV 3600 = 1; resto = 3725 MOD 3600 = 125.',
          'minutos = resto DIV 60 = 2; segundos = resto MOD 60 = 5.',
          'Saída: "1:2:5". Verificação: 1×3600 + 2×60 + 5 = 3725.'
        ],
        codigo: `LER total
SE total < 0 ENTÃO ESCREVER "valor inválido"
SENÃO
    horas    <- total DIV 3600
    resto    <- total MOD 3600
    minutos  <- resto DIV 60
    segundos <- resto MOD 60
    ESCREVER horas, ":", minutos, ":", segundos
FIM_SE`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Monte a tabela IPO para calcular o preço final de um produto com 10% de desconto.', dica: 'Entradas: preço. Processamento: preço × 0,90. Saída: preço final.' },
        { nivel: 'Intermediário', texto: 'No exercício anterior, quais validações a entrada exige?', dica: 'O preço pode ser negativo? Pode ser zero?' },
        { nivel: 'Avançado', texto: 'Crie um IPO para converter minutos totais de um filme em "X h Y min", tratando entrada inválida.', dica: 'Reaproveite o raciocínio de DIV e MOD do exemplo resolvido.' }
      ],
      dicasEstudo: [
        'Antes de codar, escreva três colunas no papel: Entradas, Processamento, Saídas.',
        'Pergunte sempre: "o que acontece se a entrada vier errada?"',
        'Evite misturar leitura, cálculo e impressão no mesmo bloco: separar facilita testes.'
      ],
      conexoes: 'A validação das entradas aprofunda-se no Módulo 13 (testes); o IPO aplicado em blocos vira funções no Módulo 12.'
    },

    // ────────────────────────────────────────────────────────────────────────
    5: {
      porQueImporta: 'Variáveis são o "estado" do programa. Quase todo bug de lógica pode ser entendido como um valor que ficou diferente do esperado em algum momento. Saber rastrear o estado passo a passo (tabela de trace) é a habilidade de depuração mais importante.',
      glossario: [
        ['Variável', 'Posição de memória com nome, tipo e valor atual.'],
        ['Atribuição', 'Ação de escrever um valor na variável (x ← expressão). Não é igualdade matemática.'],
        ['Tipo de dado', 'Conjunto de valores e operações permitidas (inteiro, real, texto, booleano).'],
        ['Estado', 'Conjunto dos valores de todas as variáveis em um instante.'],
        ['Trace table', 'Tabela que registra o estado após cada instrução.'],
        ['Inicialização', 'Dar um valor inicial à variável antes de usá-la.'],
        ['Ponto flutuante', 'Representação aproximada de números reais; pode gerar erros de arredondamento.']
      ],
      exemploResolvido: {
        titulo: 'Trocar o valor de duas variáveis (swap)',
        enunciado: 'Dado a = 3 e b = 7, troque os valores sem perder nenhum.',
        passos: [
          'Tentativa errada: a ← b; b ← a. Após a primeira linha, a = 7 e o 3 original foi perdido; b ← a copia 7 de novo.',
          'Solução: use uma variável auxiliar que guarda o valor antes de ele ser sobrescrito.',
          'Trace: temp ← a (temp=3); a ← b (a=7); b ← temp (b=3).',
          'Resultado: a = 7, b = 3. A ordem das instruções é parte da lógica.'
        ],
        codigo: `// Estado após cada linha
//                a    b    temp
// início         3    7    -
temp <- a      //  3    7    3
a    <- b      //  7    7    3
b    <- temp   //  7    3    3

// Atenção a este clássico de ponto flutuante (Python):
// 0.1 + 0.2 == 0.3      →  False   (resultado: 0.30000000000000004)`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Faça o trace de: x ← 5; y ← x + 2; x ← y * 2. Quais os valores finais de x e y?', dica: 'Após cada linha, escreva o valor de x e y.' },
        { nivel: 'Intermediário', texto: 'Explique por que x ← x + 1 não é uma equação impossível.', dica: 'Calcule o lado direito com o valor ANTIGO; depois sobrescreva x.' },
        { nivel: 'Avançado', texto: 'Troque a, b e c em rotação (a recebe b, b recebe c, c recebe a) usando uma só variável auxiliar. Faça o trace.', dica: 'Guarde o valor de a em temp antes de sobrescrevê-lo.' }
      ],
      dicasEstudo: [
        'Use caneta e papel: uma coluna por variável, uma linha por instrução.',
        'Nomes ruins (x1, tmp2) escondem bugs. Prefira nomes que respondam "o que isto guarda?".',
        'Nunca compare números decimais com == em cálculos financeiros; use inteiros em centavos ou tipos decimais.'
      ],
      conexoes: 'O trace é o motor do depurador (Módulo 13) e das provas de invariante (Módulo 14).'
    },

    // ────────────────────────────────────────────────────────────────────────
    6: {
      porQueImporta: 'Muitos erros misteriosos vêm de expressões avaliadas em uma ordem diferente da imaginada: precedência esquecida, divisão inteira onde se esperava real, comparação de tipos misturados. Dominar operadores é dominar o que o computador realmente calcula.',
      glossario: [
        ['Operando', 'Valor sobre o qual o operador atua.'],
        ['Precedência', 'Ordem em que operadores são avaliados numa expressão sem parênteses.'],
        ['Associatividade', 'Direção de avaliação entre operadores de mesma precedência (normalmente esquerda → direita).'],
        ['DIV / MOD', 'Quociente inteiro e resto da divisão inteira.'],
        ['Operador relacional', 'Compara valores e produz verdadeiro/falso (==, !=, <, >, <=, >=).'],
        ['Curto-circuito', 'Parar de avaliar uma expressão lógica assim que o resultado já está determinado.']
      ],
      exemploResolvido: {
        titulo: 'Avaliar uma expressão passo a passo',
        enunciado: 'Qual o valor de  2 + 3 * 4 ** 2 / 8 % 5  em Python?',
        passos: [
          'Precedência (maior → menor): ** primeiro; depois *, /, //, % (esquerda → direita); por fim +.',
          '4 ** 2 = 16.',
          'Da esquerda para a direita nos de mesma precedência: 3 * 16 = 48; 48 / 8 = 6.0; 6.0 % 5 = 1.0.',
          'Por fim 2 + 1.0 = 3.0.',
          'Moral: use parênteses sempre que a leitura não for óbvia.'
        ],
        codigo: `# Divisão e resto em Python (piso):
 7 // 2   →  3        7 % 2   →  1
-7 // 2   → -4       -7 % 2   →  1     # o resto tem o sinal do divisor

# Curto-circuito evita erro:
if divisor != 0 and (total / divisor) > 10:
    ...                  # se divisor == 0, a divisão nem é avaliada`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Calcule: 10 - 4 / 2 * 3 + 1 (divisão real).', dica: '4/2 = 2; 2*3 = 6; 10 - 6 + 1 = 5.' },
        { nivel: 'Intermediário', texto: 'Escreva a condição "ano é bissexto" usando %, and, or.', dica: 'Divisível por 4 e não por 100, OU divisível por 400.' },
        { nivel: 'Avançado', texto: 'Dê uma expressão que use curto-circuito para evitar acessar lista[i] quando i está fora do tamanho da lista.', dica: 'i < len(lista) and lista[i] > 0.' }
      ],
      dicasEstudo: [
        'Na dúvida sobre precedência, use parênteses: legibilidade vale mais que economia de caracteres.',
        'Descubra como SUA linguagem trata divisão inteira, resto de negativos e comparação de tipos.',
        'Memorize: relacional produz booleano; aritmético produz número.'
      ],
      conexoes: 'Operadores lógicos aqui são a porta de entrada para a álgebra de proposições (Módulo 7) e para as condições dos Módulos 8 e 9.'
    },

    // ────────────────────────────────────────────────────────────────────────
    7: {
      porQueImporta: 'Condições compostas mal montadas são uma das maiores fontes de bugs sutis: a tela libera um acesso que devia bloquear, o filtro de busca omite resultados. A tabela-verdade transforma intuição em verificação mecânica.',
      glossario: [
        ['Proposição', 'Sentença declarativa que é verdadeira ou falsa (nunca ambas).'],
        ['Conectivos', 'Operadores que combinam proposições: ¬ (não), ∧ (e), ∨ (ou), → (implica), ↔ (equivale).'],
        ['Tautologia', 'Fórmula sempre verdadeira, qualquer que seja a valoração.'],
        ['Contradição', 'Fórmula sempre falsa.'],
        ['Equivalência', 'Duas fórmulas com a mesma tabela-verdade.'],
        ['Leis de De Morgan', '¬(P ∧ Q) ≡ ¬P ∨ ¬Q   e   ¬(P ∨ Q) ≡ ¬P ∧ ¬Q.'],
        ['Contrapositiva', 'P → Q é equivalente a ¬Q → ¬P.']
      ],
      exemploResolvido: {
        titulo: 'Provar De Morgan por tabela-verdade',
        enunciado: 'Mostre que ¬(P ∧ Q) é equivalente a ¬P ∨ ¬Q.',
        passos: [
          'Com 2 variáveis há 2² = 4 linhas.',
          'Calcule P ∧ Q, depois sua negação; calcule ¬P, ¬Q e ¬P ∨ ¬Q.',
          'Compare as duas colunas finais linha a linha: são idênticas, logo as fórmulas são equivalentes.',
          'Uso prático: not (idade >= 18 and tem_doc) é o mesmo que idade < 18 or not tem_doc.'
        ],
        codigo: `  P  Q | P∧Q | ¬(P∧Q) | ¬P | ¬Q | ¬P∨¬Q
  V  V |  V  |   F     |  F |  F |   F
  V  F |  F  |   V     |  F |  V |   V
  F  V |  F  |   V     |  V |  F |   V
  F  F |  F  |   V     |  V |  V |   V
                 ↑ colunas iguais ↑

Implicação:  P → Q  ≡  ¬P ∨ Q   (só é falsa quando P=V e Q=F)`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Monte a tabela-verdade de P ∨ Q e de P XOR Q. Em qual linha elas diferem?', dica: 'Elas diferem quando P e Q são ambos verdadeiros.' },
        { nivel: 'Intermediário', texto: 'Aplique De Morgan para simplificar: not (a > 5 or b == 0).', dica: 'not(A or B) = not A and not B → a <= 5 and b != 0.' },
        { nivel: 'Avançado', texto: 'Verifique por tabela-verdade se P → Q é equivalente à sua contrapositiva ¬Q → ¬P. E à recíproca Q → P?', dica: 'A contrapositiva é equivalente; a recíproca não é.' }
      ],
      dicasEstudo: [
        'O número de linhas é 2ⁿ: com 3 variáveis, 8 linhas. Liste combinações sempre na mesma ordem.',
        'Resolva por colunas auxiliares: nunca tente a fórmula inteira de uma vez.',
        'Em código, prefira condições positivas e curtas; use De Morgan para desfazer negações aninhadas.'
      ],
      conexoes: 'As condições dos Módulos 8 e 9 são proposições; os circuitos de Hoare (Módulo 20) usam ∧, ¬ e → nas pré e pós-condições.'
    },

    // ────────────────────────────────────────────────────────────────────────
    8: {
      porQueImporta: 'Decisões são onde o programa "escolhe seu destino". Condicionais mal ordenadas ou incompletas geram os bugs que só aparecem em casos raros — exatamente os que mais custam em produção.',
      glossario: [
        ['Condição', 'Expressão booleana que direciona o fluxo.'],
        ['Ramo', 'Bloco de código executado quando a condição é satisfeita.'],
        ['Mutuamente exclusivos', 'Casos que nunca ocorrem juntos.'],
        ['Exaustivos', 'Casos que, juntos, cobrem todas as possibilidades.'],
        ['Guarda (guard clause)', 'Teste inicial que encerra a função cedo quando a entrada é inválida.'],
        ['Código morto', 'Trecho que nunca é executado (geralmente por condições mal ordenadas).']
      ],
      exemploResolvido: {
        titulo: 'Ano bissexto com condicionais corretas',
        enunciado: 'Decida se um ano é bissexto: divisível por 4, exceto os divisíveis por 100, a menos que também sejam divisíveis por 400.',
        passos: [
          'Traduza a regra em proposições: D4, D100, D400.',
          'Bissexto = (D4 ∧ ¬D100) ∨ D400.',
          'Teste 2024: D4 = V, D100 = F → bissexto. Teste 1900: D4 = V, D100 = V, D400 = F → não. Teste 2000: D400 = V → sim. Teste 2023: D4 = F → não.',
          'Os quatro casos escolhidos cobrem os quatro "comportamentos" da regra.'
        ],
        codigo: `SE ano MOD 400 = 0 ENTÃO
    bissexto <- VERDADEIRO
SENÃO SE ano MOD 100 = 0 ENTÃO
    bissexto <- FALSO
SENÃO SE ano MOD 4 = 0 ENTÃO
    bissexto <- VERDADEIRO
SENÃO
    bissexto <- FALSO
FIM_SE
// A ordem importa: testar "MOD 4" primeiro classificaria 1900 errado.`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Escreva as condições para classificar uma temperatura: abaixo de 15 "frio", 15 a 25 "agradável", acima de 25 "quente".', dica: 'Cubra todos os valores, inclusive 15 e 25 exatos.' },
        { nivel: 'Intermediário', texto: 'Classifique um triângulo (equilátero, isósceles, escaleno) e antes verifique se os lados formam um triângulo.', dica: 'Desigualdade triangular: cada lado menor que a soma dos outros dois.' },
        { nivel: 'Avançado', texto: 'Reescreva três "if" aninhados usando guard clauses (retorno antecipado). O que melhora na leitura?', dica: 'Trate primeiro as entradas inválidas e retorne; o caminho feliz fica sem aninhamento.' }
      ],
      dicasEstudo: [
        'Pergunte: meus casos cobrem TODAS as possibilidades e não se sobrepõem?',
        'Teste sempre os valores de fronteira (a diferença entre < e <= é um clássico).',
        'Se um if tem mais de três níveis de aninhamento, procure simplificar com guardas ou funções.'
      ],
      conexoes: 'Combina com a lógica proposicional (Módulo 7); a regra do condicional em Hoare (Módulo 20) formaliza a prova de cada ramo.'
    },

    // ────────────────────────────────────────────────────────────────────────
    9: {
      porQueImporta: 'Laços permitem processar milhões de itens com poucas linhas, mas são também onde moram os erros "por um" (off-by-one) e os travamentos por loop infinito. Entender o que muda e o que se mantém a cada volta é a chave da corretude.',
      glossario: [
        ['Iteração', 'Uma execução do corpo do laço.'],
        ['Variável de controle', 'Variável que governa a continuação (ex.: i).'],
        ['Acumulador', 'Variável que junta resultados parciais (soma, produto, contador).'],
        ['Condição de parada', 'Condição cuja falsidade encerra o laço.'],
        ['Invariante de laço', 'Propriedade verdadeira antes e depois de cada iteração.'],
        ['Off-by-one', 'Erro de um a mais ou a menos nos limites do laço.'],
        ['Variante', 'Quantidade inteira que diminui a cada iteração e garante a terminação.']
      ],
      exemploResolvido: {
        titulo: 'Somar de 1 a n com invariante',
        enunciado: 'Some os inteiros de 1 a n usando um laço e mostre a propriedade que se mantém.',
        passos: [
          'Invariante: no início de cada iteração, soma = 1 + 2 + ... + (i − 1).',
          'Inicialização: soma = 0 e i = 1 → soma da faixa vazia = 0 (invariante vale).',
          'Manutenção: soma ← soma + i e i ← i + 1 preservam a propriedade.',
          'Terminação: o laço sai quando i = n + 1, então soma = 1 + ... + n.',
          'Trace para n = 4: (i=1, soma=0) → (2,1) → (3,3) → (4,6) → (5,10). Resultado 10.'
        ],
        codigo: `soma <- 0
i <- 1
ENQUANTO i <= n FAÇA
    soma <- soma + i
    i <- i + 1
FIM_ENQUANTO
// variante: (n + 1 - i) diminui 1 a cada volta → o laço termina`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Faça o trace de um laço que soma os números pares de 1 a 10 e informe o valor final.', dica: 'Resultado esperado: 2+4+6+8+10 = 30.' },
        { nivel: 'Intermediário', texto: 'Quantas vezes executa "PARA i DE 1 ATÉ n"? E "PARA i DE 0 ATÉ n"? Explique o off-by-one.', dica: 'O primeiro executa n vezes; o segundo, n + 1.' },
        { nivel: 'Avançado', texto: 'Escreva um laço que conta quantos dígitos tem um inteiro positivo, e identifique a variante.', dica: 'Divida por 10 a cada volta; a variante é o próprio número.' }
      ],
      dicasEstudo: [
        'Antes de escrever um laço, responda: o que inicializar, quando parar, o que muda a cada volta?',
        'Teste com n = 0 e n = 1: laços costumam falhar nos extremos.',
        'Prefira laços com contagem determinística (for) quando o número de repetições é conhecido.'
      ],
      conexoes: 'Invariantes e variantes são formalizadas no Módulo 14; o custo do laço aparece no Módulo 15; a recursão (Módulo 18) é a outra forma de repetir.'
    },

    // ────────────────────────────────────────────────────────────────────────
    10: {
      porQueImporta: 'Desenhar o fluxo antes de codar expõe caminhos esquecidos e ramos sem saída. Em equipes, o fluxograma é uma linguagem comum entre quem programa e quem conhece a regra de negócio.',
      glossario: [
        ['Terminador (oval)', 'Marca início e fim do fluxo.'],
        ['Processo (retângulo)', 'Operação ou atribuição.'],
        ['Entrada/Saída (paralelogramo)', 'Leitura ou escrita de dados.'],
        ['Decisão (losango)', 'Teste com duas ou mais saídas rotuladas.'],
        ['Conector', 'Símbolo que liga partes do diagrama.'],
        ['Complexidade ciclomática', 'Número de caminhos independentes ≈ decisões + 1; mede o esforço de teste.']
      ],
      exemploResolvido: {
        titulo: 'Fluxograma de "par ou ímpar"',
        enunciado: 'Represente o algoritmo que lê um número e informa se ele é par ou ímpar.',
        passos: [
          'Terminador de início → paralelogramo "Ler n".',
          'Losango "n MOD 2 = 0?" com duas saídas rotuladas Sim / Não.',
          'Sim → paralelogramo "Escrever: par". Não → paralelogramo "Escrever: ímpar".',
          'Os dois ramos convergem ao terminador de fim.',
          'Complexidade ciclomática = 1 decisão + 1 = 2 caminhos, portanto 2 testes cobrem tudo (um par, um ímpar).'
        ],
        codigo: `   ( Início )
        │
   / Ler n /
        │
  < n MOD 2 = 0 ? >
   Sim │        │ Não
 / Escrever  / Escrever
   "par"  /     "ímpar" /
        └────┬────┘
        ( Fim )`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Desenhe o fluxograma que lê dois números e escreve o maior.', dica: 'Um losango, dois ramos, convergência no fim.' },
        { nivel: 'Intermediário', texto: 'Desenhe um fluxograma com laço: ler números até o usuário digitar 0 e exibir a soma.', dica: 'O laço é uma seta que volta para antes do losango.' },
        { nivel: 'Avançado', texto: 'Calcule a complexidade ciclomática de um fluxograma com 3 losangos independentes e diga quantos casos de teste mínimos são necessários.', dica: '3 + 1 = 4 caminhos independentes.' }
      ],
      dicasEstudo: [
        'Todo losango deve ter ao menos duas saídas rotuladas.',
        'Evite cruzar setas: se o desenho ficou emaranhado, o algoritmo provavelmente precisa ser decomposto.',
        'Fluxo da esquerda para a direita e de cima para baixo facilita a leitura.'
      ],
      conexoes: 'Os caminhos do fluxograma viram casos de teste (Módulo 13); blocos complexos viram funções (Módulo 12).'
    },

    // ────────────────────────────────────────────────────────────────────────
    11: {
      porQueImporta: 'Problemas reais são grandes demais para caber na cabeça. Dividir em partes, reconhecer padrões repetidos e ignorar detalhes irrelevantes é o que permite construir sistemas com milhões de linhas.',
      glossario: [
        ['Decomposição', 'Quebrar um problema em subproblemas menores e independentes.'],
        ['Abstração', 'Ocultar detalhes irrelevantes para focar no essencial.'],
        ['Reconhecimento de padrões', 'Perceber estruturas repetidas que podem ser reaproveitadas.'],
        ['Acoplamento', 'Grau de dependência entre módulos (quanto menor, melhor).'],
        ['Coesão', 'Quão focado em uma única responsabilidade é um módulo (quanto maior, melhor).'],
        ['Modelo', 'Representação simplificada de uma parte da realidade.']
      ],
      exemploResolvido: {
        titulo: 'Sistema de notas de uma turma',
        enunciado: 'Gere um relatório de aprovados/reprovados para uma turma a partir das notas de cada aluno.',
        passos: [
          'Decompor: (1) ler notas; (2) calcular média de cada aluno; (3) classificar; (4) montar o relatório.',
          'Abstrair: o aluno é modelado só por nome e lista de notas — cor do cabelo e idade são irrelevantes aqui.',
          'Padrão: calcular média, achar maior nota e contar aprovados seguem o mesmo molde "percorrer acumulando".',
          'Cada parte vira uma função com entrada e saída bem definidas, testável isoladamente.'
        ],
        codigo: `FUNÇÃO media(notas)         → real
FUNÇÃO situacao(media)      → "aprovado" | "recuperação" | "reprovado"
FUNÇÃO relatorio(alunos)    → texto

// Padrão comum a vários problemas ("percorrer acumulando"):
acc <- valor_inicial
PARA CADA item EM colecao FAÇA
    acc <- combinar(acc, item)
FIM_PARA`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Decomponha "organizar uma viagem de fim de semana" em pelo menos 5 subproblemas.', dica: 'Destino, transporte, hospedagem, orçamento, roteiro.' },
        { nivel: 'Intermediário', texto: 'Que informações um cadastro de biblioteca precisa guardar sobre um livro? E o que NÃO precisa?', dica: 'Abstrair é decidir o que deixar de fora.' },
        { nivel: 'Avançado', texto: 'Identifique o padrão comum entre "somar valores", "achar o maior" e "contar pares" e escreva uma função genérica.', dica: 'Todos têm valor inicial, laço e regra de combinação.' }
      ],
      dicasEstudo: [
        'Se um bloco faz mais de uma coisa descrita com "e", divida-o.',
        'Dê a cada parte um nome que descreva sua responsabilidade; se for difícil, a divisão está ruim.',
        'Teste cada parte isoladamente antes de juntar.'
      ],
      conexoes: 'Cada subproblema vira função no Módulo 12; a divisão e conquista (Módulo 19) é decomposição aplicada à eficiência.'
    },

    // ────────────────────────────────────────────────────────────────────────
    12: {
      porQueImporta: 'Funções eliminam repetição, nomeiam ideias e permitem testar partes isoladas. Quando uma regra muda, você altera em um único lugar em vez de caçar dezenas de cópias.',
      glossario: [
        ['Parâmetro', 'Variável declarada na assinatura da função.'],
        ['Argumento', 'Valor concreto passado na chamada.'],
        ['Retorno', 'Valor entregue ao código que chamou a função.'],
        ['Escopo', 'Região do programa onde um nome é visível.'],
        ['Função pura', 'Mesma entrada → mesma saída, sem efeitos colaterais.'],
        ['Efeito colateral', 'Qualquer alteração fora da função (imprimir, mudar global, gravar arquivo).'],
        ['DRY', "Don't Repeat Yourself: cada conhecimento deve ter uma única representação."]
      ],
      exemploResolvido: {
        titulo: 'Função pura versus impura',
        enunciado: 'Compare duas versões de uma função que soma um valor a um total.',
        passos: [
          'Versão impura: altera uma variável global; o resultado depende do estado oculto e dificulta testes.',
          'Versão pura: recebe tudo por parâmetro e devolve o resultado; é previsível e fácil de testar.',
          'Atenção em Python: argumentos padrão mutáveis (lista=[]) são criados UMA vez e compartilhados entre chamadas.',
          'Correção: use None como padrão e crie a lista dentro da função.'
        ],
        codigo: `total = 0
def somar_impura(x):          # depende e altera estado externo
    global total
    total += x

def somar_pura(total, x):     # tudo explícito
    return total + x

# Armadilha clássica (Python):
def add(x, lista=[]):         # a MESMA lista é reaproveitada!
    lista.append(x); return lista
def add_ok(x, lista=None):
    lista = [] if lista is None else lista
    lista.append(x); return lista`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Escreva a função area_retangulo(base, altura) e chame com 3 pares de valores.', dica: 'Use return, não print, para devolver o valor.' },
        { nivel: 'Intermediário', texto: 'Qual a diferença entre uma função que imprime o resultado e outra que o retorna? Quando cada uma é útil?', dica: 'Pense em reaproveitar o valor em outro cálculo.' },
        { nivel: 'Avançado', texto: 'Reescreva uma função que modifica uma lista recebida para que devolva uma nova lista, sem alterar a original.', dica: 'Construa e retorne uma cópia.' }
      ],
      dicasEstudo: [
        'Uma boa função faz uma coisa só, e seu nome deve dizer qual é.',
        'Prefira parâmetros a variáveis globais.',
        'Se precisa de um comentário para explicar um bloco, talvez ele deva ser uma função com nome claro.'
      ],
      conexoes: 'Funções são a base da recursão (Módulo 18) e dos contratos pré/pós-condição de Hoare (Módulo 20).'
    },

    // ────────────────────────────────────────────────────────────────────────
    13: {
      porQueImporta: 'Código não testado é só uma hipótese. Testar com disciplina encontra defeitos barato (na hora de escrever) em vez de caro (em produção). Depurar bem economiza horas de tentativa e erro.',
      glossario: [
        ['Caso de teste', 'Entrada + saída esperada.'],
        ['Partição de equivalência', 'Agrupar entradas que o programa trata da mesma forma e testar um representante de cada grupo.'],
        ['Valor limite', 'Entrada na fronteira entre classes; onde mais se erra.'],
        ['Teste de regressão', 'Reexecutar testes antigos para garantir que a mudança não quebrou nada.'],
        ['Depuração', 'Localizar e corrigir a causa-raiz de um defeito.'],
        ['Asserção', 'Afirmação que o programa verifica em tempo de execução.'],
        ['Contraexemplo de teste', 'Entrada que mostra que o programa está errado.']
      ],
      exemploResolvido: {
        titulo: 'Projetar casos de teste para a classificação de notas',
        enunciado: 'Regra: 0–4,9 reprovado; 5–6,9 recuperação; 7–10 aprovado; fora de 0–10 é inválido.',
        passos: [
          'Particione: inválida (< 0), reprovado, recuperação, aprovado, inválida (> 10).',
          'Escolha um representante central de cada classe (ex.: 3, 6, 8.5).',
          'Acrescente os valores limite: −1, 0, 4.9, 5, 6.9, 7, 10, 11.',
          'Com cerca de 11 casos você cobre as 5 classes e todas as fronteiras.',
          'Se um teste falha: reproduza, isole (busca binária no código), formule hipótese, corrija e reexecute TODOS os testes.'
        ],
        codigo: `def classificar(nota):
    if nota < 0 or nota > 10: return "inválida"
    if nota < 5: return "reprovado"
    if nota < 7: return "recuperação"
    return "aprovado"

testes = {-1:"inválida", 0:"reprovado", 4.9:"reprovado", 5:"recuperação",
          6.9:"recuperação", 7:"aprovado", 10:"aprovado", 11:"inválida"}
for entrada, esperado in testes.items():
    assert classificar(entrada) == esperado, entrada`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Liste 6 casos de teste para uma função que informa se um número é positivo.', dica: 'Negativo, zero, positivo, muito grande, decimal, fronteira.' },
        { nivel: 'Intermediário', texto: 'Um programa deveria calcular a média, mas divide a soma por n+1. Que teste simples revelaria o erro?', dica: 'Use uma lista com um único elemento.' },
        { nivel: 'Avançado', texto: 'Descreva o método científico de depuração em 5 passos aplicado a um bug que você já teve.', dica: 'Observar, hipótese, experimento, conclusão, correção + novo teste.' }
      ],
      dicasEstudo: [
        'Escreva o teste ANTES de corrigir o bug: assim ele nunca mais volta.',
        'Mude uma coisa por vez ao depurar, senão você não sabe o que resolveu.',
        'Explicar o problema em voz alta (rubber duck) frequentemente revela a causa.'
      ],
      conexoes: 'Testes provam presença de defeitos, não ausência; para garantir ausência usamos invariantes e Hoare (Módulos 14 e 20).'
    },

    // ────────────────────────────────────────────────────────────────────────
    14: {
      porQueImporta: 'Testes mostram que o algoritmo funciona nos casos escolhidos; uma prova de corretude mostra que funciona em TODOS. Invariantes são o instrumento prático para essa prova e também guiam a escrita do laço correto desde o início.',
      glossario: [
        ['Correção parcial', 'Se o algoritmo termina, o resultado está correto.'],
        ['Terminação', 'O algoritmo sempre termina.'],
        ['Correção total', 'Correção parcial + terminação.'],
        ['Invariante de laço', 'Propriedade que vale antes do laço, a cada iteração e depois dele.'],
        ['Inicialização', 'Fase 1: a invariante vale antes da primeira iteração.'],
        ['Manutenção', 'Fase 2: se vale antes de uma iteração, vale depois.'],
        ['Terminação (prova)', 'Fase 3: ao sair, invariante + condição de parada implicam a pós-condição.']
      ],
      exemploResolvido: {
        titulo: 'Provar que o algoritmo do máximo está correto',
        enunciado: 'Prove que o laço abaixo devolve o maior elemento de uma lista não vazia.',
        passos: [
          'Invariante: no início da iteração i, m é o maior entre lista[0..i−1].',
          'Inicialização: com m = lista[0] e i = 1, o maior da faixa [0..0] é lista[0]. Vale.',
          'Manutenção: se lista[i] > m, m recebe lista[i]; senão m permanece. Em ambos os casos m é o maior de [0..i].',
          'Terminação: o laço sai com i = n; pela invariante, m é o maior de [0..n−1], isto é, de toda a lista. A variante (n − i) decresce, então o laço termina.'
        ],
        codigo: `m <- lista[0]
i <- 1
ENQUANTO i < n FAÇA          // invariante: m = max(lista[0..i-1])
    SE lista[i] > m ENTÃO m <- lista[i]
    i <- i + 1
FIM_ENQUANTO
// pós-condição: m = max(lista[0..n-1])`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Escreva uma invariante para o laço que calcula o produto 1×2×...×n.', dica: 'produto = (i−1)! no início da iteração i.' },
        { nivel: 'Intermediário', texto: 'Qual invariante sustenta a busca binária? Pense no intervalo [baixo, alto].', dica: 'Se o alvo existe, ele está dentro de [baixo, alto].' },
        { nivel: 'Avançado', texto: 'Dê um laço que termina, mas cuja invariante é inútil (não implica a pós-condição). O que isso mostra?', dica: 'Uma invariante verdadeira não basta: precisa implicar a meta na saída.' }
      ],
      dicasEstudo: [
        'Escreva a invariante ANTES do corpo do laço; ela diz o que o corpo precisa fazer.',
        'Invariante é diferente de condição de parada: uma é "o que se mantém", a outra é "quando acaba".',
        'A prova é uma indução: base (inicialização) e passo (manutenção).'
      ],
      conexoes: 'É a versão informal das triplas de Hoare (Módulo 20) e usa a mesma ideia de indução da recursão (Módulo 18).'
    },

    // ────────────────────────────────────────────────────────────────────────
    15: {
      porQueImporta: 'Um algoritmo correto mas lento pode ser inutilizável. A notação Big-O permite comparar soluções pelo crescimento do custo, sem depender da máquina, e antecipar se o programa aguentará 10 ou 10 milhões de itens.',
      glossario: [
        ['Notação O (Big-O)', 'Limite superior assintótico do crescimento do custo.'],
        ['Θ (Theta)', 'Limite justo: o custo cresce exatamente nessa ordem.'],
        ['Ω (Ômega)', 'Limite inferior assintótico.'],
        ['Pior / melhor / médio caso', 'Custo para a entrada mais desfavorável, mais favorável e a esperada.'],
        ['Complexidade de tempo', 'Quantidade de operações em função de n.'],
        ['Complexidade de espaço', 'Memória extra em função de n.'],
        ['Constante oculta', 'Fatores que a notação ignora mas existem na prática.']
      ],
      exemploResolvido: {
        titulo: 'Detectar duplicatas: O(n²) versus O(n)',
        enunciado: 'Verifique se uma lista de n números contém repetidos.',
        passos: [
          'Versão 1: comparar todos os pares. Há n(n−1)/2 comparações → O(n²).',
          'Versão 2: percorrer a lista guardando os já vistos em um conjunto (hash). Cada consulta/inserção é O(1) em média → O(n) tempo, O(n) espaço.',
          'Troca típica: gastamos memória para ganhar tempo.',
          'Para n = 1.000.000: V1 ≈ 5×10¹¹ operações (inviável); V2 ≈ 10⁶ (instantâneo).'
        ],
        codigo: `# O(n²) tempo, O(1) espaço
def tem_dup_lento(v):
    for i in range(len(v)):
        for j in range(i + 1, len(v)):
            if v[i] == v[j]: return True
    return False

# O(n) tempo, O(n) espaço
def tem_dup_rapido(v):
    vistos = set()
    for x in v:
        if x in vistos: return True
        vistos.add(x)
    return False

#   n = 1000:  log2 n ≈ 10 | n log n ≈ 10.000 | n² = 1.000.000 | 2^n ≈ 10^301`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Classifique em Big-O: (a) acessar v[0]; (b) somar todos os elementos; (c) dois laços aninhados sobre n.', dica: 'O(1), O(n), O(n²).' },
        { nivel: 'Intermediário', texto: 'Quantas comparações faz a busca binária em 1.000.000 de itens, no pior caso?', dica: 'log₂(10⁶) ≈ 20.' },
        { nivel: 'Avançado', texto: 'Explique por que 3n² + 5n + 100 é O(n²). O que acontece com os termos menores quando n é grande?', dica: 'Descarte constantes multiplicativas e termos de menor ordem.' }
      ],
      dicasEstudo: [
        'Conte laços aninhados: cada nível sobre n costuma multiplicar por n.',
        'Divisão repetida da entrada pela metade quase sempre indica log n.',
        'Big-O descreve crescimento, não tempo em segundos; meça também na prática (profiling).'
      ],
      conexoes: 'A análise de recursões usa recorrências e o Teorema Mestre (Módulo 18); classes P e NP (Módulo 22) são o limite teórico do que é eficiente.'
    },

    // ────────────────────────────────────────────────────────────────────────
    16: {
      porQueImporta: 'Muitos problemas exigem examinar possibilidades de forma organizada, eliminar o impossível e deduzir o restante. Esse raciocínio é o mesmo usado em validação de regras de negócio, solvers e depuração.',
      glossario: [
        ['Hipótese', 'Suposição temporária cujas consequências serão testadas.'],
        ['Redução ao absurdo', 'Supor o contrário do que se quer provar e chegar a uma contradição.'],
        ['Princípio da casa dos pombos', 'Se n+1 objetos são colocados em n caixas, alguma caixa tem ao menos 2.'],
        ['Poda', 'Descartar ramos de busca que já violam as restrições.'],
        ['Análise de casos', 'Dividir em situações exaustivas e tratá-las separadamente.'],
        ['Matriz de decisão', 'Tabela com todas as combinações de condições e suas consequências.']
      ],
      exemploResolvido: {
        titulo: 'Cavaleiros e patifes',
        enunciado: 'Numa ilha, cavaleiros sempre dizem a verdade e patifes sempre mentem. A diz: "Nós dois somos patifes." Quem é quem?',
        passos: [
          'Hipótese 1: A é cavaleiro. Então a frase é verdadeira, logo A é patife — contradição. A hipótese cai.',
          'Portanto A é patife (redução ao absurdo).',
          'Se A é patife, sua frase é falsa: "ambos são patifes" é falso, então ao menos um não é patife.',
          'Como A é patife, B é cavaleiro. Conclusão: A é patife, B é cavaleiro.'
        ],
        codigo: `// Verificação por força bruta (todas as 2² combinações)
PARA A_cav EM {V, F}, B_cav EM {V, F}:
    frase <- (NÃO A_cav) E (NÃO B_cav)       // "ambos patifes"
    consistente <- (A_cav == frase)          // cavaleiro diz verdade
    SE consistente ENTÃO imprimir A_cav, B_cav
// Única solução consistente: A_cav=F, B_cav=V

// Pombos: entre 13 pessoas, ao menos 2 nasceram no mesmo mês.`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Entre 367 pessoas, prove que duas fazem aniversário no mesmo dia.', dica: 'São 366 datas possíveis (incluindo 29/02).' },
        { nivel: 'Intermediário', texto: 'Modele com tabela de decisão: "frete grátis se compra ≥ 200 OU cliente premium; entrega expressa só se frete pago".', dica: 'Liste as combinações das condições e o resultado de cada.' },
        { nivel: 'Avançado', texto: 'No problema das 4 rainhas, explique como a poda reduz as 256 posições para poucas tentativas.', dica: 'Ao colocar a segunda rainha numa coluna atacada, descarte todo o ramo.' }
      ],
      dicasEstudo: [
        'Enumere os casos de forma sistemática e marque cada um como eliminado ou possível.',
        'Em enigmas, procure a hipótese que gera contradição mais rápido.',
        'Registre as deduções em uma tabela para não repetir raciocínio.'
      ],
      conexoes: 'A poda aparece em backtracking (Módulo 19); reduções ao absurdo são a base da prova do problema da parada (Módulo 21).'
    },

    // ────────────────────────────────────────────────────────────────────────
    17: {
      porQueImporta: 'Resolver um exercício isolado é diferente de construir uma solução completa. Os desafios integradores combinam decomposição, estruturas, testes e justificativas — o trabalho cotidiano de quem programa.',
      glossario: [
        ['Requisito', 'O que o sistema deve fazer.'],
        ['Modelagem', 'Escolha de dados e estruturas que representam o problema.'],
        ['Critério de aceitação', 'Condição objetiva para considerar a solução correta.'],
        ['Pilha (stack)', 'Estrutura LIFO: último a entrar é o primeiro a sair.'],
        ['Refatoração', 'Melhorar o código sem mudar seu comportamento.'],
        ['Justificativa', 'Argumento de por que a solução funciona (invariante, testes, complexidade).']
      ],
      exemploResolvido: {
        titulo: 'Parênteses balanceados',
        enunciado: 'Verifique se "([]{})" está balanceada e se "(]" não está.',
        passos: [
          'Modelagem: use uma pilha; cada abridor é empilhado, cada fechador deve casar com o topo.',
          'Invariante: a pilha contém, em ordem, os abridores ainda não fechados.',
          'Trace de "(]": empilha "("; lê "]", o topo é "(" e não casa → desbalanceada.',
          'Casos limite: texto vazio (balanceado), só um fechador (desbalanceado), pilha não vazia ao final (desbalanceado).',
          'Complexidade: O(n) tempo, O(n) espaço no pior caso.'
        ],
        codigo: `pares = {')': '(', ']': '[', '}': '{'}
def balanceada(s):
    pilha = []
    for c in s:
        if c in '([{':
            pilha.append(c)
        elif c in pares:
            if not pilha or pilha.pop() != pares[c]:
                return False
    return not pilha            # só é válida se sobrou nada`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Liste os requisitos e os casos limite do problema "verificar se uma palavra é palíndromo".', dica: 'Maiúsculas, espaços, palavra vazia, um caractere.' },
        { nivel: 'Intermediário', texto: 'Projete a solução para "contar a frequência de cada palavra de um texto": dados, algoritmo e complexidade.', dica: 'Um dicionário palavra → contagem permite O(n).' },
        { nivel: 'Avançado', texto: 'Escreva a justificativa completa (invariante + testes + Big-O) do exemplo dos parênteses.', dica: 'Use as três fases: inicialização, manutenção e terminação.' }
      ],
      dicasEstudo: [
        'Comece pelos casos de teste: eles tornam o requisito concreto.',
        'Faça uma versão simples e correta antes de otimizar.',
        'Ao terminar, escreva por que a solução funciona; se não consegue, ainda não a domina.'
      ],
      conexoes: 'Integra os Módulos 1 a 16. A pilha reaparece na recursão (Módulo 18) e nos autômatos de pilha (Módulo 21).'
    },

    // ────────────────────────────────────────────────────────────────────────
    18: {
      porQueImporta: 'A recursão expressa de forma curta problemas naturalmente hierárquicos (árvores, divisão e conquista, backtracking). Entendê-la também revela como o computador gerencia chamadas na pilha e como analisar o custo de algoritmos como MergeSort.',
      glossario: [
        ['Caso base', 'Entrada mínima resolvida diretamente, sem nova chamada.'],
        ['Passo recursivo', 'Reduz o problema a instâncias menores da mesma tarefa.'],
        ['Pilha de chamadas', 'Região da memória que guarda um quadro (frame) por chamada ativa.'],
        ['Stack overflow', 'Estouro da pilha por recursão profunda demais ou sem caso base.'],
        ['Recursão de cauda', 'A chamada recursiva é a última operação; permite otimização em algumas linguagens.'],
        ['Relação de recorrência', 'Equação que define o custo T(n) em termos de T de entradas menores.'],
        ['Teorema Mestre', 'Resolve T(n) = a·T(n/b) + f(n) comparando f(n) com n^(log_b a).']
      ],
      exemploResolvido: {
        titulo: 'Torre de Hanói e sua recorrência',
        enunciado: 'Mova n discos do pino A para o C usando o B como auxiliar, nunca colocando disco maior sobre menor. Quantos movimentos?',
        passos: [
          'Caso base: n = 1 → mover o disco e pronto (1 movimento).',
          'Passo: mover n−1 discos de A para B; mover o maior de A para C; mover n−1 discos de B para C.',
          'Recorrência: T(n) = 2·T(n−1) + 1, com T(1) = 1.',
          'Expandindo: T(n) = 2ⁿ − 1. Para n = 3, 7 movimentos; para n = 10, 1023; para n = 64, ≈ 1,8×10¹⁹.',
          'Comparação com MergeSort: T(n) = 2T(n/2) + n → pelo Teorema Mestre (caso 2), Θ(n log n). Busca binária: T(n) = T(n/2) + 1 → Θ(log n).'
        ],
        codigo: `def hanoi(n, origem, destino, aux):
    if n == 1:                         # caso base
        print(origem, "->", destino)
        return
    hanoi(n - 1, origem, aux, destino)
    print(origem, "->", destino)
    hanoi(n - 1, aux, destino, origem)

# O limite padrão de recursão do Python é ~1000 chamadas;
# fatorial(5000) recursivo estoura a pilha.`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Faça o trace de fatorial(4) mostrando as chamadas empilhando e depois resolvendo.', dica: 'fat(4) = 4·fat(3) = 4·3·fat(2) = 4·3·2·fat(1) = 24.' },
        { nivel: 'Intermediário', texto: 'Escreva a recorrência e o Big-O da soma recursiva dos elementos de uma lista (soma(v) = v[0] + soma(v[1:])).', dica: 'T(n) = T(n−1) + 1 → O(n) chamadas, profundidade O(n).' },
        { nivel: 'Avançado', texto: 'Use o Teorema Mestre em T(n) = 4T(n/2) + n e em T(n) = 2T(n/2) + n². Qual caso cada uma usa?', dica: 'Compare f(n) com n^(log_b a): 2 vs 1 → caso 1 (Θ(n²)); e 1 vs 2 → caso 3 (Θ(n²)).' }
      ],
      dicasEstudo: [
        'Ao escrever uma função recursiva, comece pelo caso base e depois confirme que cada chamada se aproxima dele.',
        'Desenhe a árvore de chamadas; ela mostra repetições e o custo total.',
        'Se a árvore tem subproblemas repetidos (Fibonacci), considere memoização.'
      ],
      conexoes: 'Programação dinâmica (Módulo 19) elimina a repetição de subproblemas; a indução da recursão é a mesma das provas de invariante (Módulo 14).'
    },

    // ────────────────────────────────────────────────────────────────────────
    19: {
      porQueImporta: 'Escolher o paradigma certo transforma um problema inviável em instantâneo. Saber quando um guloso funciona, quando é preciso programação dinâmica e quando só resta busca com poda é uma marca de maturidade algorítmica.',
      glossario: [
        ['Divisão e conquista', 'Dividir, resolver recursivamente e combinar subproblemas independentes.'],
        ['Programação dinâmica (DP)', 'Resolver cada subproblema uma vez e reaproveitar o resultado.'],
        ['Memoização', 'DP top-down: recursão com cache de resultados.'],
        ['Tabulação', 'DP bottom-up: preencher uma tabela do menor ao maior subproblema.'],
        ['Algoritmo guloso', 'Escolhe o melhor local a cada passo, sem voltar atrás.'],
        ['Subestrutura ótima', 'A solução ótima contém soluções ótimas dos subproblemas.'],
        ['Backtracking', 'Busca em profundidade que desfaz escolhas ao encontrar um beco sem saída.']
      ],
      exemploResolvido: {
        titulo: 'Troco mínimo: guloso falha, DP acerta',
        enunciado: 'Com moedas {1, 3, 4}, qual o menor número de moedas para dar troco de 6?',
        passos: [
          'Guloso (maior moeda possível): 4 + 1 + 1 = 3 moedas.',
          'Ótimo real: 3 + 3 = 2 moedas. O guloso falhou porque a escolha local não leva ao ótimo global.',
          'DP: dp[v] = 1 + min(dp[v − m]) para cada moeda m ≤ v, com dp[0] = 0.',
          'Tabela: dp[1]=1, dp[2]=2, dp[3]=1, dp[4]=1, dp[5]=2, dp[6]=2. Resposta 2.',
          'Com moedas {1, 5, 10, 25} (sistema canônico), o guloso É ótimo — depende da estrutura do problema.'
        ],
        codigo: `def troco_min(moedas, valor):
    INF = float('inf')
    dp = [0] + [INF] * valor
    for v in range(1, valor + 1):
        for m in moedas:
            if m <= v and dp[v - m] + 1 < dp[v]:
                dp[v] = dp[v - m] + 1
    return dp[valor]

# Fibonacci: recursão ingênua O(2^n)  →  DP O(n)
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Calcule fib(6) com tabulação, preenchendo dp[0..6].', dica: '0, 1, 1, 2, 3, 5, 8.' },
        { nivel: 'Intermediário', texto: 'Dê um exemplo onde o algoritmo guloso do troco falha e preencha a tabela DP correta.', dica: 'Use moedas {1,3,4} e valor 6.' },
        { nivel: 'Avançado', texto: 'Explique por que a seleção de atividades (escolher a que termina primeiro) é um problema em que o guloso funciona.', dica: 'Escolher a atividade que termina antes deixa o máximo de tempo para as demais.' }
      ],
      dicasEstudo: [
        'Pergunta-chave para DP: existem subproblemas que se repetem?',
        'Defina o estado (o que a tabela representa) antes da fórmula de transição.',
        'Para provar que um guloso funciona, mostre um argumento de troca ou procure um contraexemplo.'
      ],
      conexoes: 'Usa recursão e recorrências (Módulo 18); problemas sem boa solução polinomial levam às classes NP (Módulo 22).'
    },

    // ────────────────────────────────────────────────────────────────────────
    20: {
      porQueImporta: 'Em sistemas críticos (aviação, medicina, finanças) não basta testar: é preciso demonstrar que o programa cumpre sua especificação. A lógica de Hoare dá o vocabulário e as regras para isso, e seus conceitos inspiram contratos, asserções e ferramentas de verificação.',
      glossario: [
        ['Tripla de Hoare', '{P} C {Q}: se P vale antes de C e C termina, Q vale depois.'],
        ['Pré-condição', 'P: o que deve valer antes.'],
        ['Pós-condição', 'Q: o que valerá depois.'],
        ['Axioma da atribuição', '{Q[x := E]} x := E {Q}.'],
        ['Pré-condição mais fraca (wp)', 'A condição menos exigente que garante a pós-condição.'],
        ['Enfraquecimento / fortalecimento', 'Trocar uma pré-condição por outra mais forte, ou uma pós por outra mais fraca, preservando a validade.'],
        ['Contrato', 'Conjunto de pré e pós-condições de uma função.']
      ],
      exemploResolvido: {
        titulo: 'Provar a troca de valores (swap)',
        enunciado: 'Prove {x = a ∧ y = b}  t := x; x := y; y := t  {x = b ∧ y = a}.',
        passos: [
          'Trabalhe de trás para frente aplicando o axioma da atribuição.',
          'Depois de y := t, a pós é (x = b ∧ y = a); substituindo y por t: (x = b ∧ t = a).',
          'Antes de x := y: substitua x por y em (x = b ∧ t = a) → (y = b ∧ t = a).',
          'Antes de t := x: substitua t por x → (y = b ∧ x = a), que é a pré-condição original.',
          'Regra da composição encadeia os três passos: a tripla é válida.',
          'Outro exemplo: wp(y := x + 1, y > 0) = (x + 1 > 0), isto é, x ≥ 0 para inteiros.'
        ],
        codigo: `{ x = a  ∧  y = b }
t := x;
{ y = b  ∧  t = a }      // wp intermediária
x := y;
{ x = b  ∧  t = a }
y := t;
{ x = b  ∧  y = a }      // pós-condição

// Laço:  se {I ∧ B} C {I}  então  {I} ENQUANTO B FAÇA C {I ∧ ¬B}`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Calcule a pré-condição mais fraca de {?} x := x + 2 {x > 5}.', dica: 'Substitua x por x + 2 na pós: x + 2 > 5 → x > 3.' },
        { nivel: 'Intermediário', texto: 'Escreva a tripla de Hoare para "y := x * 2" com pós y é par e dê uma pré-condição válida.', dica: 'Para inteiros, qualquer x serve: a pré pode ser verdadeiro.' },
        { nivel: 'Avançado', texto: 'Prove com Hoare a soma 1..n com invariante soma = i(i−1)/2 e sinta como ela implica a pós ao sair com i = n + 1.', dica: 'Use a regra do laço e mostre que I ∧ ¬B → pós.' }
      ],
      dicasEstudo: [
        'Prove de trás para frente: é mais mecânico, a pós-condição guia cada passo.',
        'A tripla garante correção parcial; terminação exige um argumento de variante à parte.',
        'Pré-condições fracas tornam a função mais reutilizável; pós-condições fortes dão mais garantias.'
      ],
      conexoes: 'Formaliza os invariantes do Módulo 14 e os contratos de funções do Módulo 12; ferramentas reais incluem asserções, Dafny e provadores.'
    },

    // ────────────────────────────────────────────────────────────────────────
    21: {
      porQueImporta: 'Esta teoria responde o que é possível computar e com que modelo. Explica por que expressões regulares não validam parênteses aninhados, por que nenhum analisador estático encontra todos os bugs e por que existem problemas que nenhum computador resolverá.',
      glossario: [
        ['Autômato finito (DFA)', 'Máquina de estados com memória finita; reconhece linguagens regulares.'],
        ['Autômato de pilha (PDA)', 'Autômato com pilha; reconhece linguagens livres de contexto.'],
        ['Máquina de Turing', 'Modelo com fita ilimitada, cabeça de leitura/escrita e tabela de estados.'],
        ['Tese de Church-Turing', 'Tudo que é efetivamente computável é computável por uma máquina de Turing.'],
        ['Decidível', 'Existe um algoritmo que sempre para e responde sim/não.'],
        ['Problema da parada', 'Decidir se um programa termina; é indecidível.'],
        ['Teorema de Rice', 'Qualquer propriedade semântica não trivial de programas é indecidível.']
      ],
      exemploResolvido: {
        titulo: 'DFA que aceita cadeias binárias com número par de 1s',
        enunciado: 'Construa um autômato e teste com "1011".',
        passos: [
          'Estados: PAR (inicial e de aceitação) e ÍMPAR.',
          'Transições: lendo 0 permanece no mesmo estado; lendo 1 alterna entre PAR e ÍMPAR.',
          'Teste de "1011": PAR —1→ ÍMPAR —0→ ÍMPAR —1→ PAR —1→ ÍMPAR. Termina em ÍMPAR: rejeita (há três 1s).',
          'Limite: um DFA não conta ilimitadamente. Por isso não reconhece {aⁿbⁿ} nem parênteses balanceados — é preciso uma pilha (PDA).',
          'Intuição do problema da parada: se existisse H(P, x) que decide se P(x) para, construa D(P) que entra em laço quando H diz "para" e para quando H diz "laço". D(D) gera contradição, logo H não existe.'
        ],
        codigo: `# Simulação do DFA "número par de 1s"
transicao = {('PAR','0'):'PAR', ('PAR','1'):'IMPAR',
             ('IMPAR','0'):'IMPAR', ('IMPAR','1'):'PAR'}
def aceita(cadeia):
    estado = 'PAR'
    for simbolo in cadeia:
        estado = transicao[(estado, simbolo)]
    return estado == 'PAR'

# aceita("1011") → False    aceita("1001") → True`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Desenhe o DFA que aceita cadeias de 0 e 1 terminadas em 0.', dica: 'Dois estados bastam: "último foi 0" e "último não foi 0".' },
        { nivel: 'Intermediário', texto: 'Por que uma expressão regular não consegue validar parênteses balanceados de profundidade arbitrária?', dica: 'É preciso contar abertos ilimitadamente, mas um DFA tem memória finita.' },
        { nivel: 'Avançado', texto: 'Explique com suas palavras por que o problema da parada é indecidível e cite uma consequência prática.', dica: 'Ex.: não existe verificador perfeito que detecte todo laço infinito.' }
      ],
      dicasEstudo: [
        'Desenhe os autômatos: estados como círculos, aceitação com círculo duplo.',
        'Para provar que algo é indecidível, reduza de um problema indecidível conhecido.',
        'Lembre: indecidível não significa "difícil", e sim "sem algoritmo geral possível".'
      ],
      conexoes: 'Relaciona-se à pilha do Módulo 17, às reduções do Módulo 22 e ao limite de verificação formal do Módulo 20.'
    },

    // ────────────────────────────────────────────────────────────────────────
    22: {
      porQueImporta: 'Distinguir o que é eficientemente resolvível do que provavelmente não é ajuda a escolher estratégias realistas: algoritmo exato, aproximação ou heurística. Também está na base de toda a criptografia moderna.',
      glossario: [
        ['Classe P', 'Problemas de decisão resolvidos em tempo polinomial.'],
        ['Classe NP', 'Problemas cuja solução proposta (certificado) pode ser verificada em tempo polinomial.'],
        ['NP-difícil', 'Pelo menos tão difícil quanto qualquer problema de NP.'],
        ['NP-completo', 'Está em NP e é NP-difícil. Exemplos: SAT, 3-SAT, Cobertura de Vértices, Caixeiro Viajante (decisão).'],
        ['Redução polinomial', 'Transformar instâncias de A em instâncias de B em tempo polinomial (A ≤ₚ B).'],
        ['Análise amortizada', 'Custo médio por operação em uma sequência, mesmo com operações ocasionais caras.'],
        ['Heurística / aproximação', 'Soluções boas, não necessariamente ótimas, em tempo viável.']
      ],
      exemploResolvido: {
        titulo: 'Verificar é fácil, resolver parece difícil — e custo amortizado',
        enunciado: 'Parte A: dado um conjunto de inteiros, existe subconjunto com soma 10? Parte B: qual o custo amortizado de append em um vetor que dobra de tamanho?',
        passos: [
          'A: para {3, 7, 8, 2}, o certificado {3, 7} é verificado somando em tempo linear (3 + 7 = 10) — o problema está em NP.',
          'Achar o subconjunto por busca exaustiva testa até 2ⁿ subconjuntos; não se conhece algoritmo polinomial geral (Subset-Sum é NP-completo).',
          'B: ao encher, o vetor copia todos os elementos para um novo com o dobro da capacidade.',
          'As cópias custam 1 + 2 + 4 + ... ≤ 2n no total; somadas às n inserções, o total é ≤ 3n.',
          'Logo o custo amortizado por append é O(1), embora uma única operação possa custar O(n).',
          'Se P = NP, todo problema verificável rapidamente seria também resolvível rapidamente; a maioria dos pesquisadores acredita que P ≠ NP, mas isso não está provado.'
        ],
        codigo: `def existe_subset_soma(v, alvo):
    # força bruta: 2^n subconjuntos
    n = len(v)
    for mascara in range(1 << n):
        s = sum(v[i] for i in range(n) if mascara >> i & 1)
        if s == alvo: return True
    return False

def verifica(certificado, alvo):
    return sum(certificado) == alvo        # tempo polinomial (linear)

# n = 50 → 2^50 ≈ 10^15 subconjuntos: inviável na força bruta`
      },
      praticas: [
        { nivel: 'Básico', texto: 'Classifique como "fácil de verificar" ou não: (a) um Sudoku preenchido; (b) a ordenação de uma lista.', dica: 'Verificar um Sudoku preenchido é rápido (linhas, colunas, blocos).' },
        { nivel: 'Intermediário', texto: 'Mostre que o custo total de n appends em um vetor que dobra de capacidade é O(n).', dica: 'Some a série geométrica das cópias: 1 + 2 + 4 + ... + n < 2n.' },
        { nivel: 'Avançado', texto: 'Explique o que significaria encontrar um algoritmo polinomial para um problema NP-completo.', dica: 'Implicaria P = NP, com impacto sobre a criptografia atual.' }
      ],
      dicasEstudo: [
        'Para provar que X é NP-completo: mostre que está em NP e reduza de um NP-completo conhecido a X.',
        'Ao encontrar um problema NP-completo no trabalho, pense em aproximações, heurísticas ou restrições da instância.',
        'Diferencie: NP não quer dizer "não polinomial"; quer dizer "verificável em tempo polinomial".'
      ],
      conexoes: 'Fecha a trilha: eficiência (Módulo 15), paradigmas (Módulo 19) e limites da computação (Módulo 21) se encontram aqui.'
    }
  };

  global.CURSO_LOGICA_EXTRAS = EXTRAS;

})(typeof window !== 'undefined' ? window : globalThis);
