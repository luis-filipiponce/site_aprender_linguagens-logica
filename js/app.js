/* ==========================================================================
   PORTAL DE METODOLOGIAS DE ENSINO & APRENDIZAGEM ATIVA
   Lógica JavaScript: Busca, Interatividade, Ferramentas, Temas e Navegação
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initScrollSpy();
  initSearch();
  initModal();
  initBloomTaxonomy();
  initFlashcards();
  initLessonPlanner();
  initMethodologyQuiz();
  initGlossaryFilter();
  initMobileMenu();
  initBackToTop();
  initFeynmanTool();
  initNavDragToScroll();
});

// ────────────────────────────────────────────────────────────────────────────
// NAVEGAÇÃO HORIZONTAL COM ARRASTE (DRAG TO SCROLL & SETAS)
// ────────────────────────────────────────────────────────────────────────────
function initNavDragToScroll() {
  const scrollContainers = document.querySelectorAll('.nav-scroll-container');

  scrollContainers.forEach(container => {
    const navLinks = container.querySelector('.nav-links');
    const leftBtn = container.querySelector('.nav-scroll-arrow.left');
    const rightBtn = container.querySelector('.nav-scroll-arrow.right');

    if (!navLinks) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    // Atualiza visibilidade das setas laterais
    function updateArrows() {
      const maxScroll = navLinks.scrollWidth - navLinks.clientWidth;
      if (maxScroll > 5) {
        if (leftBtn) leftBtn.classList.toggle('visible', navLinks.scrollLeft > 10);
        if (rightBtn) rightBtn.classList.toggle('visible', navLinks.scrollLeft < maxScroll - 10);
      } else {
        if (leftBtn) leftBtn.classList.remove('visible');
        if (rightBtn) rightBtn.classList.remove('visible');
      }
    }

    // Eventos de clique nas setas
    if (leftBtn) {
      leftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }

    // Drag to scroll com o mouse
    navLinks.addEventListener('mousedown', (e) => {
      isDown = true;
      hasDragged = false;
      navLinks.classList.add('grabbing');
      startX = e.pageX - navLinks.offsetLeft;
      scrollLeft = navLinks.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        navLinks.classList.remove('grabbing');
      }
    });

    navLinks.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        navLinks.classList.remove('grabbing');
      }
    });

    navLinks.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - navLinks.offsetLeft;
      const walk = (x - startX) * 1.5; // Velocidade do arraste
      if (Math.abs(walk) > 4) {
        hasDragged = true;
      }
      navLinks.scrollLeft = scrollLeft - walk;
      updateArrows();
    });

    // Previne clique em links se foi um gesto de arraste
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
          hasDragged = false;
        }
      });
    });

    // Atualiza setas no scroll e redimensionamento da janela
    navLinks.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    
    // Verificação inicial
    setTimeout(updateArrows, 150);
  });
}

/* ==========================================================================
   1. BASE DE DADOS COMPLETA DE METODOLOGIAS
   ========================================================================== */
const methodologiesData = [
  {
    id: "pbl",
    name: "PBL — Project-Based Learning (Aprendizagem Baseada em Projetos)",
    category: "Metodologia Ativa",
    icon: "🏗️",
    accent: "#2563eb",
    accentLight: "#eff6ff",
    author: "William Heard Kilpatrick & John Dewey (1918)",
    summary: "Alunos adquirem conhecimento e habilidades trabalhando durante um período estendido para investigar e responder a uma pergunta ou problema autêntico, complexo e desafiador.",
    target: "Ensino Fundamental II ao Superior",
    prepTime: "Médio / Alto",
    engagement: "Altíssimo (95%)",
    cognitiveLevel: "Aplicar, Analisar, Criar",
    steps: [
      "Definição da Pergunta Motriz (Chave): formulação de um problema real e instigante.",
      "Investigação Sustentada: pesquisa rigorosa, coleta de dados e experimentação pelos alunos.",
      "Voz e Escolha dos Alunos: autonomia na tomada de decisões e definição de papéis.",
      "Crítica e Revisão: sessões de feedback formativo inter pares e com o professor.",
      "Apresentação Pública: exibição do produto final (artefato, protótipo, relatório) para a comunidade."
    ],
    pros: [
      "Desenvolve soft skills (trabalho em equipe, comunicação, liderança).",
      "Conexão direta da teoria com problemas reais do mundo e do mercado.",
      "Alta retenção de conteúdo a longo prazo."
    ],
    cons: [
      "Exige planejamento detalhado e rubricas de avaliação muito claras.",
      "Pode gerar frustração se a mediação do professor for insuficiente.",
      "Demanda mais tempo de execução comparado a aulas expositivas."
    ],
    example: "Alunos do ensino médio criam um plano de mobilidade urbana sustentável para o bairro da escola, integrando física, matemática e geografia com apresentação para vereadores locais."
  },
  {
    id: "tbl",
    name: "TBL — Team-Based Learning (Aprendizagem Baseada em Equipes)",
    category: "Metodologia Ativa",
    icon: "👥",
    accent: "#0d9488",
    accentLight: "#f0fdfa",
    author: "Dr. Larry Michaelsen (década de 1970)",
    summary: "Estratégia instrucional estruturada centrada em pequenos grupos permanentes, com testes individuais e em equipe prévios, seguida pela aplicação em tarefas práticas.",
    target: "Ensino Médio e Superior",
    prepTime: "Médio",
    engagement: "Alto (90%)",
    cognitiveLevel: "Analisar, Avaliar, Aplicar",
    steps: [
      "Preparação Prévia: leitura de material selecionado antes da sessão.",
      "iRAT (Individual Readiness Assurance Test): teste individual de múltipla escolha.",
      "tRAT (Team Readiness Assurance Test): o mesmo teste respondido em equipe com consenso e raspadinha/feedback imediato.",
      "Apelações e Esclarecimentos: justificativa escrita de respostas discordantes e miniaula do professor apenas sobre dúvidas remanescentes.",
      "Aplicação dos 4Ss: problema Significativo, Mesmo problema (Same), Escolha Específica (Specific), Relato Simultâneo (Simultaneous)."
    ],
    pros: [
      "Garante que os alunos estudem antes da aula (combate à passividade).",
      "Discussões ricas e autorregulação dentro da equipe.",
      "Escalável para turmas com mais de 100 alunos com apenas 1 professor."
    ],
    cons: [
      "Requer elaboração rigorosa de questões de teste e cenários de aplicação.",
      "Equipes disfuncionais exigem mediação inicial de convivência."
    ],
    example: "Em uma aula de Farmacologia, equipes recebem um caso clínico complexo com interações medicamentosas e devem escolher simultaneamente o protocolo ideal justificando sua decisão."
  },
  {
    id: "sala-invertida",
    name: "Sala de Aula Invertida (Flipped Classroom)",
    category: "Metodologia Ativa",
    icon: "🔄",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
    author: "Jonathan Bergmann & Aaron Sams (2007)",
    summary: "Inverte a lógica tradicional: o conteúdo teórico básico é acessado previamente em casa (vídeos, textos, podcasts) e o tempo presencial é dedicado à prática, resolução de dúvidas e discussões aprofundadas.",
    target: "Todos os níveis de ensino",
    prepTime: "Baixo / Médio",
    engagement: "Alto (85%)",
    cognitiveLevel: "Lembrar/Entender em casa; Aplicar/Criar em sala",
    steps: [
      "Curadoria ou Produção de Conteúdo: vídeos curtos (5-10 min) ou leituras orientadas.",
      "Checagem Prévia: quiz rápido online para identificar lacunas de compreensão.",
      "Início da Aula: acolhimento e tira-dúvidas focado nas lacunas diagnosticadas.",
      "Atividade Prática Imersiva: estudos de caso, debates, simulações ou exercícios avançados.",
      "Fechamento e Síntese: consolidação dos aprendizados e conexão com o próximo tópico."
    ],
    pros: [
      "O aluno avança no seu próprio ritmo em casa (pausar, rever vídeos).",
      "Otimiza o tempo presencial para interações ricas e personalizadas.",
      "Estimula a autonomia e a responsabilidade pelo estudo."
    ],
    cons: [
      "Risco de alunos não realizarem o estudo prévio.",
      "Exige acesso a tecnologias e internet fora do ambiente escolar."
    ],
    example: "Alunos assistem a 2 vídeos de 7 minutos sobre Reações Químicas Redox em casa e passam toda a aula no laboratório realizando experimentos práticos e analisando resultados."
  },
  {
    id: "peer-instruction",
    name: "Peer Instruction (Instrução por Pares)",
    category: "Metodologia Ativa",
    icon: "💬",
    accent: "#ea580c",
    accentLight: "#fff7ed",
    author: "Eric Mazur - Universidade de Harvard (1991)",
    summary: "Método baseado em breves apresentações de conceitos seguidas de questões conceituais desafiadoras (ConcepTests). Os alunos votam individualmente, discutem com colegas vizinhos e votam novamente.",
    target: "Ensino Fundamental II ao Superior",
    prepTime: "Baixo",
    engagement: "Muito Alto (90%)",
    cognitiveLevel: "Entender, Analisar, Avaliar",
    steps: [
      "Exposição Breve: professor apresenta um conceito nuclear por 7 a 10 minutos.",
      "ConcepTest: exibição de uma pergunta conceitual (sem cálculo puro, foco no raciocínio).",
      "Voto Individual: alunos pensam e registram seu voto em silêncio (apps, cartões de cores).",
      "Discussão em Pares: se o acerto for entre 30% e 70%, alunos debatem por 2-3 minutos tentando convencer o colega.",
      "Revotação e Fechamento: os alunos votam novamente e o professor explica a resposta correta."
    ],
    pros: [
      "Alunos frequentemente explicam conceitos com linguagem mais acessível que o professor.",
      "Feedback instantâneo em tempo real sobre a compreensão da turma.",
      "Implementação simples, sem necessidade de infraestrutura cara."
    ],
    cons: [
      "Questões conceituais precisam ser muito bem formuladas (distratores plausíveis).",
      "Não funciona bem se mais de 80% já acertarem de primeira ou se menos de 30% entenderem."
    ],
    example: "Em aula de Física, o professor pergunta o que acontece com a aceleração de um elevador quando o cabo rompe. Os alunos votam, debatem entre si e a taxa de acerto salta de 42% para 88%."
  },
  {
    id: "estudo-de-caso",
    name: "Estudo de Caso (Case-Based Learning)",
    category: "Metodologia Ativa",
    icon: "📂",
    accent: "#16a34a",
    accentLight: "#f0fdf4",
    author: "Harvard Business School (1920s)",
    summary: "Utilização de narrativas de situações reais ou simuladas complexas para que os estudantes analisem dados, ponderem variáveis, identifiquem dilemas e tomem decisões fundamentadas.",
    target: "Ensino Médio, Técnico e Superior",
    prepTime: "Médio",
    engagement: "Alto (85%)",
    cognitiveLevel: "Analisar, Avaliar, Criar",
    steps: [
      "Apresentação do Caso: entrega da narrativa com dados, personagens e contexto.",
      "Leitura e Análise Individual: levantamento de fatos, problemas e hipóteses.",
      "Discussão em Pequenos Grupos: confronto de perspectivas e alternativas de ação.",
      "Debate Plenário: mediação socrática pelo professor, desafiando premissas.",
      "Conclusão e Lições Aprendidas: síntese dos princípios teóricos aplicados à prática."
    ],
    pros: [
      "Desenvolve pensamento crítico, julgamento ético e tomada de decisão sob incerteza.",
      "Aproxima a teoria das práticas profissionais reais.",
      "Permite múltiplas soluções válidas, estimulando a argumentação."
    ],
    cons: [
      "Casos desatualizados ou fictícios demais perdem o engajamento.",
      "O professor precisa ter habilidade na mediação socrática sem dar respostas prontas."
    ],
    example: "Turma de Direito e Gestão analisa a crise de relações públicas e recall de uma montadora automobilística para formular pareceres jurídicos e estratégias de compliance."
  },
  {
    id: "gamificacao",
    name: "Gamificação e Game-Based Learning",
    category: "Metodologia Lúdica & Comportamental",
    icon: "🎮",
    accent: "#e11d48",
    accentLight: "#fff1f2",
    author: "Nick Pelling (2002) / Karl Kapp (2012)",
    summary: "Aplicação de elementos de jogos (mecânicas, dinâmicas e estética) em contextos educacionais não-lúdicos para aumentar a motivação intrínseca, o engajamento e a persistência.",
    target: "Todos os níveis",
    prepTime: "Médio / Alto",
    engagement: "Altíssimo (95%)",
    cognitiveLevel: "Lembrar, Aplicar, Criar",
    steps: [
      "Mapeamento do Objetivo Pedagógico: o que os alunos precisam aprender exatamente.",
      "Definição da Jornada & Narrativa: criação de um enredo ou desafio épico.",
      "Seleção de Mecânicas: pontos, badges, níveis, missões, rankings colaborativos e barras de progresso.",
      "Ciclo de Feedback Rápido: retorno imediato sobre erros com oportunidade de tentar novamente.",
      "Debriefing Pedagógico: reflexão sobre os conceitos aprendidos durante o jogo."
    ],
    pros: [
      "Aumenta drasticamente a motivação e reduz o medo do erro (errar faz parte do jogo).",
      "Promove o fluxo (Flow State) de concentração máxima.",
      "Permite trilhas de aprendizagem personalizadas."
    ],
    cons: [
      "Risco de hiperfocar em recompensas extrínsecas (pontos) em detrimento do aprendizado real.",
      "Competitividade tóxica se o design focar apenas em rankings individuais."
    ],
    example: "Uma gincana de programação onde cada bug corrigido concede 'pontos de cura' para salvar um servidor fictício de um ataque cibernético."
  },
  {
    id: "design-thinking",
    name: "Design Thinking na Educação",
    category: "Inovação & Resolução de Problemas",
    icon: "💡",
    accent: "#d97706",
    accentLight: "#fffbeb",
    author: "d.school Stanford / David Kelley",
    summary: "Abordagem centrada no ser humano focada em inovação e empatia para identificar necessidades reais, criar soluções criativas e prototipar rapidamente.",
    target: "Fundamental II ao Superior",
    prepTime: "Médio",
    engagement: "Altíssimo (92%)",
    cognitiveLevel: "Analisar, Criar, Avaliar",
    steps: [
      "1. Empatia: ouvir e observar os usuários reais para compreender suas dores profundas.",
      "2. Definição: sintetizar os aprendizados e delimitar o problema com clareza.",
      "3. Ideação: tempestade de ideias (brainstorming) sem julgamentos prévios.",
      "4. Prototipagem: construção de modelos físicos ou digitais de baixa fidelidade.",
      "5. Teste: apresentação do protótipo aos usuários reais para obter feedback e iterar."
    ],
    pros: [
      "Cultiva a empatia, a tolerância ao fracasso e a criatividade prática.",
      "Foco incondicional em soluções úteis e viáveis.",
      "Excelente para projetos transdisciplinares."
    ],
    cons: [
      "Pode gerar ansiedade em alunos acostumados a respostas binárias (certo/errado).",
      "Requer materiais diversificados para prototipagem rápida."
    ],
    example: "Estudantes entrevistam alunos cadeirantes da escola e prototipam rampas de acesso inteligentes e sinalização tátil inclusiva."
  },
  {
    id: "steam-maker",
    name: "Educação STEAM & Cultura Maker",
    category: "Mão na Massa & Transdisciplinaridade",
    icon: "🔬",
    accent: "#0284c7",
    accentLight: "#f0f9ff",
    author: "Georgette Yakman & Seymour Papert (Construcionismo)",
    summary: "Integração das áreas de Ciência (Science), Tecnologia (Technology), Engenharia (Engineering), Artes (Arts) e Matemática (Math) através do 'fazer com as próprias mãos'.",
    target: "Educação Infantil ao Ensino Superior",
    prepTime: "Alto",
    engagement: "Altíssimo (96%)",
    cognitiveLevel: "Aplicar, Analisar, Criar",
    steps: [
      "Provocação & Desafio: introdução de um problema científico ou tecnológico.",
      "Planejamento & Esboço: rascunho de soluções e escolha de ferramentas.",
      "Construção Mão na Massa: uso de materiais reciclados, eletrônica, robótica ou programação.",
      "Teste & Depuração: identificação de falhas físicas ou lógicas e reajustes contínuos.",
      "Compartilhamento: documentação e exibição aberta para a comunidade escolar."
    ],
    pros: [
      "Materializa conceitos abstratos de física e matemática de forma palpável.",
      "Estimula resiliência e pensamento computacional.",
      "Desenvolve inventividade e autonomia técnica."
    ],
    cons: [
      "Pode exigir espaço físico adequado (laboratório maker / oficina) e insumos.",
      "Demanda gestão atenta de segurança no manuseio de ferramentas."
    ],
    example: "Construção de uma estação meteorológica automatizada com Arduino, sensores de umidade e display LCD reciclado para monitorar a horta escolar."
  }
];

/* ==========================================================================
   2. ESTRATÉGIAS COGNITIVAS & NEUROCIÊNCIA
   ========================================================================== */
const cognitiveMethods = [
  {
    name: "Repetição Espaçada (Spaced Repetition)",
    icon: "📈",
    desc: "Baseada na Curva do Esquecimento de Hermann Ebbinghaus. Revisar o conteúdo em intervalos crescentes (1 dia, 3 dias, 7 dias, 16 dias, 35 dias) converte memórias de curto prazo em memórias de longo prazo consolidadas.",
    action: "Utilize sistemas como a Caixa de Leitner ou aplicativos de repetição espaçada para revisão ativa programada."
  },
  {
    name: "Prática de Recuperação (Retrieval Practice / Efeito Teste)",
    icon: "🧠",
    desc: "Forçar o cérebro a recuperar ativamente a informação da memória sem consultar notas produz conexões neurais infinitamente mais fortes do que a simples releitura passiva.",
    action: "Ao terminar de ler uma página, feche o livro e anote em uma folha em branco tudo o que consegue lembrar (Brain Dump)."
  },
  {
    name: "Técnica Feynman",
    icon: "🎓",
    desc: "Criada pelo Nobel de Física Richard Feynman. Consiste em ensinar qualquer conceito complexo em linguagem tão simples que até uma criança de 9 anos consiga entender, identificando onde seu conhecimento vacila.",
    action: "4 Passos: 1. Escolha o conceito; 2. Explique em voz alta sem termos técnicos; 3. Identifique as lacunas; 4. Simplifique e crie analogias."
  },
  {
    name: "Teoria da Dupla Codificação (Dual Coding - Allan Paivio)",
    icon: "👁️",
    desc: "O cérebro humano processa informações visuais e verbais por canais cognitivos separados. Integrar texto com imagens, diagramas conceituais e infográficos duplica as chances de retenção e compreensão.",
    action: "Sempre acompanhe conceitos abstratos com esquemas visuais, metáforas gráficas ou mapas mentais."
  },
  {
    name: "Teoria da Carga Cognitiva & Andaimento (John Sweller & Lev Vygotsky)",
    icon: "🧱",
    desc: "A memória de trabalho possui limite estrito de processamento simultâneo (4 a 7 elementos). O professor deve reduzir a 'carga estranha', focar na 'carga pertinente' e oferecer suporte estruturado (scaffolding) que é gradualmente removido.",
    action: "Fracione conteúdos densos em blocos menores (microlearning) e use exemplos trabalhados passo a passo antes de exercícios autônomos."
  },
  {
    name: "Prática Intercalada (Interleaving)",
    icon: "🔀",
    desc: "Alternar entre diferentes matérias ou tipos variados de problemas durante o estudo, em vez de praticar exaustivamente o mesmo tipo em bloco (blocked practice), desenvolve a capacidade de discriminar padrões.",
    action: "Misture problemas de cálculo, geometria e álgebra na mesma lista em vez de fazer 30 exercícios idênticos seguidos."
  }
];

/* ==========================================================================
   3. TAXONOMIA DE BLOOM REVISADA (Anderson & Krathwohl)
   ========================================================================== */
