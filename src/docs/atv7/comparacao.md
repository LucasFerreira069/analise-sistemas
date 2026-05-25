# Comparação Arquitetural: MVC vs Modular

## Parte 7 – Problemas Arquiteturais do MVC Original

### Controllers gordos
O `PedidoController.js` acumulava responsabilidades de carrinho, checkout,
pagamento, cálculo de totais e limpeza do pedido — tudo em um único arquivo.
Conforme o sistema cresce, esse controller se tornaria impossível de manter.

### Dificuldade de manutenção
Alterar o cálculo do frete exigia rastrear onde a lógica estava entre
`PedidoService.js`, `checkout.js` e o próprio controller. Sem separação por
domínio, qualquer mudança exigia abrir múltiplos arquivos.

### Acoplamento
O `PedidoController` dependia diretamente de `PedidoService`, `PedidoRepository`,
`PedidoSingleton`, `ProdutoFactory`, `CarrinhoObserver` e `PedidoView` ao mesmo
tempo — alto acoplamento que dificultava testes e substituição de componentes.

### Organização limitada
Todas as classes ficavam em pastas genéricas (`models/`, `services/`, `controllers/`)
sem agrupamento por domínio. Impossível saber rapidamente quais arquivos pertencem
ao domínio de pagamentos ou de produtos sem ler cada um.

### Crescimento desordenado
Adicionar autenticação no MVC exigiria criar arquivos soltos em pastas já existentes,
misturando responsabilidades de auth com pedidos e produtos na mesma pasta.

### Dificuldade de navegação
Para entender o fluxo completo de "finalizar pedido", era necessário abrir:
`checkout.html` → `checkout.js` → `PedidoController.js` → `PedidoService.js` →
`DescontoService.js` → `PedidoRepository.js` — 6 arquivos em pastas diferentes.

---

## Parte 8 – Comparação Arquitetural

| Critério                     | MVC                                      | Modular                                          |
|------------------------------|------------------------------------------|--------------------------------------------------|
| **Organização**              | Por tipo de arquivo (models, views...)   | Por domínio (orders, products, payments...)      |
| **Escalabilidade**           | Baixa — controllers crescem sem limite   | Alta — cada módulo cresce de forma independente  |
| **Acoplamento**              | Alto — controller conhece muitas classes | Baixo — módulos se comunicam por interfaces      |
| **Reutilização**             | Média — services reutilizados entre telas| Alta — módulos inteiros reutilizáveis em projetos|
| **Facilidade de manutenção** | Baixa — mudança exige rastrear vários arquivos | Alta — mudança isolada dentro do módulo    |
| **Separação de responsabilidades** | Parcial — mistura entre camadas    | Total — cada módulo tem suas próprias camadas    |
| **Facilidade de navegação**  | Baixa — fluxo espalhado em pastas genéricas | Alta — tudo relacionado a pedidos em `orders/` |

---

## Conclusão

A arquitetura modular resolve os principais problemas do MVC tradicional ao
organizar o código por domínio em vez de por tipo de arquivo. Cada módulo
(`orders`, `products`, `payments`, `auth`) possui suas próprias entidades,
serviços, repositórios e controllers — permitindo que times diferentes trabalhem
em módulos diferentes sem conflitos, e que cada módulo evolua de forma independente.

Os middlewares compartilhados em `shared/` garantem que autenticação, logs e
tratamento de erros sejam aplicados de forma consistente em toda a aplicação
sem duplicação de código.