// Executado antes do build de producao. Falha (exit 1) se a pagina nao esta pronta para publicar.
// ALLOW_DRAFT_BUILD=1 permite o build, imprime aviso e o prerender grava dist/NAO_PUBLICAR.txt.
import fs from 'node:fs';
import { checkSources, allowDraft } from './lib/guard.mjs';

const violations = checkSources();
if (!violations.length) { console.log('publish-guard: nenhuma pendencia. Build liberado.'); process.exit(0); }

if (allowDraft()) {
  console.warn(`\nAVISO publish-guard: ALLOW_DRAFT_BUILD=1. Build de RASCUNHO com ${violations.length} pendencia(s). NAO PUBLICAR.`);
  violations.slice(0, 12).forEach((x) => console.warn(`  - ${x}`));
  if (violations.length > 12) console.warn(`  ... e mais ${violations.length - 12}`);
  process.exit(0);
}

console.error(`\nBUILD BLOQUEADO pelo publish-guard: ${violations.length} pendencia(s) impedem a publicacao.`);
violations.forEach((x) => console.error(`  - ${x}`));
console.error('\nCorrija em src/config/site.js, src/content ou rode com ALLOW_DRAFT_BUILD=1 para gerar um build de rascunho (nao publicavel).');
// Um dist antigo nao pode ser publicado por engano depois de uma trava.
if (fs.existsSync('dist')) { fs.rmSync('dist', { recursive: true, force: true }); console.error('dist/ anterior removido.'); }
process.exit(1);