const bloomData = {
  6: {
    level: "6. Criar (Creating)",
    color: "#9333ea",
    desc: "Juntar elementos para formar um todo coerente ou funcional; reorganizar elementos em um novo padrão ou estrutura.",
    verbs: ["Projetar", "Construir", "Planejar", "Formular", "Desenvolver", "Inventar", "Compor", "Elaborar", "Sintetizar", "Modelar"],
    question: "Como você pode gerar um novo produto, teoria, artefato ou solução original para esse desafio?",
    activity: "Desenvolver um protótipo de aplicativo, escrever uma peça de teatro histórica ou criar um plano de negócios sustentável."
  },
  5: {
    level: "5. Avaliar (Evaluating)",
    color: "#2563eb",
    desc: "Fazer julgamentos baseados em critérios e padrões rigorosos (críticas, defesas, validações).",
    verbs: ["Julgar", "Criticar", "Justificar", "Defender", "Validar", "Priorizar", "Classificar", "Ponderar", "Testar", "Avaliar"],
    question: "Qual opção é superior com base nas evidências coletadas e quais são os pontos fracos da alternativa proposta?",
    activity: "Simulação de tribunal de debate, revisão por pares de relatórios científicos ou parecer técnico de conformidade."
  },
  4: {
    level: "4. Analisar (Analyzing)",
    color: "#0891b2",
    desc: "Decompor o material em suas partes constituintes e determinar como essas partes se relacionam entre si e com uma estrutura global.",
    verbs: ["Diferenciar", "Organizar", "Desconstruir", "Comparar", "Contrastar", "Categorizar", "Investigar", "Correlacionar", "Examinar"],
    question: "Quais são as causas subjacentes desse fenômeno e como cada componente influencia o resultado final?",
    activity: "Elaborar diagramas de causa e efeito (Ishikawa), análise SWOT de empresas ou dissecação de argumentos textuais."
  },
  3: {
    level: "3. Aplicar (Applying)",
    color: "#16a34a",
    desc: "Executar ou utilizar um procedimento em uma situação dada ou resolver novos problemas em novos contextos.",
    verbs: ["Implementar", "Executar", "Calcular", "Demonstrar", "Operar", "Solucionar", "Praticar", "Empregar", "Ilustrar"],
    question: "Como você usaria esse algoritmo ou fórmula para resolver uma situação real que nunca viu antes?",
    activity: "Resolução de estudos de caso, simulações de atendimento em consultório ou cálculo orçamentário real."
  },
  2: {
    level: "2. Entender (Understanding)",
    color: "#d97706",
    desc: "Construir significado a partir de mensagens instrucionais orais, escritas e gráficas.",
    verbs: ["Explicar", "Resumir", "Interpretar", "Parafrasear", "Classificar", "Exemplificar", "Inferir", "Descrever"],
    question: "Como você explicaria esse conceito com suas próprias palavras para alguém leigo?",
    activity: "Gravação de podcasts explicativos em duplas, resumos visuais ou paráfrases de artigos conceituais."
  },
  1: {
    level: "1. Lembrar (Remembering)",
    color: "#dc2626",
    desc: "Recuperar conhecimento relevante da memória de longo prazo (fatos, termos, conceitos básicos).",
    verbs: ["Definir", "Listar", "Memorizar", "Nomear", "Reconhecer", "Repetir", "Identificar", "Rotular", "Recordar"],
    question: "Quais são as datas, fórmulas, definições e propriedades fundamentais desse conceito?",
    activity: "Quizzes de flashcards, preenchimento de lacunas e exercícios de correspondência de termos."
  }
};

/* ==========================================================================
   4. FLASHCARDS INTERATIVOS (SISTEMA LEITNER / RETRIEVAL)
   ========================================================================== */
const flashcardsList = [
  {
    topic: "Neurociência",
    question: "O que diz a Curva do Esquecimento de Hermann Ebbinghaus e como combatê-la?",
    answer: "Demonstra que esquecemos mais de 50% de uma nova informação nas primeiras 24 horas se não houver revisão ativa. Combate-se através da Repetição Espaçada (Spaced Repetition) e Prática de Recuperação."
  },
  {
    topic: "Metodologia Ativa",
    question: "No TBL (Team-Based Learning), o que significam iRAT e tRAT?",
    answer: "iRAT: Individual Readiness Assurance Test (teste individual de garantia de prontidão). tRAT: Team Readiness Assurance Test (mesmo teste feito em equipe com busca de consenso e feedback imediato)."
  },
  {
    topic: "Técnica Cognitiva",
    question: "Quais são os 4 passos da Técnica Feynman para aprendizagem acelerada?",
    answer: "1. Escolher o conceito; 2. Explicar como se ensinasse a uma criança de 9 anos (sem jargões); 3. Identificar onde surgiram dúvidas ou lacunas; 4. Voltar à fonte, simplificar e criar metáforas."
  },
  {
    topic: "Taxonomia de Bloom",
    question: "Qual a diferença entre os níveis 'Aplicar' e 'Criar' na Taxonomia de Bloom?",
    answer: "'Aplicar' é usar uma regra/procedimento já existente em um novo problema. 'Criar' exige juntar elementos de forma inovadora para gerar uma solução, produto ou teoria original e autêntica."
  },
  {
    topic: "Sala Invertida",
    question: "Qual o maior erro ao implementar a Sala de Aula Invertida (Flipped Classroom)?",
    answer: "Dedicar o tempo de aula presencial para reexplicar toda a teoria passada nos vídeos/textos em vez de realizar atividades práticas, projetos e debates aprofundados."
  },
  {
    topic: "Peer Instruction",
    question: "No método de Eric Mazur, qual a faixa de acerto no ConcepTest ideal para acionar o debate entre pares?",
    answer: "Entre 30% e 70% de acerto. Se for abaixo de 30%, o professor deve retomar o conceito; se for acima de 70%, avança-se para o próximo tópico."
  }
];

let currentCardIndex = 0;
let cardFlipped = false;

/* ==========================================================================
   INICIALIZADORES E CONTROLADORES DE INTERFACE
   ========================================================================== */

function initTheme() {
  const savedTheme = localStorage.getItem("edumet-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      let next = "light";
      if (current === "light") next = "dark";
      else if (current === "dark") next = "high-contrast";
      else next = "light";

      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("edumet-theme", next);
      updateThemeIcon(next);
    });
    updateThemeIcon(savedTheme);
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;
  if (theme === "dark") btn.innerHTML = "☀️";
  else if (theme === "high-contrast") btn.innerHTML = "👁️";
  else btn.innerHTML = "🌙";
}

