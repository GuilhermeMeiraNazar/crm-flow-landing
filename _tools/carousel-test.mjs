import { chromium } from 'playwright';
const base = 'http://localhost:8088';
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
  const arrows = [...document.querySelectorAll('button[aria-label="Pacote anterior"], button[aria-label="Próximo pacote"]')].map((a) => `${a.getAttribute('aria-label')}:${a.disabled ? 'desabilitado' : 'ativo'}`);
  const track = document.querySelector('[aria-roledescription="carrossel"]');
  return { ativo: cur, scrollLeft: Math.round(track.scrollLeft), setas: arrows, cartoes: track.children.length };
});

// desktop
let { ctx, p } = await open(1440, 900);
console.log('desktop inicial   ', JSON.stringify(await state(p)));
await p.locator('button[aria-label="Próximo pacote"]').click(); await p.waitForTimeout(1000);
console.log('apos Proximo      ', JSON.stringify(await state(p)));
await p.screenshot({ path: '../_baseline/plans-desktop-2.png' });
await p.locator('[aria-roledescription="carrossel"]').focus();
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1000);
console.log('ArrowRight        ', JSON.stringify(await state(p)));
await p.screenshot({ path: '../_baseline/plans-desktop-3.png' });
await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(900);
console.log('ArrowLeft         ', JSON.stringify(await state(p)));
await p.getByRole('button', { name: 'Ver Pacote Básico' }).click(); await p.waitForTimeout(900);
console.log('aba "Ver Basico"  ', JSON.stringify(await state(p)));
await p.screenshot({ path: '../_baseline/plans-desktop-1.png' });
await ctx.close();

// mobile
({ ctx, p } = await open(375, 812));
console.log('mobile inicial    ', JSON.stringify(await state(p)));
await p.locator('button[aria-label="Próximo pacote"]').click(); await p.waitForTimeout(1000);
console.log('mobile apos Prox  ', JSON.stringify(await state(p)));
await p.screenshot({ path: '../_baseline/plans-mobile-2.png' });
console.log('mobile overflowX  ', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
await ctx.close();

// reduced motion: troca sem animacao
({ ctx, p } = await open(1440, 900, { reducedMotion: 'reduce' }));
await p.locator('button[aria-label="Próximo pacote"]').click(); await p.waitForTimeout(250);
console.log('reduced-motion    ', JSON.stringify(await state(p)), '| transicao do cartao:', await p.evaluate(() => getComputedStyle(document.querySelector('[aria-roledescription="slide"]')).transitionDuration));
await ctx.close();
console.log(logs.length ? logs.join('\n') : 'console: sem erros nem avisos');
await b.close();
