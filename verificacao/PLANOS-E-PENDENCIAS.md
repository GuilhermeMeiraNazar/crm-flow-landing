# Planos: o que entrou e o que ficou de fora

Valores (implantação, mensalidade, linha) ficam em `src/config/site.js`. Textos e ids de evidência em `src/content/pt-BR.js` (`pricing`).

## Tabela implementada
| Linha | Plano | Implantação | Mensalidade |
|---|---|---|---|
| Hospedado | Chave própria (BYOK) | R$ 1.500 | R$ 150 |
| Hospedado | Básico (~1.500 interações/mês) | R$ 1.500 | R$ 250 |
| Hospedado | Intermediário (~4.000/mês), marcado "Recomendado" | R$ 1.500 | R$ 400 |
| Hospedado | Avançado (~10.000/mês) | R$ 1.500 | R$ 600 |
| No seu servidor | Sem suporte | R$ 3.500 | sem mensalidade |
| No seu servidor | Com suporte | R$ 3.000 | R$ 150 |

A página também traz os requisitos do servidor (CONTEUDO.md seção 4) e o vínculo da licença ao IP fixo para a linha "No seu servidor".

## Ficou de fora e por quê
- **Copiloto do Gestor** (consultar estoque, avisos de venda e relatórios pelo WhatsApp do dono): não existe no CRM. Busca por copilot, copiloto, estoque e gestor em `crm-flow-ia` e `core-hub-ia` não achou nada.
- **Múltiplos funis (kanbans) simultâneos**: o CRM tem um pipeline com etapas configuráveis; não achei suporte a vários funis.
- Resultado: Intermediário e Avançado diferem do Básico só pela franquia de IA.
- "Mais popular", "carro-chefe" como fato, "24/7": não verificáveis. O Intermediário recebe só o selo "Recomendado".
- Suporte com prazo de resposta (24h, 6h, 2h) do desenho anterior: a nova tabela não tem.
- Add-ons e oferta de lançamento: não constam na nova tabela.
- Frase "o consumo da nossa VPS é zero": é detalhe interno.

## Termos comerciais sem verificação técnica (entraram como texto do dono)
- Franquia de IA em "interações por mês": o CRM registra tokens e custo (F18a), mas não achei contador de interações nem bloqueio ao exceder a franquia.
- "Cada empresa roda isolada em Docker na nossa VPS": o CRM é uma instalação por empresa (S3.1), mas a hospedagem em si é decisão sua.
- Atualizações do contêiner, patches de segurança e suporte: serviço seu, não recurso do produto.

## Perguntas ao dono
1. O Copiloto do Gestor e os múltiplos funis existem em outro repositório ou branch? Se sim, aponte onde e eu incluo com evidência. Se ainda serão feitos, só entram na página depois de prontos.
2. O que é uma "interação" e o que acontece ao passar da franquia (bloqueia, cobra extra, avisa)?
3. Manter o selo "Recomendado" no Intermediário?
4. O que a implantação cobre em cada linha, e o que a mensalidade da linha hospedada cobre (backup, disponibilidade)?
5. Na linha "No seu servidor", o cliente recebe o produto como? Isso afeta a frase de entrega nos termos.
