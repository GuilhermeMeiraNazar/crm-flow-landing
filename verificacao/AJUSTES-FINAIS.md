# Ajustes finais: relatório (2026-11-07)

CRM original somente leitura. Capturas feitas na cópia `_demo/` (containers `-p crmdemo`). Valores de teste da trava ficam em uma pasta temporária e não foram gravados no projeto.

## 1. Imagens trocadas

Todas as capturas foram refeitas (formato novo: AVIF com WebP de reserva, 1x e @2x, dimensões num `manifest.json`). 6 telas x 2 temas x 4 arquivos = 48 arquivos em `src/assets/capturas/`, mais `og-image.png`. As antigas (`pipeline`, `inbox`, `automacoes`, `analytics`, `ia`, com sidebar) foram substituídas; `analytics` mudou de conteúdo.

| Imagem | Enquadramento | Rótulos de interface visíveis (lidos com a leitura de imagem) |
|---|---|---|
| `hero` (escuro e claro), 1440x900 | Tela de Pipeline **com sidebar completa** | Sidebar: ConversIA, "CRM · WHATSAPP · IA", PRINCIPAL, Visão geral, Conversas, Pipeline, Contatos, Automações, Integrações, ANÁLISE, Relatórios, Configurações, usuário "Admin Demo / admin". **Desfocados:** Catálogo, Calendário, Base de Conhecimento (3 linhas), badge de Conversas, card de estado da instância. Conteúdo: "Pipeline de vendas", Pipeline, "Arraste os deals entre etapas...", Novo lead, colunas Novo lead, Em atendimento, Proposta enviada, Negociação, 11 cartões fictícios com valor do negócio. Total das colunas desfocado (defeito do CRM) |
| `pipeline`, 1184x900 | **Recorte sem sidebar** (clip do navegador a partir de x=256) | Só o conteúdo do Pipeline, igual ao acima, sem menu |
| `inbox`, 1184x900 | Recorte sem sidebar | Fila 1, Minhas, Diego Amostra, Assumir, Conversas, busca, 8 contatos fictícios com hora e contador, chat "Ana Exemplo / Ai", 3 mensagens, Assumir conversa, "Digite uma mensagem...", Enviar. **Desfocados:** clipe de anexo e "Sem mensagens" da lista (defeito do CRM) |
| `automacoes`, 1184x480 | Recorte sem sidebar | Automações, "Nova automação", ESTÁGIO/GATILHO/AÇÃO/STATUS; Notificar atendente, Agendar lembrete, Enviar template WhatsApp; Ativa, Editar, Excluir |
| `ia`, 1184x900 | Recorte sem sidebar | Chaves de IA, Modelos, Agente De Conversa (Obrigatório; openai; gpt-4o-mini; "configurada"; Atualizar), Transcrição De Áudio (Opcional; openai; whisper-1). **Desfocado:** bloco "Saldo de tokens". "Limites do crédito próprio" fica fora do enquadramento |
| `analytics`, 554x238 | Só o painel "Deals por estágio" (captura do elemento) | "Deals por estágio" e 6 etapas com contagem: Novo lead 3, Em atendimento 4, Proposta enviada 4, Negociação 2, Ganho 4, Perdido 1. **Sem** taxa de conversão, valores em R$, tempos ou gráfico de resultado |
| `og-image.png`, 1200x630 | Recorte do Pipeline sem sidebar | ConversIA, frase de valor, subtítulo, Pipeline, 4 colunas, cartões fictícios. Sem "Catálogo" e sem menu |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | | Letra "C" branca em quadrado roxo; sem texto |

Resultado da leitura: nenhum rótulo de Base de Conhecimento/RAG, PIX, calendário, Baileys/QR, Click-to-WhatsApp ou classe C legível em nenhuma imagem. Nas telas de funcionalidade a sidebar não aparece (nem Catálogo). Na do hero, os três itens estão desfocados.

Dashboard: não foi recapturado para a página. Ele não está na página, tem o `href="#"` já registrado em `DEFEITOS-CRM.md` (você pediu para não capturar telas com ele) e os cartões do topo trazem "50% Respondidas pela IA" e "R$ 12,4k Fechado este mês". Se quiser o Dashboard na página, indique o recorte; uma opção sem métricas seria só "Atividade em tempo real".

