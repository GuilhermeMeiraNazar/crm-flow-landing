# CONTEUDO.md - Fase A (varredura do CRM)

Fonte: `C:\dev\crm-flow-ia` (somente leitura), HEAD `5423138`. Nenhum arquivo `.env`, `.env.local` ou `license/private.pem` foi lido.
Esta pasta (`C:\dev\crm-flow-landing`) e independente; nada daqui entra no repositorio do CRM.

## 0. Como ler este documento

Convencao de evidencia: `arquivo:linha` relativo a raiz do CRM. Quando so ha o arquivo, a evidencia e o arquivo inteiro (listado, nao citado por linha).

Criterio de classe usado (declarado para voce poder contestar):

| Classe | Criterio aplicado |
|---|---|
| A | Codigo presente e montado em `app.js`/`App.jsx`, mais teste automatizado (unitario, property ou integracao) que cobre a regra central. |
| B | Codigo presente e montado, mas sem teste automatizado da regra central, ou com cobertura parcial. |
| C | Stub, parcial, adiado, ou bloqueado por decisao sua (lista da regra 3 da tarefa). |

Limites da verificacao, ditos de forma explicita:

1. **Nao executei as suites de teste do CRM.** `globalSetup`/`testEnv.js` carregam configuracao de ambiente e banco de teste, e rodar poderia tocar `.env` e criar artefatos no CRM. "Testado" aqui significa "existe arquivo de teste que cobre o item" (caminho listado), nao "teste passou". Se quiser a classe A com teste passando, preciso que voce rode `npm test` e me envie a saida, ou autorize rodar em copia.
2. **Nenhuma funcionalidade tem teste de navegador ponta a ponta** (nao ha Playwright/Cypress no CRM). Logo, nenhuma UI tem E2E. A classe A significa regra de backend/servico testada.
3. **Nenhuma integracao externa foi testada contra o servico real** por evidencia no repositorio (Meta, provedores de LLM, Asaas).
4. `.kiro/specs/specs-completed` tem tarefas abertas em 12 specs (ex.: `theme-preferences` 30, `reports-and-preferences` 24). Specs sao intencao; usei o codigo como fonte e so citei spec para contexto.

---

## 1. Proposta de valor, headlines e publico

### Proposta de valor (1 frase)

Um CRM para quem vende pelo WhatsApp, com caixa de entrada para a equipe, funil de vendas em quadro kanban e um agente de IA que atende e transfere para uma pessoa, instalado no servidor do cliente e com chaves de IA do proprio cliente.

### Tres headlines (sem superlativos)

1. CRM de WhatsApp com IA, instalado no seu servidor.
2. Atenda no WhatsApp, acompanhe o funil e passe para uma pessoa quando a IA chegar ao limite.
3. Seu CRM de WhatsApp, com seus dados e suas chaves de IA.

Subheadline candidata (todas as partes tem evidencia na secao 2): "Caixa de entrada multiatendente, pipeline kanban, automacoes por etapa e relatorios, em uma instalacao dedicada por cliente."

### Publico-alvo inferido

- Pequenas e medias empresas brasileiras que vendem e atendem por WhatsApp com mais de um atendente. Evidencia: perfil `admin`/`agent` e atribuicao de conversa (`src/migrations/001_create_core_tables.sql:11`, `src/routes/inbox.routes.js:31-34`); gateway PIX pensado para "publico-alvo PME" (`.kiro/specs/specs-completed/pix-payment-gateway/tasks.md:30`, intencao).
- Quem precisa de dados em infraestrutura propria: instalacao por cliente em VPS, uma stack por cliente (`deploy/INSTALL.md`, titulo "um cliente = um projeto Docker Compose"; `docker-compose.prod.yml:1-8`).
- Possivel segundo publico: agencias/integradores que instalam para varios clientes (`deploy/INSTALL.md:9` "um subdominio por cliente", `deploy/client-env-template.env:32` "No servidor do fornecedor, todos os clientes usam o mesmo"). E inferencia; confirme.
- Interface e todo em portugues do Brasil, moeda BRL (`client/src/pages/Admin/Reports.jsx`, `brl()`), fuso `America/Sao_Paulo` (`deploy/INSTALL.md` tabela de embeddings).

---

## 2. Tabela de funcionalidades

