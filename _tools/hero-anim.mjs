import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:8088';
const b = await chromium.launch();
for (const theme of ['dark', 'light']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript((t) => localStorage.setItem('conversia.theme', t), theme);
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  for (const y of [0, 200, 420]) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(500);
    const v = await p.evaluate(() => { const s = document.querySelector('[data-parallax]'); const t = s.firstElementChild.nextElementSibling; return { p: s.style.getPropertyValue('--p') || '(0)', transform: getComputedStyle(t).transform.slice(0, 60) }; });
    console.log(theme, 'scrollY', y, JSON.stringify(v));
    if (theme === 'dark') await p.screenshot({ path: `../_baseline/hero-anim-${y}.png` });
  }
  await ctx.close();
}
// reduced motion: sem transformacao
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const p = await ctx.newPage(); await p.goto(base + '/', { waitUntil: 'networkidle' });
console.log('reduced-motion transform:', await p.evaluate(() => { const s = document.querySelector('[data-parallax]'); return getComputedStyle(s.firstElementChild.nextElementSibling).transform; }));
// mobile 375: sem estouro
const m = await b.newPage({ viewport: { width: 375, height: 812 } }); await m.goto(base + '/', { waitUntil: 'networkidle' });
console.log('375 px overflowX:', await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
await b.close();