Pendência: o Pipeline mostra o valor de cada negócio (por exemplo "R$ 750,00"). É dado de entrada do CRM, não resultado, mas é dinheiro na tela. Diga se prefere recapturar sem os valores dos cartões.

Equivalência dos formatos (diferença média por canal, 0-255): WebP 2x contra 1x entre 0.62 e 1.80; AVIF contra WebP entre 0.64 e 2.07; AVIF pesa 5.2 a 34.1 KB contra 5.5 a 47.4 KB do WebP, saída de `_tools/cmpfmt.mjs`.

## 2. Legenda única

Componente `Caption` (`src/components/ui.jsx`), texto em `CAPTION` (`src/content/pt-BR.js`): "Dados fictícios de demonstração". Usado por `Shot` (cinco capturas) e pelo hero, sob cada `<figure>`. Saída de `_tools/widths.mjs`, por largura: `figuras:6, legendas:6` em 320, 375, 768, 1024, 1440 e 1920 px (cada `figcaption` com o texto exato).

## 3. Trava de publicação (novas regras)

Em `scripts/lib/guard.mjs`: CNPJ com dígitos verificadores (módulo 11) e rejeição de sequências repetidas; `CTA_URL` e `domain` obrigatoriamente `https://` com host válido; e-mail em formato válido; preço do tipo número e maior que zero. Teste: `node scripts/test-guard.mjs` copia o projeto para `%TEMP%`, grava os valores só lá e roda o build real a cada caso. Trecho final da saída:

```
CASO: CNPJ com digito verificador errado (11.222.333/0001-82)
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.company.cnpj invalido: digitos verificadores nao conferem ("11.222.333/0001-82")
CASO: CNPJ com digitos repetidos (11.111.111/1111-11)
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.company.cnpj invalido: digitos verificadores nao conferem ("11.111.111/1111-11")
CASO: CTA_URL em http://
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.CTA_URL deve usar https:// (protocolo atual: http://): "http://landing-teste.com.br/comprar"
CASO: CTA_URL sem esquema
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.CTA_URL nao e uma URL valida: "landing-teste.com.br/comprar"
CASO: dominio em http://
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.domain deve usar https:// (protocolo atual: http://): "http://landing-teste.com.br"
CASO: e-mail sem TLD (contato@landing)
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.contactEmail com formato invalido: "contato@landing"
CASO: e-mail com duas arrobas
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.contactEmail com formato invalido: "contato@@landing-teste.com.br"
CASO: preco zero
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.pricing.plans[0].price deve ser maior que zero (valor 0)
CASO: preco negativo
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.pricing.plans[0].price deve ser maior que zero (valor -10)
CASO: preco em texto ("1990")
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.pricing.plans[0].price deve ser numerico (tipo string, valor 1990)
CASO: preco nulo
  exit=1 bloqueado=true pendencias_totais=1
  - SITE.pricing.plans[0].price deve ser numerico (tipo object, valor null)
CASO: valores validos de teste (nada gravado no projeto)
  exit=0
  publish-guard: nenhuma pendencia. Build liberado.
  prerender ok: index.html 32.7 KB de HTML
  prerender ok: termos/index.html 4.9 KB de HTML
  prerender ok: privacidade/index.html 4.3 KB de HTML
  prerender ok: reembolso/index.html 3.5 KB de HTML
  dist criado: true | NAO_PUBLICAR.txt: false | robots.txt: "Allow: /"
  meta robots do inicio: index,follow | canonical: https://landing-teste.com.br/
  meta robots de /termos/: index,follow
projeto intocado: site.js do projeto ainda tem CNPJ "[CNPJ]"
RESULTADO: todos os casos invalidos bloquearam; o caso valido passou
```

Os valores válidos de teste foram: CNPJ `11.222.333/0001-81` (dígitos verificadores conferem), `https://landing-teste.com.br`, `contato@landing-teste.com.br`, preço 1990, `legalDraft: false`, e os placeholders de colchetes dos textos trocados por "texto de teste" (só na cópia). Os valores de teste não são de empresa real e a cópia foi apagada.

