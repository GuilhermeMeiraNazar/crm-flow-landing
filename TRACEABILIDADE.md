# Rastreabilidade: afirmacoes da pagina x CONTEUDO.md

Gerado por `node scripts/trace.mjs` a partir de `src/content/pt-BR.js`. Cada linha tem os ids de evidencia (`ev`) da afirmacao.

| # | Onde | Afirmacao (trecho) | Evidencia | Classe |
|---|---|---|---|---|
| 1 | `hero` | CRM de WhatsApp com IA para a sua equipe de vendas. Caixa de entrada para a equipe, funil de vendas em kanban, automações por etapa e relatórios. E... | S1, S3.1, F1, F7, F12, F14 | n/a, A |
| 2 | `problem` | Conversa, negócio e follow-up no mesmo lugar. | FRAME | n/a |
| 3 | `problem.items[0]` | Atendimento com a equipe toda Fila de conversas, quem assumiu e quem está livre, com atualização em tempo real. | F1 | A |
| 4 | `problem.items[1]` | Funil que acompanha a conversa O lead vira negócio e anda pelas etapas do seu processo de vendas. | F6, F7 | A |
| 5 | `problem.items[2]` | Follow-up que não depende de memória Avisos, lembretes e mensagens modelo disparados pela etapa do negócio. | F12 | A |
| 6 | `product` | Tudo o que a operação de vendas no WhatsApp precisa em uma tela só. | F1, F7, F12, F14 | A |
| 7 | `product.tabs[0]` | Uma fila para a equipe, no mesmo painel. Veja a fila, assuma uma conversa, devolva quando terminar e responda sem sair da tela. | F1 | A |
| 8 | `product.tabs[0].bullets[0]` | Fila e “minhas” conversas, com assumir e liberar. | F1 | A |
| 9 | `product.tabs[0].bullets[1]` | Atualização em tempo real. | F1 | A |
| 10 | `product.tabs[1]` | Um funil que você desenha e acompanha. Crie as etapas do seu processo, arraste os negócios e veja o histórico de cada movimentação. | F7, F8, F9 | A |
| 11 | `product.tabs[1].bullets[0]` | Etapas configuráveis: abertas, ganhas e perdidas. | F8 | A |
| 12 | `product.tabs[1].bullets[1]` | Arraste e solte entre etapas. | F7 | A |
| 13 | `product.tabs[1].bullets[2]` | Histórico de movimentação com data e autoria. | F9 | A |
| 14 | `product.tabs[2]` | Quando o negócio muda de etapa, o sistema age. Defina o gatilho e a ação para cada etapa do funil. | F12 | A |
| 15 | `product.tabs[2].bullets[0]` | Gatilhos: ao entrar na etapa ou após X dias parado. | F12 | A |
| 16 | `product.tabs[2].bullets[1]` | Ações: enviar template de WhatsApp, notificar o atendente, agendar lembrete. | F12 | A |
| 17 | `product.tabs[2].bullets[2]` | Liga e desliga cada automação. | F12 | A |
| 18 | `product.tabs[3]` | Funil, atendimento e custo de IA em números. Escolha o período e exporte quando precisar. | F14, F15 | A |
| 19 | `product.tabs[3].bullets[0]` | Conversão, valor fechado e em aberto, tempo parado por etapa. | F14 | A |
| 20 | `product.tabs[3].bullets[1]` | Conversas resolvidas pela IA, transferidas e tempo de primeira resposta. | F14 | A |
| 21 | `product.tabs[3].bullets[2]` | Exportação em CSV e planilha. | F15 | A |
| 22 | `product.video` | Veja o fluxo real Conversas, pipeline e automações em 38 segundos, sem áudio. | F1, F7, F12 | A |
| 23 | `product.also[0]` | Do chat ao negócio A IA extrai nome, telefone, e-mail, orçamento e interesse, e cria ou atualiza o negócio com um limiar de confiança. | F5, F6 | A |
| 24 | `product.also[1]` | Transcrição de áudio Áudios recebidos viram texto pelo provedor que você configurar. | F4 | A |
| 25 | `product.also[2]` | Perfis de admin e agente Cada pessoa vê o que o seu papel permite. | F27 | A |
| 26 | `product.also[3]` | Tema claro e escuro Alterna e lembra a sua escolha. | F28 | A |
| 27 | `ai` | IA com as suas chaves e com saída para um humano. Você cadastra a chave do provedor que preferir. O agente responde as conversas e entrega para a e... | F16, F17, F3, S3.2 | A |
| 28 | `ai.pillars[0]` | Suas chaves, seu provedor Cadastre OpenAI, Gemini, Claude ou Groq. A chave é guardada criptografada (AES-256-GCM) e aparece mascarada no painel. | F16, S3.2 | A |
| 29 | `ai.pillars[1]` | Função por função, com reserva Agente de conversa, extração de lead e transcrição de áudio têm provedor e modelo próprios, com cadeia de reserva se... | F17 | A |
| 30 | `ai.pillars[2]` | Transferência para uma pessoa O cliente pede um atendente, a IA falha em sequência ou o negócio passa de um valor definido: a conversa vai para a e... | F3 | A |
| 31 | `ai.pillars[3]` | Custo e tokens à vista Acompanhe tokens e custo estimado por provedor, por função e por dia. | F18a, F14 | A |
| 32 | `how` | Da contratação ao primeiro atendimento. | S4 | A |
| 33 | `how.steps[0]` | Escolher e implantar Você escolhe o plano e nós colocamos o Frontly da sua empresa no ar, no nosso servidor ou no seu. | FRAME | n/a |
| 34 | `how.steps[1]` | Conectar Cadastre o WhatsApp oficial e a chave do provedor de IA em Integrações e Chaves de IA. | S4, S5 | A |
| 35 | `how.steps[2]` | Atender Sua equipe entra pelo navegador, com perfis de admin e de agente, e atende pela fila de conversas. | F1, F27 | A |
| 36 | `how.steps[3]` | Acompanhar Os negócios andam pelas etapas do funil, e os relatórios mostram funil, atendimento e custo de IA. | F7, F14 | A |
| 37 | `models` | Qual modelo é o seu? É o mesmo produto. Muda onde ele roda e quem cuida do servidor. | FRAME | n/a |
| 38 | `models.cards[0]` | Hospedado por nós | FRAME, S5 | n/a, A |
| 39 | `models.cards[1]` | No seu servidor | S3.1, S4 | A |
| 40 | `pricing` | Escolha como o Frontly vai rodar. A implantação é uma taxa única. Escolha entre a hospedagem por nossa conta ou o seu próprio servidor. | FRAME | n/a |
| 41 | `pricing.groups[0]` | A franquia de IA é uma estimativa em interações por mês. O painel mostra tokens e custo estimado de IA por provedor, função e dia. | S3.1, S4, S5 | A |
| 42 | `pricing.groups[0].compare[0]` | Franquia de IA incluída | FRAME | n/a |
| 43 | `pricing.groups[0].compare[1]` | CRM completo: contatos e conversas | F1, F11 | A |
| 44 | `pricing.groups[0].compare[2]` | IA de atendimento e triagem | F3, F5 | A |
| 45 | `pricing.groups[0].compare[3]` | Kanban e relatórios | F7, F14 | A |
| 46 | `pricing.groups[0].compare[4]` | Paleta de cores com a identidade da empresa | S7 | A |
| 47 | `pricing.groups[0].compare[5]` | Consultor digital: o dono acompanha o negócio pelo WhatsApp | OWNER-D1 | D |
| 48 | `pricing.groups[1].compare[0]` | Servidor | S3.1 | A |
| 49 | `pricing.groups[1].compare[1]` | Chaves de IA | F16 | A |
| 50 | `pricing.groups[1].compare[2]` | Atualizações do contêiner Docker e patches de segurança | FRAME | n/a |
| 51 | `pricing.groups[1].compare[3]` | Suporte técnico | FRAME | n/a |
| 52 | `pricing.groups[1].compare[4]` | Consultor digital: o dono acompanha o negócio pelo WhatsApp | OWNER-D1 | D |
| 53 | `pricing.plans.hosted-basico` | Para organizar o atendimento e os leads no funil. | FRAME | n/a |
| 54 | `pricing.plans.hosted-basico.features[0]` | Franquia de IA: cerca de 1.500 interações por mês. | FRAME | n/a |
| 55 | `pricing.plans.hosted-basico.features[1]` | CRM completo, com IA de atendimento e triagem. | F1, F3, F5, F11 | A |
| 56 | `pricing.plans.hosted-basico.features[2]` | Kanban e relatórios de funil e atendimento. | F7, F14 | A |
| 57 | `pricing.plans.hosted-intermediario` | Para quem atende com mais volume. | FRAME | n/a |
| 58 | `pricing.plans.hosted-intermediario.features[0]` | Tudo do Hosted Básico. | FRAME | n/a |
| 59 | `pricing.plans.hosted-intermediario.features[1]` | Franquia de IA ampliada: cerca de 4.000 interações por mês. | FRAME | n/a |
| 60 | `pricing.plans.hosted-avancado` | Para operações com alto volume de interações. | FRAME | n/a |
| 61 | `pricing.plans.hosted-avancado.features[0]` | Tudo do Hosted Intermediário. | FRAME | n/a |
| 62 | `pricing.plans.hosted-avancado.features[1]` | Franquia de IA premium: cerca de 10.000 interações por mês. | FRAME | n/a |
| 63 | `pricing.plans.hosted-avancado.features[2]` | Paleta de cores com a identidade da sua empresa. | S7 | A |
| 64 | `pricing.plans.hosted-byok` | Hospedagem nossa, custo de IA seu. | FRAME | n/a |
| 65 | `pricing.plans.hosted-byok.features[0]` | Tudo do Hosted Básico. | FRAME | n/a |
| 66 | `pricing.plans.hosted-byok.features[1]` | Você cadastra a sua chave da OpenAI e paga o consumo direto a ela. | F16 | A |
| 67 | `pricing.plans.self-sem-suporte` | Implantação única, sem acompanhamento depois. | FRAME | n/a |
| 68 | `pricing.plans.self-sem-suporte.features[0]` | Implantação isolada no servidor da sua empresa. | S3.1 | A |
| 69 | `pricing.plans.self-sem-suporte.features[1]` | Você usa as suas próprias chaves de API de IA. | F16 | A |
| 70 | `pricing.plans.self-sem-suporte.features[2]` | Sem correção de bugs futuros nem suporte técnico. | FRAME | n/a |
| 71 | `pricing.plans.self-com-suporte` | Implantação com manutenção contínua. | FRAME | n/a |
| 72 | `pricing.plans.self-com-suporte.features[0]` | Implantação no servidor da sua empresa. | S3.1 | A |
| 73 | `pricing.plans.self-com-suporte.features[1]` | Atualizações do contêiner Docker e patches de segurança. | FRAME | n/a |
| 74 | `pricing.plans.self-com-suporte.features[2]` | Suporte técnico para a sua equipe. | FRAME | n/a |
| 75 | `pricing.launch` | Oferta de lançamento para clientes fundadores Uma condição exclusiva para quem entra primeiro. | FRAME | n/a |
| 76 | `pricing.launch.perks[0]` | Primeira mensalidade isenta No primeiro mês você paga só o valor da implantação. | FRAME | n/a |
| 77 | `pricing.launch.perks[1]` | Bônus: 30 dias do Consultor digital Acesso gratuito ao módulo para os assinantes do Hosted Básico testarem, a partir do lançamento do módulo. | FRAME | n/a |
| 78 | `pricing.selfReq` | O que o servidor da sua empresa precisa ter Não publicamos números de capacidade por servidor: eles ainda não foram medidos em produção. | S4 | A |
| 79 | `pricing.selfReq.rows[0]` | Sistema VPS Linux: Ubuntu 22.04 ou mais novo, ou Debian 12 ou mais novo | S4 | A |
| 80 | `pricing.selfReq.rows[1]` | Capacidade mínima 2 vCPU e 4 GB de RAM | S4 | A |
| 81 | `pricing.selfReq.rows[2]` | Rede IP fixo reservado pelo provedor e um domínio apontando para a VPS | S4 | A |
| 82 | `pricing.selfReq.rows[3]` | Software Docker Engine e Docker Compose v2, com proxy HTTPS no servidor | S4 | A |
| 83 | `pricing.selfReq.rows[4]` | WhatsApp e IA Conta Meta Business verificada e chave de API do provedor de IA | S4, S5 | A |
| 84 | `pricing.selfReq.rows[5]` | Licença Vinculada ao IP fixo do servidor. Trocar de IP ou de servidor exige nova emissão. | S3.4, S4 | A |
| 85 | `services` | Precisa de mais leads? Oferecemos serviços de marketing para encaminhar os leads dos seus anúncios ao Frontly. Não são obrigatórios para usar o CRM. | FRAME | n/a |
| 86 | `services.items.landing` | Criação de landing page Página focada na sua oferta, com domínio e hospedagem no primeiro ano, ligada ao funil pelo webhook de leads. Entrega em 7 ... | S5 | A |
| 87 | `services.items.consultoria` | Consultoria de tráfego pago Análise das suas campanhas e novo plano de ação, em videochamada de 1h30 com gravação. | FRAME | n/a |
| 88 | `services.items.gestao` | Gestão de tráfego pago Criação e otimização das campanhas, com relatório mensal. A verba dos anúncios não está inclusa. | FRAME | n/a |
| 89 | `faq.items[0]` | Qual a diferença entre hospedado e no seu servidor? Nos planos hospedados, o Frontly roda na nossa VPS e a sua equipe acessa pelo navegador, sem ... | FRAME, S4 | n/a, A |
| 90 | `faq.items[1]` | A licença funciona em qualquer servidor? Nos planos no seu servidor, a licença é vinculada ao IP fixo do servidor. Se o IP ou o servidor mudar, é p... | S3.4, S4 | A |
| 91 | `faq.items[2]` | Para onde vão as conversas? Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta. | S5 | A |
| 92 | `faq.items[3]` | Quanto custa a IA? Nos planos com chave própria e nos planos no seu servidor, o consumo é cobrado pelo provedor que você escolher, com a sua chave.... | F16, F18a | A |
| 93 | `faq.items[4]` | Preciso de conta na Meta? Sim. A conexão usa a API oficial do WhatsApp e exige uma conta Meta Business verificada. | S5, S4 | A |
| 94 | `faq.items[5]` | A IA responde tudo sozinha? Não. O agente responde e transfere para a equipe quando o cliente pede um atendente, quando a IA falha em sequência ou ... | F3 | A |
| 95 | `finalCta` | Conte como é o seu atendimento hoje e indicamos o plano. Fale com a equipe e comece pelo plano que cabe no seu atendimento. | FRAME | n/a |

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
| OWNER-D1 | DECLARADO PELO DONO: Consultor digital disponivel no dia 1; sem evidencia no CRM analisado (busca por copilot, copiloto, estoque e gestor em crm-flow-ia e core-hub-ia) | D |
| FRAME | Enquadramento editorial, sem afirmacao factual sobre o produto | n/a |

