class Pedido {
  constructor(id, cliente, itens, repository, notificador) {
    this.id = id;
    this.cliente = cliente;
    this.itens = itens;
    this.repository = repository;
    this.notificador = notificador;
  }

  salvar() {
    this.repository.salvar(this);
  }

  notificarCliente() {
    this.notificador.enviar(this.cliente, this);
  }
}

class PedidoRepository {
  constructor(db) {
    this.db = db;
  }

  salvar(pedido) {
    this.db.query(`INSERT INTO pedidos VALUES (${pedido.id})`);
  }
}

class NotificadorEmail {
  constructor(emailService) {
    this.emailService = emailService;
  }

  enviar(cliente, pedido) {
    this.emailService.send(
      cliente.email,
      `Pedido ${pedido.id} confirmado!`
    );
  }
}

const db = new MySQLDatabase();
const emailService = new EmailService();

const repository = new PedidoRepository(db);
const notificador = new NotificadorEmail(emailService);

const pedido = new Pedido(1, cliente, itens, repository, notificador);

pedido.salvar();
pedido.notificarCliente();