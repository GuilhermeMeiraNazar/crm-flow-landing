// Pre-renderiza as 4 paginas no HTML estatico (SEO e LCP), gera sitemap.xml e robots.txt a partir de site.js.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { SITE, absoluteUrl } from '../src/config/site.js';
import { checkHtml, checkSources, allowDraft } from './lib/guard.mjs';

const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const htmlViolations = [];
const pages = { 'index.html': 'home', 'termos/index.html': 'termos', 'privacidade/index.html': 'privacidade', 'reembolso/index.html': 'reembolso' };
for (const [file, page] of Object.entries(pages)) {
  const p = path.join('dist', file);
  let html = fs.readFileSync(p, 'utf8');
  const body = render(page);
  const re = /(<div id="root" data-page="[a-z]+">)[\s\S]*?(<\/div>\s*<\/body>)/;
  if (!re.test(html)) throw new Error(`marcador do root nao encontrado em ${file}`);
  html = html.replace(re, (_, a, b) => `${a}${body}${b}`);
  htmlViolations.push(...checkHtml(file, html));
  fs.writeFileSync(p, html);
  console.log('prerender ok:', file, `${(body.length / 1024).toFixed(1)} KB de HTML`);
}

const urls = ['/', ...(SITE.legalDraft ? [] : ['/termos/', '/privacidade/', '/reembolso/'])];
fs.writeFileSync('dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${absoluteUrl(u)}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`);
fs.rmSync('dist-ssr', { recursive: true, force: true });
console.log('sitemap.xml e robots.txt gerados; dist-ssr removido');

// TRAVA: o HTML gerado tambem nao pode conter placeholders (a menos que ALLOW_DRAFT_BUILD=1).
const pending = [...checkSources(), ...htmlViolations];
if (pending.length && !allowDraft()) {
  console.error('BUILD BLOQUEADO (prerender): ' + pending.length + ' pendencia(s)');
  pending.forEach((x) => console.error('  - ' + x));
  fs.rmSync('dist', { recursive: true, force: true });
  process.exit(1);
}
if (pending.length) {
  fs.writeFileSync('dist/NAO_PUBLICAR.txt', 'NAO PUBLICAR\n\nBuild de rascunho gerado com ALLOW_DRAFT_BUILD=1.\nPendencias (' + pending.length + '):\n' + pending.map((x) => '- ' + x).join('\n') + '\n');
  fs.writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
  console.warn('AVISO: dist/NAO_PUBLICAR.txt gravado; robots.txt com Disallow: /. NAO PUBLICAR este build.');
}