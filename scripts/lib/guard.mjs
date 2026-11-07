// Regras da TRAVA DE PUBLICACAO. Usado por publish-guard.mjs (antes do build) e prerender.mjs (sobre o HTML gerado).
import { SITE } from '../../src/config/site.js';
import { copy } from '../../src/content/pt-BR.js';
import { legal } from '../../src/content/legal.js';

export const allowDraft = () => process.env.ALLOW_DRAFT_BUILD === '1';

const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

// CNPJ: 14 digitos, nao todos iguais, e os dois digitos verificadores (modulo 11) conferem.
export function validCnpj(value) {
  const d = String(value).replace(/\D/g, '');
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  const dv = (len) => {
    let sum = 0; let w = len - 7;
    for (let i = 0; i < len; i++) { sum += Number(d[i]) * w--; if (w < 2) w = 9; }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return dv(12) === Number(d[12]) && dv(13) === Number(d[13]);
}

// URL obrigatoriamente https:// com host valido. Retorna a descricao do problema ou null.
export function httpsProblem(value) {
  let u;
  try { u = new URL(String(value)); } catch { return 'nao e uma URL valida'; }
  if (u.protocol !== 'https:') return `deve usar https:// (protocolo atual: ${u.protocol.replace(':', '')}://)`;
  if (!u.hostname.includes('.')) return 'tem host invalido';
  return null;
}

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
  // Formato dos valores (so avalia o que nao e vazio nem placeholder; vazio e placeholder ja foram reportados acima)
  const real = (x) => !emptyish(x) && !looksPlaceholder(x);
  if (real(SITE.company?.cnpj) && !validCnpj(SITE.company.cnpj)) v.push(`SITE.company.cnpj invalido: digitos verificadores nao conferem ("${SITE.company.cnpj}")`);
  for (const k of ['CTA_URL', 'domain']) {
    if (emptyish(SITE[k])) continue;
    const r = httpsProblem(SITE[k]);
    if (r) v.push(`SITE.${k} ${r}: "${SITE[k]}"`);
  }
  if (real(SITE.contactEmail) && !EMAIL.test(String(SITE.contactEmail).trim())) v.push(`SITE.contactEmail com formato invalido: "${SITE.contactEmail}"`);
  const plans = SITE.pricing?.plans || [];
  if (!plans.length) v.push('SITE.pricing.plans esta vazio');
  plans.forEach((p, i) => {
    // implantacao: numero > 0. mensalidade: numero >= 0 (0 = plano sem mensalidade).
    const min = { setup: (x) => x > 0, monthly: (x) => x >= 0 };
    for (const k of ['setup', 'monthly']) {
      const val = p[k];
      if (typeof val !== 'number' || !Number.isFinite(val)) v.push(`SITE.pricing.plans[${i}].${k} deve ser numerico (tipo ${typeof val}, valor ${val})`);
      else if (!min[k](val)) v.push(`SITE.pricing.plans[${i}].${k} deve ser ${k === 'setup' ? 'maior que zero' : 'zero ou maior'} (valor ${val})`);
    }
    if (!['hosted', 'self'].includes(p.line)) v.push(`SITE.pricing.plans[${i}].line deve ser "hosted" ou "self" (valor ${p.line})`);
  });
  (SITE.pricing?.services || []).forEach((a, i) => {
    if (typeof a.price !== 'number' || !Number.isFinite(a.price) || a.price <= 0) v.push(`SITE.pricing.services[${i}].price deve ser numerico e maior que zero (valor ${a.price})`);
  });
  (SITE.pricing?.addons || []).forEach((a, i) => {
    if (typeof a.monthly !== 'number' || !Number.isFinite(a.monthly) || a.monthly <= 0) v.push(`SITE.pricing.addons[${i}].monthly deve ser numerico e maior que zero (valor ${a.monthly})`);
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
