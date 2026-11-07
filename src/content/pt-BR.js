// Conteudo da pagina. Cada afirmacao carrega `ev` = ids de evidencia que apontam para CONTEUDO.md.
// Convencao dos ids:
//   F<n>   = linha n da tabela de funcionalidades (CONTEUDO.md, secao 2; classe final na secao 9.3)
//   S<x.y> = secao x.y de CONTEUDO.md (S3.1, S3.2, S3.4, S4, S5)
//   9.5    = item B marcado para revisao do dono
//   FRAME  = enquadramento editorial, sem afirmacao factual sobre o produto
// `review: true` = classe B: redacao conservadora, depende da aprovacao do dono.
// Nenhum texto menciona KB/RAG, PIX, calendario, Baileys, Click-to-WhatsApp, nem o modelo de entrega alem de "produto instalavel".

export const CAPTION = 'Dados fictícios de demonstração';

export const copy = (S) => ({
  nav: [
    { href: '#produto', label: 'Produto' },
    { href: '#ia', label: 'IA' },
    { href: '#seus-dados', label: 'Seus dados' },
    { href: '#como-funciona', label: 'Como funciona' },
    { href: '#requisitos', label: 'Requisitos' },
    { href: '#precos', label: 'Preço' },
    { href: '#faq', label: 'FAQ' },
  ],

  hero: {
    eyebrow: 'Produto instalável no seu servidor',
    h1: 'CRM de WhatsApp com IA, instalado no seu servidor.',
    sub: 'Caixa de entrada para a equipe, funil de vendas em kanban, automações por etapa e relatórios, em uma instalação dedicada à sua empresa.',
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

  bento: {
    id: 'produto',
    eyebrow: 'O produto',
    title: 'Tudo o que a operação de vendas no WhatsApp precisa em uma tela só.',
    ev: ['F1', 'F3', 'F5', 'F6', 'F7', 'F12', 'F14', 'F4', 'F27', 'F28'],
    cards: [
      { id: 'inbox', t: 'Caixa de entrada multiatendente', d: 'Fila e “minhas” conversas, assumir e liberar, com mensagens chegando em tempo real.', ev: ['F1'], size: 'wide' },
      { id: 'kanban', t: 'Pipeline em kanban', d: 'Arraste os negócios entre as etapas e acompanhe o valor de cada cartão.', ev: ['F7'], size: 'wide' },
      { id: 'ai', t: 'Agente de IA que passa para uma pessoa', d: 'Responde e transfere ao atendente quando o cliente pede, quando a IA falha em sequência ou por regra de valor.', ev: ['F3'], size: 'tall' },
      { id: 'auto', t: 'Automações por etapa', d: 'Ao entrar na etapa ou após dias parado: enviar template, notificar o atendente ou agendar lembrete.', ev: ['F12'], size: 'std' },
      { id: 'reports', t: 'Relatórios com exportação', d: 'Funil, atendimento e custo de IA, com exportação em CSV e planilha.', ev: ['F14', 'F15'], size: 'std' },
      { id: 'lead', t: 'Do chat ao negócio', d: 'A IA extrai nome, telefone, e-mail, orçamento e interesse, e cria ou atualiza o negócio com um limiar de confiança.', ev: ['F5', 'F6'], size: 'std' },
      { id: 'audio', t: 'Transcrição de áudio', d: 'Áudios recebidos viram texto pelo provedor que você configurar.', ev: ['F4'], size: 'small' },
      { id: 'team', t: 'Perfis de admin e agente', d: 'Cada pessoa vê o que o seu papel permite.', ev: ['F27'], size: 'small' },
      { id: 'theme', t: 'Tema claro e escuro', d: 'Alterna e lembra a sua escolha.', ev: ['F28'], size: 'small' },
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
    privacy: 'Seu banco de dados e seus arquivos ficam no servidor da sua empresa. Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta.',
    privacyEv: ['S3.1'],
    shotAlt: 'Tela de Chaves de IA: agente de conversa e transcrição de áudio com provedor, modelo e chave configurada.',
  },

  showcase: [
    {
      id: 'pipeline', ev: ['F7', 'F8', 'F9'], eyebrow: 'Pipeline', title: 'Um funil que você desenha e acompanha.',
      d: 'Crie as etapas do seu processo, arraste os negócios e veja o histórico de cada movimentação.',
      bullets: [
        { t: 'Etapas configuráveis: abertas, ganhas e perdidas.', ev: ['F8'] },
        { t: 'Arraste e solte entre etapas.', ev: ['F7'] },
        { t: 'Histórico de movimentação com data e autoria.', ev: ['F9'] },
      ],
      shot: 'pipeline', alt: 'Quadro kanban do Pipeline com colunas Novo lead, Em atendimento, Proposta enviada e Negociação.',
    },
    {
      id: 'inbox', ev: ['F1'], eyebrow: 'Conversas', title: 'Uma fila para a equipe, no mesmo painel.',
      d: 'Veja a fila, assuma uma conversa, devolva quando terminar e responda sem sair da tela.',
      bullets: [
        { t: 'Fila e “minhas” conversas, com assumir e liberar.', ev: ['F1'] },
        { t: 'Atualização em tempo real.', ev: ['F1'] },
      ],
      shot: 'inbox', alt: 'Tela de Conversas com fila, lista de conversas e janela de chat.',
    },
    {
      id: 'automacoes', ev: ['F12'], eyebrow: 'Automações', title: 'Quando o negócio muda de etapa, o sistema age.',
      d: 'Defina o gatilho e a ação para cada etapa do funil.',
      bullets: [
        { t: 'Gatilhos: ao entrar na etapa ou após X dias parado.', ev: ['F12'] },
        { t: 'Ações: enviar template de WhatsApp, notificar o atendente, agendar lembrete.', ev: ['F12'] },
        { t: 'Liga e desliga cada automação.', ev: ['F12'] },
      ],
      shot: 'automacoes', alt: 'Lista de automações por etapa com gatilho, ação e status.',
    },
    {
      id: 'relatorios', ev: ['F14', 'F15'], eyebrow: 'Relatórios', title: 'Funil, atendimento e custo de IA em números.',
      d: 'Escolha o período e exporte quando precisar.',
      bullets: [
        { t: 'Conversão, valor fechado e em aberto, tempo parado por etapa.', ev: ['F14'] },
        { t: 'Conversas resolvidas pela IA, transferidas e tempo de primeira resposta.', ev: ['F14'] },
        { t: 'Exportação em CSV e planilha.', ev: ['F15'] },
      ],
      shot: 'analytics', alt: 'Painel Deals por estágio dos Relatórios, com a contagem de negócios em cada etapa do funil.',
    },
  ],

  ownership: {
    id: 'seus-dados',
    eyebrow: 'Seu servidor, seus dados',
    title: 'Uma instalação por empresa.',
    lead: 'O ConversIA roda em um servidor Linux da sua empresa, com banco e fila próprios dentro do Docker.',
    ev: ['S3.1', 'S4'],
    items: [
      { t: 'Instalação dedicada', d: 'Uma empresa, um projeto Docker Compose, com configuração, volumes e porta próprios.', ev: ['S3.1'] },
      { t: 'Banco e fila fechados', d: 'MariaDB e Redis ficam na rede interna. No firewall, só as portas 22, 80 e 443.', ev: ['S3.1', 'S4'] },
      { t: 'Licença verificada localmente', d: 'A ativação e a verificação da licença não dependem de um servidor de licenças.', ev: ['S3.4'] },
      { t: 'Licença presa ao IP fixo', d: 'A licença é vinculada ao IP fixo do servidor. Trocar de IP ou de servidor exige nova emissão.', ev: ['S3.4', 'S4'] },
      { t: 'Credenciais criptografadas', d: 'Chaves de IA e credenciais gravadas no banco com AES-256-GCM.', ev: ['S3.1'] },
      { t: 'Webhook da Meta com assinatura', d: 'Os eventos do WhatsApp são aceitos só com assinatura HMAC válida.', ev: ['S5'] },
    ],
    privacy: 'Seu banco de dados e seus arquivos ficam no servidor da sua empresa. Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta.',
  },

  how: {
    id: 'como-funciona',
    eyebrow: 'Como funciona',
    title: 'Da compra ao primeiro atendimento.',
    ev: ['S4'],
    steps: [
      { t: 'Comprar', d: 'Escolha a licença e finalize a compra.', ev: ['FRAME'] },
      { t: 'Receber', d: 'Você recebe o produto instalável e a licença da sua instalação.', ev: ['S3.4'] },
      { t: 'Instalar', d: 'Suba com Docker Compose na sua VPS, crie o admin e ative a licença no painel.', ev: ['S4'] },
      { t: 'Conectar', d: 'Cadastre o WhatsApp oficial e a chave do provedor de IA em Integrações e Chaves de IA.', ev: ['S4', 'S5'] },
    ],
  },

  requirements: {
    id: 'requisitos',
    eyebrow: 'Requisitos técnicos',
    title: 'O que o seu servidor precisa ter.',
    lead: 'A instalação usa Docker e linha de comando em Linux.',
    ev: ['S4'],
    rows: [
      ['Sistema', 'VPS Linux: Ubuntu 22.04 ou mais novo, ou Debian 12 ou mais novo'],
      ['Capacidade mínima', '2 vCPU e 4 GB de RAM'],
      ['Rede', 'IP fixo (reservado pelo provedor) e um domínio apontando para a VPS'],
      ['Docker', 'Docker Engine e Docker Compose v2'],
      ['HTTPS', 'Proxy com TLS no servidor (exemplo com Caddy incluso)'],
      ['Firewall', 'Portas 22, 80 e 443. Banco, Redis e API não são publicados'],
      ['WhatsApp', 'Conta Meta Business verificada para a API oficial'],
      ['IA', 'Chave de API do provedor escolhido, cadastrada no painel'],
      ['Licença', 'Vinculada ao IP fixo informado na instalação'],
    ],
    footnote: 'Não publicamos números de desempenho nem de capacidade por servidor: eles ainda não foram medidos em produção.',
    footnoteEv: ['S4'],
  },

  pricing: {
    id: 'precos',
    eyebrow: 'Preço',
    title: 'Licença para a sua instalação.',
    lead: 'Valores, forma de pagamento e garantia são definidos pela empresa antes da publicação.',
  },

  faq: {
    id: 'faq',
    eyebrow: 'Perguntas frequentes',
    title: 'O que perguntam antes de instalar.',
    items: [
      { q: 'Preciso saber Docker e Linux?', a: 'Sim. A instalação é feita por linha de comando em um servidor Linux com Docker Compose. ', ev: ['S4'], extra: 'install' },
      { q: 'A licença funciona em qualquer servidor?', a: 'A licença é vinculada ao IP fixo do servidor. Se o IP ou o servidor mudar, é preciso emitir uma nova licença. ', ev: ['S3.4', 'S4'], extra: 'reissue' },
      { q: 'Meus dados ficam no meu servidor?', a: 'Seu banco de dados e seus arquivos ficam no servidor da sua empresa. Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta.', ev: ['S3.1'] },
      { q: 'Quanto custa a IA?', a: 'O consumo é cobrado pelo provedor que você escolher, com a sua chave. O painel mostra tokens e custo estimado por função e por dia.', ev: ['F16', 'F18a'] },
      { q: 'Preciso de conta na Meta?', a: 'Sim. A conexão usa a API oficial do WhatsApp e exige uma conta Meta Business verificada.', ev: ['S5', 'S4'] },
      { q: 'A IA responde tudo sozinha?', a: 'Não. O agente responde e transfere para a equipe quando o cliente pede um atendente, quando a IA falha em sequência ou por regra de valor do negócio. A qualidade das respostas depende do modelo que você configurar.', ev: ['F3'] },
      { q: 'Que servidor eu preciso?', a: 'No mínimo 2 vCPU e 4 GB de RAM, com IP fixo. Ainda não medimos capacidade em produção, então não há promessa de volume de conversas por servidor.', ev: ['S4'] },
      { q: 'E as atualizações?', a: 'As migrações do banco rodam sozinhas ao subir uma nova versão. A política de atualizações e de suporte é definida na contratação. ', ev: ['S4'], extra: 'updates' },
    ],
  },

  finalCta: {
    title: 'Coloque o atendimento e o funil no seu servidor.',
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
    title: `${S.name}: CRM de WhatsApp com IA instalado no seu servidor`,
    description: 'CRM de WhatsApp com caixa de entrada multiatendente, pipeline kanban, automações por etapa, relatórios e agente de IA com as suas chaves. Produto instalável no seu servidor.',
    ogAlt: `${S.name}: CRM de WhatsApp com IA instalado no seu servidor`,
  },
});
