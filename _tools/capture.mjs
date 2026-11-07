import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
const pw = fs.readFileSync('../_baseline/.demo-admin-pw.txt', 'utf8').trim();
const OUT = '../capturas'; const RAW = '../_baseline/raw'; fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(RAW, { recursive: true });
const BASE = 'http://127.0.0.1:15173';

// MASCARAS: todo trecho que remete a funcionalidade fora da pagina (classe C, ou B nao liberada) ou a defeito do CRM
// e DESFOCADO de forma visivel (blur forte). Nada e removido nem reescrito: a tela continua sendo a tela real.
const mask = () => {
  const blur = (el) => { if (!el) return; el.style.filter = 'blur(7px)'; el.style.pointerEvents = 'none'; el.style.userSelect = 'none'; };
  // classe C no menu lateral: Calendario e Base de Conhecimento
  document.querySelectorAll('aside a[href="/calendar"], aside a[href="/knowledge-base"]').forEach(blur);
  // badge fixo "12" de Conversas (defeito do CRM)
  document.querySelectorAll('aside a[href="/inbox"] *').forEach((e) => { if (e.children.length === 0 && /^\d+$/.test(e.textContent.trim())) blur(e); });
  // card de estado da instancia local / WhatsApp (menciona conexao)
  const aside = document.querySelector('aside');
  if (aside) { const w = document.createTreeWalker(aside, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (/WhatsApp n[aã]o configurado|WhatsApp conectado/i.test(n.textContent)) { let e = n.parentElement; while (e && e.parentElement !== aside) e = e.parentElement; blur(e); } } }
  // total "R$ NaN" das colunas do kanban (defeito do CRM)
  document.querySelectorAll('main *, #root *').forEach((e) => { if (e.children.length === 0 && /^R\$\s*NaN$/.test(e.textContent.trim())) blur(e); });
  // "Sem mensagens" (campo que o backend nao devolve: defeito do CRM)
  document.querySelectorAll('main *, #root *').forEach((e) => { if (e.children.length === 0 && /^Sem mensagens$/.test(e.textContent.trim())) blur(e); });
  // busca "em breve"
  document.querySelectorAll('input[placeholder*="em breve"]').forEach((e) => blur(e.closest('div') || e));
  // IA: saldo de tokens (plano contratado) e limites do credito (classe B nao liberada)
  [...document.querySelectorAll('h1,h2,h3')].filter((h) => /Saldo de tokens|Limites do cr[eé]dito/.test(h.textContent)).forEach((h) => { blur(h); blur(h.nextElementSibling); const n2 = h.nextElementSibling && h.nextElementSibling.nextElementSibling; if (/Saldo/.test(h.textContent)) blur(n2); });
  // Inbox: anexo de imagem/documento (envio de midia retirado da pagina ate o teste passar)
  document.querySelectorAll('button[aria-label*="Anexar"]').forEach(blur);
};

const shots = [
  { id: 'inbox', path: '/inbox', act: async (p) => { await p.getByText('Ana Exemplo').first().click(); await p.waitForTimeout(1200); } },
  { id: 'pipeline', path: '/pipeline' },
  { id: 'automacoes', path: '/automations' },
  { id: 'analytics', path: '/admin/analytics' },
  { id: 'ia', path: '/admin/ai-settings' },
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
    await p.screenshot({ path: raw });
    const meta = await sharp(raw).metadata();
    await sharp(raw).webp({ quality: 82, effort: 5 }).toFile(`${OUT}/${s.id}-${theme}@2x.webp`);
    await sharp(raw).resize({ width: Math.round(meta.width / 2) }).webp({ quality: 82, effort: 5 }).toFile(`${OUT}/${s.id}-${theme}.webp`);
    console.log(s.id, theme, `${meta.width}x${meta.height}`);
  }
  await ctx.close();
}
await b.close();
