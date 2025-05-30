const products = {
  "Asics Gel-Kayano 31 Grade School": { 
    maxQuantity: 3, 
    sizes: [1, 2, 3, 4, 5], 
    price: 90,
    image: "https://images.asics.com/is/image/asics/1014A342_400_SR_RT_GLB?$sfcc-product$",
    category: "kids"
  },
  "New Balance Kids Rave Run v2": { 
    maxQuantity: 4, 
    sizes: [1, 2, 3, 4, 5], 
    price: 100,
    image: "https://nb.scene7.com/is/image/NB/pkravag2_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "kids"
  },
  "Adidas Ultrarun 5 Shoes Kids": { 
    maxQuantity: 5, 
    sizes: [1, 2, 3, 4, 5], 
    price: 60,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/f7a864cf0d3d431dbc7981bba64e96c2_9366/Ultrarun_5_Shoes_Kids_Black_IF4143_01_standard.jpg",
    category: "kids"
  },
  "Fila Kids Landbuzzer Ombre":{
    maxQuantity: 8,
    sizes: [1, 2, 3, 4, 5], 
    price: 80,
    image: "https://jcpenney.scene7.com/is/image/JCPenney/DP0619202315001919M?hei=350&wid=350&op_usm=.4,.8,0,0&resmode=sharp2&op_sharpen=1", 
    category:"kids"
  },
  "New Balance Kids Fresh Foam 625": { 
    maxQuantity: 4, 
    sizes: [1, 2, 3, 4, 5], 
    price: 50,
    image: "https://nb.scene7.com/is/image/NB/nw625rd_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "kids"
  },
  "Adidas Duramo SL Shoes Kids": { 
    maxQuantity: 5, 
    sizes: [1, 2, 3, 4, 5], 
    price: 65,
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b0fb9a67f18f441483fb29d74dd508cb_9366/Duramo_SL_Shoes_Kids_Blue_IG2459_01_standard.jpg",
    category: "kids"
  }
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  setupAddToCartButtons();
  setupSorting();
});

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  localStorage.setItem('cartCount', cartCount);
  
  const cartLink = document.getElementById('cartLink');
  if (cartLink) {
    const badge = cartLink.querySelector('.cart-badge') || document.createElement('span');
    badge.className = 'cart-badge ms-1 bg-danger rounded-circle px-2';
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
      alert(`Maximum quantity (${product.maxQuantity}) reached for this item!`);
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

function setupSorting() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const productContainer = document.getElementById('productContainer');
      const productCards = Array.from(productContainer.querySelectorAll('.product-card'));
      
      productCards.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        
        if (this.value === 'lowToHigh') {
          return priceA - priceB;
        } else if (this.value === 'highToLow') {
          return priceB - priceA;
        }
        return 0;
      });
      
      
      productCards.forEach(card => {
        card.parentElement.remove();
        productContainer.appendChild(card.parentElement);
      });
    });
  }
}
  