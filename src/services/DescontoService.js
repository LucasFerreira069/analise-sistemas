class SemDesconto {
  calcular(pedido) { return 0; }
}

class DescontoPorTotal {
  calcular(pedido) {
    const total = pedido.getTotal();
    if (total >= 100) return total * 0.10; // 10% acima de R$100
    return 0;
  }
}

/* ── SERVIÇO DE DESCONTO ── */

class DescontoService {
  constructor(estrategia = new DescontoPorTotal()) {
    this.estrategia = estrategia;
  }

  setEstrategia(estrategia) {
    this.estrategia = estrategia;
  }

  calcular(pedido) {
    return this.estrategia.calcular(pedido);
  }
}