# Auditoria de vazamento de classe C e trava de publicação

Data da auditoria: 2026-11-07. CRM somente leitura. Lighthouse e varreduras rodaram contra o `dist/` de um build de RASCUNHO (`ALLOW_DRAFT_BUILD=1`), o único que o publish-guard permite hoje.

## 1. Imagens: texto de interface visível, por imagem

Método: abri cada arquivo de `public/` e `dist/` com a leitura de imagem. Os arquivos `@2x` são o mesmo conteúdo dos 1x: reduzi cada 2x ao tamanho do 1x e medi a diferença média por canal, entre 0.58 e 1.07 em 255 (ruído de reamostragem), nas 10 telas.

### Imagens que existiam antes da auditoria (estado anterior)

| Imagem | Texto de interface visível | Achado | Ação |
|---|---|---|---|
| `inbox-{dark,light}` (anterior) | Menu: Visão geral, Conversas, Pipeline, Contatos, Catálogo, Automações, Integrações, Relatórios, Configurações. Abas Fila, Minhas. Assumir, Assumir conversa. Lista de conversas. Chat. "Digite uma mensagem...", Enviar. **Ícone de clipe de anexo** | Anexo de imagem/documento visível (item B de mídia retirado). Texto "Sem mensagens" em todas as linhas (defeito do CRM) | Recapturado com o clipe desfocado; "Sem mensagens" desfocado |
| `ia-{dark,light}` (anterior) | Chaves de IA, Agente De Conversa, Transcrição De Áudio, Provedor, Modelo, Chave de API, Atualizar, **"Limites do crédito próprio"**, "Defina limites de tokens..." | "Limites do crédito próprio" é o bloqueio por teto de custo (classe B, sem teste). Estava visível na dobra | Recapturado: o bloco ficou abaixo da dobra; "Saldo de tokens" (menciona "Plano contratado") desfocado |
| Todas as 7 telas (anterior) | Menu lateral sem Calendário e sem Base de Conhecimento | Os itens eram **removidos do DOM** na captura: a imagem mostrava um menu que não existe no produto | Substituído por desfoque visível dos dois itens |
| `contatos-{dark,light}` | Contatos, tabela com nomes e telefones fictícios, Novo contato, Excluir, Editar | Não é classe C, mas **não era usada pela página e ia no dist** | Arquivos removidos do projeto e do git |
| `integracoes-leads-{dark,light}` | "Ads / Webhooks de leads", URL `http://localhost:13000/api/webhooks/ads`, Atribuições recentes | Não é classe C, mas **não era usada pela página**, ia no dist e expunha `localhost:13000` | Arquivos removidos do projeto e do git |

### Imagens atuais (dist/ e public/)

| Imagem | Texto de interface visível | Classe C? | Observação |
|---|---|---|---|
| `inbox-dark`, `inbox-light` | Menu lateral (ver abaixo), Fila 1, Minhas, Diego Amostra, Assumir, Conversas, busca, 8 contatos fictícios com hora, chat de Ana Exemplo ("Ai"), 3 mensagens, Assumir conversa, "Digite uma mensagem...", Enviar | Não | Clipe de anexo, "Sem mensagens", badge de Conversas e card de instância desfocados |
| `pipeline-dark`, `pipeline-light` | Menu lateral, "Pipeline de vendas", Pipeline, "Arraste os deals entre etapas...", Novo lead (botão), colunas Novo lead, Em atendimento, Proposta enviada, Negociação, 11 cartões com valor | Não | Total "R$ NaN" das colunas desfocado (defeito do CRM) |
| `automacoes-dark`, `automacoes-light` | Menu lateral, Automações, "Nova automação", tabela: Proposta enviada / Ao entrar no estágio / Notificar atendente; Em atendimento / Após X dias parado / Agendar lembrete; Novo lead / Ao entrar no estágio / Enviar template WhatsApp; Ativa, Editar, Excluir | Não | Nenhuma ação de PIX presente |
| `analytics-dark`, `analytics-light` | Menu lateral, Relatórios, Hoje/7 dias/30 dias/Tudo, De/Até, Atualizar, Funil, Exportar CSV, Taxa de conversão, Valor fechado, Valor em aberto, Deals perdidos, Deals por estágio, Tempo médio parado, Valor fechado por dia | Não | Campo de busca "(em breve)" desfocado. Os números são dados fictícios de demonstração, e a página diz isso |
| `ia-dark`, `ia-light` | Menu lateral, Chaves de IA, Modelos, Agente De Conversa (Obrigatório; openai; gpt-4o-mini; "•••••••• configurada"; Atualizar), Transcrição De Áudio (Opcional; openai; whisper-1) | Não | "Saldo de tokens" desfocado; "Limites do crédito próprio" fora da imagem |
| `og-image.png` | Frontly, "CRM de WhatsApp com IA, instalado no seu servidor.", "Conversas, pipeline kanban, automações e relatórios.", recorte da tela Pipeline com menu lateral | Não | Regenerada da captura nova, com os desfoques |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Letra "C" branca em quadrado com gradiente roxo | Não | Sem texto de interface |

