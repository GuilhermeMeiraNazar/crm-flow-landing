> ATENCAO: este documento descreve a versao ANTERIOR ao refinamento. Ordem das secoes, planos, tema, fontes e video mudaram; veja verificacao/REFINAMENTO-RELATORIO.md.

# Frontly: estrutura do front e estética da landing page

Documento para revisão externa de design, UX e front-end. Descreve o que existe hoje, sem avaliar. A seção final lista dúvidas e pontos que já sei que merecem olhar.

## 1. Visão geral
- **Tipo:** landing page estática (HTML pré-renderizado com hidratação em React).
- **Produto:** CRM de WhatsApp com IA, vendido em duas linhas: hospedado pelo fornecedor ou no servidor do cliente.
- **Público:** pequenas e médias empresas brasileiras que vendem pelo WhatsApp. Idioma: pt-BR.
- **Marca:** "Frontly" (nome provisório), monograma "C" sobre gradiente roxo.
- **Status:** build de rascunho. Há placeholders (CNPJ, domínio, contatos, textos legais) e uma trava que impede publicar enquanto existirem.

## 2. Stack e build
| Item | Valor |
|---|---|
| Framework | React 18, sem biblioteca de UI |
| Bundler | Vite 8 (build do cliente + build SSR para pré-renderizar) |
| Estilos | SCSS Modules (`landing.module.scss`) + variáveis CSS globais (`global.scss`) |
| Fontes | Inter (corpo), Space Grotesk (títulos), JetBrains Mono (rótulos). Auto-hospedadas em WOFF2, `font-display: swap` |
| Imagens | Capturas reais do produto em AVIF com fallback WebP, 1x e @2x |
| Roteamento | Nenhum. 4 páginas HTML: início, termos, privacidade, reembolso |
| Tamanho do build | HTML 52 KB; JS 60 KB (app) + 137 KB (React); CSS 34 KB |
| Servidor | nginx sem privilégios em Docker |

Estrutura de pastas relevante:
```
src/
  config/site.js          preços, contatos, CTA, planos, add-ons, serviços
  content/pt-BR.js        todo o texto da página, com ids de evidência
  content/legal.js        textos legais (rascunho)
  components/ui.jsx       Navbar, Footer, Brand, Shot, ShotFrame, Caption
  components/sections.jsx Hero, Marquee, Problem, Product, AiSection, How,
                          Pricing (PlanCarousel), Services, Faq, FinalCta
  hooks/effects.jsx       revelação no scroll, spotlight, contadores
  styles/global.scss      tokens, temas, reset, acessibilidade
  styles/landing.module.scss  estilos de seções e componentes
```

## 3. Ordem das seções (página inicial)
1. **Navbar** fixa: marca, links (Produto, IA, Como funciona, Planos, Serviços, FAQ), botão de tema, botão CTA. No celular vira menu em painel.
2. **Hero:** selo, título H1, subtítulo, dois botões, captura do pipeline em moldura de navegador com fade na base.
3. **Marquee:** faixa rolando com integrações (WhatsApp Cloud API, webhook de leads, OpenAI, Gemini, Claude, Groq).
4. **Problema:** três colunas de texto com filete lateral.
5. **O produto:** abas (Conversas, Pipeline, Automações, Relatórios), cada uma com texto à esquerda e captura à direita. Abaixo, quatro cards com ícone ("Também no produto") e uma faixa de quatro números.
6. **Inteligência artificial:** lista numerada de quatro itens ao lado da captura de Chaves de IA, e um aviso de privacidade.
7. **Como funciona:** quatro passos em linha do tempo vertical que acende ao rolar.
8. **Planos:** grupo "Hospedado por nós" (4 cards), grupo "No seu servidor" (2 cards) e tabela de requisitos do servidor, seção "Monte o seu CRM sob medida" (4 módulos "Em breve"), bloco da oferta de lançamento e linha de garantia.
9. **Serviços de aceleração:** três cards (landing page, consultoria, gestão de tráfego).
10. **FAQ:** acordeão com `<details>`.
11. **CTA final:** caixa centralizada com glow, dois botões.
12. **Footer:** marca, links legais, aviso de marcas de terceiros.

## 4. Sistema visual

### 4.1 Cores (tema escuro é o padrão; tema claro disponível)
| Token | Escuro | Claro |
|---|---|---|
| `--bg` | #0A0E13 | #FAFBFC |
| `--bg-elevated` | #0F141B | #FFFFFF |
| `--surface` | #141B23 | #F3F5F8 |
| `--border` / `--border-strong` | #212B36 / #2C3846 | #D9DFE8 / #C3CBD8 |
| `--text-primary` | #EEF2F6 | #1A202C |
| `--text-secondary` | #93A1B0 | #5A6B7A |
| `--text-tertiary` | #7F8D9C | #5F6B7A |
| `--accent-ai` (roxo) | #7C6FFF | #6857D6 |
| `--accent-live` (verde) | #2DD4A7 | #00A366 (texto: #007A4D) |
| `--accent-danger` | #FF5C7A | #E85A75 |
| Botão primário | gradiente #6254E8 → #5A4FCC | #6254E8 → #4A3FA8 |

Os valores vêm do próprio app (CRM), com ajustes marcados `[AA]` para atingir contraste AA no texto terciário, no gradiente do botão e no texto verde do tema claro.

### 4.2 Tipografia
- **Títulos:** Space Grotesk 600, `letter-spacing: -0.03em`, `line-height: 1.08`, `text-wrap: balance`.
- **H1:** `clamp(2.3rem, 7.2vw, 4.9rem)`. **Títulos de seção:** `clamp(1.9rem, 4.6vw, 3.2rem)`.
- **Corpo:** Inter 1rem, `line-height: 1.6`.
- **Rótulos (eyebrow, tier, metadados):** JetBrains Mono 0.7 a 0.75rem, maiúsculas, espaçamento de letras 0.06 a 0.08em.

