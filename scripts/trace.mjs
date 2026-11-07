// Gera TRACEABILIDADE.md: cada afirmacao da pagina (src/content/pt-BR.js) ligada aos itens de CONTEUDO.md.
// Falha (exit 1) se algum id de evidencia for desconhecido ou apontar para classe C.
import fs from 'node:fs';
import { SITE } from '../src/config/site.js';
import { copy } from '../src/content/pt-BR.js';

const REF = {
  S1: ['CONTEUDO.md secao 1 (proposta de valor e headlines)', 'n/a'],
  'S3.1': ['CONTEUDO.md secao 3.1 (instalacao dedicada, dados do cliente)', 'A'],
  'S3.2': ['CONTEUDO.md secao 3.2 (BYOK, provedores aceitos)', 'A'],
  'S3.4': ['CONTEUDO.md secao 3.4 (licenca offline, vinculo ao IP)', 'A'],
  S4: ['CONTEUDO.md secao 4 (requisitos de instalacao)', 'A'],
  S5: ['CONTEUDO.md secao 5 (integracoes existentes)', 'A'],
  F1: ['Funcionalidade 1: caixa de entrada multiatendente', 'A'],
  F3: ['Funcionalidade 3: agente de IA com transferencia para humano', 'A'],
  F4: ['Funcionalidade 4: transcricao de audio', 'A'],
  F5: ['Funcionalidade 5: extracao de lead por IA', 'A'],
  F6: ['Funcionalidade 6: lead vira negocio', 'A'],
  F7: ['Funcionalidade 7: pipeline kanban', 'A'],
  F8: ['Funcionalidade 8: etapas configuraveis', 'A'],
  F9: ['Funcionalidade 9: historico de movimentacao', 'A'],
  F12: ['Funcionalidade 12: automacoes por etapa (3 acoes)', 'A'],
  F14: ['Funcionalidade 14: relatorios', 'A'],
  F15: ['Funcionalidade 15: exportacao CSV/XLSX', 'A'],
  F16: ['Funcionalidade 16: chaves de IA proprias (BYOK)', 'A'],
  F17: ['Funcionalidade 17: funcoes de IA e fallback', 'A'],
  F18a: ['Funcionalidade 18a: registro de uso e custo de IA', 'A'],
  F27: ['Funcionalidade 27: usuarios e agentes', 'A'],
  F28: ['Funcionalidade 28: tema claro e escuro', 'A'],
  FRAME: ['Enquadramento editorial, sem afirmacao factual sobre o produto', 'n/a'],
};

const C = copy(SITE);
const TEXT_KEYS = ['h1', 'sub', 'title', 't', 'q', 'a', 'd', 'lead', 'privacy', 'footnote', 'name', 'note'];
const rows = []; const noEv = []; const unknown = new Set();
const clip = (s) => (s.length > 150 ? `${s.slice(0, 147)}...` : s);
(function walk(node, trail) {
  if (Array.isArray(node)) { node.forEach((n, i) => walk(n, `${trail}[${i}]`)); return; }
  if (!node || typeof node !== 'object') return;
  const own = TEXT_KEYS.filter((k) => typeof node[k] === 'string').map((k) => node[k]).join(' ');
  const ids = node.ev || node.privacyEv || node.footnoteEv;
  if (own && Array.isArray(ids)) {
    ids.forEach((i) => { if (!REF[i]) unknown.add(i); });
    rows.push({ trail, text: clip(own), ids, review: !!node.review });
  } else if (own && !Array.isArray(ids) && trail.split('.').length > 0 && !['seo'].includes(trail.split('.')[0])) {
    noEv.push({ trail, text: clip(own) });
  }
  for (const [k, v] of Object.entries(node)) if (typeof v === 'object') walk(v, `${trail}.${k}`);
})(C, 'copy');

const bad = [...unknown];
const md = [];
md.push('# Rastreabilidade: afirmacoes da pagina x CONTEUDO.md', '');
md.push('Gerado por `node scripts/trace.mjs` a partir de `src/content/pt-BR.js`. Cada linha tem os ids de evidencia (`ev`) da afirmacao.', '');
md.push('| # | Onde | Afirmacao (trecho) | Evidencia | Classe |', '|---|---|---|---|---|');
rows.forEach((r, i) => {
  const cls = [...new Set(r.ids.map((id) => (REF[id] ? REF[id][1] : '?')))].join(', ');
  md.push(`| ${i + 1} | \`${r.trail.replace('copy.', '')}\` | ${r.text.replace(/\|/g, '/')} | ${r.ids.join(', ')} | ${cls}${r.review ? ' (marcado na pagina para revisao)' : ''} |`);
});
md.push('', '## Legenda dos ids', '', '| Id | Item de CONTEUDO.md | Classe final |', '|---|---|---|');
Object.entries(REF).forEach(([id, [d, c]]) => md.push(`| ${id} | ${d} | ${c} |`));
md.push('', '## Texto sem id de evidencia (rotulos, navegacao, placeholders)', '', 'Nao fazem afirmacao factual sobre o produto.', '', '| Onde | Texto |', '|---|---|');
noEv.forEach((r) => md.push(`| \`${r.trail.replace('copy.', '')}\` | ${r.text.replace(/\|/g, '/')} |`));
md.push('', '## Placeholders configuraveis (src/config/site.js)', '', 'Preco, garantia, reemissao de licenca, servico de instalacao, contatos, CNPJ, dominio e URL do CTA. Nenhum valor real foi inventado.');
fs.writeFileSync('TRACEABILIDADE.md', `${md.join('\n')}\n`);
console.log(`afirmacoes rastreadas: ${rows.length} | ids desconhecidos: ${bad.length ? bad.join(',') : 'nenhum'} | texto sem ev: ${noEv.length}`);
const C_ids = rows.filter((r) => r.ids.some((i) => REF[i] && REF[i][1] === 'C'));
console.log(`afirmacoes ligadas a itens classe C: ${C_ids.length}`);
process.exit(bad.length || C_ids.length ? 1 : 0);
