import { chromium } from 'playwright';
const b = await chromium.launch();
async function probe(reduced) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(100); }
  await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const cs = (sel) => { const e = document.querySelector(sel); return e ? getComputedStyle(e) : null; };
    const animName = (sel) => { const c = cs(sel); return c ? c.animationName : 'n/a'; };
    const anyAnimated = [...document.querySelectorAll('*')].filter((e) => getComputedStyle(e).animationName !== 'none').length;
    const revealMoved = [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).transform !== 'none').length;
    const nums = [...document.querySelectorAll('[class*="num"] b')].map((e) => e.textContent);
    return {
      matchMedia: matchMedia('(prefers-reduced-motion: reduce)').matches,
      marquee: animName('[class*="marquee_"], [class*="_marquee_"]'),
      elementosComAnimacaoCSS: anyAnimated,
      revealAindaDeslocados: revealMoved,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      contadores: nums,
      parallaxVar: document.querySelector('[data-parallax]').style.getPropertyValue('--py') || '(nao definido)',
    };
  });
  await ctx.close();
  return r;
}
console.log('reduced-motion = reduce      ->', JSON.stringify(await probe(true)));
console.log('reduced-motion = no-preference ->', JSON.stringify(await probe(false)));
await b.close();
