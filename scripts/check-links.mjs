// Varredura de links quebrados no dist/: arquivos internos, ancoras (#id) e lista de links externos (nao faz requisicoes).
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const htmlFiles = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (f.name.endsWith('.html')) htmlFiles.push(p); } })(DIST);

const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const pages = Object.fromEntries(htmlFiles.map((f) => [f, fs.readFileSync(f, 'utf8')]));
const pageForUrl = (u) => {
  const clean = u.split('#')[0].split('?')[0];
  const cand = clean.endsWith('/') ? `${clean}index.html` : clean;
  return path.join(DIST, cand);
};

const broken = []; const external = new Set(); let checked = 0;
for (const [file, html] of Object.entries(pages)) {
  const refs = [];
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) refs.push(m[1]);
  for (const m of html.matchAll(/\ssrcset="([^"]+)"/g)) m[1].split(',').forEach((c) => refs.push(c.trim().split(/\s+/)[0]));
  for (const ref of new Set(refs)) {
    if (/^(mailto:|tel:|data:)/.test(ref)) { checked++; continue; }
    if (/^https?:\/\//.test(ref)) { external.add(ref); continue; }
    checked++;
    if (ref.startsWith('#')) { if (!idsOf(html).has(ref.slice(1))) broken.push(`${file}: ancora ${ref} nao existe`); continue; }
    const target = pageForUrl(ref);
    if (!fs.existsSync(target)) { broken.push(`${file}: ${ref} -> ${target} nao existe`); continue; }
    const hash = ref.split('#')[1];
    if (hash && target.endsWith('.html') && !idsOf(fs.readFileSync(target, 'utf8')).has(hash)) broken.push(`${file}: ${ref} -> id #${hash} nao existe em ${target}`);
  }
}
console.log(`paginas: ${htmlFiles.length} | referencias internas verificadas: ${checked} | quebradas: ${broken.length}`);
broken.forEach((b) => console.log('  QUEBRADO', b));
console.log('links externos (nao requisitados; sao placeholders ou destinos de terceiros):');
[...external].sort().forEach((e) => console.log('  ', e));
process.exit(broken.length ? 1 : 0);
