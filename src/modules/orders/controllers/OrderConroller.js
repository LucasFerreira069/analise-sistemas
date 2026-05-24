class OrderController {
  constructor(view) {
    this.service    = new OrderService();
    this.repository = new OrderRepository();
    this.view       = view;
    this.observer   = new CarrinhoObserver(view);

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
    const produto = ProductFactory.criar(nome, preco, imagem);
    this.pedido.adicionarItem(produto);
  }

  removerItem(nome)         { this.pedido.removerItem(nome); }
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

  confirmarPedido(dados) {
    const { nome, telefone, cep, rua, numero, bairro } = dados;
    if (!nome || !telefone || !cep || !rua || !numero || !bairro) {
      throw new Error('Preencha todos os campos obrigatórios.');
    }
    const pagamento = PaymentController.processar(dados.metodoPagamento, this.pedido, dados.troco);
    this.service.finalizarPedido(this.pedido);
    return { pagamento, ...this.calcularTotais() };
  }

  limparPedido() {
    OrderSingleton.resetar();
    this.pedido = OrderSingleton.getInstance();
    this.repository.limpar();
  }
}