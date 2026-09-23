// WAFLA MARKET - Inafanya kazi bila Supabase (Local)
let products = JSON.parse(localStorage.getItem('wafla_products') || '[]');
let currentUser = JSON.parse(localStorage.getItem('wafla_user') || 'null');

function saveProducts() {
  localStorage.setItem('wafla_products', JSON.stringify(products));
}

function loadProducts() {
  const q = document.getElementById('q').value.toLowerCase();
  const category = document.getElementById('category').value;
  const grid = document.getElementById('productGrid');
  const status = document.getElementById('status');

  let filtered = products;

  if (q) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (filtered.length === 0) {
    status.textContent = products.length === 0 ? "Hakuna bidhaa bado. Ongeza bidhaa ya kwanza hapo chini." : "Hakuna bidhaa inayofanana na utafutaji.";
    grid.innerHTML = "";
    return;
  }

  status.textContent = `Inaonyesha bidhaa ${filtered.length} zote`;
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-image">
        ${p.image ? `<img src="${p.image}" onerror="this.parentElement.innerHTML='<div class=\\'no-image\\'>📦</div>'">` : `<div class="no-image">📦</div>`}
        <span class="badge">${p.category}</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">TZS ${Number(p.price).toLocaleString()}</p>
        <p class="location">📍 ${p.location}</p>
        <p class="desc">${p.description || ''}</p>
        <div class="product-actions">
          <a class="btn-whatsapp" href="https://wa.me/${p.phone.replace(/[^0-9]/g,'')}?text=Habari, nataka ${encodeURIComponent(p.name)} - TZS ${p.price}" target="_blank">
            Order WhatsApp
          </a>
          <a class="btn-call" href="tel:${p.phone}">Piga Simu</a>
        </div>
      </div>
    </div>
  `).join('');
}

// ADD PRODUCT
document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const newProduct = {
    id: Date.now(),
    name: document.getElementById('p_name').value,
    price: document.getElementById('p_price').value,
    category: document.getElementById('p_category').value,
    location: document.getElementById('p_location').value,
    phone: document.getElementById('p_phone').value,
    image: document.getElementById('p_image').value,
    description: document.getElementById('p_description').value,
    date: new Date().toLocaleDateString()
  };
  products.unshift(newProduct);
  saveProducts();
  loadProducts();
  e.target.reset();
  document.getElementById('productMsg').textContent = "✅ Bidhaa imeongezwa! Iko kwenye 'Bidhaa Zote' juu.";
  setTimeout(()=> document.getElementById('productMsg').textContent="", 3000);
  window.scrollTo({top: document.getElementById('products').offsetTop - 80, behavior: 'smooth'});
});

window.loadProducts = loadProducts;
document.addEventListener('DOMContentLoaded', loadProducts);
