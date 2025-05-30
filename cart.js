const products = {
  "Fila Racer Energized": { 
    maxQuantity: 10, 
    sizes: [6, 7, 8, 9, 10], 
    price: 140,
    image: "https://fila.veto.gr/images/thumbnails/1200/1200/detailed/1331/1RM02779-293_1.webp",
    category: "men"
  },
  "Adidas Samba OG Shoes": { 
    maxQuantity: 3, 
    sizes: [6, 7, 8, 9, 10], 
    price: 105,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/4c70105150234ac4b948a8bf01187e0c_9366/Samba_OG_Shoes_Black_B75807_01_standard.jpg",
    category: "men"
  },
  "New Balance 574 Sneakers": { 
    maxQuantity: 5, 
    sizes: [6, 7, 8, 9, 10], 
    price: 90,
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/t/1/c/-original-imah852zfufjwfga.jpeg?q=90&crop=false",
    category: "men"
  },
  "New Balance Men's Coco Delray":{
    maxQuantity: 6, 
    sizes: [6, 7, 8, 9, 10], 
    price: 110,
    image:"https://nb.scene7.com/is/image/NB/mchcodf2_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "men"
  },
  "Adidas ULTRABOOST 1.0":{
    maxQuantity: 4,
    sizes: [6, 7, 8, 9, 10], 
    price: 120,
    image:"https://www.superkicks.in/cdn/shop/files/7_a18fda69-f029-4963-a407-f037c7a1233b.jpg?v=1741782423&width=600",
    category: "men"
  },
  "Asics Men's Skyhand OG":{
    maxQuantity: 5,
    sizes: [6, 7, 8, 9, 10], 
    price: 100,
    image:"https://www.superkicks.in/cdn/shop/files/1_ce9013dd-a773-41fa-9a23-5305449b9010.jpg?v=1741773705&width=600",
    category: "men"
  }
};



let cart = JSON.parse(localStorage.getItem('cart')) || [];


document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  
  
  if (document.getElementById('productContainer')) {
    renderProducts();
    setupAddToCartButtons();
  }
  
 
  if (document.getElementById('cartItems')) {
    renderCartPage();
  }
});

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  localStorage.setItem('cartCount', cartCount);
  
  const cartLink = document.getElementById('cartLink');
  if (cartLink) {
    const badge = cartLink.querySelector('.cart-badge') || document.createElement('span');
    badge.className = 'cart-badge';
    badge.textContent = cartCount;
    
    if (cartCount > 0) {
      if (!cartLink.contains(badge)) cartLink.appendChild(badge);
    } else {
      if (cartLink.contains(badge)) cartLink.removeChild(badge);
    }
  }
}

function showToast(message) {
  const toastEl = document.getElementById('addedToCartToast');
  if (toastEl) {
    const toastBody = toastEl.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}


function renderProducts() {
  const container = document.getElementById('productContainer');
  if (!container) return;
  
  container.innerHTML = Object.entries(products).map(([name, product]) => `
    <div class="col-md-4 col-sm-6 mb-4">
      <div class="card product-card">
        <img src="${product.image}" class="card-img-top" alt="${name}">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">$${product.price}</p>
          <button class="btn btn-primary add-to-cart" data-product="${name}">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

function setupAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const productName = this.dataset.product;
      const product = products[productName];
      showSizeModal(productName, product);
    });
  });
}

function showSizeModal(productName, product) {
  const sizeModal = new bootstrap.Modal(document.getElementById('sizeModal'));
  const sizeOptionsContainer = document.getElementById('sizeOptions');
  const productDescription = document.getElementById('productDescription');
  const modalAddToCartBtn = document.getElementById('modalAddToCart');
  
  productDescription.textContent = `${productName} - $${product.price}`;
  sizeOptionsContainer.innerHTML = '';
  
  product.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary';
    btn.textContent = size;
    btn.dataset.size = size;
    btn.addEventListener('click', function() {
      modalAddToCartBtn.disabled = false;
      modalAddToCartBtn.dataset.product = productName;
      modalAddToCartBtn.dataset.size = size;
    });
    sizeOptionsContainer.appendChild(btn);
  });
  
  modalAddToCartBtn.onclick = function() {
    addToCart(this.dataset.product, this.dataset.size);
    sizeModal.hide();
  };
  
  sizeModal.show();
}

function addToCart(productName, size) {
  const product = products[productName];
  
  
  const existingItem = cart.find(item => 
    item.name === productName && item.size === size
  );
  
  if (existingItem) {
    if (existingItem.quantity >= product.maxQuantity) {
      showToast(`Only ${product.maxQuantity} items available in stock!`);
      return;
    }
    existingItem.quantity++;
  } else {
    cart.push({
      name: productName,
      price: product.price,
      size: size,
      quantity: 1,
      maxQuantity: product.maxQuantity,
      image: product.image
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${productName} (Size: ${size}) added to cart!`);
}


function renderCartPage() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = '';
  let total = 0;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-muted">Your cart is empty</p>';
    cartTotalElement.textContent = '0.00';
    return;
  }
  
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    
    const itemElement = document.createElement('div');
    itemElement.className = 'col-12 mb-4';
    itemElement.innerHTML = `
      <div class="card">
        <div class="row g-0">
          <div class="col-md-2">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Size: ${item.size}</p>
              <p class="card-text">$${item.price}</p>
              <div class="d-flex align-items-center">
                <button class="btn btn-outline-secondary quantity-btn" data-index="${index}" data-action="decrease">-</button>
                <span class="mx-3">${item.quantity}</span>
                <button class="btn btn-outline-secondary quantity-btn" data-index="${index}" data-action="increase">+</button>
              </div>
              ${item.quantity >= item.maxQuantity ? 
                `<p class="text-danger mt-2">Only ${item.maxQuantity} items available</p>` : ''}
            </div>
          </div>
          <div class="col-md-2 d-flex align-items-center justify-content-end">
            <button class="btn btn-danger remove-item" data-index="${index}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
  
  cartTotalElement.textContent = total.toFixed(2);
  
  setupCartItemControls();
}

function setupCartItemControls() {
  document.querySelectorAll('.quantity-btn, .remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.dataset.index;
      
      if (this.classList.contains('quantity-btn')) {
        const action = this.dataset.action;
        
        if (action === 'increase') {
          if (cart[index].quantity >= cart[index].maxQuantity) {
            showToast(`Only ${cart[index].maxQuantity} items available in stock!`);
            return;
          }
          cart[index].quantity++;
        } else {
          if (cart[index].quantity > 1) {
            cart[index].quantity--;
          } else {
            cart.splice(index, 1);
          }
        }
      } 
      else if (this.classList.contains('remove-item')) {
        cart.splice(index, 1);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartPage();
      updateCartCount();
    });
  });
}