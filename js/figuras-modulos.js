"use strict";
/**
 * ============================================================================
 * EXEMPLOS VISUAIS — CURSO DE LÓGICA DE PROGRAMAÇÃO PURA
 * Uma figura SVG por módulo (img/modulos/modulo-NN.svg) ilustrando o ponto
 * mais importante do módulo. Renderizada por js/curso-logica.js na seção
 * "Exemplo Visual". Conteúdo estático: renderizado com escape de HTML.
 *   • titulo  → título da figura
 *   • alt     → descrição textual (acessibilidade e fallback sem imagem)
 *   • legenda → como ler a figura e qual a ideia principal
 * ============================================================================
 */
(function (global) {
    'use strict';
    const FIGURAS = {
        1: {
            titulo: 'Validade de um argumento: diagrama de conjuntos',
            alt: 'Dois diagramas de conjuntos. À esquerda, 12 está dentro dos múltiplos de 4, que estão dentro dos pares. À direita, 10 é par mas fica fora dos múltiplos de 4.',
            legenda: 'Em A, saber que 12 é múltiplo de 4 garante que é par. Em B, saber que 10 é par não garante que seja múltiplo de 4: o próprio 10 é o contraexemplo.'
        },
        2: {
            titulo: 'O ciclo de resolução de problemas de Pólya',
            alt: 'Quatro etapas em sequência: entender, planejar, executar e revisar, com uma seta de retorno da revisão para o entendimento.',
            legenda: 'A etapa 4 não encerra o ciclo: se o resultado falhar nos casos de teste, volte e refine o entendimento do problema antes de reescrever o código.'
        },
        3: {
            titulo: 'Sequência importa: a troca de valores (swap)',
            alt: 'Quatro estados sucessivos de A, B e aux ao executar aux recebe A, A recebe B e B recebe aux, partindo de A igual a 5 e B igual a 9. Abaixo, o erro de não usar variável auxiliar.',
            legenda: 'Cada comando altera uma variável e o estado muda passo a passo. Sem o auxiliar, a segunda atribuição sobrescreve o valor original de A e ele se perde.'
        },
        4: {
            titulo: 'Modelo IPO: do salário bruto ao líquido',
            alt: 'Entradas valor_hora 20 e horas 100; processamento calcula bruto 2000, imposto 220 e líquido 1780; a saída é 1780. Uma caixa lembra de validar antes de processar.',
            legenda: 'Separar entrada, processamento e saída deixa claro onde validar os dados e onde cada cálculo acontece.'
        },
        5: {
            titulo: 'Tabela de rastreamento das variáveis',
            alt: 'Tabela com cinco comandos e o valor de a, b e total após cada um, com a célula alterada destacada. Termina com a igual a 8, b igual a 8 e total igual a 16.',
            legenda: 'Rastrear é executar o código no papel, linha a linha. A seta ← grava um valor; ela não compara dois valores.'
        },
        6: {
            titulo: 'Ordem de avaliação de uma expressão',
            alt: 'Árvore da expressão (10 + 5 * 2) > 15 E (20 % 3 == 2): 5 vezes 2 é 10, 10 mais 10 é 20, 20 maior que 15 é verdadeiro; 20 módulo 3 é 2, igual a 2 é verdadeiro; verdadeiro E verdadeiro é verdadeiro.',
            legenda: 'Os operadores mais internos da árvore são avaliados primeiro. Multiplicação e módulo vêm antes da soma, e as comparações antes do E.'
        },
        7: {
            titulo: 'Tabela-verdade de E, OU e implicação',
            alt: 'Tabela com as quatro combinações de P e Q e os resultados de P E Q, P OU Q e P implica Q. A linha com P verdadeiro e Q falso é a única em que a implicação é falsa.',
            legenda: 'A implicação só é falsa quando P é verdadeira e Q é falsa. Com P falsa ela é verdadeira: uma premissa falsa não invalida a regra.'
        },
        8: {
            titulo: 'Faixas de decisão mutuamente exclusivas',
            alt: 'Uma reta de 0 a 10 dividida em três faixas: abaixo de 5 reprovado, de 5 a menos de 7 recuperação, de 7 a 10 aprovado, com a cascata SE SENÃO SE correspondente.',
            legenda: 'Cada nota cai em exatamente uma faixa. Por isso a ordem dos testes importa: do mais restritivo ao mais amplo, sem ramos inalcançáveis.'
        },
        9: {
            titulo: 'Execução passo a passo de um laço ENQUANTO',
            alt: 'Tabela de rastreamento do laço que soma de 1 a 5, com c e soma em cada iteração, até c valer 6 e o teste falhar, com soma final 15. Ao lado, o erro off-by-one com menor em vez de menor ou igual.',
            legenda: 'A variável de controle avança a cada volta até o teste falhar, o que garante a terminação. Usar < em vez de <= faz uma volta a menos (off-by-one).'
        },
        10: {
            titulo: 'Fluxograma: decisão com dois caminhos',
            alt: 'Fluxograma com Início, entrada de temperatura, losango temp maior que 37,5 com caminhos Sim para Febre e Não para Normal, ambos indo ao Fim, e uma legenda das formas.',
            legenda: 'Cada forma tem um papel: oval para início e fim, paralelogramo para entrada, retângulo para processo e losango para decisão com duas saídas.'
        },
        11: {
            titulo: 'Decomposição e abstração: o caixa eletrônico',
            alt: 'O problema Sacar dinheiro decomposto em quatro subproblemas em sequência: autenticar, validar saldo, dispensar e atualizar.',
            legenda: 'Dividir um problema grande em partes pequenas permite testar e reutilizar cada uma. Abstrair é usar uma parte sem conhecer seus detalhes internos.'
        },
        12: {
            titulo: 'Função: parâmetro, regra interna e retorno',
            alt: 'A função imposto recebe salario como parâmetro e devolve um valor: 3000 gera 300 e 6000 gera 1200. Variáveis locais da função não existem fora dela.',
            legenda: 'Quem chama a função enxerga apenas a entrada e o retorno. As variáveis internas pertencem ao escopo local e desaparecem ao final.'
        },
        13: {
            titulo: 'Testes de valores limite',
            alt: 'Reta de notas escolares com os seis valores de teste: menos 0,1 e 10,1 inválidos; 0,0, 0,1, 9,9 e 10,0 válidos. Abaixo, o erro de usar maior em vez de maior ou igual para a nota 6,0.',
            legenda: 'Os bugs se concentram nas bordas. Testar logo antes, sobre e logo depois do limite expõe a troca de > por >=.'
        },
        14: {
            titulo: 'Invariante do laço que procura o máximo',
            alt: 'Lista 3, 8, 2, 9, 4. Em cada linha, a parte já examinada fica destacada e a variável maior guarda o máximo dela: 3, 8, 8, 9 e 9.',
            legenda: 'O invariante é uma afirmação verdadeira a cada volta do laço. Na saída, ele prova que maior é o máximo da lista inteira.'
        },
        15: {
            titulo: 'Como o custo cresce com o tamanho da entrada',
            alt: 'Gráfico com o número de operações para n de 1 a 8: O(1) constante, O(log n) quase plano, O(n) linear e O(n ao quadrado) crescendo rapidamente.',
            legenda: 'Para entradas pequenas as curvas parecem próximas; para entradas grandes a diferença é enorme. Com n = 1.000.000, log n vale cerca de 20 e n ao quadrado vale 10¹².'
        },
        16: {
            titulo: 'Algoritmo guloso falha no troco',
            alt: 'Moedas 1, 3 e 4 para troco 6. O guloso escolhe 4, 1 e 1, três moedas; a solução ótima é 3 e 3, duas moedas.',
            legenda: 'Escolher sempre a maior moeda parece sensato, mas um único contraexemplo mostra que não é ótimo. A programação dinâmica encontra a resposta correta.'
        },
        17: {
            titulo: 'Pipeline de regras de um pedido',
            alt: 'Um pedido passa por cinco etapas em ordem: estoque, cupom, frete, antifraude e pagamento. Cada etapa pode rejeitar o pedido e interromper o fluxo.',
            legenda: 'Integrar é encadear regras com entrada, saída e pré-condição claras. A ordem muda o resultado: o antifraude precisa vir antes da cobrança.'
        },
        18: {
            titulo: 'Árvore de recursão do MergeSort',
            alt: 'Árvore de recursão para T(n) = 2T(n/2) + n com n igual a 8: quatro níveis de tamanhos 8, 4, 2 e 1, cada um somando n operações, totalizando n log n.',
            legenda: 'Cada nível da árvore custa n e há log n níveis. É o mesmo resultado do Caso 2 do Teorema Mestre: Θ(n log n).'
        },
        19: {
            titulo: 'Subproblemas repetidos: recursão ingênua versus DP',
            alt: 'À esquerda, árvore de chamadas de Fib(5) com os subproblemas Fib(3) e Fib(2) repetidos e destacados. À direita, a tabela de programação dinâmica preenchida uma vez, de Fib(0) a Fib(5).',
            legenda: 'A recursão ingênua recalcula os mesmos subproblemas; a programação dinâmica guarda cada resposta e transforma custo exponencial em linear.'
        },
        20: {
            titulo: 'Tripla de Hoare e regra do condicional',
            alt: 'Tripla de Hoare com pré-condição x maior que 9, comando x recebe x mais 1 e pós-condição x maior que 10, obtida substituindo x por x mais 1. Abaixo, a regra do condicional com dois ramos provados.',
            legenda: 'Para provar um programa, caminhe da pós-condição para trás até a pré-condição necessária. No condicional, prove cada ramo separadamente.'
        },
        21: {
            titulo: 'Autômato finito (DFA) e fita de Máquina de Turing',
            alt: 'Autômato com estados q0 (par, aceitação) e q1 (ímpar) e suas transições. Abaixo, uma fita de Turing com a, b e c marcados por X, Y e Z e a cabeça de leitura sobre uma célula.',
            legenda: 'Um DFA tem memória finita e só reconhece padrões simples. A fita ilimitada da Máquina de Turing permite contar e reconhecer aⁿbⁿcⁿ.'
        },
        22: {
            titulo: 'Classes P, NP e NP-completo',
            alt: 'Diagrama de conjuntos com P dentro de NP e NP-completo na borda de NP, assumindo P diferente de NP. À direita, a tabela de crescimento de n fatorial: 10 cidades têm 3,6 milhões de rotas e 20 cidades têm cerca de 2,4 quintilhões.',
            legenda: 'Problemas em NP têm solução verificável rapidamente. Os NP-completos, como o caixeiro viajante, são os mais difíceis de NP e explodem com força bruta.'
        }
    };
    global.CURSO_LOGICA_FIGURAS = FIGURAS;
})(typeof window !== 'undefined' ? window : globalThis);