Limites: a trava valida formato e dígitos, não a existência do CNPJ, do domínio ou do e-mail, e não verifica se o texto jurídico foi revisado.

O build do projeto continua bloqueado (33 pendências) e passa em rascunho com `ALLOW_DRAFT_BUILD=1`, como na auditoria anterior.

## 4. Re-verificação

```
varredura de termos (node scripts/scan-dist.mjs, dist de rascunho)
  title: "ConversIA: CRM de WhatsApp com IA instalado no seu servidor"; 20 meta, 15 og/twitter, 1 JSON-LD, 12 alt, 5 aria-label, 0 title=""
  imagens no dist: 28 (inclui avif)   manifest: nao existe
  resumo: 66 arquivos, 10 de texto varridos, 11 grupos de termos, ocorrencias proibidas: 0
  exit: 0
rastreabilidade (node scripts/trace.mjs)
  afirmacoes rastreadas: 57 | ids desconhecidos: nenhum | texto sem ev: 9
  afirmacoes ligadas a itens classe C: 0
links (node scripts/check-links.mjs)
  paginas: 4 | referencias internas verificadas: 88 | quebradas: 0   exit: 0
vazamento (node _tools/leakscan.mjs): nenhuma ocorrencia
```

Reduced-motion (`_tools/motion-test.mjs`):

```
reduce        -> marquee "none", elementosComAnimacaoCSS 0, revealAindaDeslocados 0, scrollBehavior "auto", contadores 4,3,3,2, parallax nao definido
no-preference -> marquee animado, elementosComAnimacaoCSS 18, scrollBehavior "smooth", parallax 48.0px
```

Largura (`_tools/widths.mjs`): em 320, 375, 768, 1024, 1440 e 1920 px, `overflowX: 0`, 6 imagens visíveis, 6 carregadas, formato `avif`; console sem erros nem avisos.

## 5. Lighthouse (mobile, throttling simulado, Lighthouse 13.6.0, `vite preview` local, React em produção)

| Servido | Página | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|---|
| `dist/` do projeto (rascunho; `robots.txt` com `Disallow: /`) | Início | 98 | 100 | 100 | 69 |
| | Termos | 100 | 100 | 100 | 66 |
| | Privacidade | 100 | 100 | 100 | 66 |
| | Reembolso | 100 | 100 | 100 | 66 |
| Build de produção com valores de teste (válido, sem `NAO_PUBLICAR`) | Início | 99 | 100 | 100 | 100 |
| | Termos | 100 | 100 | 100 | 100 |
| | Privacidade | 100 | 100 | 100 | 100 |
| | Reembolso | 100 | 100 | 100 | 100 |

A falha de SEO do rascunho é `is-crawlable`: `Disallow: /` e `noindex` de propósito. As quatro notas finais do início, no build de produção válido: **99, 100, 100, 100**. LCP 2.1 s, CLS 0, TBT 30 ms. Essas notas só valem depois do deploy real, no domínio definitivo, com a hospedagem escolhida; o servidor local não tem CDN nem compressão da hospedagem, e o build medido usa domínio e dados de teste.

## 6. Limpeza

```
temp removido: True
containers crmdemo em execucao: nenhum
portas 13000/15173/4173/4174/13306/16379 em LISTEN: 0
git ls-files: 132 arquivos | itens proibidos no indice (_demo, .env, node_modules, .pem, crm-flow-ia, uploads, baileys, license, contatos, integracoes-leads, dist): 0
dist/ fora de assets/: apple-touch-icon.png, favicon-32.png, favicon.svg, index.html, NAO_PUBLICAR.txt, og-image.png, robots.txt, sitemap.xml, _headers, privacidade/index.html, reembolso/index.html, termos/index.html
dist/assets/: 54 arquivos (24 avif, 24 webp, 3 woff2, 2 js, 1 css)
nomes proibidos no dist (_demo, .env, node_modules, .pem, crm-flow-ia, uploads, baileys, license, contatos, leads): 0
```

O Docker Desktop estava desligado de novo e o religuei; isso reiniciou os containers `crm-*` do seu desenvolvimento, que não toquei. O `git status` do CRM ao final está no relatório de entrega.
