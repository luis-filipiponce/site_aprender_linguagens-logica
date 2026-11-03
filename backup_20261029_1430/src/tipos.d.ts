/**
 * Tipos compartilhados do Curso de Lógica de Programação Pura.
 * Descrevem o formato dos 22 módulos (js/curso-logica.js) e do conteúdo de
 * aprofundamento (src/curso-logica-extras.ts).
 */

/** Identificadores válidos de módulo (1 a 22). */
type IdModulo =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22;

type NivelPratica = 'Básico' | 'Intermediário' | 'Avançado';

interface Exemplo {
  titulo: string;
  descricao: string;
}

interface ErroComum {
  erro: string;
  correcao: string;
}

interface PassoTrace {
  passo: number;
  acao: string;
  estado: string;
  obs: string;
}

interface Exercicio {
  id: string;
  tipo: 'multipla_escolha';
  enunciado: string;
  opcoes: string[];
  /** Índice (base 0) da opção correta em `opcoes`. */
  correta: number;
  pista: string;
  justificativa: string;
}

interface Equivoco {
  termo: string;
  erro: string;
  explicacao: string;
}

/** Módulo do curso, conforme MODULOS_LOGICA em js/curso-logica.js. */
interface Modulo {
  id: IdModulo;
  slug: string;
  badge: string;
  nivel: string;
  titulo: string;
  subtitulo: string;
  objetivo: string;
  introducaoIntuitiva: string;
  explicacaoAprofundada: string;
  exemplos: {
    basico: Exemplo;
    intermediario: Exemplo;
    avancado: Exemplo;
  };
  passoAPasso: string[];
  errosComuns: ErroComum[];
  comparacaoSolucoes: { boa: string; ruim: string };
  pseudocodigo: string;
  traceData: PassoTrace[];
  exercicios: Exercicio[];
  perguntasVerificacao: string;
  keywordsIA: string[];
  misconceptionsIA: Equivoco[];
  explicacaoIdealIA: string;
}

/** Termo do glossário: [termo, definição]. */
type TermoGlossario = [termo: string, definicao: string];

interface Pratica {
  nivel: NivelPratica;
  texto: string;
  dica: string;
}

interface ExemploResolvido {
  titulo: string;
  enunciado: string;
  passos: string[];
  codigo: string;
}

/** Conteúdo de aprofundamento de um módulo. */
interface ExtraModulo {
  porQueImporta: string;
  glossario: TermoGlossario[];
  exemploResolvido: ExemploResolvido;
  /** Sempre 3 práticas: básico, intermediário e avançado. */
  praticas: [Pratica, Pratica, Pratica];
  dicasEstudo: string[];
  conexoes: string;
}

/** Os 22 módulos são obrigatórios: o compilador falha se algum faltar. */
type ExtrasCurso = Record<IdModulo, ExtraModulo>;

declare var CURSO_LOGICA_EXTRAS: ExtrasCurso | undefined;

/** Gerado por scripts/build-conteudo.mjs a partir de content/modulos/*.json. */
declare var CURSO_LOGICA_MODULOS: Modulo[] | undefined;
