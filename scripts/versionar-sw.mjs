/**
 * Atualiza CACHE_NAME em sw.js com um hash do conteúdo de todos os arquivos
 * listados em ASSETS_TO_CACHE (e do próprio sw.js, exceto a linha CACHE_NAME).
 * Assim o cache offline é invalidado sempre que qualquer asset muda,
 * sem precisar incrementar a versão à mão.
 *
 * Uso:
 *   node scripts/versionar-sw.mjs          # reescreve sw.js
 *   node scripts/versionar-sw.mjs --check  # falha se sw.js estiver desatualizado (CI)
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const caminhoSw = join(raiz, 'sw.js');
const sw = readFileSync(caminhoSw, 'utf8');

const linhaCache = /^const CACHE_NAME = '[^']*';$/m;
if (!linhaCache.test(sw)) {
  console.error('✘ sw.js: linha "const CACHE_NAME = \'...\';" não encontrada');
  process.exit(1);
}

const bloco = sw.match(/const ASSETS_TO_CACHE = \[([\s\S]*?)\];/);
if (!bloco) {
  console.error('✘ sw.js: lista ASSETS_TO_CACHE não encontrada');
  process.exit(1);
}
const assets = [...bloco[1].matchAll(/'\.\/([^']*)'/g)].map((m) => m[1]).filter(Boolean).sort();

// Normaliza CRLF/LF para o hash ser igual no Windows e no Linux (CI)
const normalizar = (buf) => buf.toString('utf8').replace(/\r\n/g, '\n');

const hash = createHash('sha256');
hash.update(normalizar(Buffer.from(sw.replace(linhaCache, ''))));
for (const a of assets) {
  const caminho = join(raiz, a);
  if (!existsSync(caminho)) {
    console.error(`✘ sw.js lista um arquivo inexistente: ${a}`);
    process.exit(1);
  }
  hash.update(a);
  hash.update(a.endsWith('.png') ? readFileSync(caminho) : normalizar(readFileSync(caminho)));
}
const versao = hash.digest('hex').slice(0, 10);
const novaLinha = `const CACHE_NAME = 'ponce-logica-${versao}';`;
const atualizado = sw.replace(linhaCache, novaLinha);

if (process.argv.includes('--check')) {
  if (atualizado !== sw) {
    console.error(`✘ sw.js desatualizado (esperado ${novaLinha}). Rode: npm run build`);
    process.exit(1);
  }
  console.log(`✔ sw.js versionado (${versao})`);
} else {
  if (atualizado !== sw) writeFileSync(caminhoSw, atualizado);
  console.log(`✔ sw.js: cache ponce-logica-${versao} (${assets.length} arquivos)`);
}
