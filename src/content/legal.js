// RASCUNHOS de textos legais. Nao constituem aconselhamento juridico e nao afirmam conformidade com nenhuma norma.
// Todo trecho entre colchetes e placeholder a ser decidido pelo dono com advogado.

export const legal = (S) => {
  const co = `${S.company.legalName}, CNPJ ${S.company.cnpj}`;
  return {
    termos: {
      title: 'Termos de uso',
      intro: `Estes termos regulam a contratação da licença do ${S.name} oferecida por ${co}.`,
      sections: [
        { h: '1. Objeto', p: [`A licença permite instalar e usar o ${S.name} no servidor indicado pelo contratante, para uso interno da empresa contratante.`, '[ESCOPO DA LICENCA: por instancia, por CNPJ, numero de usuarios. DEFINIR COM ADVOGADO.]'] },
        { h: '2. Vínculo da licença ao IP', p: ['A licença é emitida para um endereço IP fixo informado pelo contratante. A troca de IP ou de servidor exige a emissão de uma nova licença.', `Política de reemissão: ${S.pricing.reissuePolicy}`] },
        { h: '3. Entrega e instalação', p: ['O contratante recebe o produto instalável e a licença. A instalação é feita pelo contratante, em servidor Linux com Docker, conforme os requisitos publicados na página.', '[MODELO DE ENTREGA: CONFIRMAR PELO DONO. SERVICO DE INSTALACAO ASSISTIDA, SE HOUVER.]'] },
        { h: '4. Serviços de terceiros', p: ['O produto se conecta a serviços de terceiros escolhidos pelo contratante, como a API oficial do WhatsApp (Meta) e provedores de modelos de linguagem (OpenAI, Gemini, Claude, Groq). Contas, chaves, custos e termos desses serviços são de responsabilidade do contratante.', 'Com a IA ativa, o texto das conversas é enviado ao provedor de LLM escolhido pelo contratante, e o WhatsApp trafega pela Meta.'] },
        { h: '5. Responsabilidades do contratante', p: ['Manter o servidor, o backup, a segurança do acesso e as credenciais. Guardar uma cópia segura da chave de criptografia usada pela instalação: sem ela, as credenciais gravadas no banco não podem ser recuperadas.', 'Usar o produto em conformidade com a lei e com as regras do WhatsApp e dos demais serviços conectados.'] },
        { h: '6. Atualizações e suporte', p: ['[POLITICA DE ATUALIZACOES E SUPORTE: prazo, canais, horarios, escopo. DEFINIR.]'] },
        { h: '7. Limitação de responsabilidade', p: ['[CLAUSULA DE LIMITACAO DE RESPONSABILIDADE. DEFINIR COM ADVOGADO.]'] },
        { h: '8. Preço, pagamento e reembolso', p: [`Preço e forma de pagamento: ${S.pricing.plans[0].billing}.`, 'Reembolso e arrependimento: veja a página de Reembolso.'] },
        { h: '9. Foro e lei aplicável', p: ['[FORO E LEI APLICAVEL. DEFINIR COM ADVOGADO.]'] },
      ],
    },
    privacidade: {
      title: 'Política de privacidade',
      intro: `Esta política descreve como este site trata dados pessoais. O responsável por este site é ${co}.`,
      sections: [
        { h: '1. Este site', p: ['Este site não usa cookies de rastreamento nem ferramentas de analytics de terceiros por padrão.', 'Se a empresa ativar uma ferramenta de métricas sem cookies, esta política deve ser atualizada para citar a ferramenta, os dados coletados e a finalidade. [ATUALIZAR SE ATIVAR ANALYTICS.]', 'O site guarda no navegador apenas a sua preferência de tema claro ou escuro.'] },
        { h: '2. Dados que você nos envia', p: [`Ao entrar em contato por e-mail (${S.contactEmail}) ou WhatsApp, recebemos os dados que você informar, como nome, telefone e mensagem, para responder ao seu contato.`, '[BASE LEGAL, PRAZO DE RETENCAO E COMPARTILHAMENTO COM O CANAL DE COMPRA. DEFINIR COM ADVOGADO.]'] },
        { h: '3. Compra', p: ['Os dados de pagamento e de cobrança são tratados pela plataforma de checkout indicada no botão de compra. [IDENTIFICAR A PLATAFORMA E O PAPEL DE CADA PARTE.]'] },
        { h: '4. O produto ConversIA instalado', p: ['Quando instalado, o produto roda no servidor do contratante. Os dados de clientes finais tratados pelo produto ficam sob responsabilidade do contratante. [DEFINIR PAPEIS DE CONTROLADOR E OPERADOR COM ADVOGADO.]'] },
        { h: '5. Direitos do titular', p: [`Para exercer direitos previstos na Lei Geral de Proteção de Dados (Lei 13.709/2018), escreva para ${S.contactEmail}. [DEFINIR ENCARREGADO E PRAZOS.]`] },
      ],
    },
    reembolso: {
      title: 'Política de reembolso e arrependimento',
      intro: `Esta política trata do cancelamento e do reembolso da licença do ${S.name}.`,
      sections: [
        { h: '1. Direito de arrependimento', p: ['Compras feitas fora do estabelecimento comercial, como as feitas pela internet, podem ter prazo de arrependimento previsto no Código de Defesa do Consumidor (art. 49). [CONFIRMAR COM ADVOGADO SE E COMO SE APLICA AO PRODUTO E AO TIPO DE CLIENTE (PESSOA FISICA OU EMPRESA), E O MOMENTO EM QUE O PRAZO COMECA.]'] },
        { h: '2. Como solicitar', p: [`Envie o pedido para ${S.contactEmail} informando os dados da compra. [PRAZO DE RESPOSTA E FORMA DE DEVOLUCAO. DEFINIR.]`] },
        { h: '3. Licença já ativada', p: ['[EFEITO DA ATIVACAO DA LICENCA SOBRE O REEMBOLSO E REVOGACAO DA LICENCA. DEFINIR COM ADVOGADO.]'] },
        { h: '4. Garantia', p: [S.pricing.guarantee] },
      ],
    },
  };
};
