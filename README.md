# Landing page do ConversIA (nome provisório)

Página estática (React 18, Vite, SCSS Modules), sem backend e sem rastreadores de terceiros. Identidade visual e telas vêm do próprio produto. Nome, contatos, preços e CTA ficam em um único arquivo: `src/config/site.js`.

Este projeto é independente do CRM: não lê nem altera nada nele. Está no seu próprio git.

## Rodar, buildar, publicar

```
npm install
npm run dev          # desenvolvimento
npm run build        # TRAVA DE PUBLICACAO + dist/ (HTML pre-renderizado, sitemap.xml, robots.txt)
ALLOW_DRAFT_BUILD=1 npm run build   # build de rascunho: passa com aviso e grava dist/NAO_PUBLICAR.txt
npm run preview      # serve dist/ para conferir
npm run check:links  # varredura de links e âncoras em dist/
node scripts/trace.mjs   # regenera TRACEABILIDADE.md e falha se uma afirmação apontar para item classe C
npm run assets       # regenera favicon, apple-touch-icon e og-image.png
```

A saída é a pasta `dist/` (4 páginas: `/`, `/termos/`, `/privacidade/`, `/reembolso/`). Publique-a em qualquer hospedagem estática:

| Destino | Como |
|---|---|
| Cloudflare Pages | Build `npm run build`, diretório de saída `dist`. `public/_headers` já traz cache e cabeçalhos |
| Netlify | Build `npm run build`, publish `dist`. `_headers` é lido pelo Netlify |
| Vercel | Framework "Other", build `npm run build`, saída `dist`. `vercel.json` incluso |
| Caddy na VPS | Copie `dist/` para o servidor e use `deploy/Caddyfile.example` |

## Trava de publicacao

`npm run build` FALHA (e apaga o `dist/` anterior) enquanto houver: texto com colchetes ou `CONFIRMAR` (config, conteudo, textos legais e HTML gerado); `legalDraft: true`; `CTA_URL`, `domain`, `contactEmail`, `contactWhatsapp`, `company.legalName`, `company.cnpj` ou preco vazios ou placeholder. Com `ALLOW_DRAFT_BUILD=1` o build passa, avisa, grava `dist/NAO_PUBLICAR.txt` e troca o `robots.txt` por `Disallow: /`. O build forca `NODE_ENV=production`.

Teste da trava: `node scripts/test-guard.mjs` (copia o projeto para a pasta temporaria, aplica valores de teste so la e roda o build real em cada caso invalido e no valido). Regras extras: CNPJ com digitos verificadores, URLs https, e-mail valido, preco numerico maior que zero.

Varreduras do `dist/`: `npm run scan:dist` (termos proibidos), `npm run check:links` e `node scripts/trace.mjs`. Relatorio: `verificacao/AUDITORIA-VAZAMENTO.md`.

## Editar `src/config/site.js`

| Campo | Para que serve |
|---|---|
| `name`, `tagline`, `monogram` | Marca provisória. Trocar o nome muda a página inteira. Para trocar o monograma, edite também `scripts/make-assets.mjs` e rode `npm run assets` |
| `domain` | Canonical, Open Graph, sitemap e robots. Placeholder |
| `CTA_URL`, `ctaPrimaryLabel` | Destino e texto do CTA primário (navbar, hero, preço, CTA final). Placeholder |
| `contactEmail`, `contactWhatsapp` | Rodapé, CTA final e páginas legais. Só dígitos com DDI no WhatsApp; vazio oculta o link. Placeholder |
| `company` | Razão social, CNPJ e endereço. Placeholder |
| `pricing` | Planos, preço (`null` mostra "A definir"), cobrança, garantia, política de reemissão da licença e serviço de instalação. Nada é inventado |
| `analytics` | Desligado. Só carrega um script se `enabled: true` e `src` preenchido (use uma ferramenta sem cookies) |
| `legalDraft` | `true` mostra a faixa "revisar com advogado" e marca as páginas legais como `noindex` |

O texto da página está em `src/content/pt-BR.js`. Cada afirmação tem `ev` com os ids de evidência de `CONTEUDO.md`. Textos legais (rascunho) em `src/content/legal.js`.

## Regras de conteúdo aplicadas

- Só funcionalidades classe A. Nenhum item B está na página (o envio de imagens e documentos foi retirado até o teste de integração passar).
- Fora da página: Base de Conhecimento/RAG, cobrança PIX, calendário, Baileys, Click-to-WhatsApp, estabilidade do WhatsApp não oficial.
- Modelo de entrega: hospedado no servidor do dono (decisão do dono). A página não fala em instalar no servidor do cliente; as seções "Seus dados" e "Requisitos" foram removidas. Os textos legais (rascunho) foram ajustados para hospedagem e continuam dependendo de advogado.
- Sem depoimentos, logos de clientes, números de clientes, métricas de desempenho, selos ou comparativos.
- Privacidade, texto aprovado: "Seu banco de dados e seus arquivos ficam no servidor da sua empresa. Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta."