function initScrollSpy() {
  const indicator = document.getElementById("scroll-indicator");
  const navLinks = document.querySelectorAll(".sidebar-item a, .nav-links a");
  const sections = document.querySelectorAll(".content-section, .hero-section");

  window.addEventListener("scroll", () => {
    // Scroll progress bar
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (indicator) indicator.style.width = scrolled + "%";

    // Scroll spy for active sidebar link
    let currentId = "";
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (winScroll >= top) {
        currentId = section.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ────────────────────────────────────────────────────────────────────────────
// BASE DE DADOS DO SPOTLIGHT SEARCH GLOBAL (ÍNDICE ULTRA-RÁPIDO)
// ────────────────────────────────────────────────────────────────────────────
const SPOTLIGHT_INDEX = [
  // ── LÓGICA PURA & CS ──
  { id: 'mod-1', title: 'Módulo 1: Fundamentos do Pensamento Lógico & Argumentação', category: 'logica', catLabel: 'Lógica Pura', icon: '🧠', desc: 'Premissas, evidências, validade lógica vs verdade factual e falácias.', link: 'curso-logica.html?modulo=1', target: '_self', keywords: 'logica premissas conclusao argumento contradicao fatos opinioes' },
  { id: 'mod-2', title: 'Módulo 2: Metodologia de Resolução de Problemas (George Pólya)', category: 'logica', catLabel: 'Lógica Pura', icon: '🎯', desc: 'Compreender, modelar, decompor, testar casos extremos e justificar soluções.', link: 'curso-logica.html?modulo=2', target: '_self', keywords: 'polya problemas decomposicao subtarefas restricoes passos' },
  { id: 'mod-3', title: 'Módulo 3: Algoritmos, Sequência Lógica & Determinismo', category: 'logica', catLabel: 'Lógica Pura', icon: '⚙️', desc: 'Ordem de execução, instruções inequívocas, pré/pós-condições e pseudocódigo.', link: 'curso-logica.html?modulo=3', target: '_self', keywords: 'algoritmo sequencia determinismo pseudocodigo instrucoes' },
  { id: 'mod-4', title: 'Módulo 4: Entradas, Processamento e Saídas (E/P/S / IPO)', category: 'logica', catLabel: 'Lógica Pura', icon: '📥', desc: 'Mapeamento de fluxo de dados, transformações e validação de resultados.', link: 'curso-logica.html?modulo=4', target: '_self', keywords: 'entrada processamento saida ipo fluxo transformacao dados' },
  { id: 'mod-5', title: 'Módulo 5: Variáveis, Dados e Estado (com Simulador de Trace)', category: 'logica', catLabel: 'Lógica Pura', icon: '📦', desc: 'Atribuição vs comparação, tipos conceituais e rastreamento de memória.', link: 'curso-logica.html?modulo=5', target: '_self', keywords: 'variaveis memoria estado trace table atribuicao inteiros texto' },
  { id: 'mod-6', title: 'Módulo 6: Operadores e Expressões Aritméticas/Relacionais', category: 'logica', catLabel: 'Lógica Pura', icon: '➕', desc: 'Precedência de operadores, módulo da divisão e expressões compostas.', link: 'curso-logica.html?modulo=6', target: '_self', keywords: 'operadores aritmeticos precedencia resto modulo comparacao' },
  { id: 'mod-7', title: 'Módulo 7: Lógica Proposicional, Tabelas-Verdade & De Morgan', category: 'logica', catLabel: 'Lógica Pura', icon: '📊', desc: 'Operadores E, OU, XOR, Implicação (SE..ENTÃO) e Leis de De Morgan.', link: 'curso-logica.html?modulo=7', target: '_self', keywords: 'tabela verdade proposicoes de morgan conjuncao disjuncao implicacao' },
  { id: 'mod-8', title: 'Módulo 8: Estruturas Condicionais & Cobertura de Casos', category: 'logica', catLabel: 'Lógica Pura', icon: '🔀', desc: 'Decisões binárias, árvores aninhadas, condições redundantes e impossíveis.', link: 'curso-logica.html?modulo=8', target: '_self', keywords: 'if else se senao condicoes aninhadas cobertura switch' },
  { id: 'mod-9', title: 'Módulo 9: Repetição, Laços, Contadores & Invariantes', category: 'logica', catLabel: 'Lógica Pura', icon: '🔁', desc: 'While vs For, acumuladores, condição de parada e prevenção de loops infinitos.', link: 'curso-logica.html?modulo=9', target: '_self', keywords: 'loops while for repeticao contadores acumuladores laco' },
  { id: 'mod-10', title: 'Módulo 10: Fluxogramas e Representações Visuais de Algoritmos', category: 'logica', catLabel: 'Lógica Pura', icon: '📐', desc: 'Símbolos padronizados (ANSI/ISO), caminhos paralelos e conversão de fluxo.', link: 'curso-logica.html?modulo=10', target: '_self', keywords: 'fluxograma diagrama blocos visual simbolos fluxo' },
  { id: 'mod-11', title: 'Módulo 11: Decomposição, Abstração & Reconhecimento de Padrões', category: 'logica', catLabel: 'Lógica Pura', icon: '🧩', desc: 'Pensamento computacional avançado e redução de complexidade.', link: 'curso-logica.html?modulo=11', target: '_self', keywords: 'decomposicao abstracao padroes divisao responsabilidades' },
  { id: 'mod-12', title: 'Módulo 12: Funções, Procedimentos & Modularização Pura', category: 'logica', catLabel: 'Lógica Pura', icon: '🧱', desc: 'Parâmetros por valor/referência, retorno, escopo e coesão.', link: 'curso-logica.html?modulo=12', target: '_self', keywords: 'funcoes procedimentos modularizacao escopo parametros retorno' },
  { id: 'mod-13', title: 'Módulo 13: Validação, Casos de Teste & Depuração Lógica', category: 'logica', catLabel: 'Lógica Pura', icon: '🧪', desc: 'Procura de contraexemplos, boundary testing e identificação de causas-raiz.', link: 'curso-logica.html?modulo=13', target: '_self', keywords: 'testes debug depuracao boundary casos extremos contraexemplos' },
  { id: 'mod-14', title: 'Módulo 14: Prova de Correção, Invariantes & Lógica de Hoare', category: 'logica', catLabel: 'Lógica Pura', icon: '📐', desc: 'Pré/pós-condições formais, triplas de Hoare {P} C {Q} e prova por indução.', link: 'curso-logica.html?modulo=14', target: '_self', keywords: 'hoare correcao formal invariante terminacao inducao' },
  { id: 'mod-15', title: 'Módulo 15: Complexidade, Eficiência & Análise Big O', category: 'logica', catLabel: 'Lógica Pura', icon: '📈', desc: 'Classes O(1), O(log n), O(n), O(n²), melhor, médio e pior caso.', link: 'curso-logica.html?modulo=15', target: '_self', keywords: 'big o complexidade assintotica eficiencia algoritmos cormen' },
  { id: 'mod-18', title: 'Módulo 18: Estruturas de Dados Abstratas (Pilhas, Filas, Grafos)', category: 'logica', catLabel: 'Lógica Pura', icon: '🗂️', desc: 'LIFO, FIFO, Listas Ligadas, Árvores Binárias de Busca e Grafos.', link: 'curso-logica.html?modulo=18', target: '_self', keywords: 'pilhas filas arvores grafos linked list bst fila pilha' },
  { id: 'mod-19', title: 'Módulo 19: Recursão, Divisão & Conquista e Teorema Mestre', category: 'logica', catLabel: 'Lógica Pura', icon: '🌀', desc: 'Pilha de chamadas, caso base e cálculo de recorrências T(n)=aT(n/b)+f(n).', link: 'curso-logica.html?modulo=19', target: '_self', keywords: 'recursao teorema mestre divisao e conquista arvore de chamada' },
  { id: 'mod-20', title: 'Módulo 20: Paradigmas de Algoritmos (Gulosos, Backtracking, DP)', category: 'logica', catLabel: 'Lógica Pura', icon: '💎', desc: 'Algoritmos Gulosos, Mochila, Memoization e Programação Dinâmica.', link: 'curso-logica.html?modulo=20', target: '_self', keywords: 'programacao dinamica dp backtracking gulosos memoization' },
  { id: 'mod-21', title: 'Módulo 21: Computabilidade, Autômatos & Máquinas de Turing', category: 'logica', catLabel: 'Lógica Pura', icon: '🤖', desc: 'Autômatos Finitos, Problema da Parada (Halting Problem) e Alan Turing.', link: 'curso-logica.html?modulo=21', target: '_self', keywords: 'turing automatos computabilidade halting problem maquina de turing' },
  { id: 'mod-22', title: 'Módulo 22: Classes de Complexidade (P vs NP & NP-Completude)', category: 'logica', catLabel: 'Lógica Pura', icon: '🏆', desc: 'Problemas de decisão, NP-Difícil, Teorema de Cook-Levin e SAT.', link: 'curso-logica.html?modulo=22', target: '_self', keywords: 'p vs np np-completo cook levin sat reducoes' },

  // ── LINGUAGENS DE PROGRAMAÇÃO ──
  { id: 'lang-py', title: 'Python — A Lógica da Legibilidade e Indentação', category: 'linguagens', catLabel: 'Linguagem', icon: '🐍', desc: 'Tipagem dinâmica, dicionários, list comprehensions, closures e POO.', link: '#lang-python', keywords: 'python listas dicionarios tuplas pandas decorators' },
  { id: 'lang-js', title: 'JavaScript — A Lógica Assíncrona e Event-Driven', category: 'linguagens', catLabel: 'Linguagem', icon: '🌐', desc: 'Event Loop, Callbacks, Promises, Async/Await, Closures e DOM Web.', link: '#lang-javascript', keywords: 'javascript js promises async await event loop dom web' },
  { id: 'lang-java', title: 'Java — A Lógica da POO Estruturada e JVM', category: 'linguagens', catLabel: 'Linguagem', icon: '☕', desc: 'Bytecode, Garbage Collector, Interfaces, Generics e Streams API.', link: '#lang-java', keywords: 'java jvm pooo streams generics polimorfismo classes' },
  { id: 'lang-c', title: 'Linguagem C — A Lógica do Hardware e Ponteiros', category: 'linguagens', catLabel: 'Linguagem', icon: '⚙️', desc: 'Endereçamento de memória RAM, malloc/free, ponteiros, structs e segments.', link: '#lang-c', keywords: 'c ponteiros memoria malloc free pointers structs bss' },
  { id: 'lang-cpp', title: 'C++ — A Lógica da Máxima Performance e RAII', category: 'linguagens', catLabel: 'Linguagem', icon: '🚀', desc: 'Zero-Cost Abstractions, Smart Pointers (unique_ptr, shared_ptr), STL e Templates.', link: '#lang-cpp', keywords: 'cpp c++ raii smart pointers stl templates performance' },
  { id: 'lang-cobol', title: 'COBOL — A Lógica de Negócios e Integridade Bancária', category: 'linguagens', catLabel: 'Linguagem', icon: '🏦', desc: 'As 4 Divisões (Identification, Environment, Data, Procedure) e Picture Clauses.', link: '#lang-cobol', keywords: 'cobol mainframe banco pic divisao contabilidade' },
  { id: 'lang-html', title: 'HTML5 & CSS3 — A Lógica Estrutural e Estilização Web', category: 'linguagens', catLabel: 'Linguagem', icon: '📄', desc: 'Semântica, Árvore DOM, Box Model, Flexbox, CSS Grid e Acessibilidade.', link: '#lang-html-css', keywords: 'html css flexbox grid box model dom web semantica' },
  { id: 'lang-sql', title: 'SQL — A Lógica Relacional e Teoria dos Conjuntos', category: 'linguagens', catLabel: 'Linguagem', icon: '🗄️', desc: 'SELECT, JOINs (INNER, LEFT), GROUP BY, Transações ACID, DDL e DML.', link: '#lang-sql', keywords: 'sql select join group by tabelas queries banco relacional' },
  { id: 'lang-php', title: 'PHP — A Lógica Server-Side e Processamento HTTP', category: 'linguagens', catLabel: 'Linguagem', icon: '🐘', desc: 'Ciclo Request/Response, Superglobais ($_POST, $_GET), PDO e POO Moderna.', link: '#lang-php', keywords: 'php backend server http pdo web dynamic' },
  { id: 'lang-db', title: 'Banco de Dados — Modelagem, SGBD e Índices B-Tree', category: 'linguagens', catLabel: 'Linguagem', icon: '🏛️', desc: 'MySQL, PostgreSQL, Normalização (1FN a 3FN), Chaves e Transações ACID.', link: '#lang-banco-dados', keywords: 'banco de dados mysql postgresql sgbd acid btree normalizacao' },
  { id: 'lang-rust', title: 'Rust & Go — A Lógica da Concorrência e Memory Safety', category: 'linguagens', catLabel: 'Linguagem', icon: '🦀', desc: 'Ownership/Borrow Checker em Rust e Goroutines/Channels em Go.', link: '#lang-rust-go', keywords: 'rust go golang ownership borrow checker goroutines channels' },

  // ── METODOLOGIAS & PEDAGOGIA ──
  { id: 'met-peer', title: 'Peer Instruction (Instrução por Pares - Eric Mazur)', category: 'metodologias', catLabel: 'Metodologia', icon: '👥', desc: 'Concepções alternativas, votação de Concept Tests e discussão entre pares.', link: '#metodologias-ativas', keywords: 'peer instruction mazur pares votacao concept test metodologias' },
  { id: 'met-pbl', title: 'PBL — Aprendizagem Baseada em Projetos / Problemas', category: 'metodologias', catLabel: 'Metodologia', icon: '🏗️', desc: 'Problemas abertos do mundo real, autonomia e entrega de protótipos.', link: '#metodologias-ativas', keywords: 'pbl projetos problemas resolucao equipes metodologias' },
  { id: 'met-tbl', title: 'TBL — Team-Based Learning (Aprendizagem em Equipes)', category: 'metodologias', catLabel: 'Metodologia', icon: '🤝', desc: 'Ciclo iRAT, tRAT, apelação e aplicação em desafios simultâneos.', link: '#metodologias-ativas', keywords: 'tbl equipes irat trat times metodologias' },
  { id: 'met-feynman', title: 'Técnica Feynman de Aprendizagem & Simplificação', category: 'metodologias', catLabel: 'Metodologia', icon: '🎓', desc: 'Explique para uma criança, identifique lacunas e refine a analogia.', link: '#metodologias-ativas', keywords: 'feynman tecnica clareza simples explicacao neurociencia' },
  { id: 'met-bloom', title: 'Taxonomia de Bloom — Os 6 Níveis Cognitivos', category: 'metodologias', catLabel: 'Metodologia', icon: '📊', desc: 'Lembrar, Entender, Aplicar, Analisar, Avaliar e Criar código.', link: '#taxonomia-bloom', keywords: 'bloom taxonomia cognitivo aplicar analisar criar lembrar' },
  { id: 'met-neuro', title: 'Neurociência Cognitiva & Teoria da Carga Cognitiva', category: 'metodologias', catLabel: 'Metodologia', icon: '🧬', desc: 'John Sweller, Efeito de Espaçamento, Efeito de Testagem e Scaffolding.', link: '#neurociencia-cognitiva', keywords: 'neurociencia sweller carga cognitiva memoria retencao espacamento' },

  // ── FERRAMENTAS & SIMULADORES ──
  { id: 'tool-comparator', title: 'Comparador Dinâmico de Sintaxe & Lógica', category: 'ferramentas', catLabel: 'Ferramenta', icon: '🔄', desc: 'Compare como Python, JS, Java, C e C++ resolvem o mesmo problema.', link: '#comparador-sintaxe', keywords: 'comparador sintaxe linguagens codigo comparativo' },
  { id: 'tool-flashcards', title: 'Flashcards de Retenção Ativa (Active Recall)', category: 'ferramentas', catLabel: 'Ferramenta', icon: '🗂️', desc: 'Cartões interativos para fixação espaçada de conceitos cruciais.', link: '#ferramentas-interativas', keywords: 'flashcards cartoes active recall memorizacao' },
  { id: 'tool-planner', title: 'Gerador Automático de Plano de Aula', category: 'ferramentas', catLabel: 'Ferramenta', icon: '📝', desc: 'Crie roteiros pedagógicos com metodologias ativas e níveis Bloom.', link: '#ferramentas-interativas', keywords: 'plano de aula roteiro gerador professor docente' },
  { id: 'tool-feynman-tester', title: 'Testador Feynman Interativo', category: 'ferramentas', catLabel: 'Ferramenta', icon: '🔍', desc: 'Digite sua explicação simples e receba diagnóstico instantâneo de clareza.', link: '#ferramentas-interativas', keywords: 'feynman teste simplificador clareza' },
  { id: 'tool-arena', title: 'Arena de Testes & Provas Unitárias Interativas', category: 'ferramentas', catLabel: 'Ferramenta', icon: '🧪', desc: 'Desafios de código e lógica com verificação automática de asserções.', link: '#arena-testes', keywords: 'arena testes unitarios asserts exercicios desafios' },

  // ── GLOSSÁRIO TÉCNICO ──
  { id: 'glo-algoritmo', title: 'Algoritmo (Conceito Fundamental)', category: 'glossario', catLabel: 'Glossário', icon: '📚', desc: 'Sequência finita, ordenada e não-ambígua de instruções lógicas.', link: '#glossario-pedagogico', keywords: 'algoritmo definicao instrucoes passos' },
  { id: 'glo-ponteiro', title: 'Ponteiro / Pointer (Endereço de Memória)', category: 'glossario', catLabel: 'Glossário', icon: '📚', desc: 'Variável que armazena o endereço hexadecimal físico de outra na RAM.', link: '#glossario-pedagogico', keywords: 'ponteiro pointer endereco memoria ram' },
  { id: 'glo-gc', title: 'Garbage Collector — Coletor de Lixo da Memória', category: 'glossario', catLabel: 'Glossário', icon: '📚', desc: 'Mecanismo automático que libera objetos sem referências ativas.', link: '#glossario-pedagogico', keywords: 'garbage collector gc memoria automatica java' },
  { id: 'glo-scaffolding', title: 'Andaime Cognitivo / Scaffolding Pedagógico', category: 'glossario', catLabel: 'Glossário', icon: '📚', desc: 'Suporte passo a passo oferecido ao estudante e removido gradualmente.', link: '#glossario-pedagogico', keywords: 'scaffolding andaime suporte vigotski pedagogia' },
  { id: 'glo-ownership', title: 'Ownership & Borrowing (Segurança em Rust)', category: 'glossario', catLabel: 'Glossário', icon: '📚', desc: 'Propriedade única de recursos na memória em tempo de compilação sem GC.', link: '#glossario-pedagogico', keywords: 'ownership borrow checker rust seguranca memoria' }
];

let spotlightFiltroAtivo = 'todos';
let spotlightIndexSelecionado = -1;

function initSearch() {
  const headerSearchInput = document.getElementById("global-search-input");
  const spotlightModal = document.getElementById("spotlight-search-modal");
  const spotlightInput = document.getElementById("spotlight-input-field");
  const floatingBtn = document.getElementById("btn-floating-quick-search");

  // Ao clicar no campo do header, abre o Spotlight
  if (headerSearchInput) {
    headerSearchInput.addEventListener("focus", (e) => {
      e.target.blur();
      openSpotlight();
    });
    headerSearchInput.addEventListener("click", () => {
      openSpotlight();
    });
  }

  // Botão flutuante
  if (floatingBtn) {
    floatingBtn.addEventListener("click", () => {
      openSpotlight();
    });
  }

  // Atalho de Teclado Global: Ctrl+K / Cmd+K
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleSpotlight();
    } else if (e.key === 'Escape') {
      closeSpotlight();
    }
  });

  // Configuração do Modal Spotlight
  if (spotlightModal) {
    spotlightModal.addEventListener("click", (e) => {
      if (e.target === spotlightModal) {
        closeSpotlight();
      }
    });

    const closeEscBtn = document.getElementById("spotlight-close-esc");
    if (closeEscBtn) {
      closeEscBtn.addEventListener("click", closeSpotlight);
    }

    if (spotlightInput) {
      spotlightInput.addEventListener("input", (e) => {
        executarBuscaSpotlight(e.target.value);
      });

      spotlightInput.addEventListener("keydown", (e) => {
        navegarResultadosSpotlight(e);
      });
    }

    // Configurar Pills de Filtro
    const pills = document.querySelectorAll(".spotlight-pill");
    pills.forEach(pill => {
      pill.addEventListener("click", () => {
        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        spotlightFiltroAtivo = pill.getAttribute("data-category") || 'todos';
        executarBuscaSpotlight(spotlightInput ? spotlightInput.value : '');
      });
    });
  }
}

function openSpotlight() {
  const modal = document.getElementById("spotlight-search-modal");
  const input = document.getElementById("spotlight-input-field");
  if (!modal) return;
  modal.classList.add("active");
  if (input) {
    input.value = "";
    setTimeout(() => input.focus(), 50);
  }
  executarBuscaSpotlight("");
}

function closeSpotlight() {
  const modal = document.getElementById("spotlight-search-modal");
  if (modal) modal.classList.remove("active");
}

function toggleSpotlight() {
  const modal = document.getElementById("spotlight-search-modal");
  if (modal && modal.classList.contains("active")) {
    closeSpotlight();
  } else {
    openSpotlight();
  }
}

function executarBuscaSpotlight(query) {
  const q = (query || "").toLowerCase().trim();
  const resultsContainer = document.getElementById("spotlight-results-list");
  const countBadge = document.getElementById("spotlight-results-count");
  if (!resultsContainer) return;

  let filtrados = SPOTLIGHT_INDEX.filter(item => {
    // Filtro por categoria
    if (spotlightFiltroAtivo !== 'todos' && item.category !== spotlightFiltroAtivo) {
      return false;
    }
    // Filtro por texto
    if (!q) return true;
    const textAll = `${item.title} ${item.desc} ${item.keywords || ''}`.toLowerCase();
    return textAll.includes(q);
  });

  if (countBadge) {
    countBadge.textContent = `${filtrados.length} resultado(s)`;
  }

  spotlightIndexSelecionado = filtrados.length > 0 ? 0 : -1;

  if (filtrados.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align:center; padding: 2.5rem 1rem; color: var(--text-light);">
        <span style="font-size:2.2rem; display:block; margin-bottom:0.5rem;">🔍</span>
        <strong style="color:var(--text-main); font-size:1rem;">Nenhum conteúdo encontrado para "${query}"</strong>
        <p style="font-size:0.85rem; margin-top:0.4rem;">Tente pesquisar por termos como <em>Python, Ponteiros, Tabelas-Verdade, Big O, Teorema Mestre, Feynman ou Peer Instruction</em>.</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = filtrados.map((item, idx) => {
    const isSelected = idx === 0 ? 'selected' : '';
    const isExternal = item.link.startsWith('http') || item.link.includes('.html');
    return `
      <div class="spotlight-item ${isSelected}" data-index="${idx}" data-link="${item.link}" data-target="${item.target || ''}" onclick="selecionarItemSpotlight('${item.link}', '${item.target || ''}', '${item.id}')">
        <span class="spotlight-item-icon">${item.icon}</span>
        <div class="spotlight-item-body">
          <div class="spotlight-item-header">
            <h4 class="spotlight-item-title">${destacarTermo(item.title, q)}</h4>
            <span class="spotlight-item-category">${item.catLabel}</span>
          </div>
          <p class="spotlight-item-desc">${destacarTermo(item.desc, q)}</p>
        </div>
        <div class="spotlight-item-action">
          <span>${isExternal ? 'Acessar 🚀' : 'Ir até ↵'}</span>
        </div>
      </div>
    `;
  }).join('');
}

function destacarTermo(texto, termo) {
  if (!termo) return texto;
  const regex = new RegExp(`(${termo.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
  return texto.replace(regex, `<mark style="background:rgba(234,179,8,0.3); color:inherit; font-weight:700; border-radius:2px; padding:0 2px;">$1</mark>`);
}

function navegarResultadosSpotlight(e) {
  const items = document.querySelectorAll(".spotlight-item");
  if (!items || items.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    spotlightIndexSelecionado = (spotlightIndexSelecionado + 1) % items.length;
    atualizarSelecaoVisualSpotlight(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    spotlightIndexSelecionado = (spotlightIndexSelecionado - 1 + items.length) % items.length;
    atualizarSelecaoVisualSpotlight(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (spotlightIndexSelecionado >= 0 && items[spotlightIndexSelecionado]) {
      items[spotlightIndexSelecionado].click();
    }
  }
}

function atualizarSelecaoVisualSpotlight(items) {
  items.forEach((item, idx) => {
    if (idx === spotlightIndexSelecionado) {
      item.classList.add("selected");
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      item.classList.remove("selected");
    }
  });
}

function selecionarItemSpotlight(link, target, id) {
  closeSpotlight();

  if (link.startsWith('#')) {
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetElement.classList.remove("search-target-highlight");
      void targetElement.offsetWidth; // Trigger reflow
      targetElement.classList.add("search-target-highlight");
    }
  } else {
    // Redirecionamento na mesma página
    window.location.href = link;
  }
}

function initModal() {
  const modalOverlay = document.getElementById("method-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!modalOverlay) return;

  closeBtn?.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      modalOverlay.classList.remove("active");
    }
  });
}

window.openMethodModal = function(id) {
  const method = methodologiesData.find(m => m.id === id);
  if (!method) return;

  const modalOverlay = document.getElementById("method-modal");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body-content");

  title.innerHTML = `${method.icon} ${method.name}`;
  body.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <span class="section-badge badge-blue">${method.category}</span>
      <span class="section-badge badge-purple">${method.target}</span>
      <p style="margin-top: 0.75rem; font-size: 1.05rem; color: var(--text-main); font-weight: 500;">${method.summary}</p>
      <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 0.3rem;"><em>Origem / Autores:</em> ${method.author}</p>
    </div>

    <h4>📋 Roteiro Passo a Passo de Execução</h4>
    <ol class="modal-steps-list">
      ${method.steps.map(s => `<li>${s}</li>`).join("")}
    </ol>

    <div class="pros-cons-grid">
      <div class="pro-box">
        <h5>✅ Vantagens & Benefícios</h5>
        <ul>
          ${method.pros.map(p => `<li>${p}</li>`).join("")}
        </ul>
      </div>
      <div class="con-box">
        <h5>⚠️ Pontos de Atenção & Desafios</h5>
        <ul>
          ${method.cons.map(c => `<li>${c}</li>`).join("")}
        </ul>
      </div>
    </div>

    <h4>🌟 Exemplo Prático Real de Aplicação</h4>
    <div style="background: var(--bg-main); border-left: 4px solid var(--primary); padding: 1rem; border-radius: var(--radius-sm); font-size: 0.92rem;">
      ${method.example}
    </div>

    <h4 style="margin-top: 1.25rem;">📊 Ficha Técnica Rápida</h4>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 0.5rem;">
      <div style="background:var(--bg-main); padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
        <small style="color:var(--text-light);">Tempo de Preparação:</small><br><strong>${method.prepTime}</strong>
      </div>
      <div style="background:var(--bg-main); padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
        <small style="color:var(--text-light);">Nível de Engajamento:</small><br><strong>${method.engagement}</strong>
      </div>
      <div style="background:var(--bg-main); padding:0.6rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
        <small style="color:var(--text-light);">Nível Cognitivo Bloom:</small><br><strong>${method.cognitiveLevel}</strong>
      </div>
    </div>
  `;

  modalOverlay.classList.add("active");
};

function initBloomTaxonomy() {
  const container = document.getElementById("bloom-details-container");
  const buttons = document.querySelectorAll(".bloom-level-btn");

  function renderLevel(levelNum) {
    const data = bloomData[levelNum];
    if (!data || !container) return;

    buttons.forEach(b => {
      b.classList.remove("active");
      if (b.dataset.level === String(levelNum)) {
        b.classList.add("active");
      }
    });

    container.innerHTML = `
      <div class="bloom-details-card" style="border-left: 5px solid ${data.color}">
        <h4 style="color:${data.color}; font-size:1.3rem; margin-bottom:0.5rem;">${data.level}</h4>
        <p style="font-size:0.95rem; margin-bottom:1rem; color:var(--text-main);">${data.desc}</p>
        
        <strong style="font-size:0.85rem; text-transform:uppercase; color:var(--text-light);">Verbos de Ação Pedagógicos Recomendados:</strong>
        <div class="bloom-verbs-tags">
          ${data.verbs.map(v => `<span class="verb-tag">${v}</span>`).join("")}
        </div>

        <div style="margin-top:1rem; background:var(--bg-card); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <strong style="color:${data.color};">❓ Pergunta-Guia do Professor:</strong>
          <p style="font-size:0.9rem; margin-top:0.3rem;">"${data.question}"</p>
        </div>

        <div style="margin-top:0.75rem; background:var(--bg-card); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <strong style="color:${data.color};">🎯 Exemplo de Atividade / Avaliação:</strong>
          <p style="font-size:0.9rem; margin-top:0.3rem;">${data.activity}</p>
        </div>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      renderLevel(parseInt(btn.dataset.level, 10));
    });
  });

  renderLevel(6); // Default: Criar
}

function initFlashcards() {
  const cardElement = document.getElementById("active-flashcard");
  const prevBtn = document.getElementById("fc-prev-btn");
  const flipBtn = document.getElementById("fc-flip-btn");
  const nextBtn = document.getElementById("fc-next-btn");
  const counter = document.getElementById("fc-counter");

  if (!cardElement) return;

  function renderCard() {
    cardFlipped = false;
    const card = flashcardsList[currentCardIndex];
    if (counter) counter.innerText = `${currentCardIndex + 1} de ${flashcardsList.length}`;

    cardElement.innerHTML = `
      <div class="flashcard-tag">${card.topic}</div>
      <div style="font-size: 1.15rem; font-weight: 700; margin: 1.5rem 0; color: var(--text-main);">
        ${card.question}
      </div>
      <div class="flashcard-hint">💡 Clique no card ou no botão abaixo para ver a resposta</div>
    `;
    cardElement.style.borderColor = "var(--primary)";
    cardElement.style.background = "var(--bg-card)";
  }

  function toggleFlip() {
    cardFlipped = !cardFlipped;
    const card = flashcardsList[currentCardIndex];

    if (cardFlipped) {
      cardElement.innerHTML = `
        <div class="flashcard-tag" style="background:var(--accent-green-light); color:var(--accent-green);">Resposta & Fundamento</div>
        <div style="font-size: 1.05rem; font-weight: 500; margin: 1.5rem 0; color: var(--text-main); line-height: 1.6;">
          ${card.answer}
        </div>
        <div class="flashcard-hint" style="color:var(--accent-green);">✅ Tente recuperar ativamente antes de cada virada!</div>
      `;
      cardElement.style.borderColor = "var(--accent-green)";
      cardElement.style.background = "var(--accent-green-light)";
    } else {
      renderCard();
    }
  }

  cardElement.addEventListener("click", toggleFlip);
  flipBtn?.addEventListener("click", toggleFlip);

  prevBtn?.addEventListener("click", () => {
    currentCardIndex = (currentCardIndex - 1 + flashcardsList.length) % flashcardsList.length;
    renderCard();
  });

  nextBtn?.addEventListener("click", () => {
    currentCardIndex = (currentCardIndex + 1) % flashcardsList.length;
    renderCard();
  });

  renderCard();
}

function initLessonPlanner() {
  const form = document.getElementById("lesson-plan-form");
  const output = document.getElementById("lesson-plan-output");
  const copyBtn = document.getElementById("copy-plan-btn");
  const downloadBtn = document.getElementById("download-plan-btn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("lp-title").value;
    const method = document.getElementById("lp-method").value;
    const target = document.getElementById("lp-target").value;
    const duration = document.getElementById("lp-duration").value;
    const objective = document.getElementById("lp-objective").value;
    const bloomLvl = document.getElementById("lp-bloom").value;

    const planText = `=====================================================
PLANO DE AULA ATIVA & ROTEIRO PEDAGÓGICO
=====================================================
TEMA DA AULA: ${title}
METODOLOGIA PRINCIPAL: ${method}
PÚBLICO-ALVO / SÉRIE: ${target}
DURAÇÃO TOTAL: ${duration}
NÍVEL DE BLOOM ALMEJADO: ${bloomLvl}

1. OBJETIVO DE APRENDIZAGEM (SMART):
Ao final desta sessão, os estudantes serão capazes de:
${objective}

2. MATERIAIS & RECURSOS NECESSÁRIOS:
- Recursos didáticos orientados ao método ${method}.
- Dispositivos / Fichas de estudo prévio ou formulários de resposta rápida.
- Rubrica de avaliação formativa.

3. ESTRUTURA TEMPORAL DA AULA (CRONOGRAMA DETALHADO):
- [00:00 - 00:15] Momento 1: Acolhimento, ativação de conhecimento prévio e pergunta instigante.
- [00:15 - 00:45] Momento 2: Execução central da metodologia (${method}) em pequenos grupos ou pares.
- [00:45 - 00:75] Momento 3: Apresentação de soluções, debate plenário e mediação docente.
- [00:75 - 00:90] Momento 4: Fechamento, síntese dos conceitos-chave e autoavaliação (Ticket de Saída).

4. INSTRUMENTO DE AVALIAÇÃO FORMATIVA:
- Verificação de engajamento individual e em grupo.
- Aplicação de 1 questão de Prática de Recuperação sem consulta.
- Critério de sucesso: 85% dos alunos demonstram domínio dos verbos de ação propostos.
=====================================================
Gerado via Portal EduMetodologias — Excelência no Ensino Ativo`;

    output.textContent = planText;
    output.style.display = "block";
    document.getElementById("plan-actions").style.display = "flex";
  });

  copyBtn?.addEventListener("click", () => {
    if (!output.textContent) return;
    navigator.clipboard.writeText(output.textContent).then(() => {
      copyBtn.innerText = "✅ Copiado!";
      setTimeout(() => copyBtn.innerText = "📋 Copiar Roteiro", 2000);
    });
  });

  downloadBtn?.addEventListener("click", () => {
    if (!output.textContent) return;
    const blob = new Blob([output.textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Plano_de_Aula_Ativa.txt";
    a.click();
    URL.revokeObjectURL(url);
  });
}

function initMethodologyQuiz() {
  const quizContainer = document.getElementById("quiz-step-container");
  if (!quizContainer) return;

  const quizQuestions = [
    {
      q: "Qual é o seu objetivo principal para esta aula ou disciplina?",
      options: [
        { text: "Resolver um problema do mundo real e criar um produto tangível.", tag: "pbl" },
        { text: "Garantir que os alunos leiam antes e debatam em equipes em sala.", tag: "tbl" },
        { text: "Testar conceitos em tempo real durante uma aula expositiva curta.", tag: "peer" },
        { text: "Otimizar o tempo de sala para práticas de laboratório e exercícios.", tag: "flipped" }
      ]
    },
    {
      q: "Quanto tempo você tem disponível para o planejamento e execução?",
      options: [
        { text: "Pouco tempo: quero aplicar amanhã sem grandes mudanças de estrutura.", tag: "peer" },
        { text: "Médio: posso gravar ou indicar vídeos curtos para estudo prévio.", tag: "flipped" },
        { text: "Médio a Alto: posso elaborar um teste individual e em equipe.", tag: "tbl" },
        { text: "Amplo: projeto de várias semanas com sprints e entregáveis.", tag: "pbl" }
      ]
    }
  ];

  let currentStep = 0;
  const userAnswers = [];

  function renderQuizStep() {
    if (currentStep >= quizQuestions.length) {
      // Show result
      const recommended = userAnswers[userAnswers.length - 1] || "pbl";
      const methodMap = {
        pbl: { name: "PBL — Aprendizagem Baseada em Projetos", id: "pbl", icon: "🏗️", desc: "Perfeita para projetos de médio/longo prazo onde os alunos desenvolvem autonomia, pesquisa e produtos autênticos." },
        tbl: { name: "TBL — Aprendizagem Baseada em Equipes", id: "tbl", icon: "👥", desc: "Ideal para turmas médias/grandes onde você deseja responsabilização individual e alto engajamento em equipes." },
        peer: { name: "Peer Instruction (Instrução por Pares)", id: "peer-instruction", icon: "💬", desc: "A metodologia mais rápida de implementar: transforme sua aula expositiva em momentos de votação conceitual e debate entre pares." },
        flipped: { name: "Sala de Aula Invertida (Flipped Classroom)", id: "sala-invertida", icon: "🔄", desc: "Excelente para transferir a teoria básica para casa e transformar a sala de aula em um laboratório dinâmico de resolução de problemas." }
      };

      const res = methodMap[recommended] || methodMap.pbl;

      quizContainer.innerHTML = `
        <div style="text-align:center; padding: 1.5rem;">
          <div style="font-size:3rem; margin-bottom:0.5rem;">${res.icon}</div>
          <h4 style="font-size:1.4rem; color:var(--primary); margin-bottom:0.75rem;">Metodologia Recomendada:</h4>
          <h3 style="font-size:1.6rem; font-weight:800; margin-bottom:1rem;">${res.name}</h3>
          <p style="color:var(--text-muted); max-width:550px; margin:0 auto 1.5rem auto; font-size:1rem;">${res.desc}</p>
          <div style="display:flex; justify-content:center; gap:1rem;">
            <button class="btn btn-primary" onclick="openMethodModal('${res.id}')">Ver Guia Completo da Metodologia</button>
            <button class="btn btn-outline" onclick="resetQuiz()">Refazer Teste</button>
          </div>
        </div>
      `;
      return;
    }

    const item = quizQuestions[currentStep];
    quizContainer.innerHTML = `
      <div class="quiz-question">Pergunta ${currentStep + 1} de ${quizQuestions.length}: ${item.q}</div>
      <div class="quiz-options">
        ${item.options.map((opt, i) => `
          <button class="quiz-opt-btn" onclick="selectQuizAnswer('${opt.tag}')">
            <strong>${String.fromCharCode(65 + i)})</strong> ${opt.text}
          </button>
        `).join("")}
      </div>
    `;
  }

  window.selectQuizAnswer = function(tag) {
    userAnswers.push(tag);
    currentStep++;
    renderQuizStep();
  };

  window.resetQuiz = function() {
    currentStep = 0;
    userAnswers.length = 0;
    renderQuizStep();
  };

  renderQuizStep();
}

function initGlossaryFilter() {
  const filterBtns = document.querySelectorAll(".glossary-filter-btn");
  const items = document.querySelectorAll(".glossary-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      items.forEach(item => {
        if (category === "all" || item.dataset.category === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

function initFeynmanTool() {
  const simplifyBtn = document.getElementById("feynman-check-btn");
  const conceptInput = document.getElementById("feynman-concept");
  const explanationInput = document.getElementById("feynman-explanation");
  const resultBox = document.getElementById("feynman-result");

  if (!simplifyBtn) return;

  simplifyBtn.addEventListener("click", () => {
    const concept = conceptInput.value.trim();
    const text = explanationInput.value.trim();

    if (!concept || !text) {
      alert("Por favor, preencha o conceito e a sua explicação.");
      return;
    }

    // Heuristics for Feynman simplicity
    const words = text.split(/\s+/).length;
    const complexJargons = ["paradigma", "epistemologia", "sinergia", "ontologia", "concomitante", "intrínseco", "justaposição", "hermenêutica", "axioma", "ubíquo"];
    const foundJargons = complexJargons.filter(j => text.toLowerCase().includes(j));
    const hasAnalogy = text.toLowerCase().includes("como se fosse") || text.toLowerCase().includes("é como") || text.toLowerCase().includes("imagine") || text.toLowerCase().includes("semelhante");

    let score = 100;
    let feedback = [];

    if (foundJargons.length > 0) {
      score -= foundJargons.length * 15;
      feedback.push(`⚠️ Termos complexos encontrados: <strong>${foundJargons.join(", ")}</strong>. Tente substituir por termos mais simples.`);
    }

    if (!hasAnalogy) {
      score -= 20;
      feedback.push("💡 Adicione uma metáfora ou analogia do cotidiano (ex: 'é como...', 'imagine que...').");
    }

    if (words < 20) {
      score -= 15;
      feedback.push("⚠️ Explicação muito curta. Elabore um pouco mais sem perder a clareza.");
    }

    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:1.25rem; border-radius:var(--radius-md);">
        <h4>Avaliação Feynman para: "${concept}"</h4>
        <div style="font-size:1.4rem; font-weight:800; color:${score >= 70 ? 'var(--accent-green)' : 'var(--accent-orange)'}; margin:0.5rem 0;">
          Índice de Clareza & Simplicidade: ${Math.max(score, 10)}%
        </div>
        ${feedback.length > 0 ? `
          <ul style="padding-left:1.25rem; font-size:0.9rem; margin-top:0.5rem;">
            ${feedback.map(f => `<li>${f}</li>`).join("")}
          </ul>
        ` : `
          <p style="color:var(--accent-green); font-size:0.92rem; font-weight:600;">🎉 Excelente explicação! Clara, acessível e sem jargões desnecessários.</p>
        `}
      </div>
    `;
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const sidebar = document.getElementById("sidebar-nav");

  if (!toggle || !sidebar) return;

  let backdrop = document.getElementById("sidebar-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "sidebar-backdrop";
    backdrop.className = "sidebar-backdrop";
    document.body.appendChild(backdrop);
  }

  function toggleSidebar(open) {
    const isOpen = open !== undefined ? open : !sidebar.classList.contains("open");
    sidebar.classList.toggle("open", isOpen);
    backdrop.classList.toggle("active", isOpen);
    document.body.classList.toggle("sidebar-opened", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSidebar();
  });

  backdrop.addEventListener("click", () => {
    toggleSidebar(false);
  });

  // Fechar sidebar ao clicar em qualquer link interno
  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      toggleSidebar(false);
    });
  });

  // Fechar no ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      toggleSidebar(false);
    }
  });
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top-btn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Function to switch tool tabs
window.switchToolTab = function(tabId) {
  const tabs = document.querySelectorAll(".tab-btn");
  const panes = document.querySelectorAll(".tool-pane");

  tabs.forEach(t => t.classList.remove("active"));
  panes.forEach(p => p.classList.remove("active"));

  document.querySelector(`[data-tab="${tabId}"]`)?.classList.add("active");
  document.getElementById(tabId)?.classList.add("active");
};
/* ==========================================================================
   INTERATIVIDADE: COMPARADOR DINÂMICO DE LINGUAGENS & RUNNER
   ========================================================================== */

