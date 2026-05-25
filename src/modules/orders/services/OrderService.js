class OrderService {
  constructor(
    freteStrategy    = new FretePorTotal(),
    descontoService  = new DescontoService()
  ) {
    this.freteStrategy   = freteStrategy;
    this.descontoService = descontoService;
  }

  setFreteStrategy(strategy) { this.freteStrategy = strategy; }

  calcularFrete(pedido) {
    return this.freteStrategy.calcular(pedido);
  }

  calcularDesconto(pedido) {
    return this.descontoService.calcular(pedido);
  }

  calcularTotalFinal(pedido) {
    return pedido.getTotal() - this.calcularDesconto(pedido) + this.calcularFrete(pedido);
  }

  validarPedido(pedido) {
    if (pedido.itens.length === 0) {
      throw new Error('O pedido deve ter pelo menos um item.');
    }
    return true;
  }

  finalizarPedido(pedido) {
    this.validarPedido(pedido);
    pedido.status = 'confirmado';
    return pedido;
  }
}