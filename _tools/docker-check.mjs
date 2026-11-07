import { chromium } from 'playwright';
const base = 'http://localhost:8088';
for (const p of ['/', '/termos/', '/privacidade/', '/reembolso/', '/robots.txt', '/sitemap.xml', '/NAO_PUBLICAR.txt', '/nao-existe']) {
  const r = await fetch(base + p);
  console.log(String(r.status).padEnd(4), p.padEnd(20), r.headers.get('content-type'), '| cache:', r.headers.get('cache-control'), '| nosniff:', r.headers.get('x-content-type-options'));
}
const html = await (await fetch(base + '/')).text();
const avif = html.match(/\/assets\/[^"' ]+\.avif/)[0];
const ra = await fetch(base + avif);
console.log(String(ra.status).padEnd(4), avif.slice(0, 40), ra.headers.get('content-type'), '| cache:', ra.headers.get('cache-control'));
console.log('server header:', (await fetch(base + '/')).headers.get('server'));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const logs = [];
p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`${m.type()}: ${m.text().slice(0, 160)}`); });
p.on('pageerror', (e) => logs.push('pageerror: ' + e.message.slice(0, 160)));
p.on('requestfailed', (r) => logs.push('requestfailed: ' + r.url()));
await p.goto(base + '/', { waitUntil: 'networkidle' });
const H = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 500) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(80); }
await p.waitForTimeout(800);
const r = await p.evaluate(() => ({ h1: document.querySelector('h1')?.textContent, figuras: document.querySelectorAll('figure').length, legendas: document.querySelectorAll('figcaption').length, imgsCarregadas: [...document.querySelectorAll('picture img')].filter((i) => i.offsetParent && i.complete && i.naturalWidth > 0).length }));
console.log('navegador:', JSON.stringify(r));
console.log(logs.length ? logs.join('\n') : 'console: sem erros nem avisos');
await b.close();
