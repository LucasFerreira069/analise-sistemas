class ProductService {
  static filtrarPorCategoria(produtos, categoria) {
    return produtos.filter(p => p.categoria === categoria);
  }

  static ordenarPorPreco(produtos, ordem = 'asc') {
    return [...produtos].sort((a, b) =>
      ordem === 'asc' ? a.preco - b.preco : b.preco - a.preco
    );
  }

  static buscar(produtos, termo) {
    return produtos.filter(p =>
      p.nome.toLowerCase().includes(termo.toLowerCase()) ||
      p.descricao.toLowerCase().includes(termo.toLowerCase())
    );
  }

  static validar(produto) {
    if (!produto.nome || produto.nome.trim() === '') {
      throw new Error('Produto deve ter um nome.');
    }
    if (!produto.preco || produto.preco <= 0) {
      throw new Error('Produto deve ter um preço válido.');
    }
    return true;
  }
}