import { chromium } from 'playwright';
const b = await chromium.launch(); const errs = [];
for (const [w, h, n] of [[1440, 900, 'd'], [1024, 800, 't'], [375, 812, 'm']]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  await c.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
  const p = await c.newPage();
  p.on('console', m => { if (['error','warning'].includes(m.type())) errs.push(m.text()); }); p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8088/', { waitUntil: 'networkidle' });
  await p.locator('#ia').scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
  await p.locator('#ia').screenshot({ path: `ia-${n}.png` });
  const h2 = await p.evaluate(() => { const l = document.querySelector('ol').getBoundingClientRect(); const i = document.querySelector('#ia img').getBoundingClientRect(); return [Math.round(l.height), Math.round(i.height), document.documentElement.scrollWidth - document.documentElement.clientWidth]; });
  console.log(w, 'altura lista/imagem/overflowX', h2.join(' / '));
}
console.log(errs.length ? errs.join('\n') : 'console: sem erros nem avisos');
await b.close();
