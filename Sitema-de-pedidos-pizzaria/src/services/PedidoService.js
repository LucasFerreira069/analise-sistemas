class FreteGratis {
  calcular(pedido) { return 0; }
}

class FretePorTotal {
  calcular(pedido) {
    return pedido.getTotal() >= 80 ? 0 : 8.00;
  }
}

class FretePorDistancia {
  constructor(distanciaKm) { this.distanciaKm = distanciaKm; }
  calcular(pedido) { return this.distanciaKm * 0.50; }
}

/* ── ESTRATÉGIAS DE PAGAMENTO ── */

class PagamentoDinheiro {
  processar(pedido, troco) {
    if (!troco || parseFloat(troco) <= 0) {
      throw new Error('Informe o valor do troco.');
    }
    return { metodo: 'Dinheiro', troco: parseFloat(troco) };
  }
}

class PagamentoCartao {
  processar(pedido) {
    return { metodo: 'Cartão na entrega' };
  }
}

class PagamentoPix {
  processar(pedido) {
    return { metodo: 'PIX', chave: '(00) 00000-0000' };
  }
}

/* ── SERVIÇO DO PEDIDO ── */

class PedidoService {
  constructor(
    estrategiaFrete     = new FretePorTotal(),
    estrategiaPagamento = new PagamentoPix(),
    descontoService     = new DescontoService()
  ) {
    this.estrategiaFrete     = estrategiaFrete;
    this.estrategiaPagamento = estrategiaPagamento;
    this.descontoService     = descontoService;
  }

  /* ── FRETE ── */
  setEstrategiaFrete(estrategia) { this.estrategiaFrete = estrategia; }
  calcularFrete(pedido) { return this.estrategiaFrete.calcular(pedido); }

  /* ── PAGAMENTO ── */
  setEstrategiaPagamento(estrategia) { this.estrategiaPagamento = estrategia; }
  processarPagamento(pedido, troco = null) {
    return this.estrategiaPagamento.processar(pedido, troco);
  }

  /* ── DESCONTO ── */
  calcularDesconto(pedido) { return this.descontoService.calcular(pedido); }

  /* ── TOTAL FINAL ── */
  calcularTotalFinal(pedido) {
    const subtotal = pedido.getTotal();
    const desconto = this.calcularDesconto(pedido);
    const frete    = this.calcularFrete(pedido);
    return subtotal - desconto + frete;
  }

  /* ── VALIDAÇÃO ── */
  validarPedido(pedido) {
    if (pedido.itens.length === 0) {
      throw new Error('O pedido deve ter pelo menos um item.');
    }
    return true;
  }

  /* ── FINALIZAR ── */
  finalizarPedido(pedido) {
    this.validarPedido(pedido);
    pedido.status = 'confirmado';
    return pedido;
  }
}

/* ── SERVIÇO DE PRODUTOS ── */

class ProdutoService {
  static filtrarPorCategoria(produtos, categoria) {
    return produtos.filter(p => p.categoria === categoria);
  }

  static ordenarPorPreco(produtos, ordem = 'asc') {
    return [...produtos].sort((a, b) =>
      ordem === 'asc' ? a.preco - b.preco : b.preco - a.preco
    );
  }

  static ordenarPorAvaliacao(produtos) {
    return [...produtos].sort((a, b) => b.avaliacao - a.avaliacao);
  }

  static buscar(produtos, termo) {
    return produtos.filter(p =>
      p.nome.toLowerCase().includes(termo.toLowerCase()) ||
      p.descricao.toLowerCase().includes(termo.toLowerCase())
    );
  }

  static validarProduto(produto) {
    if (!produto.nome || produto.nome.trim() === '') {
      throw new Error('O produto deve ter um nome.');
    }
    if (!produto.preco || produto.preco <= 0) {
      throw new Error('O produto deve ter um preço válido.');
    }
    return true;
  }
}