const syntaxComparisonData = {
  "hello": {
    title: "1. Saída de Dados Básica (Olá Mundo)",
    logic: "Apresentar uma sequência de caracteres (string) na tela ou terminal do usuário através da interface padrão de saída.",
    pseudocode: "ALGORITMO OlaMundo\nINÍCIO\n  ESCREVA(\"Olá, Mundo!\")\nFIM",
    examples: {
      python: `# Python\nprint("Olá, Mundo!")`,
      javascript: `// JavaScript\nconsole.log("Olá, Mundo!");`,
      java: `// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Olá, Mundo!");\n    }\n}`,
      c: `/* Linguagem C */\n#include <stdio.h>\n\nint main() {\n    printf("Olá, Mundo!\\n");\n    return 0;\n}`,
      cpp: `// C++\n#include <iostream>\n\nint main() {\n    std::cout << "Olá, Mundo!" << std::endl;\n    return 0;\n}`,
      cobol: `* COBOL (Padrão ANS85)\nIDENTIFICATION DIVISION.\nPROGRAM-ID. HELLO-WORLD.\nPROCEDURE DIVISION.\n    DISPLAY "Olá, Mundo!".\n    STOP RUN.`,
      html: `<!-- HTML5 -->\n<!DOCTYPE html>\n<html lang="pt-BR">\n  <body>\n    <h1>Olá, Mundo!</h1>\n  </body>\n</html>`,
      sql: `-- SQL\nSELECT 'Olá, Mundo!' AS mensagem;`,
      rust: `// Rust\nfn main() {\n    println!("Olá, Mundo!");\n}`,
      go: `// Go (Golang)\npackage main\nimport "fmt"\n\nfn main() {\n    fmt.Println("Olá, Mundo!")\n}`
    }
  },
  "variables": {
    title: "2. Declaração de Variáveis e Tipos",
    logic: "Reservar um espaço na memória RAM, atribuir um nome (identificador), definir o tipo de dado (número, texto, booleano) e armazenar um valor inicial.",
    pseudocode: "ALGORITMO Variaveis\nDECLARE nome: TEXTO, idade: INTEIRO, saldo: REAL, ativo: BOOLEANO\nINÍCIO\n  nome <- \"Carlos\"\n  idade <- 25\n  saldo <- 1500.50\n  ativo <- VERDADEIRO\nFIM",
    examples: {
      python: `# Python (Tipagem dinâmica com type hints opcionais)\nnome: str = "Carlos"\nidade: int = 25\nsaldo: float = 1500.50\nativo: bool = True`,
      javascript: `// JavaScript (Tipagem dinâmica com let / const)\nconst nome = "Carlos";\nlet idade = 25;\nlet saldo = 1500.50;\nlet ativo = true;`,
      java: `// Java (Tipagem estática e forte)\nString nome = "Carlos";\nint idade = 25;\ndouble saldo = 1500.50;\nboolean ativo = true;`,
      c: `/* C (Tipagem estática estrita)\n#include <stdbool.h>\n\nchar nome[] = "Carlos";\nint idade = 25;\ndouble saldo = 1500.50;\nbool ativo = true;`,
      cpp: `// C++\n#include <string>\n\nstd::string nome = "Carlos";\nint idade = 25;\ndouble saldo = 1500.50;\nbool ativo = true;`,
      cobol: `* COBOL (Divisão de Dados estruturada por níveis)\nDATA DIVISION.\nWORKING-STORAGE SECTION.\n01 WS-NOME     PIC X(20) VALUE 'Carlos'.\n01 WS-IDADE    PIC 9(03) VALUE 25.\n01 WS-SALDO    PIC 9(05)V99 VALUE 1500.50.\n01 WS-ATIVO    PIC X(01) VALUE 'T'.`,
      html: `<!-- HTML (Entrada de Dados com Atributos de Tipagem) -->\n<input type="text" name="nome" value="Carlos">\n<input type="number" name="idade" value="25">\n<input type="checkbox" name="ativo" checked>`,
      sql: `-- SQL (Criação de Tabela com Tipos de Dados)\nCREATE TABLE usuario (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  nome VARCHAR(100) NOT NULL,\n  idade INT,\n  saldo DECIMAL(10,2),\n  ativo BOOLEAN DEFAULT TRUE\n);`,
      rust: `// Rust (Tipagem estática com imutabilidade por padrão)\nlet nome: &str = "Carlos";\nlet mut idade: i32 = 25;\nlet saldo: f64 = 1500.50;\nlet ativo: bool = true;`,
      go: `// Go (Tipagem estática com inferência rápida :=)\nvar nome string = "Carlos"\nidade := 25\nsaldo := 1500.50\nativo := true`
    }
  },
  "conditionals": {
    title: "3. Estruturas Condicionais (Tomada de Decisão)",
    logic: "Avaliar uma expressão lógica booleana (Verdadeiro/Falso). Se a condição for atendida, executar o bloco A; caso contrário, executar o bloco B.",
    pseudocode: "ALGORITMO Decisao\nSE (idade >= 18) ENTÃO\n  ESCREVA(\"Acesso Permitido: Maior de Idade\")\nSENÃO SE (idade >= 16) ENTÃO\n  ESCREVA(\"Acesso Permitido com Autorização\")\nSENÃO\n  ESCREVA(\"Acesso Negado: Menor de Idade\")\nFIM_SE",
    examples: {
      python: `# Python\nif idade >= 18:\n    print("Maior de Idade")\nelif idade >= 16:\n    print("Com Autorização")\nelse:\n    print("Acesso Negado")`,
      javascript: `// JavaScript\nif (idade >= 18) {\n  console.log("Maior de Idade");\n} else if (idade >= 16) {\n  console.log("Com Autorização");\n} else {\n  console.log("Acesso Negado");\n}`,
      java: `// Java\nif (idade >= 18) {\n    System.out.println("Maior de Idade");\n} else if (idade >= 16) {\n    System.out.println("Com Autorização");\n} else {\n    System.out.println("Acesso Negado");\n}`,
      c: `/* C */\nif (idade >= 18) {\n    printf("Maior de Idade\\n");\n} else if (idade >= 16) {\n    printf("Com Autorização\\n");\n} else {\n    printf("Acesso Negado\\n");\n}`,
      cpp: `// C++\nif (idade >= 18) {\n    std::cout << "Maior de Idade" << std::endl;\n} else if (idade >= 16) {\n    std::cout << "Com Autorização" << std::endl;\n} else {\n    std::cout << "Acesso Negado" << std::endl;\n}`,
      cobol: `* COBOL (IF / ELSE / END-IF)\nIF WS-IDADE >= 18\n    DISPLAY "MAIOR DE IDADE"\nELSE\n    IF WS-IDADE >= 16\n        DISPLAY "COM AUTORIZACAO"\n    ELSE\n        DISPLAY "ACESSO NEGADO"\n    END-IF\nEND-IF.`,
      html: `<!-- HTML + Validação Nativa de Formulário -->\n<input type="number" min="18" max="120" required placeholder="Apenas maiores de 18">`,
      sql: `-- SQL (Expressão Condicional CASE WHEN)\nSELECT nome, idade,\n  CASE\n    WHEN idade >= 18 THEN 'Maior de Idade'\n    WHEN idade >= 16 THEN 'Com Autorização'\n    ELSE 'Menor de Idade'\n  END AS status_acesso\nFROM usuario;`,
      rust: `// Rust (if é uma expressão que pode retornar valor)\nif idade >= 18 {\n    println!("Maior de Idade");\n} else if idade >= 16 {\n    println!("Com Autorização");\n} else {\n    println!("Acesso Negado");\n}`,
      go: `// Go (Sem parênteses obrigatórios)\nif idade >= 18 {\n    fmt.Println("Maior de Idade")\n} else if idade >= 16 {\n    fmt.Println("Com Autorização")\n} else {\n    fmt.Println("Acesso Negado")\n}`
    }
  },
  "loops": {
    title: "4. Estruturas de Repetição (Laços / Loops)",
    logic: "Executar um bloco de instruções repetidamente enquanto uma condição for satisfeita ou iterar sobre um intervalo finito determinado.",
    pseudocode: "ALGORITMO Repeticao\nPARA contador DE 1 ATE 5 PASSO 1 FAÇA\n  ESCREVA(\"Iteração: \", contador)\nFIM_PARA",
    examples: {
      python: `# Python (for in range)\nfor i in range(1, 6):\n    print(f"Iteração: {i}")`,
      javascript: `// JavaScript (for clássico)\nfor (let i = 1; i <= 5; i++) {\n  console.log(\`Iteração: \${i}\`);\n}`,
      java: `// Java\nfor (int i = 1; i <= 5; i++) {\n    System.out.println("Iteração: " + i);\n}`,
      c: `/* C */\nfor (int i = 1; i <= 5; i++) {\n    printf("Iteração: %d\\n", i);\n}`,
      cpp: `// C++\nfor (int i = 1; i <= 5; i++) {\n    std::cout << "Iteração: " << i << std::endl;\n}`,
      cobol: `* COBOL (PERFORM VARYING ... UNTIL)\nPERFORM VARYING WS-CONTADOR FROM 1 BY 1 UNTIL WS-CONTADOR > 5\n    DISPLAY "ITERACAO: " WS-CONTADOR\nEND-PERFORM.`,
      html: `<!-- HTML não possui loops nativos: gerado via template ou JS -->\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>`,
      sql: `-- SQL (Processamento em conjunto sem necessidade de cursor explícito)\nSELECT id, nome FROM usuario WHERE ativo = TRUE;`,
      rust: `// Rust (for in range inclusivo)\nfor i in 1..=5 {\n    println!("Iteração: {}", i);\n}`,
      go: `// Go (for é a única estrutura de loop na linguagem)\nfor i := 1; i <= 5; i++ {\n    fmt.Printf("Iteração: %d\\n", i)\n}`
    }
  },
  "functions": {
    title: "5. Funções e Modularização (Divisão e Conquista)",
    logic: "Isolar um bloco de código reutilizável que recebe parâmetros (entradas), realiza um processamento e retorna um resultado (saída).",
    pseudocode: "FUNÇÃO calcularMedia(nota1: REAL, nota2: REAL): REAL\nINÍCIO\n  RETORNE (nota1 + nota2) / 2\nFIM_FUNÇÃO",
    examples: {
      python: `# Python\ndef calcular_media(nota1: float, nota2: float) -> float:\n    return (nota1 + nota2) / 2\n\nresultado = calcular_media(8.5, 9.5)\nprint(f"Média: {resultado}")`,
      javascript: `// JavaScript (Arrow Function)\nconst calcularMedia = (nota1, nota2) => (nota1 + nota2) / 2;\n\nconst resultado = calcularMedia(8.5, 9.5);\nconsole.log(\`Média: \${resultado}\`);`,
      java: `// Java (Método estático com tipos explícitos)\npublic static double calcularMedia(double nota1, double nota2) {\n    return (nota1 + nota2) / 2;\n}`,
      c: `/* C */\ndouble calcularMedia(double nota1, double nota2) {\n    return (nota1 + nota2) / 2.0;\n}`,
      cpp: `// C++\ndouble calcularMedia(double nota1, double nota2) {\n    return (nota1 + nota2) / 2.0;\n}`,
      cobol: `* COBOL (SEÇÃO / PARÁGRAFO PROCEDURAL COM RETORNO)\nCALCULAR-MEDIA.\n    COMPUTE WS-MEDIA = (WS-NOTA1 + WS-NOTA2) / 2.\n    DISPLAY "MEDIA: " WS-MEDIA.`,
      html: `<!-- HTML Event Handler chamando função JS -->\n<button onclick="alert('Processando...')">Calcular</button>`,
      sql: `-- SQL (Função Escalar Definida pelo Usuário - UDF)\nCREATE FUNCTION calcular_media(nota1 DECIMAL(4,2), nota2 DECIMAL(4,2))\nRETURNS DECIMAL(4,2) DETERMINISTIC\nBEGIN\n  RETURN (nota1 + nota2) / 2;\nEND;`,
      rust: `// Rust\nfn calcular_media(nota1: f64, nota2: f64) -> f64 {\n    (nota1 + nota2) / 2.0\n}`,
      go: `// Go\nfunc calcularMedia(nota1, nota2 float64) float64 {\n    return (nota1 + nota2) / 2\n}`
    }
  }
};

let currentComparisonTopic = "hello";
let currentSelectedLanguage = "python";

function initCodeComparison() {
  const topicSelect = document.getElementById("syntax-topic-select");
  const langButtons = document.querySelectorAll(".lang-pill-btn");
  const logicContainer = document.getElementById("comparison-logic-desc");
  const pseudocodeContainer = document.getElementById("comparison-pseudocode");
  const codeOutput = document.getElementById("comparison-code-output");
  const langLabel = document.getElementById("comparison-lang-label");

  if (!codeOutput) return;

  function updateView() {
    const data = syntaxComparisonData[currentComparisonTopic];
    if (!data) return;

    if (logicContainer) logicContainer.textContent = data.logic;
    if (pseudocodeContainer) pseudocodeContainer.textContent = data.pseudocode;
    if (langLabel) langLabel.textContent = currentSelectedLanguage.toUpperCase();
    if (codeOutput) codeOutput.textContent = data.examples[currentSelectedLanguage] || "// Exemplo em preparação";

    langButtons.forEach(btn => {
      btn.classList.remove("active");
      if (btn.dataset.lang === currentSelectedLanguage) {
        btn.classList.add("active");
      }
    });
  }

  topicSelect?.addEventListener("change", (e) => {
    currentComparisonTopic = e.target.value;
    updateView();
  });

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentSelectedLanguage = btn.dataset.lang;
      updateView();
    });
  });

  updateView();
}

