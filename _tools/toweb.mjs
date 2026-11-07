import sharp from 'sharp'; import fs from 'node:fs';
for (const f of fs.readdirSync('../verificacao/_png')) { await sharp('../verificacao/_png/'+f, { limitInputPixels: false }).webp({ quality: 70 }).toFile('../verificacao/'+f.replace('.png','.webp')); }
fs.rmSync('../verificacao/_png', { recursive: true, force: true }); console.log(fs.readdirSync('../verificacao').join('\n'));
