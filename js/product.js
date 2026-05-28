// Product detail page
(function(){
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id') || '1', 10);
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];

  function stars(n){ return '\u2605\u2605\u2605\u2605\u2605'.slice(0, n) + '\u2606\u2606\u2606\u2606\u2606'.slice(0, 5-n); }

  document.title = p.name + ' - Abokichi';
  document.getElementById('bcName').textContent = p.name;
  document.getElementById('pName').textContent = p.name;
  document.getElementById('pPrice').textContent = '$' + p.price.toFixed(2);
  document.getElementById('pOldPrice').textContent = '$' + p.oldPrice.toFixed(2);
  document.getElementById('pStars').textContent = stars(p.rating);
  document.getElementById('pReviews').textContent = p.reviews + ' Reviews';
  document.getElementById('pDesc').textContent = p.description;
  document.getElementById('longDesc').textContent = p.description + ' These award-winning products will have your taste buds lingering for more...and potentially create an addiction.';

  const mainImg = document.getElementById('mainImg');
  mainImg.src = p.image; mainImg.alt = p.name;

  const thumbRow = document.getElementById('thumbRow');
  const extras = PRODUCTS.filter(x => x.id !== p.id).slice(0,3).map(x => x.image);
  const thumbs = [p.image, ...extras];
  thumbRow.innerHTML = thumbs.map((src,i)=>`<img src="${src}" class="${i===0?'active':''}" data-src="${src}" alt="thumb"/>`).join('');
  thumbRow.querySelectorAll('img').forEach(t => {
    t.addEventListener('click', () => {
      thumbRow.querySelectorAll('img').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      mainImg.src = t.dataset.src;
    });
  });

  document.getElementById('addCart').addEventListener('click', () => {
    Cart.add(p);
    const b = document.getElementById('addCart');
    const orig = b.textContent;
    b.textContent = '\u2713 ADDED';
    setTimeout(()=>{ b.textContent = orig; }, 1100);
  });

  document.getElementById('buyNow').addEventListener('click', () => {
    Cart.add(p);
    location.href = 'order.html';
  });

  document.querySelectorAll('.tab-h').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab-h').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('tab-'+t.dataset.tab).classList.add('active');
    });
  });
})();


