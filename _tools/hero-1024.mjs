import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1024, height: 700 } });
await ctx.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
const p = await ctx.newPage();
await p.goto('http://localhost:8088/', { waitUntil: 'networkidle' });
for (const y of [380, 560]) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(600);
  await p.screenshot({ path: `../_baseline/hero-1024-${y}.png` });
  console.log('scrollY', y, 'ok');
}
await b.close();
