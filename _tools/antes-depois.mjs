import { chromium } from 'playwright';
const tag = process.argv[2];
const b = await chromium.launch();
for (const [w, h, n] of [[1440, 900, 'd'], [375, 812, 'm']]) {
  const c = await b.newContext({ viewport: { width: w, height: h } });
  await c.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
  const p = await c.newPage();
  await p.goto('http://localhost:8088/', { waitUntil: 'networkidle' });
  for (const [sel, name] of [['section[aria-labelledby="problema"]', 'problema'], ['#como-funciona', 'como-funciona']]) {
    const l = p.locator(sel); await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(1600);
    await l.screenshot({ path: `verificacao/antes-depois/${name}-${tag}-${n}.png` });
  }
}
await b.close();
