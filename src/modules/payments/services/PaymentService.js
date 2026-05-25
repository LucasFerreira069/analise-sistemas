class PagamentoDinheiro {
  processar(pedido, troco) {
    if (!troco || parseFloat(troco) <= 0) throw new Error('Informe o valor do troco.');
    return { metodo: 'Dinheiro', troco: parseFloat(troco) };
  }
}

class PagamentoCartao {
  processar(pedido) { return { metodo: 'Cartão na entrega' }; }
}

class PagamentoPix {
  processar(pedido) { return { metodo: 'PIX', chave: '(00) 00000-0000' }; }
}

/* ── SERVICE ── */
class PaymentService {
  constructor(estrategia = new PagamentoPix()) {
    this.estrategia = estrategia;
  }

  setEstrategia(estrategia) { this.estrategia = estrategia; }

  processar(pedido, troco = null) {
    return this.estrategia.processar(pedido, troco);
  }
}