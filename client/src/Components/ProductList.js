import React, { useMemo, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import Filter from './Filter';
import './app1.css';
import { CartContext } from './CartContext';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon

const ProductList = ({ products }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext); // Get cart and addToCart from context

  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    // Filter by category
    let categoryFiltered =
      category && category !== 'All'
        ? products.filter(
            (product) => product.category.replace(/ /g, '_') === category
          )
        : products;

    // Filter by search query (name matching)
    if (searchQuery) {
      categoryFiltered = categoryFiltered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return categoryFiltered;
  }, [category, products, searchQuery]);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="product-list">
      <Filter setCategory={(newCategory) => navigate(`/${newCategory}`)} />

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a product..."
          className="search-bar"
        />
      </div>

      <button className="cart-button" onClick={() => navigate('/cart')}>
        <FaShoppingCart className="cart-icon" />
        <span className="cart-label">Cart</span>
        {cartItemCount > 0 && (
          <span className="cart-item-count">{cartItemCount}</span>
        )}
      </button>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              outOfStock={product.outOfStock}
              onAddToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
