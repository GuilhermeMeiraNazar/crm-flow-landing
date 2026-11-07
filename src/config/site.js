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
  ctaPrimaryLabel: 'Quero o ConversIA',
  // CTA secundario: ancora interna.
  ctaSecondaryLabel: 'Ver o produto',
  ctaSecondaryHref: '#produto',

  // Contatos. PLACEHOLDER.
  contactEmail: 'contato@conversia.example',
  // So digitos, com DDI. Ex.: 5511900000000. Deixe '' para ocultar o link de WhatsApp.
  contactWhatsapp: '5511900000000',
  whatsappMessage: 'Ola! Quero saber mais sobre o ConversIA.',

  // Razao social / CNPJ para o rodape e paginas legais. PLACEHOLDER.
  company: { legalName: '[RAZAO SOCIAL]', cnpj: '[CNPJ]', address: '[ENDERECO]' },

  // Pacotes e valores (definidos pelo dono). Valores em reais.
  //   setup   = taxa de implantacao (cobrada uma unica vez)
  //   monthly = mensalidade
  //   support = prazo de resposta do suporte (termo comercial do dono)
  // O texto de cada pacote (descricao e o que inclui) fica em src/content/pt-BR.js, com evidencia.
  // A ordem importa: cada pacote inclui tudo o que esta no anterior.
  pricing: {
    currency: 'BRL',
    plans: [
      { id: 'basico', name: 'Pacote Básico', tier: 'Starter', setup: 1500, monthly: 290, support: 'Atendimento em até 24 horas úteis', highlight: false },
      { id: 'medio', name: 'Pacote Médio', tier: 'Growth', setup: 2500, monthly: 590, support: 'Suporte prioritário, em até 6 horas úteis', highlight: true },
      { id: 'premium', name: 'Pacote Premium', tier: 'Enterprise', setup: 4000, monthly: 990, support: 'Suporte VIP dedicado, em até 2 horas úteis', highlight: false },
    ],
    // Texto de garantia/reembolso. PLACEHOLDER: preencha apos revisao juridica.
    guarantee: '[GARANTIA E PRAZO DE ARREPENDIMENTO A DEFINIR COM ADVOGADO]',
    // Politica de reemissao da licenca ao trocar de IP ou servidor. PLACEHOLDER.
    reissuePolicy: '[POLITICA DE REEMISSAO DE LICENCA A DEFINIR]',
    // Servico de instalacao assistida? null = nao anunciar.
    installService: null,
  },

  // Analytics: desligado por padrao e sem rastreadores de terceiros.
  // Para ligar um analytics sem cookies (ex.: Plausible), informe provider, domain e src.
  analytics: { enabled: false, provider: null, dataDomain: '', src: '' },

  // Rascunho juridico: exibe a marca "revisar com advogado" nas paginas legais.
  legalDraft: true,
  legalUpdatedAt: '[DATA]',
};

export const absoluteUrl = (path = '/') => `${SITE.domain.replace(/\/$/, '')}${path}`;
export const whatsappHref = () =>
  SITE.contactWhatsapp ? `https://wa.me/${SITE.contactWhatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}` : null;
