const products = {
  "New Balance FuelCell Rebel v4": { 
    maxQuantity: 5, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 115,
    image: "https://nb.scene7.com/is/image/NB/mfcxlk4_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "men"
  },
  "Asics GEL-CUMULUS 27": { 
    maxQuantity: 5, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 135,
    image: "https://images.asics.com/is/image/asics/1011B960_020_SR_RT_GLB?$sfcc-product$",
    category: "men"
  },
  "Asics NOVABLAST 5 Track Club": { 
    maxQuantity: 5, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 150,
    image: "https://images.asics.com/is/image/asics/1011C027_400_SR_RT_GLB?$sfcc-product$",
    category: "men"
  },
  "Adidas Runfalcon 5 Running Shoes": { 
    maxQuantity: 5, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 80,
    image: "https://i.ebayimg.com/images/g/3K4AAOSwJr1m7uaZ/s-l1200.jpg",
    category: "men"
  },
  "Adidas Adizero EVO SL Shoes": { 
    maxQuantity: 5, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 155,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/c2e7843b6be64924943406cfaa899b82_9366/Adizero_EVO_SL_Shoes_White_JH6206_01_00_standard.jpg",
    category: "men"
  },
  "Fila Mondo Forza Men White-Navy": { 
    maxQuantity: 5, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 170,
    image: "https://www.fila.de/out/pictures/generated/product/1/630_630_100/fila_mondo_forza_men_white_navy_1716390_v2_1894.jpg",
    category: "men"
  }
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  setupAddToCartButtons();
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


function setupAddToCartButtons() {
  document.querySelectorAll('.btn.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Add to Cart')) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.card');
        const productName = card.querySelector('.card-title').textContent;
        const product = products[productName];
        
        if (product) {
          showSizeModal(productName, product);
        } else {
          console.error('Product not found:', productName);
        }
      });
    }
  });
}

function showSizeModal(productName, product) {
  const sizeModalEl = document.getElementById('sizeModal');
  if (!sizeModalEl) {
    console.error('Size modal element not found');
    return;
  }

  const sizeModal = new bootstrap.Modal(sizeModalEl);
  const sizeOptionsContainer = document.getElementById('sizeOptions');
  const productDescription = document.getElementById('productDescription');
  const modalAddToCartBtn = document.getElementById('modalAddToCart');
  
 
  modalAddToCartBtn.disabled = true;
  modalAddToCartBtn.dataset.product = '';
  modalAddToCartBtn.dataset.size = '';
  
  productDescription.textContent = `${productName} - $${product.price}`;
  sizeOptionsContainer.innerHTML = '';
  
  product.sizes.forEach(size => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary';
    btn.textContent = size;
    btn.dataset.size = size;
    btn.addEventListener('click', function() {
      
      document.querySelectorAll('#sizeOptions .btn').forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline-primary');
      });
      
      
      this.classList.remove('btn-outline-primary');
      this.classList.add('active', 'btn-primary');
      
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
 
}