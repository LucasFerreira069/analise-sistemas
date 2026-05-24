class EventEmitter {
  constructor() { this.listeners = {}; }

  on(evento, callback) {
    if (!this.listeners[evento]) this.listeners[evento] = [];
    this.listeners[evento].push(callback);
  }

  off(evento, callback) {
    if (!this.listeners[evento]) return;
    this.listeners[evento] = this.listeners[evento].filter(cb => cb !== callback);
  }

  emit(evento, dados) {
    if (!this.listeners[evento]) return;
    this.listeners[evento].forEach(cb => cb(dados));
  }
}