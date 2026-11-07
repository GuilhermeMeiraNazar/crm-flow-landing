import { chromium } from 'playwright';
const [w, h, tag] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4]];
const b = await chromium.launch(); const errs = [];
const c = await b.newContext({ viewport: { width: w, height: h } });
const p = await c.newPage();
p.on('console', m => { if (['error','warning'].includes(m.type())) errs.push(m.text()); }); p.on('pageerror', e => errs.push(e.message));
await p.goto('http://localhost:8088/', { waitUntil: 'networkidle' });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
await p.waitForTimeout(800);
const secs = await p.evaluate(() => [...document.querySelectorAll('main > section')].map(s => s.id || s.getAttribute('aria-label') || s.getAttribute('aria-labelledby')));
console.log(tag, 'secoes:', secs.join(' | '));
for (const [i, sel] of [['01-hero', 'main > section:nth-of-type(1)'], ['02-meio', null]]) { }
const handles = await p.$$('main > section');
for (let i = 0; i < handles.length; i++) { await handles[i].screenshot({ path: `_tools/sec-${tag}-${String(i + 1).padStart(2, '0')}.png` }); }
console.log('overflowX', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
console.log(errs.length ? errs.join('\n') : 'console: sem erros nem avisos');
await b.close();