| # | Funcionalidade | O que faz (1 linha) | Tela / rota | Evidencia | Classe |
|---|---|---|---|---|---|
| 1 | Caixa de entrada multiatendente | Lista conversas, fila e "minhas"; atribuir, liberar e marcar como lida, com atualizacao em tempo real | `/inbox`; `/api/inbox/*` | `src/routes/inbox.routes.js:22-46`; `src/realtime/inboxEvents.js:56,138,167`; testes: `src/controllers/__tests__/inboxController.test.js`, `src/realtime/__tests__/inboxEvents.test.js`, `src/services/__tests__/conversationAccessService.test.js` | A |
| 2 | Envio de texto, imagem e documento pelo atendente | Envia mensagem e anexos (limite 16 MB por upload) pela API oficial | `/inbox`; `POST /api/whatsapp/send`, `/upload` | `src/routes/whatsapp.routes.js:64,69-73`; `client/src/pages/Inbox.jsx:162-175`; testes: `src/controllers/__tests__/whatsappController.test.js`, `src/__integration__/mediaSecurity.integration.test.js` | A |
| 3 | Agente de IA com transferencia para humano | Responde mensagens com LLM; transfere por pedido do cliente, falhas consecutivas ou regra de valor; estados `ai`, `human_requested`, `human` | Inbox (estado da conversa); sem tela propria | `src/controllers/whatsappController.js:259-330`; `src/services/conversationStateMachine.js:9-32`; `src/services/transferTriggerService.js:8-9`; testes: `conversationStateMachine.test.js` e `.property.test.js`, `transferTriggerService.test.js` e `.property.test.js` | A |
| 4 | Transcricao de audio recebido | Converte audio (OGG/Opus, MP3, WAV, M4A, ate 25 MB) em texto via provedor configurado e segue o fluxo da IA | Inbox (player de audio) | `src/services/audioTranscriptionService.js:28`; `src/jobs/mediaTranscriptionJob.js:141-178`; testes: `mediaTranscriptionJob.test.js`, `audioTranscriptionService.test.js` | A |
| 5 | Extracao de lead por IA | Extrai nome, telefone, e-mail, orcamento, produto de interesse e nivel de intencao, cada um com confianca 0 a 1 | Sem tela propria | `src/services/leadExtractionService.js` (cabecalho "Campos extraidos"); testes: `tests/unit/leadExtractionService.test.js`, `leadExtractionJob.test.js` | A |
| 6 | Lead vira negocio automaticamente | Cria ou atualiza negocio no pipeline a partir da extracao, so acima do limiar de confianca, sem sobrescrever valor humano, idempotente por conversa | Pipeline | `src/services/leadToDealService.js:13-16`; `compose local`: `LEAD_TO_DEAL_ENABLED` (`docker-compose.local.yml`); testes: `leadToDealService.test.js`, `.idempotency.test.js` | A |
| 7 | Pipeline kanban | Quadro de negocios por etapa, arrastar entre etapas, resumo e analitico do funil | `/pipeline`; `/api/deals`, `/api/pipeline/*` | `client/src/pages/Pipeline.jsx:13`; `src/routes/deals.routes.js:48-80`; `src/routes/pipeline.routes.js`; `client/package.json` (`@hello-pangea/dnd`); testes: `dealService.test.js`, `pipelineStageService.test.js`, `kanbanEvents.test.js` | A |
| 8 | Etapas do funil configuraveis | Criar, editar, reordenar e excluir etapas; tipo aberta, ganha ou perdida | `/admin/pipeline`; `/api/pipeline/stages` | `src/routes/pipeline.routes.js:47-80`; `src/migrations/004_create_pipeline_tables.sql:9`; testes: `pipelineStageService.invariants.test.js` | A |
| 9 | Historico de movimentacao de negocios | Registra cada mudanca de etapa com data, autor e tempo na etapa | Relatorios | `src/migrations/MIGRATIONS_REGISTRY.md:48` (026); `src/routes/analytics.routes.js:deal-stage-history`; teste: `dealService.stage-history.test.js` | A |
| 10 | Exclusao logica com autoria em negocios e contatos | Soft delete com quem criou, alterou e excluiu | Contatos, Pipeline | `src/migrations/MIGRATIONS_REGISTRY.md:51` (029); teste: `src/__integration__/softDelete.integration.test.js` | A |
| 11 | Contatos | Lista com busca por nome ou telefone, criar e editar, CPF/CNPJ | `/contacts`; `/api/contacts` | `client/src/pages/Contacts.jsx:11,185-196`; `src/routes/contacts.routes.js:45-59`; testes: `contactService.test.js`, `contactController.test.js` | A |
| 12 | Automacoes por etapa | Gatilhos "ao entrar na etapa" e "apos X dias parado"; acoes: enviar template de WhatsApp, notificar atendente, agendar lembrete | `/automations`; `/api/automations` | `client/src/components/automations/automationConstants.js:5-16`; `src/services/pipelineAutomationService.js` (`handleSendWhatsappTemplate`, `handleNotifyAgent`, `handleScheduleReminder`, cron `0 8 * * *` UTC); testes: `pipelineAutomationService.test.js` | A (as 3 acoes citadas) |
| 12b | Automacao "Gerar link PIX" | Gera cobranca PIX e envia por template | `/automations` (opcao do formulario) | `automationConstants.js:12`; depende da linha 25 desta tabela | **C** |
| 13 | Dashboard | KPIs com tendencia (novas conversas, % atendido pela IA, negocios em aberto, valor fechado), feed de atividade ao vivo, follow-ups | `/`; `/api/dashboard/*` | `src/routes/dashboard.routes.js:15-21`; `src/services/dashboardService.js` (cabecalho); testes: `dashboardService.test.js`, `dashboardController.test.js`, `client/src/pages/Dashboard.test.js` | A |
| 14 | Relatorios | Funil (conversao, valor fechado/aberto, tempo por etapa), atendimento (IA x humano, 1a resposta, motivos de transferencia), custo de IA (por provedor, funcao e dia) | `/admin/analytics`; `/api/analytics/*` | `client/src/pages/Admin/Reports.jsx:122-245`; `src/routes/analytics.routes.js`; testes: `tests/property/analyticsController.property.test.js`, `client/src/pages/Admin/Reports.test.jsx` | A |
| 15 | Exportacao de relatorios | CSV (funil, atendimento, custo de IA) e XLSX | Botoes em Relatorios; `/api/export/*.csv`, `/api/analytics/export` | `src/routes/export.routes.js:34-40`; `src/routes/analytics.routes.js:export`; testes: `exportController.test.js`, `exportController.integration.test.js` | A |
| 16 | Chaves de IA proprias (BYOK) | Cadastra chave de OpenAI, Gemini, Claude ou Groq; chave criptografada com AES-256-GCM e exibida mascarada | `/admin/ai-settings`; `/api/ai/providers` | `src/validators/aiProvider.validator.js:24`; `src/config/encryption.js:6`; `src/services/providerRegistryService.js` (`maskApiKey`); testes: `providerRegistryService.property.test.js`, `aiProvider.validator.test.js`, `tests/unit/encryption.test.js` | A |
| 17 | Funcoes de IA com provedor e fallback | Quatro funcoes (agente, extracao de lead, embeddings, transcricao) com provedor primario e cadeia de reserva | `/admin/ai-settings`; `/api/ai/roles` | `src/services/roleConfigService.js:16-21`; `src/services/fallbackExecutor.js:13`; testes: `fallbackExecutor.test.js`, `llmOrchestratorService.test.js` | A |
| 18 | Uso, custo e limites de IA | Registra tokens e custo por chamada, tabela de precos por modelo, limites diario e mensal da chave propria | `/admin/ai-settings`; `/api/ai/usage`, `/limits`, `/pricing` | `src/routes/aiUsage.routes.js:27-45`; `src/migrations/MIGRATIONS_REGISTRY.md:39` (017); teste de preco: `usagePricing.property.test.js`. **Sem teste do `budgetGuardService`** | B (bloqueio por teto: `budgetGuardService.js`) / A (registro e custo) |
| 19 | Embeddings locais embutidos | Modelo `multilingual-e5-small` (384 dimensoes) roda dentro do conteiner, sem rede e sem chave | Sem tela | `deploy/INSTALL.md:67-69`; `docker/Dockerfile.prod` (etapa `model`); testes: `embeddingService.test.js`, `embeddingRunner.test.js`. Medicao de producao **pendente** (`deploy/INSTALL.md:82-86`) | B, condicionada a KB (ver 22) |
| 20 | Catalogo de produtos | Cadastro de produtos e servicos; badge de sincronizacao com a base de conhecimento | `/products`; `/api/products` | `client/src/pages/Products.jsx:9,35-43`; `src/routes/products.routes.js:44-50`; teste so de paginacao: `productController.pagination.prop.test.js` | B (CRUD); **C** (sincronizacao com KB) |
| 21 | Calendario nativo | Eventos de agenda ligados a contatos e negocios | `/calendar`; `/api/calendar/events` | `src/routes/calendar.routes.js:38-41`; `src/migrations/MIGRATIONS_REGISTRY.md:52` (030). **Nenhum teste encontrado** | B |
| 22 | Base de Conhecimento (upload PDF/DOCX/TXT, versoes, busca RAG) | Envia documentos, indexa em vetores e injeta contexto nas respostas da IA | `/knowledge-base`; `/api/knowledge-base/*` | `src/routes/knowledgeBase.routes.js`; `server.js:104`; `src/services/ragContextService.js:77-86`; `docs/KB-OPERATIONAL-GUIDE.md` | **C** (liberacao pendente do dono) |
| 23 | Reconciliacao da KB | Corrige divergencia entre MySQL e LanceDB, cron diario | Sem tela; `/api/admin/kb-reconciliation/*` | `app.js:168`; `docs/KB-OPERATIONAL-GUIDE.md:65` (afirma que a rota nao existe; esta desatualizado, a rota esta em `app.js:168`) | **C** |
| 24 | Licenca com verificacao offline | Valida assinatura RSA/JWT localmente contra chave publica; tela de ativacao; historico de licenca (admin) | `/admin/license`; `/api/license/*` | `license/verify.js:2`; `app.js:92`; `deploy/INSTALL.md:28`; testes: `tests/unit/licenseVerify.test.js`, `tests/property/licenseVerify.property.test.js`, `ActivationScreen.test.jsx` | A |
| 25 | Cobranca PIX (Asaas, Mercado Pago) | Gera cobranca PIX e confirma pagamento por webhook | `/integrations` (card de gateway); `/api/payment-gateway`, `/api/webhooks/payment` | `src/services/payment/providers/index.js` (registro `asaas`, `mercadopago`); `.kiro/specs/specs-completed/pix-payment-gateway/tasks.md:191` ("Teste contra o sandbox real do Asaas nao foi feito"); sem teste do `mercadoPagoProvider` | **C** |
| 26 | Google Calendar | Sincronizar agenda externa | `/integrations` (card "Em breve") | `client/src/components/integrations/CalendarIntegrationCard.jsx:53-58`; `src/services/calendarService.js` (1 linha de comentario) | **C** |
| 27 | Usuarios e agentes | Perfis admin e agent, troca obrigatoria de senha no primeiro acesso, limite de tentativas de login | `/admin/users`; `/api/users`, `/api/auth` | `src/routes/userManagement.routes.js:47-66`; `src/migrations/MIGRATIONS_REGISTRY.md:53` (031); testes: `userService.test.js`, `tests/unit/changePassword.test.js`, `authController.test.js` | A |
| 28 | Tema claro, escuro e do sistema | Alterna tema e persiste a escolha | Preferencias; `ThemeContext` | `client/src/contexts/ThemeContext.jsx:3`; `client/index.html` (script de tema); teste: `ThemeContext.test.jsx` | A |
| 29 | Configuracoes gerais | Parametros do sistema (limiar de confianca, automacoes de lead, alerta de custo de IA) | `/admin/settings`; `/api/settings` | `src/migrations/MIGRATIONS_REGISTRY.md:47` (025); `src/routes/settings.routes.js:37-51`; testes: `settingsService.test.js`, `settingsController.test.js` | A |
| 30 | Midia protegida | Midia fora do webroot, acesso por URL assinada de curta duracao | Inbox | `app.js:94-97`; testes: `mediaStorage.test.js`, `mediaLinkService.test.js`, `mediaSecurity.integration.test.js` | A |

