import React from 'react';

const ProductCard = ({ name, price, imageUrl, outOfStock, onAddToCart }) => {
  
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={imageUrl} alt={name} className="product-image" />
        {outOfStock && (
          <div className="out-of-stock">
            <span>OUT OF STOCK</span>
          </div>
        )}
      </div>
      <div class="infos">
      <h3 className="product-name">{name}</h3>
      <div className="product-rating">
        <span> ★★★★★ </span>
      </div>
      <div className="product-price"><b>₹{price}</b></div>
      {outOfStock ? (
        <button className="quick-view-btn">QUICK VIEW</button>
      ) : (
        <button className="add-to-cart-btn" onClick={onAddToCart}>ADD TO CART</button>
      )}
      </div>
    </div>
  );
};

export default ProductCard
