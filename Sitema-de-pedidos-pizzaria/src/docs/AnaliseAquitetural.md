1. O MVC melhorou a organização?
Sim. Antes tudo estava misturado — regras de negócio dentro dos HTMLs, manipulação do DOM dentro dos controllers, dados espalhados em variáveis globais. Com o MVC cada arquivo tem um papel claro.

2. O sistema ficou mais desacoplado?
Sim. A View não conhece o Service, o Controller não acessa o localStorage diretamente, e o Observer desacoplou completamente a atualização da interface do carrinho.

3. Onde ainda existem problemas?
Os HTMLs ainda têm lógica inline nos atributos onclick, como onclick="pedidoController.fecharCarrinho()", o que cria dependência direta entre o HTML e o nome exato do controller.

4. O MVC seria suficiente para um sistema muito grande?
Não. Em sistemas grandes o MVC tende a criar controllers gordos que acumulam responsabilidades demais.

5. Quais limitações você percebeu?
O MVC não define claramente onde colocar regras complexas que envolvem múltiplas entidades.

6. Onde os services ajudaram?
O PedidoService centralizou todas as regras de negócio: cálculo de frete, desconto, validação do pedido e processamento do pagamento. O DescontoService isolou a lógica de desconto com o padrão Strategy, permitindo trocar a forma de calcular sem alterar o controller. 

7. Onde os repositories ajudaram?
O PedidoRepository isolou completamente o acesso ao localStorage. Se amanhã o sistema precisar trocar o localStorage por uma API real, só o PedidoRepository precisa mudar — controller, service e model não precisam saber de onde os dados vêm.