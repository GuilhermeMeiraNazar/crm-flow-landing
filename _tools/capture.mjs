import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
const pw = fs.readFileSync('../_baseline/.demo-admin-pw.txt', 'utf8').trim();
const OUT = '../src/assets/capturas'; const RAW = '../_baseline/raw2';
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(RAW, { recursive: true });
const BASE = 'http://127.0.0.1:15173';
const SIDEBAR_W = 256; // sidebar do app = 248 px + 8 px para a sombra dela; as telas de funcionalidade sao RECORTADAS (clip do navegador) a partir daqui

// Mascaras (desfoque visivel) apenas para o que sobra no enquadramento.
// hero: sidebar completa, com Calendario, Base de Conhecimento e Catalogo desfocados.
const mask = () => {
  const blur = (el) => { if (!el) return; el.style.filter = 'blur(7px)'; el.style.pointerEvents = 'none'; el.style.userSelect = 'none'; };
  document.querySelectorAll('aside a[href="/calendar"], aside a[href="/knowledge-base"], aside a[href="/products"]').forEach(blur);
  document.querySelectorAll('aside a[href="/inbox"] *').forEach((e) => { if (e.children.length === 0 && /^\d+$/.test(e.textContent.trim())) blur(e); });
  const aside = document.querySelector('aside');
  if (aside) { const w = document.createTreeWalker(aside, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (/WhatsApp n[aã]o configurado|WhatsApp conectado/i.test(n.textContent)) { let e = n.parentElement; while (e && e.parentElement !== aside) e = e.parentElement; blur(e); } } }
  document.querySelectorAll('main *, #root *').forEach((e) => { if (e.children.length === 0 && /^R\$\s*NaN$/.test(e.textContent.trim())) blur(e); });
  document.querySelectorAll('main *, #root *').forEach((e) => { if (e.children.length === 0 && /^Sem mensagens$/.test(e.textContent.trim())) blur(e); });
  document.querySelectorAll('input[placeholder*="em breve"]').forEach((e) => blur(e.closest('div') || e));
  [...document.querySelectorAll('h1,h2,h3')].filter((h) => /Saldo de tokens|Limites do cr[eé]dito/.test(h.textContent)).forEach((h) => { blur(h); blur(h.nextElementSibling); const n2 = h.nextElementSibling && h.nextElementSibling.nextElementSibling; if (/Saldo/.test(h.textContent)) blur(n2); });
  document.querySelectorAll('button[aria-label*="Anexar"]').forEach(blur);
};

const full = { w: 1440, h: 900 };
const shots = [
  { id: 'hero', path: '/pipeline', clip: { x: 0, y: 0, width: full.w, height: full.h } },
  { id: 'pipeline', path: '/pipeline', clip: { x: SIDEBAR_W, y: 0, width: full.w - SIDEBAR_W, height: full.h } },
  { id: 'inbox', path: '/inbox', act: async (p) => { await p.getByText('Ana Exemplo').first().click(); await p.waitForTimeout(1200); }, clip: { x: SIDEBAR_W, y: 0, width: full.w - SIDEBAR_W, height: full.h } },
  { id: 'automacoes', path: '/automations', clip: { x: SIDEBAR_W, y: 0, width: full.w - SIDEBAR_W, height: 480 } },
  { id: 'ia', path: '/admin/ai-settings', clip: { x: SIDEBAR_W, y: 0, width: full.w - SIDEBAR_W, height: full.h } },
  // Relatorios: somente o painel "Deals por estagio" (contagem de negocios por etapa). Sem taxa de conversao, valores ou tempos.
  { id: 'analytics', path: '/admin/analytics', el: async (p) => { const h = await p.evaluateHandle(() => { const t = [...document.querySelectorAll('h2')].find((e) => /Deals por est[aá]gio/.test(e.textContent)); let e = t; while (e && e.parentElement && !(e.getBoundingClientRect().width > 450 && e.getBoundingClientRect().height > 200)) e = e.parentElement; return e; }); return h.asElement(); } },
];

const manifest = {};
const b = await chromium.launch();
for (const theme of ['dark', 'light']) {
  const ctx = await b.newContext({ viewport: { width: full.w, height: full.h }, deviceScaleFactor: 2, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' });
  await ctx.addInitScript((t) => localStorage.setItem('crmflow.theme', t), theme);
  const p = await ctx.newPage();
  await p.goto(BASE + '/login');
  await p.fill('input[type="email"], input[name="email"]', 'admin@demo.local');
  await p.fill('input[type="password"]', pw);
  await p.click('button[type="submit"]');
  await p.waitForURL((u) => !u.pathname.includes('login'), { timeout: 20000 });
  for (const s of shots) {
    await p.goto(BASE + s.path, { waitUntil: 'networkidle' }).catch(() => {});
    await p.waitForTimeout(1200);
    if (s.act) await s.act(p);
    await p.evaluate(mask); await p.waitForTimeout(300);
    const raw = `${RAW}/${s.id}-${theme}.png`;
    if (s.el) await (await s.el(p)).screenshot({ path: raw }); else await p.screenshot({ path: raw, clip: s.clip });
    const meta = await sharp(raw).metadata();
    const w1 = Math.round(meta.width / 2), h1 = Math.round(meta.height / 2);
    manifest[s.id] = [w1, h1];
    const base = `${OUT}/${s.id}-${theme}`;
    await sharp(raw).webp({ quality: 82, effort: 5 }).toFile(`${base}@2x.webp`);
    await sharp(raw).resize({ width: w1 }).webp({ quality: 82, effort: 5 }).toFile(`${base}.webp`);
    await sharp(raw).avif({ quality: 55, effort: 4 }).toFile(`${base}@2x.avif`);
    await sharp(raw).resize({ width: w1 }).avif({ quality: 55, effort: 4 }).toFile(`${base}.avif`);
    console.log(s.id, theme, `${meta.width}x${meta.height} (1x ${w1}x${h1})`);
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2));
console.log('manifest:', JSON.stringify(manifest));