### 4.3 Espaçamento, forma e profundidade
- Container máximo 1180 px, recuo lateral `clamp(16px, 5vw, 32px)`.
- Seções com `padding-block: clamp(64px, 11vw, 128px)` e filete superior de 1 px.
- Raios: 8, 12, 16 e 24 px. Cards com borda de 1 px e fundo `--surface`.
- Sombras suaves; glow roxo atrás das capturas e do botão primário.
- Breakpoints: 640, 900, 1100 (carrossel de planos) e 1200 px.

### 4.4 Componentes recorrentes
- **Eyebrow:** texto mono verde com ponto luminoso.
- **Botões:** primário em gradiente com brilho que passa no hover; fantasma com borda.
- **Moldura de captura:** barra com três pontos, borda, sombra e legenda fixa "Dados fictícios de demonstração".
- **Lista com check:** círculo verde com marca. Variante com X vermelho para "não incluso".
- **Selo "Em breve"** (roxo, em pílula) em recursos ainda indisponíveis.
- **Selo "Recomendado"** na borda superior do plano Intermediário.

## 5. Movimento
| Efeito | Onde | Observação |
|---|---|---|
| Fundo do hero | 3 manchas desfocadas (blur 60px) se movendo, mais grade de linhas | animação contínua, 22 a 30 s |
| Marquee | faixa de integrações | rolagem infinita, pausa no hover |
| Revelação no scroll | blocos com `data-reveal` | só deslocamento vertical, sem opacidade |
| Spotlight | cards com `data-spot` | brilho segue o cursor (só desktop) |
| Contadores | faixa de números | contam ao entrar na tela |
| Passos | "Como funciona" | cada passo acende ao rolar |
| Carrossel de planos | abaixo de 1100 px | scroll com snap, setas, abas e teclado |

O mockup do hero é estático (a inclinação 3D foi removida por custo de renderização). Com `prefers-reduced-motion`, animações e transições são desligadas.

## 6. Responsividade
- **Mobile first.** Navegação vira menu em painel abaixo de 900 px.
- **Planos:** a partir de 1100 px os 4 cards hospedados ficam lado a lado e os controles somem. Abaixo disso, faixa rolável com setas e abas; card seguinte aparece na borda.
- **Abas do produto:** pílulas com rolagem horizontal no celular.
- **Grades de apoio:** 1 coluna no celular, 2 em tablet, 4 em desktop (módulos, "Também no produto").
- Testado em 375, 1024 e 1440 px sem rolagem horizontal da página.

## 7. Acessibilidade implementada
- Link "Pular para o conteúdo", foco visível (anel roxo de 2 px), `lang="pt-BR"`.
- Abas do produto com `role=tablist/tab/tabpanel`, setas, Home e End.
- Carrossel de planos com `aria-roledescription`, rótulos por plano e teclado.
- Imagens com `alt` descritivo; ícones decorativos com `aria-hidden`.
- Contraste de texto ajustado para AA nos dois temas.
- Último Lighthouse completo (build de produção local, antes das seções novas): Performance 99, Acessibilidade 100, Boas práticas 100. SEO só pontua depois de publicar (o rascunho bloqueia indexação).

## 8. Conteúdo e imagens
- **Capturas reais do produto** (dados fictícios), recortadas sem a barra lateral nas telas de recurso: Pipeline, Conversas, Automações, Relatórios (só o painel "Deals por estágio") e Chaves de IA. O hero mantém a barra lateral, com itens não divulgados desfocados.
- Cada tela existe em versão escura e clara, em AVIF e WebP, 1x e 2x.
- Sem fotos de banco de imagem, sem ilustrações e sem logotipos de terceiros (integrações só em texto).
- Sem depoimentos, números de clientes ou métricas de desempenho.

## 9. Pontos que já sei que merecem olhar
1. **Seções "Problema" e "Como funciona"** estão no estilo antigo (texto com filete e linha do tempo simples). Foram redesenhadas apenas "O produto" e "IA".
2. **Planos:** a página tem 4 + 2 cards, módulos, oferta e serviços. É longa e densa. Avaliar hierarquia, necessidade de tabela comparativa e se o carrossel no tablet é a melhor escolha.
3. **Cards Intermediário e Avançado** têm poucos recursos reais; a maioria dos itens está marcada "Em breve". Isso pesa na percepção de valor.
4. **Fundo animado do hero** (manchas desfocadas) pode pesar em celulares simples.
5. **Marquee** só tem texto; pode parecer vazio sem logotipos.
6. **Hierarquia de CTAs:** o texto do botão é o mesmo ("Quero o Frontly") em todo lugar, inclusive nos 6 cards de plano.
7. **Prova social:** não há. Foi deliberado, por não haver clientes ainda.
8. **Tema claro:** menos testado que o escuro.
9. **Hero:** título longo em 3 linhas no desktop; avaliar se a promessa fica clara em menos palavras.
10. **Densidade de texto** dentro dos cards de plano em 4 colunas (cartões estreitos, ~265 px).

## 10. Perguntas para o revisor
- O hero comunica o que é o produto e para quem em 5 segundos?
- A escolha entre "hospedado" e "no seu servidor" está clara para um dono de pequena empresa sem perfil técnico?
- A página passa credibilidade sem depoimentos? O que substituiria isso sem inventar dados?
- Há excesso de cores de destaque (roxo e verde ao mesmo tempo)?
- Hierarquia tipográfica, ritmo de espaçamento e contraste: algo destoa entre as seções redesenhadas e as antigas?
- Ordem das seções: Planos vem antes de Serviços e FAQ. Faz sentido ou o FAQ deveria subir?
