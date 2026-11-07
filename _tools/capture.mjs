import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
const pw = fs.readFileSync('../_baseline/.demo-admin-pw.txt', 'utf8').trim();
const OUT = '../capturas'; const RAW = '../_baseline/raw'; fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(RAW, { recursive: true });
const BASE = 'http://127.0.0.1:15173';

// Mascaras aplicadas SOMENTE na captura (nao alteram o CRM):
//  - badge fixo "12" de Conversas (defeito do CRM)
//  - itens de menu de funcionalidades classe C (Calendario, Base de Conhecimento)
//  - card de estado da instancia local (ruido do ambiente de demonstracao)
//  - total "R$ NaN" no cabecalho das colunas do kanban (defeito do CRM)
const mask = () => {
  const hide = (el) => el && (el.style.visibility = 'hidden');
  document.querySelectorAll('aside a[href="/calendar"], aside a[href="/knowledge-base"]').forEach((a) => { const li = a.closest('li'); if (li) li.style.display = 'none'; });
  document.querySelectorAll('aside a[href="/inbox"] *').forEach((e) => { if (e.children.length === 0 && /^\d+$/.test(e.textContent.trim())) hide(e); });
  const aside = document.querySelector('aside');
  if (aside) { const w = document.createTreeWalker(aside, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (/WhatsApp n[aÃ£]o configurado|WhatsApp conectado/i.test(n.textContent)) { let e = n.parentElement; while (e && e.parentElement !== aside) e = e.parentElement; if (e) e.style.visibility = 'hidden'; } } }
  document.querySelectorAll('main *, #root *').forEach((e) => { if (e.children.length === 0 && /^R\$\s*NaN$/.test(e.textContent.trim())) hide(e); });
  document.querySelectorAll('main *, #root *').forEach((e) => { if (e.children.length === 0 && /^Sem mensagens$/.test(e.textContent.trim())) hide(e); });
  document.querySelectorAll('input[placeholder*="em breve"]').forEach((e) => { const w = e.closest('div'); if (w) w.style.visibility = 'hidden'; });
  [...document.querySelectorAll('h1,h2,h3')].filter((h) => /Saldo de tokens/.test(h.textContent)).forEach((h) => { const sec = h.parentElement; if (sec && sec.children.length <= 3) sec.style.display = 'none'; else { let n = h; for (let i = 0; i < 2 && n; i++) { const x = n.nextElementSibling; n.style.display = 'none'; n = x; } if (n) n.style.display = 'none'; } });
};
const shots = [
  { id: 'inbox', path: '/inbox', act: async (p) => { await p.getByText('Ana Exemplo').first().click(); await p.waitForTimeout(1200); } },
  { id: 'pipeline', path: '/pipeline' },
  { id: 'contatos', path: '/contacts' },
  { id: 'automacoes', path: '/automations' },
  { id: 'analytics', path: '/admin/analytics' },
  { id: 'ia', path: '/admin/ai-settings' },
  { id: 'integracoes-leads', path: '/integrations', el: async (p) => { const h = await p.evaluateHandle(() => { const t = [...document.querySelectorAll('h1,h2,h3,h4')].find((e) => /Webhooks de leads/.test(e.textContent)); let e = t; while (e && e.parentElement && !(e.getBoundingClientRect().width > 800 && e.getBoundingClientRect().height > 250)) e = e.parentElement; return e; }); return h.asElement(); } },
];

const b = await chromium.launch();
for (const theme of ['dark', 'light']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' });
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
    if (s.el) await (await s.el(p)).screenshot({ path: raw }); else await p.screenshot({ path: raw });
    const meta = await sharp(raw).metadata();
    await sharp(raw).webp({ quality: 82, effort: 5 }).toFile(`${OUT}/${s.id}-${theme}@2x.webp`);
    await sharp(raw).resize({ width: Math.round(meta.width / 2) }).webp({ quality: 82, effort: 5 }).toFile(`${OUT}/${s.id}-${theme}.webp`);
    console.log(s.id, theme, `${meta.width}x${meta.height}`);
  }
  await ctx.close();
}
await b.close();


