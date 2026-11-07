import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
await c.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
const p = await c.newPage();
await p.goto('http://localhost:8088/#produto', { waitUntil: 'networkidle' });
await p.waitForTimeout(800);
for (const n of ['Pipeline', 'Relatórios']) {
  await p.getByRole('tab', { name: n }).click(); await p.waitForTimeout(600);
  await p.locator('#produto').screenshot({ path: `produto-${n === 'Pipeline' ? 'p' : 'r'}.png` });
}
await p.locator('#produto [class*="numbers"]').scrollIntoViewIfNeeded(); await p.waitForTimeout(1800);
console.log('contadores:', await p.evaluate(() => [...document.querySelectorAll('[class*="num"] b')].map(e => e.textContent).join(',')));
await b.close();
