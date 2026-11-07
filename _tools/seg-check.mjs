import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:8088';
const b = await chromium.launch(); const errs = [];
for (const w of [320, 375, 414, 768, 1440]) {
  const c = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await c.newPage();
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) errs.push(`[${w}] ` + m.text()); });
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => [...document.querySelectorAll('[role="tablist"]')].map((tl) => {
    const box = tl.getBoundingClientRect();
    const btns = [...tl.querySelectorAll('[role="tab"]')].map((x) => x.getBoundingClientRect());
    return { rotulo: tl.getAttribute('aria-label'), caixa: Math.round(box.width), todosDentro: btns.every((q) => q.left >= box.left - 1 && q.right <= box.right + 1), linhas: new Set(btns.map((q) => Math.round(q.top))).size, rolagemInterna: tl.scrollWidth > tl.clientWidth + 1 };
  }));
  const nums = await p.evaluate(() => /provedores de IA com a sua chave/.test(document.body.innerText));
  console.log(w, JSON.stringify(r), '| faixa de numeros presente:', nums);
  if (w === 375) {
    await p.locator('#produto [role="tablist"]').scrollIntoViewIfNeeded();
    await p.locator('#produto [role="tablist"]').screenshot({ path: '_tools/seg-produto.png' });
    await p.locator('#precos [role="tablist"]').scrollIntoViewIfNeeded();
    await p.getByRole('tab', { name: 'No seu servidor' }).click();
    await p.locator('#precos [role="tablist"]').screenshot({ path: '_tools/seg-planos.png' });
  }
  await c.close();
}
console.log(errs.length ? errs.join('\n') : 'console: sem erros nem avisos');
await b.close();
