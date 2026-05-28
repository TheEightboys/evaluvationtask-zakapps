# Abokichi — ZakApps UI Developer Assessment

Multi-page e-commerce demo built with **plain HTML, CSS, and vanilla JavaScript** (no frameworks).

## Pages
1. `index.html` — Home (hero + "Shop now")
2. `products.html` — Product listing with **Filter** (Categories, Type, Flavours, Rating, Single/Multi) and **Sort By** (A–Z, Z–A, price, rating)
3. `product.html` — Product detail. **Add to Cart** increments the header cart counter (persisted via `localStorage`). **Buy Now** → order page.
4. `order.html` — Order placed confirmation.

## Run
Just open `index.html` in any browser — no build step.

## Structure
```
index.html
products.html
product.html
order.html
css/styles.css
js/data.js      dummy products
js/cart.js      shared cart counter
js/products.js  listing + filter + sort
js/product.js   detail + add to cart + buy now
```
