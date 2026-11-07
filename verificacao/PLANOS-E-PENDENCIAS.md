# Pacotes: o que entrou e o que ficou de fora

Valores (setup, mensalidade, suporte) ficam em `src/config/site.js`. Textos e ids de evidência em `src/content/pt-BR.js` (`pricing.plans`).

## Entrou (com evidência no CRM)
Os recursos de cada pacote têm ids em `CONTEUDO.md` e são checados por `scripts/trace.mjs`.
Mapeamentos feitos por mim, a confirmar:
- "Roteamento Inteligente de IA" virou "Cadeia de reserva entre provedores de IA" (F17).
- "Setup semi-customizado" virou "Adaptação da paleta de cores" (S7).

## Ficou de fora e por quê
- Conexão por QR Code (Baileys): classe C.
- Agenda com confirmação automática e "redução de faltas": calendário fora da página; alegação sem prova.
- PIX/cobrança via IA: classe C.
- Assistente Executivo do Dono (incluindo teste de 7 dias e bônus): módulo não encontrado no CRM.
- Múltiplos números e "instância extra": sem evidência.
- Os quatro add-ons: dependem dos itens acima.
- "24/7", "Mais Popular", "maior velocidade": não verificáveis.
- Oferta de lançamento: escassez ("5 primeiros") e inconsistência ("de R$ 2.000 por R$ 1.500" para Básico e Médio, mas os setups listados são R$ 1.500 e R$ 2.500).
- Emojis do texto original.

## Perguntas ao dono
1. O que a mensalidade cobre (licença, hospedagem, suporte)? Pode conflitar com "cliente hospeda" e licença por IP.
2. O custo das chaves dos provedores de IA está incluso ou é separado?
3. Manter ou não o selo "Mais Popular" no Médio?
4. Qual é o preço real da oferta de lançamento?
5. Médio e Premium têm um diferencial verificado cada; quais outros recursos reais do CRM entram em cada um?

## Lighthouse (mobile, container em localhost:8088, build de rascunho)
Performance 99, Acessibilidade 100, Boas práticas 100, SEO 69.
SEO 69 vem só de "Page is blocked from indexing", intencional no rascunho. Vale só após deploy real.

## Atualiza��o: modelo hospedado e taxa �nica
- Implanta��o: R$ 1.500,00 em todos os pacotes. Mensalidades: 290, 590 e 990.
- Removidas da p�gina: se��es 'Seus dados' e 'Requisitos', passos de instala��o, perguntas sobre Docker, IP fixo, licen�a e servidor, e o campo de pol�tica de reemiss�o.
- Carrossel: cart�es alinhados ao container; no desktop os tr�s aparecem lado a lado e os controles somem. Abaixo de 960 px h� rolagem com setas, abas e teclado.
- Pendente com o dono: o que a implanta��o e a mensalidade cobrem (hospedagem, backup, disponibilidade). A p�gina n�o promete nenhum desses itens.
