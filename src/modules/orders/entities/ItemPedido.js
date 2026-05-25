class ItemPedido {
  constructor(produto) {
    this.produto    = produto;
    this.quantidade = 1;
  }

  incrementar() { this.quantidade++; }
  decrementar() { this.quantidade--; }

  getSubtotal() {
    return this.produto.preco * this.quantidade;
  }
}