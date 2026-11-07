import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:8088';
const b = await chromium.launch();
for (const w of [320, 375, 414, 768, 1024, 1280, 1440, 1920]) {
  const c = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await c.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const de = document.documentElement; const bad = [];
    document.querySelectorAll('body *').forEach((e) => {
      const q = e.getBoundingClientRect();
      if (q.width > 0 && q.right > de.clientWidth + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('[class*="tableWrap"]') && !e.closest('[class*="seg"]')) bad.push(typeof e.className === 'string' ? e.className.slice(0, 40) : e.tagName);
    });
    const h1 = document.querySelector('h1');
    const lines = Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight));
    return { overflowX: de.scrollWidth - de.clientWidth, foraDaTela: [...new Set(bad)].slice(0, 5), linhasH1: lines };
  });
  console.log(w, JSON.stringify(r));
  await c.close();
}
await b.close();
