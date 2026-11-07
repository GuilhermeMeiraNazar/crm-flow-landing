import { chromium } from 'playwright';
const b = await chromium.launch(); const errs = [];
for (const [w, h, n] of [[1440, 900, 'd'], [375, 812, 'm']]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  await c.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
  const p = await c.newPage();
  p.on('console', m => { if (['error','warning'].includes(m.type())) errs.push(m.text()); }); p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8088/#servicos', { waitUntil: 'networkidle' });
  await p.locator('#servicos').scrollIntoViewIfNeeded(); await p.waitForTimeout(1800);
  await p.locator('#servicos').screenshot({ path: `_tools/serv-${n}.png` });
  console.log(w, 'overflowX', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
}
console.log(errs.length ? errs.join('\n') : 'console: sem erros nem avisos');
await b.close();
