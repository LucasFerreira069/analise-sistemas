ORGANIZAÇÃO
Sistema original:Código misturado — regras de negócio dentro dos HTMLs, lógica espalhada em variáveis globais e funções soltas.

MVC Refatorado:Código organizado em camadas bem definidas: Model, View, Controller, Service, Repository.


COESÃO
Sistema original:Baixa — uma função como finalizar() calculava desconto, salvava no localStorage e exibia alerta ao mesmo tempo.

MVC Refatorado:Alta — cada classe tem uma única responsabilidade clara.


ACOPLAMENTO
Sistema original:Alto — o HTML dependia diretamente de variáveis globais e funções espalhadas, qualquer mudança quebrava tudo.

MVC Refatorado:Médio — as camadas se comunicam por interfaces definidas, mas o controller ainda conhece muitas dependências.

REUTILIZAÇÃO
Sistema original:Baixa — o código de carrinho estava duplicado entre inicio.html e cardapio.html.

MVC Refatorado:Alta — PedidoService, ProdutoRepository e PedidoView são reutilizados nas três páginas.


CLAREZA ESTRUTURAL
Sistema original:Baixa — difícil saber onde estava cada regra sem ler todo o código

MVC Refatorado:Alta — o nome da pasta e do arquivo já indica o papel de cada componente


ESCALABILIDADE
Sistema original:Muito baixa — adicionar uma nova funcionalidade exigia mexer em vários lugares sem padrão definido

MVC Refatorado:Média — o MVC organiza bem até certo ponto, mas controllers tendem a crescer demais com o tempo


FACILIDADE DE MANUTENÇÃO
Sistema original:Baixa — alterar o cálculo do desconto exigia encontrar onde ele estava entre várias funções misturadas

MVC Refatorado:Alta — alterar o desconto significa ir direto ao DescontoService sem tocar em mais nada