Menu lateral nas telas atuais, por rótulo:

| Rótulo | Situação |
|---|---|
| Visão geral, Conversas, Pipeline, Contatos, Automações, Integrações, Relatórios, Configurações | Legíveis. Nenhum remete a classe C pelo nome |
| Calendário, Base de Conhecimento | **Desfocados** (ilegíveis) |
| **Catálogo** | **Legível. Classe B** (cadastro de produtos; a sincronização com a KB é C e não aparece). A página não anuncia catálogo. Decisão sua: manter visível, ou eu desfoco |

Itens que eu não consegui eliminar sem fingir uma tela: o menu continua mostrando duas linhas desfocadas e o card de instância desfocado, de propósito, para o recorte não parecer uma tela diferente da real.

## 2. Varredura textual do dist/

Comando: `node scripts/scan-dist.mjs` (código em `scripts/scan-dist.mjs`). Cobre title, meta, Open Graph, Twitter, JSON-LD, alt, aria-label, `title=""`, sitemap, robots, manifest, comentários HTML, JS/CSS da aplicação e nomes de arquivo, com 11 grupos de termos: KB/RAG/knowledge/reindex/reconciliação, embeddings/vetores, PIX/cobrança/pagamento/Asaas/Mercado Pago, calendário, Baileys/QR/não oficial, Click-to-WhatsApp/referral, Ollama/hub, modelo de entrega (código-fonte, clone, repositório, git), mídia (imagens e documentos, anexar), claims vedadas, e placeholders.

Saída final (trecho):

```
== dist/index.html
 title        : Frontly: CRM de WhatsApp com IA instalado no seu servidor
 meta (n)     : 20 | og/twitter: 15
 json-ld (n)  : 1
 alt (n)      : 12 | aria-label (n): 5 | title="" (n): 0
 comentarios  : [" "," "," "," "," "]
== dist/privacidade/index.html  (title: Política de privacidade | Frontly; alt 0; aria-label 3)
== dist/reembolso/index.html    (title: Reembolso e arrependimento | Frontly; alt 0; aria-label 3)
== dist/termos/index.html       (title: Termos de uso | Frontly; alt 0; aria-label 3)
chunk de terceiros nao varrido por termos de conteudo: dist/assets/vendor-DFrLV2pM.js
manifest: nao existe (nenhum arquivo .webmanifest/manifest.json no dist)
placeholders encontrados (informativo; o publish-guard bloqueia build de producao): 35
resumo: 38 arquivos, 10 de texto varridos, 11 grupos de termos, ocorrencias proibidas: 0
exit: 0
```

Os comentários HTML são separadores vazios que o React insere entre textos. As imagens do dist têm só os nomes `analytics`, `automacoes`, `ia`, `inbox`, `pipeline` (claro e escuro, 1x e @2x), mais favicon, ícone e `og-image`.

Primeira execução da varredura, antes dos ajustes: **35 ocorrências**. Todas eram falsos positivos do código minificado do React ou textos de compra ("cobrança"):

- O chunk do React (`kb`, `qr`, `vector-effect`, "clone", "reconciliation issues"), agora separado em `vendor-*.js` e fora da varredura de conteúdo.
- "[MODELO DE COBRANCA A DEFINIR]" e "dados de pagamento e de cobrança" na privacidade. Reescrevi para "[MODELO COMERCIAL A DEFINIR]" e "dados de pagamento da compra", para a varredura ficar limpa de verdade.

Achado de processo, que afeta números anteriores: meu shell tinha `NODE_ENV=development` e o bundle do React saiu em modo de desenvolvimento (avisos como "However," no código). Corrigido: `scripts/build.mjs` força `NODE_ENV=production`. O chunk do React caiu de 318 KB para 137 KB. **As notas de Lighthouse que reportei antes foram medidas com esse bundle** e estão substituídas pelas da seção 7.

