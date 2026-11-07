# Rastreabilidade: afirmacoes da pagina x CONTEUDO.md

Gerado por `node scripts/trace.mjs` a partir de `src/content/pt-BR.js`. Cada linha tem os ids de evidencia (`ev`) da afirmacao.

| # | Onde | Afirmacao (trecho) | Evidencia | Classe |
|---|---|---|---|---|
| 1 | `hero` | CRM de WhatsApp com IA para a sua equipe de vendas. Caixa de entrada para a equipe, funil de vendas em kanban, automações por etapa e relatórios. E... | S1, S3.1, F1, F7, F12, F14 | n/a, A |
| 2 | `problem` | Conversa, negócio e follow-up no mesmo lugar. | FRAME | n/a |
| 3 | `problem.items[0]` | Atendimento com a equipe toda Fila de conversas, quem assumiu e quem está livre, com atualização em tempo real. | F1 | A |
| 4 | `problem.items[1]` | Funil que acompanha a conversa O lead vira negócio e anda pelas etapas do seu processo de vendas. | F6, F7 | A |
| 5 | `problem.items[2]` | Follow-up que não depende de memória Avisos, lembretes e mensagens modelo disparados pela etapa do negócio. | F12 | A |
| 6 | `bento` | Tudo o que a operação de vendas no WhatsApp precisa em uma tela só. | F1, F3, F5, F6, F7, F12, F14, F4, F27, F28 | A |
| 7 | `bento.cards[0]` | Caixa de entrada multiatendente Fila e “minhas” conversas, assumir e liberar, com mensagens chegando em tempo real. | F1 | A |
| 8 | `bento.cards[1]` | Pipeline em kanban Arraste os negócios entre as etapas e acompanhe o valor de cada cartão. | F7 | A |
| 9 | `bento.cards[2]` | Agente de IA que passa para uma pessoa Responde e transfere ao atendente quando o cliente pede, quando a IA falha em sequência ou por regra de valor. | F3 | A |
| 10 | `bento.cards[3]` | Automações por etapa Ao entrar na etapa ou após dias parado: enviar template, notificar o atendente ou agendar lembrete. | F12 | A |
| 11 | `bento.cards[4]` | Relatórios com exportação Funil, atendimento e custo de IA, com exportação em CSV e planilha. | F14, F15 | A |
| 12 | `bento.cards[5]` | Do chat ao negócio A IA extrai nome, telefone, e-mail, orçamento e interesse, e cria ou atualiza o negócio com um limiar de confiança. | F5, F6 | A |
| 13 | `bento.cards[6]` | Transcrição de áudio Áudios recebidos viram texto pelo provedor que você configurar. | F4 | A |
| 14 | `bento.cards[7]` | Perfis de admin e agente Cada pessoa vê o que o seu papel permite. | F27 | A |
| 15 | `bento.cards[8]` | Tema claro e escuro Alterna e lembra a sua escolha. | F28 | A |
| 16 | `ai` | IA com as suas chaves e com saída para um humano. Você cadastra a chave do provedor que preferir. O agente responde as conversas e entrega para a e... | F16, F17, F3, S3.2 | A |
| 17 | `ai.pillars[0]` | Suas chaves, seu provedor Cadastre OpenAI, Gemini, Claude ou Groq. A chave é guardada criptografada (AES-256-GCM) e aparece mascarada no painel. | F16, S3.2 | A |
| 18 | `ai.pillars[1]` | Função por função, com reserva Agente de conversa, extração de lead e transcrição de áudio têm provedor e modelo próprios, com cadeia de reserva se... | F17 | A |
| 19 | `ai.pillars[2]` | Transferência para uma pessoa O cliente pede um atendente, a IA falha em sequência ou o negócio passa de um valor definido: a conversa vai para a e... | F3 | A |
| 20 | `ai.pillars[3]` | Custo e tokens à vista Acompanhe tokens e custo estimado por provedor, por função e por dia. | F18a, F14 | A |
| 21 | `showcase[0]` | Um funil que você desenha e acompanha. Crie as etapas do seu processo, arraste os negócios e veja o histórico de cada movimentação. | F7, F8, F9 | A |
| 22 | `showcase[0].bullets[0]` | Etapas configuráveis: abertas, ganhas e perdidas. | F8 | A |
| 23 | `showcase[0].bullets[1]` | Arraste e solte entre etapas. | F7 | A |
| 24 | `showcase[0].bullets[2]` | Histórico de movimentação com data e autoria. | F9 | A |
| 25 | `showcase[1]` | Uma fila para a equipe, no mesmo painel. Veja a fila, assuma uma conversa, devolva quando terminar e responda sem sair da tela. | F1 | A |
| 26 | `showcase[1].bullets[0]` | Fila e “minhas” conversas, com assumir e liberar. | F1 | A |
| 27 | `showcase[1].bullets[1]` | Atualização em tempo real. | F1 | A |
| 28 | `showcase[2]` | Quando o negócio muda de etapa, o sistema age. Defina o gatilho e a ação para cada etapa do funil. | F12 | A |
| 29 | `showcase[2].bullets[0]` | Gatilhos: ao entrar na etapa ou após X dias parado. | F12 | A |
| 30 | `showcase[2].bullets[1]` | Ações: enviar template de WhatsApp, notificar o atendente, agendar lembrete. | F12 | A |
| 31 | `showcase[2].bullets[2]` | Liga e desliga cada automação. | F12 | A |
| 32 | `showcase[3]` | Funil, atendimento e custo de IA em números. Escolha o período e exporte quando precisar. | F14, F15 | A |
| 33 | `showcase[3].bullets[0]` | Conversão, valor fechado e em aberto, tempo parado por etapa. | F14 | A |
| 34 | `showcase[3].bullets[1]` | Conversas resolvidas pela IA, transferidas e tempo de primeira resposta. | F14 | A |
| 35 | `showcase[3].bullets[2]` | Exportação em CSV e planilha. | F15 | A |
| 36 | `how` | Da contratação ao primeiro atendimento. | S4 | A |
| 37 | `how.steps[0]` | Escolher o plano Compare os planos hospedados e os planos no seu servidor e fale com a gente. | FRAME | n/a |
| 38 | `how.steps[1]` | Implantação Colocamos o ConversIA da sua empresa no ar, no nosso servidor ou no seu, conforme o plano, com a taxa única de implantação. | FRAME | n/a |
| 39 | `how.steps[2]` | Acessar Sua equipe entra pelo navegador, com perfis de admin e de agente. | F27 | A |
| 40 | `how.steps[3]` | Conectar Cadastre o WhatsApp oficial e a chave do provedor de IA em Integrações e Chaves de IA. | S4, S5 | A |
| 41 | `pricing` | Escolha onde o ConversIA vai rodar. No nosso servidor, com tudo pronto, ou no servidor da sua empresa. Em todos os planos a implantação é uma taxa ... | FRAME | n/a |
| 42 | `pricing.groups[0]` | Hospedado por nós Para quem quer o CRM pronto, sem cuidar de servidor. Cada empresa roda isolada, em contêineres Docker, na nossa VPS. A franquia d... | S3.1 | A |
| 43 | `pricing.groups[1]` | No seu servidor Para empresas que já têm servidor e querem o sistema rodando internamente, com as próprias chaves de API. | S3.1, S3.2 | A |
| 44 | `pricing.plans.hosted-byok` | Hospedagem completa, com a sua chave de IA. | FRAME | n/a |
| 45 | `pricing.plans.hosted-byok.features[0]` | CRM hospedado e mantido no nosso servidor. | FRAME | n/a |
| 46 | `pricing.plans.hosted-byok.features[1]` | Você cadastra o seu cartão no provedor de IA e gera a sua chave de API. O custo dos tokens é 100% seu. | F16 | A |
| 47 | `pricing.plans.hosted-basico` | Para negócios com fluxo leve de mensagens. | FRAME | n/a |
| 48 | `pricing.plans.hosted-basico.features[0]` | CRM hospedado e mantido no nosso servidor. | FRAME | n/a |
| 49 | `pricing.plans.hosted-basico.features[1]` | Franquia inicial de IA inclusa: cerca de 1.500 interações por mês. | FRAME | n/a |
| 50 | `pricing.plans.hosted-intermediario` | Para quem atende com mais volume e quer folga na franquia de IA. | FRAME | n/a |
| 51 | `pricing.plans.hosted-intermediario.features[0]` | CRM hospedado e mantido no nosso servidor. | FRAME | n/a |
| 52 | `pricing.plans.hosted-intermediario.features[1]` | Franquia de IA ampliada: cerca de 4.000 interações por mês. | FRAME | n/a |
| 53 | `pricing.plans.hosted-avancado` | Para operações com grande fluxo de mensagens. | FRAME | n/a |
| 54 | `pricing.plans.hosted-avancado.features[0]` | CRM hospedado e mantido no nosso servidor. | FRAME | n/a |
| 55 | `pricing.plans.hosted-avancado.features[1]` | A maior franquia de IA: cerca de 10.000 interações por mês. | FRAME | n/a |
| 56 | `pricing.plans.self-sem-suporte` | Implantação única no seu servidor, sem acompanhamento depois. | FRAME | n/a |
| 57 | `pricing.plans.self-sem-suporte.features[0]` | Implantação isolada no servidor da sua empresa. | S3.1 | A |
| 58 | `pricing.plans.self-sem-suporte.features[1]` | Você usa as suas próprias chaves de API de IA. | F16 | A |
| 59 | `pricing.plans.self-sem-suporte.features[2]` | Não inclui correção de bugs futuros, atualizações do sistema nem suporte técnico do dia a dia. | FRAME | n/a |
| 60 | `pricing.plans.self-com-suporte` | Implantação no seu servidor com manutenção contínua. | FRAME | n/a |
| 61 | `pricing.plans.self-com-suporte.features[0]` | Implantação no servidor da sua empresa. | S3.1 | A |
| 62 | `pricing.plans.self-com-suporte.features[1]` | Você usa as suas próprias chaves de API de IA. | F16 | A |
| 63 | `pricing.plans.self-com-suporte.features[2]` | Atualizações do contêiner Docker e patches de segurança. | FRAME | n/a |
| 64 | `pricing.plans.self-com-suporte.features[3]` | Suporte para dúvidas técnicas. | FRAME | n/a |
| 65 | `pricing.selfReq` | O que o servidor da sua empresa precisa ter Não publicamos números de capacidade por servidor: eles ainda não foram medidos em produção. | S4 | A |
| 66 | `pricing.selfReq.rows[0]` | Sistema VPS Linux: Ubuntu 22.04 ou mais novo, ou Debian 12 ou mais novo | S4 | A |
| 67 | `pricing.selfReq.rows[1]` | Capacidade mínima 2 vCPU e 4 GB de RAM | S4 | A |
| 68 | `pricing.selfReq.rows[2]` | Rede IP fixo reservado pelo provedor e um domínio apontando para a VPS | S4 | A |
| 69 | `pricing.selfReq.rows[3]` | Software Docker Engine e Docker Compose v2, com proxy HTTPS no servidor | S4 | A |
| 70 | `pricing.selfReq.rows[4]` | WhatsApp e IA Conta Meta Business verificada e chave de API do provedor de IA | S4, S5 | A |
| 71 | `pricing.selfReq.rows[5]` | Licença Vinculada ao IP fixo do servidor. Trocar de IP ou de servidor exige nova emissão. | S3.4, S4 | A |
| 72 | `faq.items[0]` | Qual a diferença entre hospedado e no seu servidor? Nos planos hospedados, o ConversIA roda na nossa VPS e a sua equipe acessa pelo navegador, sem ... | FRAME, S4 | n/a, A |
| 73 | `faq.items[1]` | A licença funciona em qualquer servidor? Nos planos no seu servidor, a licença é vinculada ao IP fixo do servidor. Se o IP ou o servidor mudar, é p... | S3.4, S4 | A |
| 74 | `faq.items[2]` | Para onde vão as conversas? Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta. | S5 | A |
| 75 | `faq.items[3]` | Quanto custa a IA? Nos planos com chave própria e nos planos no seu servidor, o consumo é cobrado pelo provedor que você escolher, com a sua chave.... | F16, F18a | A |
| 76 | `faq.items[4]` | Preciso de conta na Meta? Sim. A conexão usa a API oficial do WhatsApp e exige uma conta Meta Business verificada. | S5, S4 | A |
| 77 | `faq.items[5]` | A IA responde tudo sozinha? Não. O agente responde e transfere para a equipe quando o cliente pede um atendente, quando a IA falha em sequência ou ... | F3 | A |
| 78 | `finalCta` | Fale com a gente ou siga direto para a compra. Coloque o atendimento e o funil da sua empresa para funcionar. | FRAME | n/a |

