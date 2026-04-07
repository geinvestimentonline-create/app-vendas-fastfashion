const products = [
  {
    id: 1,
    name: 'Corneta Vuvuzela Brasil Copa 2026',
    category: 'Eventos',
    price: 19.9,
    oldPrice: 29.9,
    image: 'assets/vuvuzela-brasil.jpg',
    desc: 'Produto de torcida com visual forte para campanhas sazonais e kits de copa.',
    badge: 'Mais visto'
  },
  {
    id: 2,
    name: 'Sutiã DeMillus 061486 Original',
    category: 'Moda íntima',
    price: 79.9,
    oldPrice: 99.9,
    image: 'assets/sutia-demillus.jpg',
    desc: 'Alta sustentação, sem bojo e apelo premium para venda direta.',
    badge: 'Original'
  },
  {
    id: 3,
    name: 'Calcinha Modeladora DeMillus',
    category: 'Moda íntima',
    price: 39.9,
    oldPrice: 54.9,
    image: 'assets/calcinha-modeladora.jpg',
    desc: 'Cintura alta modeladora com proposta de conforto e valor percebido.',
    badge: 'Mais vendida'
  },
  {
    id: 4,
    name: 'Sutiã Renda Premium Taça C',
    category: 'Moda íntima',
    price: 89.9,
    oldPrice: 119.9,
    image: 'assets/sutia-renda-vermelho.jpg',
    desc: 'Ideal para criativo visual, campanha de sustentação e modelagem natural.',
    badge: 'Oferta forte'
  },
  {
    id: 5,
    name: 'Vestido Plus Size Premium com Bolso',
    category: 'Moda feminina',
    price: 99.9,
    oldPrice: 149.9,
    image: 'assets/vestido-plus-size.jpg',
    desc: 'Peça campeã para anúncio com conforto, bolso funcional e prova visual.',
    badge: 'Top anúncio'
  },
  {
    id: 6,
    name: 'Macacão Pantalona Elegante',
    category: 'Moda feminina',
    price: 129.9,
    oldPrice: 179.9,
    image: 'assets/macacao-pantalona.jpg',
    desc: 'Produto visual para criativo e venda com bom ticket médio.',
    badge: 'Coleção'
  },
  {
    id: 7,
    name: 'Kit 5 Panelas Antiaderente',
    category: 'Casa & cozinha',
    price: 149.9,
    oldPrice: 189.9,
    image: 'assets/kit-5-panelas.jpg',
    desc: 'Kit com forte apelo de benefício, ticket maior e boa margem de escala.',
    badge: 'Frete rápido'
  },
  {
    id: 8,
    name: 'Kit Panelas com Utensílios',
    category: 'Casa & cozinha',
    price: 119.9,
    oldPrice: 149.9,
    image: 'assets/kit-panelas-com-utensilios.jpg',
    desc: 'Oferta visual pronta para usar como kit promocional de cozinha.',
    badge: 'Kit oferta'
  },
  {
    id: 9,
    name: 'Kit Panela + Caçarola 2 Peças',
    category: 'Casa & cozinha',
    price: 79.9,
    oldPrice: 99.9,
    image: 'assets/kit-panelas-2-pecas.jpg',
    desc: 'Versão compacta para entrada de cliente e oferta por impulso.',
    badge: 'Entrada'
  },
  {
    id: 10,
    name: 'Kit Panelas 3 Peças Premium',
    category: 'Casa & cozinha',
    price: 99.9,
    oldPrice: 129.9,
    image: 'assets/kit-panelas-3-pecas.jpg',
    desc: 'Opção intermediária de ticket com foco em venda direta e kits.',
    badge: 'Kit médio'
  }
];

const categoryInfo = {
  'Eventos': { count: 1, note: 'Campanhas sazonais e copa' },
  'Moda íntima': { count: 3, note: 'Margem, recompra e conforto' },
  'Moda feminina': { count: 2, note: 'Criativos e prova visual' },
  'Casa & cozinha': { count: 4, note: 'Kits com ticket maior' }
};

let activeFilter = 'Todos';
let cart = [];

const categoryGrid = document.getElementById('categoryGrid');
const filterChips = document.getElementById('filterChips');
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const searchModalInput = document.getElementById('searchModalInput');
const searchResults = document.getElementById('searchResults');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchModal = document.getElementById('searchModal');

function currency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderCategories() {
  categoryGrid.innerHTML = '';
  Object.entries(categoryInfo).forEach(([name, data]) => {
    const card = document.createElement('article');
    card.className = 'category-card';
    card.innerHTML = `
      <div>
        <span>${data.note}</span>
        <strong>${name}</strong>
      </div>
      <div>
        <span>${data.count} produto(s) exemplo</span><br><br>
        <button data-category="${name}">Ver categoria</button>
      </div>
    `;
    card.querySelector('button').addEventListener('click', () => {
      activeFilter = name;
      renderChips();
      renderProducts();
      document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    });
    categoryGrid.appendChild(card);
  });
}

