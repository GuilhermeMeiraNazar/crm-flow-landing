# Módulos que a landing promete e o CRM ainda não entrega

Verificado em 07/11/2026 (CRM `5423138` + working tree, somente leitura). Busca por arquivo no `src/`, `client/src/` e `core-hub-ia/src`.

## 1. Aparecem na página hoje (dependem de você terminar)

### 1.1 Consultor digital (o dono acompanha o negócio pelo WhatsApp)
| Onde aparece na página | Detalhe |
|---|---|
| Planos > Comparação (hospedado) | Linha "Consultor digital": Básico não, Intermediário sim, Avançado sim, Chave própria "módulo adicional" |
| Planos > Comparação (no seu servidor) | "módulo adicional" nos dois planos |
| Oferta de lançamento | Bônus: 30 dias do Consultor digital para assinantes do Hosted Básico, a partir do lançamento do módulo |
| Termos de uso, seção 8 | Menciona o bônus |

- **Estado no CRM:** nenhum arquivo com `copilot`, `copiloto`, `consultor digital`, `assistente executivo` ou `owner assistant`. Não existe.
- **Trava:** `SITE.launchChecklist.consultorDigital` em `src/config/site.js` está `false` e bloqueia o build de produção.
- **Inconsistência a resolver:** o bônus é para o Hosted Básico, e o Básico não aceita módulos avulsos (a linha da tabela mostra "não").
- **O que a página promete e o módulo precisa cumprir:** o dono, pelo WhatsApp, acompanha o negócio. A descrição antiga (estoque, avisos de venda, relatórios) saiu da página; só volta se existir.

### 1.2 Franquia de IA em "interações por mês" (1.500, 4.000 e 10.000)
| Onde aparece | Detalhe |
|---|---|
| Cartões Hosted Básico, Intermediário e Avançado | "Franquia de IA: cerca de N interações por mês" |
| Comparação (hospedado) | Linha "Franquia de IA incluída" |
| Nota do grupo hospedado e FAQ "Quanto custa a IA?" | Dizem que a franquia é estimativa e que há IA incluída |

- **Estado no CRM:** existe registro de tokens e custo por chamada (`/api/ai/usage`), tabela de preço por modelo, limites diário e mensal do crédito próprio (`/api/ai/limits`; `NULL` = sem limite), `budgetGuardService` e providers marcados `managed` (modo híbrido).
- **O que não achei:** contador de "interações", franquia por plano, aviso ou corte ao exceder, nem definição de "interação". Os limites atuais são de custo, não de interações.
- **Sem trava no build.** Posso criar `launchChecklist.franquiaIA` para bloquear a publicação até você confirmar.

## 2. Já saíram da página (voltam quando estiverem prontos)
| Módulo | Estado no CRM hoje | O que falta |
|---|---|---|
| Agenda com confirmação automática | Calendário nativo existe (`calendarController`, `calendar.routes`, `calendarEventService`), **sem testes** (CONTEUDO.md F21, classe B) | Confirmação automática e lembretes na conversa |
| Cobrança PIX via IA | Provedores Asaas e Mercado Pago e webhook existem (`paymentGateway.routes`, `paymentWebhook.routes`), **sem teste em sandbox real** (F25, classe C) | Emissão dentro da conversa pela IA e teste de ponta a ponta |
| Mais de um número de WhatsApp | Nenhum sinal (`instance_id`, `multi instance`, `whatsapp_instances`: nenhum arquivo) | Tudo |
| Múltiplos funis de vendas | Nenhum sinal (`pipeline_id`, `funnel_id`: nenhum arquivo); o CRM tem um pipeline com etapas configuráveis | Tudo |
| Preços dos módulos avulsos (Agenda R$ 99, Cobrança R$ 149, Consultor R$ 149, Conexão extra R$ 120) | Não se aplica | Entrariam de novo na seção de planos |

Onde eles entrariam (conforme sua tabela original): Intermediário (Consultor digital, Agenda, Cobrança), Avançado (números adicionais, múltiplos funis) e módulos adicionais para Chave própria e planos no seu servidor.

## 3. Itens que não são código do CRM, mas a página afirma
- Hospedagem isolada em Docker, atualizações do contêiner, patches de segurança e suporte técnico (operação sua).
- Oferta "20 primeiros" com primeira mensalidade isenta (condições nos Termos, ainda placeholder).
- Serviços: landing page, consultoria e gestão de tráfego (R$ 997, R$ 497 e R$ 1.200).

## 4. Como liberar cada módulo na página
1. Terminar e testar no CRM.
2. Registrar em `CONTEUDO.md` (arquivo:linha da implementação e o teste que passou) e classificar.
3. Me avisar: troco a marca `OWNER-D1` pelos ids de evidência, devolvo o módulo aos cartões e à tabela e, se quiser, os preços.
4. Mudar `launchChecklist.consultorDigital` para `true` somente com o módulo no ar.
