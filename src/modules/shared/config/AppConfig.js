class AppConfig {
  static instancia = null;

  constructor() {
    this.numeroPizzaria = '5585999998888';
    this.freteGratisPartirDe = 80;
    this.descontoPorcentagem = 0.10;
    this.descontoAPartirDe   = 100;
    this.nomeApp = 'LukinhaPizzas';
  }

  static getInstance() {
    if (!AppConfig.instancia) {
      AppConfig.instancia = new AppConfig();
    }
    return AppConfig.instancia;
  }
}