class FakeDatabase {
  constructor() {
    this.queryFoiChamado = false;
    this.queryRecebida = null;
  }

  query(sql) {
    this.queryFoiChamado = true;
    this.queryRecebida = sql;
  }
}

const fakeDb = new FakeDatabase();
const repository = new PedidoRepository(fakeDb);

const pedido = { id: 1 };

repository.salvar(pedido);


console.assert(fakeDb.queryFoiChamado === true, "Query não foi chamada");
console.assert(
  fakeDb.queryRecebida === "INSERT INTO pedidos VALUES (1)",
  "Query incorreta"
);