Itens da interface que **nao** devem aparecer em captura nem em texto:

- Badge fixo "12" em "Conversas": e valor literal no codigo, nao contagem real (`client/src/data/navConfig.js:10`).
- "Editar perfil" desabilitado com "Em breve" (`client/src/components/Sidebar/Sidebar.jsx`, menu do usuario).
- Link `href="#"` em "Ver pipeline" no Dashboard (`client/src/pages/Dashboard.jsx:74`).
- Card "Calendario - Em breve" em Integracoes.

---

## 3. Diferenciais que o codigo comprova

### 3.1 Pague e receba o codigo (instalacao dedicada, dados do cliente)

- Um cliente = um projeto Docker Compose com `.env`, volumes e porta proprios (`deploy/INSTALL.md` secao "Passos"; `docker-compose.prod.yml:1-8`).
- Banco (MariaDB 11.4) e fila (Redis 7) rodam na rede interna do projeto; nenhuma porta de banco/Redis/backend e publicada; so o frontend escuta, em `127.0.0.1` (`docker-compose.prod.yml:126`; `deploy/INSTALL.md:14`).
- Modelo single-tenant: comentario de arquitetura em `src/services/budgetGuardService.js:14`.
- Endurecimento do conteiner do backend: `read_only: true`, `cap_drop: ALL`, `no-new-privileges`, usuario nao-root (`docker-compose.prod.yml:95-109`; `docker/Dockerfile.prod`).
- Segredos do cliente (chaves de IA, credenciais de pagamento) criptografados com AES-256-GCM no banco (`src/config/encryption.js:6`; `src/migrations/MIGRATIONS_REGISTRY.md:31,43`).

Ressalvas que a pagina precisa respeitar:

1. **"Receber o codigo" nao esta definido.** `deploy/INSTALL.md:18` manda "clonar o repositorio", o `Dockerfile.prod` menciona "build protegido" com bytenode (`docker/Dockerfile.prod`, comentario no topo), `package.json` tem `bytenode` e `javascript-obfuscator`, e `scripts/build-release.js` monta um pacote de release. O EULA e proprietario e proibe redistribuicao (`LICENSE-EULA.md`, `license/LICENSE-TERMS.md`). Nao da para dizer "codigo-fonte legivel/editavel" nem "open source". Preciso da sua decisao do que o cliente recebe (ver secao 6).
2. **"Seus dados ficam no seu servidor" e parcialmente verdadeiro.** O banco e os arquivos ficam na VPS, mas o texto das conversas e enviado ao provedor de LLM escolhido (OpenAI, Gemini, Claude ou Groq) em cada resposta da IA, e as mensagens passam pela Meta (WhatsApp). A pagina deve dizer "banco de dados e arquivos na sua VPS", nunca "nenhum dado sai do seu servidor".
3. O deploy pressupoe conhecimento de Docker/Linux. Nao ha instalador grafico (`deploy/INSTALL.md` e uma lista de comandos).

### 3.2 IA com chaves proprias (BYOK)

- Chaves cadastradas no painel, nao no `.env` (`deploy/client-env-template.env` secao "IA": `AI_KEYS_MODE=byok`).
- Provedores aceitos: `openai`, `gemini`, `claude`, `groq` (`src/validators/aiProvider.validator.js:24`). O valor `hub-local` existe no validador, mas o Core Hub IA nao faz parte da stack de producao (`deploy/INSTALL.md:12`, `docker-compose.prod.yml:5`); nao anunciar IA local via Ollama.
- Cadeia de reserva entre provedores para agente, extracao e transcricao; embeddings sem reserva (`src/services/fallbackExecutor.js:13,23`).
- Custo por chamada e por funcao no relatorio (`Reports.jsx:205-236`). Os precos por modelo sao uma tabela semeada (`MIGRATIONS_REGISTRY.md:34`, migracao 012); nao afirmar que o custo exibido e a fatura real do provedor.
- Existe tambem o modo `managed`/`hybrid` (credito gerenciado pelo fornecedor, `src/config/index.js:99-106`, `budgetGuardService.js`). O template de producao fixa `byok`. A pagina deve falar so de BYOK.

### 3.3 Embeddings locais

- Modelo `multilingual-e5-small`, 384 dimensoes, dentro do conteiner, "sem rede e sem chave" em runtime (`deploy/INSTALL.md:67`). O modelo e baixado no **build da imagem** (`docker/Dockerfile.prod`, etapa `model`), entao o build exige internet.
- Indexacao e reindex rodam em janela noturna configuravel, padrao `00:00-05:00` `America/Sao_Paulo` (`docker-compose.prod.yml` variaveis `EMBEDDING_*`; `deploy/INSTALL.md:72-80`).
- Nao ha medicao de producao: `deploy/INSTALL.md:82-86` registra so medicao em dev (cerca de 512 MB de RSS, carga fria cerca de 10 s) e diz "falta medir". Nenhum numero de desempenho pode ir para a pagina.
- Como o unico consumidor dos embeddings e a Base de Conhecimento (C), este diferencial so entra se voce liberar a KB.

