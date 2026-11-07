import { chromium } from 'playwright';
import fs from 'node:fs';
const out = process.argv[2] || '../_baseline/page';
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const logs = [];
for (const [w, h] of [[375, 812], [768, 1024], [1440, 900]]) {
  for (const theme of ['dark', 'light']) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, locale: 'pt-BR' });
    await ctx.addInitScript((t) => localStorage.setItem('conversia.theme', t), theme);
    const p = await ctx.newPage();
    p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${w}/${theme}] ${m.type()}: ${m.text().slice(0, 200)}`); });
    p.on('pageerror', (e) => logs.push(`[${w}/${theme}] pageerror: ${e.message.slice(0, 200)}`));
    await p.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    // percorre a pagina para disparar revelacoes e imagens lazy
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 500) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(120); }
    await p.waitForTimeout(1500);
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`${w}x${h} ${theme}: altura=${H}px overflowX=${overflow}`);
    await p.screenshot({ path: `${out}/home-${w}-${theme}.png`, fullPage: true });
    await ctx.close();
  }
}
console.log(logs.length ? logs.join('\n') : 'sem erros/avisos de console');
await b.close();