function initCodeRunner() {
  const runBtn = document.getElementById("run-code-btn");
  const editor = document.getElementById("live-editor");
  const consoleOutput = document.getElementById("live-console");

  if (!runBtn || !editor || !consoleOutput) return;

  runBtn.addEventListener("click", () => {
    const code = editor.value;
    consoleOutput.textContent = "⏳ Executando...\n";

    // Create safe console mock
    const logs = [];
    const customConsole = {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args) => logs.push("❌ ERRO: " + args.join(' ')),
      warn: (...args) => logs.push("⚠️ AVISO: " + args.join(' '))
    };

    try {
      const runFunction = new Function("console", code);
      runFunction(customConsole);
      consoleOutput.textContent = logs.length > 0 ? logs.join("\n") : "✅ Código executado com sucesso (sem saída no console).";
    } catch (err) {
      consoleOutput.textContent = "❌ Erro de Execução / Sintaxe:\n" + err.message;
    }
  });
}

function initCopyCodeButtons() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("copy-code-btn")) {
      const codeBlock = e.target.closest(".code-block")?.querySelector("code, pre") || e.target.closest(".code-block");
      if (!codeBlock) return;
      
      const textToCopy = codeBlock.textContent.replace("Copiar Código", "").trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = e.target.textContent;
        e.target.textContent = "✅ Copiado!";
        setTimeout(() => e.target.textContent = originalText, 2000);
      });
    }
  });
}

// Injetar nos listeners principais
document.addEventListener("DOMContentLoaded", () => {
  initCodeComparison();
  initCodeRunner();
  initCopyCodeButtons();
});
/* ==========================================================================
   ARENA DE TESTES UNITÁRIOS DE CÓDIGO & SIMULADOR DE PROVAS
   ========================================================================== */

const codingChallenges = {
  fatorial: {
    fn: "calcularFatorial",
    title: "Desafio 1: Função Fatorial",
    desc: "Crie uma função `calcularFatorial(n)` que receba um número inteiro não-negativo `n` e retorne seu fatorial (ex: 5! = 5 * 4 * 3 * 2 * 1 = 120; 0! = 1).",
    starterCode: `function calcularFatorial(n) {
  // Sua lógica aqui:
  if (n <= 1) return 1;
  return n * calcularFatorial(n - 1);
}`,
    tests: [
      { input: [0], expected: 1, label: "calcularFatorial(0)" },
      { input: [1], expected: 1, label: "calcularFatorial(1)" },
      { input: [4], expected: 24, label: "calcularFatorial(4)" },
      { input: [5], expected: 120, label: "calcularFatorial(5)" },
      { input: [6], expected: 720, label: "calcularFatorial(6)" }
    ]
  },
  palindromo: {
    fn: "verificarPalindromo",
    title: "Desafio 2: Verificador de Palíndromos",
    desc: "Crie uma função `verificarPalindromo(texto)` que verifique se uma palavra ou frase é lida da mesma forma de trás para frente, ignorando espaços e maiúsculas/minúsculas.",
    starterCode: `function verificarPalindromo(texto) {
  // Sua lógica aqui:
  const limpo = texto.toLowerCase().replace(/\\s+/g, '');
  const invertido = limpo.split('').reverse().join('');
  return limpo === invertido;
}`,
    tests: [
      { input: ["arara"], expected: true, label: 'verificarPalindromo("arara")' },
      { input: ["radar"], expected: true, label: 'verificarPalindromo("radar")' },
      { input: ["programacao"], expected: false, label: 'verificarPalindromo("programacao")' },
      { input: ["Ame o poema"], expected: true, label: 'verificarPalindromo("Ame o poema")' }
    ]
  },
  filtrarPares: {
    fn: "filtrarPares",
    title: "Desafio 3: Filtrar Números Pares",
    desc: "Crie uma função `filtrarPares(lista)` que receba um array de números inteiros e retorne um novo array contendo apenas os números pares.",
    starterCode: `function filtrarPares(lista) {
  // Sua lógica aqui:
  return lista.filter(num => num % 2 === 0);
}`,
    tests: [
      { input: [[1, 2, 3, 4, 5, 6]], expected: [2, 4, 6], label: "filtrarPares([1, 2, 3, 4, 5, 6])" },
      { input: [[7, 9, 11]], expected: [], label: "filtrarPares([7, 9, 11])" },
      { input: [[10, 20, 30]], expected: [10, 20, 30], label: "filtrarPares([10, 20, 30])" }
    ]
  },
  somarArray: {
    fn: "somarArray",
    title: "Desafio 4: Soma de Array com Reduce",
    desc: "Crie uma função `somarArray(arr)` que receba um array de números e retorne a soma total usando APENAS o método `reduce` (sem usar `for`, `while` ou `forEach`).",
    starterCode: `function somarArray(arr) {
  // Use apenas .reduce() para somar:
  return arr.reduce((acc, val) => acc + val, 0);
}`,
    tests: [
      { input: [[1, 2, 3, 4, 5]], expected: 15, label: "somarArray([1,2,3,4,5])" },
      { input: [[10, -5, 3]], expected: 8, label: "somarArray([10,-5,3])" },
      { input: [[]], expected: 0, label: "somarArray([]) — array vazio" },
      { input: [[100]], expected: 100, label: "somarArray([100]) — único elemento" }
    ]
  },
  contarOcorrencias: {
    fn: "contarOcorrencias",
    title: "Desafio 5: Contar Ocorrências de Palavras",
    desc: "Crie uma função `contarOcorrencias(texto)` que receba uma string e retorne um objeto com cada palavra como chave e o número de ocorrências como valor. Ignore maiúsculas/minúsculas.",
    starterCode: `function contarOcorrencias(texto) {
  // Seu código aqui:
  const palavras = texto.toLowerCase().split(/\\s+/);
  return palavras.reduce((acc, palavra) => {
    acc[palavra] = (acc[palavra] || 0) + 1;
    return acc;
  }, {});
}`,
    tests: [
      { input: ["oi oi hello oi"], expected: { oi: 3, hello: 1 }, label: 'contarOcorrencias("oi oi hello oi")' },
      { input: ["PHP php PHP"], expected: { php: 3 }, label: 'contarOcorrencias("PHP php PHP")' }
    ]
  },
  fizzBuzz: {
    fn: "fizzBuzz",
    title: "Desafio 6: FizzBuzz (Condicionais + Laços)",
    desc: "Crie uma função `fizzBuzz(n)` que retorne um array de strings de 1 até n. Para múltiplos de 3 use \"Fizz\", para múltiplos de 5 use \"Buzz\", para múltiplos de ambos use \"FizzBuzz\"; nos demais casos, o próprio número como string.",
    starterCode: `function fizzBuzz(n) {
  // Dica: teste primeiro o caso "múltiplo de 3 e de 5"
  const resultado = [];
  // Seu código aqui
  return resultado;
}`,
    tests: [
      { input: [1], expected: ["1"], label: "fizzBuzz(1)" },
      { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"], label: "fizzBuzz(5)" },
      { input: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"], label: "fizzBuzz(15)" },
      { input: [0], expected: [], label: "fizzBuzz(0) — sem elementos" }
    ]
  },
  inverterString: {
    fn: "inverterString",
    title: "Desafio 7: Inverter uma String",
    desc: "Crie uma função `inverterString(texto)` que retorne o texto escrito de trás para frente. Tente resolver sem usar `.reverse()` (use um laço ou `reduce`).",
    starterCode: `function inverterString(texto) {
  // Seu código aqui
}`,
    tests: [
      { input: ["abc"], expected: "cba", label: 'inverterString("abc")' },
      { input: ["Programacao"], expected: "oacamargorP", label: 'inverterString("Programacao")' },
      { input: [""], expected: "", label: 'inverterString("") — string vazia' },
      { input: ["a b"], expected: "b a", label: 'inverterString("a b") — com espaço' }
    ]
  },
  maiorElemento: {
    fn: "maiorElemento",
    title: "Desafio 8: Maior Elemento do Array",
    desc: "Crie uma função `maiorElemento(arr)` que retorne o maior número do array, sem usar `Math.max`. Se o array estiver vazio, retorne `null`.",
    starterCode: `function maiorElemento(arr) {
  // Seu código aqui (sem Math.max)
}`,
    tests: [
      { input: [[3, 9, 2]], expected: 9, label: "maiorElemento([3, 9, 2])" },
      { input: [[-5, -1, -9]], expected: -1, label: "maiorElemento([-5, -1, -9]) — só negativos" },
      { input: [[7]], expected: 7, label: "maiorElemento([7])" },
      { input: [[]], expected: null, label: "maiorElemento([]) — vazio retorna null" }
    ]
  },
  ehPrimo: {
    fn: "ehPrimo",
    title: "Desafio 9: Número Primo",
    desc: "Crie uma função `ehPrimo(n)` que retorne `true` se `n` for um número primo e `false` caso contrário. Atenção: 0, 1 e números negativos não são primos.",
    starterCode: `function ehPrimo(n) {
  // Dica: basta testar divisores até a raiz quadrada de n
}`,
    tests: [
      { input: [2], expected: true, label: "ehPrimo(2)" },
      { input: [17], expected: true, label: "ehPrimo(17)" },
      { input: [1], expected: false, label: "ehPrimo(1)" },
      { input: [0], expected: false, label: "ehPrimo(0)" },
      { input: [-7], expected: false, label: "ehPrimo(-7)" },
      { input: [21], expected: false, label: "ehPrimo(21)" },
      { input: [97], expected: true, label: "ehPrimo(97)" }
    ]
  },
  fibonacci: {
    fn: "fibonacci",
    title: "Desafio 10: Sequência de Fibonacci",
    desc: "Crie uma função `fibonacci(n)` que retorne o n-ésimo termo da sequência (0, 1, 1, 2, 3, 5, 8...), onde fibonacci(0) = 0 e fibonacci(1) = 1. Prefira uma solução iterativa (mais eficiente que a recursiva ingênua).",
    starterCode: `function fibonacci(n) {
  // Seu código aqui
}`,
    tests: [
      { input: [0], expected: 0, label: "fibonacci(0)" },
      { input: [1], expected: 1, label: "fibonacci(1)" },
      { input: [2], expected: 1, label: "fibonacci(2)" },
      { input: [10], expected: 55, label: "fibonacci(10)" },
      { input: [30], expected: 832040, label: "fibonacci(30)" }
    ]
  },
  contarVogais: {
    fn: "contarVogais",
    title: "Desafio 11: Contar Vogais",
    desc: "Crie uma função `contarVogais(texto)` que retorne quantas vogais (a, e, i, o, u) existem no texto, ignorando maiúsculas/minúsculas. Considere apenas vogais sem acento.",
    starterCode: `function contarVogais(texto) {
  // Seu código aqui
}`,
    tests: [
      { input: ["banana"], expected: 3, label: 'contarVogais("banana")' },
      { input: ["PROGRAMACAO"], expected: 5, label: 'contarVogais("PROGRAMACAO")' },
      { input: ["xyz"], expected: 0, label: 'contarVogais("xyz")' },
      { input: [""], expected: 0, label: 'contarVogais("")' }
    ]
  },
  removerDuplicados: {
    fn: "removerDuplicados",
    title: "Desafio 12: Remover Duplicados",
    desc: "Crie uma função `removerDuplicados(arr)` que retorne um novo array sem elementos repetidos, mantendo a ordem da primeira ocorrência de cada elemento.",
    starterCode: `function removerDuplicados(arr) {
  // Dica: estruturas como Set ajudam bastante
}`,
    tests: [
      { input: [[1, 2, 2, 3, 1]], expected: [1, 2, 3], label: "removerDuplicados([1,2,2,3,1])" },
      { input: [["a", "b", "a"]], expected: ["a", "b"], label: 'removerDuplicados(["a","b","a"])' },
      { input: [[5, 5, 5]], expected: [5], label: "removerDuplicados([5,5,5])" },
      { input: [[]], expected: [], label: "removerDuplicados([])" }
    ]
  },
  somarDigitos: {
    fn: "somarDigitos",
    title: "Desafio 13: Soma dos Dígitos",
    desc: "Crie uma função `somarDigitos(n)` que receba um inteiro não-negativo e retorne a soma de seus dígitos (ex: 123 → 1 + 2 + 3 = 6).",
    starterCode: `function somarDigitos(n) {
  // Dica: use % 10 para pegar o último dígito e Math.floor(n / 10) para removê-lo
}`,
    tests: [
      { input: [123], expected: 6, label: "somarDigitos(123)" },
      { input: [0], expected: 0, label: "somarDigitos(0)" },
      { input: [9999], expected: 36, label: "somarDigitos(9999)" },
      { input: [100], expected: 1, label: "somarDigitos(100)" }
    ]
  },
  saoAnagramas: {
    fn: "saoAnagramas",
    title: "Desafio 14: Anagramas",
    desc: "Crie uma função `saoAnagramas(a, b)` que retorne `true` se as duas palavras usam exatamente as mesmas letras na mesma quantidade (ignorando maiúsculas/minúsculas e espaços).",
    starterCode: `function saoAnagramas(a, b) {
  // Dica: normalize, ordene as letras e compare
}`,
    tests: [
      { input: ["amor", "roma"], expected: true, label: 'saoAnagramas("amor", "roma")' },
      { input: ["Listen", "Silent"], expected: true, label: 'saoAnagramas("Listen", "Silent")' },
      { input: ["casa", "caso"], expected: false, label: 'saoAnagramas("casa", "caso")' },
      { input: ["aab", "abb"], expected: false, label: 'saoAnagramas("aab", "abb") — mesma letra, contagens diferentes' },
      { input: ["a b c", "cba"], expected: true, label: 'saoAnagramas("a b c", "cba") — ignora espaços' }
    ]
  },
  buscaBinaria: {
    fn: "buscaBinaria",
    title: "Desafio 15: Busca Binária",
    desc: "Crie uma função `buscaBinaria(arr, alvo)` que receba um array de números JÁ ORDENADO de forma crescente e retorne o índice de `alvo`, ou `-1` se ele não existir. Use busca binária (dividir o intervalo ao meio), não `indexOf`.",
    starterCode: `function buscaBinaria(arr, alvo) {
  let inicio = 0;
  let fim = arr.length - 1;
  // Seu código aqui
  return -1;
}`,
    tests: [
      { input: [[1, 3, 5, 7, 9], 7], expected: 3, label: "buscaBinaria([1,3,5,7,9], 7)" },
      { input: [[1, 3, 5, 7, 9], 1], expected: 0, label: "buscaBinaria([1,3,5,7,9], 1) — primeiro" },
      { input: [[1, 3, 5, 7, 9], 9], expected: 4, label: "buscaBinaria([1,3,5,7,9], 9) — último" },
      { input: [[1, 3, 5, 7, 9], 4], expected: -1, label: "buscaBinaria([1,3,5,7,9], 4) — ausente" },
      { input: [[], 1], expected: -1, label: "buscaBinaria([], 1) — vazio" }
    ]
  },
  parentesesBalanceados: {
    fn: "parentesesBalanceados",
    title: "Desafio 16: Parênteses Balanceados (Pilha)",
    desc: "Crie uma função `parentesesBalanceados(texto)` que retorne `true` se todos os (), [] e {} do texto estão fechados na ordem correta. Outros caracteres devem ser ignorados.",
    starterCode: `function parentesesBalanceados(texto) {
  const pilha = [];
  // Dica: empilhe aberturas e, ao encontrar um fechamento, compare com o topo da pilha
  return false;
}`,
    tests: [
      { input: ["(a + b) * [c]"], expected: true, label: 'parentesesBalanceados("(a + b) * [c]")' },
      { input: ["{[()]}"], expected: true, label: 'parentesesBalanceados("{[()]}")' },
      { input: ["(]"], expected: false, label: 'parentesesBalanceados("(]") — tipos trocados' },
      { input: ["(()"], expected: false, label: 'parentesesBalanceados("(()") — falta fechar' },
      { input: [")("], expected: false, label: 'parentesesBalanceados(")(") — ordem invertida' },
      { input: [""], expected: true, label: 'parentesesBalanceados("") — vazio' }
    ]
  }
};

let currentSelectedChallenge = "fatorial";

function initChallengeArena() {
  const challengeSelect = document.getElementById("challenge-select");
  const descEl = document.getElementById("challenge-desc");
  const editorEl = document.getElementById("challenge-editor");
  const runBtn = document.getElementById("run-tests-btn");
  const resultsContainer = document.getElementById("challenge-test-results");

  if (!editorEl || !runBtn) return;

  // Popula o select a partir de codingChallenges (fonte única de verdade)
  if (challengeSelect) {
    challengeSelect.innerHTML = "";
    Object.keys(codingChallenges).forEach((key) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = codingChallenges[key].title;
      challengeSelect.appendChild(opt);
    });
  }

  function loadChallenge(key) {
    currentSelectedChallenge = key;
    const challenge = codingChallenges[key];
    if (!challenge) return;

    if (descEl) descEl.textContent = challenge.desc;
    if (editorEl) editorEl.value = challenge.starterCode;
    if (resultsContainer) resultsContainer.textContent = "Clique em 'Executar Testes Automatizados' para testar sua função.";
  }

  challengeSelect?.addEventListener("change", (e) => {
    loadChallenge(e.target.value);
  });

  runBtn.addEventListener("click", () => {
    const challenge = codingChallenges[currentSelectedChallenge];
    if (!challenge) return;

    const userCode = editorEl.value;
    resultsContainer.innerHTML = "⏳ Executando bateria de testes...\n";

    try {
      // Create user function in isolated sandbox
      const fnName = challenge.fn;

      const runner = new Function(`${userCode}; return ${fnName};`);
      const userFn = runner();

      if (typeof userFn !== "function") {
        throw new Error(`A função '${fnName}' não foi declarada corretamente.`);
      }

      let passedCount = 0;
      let logs = [];

      challenge.tests.forEach((test, index) => {
        try {
          const actual = userFn(...test.input);
          // Comparação profunda via JSON (cobre primitivos, arrays e objetos)
          const passed = JSON.stringify(actual) === JSON.stringify(test.expected);

          if (passed) {
            passedCount++;
            logs.push(`✅ [PASS] Caso ${index + 1}: ${test.label} => ${JSON.stringify(actual)}`);
          } else {
            logs.push(`❌ [FAIL] Caso ${index + 1}: ${test.label}\n    Esperado: ${JSON.stringify(test.expected)}\n    Recebido: ${JSON.stringify(actual)}`);
          }
        } catch (testErr) {
          logs.push(`❌ [ERRO] Caso ${index + 1}: ${test.label} disparou erro: ${testErr.message}`);
        }
      });

      const summaryColor = passedCount === challenge.tests.length ? "#4ade80" : "#f87171";
      const summaryText = `\n=========================================\nRELATÓRIO: ${passedCount} de ${challenge.tests.length} testes aprovados (${Math.round((passedCount/challenge.tests.length)*100)}%)\n=========================================`;

      resultsContainer.innerHTML = logs.join("\n") + `<span style="color:${summaryColor}; font-weight:bold;">${summaryText}</span>`;

    } catch (err) {
      resultsContainer.textContent = `❌ Erro de Sintaxe ou Execução:\n${err.message}`;
    }
  });

  loadChallenge("fatorial");
}

/* ==========================================================================
   SIMULADOR DE TESTES DE CONHECIMENTO & QUESTÕES FORMATIVAS
   ========================================================================== */
const examQuestionsData = [
  {
    id: 1,
    title: "Questão 1: Gerenciamento de Memória em Linguagem C",
    question: "O que acontece na linguagem C quando um ponteiro continua apontando para uma área de memória após ela ser liberada com a função free()?",
    options: [
      { text: "A) A memória é limpa automaticamente pelo Garbage Collector sem riscos.", correct: false },
      { text: "B) O ponteiro torna-se um 'Dangling Pointer' (Ponteiro Solto), podendo causar falha de segmentação ou corrupção de dados ao ser acessado.", correct: true },
      { text: "C) O compilador emite um erro de compilação em tempo de execução e encerra o sistema.", correct: false },
      { text: "D) O ponteiro é redefinido para NULL automaticamente pelo sistema operacional.", correct: false }
    ],
    feedback: "✅ Correto! Em C, liberar a memória com free() apenas devolve o bloco ao heap, mas não altera o valor do endereço guardado no ponteiro. Acessá-lo gera comportamento indefinido (Use-After-Free)."
  },
  {
    id: 2,
    title: "Questão 2: Precisão Numérica em COBOL",
    question: "Por que sistemas bancários globais mantêm sistemas legados em COBOL em vez de migrar tudo para linguagens comuns com ponto flutuante binário?",
    options: [
      { text: "A) COBOL é a única linguagem que suporta conexões com a internet.", correct: false },
      { text: "B) COBOL utiliza tipos numéricos decimais exatos (como PIC 9(7)V99), eliminando erros de arredondamento de centavos em operações financeiras de grande volume.", correct: true },
      { text: "C) O código COBOL roda mais rápido que C++ para processamento 3D.", correct: false },
      { text: "D) Porque COBOL não permite criação de funções ou variáveis.", correct: false }
    ],
    feedback: "✅ Correto! O ponto flutuante padrão IEEE 754 (usado em Python, JS e C) gera pequenas imprecisões binárias (ex: 0.1 + 0.2 = 0.30000000000000004). O COBOL faz aritmética decimal exata, crucial para bancos."
  },
  {
    id: 3,
    title: "Questão 3: Neurociência da Aprendizagem",
    question: "Qual das técnicas abaixo produz a maior taxa de retenção de conhecimento a longo prazo segundo evidências de neurociência cognitiva?",
    options: [
      { text: "A) Releitura passiva do mesmo texto 5 vezes e destacar linhas com marca-texto.", correct: false },
      { text: "B) Prática de Recuperação Ativa (Retrieval Practice) intercalada com Repetição Espaçada.", correct: true },
      { text: "C) Assistir a vídeos explicativos de 3 horas na véspera da prova sem pausas.", correct: false },
      { text: "D) Decorar resumos prontos de terceiros sem tentar explicar com suas próprias palavras.", correct: false }
    ],
    feedback: "✅ Exato! Recuperar ativamente a informação da memória (sem consulta) e espaçar o estudo em intervalos de dias reconstrói e fortalece as trilhas neurais."
  },
  {
    id: 4,
    title: "Questão 4: Complexidade de Algoritmos",
    question: "Qual é a complexidade de tempo da busca binária em um array ordenado com n elementos?",
    options: [
      { text: "A) O(n), pois percorre todos os elementos.", correct: false },
      { text: "B) O(log n), pois descarta metade do intervalo a cada comparação.", correct: true },
      { text: "C) O(n²), pois compara cada par de elementos.", correct: false },
      { text: "D) O(1), pois sempre acha o valor na primeira tentativa.", correct: false }
    ],
    feedback: "✅ Correto! A cada passo o espaço de busca cai pela metade: para 1 milhão de itens bastam cerca de 20 comparações. O requisito é que o array esteja ordenado."
  },
  {
    id: 5,
    title: "Questão 5: Estruturas de Dados",
    question: "Qual estrutura de dados segue a regra LIFO (Last In, First Out) e é ideal para validar parênteses balanceados e implementar o botão 'Desfazer'?",
    options: [
      { text: "A) Fila (Queue).", correct: false },
      { text: "B) Pilha (Stack).", correct: true },
      { text: "C) Tabela Hash.", correct: false },
      { text: "D) Lista de adjacência.", correct: false }
    ],
    feedback: "✅ Exato! Na pilha o último elemento inserido é o primeiro a sair. Isso espelha o aninhamento de parênteses e a ordem de ações a desfazer."
  },
  {
    id: 6,
    title: "Questão 6: Recursão",
    question: "O que acontece com uma função recursiva que não possui um caso base?",
    options: [
      { text: "A) Ela retorna 0 automaticamente.", correct: false },
      { text: "B) Ela se chama indefinidamente até estourar a pilha de chamadas (Stack Overflow).", correct: true },
      { text: "C) O compilador converte a recursão em um laço for.", correct: false },
      { text: "D) Ela executa apenas uma vez e termina normalmente.", correct: false }
    ],
    feedback: "✅ Correto! Todo caso recursivo precisa caminhar para um caso base que interrompa as chamadas. Sem ele, cada chamada consome um frame de pilha até esgotar a memória."
  },
  {
    id: 7,
    title: "Questão 7: Comparação em JavaScript",
    question: "Qual é o resultado da expressão `0 == '0'` e de `0 === '0'` em JavaScript, respectivamente?",
    options: [
      { text: "A) false e false.", correct: false },
      { text: "B) true e false — o operador == converte tipos; o === compara valor e tipo.", correct: true },
      { text: "C) true e true.", correct: false },
      { text: "D) false e true.", correct: false }
    ],
    feedback: "✅ Correto! O `==` faz coerção de tipos (a string '0' vira o número 0), enquanto o `===` exige o mesmo tipo e o mesmo valor. Prefira sempre `===`."
  },
  {
    id: 8,
    title: "Questão 8: Segurança — SQL Injection",
    question: "Qual é a defesa mais eficaz contra SQL Injection ao montar consultas com dados vindos do usuário?",
    options: [
      { text: "A) Concatenar a entrada do usuário na string SQL e remover aspas simples manualmente.", correct: false },
      { text: "B) Usar consultas parametrizadas (prepared statements), separando o código SQL dos dados.", correct: true },
      { text: "C) Validar a entrada apenas no JavaScript do navegador.", correct: false },
      { text: "D) Esconder o formulário de login com CSS.", correct: false }
    ],
    feedback: "✅ Exato! Com parâmetros, o banco trata a entrada sempre como dado, nunca como código executável. Validação no cliente pode ser contornada e não substitui a do servidor."
  },
  {
    id: 9,
    title: "Questão 9: Tipos de Passagem em Python",
    question: "Em Python, o que acontece ao executar `b = a` quando `a` é uma lista e depois `b.append(1)`?",
    options: [
      { text: "A) `a` permanece inalterada, pois `b` é uma cópia independente.", correct: false },
      { text: "B) `a` também é modificada, pois ambos os nomes referenciam o mesmo objeto lista.", correct: true },
      { text: "C) Python lança um erro de tipo.", correct: false },
      { text: "D) A lista `a` é esvaziada.", correct: false }
    ],
    feedback: "✅ Correto! A atribuição copia a referência, não o objeto. Para duplicar a lista use `a.copy()`, `list(a)` ou `a[:]`."
  },
  {
    id: 10,
    title: "Questão 10: Controle de Versão",
    question: "Qual é a principal função do comando `git commit`?",
    options: [
      { text: "A) Enviar as alterações para o repositório remoto.", correct: false },
      { text: "B) Registrar um instantâneo (snapshot) das alterações da área de preparação no histórico local.", correct: true },
      { text: "C) Baixar as alterações de outros desenvolvedores.", correct: false },
      { text: "D) Apagar o histórico do repositório.", correct: false }
    ],
    feedback: "✅ Exato! O commit grava localmente o estado preparado com `git add`. O envio ao remoto é feito por `git push`, e o download por `git fetch`/`git pull`."
  },
  {
    id: 11,
    title: "Questão 11: Paradigmas",
    question: "Qual característica define uma função pura na programação funcional?",
    options: [
      { text: "A) Sempre usa variáveis globais para guardar resultados.", correct: false },
      { text: "B) Para as mesmas entradas devolve sempre a mesma saída e não causa efeitos colaterais.", correct: true },
      { text: "C) Só pode ser escrita em linguagens compiladas.", correct: false },
      { text: "D) Não aceita parâmetros.", correct: false }
    ],
    feedback: "✅ Correto! Funções puras são previsíveis e fáceis de testar, pois dependem apenas dos argumentos e não alteram estado externo (I/O, variáveis globais, etc.)."
  },
  {
    id: 12,
    title: "Questão 12: Teste de Software",
    question: "Qual é o objetivo principal de um teste unitário?",
    options: [
      { text: "A) Validar o sistema completo, incluindo banco de dados e interface, de ponta a ponta.", correct: false },
      { text: "B) Verificar de forma isolada e automática o comportamento de uma pequena unidade de código, como uma função.", correct: true },
      { text: "C) Medir a velocidade da conexão de internet do usuário.", correct: false },
      { text: "D) Substituir a revisão de código por completo.", correct: false }
    ],
    feedback: "✅ Exato! Testes unitários são rápidos, isolados e repetíveis, e funcionam como rede de segurança ao refatorar. É exatamente o que a Arena acima faz com suas funções."
  }
];

/** Fisher-Yates shuffle — retorna nova cópia embaralhada sem mutar o original */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function initExamQuiz() {
  const container = document.getElementById("exam-quiz-container");
  if (!container) return;

  // Mantém as questões em ordem crescente (1, 2, 3, ...)
  const questoesOrdenadas = [...examQuestionsData].sort((a, b) => a.id - b.id);

  container.innerHTML = questoesOrdenadas.map((q) => {
    // Embaralha também as alternativas de cada questão
    const opcoesEmbaralhadas = shuffleArray(q.options);

    return `
    <div class="exam-quiz-card" id="exam-card-${q.id}">
      <h4 style="font-size:1.15rem; font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">${q.title}</h4>
      <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:1rem;">${q.question}</p>

      <div class="exam-options-list">
        ${opcoesEmbaralhadas.map((opt, optIndex) => `
          <button class="exam-option-btn"
                  data-correct="${opt.correct}"
                  onclick="answerExamQuestion(${q.id}, ${optIndex}, ${opt.correct})">
            ${opt.text}
          </button>
        `).join("")}
      </div>

      <div class="exam-feedback-box" id="exam-feedback-${q.id}"></div>
    </div>
  `;
  }).join("");
}

window.answerExamQuestion = function(questionId, optionIndex, isCorrect) {
  const card = document.getElementById(`exam-card-${questionId}`);
  if (!card) return;

  const buttons = card.querySelectorAll(".exam-option-btn");
  const feedbackBox = document.getElementById(`exam-feedback-${questionId}`);
  const qData = examQuestionsData.find(q => q.id === questionId);

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    // Lê o atributo data-correct gravado no botão durante a renderização
    // (não depende do índice do array original, que está numa ordem diferente após embaralhar)
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (idx === optionIndex && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });

  if (feedbackBox) {
    feedbackBox.style.display = "block";
    if (isCorrect) {
      feedbackBox.style.background = "var(--accent-green-light)";
      feedbackBox.style.color = "var(--accent-green)";
      feedbackBox.style.border = "1px solid rgba(22, 163, 74, 0.3)";
      feedbackBox.innerHTML = qData.feedback;
    } else {
      feedbackBox.style.background = "var(--accent-rose-light)";
      feedbackBox.style.color = "var(--accent-rose)";
      feedbackBox.style.border = "1px solid rgba(225, 29, 72, 0.3)";
      feedbackBox.innerHTML = `❌ Resposta Incorreta. Revise o conceito!<br>${qData.feedback}`;
    }
  }
};

