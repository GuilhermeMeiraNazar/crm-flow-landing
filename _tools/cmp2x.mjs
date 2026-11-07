import sharp from 'sharp'; import fs from 'node:fs';
const dir='dist/assets/'; const names=[...new Set(fs.readdirSync(dir).filter(f=>f.endsWith('.webp')).map(f=>f.replace(/@2x/,'').replace(/-[A-Za-z0-9_]{8}\.webp$/,'')))];
for (const n of names) {
  const one=fs.readdirSync(dir).find(f=>f.startsWith(n+'-')&&!f.includes('@2x')); const two=fs.readdirSync(dir).find(f=>f.startsWith(n+'@2x-'));
  const a=await sharp(dir+one).raw().toBuffer({resolveWithObject:true});
  const b=await sharp(dir+two).resize({width:a.info.width,height:a.info.height}).raw().toBuffer();
  let s=0; for(let i=0;i<a.data.length;i++) s+=Math.abs(a.data[i]-b[i]); console.log(n.padEnd(18),'diff medio 1x vs 2x reduzido =',(s/a.data.length).toFixed(2),'(0-255)');
}
