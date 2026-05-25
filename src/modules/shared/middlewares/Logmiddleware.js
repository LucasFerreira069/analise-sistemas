class LogMiddleware {

  static _logs = [];

  /* Registra uma ação */
  static registrar(acao, dados = null) {
    const log = {
      timestamp: new Date().toISOString(),
      acao,
      dados
    };
    LogMiddleware._logs.push(log);
    console.log(`[LOG] ${log.timestamp} — ${acao}`, dados || '');
  }

  /* Retorna todos os logs */
  static getLogs() {
    return LogMiddleware._logs;
  }

  /* Limpa os logs */
  static limpar() {
    LogMiddleware._logs = [];
  }
}