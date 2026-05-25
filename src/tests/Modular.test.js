let passou = 0;
let falhou = 0;

function teste(descricao, fn) {
  try {
    fn();
    console.log(`✅ ${descricao}`);
    passou++;
  } catch (erro) {
    console.error(`❌ ${descricao}`);
    console.error(`   → ${erro.message}`);
    falhou++;
  }
}

function esperar(valor, esperado, descricao) {
  if (valor !== esperado) {
    throw new Error(`Esperado: ${esperado}, Recebido: ${valor} (${descricao})`);
  }
}

/* ── SIMULAÇÃO DAS CLASSES ── */

class AppConfig {
  static instancia = null;
  constructor() {
    this.freteGratisPartirDe = 80;
    this.descontoPorcentagem = 0.10;
    this.descontoAPartirDe   = 100;
  }
  static getInstance() {
    if (!AppConfig.instancia) AppConfig.instancia = new AppConfig();
    return AppConfig.instancia;
  }
}

class Produto {
  constructor(nome, preco, imagem, categoria = '', descricao = '') {
    this.nome = nome; this.preco = preco; this.imagem = imagem;
    this.categoria = categoria; this.descricao = descricao;
  }
}

class ProductFactory {
  static criar(nome, preco, imagem, categoria = '', descricao = '') {
    if (!nome || nome.trim() === '') throw new Error('Produto deve ter um nome.');
    if (!preco || preco <= 0)        throw new Error('Produto deve ter um preco valido.');
    return new Produto(nome, preco, imagem, categoria, descricao);
  }
}

class ItemPedido {
  constructor(produto) { this.produto = produto; this.quantidade = 1; }
  incrementar() { this.quantidade++; }
  decrementar() { this.quantidade--; }
  getSubtotal() { return this.produto.preco * this.quantidade; }
}

class Pedido {
  constructor() { this.itens = []; this.status = 'aberto'; }
  adicionarItem(produto) {
    const ex = this.itens.find(i => i.produto.nome === produto.nome);
    if (ex) { ex.incrementar(); } else { this.itens.push(new ItemPedido(produto)); }
  }
  removerItem(nome) {
    const idx = this.itens.findIndex(i => i.produto.nome === nome);
    if (idx === -1) return;
    this.itens[idx].decrementar();
    if (this.itens[idx].quantidade <= 0) this.itens.splice(idx, 1);
  }
  getTotal() { return this.itens.reduce((s, i) => s + i.getSubtotal(), 0); }
  getQuantidadeTotal() { return this.itens.reduce((s, i) => s + i.quantidade, 0); }
}

class SemDesconto   { calcular() { return 0; } }
class DescontoPorTotal {
  calcular(pedido) {
    const cfg = AppConfig.getInstance();
    return pedido.getTotal() >= cfg.descontoAPartirDe ? pedido.getTotal() * cfg.descontoPorcentagem : 0;
  }
}
class FretePorTotal {
  calcular(pedido) {
    return pedido.getTotal() >= AppConfig.getInstance().freteGratisPartirDe ? 0 : 8.00;
  }
}
class DescontoService {
  constructor(e = new DescontoPorTotal()) { this.estrategia = e; }
  calcular(pedido) { return this.estrategia.calcular(pedido); }
}

class OrderService {
  constructor(frete = new FretePorTotal(), desconto = new DescontoService()) {
    this.freteStrategy = frete; this.descontoService = desconto;
  }
  calcularFrete(p)    { return this.freteStrategy.calcular(p); }
  calcularDesconto(p) { return this.descontoService.calcular(p); }
  calcularTotalFinal(p) { return p.getTotal() - this.calcularDesconto(p) + this.calcularFrete(p); }
  validarPedido(p) {
    if (p.itens.length === 0) throw new Error('O pedido deve ter pelo menos um item.');
    return true;
  }
}

class PagamentoPix     { processar() { return { metodo: 'PIX' }; } }
class PagamentoDinheiro {
  processar(p, troco) {
    if (!troco || parseFloat(troco) <= 0) throw new Error('Informe o valor do troco.');
    return { metodo: 'Dinheiro', troco: parseFloat(troco) };
  }
}
class PaymentService {
  constructor(e = new PagamentoPix()) { this.estrategia = e; }
  setEstrategia(e) { this.estrategia = e; }
  processar(pedido, troco) { return this.estrategia.processar(pedido, troco); }
}

class ProductService {
  static filtrarPorCategoria(produtos, cat) { return produtos.filter(p => p.categoria === cat); }
  static buscar(produtos, termo) { return produtos.filter(p => p.nome.toLowerCase().includes(termo.toLowerCase())); }
}

/* ══════════════════════════════════════════
   TESTES
══════════════════════════════════════════ */

console.log('\n🍕 TESTES — Arquitetura Modular LukinhaPizzas\n');

/* ── MÓDULO: shared/utils ── */
console.log('--- shared/utils: ProductFactory ---');

teste('ProductFactory cria produto válido', () => {
  const p = ProductFactory.criar('Pizza Margherita', 49.90, 'img.jpg', 'Pizzas', 'Desc');
  esperar(p.nome, 'Pizza Margherita', 'nome do produto');
  esperar(p.preco, 49.90, 'preco do produto');
});

teste('ProductFactory lança erro para nome vazio', () => {
  try {
    ProductFactory.criar('', 49.90, 'img.jpg');
    throw new Error('Deveria ter lancado erro');
  } catch (e) {
    esperar(e.message, 'Produto deve ter um nome.', 'mensagem de erro');
  }
});

teste('ProductFactory lança erro para preço zero', () => {
  try {
    ProductFactory.criar('Pizza', 0, 'img.jpg');
    throw new Error('Deveria ter lancado erro');
  } catch (e) {
    esperar(e.message, 'Produto deve ter um preco valido.', 'mensagem de erro');
  }
});

