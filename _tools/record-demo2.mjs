// Gravacao v2: ritmo rapido, cursor suave com "clique" animado, legendas curtas e arraste de cartoes. Sem audio.
// Roda contra a copia _demo (dados ficticios). A barra lateral e recortada depois, no ffmpeg.
import { chromium } from 'playwright';
import fs from 'node:fs';
const pw = fs.readFileSync('_baseline/.demo-admin-pw.txt', 'utf8').trim();
const BASE = 'http://127.0.0.1:15173';
const OUT = '_baseline/video-raw2';
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const SIDE = 248; // largura da barra lateral (recortada no video final)

const INIT = () => {
  const blur = (el) => { if (!el) return; el.style.filter = 'blur(7px)'; el.style.pointerEvents = 'none'; el.style.userSelect = 'none'; };
  const mask = () => {
    document.querySelectorAll('aside a[href="/calendar"], aside a[href="/knowledge-base"], aside a[href="/products"]').forEach(blur);
    document.querySelectorAll('aside a[href="/inbox"] *').forEach((e) => { if (e.children.length === 0 && /^\d+$/.test(e.textContent.trim())) blur(e); });
    document.querySelectorAll('main *, #root *').forEach((e) => { if (e.children.length === 0) { const t = e.textContent.trim(); if (/^R\$\s*NaN$/.test(t) || /^Sem mensagens$/.test(t) || /^R\$\s*[\d.,]+\s*(mil|mi|k|M)$/i.test(t)) blur(e); } });
    document.querySelectorAll('button[aria-label*="Anexar"]').forEach(blur);
  };
  setInterval(mask, 250);
  window.addEventListener('DOMContentLoaded', () => {
    const css = document.createElement('style');
    css.textContent = `
      #__cur{position:fixed;z-index:2147483647;left:-60px;top:-60px;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;background:rgba(124,111,255,.65);border:2px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.45);pointer-events:none}
      .__rip{position:fixed;z-index:2147483646;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:3px solid #9A90FF;pointer-events:none;animation:__rip .55s ease-out forwards}
      @keyframes __rip{to{transform:scale(4.5);opacity:0}}
      #__cap{position:fixed;z-index:2147483645;bottom:28px;left:calc(248px + (100vw - 248px) / 2);transform:translate(-50%,16px);opacity:0;padding:12px 24px;border-radius:999px;background:rgba(15,20,27,.94);border:1px solid #7C6FFF;color:#fff;font:600 19px/1.2 Inter,system-ui,sans-serif;white-space:nowrap;box-shadow:0 10px 30px rgba(0,0,0,.5);transition:opacity .35s ease,transform .35s ease}
      #__cap.on{opacity:1;transform:translate(-50%,0)}
      #root{transition:transform 5s cubic-bezier(.3,.1,.3,1);transform-origin:60% 40%}
    `;
    document.head.appendChild(css);
    const cur = document.createElement('div'); cur.id = '__cur'; document.body.appendChild(cur);
    const cap = document.createElement('div'); cap.id = '__cap'; document.body.appendChild(cap);
    window.addEventListener('mousemove', (e) => { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; }, { passive: true });
    window.__rip = (x, y) => { const r = document.createElement('div'); r.className = '__rip'; r.style.left = x + 'px'; r.style.top = y + 'px'; document.body.appendChild(r); setTimeout(() => r.remove(), 700); };
    window.__cap = (t) => { if (!t) { cap.classList.remove('on'); return; } cap.classList.remove('on'); setTimeout(() => { cap.textContent = t; cap.classList.add('on'); }, 120); };
    window.__push = (s) => { const r = document.getElementById('root'); if (r) r.style.transform = s === 1 ? 'none' : `scale(${s})`; };
  });
};

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo', recordVideo: { dir: OUT, size: { width: 1280, height: 720 } } });
await ctx.addInitScript(() => localStorage.setItem('crmflow.theme', 'dark'));
await ctx.addInitScript(INIT);
const p = await ctx.newPage();
const T0 = Date.now();

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
let cur = { x: 760, y: 420 };
const glide = async (x, y, ms = 650) => {
  const steps = Math.max(10, Math.round(ms / 22));
  for (let i = 1; i <= steps; i++) { const e = ease(i / steps); await p.mouse.move(cur.x + (x - cur.x) * e, cur.y + (y - cur.y) * e); await p.waitForTimeout(ms / steps - 4 > 0 ? ms / steps - 4 : 0); }
  cur = { x, y };
};
const center = async (loc) => { const bb = await loc.boundingBox(); return bb ? { x: bb.x + bb.width / 2, y: bb.y + bb.height / 2, bb } : null; };
const tap = async (loc, ms = 650) => {
  const c = await center(loc); if (!c) return false;
  await glide(c.x, c.y, ms);
  await p.evaluate(([x, y]) => window.__rip(x, y), [c.x, c.y]);
  await p.mouse.down(); await p.waitForTimeout(70); await p.mouse.up();
  return true;
};
const cap = (t) => p.evaluate((x) => window.__cap(x), t);
const wait = (ms) => p.waitForTimeout(ms);
const drag = async (fromLoc, toLoc, dropDy = 110) => {
  const a = await center(fromLoc); const d = await toLoc.boundingBox(); if (!a || !d) return false;
  await glide(a.x - a.bb.width / 2 + 40, a.y, 500); await wait(120);
  await p.mouse.down(); await wait(180);
  await glide(a.x + 30, a.y - 14, 160);
  await glide(d.x + d.width / 2, d.y + dropDy, 900);
  await wait(160); await p.mouse.up(); await wait(500);
  return true;
};

