const products = {
  "New Balance Kids' 9060": { 
    maxQuantity: 5, 
    sizes: [1, 2, 3, 4, 5], 
    price: 70,
    image: "https://nb.scene7.com/is/image/NB/iv9060gc_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
    category: "kids"
  },
  "Kids Asics Pre Noosa Tri 13 PS": { 
    maxQuantity: 5, 
    sizes: [1, 2, 3, 4, 5], 
    price: 85,
    image: "https://runnersshop.com.au/cdn/shop/products/KidsNoosaTriPS705Right.jpg?v=1672967857&width=823",
    category: "kids"
  },
  "Adidas SL 72 RS Shoes Kids": { 
    maxQuantity: 5, 
    sizes: [1, 2, 3, 4, 5], 
    price: 75,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/3f485688d0ab4f16a363ac79770a882a_9366/SL_72_RS_Shoes_White_IH4823_01_standard.jpg",
    category: "kids"
  },
  "Adidas VL Court Bold Lifestyle Shoes": { 
    maxQuantity: 5, 
    sizes: [1, 2, 3, 4, 5], 
    price: 65,
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/60888c080679444c93385dd5f1100464_9366/VL_Court_Bold_Lifestyle_Shoes_Kids_White_JS0873_01_00_standard.jpg",
    category: "kids"
  },
  "Fila Kids Cam Lights": { 
    maxQuantity: 5, 
    sizes: [1, 2, 3, 4, 5], 
    price: 95,
    image: "https://assets.superbalistcdn.co.za/500x720/filters:quality(75):format(jpg)/3828893/original.jpg",
    category: "kids"
  },
  "New Balance 327 New-B Hook & Loop": { 
    maxQuantity: 5, 
    sizes: [1, 2, 3, 4, 5], 
    price: 100,
    image: "https://nb.scene7.com/is/image/NB/nw327gt_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "kids"
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
