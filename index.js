const products = {
  "Fila Racer Energized": { 
    maxQuantity: 10, 
    sizes: [6, 7, 8, 9, 10], 
    price: 120,
    image: "https://fila.veto.gr/images/thumbnails/1200/1200/detailed/1331/1RM02779-293_1.webp",
    category: "men"
  },
  "Adidas Samba OG Shoes": { 
    maxQuantity: 3, 
    sizes: [6, 7, 8, 9, 10], 
    price: 100,
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
  "New Balance Men's Coco Delray": {
    maxQuantity: 6, 
    sizes: [6, 7, 8, 9, 10], 
    price: 110,
    image: "https://nb.scene7.com/is/image/NB/mchcodf2_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "men"
  },
  "Adidas Women's Gazelle Bold Shoes": {
    maxQuantity: 4,
    sizes: [5, 6, 7, 8, 9], 
    price: 120,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/55b640477c7c44dcbce23556aebe6d8e_9366/Gazelle_Bold_Shoes_Black_IE0876_01_standard.jpg",
    category: "women"
  },
  "Asics Kid's GT-1000 13 PRE-SCHOOL": {
    maxQuantity: 5,
    sizes: [1, 2, 3, 4, 5], 
    price: 70,
    image: "https://www.cumminssports.ie/media/catalog/product/cache/d5840a51cf47b9fff9190c64c53c78a2/1/4/141768-6.jpg",
    category: "kids"
  },
  "Fila Women's Solarstride 4": {
    maxQuantity: 4,
    sizes: [5, 6, 7, 8, 9], 
    price: 100,
    image: "https://www.harrisscarfe.com.au/medias/productHero-SPOTWF-BP664872001-blsh-wht.jpg?context=bWFzdGVyfGltYWdlc3wyMTI0N3xpbWFnZS9qcGVnfGltYWdlcy9oODEvaDM1LzI2NTIwMjgwOTU2OTU4L3Byb2R1Y3RIZXJvX1NQT1RXRl9CUDY2NDg3MjAwMS1ibHNoLXdodC5qcGd8YzBhMjgxZWZlOGI1MTViZTFmODExM2U1NmExZDI2NDlhM2RjNzU4MGU3M2VjMzM0NzlkZTAyMmRjMDY5OTc5Ng",
    category: "women"
  },
  "Asics Gel-Kayano 32": {
    maxQuantity: 3,
    sizes: [5, 6, 7, 8, 9], 
    price: 150,
    image: "https://roadrunnersports.widen.net/content/dyaj53ovsl?w=1000&h=1000",
    category: "women"
  },
  "Adidas Ultraboost 5X Shoes - Tie Dye": {
    maxQuantity: 4,
    sizes: [5, 6, 7, 8, 9], 
    price: 130,
    image: "https://www.nicekicks.com/files/2021/06/adidas-Ultra-Boost-2021-Tie-Dye-GZ7104-Lead.jpg",
    category: "women"
  },
  "Adidas SL 72 RS Shoes Kids": {
    maxQuantity: 5,
    sizes: [1, 2, 3, 4, 5], 
    price: 75,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/3f485688d0ab4f16a363ac79770a882a_9366/SL_72_RS_Shoes_White_IH4823_01_standard.jpg",
    category: "kids"
  },
  "New Balance Kids Rave Run v2": {
    maxQuantity: 4,
    sizes: [1, 2, 3, 4, 5], 
    price: 100,
    image: "https://nb.scene7.com/is/image/NB/pkravag2_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
    category: "kids"
  },
  "Asics Gel-Kayano 31 Grade School": {
    maxQuantity: 3,
    sizes: [1, 2, 3, 4, 5], 
    price: 90,
    image: "https://images.asics.com/is/image/asics/1014A342_400_SR_RT_GLB?$sfcc-product$",
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