// Conteudo da pagina. Cada afirmacao carrega `ev` = ids de evidencia que apontam para CONTEUDO.md.
// Convencao dos ids:
//   F<n>   = linha n da tabela de funcionalidades (CONTEUDO.md, secao 2; classe final na secao 9.3)
//   S<x.y> = secao x.y de CONTEUDO.md (S3.1, S3.2, S3.4, S4, S5)
//   9.5    = item B marcado para revisao do dono
//   FRAME  = enquadramento editorial, sem afirmacao factual sobre o produto
// `review: true` = classe B: redacao conservadora, depende da aprovacao do dono.
// Nenhum texto menciona KB/RAG, PIX, calendario, Baileys, Click-to-WhatsApp. Modelo de entrega: duas linhas definidas pelo dono (hospedado por ele; ou no servidor do cliente, com licenca presa ao IP).

export const CAPTION = 'Dados fictícios de demonstração';

export const copy = (S) => ({
  nav: [
    { href: '#produto', label: 'Produto' },
    { href: '#ia', label: 'IA' },
    { href: '#precos', label: 'Planos' },
    { href: '#faq', label: 'FAQ' },
  ],
  hero: {
    eyebrow: 'Hospedado por nós ou no seu servidor',
    h1: 'CRM de WhatsApp com IA para a sua equipe de vendas.',
    sub: 'Caixa de entrada para a equipe, funil de vendas em kanban, automações por etapa e relatórios. Escolha o plano hospedado por nós ou instalado no servidor da sua empresa.',
    ev: ['S1', 'S3.1', 'F1', 'F7', 'F12', 'F14'],
    shotAlt: `Tela de Pipeline do ${S.name} com o menu lateral e o quadro kanban de negócios por etapa.`,
  },

  integrations: {
    label: 'Funciona com',
    ev: ['S5'],
    items: [
      { name: 'WhatsApp Cloud API (Meta)' },
      { name: 'Webhook de leads' },
      { name: 'OpenAI' },
      { name: 'Gemini' },
      { name: 'Claude' },
      { name: 'Groq' },
    ],
    legal: 'Nomes de terceiros pertencem aos seus titulares. Sem vínculo ou endosso.',
  },
  problem: {
    eyebrow: 'O ponto de partida',
    title: 'Conversa, negócio e follow-up no mesmo lugar.',
    ev: ['FRAME'],
    items: [
      { icon: 'inbox', t: 'Atendimento com a equipe toda', d: 'Fila de conversas, quem assumiu e quem está livre, com atualização em tempo real.', ev: ['F1'] },
      { icon: 'funnel', t: 'Funil que acompanha a conversa', d: 'O lead vira negócio e anda pelas etapas do seu processo de vendas.', ev: ['F6', 'F7'] },
      { icon: 'bell', t: 'Follow-up que não depende de memória', d: 'Avisos, lembretes e mensagens modelo disparados pela etapa do negócio.', ev: ['F12'] },
    ],
  },

  product: {
    id: 'produto',
    eyebrow: 'O produto',
    title: 'Tudo o que a operação de vendas no WhatsApp precisa em uma tela só.',
    ev: ['F1', 'F7', 'F12', 'F14'],
    tabs: [
      {
        id: 'conversas', label: 'Conversas', ev: ['F1'],
        title: 'Uma fila para a equipe, no mesmo painel.',
        d: 'Veja a fila, assuma uma conversa, devolva quando terminar e responda sem sair da tela.',
        bullets: [
          { t: 'Fila e “minhas” conversas, com assumir e liberar.', ev: ['F1'] },
          { t: 'Atualização em tempo real.', ev: ['F1'] },
        ],
        shot: 'inbox', alt: 'Tela de Conversas com fila, lista de conversas e janela de chat.',
      },
      {
        id: 'pipeline', label: 'Pipeline', ev: ['F7', 'F8', 'F9'],
        title: 'Um funil que você desenha e acompanha.',
        d: 'Crie as etapas do seu processo, arraste os negócios e veja o histórico de cada movimentação.',
        bullets: [
          { t: 'Etapas configuráveis: abertas, ganhas e perdidas.', ev: ['F8'] },
          { t: 'Arraste e solte entre etapas.', ev: ['F7'] },
          { t: 'Histórico de movimentação com data e autoria.', ev: ['F9'] },
        ],
        shot: 'pipeline', alt: 'Quadro kanban do Pipeline com colunas Novo lead, Em atendimento, Proposta enviada e Negociação.',
      },
      {
        id: 'automacoes', label: 'Automações', ev: ['F12'],
        title: 'Quando o negócio muda de etapa, o sistema age.',
        d: 'Defina o gatilho e a ação para cada etapa do funil.',
        bullets: [
          { t: 'Gatilhos: ao entrar na etapa ou após X dias parado.', ev: ['F12'] },
          { t: 'Ações: enviar template de WhatsApp, notificar o atendente, agendar lembrete.', ev: ['F12'] },
          { t: 'Liga e desliga cada automação.', ev: ['F12'] },
        ],
        shot: 'automacoes', alt: 'Lista de automações por etapa com gatilho, ação e status.',
      },
      {
        id: 'relatorios', label: 'Relatórios', ev: ['F14', 'F15'],
        title: 'Funil, atendimento e custo de IA em números.',
        d: 'Escolha o período e exporte quando precisar.',
        bullets: [
          { t: 'Conversão, valor fechado e em aberto, tempo parado por etapa.', ev: ['F14'] },
          { t: 'Conversas resolvidas pela IA, transferidas e tempo de primeira resposta.', ev: ['F14'] },
          { t: 'Exportação em CSV e planilha.', ev: ['F15'] },
        ],
        shot: 'analytics', alt: 'Painel Deals por estágio dos Relatórios, com a contagem de negócios em cada etapa do funil.',
      },
    ],
    video: {
      title: 'Veja o fluxo real',
      d: 'Conversas, pipeline e automações em 38 segundos, sem áudio.',
      play: 'Reproduzir o vídeo de demonstração',
      desc: 'Vídeo sem áudio, com dados fictícios: abre conversas da fila, arrasta negócios entre as etapas do pipeline e mostra as automações por etapa.',
      posterAlt: 'Quadro do pipeline do ConversIA com os negócios por etapa.',
      ev: ['F1', 'F7', 'F12'],
    },
    alsoTitle: 'Também no produto',
    also: [
      { icon: 'lead', t: 'Do chat ao negócio', d: 'A IA extrai nome, telefone, e-mail, orçamento e interesse, e cria ou atualiza o negócio com um limiar de confiança.', ev: ['F5', 'F6'] },
      { icon: 'audio', t: 'Transcrição de áudio', d: 'Áudios recebidos viram texto pelo provedor que você configurar.', ev: ['F4'] },
      { icon: 'team', t: 'Perfis de admin e agente', d: 'Cada pessoa vê o que o seu papel permite.', ev: ['F27'] },
      { icon: 'theme', t: 'Tema claro e escuro', d: 'Alterna e lembra a sua escolha.', ev: ['F28'] },
    ],
  },
  ai: {
    id: 'ia',
    eyebrow: 'Inteligência artificial',
    title: 'IA com as suas chaves e com saída para um humano.',
    lead: 'Você cadastra a chave do provedor que preferir. O agente responde as conversas e entrega para a equipe quando necessário.',
    ev: ['F16', 'F17', 'F3', 'S3.2'],
    pillars: [
      { t: 'Suas chaves, seu provedor', d: 'Cadastre OpenAI, Gemini, Claude ou Groq. A chave é guardada criptografada (AES-256-GCM) e aparece mascarada no painel.', ev: ['F16', 'S3.2'] },
      { t: 'Função por função, com reserva', d: 'Agente de conversa, extração de lead e transcrição de áudio têm provedor e modelo próprios, com cadeia de reserva se o primeiro falhar.', ev: ['F17'] },
      { t: 'Transferência para uma pessoa', d: 'O cliente pede um atendente, a IA falha em sequência ou o negócio passa de um valor definido: a conversa vai para a equipe.', ev: ['F3'] },
      { t: 'Custo e tokens à vista', d: 'Acompanhe tokens e custo estimado por provedor, por função e por dia.', ev: ['F18a', 'F14'], },
    ],
    privacy: 'Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta.',
    privacyEv: ['S5'],
    shotAlt: 'Tela de Chaves de IA: agente de conversa e transcrição de áudio com provedor, modelo e chave configurada.',
  },

  how: {
    id: 'como-funciona',
    eyebrow: 'Como funciona',
    title: 'Da contratação ao primeiro atendimento.',
    ev: ['S4'],
    steps: [
      { t: 'Escolher e implantar', d: 'Você escolhe o plano e nós colocamos o ConversIA da sua empresa no ar, no nosso servidor ou no seu.', ev: ['FRAME'], icon: 'server' },
      { t: 'Conectar', d: 'Cadastre o WhatsApp oficial e a chave do provedor de IA em Integrações e Chaves de IA.', ev: ['S4', 'S5'], icon: 'plug' },
      { t: 'Atender', d: 'Sua equipe entra pelo navegador, com perfis de admin e de agente, e atende pela fila de conversas.', ev: ['F1', 'F27'], icon: 'chat' },
      { t: 'Acompanhar', d: 'Os negócios andam pelas etapas do funil, e os relatórios mostram funil, atendimento e custo de IA.', ev: ['F7', 'F14'], icon: 'chart' },
    ],
  },

  models: {
    id: 'modelos',
    eyebrow: 'Hospedado ou no seu servidor',
    title: 'Qual modelo é o seu?',
    lead: 'É o mesmo produto. Muda onde ele roda e quem cuida do servidor.',
    ev: ['FRAME'],
    cards: [
      {
        id: 'hosted', t: 'Hospedado por nós', ev: ['FRAME', 'S5'],
        rows: [
          { k: 'Quem cuida do servidor', v: 'Nós. O ConversIA da sua empresa roda isolado em Docker na nossa VPS.' },
          { k: 'O que você faz', v: 'Usa pelo navegador e conecta o WhatsApp oficial.' },
          { k: 'Seus dados', v: 'Os dados ficam armazenados na infraestrutura do fornecedor. Com a IA ativa, o conteúdo das conversas segue ao provedor de LLM escolhido, e o WhatsApp trafega pela Meta.' },
        ],
      },
      {
        id: 'self', t: 'No seu servidor', ev: ['S3.1', 'S4'],
        rows: [
          { k: 'Quem cuida do servidor', v: 'Você. A sua empresa fornece o servidor e o mantém.' },
          { k: 'O que você faz', v: 'Fornece um servidor Linux com Docker, IP fixo e um domínio apontando para ele, e usa as suas próprias chaves de IA.' },
          { k: 'Seus dados', v: 'Seu banco de dados e seus arquivos ficam no servidor da sua empresa. Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta.' },
        ],
      },
    ],
  },
  pricing: {
    id: 'precos',
    eyebrow: 'Planos',
    title: 'Escolha como o ConversIA vai rodar.',
    lead: 'A implantação é uma taxa única. Escolha entre a hospedagem por nossa conta ou o seu próprio servidor.',
    leadEv: ['FRAME'],
    selectorLabel: 'Modelo de contratação',
    labels: {
      setup: 'Implantação', monthly: 'mês', noMonthly: 'sem mensalidade', badge: 'Recomendado', choose: 'Escolher',
      compareTitle: 'Comparação dos planos', compareOpen: 'Ver a comparação completa', compareClose: 'Ocultar a comparação',
      yes: 'Incluído', no: 'Não incluído', feature: 'Recurso', setupRow: 'Implantação (taxa única)', monthlyRow: 'Mensalidade',
    },
    groups: [
      {
        id: 'hosted',
        tab: 'Hospedado por nós',
        ev: ['S3.1', 'S4', 'S5'],
        who: { t: 'Quem cuida do servidor', d: 'Nós. O ConversIA da sua empresa roda isolado em Docker na nossa VPS.' },
        does: { t: 'O que você faz', d: 'Usa pelo navegador, conecta o WhatsApp oficial e, no plano de chave própria, cadastra a sua chave de IA.' },
        note: 'A franquia de IA é uma estimativa em interações por mês. O painel mostra tokens e custo estimado de IA por provedor, função e dia.',
        noteEv: ['F18a'],
        plans: ['hosted-basico', 'hosted-intermediario', 'hosted-avancado', 'hosted-byok'],
        compare: [
          { t: 'Franquia de IA incluída', v: ['cerca de 1.500 por mês', 'cerca de 4.000 por mês', 'cerca de 10.000 por mês', 'paga direto à OpenAI'], ev: ['FRAME'] },
          { t: 'CRM completo: contatos e conversas', v: [true, true, true, true], ev: ['F1', 'F11'] },
          { t: 'IA de atendimento e triagem', v: [true, true, true, true], ev: ['F3', 'F5'] },
          { t: 'Kanban e relatórios', v: [true, true, true, true], ev: ['F7', 'F14'] },
          { t: 'Paleta de cores com a identidade da empresa', v: [false, false, true, false], ev: ['S7'] },
          { t: 'Consultor digital: o dono acompanha o negócio pelo WhatsApp', v: [false, true, true, 'módulo adicional'], ev: ['OWNER-D1'] },
        ],
      },
      {
        id: 'self',
        tab: 'No seu servidor',
        ev: ['S3.1', 'S3.2', 'S4'],
        who: { t: 'Quem cuida do servidor', d: 'Você. A sua empresa fornece o servidor e o mantém.' },
        does: { t: 'O que você faz', d: 'Fornece um servidor Linux com Docker, IP fixo e domínio, e usa as suas próprias chaves de IA.' },
        plans: ['self-sem-suporte', 'self-com-suporte'],
        compare: [
          { t: 'Servidor', v: ['da sua empresa', 'da sua empresa'], ev: ['S3.1'] },
          { t: 'Chaves de IA', v: ['suas', 'suas'], ev: ['F16'] },
          { t: 'Atualizações do contêiner Docker e patches de segurança', v: [false, true], ev: ['FRAME'] },
          { t: 'Suporte técnico', v: [false, true], ev: ['FRAME'] },
          { t: 'Consultor digital: o dono acompanha o negócio pelo WhatsApp', v: ['módulo adicional', 'módulo adicional'], ev: ['OWNER-D1'] },
        ],
      },
    ],
    // No maximo 3 itens por cartao. Nada que ainda nao exista entra no cartao.
    plans: {
      'hosted-basico': {
        tagline: 'Para organizar o atendimento e os leads no funil.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Franquia de IA: cerca de 1.500 interações por mês.', ev: ['FRAME'] },
          { t: 'CRM completo, com IA de atendimento e triagem.', ev: ['F1', 'F3', 'F5', 'F11'] },
          { t: 'Kanban e relatórios de funil e atendimento.', ev: ['F7', 'F14'] },
        ],
      },
      'hosted-intermediario': {
        tagline: 'Para quem atende com mais volume.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Tudo do Hosted Básico.', ev: ['FRAME'] },
          { t: 'Franquia de IA ampliada: cerca de 4.000 interações por mês.', ev: ['FRAME'] },
        ],
      },
      'hosted-avancado': {
        tagline: 'Para operações com alto volume de interações.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Tudo do Hosted Intermediário.', ev: ['FRAME'] },
          { t: 'Franquia de IA premium: cerca de 10.000 interações por mês.', ev: ['FRAME'] },
          { t: 'Paleta de cores com a identidade da sua empresa.', ev: ['S7'] },
        ],
      },
      'hosted-byok': {
        tagline: 'Hospedagem nossa, custo de IA seu.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Tudo do Hosted Básico.', ev: ['FRAME'] },
          { t: 'Você cadastra a sua chave da OpenAI e paga o consumo direto a ela.', ev: ['F16'] },
        ],
      },
      'self-sem-suporte': {
        tagline: 'Implantação única, sem acompanhamento depois.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Implantação isolada no servidor da sua empresa.', ev: ['S3.1'] },
          { t: 'Você usa as suas próprias chaves de API de IA.', ev: ['F16'] },
          { t: 'Sem correção de bugs futuros nem suporte técnico.', ev: ['FRAME'], no: true },
        ],
      },
      'self-com-suporte': {
        tagline: 'Implantação com manutenção contínua.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Implantação no servidor da sua empresa.', ev: ['S3.1'] },
          { t: 'Atualizações do contêiner Docker e patches de segurança.', ev: ['FRAME'] },
          { t: 'Suporte técnico para a sua equipe.', ev: ['FRAME'] },
        ],
      },
    },
    launch: {
      badge: 'Lote dos 20 primeiros',
      title: 'Oferta de lançamento para clientes fundadores',
      lead: 'Uma condição exclusiva para quem entra primeiro.',
      big: '20',
      bigLabel: 'vagas de fundador',
      ev: ['FRAME'],
      terms: 'Termos conforme a Política de Reembolso.',
      perks: [
        { t: 'Primeira mensalidade isenta', d: 'No primeiro mês você paga só o valor da implantação.', ev: ['FRAME'] },
        { t: 'Bônus: 30 dias do Consultor digital', d: 'Acesso gratuito ao módulo para os assinantes do Hosted Básico testarem, a partir do lançamento do módulo.', ev: ['FRAME'] },
      ],
    },
    // Exigido de quem escolhe rodar no proprio servidor (CONTEUDO.md secao 4).
    selfReq: {
      title: 'O que o servidor da sua empresa precisa ter',
      ev: ['S4'],
      rows: [
        { t: 'Sistema', d: 'VPS Linux: Ubuntu 22.04 ou mais novo, ou Debian 12 ou mais novo', ev: ['S4'] },
        { t: 'Capacidade mínima', d: '2 vCPU e 4 GB de RAM', ev: ['S4'] },
        { t: 'Rede', d: 'IP fixo reservado pelo provedor e um domínio apontando para a VPS', ev: ['S4'] },
        { t: 'Software', d: 'Docker Engine e Docker Compose v2, com proxy HTTPS no servidor', ev: ['S4'] },
        { t: 'WhatsApp e IA', d: 'Conta Meta Business verificada e chave de API do provedor de IA', ev: ['S4', 'S5'] },
        { t: 'Licença', d: 'Vinculada ao IP fixo do servidor. Trocar de IP ou de servidor exige nova emissão.', ev: ['S3.4', 'S4'] },
      ],
      footnote: 'Não publicamos números de capacidade por servidor: eles ainda não foram medidos em produção.',
    },
  },
  services: {
    id: 'servicos',
    eyebrow: 'Serviços opcionais',
    title: 'Precisa de mais leads?',
    lead: 'Oferecemos serviços de marketing para encaminhar os leads dos seus anúncios ao ConversIA. Não são obrigatórios para usar o CRM.',
    ev: ['FRAME'],
    more: 'Saber mais',
    items: {
      landing: { t: 'Criação de landing page', d: 'Página focada na sua oferta, com domínio e hospedagem no primeiro ano, ligada ao funil pelo webhook de leads. Entrega em 7 a 10 dias úteis.', unit: 'pagamento único', ev: ['S5'] },
      consultoria: { t: 'Consultoria de tráfego pago', d: 'Análise das suas campanhas e novo plano de ação, em videochamada de 1h30 com gravação.', unit: 'por sessão', ev: ['FRAME'] },
      gestao: { t: 'Gestão de tráfego pago', d: 'Criação e otimização das campanhas, com relatório mensal. A verba dos anúncios não está inclusa.', unit: 'por mês', ev: ['FRAME'] },
    },
  },
  faq: {
    id: 'faq',
    eyebrow: 'Perguntas frequentes',
    title: 'O que perguntam antes de contratar.',
    items: [
      { q: 'Qual a diferença entre hospedado e no seu servidor?', a: 'Nos planos hospedados, o ConversIA roda na nossa VPS e a sua equipe acessa pelo navegador, sem instalar nada. Nos planos no seu servidor, ele é implantado na infraestrutura da sua empresa, que precisa atender aos requisitos listados na seção de planos.', ev: ['FRAME', 'S4'] },
      { q: 'A licença funciona em qualquer servidor?', a: 'Nos planos no seu servidor, a licença é vinculada ao IP fixo do servidor. Se o IP ou o servidor mudar, é preciso emitir uma nova licença.', ev: ['S3.4', 'S4'] },
      { q: 'Para onde vão as conversas?', a: 'Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta.', ev: ['S5'] },
      { q: 'Quanto custa a IA?', a: 'Nos planos com chave própria e nos planos no seu servidor, o consumo é cobrado pelo provedor que você escolher, com a sua chave. Nos planos hospedados com franquia, uma quantidade mensal estimada de interações de IA já está inclusa. Em todos, o painel mostra tokens e custo estimado por função e por dia.', ev: ['F16', 'F18a'] },
      { q: 'Preciso de conta na Meta?', a: 'Sim. A conexão usa a API oficial do WhatsApp e exige uma conta Meta Business verificada.', ev: ['S5', 'S4'] },
      { q: 'A IA responde tudo sozinha?', a: 'Não. O agente responde e transfere para a equipe quando o cliente pede um atendente, quando a IA falha em sequência ou por regra de valor do negócio. A qualidade das respostas depende do modelo que você configurar.', ev: ['F3'] },
    ],
  },

  finalCta: {
    title: 'Fale com a equipe e comece pelo plano que cabe no seu atendimento.',
    sub: 'Conte como é o seu atendimento hoje e indicamos o plano.',
    ev: ['FRAME'],
  },

  footer: {
    marks: 'WhatsApp é marca da Meta Platforms, Inc. OpenAI, Gemini, Claude e Groq são marcas de seus titulares. Este site não tem vínculo com essas empresas.',
    legal: [
      { href: '/termos/', label: 'Termos de uso' },
      { href: '/privacidade/', label: 'Privacidade' },
      { href: '/reembolso/', label: 'Reembolso' },
    ],
  },

  seo: {
    title: `${S.name}: CRM de WhatsApp com IA`,
    description: 'CRM de WhatsApp com caixa de entrada multiatendente, pipeline kanban, automações por etapa, relatórios e agente de IA com as suas chaves. Hospedado por nós ou no seu servidor.',
    ogAlt: `${S.name}: CRM de WhatsApp com IA`,
  },
});
