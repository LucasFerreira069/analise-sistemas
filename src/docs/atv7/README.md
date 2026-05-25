# Arquitetura Modular — LukinhaPizzas

Evolução do sistema MVC para arquitetura modular organizada por domínio.

---

## Estrutura do projeto

```
src/
├── modules/
│   ├── auth/
│   │   ├── controllers/   AuthController.js
│   │   ├── services/      AuthService.js
│   │   ├── repositories/  AuthRepository.js
│   │   └── entities/      Usuario.js
│   ├── orders/
│   │   ├── controllers/   OrderController.js
│   │   ├── services/      OrderService.js
│   │   ├── repositories/  OrderRepository.js
│   │   └── entities/      Pedido.js · ItemPedido.js
│   ├── products/
│   │   ├── controllers/   ProductController.js
│   │   ├── services/      ProductService.js
│   │   ├── repositories/  ProductRepository.js
│   │   └── entities/      Produto.js
│   └── payments/
│       ├── controllers/   PaymentController.js
│       ├── services/      PaymentService.js
│       ├── repositories/  PaymentRepository.js
│       └── entities/      Pagamento.js
└── shared/
    ├── config/            AppConfig.js (Singleton)
    ├── middlewares/       AuthMiddleware.js · LogMiddleware.js · ErrorMiddleware.js
    └── utils/             EventEmitter.js · ProductFactory.js · OrderSingleton.js · DescontoService.js
```

---

## Padrões de projeto aplicados

| Padrão | Onde | Objetivo |
|---|---|---|
| **Factory** | `shared/utils/ProductFactory.js` | Centraliza e valida a criação de produtos |
| **Singleton** | `shared/config/AppConfig.js` | Configuração global única da aplicação |
| **Singleton** | `shared/utils/OrderSingleton.js` | Instância única do pedido ativo |
| **Strategy** | `modules/payments/services/PaymentService.js` | Troca a forma de pagamento em tempo de execução |
| **Strategy** | `shared/utils/DescontoService.js` | Troca a forma de calcular desconto |
| **Observer** | `shared/utils/EventEmitter.js` | Notifica mudanças no carrinho automaticamente |
| **Repository** | `*/repositories/*.js` | Isola o acesso a dados em cada módulo |
| **Middleware** | `shared/middlewares/*.js` | Intercepta autenticação, logs e erros globalmente |

---

## Fluxo arquitetural

```
Request (View HTML)
  ↓
Controller (recebe a ação)
  ↓
Service (aplica regras de negócio)
  ↓
Repository (acessa os dados)
  ↓
Entity (estrutura os dados)
```

---

## Como rodar os testes

```bash
node src/tests/modular.test.js
```

---

## Documentação

- `analise.md` — engenharia reversa da arquitetura MVC anterior
- `comparacao.md` — comparação MVC vs modular
- `modularizacao.md` — detalhamento da modularização por domínio
- `equipe.md` — simulação de organização de equipe com backlog e sprints

---

## Commits do projeto

| Commit | Descrição |
|---|---|
| `analise: engenharia reversa da arquitetura MVC atual` | Parte 1 — análise dos problemas |
| `refactor: estrutura modular por dominio criada` | Parte 2 — criação dos módulos |
| `feat: middlewares de auth, log e tratamento de erros` | Parte 3 — middlewares |
| `docs: comparacao arquitetural MVC vs modular` | Parte 4 — documentação |
| `test: testes unitarios da arquitetura modular 17/17` | Parte 5 — testes |
| `docs: diagrama de modulos e organizacao da equipe` | Parte 6 — diagrama e equipe |