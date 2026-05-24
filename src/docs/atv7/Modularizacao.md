# Modularização por Domínio

## Estrutura Final

```
src/
├── modules/
│   ├── auth/
│   │   ├── controllers/   — AuthController.js
│   │   ├── services/      — AuthService.js
│   │   ├── repositories/  — AuthRepository.js
│   │   └── entities/      — Usuario.js
│   ├── orders/
│   │   ├── controllers/   — OrderController.js
│   │   ├── services/      — OrderService.js
│   │   ├── repositories/  — OrderRepository.js
│   │   └── entities/      — Pedido.js, ItemPedido.js
│   ├── products/
│   │   ├── controllers/   — ProductController.js
│   │   ├── services/      — ProductService.js
│   │   ├── repositories/  — ProductRepository.js
│   │   └── entities/      — Produto.js
│   └── payments/
│       ├── controllers/   — PaymentController.js
│       ├── services/      — PaymentService.js
│       ├── repositories/  — PaymentRepository.js
│       └── entities/      — Pagamento.js
└── shared/
    ├── config/            — AppConfig.js (Singleton)
    ├── middlewares/       — AuthMiddleware.js, LogMiddleware.js, ErrorMiddleware.js
    └── utils/             — EventEmitter.js, ProductFactory.js, OrderSingleton.js, DescontoService.js
```

## Responsabilidade de cada módulo

### auth
Gerencia identificação do cliente — nome, telefone e token de sessão fake.
Não possui regras de negócio do pedido.

### orders
Gerencia o ciclo de vida do pedido — criação, adição de itens, remoção,
cálculo de totais, frete e finalização. É o módulo central do sistema.

### products
Gerencia o catálogo de produtos — listagem, filtro por categoria, busca
por nome e ordenação por preço. Independente do módulo de pedidos.

### payments
Gerencia as formas de pagamento usando o padrão Strategy — dinheiro,
cartão na entrega e PIX. Separado do módulo de pedidos para permitir
adicionar novas formas de pagamento sem afetar a lógica do carrinho.

### shared
Contém recursos compartilhados entre todos os módulos:
- **AppConfig** — configurações globais via Singleton
- **Middlewares** — auth, log e erros aplicados transversalmente
- **Utils** — Factory, Singleton, Observer e Strategy de desconto

## Fluxo de comunicação entre módulos

```
View (HTML)
  ↓
OrderController (orders)
  ↓ usa
OrderService (orders) ←→ DescontoService (shared)
  ↓ usa
OrderRepository (orders)
  ↓
localStorage

PaymentController (payments) ← chamado pelo OrderController
  ↓ usa
PaymentService (payments)

ProductController (products) ← independente
  ↓ usa
ProductService (products)
  ↓ usa
ProductRepository (products)

Middlewares (shared) ← interceptam em todas as camadas
```