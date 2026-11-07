import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { SITE, absoluteUrl } from './src/config/site.js';
import { copy } from './src/content/pt-BR.js';

const C = copy(SITE);
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Meta tags e dados estruturados vem de src/config/site.js e src/content (nada hardcoded nos .html).
const PAGES = {
  'index.html': { path: '/', title: C.seo.title, description: C.seo.description, index: true, ld: true },
  'termos/index.html': { path: '/termos/', title: `Termos de uso | ${SITE.name}`, description: `Termos de uso da licença do ${SITE.name}.`, index: !SITE.legalDraft },
  'privacidade/index.html': { path: '/privacidade/', title: `Política de privacidade | ${SITE.name}`, description: `Como este site trata dados pessoais.`, index: !SITE.legalDraft },
  'reembolso/index.html': { path: '/reembolso/', title: `Reembolso e arrependimento | ${SITE.name}`, description: `Política de reembolso e arrependimento do ${SITE.name}.`, index: !SITE.legalDraft },
};

const jsonLd = () => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  description: C.seo.description,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Linux (Docker)',
  inLanguage: SITE.locale,
  url: absoluteUrl('/'),
  image: absoluteUrl('/og-image.png'),
});

function htmlMeta() {
  return {
    name: 'html-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const key = ctx.path.replace(/^\//, '');
        const p = PAGES[key] || PAGES['index.html'];
        const url = absoluteUrl(p.path);
        const img = absoluteUrl('/og-image.png');
        const tags = [
          `<title>${esc(p.title)}</title>`,
          `<meta name="description" content="${esc(p.description)}" />`,
          `<meta name="robots" content="${p.index ? 'index,follow' : 'noindex,nofollow'}" />`,
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:type" content="website" />`,
          `<meta property="og:locale" content="pt_BR" />`,
          `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
          `<meta property="og:title" content="${esc(p.title)}" />`,
          `<meta property="og:description" content="${esc(p.description)}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:image" content="${img}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${esc(C.seo.ogAlt)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${esc(p.title)}" />`,
          `<meta name="twitter:description" content="${esc(p.description)}" />`,
          `<meta name="twitter:image" content="${img}" />`,
          `<meta name="twitter:image:alt" content="${esc(C.seo.ogAlt)}" />`,
          p.ld ? `<script type="application/ld+json">${jsonLd()}</script>` : '',
        ].filter(Boolean).join('\n    ');
        return html.replace('<!--SEO-->', tags);
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), htmlMeta()],
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        termos: resolve(import.meta.dirname, 'termos/index.html'),
        privacidade: resolve(import.meta.dirname, 'privacidade/index.html'),
        reembolso: resolve(import.meta.dirname, 'reembolso/index.html'),
      },
    },
  },
});