/* ==========================================================================
   BATERIA DE TESTES AUTOMATIZADOS DO PRÓPRIO SISTEMA (SANITY TESTS)
   ========================================================================== */
function runSystemSelfTests() {
  const tests = [
    { name: "Verificação de 8 Metodologias Ativas carregadas", pass: methodologiesData.length >= 8 },
    { name: "Verificação de 6 Níveis da Taxonomia de Bloom", pass: Object.keys(bloomData).length === 6 },
    { name: "Verificação de 10 Linguagens no Comparador de Sintaxe", pass: Object.keys(syntaxComparisonData.hello.examples).length >= 10 },
    { name: "Verificação de Flashcards Ativos no Deck", pass: flashcardsList.length >= 6 },
    { name: "Teste Unitário: Fatorial de 5 == 120", pass: (function(n){let r=1;for(let i=2;i<=n;i++)r*=i;return r;})(5) === 120 },
    { name: "Teste Unitário: Palíndromo 'arara' == true", pass: "arara" === "arara".split("").reverse().join("") },
    { name: "Arena: ao menos 16 desafios cadastrados", pass: Object.keys(codingChallenges).length >= 16 },
    { name: "Arena: todo desafio possui fn, starterCode e testes", pass: Object.values(codingChallenges).every(c => c.fn && c.starterCode && c.tests.length > 0) },
    { name: "Quiz: ao menos 12 questões com exatamente 1 correta", pass: examQuestionsData.length >= 12 && examQuestionsData.every(q => q.options.filter(o => o.correct).length === 1) }
  ];

  console.log("=== BATERIA DE TESTES DO SISTEMA EDUMETODOLOGIAS ===");
  tests.forEach((t, i) => {
    console.log(`${t.pass ? "✅" : "❌"} [TESTE ${i+1}] ${t.name}: ${t.pass ? "PASSED" : "FAILED"}`);
  });
}

// Injetar nos listeners principais
document.addEventListener("DOMContentLoaded", () => {
  initChallengeArena();
  initExamQuiz();
  runSystemSelfTests();
});

/* ==========================================================================
   FUNÇÕES GLOBAIS: TOGGLES DOS DESAFIOS E DICAS (CHALLENGE + HINT ACCORDION)
   ========================================================================== */

/**
 * Abre/fecha o corpo de um bloco de desafio por seção de linguagem.
 * @param {string} bodyId — ID do elemento .challenge-body a alternar
 */
window.toggleChallenge = function(bodyId) {
  const body = document.getElementById(bodyId);
  if (!body) return;

  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';

  // Atualiza o texto do botão no header correspondente
  const btn = body.previousElementSibling?.querySelector('.challenge-toggle-btn');
  if (btn) {
    btn.textContent = isOpen ? 'Ver Desafio ▼' : 'Fechar ▲';
  }
};

/**
 * Abre/fecha uma dica específica dentro de um desafio.
 * @param {string} hintId — ID do elemento .hint-content a alternar
 */
window.toggleHint = function(hintId) {
  const hint = document.getElementById(hintId);
  if (!hint) return;

  const isOpen = hint.style.display !== 'none';
  hint.style.display = isOpen ? 'none' : 'block';

  // Atualiza a aparência do botão correspondente
  const btn = hint.previousElementSibling;
  if (btn && btn.classList.contains('hint-btn')) {
    btn.style.borderBottomLeftRadius = isOpen ? '' : '0';
    btn.style.borderBottomRightRadius = isOpen ? '' : '0';
    btn.style.borderBottom = isOpen ? '' : 'none';
  }
};

/* ==========================================================================
   MINI QUIZ — Iniciantes (checkBQ)
   ========================================================================== */
function checkBQ(btn, isCorrect) {
  // Disable all sibling buttons
  const options = btn.closest('.beginner-quiz-options');
  if (!options) return;
  options.querySelectorAll('.bq-btn').forEach(b => {
    b.disabled = true;
    b.classList.remove('correct', 'incorrect');
  });
  btn.classList.add(isCorrect ? 'correct' : 'incorrect');

  // Show feedback
  const feedback = btn.closest('.beginner-quiz-box').querySelector('.bq-feedback');
  if (feedback) {
    feedback.style.display = 'block';
    if (isCorrect) {
      feedback.textContent = '✅ Correto! Muito bem!';
      feedback.className = 'bq-feedback ok';
    } else {
      // Highlight correct answer
      options.querySelectorAll('.bq-btn').forEach(b => {
        if (b.getAttribute('onclick') && b.getAttribute('onclick').includes('true')) {
          b.classList.add('correct');
        }
      });
      feedback.textContent = '❌ Não é essa. A resposta correta está destacada em verde.';
      feedback.className = 'bq-feedback err';
    }
  }
}


// ============================================================
//  LABORATÓRIO DE LÓGICA PURA — Knowledge Base + Engine
// ============================================================

