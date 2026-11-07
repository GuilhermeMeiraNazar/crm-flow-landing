import sharp from 'sharp';
await sharp('_baseline/poster-src.png').avif({ quality: 50, effort: 6 }).toFile('public/media/fluxo-poster.avif');
const m = await sharp('public/media/fluxo-poster.avif').metadata();
console.log('poster', m.width, m.height);
