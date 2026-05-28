// Shared cart state via localStorage
(function(){
  var KEY = 'cartItems';

  function readItems(){
    try{
      var raw = localStorage.getItem(KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    }catch(e){
      return [];
    }
  }

  function writeItems(items){
    localStorage.setItem(KEY, JSON.stringify(items));
    render();
  }

  function countItems(){
    return readItems().reduce(function(sum, item){ return sum + (item.qty || 0); }, 0);
  }

  function render(){
    var count = countItems();
    document.querySelectorAll('.cart-count').forEach(function(el){ el.textContent = String(count); });
  }

  window.Cart = {
    get: countItems,
    getItems: readItems,
    add: function(product){
      var items = readItems();
      if(product && product.id != null){
        var existing = items.find(function(i){ return i.id === product.id; });
        if(existing){
          existing.qty += 1;
        }else{
          items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
          });
        }
      }else{
        // Backward compatibility if called without a product object.
        items.push({ id: Date.now(), name: 'Item', price: 0, image: '', qty: 1 });
      }
      writeItems(items);
    },
    setQty: function(id, qty){
      var items = readItems();
      var item = items.find(function(i){ return i.id === id; });
      if(!item) return;
      if(qty <= 0){
        items = items.filter(function(i){ return i.id !== id; });
      }else{
        item.qty = qty;
      }
      writeItems(items);
    },
    reset: function(){
      writeItems([]);
    }
  };

  document.addEventListener('DOMContentLoaded', render);
})();