const LOGICA_TOPICS = {
  seq: {
    name: '📋 Sequência Lógica',
    badge: 'Fundamento #1',
    definition: 'Sequência é o princípio mais básico da lógica de programação: o computador executa as instruções <strong>uma por uma, na ordem exata em que aparecem</strong>. Alterar a ordem altera o resultado — assim como uma receita de bolo que assa antes de misturar produz algo incomestível.',
    quote: '"Um algoritmo deve ter uma sequência finita e ordenada de passos bem definidos." — Donald Knuth, <em>The Art of Computer Programming</em>',
    concepts: [
      { title: 'Fluxo Linear', desc: 'O programa começa na linha 1 e avança linha a linha. Não há saltos, decisões ou repetições — apenas avanço.' },
      { title: 'Dependência de Ordem', desc: 'Cada instrução pode depender do resultado da anterior. Somar dois números antes de lê-los produz lixo ou erro.' },
      { title: 'Estado do Programa', desc: 'A cada instrução executada, o estado interno (valores em memória) muda. A sequência define como esse estado evolui.' },
      { title: 'Determinismo', desc: 'Para os mesmos dados de entrada e a mesma sequência, o resultado é sempre idêntico — isso é previsibilidade computacional.' }
    ],
    pseudocode: `INÍCIO
  LER nome
  LER idade
  CALCULAR anoNascimento ← anoAtual - idade
  EXIBIR "Olá, " + nome
  EXIBIR "Você nasceu em " + anoNascimento
FIM`,
    realExample: `# Python — sequência pura
nome = input("Seu nome: ")
idade = int(input("Sua idade: "))
ano_nascimento = 2024 - idade
print(f"Olá, {nome}!")
print(f"Você nasceu em {ano_nascimento}")`,
    traceTable: [
      { step: 1, variable: 'nome', value: '"Maria"', note: 'Leitura do teclado' },
      { step: 2, variable: 'idade', value: '22', note: 'Leitura e conversão para inteiro' },
      { step: 3, variable: 'ano_nascimento', value: '2002', note: '2024 - 22 = 2002' },
      { step: 4, variable: '(saída)', value: '"Olá, Maria!"', note: 'print executado' },
      { step: 5, variable: '(saída)', value: '"Você nasceu em 2002"', note: 'print executado' }
    ],
    pitfall: 'Tentar exibir <code>anoNascimento</code> antes de calculá-lo — o programa lançaria NameError em Python ou exibiria valor indefinido em outras linguagens.',
    tip: 'Antes de codificar, escreva o pseudocódigo numerando cada passo. Se os passos não fazem sentido na ordem em que estão, sua lógica ainda precisa de revisão.',
    keywords: ['ordem', 'sequencial', 'linha', 'instrução', 'passo', 'passo a passo', 'execução', 'linear', 'fluxo', 'consecutivo', 'uma por uma', 'um por um', 'receita', 'procedimento', 'estado', 'dependência', 'determinismo'],
    misconceptions: [
      { wrong: 'O computador "lê" o programa todo antes de executar', why: 'Na execução sequencial interpretada, cada linha é executada na ordem — o computador não "pré-visualiza" o código.' },
      { wrong: 'A ordem das instruções não importa se o resultado for o mesmo', why: 'Pode parecer igual em casos simples, mas operações com efeitos colaterais (I/O, banco de dados) sempre dependem de ordem.' }
    ],
    idealExplanation: 'Sequência lógica significa que o computador executa instruções em ordem, uma por vez, da primeira à última. Cada instrução pode depender da anterior. Mudar a ordem muda o resultado. É o alicerce de todo algoritmo.'
  },

  var: {
    name: '📦 Variáveis e Memória',
    badge: 'Fundamento #2',
    definition: 'Uma variável é um <strong>espaço nomeado na memória RAM</strong> que armazena um valor temporariamente durante a execução. O nome é o endereço simbólico; o valor é o conteúdo. Toda computação significativa manipula variáveis.',
    quote: '"Nomear é o ato mais poderoso em programação. Um bom nome torna o código autodocumentado." — Robert C. Martin, <em>Clean Code</em>',
    concepts: [
      { title: 'Declaração vs. Atribuição', desc: 'Declarar reserva espaço na memória. Atribuir coloca um valor nesse espaço. Em Python ambos ocorrem juntos; em C/Java são separados.' },
      { title: 'Tipo de Dado', desc: 'O tipo define quantos bytes são reservados e quais operações são válidas. int, float, str, bool são os tipos primitivos universais.' },
      { title: 'Escopo', desc: 'Uma variável existe em um escopo (local/global). Fora do escopo ela é invisível — isso protege dados e evita colisões de nomes.' },
      { title: 'Mutabilidade', desc: 'A maioria das variáveis pode ter seu valor trocado a qualquer momento (mutável). Constantes são imutáveis por convenção ou linguagem.' }
    ],
    pseudocode: `INÍCIO
  DECLARAR inteiro: idade
  DECLARAR texto: nome
  DECLARAR real: altura
  
  nome   ← "João"
  idade  ← 25
  altura ← 1.80
  
  EXIBIR nome + " tem " + idade + " anos e " + altura + "m"
FIM`,
    realExample: `# Python — variáveis e tipos
nome: str   = "João"
idade: int  = 25
altura: float = 1.80
ativo: bool = True

print(f"{nome} tem {idade} anos, {altura}m — Ativo: {ativo}")

# Reatribuição
idade = 26          # memória atualizada
print(f"Aniversário! Agora tem {idade} anos")`,
    traceTable: [
      { step: 1, variable: 'nome', value: '"João"', note: 'str — 4 chars' },
      { step: 2, variable: 'idade', value: '25', note: 'int — 28 bytes em CPython' },
      { step: 3, variable: 'altura', value: '1.8', note: 'float — ponto flutuante IEEE 754' },
      { step: 4, variable: 'ativo', value: 'True', note: 'bool — subclasse de int em Python' },
      { step: 5, variable: 'idade', value: '26', note: 'reatribuição — valor anterior descartado' }
    ],
    pitfall: 'Usar uma variável antes de atribuir um valor a ela. Em Python isso gera <code>NameError: name "x" is not defined</code>.',
    tip: 'Use nomes descritivos: <code>idade_usuario</code> é melhor que <code>x</code>. Após 3 meses, você não se lembrará do que <code>x</code> representa.',
    keywords: ['variável', 'memória', 'valor', 'tipo', 'declarar', 'atribuir', 'int', 'float', 'string', 'bool', 'escopo', 'nome', 'armazenar', 'dado', 'constante', 'mutável', 'reatribuição'],
    misconceptions: [
      { wrong: 'Variável e constante são a mesma coisa', why: 'Constantes não mudam de valor após definidas. Variáveis podem ser reatribuídas a qualquer momento.' },
      { wrong: 'O nome da variável é guardado na memória em tempo de execução', why: 'Compiladores/interpretadores usam os nomes apenas para gerar código. Em tempo de execução, trabalha-se com endereços de memória.' }
    ],
    idealExplanation: 'Variáveis são espaços nomeados na memória que guardam valores temporários. Têm um nome, um tipo de dado e um valor. Podem ser reatribuídas. Existem dentro de um escopo. São o ingrediente fundamental de qualquer algoritmo.'
  },

  cond: {
    name: '🔀 Condicionais',
    badge: 'Fundamento #3',
    definition: 'Condicionais permitem que o programa <strong>tome decisões</strong>: execute um bloco de código se uma condição for verdadeira, outro se for falsa. Sem condicionais, todo programa seguiria um único caminho — sem inteligência.',
    quote: '"Toda inteligência artificial, no fundo, é uma cascata de if-else bem construídos." — Anônimo (amplamente citado em CS)',
    concepts: [
      { title: 'Expressão Booleana', desc: 'Toda condição avalia para True ou False. Operadores: ==, !=, >, <, >=, <=, and, or, not.' },
      { title: 'if / else if / else', desc: 'Estrutura de decisão hierárquica. Apenas o primeiro bloco verdadeiro é executado; os demais são ignorados.' },
      { title: 'Condicionais Aninhadas', desc: 'Um if dentro de outro if. Aumenta a granularidade das decisões, mas também a complexidade cognitiva — use com moderação.' },
      { title: 'Short-circuit', desc: 'Em "A and B", se A for False, B não é avaliado. Em "A or B", se A for True, B não é avaliado. Isso tem impacto em performance e efeitos colaterais.' }
    ],
    pseudocode: `INÍCIO
  LER nota
  SE nota >= 7.0 ENTÃO
    EXIBIR "Aprovado!"
  SENÃO SE nota >= 5.0 ENTÃO
    EXIBIR "Recuperação"
  SENÃO
    EXIBIR "Reprovado"
  FIM SE
FIM`,
    realExample: `# Python — condicionais
nota = float(input("Digite a nota (0–10): "))

if nota >= 7.0:
    situacao = "✅ Aprovado"
elif nota >= 5.0:
    situacao = "⚠️ Recuperação"
else:
    situacao = "❌ Reprovado"

print(f"Situação: {situacao}")`,
    traceTable: [
      { step: 1, variable: 'nota', value: '6.5', note: 'leitura' },
      { step: 2, variable: 'nota >= 7.0', value: 'False', note: 'primeiro teste — falhou' },
      { step: 3, variable: 'nota >= 5.0', value: 'True', note: 'segundo teste — passou' },
      { step: 4, variable: 'situacao', value: '"⚠️ Recuperação"', note: 'bloco elif executado' },
      { step: 5, variable: '(saída)', value: '"Situação: ⚠️ Recuperação"', note: 'print' }
    ],
    pitfall: 'Usar <code>=</code> (atribuição) em vez de <code>==</code> (comparação) dentro do if. Em Python isso é SyntaxError; em C/JS é um bug silencioso perigoso.',
    tip: 'Prefira estruturas de dados (dicionários/mapas) a longas cadeias de if-elif quando o número de casos for grande — o código fica mais limpo e fácil de manter.',
    keywords: ['condição', 'decisão', 'if', 'else', 'senão', 'verdadeiro', 'falso', 'booleano', 'comparação', 'operador', 'aninhado', 'caminho', 'desvio', 'teste', 'avaliação', 'or', 'and', 'not'],
    misconceptions: [
      { wrong: 'Todos os blocos do if-elif-else são sempre executados', why: 'Apenas o primeiro bloco cuja condição for verdadeira é executado. Os demais são pulados.' },
      { wrong: '= e == são equivalentes em condicionais', why: '= é atribuição; == é comparação. Confundi-los causa erros sutilíssimos.' }
    ],
    idealExplanation: 'Condicionais fazem o programa tomar decisões. A condição é avaliada como verdadeira ou falsa. Se verdadeira, um bloco é executado; se falsa, outro. Isso dá ao programa capacidade de se comportar de forma diferente para entradas diferentes.'
  },

  loop: {
    name: '🔁 Laços de Repetição',
    badge: 'Fundamento #4',
    definition: 'Laços executam um bloco de código <strong>repetidamente</strong> enquanto uma condição é satisfeita ou para cada elemento de uma coleção. Sem laços, processar 1 milhão de registros exigiria 1 milhão de linhas de código.',
    quote: '"Iteração é o alicerce da computação eficiente. Praticamente toda solução escalável envolve um laço." — Edsger W. Dijkstra',
    concepts: [
      { title: 'while (condição)', desc: 'Repete enquanto a condição for verdadeira. Usado quando não se sabe antecipadamente quantas iterações haverá.' },
      { title: 'for (iteração)', desc: 'Percorre uma sequência (lista, range, string…). Usado quando o número de iterações é definido ou iterando sobre coleções.' },
      { title: 'Variável de Controle', desc: 'Uma variável (contador ou flag) controla quando o laço para. Esquecê-la causa loop infinito.' },
      { title: 'break / continue', desc: 'break interrompe o laço imediatamente; continue pula para a próxima iteração. Ambos alteram o fluxo normal.' }
    ],
    pseudocode: `INÍCIO
  contador ← 1
  ENQUANTO contador <= 5 FAÇA
    EXIBIR "Iteração " + contador
    contador ← contador + 1
  FIM ENQUANTO
  
  PARA cada numero DE 1 ATÉ 10 FAÇA
    SE numero MOD 2 = 0 ENTÃO
      EXIBIR numero + " é par"
    FIM SE
  FIM PARA
FIM`,
    realExample: `# Python — while e for
# While: contagem regressiva
contagem = 5
while contagem > 0:
    print(f"⏱️ {contagem}...")
    contagem -= 1
print("🚀 Lançamento!")

# For: percorrer lista
frutas = ["maçã", "banana", "uva"]
for fruta in frutas:
    print(f"🍎 Fruta: {fruta}")

# For com range: pares de 0 a 10
pares = [n for n in range(11) if n % 2 == 0]
print(f"Pares: {pares}")`,
    traceTable: [
      { step: 1, variable: 'contagem', value: '5', note: 'inicialização' },
      { step: 2, variable: 'contagem > 0', value: 'True', note: 'teste: 5 > 0' },
      { step: 3, variable: 'contagem', value: '4', note: 'decremento' },
      { step: 4, variable: '...', value: '...', note: 'iterações 4, 3, 2, 1' },
      { step: 5, variable: 'contagem > 0', value: 'False', note: 'contagem = 0 → laço termina' }
    ],
    pitfall: 'Esquecer de incrementar o contador no <code>while</code>, criando um loop infinito que trava o programa.',
    tip: 'Antes de codificar um laço, responda: "Qual é a condição de parada?" Se não souber, o loop provavelmente vai se tornar infinito.',
    keywords: ['laço', 'loop', 'repetição', 'while', 'for', 'iterar', 'contador', 'condição de parada', 'break', 'continue', 'infinito', 'percorrer', 'range', 'coleção', 'iteração', 'acumulador'],
    misconceptions: [
      { wrong: 'for e while fazem a mesma coisa e podem sempre ser trocados', why: 'Funcionalmente podem ser equivalentes, mas semanticamente diferem: for é para coleções conhecidas, while para condições arbitrárias.' },
      { wrong: 'break sai do programa inteiro', why: 'break sai apenas do laço mais interno em que está — não do programa.' }
    ],
    idealExplanation: 'Laços repetem um bloco de código. O while repete enquanto uma condição for verdadeira; o for percorre uma coleção. É necessário sempre ter uma condição de parada para evitar loop infinito. break interrompe o laço; continue pula para a próxima iteração.'
  },

  func: {
    name: '🧩 Funções e Modularização',
    badge: 'Fundamento #5',
    definition: 'Uma função é um <strong>bloco de código reutilizável com um nome</strong>. Em vez de repetir as mesmas instruções, você define uma vez e chama quantas vezes precisar. Funções são o principal mecanismo de abstração e organização do código.',
    quote: '"Funções devem fazer uma coisa. Fazê-la bem. Fazê-la apenas." — Robert C. Martin, <em>Clean Code</em>',
    concepts: [
      { title: 'Parâmetros e Argumentos', desc: 'Parâmetros são as variáveis declaradas na função; argumentos são os valores passados na chamada.' },
      { title: 'Retorno (return)', desc: 'Uma função pode retornar um valor ao chamador. Sem return explícito, Python retorna None.' },
      { title: 'Escopo Local', desc: 'Variáveis criadas dentro da função existem apenas ali. Isso evita efeitos colaterais indesejados.' },
      { title: 'Abstração', desc: 'O chamador não precisa saber como a função funciona internamente — só o que ela recebe e o que retorna (interface).' }
    ],
    pseudocode: `FUNÇÃO calcularMedia(nota1, nota2, nota3)
  soma ← nota1 + nota2 + nota3
  media ← soma / 3
  RETORNAR media
FIM FUNÇÃO

INÍCIO
  m1 ← calcularMedia(7.0, 8.5, 6.0)
  m2 ← calcularMedia(5.0, 4.0, 6.5)
  EXIBIR "Turma A: " + m1
  EXIBIR "Turma B: " + m2
FIM`,
    realExample: `# Python — funções
def calcular_media(nota1: float, nota2: float, nota3: float) -> float:
    """Calcula a média aritmética de três notas."""
    return (nota1 + nota2 + nota3) / 3

def classificar(media: float) -> str:
    if media >= 7.0:
        return "Aprovado"
    elif media >= 5.0:
        return "Recuperação"
    return "Reprovado"

# Uso — reutilização sem repetição de código
for notas in [(7, 8.5, 6), (4, 3, 5), (9, 10, 8)]:
    m = calcular_media(*notas)
    print(f"Média {m:.1f} → {classificar(m)}")`,
    traceTable: [
      { step: 1, variable: 'calcular_media(7, 8.5, 6)', value: 'chamada', note: 'passa argumentos' },
      { step: 2, variable: 'nota1, nota2, nota3', value: '7, 8.5, 6', note: 'parâmetros recebem valores' },
      { step: 3, variable: 'return', value: '7.166...', note: '(7+8.5+6)/3' },
      { step: 4, variable: 'm', value: '7.166...', note: 'retorno atribuído à variável' },
      { step: 5, variable: 'classificar(7.166)', value: '"Aprovado"', note: 'segunda função chamada' }
    ],
    pitfall: 'Criar funções que fazem muitas coisas ao mesmo tempo. Uma função que lê dados, processa e imprime resultados é difícil de testar e reutilizar.',
    tip: 'Se você precisar explicar o que uma função faz com "e", ela provavelmente deveria ser dividida em duas funções.',
    keywords: ['função', 'modularização', 'parâmetro', 'argumento', 'retorno', 'return', 'chamar', 'reutilizar', 'abstração', 'escopo', 'def', 'declarar', 'interface', 'bloco', 'procedimento'],
    misconceptions: [
      { wrong: 'Toda função precisa de return', why: 'Funções sem return (procedimentos) são válidas — realizam ações sem produzir um valor de retorno.' },
      { wrong: 'Parâmetro e argumento são o mesmo termo', why: 'Parâmetro é a variável na definição; argumento é o valor passado na chamada.' }
    ],
    idealExplanation: 'Funções são blocos de código nomeados e reutilizáveis. Recebem parâmetros, executam lógica e podem retornar um valor. Cada função deve ter uma única responsabilidade. Elas permitem que o código seja escrito uma vez e usado muitas vezes, tornando o programa mais organizado.'
  },

  vet: {
    name: '📊 Vetores e Matrizes',
    badge: 'Fundamento #6',
    definition: 'Um vetor (array/lista) é uma <strong>coleção de valores do mesmo tipo armazenados em posições contíguas na memória</strong>, acessadas por índice. Matrizes são vetores de vetores — estruturas bidimensionais (linhas × colunas).',
    quote: '"Arrays são a estrutura de dados mais fundamental — tudo mais é construído sobre eles ou como alternativa a eles." — Jon Bentley, <em>Programming Pearls</em>',
    concepts: [
      { title: 'Índice (base 0)', desc: 'O primeiro elemento está no índice 0. Um vetor de 5 elementos tem índices 0 a 4. Acessar índice 5 causa IndexError.' },
      { title: 'Percorrimento', desc: 'Para processar todos os elementos, usa-se um laço for. O padrão mais comum em programação.' },
      { title: 'Operações Comuns', desc: 'Inserir, remover, buscar, ordenar. Cada operação tem custo (complexidade) diferente dependendo da posição.' },
      { title: 'Matriz (2D)', desc: 'Lista de listas. Acesso por dois índices: matrix[linha][coluna]. Usada em imagens, planilhas, grafos.' }
    ],
    pseudocode: `INÍCIO
  DECLARAR notas[5] ← {7.5, 8.0, 6.5, 9.0, 7.0}
  soma ← 0
  
  PARA i DE 0 ATÉ 4 FAÇA
    soma ← soma + notas[i]
  FIM PARA
  
  media ← soma / 5
  EXIBIR "Média da turma: " + media
FIM`,
    realExample: `# Python — listas (vetores) e matrizes
notas = [7.5, 8.0, 6.5, 9.0, 7.0]

# Percorrimento e soma
media = sum(notas) / len(notas)
print(f"Média: {media:.1f}")

# Filtragem
aprovados = [n for n in notas if n >= 7.0]
print(f"Aprovados: {aprovados}")

# Matriz 3x3 (tabuada parcial)
tabuada = [[i * j for j in range(1, 4)] for i in range(1, 4)]
for linha in tabuada:
    print(linha)`,
    traceTable: [
      { step: 1, variable: 'notas[0]', value: '7.5', note: 'primeiro elemento' },
      { step: 2, variable: 'notas[4]', value: '7.0', note: 'último (índice 4 de 5 elementos)' },
      { step: 3, variable: 'sum(notas)', value: '38.0', note: '7.5+8+6.5+9+7' },
      { step: 4, variable: 'media', value: '7.6', note: '38/5' },
      { step: 5, variable: 'aprovados', value: '[7.5, 8.0, 9.0, 7.0]', note: 'filtragem por compreensão' }
    ],
    pitfall: 'Acessar <code>notas[5]</code> em uma lista de 5 elementos (índices 0–4) causa <code>IndexError: list index out of range</code>.',
    tip: 'Ao iterar com índices, use <code>range(len(lista))</code> ou, melhor ainda, itere diretamente com <code>for item in lista</code> quando não precisar do índice.',
    keywords: ['vetor', 'array', 'lista', 'índice', 'matriz', 'coleção', 'posição', 'elemento', 'percorrer', 'iterar', 'tamanho', 'len', 'inserir', 'remover', 'buscar', 'bidimensional'],
    misconceptions: [
      { wrong: 'Vetores começam no índice 1', why: 'Em praticamente todas as linguagens modernas (Python, Java, C, JS), o índice começa em 0.' },
      { wrong: 'Uma lista Python é igual a um array C', why: 'Arrays C têm tipo fixo e tamanho fixo alocado em memória contígua. Listas Python são dinâmicas e armazenam referências a objetos.' }
    ],
    idealExplanation: 'Vetores são coleções de valores acessados por índice numérico, começando em 0. Permitem guardar múltiplos valores em uma única variável. Para processar todos os elementos usa-se um laço. Matrizes são vetores de vetores, com dois índices: linha e coluna.'
  },

  rec: {
    name: '🌀 Recursão',
    badge: 'Fundamento #7',
    definition: 'Recursão é quando uma função <strong>chama a si mesma</strong> para resolver uma versão menor do mesmo problema. É uma forma elegante de resolver problemas que têm estrutura auto-similar. Requer obrigatoriamente um <strong>caso base</strong> para terminar.',
    quote: '"Para entender recursão, primeiro você precisa entender recursão." — Piada clássica de ciência da computação',
    concepts: [
      { title: 'Caso Base', desc: 'A condição de parada da recursão. Sem ela, a função se chamaria infinitamente até esgotar a pilha (stack overflow).' },
      { title: 'Caso Recursivo', desc: 'A função chama a si mesma com um argumento que a aproxima do caso base.' },
      { title: 'Pilha de Chamadas', desc: 'Cada chamada recursiva empilha um novo frame de execução. Python tem limite de ~1000 níveis por padrão.' },
      { title: 'Recursão vs. Iteração', desc: 'Todo problema recursivo pode ser resolvido iterativamente. Recursão é mais elegante; iteração geralmente mais eficiente em memória.' }
    ],
    pseudocode: `FUNÇÃO fatorial(n)
  SE n = 0 OU n = 1 ENTÃO   // caso base
    RETORNAR 1
  SENÃO                       // caso recursivo
    RETORNAR n * fatorial(n - 1)
FIM FUNÇÃO

INÍCIO
  EXIBIR fatorial(5)    // 120
FIM`,
    realExample: `# Python — recursão
def fatorial(n: int) -> int:
    """Calcula n! recursivamente."""
    if n <= 1:          # caso base
        return 1
    return n * fatorial(n - 1)   # caso recursivo

# Rastreamento de fatorial(4):
# fatorial(4) = 4 * fatorial(3)
#             = 4 * 3 * fatorial(2)
#             = 4 * 3 * 2 * fatorial(1)
#             = 4 * 3 * 2 * 1 = 24

print(fatorial(5))   # 120
print(fatorial(0))   # 1`,
    traceTable: [
      { step: 1, variable: 'fatorial(4)', value: 'chama fatorial(3)', note: 'empilha frame' },
      { step: 2, variable: 'fatorial(3)', value: 'chama fatorial(2)', note: 'empilha frame' },
      { step: 3, variable: 'fatorial(2)', value: 'chama fatorial(1)', note: 'empilha frame' },
      { step: 4, variable: 'fatorial(1)', value: '1', note: 'caso base — desempilha' },
      { step: 5, variable: 'resultado', value: '4*3*2*1 = 24', note: 'retornos em cascata' }
    ],
    pitfall: 'Esquecer o caso base ou não progredir em direção a ele — resulta em <code>RecursionError: maximum recursion depth exceeded</code>.',
    tip: 'Ao desenhar uma função recursiva, sempre defina o caso base PRIMEIRO. Se não conseguir enunciar quando a recursão deve parar, você ainda não entendeu o problema.',
    keywords: ['recursão', 'recursiva', 'chamar a si mesmo', 'caso base', 'caso recursivo', 'pilha', 'stack', 'fatorial', 'fibonacci', 'auto-similar', 'subproblema', 'desempilhar', 'frame', 'parada'],
    misconceptions: [
      { wrong: 'Recursão é sempre mais eficiente que loops', why: 'Recursão consome mais memória (pilha de chamadas). Para grandes entradas, a versão iterativa é geralmente mais eficiente.' },
      { wrong: 'Todo problema recursivo é complicado de entender', why: 'Para problemas com estrutura naturalmente recursiva (árvores, fractais), a solução recursiva é mais simples e legível.' }
    ],
    idealExplanation: 'Recursão é quando uma função chama a si mesma. É necessário um caso base (quando parar) e um caso recursivo (que aproxima do caso base). Cada chamada cria um novo frame na pilha. É elegante para problemas auto-similares, mas usa mais memória que iteração.'
  },

  comp: {
    name: '📐 Complexidade e Big-O',
    badge: 'Fundamento #8',
    definition: 'Complexidade de algoritmos mede <strong>como o tempo de execução ou uso de memória cresce</strong> conforme o tamanho da entrada (n) aumenta. A notação Big-O descreve o pior caso. É a linguagem universal para comparar algoritmos.',
    quote: '"A eficiência não é luxo — é necessidade. Um algoritmo O(n²) que roda em 1s para n=1000 levará 16 minutos para n=1.000.000." — Análise clássica de algoritmos',
    concepts: [
      { title: 'O(1) — Constante', desc: 'O tempo não depende do tamanho da entrada. Ex: acessar um elemento de array por índice.' },
      { title: 'O(log n) — Logarítmico', desc: 'Cada iteração divide o problema pela metade. Ex: busca binária em lista ordenada.' },
      { title: 'O(n) — Linear', desc: 'O tempo cresce proporcionalmente à entrada. Ex: percorrer uma lista inteira.' },
      { title: 'O(n²) — Quadrático', desc: 'Dois laços aninhados. Ex: algoritmos ingênuos de ordenação (Bubble Sort). Inaceitável para grandes n.' }
    ],
    pseudocode: `// O(1) — acesso direto
retornar vetor[0]

// O(n) — busca linear
PARA cada item EM vetor:
  SE item = alvo: retornar true

// O(n²) — comparação par a par
PARA i DE 0 ATÉ n:
  PARA j DE 0 ATÉ n:
    comparar vetor[i] e vetor[j]`,
    realExample: `# Python — comparando complexidades
import time

def busca_linear(lista, alvo):    # O(n)
    for item in lista:
        if item == alvo:
            return True
    return False

def busca_binaria(lista, alvo):   # O(log n)
    esq, dir = 0, len(lista) - 1
    while esq <= dir:
        meio = (esq + dir) // 2
        if lista[meio] == alvo:
            return True
        elif lista[meio] < alvo:
            esq = meio + 1
        else:
            dir = meio - 1
    return False

# Para n=1_000_000, busca binária faz ~20 comparações
# busca linear faz até 1_000_000 comparações`,
    traceTable: [
      { step: 1, variable: 'n = 8', value: 'O(log n) = 3', note: 'log₂(8) = 3 passos' },
      { step: 2, variable: 'n = 1.000', value: 'O(n) = 1.000', note: 'linear: até 1000 passos' },
      { step: 3, variable: 'n = 1.000', value: 'O(log n) ≈ 10', note: 'log₂(1000) ≈ 10 passos' },
      { step: 4, variable: 'n = 1.000.000', value: 'O(n²) = 10¹²', note: 'quadrático: inviável' },
      { step: 5, variable: 'n = 1.000.000', value: 'O(log n) = 20', note: 'logarítmico: trivial' }
    ],
    pitfall: 'Otimizar prematuramente: gastar horas otimizando O(n) para O(log n) numa lista de 100 elementos — onde a diferença é de 100 vs 7 operações e ambos são instantâneos.',
    tip: 'Quando seu código for lento, meça primeiro (profiling). 90% do tempo é gasto em 10% do código. Otimize onde importa.',
    keywords: ['complexidade', 'big-o', 'eficiência', 'tempo', 'espaço', 'crescimento', 'linear', 'quadrático', 'logarítmico', 'constante', 'pior caso', 'análise', 'algoritmo', 'n', 'entrada', 'desempenho'],
    misconceptions: [
      { wrong: 'O algoritmo mais rápido é sempre o de menor Big-O', why: 'Para entradas pequenas, um O(n²) pode ser mais rápido na prática que O(n log n) por ter menor constante e menor overhead.' },
      { wrong: 'Big-O mede tempo em segundos', why: 'Big-O é agnóstico a hardware. Mede crescimento relativo — o número de operações elementares em função de n.' }
    ],
    idealExplanation: 'Complexidade de algoritmos mede como o tempo de execução cresce com o tamanho da entrada (n). Big-O descreve o pior caso. O(1) é constante, O(log n) logarítmico, O(n) linear, O(n²) quadrático. Algoritmos com menor complexidade escalam melhor para grandes entradas.'
  },

  ord: {
    name: '⬆️ Algoritmos de Ordenação',
    badge: 'Fundamento #9',
    definition: 'Ordenação é o processo de <strong>rearranjar elementos de uma coleção em ordem crescente ou decrescente</strong>. É um dos problemas mais estudados em CS — a base da busca binária, de joins em banco de dados e de inúmeras otimizações.',
    quote: '"Aproximadamente 25% do tempo de CPU comercial é gasto em ordenação — por isso tantos algoritmos foram inventados." — Donald Knuth, <em>TAOCP Vol. 3</em>',
    concepts: [
      { title: 'Bubble Sort — O(n²)', desc: 'Compara pares adjacentes e os troca. Simples de entender, terrível para uso real. Bom para ensino.' },
      { title: 'Selection Sort — O(n²)', desc: 'Encontra o menor e o coloca na posição certa. Faz n² comparações mas apenas n trocas.' },
      { title: 'Merge Sort — O(n log n)', desc: 'Divide a lista ao meio recursivamente, ordena cada metade e mescla. Estável e eficiente.' },
      { title: 'Quick Sort — O(n log n) médio', desc: 'Escolhe um pivô, particiona e ordena recursivamente. O mais rápido na prática para dados aleatórios.' }
    ],
    pseudocode: `// Bubble Sort — didático
FUNÇÃO bubbleSort(vetor)
  n ← tamanho(vetor)
  PARA i DE 0 ATÉ n-1:
    PARA j DE 0 ATÉ n-i-2:
      SE vetor[j] > vetor[j+1]:
        TROCAR vetor[j] e vetor[j+1]
  RETORNAR vetor`,
    realExample: `# Python — ordenação
def bubble_sort(lista):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
    return lista

# Python nativo usa Timsort (híbrido merge+insertion) O(n log n)
numeros = [64, 34, 25, 12, 22, 11, 90]
print(f"Manual: {bubble_sort(numeros.copy())}")
print(f"Nativo: {sorted(numeros)}")`,
    traceTable: [
      { step: 1, variable: '[64,34,25,12]', value: 'inicial', note: 'passagem 1' },
      { step: 2, variable: '[34,25,12,64]', value: 'após i=0', note: '64 borbulhou para o fim' },
      { step: 3, variable: '[25,12,34,64]', value: 'após i=1', note: '34 no lugar' },
      { step: 4, variable: '[12,25,34,64]', value: 'após i=2', note: 'ordenado' },
      { step: 5, variable: 'comparações', value: '6 (n²/2)', note: 'para n=4: 4²/2 = 6' }
    ],
    pitfall: 'Usar Bubble Sort em produção para listas grandes. Para 100.000 elementos, Bubble Sort faz ~10 bilhões de comparações; Timsort faz ~1,7 milhões.',
    tip: 'Na prática, use sempre a função de ordenação nativa da linguagem (Python: <code>sorted()</code> / <code>.sort()</code>, Java: <code>Arrays.sort()</code>). Elas são otimizadas com décadas de engenharia.',
    keywords: ['ordenação', 'sort', 'bubble', 'merge', 'quick', 'comparação', 'troca', 'pivô', 'dividir', 'conquistar', 'crescente', 'decrescente', 'estável', 'timsort', 'algoritmo', 'lista', 'arranjar'],
    misconceptions: [
      { wrong: 'Bubble Sort é bom porque é simples', why: 'É bom PARA ENSINO. Em produção, é sempre a pior escolha entre os algoritmos de ordenação.' },
      { wrong: 'Quick Sort sempre tem complexidade O(n log n)', why: 'No pior caso (pivô sempre o maior/menor elemento), Quick Sort degenera para O(n²).' }
    ],
    idealExplanation: 'Ordenação rearranja elementos de uma coleção em ordem. Bubble Sort é O(n²) — simples e ineficiente. Merge Sort e Quick Sort são O(n log n) — eficientes para grandes entradas. Na prática, usa-se sempre a função nativa da linguagem, que implementa o melhor algoritmo disponível.'
  },

  busc: {
    name: '🔍 Algoritmos de Busca',
    badge: 'Fundamento #10',
    definition: 'Busca é o processo de <strong>encontrar um elemento específico em uma coleção</strong>. A diferença de eficiência entre busca linear e binária pode ser a diferença entre um sistema que responde em milissegundos e um que leva horas.',
    quote: '"A busca binária é um dos algoritmos mais elegantes da ciência da computação — divide o problema pela metade a cada passo." — Aditya Y. Bhargava, <em>Entendendo Algoritmos</em>',
    concepts: [
      { title: 'Busca Linear — O(n)', desc: 'Percorre cada elemento até encontrar o alvo. Funciona em qualquer lista, ordenada ou não.' },
      { title: 'Busca Binária — O(log n)', desc: 'Requer lista ordenada. Compara o alvo com o elemento do meio e descarta metade da lista a cada passo.' },
      { title: 'Tabela Hash — O(1)', desc: 'Usa uma função hash para calcular diretamente a posição do elemento. A busca mais rápida possível.' },
      { title: 'Busca em Árvore — O(log n)', desc: 'Árvores binárias de busca (BST) permitem busca logarítmica mantendo ordem. Base de índices em bancos de dados.' }
    ],
    pseudocode: `FUNÇÃO buscaBinaria(vetor, alvo)
  esquerda ← 0
  direita  ← tamanho(vetor) - 1
  
  ENQUANTO esquerda <= direita FAÇA
    meio ← (esquerda + direita) / 2
    SE vetor[meio] = alvo ENTÃO
      RETORNAR meio
    SENÃO SE vetor[meio] < alvo ENTÃO
      esquerda ← meio + 1
    SENÃO
      direita ← meio - 1
  FIM ENQUANTO
  RETORNAR -1  // não encontrado`,
    realExample: `# Python — busca linear e binária
import bisect

def busca_linear(lista: list, alvo) -> int:
    for i, item in enumerate(lista):
        if item == alvo:
            return i
    return -1

def busca_binaria(lista: list, alvo) -> int:
    esq, dir = 0, len(lista) - 1
    while esq <= dir:
        meio = (esq + dir) // 2
        if lista[meio] == alvo:
            return meio
        elif lista[meio] < alvo:
            esq = meio + 1
        else:
            dir = meio - 1
    return -1

ordenada = list(range(0, 1000, 2))   # [0, 2, 4, ..., 998]
print(busca_linear(ordenada, 756))   # O(n): verifica ~378 itens
print(busca_binaria(ordenada, 756))  # O(log n): ~9 comparações`,
    traceTable: [
      { step: 1, variable: 'lista[meio=249]', value: '498', note: '498 < 756 → esq = 250' },
      { step: 2, variable: 'lista[meio=374]', value: '748', note: '748 < 756 → esq = 375' },
      { step: 3, variable: 'lista[meio=437]', value: '874', note: '874 > 756 → dir = 436' },
      { step: 4, variable: 'lista[meio=405]', value: '810', note: '810 > 756 → dir = 404' },
      { step: 5, variable: 'lista[meio=378]', value: '756', note: '🎯 encontrado em ~5 passos' }
    ],
    pitfall: 'Aplicar busca binária em lista NÃO ordenada — produzirá resultados incorretos silenciosamente, sem erro.',
    tip: 'Se você vai buscar frequentemente no mesmo conjunto de dados, vale a pena ordená-lo uma única vez (O(n log n)) para depois fazer buscas em O(log n). O investimento se paga rápido.',
    keywords: ['busca', 'pesquisa', 'linear', 'binária', 'hash', 'encontrar', 'índice', 'ordenada', 'meio', 'divisão', 'logarítmico', 'alvo', 'chave', 'procurar', 'árvore', 'eficiência'],
    misconceptions: [
      { wrong: 'Busca binária funciona em qualquer lista', why: 'Busca binária REQUER que a lista esteja ordenada. Em lista não ordenada, os resultados são incorretos.' },
      { wrong: 'Busca linear é sempre ruim', why: 'Para listas pequenas (< ~20 elementos) ou não ordenadas, a busca linear é perfeitamente adequada e simples.' }
    ],
    idealExplanation: 'Busca encontra elementos em coleções. Busca linear percorre tudo (O(n)) e funciona em qualquer lista. Busca binária divide pelo meio a cada passo (O(log n)) mas exige lista ordenada. Para buscas frequentes, vale pré-ordenar a lista.'
  }
};

