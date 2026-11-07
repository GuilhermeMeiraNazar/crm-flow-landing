# Planos: o que entrou e o que ficou de fora

Valores em `src/config/site.js` (planos e add-ons). Textos e ids de evidência em `src/content/pt-BR.js` (`pricing`).

## Tabela implementada
| Linha | Plano | Implantação | Mensalidade |
|---|---|---|---|
| Hospedado | Básico (~1.500 interações/mês) | R$ 1.500 | R$ 250 |
| Hospedado | Intermediário (~4.000/mês), selo "Recomendado" | R$ 1.500 | R$ 400 |
| Hospedado | Avançado (~10.000/mês) | R$ 1.500 | R$ 600 |
| Hospedado | BYOK (chave própria na OpenAI) | R$ 1.500 | R$ 150 |
| No seu servidor | Sem suporte | R$ 3.500 | sem mensalidade |
| No seu servidor | Com suporte | R$ 3.000 | R$ 150 |

Módulos adicionais (todos "Em breve"): Agenda R$ 99, Cobrança via IA R$ 149, Copiloto do Gestor R$ 149, Conexão extra de WhatsApp R$ 120.
Oferta de lançamento: 20 primeiros, primeira mensalidade isenta e 30 dias do Copiloto (a partir do lançamento do módulo).

## Regra adotada para itens que o CRM não entrega hoje
Aparecem com a marca "Em breve" (`soon: true` em pt-BR.js), nunca como disponíveis. Remova a marca só quando o recurso estiver no ar e tiver evidência em CONTEUDO.md.
Itens nessa condição: Copiloto do Gestor, Agenda, cobrança PIX via IA, instâncias múltiplas de WhatsApp, múltiplos funis.
Estado no CRM: Copiloto e múltiplos funis não existem; calendário nativo existe sem teste; PIX existe sem teste em sandbox real (classe C); múltiplos números sem evidência.

## Mudança em controle da publicação (decisão sua)
`scripts/scan-dist.mjs` proibia "PIX/cobrança". Agora libera essa ocorrência somente se houver "Em breve" (HTML) ou `soon` (bundle) a até 300 caracteres. Qualquer outra menção a PIX continua bloqueando o build.

## Ficou de fora de propósito
- "QR Code" para conectar o WhatsApp: é o Baileys (não oficial, classe C) e contradiz o texto "API oficial" da página.
- "Redução drástica de faltas", "24/7", "Mais Popular" e "venda mais": promessa de resultado ou afirmação sem prova. O Intermediário usa "Recomendado".
- Contador de vagas restantes: a página é estática; só diz "20 vagas".

## Pendências para você
1. Quando cada módulo "Em breve" ficar pronto, avise para trocar a marca por disponível.
2. Defina nos termos: prazo de liberação dos módulos, condições da oferta dos 20 primeiros, o que é uma "interação" e o que ocorre ao passar da franquia.
3. O Intermediário hoje tem como recurso real só a franquia maior; o resto é "Em breve".
