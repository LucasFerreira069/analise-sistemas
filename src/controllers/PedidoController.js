class PedidoController {

  constructor(pedidoView) {
    this.service    = new PedidoService();
    this.repository = new PedidoRepository();
    this.view       = pedidoView;
    this.observer   = new CarrinhoObserver(pedidoView);

    this.pedido = this.repository.carregar();

    this.pedido.on('carrinho:atualizado', (pedido) => {
      this.observer.atualizar(pedido);
      this.repository.salvar(pedido);
    });

    this.view.construirModal();
    this.view.atualizarBadge(this.pedido.getQuantidadeTotal());

    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', () => this.abrirCarrinho());
  }

  adicionarAoCarrinho(nome, preco, imagem) {
    const produto = ProdutoFactory.criar(nome, preco, imagem);
    this.pedido.adicionarItem(produto);
  }

  removerItem(nome) { this.pedido.removerItem(nome); }
  removerItemCompleto(nome) { this.pedido.removerItemCompleto(nome); }

  abrirCarrinho() {
    this.view.abrirModal();
    this.view.renderizarItens(this.pedido.itens, this.pedido.getTotal());
  }

  fecharCarrinho() { this.view.fecharModal(); }

  calcularTotais() {
    return {
      subtotal: this.pedido.getTotal(),
      desconto: this.service.calcularDesconto(this.pedido),
      frete:    this.service.calcularFrete(this.pedido),
      total:    this.service.calcularTotalFinal(this.pedido)
    };
  }

  selecionarPagamento(metodo) {
    if (metodo === 'dinheiro')    this.service.setEstrategiaPagamento(new PagamentoDinheiro());
    else if (metodo === 'cartao') this.service.setEstrategiaPagamento(new PagamentoCartao());
    else                          this.service.setEstrategiaPagamento(new PagamentoPix());
  }

  confirmarPedido(dadosFormulario) {
    const { nome, telefone, cep, rua, numero,
            bairro, complemento, referencia,
            obs, metodoPagamento, troco } = dadosFormulario;

    if (!nome || !telefone || !cep || !rua || !numero || !bairro) {
      throw new Error('Preencha todos os campos obrigatorios.');
    }

    this.selecionarPagamento(metodoPagamento);
    const pagamento = this.service.processarPagamento(this.pedido, troco);
    this.service.finalizarPedido(this.pedido);

    return {
      pagamento,
      total:    this.service.calcularTotalFinal(this.pedido),
      desconto: this.service.calcularDesconto(this.pedido),
      frete:    this.service.calcularFrete(this.pedido)
    };
  }

  limparPedido() {
    PedidoSingleton.resetar();
    this.pedido = PedidoSingleton.getInstance();
    this.repository.limpar();
  }
}