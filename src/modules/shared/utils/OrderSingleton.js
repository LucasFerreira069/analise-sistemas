class OrderSingleton {
  static instancia = null;

  static getInstance() {
    if (!OrderSingleton.instancia) {
      OrderSingleton.instancia = new Pedido();
    }
    return OrderSingleton.instancia;
  }

  static resetar() {
    OrderSingleton.instancia = null;
  }
}