const products = {
  "Fila Racer Energized": { 
    maxQuantity: 10, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 140,
    image: "https://fila.veto.gr/images/thumbnails/1200/1200/detailed/1331/1RM02779-293_1.webp",
    category: "men"
  },
  "Adidas Samba OG Shoes": { 
    maxQuantity: 8, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 105,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/4c70105150234ac4b948a8bf01187e0c_9366/Samba_OG_Shoes_Black_B75807_01_standard.jpg",
    category: "men"
  },
  "New Balance 574 Sneakers": { 
    maxQuantity: 6, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 90,
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/t/1/c/-original-imah852zfufjwfga.jpeg?q=90&crop=false",
    category: "men"
  },
  "New Balance Men's Coco Delray": { 
    maxQuantity: 5, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 110,
    image: "https://nb.scene7.com/is/image/NB/mchcodf2_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "men"
  },
  "Adidas ULTRABOOST 1.0": { 
    maxQuantity: 7, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 120,
    image: "https://www.superkicks.in/cdn/shop/files/7_a18fda69-f029-4963-a407-f037c7a1233b.jpg?v=1741782423&width=600",
    category: "men"
  },
  "Asics Men's Skyhand OG": { 
    maxQuantity: 5, 
    sizes: [7, 8, 9, 10, 11, 12], 
    price: 100,
    image: "https://www.superkicks.in/cdn/shop/files/1_ce9013dd-a773-41fa-9a23-5305449b9010.jpg?v=1741773705&width=600",
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