> SUPERADO por verificacao/AUDITORIA-VAZAMENTO.md. As notas de Lighthouse abaixo foram medidas com o React em modo de desenvolvimento (NODE_ENV=development herdado do shell).

# Verificacao (saidas literais)

## 1. Build
```
dist/index.html                                               3.38 kB   gzip:  1.05 kB
dist/assets/style-Dv8f07rN.css                               27.33 kB   gzip:  6.78 kB
dist/assets/entry-client-CUggfccA.js                        184.76 kB   gzip: 59.30 kB
[32m  built in 443ms[39m
[32m  built in 349ms[39m
prerender index.html 30.0 KB de HTML
prerender termos/index.html 5.4 KB de HTML
prerender privacidade/index.html 4.6 KB de HTML
prerender reembolso/index.html 3.9 KB de HTML
sitemap.xml e robots.txt gerados; dist-ssr removido
exit do build: 0
```

## 2. Lighthouse (mobile, throttling simulado, Lighthouse 13.6.0, Chromium do Playwright)

| Pagina | Desempenho | Acessibilidade | Boas praticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| home | 99 | 100 | 100 | 100 | 2.2 s | 0.004 | 10 ms |
| termos | 100 | 100 | 100 | 66 | 0.8 s | 0 | 0 ms |
| privacidade | 100 | 100 | 100 | 66 | 0.8 s | 0 | 0 ms |
| reembolso | 100 | 100 | 100 | 66 | 0.8 s | 0.006 | 0 ms |

As tres paginas legais pontuam 66 em SEO por uma unica auditoria, `is-crawlable`: saem com `noindex` de proposito enquanto `legalDraft` for `true` (rascunho nao deve ser indexado). Com `legalDraft: false` a meta vira `index,follow`.

## 3. Links
```
paginas: 4 | referencias internas verificadas: 82 | quebradas: 0
links externos (nao requisitados; sao placeholders ou destinos de terceiros):
   https://conversia.example/
   https://conversia.example/comprar
   https://conversia.example/privacidade/
   https://conversia.example/reembolso/
   https://conversia.example/termos/
   https://wa.me/5511900000000?text=Ola!%20Quero%20saber%20mais%20sobre%20o%20ConversIA.
exit: 0
```

## 4. prefers-reduced-motion
```
reduced-motion = reduce      -> {"matchMedia":true,"marquee":"none","elementosComAnimacaoCSS":0,"revealAindaDeslocados":0,"scrollBehavior":"auto","contadores":["4","3","3","2"],"parallaxVar":"(nao definido)"}
reduced-motion = no-preference -> {"matchMedia":false,"marquee":"_marquee_1fsyv_444","elementosComAnimacaoCSS":18,"revealAindaDeslocados":0,"scrollBehavior":"smooth","contadores":["4","3","3","2"],"parallaxVar":"48.0px"}
```

## 5. Rastreabilidade
```
afirmacoes rastreadas: 58 | ids desconhecidos: nenhum | texto sem ev: 9
afirmacoes ligadas a itens classe C: 0
```

## 6. Largura e console
Sem rolagem horizontal em 320, 375, 768, 1440 e 1920 px (`scrollWidth - clientWidth = 0`). Capturas da pagina inteira em 375, 768 e 1440 px, temas escuro e claro, nesta pasta (`home-<largura>-<tema>.webp`). Console do navegador sem erros nem avisos nas 6 combinacoes de largura e tema.

## 7. CRM original (somente leitura)
```
HEAD: 5423138
entradas no git status agora: 129 | no baseline anterior a Fase A: 129
git status identico ao baseline: True
hash do diff agora: 7066e39a1db4e5c9ee4a51b5757064a85b71fe7d
hash do diff antes: 7066e39a1db4e5c9ee4a51b5757064a85b71fe7d
```