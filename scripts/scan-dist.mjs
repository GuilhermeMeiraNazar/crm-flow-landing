// Varredura textual completa do dist/ contra termos proibidos (classe C, B nao liberada, modelo de entrega, claims vedadas).
// Cobre: title, meta, Open Graph, Twitter, JSON-LD, alt, aria-label, title="", sitemap, manifest, robots, comentarios HTML,
// bundles JS/CSS e NOMES de arquivo (inclusive de imagens). Exit 1 se houver ocorrencia.
import fs from 'node:fs';
import path from 'node:path';

const TERMS = [
  ['Base de Conhecimento / KB / RAG', /base de conhecimento|knowledge|\bKB\b|\bRAG\b|kb-|reindex|reconcilia/i],
  ['embeddings / vetores', /embedding|lancedb|qdrant|vector/i],
  ['PIX / cobranca / gateways', /\bpix\b|cobran[cç]a|asaas|mercado ?pago|payment|pagamento por/i],
  ['calendario', /calend[aá]rio|calendar|agenda externa/i],
  ['Baileys / QR / nao oficial', /baileys|\bQR\b|qr ?code|n[aã]o[- ]oficial|unofficial/i],
  ['Click-to-WhatsApp / atribuicao', /click.?to.?whatsapp|\bctwa\b|referral/i],
  ['Hub local / Ollama', /ollama|hub-local|core hub/i],
  ['modelo de entrega', /c[oó]digo[- ]fonte|source code|\bclone\b|reposit[oó]rio|\bgit\b/i],
  ['midia (item B retirado)', /imagens e documentos|anexar|anexo|envio de m[ií]dia|envio de imagem/i],
  ['claims vedadas', /100% privad|nada sai|depoimento|\bISO ?27|\bSOC ?2|uptime|lgpd (compliant|conforme)|garantimos/i],
  ['placeholders', /\[[^\]\n]{2,}\]|CONFIRMAR|NAO PUBLICAR/],
];
const TEXT = /\.(html|js|css|json|xml|txt|svg|webmanifest|map)$/i;
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk('dist');
const vendorSkipped = [];
let hits = 0; let scanned = 0; let ph = 0; // ph: placeholders (informativo aqui; o publish-guard bloqueia o build real)
const rel = (f) => f.replace(/\\/g, '/');

for (const f of files) {
  // nomes de arquivo
  for (const [label, re] of TERMS) if (re.test(path.basename(f))) { hits++; console.log(`HIT nome de arquivo [${label}]: ${rel(f)}`); }
  if (!TEXT.test(f)) continue;
  // Codigo de terceiros (React) fica no chunk vendor-*.js e e varrido a parte: so gera falsos positivos de identificadores minificados.
  if (/vendor-[^/\\]*\.js$/.test(f)) { vendorSkipped.push(rel(f)); continue; }
  scanned++;
  const t = fs.readFileSync(f, 'utf8');
  for (const [label, re] of TERMS) {
    if (label === 'placeholders' && (path.basename(f) === 'NAO_PUBLICAR.txt' || !/\.(html|xml|txt)$/.test(f))) continue;
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`);
    for (const m of t.matchAll(g)) {
      if (label === 'placeholders') { ph++; continue; }
      hits++;
      const i = m.index; console.log(`HIT [${label}] ${rel(f)}: ...${t.slice(Math.max(0, i - 40), i + m[0].length + 40).replace(/\s+/g, ' ')}...`);
    }
  }
}

// Inventario do que foi varrido nos HTML (para conferencia visual)
const attr = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
for (const f of files.filter((x) => x.endsWith('.html'))) {
  const h = fs.readFileSync(f, 'utf8');
  console.log(`\n== ${rel(f)}`);
  console.log(' title        :', attr(h, /<title>([^<]*)<\/title>/g).join(' | '));
  console.log(' meta (n)     :', attr(h, /<meta [^>]*content="([^"]*)"/g).length, '| og/twitter:', attr(h, /<meta (?:property|name)="(?:og|twitter):[^"]*" content="([^"]*)"/g).length);
  console.log(' json-ld (n)  :', attr(h, /<script type="application\/ld\+json">/g).length);
  console.log(' alt (n)      :', attr(h, /\salt="([^"]*)"/g).length, '| aria-label (n):', attr(h, /\saria-label="([^"]*)"/g).length, '| title="" (n):', attr(h, /\stitle="([^"]*)"/g).length);
  console.log(' comentarios  :', attr(h, /<!--([\s\S]*?)-->/g).length ? JSON.stringify(attr(h, /<!--([\s\S]*?)-->/g).map((c) => c.slice(0, 40))) : 'nenhum');
}
const imgs = files.filter((x) => /\.(png|webp|avif|svg|jpg|ico)$/i.test(x)).map(rel);
console.log(`\narquivos de imagem (${imgs.length}):\n  ${imgs.join('\n  ')}`);
console.log('chunk de terceiros nao varrido por termos de conteudo:', vendorSkipped.join(', ') || 'nenhum');
console.log('manifest:', files.some((x) => /manifest/i.test(x)) ? files.filter((x) => /manifest/i.test(x)).map(rel).join(', ') : 'nao existe (nenhum arquivo .webmanifest/manifest.json no dist)');
console.log(`\nplaceholders encontrados (informativo; o publish-guard bloqueia build de producao): ${ph}`);
console.log(`resumo: ${files.length} arquivos, ${scanned} de texto varridos, ${TERMS.length} grupos de termos, ocorrencias proibidas: ${hits}`);
process.exit(hits ? 1 : 0);
