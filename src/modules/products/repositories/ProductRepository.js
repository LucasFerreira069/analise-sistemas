class ProductRepository {
  constructor() {
    this.produtos = [
      ProductFactory.criar('Pizza Margherita',     49.90, 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?w=1080&q=80', 'Pizzas',     'Molho de tomate, mussarela, manjericão fresco e azeite'),
      ProductFactory.criar('Pizza Pepperoni',      54.90, 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?w=1080&q=80', 'Pizzas',     'Molho de tomate, mussarela e pepperoni premium'),
      ProductFactory.criar('Pizza Portuguesa',     52.90, 'https://images.unsplash.com/photo-1597715474989-9ae8683704b3?w=1080&q=80', 'Pizzas',     'Presunto, ovos, cebola, azeitonas, mussarela e orégano'),
      ProductFactory.criar('Frango com Catupiry',  51.90, 'https://images.unsplash.com/photo-1642789736356-d7122adfe91b?w=1080&q=80', 'Pizzas',     'Frango desfiado, catupiry original, milho e mussarela'),
      ProductFactory.criar('Pizza Calabresa',      48.90, 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?w=1080&q=80', 'Pizzas',     'Calabresa fatiada, cebola, mussarela e azeitonas'),
      ProductFactory.criar('Pizza Quatro Queijos', 56.90, 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?w=1080&q=80', 'Pizzas',     'Mussarela, provolone, parmesão, catupiry e orégano'),
      ProductFactory.criar('Coca-Cola 2L',         12.90, 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=1080&q=80', 'Bebidas',    'Refrigerante Coca-Cola gelado 2 litros'),
      ProductFactory.criar('Suco de Laranja',      10.90, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1080&q=80', 'Bebidas',    'Suco natural de laranja 500ml'),
      ProductFactory.criar('Guaraná Antarctica 2L',11.90, 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=1080&q=80', 'Bebidas',    'Refrigerante Guaraná Antarctica gelado 2 litros'),
      ProductFactory.criar('Batata Frita Grande',  24.90, 'https://images.unsplash.com/photo-1682613886162-49f5e074c092?w=1080&q=80', 'Porções',    'Porção generosa de batatas fritas crocantes'),
      ProductFactory.criar('Onion Rings',          22.90, 'https://images.unsplash.com/photo-1688978181542-87a886a16fbe?w=1080&q=80', 'Porções',    'Anéis de cebola empanados e fritos'),
      ProductFactory.criar('Brownie de Chocolate', 18.90, 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?w=1080&q=80', 'Sobremesas', 'Delicioso brownie com calda de chocolate e sorvete'),
      ProductFactory.criar('Petit Gateau',         22.90, 'https://images.unsplash.com/photo-1680090966824-eb9e8500bc2b?w=1080&q=80', 'Sobremesas', 'Bolinho de chocolate quente com sorvete de baunilha'),
      ProductFactory.criar('Combo Família',       119.90, 'https://images.unsplash.com/photo-1671106681075-5a7233268cbd?w=1080&q=80', 'Combos',     '2 pizzas grandes + 2 refrigerantes 2L + 1 sobremesa'),
      ProductFactory.criar('Combo Casal',          79.90, 'https://images.unsplash.com/photo-1666040401528-c8066902d8b2?w=1080&q=80', 'Combos',     '1 pizza grande + 1 refrigerante 2L + 1 sobremesa'),
    ];
  }

  buscarTodos()              { return this.produtos; }
  buscarPorCategoria(cat)    { return this.produtos.filter(p => p.categoria === cat); }
  buscarPorNome(termo)       { return this.produtos.filter(p => p.nome.toLowerCase().includes(termo.toLowerCase())); }
  buscarCategorias()         { return [...new Set(this.produtos.map(p => p.categoria))]; }
}