// Login e entrada (o inicio, com o formulario, e cortado no ffmpeg)
await p.goto(BASE + '/login');
await p.fill('input[type="email"], input[name="email"]', 'admin@demo.local');
await p.fill('input[type="password"]', pw);
await p.click('button[type="submit"]');
await p.waitForURL((u) => !u.pathname.includes('login'), { timeout: 20000 });
await p.goto(BASE + '/inbox', { waitUntil: 'networkidle' });
await wait(1200);
const startAt = ((Date.now() - T0) / 1000).toFixed(1);

// Cena 1: conversas
await cap('Fila de conversas da equipe');
await wait(1100);
await tap(p.getByText('Ana Exemplo').first(), 700); await wait(1300);
await cap('Cada conversa abre ao lado, sem sair da tela');
await tap(p.getByText('Bruno Teste').first(), 600); await wait(1500);
await cap('Cliente pediu uma pessoa? A conversa vai para a equipe');
await tap(p.getByText('Camila Modelo').first(), 600); await wait(2100);
await cap('Na fila, a equipe assume com um clique');
await glide(520, 70, 700);
const assumir = p.getByRole('button', { name: 'Assumir', exact: true }).first();
const ac = await center(assumir); if (ac) await glide(ac.x, ac.y, 600);
await wait(1500);
await cap('');

// Cena 2: pipeline
const side = async (href) => { const l = p.locator(`aside a[href="${href}"]`).first(); await tap(l, 800); };
await side('/pipeline'); await wait(1100);
await cap('Pipeline: arraste os negócios entre as etapas');
await wait(1000);
// Colunas visiveis e coluna atual de cada cartao (os dados da copia mudam a cada gravacao): move sempre para a coluna seguinte.
const cols = ['Novo lead', 'Em atendimento', 'Proposta enviada'].map((n) => p.getByText(n, { exact: true }).first());
const colIndexOf = async (card) => {
  const c = await center(card); let best = 0; let dist = 1e9;
  for (let i = 0; i < cols.length; i++) { const cb = await cols[i].boundingBox(); const d = Math.abs(c.x - (cb.x + 130)); if (d < dist) { dist = d; best = i; } }
  return best;
};
const moveNext = async (card, dy) => { const i = await colIndexOf(card); return drag(card, cols[(i + 1) % cols.length], dy); };
await moveNext(p.getByText('Kit iniciante - Bruno').first(), 120);
await wait(500);
await cap('Solte na etapa e o funil se atualiza');
await moveNext(p.getByText('Orçamento de equipamentos - Diego').first(), 140);
await wait(1300);
await glide(900, 520, 700); await wait(700);
await cap('');

// Cena 3: automacoes
await side('/automations'); await wait(900);
await cap('Automações por etapa: avisar, agendar ou enviar template');
await wait(900);
const rows = p.locator('tbody tr');
const n = await rows.count().catch(() => 0);
for (let i = 0; i < Math.min(n, 3); i++) { const c = await center(rows.nth(i)); if (c) { await glide(c.x + 120, c.y, 650); await wait(900); } }
await wait(700);
await cap('');
await wait(900);

const vp = await p.video().path();
await ctx.close();
await b.close();
fs.copyFileSync(vp, `${OUT}/fluxo2-raw.webm`);
console.log('inicio util (s):', startAt);
console.log('gravado:', `${OUT}/fluxo2-raw.webm`, fs.statSync(`${OUT}/fluxo2-raw.webm`).size, 'bytes');