### 3.4 Licenca offline

- Assinatura RSA/JWT verificada localmente com chave publica; sem chamada de rede nos arquivos de licenca (`license/verify.js:2`; busca por `fetch|axios|https?://` em `license/`, `licenseValidationService.js` e `licenseController.js` nao retornou resultado).
- A raiz de confianca nao e configuravel por variavel de ambiente (`license/verify.js:30-31`).
- Sem a chave publica o servidor nao inicia (`docker-compose.prod.yml` bind de `public.pem`, `create_host_path: false`).
- **Restricao que precisa ser dita com clareza:** a licenca e vinculada a um IP fixo da maquina (`SERVER_IP`, obrigatorio em producao; `deploy/INSTALL.md:22`, `src/services/licenseValidationService.js` cabecalho de `getServerIp`). Trocar de servidor ou de IP exige nova licenca. Escopo contratual: "por instancia / por CNPJ" (`license/LICENSE-TERMS.md`). Esses textos sao curtos e genericos; o dono precisa definir os termos reais.
- Nao ha evidencia de revogacao remota, expiracao por data, nem de "uso 100% offline" do produto inteiro (o produto precisa de internet para Meta e LLM). Dizer apenas "ativacao e verificacao da licenca sem servidor de licencas".

### 3.5 Stack (confirmada no codigo, nao no README)

| Camada | Real | Evidencia |
|---|---|---|
| Backend | Node 20, Express 4, BullMQ, Socket.io, Zod, Pino, Helmet | `package.json`; `docker/Dockerfile.prod` (`node:20-bookworm-slim`) |
| Banco | MariaDB 11.4 | `docker-compose.prod.yml:24` |
| Fila/cache | Redis 7 | `docker-compose.prod.yml` |
| Vetores | LanceDB embarcado | `package.json` (`@lancedb/lancedb`); `docker-compose.local.yml` comentario do Qdrant ("reservado para uso futuro") |
| Frontend | React 18, Vite, SCSS Modules, React Router 7 | `client/package.json` |
| Embeddings | `@huggingface/transformers` (e5 pequeno) | `package.json`; `deploy/INSTALL.md:67` |

**README do CRM esta desatualizado e nao deve ser usado como fonte:** diz "TailwindCSS" (o cliente usa SCSS Modules e `sass`; nao ha Tailwind em `client/package.json`), diz "pgvector/Qdrant" (o codigo usa LanceDB), diz "Atribuicao de leads Click-to-WhatsApp" (nao ha nenhuma ocorrencia de `referral`/`ctwa` em `src/`, ver 5) e diz "automacoes de cobranca PIX" (classe C).

---

## 4. Requisitos reais de instalacao

| Item | Requisito | Evidencia |
|---|---|---|
| Sistema operacional | VPS Linux, Ubuntu 22.04+ ou Debian 12+ | `deploy/INSTALL.md:7` |
| CPU / RAM minimos | 2 vCPU / 4 GB ou mais | `deploy/INSTALL.md:7` |
| Rede | IP fixo (reservado pelo provedor); dominio (um subdominio por cliente) apontando para a VPS | `deploy/INSTALL.md:7,9` |
| Docker | Docker Engine e Docker Compose v2 | `deploy/INSTALL.md:8` |
| TLS | Proxy no host (Caddy, exemplo em `deploy/Caddyfile.example`) apontando para `127.0.0.1:HTTP_PORT` | `deploy/INSTALL.md:9,27`; `docker-compose.prod.yml:126` |
| Portas do firewall | 22, 80 e 443; nada de MariaDB, Redis ou backend | `deploy/INSTALL.md:14` |
| Servicos do compose | `mariadb` (11.4), `redis` (7-alpine, com senha), `backend` (Node 20), `frontend` (nginx) | `docker-compose.prod.yml` |
| Limite do backend | 2 CPUs e 1,5 GB de RAM | `docker-compose.prod.yml:113-115`; `deploy/INSTALL.md:80` |
| Limite de MariaDB/Redis | **Nao definido** no compose de producao | `docker-compose.prod.yml` (ausente) |
| Internet no build | `npm ci` e download do modelo de embedding (Hugging Face) | `docker/Dockerfile.prod` |
| Chave publica de licenca | `license/public.pem` de producao, obrigatoria | `deploy/INSTALL.md:10,19` |
| Variaveis obrigatorias | `DB_ROOT_PASSWORD`, `DB_PASSWORD`, `REDIS_PASSWORD`, `JWT_SECRET` (min. 32 caracteres), `MASTER_ENCRYPTION_KEY` (64 hex), `CLIENT_URL`, `SERVER_IP` | `deploy/client-env-template.env:5-7`; `deploy/INSTALL.md:22-24` |
| WhatsApp oficial | Conta Meta Business verificada; `META_APP_SECRET` e `META_WEBHOOK_VERIFY_TOKEN` | `deploy/INSTALL.md:11`; `client-env-template.env` secao WhatsApp |
| IA | Chave de API do provedor, cadastrada no painel | `deploy/INSTALL.md:12` |
| Primeiro acesso | Criar admin por script; senha mostrada uma vez; troca obrigatoria no 1o login | `deploy/INSTALL.md:26` |
| Atualizacao | `git pull` + `docker compose ... up -d --build`; migracoes aplicam no boot | `deploy/INSTALL.md:30` |

Pendencias de requisito: RAM/CPU "por conteiner com N clientes", p50/p95 de resposta e chunks por segundo **nao foram medidos** (`deploy/INSTALL.md:82-86`). A pagina nao pode prometer capacidade nem tempo de resposta.

---

## 5. Integracoes que existem no codigo

