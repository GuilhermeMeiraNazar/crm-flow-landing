// RASCUNHOS de textos legais. Nao constituem aconselhamento juridico e nao afirmam conformidade com nenhuma norma.
// Todo trecho entre colchetes e placeholder a ser decidido pelo dono com advogado.

export const legal = (S) => {
  const co = `${S.company.legalName}, CNPJ ${S.company.cnpj}`;
  return {
    termos: {
      title: 'Termos de uso',
      intro: `Estes termos regulam a contratação do ${S.name} oferecida por ${co}.`,
      sections: [
        { h: '1. Objeto', p: [`O contrato dá direito de usar o ${S.name}, hospedado pelo fornecedor (planos hospedados) ou implantado no servidor do contratante (planos no seu servidor), para uso interno da empresa contratante.`, '[ESCOPO DA LICENCA: por instancia, por CNPJ, numero de usuarios. DEFINIR COM ADVOGADO.]'] },
        { h: '2. Planos hospedados', p: [`Nos planos hospedados, o ${S.name} roda em servidor operado por ${co}, e o contratante acessa pelo navegador.`, '[ESCOPO DA HOSPEDAGEM: disponibilidade, backup, localizacao dos dados, franquia de IA (o que conta como interacao e o que ocorre ao exceder), prazo de retencao ao encerrar o contrato. DEFINIR COM ADVOGADO.]'] },
        { h: '2.1 Planos no servidor do contratante', p: ['Nos planos no seu servidor, a licença é emitida para um endereço IP fixo informado pelo contratante. A troca de IP ou de servidor exige a emissão de uma nova licença. A instalação ocorre em servidor Linux com Docker, conforme os requisitos publicados na página de planos.', 'O plano sem suporte não inclui correção de bugs futuros, atualizações do sistema nem suporte técnico do dia a dia. O plano com suporte inclui atualizações do contêiner Docker, patches de segurança e suporte a dúvidas técnicas.', '[POLITICA DE REEMISSAO DE LICENCA E PRAZOS DE SUPORTE. DEFINIR.]'] },
        { h: '3. Implantação', p: ['A implantação é cobrada uma vez, com o valor do plano escolhido.', '[ESCOPO DA IMPLANTACAO: o que esta incluso e prazo de entrega. DEFINIR.]'] },
        { h: '4. Serviços de terceiros', p: ['O produto se conecta a serviços de terceiros escolhidos pelo contratante, como a API oficial do WhatsApp (Meta) e provedores de modelos de linguagem (OpenAI, Gemini, Claude, Groq). Contas, chaves, custos e termos desses serviços são de responsabilidade do contratante.', 'Com a IA ativa, o texto das conversas é enviado ao provedor de LLM escolhido pelo contratante, e o WhatsApp trafega pela Meta.'] },
        { h: '5. Responsabilidades do contratante', p: ['Manter a segurança das senhas e dos acessos da sua equipe e das credenciais dos serviços conectados. Nos planos no seu servidor, manter também o servidor, o backup e uma cópia segura da chave de criptografia usada pela instalação: sem ela, as credenciais gravadas no banco não podem ser recuperadas. [DIVISAO DE RESPONSABILIDADES COM O FORNECEDOR NOS PLANOS HOSPEDADOS. DEFINIR COM ADVOGADO.]', 'Usar o produto em conformidade com a lei e com as regras do WhatsApp e dos demais serviços conectados.'] },
        { h: '6. Atualizações e suporte', p: ['[POLITICA DE ATUALIZACOES E SUPORTE: prazo, canais, horarios, escopo. DEFINIR.]'] },
        { h: '7. Limitação de responsabilidade', p: ['[CLAUSULA DE LIMITACAO DE RESPONSABILIDADE. DEFINIR COM ADVOGADO.]'] },
        { h: '8. Preço, pagamento e reembolso', p: [`Preço e forma de pagamento: implantação única e mensalidade conforme o plano escolhido, como indicado na seção de planos.`, 'Serviços de aceleração (landing page, consultoria e gestão de tráfego): [ESCOPO, PRAZOS, REEMBOLSO E RESPONSABILIDADE SOBRE A VERBA DE ANUNCIOS, PAGA DIRETO AS PLATAFORMAS. DEFINIR COM ADVOGADO.]', 'Oferta de lançamento: primeira mensalidade isenta para os 20 primeiros clientes e bônus de 30 dias do Copiloto do Gestor para assinantes do Hosted Básico. [CONDICOES DA OFERTA: elegibilidade, prazo, planos abrangidos, o que ocorre ao fim do lote e a relacao com a Politica de Reembolso. O bonus do Copiloto depende do lancamento do modulo. DEFINIR COM ADVOGADO.]', 'Reembolso e arrependimento: veja a página de Reembolso.'] },
        { h: '9. Foro e lei aplicável', p: ['[FORO E LEI APLICAVEL. DEFINIR COM ADVOGADO.]'] },
      ],
    },
    privacidade: {
      title: 'Política de privacidade',
      intro: `Esta política descreve como este site trata dados pessoais. O responsável por este site é ${co}.`,
      sections: [
        { h: '1. Este site', p: ['Este site não usa cookies de rastreamento nem ferramentas de analytics de terceiros por padrão.', 'Se a empresa ativar uma ferramenta de métricas sem cookies, esta política deve ser atualizada para citar a ferramenta, os dados coletados e a finalidade. [ATUALIZAR SE ATIVAR ANALYTICS.]', 'O site guarda no navegador apenas a sua preferência de tema claro ou escuro.'] },
        { h: '2. Dados que você nos envia', p: [`Ao entrar em contato por e-mail (${S.contactEmail}) ou WhatsApp, recebemos os dados que você informar, como nome, telefone e mensagem, para responder ao seu contato.`, '[BASE LEGAL, PRAZO DE RETENCAO E COMPARTILHAMENTO COM O CANAL DE COMPRA. DEFINIR COM ADVOGADO.]'] },
        { h: '3. Compra', p: ['Os dados de pagamento da compra são tratados pela plataforma de checkout indicada no botão de compra. [IDENTIFICAR A PLATAFORMA E O PAPEL DE CADA PARTE.]'] },
        { h: '4. O produto ConversIA contratado', p: ['Nos planos hospedados, o produto roda em servidor do fornecedor; nos planos no seu servidor, roda no servidor do contratante. Os dados de clientes finais tratados pelo produto pertencem ao contratante. [DEFINIR PAPEIS DE CONTROLADOR E OPERADOR COM ADVOGADO.]'] },
        { h: '5. Direitos do titular', p: [`Para exercer direitos previstos na Lei Geral de Proteção de Dados (Lei 13.709/2018), escreva para ${S.contactEmail}. [DEFINIR ENCARREGADO E PRAZOS.]`] },
      ],
    },
    reembolso: {
      title: 'Política de reembolso e arrependimento',
      intro: `Esta política trata do cancelamento e do reembolso do ${S.name}.`,
      sections: [
        { h: '1. Direito de arrependimento', p: ['Compras feitas fora do estabelecimento comercial, como as feitas pela internet, podem ter prazo de arrependimento previsto no Código de Defesa do Consumidor (art. 49). [CONFIRMAR COM ADVOGADO SE E COMO SE APLICA AO PRODUTO E AO TIPO DE CLIENTE (PESSOA FISICA OU EMPRESA), E O MOMENTO EM QUE O PRAZO COMECA.]'] },
        { h: '2. Como solicitar', p: [`Envie o pedido para ${S.contactEmail} informando os dados da compra. [PRAZO DE RESPOSTA E FORMA DE DEVOLUCAO. DEFINIR.]`] },
        { h: '3. Serviço já implantado', p: ['[EFEITO DA IMPLANTACAO JA REALIZADA SOBRE O REEMBOLSO DA TAXA E DA MENSALIDADE. DEFINIR COM ADVOGADO.]'] },
        { h: '4. Garantia', p: [S.pricing.guarantee] },
      ],
    },
  };
};
