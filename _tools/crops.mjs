import { chromium } from 'playwright';
import fs from 'node:fs';
const [w, h, theme] = [Number(process.argv[2] || 1440), Number(process.argv[3] || 900), process.argv[4] || 'dark'];
const ids = (process.argv[5] || 'top,produto,ia,pipeline,seus-dados,como-funciona,requisitos,precos,faq').split(',');
const out = '../_baseline/crops'; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: w, height: h }, locale: 'pt-BR' });
await ctx.addInitScript((t) => localStorage.setItem('conversia.theme', t), theme);
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
const H = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 400) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(80); }
for (const id of ids) {
  await p.evaluate((i) => { if (i === 'top') window.scrollTo(0, 0); else document.getElementById(i)?.scrollIntoView(); }, id);
  await p.waitForTimeout(1600);
  await p.screenshot({ path: `${out}/${w}-${theme}-${id}.png` });
}
await b.close();
