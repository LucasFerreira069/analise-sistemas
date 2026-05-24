Controllers gordos
Conforme o sistema cresce, o PedidoController começa a acumular responsabilidades que não são dele. Além de coordenar o fluxo, passa a gerenciar o carrinho, o checkout, o pagamento, a integração com WhatsApp, o histórico de pedidos e as notificações. Um controller que começa com 50 linhas chega facilmente a 500 linhas, tornando impossível entender o que ele faz de relance.

Excesso de responsabilidades
No MVC tradicional não existe uma regra clara sobre onde colocar lógicas que envolvem múltiplas entidades. Por exemplo, a regra "se o pedido tiver mais de 3 pizzas aplicar frete grátis e enviar notificação para o cliente" envolve Pedido, PedidoService, CarrinhoObserver e a integração com WhatsApp ao mesmo tempo. 

Dificuldade de manutenção
Com o sistema crescendo, alterar uma funcionalidade passa a exigir mudanças em vários arquivos ao mesmo tempo. Por exemplo, adicionar um novo tipo de desconto exige mexer no DescontoService, no PedidoController, no checkout.html e possivelmente na pedidoView. 

Dificuldade de navegação
Em um sistema com muitas funcionalidades, a pasta controllers/ pode ter dezenas de arquivos, assim como services/ e models/. Navegar entre eles para entender um fluxo completo como "adicionar produto → aplicar desconto → finalizar pedido → enviar WhatsApp" exige abrir 6 ou 7 arquivos diferentes.

Aumento do acoplamento
O PedidoController precisa conhecer o PedidoService, o PedidoRepository, o PedidoSingleton, o ProdutoFactory, o CarrinhoObserver e a PedidoView ao mesmo tempo. 

Dificuldade de escalabilidade
O MVC foi criado para aplicações onde o servidor renderiza o HTML. Em sistemas modernos com múltiplas páginas, integração com APIs externas, estado compartilhado entre telas e atualizações em tempo real, o MVC tradicional não oferece respostas claras.

O que substituiria o MVC nesse caso?
Para um sistema maior, arquiteturas como Clean Architecture ou Hexagonal resolveriam esses problemas organizando o código por funcionalidade em vez de por tipo de arquivo.