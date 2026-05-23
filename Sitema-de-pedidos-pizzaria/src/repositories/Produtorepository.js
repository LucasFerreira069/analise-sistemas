class ProdutoRepository {
  constructor() {
    this.produtos = [
      /* ── PIZZAS ── */
      ProdutoFactory.criar('Pizza Margherita',     49.90, 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Pizzas',     'Molho de tomate, mussarela, manjericão fresco e azeite'),
      ProdutoFactory.criar('Pizza Pepperoni',      54.90, 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Pizzas',     'Molho de tomate, mussarela e pepperoni premium'),
      ProdutoFactory.criar('Pizza Portuguesa',     52.90, 'https://images.unsplash.com/photo-1597715474989-9ae8683704b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Pizzas',     'Presunto, ovos, cebola, azeitonas, mussarela e orégano'),
      ProdutoFactory.criar('Frango com Catupiry',  51.90, 'https://images.unsplash.com/photo-1642789736356-d7122adfe91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Pizzas',     'Frango desfiado, catupiry original, milho e mussarela'),
      ProdutoFactory.criar('Pizza Calabresa',      48.90, 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Pizzas',     'Calabresa fatiada, cebola, mussarela e azeitonas'),
      ProdutoFactory.criar('Pizza Quatro Queijos', 56.90, 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Pizzas',     'Mussarela, provolone, parmesão, catupiry e orégano'),
      /* ── BEBIDAS ── */
      ProdutoFactory.criar('Coca-Cola 2L',         12.90, 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas',    'Refrigerante Coca-Cola gelado 2 litros'),
      ProdutoFactory.criar('Suco de Laranja',      10.90, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas',    'Suco natural de laranja 500ml'),
      ProdutoFactory.criar('Guaraná Antarctica 2L',11.90, 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Bebidas',    'Refrigerante Guaraná Antarctica gelado 2 litros'),
      /* ── PORÇÕES ── */
      ProdutoFactory.criar('Batata Frita Grande',  24.90, 'https://images.unsplash.com/photo-1682613886162-49f5e074c092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Porções',    'Porção generosa de batatas fritas crocantes'),
      ProdutoFactory.criar('Onion Rings',          22.90, 'https://images.unsplash.com/photo-1688978181542-87a886a16fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Porções',    'Anéis de cebola empanados e fritos (12 unidades)'),
      ProdutoFactory.criar('Porção de Mussarela',  26.90, 'https://images.unsplash.com/photo-1623610934157-0fcb6d50e90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Porções',    'Palitos de mussarela empanados com molho especial'),
      /* ── SOBREMESAS ── */
      ProdutoFactory.criar('Brownie de Chocolate', 18.90, 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Sobremesas', 'Delicioso brownie com calda de chocolate e sorvete'),
      ProdutoFactory.criar('Petit Gateau',         22.90, 'https://images.unsplash.com/photo-1680090966824-eb9e8500bc2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Sobremesas', 'Bolinho de chocolate quente com sorvete de baunilha'),
      ProdutoFactory.criar('Tiramisu',             19.90, 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Sobremesas', 'Sobremesa italiana com café e mascarpone'),
      /* ── SALADAS ── */
      ProdutoFactory.criar('Salada Caesar',        28.90, 'https://images.unsplash.com/photo-1652922664558-03d0f2932e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Saladas',    'Alface romana, croutons, parmesão e molho caesar'),
      ProdutoFactory.criar('Salada Caprese',       26.90, 'https://images.unsplash.com/photo-1632996988606-274cfd06eb68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Saladas',    'Tomate, mussarela de búfala, manjericão e azeite'),
      /* ── COMBOS ── */
      ProdutoFactory.criar('Combo Família',       119.90, 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Combos',     '2 pizzas grandes + 2 refrigerantes 2L + 1 sobremesa'),
      ProdutoFactory.criar('Combo Casal',          79.90, 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Combos',     '1 pizza grande + 1 refrigerante 2L + 1 sobremesa'),
      ProdutoFactory.criar('Combo Individual',     45.90, 'https://images.unsplash.com/photo-1597715474989-9ae8683704b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Combos',     '1 pizza média + 1 refrigerante lata'),
      /* ── LANCHES ── */
      ProdutoFactory.criar('X-Burger Especial',    32.90, 'https://images.unsplash.com/photo-1623610934157-0fcb6d50e90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Lanches',    'Hambúrguer, queijo, alface, tomate e molho especial'),
      ProdutoFactory.criar('Hot Dog Completo',     18.90, 'https://images.unsplash.com/photo-1682613886162-49f5e074c092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', 'Lanches',    'Salsicha, milho, batata palha, purê e molhos')
    ];
  }

  buscarTodos() {
    return this.produtos;
  }

  buscarPorCategoria(categoria) {
    return this.produtos.filter(p => p.categoria === categoria);
  }

  buscarPorNome(termo) {
    return this.produtos.filter(p =>
      p.nome.toLowerCase().includes(termo.toLowerCase()) ||
      p.descricao.toLowerCase().includes(termo.toLowerCase())
    );
  }

  buscarCategorias() {
    return [...new Set(this.produtos.map(p => p.categoria))];
  }
}