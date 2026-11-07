import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:8088';
const b = await chromium.launch();
const logs = [];
async function open(w, h, extra = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, ...extra });
  await ctx.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
  const p = await ctx.newPage();
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${w}] ${m.type()}: ${m.text().slice(0, 150)}`); });
  p.on('pageerror', (e) => logs.push(`[${w}] pageerror: ${e.message.slice(0, 150)}`));
  await p.goto(base + '/#precos', { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);
  return { ctx, p };
}
const state = (p) => p.evaluate(() => {
  const tabs = [...document.querySelectorAll('[aria-label="Pacotes e valores"] button')];
  const cur = tabs.findIndex((t) => t.getAttribute('aria-current') === 'true');
  const next = document.querySelector('button[aria-label="Próximo pacote"]');
  const prev = document.querySelector('button[aria-label="Pacote anterior"]');
  const track = document.querySelector('[aria-roledescription="carrossel"]');
  const cards = [...track.children].map((c) => { const r = c.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right)]; });
  return { ativo: cur, scrollLeft: Math.round(track.scrollLeft), barra: getComputedStyle(next.closest('div').parentElement).display, anterior: prev.disabled ? 'off' : 'on', proximo: next.disabled ? 'off' : 'on', cartoes: cards, vw: document.documentElement.clientWidth };
});
// desktop: os tres cartoes cabem, alinhados ao container, sem barra de controles
let { ctx, p } = await open(1440, 900);
console.log('desktop 1440  ', JSON.stringify(await state(p)));
console.log('desktop overflowX', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
await ctx.close();
({ ctx, p } = await open(1024, 800));
console.log('tablet 1024   ', JSON.stringify(await state(p)));
await ctx.close();
// mobile: rolagem com setas, abas, teclado
({ ctx, p } = await open(375, 812));
console.log('mobile inicial', JSON.stringify(await state(p)));
await p.locator('button[aria-label="Próximo pacote"]').click(); await p.waitForTimeout(1000);
console.log('apos Proximo  ', JSON.stringify(await state(p)));
await p.locator('[aria-roledescription="carrossel"]').focus();
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1000);
console.log('ArrowRight    ', JSON.stringify(await state(p)));
await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(900);
console.log('ArrowLeft     ', JSON.stringify(await state(p)));
await p.getByRole('button', { name: 'Ver Pacote Premium' }).click(); await p.waitForTimeout(1000);
console.log('aba Premium   ', JSON.stringify(await state(p)));
await p.getByRole('button', { name: 'Ver Pacote Básico' }).click(); await p.waitForTimeout(1000);
console.log('aba Basico    ', JSON.stringify(await state(p)));
console.log('mobile overflowX', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
await ctx.close();
// reduced motion
({ ctx, p } = await open(375, 812, { reducedMotion: 'reduce' }));
await p.locator('button[aria-label="Próximo pacote"]').click(); await p.waitForTimeout(250);
console.log('reduced-motion', JSON.stringify((await state(p)).ativo), '| transicao:', await p.evaluate(() => getComputedStyle(document.querySelector('[aria-roledescription="slide"]')).transitionDuration));
await ctx.close();
console.log(logs.length ? logs.join('\n') : 'console: sem erros nem avisos');
await b.close();
