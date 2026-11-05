/**
 * Gera sitemap.xml a partir das páginas HTML do repositório.
 * Uso: node scripts/gerar-sitemap.mjs
 * A URL base vem de SITE_URL (padrão: https://ponce.dev.br/).
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env.SITE_URL || 'https://ponce.dev.br/').replace(/\/?$/, '/');
const IGNORAR = new Set(['node_modules', '.git', '.bob', 'dist', 'site_aprender_linguagens-logica']);

function listar(dir) {
  const saida = [];
  for (const nome of readdirSync(dir).sort()) {
    if (IGNORAR.has(nome) || nome.startsWith('backup_')) continue;
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) saida.push(...listar(caminho));
    else if (nome.endsWith('.html') && nome !== 'offline.html') saida.push(caminho);
  }
  return saida;
}

const urls = listar(raiz)
  .map((p) => relative(raiz, p).split(sep).join('/'))
  .map((p) => (p === 'index.html' ? '' : p));

const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((u) => `  <url><loc>${base}${u}</loc></url>`),
  '</urlset>', ''].join('\n');

writeFileSync(join(raiz, 'sitemap.xml'), xml);
console.log(`✔ sitemap.xml: ${urls.length} URLs (${base})`);