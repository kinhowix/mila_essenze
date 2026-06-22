import React from 'react';
import ProductCard from './ProductCard';
import './productCard.css';

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros de busca.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <div key={product.id} className={`delay-${(index % 5) + 1}`}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
