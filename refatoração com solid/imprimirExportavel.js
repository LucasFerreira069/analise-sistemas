class Imprimivel {
  imprimir(conteudo) {
    throw new Error("Método imprimir() deve ser implementado");
  }
}

class Exportavel {
  exportar(conteudo) {
    throw new Error("Método exportar() deve ser implementado");
  }
}