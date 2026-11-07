import fs from 'node:fs';
const re = /C:\\\\|C:\/dev|crm-flow-ia|_demo|\.env|BEGIN (RSA |PUBLIC )?(PRIVATE )?KEY|JWT_SECRET|MASTER_ENCRYPTION|DB_PASSWORD|localhost:13000|127\.0\.0\.1|sk-DEMO/g;
const files = fs.readdirSync('dist/assets').map((f) => `dist/assets/${f}`).concat(['dist/index.html']).filter((f) => /\.(js|css|html)$/.test(f));
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(re)) console.log(f.split('/').pop(), `[${m[0]}]`, '...' + t.slice(Math.max(0, m.index - 45), m.index + 55).replace(/\s+/g, ' ') + '...');
}
