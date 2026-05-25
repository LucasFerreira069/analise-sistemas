class PedidoView {

  /* ── BADGE DO CARRINHO ── */
  atualizarBadge(quantidade) {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;
    badge.textContent   = quantidade;
    badge.style.display = quantidade > 0 ? 'flex' : 'none';
  }

  animarBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
  }

  /* ── FEEDBACK BOTÃO ADICIONAR ── */
  feedbackBotaoAdicionar(btn) {
    btn.textContent      = '✓ Adicionado';
    btn.style.background = '#2ecc71';
    setTimeout(() => {
      btn.textContent      = '+ Adicionar';
      btn.style.background = '';
    }, 1200);
  }

  /* ── MODAL DO CARRINHO ── */
  construirModal() {
    if (document.getElementById('cart-modal')) return;

    const modal     = document.createElement('div');
    modal.id        = 'cart-modal';
    modal.className = 'cart-modal';
    modal.innerHTML = `
      <div class="cart-modal__overlay" onclick="pedidoController.fecharCarrinho()"></div>
      <div class="cart-modal__panel">
        <div class="cart-modal__header">
          <h2>Meu Carrinho</h2>
          <button class="cart-modal__close" onclick="pedidoController.fecharCarrinho()">✕</button>
        </div>
        <div class="cart-modal__body">
          <p id="cart-empty" class="cart-modal__empty">Seu carrinho está vazio.</p>
          <div id="cart-list"></div>
        </div>
        <div class="cart-modal__footer">
          <span>Total:</span>
          <strong id="cart-total">R$ 0,00</strong>
        </div>
        <button class="cart-modal__checkout" onclick="window.location.href='checkout.html'">Finalizar Pedido</button>
      </div>`;
    document.body.appendChild(modal);
    this._injetarEstilos();
  }

  abrirModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.classList.add('open');
  }

  fecharModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.classList.remove('open');
  }

  /* ── ITENS DO CARRINHO ── */
  renderizarItens(itens, total) {
    const list     = document.getElementById('cart-list');
    const emptyMsg = document.getElementById('cart-empty');
    const totalEl  = document.getElementById('cart-total');
    if (!list) return;

    list.innerHTML = '';

    if (itens.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (totalEl)  totalEl.textContent    = 'R$ 0,00';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    itens.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.produto.imagem}" alt="${item.produto.nome}" class="cart-item__img" />
        <div class="cart-item__info">
          <span class="cart-item__name">${item.produto.nome}</span>
          <span class="cart-item__price">R$ ${item.getSubtotal().toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="cart-item__controls">
          <button class="cart-qty-btn" onclick="pedidoController.removerItem('${item.produto.nome}')">−</button>
          <span class="cart-qty">${item.quantidade}</span>
          <button class="cart-qty-btn" onclick="pedidoController.adicionarAoCarrinho('${item.produto.nome}', ${item.produto.preco}, '${item.produto.imagem}')">+</button>
          <button class="cart-remove-btn" onclick="pedidoController.removerItemCompleto('${item.produto.nome}')">🗑</button>
        </div>`;
      list.appendChild(div);
    });

    if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  /* ── CHECKOUT ── */
  renderizarResumo(itens) {
    const container = document.getElementById('order-items');
    if (!container) return;
    container.innerHTML = '';

    if (itens.length === 0) {
      container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:1rem 0">Carrinho vazio.</p>';
      return;
    }

    itens.forEach(item => {
      const div = document.createElement('div');
      div.className = 'order-item';
      div.innerHTML = `
        <div class="order-item__info">
          <div class="order-item__name">${item.produto.nome}</div>
          <div class="order-item__qty">Qtd: ${item.quantidade}</div>
        </div>
        <div class="order-item__price">R$ ${item.getSubtotal().toFixed(2).replace('.', ',')}</div>`;
      container.appendChild(div);
    });
  }

  renderizarTotais(subtotal, desconto, frete, total) {
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set('subtotal-val', `R$ ${subtotal.toFixed(2).replace('.', ',')}`);
    set('desconto-val', desconto > 0 ? `- R$ ${desconto.toFixed(2).replace('.', ',')}` : 'Sem desconto');
    set('frete-val',    frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`);
    set('total-val',    `R$ ${total.toFixed(2).replace('.', ',')}`);
  }

  /* ── ESTILOS DO MODAL ── */
  _injetarEstilos() {
    if (document.getElementById('cart-styles')) return;
    const style       = document.createElement('style');
    style.id          = 'cart-styles';
    style.textContent = `
      .cart-modal { position: fixed; inset: 0; z-index: 999; display: none; }
      .cart-modal.open { display: flex; }
      .cart-modal__overlay { position: absolute; inset: 0; background: rgba(0,0,0,.6); }
      .cart-modal__panel { position: absolute; right: 0; top: 0; bottom: 0; width: 400px; max-width: 100vw; background: #1A1A1A; border-left: 1px solid #333; display: flex; flex-direction: column; padding: 1.5rem; gap: 1rem; overflow-y: auto; }
      .cart-modal__header { display: flex; align-items: center; justify-content: space-between; }
      .cart-modal__header h2 { font-size: 1.4rem; font-weight: 700; }
      .cart-modal__close { background: none; border: none; color: #fff; font-size: 1.3rem; cursor: pointer; }
      .cart-modal__body { flex: 1; display: flex; flex-direction: column; gap: .75rem; }
      .cart-modal__empty { color: #9CA3AF; text-align: center; padding: 2rem 0; }
      .cart-item { display: flex; align-items: center; gap: .75rem; background: #242424; border-radius: .75rem; padding: .75rem; }
      .cart-item__img { width: 56px; height: 56px; object-fit: cover; border-radius: .5rem; flex-shrink: 0; }
      .cart-item__info { flex: 1; display: flex; flex-direction: column; gap: .2rem; }
      .cart-item__name { font-size: .9rem; font-weight: 600; }
      .cart-item__price { font-size: .85rem; color: #E8593C; font-weight: 700; }
      .cart-item__controls { display: flex; align-items: center; gap: .4rem; }
      .cart-qty-btn { background: #333; border: none; color: #fff; width: 28px; height: 28px; border-radius: .4rem; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .2s; }
      .cart-qty-btn:hover { background: #E8593C; }
      .cart-qty { min-width: 20px; text-align: center; font-weight: 700; }
      .cart-remove-btn { background: none; border: none; cursor: pointer; font-size: 1rem; margin-left: .25rem; opacity: .6; transition: opacity .2s; }
      .cart-remove-btn:hover { opacity: 1; }
      .cart-modal__footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #333; padding-top: 1rem; font-size: 1.1rem; }
      .cart-modal__footer strong { color: #E8593C; font-size: 1.3rem; }
      .cart-modal__checkout { width: 100%; background: #E8593C; color: #fff; border: none; border-radius: .75rem; padding: .85rem; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background .2s; }
      .cart-modal__checkout:hover { background: #d14d31; }
      .cart-badge { transition: transform .2s; }
    `;
    document.head.appendChild(style);
  }
}