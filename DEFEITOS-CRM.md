# Defeitos encontrados no CRM (apenas registro)

Estes itens foram observados durante a varredura e os testes na copia `_demo/`. Nenhum foi corrigido: o CRM original e somente leitura e o objetivo deste projeto e a landing page. Detalhes e saidas literais estao em `CONTEUDO.md`, secao 9.

Caminhos relativos a raiz do CRM. Referencia: HEAD `5423138` mais o working tree que ja estava modificado.

## Produto

| # | Defeito | Evidencia | Efeito na landing |
|---|---|---|---|
| 1 | Badge fixo "12" em "Conversas" na barra lateral | `client/src/data/navConfig.js:10` | Telas com a barra lateral nao mostram esse badge nas capturas (recorte ou mascara) |
| 2 | Link `href="#"` em "Ver pipeline" no Dashboard | `client/src/pages/Dashboard.jsx:74` | Dashboard nao e capturado |
| 3 | Primeiro documento da Base de Conhecimento fica indexado e ativo no MySQL, mas com vetor `is_active=false` no LanceDB. A busca devolve `totalFound = 0` | `src/services/knowledgeBaseService.js`, funcao `promoteVersion` (`previousActiveId` e o proprio documento). Experimento na copia com `previousActiveId !== documentId` fez a busca retornar o trecho (score 0,830) | KB/RAG fora da landing |
| 4 | A reconciliacao da KB nao detecta o estado do item 3 (`divergencesFound: 0`) | `src/services/knowledgeBaseReconciliationService.js` | KB fora da landing |

## Testes e documentacao

| # | Defeito | Evidencia |
|---|---|---|
| 5 | `tests/integration/licenseActivation.test.js` (11 testes) nao carrega: o mock de `rateLimiter` nao tem `sendMessageUserLimiter` | `src/routes/whatsapp.routes.js:64`; `rateLimiter.js:201` exporta o limitador |
| 6 | `src/__integration__/mediaSecurity.integration.test.js` > "upload valido + mediaId" recebe 404 em vez de 200 (a rota agora exige conversa atribuida ao agente) | `src/routes/whatsapp.routes.js:62-64` |
| 7 | `tests/integration/aiRagEngine.integration.test.js` > "RAG pipeline" falha com `db.tableNames is not a function` (mock do LanceDB incompleto) | saida em `_baseline/npm-integration.log` |
| 8 | `tests/setup/globalSetup.js` le `TEST_DB_NAME` antes de carregar o `.env`; sem a variavel no shell, cria `crm_whatsapp_test_w*` e os workers procuram `crm_demo_test_w*` | `tests/setup/globalSetup.js` |
| 9 | `docs/KB-OPERATIONAL-GUIDE.md` diz que a rota de reconciliacao nao existe; ela esta montada em `app.js:168` | `app.js:168` |
| 10 | README do CRM cita Tailwind, pgvector/Qdrant, Click-to-WhatsApp e cobranca PIX como funcionalidade; o codigo usa SCSS Modules, LanceDB, nao le `referral` e o PIX nao foi testado em sandbox | `README.md`, `client/package.json`, `src/` |

## Seguranca (observacao, nao de marketing)

| # | Observacao |
|---|---|
| 11 | `license/private.pem` existe na pasta de desenvolvimento do CRM. Esta fora do git e o `build-release.js` bloqueia o arquivo no pacote, mas a chave privada de producao nao deveria ficar na mesma arvore que o codigo entregue. |

| 12 | Cabecalho das colunas do kanban mostra `R$ NaN`: o total soma `d.value` (string `\"750.00\"` vinda do DECIMAL do MariaDB) com `0 +` e concatena em vez de somar. Os cartoes formatam o valor corretamente | `client/src/components/kanban/PipelineColumn.jsx:15` (resposta de `GET /api/pipeline/stages` traz `total_value` correto) | Total da coluna e mascarado nas capturas |
| 13 | A lista de conversas mostra sempre `Sem mensagens`: o frontend le `conv.last_message` e nenhuma consulta do backend devolve esse campo | `client/src/components/inbox/ConversationList.jsx:83` (busca por `last_message` em `src/` sem resultado) | Texto mascarado nas capturas |