## 3. Faixa de integrações (marquee)

| Item na faixa | Evidência no CRM | Classe |
|---|---|---|
| WhatsApp Cloud API (Meta), "API oficial" | `src/routes/whatsapp.routes.js:55` (GET /webhook), `:59` (POST /webhook com assinatura HMAC); testes `officialAdapter.test.js`, `metaSignature.middleware.test.js`, passaram | A |
| Webhook de leads, "anúncios e landing pages" | `src/routes/webhookIngest.routes.js:33` (POST /ads); `src/controllers/webhookIngestController.js:48`; testes `webhookFlow.integration`, `webhookIngestController.property`, passaram | A |
| OpenAI | `src/adapters/cloudProviderAdapter.js:111-120`; `src/validators/aiProvider.validator.js:24`; `adapters.test.js:61` | A (cadastro e orquestração; sem chamada real) |
| Gemini | `cloudProviderAdapter.js:303-311`; `aiProvider.validator.js:24`; `adapters.test.js:149` | A (idem) |
| Claude | `cloudProviderAdapter.js:438-442`; `aiProvider.validator.js:24`; `adapters.test.js:240` | A (idem) |
| Groq | `cloudProviderAdapter.js:537-545`; `aiProvider.validator.js:24`; `adapters.test.js:327` | A (idem) |

Nenhum item é C. Nada foi removido da faixa. Fora da faixa, e já fora da página: Baileys, Asaas, Mercado Pago, Google Calendar, hub local.

## 4. Item B de mídia

Removido da página (`src/content/pt-BR.js`, o tópico "Envio de imagens e documentos pelo atendimento") e da rastreabilidade (`TRACEABILIDADE.md` e o id `9.5` em `scripts/trace.mjs`). O clipe de anexo das capturas foi desfocado. Comando: `node scripts/trace.mjs` -> `afirmacoes rastreadas: 57 | ids desconhecidos: nenhum | afirmacoes ligadas a itens classe C: 0`; linhas com "Envio de imagens" ou `9.5` na rastreabilidade: 0. Só volta se você mandar.

## 5. Trava de publicação

Arquivos: `scripts/lib/guard.mjs`, `scripts/publish-guard.mjs`, `scripts/build.mjs` (o `npm run build` chama a trava antes de tudo) e a segunda checagem em `scripts/prerender.mjs`, sobre o HTML gerado. Bloqueia: (a) colchetes ou "CONFIRMAR" em qualquer texto de `site.js`, do conteúdo, dos textos legais e do HTML gerado; (b) `legalDraft: true`; (c) `CTA_URL`, `domain`, `contactEmail`, `contactWhatsapp`, `company.legalName`, `company.cnpj` ou preço vazios ou placeholder (contendo "example", colchetes, zeros repetidos no WhatsApp, preço não numérico). Ao falhar, apaga o `dist/` anterior para um build velho não ser publicado por engano.

Sem variável (o build falha):

```
> conversia-landing@0.1.0 build
> node scripts/build.mjs

BUILD BLOQUEADO pelo publish-guard: 33 pendencia(s) impedem a publicacao.
  - SITE.legalDraft e true (textos legais ainda sao rascunho)
  - SITE.CTA_URL e placeholder: "https://conversia.example/comprar"
  - SITE.domain e placeholder: "https://conversia.example"
  - SITE.contactEmail e placeholder: "contato@conversia.example"
  - SITE.company.legalName e placeholder: "[RAZAO SOCIAL]"
  - SITE.company.cnpj e placeholder: "[CNPJ]"
  - SITE.contactWhatsapp e placeholder: "5511900000000"
  - SITE.pricing.plans[0].price nao e um numero valido (valor atual: null)
  - placeholder em SITE.company.legalName: [RAZAO SOCIAL]
  ... (mais 24 linhas "placeholder em ...": address, billing, guarantee, reissuePolicy, legalUpdatedAt e os textos de termos, privacidade e reembolso)
Corrija em src/config/site.js, src/content ou rode com ALLOW_DRAFT_BUILD=1 para gerar um build de rascunho (nao publicavel).
dist/ anterior removido.
exit: 1
dist existe depois: False
```

Com `ALLOW_DRAFT_BUILD=1` (o build passa, avisa e marca):