## Legenda dos ids

| Id | Item de CONTEUDO.md | Classe final |
|---|---|---|
| S1 | CONTEUDO.md secao 1 (proposta de valor e headlines) | n/a |
| S3.1 | CONTEUDO.md secao 3.1 (instalacao dedicada, dados do cliente) | A |
| S3.2 | CONTEUDO.md secao 3.2 (BYOK, provedores aceitos) | A |
| S3.4 | CONTEUDO.md secao 3.4 (licenca offline, vinculo ao IP) | A |
| S4 | CONTEUDO.md secao 4 (requisitos de instalacao) | A |
| S5 | CONTEUDO.md secao 5 (integracoes existentes) | A |
| F1 | Funcionalidade 1: caixa de entrada multiatendente | A |
| F3 | Funcionalidade 3: agente de IA com transferencia para humano | A |
| F4 | Funcionalidade 4: transcricao de audio | A |
| F5 | Funcionalidade 5: extracao de lead por IA | A |
| F6 | Funcionalidade 6: lead vira negocio | A |
| F7 | Funcionalidade 7: pipeline kanban | A |
| F8 | Funcionalidade 8: etapas configuraveis | A |
| F9 | Funcionalidade 9: historico de movimentacao | A |
| F12 | Funcionalidade 12: automacoes por etapa (3 acoes) | A |
| F14 | Funcionalidade 14: relatorios | A |
| F15 | Funcionalidade 15: exportacao CSV/XLSX | A |
| F16 | Funcionalidade 16: chaves de IA proprias (BYOK) | A |
| F17 | Funcionalidade 17: funcoes de IA e fallback | A |
| F18a | Funcionalidade 18a: registro de uso e custo de IA | A |
| F27 | Funcionalidade 27: usuarios e agentes | A |
| F28 | Funcionalidade 28: tema claro e escuro | A |
| F11 | Funcionalidade 11: contatos | A |
| S7 | CONTEUDO.md secao 7 (tokens de design em variaveis CSS) | A |
| FRAME | Enquadramento editorial, sem afirmacao factual sobre o produto | n/a |

## Texto sem id de evidencia (rotulos, navegacao, placeholders)

Nao fazem afirmacao factual sobre o produto.

| Onde | Texto |
|---|---|
| `integrations.items[0]` | WhatsApp Cloud API (Meta) API oficial |
| `integrations.items[1]` | Webhook de leads anúncios e landing pages |
| `integrations.items[2]` | OpenAI |
| `integrations.items[3]` | Gemini |
| `integrations.items[4]` | Claude |
| `integrations.items[5]` | Groq |
| `faq` | O que perguntam antes de contratar. |
| `seo` | ConversIA: CRM de WhatsApp com IA |

## Placeholders configuraveis (src/config/site.js)

Preco, garantia, reemissao de licenca, servico de instalacao, contatos, CNPJ, dominio e URL do CTA. Nenhum valor real foi inventado.
