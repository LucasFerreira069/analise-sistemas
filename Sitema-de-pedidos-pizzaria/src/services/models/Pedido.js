class Pedido extends EventEmitter {
  constructor() {
    super();
    this.itens  = [];
    this.status = 'aberto';
  }

  adicionarItem(produto) {
    const existente = this.itens.find(i => i.produto.nome === produto.nome);
    if (existente) {
      existente.incrementar();
    } else {
      this.itens.push(new ItemPedido(produto));
    }
    /* Notifica todos os ouvintes que o pedido mudou */
    this.emit('carrinho:atualizado', this);
  }

  removerItem(nome) {
    const index = this.itens.findIndex(i => i.produto.nome === nome);
    if (index === -1) return;
    this.itens[index].decrementar();
    if (this.itens[index].quantidade <= 0) this.itens.splice(index, 1);
    this.emit('carrinho:atualizado', this);
  }

  removerItemCompleto(nome) {
    this.itens = this.itens.filter(i => i.produto.nome !== nome);
    this.emit('carrinho:atualizado', this);
  }

  getTotal() {
    return this.itens.reduce((soma, item) => soma + item.getSubtotal(), 0);
  }

  getQuantidadeTotal() {
    return this.itens.reduce((soma, item) => soma + item.quantidade, 0);
  }
}