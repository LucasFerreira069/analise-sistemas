# Análise da Arquitetura MVC Atual

## 1. Como o MVC atual está organizado?

O sistema está organizado nas seguintes camadas:

- **models/** — entidades `Produto`, `ItemPedido`, `Pedido`, `ProdutoFactory`, `PedidoSingleton`, `EventEmitter`, `CarrinhoObserver`
- **views/** — `pedidoView.js`, `produtoView.js` e os HTMLs em `views/html/`
- **controllers/** — `PedidoController.js`, `ProdutoController.js`
- **services/** — `PedidoService.js`, `DescontoService.js`, `ProdutoService.js`
- **repositories/** — `PedidoRepository.js`, `ProdutoRepository.js`

O fluxo segue o padrão: `View → Controller → Service → Repository → Model`

---

## 2. Onde existem problemas arquiteturais?

- Todas as responsabilidades (pedido, produto, pagamento, desconto) estão misturadas nas mesmas pastas sem separação por domínio
- O `PedidoService.js` concentra regras de frete, pagamento e desconto ao mesmo tempo
- Os HTMLs ainda possuem lógica inline (`<script>` embutido) misturando View com lógica de Controller
- Não existe separação clara entre domínios (pedidos, produtos, pagamentos)

---

## 3. Existem controllers gordos?

Sim. O `PedidoController.js` acumula responsabilidades de:
- Gerenciar o carrinho (adicionar, remover itens)
- Coordenar o checkout (validar dados do formulário)
- Selecionar estratégia de pagamento
- Calcular totais (frete, desconto, total final)
- Limpar o pedido após confirmação

Isso representa pelo menos 3 responsabilidades distintas em um único controller.

---

## 4. Onde estão as regras de negócio?

As regras estão espalhadas em:
- `PedidoService.js` — frete, pagamento, validação e finalização do pedido
- `DescontoService.js` — cálculo de desconto com padrão Strategy
- `ProdutoService.js` — filtros, ordenação e busca de produtos
- `checkout.js` — montagem da mensagem do WhatsApp e redirecionamento (lógica misturada com view)

---

## 5. Existem responsabilidades misturadas?

Sim, nos seguintes pontos:
- `checkout.js` monta a mensagem do WhatsApp e redireciona o usuário — isso é responsabilidade de um service, não de uma view
- `cardapio.html` possui um `<script>` inline com dados e lógica de renderização
- `PedidoService.js` gerencia três domínios diferentes: frete, pagamento e desconto

---

## 6. O sistema está preparado para crescer?

Não completamente. Os principais obstáculos são:
- Ausência de separação por módulo/domínio — adicionar um novo domínio (ex: autenticação) exige criar arquivos soltos sem um padrão de organização
- Controllers começam a acumular responsabilidades conforme novas features são adicionadas
- Não existe middleware para interceptar requisições (autenticação, logs, tratamento de erros)
- A comunicação entre domínios (ex: pedido precisar de dados do produto) é feita diretamente entre classes sem uma camada intermediária