class OrderRepository {
  constructor() {
    this.chave = 'pizzaCart';
  }

  salvar(pedido) {
    const dados = pedido.itens.map(item => ({
      nome:       item.produto.nome,
      preco:      item.produto.preco,
      imagem:     item.produto.imagem,
      categoria:  item.produto.categoria,
      descricao:  item.produto.descricao,
      quantidade: item.quantidade
    }));
    localStorage.setItem(this.chave, JSON.stringify(dados));
  }

  carregar() {
    const pedido = new Pedido();
    const dados  = JSON.parse(localStorage.getItem(this.chave)) || [];
    dados.forEach(d => {
      const produto   = ProductFactory.criar(d.nome, d.preco, d.imagem, d.categoria, d.descricao);
      const item      = new ItemPedido(produto);
      item.quantidade = d.quantidade;
      pedido.itens.push(item);
    });
    return pedido;
  }

  limpar() {
    localStorage.removeItem(this.chave);
  }
}