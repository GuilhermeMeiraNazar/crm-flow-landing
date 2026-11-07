// Conteudo da pagina. Cada afirmacao carrega `ev` = ids de evidencia que apontam para CONTEUDO.md.
// Convencao dos ids:
//   F<n>   = linha n da tabela de funcionalidades (CONTEUDO.md, secao 2; classe final na secao 9.3)
//   S<x.y> = secao x.y de CONTEUDO.md (S3.1, S3.2, S3.4, S4, S5)
//   9.5    = item B marcado para revisao do dono
//   FRAME  = enquadramento editorial, sem afirmacao factual sobre o produto
// `review: true` = classe B: redacao conservadora, depende da aprovacao do dono.
// Nenhum texto menciona KB/RAG, PIX, calendario, Baileys, Click-to-WhatsApp. Modelo de entrega: hospedado no servidor do dono (definido pelo dono, ev FRAME); a pagina nao fala em instalar no servidor do cliente.

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
    eyebrow: 'CRM de WhatsApp com IA',
    h1: 'Atendimento e funil de vendas no WhatsApp, com IA, sem instalar nada.',
    sub: 'Caixa de entrada para a equipe, funil de vendas em kanban, automações por etapa e relatórios. Nós colocamos tudo no ar no nosso servidor e você acessa pelo navegador.',
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
    privacy: 'Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta.',
    privacyEv: ['S5'],
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

  how: {
    id: 'como-funciona',
    eyebrow: 'Como funciona',
    title: 'Da contratação ao primeiro atendimento.',
    ev: ['S4'],
    steps: [
      { t: 'Escolher o pacote', d: 'Compare Básico, Médio e Premium e fale com a gente.', ev: ['FRAME'] },
      { t: 'Implantação', d: 'Colocamos o ConversIA da sua empresa no ar no nosso servidor, com a taxa única de implantação.', ev: ['FRAME'] },
      { t: 'Acessar', d: 'Sua equipe entra pelo navegador, com perfis de admin e de agente.', ev: ['F27'] },
      { t: 'Conectar', d: 'Cadastre o WhatsApp oficial e a chave do provedor de IA em Integrações e Chaves de IA.', ev: ['S4', 'S5'] },
    ],
  },

  pricing: {
    id: 'precos',
    eyebrow: 'Planos',
    title: 'Escolha o pacote para o seu atendimento.',
    lead: 'A implantação custa o mesmo valor em todos os pacotes e é cobrada uma vez. A mensalidade muda conforme o pacote, e cada um inclui tudo o que está no anterior.',
    leadEv: ['F1', 'F3', 'F16'],
    common: 'Todos os pacotes incluem o CRM de WhatsApp com agente de IA que usa as chaves do próprio cliente.',
    labels: { setup: 'Implantação', setupNote: 'taxa única', monthly: 'por mês', support: 'Suporte', includes: 'Inclui tudo do', plus: 'e mais:', first: 'O que está incluso:' },
    carousel: { region: 'Pacotes e valores', prev: 'Pacote anterior', next: 'Próximo pacote', goto: 'Ver' },
    // O que cada pacote inclui. Só entra o que tem evidência em CONTEUDO.md.
    plans: {
      basico: {
        tagline: 'Para pequenas empresas que precisam organizar o atendimento e os leads no funil de vendas.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'CRM de WhatsApp: contatos e conversas em uma caixa de entrada para a equipe.', ev: ['F1', 'F11'] },
          { t: 'IA de atendimento e triagem: responde as conversas e passa para uma pessoa quando necessário.', ev: ['F3'] },
          { t: 'Dados do lead no funil: nome, telefone, e-mail, orçamento e interesse extraídos da conversa.', ev: ['F5', 'F6'] },
          { t: 'Pipeline kanban e relatórios de funil, atendimento e custo de IA.', ev: ['F7', 'F14'] },
        ],
      },
      medio: {
        tagline: 'Para empresas em crescimento que querem mais robustez na IA e suporte com resposta mais rápida.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Cadeia de reserva entre provedores de IA: se o primeiro falhar, outro assume a resposta.', ev: ['F17'] },
        ],
      },
      premium: {
        tagline: 'Para operações consolidadas que querem atendimento VIP e a plataforma com a cara da empresa.',
        taglineEv: ['FRAME'],
        features: [
          { t: 'Adaptação da paleta de cores da plataforma à identidade da empresa (setup semi-personalizado).', ev: ['S7'] },
        ],
      },
    },
  },

  faq: {
    id: 'faq',
    eyebrow: 'Perguntas frequentes',
    title: 'O que perguntam antes de contratar.',
    items: [
      { q: 'Preciso instalar alguma coisa?', a: 'Não. O ConversIA roda no nosso servidor e a sua equipe acessa pelo navegador.', ev: ['FRAME'] },
      { q: 'Para onde vão as conversas?', a: 'Com a IA ativa, o texto das conversas é enviado ao provedor de LLM que você escolher, e o WhatsApp trafega pela Meta.', ev: ['S5'] },
      { q: 'Quanto custa a IA?', a: 'O consumo é cobrado pelo provedor que você escolher, com a sua chave. O painel mostra tokens e custo estimado por função e por dia.', ev: ['F16', 'F18a'] },
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
    title: `${S.name}: CRM de WhatsApp com IA, sem instalar nada`,
    description: 'CRM de WhatsApp com caixa de entrada multiatendente, pipeline kanban, automações por etapa, relatórios e agente de IA com as suas chaves. Hospedado no nosso servidor.',
    ogAlt: `${S.name}: CRM de WhatsApp com IA, sem instalar nada`,
  },
});