/* ── MÓDULO: orders ── */
console.log('\n--- módulo orders: Pedido ---');

teste('Pedido vazio tem total zero', () => {
  const p = new Pedido();
  esperar(p.getTotal(), 0, 'total vazio');
});

teste('Adicionar item aumenta o total', () => {
  const p = new Pedido();
  p.adicionarItem(ProductFactory.criar('Pizza Pepperoni', 54.90, 'img.jpg'));
  esperar(p.getTotal(), 54.90, 'total com 1 item');
});

teste('Adicionar mesmo item duas vezes incrementa quantidade', () => {
  const p = new Pedido();
  p.adicionarItem(ProductFactory.criar('Pizza Pepperoni', 54.90, 'img.jpg'));
  p.adicionarItem(ProductFactory.criar('Pizza Pepperoni', 54.90, 'img.jpg'));
  esperar(p.getQuantidadeTotal(), 2, 'quantidade total');
  esperar(p.getTotal(), 109.80, 'total dobrado');
});

teste('Remover item diminui o total', () => {
  const p = new Pedido();
  p.adicionarItem(ProductFactory.criar('Pizza Margherita', 49.90, 'img.jpg'));
  p.adicionarItem(ProductFactory.criar('Coca-Cola', 12.90, 'img.jpg'));
  p.removerItem('Coca-Cola');
  esperar(p.getTotal(), 49.90, 'total após remover');
});

/* ── MÓDULO: orders/services ── */
console.log('\n--- módulo orders: OrderService ---');

teste('Frete grátis acima de R$80', () => {
  const p = new Pedido();
  p.adicionarItem(ProductFactory.criar('Combo Familia', 119.90, 'img.jpg'));
  const s = new OrderService();
  esperar(s.calcularFrete(p), 0, 'frete gratis');
});

teste('Frete R$8 abaixo de R$80', () => {
  const p = new Pedido();
  p.adicionarItem(ProductFactory.criar('Brownie', 18.90, 'img.jpg'));
  const s = new OrderService();
  esperar(s.calcularFrete(p), 8.00, 'frete R$8');
});

teste('Desconto 10% acima de R$100', () => {
  const p = new Pedido();
  p.adicionarItem(ProductFactory.criar('Pizza Pepperoni',      54.90, 'img.jpg'));
  p.adicionarItem(ProductFactory.criar('Pizza Quatro Queijos', 56.90, 'img.jpg'));
  const s = new OrderService();
  const desconto = Math.round(s.calcularDesconto(p) * 100) / 100;
  esperar(desconto, 11.18, 'desconto 10%');
});

teste('Sem desconto abaixo de R$100', () => {
  const p = new Pedido();
  p.adicionarItem(ProductFactory.criar('Pizza Margherita', 49.90, 'img.jpg'));
  const s = new OrderService();
  esperar(s.calcularDesconto(p), 0, 'sem desconto');
});

teste('validarPedido lança erro para carrinho vazio', () => {
  try {
    new OrderService().validarPedido(new Pedido());
    throw new Error('Deveria ter lancado erro');
  } catch (e) {
    esperar(e.message, 'O pedido deve ter pelo menos um item.', 'mensagem validacao');
  }
});

/* ── MÓDULO: payments ── */
console.log('\n--- módulo payments: PaymentService ---');

teste('Pagamento PIX retorna metodo correto', () => {
  const s = new PaymentService();
  const r = s.processar(new Pedido());
  esperar(r.metodo, 'PIX', 'metodo pix');
});

teste('Pagamento dinheiro sem troco lança erro', () => {
  try {
    const s = new PaymentService(new PagamentoDinheiro());
    s.processar(new Pedido(), null);
    throw new Error('Deveria ter lancado erro');
  } catch (e) {
    esperar(e.message, 'Informe o valor do troco.', 'erro troco');
  }
});

teste('Pagamento dinheiro com troco retorna metodo correto', () => {
  const s = new PaymentService(new PagamentoDinheiro());
  const r = s.processar(new Pedido(), '100');
  esperar(r.metodo, 'Dinheiro', 'metodo dinheiro');
  esperar(r.troco, 100, 'valor troco');
});

/* ── MÓDULO: products ── */
console.log('\n--- módulo products: ProductService ---');

teste('Filtrar por categoria retorna apenas pizzas', () => {
  const produtos = [
    ProductFactory.criar('Pizza Margherita', 49.90, 'img.jpg', 'Pizzas', ''),
    ProductFactory.criar('Coca-Cola',        12.90, 'img.jpg', 'Bebidas', ''),
    ProductFactory.criar('Pizza Pepperoni',  54.90, 'img.jpg', 'Pizzas', '')
  ];
  const pizzas = ProductService.filtrarPorCategoria(produtos, 'Pizzas');
  esperar(pizzas.length, 2, 'quantidade de pizzas');
});

teste('Buscar por nome encontra produto', () => {
  const produtos = [
    ProductFactory.criar('Pizza Margherita', 49.90, 'img.jpg', 'Pizzas', ''),
    ProductFactory.criar('Coca-Cola',        12.90, 'img.jpg', 'Bebidas', '')
  ];
  const resultado = ProductService.buscar(produtos, 'coca');
  esperar(resultado.length, 1, 'resultado da busca');
  esperar(resultado[0].nome, 'Coca-Cola', 'nome encontrado');
});

/* ── RESULTADO ── */
console.log(`\n════════════════════════════════`);
console.log(`✅ Passou: ${passou}`);
console.log(`❌ Falhou: ${falhou}`);
console.log(`Total:     ${passou + falhou} testes`);
console.log(`════════════════════════════════\n`);