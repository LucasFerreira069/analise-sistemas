class Produto {
  constructor(nome, preco, imagem, categoria = '', descricao = '') {
    this.nome      = nome;
    this.preco     = preco;
    this.imagem    = imagem;
    this.categoria = categoria;
    this.descricao = descricao;
  }
}