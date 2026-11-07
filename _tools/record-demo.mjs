// Grava o fluxo Conversas -> Pipeline -> Automacoes na copia _demo (dados ficticios). Sem audio.
import { chromium } from 'playwright';
import fs from 'node:fs';
const pw = fs.readFileSync('_baseline/.demo-admin-pw.txt', 'utf8').trim();
const BASE = 'http://127.0.0.1:15173';
const OUT = '_baseline/video-raw';
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });

// Rodando na pagina a cada 250 ms: borra itens nao divulgados e qualquer texto que nao deve aparecer; desenha um cursor visivel.
const INIT = () => {
  const blur = (el) => { if (!el) return; el.style.filter = 'blur(7px)'; el.style.pointerEvents = 'none'; el.style.userSelect = 'none'; };
  const mask = () => {
    document.querySelectorAll('aside a[href="/calendar"], aside a[href="/knowledge-base"], aside a[href="/products"]').forEach(blur);
    document.querySelectorAll('aside a[href="/inbox"] *').forEach((e) => { if (e.children.length === 0 && /^\d+$/.test(e.textContent.trim())) blur(e); });
    const aside = document.querySelector('aside');
    if (aside) { const w = document.createTreeWalker(aside, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { if (/WhatsApp n[aã]o configurado|WhatsApp conectado/i.test(n.textContent)) { let e = n.parentElement; while (e && e.parentElement !== aside) e = e.parentElement; blur(e); } } }
    document.querySelectorAll('main *, #root *').forEach((e) => {
      if (e.children.length === 0) {
        const t = e.textContent.trim();
        if (/^R\$\s*NaN$/.test(t) || /^Sem mensagens$/.test(t)) blur(e);
      }
    });
    document.querySelectorAll('button[aria-label*="Anexar"]').forEach(blur);
    document.querySelectorAll('input[placeholder*="em breve"]').forEach((e) => blur(e.closest('div') || e));
  };
  setInterval(mask, 250);
  window.addEventListener('DOMContentLoaded', () => {
    const c = document.createElement('div');
    c.style.cssText = 'position:fixed;z-index:2147483647;width:18px;height:18px;border-radius:50%;background:rgba(124,111,255,.55);border:2px solid #fff;pointer-events:none;left:-40px;top:-40px;transform:translate(-50%,-50%);transition:left .08s linear,top .08s linear';
    document.body.appendChild(c);
    window.addEventListener('mousemove', (e) => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }, { passive: true });
  });
};

const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: 1280, height: 720 }, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo',
  recordVideo: { dir: OUT, size: { width: 1280, height: 720 } },
});
await ctx.addInitScript(() => localStorage.setItem('crmflow.theme', 'dark'));
await ctx.addInitScript(INIT);
const p = await ctx.newPage();
const move = async (x, y, steps = 24) => { await p.mouse.move(x, y, { steps }); };
const T0 = Date.now();
const wait = (ms) => p.waitForTimeout(Math.round(ms * 1.8));

// Login (fora do quadro util: so formulario) e entrada em Conversas
await p.goto(BASE + '/login');
await p.fill('input[type="email"], input[name="email"]', 'admin@demo.local');
await p.fill('input[type="password"]', pw);
await p.click('button[type="submit"]');
await p.waitForURL((u) => !u.pathname.includes('login'), { timeout: 20000 });
const trimAt = ((Date.now() - T0) / 1000).toFixed(1);
await p.goto(BASE + '/inbox', { waitUntil: 'networkidle' });
await wait(2500);

// 1) Conversas
await move(640, 360); await wait(1200);
await p.getByText('Ana Exemplo').first().hover(); await wait(1500);
await p.getByText('Ana Exemplo').first().click(); await wait(3500);
await move(900, 450); await wait(2000);
await p.getByText('Bruno Teste').first().click().catch(() => {}); await wait(3500);
await move(700, 300); await wait(2500);
await p.getByText('Camila Modelo').first().click().catch(() => {}); await wait(3500);
await move(950, 420); await wait(2500);

// 2) Pipeline (pelo menu lateral)
const side = async (name, href) => { const l = p.locator(`aside a[href="${href}"]`).first(); const bb = await l.boundingBox(); if (bb) { await move(bb.x + bb.width / 2, bb.y + bb.height / 2, 30); await wait(600); } await l.click(); await wait(2500); };
await side('Pipeline', '/pipeline');
await move(640, 300); await wait(2500);
// arrasta um cartao da 1a para a 2a coluna (dados ficticios na copia)
const card = p.getByText('Plano mensal - Ana').first();
const cb = await card.boundingBox().catch(() => null);
if (cb) {
  await move(cb.x + 40, cb.y + 12, 20); await wait(500);
  await p.mouse.down(); await wait(300);
  await p.mouse.move(cb.x + 260, cb.y + 40, { steps: 25 }); await wait(300);
  await p.mouse.move(cb.x + 440, cb.y + 60, { steps: 25 }); await wait(500);
  await p.mouse.up(); await wait(2500);
}
await move(900, 500); await wait(3000);

// 3) Automacoes
await side('Automações', '/automations');
await move(640, 260); await wait(3000);
await move(700, 340, 30); await wait(3000);
await move(640, 420, 30); await wait(3500);
await move(800, 300, 30); await wait(2500);

const vp = await p.video().path();
await ctx.close();
await b.close();
fs.copyFileSync(vp, `${OUT}/fluxo-raw.webm`);
console.log('inicio util (s):', trimAt);
console.log('gravado:', `${OUT}/fluxo-raw.webm`, fs.statSync(`${OUT}/fluxo-raw.webm`).size, 'bytes');