## Texto sem id de evidencia (rotulos, navegacao, placeholders)

Nao fazem afirmacao factual sobre o produto.

| Onde | Texto |
|---|---|
| `integrations.items[0]` | WhatsApp Cloud API (Meta) |
| `integrations.items[1]` | Webhook de leads |
| `integrations.items[2]` | OpenAI |
| `integrations.items[3]` | Gemini |
| `integrations.items[4]` | Claude |
| `integrations.items[5]` | Groq |
| `pricing.groups[0].who` | Quem cuida do servidor Nós. O Frontly da sua empresa roda isolado em Docker na nossa VPS. |
| `pricing.groups[0].does` | O que você faz Usa pelo navegador, conecta o WhatsApp oficial e, no plano de chave própria, cadastra a sua chave de IA. |
| `pricing.groups[1].who` | Quem cuida do servidor Você. A sua empresa fornece o servidor e o mantém. |
| `pricing.groups[1].does` | O que você faz Fornece um servidor Linux com Docker, IP fixo e domínio, e usa as suas próprias chaves de IA. |
| `faq` | O que perguntam antes de contratar. |
| `seo` | Frontly: CRM de WhatsApp com IA |

## Placeholders configuraveis (src/config/site.js)

Preco, garantia, reemissao de licenca, servico de instalacao, contatos, CNPJ, dominio e URL do CTA. Nenhum valor real foi inventado.
