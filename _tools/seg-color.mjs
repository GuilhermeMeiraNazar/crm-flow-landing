import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 375, height: 812 } });
const p = await c.newPage();
await p.goto('http://localhost:8088/', { waitUntil: 'networkidle' });
await p.locator('#precos [role="tablist"]').scrollIntoViewIfNeeded();
await p.getByRole('tab', { name: 'No seu servidor' }).click();
await p.waitForTimeout(800);
for (const sel of ['#produto', '#precos']) {
  console.log(sel, JSON.stringify(await p.evaluate((s) => [...document.querySelectorAll(`${s} [role="tab"]`)].map((t) => `${t.textContent}: ${t.getAttribute('aria-selected')} cor=${getComputedStyle(t).color} fundo=${getComputedStyle(t).backgroundImage.slice(0, 22)}`), sel)));
}
await p.locator('#precos [role="tablist"]').screenshot({ path: '_tools/seg-planos.png' });
await b.close();
