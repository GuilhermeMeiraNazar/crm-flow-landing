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
    { href: '#como-funciona', label: 'Como funciona' },
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
    label: 'Conecta com',
    ev: ['S5'],
    items: [
      { name: 'WhatsApp Cloud API (Meta)', note: 'API oficial' },
      { name: 'Webhook de leads', note: 'anúncios e landing pages' },
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
      { t: 'Atendimento com a equipe toda', d: 'Fila de conversas, quem assumiu e quem está livre, com atualização em tempo real.', ev: ['F1'] },
      { t: 'Funil que acompanha a conversa', d: 'O lead vira negócio e anda pelas etapas do seu processo de vendas.', ev: ['F6', 'F7'] },
      { t: 'Follow-up que não depende de memória', d: 'Avisos, lembretes e mensagens modelo disparados pela etapa do negócio.', ev: ['F12'] },
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
    alsoTitle: 'Também no produto',
    also: [
      { icon: 'lead', t: 'Do chat ao negócio', d: 'A IA extrai nome, telefone, e-mail, orçamento e interesse, e cria ou atualiza o negócio com um limiar de confiança.', ev: ['F5', 'F6'] },
      { icon: 'audio', t: 'Transcrição de áudio', d: 'Áudios recebidos viram texto pelo provedor que você configurar.', ev: ['F4'] },
      { icon: 'team', t: 'Perfis de admin e agente', d: 'Cada pessoa vê o que o seu papel permite.', ev: ['F27'] },
      { icon: 'theme', t: 'Tema claro e escuro', d: 'Alterna e lembra a sua escolha.', ev: ['F28'] },
    ],
  },
  numbers: {
    ev: ['S5', 'F12', 'F3', 'F27'],
    items: [
      { value: 4, label: 'provedores de IA com a sua chave', ev: ['S5', 'F16'] },
      { value: 3, label: 'ações de automação por etapa', ev: ['F12'] },
      { value: 3, label: 'estados de conversa: IA, transferência pedida e humano', ev: ['F3'] },
      { value: 2, label: 'perfis de acesso: admin e agente', ev: ['F27'] },
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
      { t: 'Escolher o plano', d: 'Compare os planos hospedados e os planos no seu servidor e fale com a gente.', ev: ['FRAME'] },
      { t: 'Implantação', d: 'Colocamos o ConversIA da sua empresa no ar, no nosso servidor ou no seu, conforme o plano, com a taxa única de implantação.', ev: ['FRAME'] },
      { t: 'Acessar', d: 'Sua equipe entra pelo navegador, com perfis de admin e de agente.', ev: ['F27'] },
      { t: 'Conectar', d: 'Cadastre o WhatsApp oficial e a chave do provedor de IA em Integrações e Chaves de IA.', ev: ['S4', 'S5'] },
    ],
  },

  pricing: {
    id: 'precos',
    eyebrow: 'Planos',
    title: 'Escolha a solução ideal para o seu atendimento.',
    lead: 'Todos os planos têm inteligência artificial nativa, integração com o WhatsApp e painel de gestão visual. Escolha entre o ConversIA hospedado por nós ou instalado no servidor da sua empresa. A implantação é uma taxa única.',
    leadEv: ['F1', 'F3', 'F7'],
    labels: { setup: 'Implantação', setupNote: 'taxa única', monthly: 'mês', noMonthly: 'sem mensalidade', badge: 'Recomendado', soon: 'Em breve' },
    carousel: { region: 'Planos e valores', prev: 'Plano anterior', next: 'Próximo plano', goto: 'Ver plano' },
    groups: [
      {
        id: 'hosted',
        title: 'Hospedado por nós',
        lead: 'A solução completa para quem quer o CRM pronto na nuvem, rodando isolado em Docker nos nossos servidores, sem se preocupar com infraestrutura.',
        ev: ['S3.1'],
        note: 'A franquia de IA é uma estimativa em interações por mês. O painel mostra tokens e custo estimado de IA por provedor, função e dia. Itens marcados como "Em breve" ainda não estão disponíveis.',
        noteEv: ['F18a'],
        plans: ['hosted-basico', 'hosted-intermediario', 'hosted-avancado', 'hosted-byok'],
      },
      {
        id: 'self',
        title: 'No seu servidor',
        lead: 'Para empresas que já têm servidor próprio (VPS ou nuvem) e querem o sistema rodando internamente. O consumo de IA é gerido pela própria empresa, com as suas chaves.',
        ev: ['S3.1', 'S3.2'],
        plans: ['self-sem-suporte', 'self-com-suporte'],
      },
    ],
    // Modulos adicionais. Nenhum esta disponivel hoje: todos aparecem como "Em breve".
    addons: {
      id: 'modulos',
      eyebrow: 'Módulos adicionais',
      title: 'Monte o seu CRM sob medida.',
      lead: 'Exclusivos para os planos Hosted BYOK e Self-Hosted. Adicione funcionalidades extras à sua mensalidade, só as que você precisar.',
      ev: ['FRAME'],
      per: 'por mês',
      note: 'Os módulos estão em desenvolvimento e marcados como "Em breve". Os planos Hosted Básico, Intermediário e Avançado não aceitam módulos avulsos.',
      items: {
        agenda: { icon: 'agenda', soon: true, t: 'Agenda com confirmação automática', d: 'Agendamento inteligente e lembretes de compromissos dentro da conversa.', ev: ['FRAME'] },
        financeiro: { icon: 'financeiro', soon: true, t: 'Emissão de cobrança via IA', d: 'Geração de cobrança PIX dentro da conversa, para o cliente pagar na hora.', ev: ['FRAME'] },
        copiloto: { icon: 'copiloto', soon: true, t: 'Copiloto do Gestor', d: 'Assistente no WhatsApp privado do dono: consulta de estoque, avisos de vendas e relatórios.', ev: ['FRAME'] },
        instancia: { icon: 'instancia', soon: true, t: 'Conexão extra de WhatsApp', d: 'Mais um número de WhatsApp no mesmo painel. O valor é por número adicional.', ev: ['FRAME'] },
      },
    },
    launch: {
      badge: 'Lote dos 20 primeiros',
      title: 'Oferta de lançamento para clientes fundadores',
      lead: 'Uma condição exclusiva para quem entra primeiro.',
      big: '20',
      bigLabel: 'vagas de fundador',
      ev: ['FRAME'],
      perks: [
        { t: 'Primeira mensalidade isenta', d: 'No primeiro mês você paga só o valor da implantação.', ev: ['FRAME'] },
        { t: 'Bônus VIP: 30 dias do Copiloto do Gestor', d: 'Acesso integral e gratuito ao módulo para os assinantes do Hosted Básico testarem, a partir do lançamento do módulo.', ev: ['FRAME'], soon: true },
      ],
    },
    // O que cada plano inclui. Termos comerciais do dono levam FRAME; recursos do produto levam id de CONTEUDO.md.
    // `soon: true` = ainda nao disponivel (aparece com a marca "Em breve"). Remova a marca so quando o recurso estiver no ar.
    plans: {
      'hosted-basico': {
        tagline: 'Para pequenas empresas que precisam automatizar o primeiro atendimento e organizar os leads no funil de vendas.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Franquia de IA inclusa: cerca de 1.500 interações por mês.', ev: ['FRAME'] },
          { t: 'CRM completo via WhatsApp: contatos e conversas unificados em uma tela.', ev: ['F1', 'F11'] },
          { t: 'IA de atendimento e triagem: respostas automáticas para dúvidas frequentes e qualificação inicial de leads.', ev: ['F3', 'F5'] },
          { t: 'Painel kanban e relatórios de funil, atendimento e custo de IA.', ev: ['F7', 'F14'] },
        ],
        note: 'Este plano não permite contratação de módulos avulsos. Para mais funcionalidades, veja os planos superiores.',
      },
      'hosted-intermediario': {
        tagline: 'Para empresas em crescimento que querem automatizar agendamentos e ter o controle do negócio na palma da mão.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Tudo do Hosted Básico, mais:', ev: ['FRAME'] },
          { t: 'Franquia de IA ampliada: cerca de 4.000 interações por mês.', ev: ['FRAME'] },
          { t: 'Copiloto do Gestor: consulta de estoque, avisos de vendas e relatórios no WhatsApp privado do dono.', ev: ['FRAME'], soon: true },
          { t: 'Agenda com confirmação automática e lembretes de compromissos.', ev: ['FRAME'], soon: true },
          { t: 'Emissão de cobrança PIX via IA dentro da conversa.', ev: ['FRAME'], soon: true },
        ],
      },
      'hosted-avancado': {
        tagline: 'Para operações consolidadas que exigem automação de ponta a ponta, múltiplos números e alto volume de interações.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Tudo do Hosted Intermediário, mais:', ev: ['FRAME'] },
          { t: 'Franquia de IA premium: cerca de 10.000 interações por mês.', ev: ['FRAME'] },
          { t: 'Instâncias múltiplas: números de WhatsApp adicionais no mesmo painel.', ev: ['FRAME'], soon: true },
          { t: 'Múltiplos funis de vendas: kanbans simultâneos para setores diferentes, como Vendas, Suporte e Financeiro.', ev: ['FRAME'], soon: true },
          { t: 'Adaptação da paleta de cores da plataforma à identidade visual da sua empresa (setup semi-customizado).', ev: ['S7'] },
        ],
      },
      'hosted-byok': {
        tagline: 'Para quem quer a nossa hospedagem, mas prefere gerenciar os próprios custos de IA na OpenAI.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Todas as funcionalidades do Hosted Básico.', ev: ['FRAME'] },
          { t: 'Você cadastra o seu cartão na OpenAI, gera a sua chave de API e paga só o que consumir, direto na fonte.', ev: ['F16'] },
        ],
        note: 'Permite contratação de módulos adicionais.',
      },
      'self-sem-suporte': {
        tagline: 'Implantação única no seu servidor, sem acompanhamento depois.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Implantação isolada no servidor da sua empresa.', ev: ['S3.1'] },
          { t: 'Você usa as suas próprias chaves de API de IA.', ev: ['F16'] },
          { t: 'Não inclui correção de bugs futuros nem suporte técnico.', ev: ['FRAME'], no: true },
        ],
        note: 'Permite adição de módulos avulsos no momento da implantação.',
      },
      'self-com-suporte': {
        tagline: 'Implantação no seu servidor com manutenção contínua.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Implantação no servidor da sua empresa.', ev: ['S3.1'] },
          { t: 'Você usa as suas próprias chaves de API de IA.', ev: ['F16'] },
          { t: 'Atualizações contínuas do contêiner Docker e patches de segurança.', ev: ['FRAME'] },
          { t: 'Suporte técnico para a sua equipe.', ev: ['FRAME'] },
        ],
        note: 'Permite adição de módulos avulsos.',
      },
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
    title: 'Coloque o atendimento e o funil da sua empresa para funcionar.',
    sub: 'Fale com a gente ou siga direto para a compra.',
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
