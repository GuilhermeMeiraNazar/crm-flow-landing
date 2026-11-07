> Ajustes finais (capturas sem sidebar, legenda unica, trava com CNPJ/https/e-mail/preco): verificacao/AJUSTES-FINAIS.md.
> Atualizado pela auditoria de 2026-11-07: ver verificacao/AUDITORIA-VAZAMENTO.md (notas de Lighthouse, itens B retirados, trava de publicacao).

# Relatório

## O que foi feito

- **Fase A**: varredura do CRM somente leitura e `CONTEUDO.md` (funcionalidades, evidências, classes, requisitos, integrações, riscos, tokens).
- **Testes na cópia descartável** (`_demo/`, projeto Docker `crmdemo`, portas 13306, 16379, 13000, 15173) e reclassificação (`CONTEUDO.md`, seção 9):

  | Suíte | Passaram | Falharam | Total |
  |---|---|---|---|
  | `npm test` | 2112 | 11 | 2123 |
  | `npm run test:integration` | 79 | 2 | 81 |
  | Vitest do client | 194 | 0 | 194 |

- **Capturas**: 7 telas em tema escuro e claro, 1x e 2x, em webp, com dados fictícios. Inbox, Pipeline, Contatos, Automações, Relatórios, Chaves de IA e o card de webhook de leads. Nenhuma tela de funcionalidade classe C. Contatos foi capturada e não entrou na página.
- **Landing** (`C:\dev\crm-flow-landing`): React 18, Vite e SCSS Modules, saída estática pré-renderizada em 4 páginas (início, termos, privacidade, reembolso). Tema escuro por padrão com alternância, tokens do app, fontes self-hosted, mesh animado, spotlight, bento com mini-demos em CSS, marquee das integrações, passos que se acendem no scroll, contadores só de números verificáveis, parallax leve, reduced-motion respeitado.
- **Verificação**: `verificacao/RESULTADOS.md`, relatórios Lighthouse em `verificacao/lighthouse/`, capturas da página em 375, 768 e 1440 px (escuro e claro).

## Notas do Lighthouse (mobile, throttling simulado)

| Página | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Início | 99 | 100 | 100 | 100 |
| Termos, Privacidade, Reembolso | 100 | 100 | 100 | **66** |

As páginas legais ficam em 66 em SEO por uma auditoria, `is-crawlable`: saem com `noindex` de propósito enquanto forem rascunho. Com `legalDraft: false` em `site.js` elas passam a indexáveis. Não testei essa configuração.

## Itens classe B que dependem da sua aprovação

Estão marcados na página com o rótulo "revisão do dono" ou com redação conservadora:

1. Envio de imagens e documentos pelo atendimento (um teste de integração falha no envio com `mediaId` válido). Marcado na página.
2. Bloqueio por teto de custo de IA: não aparece na página. A página só fala em acompanhar tokens e custo estimado.
3. Catálogo de produtos: não aparece na página.
4. Embeddings locais: não aparecem, porque só servem à Base de Conhecimento.

## Pendências

- **Modelo de entrega** ([CONFIRMAR PELO DONO]): a página só diz "produto instalável no seu servidor". Os termos têm placeholder.
- **Placeholders em `src/config/site.js`**: domínio, URL do CTA, e-mail, WhatsApp, razão social, CNPJ, preço, cobrança, garantia, política de reemissão da licença, serviço de instalação.
- **Textos legais**: são rascunho, marcados "revisar com advogado". Prazo de arrependimento, foro, limitação de responsabilidade, papéis de controlador e operador estão em colchetes.
- **Marca provisória**: nome ConversIA e monograma "C" (favicon e imagem social) configuráveis. O app não tem logo oficial.
- **Base de Conhecimento** permanece em C: a primeira versão de um documento fica indexada e ativa no MySQL, mas invisível para a busca. Prova e causa em `CONTEUDO.md`, seção 9.4.
- **Defeitos do CRM**, só registrados em `DEFEITOS-CRM.md` (13 itens), entre eles o badge fixo "12", o `href="#"` no Dashboard e o total "R$ NaN" das colunas do kanban. Todos foram mascarados ou evitados nas capturas.
- **Contraste**: 4 tokens do app falham AA e foram ajustados só na landing (tabela com razões antes e depois no `README.md`).
- **Limites da verificação**: nenhum teste de navegador ponta a ponta existe no CRM. A varredura de links não faz requisições a URLs externas (são placeholders). O Lighthouse rodou contra `vite preview` local, não contra a hospedagem final.

## Estado do ambiente de demonstração

Parei os servidores locais. Os containers `crmdemo-mariadb-1` e `crmdemo-redis-1` e seus volumes ficam parados e podem ser removidos com `docker compose -p crmdemo -f _demo/docker-compose.demo.yml down -v`, que só afeta o projeto `crmdemo`. Os containers `crm-*` do seu desenvolvimento foram reiniciados pelo Docker Desktop ao ser ligado e continuam como estavam.
