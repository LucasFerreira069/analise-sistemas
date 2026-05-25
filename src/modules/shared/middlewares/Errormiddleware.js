class ErrorMiddleware {

  /* Trata qualquer erro do sistema */
  static tratar(erro) {
    LogMiddleware.registrar('ERRO', { mensagem: erro.message });

    const mensagensAmigaveis = {
      'O pedido deve ter pelo menos um item.': 'Adicione pelo menos um item ao carrinho antes de finalizar.',
      'Informe o valor do troco.':             'Por favor, informe para quanto deseja o troco.',
      'Preencha todos os campos obrigatórios.':'Existem campos obrigatórios não preenchidos.',
      'Usuário não identificado. Preencha nome e telefone.': 'Informe seu nome e telefone para continuar.'
    };

    const mensagem = mensagensAmigaveis[erro.message] || erro.message;
    alert(mensagem);
  }

  /* Captura erros globais não tratados */
  static iniciar() {
    window.addEventListener('error', (event) => {
      LogMiddleware.registrar('ERRO_GLOBAL', { mensagem: event.message });
    });

    window.addEventListener('unhandledrejection', (event) => {
      LogMiddleware.registrar('ERRO_PROMISE', { mensagem: event.reason });
    });
  }
}