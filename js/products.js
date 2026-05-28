// Listing page logic: render, filter, sort
(function(){
  const grid = document.getElementById('grid');
  const countEl = document.getElementById('count');
  const sortSel = document.getElementById('sortSelect');
  const filterBtn = document.getElementById('filterToggle');
  const panel = document.getElementById('filterPanel');

  function stars(n){ return '\u2605\u2605\u2605\u2605\u2605'.slice(0, n) + '\u2606\u2606\u2606\u2606\u2606'.slice(0, 5-n); }

  function getFilters(){
    const sel = sel => Array.from(document.querySelectorAll(sel)).filter(i=>i.checked).map(i=>i.value);
    const ratingEl = document.querySelector('.f-rating:checked');
    return {
      cats: sel('.f-cat'),
      types: sel('.f-type'),
      flavs: sel('.f-flav'),
      rating: ratingEl ? parseInt(ratingEl.value,10) : 0
    };
  }

  function apply(){
    const f = getFilters();
    let list = PRODUCTS.filter(p => {
      if(f.cats.length && !f.cats.includes(p.category)) return false;
      if(f.types.length && !f.types.includes(p.type)) return false;
      if(f.flavs.length && !f.flavs.includes(p.flavour)) return false;
      if(f.rating && p.rating < f.rating) return false;
      return true;
    });
    switch(sortSel.value){
      case 'az': list.sort((a,b)=>a.name.localeCompare(b.name)); break;
      case 'za': list.sort((a,b)=>b.name.localeCompare(a.name)); break;
      case 'plh': list.sort((a,b)=>a.price-b.price); break;
      case 'phl': list.sort((a,b)=>b.price-a.price); break;
      case 'rating': list.sort((a,b)=>b.rating-a.rating); break;
    }
    render(list);
  }

  function render(list){
    countEl.textContent = list.length;
    grid.innerHTML = list.map(p => `
      <a class="product-card" href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <h3>${p.name}</h3>
        <div class="pc-price">$${p.price.toFixed(2)}</div>
        <div class="pc-rating">${stars(p.rating)} <span style="color:#999">(${p.reviews})</span></div>
      </a>
    `).join('');
  }

  filterBtn.addEventListener('click', () => {
    panel.classList.toggle('hidden');
    filterBtn.classList.toggle('active');
  });
  sortSel.addEventListener('change', apply);
  document.querySelectorAll('#filterPanel input').forEach(i => i.addEventListener('change', apply));

  apply();
})();


