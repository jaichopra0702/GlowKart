import React, { useMemo, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import Filter from './Filter';
import './app1.css';
import { CartContext } from './CartContext';

const ProductList = ({ products }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // useMemo to filter products based on the selected category
  const filteredProducts = useMemo(() => {
    console.log("Category:", category);
    console.log("Products:", products);
    if (!products) return [];
    if (category && category !== 'All') {
      return products.filter((product) =>
        product.category.replace(/ /g, '_') === category
      );
    }
    return products; // Show all products if category is 'All'
  }, [category, products]);

  return (
    <div className="product-list">
      <Filter setCategory={(newCategory) => {
        navigate(`/${newCategory}`);
      }} />
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id} // Use a unique identifier if available
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