## Docker

Imagem em dois estagios: Node faz o build (com a trava de publicacao) e `nginxinc/nginx-unprivileged` serve o `dist/` (usuario sem privilegios, sistema de arquivos somente leitura, `cap_drop: ALL`, porta 8080 dentro do container, `127.0.0.1:8088` no host).

```powershell
# teste local (build de rascunho, NAO publicavel; robots com Disallow)
$env:ALLOW_DRAFT_BUILD='1'; docker compose up -d --build
# http://localhost:8088

# parar (so este projeto)
docker compose stop

# producao: sem a variavel. O build falha enquanto houver placeholder (ver Trava de publicacao).
docker compose up -d --build
```n
Trocar a porta: `LANDING_PORT=9090`. O bind e `127.0.0.1`; para expor na rede, mude o mapeamento de portas em `docker-compose.yml`.

## Telas do produto

As imagens em `src/assets/capturas/` (AVIF com WebP de reserva, 1x e 2x, mais `manifest.json` com as dimensoes) foram capturadas com Playwright de uma cópia descartável do CRM com dados fictícios (nomes e telefones inventados, sem WhatsApp conectado, sem chave real). Telas de funcionalidade sao RECORTADAS (clip do navegador) para excluir a sidebar; so a captura do hero mantem a sidebar, com Catalogo, Calendario e Base de Conhecimento desfocados. Toda captura recebe a legenda unica "Dados ficticios de demonstracao" (componente `Caption`). Relatorios mostra so o painel de contagem por etapa, sem taxas nem valores. Desfocamos na captura: o badge fixo "12" de Conversas, os itens de menu de funcionalidades fora da página, o card de estado da instância local, o total "R$ NaN" das colunas do kanban e o bloco "Saldo de tokens". Os defeitos do CRM estão em `DEFEITOS-CRM.md`.

## Contraste (ajustes só da landing)

O app não foi alterado. Estes tokens falhavam AA e foram corrigidos apenas aqui, em `src/styles/global.scss`:

| Token | App | Razão antes | Landing | Razão depois |
|---|---|---|---|---|
| `--text-tertiary` escuro, sobre `#0A0E13` | `#5C6B7A` | 3.54 | `#7F8D9C` | 5.71 |
| `--text-tertiary` claro, sobre `#FAFBFC` | `#8B95A5` | 2.92 | `#5F6B7A` | 5.24 |
| Texto `--accent-live` no claro, sobre `#FAFBFC` | `#00A366` | 3.15 | `#007A4D` | 5.21 |
| Botão primário: texto branco sobre o início do gradiente | `#7C6FFF` | 3.77 | `#6254E8` | 5.31 |

Razões calculadas pela fórmula de luminância WCAG 2.x.

## Licenças e fontes de terceiros

| Item | Origem | Licença |
|---|---|---|
| Inter (variável, subconjunto latin) | pacote `@fontsource-variable/inter` 5.3.0, fonte de Rasmus Andersson | SIL OFL 1.1 |
| Space Grotesk (variável, subconjunto latin) | pacote `@fontsource-variable/space-grotesk` 5.3.0, fonte de Florian Karsten | SIL OFL 1.1 |
| JetBrains Mono (400, latin) | pacote `@fontsource/jetbrains-mono` 5.3.0, fonte da JetBrains | SIL OFL 1.1 |
| React, React DOM, Vite, Sass | npm | MIT |
| sharp (só no build de imagens) | npm | Apache-2.0 |
| Playwright (só nas capturas) | npm | Apache-2.0 |
| Ícones e monograma | desenho próprio (SVG em linha) | do dono |
| Telas do produto | geradas do próprio CRM com dados fictícios | do dono |

As fontes são servidas do próprio site (`src/assets/fonts/`), sem Google Fonts. Nenhum asset de terceiros sem licença livre. Nomes de WhatsApp, Meta, OpenAI, Gemini, Claude e Groq aparecem só como texto e pertencem aos seus titulares.

## Estrutura

```
src/config/site.js      configuração única
src/content/            textos da página e rascunhos legais
src/components/         navbar, seções, capturas
src/hooks/effects.jsx   revelação no scroll, spotlight, parallax, contador
src/styles/             tokens (global.scss) e estilos (landing.module.scss)
src/assets/             capturas (webp 1x e 2x) e fontes
scripts/                assets, prerender, links, rastreabilidade
public/                 favicon, imagem social, _headers
verificacao/            capturas da página, relatórios Lighthouse, saídas dos testes
CONTEUDO.md             varredura do CRM e classificação das funcionalidades
TRACEABILIDADE.md       afirmação da página x item de CONTEUDO.md
DEFEITOS-CRM.md         defeitos do CRM, só registro
```
