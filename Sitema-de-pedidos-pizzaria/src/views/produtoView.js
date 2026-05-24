class ProdutoView {

  /* ── CARDS DA TELA INICIAL ── */
  renderizarCarrossel(produtos, trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.innerHTML = '';

    const dobrado = [...produtos, ...produtos];
    dobrado.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.innerHTML = `
        <div class="product-img">
          <img src="${p.imagem}" alt="${p.nome}" loading="lazy" />
        </div>
        <div class="product-info">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <div class="rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" stroke-width="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="price">R$ ${p.preco.toFixed(2)}</div>
          <button class="btn-add"
            data-nome="${p.nome}"
            data-preco="${p.preco}"
            data-imagem="${p.imagem}">
            + Adicionar
          </button>
        </div>`;
      track.appendChild(div);
    });
  }

  /* ── GRID DO CARDÁPIO ── */
  renderizarGrid(produtos, gridId) {
    const grid       = document.getElementById(gridId);
    const emptyState = document.getElementById('empty-state');
    if (!grid) return;

    grid.innerHTML = '';

    if (produtos.length === 0) {
      grid.style.display       = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    grid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    produtos.forEach(p => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = `
        <div class="menu-card__img">
          <img src="${p.imagem}" alt="${p.nome}" loading="lazy" />
        </div>
        <div class="menu-card__body">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <div class="menu-card__rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" stroke-width="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="menu-card__footer">
            <span class="menu-card__price">R$ ${p.preco.toFixed(2)}</span>
            <button class="btn-add"
              data-nome="${p.nome}"
              data-preco="${p.preco}"
              data-imagem="${p.imagem}">
              + Adicionar
            </button>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }

  /* ── FILTROS DE CATEGORIA ── */
  renderizarCategorias(categorias, categoriaAtiva, containerId, onClickCallback) {
    const bar = document.getElementById(containerId);
    if (!bar) return;
    bar.innerHTML = '';

    categorias.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (cat === categoriaAtiva ? ' active' : '');
      btn.textContent = cat;
      btn.onclick = () => {
        document.querySelectorAll(`#${containerId} .filter-btn`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        onClickCallback(cat);
      };
      bar.appendChild(btn);
    });
  }

  /* ── FILTROS DE TAMANHO ── */
  renderizarTamanhos(tamanhos, tamanhoAtivo, containerId, onClickCallback) {
    const bar = document.getElementById(containerId);
    if (!bar) return;
    bar.innerHTML = '';

    tamanhos.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn filter-btn--sm' + (t.label === tamanhoAtivo ? ' active' : '');
      btn.textContent = t.label;
      btn.dataset.multiplicador = t.multiplicador;
      btn.onclick = () => {
        document.querySelectorAll(`#${containerId} .filter-btn`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        onClickCallback(t);
      };
      bar.appendChild(btn);
    });
  }

  /* ── BUSCA ── */
  renderizarResultadosBusca(produtos, container, onClickCallback) {
    container.innerHTML = '';

    if (produtos.length === 0) {
      container.innerHTML     = '<p class="search-empty">Nenhum produto encontrado.</p>';
      container.style.display = 'block';
      return;
    }

    produtos.forEach(p => {
      const item = document.createElement('div');
      item.className = 'search-item';
      item.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}" />
        <div>
          <span class="search-item__name">${p.nome}</span>
          <span class="search-item__price">R$ ${p.preco.toFixed(2)}</span>
        </div>`;
      item.onclick = () => onClickCallback(p);
      container.appendChild(item);
    });

    container.style.display = 'block';
  }
}