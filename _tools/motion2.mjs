import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:8088';
const b = await chromium.launch();
for (const [w, rm, label] of [[1440, 'reduce', 'desktop + reduced-motion'], [375, 'no-preference', 'celular 375 px'], [1440, 'no-preference', 'desktop sem preferencia']]) {
  const c = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: rm });
  const p = await c.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const mesh = document.querySelector('[class*="mesh"]');
    const hero = document.querySelector('[class*="hero"]');
    const running = document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.target && !a.effect.target.closest('[class*="plan"]'));
    return {
      mesh: getComputedStyle(mesh).display,
      fundoEstatico: getComputedStyle(hero).backgroundImage !== 'none',
      animacoesRodando: running.length,
      animacoes: [...new Set(running.map((a) => a.animationName || a.constructor.name))].slice(0, 4),
    };
  });
  console.log(label.padEnd(26), JSON.stringify(r));
  await c.close();
}
await b.close();
