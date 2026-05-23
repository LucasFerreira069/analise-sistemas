
class PedidoSingleton {
  static instancia = null;

  static getInstance() {
    if (!PedidoSingleton.instancia) {
      const repo = new PedidoRepository();
      PedidoSingleton.instancia = repo.carregar();
    }
    return PedidoSingleton.instancia;
  }

  static resetar() {
    PedidoSingleton.instancia = null;
  }
}