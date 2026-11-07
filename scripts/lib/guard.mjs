// Regras da TRAVA DE PUBLICACAO. Usado por publish-guard.mjs (antes do build) e prerender.mjs (sobre o HTML gerado).
import { SITE } from '../../src/config/site.js';
import { copy } from '../../src/content/pt-BR.js';
import { legal } from '../../src/content/legal.js';

export const allowDraft = () => process.env.ALLOW_DRAFT_BUILD === '1';

const BRACKET = /\[[^\]\n]{2,}\]/;           // placeholder em colchetes
const CONFIRM = /\[?\s*CONFIRMAR/i;           // "[CONFIRMAR ...": mesmo sem colchete de fechamento
const emptyish = (v) => v == null || String(v).trim() === '';
const looksPlaceholder = (v) => /example|\[|\]|CONFIRMAR|A DEFINIR/i.test(String(v));

function* strings(node, trail) {
  if (typeof node === 'string') { yield [trail, node]; return; }
  if (Array.isArray(node)) { for (let i = 0; i < node.length; i++) yield* strings(node[i], `${trail}[${i}]`); return; }
  if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) yield* strings(v, trail ? `${trail}.${k}` : k);
}

// Verifica a configuracao e todo o texto de origem. Retorna lista de violacoes.
export function checkSources() {
  const v = [];
  // (b) rascunho juridico
  if (SITE.legalDraft === true) v.push('SITE.legalDraft e true (textos legais ainda sao rascunho)');
  // (c) campos obrigatorios vazios ou placeholder
  const must = { CTA_URL: SITE.CTA_URL, domain: SITE.domain, contactEmail: SITE.contactEmail, contactWhatsapp: SITE.contactWhatsapp, 'company.legalName': SITE.company?.legalName, 'company.cnpj': SITE.company?.cnpj };
  for (const [k, val] of Object.entries(must)) {
    if (emptyish(val)) v.push(`SITE.${k} esta vazio`);
    else if (looksPlaceholder(val)) v.push(`SITE.${k} e placeholder: "${val}"`);
  }
  if (!emptyish(SITE.contactWhatsapp) && /0{7,}/.test(String(SITE.contactWhatsapp))) v.push(`SITE.contactWhatsapp e placeholder: "${SITE.contactWhatsapp}"`);
  const plans = SITE.pricing?.plans || [];
  if (!plans.length) v.push('SITE.pricing.plans esta vazio');
  plans.forEach((p, i) => {
    if (typeof p.price !== 'number' || !Number.isFinite(p.price) || p.price <= 0) v.push(`SITE.pricing.plans[${i}].price nao e um numero valido (valor atual: ${p.price})`);
  });
  // (a) qualquer texto com colchetes ou "CONFIRMAR"
  const all = { SITE, copy: copy(SITE), legal: legal(SITE) };
  for (const [root, obj] of Object.entries(all)) {
    for (const [trail, s] of strings(obj, root)) {
      if (BRACKET.test(s) || CONFIRM.test(s)) v.push(`placeholder em ${trail}: ${s.match(BRACKET)?.[0] ?? s.match(CONFIRM)?.[0]}`);
    }
  }
  return v;
}

// Verifica o HTML ja gerado (texto visivel, alt, aria-label, meta). Ignora <script> e <style>.
export function checkHtml(file, html) {
  const v = [];
  const clean = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  for (const m of clean.matchAll(/\[[^\]\n]{2,}\]/g)) v.push(`${file}: colchetes no HTML: ${m[0]}`);
  if (CONFIRM.test(clean)) v.push(`${file}: contem "CONFIRMAR"`);
  return v;
}
