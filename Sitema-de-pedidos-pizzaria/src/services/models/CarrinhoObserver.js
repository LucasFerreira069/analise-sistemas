class CarrinhoObserver {

  /* Recebe a view como dependência */
  constructor(pedidoView) {
    this.pedidoView = pedidoView;
  }

  /* Chamado automaticamente quando o carrinho muda */
  atualizar(pedido) {
    this.pedidoView.atualizarBadge(pedido.getQuantidadeTotal());
    this.pedidoView.animarBadge();

    /* Se o modal estiver aberto, re-renderiza os itens */
    const modal = document.getElementById('cart-modal');
    if (modal && modal.classList.contains('open')) {
      this.pedidoView.renderizarItens(pedido.itens, pedido.getTotal());
    }
  }
}