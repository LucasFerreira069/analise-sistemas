class ProductController {
  constructor() {
    this.repository = new ProductRepository();
  }

  buscarTodos()              { return this.repository.buscarTodos(); }
  buscarCategorias()         { return this.repository.buscarCategorias(); }
  buscarPorCategoria(cat)    { return this.repository.buscarPorCategoria(cat); }

  buscar(termo) {
    return ProductService.buscar(this.repository.buscarTodos(), termo);
  }

  ordenarPorPreco(ordem) {
    return ProductService.ordenarPorPreco(this.repository.buscarTodos(), ordem);
  }
}