// ─── Estado atual ────────────────────────────────────────────
let currentLogicaTopic = 'seq';

// ─── Renderizar painel do tópico ─────────────────────────────
function showLogicaTopic(id) {
  currentLogicaTopic = id;
  const topic = LOGICA_TOPICS[id];
  if (!topic) return;

  // Atualiza botões de nav
  document.querySelectorAll('.logica-nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${id}'`)) {
      btn.classList.add('active');
    }
  });

  // Atualiza label do analisador
  const nameEl = document.getElementById('analyzer-topic-name');
  if (nameEl) nameEl.textContent = topic.name;

  // Renderiza painel
  const panel = document.getElementById('logica-topic-panel');
  if (!panel) return;
  panel.innerHTML = renderTopicPanel(topic);

  // Limpa feedback anterior
  const fbArea = document.getElementById('logica-feedback-area');
  if (fbArea) { fbArea.style.display = 'none'; fbArea.innerHTML = ''; }

  // Limpa textarea
  const ta = document.getElementById('logica-user-text');
  if (ta) { ta.value = ''; }
  const wc = document.getElementById('logica-word-count');
  if (wc) wc.textContent = '0 palavras';
}

// ─── Montar HTML do painel ───────────────────────────────────
function renderTopicPanel(topic) {
  // Conceitos
  const conceptsHTML = topic.concepts.map(c =>
    `<div class="logica-concept-item">
      <strong class="logica-concept-title">▶ ${c.title}</strong>
      <p class="logica-concept-desc">${c.desc}</p>
    </div>`
  ).join('');

  // Trace table
  const traceRows = topic.traceTable.map(r =>
    `<tr>
      <td>${r.step}</td>
      <td><code>${r.variable}</code></td>
      <td><code>${r.value}</code></td>
      <td>${r.note}</td>
    </tr>`
  ).join('');

  // Misconceptions
  const miscHTML = topic.misconceptions.map(m =>
    `<div class="logica-misconception">
      <span class="misc-wrong">❌ Mito: "${m.wrong}"</span>
      <span class="misc-why">✅ Realidade: ${m.why}</span>
    </div>`
  ).join('');

  return `
  <div class="logica-topic-card">
    <div class="logica-topic-header">
      <div>
        <span class="logica-topic-badge">${topic.badge}</span>
        <h3 class="logica-topic-name">${topic.name}</h3>
      </div>
    </div>

    <div class="logica-definition">
      <p>${topic.definition}</p>
      <blockquote class="logica-quote">${topic.quote}</blockquote>
    </div>

    <div class="logica-section-title">🧩 Conceitos Fundamentais</div>
    <div class="logica-concepts-grid">${conceptsHTML}</div>

    <div class="logica-two-col">
      <div>
        <div class="logica-section-title">📝 Pseudocódigo</div>
        <pre class="logica-pseudo">${topic.pseudocode}</pre>
      </div>
      <div>
        <div class="logica-section-title">🐍 Exemplo Real (Python)</div>
        <pre class="logica-pseudo">${topic.realExample}</pre>
      </div>
    </div>

    <div class="logica-section-title">🔬 Tabela de Rastreamento (Trace)</div>
    <div class="logica-trace-wrap">
      <table class="logica-trace-table">
        <thead>
          <tr><th>Passo</th><th>Variável / Expressão</th><th>Valor</th><th>Observação</th></tr>
        </thead>
        <tbody>${traceRows}</tbody>
      </table>
    </div>

    <div class="logica-pitfall-tip">
      <div class="logica-pitfall">
        <span class="pitfall-icon">⚠️</span>
        <div><strong>Armadilha Comum:</strong> ${topic.pitfall}</div>
      </div>
      <div class="logica-tip">
        <span class="tip-icon">💡</span>
        <div><strong>Dica Profissional:</strong> ${topic.tip}</div>
      </div>
    </div>

    <div class="logica-section-title">🚫 Mitos e Equívocos</div>
    <div class="logica-misconceptions">${miscHTML}</div>
  </div>`;
}

// ─── Analisador de Compreensão ───────────────────────────────
function analisarCompreensao() {
  const topic = LOGICA_TOPICS[currentLogicaTopic];
  if (!topic) return;

  const ta = document.getElementById('logica-user-text');
  const fbArea = document.getElementById('logica-feedback-area');
  if (!ta || !fbArea) return;

  const rawText = ta.value.trim();
  if (rawText.length < 10) {
    fbArea.style.display = 'block';
    fbArea.innerHTML = `<div class="feedback-empty">✏️ Escreva pelo menos algumas frases explicando o conceito antes de analisar.</div>`;
    return;
  }

  // Normalizar texto
  const normalized = rawText
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');

  // Score por keywords
  const hits = [];
  const misses = [];
  topic.keywords.forEach(kw => {
    const kwNorm = kw.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ');
    if (normalized.includes(kwNorm)) {
      hits.push(kw);
    } else {
      misses.push(kw);
    }
  });

  // Verificar misconceptions
  const misconceptionAlerts = [];
  topic.misconceptions.forEach(m => {
    const wrongNorm = m.wrong.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ');
    const wrongWords = wrongNorm.split(' ').filter(w => w.length > 4);
    const matched = wrongWords.filter(w => normalized.includes(w));
    if (matched.length >= 2) {
      misconceptionAlerts.push(m);
    }
  });

  const total = topic.keywords.length;
  const score = Math.round((hits.length / total) * 100);
  const scoreClass = score >= 70 ? 'score-high' : score >= 40 ? 'score-mid' : 'score-low';
  const scoreLabel = score >= 70 ? '🟢 Excelente compreensão' : score >= 40 ? '🟡 Compreensão parcial' : '🔴 Revisar o conceito';

  // Contar palavras
  const wordCount = rawText.split(/\s+/).filter(w => w.length > 0).length;

  // Hits HTML
  const hitsHTML = hits.length > 0
    ? hits.map(h => `<span class="feedback-hit">${h}</span>`).join('')
    : '<em>Nenhum conceito-chave identificado.</em>';

  // Misses HTML — top 6
  const missesHTML = misses.slice(0, 6).map(m =>
    `<span class="feedback-miss">${m}</span>`
  ).join('');

  // Misconception alerts
  const miscAlertsHTML = misconceptionAlerts.map(m =>
    `<div class="feedback-misconception">
      <strong>⚠️ Possível equívoco detectado:</strong> "${m.wrong}"
      <br><em>✅ ${m.why}</em>
    </div>`
  ).join('');

  fbArea.style.display = 'block';
  fbArea.innerHTML = `
    <div class="feedback-header">
      <div class="feedback-score-wrap ${scoreClass}">
        <span class="feedback-score-number">${score}%</span>
        <span class="feedback-score-label">${scoreLabel}</span>
      </div>
      <div class="feedback-meta">
        <span>📝 ${wordCount} palavras escritas</span>
        <span>✅ ${hits.length} de ${total} conceitos identificados</span>
      </div>
    </div>

    <div class="feedback-bar-wrap">
      <div class="feedback-bar">
        <div class="feedback-bar-fill ${scoreClass}" style="width:${score}%"></div>
      </div>
    </div>

    <div class="feedback-cols">
      <div class="feedback-col-hits">
        <h4 class="feedback-col-title">✅ Conceitos que você mencionou</h4>
        <div class="feedback-tags">${hitsHTML}</div>
      </div>
      <div class="feedback-col-misses">
        <h4 class="feedback-col-title">❌ Conceitos ausentes na sua explicação</h4>
        <div class="feedback-tags">${missesHTML}</div>
      </div>
    </div>

    ${misconceptionAlerts.length > 0 ? `<div class="feedback-misconceptions-area">${miscAlertsHTML}</div>` : ''}

    <div class="feedback-ideal">
      <h4 class="feedback-ideal-title">📖 Explicação Ideal — Compare com a Sua</h4>
      <p class="feedback-ideal-text">${topic.idealExplanation}</p>
    </div>

    <div class="feedback-next">
      <p class="feedback-next-hint">💡 Continue praticando: reescreva sua explicação incorporando os conceitos ausentes e clique em Analisar novamente.</p>
    </div>`;
}

// ─── Contador de palavras ────────────────────────────────────
(function attachWordCounter() {
  function init() {
    const ta = document.getElementById('logica-user-text');
    const wc = document.getElementById('logica-word-count');
    if (!ta || !wc) return;
    ta.addEventListener('input', function () {
      const words = this.value.trim().split(/\s+/).filter(w => w.length > 0).length;
      wc.textContent = words + (words === 1 ? ' palavra' : ' palavras');
      wc.style.color = words >= 30 ? '#16a34a' : words >= 15 ? '#d97706' : '#dc2626';
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ─── Init ao carregar página ─────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const panel = document.getElementById('logica-topic-panel');
  if (panel) {
    showLogicaTopic('seq');
  }
});
