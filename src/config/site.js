// Configuracao unica da landing. Edite SOMENTE este arquivo para trocar nome, contatos, precos e CTA.
// Valores marcados como PLACEHOLDER devem ser preenchidos pelo dono antes de publicar.

export const SITE = {
  // Marca provisoria (aprovada como provisoria). Troque aqui para renomear toda a pagina.
  name: 'ConversIA',
  tagline: 'CRM · WhatsApp · IA',
  monogram: 'C',
  // Dominio publico da landing (usado em canonical, Open Graph, sitemap e robots). PLACEHOLDER.
  domain: 'https://conversia.example',
  locale: 'pt-BR',

  // CTA primario. PLACEHOLDER: URL de checkout, formulario ou agenda.
  CTA_URL: 'https://conversia.example/comprar',
  ctaPrimaryLabel: 'Falar com a equipe',
  // CTA secundario: ancora interna.
  ctaSecondaryLabel: 'Ver planos',
  ctaSecondaryHref: '#precos',

  // Contatos. PLACEHOLDER.
  contactEmail: 'contato@conversia.example',
  // So digitos, com DDI. Ex.: 5511900000000. Deixe '' para ocultar o link de WhatsApp.
  contactWhatsapp: '5511900000000',
  whatsappMessage: 'Olá! Quero falar com a equipe sobre o ConversIA.',

  // Razao social / CNPJ para o rodape e paginas legais. PLACEHOLDER.
  company: { legalName: '[RAZAO SOCIAL]', cnpj: '[CNPJ]', address: '[ENDERECO]' },

  // Planos e valores (definidos pelo dono). Valores em reais.
  //   line    = 'hosted' (hospedado no servidor do dono) ou 'self' (no servidor do cliente)
  //   setup   = taxa de implantacao, cobrada uma unica vez (numero > 0)
  //   monthly = mensalidade (numero >= 0; 0 = sem mensalidade)
  //   highlight = destaca o cartao (carro-chefe)
  // O texto de cada plano (descricao e o que inclui) fica em src/content/pt-BR.js, com evidencia.
  pricing: {
    currency: 'BRL',
    plans: [
      { id: 'hosted-basico', line: 'hosted', name: 'Básico', tier: 'Hosted Básico', setup: 1500, monthly: 250, highlight: false },
      { id: 'hosted-intermediario', line: 'hosted', name: 'Intermediário', tier: 'Hosted Intermediário', setup: 1500, monthly: 400, highlight: true },
      { id: 'hosted-avancado', line: 'hosted', name: 'Avançado', tier: 'Hosted Avançado', setup: 1500, monthly: 600, highlight: false },
      { id: 'hosted-byok', line: 'hosted', name: 'Chave própria', tier: 'Hosted BYOK', setup: 1500, monthly: 150, highlight: false },
      { id: 'self-sem-suporte', line: 'self', name: 'Sem suporte', tier: 'Self-Hosted', setup: 3500, monthly: 0, highlight: false },
      { id: 'self-com-suporte', line: 'self', name: 'Com suporte', tier: 'Self-Hosted + Suporte', setup: 3000, monthly: 150, highlight: false },
    ],
    // Servicos de aceleracao (opcionais), valor em reais. Unidade e prazos ficam no texto (src/content/pt-BR.js).
    services: [
      { id: 'landing', price: 997 },
      { id: 'consultoria', price: 497 },
      { id: 'gestao', price: 1200 },
    ],
    // Texto de garantia/reembolso. PLACEHOLDER: preencha apos revisao juridica.
    guarantee: '[GARANTIA E PRAZO DE ARREPENDIMENTO A DEFINIR COM ADVOGADO]',
  },

  // Recursos anunciados na pagina que o dono declarou para o dia 1 e que NAO tem evidencia no CRM analisado.
  // A trava bloqueia a publicacao enquanto algum estiver "false". Mude para true somente depois de o recurso estar no ar.
  launchChecklist: { consultorDigital: false },
  // Analytics: desligado por padrao e sem rastreadores de terceiros.
  // Para ligar um analytics sem cookies (ex.: Plausible), informe provider, domain e src.
  analytics: { enabled: false, provider: null, dataDomain: '', src: '' },

  // Rascunho juridico: exibe a marca "revisar com advogado" nas paginas legais.
  legalDraft: true,
  legalUpdatedAt: '[DATA]',
};

export const absoluteUrl = (path = '/') => `${SITE.domain.replace(/\/$/, '')}${path}`;
// Link do WhatsApp (https://wa.me) com mensagem pre-preenchida. Sem numero configurado, devolve null.
export const whatsappHref = (message) =>
  SITE.contactWhatsapp ? `https://wa.me/${SITE.contactWhatsapp}?text=${encodeURIComponent(message || SITE.whatsappMessage)}` : null;
// CTA primario: WhatsApp quando houver numero; senao a URL de compra/contato (CTA_URL).
export const ctaHref = (message) => whatsappHref(message) || SITE.CTA_URL;
// Telefone legivel para o rodape: 5511900000000 -> +55 (11) 90000-0000.
export const phoneLabel = () => {
  const d = String(SITE.contactWhatsapp || '').replace(/\D/g, '');
  return d.length >= 12 ? `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, d.length - 4)}-${d.slice(-4)}` : d;
};
