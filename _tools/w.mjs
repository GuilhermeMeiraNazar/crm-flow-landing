import { chromium } from 'playwright';
const b = await chromium.launch();
for (const w of [320, 1920]) { const p = await b.newPage({ viewport: { width: w, height: 900 } }); await p.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
 const r = await p.evaluate(() => ({ overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth, maxChild: Math.max(...[...document.querySelectorAll('body *')].map(e => e.getBoundingClientRect().right)) }));
 console.log(w, JSON.stringify(r)); await p.screenshot({ path: `../_baseline/crops/w${w}.png` }); await p.close(); }
await b.close();
