# Refinamento profissional: relatório

CRM original: somente leitura. Commits: `1e1e4a2` (blocos 1 e 2, feitos juntos porque mexem nos mesmos arquivos) e `70b2b7b` (bloco 3).

## 1. Opções de H1 (escolha uma)
Hoje a página usa a opção A, em 2 linhas a partir de 768 px.

| | H1 | Evidência (CONTEUDO.md) |
|---|---|---|
| A | CRM de WhatsApp com IA para a sua equipe de vendas. | S1, F1, F3, F7 |
| B | Conversas, funil e automações do WhatsApp em um só painel. | F1, F7, F12 |
| C | Atenda no WhatsApp com IA e acompanhe cada venda no funil. | F1, F3, F7 |

Nenhuma usa superlativo, número de clientes ou promessa de resultado.

## 2. O que mudou
**Bloco 1**
- Planos: seletor "Hospedado por nós | No seu servidor", duas caixas (quem cuida do servidor; o que você faz), cards com nome, preço, 1 linha, no máximo 3 itens e botão "Escolher <plano>" (WhatsApp com plano e modelo na mensagem). Comparação abaixo, recolhida no celular (botão), sempre aberta a partir de 900 px. Nenhum "Em breve" dentro de card.
- "No roadmap": 5 itens sem preço, cada um com "Avise-me" (WhatsApp pré-preenchido).
- Oferta de lançamento mantida, com aviso "Termos conforme a Política de Reembolso" e link.
- CTAs: primário "Falar com a equipe" (`https://wa.me/` montado em `site.js`), secundário "Ver planos".
- Privacidade em duas versões, na seção "Hospedado ou no seu servidor". Sem promessa de uptime, backup ou SLA.
- Ordem: Hero, Funciona com, Problema, Produto, IA, Como funciona, Hospedado ou servidor, Planos, FAQ, Serviços, CTA final.
- Serviços reduzidos a uma faixa de 3 linhas. Navbar: Produto, IA, Planos, FAQ + CTA.
- Botão de tema removido. O tema claro deixou de existir no build (tokens e capturas claras removidos); não há o que testar.

**Bloco 2**
- "Problema" e "Como funciona" redesenhados com os mesmos cards, ícones e raios. Antes e depois em `verificacao/antes-depois/` (`*-antes-*.png`, `*-depois-*.png`, desktop e celular). "Como funciona" tem passos horizontais com uma captura por passo e uma única legenda.
- Roxo = marca e CTAs; verde só em check/status. Removidos o eyebrow verde com ponto luminoso, o ponto do selo do hero, o verde da oferta de lançamento e do selo "Em breve".
- Inter em tudo (Space Grotesk removida do build e dos arquivos); mono só em eyebrow e números. Raios 8/12/16 (+ pílula). Sombras `sm/md/lg`. Ícones com traço 1,8. Parágrafos até 70 ch. Espaçamentos em múltiplos de 4.
- Removidos contadores animados e o marquee ("Funciona com" é uma linha estática de chips, só itens classe A). Spotlight do cursor também saiu.
- Fundo do hero: gradiente estático por padrão; manchas animadas só a partir de 900 px e sem reduced-motion.

**Bloco 3**
- Vídeo de 1 min 25 s, sem áudio, 1032x720, gravado na cópia `_demo` com dados fictícios: Conversas, Pipeline (um negócio arrastado de etapa) e Automações. Sidebar recortada do vídeo. WebM (639 KB), MP4 (408 KB), poster AVIF (29 KB). O poster é `loading="lazy"`; o vídeo só é baixado depois do clique e começa mudo, com controles nativos. Legenda "Dados fictícios de demonstração".
- Rodapé: razão social, CNPJ, e-mail e WhatsApp (formatado) vindos de `site.js`.

## 3. Verificação (saídas literais)
**Trava bloqueando** (`npm run build` sem `ALLOW_DRAFT_BUILD`):
```
exit-code do build: 1
BUILD BLOQUEADO pelo publish-guard: 35 pendencia(s)
dist existe apos o bloqueio: False
```
**Trava passando com valores de teste** (`node scripts/test-guard.mjs --keep`):
```
CASO: valores validos de teste (nada gravado no projeto)
  exit=0
  publish-guard: nenhuma pendencia. Build liberado.
  dist criado: true | NAO_PUBLICAR.txt: false | robots.txt: "Allow: /"
  meta robots do inicio: index,follow | canonical: https://landing-teste.com.br/
projeto intocado: site.js do projeto ainda tem CNPJ "[CNPJ]"
RESULTADO: todos os casos invalidos bloquearam; o caso valido passou
```
13 casos inválidos (CNPJ, CTA, domínio, e-mail, mensalidade, implantação, linha do plano), todos com `exit=1 bloqueado=true`.

