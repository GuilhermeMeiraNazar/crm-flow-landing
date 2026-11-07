// Gera favicon, apple-touch-icon e imagem Open Graph a partir do monograma "C" (provisorio).
// Uso: npm run assets
import sharp from 'sharp';
import fs from 'node:fs';
import { SITE } from '../src/config/site.js';
import { copy } from '../src/content/pt-BR.js';

const C = copy(SITE);
fs.mkdirSync('public', { recursive: true });

const mark = (size, radius) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C6FFF"/><stop offset="1" stop-color="#5A4FCC"/></linearGradient></defs>
  <rect width="100" height="100" rx="${radius}" fill="url(#g)"/>
  <path d="M66 33.5A24 24 0 1 0 66 66.5" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round"/>
</svg>`;
// O "C" e desenhado como tracado (sem depender de fonte instalada).

fs.writeFileSync('public/favicon.svg', mark(64, 28).trim());
await sharp(Buffer.from(mark(32, 28))).png().toFile('public/favicon-32.png');
await sharp(Buffer.from(mark(180, 0))).png().toFile('public/apple-touch-icon.png');

// OG 1200x630: fundo escuro com malha, monograma, nome, frase e recorte da captura real do pipeline.
const shot = await sharp('src/assets/capturas/pipeline-dark@2x.webp').resize({ width: 1500 }).extract({ left: 0, top: 0, width: 1500, height: 760 }).png().toBuffer();
const shotRounded = await sharp(shot).resize({ width: 640 }).composite([{ input: Buffer.from('<svg><rect width="640" height="320" rx="16"/></svg>'), blend: 'dest-in' }]).png().toBuffer();
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const bg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="a" cx="25%" cy="20%" r="60%"><stop offset="0" stop-color="#7C6FFF" stop-opacity="0.45"/><stop offset="1" stop-color="#7C6FFF" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="85%" cy="80%" r="55%"><stop offset="0" stop-color="#2DD4A7" stop-opacity="0.22"/><stop offset="1" stop-color="#2DD4A7" stop-opacity="0"/></radialGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C6FFF"/><stop offset="1" stop-color="#5A4FCC"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0A0E13"/><rect width="1200" height="630" fill="url(#a)"/><rect width="1200" height="630" fill="url(#b)"/>
  <rect x="64" y="64" width="64" height="64" rx="18" fill="url(#g)"/>
  <path d="M104 80.5A15 15 0 1 0 104 111.5" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" transform="translate(-2 -1)"/>
  <text x="146" y="108" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="#EEF2F6">${esc(SITE.name)}</text>
  <text x="64" y="230" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" fill="#EEF2F6">CRM de WhatsApp com IA,</text>
  <text x="64" y="300" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" fill="#EEF2F6">instalado no seu servidor.</text>
  <text x="64" y="360" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#93A1B0">Conversas, pipeline kanban, automações e relatórios.</text>
</svg>`;
await sharp(Buffer.from(bg))
  .composite([{ input: shotRounded, left: 520, top: 400 }])
  .png({ compressionLevel: 9 }).toFile('public/og-image.png');
console.log('assets gerados:', fs.readdirSync('public').join(', '), '|', C.seo.title);
