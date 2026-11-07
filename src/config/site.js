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

  // Precos e garantia. NENHUM valor e inventado: null mostra "A definir".
  // price: numero (em reais) ou null. billing: texto livre ('pagamento unico', 'por instalacao'...).
  pricing: {
    currency: 'BRL',
    plans: [
      { id: 'instalacao', name: 'Licença por instalação', price: null, billing: '[MODELO COMERCIAL A DEFINIR]', highlight: true,
        features: ['Produto instalável no servidor da sua empresa', 'Licença vinculada ao IP fixo do servidor', 'Todas as telas e recursos listados nesta página'] },
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