| Integracao | O que existe | Evidencia | Classe | Redacao permitida na pagina |
|---|---|---|---|---|
| WhatsApp Cloud API (Meta, oficial) | Webhook com verificacao e assinatura HMAC-SHA256, envio de texto, midia e template | `src/routes/whatsapp.routes.js:55,59,64`; `src/middleware/metaSignature.middleware.js`; testes: `metaSignature.middleware.test.js` e `.property.test.js`, `officialAdapter.test.js`, `tests/property/whatsappGatewaySendTemplate.property.test.js`, `metaPayloadParsing.property.test.js` | A | "Conexao pela API oficial do WhatsApp (Meta Cloud API). Exige conta Meta Business verificada." Nao ha teste contra a API real da Meta. |
| Baileys (nao oficial, QR Code) | Adapter, normalizador, conexao por QR, sessao em arquivo | `src/adapters/whatsapp/baileysAdapter.js`; `deploy/INSTALL.md:33-60`; testes: `baileysAdapter.test.js` | **C** | Nao mencionar na pagina. `INSTALL.md` documenta risco de bloqueio do numero e quebra por mudanca de protocolo. |
| Webhook de leads de anuncios | `POST /api/webhooks/ads` com token, responde 200 de imediato, cria contato, negocio e registro de atribuicao; aceita `campaign_name`, `ad_id`, `form_id`, `source`; origem padrao `facebook_lead_ads`; idempotente | `src/routes/webhookIngest.routes.js:33`; `src/controllers/webhookIngestController.js:48,91-92,136-139`; `src/migrations/MIGRATIONS_REGISTRY.md:38,50` (016, 028); testes: `webhookIngestController.property.test.js`, `src/__integration__/webhookFlow.integration.test.js`, `webhookTokenService.test.js` | A | "Receba leads de formularios e anuncios por webhook com token." Nao e conector nativo da Meta Ads, nao ha OAuth nem Marketing API. **Nao dizer Click-to-WhatsApp**: nao ha leitura de `referral` no codigo. |
| Asaas (PIX) | Provider com ambiente sandbox/producao, webhook | `src/services/payment/providers/asaasProvider.js:18,23`; `tasks.md:191` (sem teste em sandbox real) | **C** | Nao mencionar. |
| Mercado Pago (PIX) | Provider com `POST /v1/payments`, consulta de status | `src/services/payment/providers/mercadoPagoProvider.js:11`; **sem arquivo de teste** | **C** | Nao mencionar. |
| OpenAI, Gemini, Claude (Anthropic), Groq | Cadastro por chave, chamada por funcao, fallback, custo | `src/validators/aiProvider.validator.js:24`; `src/services/providerRegistryService.js`; `src/adapters/cloudProviderAdapter.js`; testes: `adapters.test.js`, `llmOrchestratorService.test.js` | A (cadastro e orquestracao). Chamada a cada API real nao tem teste de integracao | "Use a sua chave de OpenAI, Gemini, Claude ou Groq." Nomes em texto, sem logos de terceiros (marcas registradas; nao ha licenca de uso de logo). |
| Hub local (Ollama) | `hub-local` no validador; `core-hub-ia/` no repositorio | `docker-compose.local.yml` (servico `core-hub-ia`); ausente de `docker-compose.prod.yml:5` | Fora da entrega | Nao mencionar. |
| Google Calendar / Cal.com | Comentario em arquivo vazio; colunas `external_provider` e `external_id` reservadas | `src/services/calendarService.js`; `MIGRATIONS_REGISTRY.md:52` | **C** | Nao mencionar. |
| Qdrant | Servico no compose local sob profile, "reservado para uso futuro" | `docker-compose.local.yml` | Fora | Nao mencionar. |

Marquee de integracoes reais (so classe A): WhatsApp Cloud API, webhook de leads, OpenAI, Gemini, Claude, Groq. Em texto, sem logos.

---

## 6. Lacunas e riscos de promessa

### 6.1 Decisoes suas antes de anunciar

1. **Definir o que significa "receber o codigo"**: repositorio legivel, pacote protegido (bytecode/ofuscado) ou so imagens Docker. Hoje `INSTALL.md` diz "clonar o repositorio" e o EULA proibe redistribuicao. Sem isso a pagina nao pode usar a expressao.
2. **Texto contratual**: `LICENSE-EULA.md` e `LICENSE-TERMS.md` tem 4 a 5 linhas e remetem a um "contrato de licenca" que nao esta no repositorio. Os termos da landing (rascunho) dependem dele: escopo por instancia/CNPJ, direito a atualizacoes, suporte ("conforme plano contratado"), o que acontece ao trocar de IP.
3. **Precos, garantia e prazo de arrependimento**: placeholders em `site.js`. Nenhuma base no codigo.
4. **Nome do produto**: tres nomes convivem. Interface: "ConversIA" com tag "CRM . WHATSAPP . IA" (`client/src/components/Sidebar/Sidebar.jsx`, bloco "Brand"); README e `package.json`: "CRM WhatsApp AI-First"; pasta e compose: "CRM Flow IA". A aba do navegador mostra "CRM WhatsApp AI" (`client/index.html`). Uso provisorio `ConversIA`, configuravel em `site.js`.
5. **Liberar ou manter em C**: Base de Conhecimento e RAG. Sem a KB, a secao "IA (RAG)" da estrutura pedida nao pode existir; a IA entra apenas como agente conversacional com transferencia, extracao de lead e transcricao de audio. O agente responde sem contexto RAG quando nao encontra nada (`ragContextService.js:77-86`), entao funciona sem KB.
6. **Sinais de que a KB estava quebrada ate recentemente**: o ultimo commit (`5423138`) e "iniciar os 4 workers da KB no boot"; antes disso os workers nao subiam. `docs/KB-OPERATIONAL-GUIDE.md` tem pendencia desatualizada (diz que a rota de reconciliacao nao existe; ela esta em `app.js:168`). Mantenho em C.

### 6.2 Riscos de promessa a evitar

| Risco | Por que | Redacao segura |
|---|---|---|
| "Atendimento 24h", "responde tudo sozinho" | A IA transfere para humano por pedido, 3 falhas consecutivas (padrao) ou valor do negocio (`transferTriggerService.js:8-9`); qualidade depende do modelo escolhido | "Responde e passa para uma pessoa quando necessario" |
| "Dados nunca saem do servidor" | Texto vai ao provedor de LLM e a Meta | "Banco e arquivos na sua VPS" |
| "Sem mensalidade" / "pague uma vez" | Cliente paga VPS, API de IA, conta Meta (conversas cobradas pela Meta) e Docker; nao e custo zero | Nao afirmar. Se dizer "sem mensalidade do CRM", e decisao comercial sua. |
| Desempenho, capacidade, "rapido" | Sem medicao de producao (`INSTALL.md:82-86`) | Nenhum numero |
| Seguranca/conformidade | Existe `documents/AUDITORIA-APPSEC-2026-10-25.md` (interno, nao li o conteudo e esta como arquivo alterado no git do CRM). Nao ha certificacao | Descrever apenas controles verificaveis: AES-256-GCM, assinatura HMAC no webhook da Meta, conteiner read-only. Sem "LGPD compliant". |
| "Atribuicao de anuncios Meta Ads / Click-to-WhatsApp" | Codigo so recebe webhook generico | Ver secao 5 |
| "Cobranca por PIX" | C | Nao citar |
| "Qualquer servidor" | Exige IP fixo, Linux e Docker | Mostrar requisitos |
| Uso de logos de OpenAI/Meta/Google | Marcas de terceiros | Nomes em texto |

### 6.3 Pendencias no CRM que a landing nao deve esconder nem corrigir

- Badge "12" fixo em Conversas e `href="#"` no Dashboard (secao 2).
- Itens de spec abertos em 12 specs (contexto, nao evidencia).
- `license/private.pem` existe na pasta de desenvolvimento do CRM. Esta fora do git (`git check-ignore`: regra `*.pem`) e `scripts/build-release.js` tem lista de arquivos proibidos no pacote, mas a chave privada nao deveria ficar na mesma arvore de trabalho que o repositorio entregue. Observacao de seguranca, nao de marketing.
- O working tree do CRM ja tinha **129 entradas modificadas/nao rastreadas antes da minha varredura** (baseline em `_baseline/`). A verificacao final da Fase D compara com esse baseline, nao com um arbol limpo.

---

## 7. Design tokens do app

Fonte: `client/src/styles/_variables.scss` (tokens e `:root`/`[data-theme="light"]`), `client/src/styles/global.scss`, `client/index.html`.

