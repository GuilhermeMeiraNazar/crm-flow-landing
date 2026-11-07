import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:8088';
const b = await chromium.launch(); const errs = [];
for (const [w, h, n] of [[1440, 900, 'd'], [768, 900, 't'], [375, 812, 'm']]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  const p = await c.newPage();
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errs.push(`[${w}] ` + m.text()); });
  p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.locator('#como-funciona').scrollIntoViewIfNeeded();
  await p.waitForTimeout(4500);
  await p.locator('#como-funciona').screenshot({ path: `_tools/flow-${n}.png` });
  const info = await p.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    segmentos: document.querySelectorAll('svg path[marker-end]').length,
    secoes: [...document.querySelectorAll('main > section')].map((s) => s.id || s.getAttribute('aria-label') || 'hero').join(' > '),
  }));
  console.log(w, JSON.stringify(info));
  if (n === 'm') {
    await p.getByRole('tab', { name: 'No seu servidor' }).click();
    await p.locator('#precos').scrollIntoViewIfNeeded();
    await p.waitForTimeout(600);
    await p.locator('#painel-self article').first().screenshot({ path: '_tools/self-card-m.png' });
    const li = await p.evaluate(() => { const e = document.querySelector('#painel-self li[class*="no"]'); const r = e.getBoundingClientRect(); const card = e.closest('article').getBoundingClientRect(); return { larguraItem: Math.round(r.width), larguraCard: Math.round(card.width), dentro: r.right <= card.right + 1 && r.bottom <= card.bottom }; });
    console.log('item "Sem correcao..." no cartao:', JSON.stringify(li));
  }
  await c.close();
}
console.log(errs.length ? errs.join('\n') : 'console: sem erros nem avisos');
await b.close();
