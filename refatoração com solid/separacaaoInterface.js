class Impressora {
  imprimir(conteudo) {
    throw new Error("Método imprimir() deve ser implementado");
  }
}

class ExportadorPDF {
  exportar(conteudo) {
    throw new Error("Método exportar() deve ser implementado");
  }
}

class ImpressoraReal extends Impressora {
  imprimir(conteudo) {
    PrinterService.print(conteudo);
  }
}

class ExportadorPDFReal extends ExportadorPDF {
  exportar(conteudo) {
    PDFService.export(conteudo);
  }
}

class Pedido {
  gerarRelatorio() {
    return "Relatório do pedido";
  }

  imprimir(servicoImpressao) {
    servicoImpressao.imprimir(this.gerarRelatorio());
  }

  exportar(servicoExportacao) {
    servicoExportacao.exportar(this.gerarRelatorio());
  }
}

const pedido = new Pedido();

const impressora = new ImpressoraReal();
pedido.imprimir(impressora);

const pdf = new ExportadorPDFReal();
pedido.exportar(pdf);