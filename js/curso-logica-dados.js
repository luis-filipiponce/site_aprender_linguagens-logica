// ARQUIVO GERADO por scripts/build-conteudo.mjs — não edite à mão.
// Edite os arquivos em content/modulos/*.json e rode: npm run build:conteudo
(function (global) {
  'use strict';
  global.CURSO_LOGICA_MODULOS = [
    {
      "id": 1,
      "slug": "pensamento-logico",
      "badge": "Módulo 1 · Fundamentos",
      "nivel": "Iniciante",
      "titulo": "Fundamentos do Pensamento Lógico",
      "subtitulo": "Premissas, argumentos, validade lógica versus verdade factual e estruturação mental.",
      "objetivo": "Compreender a essência da lógica dedutiva e indutiva, distinguir premissas de conclusões, reconhecer contradições e aprender a estruturar raciocínios rigorosos antes de qualquer código.",
      "introducaoIntuitiva": "Quando você decide levar um guarda-chuva porque \"o céu está cinza e ouviu trovões\", você está processando premissas (fatos observados) e aplicando uma regra de inferência para chegar a uma conclusão (provavelmente vai chover). A lógica computacional funciona exatamente assim: premissas claras levam a conclusões confiáveis.",
      "explicacaoAprofundada": "Lógica é o estudo das regras de inferência válida. Na computação, a lógica pura não depende de computadores físicos: é a capacidade formal de garantir que, a partir de dados conhecidos (entradas/premissas), um resultado necessário e inequívoco seja obtido. Diferenciamos estritamente Validade (a estrutura formal do raciocínio está correta) de Verdade (o conteúdo fático corresponde à realidade). Um algoritmo pode ser estruturalmente válido, mas produzir resultados indesejados se as premissas de entrada forem incorretas.",
      "exemplos": {
        "basico": {
          "titulo": "Premissa e Conclusão Simples",
          "descricao": "Premissa 1: Todo número divisível por 2 é par. Premissa 2: O número 14 é divisível por 2. Conclusão lógica: O número 14 é par."
        },
        "intermediario": {
          "titulo": "Identificação de Informações Insuficientes",
          "descricao": "Premissa 1: Se estiver chovendo, o chão fica molhado. Observação: O chão está molhado. Conclusão precipitada: \"Está chovendo\". Erro lógico (Afirmação do Consequente): o chão pode ter sido lavado com uma mangueira."
        },
        "avancado": {
          "titulo": "Validade Estrutural vs Verdade Factual",
          "descricao": "Premissa 1: Todos os pássaros programam computadores. Premissa 2: O canário é um pássaro. Conclusão: O canário programa computadores. O raciocínio é LOGICAMENTE VÁLIDO, porém FATUALMENTE FALSO porque a Premissa 1 é falsa."
        }
      },
      "passoAPasso": [
        "1. Identificar o objetivo da reflexão ou problema.",
        "2. Listar explicitamente todas as premissas e dados conhecidos.",
        "3. Identificar premissas ocultas ou suposições infundadas.",
        "4. Aplicar regras de dedução sem inventar informações extras.",
        "5. Formular a conclusão e verificar se ela é a ÚNICA consequência necessária das premissas."
      ],
      "errosComuns": [
        {
          "erro": "Confundir suposição com fato comprovado",
          "correcao": "Uma hipótese só se torna fato quando validada por evidência incontestável."
        },
        {
          "erro": "Conclusão precipitada (Salto Lógico)",
          "correcao": "Não deduza mais do que as premissas estritamente garantem."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Análise passo a passo: Premissas claras -> Regra aplicada -> Conclusão garantida.",
        "ruim": "Tentativa intuitiva sem checar se há outros fatores que possam causar o mesmo efeito."
      },
      "pseudocodigo": "// Estrutura Conceitual de um Raciocínio Lógico\nSE premissa_A == VERDADEIRA E premissa_B == VERDADEIRA ENTÃO\n    conclusao <- VERDADEIRA\nSENÃO\n    conclusao <- INDETERMINADA_OU_FALSA\nFIM_SE",
      "traceData": [
        {
          "passo": 1,
          "acao": "Receber Premissa 1 (idade >= 18)",
          "estado": "idade = 20 (Verdadeiro)",
          "obs": "Condição necessária"
        },
        {
          "passo": 2,
          "acao": "Receber Premissa 2 (tem_documento)",
          "estado": "tem_documento = SIM",
          "obs": "Condição necessária"
        },
        {
          "passo": 3,
          "acao": "Avaliar Conclusão (Permitir Entrada)",
          "estado": "Resultado = AUTORIZADO",
          "obs": "Ambas premissas cumpridas"
        }
      ],
      "exercicios": [
        {
          "id": "ex1_1",
          "tipo": "multipla_escolha",
          "enunciado": "Considere as premissas: (1) \"Todo triângulo possui 3 lados\". (2) \"A figura X possui 3 lados\". Podemos concluir com certeza absoluta que a figura X é um triângulo?",
          "opcoes": [
            "Sim, pois toda figura de 3 lados fechada é um triângulo.",
            "Não necessariamente, se a figura puder ser aberta ou composta por segmentos desconexos.",
            "Sim, porque a premissa 1 afirma uma equivalência total.",
            "Não, porque triângulos não possuem lados."
          ],
          "correta": 1,
          "pista": "Atenção à definição estrita: a premissa afirma que triângulos têm 3 lados, mas não definiu se qualquer linha com 3 lados é automaticamente um triângulo fechado sem hipóteses extras.",
          "justificativa": "Em lógica rigorosa, para garantir a equivalência precisamos da premissa bidirecional: \"Uma figura é triângulo SE E SOMENTE SE for um polígono fechado de 3 lados\"."
        }
      ],
      "perguntasVerificacao": "Qual a diferença entre um argumento logicamente válido e um argumento factualmente verdadeiro?",
      "keywordsIA": [
        "premissa",
        "conclusao",
        "validade",
        "verdade",
        "argumento",
        "deducao",
        "fato",
        "suposicao",
        "inferencia",
        "logica"
      ],
      "misconceptionsIA": [
        {
          "termo": "verdade",
          "erro": "Achar que argumento válido sempre descreve o mundo real",
          "explicacao": "Validade é a consistência da forma lógica; verdade depende da realidade empírica das premissas."
        }
      ],
      "explicacaoIdealIA": "Pensamento lógico é a estruturação de premissas para chegar a uma conclusão fundamentada. A lógica garante a validade formal da inferência. Diferencia-se de opiniões porque exige que cada passo decorra necessariamente dos dados anteriores."
    },
    {
      "id": 2,
      "slug": "resolucao-problemas",
      "badge": "Módulo 2 · Método",
      "nivel": "Iniciante",
      "titulo": "Metodologia de Resolução de Problemas",
      "subtitulo": "O método de George Pólya adaptado ao pensamento computacional: decompor, modelar e testar.",
      "objetivo": "Aprender a pegar qualquer enunciado em linguagem natural e decompô-lo metodicamente em Entradas, Restrições, Regras de Transformação e Saídas esperadas.",
      "introducaoIntuitiva": "Se você precisa organizar uma festa para 50 pessoas com orçamento restrito, você não sai comprando coisas aleatoriamente. Você calcula o consumo por pessoa, orça fornecedores e define restrições. Programar é exatamente resolver problemas estruturados.",
      "explicacaoAprofundada": "A metodologia clássica de Pólya divide a resolução de problemas em 4 estágios fundamentais: (1) Compreender o problema (identificar incógnitas, dados e condicionantes); (2) Estabelecer um plano (encontrar conexões, decompor em subproblemas); (3) Executar o plano (seguir os passos da solução); (4) Fazer o retrospecto (testar com casos normais e limites, verificar se é possível simplificar).",
      "exemplos": {
        "basico": {
          "titulo": "Cálculo de Desconto em Compra",
          "descricao": "Problema: Aplicar 10% de desconto se a compra for superior a R$ 100. Entradas: valor_compra. Regra: SE valor > 100 -> pagar = valor * 0.90. Saída: valor_final."
        },
        "intermediario": {
          "titulo": "Identificação de Casos Limítrofes (Boundary Cases)",
          "descricao": "E se a compra for exatamente R$ 100,00? O enunciado diz \"superior a 100\", logo 100 não recebe desconto. Definir o operador (> vs >=) é crucial."
        },
        "avancado": {
          "titulo": "Problema de Escalonamento com Dependências",
          "descricao": "Organizar 4 tarefas A, B, C, D onde C depende de A, e D depende de B e C. Metodologia: traçar o grafo de dependências e ordenar sequencialmente."
        }
      },
      "passoAPasso": [
        "1. Ler o problema e sublinhar dados, regras e resultado desejado.",
        "2. Isolar o que é ENTRADA e o que é SAÍDA esperada.",
        "3. Escrever as REGRAS e RESTRIÇÕES que ligam a entrada à saída.",
        "4. Fazer uma simulação manual com lápis e papel usando valores de teste.",
        "5. Testar casos extremos (zero, valores negativos, valores exatamente no limite)."
      ],
      "errosComuns": [
        {
          "erro": "Começar a escrever código antes de entender o problema",
          "correcao": "Nunca escreva uma linha de instrução sem conseguir explicar a solução em português claro."
        },
        {
          "erro": "Ignorar casos limites",
          "correcao": "Sempre teste o valor imediatamente antes, exatamente no ponto e logo após o limite."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Decomposição em 4 etapas estruturadas com casos de teste pré-definidos.",
        "ruim": "Tentativa e erro sem saber quais entradas falham."
      },
      "pseudocodigo": "// Metodologia de Resolução:\nENTRADA: valor_bruto, tipo_cliente\nSE valor_bruto > 100.00 E tipo_cliente == \"VIP\" ENTÃO\n    desconto <- valor_bruto * 0.15\nSENÃO SE valor_bruto > 100.00 ENTÃO\n    desconto <- valor_bruto * 0.10\nSENÃO\n    desconto <- 0.00\nFIM_SE\nvalor_liquido <- valor_bruto - desconto\nSAÍDA: valor_liquido",
      "traceData": [
        {
          "passo": 1,
          "acao": "Leitura de Entradas",
          "estado": "bruto = 120.00, tipo = \"COMUM\"",
          "obs": "Entradas recebidas"
        },
        {
          "passo": 2,
          "acao": "Teste Condição 1 (VIP?)",
          "estado": "tipo == \"VIP\" -> FALSO",
          "obs": "Passa para próximo ramo"
        },
        {
          "passo": 3,
          "acao": "Teste Condição 2 (> 100?)",
          "estado": "120 > 100 -> VERDADEIRO",
          "obs": "Desconto de 10% selecionado"
        },
        {
          "passo": 4,
          "acao": "Cálculo",
          "estado": "desconto = 12.00, liquido = 108.00",
          "obs": "Saída calculada com sucesso"
        }
      ],
      "exercicios": [
        {
          "id": "ex2_1",
          "tipo": "multipla_escolha",
          "enunciado": "Ao analisar um problema onde uma catraca libera passageiros com gratuidade (idade >= 65 anos OU estudantes com carteirinha válida), qual é o caso limite crítico a testar?",
          "opcoes": [
            "Apenas pessoas com 20 anos.",
            "Pessoas com 64 anos, exatamente 65 anos e 66 anos.",
            "Apenas pessoas com 100 anos.",
            "Qualquer valor serve igualmente."
          ],
          "correta": 1,
          "pista": "Casos limites ficam exatamente nas fronteiras da condição matemática (n-1, n, n+1).",
          "justificativa": "Testar 64, 65 e 66 anos garante que o operador >= foi aplicado corretamente e não > ou <=."
        }
      ],
      "perguntasVerificacao": "Por que simular um problema manualmente antes de programar reduz drasticamente os erros de lógica?",
      "keywordsIA": [
        "compreender",
        "decompor",
        "entradas",
        "saidas",
        "restricoes",
        "polya",
        "limites",
        "teste",
        "planejamento",
        "estrategia"
      ],
      "misconceptionsIA": [
        {
          "termo": "codificar direto",
          "erro": "Achar que bom programador resolve problema digitando logo a sintaxe",
          "explicacao": "A solução nasce no modelo mental e na decomposição lógica, a codificação é apenas a última etapa de tradução."
        }
      ],
      "explicacaoIdealIA": "A resolução de problemas envolve compreender o objetivo, mapear entradas e saídas, identificar restrições, decompor em passos menores e validar com casos limites antes de qualquer implementação."
    },
    {
      "id": 3,
      "slug": "algoritmos-sequencia",
      "badge": "Módulo 3 · Algoritmos",
      "nivel": "Iniciante",
      "titulo": "Algoritmos e Sequência Lógica",
      "subtitulo": "Instruções determinísticas, ordem de execução, ambiguidade e pré/pós-condições.",
      "objetivo": "Dominar o conceito formal de algoritmo como sequência finita, determinística e não-ambígua de instruções, compreendendo por que a ordem de execução altera o resultado.",
      "introducaoIntuitiva": "Se você trocar a ordem de \"calçar as meias\" e \"calçar os sapatos\", você terminará com as meias por cima do sapato. A ordem das instruções altera fundamentalmente o estado final do sistema.",
      "explicacaoAprofundada": "Um algoritmo é uma sequência finita de passos bem definidos que transforma um estado inicial (pré-condição) em um estado final desejado (pós-condição). As 3 propriedades essenciais são: Finitude (deve terminar após um número finito de passos), Determinismo (dada a mesma entrada, produzirá exatamente a mesma saída a cada passo) e Efetividade (cada operação deve ser realizável e precisa).",
      "exemplos": {
        "basico": {
          "titulo": "Algoritmo para Troca de Lâmpada",
          "descricao": "1. Desligar o interruptor (segurança). 2. Aguardar esfriar. 3. Desrosquear lâmpada velha. 4. Rosquear lâmpada nova. 5. Ligar interruptor."
        },
        "intermediario": {
          "titulo": "Troca de Valores entre Duas Variáveis (Swap)",
          "descricao": "Problema: Trocar valor de A e B. Incorreto: A = B; B = A (perde o valor original de A). Correto: aux = A; A = B; B = aux."
        },
        "avancado": {
          "titulo": "Pré-condições e Pós-condições em Divisão Segura",
          "descricao": "Pré-condição: divisor != 0. Se divisor == 0, o algoritmo não pode prosseguir. Pós-condição: quociente * divisor + resto == dividendo."
        }
      },
      "passoAPasso": [
        "1. Definir o estado inicial esperado (Pré-condição).",
        "2. Executar a primeira instrução atômica.",
        "3. Atualizar o estado do sistema na memória.",
        "4. Seguir rigorosamente a ordem sequencial linha após linha.",
        "5. Validar se o estado final cumpre a Pós-condição."
      ],
      "errosComuns": [
        {
          "erro": "Instruções ambíguas ou vagas (ex: \"adicione tempero a gosto\")",
          "correcao": "Em computação, instruções devem ter quantidades e ações exatas (ex: \"adicione 5 gramas de sal\")."
        },
        {
          "erro": "Inverter a ordem de dependência",
          "correcao": "Você não pode usar o resultado de um cálculo antes de calculá-lo."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Instruções atômicas, sequenciais e com pré-condições verificadas.",
        "ruim": "Passos implícitos que presumem capacidade de adivinhação do computador."
      },
      "pseudocodigo": "// Algoritmo de Troca de Variáveis Seguro\nINÍCIO\n    LER A, B\n    auxiliar <- A\n    A <- B\n    B <- auxiliar\n    ESCREVER \"A agora vale:\", A\n    ESCREVER \"B agora vale:\", B\nFIM",
      "traceData": [
        {
          "passo": 1,
          "acao": "Estado Inicial",
          "estado": "A = 5, B = 9, aux = nulo",
          "obs": "Valores iniciais lidos"
        },
        {
          "passo": 2,
          "acao": "aux <- A",
          "estado": "A = 5, B = 9, aux = 5",
          "obs": "Valor de A preservado em aux"
        },
        {
          "passo": 3,
          "acao": "A <- B",
          "estado": "A = 9, B = 9, aux = 5",
          "obs": "A recebe valor de B"
        },
        {
          "passo": 4,
          "acao": "B <- aux",
          "estado": "A = 9, B = 5, aux = 5",
          "obs": "B recebe valor original de A"
        }
      ],
      "exercicios": [
        {
          "id": "ex3_1",
          "tipo": "multipla_escolha",
          "enunciado": "Se executarmos: 1. X <- 10; 2. Y <- 20; 3. X <- Y; 4. Y <- X; quais serão os valores finais de X e Y?",
          "opcoes": [
            "X = 20 e Y = 10 (trocados com sucesso)",
            "X = 20 e Y = 20 (o valor 10 original de X foi perdido no passo 3)",
            "X = 10 e Y = 20 (nada mudou)",
            "X = 10 e Y = 10"
          ],
          "correta": 1,
          "pista": "Acompanhe passo a passo: no passo 3, X recebe 20. Quando o passo 4 roda (Y <- X), X já vale 20!",
          "justificativa": "Como não foi usada uma variável auxiliar para guardar o valor 10 original, ao sobrescrever X com 20, o valor anterior foi destruído da memória."
        }
      ],
      "perguntasVerificacao": "Por que um algoritmo precisa de determinismo e finitude para ser considerado correto?",
      "keywordsIA": [
        "algoritmo",
        "sequencia",
        "ordem",
        "instrucao",
        "pre-condicao",
        "pos-condicao",
        "determinismo",
        "finitude",
        "ambiguidade",
        "passos"
      ],
      "misconceptionsIA": [
        {
          "termo": "linguagem",
          "erro": "Confundir algoritmo com código Python/C",
          "explicacao": "Algoritmo é o raciocínio independente de qualquer sintaxe ou computador."
        }
      ],
      "explicacaoIdealIA": "Um algoritmo é uma sequência finita, ordenada e não ambígua de instruções que transforma entradas em saídas predeterminadas, onde a ordem dos passos determina o estado final da memória."
    },
    {
      "id": 4,
      "slug": "entradas-processamento-saidas",
      "badge": "Módulo 4 · Fluxo IPO",
      "nivel": "Iniciante",
      "titulo": "Entradas, Processamento e Saídas (Modelo IPO)",
      "subtitulo": "A tríade fundamental de qualquer sistema computacional: Input, Process, Output.",
      "objetivo": "Mapear com exatidão como as informações entram em um algoritmo, como sofrem transformações puras e como são comunicadas como resultados.",
      "introducaoIntuitiva": "Pense em um liquidificador: você coloca frutas e leite (Entradas), liga o motor que bate os ingredientes conforme a velocidade (Processamento) e obtém uma vitamina pronta no copo (Saída).",
      "explicacaoAprofundada": "O modelo IPO (Input-Process-Output) é a base da arquitetura computacional. A Entrada representa os dados fornecidos pelo ambiente externo; o Processamento é o conjunto de operações aplicadas sobre esses dados; a Saída é a apresentação do resultado.",
      "exemplos": {
        "basico": {
          "titulo": "Média de Duas Notas",
          "descricao": "Entradas: nota1, nota2. Processamento: media = (nota1 + nota2) / 2. Saída: media."
        },
        "intermediario": {
          "titulo": "Conversão de Temperatura",
          "descricao": "Entrada: Celsius (C). Processamento: F = (C * 9/5) + 32. Saída: Fahrenheit (F)."
        },
        "avancado": {
          "titulo": "Processamento com Validação Prévia",
          "descricao": "Validar se horas >= 0 e valor > 0 antes de calcular salário."
        }
      },
      "passoAPasso": [
        "1. Listar variáveis de Entrada.",
        "2. Validar o domínio dessas entradas.",
        "3. Definir a fórmula de Processamento.",
        "4. Emitir o resultado (Saída)."
      ],
      "errosComuns": [
        {
          "erro": "Processar antes de receber todas as entradas",
          "correcao": "Certifique-se de que todas as variáveis foram lidas antes de usá-las."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Separação clara entre Entrada, Validação, Cálculo e Saída.",
        "ruim": "Misturar leitura com cálculos incompletos."
      },
      "pseudocodigo": "INÍCIO\n    LER valor_hora, horas_mes\n    salario_bruto <- valor_hora * horas_mes\n    imposto <- salario_bruto * 0.11\n    salario_liquido <- salario_bruto - imposto\n    ESCREVER salario_liquido\nFIM",
      "traceData": [
        {
          "passo": 1,
          "acao": "LER entradas",
          "estado": "valor_hora = 50, horas = 160",
          "obs": "Entradas capturadas"
        },
        {
          "passo": 2,
          "acao": "salario_bruto <- 50 * 160",
          "estado": "salario_bruto = 8000",
          "obs": "Processamento"
        },
        {
          "passo": 3,
          "acao": "salario_liquido <- 8000 - 880",
          "estado": "salario_liquido = 7120",
          "obs": "Saída calculada"
        }
      ],
      "exercicios": [
        {
          "id": "ex4_1",
          "tipo": "multipla_escolha",
          "enunciado": "Para calcular a área de um círculo (A = π * r²), quais são as entradas estritamente necessárias fornecidas pelo usuário?",
          "opcoes": [
            "Apenas o raio (r).",
            "O raio e o valor de π.",
            "A área e o diâmetro.",
            "O perímetro."
          ],
          "correta": 0,
          "pista": "π é uma constante matemática do processamento, não precisa ser digitado pelo usuário.",
          "justificativa": "O raio r é a única variável de entrada necessária; π é uma constante conhecida no algoritmo."
        }
      ],
      "perguntasVerificacao": "Qual o risco de processar dados sem antes validar as entradas?",
      "keywordsIA": [
        "entrada",
        "processamento",
        "saida",
        "ipo",
        "dados",
        "transformacao",
        "validacao",
        "resultado"
      ],
      "misconceptionsIA": [
        {
          "termo": "constante",
          "erro": "Achar que constantes precisam ser digitadas como entrada",
          "explicacao": "Constantes matemáticas são pré-definidas no algoritmo."
        }
      ],
      "explicacaoIdealIA": "O modelo IPO divide a solução em três etapas: captura de dados externos (entrada), aplicação de transformações lógicas e matemáticas (processamento) e devolução do resultado útil (saída)."
    },
    {
      "id": 5,
      "slug": "variaveis-dados-estado",
      "badge": "Módulo 5 · Memória & Estado",
      "nivel": "Iniciante",
      "titulo": "Variáveis, Tipos de Dados e Estado",
      "subtitulo": "Espaço de armazenamento abstrato, tipos conceituais, mutabilidade e tabela de rastreamento.",
      "objetivo": "Compreender variáveis como caixas rotuladas na memória com tipo e valor mutável, dominando a diferença entre atribuição e igualdade.",
      "introducaoIntuitiva": "Imagine gavetas identificadas com etiquetas: uma gaveta rotulada \"Idade\" só guarda números inteiros; uma gaveta \"Nome\" guarda textos.",
      "explicacaoAprofundada": "Uma variável é uma abstração para uma posição de memória com nome, tipo e valor. A atribuição (<- ou =) é uma ação de escrita que calcula a expressão da direita e sobrescreve a memória da esquerda.",
      "exemplos": {
        "basico": {
          "titulo": "Atribuição e Sobrescrita",
          "descricao": "x <- 10; x <- x + 5 (novo x recebe 15)."
        },
        "intermediario": {
          "titulo": "Atribuição vs Comparação",
          "descricao": "A <- 5 (grava 5) vs A == 5 (compara se é igual a 5)."
        },
        "avancado": {
          "titulo": "Mutação com Tabela de Trace",
          "descricao": "Rastrear a evolução das variáveis a cada linha de execução."
        }
      },
      "passoAPasso": [
        "1. Declarar variável e tipo.",
        "2. Inicializar valor.",
        "3. Resolver expressão à direita.",
        "4. Gravar na esquerda."
      ],
      "errosComuns": [
        {
          "erro": "Confundir x <- x + 1 com igualdade matemática",
          "correcao": "Em computação é comando de atualização temporal de valor."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Nomes claros e tipos estritamente consistentes.",
        "ruim": "Reaproveitar variáveis para finalidades diferentes."
      },
      "pseudocodigo": "INÍCIO\n    INTEIRO: a, b, total\n    a <- 5\n    b <- 12\n    a <- a + 3\n    total <- a * 2\n    b <- total - a\nFIM",
      "traceData": [
        {
          "passo": 1,
          "acao": "a <- 5, b <- 12",
          "estado": "a=5, b=12, total=?",
          "obs": "Inicialização"
        },
        {
          "passo": 2,
          "acao": "a <- a + 3",
          "estado": "a=8, b=12, total=?",
          "obs": "Mutação"
        },
        {
          "passo": 3,
          "acao": "total <- a * 2",
          "estado": "a=8, b=12, total=16",
          "obs": "Cálculo"
        }
      ],
      "exercicios": [
        {
          "id": "ex5_1",
          "tipo": "multipla_escolha",
          "enunciado": "Se executarmos: a <- 2; b <- 4; a <- a * b; b <- a + b; qual o valor final de b?",
          "opcoes": [
            "8",
            "12",
            "16",
            "6"
          ],
          "correta": 1,
          "pista": "Rastreie: a <- 2 * 4 = 8; depois b <- 8 + 4 = 12!",
          "justificativa": "No primeiro passo a recebe 8. No segundo passo b recebe 8 + 4 = 12."
        }
      ],
      "perguntasVerificacao": "Por que a atribuição destrói o valor anterior de uma variável?",
      "keywordsIA": [
        "variavel",
        "tipo",
        "estado",
        "atribuicao",
        "memoria",
        "mutacao",
        "trace",
        "sobrescrever"
      ],
      "misconceptionsIA": [
        {
          "termo": "igualdade",
          "erro": "Achar que atribuição é estática",
          "explicacao": "Atribuição é temporal e mutável."
        }
      ],
      "explicacaoIdealIA": "Variáveis são espaços nomeados na memória que armazenam valores de determinado tipo. O estado muda a cada atribuição."
    },
    {
      "id": 6,
      "slug": "operadores-expressoes",
      "badge": "Módulo 6 · Operadores",
      "nivel": "Iniciante",
      "titulo": "Operadores e Avaliação de Expressões",
      "subtitulo": "Aritméticos, relacionais, lógicos, precedência de operadores e uso de parênteses.",
      "objetivo": "Dominar a avaliação rigorosa de expressões, respeitando a ordem de precedência e o uso de parênteses.",
      "introducaoIntuitiva": "Em matemática básica, 2 + 3 * 4 não é 20, mas 14, porque a multiplicação tem prioridade.",
      "explicacaoAprofundada": "Operadores combinam operandos para produzir um único valor: aritméticos (+, -, *, /, %), relacionais (==, !=, >, <, >=, <=) e lógicos (NÃO, E, OU).",
      "exemplos": {
        "basico": {
          "titulo": "Operador Módulo (%)",
          "descricao": "17 % 5 = 2. N % 2 == 0 identifica números pares."
        },
        "intermediario": {
          "titulo": "Expressão Mista",
          "descricao": "(10 + 2) > (4 * 3) -> 12 > 12 -> Falso."
        },
        "avancado": {
          "titulo": "Curto-circuito",
          "descricao": "Na expressão FALSO E f(), f() nem é avaliada."
        }
      },
      "passoAPasso": [
        "1. Resolver parênteses internos.",
        "2. Multiplicações, divisões e restos.",
        "3. Somas e subtrações.",
        "4. Relacionais.",
        "5. Lógicos."
      ],
      "errosComuns": [
        {
          "erro": "Esquecer parênteses no cálculo de médias (a + b / 2)",
          "correcao": "Use (a + b) / 2."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Uso explícito de parênteses para garantir clareza.",
        "ruim": "Expressões longas confiando na precedência implícita."
      },
      "pseudocodigo": "teste <- (10 + 5 * 2) > 15 E (20 % 3 == 2)",
      "traceData": [
        {
          "passo": 1,
          "acao": "5 * 2",
          "estado": "10 + 10 > 15 E 20 % 3 == 2",
          "obs": "Aritmética prioritária"
        },
        {
          "passo": 2,
          "acao": "20 > 15 E 2 == 2",
          "estado": "VERDADEIRO E VERDADEIRO",
          "obs": "Relacionais"
        },
        {
          "passo": 3,
          "acao": "Conjunção",
          "estado": "Resultado = VERDADEIRO",
          "obs": "Lógico"
        }
      ],
      "exercicios": [
        {
          "id": "ex6_1",
          "tipo": "multipla_escolha",
          "enunciado": "Qual o resultado de: NÃO(4 + 2 == 6 OU 8 < 3)?",
          "opcoes": [
            "VERDADEIRO",
            "FALSO",
            "6",
            "Indeterminado"
          ],
          "correta": 1,
          "pista": "4+2==6 é V; V OU F resulta em V; NÃO(V) resulta em F.",
          "justificativa": "A disjunção interna resulta em Verdadeiro. A negação externa NÃO(V) produz FALSO."
        }
      ],
      "perguntasVerificacao": "Qual a ordem de precedência padrão entre operadores aritméticos, relacionais e lógicos?",
      "keywordsIA": [
        "operadores",
        "precedencia",
        "aritmetico",
        "relacional",
        "logico",
        "parenteses",
        "modulo"
      ],
      "misconceptionsIA": [
        {
          "termo": "precedencia",
          "erro": "Achar que contas são sempre feitas da esquerda para a direita",
          "explicacao": "Operadores possuem hierarquia estrita."
        }
      ],
      "explicacaoIdealIA": "Expressões são avaliadas respeitando precedência rígida: parênteses, aritméticos, relacionais e lógicos."
    },
    {
      "id": 7,
      "slug": "logica-proposicional",
      "badge": "Módulo 7 · Lógica Proposicional",
      "nivel": "Intermediário",
      "titulo": "Lógica Proposicional e Tabelas-Verdade",
      "subtitulo": "Proposições, conectivos (E, OU, NÃO, XOR, Implicação), Leis de De Morgan e equivalências.",
      "objetivo": "Dominar formalmente a lógica proposicional clássica, tabelas-verdade completas e Leis de De Morgan.",
      "introducaoIntuitiva": "Quando um clube diz: \"Entrada com Ingresso E (Acompanhado OU Maior de 18)\", você está aplicando lógica proposicional.",
      "explicacaoAprofundada": "Proposições são sentenças declarativas classificadas como V ou F. Conectivos: E (conjunção), OU (disjunção inclusiva), XOR (disjunção exclusiva), Implicação P->Q (falsa somente se V->F). Leis de De Morgan: ~(P ∧ Q) ≡ ~P ∨ ~Q.",
      "exemplos": {
        "basico": {
          "titulo": "OU Inclusivo vs XOR",
          "descricao": "OU aceita ambas verdadeiras; XOR exige exatamente uma verdadeira."
        },
        "intermediario": {
          "titulo": "Tabela da Implicação",
          "descricao": "F -> V é Verdadeiro (premissa falsa não invalida a implicação)."
        },
        "avancado": {
          "titulo": "De Morgan na Prática",
          "descricao": "Negar (idade >= 18 E cnh) vira (idade < 18 OU NÃO cnh)."
        }
      },
      "passoAPasso": [
        "1. Identificar proposições (P, Q).",
        "2. Gerar 2^n linhas.",
        "3. Preencher combinações.",
        "4. Avaliar colunas intermediárias."
      ],
      "errosComuns": [
        {
          "erro": "Confundir OU inclusivo com OU exclusivo",
          "correcao": "No OU lógico padrão, se ambas forem V, o resultado é V."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Construção metódica de tabelas-verdade com 2^n linhas.",
        "ruim": "Tentar adivinhar expressões lógicas compostas."
      },
      "pseudocodigo": "// P | Q | P E Q | P OU Q | P -> Q\n// V | V |   V   |   V    |   V\n// V | F |   F   |   V    |   F  <-- Único caso falso\n// F | V |   F   |   V    |   V\n// F | F |   F   |   F    |   V",
      "traceData": [
        {
          "passo": 1,
          "acao": "P=V, Q=V",
          "estado": "P E Q = V, P OU Q = V",
          "obs": "Ambas V"
        },
        {
          "passo": 2,
          "acao": "P=V, Q=F",
          "estado": "P E Q = F, P OU Q = V",
          "obs": "Apenas P é V"
        }
      ],
      "exercicios": [
        {
          "id": "ex7_1",
          "tipo": "multipla_escolha",
          "enunciado": "Qual a negação de: \"O aluno estuda E passa no exame\"?",
          "opcoes": [
            "O aluno não estuda E não passa no exame.",
            "O aluno não estuda OU não passa no exame.",
            "O aluno estuda mas não passa.",
            "O aluno passa sem estudar."
          ],
          "correta": 1,
          "pista": "De Morgan: ~(P ∧ Q) ≡ ~P ∨ ~Q.",
          "justificativa": "Pela Lei de De Morgan, a negação da conjunção transforma o E em OU negando ambas as partes."
        }
      ],
      "perguntasVerificacao": "Em qual único caso a implicação lógica P -> Q assume valor Falso?",
      "keywordsIA": [
        "proposicao",
        "tabela-verdade",
        "conjuncao",
        "disjuncao",
        "implicacao",
        "demorgan",
        "tautologia",
        "xor"
      ],
      "misconceptionsIA": [
        {
          "termo": "ou",
          "erro": "Achar que o OU exclui a possibilidade de ambas serem verdadeiras",
          "explicacao": "O OU clássico é inclusivo."
        }
      ],
      "explicacaoIdealIA": "A lógica proposicional analisa sentenças booleanas através de tabelas-verdade e equivalências como as Leis de De Morgan."
    },
    {
      "id": 8,
      "slug": "estruturas-condicionais",
      "badge": "Módulo 8 · Condicionais",
      "nivel": "Intermediário",
      "titulo": "Estruturas Condicionais e Tomada de Decisão",
      "subtitulo": "SE/ENTÃO/SENÃO, decisões aninhadas, cobertura exaustiva de casos e condições impossíveis.",
      "objetivo": "Construir fluxos de decisão robustos sem lacunas lógicas, cobrindo 100% dos cenários possíveis.",
      "introducaoIntuitiva": "Bifurcação em uma estrada: dependendo da placa (se o destino for Norte ou Sul), você escolhe o caminho.",
      "explicacaoAprofundada": "Estruturas condicionais avaliam testes booleanos para direcionar o fluxo de controle: Simples (SE), Composta (SE...SENÃO) e Encadeada (SE...SENÃO SE...SENÃO).",
      "exemplos": {
        "basico": {
          "titulo": "Par ou Ímpar",
          "descricao": "SE num % 2 == 0 \"Par\" SENÃO \"Ímpar\"."
        },
        "intermediario": {
          "titulo": "Faixa Etária sem Redundância",
          "descricao": "SE idade < 12 \"Criança\" SENÃO SE idade < 18 \"Adolescente\" SENÃO \"Adulto\"."
        },
        "avancado": {
          "titulo": "Detecção de Dead Code",
          "descricao": "SE x > 10 ... SENÃO SE x > 20 (segundo ramo inalcançável)."
        }
      },
      "passoAPasso": [
        "1. Mapear variáveis de decisão.",
        "2. Ordenar checagens das mais específicas para as gerais.",
        "3. Incluir SENÃO final."
      ],
      "errosComuns": [
        {
          "erro": "Condições redundantes no SENÃO SE",
          "correcao": "A negação do bloco anterior já é garantida automaticamente."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Escada condicional mutuamente exclusiva e exaustiva.",
        "ruim": "Múltiplos SEs soltos retestando condições."
      },
      "pseudocodigo": "SE nota >= 7.0 ENTÃO\n    ESCREVER \"Aprovado\"\nSENÃO SE nota >= 5.0 ENTÃO\n    ESCREVER \"Recuperação\"\nSENÃO\n    ESCREVER \"Reprovado\"\nFIM_SE",
      "traceData": [
        {
          "passo": 1,
          "acao": "nota = 6.5",
          "estado": "nota >= 7.0 -> FALSO",
          "obs": "Passa para o próximo teste"
        },
        {
          "passo": 2,
          "acao": "nota >= 5.0",
          "estado": "VERDADEIRO -> Recuperação",
          "obs": "Ramo executado"
        }
      ],
      "exercicios": [
        {
          "id": "ex8_1",
          "tipo": "multipla_escolha",
          "enunciado": "Se x = 4 e executamos: SE x > 5 ENTÃO r <- 1 SENÃO SE x > 2 ENTÃO r <- 2 SENÃO r <- 3; qual o valor de r?",
          "opcoes": [
            "r = 1",
            "r = 2",
            "r = 3",
            "r = 0"
          ],
          "correta": 1,
          "pista": "4 > 5 é Falso. 4 > 2 é Verdadeiro!",
          "justificativa": "O primeiro teste falha e o segundo teste é satisfeito, gravando r <- 2."
        }
      ],
      "perguntasVerificacao": "O que é código inalcançável (dead code) em estruturas condicionais?",
      "keywordsIA": [
        "condicional",
        "se",
        "senao",
        "aninhada",
        "decisao",
        "cobertura",
        "fronteira",
        "dead_code"
      ],
      "misconceptionsIA": [
        {
          "termo": "ses_soltos",
          "erro": "Achar que vários SEs isolados são iguais a SE/SENÃO",
          "explicacao": "SEs soltos sempre avaliam todas as linhas."
        }
      ],
      "explicacaoIdealIA": "Estruturas condicionais organizam o desvio do fluxo de execução garantindo cobertura total de casos."
    },
    {
      "id": 9,
      "slug": "repeticao-lacos",
      "badge": "Módulo 9 · Laços de Repetição",
      "nivel": "Intermediário",
      "titulo": "Repetição, Iteração e Laços (Loops)",
      "subtitulo": "ENQUANTO, REPITA/ATÉ, PARA, contadores, acumuladores, invariantes e laços infinitos.",
      "objetivo": "Compreender a automação de repetições, controle de variáveis de ciclo e condições de parada finitas.",
      "introducaoIntuitiva": "Carimbar 100 documentos: você aprende a ação uma vez e a repete enquanto o contador for menor que 100.",
      "explicacaoAprofundada": "Estruturas de repetição executam blocos zero ou mais vezes: Pré-testada (ENQUANTO), Pós-testada (REPITA) e Variável de Controle (PARA).",
      "exemplos": {
        "basico": {
          "titulo": "Somatório de 1 a N",
          "descricao": "Acumular valores variáveis: soma <- soma + i."
        },
        "intermediario": {
          "titulo": "Erro Off-by-One",
          "descricao": "Usar < em vez de <= e rodar uma vez a menos do que o necessário."
        },
        "avancado": {
          "titulo": "Prova de Terminação",
          "descricao": "Garantir que a variável de controle avance em direção à condição de parada."
        }
      },
      "passoAPasso": [
        "1. Inicializar variáveis antes do laço.",
        "2. Definir condição de parada.",
        "3. Atualizar controle dentro do corpo."
      ],
      "errosComuns": [
        {
          "erro": "Esquecer de incrementar o contador (Loop Infinito)",
          "correcao": "Sempre atualize o contador dentro do corpo."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Laço com condição de parada clara e progresso estrito.",
        "ruim": "Laço com múltiplas saídas imprevisíveis."
      },
      "pseudocodigo": "soma <- 0\nc <- 1\nENQUANTO c <= 5 FAÇA\n    soma <- soma + c\n    c <- c + 1\nFIM_ENQUANTO",
      "traceData": [
        {
          "passo": 1,
          "acao": "Início",
          "estado": "soma = 0, c = 1",
          "obs": "Inicial"
        },
        {
          "passo": 2,
          "acao": "Ciclos 1 a 5",
          "estado": "soma = 15, c = 6",
          "obs": "Término"
        }
      ],
      "exercicios": [
        {
          "id": "ex9_1",
          "tipo": "multipla_escolha",
          "enunciado": "Se c <- 1 e executamos: ENQUANTO c < 4 FAÇA { c <- c + 1 }; quantas vezes o corpo do laço é executado?",
          "opcoes": [
            "3 vezes (c = 1, 2, 3)",
            "4 vezes",
            "2 vezes",
            "Infinitas vezes"
          ],
          "correta": 0,
          "pista": "Para c=1 roda (c vira 2); c=2 roda (c vira 3); c=3 roda (c vira 4); c=4 para!",
          "justificativa": "O laço executa exatamente 3 iterações (para c = 1, 2 e 3)."
        }
      ],
      "perguntasVerificacao": "Qual a diferença entre a repetição pré-testada (ENQUANTO) e a pós-testada (REPITA)?",
      "keywordsIA": [
        "repeticao",
        "laco",
        "loop",
        "enquanto",
        "para",
        "contador",
        "acumulador",
        "iteracao",
        "laco_infinito"
      ],
      "misconceptionsIA": [
        {
          "termo": "contador",
          "erro": "Confundir contador com acumulador",
          "explicacao": "Contador tem passo fixo; acumulador soma valores variáveis."
        }
      ],
      "explicacaoIdealIA": "Estruturas de repetição automatizam instruções através de iterações controladas por contadores e condições de parada finitas."
    },
    {
      "id": 10,
      "slug": "fluxogramas-representacao-visual",
      "badge": "Módulo 10 · Modelagem Visual",
      "nivel": "Intermediário",
      "titulo": "Fluxogramas e Representação Visual de Algoritmos",
      "subtitulo": "Simbologia ANSI/ISO, diagramas de blocos, caminhos de decisão e conversão para pseudocódigo.",
      "objetivo": "Mapear fluxos lógicos através de notação gráfica padronizada ISO/ANSI.",
      "introducaoIntuitiva": "Um fluxograma é o mapa rodoviário do raciocínio lógico.",
      "explicacaoAprofundada": "Símbolos ISO 5807: Terminador (Oval), Processamento (Retângulo), E/S (Paralelogramo), Decisão (Losango) e Setas de fluxo.",
      "exemplos": {
        "basico": {
          "titulo": "Sequência Linear",
          "descricao": "[Início] -> [/Ler raio/] -> [Área = π*r²] -> [Fim]."
        },
        "intermediario": {
          "titulo": "Decisão Binária",
          "descricao": "Losango <Saldo >= Compra?> com saídas Sim e Não."
        },
        "avancado": {
          "titulo": "Ciclo com Seta de Retorno",
          "descricao": "Seta que volta ao topo do losango de teste."
        }
      },
      "passoAPasso": [
        "1. Usar óvalo para início/fim.",
        "2. Retângulos para cálculos.",
        "3. Losangos para decisões."
      ],
      "errosComuns": [
        {
          "erro": "Losango com apenas uma saída",
          "correcao": "Toda decisão deve ter no mínimo duas saídas (V e F)."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Fluxo descendente limpo com símbolos padronizados.",
        "ruim": "Diagrama caótico com cruzamento de linhas."
      },
      "pseudocodigo": "SE temp > 37.5 ENTÃO ESCREVER \"Febre\" SENÃO ESCREVER \"Normal\" FIM_SE",
      "traceData": [
        {
          "passo": 1,
          "acao": "Decisão visual",
          "estado": "temp = 38 -> Ramo SIM",
          "obs": "Desvio"
        }
      ],
      "exercicios": [
        {
          "id": "ex10_1",
          "tipo": "multipla_escolha",
          "enunciado": "Qual símbolo geométrico representa uma Tomada de Decisão em fluxogramas?",
          "opcoes": [
            "Retângulo",
            "Losango",
            "Oval",
            "Paralelogramo"
          ],
          "correta": 1,
          "pista": "Polígono de 4 lados inclinados com saídas Sim/Não.",
          "justificativa": "O Losango é o símbolo universal para bifurcações condicionais."
        }
      ],
      "perguntasVerificacao": "Qual a principal vantagem da representação visual por fluxogramas?",
      "keywordsIA": [
        "fluxograma",
        "losango",
        "retangulo",
        "simbologia",
        "diagrama",
        "visual",
        "decisao"
      ],
      "misconceptionsIA": [
        {
          "termo": "simbolos",
          "erro": "Achar que qualquer forma geométrica serve",
          "explicacao": "Símbolos ISO são universais."
        }
      ],
      "explicacaoIdealIA": "Fluxogramas utilizam símbolos geométricos padronizados para ilustrar o caminho de execução de um algoritmo."
    },
    {
      "id": 11,
      "slug": "decomposicao-abstracao",
      "badge": "Módulo 11 · Pensamento Computacional",
      "nivel": "Intermediário",
      "titulo": "Decomposição, Abstração e Padrões",
      "subtitulo": "Os 4 pilares do pensamento computacional: dividir para conquistar, ignorar detalhes e generalizar.",
      "objetivo": "Aplicar Decomposição Top-Down e Abstração para isolar o essencial do secundário.",
      "introducaoIntuitiva": "Engenheiros ao projetar a hidráulica de um prédio ignoram temporariamente a cor das paredes.",
      "explicacaoAprofundada": "Pilares: Decomposição (quebrar em partes), Padrões (reconhecer similaridades), Abstração (filtrar detalhes) e Algoritmos.",
      "exemplos": {
        "basico": {
          "titulo": "Caixa Eletrônico",
          "descricao": "Subproblemas: Autenticar -> Validar Saldo -> Dispensar -> Atualizar."
        },
        "intermediario": {
          "titulo": "Abstração em Cadastro",
          "descricao": "Reter placa e chassi; ignorar aroma do aromatizador."
        },
        "avancado": {
          "titulo": "Padrão de Busca",
          "descricao": "Dicionário e lista telefônica usam o mesmo padrão de busca binária."
        }
      },
      "passoAPasso": [
        "1. Isolar grandes blocos.",
        "2. Refinamento sucessivo.",
        "3. Eliminar detalhes acessórios (Abstração)."
      ],
      "errosComuns": [
        {
          "erro": "Abstração insuficiente",
          "correcao": "Filtre apenas o que afeta diretamente a lógica."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Arquitetura modular em camadas.",
        "ruim": "Código monolítico misturando todas as tarefas."
      },
      "pseudocodigo": "Executar Autenticar(); Executar ValidarSaldo(); Executar Dispensar();",
      "traceData": [
        {
          "passo": 1,
          "acao": "Módulos independentes",
          "estado": "Subproblemas resolvidos",
          "obs": "Modular"
        }
      ],
      "exercicios": [
        {
          "id": "ex11_1",
          "tipo": "multipla_escolha",
          "enunciado": "Ignorar a cor de um veículo para calcular pedágio por número de eixos é um exemplo de:",
          "opcoes": [
            "Decomposição",
            "Abstração",
            "Recursão",
            "Ordenação"
          ],
          "correta": 1,
          "pista": "Filtrar detalhes irrelevantes para reter apenas o essencial.",
          "justificativa": "Abstração é o processo de reter apenas os atributos fundamentais ao modelo."
        }
      ],
      "perguntasVerificacao": "Como a decomposição reduz a complexidade cognitiva no projeto de software?",
      "keywordsIA": [
        "decomposicao",
        "abstracao",
        "padroes",
        "pensamento_computacional",
        "modularizacao"
      ],
      "misconceptionsIA": [
        {
          "termo": "abstracao",
          "erro": "Achar que abstração é deixar incompleto",
          "explicacao": "Abstração é focar no essencial com precisão."
        }
      ],
      "explicacaoIdealIA": "O pensamento computacional decompõe problemas complexos e abstrai detalhes secundários para produzir soluções reutilizáveis."
    },
    {
      "id": 12,
      "slug": "funcoes-procedimentos",
      "badge": "Módulo 12 · Modularização",
      "nivel": "Intermediário",
      "titulo": "Funções, Procedimentos e Modularização",
      "subtitulo": "Parâmetros, retorno de valores, escopo local vs global, reaproveitamento e princípio DRY.",
      "objetivo": "Criar blocos reutilizáveis (funções e procedimentos), dominar passagem de parâmetros e isolamento de escopo.",
      "introducaoIntuitiva": "Botão de raiz quadrada na calculadora: você passa o número e recebe a resposta sem precisar saber o circuito interno.",
      "explicacaoAprofundada": "Funções retornam um valor calculado; procedimentos executam ações sem retorno. Variáveis dentro de funções possuem escopo local.",
      "exemplos": {
        "basico": {
          "titulo": "Função Dobro",
          "descricao": "FUNÇÃO dobro(x): RETORNAR x * 2."
        },
        "intermediario": {
          "titulo": "Função de Validação",
          "descricao": "FUNÇÃO eh_par(n): RETORNAR n % 2 == 0."
        },
        "avancado": {
          "titulo": "Isolamento de Escopo",
          "descricao": "Variáveis locais não poluem nem afetam o escopo externo."
        }
      },
      "passoAPasso": [
        "1. Identificar lógica repetida.",
        "2. Definir parâmetros e tipo de retorno.",
        "3. Usar instrução RETORNAR."
      ],
      "errosComuns": [
        {
          "erro": "Confundir ESCREVER na tela com RETORNAR valor",
          "correcao": "RETORNAR entrega o dado para a memória do programa."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Funções puras e de responsabilidade única.",
        "ruim": "Duplicação de blocos de código (violação do DRY)."
      },
      "pseudocodigo": "FUNÇÃO imposto(salario) : REAL\n    SE salario > 5000 ENTÃO RETORNAR salario * 0.20 SENÃO RETORNAR salario * 0.10 FIM_SE\nFIM_FUNÇÃO",
      "traceData": [
        {
          "passo": 1,
          "acao": "imposto(6000)",
          "estado": "Retorna 1200.00",
          "obs": "Valor devolvido"
        }
      ],
      "exercicios": [
        {
          "id": "ex12_1",
          "tipo": "multipla_escolha",
          "enunciado": "Qual a diferença essencial entre Função e Procedimento?",
          "opcoes": [
            "Função retorna obrigatoriamente um valor resultante; Procedimento executa ações sem retornar valor.",
            "Procedimento é mais rápido que Função.",
            "Funções não aceitam parâmetros.",
            "Procedimentos só aceitam textos."
          ],
          "correta": 0,
          "pista": "A presença da instrução RETORNAR distingue a função.",
          "justificativa": "Funções produzem e devolvem um valor utilizável em expressões."
        }
      ],
      "perguntasVerificacao": "Por que o escopo local de variáveis evita efeitos colaterais indesejados?",
      "keywordsIA": [
        "funcao",
        "procedimento",
        "parametro",
        "retorno",
        "escopo",
        "modularizacao",
        "dry"
      ],
      "misconceptionsIA": [
        {
          "termo": "retorno",
          "erro": "Achar que imprimir na tela é retornar valor",
          "explicacao": "Imprimir mostra texto ao usuário; retornar grava na memória do chamador."
        }
      ],
      "explicacaoIdealIA": "Funções são unidades modulares que recebem parâmetros, operam em escopo isolado e retornam resultados computados."
    },
    {
      "id": 13,
      "slug": "validacao-testes-depuracao",
      "badge": "Módulo 13 · Qualidade & Testes",
      "nivel": "Intermediário",
      "titulo": "Validação, Testes e Depuração Lógica",
      "subtitulo": "Particionamento de equivalência, análise de valor limite, contraexemplos e busca de causa-raiz.",
      "objetivo": "Dominar criação de casos de teste sistemáticos, análise de valores limites e técnicas de depuração.",
      "introducaoIntuitiva": "Engenheiro que projeta uma ponte a testa sob tempestade com carga máxima, não apenas em dia de sol.",
      "explicacaoAprofundada": "Testes de Caixa-Preta: Partição de Equivalência e Análise de Valores Limites. Depuração é a localização da causa-raiz do defeito.",
      "exemplos": {
        "basico": {
          "titulo": "Contraexemplo",
          "descricao": "SE nota > 6 Aprovado. Aluno com 6.0 é reprovado por erro de operador (> vs >=)."
        },
        "intermediario": {
          "titulo": "Divisão por Zero Oculta",
          "descricao": "Calcular velocidade = d / t sem checar se t > 0."
        },
        "avancado": {
          "titulo": "Valores Limites",
          "descricao": "Testar -0.1, 0.0, 0.1, 9.9, 10.0, 10.1 em notas escolares."
        }
      },
      "passoAPasso": [
        "1. Matriz de testes.",
        "2. Casos normais, limites e inválidos.",
        "3. Confrontar saída obtida com esperada."
      ],
      "errosComuns": [
        {
          "erro": "Testar apenas com dados que dão certo",
          "correcao": "O objetivo do teste é tentar quebrar a solução procurando contraexemplos."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Casos cobrindo fronteiras e classes de equivalência.",
        "ruim": "Testar com 1 único valor arbitrário."
      },
      "pseudocodigo": "SE a + b > c E a + c > b E b + c > a ENTÃO \"Triângulo Válido\" SENÃO \"Inválido\" FIM_SE",
      "traceData": [
        {
          "passo": 1,
          "acao": "Teste limites",
          "estado": "Fronteiras validadas",
          "obs": "Passou"
        }
      ],
      "exercicios": [
        {
          "id": "ex13_1",
          "tipo": "multipla_escolha",
          "enunciado": "Para validar notas de 0 a 10, quais entradas aplicam a Análise de Valores Limites?",
          "opcoes": [
            "5, 6, 7",
            "-0.1, 0.0, 0.1, 9.9, 10.0, 10.1",
            "1, 2, 3",
            "Apenas 10"
          ],
          "correta": 1,
          "pista": "Testar imediatamente antes, no ponto e logo após cada fronteira válida.",
          "justificativa": "Valores limites testam com rigor as bordas do domínio de entrada."
        }
      ],
      "perguntasVerificacao": "Por que encontrar um único contraexemplo refuta a correção de um algoritmo?",
      "keywordsIA": [
        "testes",
        "depuracao",
        "validacao",
        "fronteira",
        "contraexemplo",
        "causa_raiz",
        "limite"
      ],
      "misconceptionsIA": [
        {
          "termo": "teste",
          "erro": "Achar que testes provam a ausência total de erros",
          "explicacao": "Testes revelam a presença de defeitos, mas não cobrem infinitos casos."
        }
      ],
      "explicacaoIdealIA": "Testar é submeter o algoritmo a casos normais e limites para localizar e corrigir defeitos conceituais na causa-raiz."
    },
    {
      "id": 14,
      "slug": "correcao-invariantes-provas",
      "badge": "Módulo 14 · Provas Formais",
      "nivel": "Avançado",
      "titulo": "Correção de Algoritmos e Invariantes de Laço",
      "subtitulo": "Pré-condições, pós-condições, invariantes de repetição e prova de terminação.",
      "objetivo": "Demonstrar formalmente que um algoritmo é correto para TODAS as entradas possíveis através de invariantes e indução.",
      "introducaoIntuitiva": "Provar que a engrenagem de um relógio mantém uma propriedade constante a cada segundo (invariante).",
      "explicacaoAprofundada": "Correção Total = Correção Parcial + Terminação. Invariante de Laço é provada em 3 fases: Inicialização (base), Manutenção (passo) e Terminação.",
      "exemplos": {
        "basico": {
          "titulo": "Invariante do Máximo",
          "descricao": "\"maior\" contém o valor máximo de lista[0 .. i-1] no início do ciclo i."
        },
        "intermediario": {
          "titulo": "Função Variante de Terminação",
          "descricao": "Quantidade restante (n - i) decresce estritamente até zero."
        },
        "avancado": {
          "titulo": "Correção Parcial da Multiplicação",
          "descricao": "Invariante: produto == A * contador_atual."
        }
      },
      "passoAPasso": [
        "1. Especificar pré e pós-condições.",
        "2. Formular a Invariante de Laço.",
        "3. Provar Inicialização, Manutenção e Terminação."
      ],
      "errosComuns": [
        {
          "erro": "Confundir invariante com a condição de parada",
          "correcao": "A invariante é a propriedade que permanece verdadeira em todo ciclo."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Prova formal indutiva de preservação de estado.",
        "ruim": "Afirmar correção baseado apenas em intuição."
      },
      "pseudocodigo": "// Invariante: maior == max(lista[0 .. i-1])\nENQUANTO i < tamanho FAÇA\n    SE lista[i] > maior ENTÃO maior <- lista[i] FIM_SE\n    i <- i + 1\nFIM_ENQUANTO",
      "traceData": [
        {
          "passo": 1,
          "acao": "Indução",
          "estado": "Invariante mantida a cada ciclo",
          "obs": "Provado"
        }
      ],
      "exercicios": [
        {
          "id": "ex14_1",
          "tipo": "multipla_escolha",
          "enunciado": "Quais são as três etapas para provar a correção de um laço com Invariante?",
          "opcoes": [
            "Inicialização, Manutenção e Terminação",
            "Entrada, Processamento e Saída",
            "Compilação, Execução e Teste",
            "Declaração, Atribuição e Destruição"
          ],
          "correta": 0,
          "pista": "Equivalente à Indução Matemática: base, passo indutivo e término.",
          "justificativa": "A prova exige demonstrar a verdade antes do laço, a cada iteração e na parada."
        }
      ],
      "perguntasVerificacao": "Qual a diferença entre Correção Parcial e Correção Total?",
      "keywordsIA": [
        "invariante",
        "correcao",
        "terminacao",
        "pos-condicao",
        "pre-condicao",
        "prova",
        "inducao"
      ],
      "misconceptionsIA": [
        {
          "termo": "invariante",
          "erro": "Achar que invariante é a condição do enquanto",
          "explicacao": "Invariante é a propriedade lógica preservada."
        }
      ],
      "explicacaoIdealIA": "A correção formal prova por indução matemática que as invariantes garantem a pós-condição ao atingir a terminação finita."
    },
    {
      "id": 15,
      "slug": "complexidade-eficiencia",
      "badge": "Módulo 15 · Complexidade Big-O",
      "nivel": "Avançado",
      "titulo": "Complexidade e Eficiência de Algoritmos (Notação Big-O)",
      "subtitulo": "Contagem de operações, crescimento assintótico, O(1), O(log n), O(n), O(n²) e trocas de eficiência.",
      "objetivo": "Compreender a taxa de crescimento assintótico do tempo e espaço conforme a entrada n escala.",
      "introducaoIntuitiva": "Para 1 bilhão de itens: Busca Linear faz 1.000.000.000 passos; Busca Binária faz apenas 30 comparações!",
      "explicacaoAprofundada": "Classes assintóticas: O(1) Constante, O(log n) Logarítmica, O(n) Linear, O(n log n) Linearítmica, O(n²) Quadrática e O(2^n) Exponencial.",
      "exemplos": {
        "basico": {
          "titulo": "Acesso Direto O(1) vs Busca O(n)",
          "descricao": "Acessar lista[0] é instantâneo; procurar exige varrer tudo."
        },
        "intermediario": {
          "titulo": "Laços Aninhados O(n²)",
          "descricao": "Comparar cada item com todos os outros faz n * n operações."
        },
        "avancado": {
          "titulo": "Busca Binária O(log n)",
          "descricao": "Divisão ao meio sucessiva reduz o espaço de busca exponencialmente."
        }
      },
      "passoAPasso": [
        "1. Identificar tamanho n.",
        "2. Contar operações no pior caso.",
        "3. Descartar constantes e termos de menor ordem."
      ],
      "errosComuns": [
        {
          "erro": "Medir complexidade em segundos no relógio",
          "correcao": "Complexidade mede operações abstratas independentes da CPU."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Algoritmo O(log n) escalável para bilhões de registros.",
        "ruim": "Algoritmo O(n²) que trava em dados reais."
      },
      "pseudocodigo": "// Busca Binária O(log n)\ninicio <- 0, fim <- n - 1\nENQUANTO inicio <= fim FAÇA\n    meio <- (inicio + fim) / 2\n    SE lista[meio] == alvo ENTÃO RETORNAR meio\n    SENÃO SE lista[meio] < alvo ENTÃO inicio <- meio + 1\n    SENÃO fim <- meio - 1\nFIM_ENQUANTO",
      "traceData": [
        {
          "passo": 1,
          "acao": "n = 1.000.000",
          "estado": "Busca Binária: 20 passos",
          "obs": "log₂(10⁶) ≈ 20"
        }
      ],
      "exercicios": [
        {
          "id": "ex15_1",
          "tipo": "multipla_escolha",
          "enunciado": "Se dobrarmos a entrada (n para 2n), o que ocorre com as operações em um algoritmo O(n²)?",
          "opcoes": [
            "Quadruplicam (4x)",
            "Dobram (2x)",
            "Ficam iguais",
            "Multiplicam por 8"
          ],
          "correta": 0,
          "pista": "(2n)² = 4n².",
          "justificativa": "Em algoritmos quadráticos, duplicar a entrada quadruplica o esforço."
        }
      ],
      "perguntasVerificacao": "Por que a Busca Binária exige que a coleção esteja previamente ordenada?",
      "keywordsIA": [
        "complexidade",
        "big-o",
        "eficiencia",
        "linear",
        "quadratica",
        "logaritmica",
        "assintotica"
      ],
      "misconceptionsIA": [
        {
          "termo": "segundos",
          "erro": "Achar que computador rápido resolve algoritmo O(2^n)",
          "explicacao": "Crescimento exponencial supera qualquer poder de hardware."
        }
      ],
      "explicacaoIdealIA": "A Notação Big-O quantifica o crescimento assintótico de operações permitindo comparar a escalabilidade teórica de algoritmos."
    },
    {
      "id": 16,
      "slug": "raciocinio-avancado-problemas",
      "badge": "Módulo 16 · Desafios de Raciocínio",
      "nivel": "Avançado",
      "titulo": "Raciocínio Lógico Avançado Aplicado à Programação",
      "subtitulo": "Múltiplas restrições simultâneas, eliminação de hipóteses, matrizes de decisão e problemas complexos.",
      "objetivo": "Resolver problemas intrincados com regras interdependentes aplicando eliminação sistemática por matrizes de decisão.",
      "introducaoIntuitiva": "Enigma com pistas cruzadas: deduzir a verdade eliminando contradições em uma tabela de certezas.",
      "explicacaoAprofundada": "Análise combinatória de cenários, poda de ramos inválidos e formalização de regras de negócio em matrizes de decisão estritas.",
      "exemplos": {
        "basico": {
          "titulo": "Escalonamento com Restrições",
          "descricao": "Alocar tarefas em núcleos respeitando prioridades e bloqueios."
        },
        "intermediario": {
          "titulo": "Algoritmo Guloso e Contraexemplo",
          "descricao": "Troco de moedas guloso falha em sistemas não canônicos."
        },
        "avancado": {
          "titulo": "Motor Antifraude Multicritério",
          "descricao": "Combinação de anomalias de tempo, distância física e dispositivo."
        }
      },
      "passoAPasso": [
        "1. Isolar restrições numeradas.",
        "2. Montar matriz de possibilidades.",
        "3. Eliminar contradições."
      ],
      "errosComuns": [
        {
          "erro": "Presumir hipóteses não declaradas no enunciado",
          "correcao": "Trabalhe apenas com fatos rigorosamente demonstráveis."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Matriz formal cobrindo todas as interseções de regras.",
        "ruim": "Implementação por adivinhação intuitiva."
      },
      "pseudocodigo": "SE dist_km > 500 E tempo_min < 30 ENTÃO RETORNAR \"BLOQUEIO_IMEDIATO\" FIM_SE",
      "traceData": [
        {
          "passo": 1,
          "acao": "Validador multicritério",
          "estado": "Restrições avaliadas",
          "obs": "Seguro"
        }
      ],
      "exercicios": [
        {
          "id": "ex16_1",
          "tipo": "multipla_escolha",
          "enunciado": "Se o acesso exige (Admin OU Gerente) E Horário Comercial E VPN. Um Admin fora do horário comercial usando VPN tem acesso liberado?",
          "opcoes": [
            "Não, porque violou a regra mandatória de horário.",
            "Sim, admin pode tudo.",
            "Sim, por causa da VPN.",
            "Indeterminado."
          ],
          "correta": 0,
          "pista": "Todas as 3 condições estão ligadas por E (conjunção mandatória).",
          "justificativa": "A violação de qualquer uma das condições da conjunção invalida o acesso total."
        }
      ],
      "perguntasVerificacao": "Como matrizes de decisão eliminam lacunas em regras de negócio complexas?",
      "keywordsIA": [
        "raciocinio",
        "deducao",
        "restricoes",
        "matriz_decisao",
        "eliminacao",
        "regras_negocio"
      ],
      "misconceptionsIA": [
        {
          "termo": "feeling",
          "erro": "Confiar em intuição para regras interdependentes",
          "explicacao": "Problemas complexos exigem prova matricial."
        }
      ],
      "explicacaoIdealIA": "O raciocínio avançado decompõe enunciados extensos em matrizes de decisão garantindo soluções robustas."
    },
    {
      "id": 17,
      "slug": "desafios-integradores-avaliacao",
      "badge": "Módulo 17 · Projeto Integrador",
      "nivel": "Avançado",
      "titulo": "Desafios Integradores e Avaliação Global de Domínio",
      "subtitulo": "Síntese de todos os fundamentos: modelar, estruturar, modularizar, testar e justificar.",
      "objetivo": "Integrar todos os conhecimentos em desafios globais, demonstrando maestria conceitual e defesa de decisões.",
      "introducaoIntuitiva": "Você domina todas as ferramentas mentais: agora é hora de construir sistemas completos com autonomia intelectual.",
      "explicacaoAprofundada": "A mestria em lógica pura é a capacidade de ler um problema do mundo real, modelar entidades, construir algoritmos determinísticos e provar sua correção.",
      "exemplos": {
        "basico": {
          "titulo": "Semáforo Inteligente com Fila",
          "descricao": "Controlar fluxo com sensores, tempos máximos e pedestres."
        },
        "intermediario": {
          "titulo": "Motor de Liquidação E-commerce",
          "descricao": "Estoque -> Cupom -> Frete -> Antifraude -> Pagamento."
        },
        "avancado": {
          "titulo": "Interpretador de Regras",
          "descricao": "Avaliador de regras de produção sem contradições."
        }
      },
      "passoAPasso": [
        "1. Especificação.",
        "2. Modelagem de estado.",
        "3. Modularização.",
        "4. Laços com invariantes.",
        "5. Testes."
      ],
      "errosComuns": [
        {
          "erro": "Achar que lógica pura não é usada na indústria",
          "correcao": "Toda a arquitetura de software repousa sobre esses pilares."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Solução modular, testada e justificada formalmente.",
        "ruim": "Código confuso e sem justificativa."
      },
      "pseudocodigo": "ALGORITMO ControladorCruzamentoInteligente ... FIM_ALGORITMO",
      "traceData": [
        {
          "passo": 1,
          "acao": "Integração completa",
          "estado": "Sistema em execução harmônica",
          "obs": "Auditado"
        }
      ],
      "exercicios": [
        {
          "id": "ex17_1",
          "tipo": "multipla_escolha",
          "enunciado": "Qual é o princípio orientador definitivo da engenharia de software?",
          "opcoes": [
            "A lógica e a modelagem antecedem a sintaxe: compreenda, decomponha e valide antes de codificar.",
            "A linguagem é mais importante que o algoritmo.",
            "Basta testar uma vez com sucesso.",
            "Comentários e justificativas são inúteis."
          ],
          "correta": 0,
          "pista": "A linguagem é apenas o meio de expressar um algoritmo previamente construído pela mente.",
          "justificativa": "A capacidade de raciocinar logicamente e estruturar o problema é a base universal que transcende tecnologias."
        }
      ],
      "perguntasVerificacao": "Como o domínio de lógica pura acelera o aprendizado de qualquer tecnologia futura?",
      "keywordsIA": [
        "sintese",
        "integrador",
        "projeto",
        "avaliacao",
        "dominio",
        "maestria",
        "justificativa"
      ],
      "misconceptionsIA": [
        {
          "termo": "sintaxe",
          "erro": "Focar na sintaxe em vez da lógica",
          "explicacao": "A lógica é perene; a sintaxe é passageira."
        }
      ],
      "explicacaoIdealIA": "O domínio da lógica pura capacita o desenvolvedor a modelar, modularizar, testar e justificar soluções computacionais completas."
    },
    {
      "id": 18,
      "slug": "recursao-recorrencias-teorema-mestre",
      "badge": "Módulo 18 · Especialização Avançada",
      "nivel": "Especialista",
      "titulo": "Recursão Avançada, Relações de Recorrência e Teorema Mestre",
      "subtitulo": "Pilha de chamadas, recursão de cauda (Tail Recursion), árvores de recursão e o Teorema Mestre de Cormen.",
      "objetivo": "Dominar a recursão estruturada, provar a corretude recursiva por indução forte, derivar relações de recorrência T(n) = aT(n/b) + f(n) e aplicar os 3 casos do Teorema Mestre.",
      "introducaoIntuitiva": "Imagine duas salas de espelhos paralelos onde cada espelho reflete o outro em tamanho menor, até que o último espelho atinge um tamanho tão diminuto que para de refletir (Caso Base). A recursão resolve problemas definindo uma solução em termos de instâncias menores de si mesma.",
      "explicacaoAprofundada": "Recursão é o paradigma onde um algoritmo chama a si mesmo com argumentos estritamente mais próximos de um Caso Base. Na memória, cada chamada aloca um Frame na Pilha de Execução (Call Stack) com custo espacial O(profundidade). Recursão de Cauda (Tail Recursion) ocorre quando a chamada recursiva é a última operação atômica, permitindo que compiladores otimizem o espaço para O(1). Para analisar o tempo T(n) de algoritmos recursivos de divisão e conquista da forma T(n) = aT(n/b) + f(n), utilizamos o TEOREMA MESTRE (Cormen et al.):\n• Caso 1: Se f(n) = O(n^(log_b(a) - ε)), então T(n) = Θ(n^(log_b a)) [O trabalho nas folhas domina].\n• Caso 2: Se f(n) = Θ(n^(log_b a) * log^k n), então T(n) = Θ(n^(log_b a) * log^(k+1) n) [O trabalho é equilibrado entre os níveis].\n• Caso 3: Se f(n) = Ω(n^(log_b(a) + ε)) e af(n/b) <= c f(n) (condição de regularidade), então T(n) = Θ(f(n)) [O trabalho na raiz domina].",
      "exemplos": {
        "basico": {
          "titulo": "Caso Base e Passo Recursivo no Fatorial",
          "descricao": "FUNÇÃO fat(n): SE n <= 1 RETORNAR 1 (Caso Base) SENÃO RETORNAR n * fat(n - 1) (Passo Indutivo)."
        },
        "intermediario": {
          "titulo": "Transformação de Recursão Tradicional em Tail Recursion",
          "descricao": "Recursão comum: n * fat(n-1) (precisa esperar a volta). Tail Recursion: fat_tail(n, acumulador=1) -> fat_tail(n-1, acumulador * n), eliminando a retenção de stack."
        },
        "avancado": {
          "titulo": "Aplicação do Teorema Mestre no MergeSort",
          "descricao": "MergeSort divide em 2 subproblemas de tamanho n/2 e faz merge em O(n): T(n) = 2T(n/2) + O(n). Aqui a=2, b=2, log_b(a) = log_2(2) = 1. Como f(n) = n^1 = Θ(n^(log_b a)), recai no Caso 2 com k=0 -> T(n) = Θ(n log n)."
        }
      },
      "passoAPasso": [
        "1. Definir explicitamente um ou mais Casos Base que retornam sem fazer chamadas recursivas.",
        "2. Garantir que todas as chamadas recursivas reduzam o tamanho da entrada estritamente em direção ao Caso Base (Prova de Terminação).",
        "3. Montar a equação de recorrência T(n) identificando a (número de subproblemas), b (fator de redução da entrada) e f(n) (custo da divisão e combinação).",
        "4. Calcular o expoente crítico c_crit = log_b(a).",
        "5. Comparar a taxa de crescimento de f(n) com n^(c_crit) e aplicar o caso correspondente do Teorema Mestre."
      ],
      "errosComuns": [
        {
          "erro": "Omissão de Caso Base causando estouro de pilha (Stack Overflow)",
          "correcao": "Todo algoritmo recursivo deve ter condição de parada inevitável."
        },
        {
          "erro": "Aplicar o Teorema Mestre quando a não é constante ou b <= 1",
          "correcao": "O Teorema Mestre só é válido para a >= 1, b > 1 constantes e f(n) assintoticamente positiva."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Recursão com relações bem fundamentadas e otimização de cauda quando aplicável.",
        "ruim": "Recursão ingênua sem memoization com complexidade exponencial O(2^n) (ex: Fibonacci recursivo ingênuo)."
      },
      "pseudocodigo": "// Exemplo: Busca Binária Recursiva T(n) = T(n/2) + O(1) -> O(log n)\nFUNÇÃO busca_rec(lista, inicio, fim, alvo)\n    SE inicio > fim ENTÃO RETORNAR -1 // Caso Base 1: não encontrado\n    meio <- (inicio + fim) / 2\n    SE lista[meio] == alvo ENTÃO RETORNAR meio // Caso Base 2: encontrado\n    SENÃO SE lista[meio] > alvo ENTÃO\n        RETORNAR busca_rec(lista, inicio, meio - 1, alvo) // Subproblema 1\n    SENÃO\n        RETORNAR busca_rec(lista, meio + 1, fim, alvo) // Subproblema 2\n    FIM_SE\nFIM_FUNÇÃO",
      "traceData": [
        {
          "passo": 1,
          "acao": "Chamada 1: busca_rec(0, 7)",
          "estado": "meio = 3, alvo > lista[3]",
          "obs": "Frame 1 na pilha"
        },
        {
          "passo": 2,
          "acao": "Chamada 2: busca_rec(4, 7)",
          "estado": "meio = 5, alvo == lista[5]",
          "obs": "Frame 2 resolve e desempilha"
        },
        {
          "passo": 3,
          "acao": "Retorno para o chamador",
          "estado": "Resultado = 5 (Índice)",
          "obs": "Desalocação de memória"
        }
      ],
      "exercicios": [
        {
          "id": "ex18_1",
          "tipo": "multipla_escolha",
          "enunciado": "Dada a relação de recorrência T(n) = 4T(n/2) + n², qual é a complexidade assintótica T(n) pelo Teorema Mestre?",
          "opcoes": [
            "Θ(n² log n), pois a=4, b=2, log₂ 4 = 2, e f(n) = n² = Θ(n^(log_b a)) (Caso 2 com k=0)",
            "Θ(n²), pois n² domina",
            "Θ(n³)",
            "Θ(log n)"
          ],
          "correta": 0,
          "pista": "Calcule log_b a: log₂ 4 = 2. A função f(n) = n² cresce na mesma taxa que n^(log_b a) = n². Qual caso do Teorema Mestre se aplica?",
          "justificativa": "Como a=4 e b=2, n^(log₂ 4) = n². Como f(n) = n² = Θ(n²), aplica-se o Caso 2 do Teorema Mestre com k=0, resultando em Θ(n² log n)."
        }
      ],
      "perguntasVerificacao": "Qual a diferença entre o Caso 1 (onde as folhas dominam) e o Caso 3 (onde a raiz domina) no Teorema Mestre?",
      "keywordsIA": [
        "recursao",
        "recorrencia",
        "teorema_mestre",
        "caso_base",
        "tail_recursion",
        "pilha_execucao",
        "divisao_conquista",
        "cormen"
      ],
      "misconceptionsIA": [
        {
          "termo": "recursao_infinita",
          "erro": "Achar que recursão consome tempo igual à iteração sem custo de memória",
          "explicacao": "Cada chamada recursiva tradicional cria um frame de memória na Call Stack consumindo O(n) de espaço."
        }
      ],
      "explicacaoIdealIA": "Recursão resolve problemas através de subproblemas menores convergindo para um caso base. O Teorema Mestre resolve relações de recorrência comparando o custo de divisão/combinação f(n) com o número de folhas n^(log_b a)."
    },
    {
      "id": 19,
      "slug": "paradigmas-avancados-algoritmos",
      "badge": "Módulo 19 · Especialização Avançada",
      "nivel": "Especialista",
      "titulo": "Paradigmas Avançados: Divisão & Conquista, Programação Dinâmica e Gulosos",
      "subtitulo": "Subestrutura ótima, subproblemas sobrepostos, Memoization (Top-Down) vs Tabulação (Bottom-Up) e Matróides.",
      "objetivo": "Dominar os 4 grandes paradigmas de projeto de algoritmos: Divisão e Conquista, Programação Dinâmica (DP), Algoritmos Gulosos (Greedy) e Backtracking com Poda.",
      "introducaoIntuitiva": "Se você calcula o caminho mais curto de São Paulo ao Rio passando por Resende, o subtrecho de Resende ao Rio obrigatoriamente também deve ser o caminho mais curto possível entre essas duas cidades. Essa propriedade fundamental é a Subestrutura Ótima.",
      "explicacaoAprofundada": "1. DIVISÃO E CONQUISTA: Divide o problema em subproblemas DISJUNTOS, resolve recursivamente e combina os resultados (ex: MergeSort, QuickSort, Multiplicação de Strassen).\n2. PROGRAMAÇÃO DINÂMICA (Richard Bellman): Aplicável quando o problema possui duas propriedades: (a) Subestrutura Ótima (a solução ótima contém soluções ótimas para os subproblemas) e (b) Subproblemas Sobrepostos (os mesmos subproblemas são resolvidos repetidas vezes). Técnicas: Memoization (Top-Down com tabela/cache de resultados) e Tabulação (Bottom-Up preenchendo matrizes iterativamente).\n3. ALGORITMOS GULOSOS (Greedy): Fazem a escolha localmente ótima a cada passo esperando alcançar o ótimo global. Requerem a Propriedade da Escolha Gulosa (demonstrável via Teoria dos Matróides de Whitney). Se falhar, DP é necessária.\n4. BACKTRACKING & BRANCH-AND-BOUND: Exploração sistemática do espaço de estados em árvore com Poda (Pruning) precoce de ramos que violam restrições.",
      "exemplos": {
        "basico": {
          "titulo": "Fibonacci: Recursão Ingênua O(2^n) vs DP Tabulada O(n)",
          "descricao": "Fibonacci ingênuo recalcula Fib(3) dezenas de vezes. Com DP Tabulada: tabela[0]=0, tabela[1]=1; PARA i=2..n: tabela[i]=tabela[i-1]+tabela[i-2]. Custo reduzido de exponencial para linear!"
        },
        "intermediario": {
          "titulo": "O Problema da Mochila 0/1 (Knapsack Problem)",
          "descricao": "Itens com peso e valor. Abordagem gulosa (pegar maior valor/peso) falha. A solução exata exige Programação Dinâmica com matriz DP[i][w] = max(DP[i-1][w], DP[i-1][w-peso[i]] + valor[i])."
        },
        "avancado": {
          "titulo": "Algoritmo de Huffman (Guloso Ótimo)",
          "descricao": "Compressão de dados usando Árvore de Huffman. A propriedade gulosa de unir sempre os dois nós de menor frequência produz comprovadamente a árvore de codificação ótima com comprimento médio mínimo de bits."
        }
      },
      "passoAPasso": [
        "1. Analisar se o problema possui Subestrutura Ótima (a solução ótima é composta por ótimos menores).",
        "2. Verificar se os subproblemas são disjuntos (usar Divisão e Conquista) ou sobrepostos (usar Programação Dinâmica).",
        "3. Se for DP, formular a Equação de Recorrência de Bellman de transição de estados.",
        "4. Escolher entre Memoization (Top-Down recursivo com cache) ou Tabulação (Bottom-Up com matriz).",
        "5. Se for tentar abordagem Gulosa, PROVAR matematicamente que a escolha gulosa local nunca perde o ótimo global."
      ],
      "errosComuns": [
        {
          "erro": "Usar algoritmo guloso sem provar a propriedade da escolha gulosa",
          "correcao": "Muitos problemas (como Mochila 0/1 ou Troco com moedas arbitrárias) exigem DP pois o guloso fica preso em ótimos locais."
        },
        {
          "erro": "Recursão ingênua sem memoization em subproblemas sobrepostos",
          "correcao": "Gera explosão combinatória O(2^n); sempre armazene estados já computados."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Programação Dinâmica estruturada com matriz de estados e complexidade polinomial garantida.",
        "ruim": "Força bruta exponencial O(2^n) recalculando subestados idênticos repetidamente."
      },
      "pseudocodigo": "// Programação Dinâmica Bottom-Up: Troco Mínimo de Moedas\nFUNÇÃO troco_minimo_dp(moedas, valor_alvo)\n    CRIAR VETOR dp[0 .. valor_alvo] COM VALOR INFINITO\n    dp[0] <- 0 // Caso base: 0 moedas para valor 0\n    \n    PARA v DE 1 ATÉ valor_alvo FAÇA\n        PARA CADA m EM moedas FAÇA\n            SE m <= v ENTÃO\n                dp[v] <- MINIMO(dp[v], dp[v - m] + 1)\n            FIM_SE\n        FIM_PARA\n    FIM_PARA\n    RETORNAR dp[valor_alvo]\nFIM_FUNÇÃO",
      "traceData": [
        {
          "passo": 1,
          "acao": "Inicializar dp[0]=0, dp[1..6]=INF",
          "estado": "moedas = [1, 3, 4]",
          "obs": "Tabela Bottom-Up"
        },
        {
          "passo": 2,
          "acao": "Calcular dp[1] a dp[4]",
          "estado": "dp[1]=1, dp[3]=1, dp[4]=1",
          "obs": "Valores base"
        },
        {
          "passo": 3,
          "acao": "Calcular dp[6]",
          "estado": "dp[6] = dp[3] + 1 = 2 (duas moedas de 3)",
          "obs": "Superou guloso (4+1+1=3 moedas)!"
        }
      ],
      "exercicios": [
        {
          "id": "ex19_1",
          "tipo": "multipla_escolha",
          "enunciado": "Quais são as duas propriedades obrigatórias que um problema deve possuir para que a Programação Dinâmica (DP) seja a estratégia correta de solução?",
          "opcoes": [
            "Subestrutura Ótima e Subproblemas Sobrepostos",
            "Ordenação Prévia e Complexidade Constante",
            "Finitude e Recursão de Cauda",
            "Aleatoriedade e Busca Binária"
          ],
          "correta": 0,
          "pista": "A solução ótima deve ser construída a partir de ótimos menores, e os mesmos subproblemas devem se repetir ao longo da árvore de decisão.",
          "justificativa": "A Programação Dinâmica exige Subestrutura Ótima (para garantir a corretude da composição) e Subproblemas Sobrepostos (para justificar o uso de cache/tabela e evitar recalcular)."
        }
      ],
      "perguntasVerificacao": "Qual a diferença conceitual e de consumo de memória entre Memoization (Top-Down) e Tabulação (Bottom-Up)?",
      "keywordsIA": [
        "programacao_dinamica",
        "subestrutura_otima",
        "subproblemas_sobrepostos",
        "memoization",
        "tabulacao",
        "guloso",
        "greedy",
        "backtracking",
        "bellman"
      ],
      "misconceptionsIA": [
        {
          "termo": "guloso_sempre",
          "erro": "Achar que algoritmos gulosos sempre encontram a melhor solução",
          "explicacao": "Gulosos só funcionam quando a escolha local não compromete escolhas futuras (propriedade de matróide)."
        }
      ],
      "explicacaoIdealIA": "Programação Dinâmica resolve problemas com subestrutura ótima e subproblemas sobrepostos através de memoization ou tabulação. Algoritmos Gulosos fazem escolhas locais irreversíveis e exigem prova formal de otimalidade."
    },
    {
      "id": 20,
      "slug": "logica-hoare-metodos-formais",
      "badge": "Módulo 20 · Especialização Avançada",
      "nivel": "Especialista",
      "titulo": "Lógica de Hoare, Métodos Formais e Verificação Axiomática",
      "subtitulo": "Triplas de Hoare {P} C {Q}, Pré-condição mais fraca (wp), regras de inferência e prova de correção de software.",
      "objetivo": "Dominar o sistema formal de Sir Tony Hoare para provar matematicamente que um programa cumpre sua especificação sem depender de testes amostrais.",
      "introducaoIntuitiva": "Na aviação ou em reatores nucleares, você não pode \"testar 10 vezes e torcer para não cair\". Você precisa de uma prova matemática irrefutável de que o sistema de controle NUNCA entrará em um estado catastrófico. A Lógica de Hoare é a linguagem matemática dessa prova.",
      "explicacaoAprofundada": "A Lógica de Hoare (1969) é um sistema axiomático para raciocinar rigorosamente sobre a correção de programas. Sua unidade fundamental é a TRIPLA DE HOARE:\n    {P} C {Q}\nOnde P é a Pré-condição (o que deve ser verdade antes da execução), C é o Comando/Algoritmo, e Q é a Pós-condição (o que é garantidamente verdade após a execução se C terminar).\n\nREGRAS DE INFERÊNCIA FORMAIS:\n1. Axioma da Atribuição: {Q[x / E]} x := E {Q} (A pré-condição é a pós-condição com todas as ocorrências de x substituídas pela expressão E).\n2. Regra da Composição: Se {P} C1 {R} e {R} C2 {Q}, então {P} C1; C2 {Q}.\n3. Regra do Condicional: Se {P ∧ B} C1 {Q} e {P ∧ ¬B} C2 {Q}, então {P} SE B ENTÃO C1 SENÃO C2 {Q}.\n4. Regra do Laço (Invariante de Hoare): Se {I ∧ B} C {I}, então {I} ENQUANTO B FAÇA C {I ∧ ¬B}.\n5. Pré-condição Mais Fraca (Weakest Precondition - Edsger Dijkstra): wp(C, Q) calcula a condição mínima necessária para que o comando C produza a pós-condição Q com segurança.",
      "exemplos": {
        "basico": {
          "titulo": "Aplicação do Axioma da Atribuição",
          "descricao": "Queremos a pós-condição Q: {x > 10}. O comando é C: x := x + 1. Pelo axioma, substituímos x por (x+1) em Q: Pré-condição P necessária é {x + 1 > 10}, ou seja, {x > 9}. Logo: {x > 9} x := x + 1 {x > 10}."
        },
        "intermediario": {
          "titulo": "Prova Formal de Estrutura Condicional",
          "descricao": "Provar {Verdadeiro} SE a > b ENTÃO max := a SENÃO max := b {max >= a ∧ max >= b}. Ramo 1: {a > b} max := a {max >= a ∧ max >= b} (Válido). Ramo 2: {a <= b} max := b {max >= a ∧ max >= b} (Válido). A regra do condicional prova a tripla!"
        },
        "avancado": {
          "titulo": "Verificação Formal do Laço com Invariante de Hoare",
          "descricao": "Provar {n >= 0} fat := 1; i := 1; ENQUANTO i <= n FAÇA (fat := fat * i; i := i + 1) {fat == n!}. A invariante I é {fat == (i-1)! ∧ i <= n+1}. Na parada (i > n), temos I ∧ ¬(i <= n) -> i == n+1, logo fat == (n+1-1)! = n! (Q.E.D.)."
        }
      },
      "passoAPasso": [
        "1. Formular a Pós-condição Q desejada em lógica de predicados formal.",
        "2. Aplicar o cálculo da Pré-condição Mais Fraca (wp) retrocedendo instrução por instrução.",
        "3. Para laços de repetição, derivar a Invariante de Laço I que satisfaz {I ∧ B} C {I}.",
        "4. Provar que a Pré-condição inicial implica a Invariante: P => I.",
        "5. Provar que na terminação a Invariante combinada com a negação da guarda implica a Pós-condição: (I ∧ ¬B) => Q.",
        "6. Demonstrar a Terminação finita usando uma Função Variante (Ranking Function)."
      ],
      "errosComuns": [
        {
          "erro": "Formular uma Invariante de Laço fraca demais que não implica a Pós-condição no término",
          "correcao": "A invariante deve capturar tanto a evolução do cálculo quanto os limites da variável de controle."
        },
        {
          "erro": "Esquecer de provar a terminação (confundir Correção Parcial com Correção Total)",
          "correcao": "A Tripla de Hoare clássica garante correção parcial; para correção total deve-se provar que a função variante decresce estritamente até zero."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Demonstração matemática formal com Triplas de Hoare e cálculo de weakest precondition.",
        "ruim": "Testar com 10 entradas aleatórias e assumir que o sistema está matematicamente livre de bugs."
      },
      "pseudocodigo": "// Especificação Formal em Lógica de Hoare:\n// {P: x == X ∧ y == Y}\ntemp := x;\nx := y;\ny := temp;\n// {Q: x == Y ∧ y == X}\n// Prova: wp(\"y := temp\", x == Y ∧ y == X) = (x == Y ∧ temp == X)\n// wp(\"x := y\", x == Y ∧ temp == X) = (y == Y ∧ temp == X)\n// wp(\"temp := x\", y == Y ∧ temp == X) = (y == Y ∧ x == X) ≡ P (Provado!)",
      "traceData": [
        {
          "passo": 1,
          "acao": "Pós-condição Q",
          "estado": "{x == Y ∧ y == X}",
          "obs": "Meta formal"
        },
        {
          "passo": 2,
          "acao": "Retropropagação wp",
          "estado": "Axioma da atribuição aplicado 3x",
          "obs": "Cálculo simbólico"
        },
        {
          "passo": 3,
          "acao": "Pré-condição derivada",
          "estado": "{x == X ∧ y == Y}",
          "obs": "Coincide com P -> Teorema Provado"
        }
      ],
      "exercicios": [
        {
          "id": "ex20_1",
          "tipo": "multipla_escolha",
          "enunciado": "Dada a pós-condição Q: {x == 15} e o comando C: x := y + 5; qual é a pré-condição mais fraca P necessária obtida pelo Axioma da Atribuição de Hoare?",
          "opcoes": [
            "{y == 10}, pois substituímos x por (y + 5) em Q resultando em y + 5 == 15 -> y == 10",
            "{x == 10}",
            "{y == 15}",
            "{x == 20}"
          ],
          "correta": 0,
          "pista": "Substitua todas as ocorrências de x em {x == 15} pela expressão atribuída (y + 5).",
          "justificativa": "Pelo Axioma da Atribuição {Q[x / E]} x := E {Q}, substituímos x por y+5 em {x == 15}, obtendo {y + 5 == 15}, que simplifica para {y == 10}."
        }
      ],
      "perguntasVerificacao": "Como a regra do laço de Hoare utiliza a invariante I para provar a pós-condição quando a repetição é encerrada?",
      "keywordsIA": [
        "hoare",
        "triplas_hoare",
        "metodos_formais",
        "verificacao_software",
        "invariante",
        "weakest_precondition",
        "dijkstra",
        "axiomatico"
      ],
      "misconceptionsIA": [
        {
          "termo": "teste_vs_prova",
          "erro": "Achar que testes de software substituem métodos formais em sistemas críticos",
          "explicacao": "Edsger Dijkstra: \"Testes mostram a presença de erros, nunca sua ausência\". Métodos formais provam matematicamente a ausência de falhas."
        }
      ],
      "explicacaoIdealIA": "A Lógica de Hoare fundamenta a verificação formal de programas através de triplas {P} C {Q}, provando axiomaticamente que pré-condições bem definidas transformam o estado garantindo a pós-condição sem ambiguidade."
    },
    {
      "id": 21,
      "slug": "teoria-computacao-turing-decidibilidade",
      "badge": "Módulo 21 · Especialização Avançada",
      "nivel": "Especialista",
      "titulo": "Teoria da Computação, Máquinas de Turing e Decidibilidade",
      "subtitulo": "Autômatos Finitos (DFA/NFA), Máquina de Turing de fita infinita, Tese de Church-Turing e o Problema da Parada.",
      "objetivo": "Compreender os limites matemáticos universais da computação: o que PODE e o que NUNCA PODERÁ ser resolvido por um algoritmo.",
      "introducaoIntuitiva": "Existe algum algoritmo perfeito capaz de analisar o código de qualquer outro programa e dizer com 100% de certeza se ele vai travar em loop infinito ou terminar? Alan Turing provou em 1936 que tal algoritmo é MATEMATICAMENTE IMPOSSÍVEL de existir.",
      "explicacaoAprofundada": "1. HIERARQUIA DE CHOMSKY & MODELOS DE COMPUTAÇÃO:\n• Autômatos Finitos (DFA/NFA): Memória finita restrita (Reconhecem Linguagens Regulares / Regex).\n• Autômatos de Pilha (PDA): Memória com pilha LIFO (Reconhecem Linguagens Livres de Contexto / Sintaxe de linguagens de programação).\n• Máquina de Turing (Alan Turing, 1936): Modelo universal de computação composto por uma fita infinita dividida em células, uma cabeça de leitura/escrita e uma tabela de transição de estados finita.\n\n2. TESE DE CHURCH-TURING: Qualquer cálculo ou algoritmo realizável no universo físico pode ser simulado por uma Máquina de Turing universal. Todos os computadores modernos (seja um supercomputador quântico ou seu celular) possuem o mesmo poder teórico fundamental de computabilidade de uma Máquina de Turing.\n\n3. DECIDIBILIDADE & O PROBLEMA DA PARADA (The Halting Problem):\nUm problema é Decidível se existe uma Máquina de Turing que sempre para e responde Sim ou Não. O Problema da Parada pergunta: existe um algoritmo H(P, entrada) que determina se qualquer programa P para com a entrada fornecida? PROVA POR DIAGONALIZAÇÃO DE TURING: Suponha que H existe. Construímos D(P) que chama H(P, P); se H diz que P para, D entra em loop infinito; se H diz que P não para, D para imediatamente. Ao rodar D(D): se D para, D entra em loop; se D entra em loop, D para (CONTRADIÇÃO IRRESOLVÍVEL!). Logo, H não pode existir. O problema da parada é INDECIDÍVEL.",
      "exemplos": {
        "basico": {
          "titulo": "Autômato Finito Determinístico (DFA) para Validação de Números Pares",
          "descricao": "Estado q0 (Par/Inicial/Aceitação) e q1 (Ímpar). Ao ler dígito par fica em q0; ao ler ímpar vai para q1. Modela validadores de regex em memória O(1)."
        },
        "intermediario": {
          "titulo": "Máquina de Turing Reconhecendo Linguagem Não-Regular {a^n b^n c^n}",
          "descricao": "Autômatos de pilha falham nesta linguagem. A Máquina de Turing marca o primeiro \"a\" com X, varre a fita até achar o primeiro \"b\" marcando com Y, varre até \"c\" marcando com Z e repete o ciclo até a fita estar balanceada."
        },
        "avancado": {
          "titulo": "Teorema de Rice e Consequências para Compiladores",
          "descricao": "O Teorema de Rice decorre do Problema da Parada: \"Qualquer propriedade semântica não-trivial sobre o comportamento de programas é indecidível\". É impossível criar um antivírus ou linter que encontre 100% dos bugs sem falsos positivos ou falsos negativos."
        }
      },
      "passoAPasso": [
        "1. Modelar o problema através de Estados (Q), Alfabeto de Entrada (Σ), Alfabeto da Fita (Γ) e Função de Transição (δ).",
        "2. Analisar se a linguagem é Regular (DFA), Livre de Contexto (Gramática/Pilha) ou Recursivamente Enumerável (Turing).",
        "3. Para provar que um problema é Indecidível, aplicar Redução a partir do Problema da Parada (se o problema X resolvesse a Parada, X seria impossível).",
        "4. Compreender que limites teóricos de computabilidade não são limitações de hardware, mas leis lógicas universais."
      ],
      "errosComuns": [
        {
          "erro": "Achar que computadores quânticos ou supercomputadores podem resolver problemas indecidíveis",
          "correcao": "A tese de Church-Turing prova que problemas indecidíveis (como o Halting Problem) são indecidíveis em qualquer modelo computacional imaginável."
        },
        {
          "erro": "Confundir problema difícil (complexidade alta) com problema indecidível",
          "correcao": "Problema intratável tem solução lenta; problema indecidível NÃO tem algoritmo que garanta resposta correta para todas as instâncias."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Reconhecimento de limites de decidibilidade e uso de heurísticas aproximadas para problemas insolúveis.",
        "ruim": "Tentar escrever um algoritmo geral exato para um problema matematicamente provado indecidível."
      },
      "pseudocodigo": "// Paradoxal: A Prova do Problema da Parada de Turing\nFUNÇÃO D(programa_P)\n    SE H(programa_P, programa_P) == \"PARA\" ENTÃO\n        ENQUANTO VERDADEIRO FAÇA // Entra em Loop Infinito\n            esperar()\n        FIM_ENQUANTO\n    SENÃO\n        RETORNAR // Para imediatamente\n    FIM_SE\nFIM_FUNÇÃO\n// O que acontece ao chamar D(D)? Contradição lógica prova que H não pode existir!",
      "traceData": [
        {
          "passo": 1,
          "acao": "Suposição",
          "estado": "H(P, i) existe e é perfeito",
          "obs": "Hipótese inicial"
        },
        {
          "passo": 2,
          "acao": "Construção Diagonal D(P)",
          "estado": "D inverte o resultado de H",
          "obs": "Diagonalização"
        },
        {
          "passo": 3,
          "acao": "Avaliação D(D)",
          "estado": "D(D) para <==> D(D) não para",
          "obs": "Contradição! H é impossível."
        }
      ],
      "exercicios": [
        {
          "id": "ex21_1",
          "tipo": "multipla_escolha",
          "enunciado": "O que o resultado de Alan Turing sobre o Problema da Parada (Halting Problem) provou formalmente para a Ciência da Computação?",
          "opcoes": [
            "Que existem problemas matematicamente bem definidos que nenhum computador ou algoritmo jamais poderá resolver de forma genérica e exata.",
            "Que computadores nunca teriam memória suficiente.",
            "Que toda linguagem de programação pode compilar a si mesma.",
            "Que a recursão é mais rápida que a iteração."
          ],
          "correta": 0,
          "pista": "Trata-se do limite fundamental da computabilidade: problemas indecidíveis.",
          "justificativa": "Turing provou a existência de problemas indecidíveis, estabelecendo que a computação possui limites lógicos intransponíveis independentemente da tecnologia."
        }
      ],
      "perguntasVerificacao": "Qual a importância da Tese de Church-Turing para a equivalência entre diferentes linguagens de programação?",
      "keywordsIA": [
        "turing",
        "maquina_turing",
        "decidibilidade",
        "problema_parada",
        "halting_problem",
        "automato",
        "chomsky",
        "church_turing",
        "computabilidade"
      ],
      "misconceptionsIA": [
        {
          "termo": "computador_infinito",
          "erro": "Achar que com poder infinito de processamento tudo pode ser computado",
          "explicacao": "O Problema da Parada é uma impossibilidade lógica dedutiva, não uma limitação de hardware ou tempo."
        }
      ],
      "explicacaoIdealIA": "A Teoria da Computação estuda os limites universais do cálculo através de autômatos e Máquinas de Turing, provando que problemas como o da Parada são indecidíveis por qualquer algoritmo."
    },
    {
      "id": 22,
      "slug": "classes-complexidade-p-np-reducoes",
      "badge": "Módulo 22 · Especialização Avançada",
      "nivel": "Especialista",
      "titulo": "Classes de Complexidade (P vs NP), Reduções e Análise Amortizada",
      "subtitulo": "Classes P, NP, NP-Completo (Cook-Levin), Redução Polinomial de Karp e Análise Amortizada (Método do Potencial).",
      "objetivo": "Dominar as classes de complexidade computacional P, NP, NP-Completo e NP-Difícil, compreender o maior problema aberto da computação (P vs NP), aplicar reduções polinomiais e conduzir Análise Amortizada.",
      "introducaoIntuitiva": "Encontrar a combinação de um cofre com 100 dígitos pode levar milhões de anos testando uma por uma (problema difícil de resolver), mas se alguém lhe der a combinação, você leva 1 segundo para girar e conferir se abre (problema fácil de verificar). Essa assimetria entre resolver e verificar é o cerne do problema P versus NP.",
      "explicacaoAprofundada": "1. CLASSES DE COMPLEXIDADE:\n• CLASSE P: Conjunto dos problemas de decisão resolvidos por uma Máquina de Turing determinística em tempo Polinomial O(n^k) (ex: ordenação, caminho mínimo, busca binária). São problemas considerados tratáveis eficientemente.\n• CLASSE NP (Nondeterministic Polynomial): Conjunto dos problemas cuja solução proposta pode ser VERIFICADA em tempo polinomial por uma Máquina de Turing determinística (ou resolvidos em tempo polinomial por uma Máquina Não-Determinística).\n• O GRANDE ENIGMA P vs NP: Se é fácil verificar uma solução, é necessariamente fácil encontrá-la a partir do zero? Se P = NP, todo mistério verificável teria algoritmo rápido de resolução (quebrando a criptografia RSA do planeta). A ampla maioria dos cientistas crê que P ≠ NP.\n\n2. TEOREMA DE COOK-LEVIN & NP-COMPLETUDE:\nUm problema X é NP-Completo se: (1) X pertence a NP; e (2) Todo problema em NP pode ser reduzido a X em tempo polinomial (X é tão difícil quanto qualquer problema em NP). Stephen Cook e Leonid Levin provaram em 1971 que o problema SAT (Satisfatibilidade Booleana) é NP-Completo. Se alguém encontrar um algoritmo polinomial para QUALQUER problema NP-Completo (como Caixeiro Viajante, Clique, Subset-Sum, 3-SAT), TODOS os problemas em NP estarão automaticamente resolvidos em P!\n\n3. REDUÇÃO POLINOMIAL (A ≤_P B): Técnica onde uma instância do problema A é transformada em uma instância de B em tempo polinomial. Se B for fácil, A é fácil; se A for difícil, B é no mínimo tão difícil quanto A.\n\n4. ANÁLISE AMORTIZADA (Robert Tarjan):\nAnalisa a média de tempo por operação em uma sequência de operações, garantindo que operações ocasionais caras (ex: redimensionar array dinâmico dobrando de tamanho) são amortizadas pelas operações baratas anteriores. 3 Métodos: (a) Método do Agregado; (b) Método Contábil/Crédito; (c) Método do Potencial Φ(D_i).",
      "exemplos": {
        "basico": {
          "titulo": "Análise Amortizada de Vetor Dinâmico (Array Duplicante)",
          "descricao": "Inserir elemento é O(1). Quando enche (tamanho n), aloca 2n e copia todos (custa O(n)). Método do Potencial prova que o custo amortizado por inserção é estritamente O(1) constante!"
        },
        "intermediario": {
          "titulo": "O Problema do Caixeiro Viajante (TSP)",
          "descricao": "Visitar n cidades pelo menor caminho. Pertence a NP (dado um roteiro, soma-se o custo em O(n)). É NP-Completo: testar todas as rotas por força bruta faz O(n!) operações. Para 30 cidades, n! supera o número de átomos do universo!"
        },
        "avancado": {
          "titulo": "Redução Polinomial de 3-SAT para Cobertura de Vértices (Vertex Cover)",
          "descricao": "Construir um gadget de grafo onde cada cláusula booleana vira um triângulo. Prova que Cobertura de Vértices é NP-Completo herdando a complexidade de 3-SAT."
        }
      },
      "passoAPasso": [
        "1. Para provar que um problema X pertence a NP, construir um Certificado e um Verificador polinomial.",
        "2. Para provar que X é NP-Completo, escolher um problema Y comprovadamente NP-Completo (ex: 3-SAT) e demonstrar uma Redução Polinomial Y ≤_P X.",
        "3. Provar que a transformação é bidirecional (a resposta para Y é Sim se e somente se a resposta para X transformada for Sim).",
        "4. Para análise de estruturas dinâmicas, definir a Função Potencial Φ(D) onde Φ(D_0)=0 e Φ(D_i)>=0 para derivar o custo amortizado c_i' = c_i + Φ(D_i) - Φ(D_{i-1})."
      ],
      "errosComuns": [
        {
          "erro": "Inverter o sentido da redução polinomial ao provar NP-Completude",
          "correcao": "Para provar que NovoProblema é NP-Completo, reduza ConhecidoNP_Completo <=_P NovoProblema (e NÃO o contrário!)."
        },
        {
          "erro": "Confundir custo no Pior Caso com Custo Amortizado",
          "correcao": "O pior caso de 1 operação isolada pode ser O(n), mas o custo amortizado na sequência de m operações é O(1)."
        }
      ],
      "comparacaoSolucoes": {
        "boa": "Identificar que o problema é NP-Completo e aplicar Algoritmos de Aproximação com garantia teórica de erro.",
        "ruim": "Insistir em tentar criar algoritmo exato polinomial para um problema NP-Difícil."
      },
      "pseudocodigo": "// Redução Conceitual e Verificador Polinomial de Clique em Grafo\nFUNÇÃO verificar_clique_polinomial(Grafo G, subconjunto_V, inteiro k) : BOOLEANO\n    SE tamanho(subconjunto_V) < k ENTÃO RETORNAR FALSO\n    PARA CADA vertice_u EM subconjunto_V FAÇA\n        PARA CADA vertice_v EM subconjunto_V FAÇA\n            SE vertice_u != vertice_v E NÃO existe_aresta(G, vertice_u, vertice_v) ENTÃO\n                RETORNAR FALSO // Falhou na checagem do clique\n            FIM_SE\n        FIM_PARA\n    FIM_PARA\n    RETORNAR VERDADEIRO // Verificado com sucesso em tempo O(k²) Polinomial!\nFIM_FUNÇÃO",
      "traceData": [
        {
          "passo": 1,
          "acao": "Certificado recebido",
          "estado": "Subconjunto de 4 vértices em Grafo de 1.000 nós",
          "obs": "Candidato a solução"
        },
        {
          "passo": 2,
          "acao": "Verificação em pares",
          "estado": "4*(4-1)/2 = 6 arestas testadas",
          "obs": "Executado em microssegundos (Polinomial)"
        },
        {
          "passo": 3,
          "acao": "Conclusão NP",
          "estado": "Verificação é O(k²) -> Problema pertence a NP",
          "obs": "Certificado Válido"
        }
      ],
      "exercicios": [
        {
          "id": "ex22_1",
          "tipo": "multipla_escolha",
          "enunciado": "Se um pesquisador descobrir um algoritmo que resolve o problema do Caixeiro Viajante (TSP) em tempo polinomial determinístico O(n³), qual seria a consequência histórica para a Ciência da Computação?",
          "opcoes": [
            "Provaria que P = NP, resolvendo o maior problema aberto da matemática e computação, pois todo problema em NP passaria a ter solução polinomial.",
            "Apenas o problema do Caixeiro Viajante ficaria mais rápido, sem afetar outros problemas.",
            "Provaria que computadores quânticos são desnecessários.",
            "Não teria nenhum impacto relevante."
          ],
          "correta": 0,
          "pista": "Lembre-se do Teorema de Cook-Levin e da definição de NP-Completude: todos os problemas em NP reduzem-se polinomialmente ao TSP.",
          "justificativa": "Por definição de NP-Completude, se qualquer problema NP-Completo for resolvido em tempo polinomial P, TODOS os milhares de problemas em NP (incluindo criptografia, biologia computacional, otimização) passarão a ter algoritmo polinomial, provando P = NP."
        }
      ],
      "perguntasVerificacao": "Qual a diferença entre a classe NP (verificável em tempo polinomial) e a classe NP-Completo (os problemas mais difíceis de NP)?",
      "keywordsIA": [
        "p_vs_np",
        "np_completo",
        "cook_levin",
        "reducao_polinomial",
        "analise_amortizada",
        "metodo_potencial",
        "sat",
        "complexidade_computacional"
      ],
      "misconceptionsIA": [
        {
          "termo": "np_nao_polinomial",
          "erro": "Achar que a sigla NP significa \"Não Polinomial\"",
          "explicacao": "NP significa \"Nondeterministic Polynomial\" (tempo polinomial em Máquina Não-Determinística / Verificável em tempo polinomial)."
        }
      ],
      "explicacaoIdealIA": "As classes de complexidade categorizam problemas por sua tratabilidade teórica. P são os problemas resolvidos em tempo polinomial; NP são os verificáveis em tempo polinomial. Os problemas NP-Completos (como SAT e TSP) sintetizam a maior questão aberta da computação: P versus NP."
    }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
