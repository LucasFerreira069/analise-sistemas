class SemDesconto {
  calcular(pedido) { return 0; }
}

class DescontoPorTotal {
  calcular(pedido) {
    const config = AppConfig.getInstance();
    const total  = pedido.getTotal();
    if (total >= config.descontoAPartirDe) return total * config.descontoPorcentagem;
    return 0;
  }
}

class FretePorTotal {
  calcular(pedido) {
    const config = AppConfig.getInstance();
    return pedido.getTotal() >= config.freteGratisPartirDe ? 0 : 8.00;
  }
}

class DescontoService {
  constructor(estrategia = new DescontoPorTotal()) {
    this.estrategia = estrategia;
  }
  setEstrategia(e) { this.estrategia = e; }
  calcular(pedido) { return this.estrategia.calcular(pedido); }
}