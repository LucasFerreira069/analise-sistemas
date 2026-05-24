class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  /* Inscreve um ouvinte em um evento */
  on(evento, callback) {
    if (!this.listeners[evento]) {
      this.listeners[evento] = [];
    }
    this.listeners[evento].push(callback);
  }

  /* Remove um ouvinte de um evento */
  off(evento, callback) {
    if (!this.listeners[evento]) return;
    this.listeners[evento] = this.listeners[evento].filter(cb => cb !== callback);
  }

  /* Dispara um evento notificando todos os ouvintes */
  emit(evento, dados) {
    if (!this.listeners[evento]) return;
    this.listeners[evento].forEach(cb => cb(dados));
  }
}