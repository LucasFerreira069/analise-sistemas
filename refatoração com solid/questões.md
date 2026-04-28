Atividade: Refatoração com SOLID

1. Liste quantas responsabilidades diferentes a classe Pedido possui. Separe-as em grupos e
dê um nome para cada classe que deveria existir.
1. Gestão do pedido regra de negócio principal
constructor
calcularTotal()
Classe sugerida: Pedido
Deve cuidar apenas dos dados e regras básicas do pedido.

2. Aplicação de descontos
   aplicarDesconto(tipo)
Classe sugerida: CalculadoraDeDesconto
Isola regras de desconto (VIP, cupom, etc).

3. Persistência no banco de dados
salvar()
Classe sugerida: PedidoRepository
Responsável por salvar/buscar dados (acesso ao banco).

4. Notificação ao cliente
notificarCliente()
Classe sugerida: ServicoDeNotificacao ou EmailService
Cuida do envio de mensagens (email, SMS, etc).

5. Geração e saída de relatórios
gerarRelatorio()
imprimir(tipo)
Classes sugeridas:
GeradorDeRelatorio
ServicoDeImpressao (Printer/PDF)
Separa geração de conteúdo da forma de saída (impressora, PDF).

2. Quantas ´razões para mudar´ essa classe tem? Liste cada uma.

Mudança nas regras de cálculo do pedido
Ex: incluir impostos, frete, novas formas de cálculo.
Afeta: calcularTotal()

Mudança nas regras de desconto
Ex: novos tipos de desconto, alteração de porcentagens, cupons mais complexos.
Afeta: aplicarDesconto()

Mudança na persistência de dados
Ex: trocar MySQL por outro banco, mudar estrutura da tabela, usar ORM.
Afeta: salvar()

Mudança no sistema de notificação
Ex: trocar email por SMS, WhatsApp, ou mudar o provedor de email.
Afeta: notificarCliente()

Mudança no formato do relatório
Ex: incluir mais dados, alterar layout do relatório.
Afeta: gerarRelatorio()

Mudança nos meios de saída (impressão/exportação)
Ex: adicionar exportação para Excel, mudar biblioteca de PDF ou impressora.
Afeta: imprimir(tipo)

3. Qual seria o nome ideal das novas classes separadas?

Pedido
CalculadoraDeDesconto
PedidoRepository
NotificadorPedido
GeradorDeRelatorioPedido
ExportadorRelatorio (ou PDF/Printer separados)


4. O método aplicarDesconto usa if/else. Refatore usando OCP para que adicionar um novo
tipo de desconto não exija editar o código existente.

aplicarDesconto(tipo) {
  const total = this.calcularTotal();

  const descontos = {
    vip: (t) => t * 0.8,
    cupom10: (t) => t * 0.9,
    padrao: (t) => t
  };

  const estrategia = descontos[tipo] || descontos.padrao;

  return estrategia(total);
}


5. O que acontece se o cliente pedir um desconto de ´aniversário de 15´? Quantas linhas
você precisa mudar?

editar o método aplicarDesconto e adicionar uma nova condição:
if (tipo === 'aniversario') return total * 0.85;
apenas uma nova linha.

6. Como você usaria herança ou composição para resolver isso?

Herança:
Cria uma classe base (Desconto) 
Cria subclasses para cada tipo (DescontoVIP, DescontoAniversario, etc.) 
O Pedido recebe um objeto de desconto e chama aplicar() 

Composição:
O Pedido recebe uma função ou objeto que aplica o desconto 
Cada desconto é um comportamento externo (não fica dentro da classe) 

7. Imagine que temos PedidoDigital (sem entrega física) e PedidoFisico (com endereço). Se
PedidoDigital herdar de Pedido, o método calcularFrete() deveria lançar erro ou retornar 0?

Não deve lançar erro, deve remover a responsabilidade da classe base e usar composição para representar se existe frete ou não.


8. Se retornar um erro, isso viola LSP? Por quê?

sim, por que subclasses devem poder substituir a classe base sem quebrar o comportamento esperado.

9. Como você redesenharia a hierarquia para satisfazer LSP?
Remover calcularFrete() da classe base Pedido, já que nem todo pedido tem frete. Em vez de usar herança para diferenciar, use composição: associar ao pedido um objeto de frete (real ou inexistente). Assim, todos os pedidos funcionam de forma consistente, sem erros ou exceções, respeitando o LSP. 

10. O método imprimir(tipo) aceita ´impressora´ e ´pdf´. Um serviço que só exporta PDF é
obrigado a suportar impressora também? Separe as interfaces!

Não um serviço que só exporta PDF não deve ser obrigado a suportar impressão. 

14. O que muda se trocarmos o EmailService por SMS? Quantas classes precisam mudar
após a refatoração?

não muda nada, apenas é criada uma nova classe.


