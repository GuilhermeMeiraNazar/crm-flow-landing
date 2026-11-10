// Gera um pacote completo e publicável em deploy/.
// O build é executado sempre para evitar empacotar um dist antigo.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// O projeto atual ainda possui placeholders; por isso o pacote padrão é a cópia de demonstração.
// Use --production quando a trava de publicação estiver resolvida.
const draft = !process.argv.includes('--production');
const dist = path.join(root, 'dist');
const deploy = path.join(root, 'deploy');
const preserved = new Set();

console.log('package:deploy: executando build de produção...');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const build = spawnSync(npm, ['run', 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production', ...(draft ? { ALLOW_DRAFT_BUILD: '1' } : {}) },
  shell: process.platform === 'win32',
});
if (build.error) {
  console.error(`package:deploy: não foi possível executar ${npm}: ${build.error.message}`);
  process.exit(1);
}
if (build.status !== 0) {
  console.error('package:deploy: build falhou; deploy/ não foi alterada.');
  process.exit(build.status || 1);
}

const draftMarker = path.join(dist, 'NAO_PUBLICAR.txt');
if (!fs.existsSync(dist) || (fs.existsSync(draftMarker) && !draft)) {
  console.error(draft ? 'package:deploy: build não gerou dist/.' : 'package:deploy: build não publicável. Use npm run package:deploy -- --draft apenas para gerar uma cópia de demonstração.');
  process.exit(1);
}
if (fs.existsSync(draftMarker)) console.warn('package:deploy: AVISO: pacote de RASCUNHO; não publicar em produção.');

fs.mkdirSync(deploy, { recursive: true });
for (const entry of fs.readdirSync(deploy)) {
  if (!preserved.has(entry)) fs.rmSync(path.join(deploy, entry), { recursive: true, force: true });
}

function copyDirectory(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) copyDirectory(from, to);
    else fs.copyFileSync(from, to);
  }
}

copyDirectory(dist, deploy);
const files = [];
function collect(directory, relative = '') {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const rel = path.join(relative, entry.name);
    if (entry.isDirectory()) collect(path.join(directory, entry.name), rel);
    else files.push(rel);
  }
}
collect(deploy);
console.log(`package:deploy: ${files.length} arquivos copiados para ${path.relative(root, deploy)}/`);
console.log('package:deploy: pacote pronto para hospedagem estática.');