function renderChips() {
  const categories = ['Todos', ...Object.keys(categoryInfo)];
  filterChips.innerHTML = '';
  categories.forEach(category => {
    const chip = document.createElement('button');
    chip.className = `chip ${activeFilter === category ? 'active' : ''}`;
    chip.textContent = category;
    chip.addEventListener('click', () => {
      activeFilter = category;
      renderChips();
      renderProducts();
    });
    filterChips.appendChild(chip);
  });
}

function getFilteredProducts() {
  const query = searchInput.value.trim().toLowerCase();
  return products.filter(product => {
    const categoryOk = activeFilter === 'Todos' || product.category === activeFilter;
    const searchOk = !query || [product.name, product.category, product.desc].join(' ').toLowerCase().includes(query);
    return categoryOk && searchOk;
  });
}

function renderProducts() {
  const list = getFilteredProducts();
  productGrid.innerHTML = '';

  if (!list.length) {
    productGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  list.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrap">
        <span class="badge">${product.badge}</span>
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="price-row">
          <div class="price">
            <small>${currency(product.oldPrice)}</small>
            <strong>${currency(product.price)}</strong>
          </div>
          <span class="installments">ou 3x sem juros</span>
        </div>
        <div class="card-actions">
          <button class="add-btn">Adicionar</button>
          <button class="buy-btn">Comprar agora</button>
        </div>
      </div>
    `;
    card.querySelector('.add-btn').addEventListener('click', () => addToCart(product.id));
    card.querySelector('.buy-btn').addEventListener('click', () => quickBuy(product.id));
    productGrid.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  openCart();
}

function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartItems.innerHTML = '';

  if (!cart.length) {
    cartItems.innerHTML = '<p>Seu carrinho está vazio neste preview.</p>';
    cartTotal.textContent = currency(0);
    return;
  }

  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <strong>${item.name}</strong>
        <small>${currency(item.price)} • ${item.category}</small>
        <div class="qty-box">
          <button data-action="minus">−</button>
          <span>${item.qty}</span>
          <button data-action="plus">+</button>
        </div>
      </div>
      <div>
        <strong>${currency(item.qty * item.price)}</strong>
        <button class="remove-btn">Remover</button>
      </div>
    `;
    row.querySelector('[data-action="minus"]').addEventListener('click', () => changeQty(item.id, -1));
    row.querySelector('[data-action="plus"]').addEventListener('click', () => changeQty(item.id, 1));
    row.querySelector('.remove-btn').addEventListener('click', () => removeItem(item.id));
    cartItems.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  cartTotal.textContent = currency(total);
}

function changeQty(id, delta) {
  const item = cart.find(product => product.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(product => product.id !== id);
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function openCart() {
  cartDrawer.classList.add('open');
  overlay.classList.add('show');
}

function closeAll() {
  cartDrawer.classList.remove('open');
  searchModal.classList.remove('show');
  overlay.classList.remove('show');
}

function quickBuy(id) {
  const product = products.find(item => item.id === id);
  const text = `Preview da loja:%0A%0AQuero comprar:%0A${product.name}%0AValor: ${currency(product.price)}%0A%0ANome:%0AEndereço:%0AForma de pagamento:`;
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

function checkoutWhatsApp() {
  if (!cart.length) {
    alert('Adicione um produto ao carrinho para testar o checkout.');
    return;
  }
  const lines = cart.map(item => `• ${item.name} x${item.qty} = ${currency(item.qty * item.price)}`).join('%0A');
  const total = currency(cart.reduce((sum, item) => sum + item.price * item.qty, 0));
  const text = `Preview da loja:%0A%0AQuero fechar este pedido:%0A${lines}%0A%0ATotal: ${total}%0A%0ANome:%0AEndereço:%0AForma de pagamento:`;
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

function simulatePix() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (!total) {
    alert('Adicione um produto para simular o PIX.');
    return;
  }
  alert(`Simulação de PIX\n\nTotal: ${currency(total)}\n\nAqui depois entra o código copia e cola real.`);
}

function renderSearchResults(query = '') {
  const q = query.trim().toLowerCase();
  const list = products.filter(item => !q || [item.name, item.category, item.desc].join(' ').toLowerCase().includes(q));
  searchResults.innerHTML = '';
  list.slice(0, 8).forEach(product => {
    const row = document.createElement('div');
    row.className = 'search-row';
    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <strong>${product.name}</strong>
        <small>${product.category} • ${currency(product.price)}</small>
      </div>
      <button>Adicionar</button>
    `;
    row.querySelector('button').addEventListener('click', () => {
      addToCart(product.id);
      closeAll();
    });
    searchResults.appendChild(row);
  });
}

searchInput.addEventListener('input', renderProducts);
searchModalInput.addEventListener('input', e => renderSearchResults(e.target.value));

document.getElementById('openCart').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeAll);
document.getElementById('checkoutBtn').addEventListener('click', checkoutWhatsApp);
document.getElementById('pixBtn').addEventListener('click', simulatePix);
document.getElementById('openSearch').addEventListener('click', () => {
  searchModal.classList.add('show');
  overlay.classList.add('show');
  renderSearchResults();
});
document.getElementById('closeSearch').addEventListener('click', closeAll);
overlay.addEventListener('click', closeAll);

renderCategories();
renderChips();
renderProducts();
updateCart();
renderSearchResults();
