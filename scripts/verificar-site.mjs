/**
 * Verificações estáticas do site (rodam no CI, sem navegador):
 *  1. links internos (href/src) apontam para arquivos existentes;
 *  2. toda página HTML e todo asset local listado no sw.js existe;
 *  3. toda página HTML (exceto as de apoio) está no cache do sw.js;
 *  4. páginas têm lang, viewport, <title>, exatamente um <h1>;
 *  5. links target="_blank" têm rel="noopener".
 *
 * Uso: node scripts/verificar-site.mjs
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IGNORAR = new Set(['node_modules', '.git', '.bob', 'dist', 'site_aprender_linguagens-logica']);
const erros = [];
const avisos = [];

function listarHtml(dir) {
  const saida = [];
  for (const nome of readdirSync(dir)) {
    if (IGNORAR.has(nome) || nome.startsWith('backup_')) continue;
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) saida.push(...listarHtml(caminho));
    else if (nome.endsWith('.html')) saida.push(caminho);
  }
  return saida;
}

const rel = (p) => relative(raiz, p).split(sep).join('/');
const paginas = listarHtml(raiz);

// Remove blocos <script>/<style> e comentários para não tratar exemplos de código como links reais
function semBlocos(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<pre\b[\s\S]*?<\/pre>/gi, '')
    .replace(/<code\b[\s\S]*?<\/code>/gi, '');
}

for (const arquivo of paginas) {
  const html = readFileSync(arquivo, 'utf8');
  const limpo = semBlocos(html);
  const nome = rel(arquivo);

  for (const m of limpo.matchAll(/<(?:a|link|script|img|source)\b[^>]*?\b(?:href|src)\s*=\s*"([^"]*)"/gi)) {
    const alvo = m[1].split('#')[0].split('?')[0];
    if (!alvo || /^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(m[1])) continue;
    const caminho = alvo.startsWith('/') ? join(raiz, alvo) : resolve(dirname(arquivo), alvo);
    if (!existsSync(caminho)) erros.push(`${nome}: link interno quebrado -> ${m[1]}`);
  }

  if (!/<html[^>]*\blang=/i.test(html)) erros.push(`${nome}: <html> sem atributo lang`);
  if (!/name="viewport"/i.test(html)) erros.push(`${nome}: sem meta viewport`);
  if (!/<title>[^<]+<\/title>/i.test(html)) erros.push(`${nome}: sem <title>`);

  const h1 = (limpo.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) erros.push(`${nome}: esperado 1 <h1>, encontrado ${h1}`);

  for (const m of limpo.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/rel="[^"]*noopener/i.test(m[0])) erros.push(`${nome}: target="_blank" sem rel="noopener"`);
  }
}

// ── Service Worker ───────────────────────────────────────────────────────────
const sw = readFileSync(join(raiz, 'sw.js'), 'utf8');
const cacheados = [...sw.matchAll(/'\.\/([^']*)'/g)].map((m) => m[1]).filter((p) => p && !p.startsWith('__'));

for (const p of cacheados) {
  if (!existsSync(join(raiz, p))) erros.push(`sw.js: recurso listado não existe -> ${p}`);
}
const setCache = new Set(cacheados);
for (const arquivo of paginas) {
  const nome = rel(arquivo);
  if (!setCache.has(nome)) erros.push(`sw.js: página fora do cache offline -> ${nome}`);
}

// ── Resultado ────────────────────────────────────────────────────────────────
for (const a of avisos) console.warn(`⚠ ${a}`);
if (erros.length) {
  for (const e of erros) console.error(`✘ ${e}`);
  console.error(`\n${erros.length} problema(s) em ${paginas.length} páginas.`);
  process.exit(1);
}
console.log(`✔ ${paginas.length} páginas verificadas: links, metadados e cache offline OK`);
