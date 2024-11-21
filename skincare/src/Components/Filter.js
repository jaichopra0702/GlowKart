import React, { useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './filter.css';
import { CartContext } from './CartContext'; // Import CartContext

const Filter = ({ setCategory }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext); // Get the cart from CartContext
  const [showAll, setShowAll] = useState(category === 'All' || !category);

  // Calculate total number of items in the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const getDropdownValue = () => {
    if (category && category !== 'All') {
      return category.replace(/_/g, ' ').replace(/&/g, ' & '); 
    }
    return 'All';
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const formattedCategory = selectedCategory === 'All' ? 'All' : selectedCategory.replace(/\s+/g, '_');
    setCategory(selectedCategory);
    setShowAll(selectedCategory === 'All');
    if (formattedCategory) {
      navigate(`/${formattedCategory}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="filter-container">
      <select
        className="filter-select"
        onChange={handleCategoryChange}
        value={getDropdownValue()}
      >
        <option value="All">All Categories</option>
        <option value="SensitiveSkin">Sensitive Skin</option>
        <option value="Acne">Acne & Blemishes</option>
        <option value="DrySkin">Dry Skin</option>
        <option value="OilySkin">Oily Skin</option>
        <option value="TexturedSkin">Textured Skin</option>
        <option value="Pigmentation">Pigmentation</option>
        <option value="CombinationSkin">Combination Skin</option>
      </select>
      
      <Link to="/cart">
        <button className="cart-button">
          Cart
          {cartItemCount > 0 && (
            <span className="cart-item-count">
              {cartItemCount}
            </span>
          )}
        </button>
      </Link>
      
    </div>
  );
};

export default Filter;
