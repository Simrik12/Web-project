const products = {
  "New Balance Women's 574 Core": { 
    maxQuantity: 5, 
    sizes: [5, 6, 7, 8, 9, 10], 
    price: 90,
    image: "https://nb.scene7.com/is/image/NB/wl574evw_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "women"
  },
  "Adidas Samba OG Shoes": { 
    maxQuantity: 5, 
    sizes: [5, 6, 7, 8, 9, 10], 
    price: 100,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/68a71339ae624af99f96d4d24cfd4c25_9366/Samba_OG_Shoes_White_JI2677_01_00_standard.jpg",
    category: "women"
  },
  "Adidas Gazelle Bold Shoes": { 
    maxQuantity: 5, 
    sizes: [5, 6, 7, 8, 9, 10], 
    price: 120,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/4289cc239b5f4bf7afd79cbb36546d8a_9366/Gazelle_Bold_Shoes_White_ID7056_01_standard.jpg",
    category: "women"
  },
  "Fila Women's Royalton": { 
    maxQuantity: 5, 
    sizes: [5, 6, 7, 8, 9, 10], 
    price: 70,
    image: "https://www.fila.com/dw/image/v2/AAEJ_PRD/on/demandware.static/-/Sites-FilaUSACatalogID/default/dw39e5a1cd/images/ProductImages/5TM02026_150_01_e.jpg?sw=1334&sh=2000&sm=fit",
    category: "women"
  },
  "Women's Fila Racer Energized": { 
    maxQuantity: 5, 
    sizes: [5, 6, 7, 8, 9, 10], 
    price: 85,
    image: "https://www.fila.com/dw/image/v2/AAEJ_PRD/on/demandware.static/-/Sites-FilaUSACatalogID/default/dw6e414ac4/images/ProductImages/5RM02754_122_01_e.jpg?sw=523&sh=785&sm=fit",
    category: "women"
  },
  "Asics Women's GEL-1130": { 
    maxQuantity: 5, 
    sizes: [5, 6, 7, 8, 9, 10], 
    price: 110,
    image: "https://images.asics.com/is/image/asics/1202A163_100_SR_RT_GLB?$sfcc-product$",
    category: "women"
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