**Termos proibidos no dist/** (HTML, meta, Open Graph, JSON-LD, alt, aria-label, bundles, nomes de arquivo):
```
resumo: 44 arquivos, 10 de texto varridos, 11 grupos de termos, ocorrencias proibidas: 0
```
Vazamento de caminhos da cópia: `node _tools/leakscan.mjs` sem ocorrência (precisei renomear classes CSS que continham "_demo").
**Mudança no scan:** a regra de PIX/cobrança também libera ocorrência dentro de texto que comece com "Roadmap (" (cláusula nos termos). Qualquer outra menção continua bloqueando.

**Rastreabilidade:** `afirmacoes rastreadas: 101 | ids desconhecidos: nenhum | texto sem ev: 12` e `afirmacoes ligadas a itens classe C: 0`.
**Links:** `paginas: 4 | referencias internas verificadas: 71 | quebradas: 0`.

**Reduced-motion e fundo do hero:**
```
desktop + reduced-motion   {"mesh":"none","fundoEstatico":true,"animacoesRodando":0}
celular 375 px             {"mesh":"none","fundoEstatico":true,"animacoesRodando":0}
desktop sem preferencia    {"mesh":"block","fundoEstatico":false,"animacoesRodando":3}
```
**Larguras 320 a 1920:** `overflowX: 0` em 320, 375, 414, 768, 1024, 1280, 1440 e 1920. H1 em 2 linhas a partir de 768 px; 3 linhas em 320 a 414 px.

**Lighthouse mobile** (13.6.0, throttling simulado, build de produção válido com valores de teste, servido por `vite preview` local, sem compressão do servidor):
```
performance: 99 | accessibility: 100 | best-practices: 100 | seo: 100
LCP=2.1 s | CLS=0.002 | TBT=30 ms | FCP=0.8 s
```
Vale como referência local. Refazer depois do deploy real.

**CRM:** `git status` com 129 entradas, HEAD `5423138`, hash de `git diff` `7066e39a1db4e5c9ee4a51b5757064a85b71fe7d`, idêntico ao baseline.

## 4. Leitura visual do vídeo (16 quadros, um a cada 5,5 s)
Nenhuma tela classe C, nenhuma sidebar, nenhum total ou resultado em R$. Rótulos visíveis:
- **Conversas** (quadros 1 a 6, 9, 12): Fila (1), Minhas, Diego Amostra, Assumir, Conversas, "Buscar por nome ou telefone...", lista Ana Exemplo, Bruno Teste, Camila Modelo, Diego Amostra, Elisa Fictícia, Fabio Demonstração, Gabriela Padrao, Hugo Simulado (horários 12:58 a 13:47, contadores 2 e 1; pré-visualizações borradas), "Selecione uma conversa para iniciar", Ai, Human, "Assumir conversa", "Em atendimento por outro agente", mensagens fictícias ("Olá, vocês têm o kit iniciante disponível?", "Temos sim! Posso te passar os detalhes e o valor agora.", "Pode ser, obrigado!", "Qual o prazo de entrega para o interior?", "O prazo varia conforme a regiao. Pode me informar o seu CEP?", "Quero falar com um atendente", "Certo, vou chamar uma pessoa da equipe para continuar com voce."), "Digite uma mensagem...", Enviar.
- **Pipeline** (quadros 7, 8, 10, 11, 12): "Pipeline de vendas", Pipeline, "Arraste os deals entre etapas para atualizar o funil", Novo lead, colunas Novo lead (2), Em atendimento (4), Proposta enviada (5, depois 4), Negociação; cartões com nome, cliente fictício e valor do negócio (R$ 750,00 a R$ 8.850,00); subtítulos das colunas borrados.
- **Automações** (quadros 13 a 16): "Automações", "Crie fluxos automáticos para o seu funil", "Automações (3)", "Dispare ações quando um negócio entra ou fica parado em um estágio", "+ Nova automação", ESTÁGIO, GATILHO, AÇÃO, STATUS, as 3 linhas (Notificar atendente, Agendar lembrete, Enviar template WhatsApp, "boas_vindas_demo (pt_BR)"), Ativa, Editar, Excluir.

## 5. Divergências entre a página e `legal.js`
1. O aviso da oferta remete à Política de Reembolso, mas `reembolso` não tem cláusula sobre a oferta nem sobre mensalidade isenta. A oferta só aparece em Termos, seção 8, com placeholder.
2. O bônus de 30 dias do Copiloto é para assinantes do Hosted Básico, e a página diz que o Básico não aceita módulos avulsos. Falta definir como o bônus é entregue.
3. Reembolso, seção 3 ("Serviço já implantado"), é placeholder: não diz se a taxa de implantação é reembolsável. A página chama a implantação de "taxa única" e não diz mais nada.
4. A garantia aparece na página e em Reembolso, seção 4, como o mesmo placeholder. Consistente, mas sem texto.
5. Hospedagem: Termos, seção 2, deixa disponibilidade, backup e retenção como placeholder; a página não promete nenhum. Consistente.
6. Os 5 itens do roadmap e a chamada "Avise-me" estão em Termos, seção 8, com marca de revisão jurídica, inclusive o tratamento dos dados de quem pedir aviso.

## 6. Depende de você
**Jurídico:** todos os placeholders de `legal.js` (a trava continua bloqueando por eles); itens 1 a 6 acima; condições da oferta dos 20 primeiros; tratamento de dados do "Avise-me".
**Preços e oferta:** o que "interação" significa e o que acontece ao passar da franquia; se o bônus do Copiloto fica; se os valores de cada cartão de negócio no vídeo (R$ 750,00 a R$ 8.850,00) podem aparecer. Eles são valores de negócios fictícios, não resultado, mas posso borrar.
**Modelo de entrega:** como o cliente do "No seu servidor" recebe o produto; o que a implantação e a mensalidade hospedada cobrem (backup, disponibilidade).
**Dados reais em `site.js`:** razão social, CNPJ, e-mail, WhatsApp, domínio, URL de compra.
**Escolhas:** o H1 (A, B ou C); nomes "Hosted"/"Self-Hosted" nos cartões (mantive os seus; um dono de pequena empresa pode não entender "Hosted"); manter ou não o selo "Recomendado".
**Fora do alcance:** o tema claro foi removido, não testado. O vídeo mostra a interface do CRM como está hoje; se a interface mudar, regravar com `node _tools/record-demo.mjs` na cópia `_demo`.

## 7. Ajustes posteriores
- Bloco 'No roadmap' removido (decisao do dono: tudo estara disponivel no dia 1), junto com as linhas 'Modulos adicionais' da comparacao e a clausula de roadmap dos Termos. Nenhum desses recursos aparece mais na pagina. Quando existirem no produto e tiverem evidencia em CONTEUDO.md, entram nos cartoes. O bonus de 30 dias do Copiloto na oferta de lancamento continua no texto e nao tem mais contexto na pagina.
- FAQ passou a ser a ultima secao (depois do CTA final).
- 'Como funciona' sem capturas: trilha vertical com cartoes alternados e seta roxa curva medida no navegador (um segmento com ponta de seta por passo, desenhado ao entrar na tela; sem animacao com reduced-motion). Referencias: smartclick.agency/blog/saas-landing-page-best-practices (mostrar como funciona em vez de listar recursos), unicornplatform.com/blog/optimal-landing-page-structure (cada secao com um papel e um proximo passo), flaviocopes.com/animated-svg-connection-lines e techblog.sdstudio.top (stroke-dasharray + stroke-dashoffset com pathLength normalizado).
- Correcao: o item 'Sem correcao de bugs futuros nem suporte tecnico' vazava do cartao porque a classe .no da lista colidia com a marca X da tabela comparativa (largura de 20 px). A marca da tabela agora tem classe propria.
- Linha 'Consultor digital: o dono acompanha o negocio pelo WhatsApp' na comparacao: Basico nao, Intermediario e Avancado sim, BYOK e planos no seu servidor como modulo adicional (sem preco). O nome unico agora e 'Consultor digital' (antes 'Copiloto do Gestor'), inclusive no bonus da oferta e nos Termos.
- ATENCAO: esse recurso nao tem evidencia no CRM analisado (busca por copilot, copiloto, estoque e gestor em crm-flow-ia e core-hub-ia). Entrou por declaracao do dono (id OWNER-D1, classe D na rastreabilidade). Trava nova: SITE.launchChecklist.consultorDigital fica false e bloqueia a publicacao ate o dono confirmar que o recurso esta no ar e mudar para true.
