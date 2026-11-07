import sharp from 'sharp';
import fs from 'node:fs';
const dir = 'dist/assets/';
const files = fs.readdirSync(dir);
const diff = async (a, b) => {
  const A = await sharp(dir + a).raw().toBuffer({ resolveWithObject: true });
  const B = await sharp(dir + b).resize({ width: A.info.width, height: A.info.height }).raw().toBuffer();
  let s = 0; for (let i = 0; i < A.data.length; i++) s += Math.abs(A.data[i] - B[i]);
  return (s / A.data.length).toFixed(2);
};
const names = ['hero', 'pipeline', 'inbox', 'automacoes', 'ia', 'analytics'];
let rows = 0;
for (const n of names) for (const th of ['dark', 'light']) {
  const k = `${n}-${th}`;
  const w1 = files.find((f) => f.startsWith(`${k}-`) && f.endsWith('.webp'));
  const w2 = files.find((f) => f.startsWith(`${k}@2x-`) && f.endsWith('.webp'));
  const a1 = files.find((f) => f.startsWith(`${k}-`) && f.endsWith('.avif'));
  const a2 = files.find((f) => f.startsWith(`${k}@2x-`) && f.endsWith('.avif'));
  console.log(k.padEnd(16), `webp2x~1x=${await diff(w1, w2)}  avif1x~webp1x=${await diff(w1, a1)}  avif2x~webp2x=${await diff(w2, a2)}  | KB webp ${(fs.statSync(dir + w1).size / 1024).toFixed(1)} avif ${(fs.statSync(dir + a1).size / 1024).toFixed(1)}`);
  rows++;
}
console.log(`${rows} pares verificados (diferenca media por canal, 0-255)`);
