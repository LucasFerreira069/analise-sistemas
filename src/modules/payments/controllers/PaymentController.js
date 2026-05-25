class PaymentController {
  static processar(metodo, pedido, troco = null) {
    const service = new PaymentService();

    if (metodo === 'dinheiro')    service.setEstrategia(new PagamentoDinheiro());
    else if (metodo === 'cartao') service.setEstrategia(new PagamentoCartao());
    else                          service.setEstrategia(new PagamentoPix());

    return service.processar(pedido, troco);
  }
}