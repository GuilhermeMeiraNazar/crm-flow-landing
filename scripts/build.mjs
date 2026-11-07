// Build de producao: trava de publicacao, cliente, SSR e prerender. Forca NODE_ENV=production
// (um NODE_ENV=development herdado do shell geraria React em modo de desenvolvimento).
import { spawnSync } from 'node:child_process';

const env = { ...process.env, NODE_ENV: 'production' };
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  console.warn(`aviso: NODE_ENV=${process.env.NODE_ENV} no ambiente foi ignorado; o build usa NODE_ENV=production.`);
}
const steps = [
  ['node', ['scripts/publish-guard.mjs']],
  ['npx', ['vite', 'build']],
  ['npx', ['vite', 'build', '--ssr', 'src/entry-server.jsx', '--outDir', 'dist-ssr']],
  ['node', ['scripts/prerender.mjs']],
];
for (const [cmd, args] of steps) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', env, shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status || 1);
}
