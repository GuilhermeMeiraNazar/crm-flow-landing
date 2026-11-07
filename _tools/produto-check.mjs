import { chromium } from 'playwright';
const b = await chromium.launch(); const errs = [];
for (const [w, h, n] of [[1440, 900, 'd'], [375, 812, 'm']]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  await c.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
  const p = await c.newPage();
  p.on('console', m => { if (['error','warning'].includes(m.type())) errs.push(`[${w}] ` + m.text()); }); p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8088/#produto', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await p.locator('#produto').scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  await p.locator('#produto').screenshot({ path: `produto-${n}-1.png` });
  if (n === 'd') {
    await p.getByRole('tab', { name: 'Automações' }).click(); await p.waitForTimeout(700);
    console.log('painel visivel apos clique:', await p.evaluate(() => [...document.querySelectorAll('[role=tabpanel]')].map(e => e.id + ':' + !e.hidden).join(' ')));
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(500);
    console.log('apos ArrowRight:', await p.evaluate(() => document.querySelector('[role=tab][aria-selected=true]').textContent));
    await p.locator('#produto').screenshot({ path: `produto-${n}-2.png` });
  }
  console.log(w, 'overflowX', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
}
console.log(errs.length ? errs.join('\n') : 'console: sem erros nem avisos');
await b.close();
