// Valida content/modulos/*.json contra content/modulo.schema.json
// e gera js/curso-logica-dados.js (carregado antes de js/curso-logica.js).
// Uso: node scripts/build-conteudo.mjs [--check]   (--check só valida, não grava)
import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';

const DIR = 'content/modulos';
const SAIDA = 'js/curso-logica-dados.js';
const somenteValidar = process.argv.includes('--check');

const schema = JSON.parse(fs.readFileSync('content/modulo.schema.json', 'utf8'));
const ajv = new Ajv({ allErrors: true, strict: true });
const validar = ajv.compile(schema);

const arquivos = fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).sort();
const erros = [];
const modulos = [];

for (const arq of arquivos) {
  let dado;
  try {
    dado = JSON.parse(fs.readFileSync(path.join(DIR, arq), 'utf8'));
  } catch (e) {
    erros.push(`${arq}: JSON inválido (${e.message})`);
    continue;
  }
  if (!validar(dado)) {
    for (const e of validar.errors) {
      erros.push(`${arq}: ${e.instancePath || '/'} ${e.message}`);
    }
    continue;
  }

  // Regras que o JSON Schema não expressa
  const prefixo = String(dado.id).padStart(2, '0') + '-' + dado.slug + '.json';
  if (arq !== prefixo) erros.push(`${arq}: nome do arquivo deve ser ${prefixo}`);
  dado.exercicios.forEach((ex) => {
    if (ex.correta >= ex.opcoes.length) {
      erros.push(`${arq}: exercício ${ex.id} tem correta=${ex.correta} fora de opcoes (${ex.opcoes.length})`);
    }
    if (!ex.id.startsWith(`ex${dado.id}_`)) {
      erros.push(`${arq}: exercício ${ex.id} deveria começar com ex${dado.id}_`);
    }
  });
  dado.traceData.forEach((t, i) => {
    if (t.passo !== i + 1) erros.push(`${arq}: traceData[${i}].passo deveria ser ${i + 1}`);
  });
  modulos.push(dado);
}

const ids = modulos.map((m) => m.id);
if (new Set(ids).size !== ids.length) erros.push('ids de módulo duplicados');
const slugs = modulos.map((m) => m.slug);
if (new Set(slugs).size !== slugs.length) erros.push('slugs de módulo duplicados');
for (let i = 1; i <= 22; i++) {
  if (!ids.includes(i)) erros.push(`módulo ${i} ausente em ${DIR}`);
}

if (erros.length) {
  console.error(`✖ Conteúdo inválido (${erros.length} problema(s)):`);
  erros.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}

modulos.sort((a, b) => a.id - b.id);
console.log(`✔ ${modulos.length} módulos válidos`);

if (!somenteValidar) {
  const corpo =
    '// ARQUIVO GERADO por scripts/build-conteudo.mjs — não edite à mão.\n' +
    '// Edite os arquivos em content/modulos/*.json e rode: npm run build:conteudo\n' +
    '(function (global) {\n' +
    "  'use strict';\n" +
    '  global.CURSO_LOGICA_MODULOS = ' +
    JSON.stringify(modulos, null, 2).replace(/^/gm, '  ').trimStart() +
    ';\n' +
    "})(typeof window !== 'undefined' ? window : globalThis);\n";
  fs.writeFileSync(SAIDA, corpo, 'utf8');
  console.log(`✔ gerado ${SAIDA} (${(corpo.length / 1024).toFixed(0)} KB)`);
}
