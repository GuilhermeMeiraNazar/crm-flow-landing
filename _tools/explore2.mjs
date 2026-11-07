import { chromium } from 'playwright';
import fs from 'node:fs';
const pw = fs.readFileSync('../_baseline/.demo-admin-pw.txt', 'utf8').trim();
const out = '../_baseline/explore2'; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'pt-BR' });
await ctx.addInitScript(() => localStorage.setItem('crmflow.theme', 'dark'));
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:15173/login');
await p.fill('input[type="email"], input[name="email"]', 'admin@demo.local');
await p.fill('input[type="password"]', pw);
await p.click('button[type="submit"]');
await p.waitForURL((u) => !u.pathname.includes('login'), { timeout: 20000 });
for (const [n, path] of [['dashboard', '/'], ['analytics', '/admin/analytics']]) {
  await p.goto('http://127.0.0.1:15173' + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/${n}.png`, fullPage: true });
  const heads = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map((h) => { const r = h.getBoundingClientRect(); return `${h.tagName} "${h.textContent.trim().slice(0, 50)}" y=${Math.round(r.top + scrollY)} x=${Math.round(r.left)}`; }));
  console.log(`== ${n}\n` + heads.join('\n'));
}
await b.close();
