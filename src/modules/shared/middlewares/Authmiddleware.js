class AuthMiddleware {

  /* Verifica se o usuário está autenticado */
  static verificar(dados) {
    if (!dados || !dados.nome || !dados.telefone) {
      throw new Error('Usuário não identificado. Preencha nome e telefone.');
    }
    return true;
  }

  /* Simula um token de sessão */
  static gerarToken(nome) {
    const token = btoa(`${nome}:${Date.now()}`);
    sessionStorage.setItem('authToken', token);
    return token;
  }

  /* Verifica se existe um token ativo */
  static estaAutenticado() {
    return !!sessionStorage.getItem('authToken');
  }

  /* Remove o token (logout) */
  static logout() {
    sessionStorage.removeItem('authToken');
  }
}