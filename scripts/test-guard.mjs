// Teste da trava de publicacao. NADA e gravado no projeto: copia o projeto para uma pasta temporaria,
// aplica valores de teste so la e roda o build real (npm run build) em cada caso.
// Uso: node scripts/test-guard.mjs [--keep]   (--keep mantem a copia valida para servir/medir)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const KEEP = process.argv.includes('--keep');
const root = process.cwd();
const tmp = path.join(os.tmpdir(), 'conversia-guard-test');
fs.rmSync(tmp, { recursive: true, force: true });
const EXCLUDE = new Set(['node_modules', 'dist', 'dist-ssr', 'dist-lh', '_demo', '_baseline', '_tools', 'verificacao', '.git', 'capturas']);
fs.cpSync(root, tmp, { recursive: true, filter: (src) => { const rel = path.relative(root, src).split(path.sep); return !(EXCLUDE.has(rel[0]) || /^\.env/.test(path.basename(src))); } });
fs.symlinkSync(path.join(root, 'node_modules'), path.join(tmp, 'node_modules'), 'junction');

const siteFile = path.join(tmp, 'src/config/site.js');
const legalFile = path.join(tmp, 'src/content/legal.js');
const base = fs.readFileSync(siteFile, 'utf8');
const strip = (t) => t.replace(/\[[A-Z]{2,}[^\]\n'"`]*\]/g, 'texto de teste'); // so placeholders "[PALAVRA EM MAIUSCULAS ...]"; nao toca em arrays/expressoes de codigo
fs.writeFileSync(legalFile, strip(fs.readFileSync(legalFile, 'utf8')));

const VALID = [
  [/domain: '[^']*'/, "domain: 'https://landing-teste.com.br'"],
  [/CTA_URL: '[^']*'/, "CTA_URL: 'https://landing-teste.com.br/comprar'"],
  [/contactEmail: '[^']*'/, "contactEmail: 'contato@landing-teste.com.br'"],
  [/contactWhatsapp: '[^']*'/, "contactWhatsapp: '5511987654321'"],
  [/legalName: '[^']*'/, "legalName: 'Empresa Teste LTDA'"],
  [/cnpj: '[^']*'/, "cnpj: '11.222.333/0001-81'"],
  [/address: '[^']*'/, "address: 'Rua Teste, 100'"],
  [/legalDraft: true/, 'legalDraft: false'],
];
const withValid = strip(VALID.reduce((t, [re, to]) => t.replace(re, to), base));
const variant = (re, to) => withValid.replace(re, to);

const CASES = [
  ['CNPJ com digito verificador errado (11.222.333/0001-82)', variant(/cnpj: '[^']*'/, "cnpj: '11.222.333/0001-82'"), /cnpj/i],
  ['CNPJ com digitos repetidos (11.111.111/1111-11)', variant(/cnpj: '[^']*'/, "cnpj: '11.111.111/1111-11'"), /cnpj/i],
  ['CTA_URL em http://', variant(/CTA_URL: '[^']*'/, "CTA_URL: 'http://landing-teste.com.br/comprar'"), /CTA_URL/],
  ['CTA_URL sem esquema', variant(/CTA_URL: '[^']*'/, "CTA_URL: 'landing-teste.com.br/comprar'"), /CTA_URL/],
  ['dominio em http://', variant(/domain: '[^']*'/, "domain: 'http://landing-teste.com.br'"), /domain/],
  ['e-mail sem TLD (contato@landing)', variant(/contactEmail: '[^']*'/, "contactEmail: 'contato@landing'"), /contactEmail/],
  ['e-mail com duas arrobas', variant(/contactEmail: '[^']*'/, "contactEmail: 'contato@@landing-teste.com.br'"), /contactEmail/],
  ['mensalidade negativa', variant(/monthly: 150/, 'monthly: -10'), /monthly/],
  ['mensalidade em texto ("150")', variant(/monthly: 150/, "monthly: '150'"), /monthly/],
  ['mensalidade nula', variant(/monthly: 150/, 'monthly: null'), /monthly/],
  ['implantacao zero', variant(/setup: 1500/, 'setup: 0'), /setup/],
  ['implantacao em texto ("1500")', variant(/setup: 1500/, "setup: '1500'"), /setup/],
  ['linha do plano invalida', variant(/line: 'hosted'/, "line: 'outra'"), /line/],
];

const run = () => {
  fs.rmSync(path.join(tmp, 'dist'), { recursive: true, force: true });
  const env = { ...process.env }; delete env.ALLOW_DRAFT_BUILD;
  return spawnSync('npm', ['run', 'build'], { cwd: tmp, env, shell: true, encoding: 'utf8' });
};

let failed = 0;
for (const [label, text, re] of CASES) {
  fs.writeFileSync(siteFile, text);
  const r = run(); const out = `${r.stdout}\n${r.stderr}`;
  const lines = out.split('\n').filter((l) => /^\s+- /.test(l));
  const pend = lines.filter((l) => re.test(l));
  const blocked = r.status !== 0 && /BUILD BLOQUEADO/.test(out);
  if (!blocked || !pend.length) failed++;
  console.log(`CASO: ${label}\n  exit=${r.status} bloqueado=${blocked} pendencias_totais=${lines.length}`);
  (pend.length ? pend : ['  (nenhuma linha relevante!)']).forEach((l) => console.log(`  ${l.trim()}`));
}

fs.writeFileSync(siteFile, withValid);
const ok = run();
const out = `${ok.stdout}\n${ok.stderr}`;
const guardLine = out.split('\n').find((l) => /publish-guard:/.test(l));
console.log(`\nCASO: valores validos de teste (nada gravado no projeto)\n  exit=${ok.status}\n  ${guardLine ? guardLine.trim() : '(sem linha do guard)'}`);
out.split('\n').filter((l) => /prerender ok/.test(l)).forEach((l) => console.log(`  ${l.trim()}`));
const dist = path.join(tmp, 'dist');
console.log(`  dist criado: ${fs.existsSync(dist)} | NAO_PUBLICAR.txt: ${fs.existsSync(path.join(dist, 'NAO_PUBLICAR.txt'))} | robots.txt: ${JSON.stringify(fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8').split('\n')[1])}`);
const idx = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
console.log(`  meta robots do inicio: ${(idx.match(/<meta name="robots" content="([^"]*)"/) || [])[1]} | canonical: ${(idx.match(/<link rel="canonical" href="([^"]*)"/) || [])[1]}`);
const termos = fs.readFileSync(path.join(dist, 'termos/index.html'), 'utf8');
console.log(`  meta robots de /termos/: ${(termos.match(/<meta name="robots" content="([^"]*)"/) || [])[1]}`);
if (ok.status !== 0) failed++;
console.log(`\nprojeto intocado: site.js do projeto ainda tem CNPJ "${(fs.readFileSync(path.join(root, 'src/config/site.js'), 'utf8').match(/cnpj: '([^']*)'/) || [])[1]}"`);
if (KEEP) console.log(`copia valida mantida em: ${tmp}`); else fs.rmSync(tmp, { recursive: true, force: true });
console.log(failed ? `RESULTADO: ${failed} caso(s) com comportamento inesperado` : 'RESULTADO: todos os casos invalidos bloquearam; o caso valido passou');
process.exit(failed ? 1 : 0);