### 7.1 Cores

| Token | Escuro (padrao) | Claro (`[data-theme="light"]`) |
|---|---|---|
| `--bg` | `#0A0E13` | `#FAFBFC` |
| `--bg-elevated` | `#0F141B` | `#FFFFFF` |
| `--surface` | `#141B23` | `#F3F5F8` |
| `--surface-hover` | `#1A232D` | `#EBF0F6` |
| `--surface-muted` | `#0F141B` | `#EBF0F6` |
| `--border` | `#212B36` | `#D9DFE8` |
| `--border-strong` | `#2C3846` | `#C3CBD8` |
| `--text-primary` | `#EEF2F6` | `#1A202C` |
| `--text-secondary` | `#93A1B0` | `#5A6B7A` |
| `--text-tertiary` | `#5C6B7A` | `#8B95A5` |
| `--text-on-accent` | `#F0EFFF` | `#FFFFFF` |
| `--accent-ai` | `#7C6FFF` | `#6857D6` |
| `--accent-ai-soft` | `rgba(124,111,255,0.14)` | `rgba(104,87,214,0.12)` |
| `--accent-live` | `#2DD4A7` | `#00A366` |
| `--accent-live-soft` | `rgba(45,212,167,0.14)` | `rgba(0,163,102,0.12)` |
| `--accent-warning` | `#F5A623` | `#E89B2F` |
| `--accent-danger` | `#FF5C7A` | `#E85A75` |
| `--brand-gradient` | `linear-gradient(135deg,#7C6FFF,#5A4FCC)` | `linear-gradient(135deg,#6857D6,#4A3FA8)` |
| `--brand-gradient-live` | `linear-gradient(135deg,#2DD4A7,#0F9B67)` | `linear-gradient(135deg,#00A366,#008050)` |
| `--glow-ai` | `rgba(124,111,255,0.2)` | `rgba(104,87,214,0.15)` |
| `--border-ai` | `#7C6FFF` | `#6857D6` |
| `--scrim` / `--scrim-drawer` | `rgba(0,0,0,0.5)` / `0.6` | `rgba(0,0,0,0.4)` / `0.5` |

Contraste calculado por mim (WCAG, razao de luminancia) sobre `--bg` de cada tema:

| Par | Razao | AA texto normal (4.5) |
|---|---|---|
| Escuro: primary | 17.20 | passa |
| Escuro: secondary | 7.34 | passa |
| Escuro: **tertiary** | **3.54** | **falha** |
| Escuro: accent-ai | 5.14 | passa |
| Escuro: accent-live | 10.22 | passa |
| Escuro: `text-on-accent` sobre `#7C6FFF` | 3.32 | falha (passa sobre `#5A4FCC`: 5.40) |
| Claro: primary | 15.75 | passa |
| Claro: secondary | 5.31 | passa |
| Claro: **tertiary** | **2.92** | **falha** |
| Claro: accent-ai | 5.17 | passa |
| Claro: **accent-live** | **3.15** | **falha como texto** |
| Claro: branco sobre `#6857D6` | 5.35 | passa |

Consequencia para a Fase C: `--text-tertiary` nao serve para texto legivel em nenhum tema; `--accent-live` no tema claro so como elemento grafico, nao como texto; botao primario com texto claro precisa usar o fim do gradiente (`#5A4FCC` / `#4A3FA8`) ou texto escuro. Esses ajustes sao desvios minimos dos tokens do app, necessarios para AA; listarei cada um no relatorio.

### 7.2 Tipografia

- Display: `Space Grotesk`, pesos 500, 600, 700. Corpo: `Inter`, 400, 500, 600, 700. Mono: `JetBrains Mono`, 400, 500 (`_variables.scss` fontes; `global.scss` import).
- O app carrega as fontes do Google Fonts por `@import url(...)` (`global.scss`). **A landing nao fara isso** (requisito de nenhum rastreador de terceiros e fontes self-hosted). Space Grotesk, Inter e JetBrains Mono sao distribuidas sob SIL OFL 1.1; baixarei os arquivos de fontes de projetos oficiais e citarei a licenca no README.
- Escala: 12, 13, 14 (base), 16, 20, 24, 32 px. Escala do app e para interface densa; a landing precisa de tamanhos maiores para titulos (extensao da escala, a definir na Fase C).
- Pesos: 400, 500, 600, 700. Corpo: `line-height: 1.5`, `-webkit-font-smoothing: antialiased`.

### 7.3 Raios, sombras, espacamento, movimento

| Grupo | Valores |
|---|---|
| Raios | `--radius-sm` 8px, `--radius-md` 12px, `--radius-lg` 16px; icone da marca 9px |
| Sombras (claro / escuro) | sm: `0 1px 3px`, md: `0 4px 12px`, lg: `0 8px 24px`; cor escura `rgba(0,0,0,.3/.4/.5)`, clara `rgba(0,0,0,.08/.12/.16)` |
| Espacamento (base 4px) | 4, 8, 12, 16, 20, 24, 32, 40, 48 |
| Breakpoints do app | 720, 860, 1100 px |
| Transicoes | 150ms, 250ms, 350ms, todas `ease` |
| Foco | `outline: 2px solid var(--accent-ai)`, `outline-offset: 2px`, `border-radius: 4px` |
| Reduced motion | `animation-duration: 0.01ms`, `transition-duration: 0.01ms` (`global.scss`) |
| Esquema | `html { color-scheme: dark }`; tema aplicado por `data-theme` antes do primeiro paint, chave `localStorage` `crmflow.theme`, valores `dark`/`light`/`system` (`client/index.html`) |

### 7.4 Logo e icone

- **Nao existe arquivo de logo, favicon, SVG de marca nem pasta `public/` no cliente** (busca por `*.svg|*.ico|*.png|*.woff*` em `client/` fora de `node_modules` e `dist` nao retornou nada). O `index.html` nao tem `<link rel="icon">`.
- A marca existente e: um quadrado 32x32, raio 9px, preenchido com `--brand-gradient`, com a letra "C" em Space Grotesk, borda/brilho `0 0 0 1px rgba(124,111,255,.25), 0 4px 14px var(--glow-ai)`; ao lado, o texto "ConversIA" e a linha "CRM . WHATSAPP . IA" (`client/src/components/Sidebar/Sidebar.module.scss`, bloco `.brand`; `Sidebar.jsx`, bloco "Brand").
- Icones: 22 icones SVG em linha como componentes JSX proprios do projeto (`client/src/icons/`). Sao codigo do proprio CRM e podem ser reutilizados; incluem `IconWhatsApp`. Sobre `IconWhatsApp`: o desenho do logotipo do WhatsApp e marca da Meta; vou usar apenas o texto "WhatsApp", nao esse icone.
- Para favicon e imagem Open Graph vou **derivar** o monograma "C" do quadrado de marca (criacao minha, baseada no que o app renderiza). Precisa da sua aprovacao, ja que o produto nao tem logo oficial.

---

## 8. O que decidir para eu iniciar a Fase B

