import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:4399';
const tag = process.argv[3] || 'x';
const b = await chromium.launch();
for (const [w, h, n] of [[1440, 900, 'd'], [1024, 800, 't'], [375, 812, 'm']]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  await c.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
  const p = await c.newPage();
  await p.goto(base + '/#precos', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await p.locator('#precos').scrollIntoViewIfNeeded();
  await p.waitForTimeout(900);
  await p.locator('#precos').screenshot({ path: `_tools/shot-price-${tag}-${n}.png` });
}
await b.close();