```
AVISO publish-guard: ALLOW_DRAFT_BUILD=1. Build de RASCUNHO com 33 pendencia(s). NAO PUBLICAR.
prerender ok: index.html 29.9 KB de HTML
prerender ok: termos/index.html 5.4 KB de HTML
prerender ok: privacidade/index.html 4.6 KB de HTML
prerender ok: reembolso/index.html 3.9 KB de HTML
AVISO: dist/NAO_PUBLICAR.txt gravado; robots.txt com Disallow: /. NAO PUBLICAR este build.
exit: 0
dist/NAO_PUBLICAR.txt, linha 1: NAO PUBLICAR   (lista 70 pendências: 33 da origem + as do HTML)
dist/robots.txt: User-agent: * / Disallow: /
```

Limite da trava: ela detecta placeholder pelos padrões acima. Um valor inventado que pareça real (por exemplo um CNPJ digitado errado) passa. A trava também não confere se o domínio responde.

## 6. Deploy: o que entra no git e no dist

`git ls-files`: 107 arquivos (inclui os relatórios do Lighthouse; as 8 capturas não usadas foram removidas e restam 20 capturas). Busca no índice por `_demo`, `.env`, `node_modules`, `.pem`, `crm-flow-ia`, `uploads`, `baileys`, `data/`, `license/`: **nenhum**. `.gitignore` cobre `_demo/`, `_baseline/`, `.env*`, `*.pem`, `node_modules/`, `dist/`, `dist-ssr/`, `dist-lh/`, `/capturas/`. O índice contém, do CRM, apenas as capturas de tela (webp) e os textos de `CONTEUDO.md`, `DEFEITOS-CRM.md` e `TRACEABILIDADE.md`: nenhum arquivo copiado do CRM.

Árvore do `dist/` (build de rascunho): `index.html`, `termos/`, `privacidade/`, `reembolso/` (cada um com `index.html`), `assets/` (10 capturas 1x e 10 @2x, 3 fontes woff2, 1 CSS, `entry-client-*.js` 42.9 KB, `vendor-*.js` 136.6 KB), `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.png`, `robots.txt`, `sitemap.xml`, `_headers`, `NAO_PUBLICAR.txt`. Busca por nomes `_demo|.env|node_modules|.pem|crm-flow-ia|uploads|baileys|license`: nenhum. Busca no conteúdo de HTML/JS/CSS por `C:\`, `C:/dev`, `crm-flow-ia`, `_demo`, `.env`, chaves PEM, `JWT_SECRET`, `MASTER_ENCRYPTION`, `DB_PASSWORD`, `localhost:13000`, `127.0.0.1`, `sk-DEMO`: **nenhuma ocorrência** (`node _tools/leakscan.mjs`; a primeira passada achou `_demo` na classe CSS `.demo`, que renomeei para `.mini`).

## 7. Lighthouse (mobile, throttling simulado, Lighthouse 13.6.0, `vite preview` local)

| Execução | Página | Desempenho | Acessibilidade | Boas práticas | SEO | Falha de SEO |
|---|---|---|---|---|---|---|
| `dist/` (rascunho, robots `Disallow: /`) | Início | 99 | 100 | 100 | **69** | `is-crawlable` |
| | Termos, Privacidade, Reembolso | 100 | 100 | 100 | **66** | `is-crawlable` |
| `dist-lh/` (cópia só para medir, robots liberado) | Início | 99 | 100 | 100 | **100** | nenhuma |
| | Termos, Privacidade, Reembolso | 100 | 100 | 100 | **66** | `is-crawlable` (`noindex` do rascunho legal) |

LCP do início 2.1 s, CLS 0 a 0.001, TBT 10 a 40 ms.

Essas notas **só valem depois do deploy real**: foram medidas num servidor local, sem CDN, sem HTTP/2 real, sem o domínio e o robots definitivos, e com um build marcado "NAO PUBLICAR". Com o build de rascunho o SEO do início cai para 69 porque o `robots.txt` do rascunho bloqueia tudo, de propósito. Rodar de novo no domínio final.

## 8. Pendências desta auditoria

- Catálogo (classe B) segue legível no menu das 10 telas e na imagem social. Decida: manter ou desfocar.
- Os números das telas (22.22% de conversão, R$ 12.450 fechado) são dados fictícios criados por mim. A página avisa "dados fictícios de demonstração" no hero. Se preferir, troco por telas sem números de desempenho.
- `verificacao/RESULTADOS.md` é anterior a esta auditoria e traz o Lighthouse do bundle de desenvolvimento; vale esta auditoria.