1. Nome do produto na landing: `ConversIA` (provisorio).
2. Aprovar o monograma "C" como favicon e imagem social.
3. Confirmar a lista de funcionalidades da pagina:
   - Entram (A): itens 1 a 17, 24, 27 a 30, mais WhatsApp Cloud API, webhook de leads e provedores BYOK.
   - Entram com revisao do dono (B): calendario nativo (21), catalogo de produtos CRUD (20), bloqueio por teto de custo de IA (18).
   - Fora (C): 12b, 20 (sincronizacao), 22, 23, 25, 26, Baileys.
   - Embeddings locais (19) e a secao RAG: so se liberar a KB.
4. Decidir "receber o codigo" (secao 6.1, item 1).
5. Dizer se posso rodar as suites de teste em uma copia fora do CRM para promover itens de "arquivo de teste existe" para "teste passou".
6. Fase B: subir o CRM com dados ficticios exige o stack local (MariaDB, Redis, backend, frontend), uma licenca de teste valida e criar um admin de demonstracao. O compose local carrega `.env` do CRM (`${DB_PASSWORD:?...}`), que eu nao posso ler nem alterar. Proponho subir uma **copia** do CRM em `C:\dev\crm-flow-landing\_demo\` com `.env` proprio, descartavel, gerado por mim com segredos aleatorios (sem tocar o original). A licenca de teste depende de `tests/fixtures/*.pem` e de `SERVER_IP`; se nao funcionar sem a chave privada de teste, listarei as capturas para voce fazer manualmente. Preciso do seu aval para essa abordagem.

Parei aqui, como pedido. A Fase B so comeca depois da sua aprovacao deste documento.

---

## 9. Reclassificacao apos execucao dos testes (Fase B, passo 1)

Substitui a coluna "Classe" da secao 2 e a nota 1 da secao 0. Criterio do dono: **A = existe teste E passou na copia**. Nenhum teste de navegador ponta a ponta existe no CRM; por isso, neste eixo, **nada passa de B para "ponta a ponta"**, e nenhuma tela foi validada por teste de navegador.

### 9.1 Ambiente e resultados reais

Copia descartavel em `_demo/` (HEAD `5423138` mais o working tree sujo do CRM), sem `.env*`, `uploads/`, `data/` da raiz, sessoes Baileys, `.pem` e `.git`. Projeto Docker `-p crmdemo`, banco `crm_demo` (testes: `crm_demo_test_w*`), portas `13306`, `16379`, `13000`. Par RSA novo gerado em `_demo/license/` por `scripts/generate-dev-license-keys.js`; licenca de teste por `scripts/generate-test-license.js`. Node v24.13.0 local (a imagem de producao usa Node 20).

| Comando | Suites | Testes | Passaram | Falharam | Referencia de 25/10 |
|---|---|---|---|---|---|
| `npm test` | 169 (168 ok, 1 falha) | 2123 | **2112** | **11** | 1964 |
| `npm run test:integration` (`--runInBand`, bancos limpos) | 7 (5 ok, 2 falhas) | 81 | **79** | **2** | 81 |
| `npx vitest run` (client) | 29 (29 ok) | 194 | **194** | **0** | 186 |

Logs literais em `_baseline/npm-test.log`, `_baseline/npm-integration.log`, `_baseline/vitest.log` (nao versionados). O Vitest saiu com codigo 0 nesta execucao; as linhas `Error: useAuth deve ser usado dentro de um AuthProvider` etc. sao saida de stderr de testes que exercitam o caso de erro, nao falhas.

Ajustes de execucao (nao alteram codigo): `TEST_DB_NAME=crm_demo_test` precisa estar no ambiente do shell, porque `tests/setup/globalSetup.js` le `process.env.TEST_DB_NAME` antes de carregar o `.env` e, sem isso, cria `crm_whatsapp_test_w*` enquanto os workers usam `crm_demo_test_w*` (primeira execucao: 34 falhas por "Unknown database"). `--maxWorkers=4` no `npm test`. Dependencias do `client/` instaladas na copia (um teste do backend importa `client/node_modules/socket.io-client`).

Primeira execucao da integracao em paralelo, com bancos que ja tinham dados de execucoes anteriores: 17 falhas, que desapareceram ao recriar os bancos e rodar em serie. Nao provei se a execucao em paralelo e insegura; so registro que o resultado limpo e o serial.

### 9.2 Falhas reais (todas reproduzidas na copia; o original nao foi tocado)

| # | Teste | Sintoma | Causa observada |
|---|---|---|---|
| F1 | `tests/integration/licenseActivation.test.js` (11 testes, a suite nem carrega) | `Route.post() requires a callback function but got a [object Undefined]` em `src/routes/whatsapp.routes.js:64` | O `jest.doMock('../../src/middleware/rateLimiter')` do teste (linha 177 em diante) nao inclui `sendMessageUserLimiter`, que a rota passou a usar. O modulo real exporta o limitador (`rateLimiter.js:201`). Teste desatualizado em relacao ao codigo ainda nao commitado. |
| F2 | `src/__integration__/mediaSecurity.integration.test.js` > "upload valido + mediaId: envia ao gateway" | esperado 200, recebido 404 | A rota de envio agora exige conversa atribuida ao agente (`whatsapp.routes.js:62-63`); o teste nao cria essa conversa. Os outros 20 testes da suite passam. |
| F3 | `tests/integration/aiRagEngine.integration.test.js` > "RAG pipeline: generate embedding + search LanceDB" | `Vector store indisponivel: db.tableNames is not a function` | Mock do LanceDB do teste sem `tableNames`. Os outros 5 testes da suite passam. |

### 9.3 Classe final por funcionalidade

Numeracao da secao 2.

| # | Funcionalidade | Classe final | Base |
|---|---|---|---|
| 1 | Caixa de entrada multiatendente | **A** | `inboxController.test`, `inboxEvents.test`, `conversationAccessService.test`: passaram |
| 2a | Envio de texto pelo atendente | **A** | `whatsappController.test` passou |
| 2b | Envio de imagem e documento | **B** | `mediaSecurity.integration`: 20 de 21 passam; F2 falha no envio com `mediaId` valido |
| 3 | Agente de IA com transferencia para humano | **A** | `conversationStateMachine` (unit e property), `transferTriggerService` (unit e property): passaram |
| 4 | Transcricao de audio | **A** | `mediaTranscriptionJob.test`, `audioTranscriptionService.test`: passaram |
| 5 | Extracao de lead por IA | **A** | `leadExtractionService.test`, `leadExtractionJob.test`: passaram |
| 6 | Lead vira negocio | **A** | `leadToDealService.test` e `.idempotency`: passaram |
| 7 | Pipeline kanban | **A** | `dealService.test`, `pipelineStageService.test`, `kanbanEvents.test`: passaram. Arrastar e soltar nao tem teste de navegador |
| 8 | Etapas configuraveis | **A** | `pipelineStageService.invariants` passou |
| 9 | Historico de movimentacao | **A** | `dealService.stage-history`, `backfill-deal-stage-history`: passaram |
| 10 | Exclusao logica | **A** | `softDelete.integration` passou |
| 11 | Contatos | **A** | `contactService.test`, `contactController.test`: passaram |
| 12 | Automacoes (3 acoes) | **A** | `pipelineAutomationService.test` passou |
| 12b | Automacao "Gerar link PIX" | **C** | dono: PIX fora |
| 13 | Dashboard | **A** | `dashboardService.test`, `dashboardController.test`, `Dashboard.test` (client): passaram |
| 14 | Relatorios | **A** | `analyticsController.property`, `Reports.test` (client): passaram |
| 15 | Exportacao CSV/XLSX | **A** | `exportController.test`, `exportController.integration`: passaram |
| 16 | BYOK | **A** | `providerRegistryService.property`, `aiProvider.validator`, `encryption.test`: passaram |
| 17 | Funcoes de IA e fallback | **A** | `fallbackExecutor.test`, `llmOrchestratorService.test`: passaram |
| 18a | Registro de uso e custo | **A** | `usagePricing.property` passou |
| 18b | Bloqueio por teto de custo | **B** | `budgetGuardService` nao tem arquivo de teste |
| 19 | Embeddings locais | **B, condicionada a KB** | Na copia o modelo carregou e gerou vetores de 384 dimensoes (ver 9.4); `embeddingService.test` e `embeddingRunner.test` passaram. Sem medicao de producao; so serve a KB |
| 20 | Catalogo de produtos (CRUD) | **B** | so `productController.pagination` testado (passou). Sincronizacao com KB: **C** |
| 21 | Calendario nativo | **fora** (decisao do dono); tecnicamente B, sem teste |
| 22 | Base de Conhecimento e RAG | **C** | ver 9.4 |
| 23 | Reconciliacao da KB | **C** | ver 9.4 (nao detecta o defeito) |
| 24 | Licenca offline | **A** | `licenseVerify` (unit e property), `licenseValidationService`, `licenseController`: passaram. Ativacao real na copia: `POST /api/license/activate` retornou `success: true` e `/api/license/status` retornou `{"isActive":true}`. A suite de integracao F1 esta quebrada (nao e a verificacao) |
| 25, 26 | PIX, Google Calendar | **C** | dono: fora |
| 27 | Usuarios e agentes | **A** | `userService.test`, `changePassword.test`, `authController.test`: passaram |
| 28 | Tema | **A** | `ThemeContext.test` (client) passou |
| 29 | Configuracoes gerais | **A** | `settingsService.test`, `settingsController.test`: passaram |
| 30 | Midia protegida (URL assinada) | **A** | `mediaStorage.test`, `mediaLinkService.test` e os testes de URL assinada da `mediaSecurity.integration`: passaram |
| - | WhatsApp Cloud API oficial | **A** | `officialAdapter.test`, `metaSignature.middleware` (unit e property), `whatsappGatewaySendTemplate`, `metaPayloadParsing`: passaram. Nenhum teste contra a Meta real |
| - | Webhook de leads | **A** | `webhookFlow.integration`, `webhookIngestController.property`, `webhookTokenService.test`: passaram |
| - | Provedores OpenAI, Gemini, Claude, Groq | **A** (cadastro e orquestracao) | `adapters.test` passou. Nenhuma chamada real feita (sem chave) |
| - | Baileys, Asaas, Mercado Pago | **C** | dono |

### 9.4 Prova da Base de Conhecimento (criterio do dono)

Resultado: **a KB continua em C.** O hub de embeddings rodou (embeddings embutidos), mas o criterio final falha.

Cadeia executada na copia, em `localhost:13000`, com licenca de teste ativa e dados ficticios:

1. Upload: `POST /api/knowledge-base/documents/text` com o titulo "Politica de trocas demo" devolveu `{"success":true,"data":{"id":1,...,"status":"processing","version":1,"is_active":true}}`.
2. Status: `GET /api/knowledge-base/documents/1` devolveu `status=indexed chunks=1 active=1 err=`.
3. MySQL: `kb_documents` com `status=indexed, total_chunks=1`; `kb_chunks` com 1 linha, `is_active=1`.
4. LanceDB: tabela `knowledge_base` com 1 linha, vetor de 384 dimensoes, **`is_active=false`**.
5. Consulta: `ragRetrievalService.search('em quantos dias posso trocar um produto?', 3, {is_active:true})` devolveu **`totalFound = 0`**. A segunda consulta tambem nao retornou trecho.
6. A reconciliacao (`reconcile(false)`) devolveu `divergencesFound: 0`, `divergencesFixed: 0` e a consulta continuou em `totalFound = 0`: ela nao detecta nem corrige o estado.

Causa (leitura do codigo, confirmada por experimento): na primeira versao de um documento, o upload ja grava `kb_documents.is_active = true` (`knowledgeBaseService.js:112`). Ao fim da indexacao o worker chama `promoteVersion`, que le como "versao anterior ativa" o proprio documento (`previousActiveId == documentId`) e entao marca como inativos, no LanceDB, os vetores dos chunks desse mesmo documento (`knowledgeBaseService.js`, bloco "Desativar vetores da versao anterior"). Resultado: o documento aparece como indexado e ativo na interface, e a busca nao encontra nada.

Experimento, **somente na copia**: troquei a condicao para `previousActiveId && previousActiveId !== documentId && vectorStore.isAvailable()`, reiniciei o backend e enviei o documento "Guia de entrega demo". Saida literal: `LANCE: [{"chunk_id":1,"document_id":1,"is_active":false,"dim":384},{"chunk_id":2,"document_id":2,"is_active":true,"dim":384}]` e `CONSULTA entrega: totalFound = 1` com score `0.830` e o trecho "Guia de entrega ficticio Demo Esportes. O prazo de entrega para capitais e de 3 a 5 dias uteis...". Isso confirma a causa. A correcao e do dono; o CRM original nao foi alterado. Os testes unitarios e de integracao da KB passam e nao cobrem esse caminho (primeiro upload ate a busca).

Consequencia para a landing: nenhuma copy sobre base de conhecimento, RAG nem "a IA responde com seus documentos".

### 9.5 Itens B que dependem da sua revisao

| Item | Redacao conservadora permitida |
|---|---|
| Envio de imagem e documento (2b) | "Envie imagens e documentos pelo atendimento." sem detalhes de seguranca de midia |
| Bloqueio por teto de custo de IA (18b) | "Acompanhe tokens e custo de IA por funcao e por dia." Nao prometer bloqueio automatico por teto |
| Catalogo de produtos (20) | "Cadastro de produtos e servicos." Sem mencionar sincronizacao com a IA |
| Embeddings locais (19) | Nao usar enquanto a KB estiver em C |

### 9.6 Defeitos do CRM registrados para o relatorio final

1. Badge fixo "12" em "Conversas" (`client/src/data/navConfig.js:10`).
2. `href="#"` em "Ver pipeline" no Dashboard (`client/src/pages/Dashboard.jsx:74`).
3. Primeira versao de documento da KB fica invisivel para a busca (9.4).
4. Reconciliacao da KB nao detecta o estado do item 3.
5. `licenseActivation.test.js` desatualizado (F1), `mediaSecurity` (F2) e `aiRagEngine.integration` (F3).
6. `globalSetup.js` le `TEST_DB_NAME` antes do `dotenv` (9.1).
7. `docs/KB-OPERATIONAL-GUIDE.md` diz que a rota de reconciliacao nao existe; ela esta em `app.js:168`.
8. README do CRM desatualizado (secao 3.5).
