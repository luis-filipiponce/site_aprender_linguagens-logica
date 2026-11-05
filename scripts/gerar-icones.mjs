// Gera os icones PNG do PWA (192, 512 e 512 maskable) sem dependencias externas.
// Uso: node scripts/gerar-icones.mjs
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const BG = [0x63, 0x66, 0xf1];
const FG = [0xff, 0xff, 0xff];

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(tipo, dados) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(dados.length);
  const corpo = Buffer.concat([Buffer.from(tipo), dados]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(corpo));
  return Buffer.concat([len, corpo, crc]);
}

// Desenha a letra "L" (de Logica) centralizada; "margem" maior = zona segura maskable
function gerarPng(tamanho, margem) {
  const linhas = [];
  const area = tamanho * (1 - 2 * margem);
  const x0 = tamanho * margem + area * 0.25;
  const x1 = x0 + area * 0.18;
  const y0 = tamanho * margem + area * 0.15;
  const y1 = tamanho * margem + area * 0.85;
  const xFim = tamanho * margem + area * 0.75;
  const yBase = y1 - area * 0.18;
  for (let y = 0; y < tamanho; y++) {
    const linha = Buffer.alloc(1 + tamanho * 3);
    for (let x = 0; x < tamanho; x++) {
      const haste = x >= x0 && x < x1 && y >= y0 && y < y1;
      const base = x >= x0 && x < xFim && y >= yBase && y < y1;
      const cor = haste || base ? FG : BG;
      linha[1 + x * 3] = cor[0];
      linha[2 + x * 3] = cor[1];
      linha[3 + x * 3] = cor[2];
    }
    linhas.push(linha);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(tamanho, 0);
  ihdr.writeUInt32BE(tamanho, 4);
  ihdr[8] = 8; // profundidade
  ihdr[9] = 2; // RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(Buffer.concat(linhas))),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

const destino = join(raiz, 'icons');
mkdirSync(destino, { recursive: true });
writeFileSync(join(destino, 'icon-192.png'), gerarPng(192, 0.1));
writeFileSync(join(destino, 'icon-512.png'), gerarPng(512, 0.1));
writeFileSync(join(destino, 'icon-512-maskable.png'), gerarPng(512, 0.2));
console.log('Icones gerados em', destino);
