# Organização da Equipe — Simulação

## Metodologia
Simulação de time utilizando **Scrum** com sprints de 1 semana.

---

## Backlog do Projeto

| ID    | Tarefa                                              | Módulo     | Prioridade | Status      |
|-------|-----------------------------------------------------|------------|------------|-------------|
| #001  | Criar estrutura modular por domínio                 | shared     | Alta       | ✅ Concluída |
| #002  | Implementar módulo orders com entidades e services  | orders     | Alta       | ✅ Concluída |
| #003  | Implementar módulo products com repository          | products   | Alta       | ✅ Concluída |
| #004  | Implementar módulo payments com padrão Strategy     | payments   | Alta       | ✅ Concluída |
| #005  | Criar middlewares de auth, log e tratamento de erros| shared     | Média      | ✅ Concluída |
| #006  | Escrever testes unitários dos módulos               | tests      | Média      | ✅ Concluída |
| #007  | Documentar comparação MVC vs Modular                | docs       | Média      | ✅ Concluída |
| #008  | Criar diagrama de módulos                           | docs       | Baixa      | ✅ Concluída |
| #009  | Implementar módulo auth com autenticação fake       | auth       | Baixa      | 🔄 Pendente  |
| #010  | Integrar módulos com as views HTML existentes       | views      | Baixa      | 🔄 Pendente  |

---

## Sprint 1 — Estrutura e Módulos Core

**Duração:** 1 semana  
**Objetivo:** Criar a estrutura modular e os módulos principais

| Tarefa | Responsável       | Status      |
|--------|-------------------|-------------|
| #001   | Lucas (Dev)       | ✅ Concluída |
| #002   | Lucas (Dev)       | ✅ Concluída |
| #003   | Lucas (Dev)       | ✅ Concluída |
| #004   | Lucas (Dev)       | ✅ Concluída |

---

## Sprint 2 — Qualidade e Documentação

**Duração:** 1 semana  
**Objetivo:** Garantir qualidade com testes e documentar a arquitetura

| Tarefa | Responsável       | Status      |
|--------|-------------------|-------------|
| #005   | Lucas (Dev)       | ✅ Concluída |
| #006   | Lucas (Dev)       | ✅ Concluída |
| #007   | Lucas (Dev)       | ✅ Concluída |
| #008   | Lucas (Dev)       | ✅ Concluída |

---

## Issues Abertas

### Issue #1 — Módulo auth incompleto
**Descrição:** O módulo `auth` foi criado com a estrutura de pastas mas ainda não possui
as classes `AuthController`, `AuthService` e `AuthRepository` implementadas.  
**Prioridade:** Baixa  
**Status:** Aberta

### Issue #2 — Views não integradas com os novos módulos
**Descrição:** Os arquivos HTML (`inicio.html`, `cardapio.html`, `checkout.html`) ainda
utilizam os controllers e services da arquitetura MVC anterior. É necessário atualizar
os scripts carregados para apontar para os novos módulos.  
**Prioridade:** Baixa  
**Status:** Aberta

### Issue #3 — Testes de integração entre módulos
**Descrição:** Os testes atuais cobrem apenas testes unitários de cada módulo isolado.
Falta testar a comunicação entre `orders` e `payments` no fluxo de finalização do pedido.  
**Prioridade:** Média  
**Status:** Aberta

---

## Pull Requests

### PR #1 — feat: estrutura modular por domínio
- Branch: `arquitetura-modular`
- Módulos criados: `orders`, `products`, `payments`, `shared`
- Revisão: aprovada

### PR #2 — feat: middlewares e configuração global
- Branch: `arquitetura-modular`
- Adicionados: `AuthMiddleware`, `LogMiddleware`, `ErrorMiddleware`, `AppConfig`
- Revisão: aprovada

### PR #3 — test: testes unitários da arquitetura modular
- Branch: `arquitetura-modular`
- 17 testes passando cobrindo todos os módulos
- Revisão: aprovada

---

## Code Review — Checklist

Para cada PR, verificar:
- [ ] Controller não contém regras de negócio
- [ ] Service não acessa localStorage diretamente
- [ ] Repository é a única camada que persiste dados
- [ ] Factory valida os dados antes de criar objetos
- [ ] Middleware intercepta corretamente antes da ação
- [ ] Testes cobrem os casos de sucesso e erro