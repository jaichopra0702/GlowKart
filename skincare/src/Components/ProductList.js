import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import Filter from './Filter';
import './app1.css';

const ProductList = ({ products, addToCart }) => {
  const { category } = useParams();

  const filteredProducts = useMemo(() => {
    if (category) {
      return products.filter((product) =>
        product.category.replace(/ /g, '_') === category
      );
    }
    return products;
  }, [category, products]);

  return (
    <div className="product-list">
      <Filter setCategory={(newCategory) => {
        window.location.href = `/${newCategory}`;
      }} />
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
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







