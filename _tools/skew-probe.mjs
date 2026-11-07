import { chromium } from 'playwright';
import sharp from 'sharp';
const base = 'http://localhost:8088';
const variants = {
  atual: '',
  'sem mascara': '[class*="_tilt_"]{-webkit-mask-image:none!important;mask-image:none!important}',
  'origem de perspectiva centro': '[class*="_stage_"]{perspective-origin:50% 50%!important}',
  'sem blur do glow': '[class*="_stageGlow_"]{filter:none!important;display:none!important}',
  'sem nada (mascara+glow+origem)': '[class*="_tilt_"]{-webkit-mask-image:none!important;mask-image:none!important}[class*="_stage_"]{perspective-origin:50% 50%!important}[class*="_stageGlow_"]{display:none!important}',
};
const b = await chromium.launch();
for (const [name, css] of Object.entries(variants)) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem('conversia.theme', 'dark'));
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  if (css) await p.addStyleTag({ content: css });
  await p.waitForTimeout(400);
  const f = `../_baseline/skew-${Object.keys(variants).indexOf(name)}.png`;
  await p.screenshot({ path: f });
  const { data, info } = await sharp(f).raw().toBuffer({ resolveWithObject: true });
  const lum = (x, y) => { const i = (y * info.width + x) * info.channels; return data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11; };
  const edge = (x) => { for (let y = 640; y < 899; y++) { if (lum(x, y) - lum(x, y - 3) > 6 && lum(x, y + 2) > 14) return y; } return -1; };
  const l = edge(260), r = edge(1180);
  console.log(name.padEnd(34), `borda superior em x=260: y=${l} | x=1180: y=${r} | diferenca ${l - r}px`);
  await ctx.close();
}
await b.close();
