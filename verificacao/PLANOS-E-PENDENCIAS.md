# Planos: o que entrou e o que ficou de fora

Valores (implantação, mensalidade, linha) ficam em `src/config/site.js`. Textos e ids de evidência em `src/content/pt-BR.js` (`pricing`).

## Tabela implementada
| Linha | Plano | Implantação | Mensalidade |
|---|---|---|---|
| Hospedado | Básico (~1.500 interações/mês) | R$ 1.500 | R$ 250 |
| Hospedado | Intermediário (~4.000/mês), selo "Recomendado" | R$ 1.500 | R$ 400 |
| Hospedado | Avançado (~10.000/mês) + paleta de cores | R$ 1.500 | R$ 600 |
| Hospedado | BYOK (chave própria) | R$ 1.500 | R$ 150 |
| No seu servidor | Sem suporte | R$ 3.500 | sem mensalidade |
| No seu servidor | Com suporte | R$ 3.000 | R$ 150 |

Também entraram: requisitos do servidor (CONTEUDO.md seção 4) e a oferta de lançamento (primeira mensalidade isenta para os 20 primeiros clientes).

## Itens do texto do dono que NÃO entraram, e por quê
| Item | Motivo |
|---|---|
| Integração por QR Code | É o Baileys (não oficial), classe C em CONTEUDO.md. Contradiz o texto "API oficial" da página (marquee e FAQ). |
| Agenda com confirmação automática e "redução drástica de faltas" | Calendário nativo existe sem teste (B, "fora" por decisão do dono). A redução de faltas é promessa de resultado. |
| Emissão de cobrança / PIX via IA | PIX (Asaas, Mercado Pago) é classe C, sem teste em sandbox real. |
| Copiloto do Gestor (Assistente Executivo) | Não existe no CRM (busca em crm-flow-ia e core-hub-ia). |
| Múltiplos funis de vendas | O CRM tem um pipeline com etapas configuráveis; não achei vários funis. |
| "Limites operacionais expandidos" | Sem definição técnica. |
| "Respostas 24/7", "Mais Popular" | Não verificáveis. O Intermediário recebe só "Recomendado". |
| Add-ons (Agenda, PIX, Copiloto, instância extra de WhatsApp) | Dependem dos itens acima; múltiplas conexões não têm evidência. |
| Bônus de 30 dias do Copiloto | O Copiloto não existe. |

Consequência: o Intermediário difere do Básico só pela franquia de IA, e o Avançado, pela franquia e pela paleta de cores.

## Termos comerciais sem verificação técnica
- Franquia de IA em "interações por mês": o CRM registra tokens e custo (F18a); não achei contador de interações nem bloqueio ao exceder.
- Oferta dos 20 primeiros: a página é estática e não conta vagas. O texto legal tem placeholder para as condições.

## Para incluir os itens acima
Cada um precisa (1) existir e funcionar no produto, ou ser aprovado por você como vendido sob encomenda, e (2) ter evidência registrada em CONTEUDO.md. Informe o que está pronto e onde, e eu incluo.
