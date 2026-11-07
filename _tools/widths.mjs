import { chromium } from 'playwright';
const port = process.argv[2] || '4173';
const b = await chromium.launch();
const logs = [];
for (const w of [320, 375, 768, 1024, 1440, 1920]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`[${w}] ${m.type()}: ${m.text().slice(0, 160)}`); });
  p.on('pageerror', (e) => logs.push(`[${w}] pageerror: ${e.message.slice(0, 160)}`));
  await p.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(90); }
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const figs = [...document.querySelectorAll('figure')];
    const visImgs = [...document.querySelectorAll('picture img')].filter((i) => i.offsetParent !== null);
    return {
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      figuras: figs.length,
      legendas: figs.filter((f) => f.querySelector('figcaption')?.textContent.trim() === 'Dados fictícios de demonstração').length,
      imgsVisiveis: visImgs.length,
      imgsCarregadas: visImgs.filter((i) => i.complete && i.naturalWidth > 0).length,
      formato: [...new Set(visImgs.map((i) => (i.currentSrc.match(/\.(avif|webp)/) || [])[1]))].join(','),
    };
  });
  console.log(`${String(w).padStart(4)} px`, JSON.stringify(r));
  await p.close();
}
console.log(logs.length ? logs.join('\n') : 'console: sem erros nem avisos');
await b.close();
