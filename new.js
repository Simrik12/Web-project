document.getElementById('sortSelect').addEventListener('change', function () {
  const container = document.getElementById('productContainer');
  const cards = Array.from(document.querySelectorAll('.product-card')); 

  const sortType = this.value;
  cards.sort((a, b) => {
    const priceA = parseFloat(a.getAttribute('data-price'));
    const priceB = parseFloat(b.getAttribute('data-price'));
    return sortType === 'lowToHigh' ? priceA - priceB : priceB - priceA;
  });

  
  container.innerHTML = '';
  cards.forEach((card, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4'; 
    col.appendChild(card);
    container.appendChild(col);
  });
});
